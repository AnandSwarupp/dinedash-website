import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import { SiteContent } from "@/lib/models/SiteContent";

const VALID_SECTIONS = new Set([
  "pricing", "tiers", "faqs", "testimonials", "team", "settings",
  "privacy-policy", "terms-of-service", "cookie-policy",
]);

export async function GET(_req: NextRequest, { params }: { params: Promise<{ section: string }> }) {
  try {
    await connectDB();
    const { section } = await params;
    if (!VALID_SECTIONS.has(section)) {
      return NextResponse.json({ data: null });
    }
    const doc = await SiteContent.findOne({ section }).lean();
    if (!doc) return NextResponse.json({ data: null });
    return NextResponse.json({ data: (doc as { data: unknown }).data });
  } catch {
    return NextResponse.json({ data: null });
  }
}
