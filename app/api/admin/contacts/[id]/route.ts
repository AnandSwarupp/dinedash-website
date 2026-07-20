import { NextRequest, NextResponse } from "next/server";
import { eq } from "drizzle-orm";
import { db } from "@/lib/db";
import { contacts } from "@/lib/db/schema";
import { getAdminSession } from "@/lib/auth";

export async function PATCH(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  if (!(await getAdminSession())) {
    return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  }
  try {
    const { id } = await params;
    const body = await req.json();

    // Only allow updating the status field
    if (!body.status || !["new", "read", "replied"].includes(body.status)) {
      const [contact] = await db.select().from(contacts).where(eq(contacts.id, id)).limit(1);
      if (!contact) return NextResponse.json({ error: "Not found." }, { status: 404 });
      return NextResponse.json({ contact });
    }

    const [contact] = await db
      .update(contacts)
      .set({ status: body.status, updatedAt: new Date() })
      .where(eq(contacts.id, id))
      .returning();
    if (!contact) return NextResponse.json({ error: "Not found." }, { status: 404 });
    return NextResponse.json({ contact });
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
    await db.delete(contacts).where(eq(contacts.id, id));
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "Failed to delete." }, { status: 500 });
  }
}
