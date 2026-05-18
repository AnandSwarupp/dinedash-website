import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import { SiteContent } from "@/lib/models/SiteContent";

export async function GET(req: NextRequest, { params }: { params: Promise<{ section: string }> }) {
  try {
    await connectDB();
    const { section } = await params;
    const doc = await SiteContent.findOne({ section }).lean();
    if (!doc) return NextResponse.json({ error: "Section not found." }, { status: 404 });
    return NextResponse.json({ data: (doc as { data: unknown }).data });
  } catch {
    return NextResponse.json({ error: "Failed to fetch content." }, { status: 500 });
  }
}

export async function PUT(req: NextRequest, { params }: { params: Promise<{ section: string }> }) {
  try {
    await connectDB();
    const { section } = await params;
    const body = await req.json();

    const doc = await SiteContent.findOneAndUpdate(
      { section },
      { $set: { data: body.data } },
      { new: true, upsert: true }
    );

    return NextResponse.json({ data: doc.data });
  } catch {
    return NextResponse.json({ error: "Failed to update content." }, { status: 500 });
  }
}
