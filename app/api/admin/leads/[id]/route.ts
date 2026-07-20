import { NextRequest, NextResponse } from "next/server";
import { eq } from "drizzle-orm";
import { db } from "@/lib/db";
import { leads } from "@/lib/db/schema";
import { getAdminSession } from "@/lib/auth";

export async function PATCH(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  if (!(await getAdminSession())) {
    return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  }
  try {
    const { id } = await params;
    const body = await req.json();

    // Only allow updating the status field
    if (!body.status || !["new", "contacted", "active", "closed"].includes(body.status)) {
      const [lead] = await db.select().from(leads).where(eq(leads.id, id)).limit(1);
      if (!lead) return NextResponse.json({ error: "Not found." }, { status: 404 });
      return NextResponse.json({ lead });
    }

    const [lead] = await db
      .update(leads)
      .set({ status: body.status, updatedAt: new Date() })
      .where(eq(leads.id, id))
      .returning();
    if (!lead) return NextResponse.json({ error: "Not found." }, { status: 404 });
    return NextResponse.json({ lead });
  } catch {
    return NextResponse.json({ error: "Failed to update." }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  if (!(await getAdminSession())) {
    return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  }
  try {
    const { id } = await params;
    await db.delete(leads).where(eq(leads.id, id));
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "Failed to delete." }, { status: 500 });
  }
}
