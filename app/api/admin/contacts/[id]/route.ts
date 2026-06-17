import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import { Contact } from "@/lib/models/Contact";
import { getAdminSession } from "@/lib/auth";

export async function PATCH(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  if (!(await getAdminSession())) {
    return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  }
  try {
    await connectDB();
    const { id } = await params;
    const body = await req.json();

    // Only allow updating the status field
    const allowed: Record<string, unknown> = {};
    if (body.status && ["new", "read", "replied"].includes(body.status)) {
      allowed.status = body.status;
    }

    const contact = await Contact.findOneAndUpdate({ id }, { $set: allowed }, { new: true });
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
    await connectDB();
    const { id } = await params;
    await Contact.findOneAndDelete({ id });
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "Failed to delete." }, { status: 500 });
  }
}
