"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import BlogEditor, { BlogFormData } from "../_components/BlogEditor";

export default function EditBlogPage() {
  const { slug } = useParams<{ slug: string }>();
  const [initial, setInitial] = useState<Partial<BlogFormData> | null>(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    fetch(`/api/admin/blogs/${slug}`)
      .then((r) => r.json())
      .then((data) => {
        if (!data.post) { setNotFound(true); setLoading(false); return; }
        const p = data.post;
        setInitial({
          title: p.title,
          excerpt: p.excerpt,
          content: p.content,
          author: p.author,
          authorRole: p.authorRole || "",
          category: p.category,
          tags: (p.tags || []).join(", "),
          coverImage: p.coverImage || "",
          status: p.status,
        });
        setLoading(false);
      });
  }, [slug]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="w-6 h-6 border-2 border-[var(--brand)] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (notFound) {
    return <div className="text-[var(--text-muted)] text-sm">Post not found.</div>;
  }

  return <BlogEditor slug={slug} initial={initial!} />;
}
