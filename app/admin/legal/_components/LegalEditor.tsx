"use client";

import { useEffect, useState } from "react";
import { Check, Plus, Trash2, GripVertical, ExternalLink } from "lucide-react";

export interface LegalSection {
  id: string;
  heading: string;
  body: string;
}

interface LegalEditorProps {
  section: "privacy-policy" | "terms-of-service" | "cookie-policy";
  title: string;
  publicPath: string;
}

const defaultSection = (): LegalSection => ({
  id: `sec_${Date.now()}_${Math.random().toString(36).slice(2, 6)}`,
  heading: "",
  body: "",
});

export default function LegalEditor({ section, title, publicPath }: LegalEditorProps) {
  const [intro, setIntro] = useState("");
  const [updated, setUpdated] = useState(new Date().toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" }));
  const [sections, setSections] = useState<LegalSection[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    fetch(`/api/admin/content/${section}`)
      .then((r) => r.json())
      .then((data) => {
        if (data?.data && typeof data.data === "object") {
          const d = data.data as { intro?: string; updated?: string; sections?: LegalSection[] };
          if (d.intro) setIntro(d.intro);
          if (d.updated) setUpdated(d.updated);
          if (Array.isArray(d.sections)) setSections(d.sections);
        }
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [section]);

  const save = async () => {
    setSaving(true);
    await fetch(`/api/admin/content/${section}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ data: { intro, updated, sections } }),
    });
    setSaving(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const updateSection = (id: string, field: keyof LegalSection, value: string) =>
    setSections((prev) => prev.map((s) => (s.id === id ? { ...s, [field]: value } : s)));

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="w-6 h-6 border-2 border-[var(--brand)] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="space-y-5 max-w-3xl mx-auto">
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div className="flex items-center gap-3">
          <a
            href={publicPath}
            target="_blank"
            className="flex items-center gap-1.5 text-sm text-[var(--text-muted)] hover:text-[var(--brand)] transition-colors"
          >
            <ExternalLink className="w-4 h-4" /> View live page
          </a>
        </div>
        <div className="flex gap-3">
          <button
            onClick={() => setSections((s) => [...s, defaultSection()])}
            className="flex items-center gap-2 text-sm px-4 py-2 rounded-xl border border-[var(--border)] text-[var(--text-secondary)] hover:border-[var(--brand)] hover:text-[var(--brand)] transition-colors"
          >
            <Plus className="w-4 h-4" /> Add section
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

      {/* Page meta */}
      <div className="bg-[var(--surface)] border border-[var(--border)] rounded-2xl p-5 space-y-4">
        <h3 className="font-semibold text-sm text-[var(--text-primary)]">Page header</h3>
        <div>
          <label className="block text-xs font-medium text-[var(--text-muted)] mb-1.5">Last updated date</label>
          <input
            value={updated}
            onChange={(e) => setUpdated(e.target.value)}
            placeholder="17 June 2026"
            className="input-field text-sm w-full"
          />
        </div>
        <div>
          <label className="block text-xs font-medium text-[var(--text-muted)] mb-1.5">Introduction paragraph</label>
          <textarea
            value={intro}
            onChange={(e) => setIntro(e.target.value)}
            placeholder={`This ${title} explains how DineDash handles...`}
            rows={3}
            className="input-field text-sm w-full resize-none"
          />
        </div>
      </div>

      {/* Sections */}
      <div className="space-y-3">
        {sections.map((sec, idx) => (
          <div key={sec.id} className="bg-[var(--surface)] border border-[var(--border)] rounded-2xl p-5 flex gap-3">
            <GripVertical className="w-5 h-5 text-[var(--text-muted)] mt-1 flex-shrink-0" />
            <div className="flex-1 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-medium text-[var(--text-muted)]">Section {idx + 1}</span>
                <button
                  onClick={() => setSections((s) => s.filter((x) => x.id !== sec.id))}
                  className="text-red-400 hover:text-red-600 transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
              <div>
                <label className="block text-xs font-medium text-[var(--text-muted)] mb-1.5">Heading</label>
                <input
                  value={sec.heading}
                  onChange={(e) => updateSection(sec.id, "heading", e.target.value)}
                  placeholder="1. Information we collect"
                  className="input-field text-sm w-full"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-[var(--text-muted)] mb-1.5">Body (separate paragraphs with a blank line)</label>
                <textarea
                  value={sec.body}
                  onChange={(e) => updateSection(sec.id, "body", e.target.value)}
                  placeholder="Write the section content here..."
                  rows={5}
                  className="input-field text-sm w-full resize-y"
                />
              </div>
            </div>
          </div>
        ))}
      </div>

      {sections.length === 0 && (
        <div className="py-14 text-center text-[var(--text-muted)] text-sm border border-dashed border-[var(--border)] rounded-2xl">
          No sections yet. Click &quot;Add section&quot; to start building this page.
        </div>
      )}
    </div>
  );
}
