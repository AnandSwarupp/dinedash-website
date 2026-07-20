"use client";

import { useEffect, useState } from "react";
import { Plus, Trash2, GripVertical, Check } from "lucide-react";

interface PricingPlan {
  id: string;
  name: string;
  price: string;
  period: string;
  description: string;
  features: string[];
  highlighted: boolean;
  badge?: string;
  cta: string;
}

const defaultPlan = (): PricingPlan => ({
  id: `plan_${Date.now()}`,
  name: "",
  price: "",
  period: "/month",
  description: "",
  features: [""],
  highlighted: false,
  badge: "",
  cta: "Get started",
});

export default function PricingPage() {
  const [plans, setPlans] = useState<PricingPlan[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    fetch("/api/admin/content/pricing")
      .then((r) => r.json())
      .then((data) => {
        if (data?.data && Array.isArray(data.data))
          setPlans(data.data.map((p: PricingPlan) => ({ ...p, id: p.id || `plan_${Date.now()}_${Math.random()}` })));
        setLoading(false);
      });
  }, []);

  const save = async () => {
    setSaving(true);
    await fetch("/api/admin/content/pricing", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ data: plans }),
    });
    setSaving(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const updatePlan = (id: string, field: keyof PricingPlan, value: unknown) =>
    setPlans((prev) => prev.map((p) => (p.id === id ? { ...p, [field]: value } : p)));

  const updateFeature = (planId: string, idx: number, val: string) =>
    setPlans((prev) =>
      prev.map((p) =>
        p.id === planId
          ? { ...p, features: p.features.map((f, i) => (i === idx ? val : f)) }
          : p
      )
    );

  const addFeature = (planId: string) =>
    setPlans((prev) =>
      prev.map((p) => (p.id === planId ? { ...p, features: [...p.features, ""] } : p))
    );

  const removeFeature = async (planId: string, idx: number) => {
    const updated = plans.map((p) =>
      p.id === planId ? { ...p, features: p.features.filter((_, i) => i !== idx) } : p
    );
    setPlans(updated);
    await fetch("/api/admin/content/pricing", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ data: updated }),
    });
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="w-6 h-6 border-2 border-[var(--brand)] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="space-y-5 max-w-4xl mx-auto">
      <div className="flex items-center justify-between">
        <p className="text-sm text-[var(--text-muted)]">Edit pricing plans shown on the website.</p>
        <div className="flex gap-3">
          <button
            onClick={() => setPlans((p) => [...p, defaultPlan()])}
            className="flex items-center gap-2 text-sm px-4 py-2 rounded-xl border border-[var(--border)] text-[var(--text-secondary)] hover:border-[var(--brand)] hover:text-[var(--brand)] transition-colors"
          >
            <Plus className="w-4 h-4" /> Add plan
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
        {plans.map((plan) => (
          <div key={plan.id} className="bg-[var(--surface)] border border-[var(--border)] rounded-2xl p-5 space-y-4">
            <div className="flex items-start gap-3">
              <GripVertical className="w-5 h-5 text-[var(--text-muted)] mt-2 flex-shrink-0" />
              <div className="flex-1 grid grid-cols-2 md:grid-cols-4 gap-3">
                <div>
                  <label className="block text-xs font-medium text-[var(--text-muted)] mb-1.5">Plan name</label>
                  <input
                    value={plan.name}
                    onChange={(e) => updatePlan(plan.id, "name", e.target.value)}
                    placeholder="Starter"
                    className="input-field text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-[var(--text-muted)] mb-1.5">Price</label>
                  <input
                    value={plan.price}
                    onChange={(e) => updatePlan(plan.id, "price", e.target.value)}
                    placeholder="£49"
                    className="input-field text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-[var(--text-muted)] mb-1.5">Period</label>
                  <input
                    value={plan.period}
                    onChange={(e) => updatePlan(plan.id, "period", e.target.value)}
                    placeholder="/month"
                    className="input-field text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-[var(--text-muted)] mb-1.5">CTA button text</label>
                  <input
                    value={plan.cta}
                    onChange={(e) => updatePlan(plan.id, "cta", e.target.value)}
                    placeholder="Get started"
                    className="input-field text-sm"
                  />
                </div>
              </div>
              <button
                type="button"
                onClick={async () => {
                  const updated = plans.filter((x) => x.id !== plan.id);
                  setPlans(updated);
                  await fetch("/api/admin/content/pricing", {
                    method: "PUT",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ data: updated }),
                  });
                }}
                className="text-red-400 hover:text-red-600 mt-1"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>

            <div className="ml-8 grid grid-cols-1 md:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-medium text-[var(--text-muted)] mb-1.5">Description</label>
                <input
                  value={plan.description}
                  onChange={(e) => updatePlan(plan.id, "description", e.target.value)}
                  placeholder="Perfect for small restaurants..."
                  className="input-field text-sm w-full"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-[var(--text-muted)] mb-1.5">Badge (optional)</label>
                <input
                  value={plan.badge || ""}
                  onChange={(e) => updatePlan(plan.id, "badge", e.target.value)}
                  placeholder="Most popular"
                  className="input-field text-sm w-full"
                />
              </div>
            </div>

            <div className="ml-8">
              <label className="block text-xs font-medium text-[var(--text-muted)] mb-2">Features</label>
              <div className="space-y-2">
                {plan.features.map((f, idx) => (
                  <div key={idx} className="flex gap-2">
                    <input
                      value={f}
                      onChange={(e) => updateFeature(plan.id, idx, e.target.value)}
                      placeholder="Feature description..."
                      className="input-field text-sm flex-1"
                    />
                    <button onClick={() => removeFeature(plan.id, idx)} className="text-red-400 hover:text-red-600 px-2">
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))}
                <button
                  onClick={() => addFeature(plan.id)}
                  className="text-xs text-[var(--brand)] hover:underline flex items-center gap-1"
                >
                  <Plus className="w-3.5 h-3.5" /> Add feature
                </button>
              </div>
            </div>

            <div className="ml-8">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={plan.highlighted}
                  onChange={(e) => updatePlan(plan.id, "highlighted", e.target.checked)}
                  className="w-4 h-4 accent-[var(--brand)]"
                />
                <span className="text-sm text-[var(--text-secondary)]">Highlighted plan (shown prominently)</span>
              </label>
            </div>
          </div>
        ))}
      </div>

      {plans.length === 0 && (
        <div className="py-16 text-center text-[var(--text-muted)] text-sm border border-dashed border-[var(--border)] rounded-2xl">
          No plans yet. Click "Add plan" to create one.
        </div>
      )}
    </div>
  );
}
