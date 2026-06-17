import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import { Blog } from "@/lib/models/Blog";

export async function GET() {
  try {
    await connectDB();
    const posts = await Blog.find({ status: "published" })
      .sort({ publishedAt: -1 })
      .select("slug title excerpt author authorRole category tags coverImage readingTime publishedAt")
      .lean();
    return NextResponse.json({ posts });
  } catch {
    return NextResponse.json({ error: "Failed to fetch posts." }, { status: 500 });
  }
}
