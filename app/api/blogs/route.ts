import { NextResponse } from "next/server";
import { eq, desc } from "drizzle-orm";
import { db } from "@/lib/db";
import { blogs } from "@/lib/db/schema";

export async function GET() {
  try {
    const posts = await db
      .select({
        slug: blogs.slug,
        title: blogs.title,
        excerpt: blogs.excerpt,
        author: blogs.author,
        authorRole: blogs.authorRole,
        category: blogs.category,
        tags: blogs.tags,
        coverImage: blogs.coverImage,
        readingTime: blogs.readingTime,
        publishedAt: blogs.publishedAt,
      })
      .from(blogs)
      .where(eq(blogs.status, "published"))
      .orderBy(desc(blogs.publishedAt));
    return NextResponse.json({ posts });
  } catch {
    return NextResponse.json({ error: "Failed to fetch posts." }, { status: 500 });
  }
}
