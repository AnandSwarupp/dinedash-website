import { NextRequest, NextResponse } from "next/server";
import { and, count, desc, eq, ilike, or, SQL } from "drizzle-orm";
import { db } from "@/lib/db";
import { leads } from "@/lib/db/schema";
import { getAdminSession } from "@/lib/auth";

const VALID_STATUSES = new Set(["new", "contacted", "active", "closed"]);
const VALID_PLANS = new Set(["starter", "growth", "enterprise"]);

export async function GET(req: NextRequest) {
  if (!(await getAdminSession())) {
    return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  }
  try {
    const { searchParams } = new URL(req.url);
    const status = searchParams.get("status");
    const plan = searchParams.get("plan");
    const search = searchParams.get("search");

    const conditions: SQL[] = [];
    if (status && VALID_STATUSES.has(status)) {
      conditions.push(eq(leads.status, status as "new" | "contacted" | "active" | "closed"));
    }
    if (plan && VALID_PLANS.has(plan)) conditions.push(eq(leads.plan, plan));
    if (search) {
      const term = `%${search.slice(0, 100)}%`;
      conditions.push(
        or(
          ilike(leads.restaurantName, term),
          ilike(leads.ownerName, term),
          ilike(leads.email, term)
        )!
      );
    }

    const where = conditions.length ? and(...conditions) : undefined;

    const [rows, [{ value: total }], [{ value: newCount }]] = await Promise.all([
      db.select().from(leads).where(where).orderBy(desc(leads.createdAt)),
      db.select({ value: count() }).from(leads),
      db.select({ value: count() }).from(leads).where(eq(leads.status, "new")),
    ]);

    return NextResponse.json({ leads: rows, total, newCount });
  } catch {
    return NextResponse.json({ error: "Failed to fetch leads." }, { status: 500 });
  }
}
