"use client";

import { useEffect, useState } from "react";
import { Plus, Trash2, Check } from "lucide-react";

interface DiscountTier {
  id: string;
  label: string;
  time: string;
  discount: string;
  description: string;
}

const defaultTier = (): DiscountTier => ({
  id: `tier_${Date.now()}`,
  label: "",
  time: "",
  discount: "",
  description: "",
});

export default function TiersPage() {
  const [tiers, setTiers] = useState<DiscountTier[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    fetch("/api/admin/content/tiers")
      .then((r) => r.json())
      .then((data) => {
        if (data?.data && Array.isArray(data.data)) setTiers(data.data);
        setLoading(false);
      });
  }, []);

  const save = async () => {
    setSaving(true);
    await fetch("/api/admin/content/tiers", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ data: tiers }),
    });
    setSaving(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const update = (id: string, field: keyof DiscountTier, value: string) =>
    setTiers((prev) => prev.map((t) => (t.id === id ? { ...t, [field]: value } : t)));

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="w-6 h-6 border-2 border-[var(--brand)] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="space-y-5 max-w-2xl">
      <div className="flex items-center justify-between">
        <p className="text-sm text-[var(--text-muted)]">Configure delivery time discount tiers.</p>
        <div className="flex gap-3">
          <button
            onClick={() => setTiers((t) => [...t, defaultTier()])}
            className="flex items-center gap-2 text-sm px-4 py-2 rounded-xl border border-[var(--border)] text-[var(--text-secondary)] hover:border-[var(--brand)] hover:text-[var(--brand)] transition-colors"
          >
            <Plus className="w-4 h-4" /> Add tier
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
        {tiers.map((tier, idx) => (
          <div key={tier.id} className="bg-[var(--surface)] border border-[var(--border)] rounded-2xl p-5">
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-medium text-[var(--text-muted)]">Tier {idx + 1}</span>
              <button onClick={() => setTiers((t) => t.filter((x) => x.id !== tier.id))} className="text-red-400 hover:text-red-600">
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-medium text-[var(--text-muted)] mb-1.5">Label (e.g. "Under 15 min")</label>
                <input
                  value={tier.label}
                  onChange={(e) => update(tier.id, "label", e.target.value)}
                  placeholder="Under 15 min"
                  className="input-field text-sm w-full"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-[var(--text-muted)] mb-1.5">Time value (e.g. "&lt; 15 min")</label>
                <input
                  value={tier.time}
                  onChange={(e) => update(tier.id, "time", e.target.value)}
                  placeholder="< 15 min"
                  className="input-field text-sm w-full"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-[var(--text-muted)] mb-1.5">Discount %</label>
                <input
                  value={tier.discount}
                  onChange={(e) => update(tier.id, "discount", e.target.value)}
                  placeholder="30%"
                  className="input-field text-sm w-full"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-[var(--text-muted)] mb-1.5">Description</label>
                <input
                  value={tier.description}
                  onChange={(e) => update(tier.id, "description", e.target.value)}
                  placeholder="Lightning fast delivery"
                  className="input-field text-sm w-full"
                />
              </div>
            </div>
          </div>
        ))}
      </div>

      {tiers.length === 0 && (
        <div className="py-16 text-center text-[var(--text-muted)] text-sm border border-dashed border-[var(--border)] rounded-2xl">
          No tiers yet. Click "Add tier" to create one.
        </div>
      )}
    </div>
  );
}
