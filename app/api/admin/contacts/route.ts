import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import { Contact } from "@/lib/models/Contact";
import { getAdminSession } from "@/lib/auth";

function escapeRegex(str: string) {
  return str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

const VALID_STATUSES = new Set(["new", "read", "replied"]);

export async function GET(req: NextRequest) {
  if (!(await getAdminSession())) {
    return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  }
  try {
    await connectDB();
    const { searchParams } = new URL(req.url);
    const status = searchParams.get("status");
    const search = searchParams.get("search");

    const query: Record<string, unknown> = {};
    if (status && VALID_STATUSES.has(status)) query.status = status;
    if (search) {
      const safe = escapeRegex(search.slice(0, 100));
      query.$or = [
        { name: { $regex: safe, $options: "i" } },
        { email: { $regex: safe, $options: "i" } },
        { subject: { $regex: safe, $options: "i" } },
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
