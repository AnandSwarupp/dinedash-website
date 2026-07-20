import { NextRequest, NextResponse } from "next/server";
import { and, count, desc, eq, ilike, or, SQL } from "drizzle-orm";
import { db } from "@/lib/db";
import { contacts } from "@/lib/db/schema";
import { getAdminSession } from "@/lib/auth";

const VALID_STATUSES = new Set(["new", "read", "replied"]);

export async function GET(req: NextRequest) {
  if (!(await getAdminSession())) {
    return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  }
  try {
    const { searchParams } = new URL(req.url);
    const status = searchParams.get("status");
    const search = searchParams.get("search");

    const conditions: SQL[] = [];
    if (status && VALID_STATUSES.has(status)) {
      conditions.push(eq(contacts.status, status as "new" | "read" | "replied"));
    }
    if (search) {
      const term = `%${search.slice(0, 100)}%`;
      conditions.push(
        or(
          ilike(contacts.name, term),
          ilike(contacts.email, term),
          ilike(contacts.subject, term)
        )!
      );
    }

    const where = conditions.length ? and(...conditions) : undefined;

    const [rows, [{ value: total }], [{ value: newCount }]] = await Promise.all([
      db.select().from(contacts).where(where).orderBy(desc(contacts.createdAt)),
      db.select({ value: count() }).from(contacts),
      db.select({ value: count() }).from(contacts).where(eq(contacts.status, "new")),
    ]);

    return NextResponse.json({ contacts: rows, total, newCount });
  } catch {
    return NextResponse.json({ error: "Failed to fetch contacts." }, { status: 500 });
  }
}
