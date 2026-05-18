import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import { Contact } from "@/lib/models/Contact";

export async function GET(req: NextRequest) {
  try {
    await connectDB();
    const { searchParams } = new URL(req.url);
    const status = searchParams.get("status");
    const search = searchParams.get("search");

    const query: Record<string, unknown> = {};
    if (status) query.status = status;
    if (search) {
      query.$or = [
        { name: { $regex: search, $options: "i" } },
        { email: { $regex: search, $options: "i" } },
        { subject: { $regex: search, $options: "i" } },
      ];
    }

    const contacts = await Contact.find(query).sort({ createdAt: -1 }).lean();
    const total = await Contact.countDocuments({});
    const newCount = await Contact.countDocuments({ status: "new" });

    return NextResponse.json({ contacts, total, newCount });
  } catch {
    return NextResponse.json({ error: "Failed to fetch contacts." }, { status: 500 });
  }
}
