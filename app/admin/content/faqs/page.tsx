"use client";

import { useEffect, useState } from "react";
import { Plus, Trash2, Check, GripVertical } from "lucide-react";

interface FAQ {
  id: string;
  question: string;
  answer: string;
}

const defaultFAQ = (): FAQ => ({
  id: `faq_${Date.now()}_${Math.random().toString(36).slice(2, 6)}`,
  question: "",
  answer: "",
});

export default function FAQsPage() {
  const [faqs, setFaqs] = useState<FAQ[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    fetch("/api/admin/content/faqs")
      .then((r) => r.json())
      .then((data) => {
        if (data?.data && Array.isArray(data.data)) setFaqs(data.data);
        setLoading(false);
      });
  }, []);

  const save = async () => {
    setSaving(true);
    await fetch("/api/admin/content/faqs", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ data: faqs }),
    });
    setSaving(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const update = (id: string, field: keyof FAQ, value: string) =>
    setFaqs((prev) => prev.map((f) => (f.id === id ? { ...f, [field]: value } : f)));

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="w-6 h-6 border-2 border-[var(--brand)] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="space-y-5 max-w-3xl">
      <div className="flex items-center justify-between">
        <p className="text-sm text-[var(--text-muted)]">Manage frequently asked questions.</p>
        <div className="flex gap-3">
          <button
            onClick={() => setFaqs((f) => [...f, defaultFAQ()])}
            className="flex items-center gap-2 text-sm px-4 py-2 rounded-xl border border-[var(--border)] text-[var(--text-secondary)] hover:border-[var(--brand)] hover:text-[var(--brand)] transition-colors"
          >
            <Plus className="w-4 h-4" /> Add FAQ
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

      <div className="space-y-3">
        {faqs.map((faq, idx) => (
          <div key={faq.id} className="bg-[var(--surface)] border border-[var(--border)] rounded-2xl p-5 flex gap-3">
            <GripVertical className="w-5 h-5 text-[var(--text-muted)] mt-1 flex-shrink-0" />
            <div className="flex-1 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-medium text-[var(--text-muted)]">FAQ {idx + 1}</span>
                <button onClick={() => setFaqs((f) => f.filter((x) => x.id !== faq.id))} className="text-red-400 hover:text-red-600">
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
              <div>
                <label className="block text-xs font-medium text-[var(--text-muted)] mb-1.5">Question</label>
                <input
                  value={faq.question}
                  onChange={(e) => update(faq.id, "question", e.target.value)}
                  placeholder="What is DineDash?"
                  className="input-field text-sm w-full"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-[var(--text-muted)] mb-1.5">Answer</label>
                <textarea
                  value={faq.answer}
                  onChange={(e) => update(faq.id, "answer", e.target.value)}
                  placeholder="DineDash is a..."
                  rows={3}
                  className="input-field text-sm w-full resize-none"
                />
              </div>
            </div>
          </div>
        ))}
      </div>

      {faqs.length === 0 && (
        <div className="py-16 text-center text-[var(--text-muted)] text-sm border border-dashed border-[var(--border)] rounded-2xl">
          No FAQs yet. Click "Add FAQ" to create one.
        </div>
      )}
    </div>
  );
}
