import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import { SiteContent } from "@/lib/models/SiteContent";

export async function GET(req: NextRequest, { params }: { params: Promise<{ section: string }> }) {
  try {
    await connectDB();
    const { section } = await params;
    const doc = await SiteContent.findOne({ section }).lean();
    if (!doc) return NextResponse.json({ data: null });
    return NextResponse.json({ data: (doc as { data: unknown }).data });
  } catch {
    return NextResponse.json({ data: null });
  }
}
