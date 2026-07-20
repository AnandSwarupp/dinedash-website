"use client";

import { useEffect, useState } from "react";
import { Plus, Trash2, Check } from "lucide-react";

interface Testimonial {
  id: string;
  name: string;
  role: string;
  restaurant: string;
  text: string;
  rating: number;
  avatar?: string;
}

const defaultTestimonial = (): Testimonial => ({
  id: `t_${Date.now()}_${Math.random().toString(36).slice(2, 6)}`,
  name: "",
  role: "",
  restaurant: "",
  text: "",
  rating: 5,
});

export default function TestimonialsPage() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    fetch("/api/admin/content/testimonials")
      .then((r) => r.json())
      .then((data) => {
        if (data?.data && Array.isArray(data.data)) setTestimonials(data.data);
        setLoading(false);
      });
  }, []);

  const save = async () => {
    setSaving(true);
    await fetch("/api/admin/content/testimonials", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ data: testimonials }),
    });
    setSaving(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const update = (id: string, field: keyof Testimonial, value: string | number) =>
    setTestimonials((prev) => prev.map((t) => (t.id === id ? { ...t, [field]: value } : t)));

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="w-6 h-6 border-2 border-[var(--brand)] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="space-y-5 max-w-3xl mx-auto">
      <div className="flex items-center justify-between">
        <p className="text-sm text-[var(--text-muted)]">Manage customer testimonials.</p>
        <div className="flex gap-3">
          <button
            onClick={() => setTestimonials((t) => [...t, defaultTestimonial()])}
            className="flex items-center gap-2 text-sm px-4 py-2 rounded-xl border border-[var(--border)] text-[var(--text-secondary)] hover:border-[var(--brand)] hover:text-[var(--brand)] transition-colors"
          >
            <Plus className="w-4 h-4" /> Add testimonial
          </button>
          <button
            onClick={save}
            disabled={saving}
            className="btn-primary px-5 py-2 text-sm flex items-center gap-2 disabled:opacity-60"
          >
            {saved ? <><Check className="w-4 h-4" /> Saved</> : saving ? "Saving..." : "Save changes"}
          </button>
        </div>
      </div>

      <div className="space-y-4">
        {testimonials.map((t) => (
          <div key={t.id} className="bg-[var(--surface)] border border-[var(--border)] rounded-2xl p-5 space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    onClick={() => update(t.id, "rating", star)}
                    className={`text-lg ${star <= t.rating ? "text-amber-400" : "text-[var(--border)]"}`}
                  >
                    ★
                  </button>
                ))}
              </div>
              <button onClick={() => setTestimonials((prev) => prev.filter((x) => x.id !== t.id))} className="text-red-400 hover:text-red-600">
                <Trash2 className="w-4 h-4" />
              </button>
            </div>

            <div>
              <label className="block text-xs font-medium text-[var(--text-muted)] mb-1.5">Testimonial text</label>
              <textarea
                value={t.text}
                onChange={(e) => update(t.id, "text", e.target.value)}
                placeholder="Our restaurant has seen amazing results..."
                rows={3}
                className="input-field text-sm w-full resize-none"
              />
            </div>

            <div className="grid grid-cols-3 gap-3">
              <div>
                <label className="block text-xs font-medium text-[var(--text-muted)] mb-1.5">Name</label>
                <input
                  value={t.name}
                  onChange={(e) => update(t.id, "name", e.target.value)}
                  placeholder="Sarah Johnson"
                  className="input-field text-sm w-full"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-[var(--text-muted)] mb-1.5">Role</label>
                <input
                  value={t.role}
                  onChange={(e) => update(t.id, "role", e.target.value)}
                  placeholder="Owner"
                  className="input-field text-sm w-full"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-[var(--text-muted)] mb-1.5">Restaurant</label>
                <input
                  value={t.restaurant}
                  onChange={(e) => update(t.id, "restaurant", e.target.value)}
                  placeholder="The Cosy Kitchen"
                  className="input-field text-sm w-full"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-medium text-[var(--text-muted)] mb-1.5">Avatar URL (optional)</label>
              <input
                value={t.avatar || ""}
                onChange={(e) => update(t.id, "avatar", e.target.value)}
                placeholder="https://..."
                className="input-field text-sm w-full"
              />
            </div>
          </div>
        ))}
      </div>

      {testimonials.length === 0 && (
        <div className="py-16 text-center text-[var(--text-muted)] text-sm border border-dashed border-[var(--border)] rounded-2xl">
          No testimonials yet. Click "Add testimonial" to create one.
        </div>
      )}
    </div>
  );
}
