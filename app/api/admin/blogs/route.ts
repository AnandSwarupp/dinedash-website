import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import { Blog } from "@/lib/models/Blog";
import { getAdminSession } from "@/lib/auth";

function slugify(text: string) {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

function estimateReadingTime(content: string) {
  const words = content.trim().split(/\s+/).length;
  return Math.max(1, Math.ceil(words / 200));
}

export async function GET() {
  if (!(await getAdminSession())) {
    return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  }
  try {
    await connectDB();
    const posts = await Blog.find({}).sort({ createdAt: -1 }).lean();
    return NextResponse.json({ posts });
  } catch {
    return NextResponse.json({ error: "Failed to fetch posts." }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  if (!(await getAdminSession())) {
    return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  }
  try {
    await connectDB();
    const body = await req.json();
    const { title, excerpt, content, author, authorRole, category, tags, coverImage, status } = body;

    if (!title || !excerpt || !content || !author || !category) {
      return NextResponse.json({ error: "Missing required fields." }, { status: 400 });
    }

    let slug = slugify(title);
    const existing = await Blog.findOne({ slug });
    if (existing) slug = `${slug}-${Date.now()}`;

    const post = await Blog.create({
      slug,
      title,
      excerpt,
      content,
      author,
      authorRole: authorRole || "",
      category,
      tags: Array.isArray(tags) ? tags : [],
      coverImage: coverImage || "",
      status: status || "draft",
      readingTime: estimateReadingTime(content),
      publishedAt: status === "published" ? new Date().toISOString() : undefined,
    });

    return NextResponse.json({ post }, { status: 201 });
  } catch {
    return NextResponse.json({ error: "Failed to create post." }, { status: 500 });
  }
}
