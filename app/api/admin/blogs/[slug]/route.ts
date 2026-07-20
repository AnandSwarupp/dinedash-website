import { NextRequest, NextResponse } from "next/server";
import { eq } from "drizzle-orm";
import { db } from "@/lib/db";
import { blogs } from "@/lib/db/schema";
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
    const { slug } = await params;
    const [post] = await db.select().from(blogs).where(eq(blogs.slug, slug)).limit(1);
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
    const { slug } = await params;
    const body = await req.json();
    const { title, excerpt, content, author, authorRole, category, tags, coverImage, status } = body;

    const update: Record<string, unknown> = {
      title, excerpt, content, author, authorRole, category,
      tags: Array.isArray(tags) ? tags : [],
      coverImage: coverImage || "",
      status: status || "draft",
      readingTime: estimateReadingTime(content || ""),
      updatedAt: new Date(),
    };

    const [existing] = await db.select({ status: blogs.status }).from(blogs).where(eq(blogs.slug, slug)).limit(1);
    if (status === "published" && existing?.status !== "published") {
      update.publishedAt = new Date().toISOString();
    }

    const [post] = await db.update(blogs).set(update).where(eq(blogs.slug, slug)).returning();
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
    const { slug } = await params;
    await db.delete(blogs).where(eq(blogs.slug, slug));
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "Failed to delete post." }, { status: 500 });
  }
}
