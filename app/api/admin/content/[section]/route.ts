import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import { SiteContent } from "@/lib/models/SiteContent";
import { getAdminSession } from "@/lib/auth";

const VALID_SECTIONS = new Set([
  "pricing", "tiers", "faqs", "testimonials", "team", "settings",
  "privacy-policy", "terms-of-service", "cookie-policy",
]);

export async function GET(req: NextRequest, { params }: { params: Promise<{ section: string }> }) {
  if (!(await getAdminSession())) {
    return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  }
  try {
    await connectDB();
    const { section } = await params;
    if (!VALID_SECTIONS.has(section)) {
      return NextResponse.json({ error: "Invalid section." }, { status: 400 });
    }
    const doc = await SiteContent.findOne({ section }).lean();
    if (!doc) return NextResponse.json({ error: "Section not found." }, { status: 404 });
    return NextResponse.json({ data: (doc as { data: unknown }).data });
  } catch {
    return NextResponse.json({ error: "Failed to fetch content." }, { status: 500 });
  }
}

function sanitizeTestimonials(data: unknown): unknown {
  if (!Array.isArray(data)) return data;
  return data.map((t) => {
    if (typeof t !== "object" || t === null) return t;
    const item = t as Record<string, unknown>;
    // Only allow https:// avatar URLs — strip anything else
    if (item.avatar && typeof item.avatar === "string") {
      if (!item.avatar.startsWith("https://")) {
        item.avatar = "";
      }
    }
    return item;
  });
}

export async function PUT(req: NextRequest, { params }: { params: Promise<{ section: string }> }) {
  if (!(await getAdminSession())) {
    return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  }
  try {
    await connectDB();
    const { section } = await params;
    if (!VALID_SECTIONS.has(section)) {
      return NextResponse.json({ error: "Invalid section." }, { status: 400 });
    }
    const body = await req.json();

    const safeData = section === "testimonials"
      ? sanitizeTestimonials(body.data)
      : body.data;

    const doc = await SiteContent.findOneAndUpdate(
      { section },
      { $set: { data: safeData } },
      { new: true, upsert: true }
    );

    return NextResponse.json({ data: doc.data });
  } catch {
    return NextResponse.json({ error: "Failed to update content." }, { status: 500 });
  }
}
