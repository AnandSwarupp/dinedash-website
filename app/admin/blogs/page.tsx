"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Plus, Pencil, Trash2, Eye, EyeOff, Clock, Tag } from "lucide-react";

interface BlogPost {
  _id: string;
  slug: string;
  title: string;
  excerpt: string;
  author: string;
  category: string;
  status: "draft" | "published";
  readingTime?: number;
  publishedAt?: string;
  createdAt?: string;
}

const STATUS_COLORS = {
  published: "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400",
  draft: "bg-[var(--surface-alt)] text-[var(--text-muted)]",
};

export default function BlogsAdminPage() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState<string | null>(null);

  useEffect(() => {
    fetch("/api/admin/blogs")
      .then((r) => r.json())
      .then((data) => {
        if (data?.posts) setPosts(data.posts);
        setLoading(false);
      });
  }, []);

  const handleDelete = async (slug: string) => {
    if (!confirm("Delete this post? This cannot be undone.")) return;
    setDeleting(slug);
    await fetch(`/api/admin/blogs/${slug}`, { method: "DELETE" });
    setPosts((p) => p.filter((x) => x.slug !== slug));
    setDeleting(null);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="w-6 h-6 border-2 border-[var(--brand)] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="space-y-5 max-w-5xl mx-auto">
      <div className="flex items-center justify-between">
        <p className="text-sm text-[var(--text-muted)]">{posts.length} post{posts.length !== 1 ? "s" : ""} total</p>
        <Link
          href="/admin/blogs/new"
          className="btn-primary px-5 py-2 text-sm flex items-center gap-2"
        >
          <Plus className="w-4 h-4" /> New post
        </Link>
      </div>

      {posts.length === 0 ? (
        <div className="py-20 text-center border border-dashed border-[var(--border)] rounded-2xl">
          <div className="text-4xl mb-4">✍️</div>
          <p className="text-[var(--text-muted)] text-sm mb-4">No blog posts yet.</p>
          <Link href="/admin/blogs/new" className="btn-primary px-5 py-2 text-sm inline-flex items-center gap-2">
            <Plus className="w-4 h-4" /> Write your first post
          </Link>
        </div>
      ) : (
        <div className="space-y-3">
          {posts.map((post) => (
            <div
              key={post._id}
              className="bg-[var(--surface)] border border-[var(--border)] rounded-2xl p-5 flex gap-4 items-start"
            >
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1.5 flex-wrap">
                  <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${STATUS_COLORS[post.status]}`}>
                    {post.status === "published" ? <Eye className="w-3 h-3 inline mr-1" /> : <EyeOff className="w-3 h-3 inline mr-1" />}
                    {post.status}
                  </span>
                  <span className="flex items-center gap-1 text-xs text-[var(--text-muted)]">
                    <Tag className="w-3 h-3" /> {post.category}
                  </span>
                  {post.readingTime && (
                    <span className="flex items-center gap-1 text-xs text-[var(--text-muted)]">
                      <Clock className="w-3 h-3" /> {post.readingTime} min read
                    </span>
                  )}
                </div>
                <h3 className="font-semibold text-[var(--text-primary)] text-sm leading-snug mb-1 truncate">
                  {post.title}
                </h3>
                <p className="text-xs text-[var(--text-muted)] line-clamp-2 mb-2">{post.excerpt}</p>
                <p className="text-xs text-[var(--text-muted)]">
                  By {post.author} &middot; {post.publishedAt ? new Date(post.publishedAt).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" }) : "Draft"}
                </p>
              </div>
              <div className="flex items-center gap-2 flex-shrink-0">
                {post.status === "published" && (
                  <Link
                    href={`/blog/${post.slug}`}
                    target="_blank"
                    className="p-2 rounded-xl border border-[var(--border)] text-[var(--text-muted)] hover:text-[var(--brand)] hover:border-[var(--brand)] transition-colors"
                    title="View live"
                  >
                    <Eye className="w-4 h-4" />
                  </Link>
                )}
                <Link
                  href={`/admin/blogs/${post.slug}`}
                  className="p-2 rounded-xl border border-[var(--border)] text-[var(--text-muted)] hover:text-[var(--brand)] hover:border-[var(--brand)] transition-colors"
                  title="Edit"
                >
                  <Pencil className="w-4 h-4" />
                </Link>
                <button
                  onClick={() => handleDelete(post.slug)}
                  disabled={deleting === post.slug}
                  className="p-2 rounded-xl border border-[var(--border)] text-[var(--text-muted)] hover:text-red-500 hover:border-red-400 transition-colors disabled:opacity-50"
                  title="Delete"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
