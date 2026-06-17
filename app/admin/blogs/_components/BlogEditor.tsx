"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Check, ArrowLeft, Eye, EyeOff } from "lucide-react";

export interface BlogFormData {
  title: string;
  excerpt: string;
  content: string;
  author: string;
  authorRole: string;
  category: string;
  tags: string;
  coverImage: string;
  status: "draft" | "published";
}

const CATEGORIES = [
  "Operations", "Growth", "Technology", "Customer Experience",
  "Industry News", "Case Study", "Tips & Tricks",
];

const empty: BlogFormData = {
  title: "",
  excerpt: "",
  content: "",
  author: "",
  authorRole: "",
  category: "Operations",
  tags: "",
  coverImage: "",
  status: "draft",
};

export default function BlogEditor({
  slug,
  initial,
}: {
  slug?: string;
  initial?: Partial<BlogFormData>;
}) {
  const router = useRouter();
  const [form, setForm] = useState<BlogFormData>({ ...empty, ...initial });
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState("");
  const [preview, setPreview] = useState(false);

  const set = (field: keyof BlogFormData, value: string) =>
    setForm((f) => ({ ...f, [field]: value }));

  const save = async (statusOverride?: "draft" | "published") => {
    const finalStatus = statusOverride ?? form.status;
    setSaving(true);
    setError("");

    const payload = {
      ...form,
      status: finalStatus,
      tags: form.tags.split(",").map((t) => t.trim()).filter(Boolean),
    };

    const url = slug ? `/api/admin/blogs/${slug}` : "/api/admin/blogs";
    const method = slug ? "PUT" : "POST";

    const res = await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    const data = await res.json();
    if (!res.ok) {
      setError(data.error || "Failed to save.");
      setSaving(false);
      return;
    }

    setSaving(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);

    if (!slug) {
      router.push(`/admin/blogs/${data.post.slug}`);
    }
  };

  const wordCount = form.content.trim().split(/\s+/).filter(Boolean).length;
  const readingTime = Math.max(1, Math.ceil(wordCount / 200));

  return (
    <div className="max-w-4xl space-y-5">
      {/* Toolbar */}
      <div className="flex items-center gap-3 flex-wrap">
        <button
          onClick={() => router.push("/admin/blogs")}
          className="flex items-center gap-1.5 text-sm text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors"
        >
          <ArrowLeft className="w-4 h-4" /> All posts
        </button>
        <div className="flex-1" />
        <button
          onClick={() => setPreview(!preview)}
          className="flex items-center gap-1.5 text-sm px-3 py-2 rounded-xl border border-[var(--border)] text-[var(--text-secondary)] hover:border-[var(--brand)] hover:text-[var(--brand)] transition-colors"
        >
          {preview ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
          {preview ? "Edit" : "Preview"}
        </button>
        <button
          onClick={() => save("draft")}
          disabled={saving}
          className="text-sm px-4 py-2 rounded-xl border border-[var(--border)] text-[var(--text-secondary)] hover:border-[var(--brand)] hover:text-[var(--brand)] transition-colors disabled:opacity-50"
        >
          Save draft
        </button>
        <button
          onClick={() => save("published")}
          disabled={saving}
          className="btn-primary text-sm px-5 py-2 flex items-center gap-2 disabled:opacity-50"
        >
          {saved ? <><Check className="w-4 h-4" /> Published</> : saving ? "Saving..." : "Publish"}
        </button>
      </div>

      {error && (
        <div className="text-sm text-red-500 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl px-4 py-3">
          {error}
        </div>
      )}

      {preview ? (
        <div className="bg-[var(--surface)] border border-[var(--border)] rounded-2xl p-8 prose prose-sm max-w-none">
          <div className="mb-6">
            <span className="text-xs font-semibold text-[var(--brand)] uppercase tracking-wider">{form.category}</span>
            <h1 className="text-3xl font-extrabold text-[var(--text-primary)] mt-2 mb-3">{form.title || "Untitled"}</h1>
            <p className="text-[var(--text-secondary)] text-base">{form.excerpt}</p>
            <div className="flex items-center gap-3 mt-4 text-sm text-[var(--text-muted)]">
              <span>{form.author || "Author"}</span>
              <span>&middot;</span>
              <span>{readingTime} min read</span>
              <span>&middot;</span>
              <span>{wordCount} words</span>
            </div>
          </div>
          <hr className="border-[var(--border)] my-6" />
          <div className="whitespace-pre-wrap text-[var(--text-secondary)] leading-relaxed text-sm">
            {form.content || "No content yet."}
          </div>
        </div>
      ) : (
        <>
          {/* Meta */}
          <div className="bg-[var(--surface)] border border-[var(--border)] rounded-2xl p-5 space-y-4">
            <h3 className="font-semibold text-sm text-[var(--text-primary)]">Post details</h3>
            <div>
              <label className="block text-xs font-medium text-[var(--text-muted)] mb-1.5">Title</label>
              <input
                value={form.title}
                onChange={(e) => set("title", e.target.value)}
                placeholder="How DineDash cut table turnover time by 40%"
                className="input-field text-sm w-full font-semibold"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-[var(--text-muted)] mb-1.5">Excerpt (shown in listing)</label>
              <textarea
                value={form.excerpt}
                onChange={(e) => set("excerpt", e.target.value)}
                placeholder="A short compelling summary readers see before clicking..."
                rows={2}
                className="input-field text-sm w-full resize-none"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-medium text-[var(--text-muted)] mb-1.5">Category</label>
                <select
                  value={form.category}
                  onChange={(e) => set("category", e.target.value)}
                  className="input-field text-sm w-full"
                >
                  {CATEGORIES.map((c) => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-xs font-medium text-[var(--text-muted)] mb-1.5">Tags (comma separated)</label>
                <input
                  value={form.tags}
                  onChange={(e) => set("tags", e.target.value)}
                  placeholder="restaurants, tips, growth"
                  className="input-field text-sm w-full"
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-medium text-[var(--text-muted)] mb-1.5">Author name</label>
                <input
                  value={form.author}
                  onChange={(e) => set("author", e.target.value)}
                  placeholder="Anand Swarup"
                  className="input-field text-sm w-full"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-[var(--text-muted)] mb-1.5">Author role</label>
                <input
                  value={form.authorRole}
                  onChange={(e) => set("authorRole", e.target.value)}
                  placeholder="Founder, DineDash"
                  className="input-field text-sm w-full"
                />
              </div>
            </div>
            <div>
              <label className="block text-xs font-medium text-[var(--text-muted)] mb-1.5">Cover image URL</label>
              {form.coverImage && (
                <div className="mb-2 rounded-xl overflow-hidden border border-[var(--border)] h-40 relative">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={form.coverImage}
                    alt="Cover preview"
                    className="w-full h-full object-cover"
                    onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }}
                    onLoad={(e) => { (e.target as HTMLImageElement).style.display = "block"; }}
                  />
                </div>
              )}
              <input
                value={form.coverImage}
                onChange={(e) => set("coverImage", e.target.value)}
                placeholder="https://images.unsplash.com/..."
                className="input-field text-sm w-full"
              />
            </div>
          </div>

          {/* Content */}
          <div className="bg-[var(--surface)] border border-[var(--border)] rounded-2xl p-5 space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="font-semibold text-sm text-[var(--text-primary)]">Content</h3>
              <span className="text-xs text-[var(--text-muted)]">{wordCount} words &middot; ~{readingTime} min read</span>
            </div>
            <textarea
              value={form.content}
              onChange={(e) => set("content", e.target.value)}
              placeholder="Write your article here. Use plain paragraphs — hit Enter twice for a new paragraph."
              rows={24}
              className="input-field text-sm w-full resize-y font-mono leading-relaxed"
            />
          </div>
        </>
      )}
    </div>
  );
}
