import { NextRequest, NextResponse } from "next/server";
import { eq } from "drizzle-orm";
import { db } from "@/lib/db";
import { siteContent } from "@/lib/db/schema";

const VALID_SECTIONS = new Set([
  "pricing", "tiers", "faqs", "testimonials", "team", "settings",
  "privacy-policy", "terms-of-service", "cookie-policy",
]);

export async function GET(_req: NextRequest, { params }: { params: Promise<{ section: string }> }) {
  try {
    const { section } = await params;
    if (!VALID_SECTIONS.has(section)) {
      return NextResponse.json({ data: null });
    }
    const [row] = await db.select().from(siteContent).where(eq(siteContent.section, section)).limit(1);
    if (!row) return NextResponse.json({ data: null });
    return NextResponse.json({ data: row.data });
  } catch {
    return NextResponse.json({ data: null });
  }
}
