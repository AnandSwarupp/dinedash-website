import { NextRequest, NextResponse } from "next/server";
import { and, count, desc, eq, gte, ilike, inArray, lte, or, sql, SQL } from "drizzle-orm";
import { db } from "@/lib/db";
import { suggestions, customers } from "@/lib/db/externalSchema";
import { getAdminSession } from "@/lib/auth";

export async function GET(req: NextRequest) {
  if (!(await getAdminSession())) {
    return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  }
  try {
    const { searchParams } = new URL(req.url);
    const search = searchParams.get("search");
    const category = searchParams.get("category");
    const from = searchParams.get("from");
    const to = searchParams.get("to");

    const conditions: SQL[] = [];
    if (search) {
      const term = `%${search.slice(0, 100)}%`;
      conditions.push(or(ilike(suggestions.suggestion, term), ilike(suggestions.customerName, term))!);
    }
    if (category) conditions.push(eq(suggestions.category, category));
    if (from) {
      const fromDate = new Date(from);
      if (!isNaN(fromDate.getTime())) conditions.push(gte(suggestions.createdAt, fromDate));
    }
    if (to) {
      const toDate = new Date(to);
      if (!isNaN(toDate.getTime())) {
        toDate.setHours(23, 59, 59, 999);
        conditions.push(lte(suggestions.createdAt, toDate));
      }
    }
    const where = conditions.length ? and(...conditions) : undefined;

    const [rows, [{ value: total }], categoryRows] = await Promise.all([
      db.select().from(suggestions).where(where).orderBy(desc(suggestions.createdAt)),
      db.select({ value: count() }).from(suggestions).where(where),
      db.selectDistinct({ category: suggestions.category }).from(suggestions).orderBy(sql`1`),
    ]);

    const customerIds = [...new Set(rows.map((r) => r.customerId).filter((id): id is string => !!id))];
    const customerRows = customerIds.length
      ? await db
          .select({ id: customers.id, email: customers.email, phone: customers.phone, city: customers.city })
          .from(customers)
          .where(inArray(customers.id, customerIds))
      : [];
    const customerById = new Map(customerRows.map((c) => [c.id, c]));

    const items = rows.map((r) => {
      const customer = r.customerId ? customerById.get(r.customerId) : undefined;
      return {
        ...r,
        customerEmail: customer?.email ?? null,
        customerPhone: customer?.phone ?? null,
        customerCity: customer?.city ?? null,
      };
    });

    return NextResponse.json({ suggestions: items, total, categories: categoryRows.map((c) => c.category) });
  } catch {
    return NextResponse.json({ error: "Failed to fetch suggestions." }, { status: 500 });
  }
}
