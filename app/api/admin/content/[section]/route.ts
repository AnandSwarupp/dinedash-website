import { NextRequest, NextResponse } from "next/server";
import { eq } from "drizzle-orm";
import { db } from "@/lib/db";
import { siteContent } from "@/lib/db/schema";
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
    const { section } = await params;
    if (!VALID_SECTIONS.has(section)) {
      return NextResponse.json({ error: "Invalid section." }, { status: 400 });
    }
    const [row] = await db.select().from(siteContent).where(eq(siteContent.section, section)).limit(1);
    if (!row) return NextResponse.json({ error: "Section not found." }, { status: 404 });
    return NextResponse.json({ data: row.data });
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
    const { section } = await params;
    if (!VALID_SECTIONS.has(section)) {
      return NextResponse.json({ error: "Invalid section." }, { status: 400 });
    }
    const body = await req.json();

    const safeData = section === "testimonials"
      ? sanitizeTestimonials(body.data)
      : body.data;

    const [row] = await db
      .insert(siteContent)
      .values({ section, data: safeData })
      .onConflictDoUpdate({
        target: siteContent.section,
        set: { data: safeData, updatedAt: new Date() },
      })
      .returning();

    return NextResponse.json({ data: row.data });
  } catch {
    return NextResponse.json({ error: "Failed to update content." }, { status: 500 });
  }
}
