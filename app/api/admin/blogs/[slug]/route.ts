import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import { Blog } from "@/lib/models/Blog";
import { getAdminSession } from "@/lib/auth";

function estimateReadingTime(content: string) {
  const words = content.trim().split(/\s+/).length;
  return Math.max(1, Math.ceil(words / 200));
}

export async function GET(_req: NextRequest, { params }: { params: Promise<{ slug: string }> }) {
  if (!(await getAdminSession())) {
    return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  }
  try {
    await connectDB();
    const { slug } = await params;
    const post = await Blog.findOne({ slug }).lean();
    if (!post) return NextResponse.json({ error: "Post not found." }, { status: 404 });
    return NextResponse.json({ post });
  } catch {
    return NextResponse.json({ error: "Failed to fetch post." }, { status: 500 });
  }
}

export async function PUT(req: NextRequest, { params }: { params: Promise<{ slug: string }> }) {
  if (!(await getAdminSession())) {
    return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  }
  try {
    await connectDB();
    const { slug } = await params;
    const body = await req.json();
    const { title, excerpt, content, author, authorRole, category, tags, coverImage, status } = body;

    const update: Record<string, unknown> = {
      title, excerpt, content, author, authorRole, category,
      tags: Array.isArray(tags) ? tags : [],
      coverImage: coverImage || "",
      status: status || "draft",
      readingTime: estimateReadingTime(content || ""),
    };

    const existing = await Blog.findOne({ slug }).lean() as { status?: string } | null;
    if (status === "published" && existing?.status !== "published") {
      update.publishedAt = new Date().toISOString();
    }

    const post = await Blog.findOneAndUpdate({ slug }, { $set: update }, { new: true });
    if (!post) return NextResponse.json({ error: "Post not found." }, { status: 404 });
    return NextResponse.json({ post });
  } catch {
    return NextResponse.json({ error: "Failed to update post." }, { status: 500 });
  }
}

export async function DELETE(_req: NextRequest, { params }: { params: Promise<{ slug: string }> }) {
  if (!(await getAdminSession())) {
    return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  }
  try {
    await connectDB();
    const { slug } = await params;
    await Blog.findOneAndDelete({ slug });
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "Failed to delete post." }, { status: 500 });
  }
}
