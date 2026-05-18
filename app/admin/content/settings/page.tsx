"use client";

import { useEffect, useState } from "react";
import { Check } from "lucide-react";

interface SiteSettings {
  siteName: string;
  tagline: string;
  email: string;
  phone: string;
  address: string;
  ctaPrimary: string;
  ctaSecondary: string;
  twitterUrl: string;
  linkedinUrl: string;
  instagramUrl: string;
  metaDescription: string;
}

const defaults: SiteSettings = {
  siteName: "DineDash",
  tagline: "Delivery that rewards speed",
  email: "hello@dinedash.app",
  phone: "",
  address: "",
  ctaPrimary: "Get started free",
  ctaSecondary: "See how it works",
  twitterUrl: "",
  linkedinUrl: "",
  instagramUrl: "",
  metaDescription: "DineDash rewards fast delivery with automatic discounts. Restaurants earn loyalty. Customers save more.",
};

export default function SettingsPage() {
  const [settings, setSettings] = useState<SiteSettings>(defaults);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    fetch("/api/admin/content/settings")
      .then((r) => r.json())
      .then((data) => {
        if (data && typeof data === "object") setSettings({ ...defaults, ...data });
        setLoading(false);
      });
  }, []);

  const save = async () => {
    setSaving(true);
    await fetch("/api/admin/content/settings", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(settings),
    });
    setSaving(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const set = (field: keyof SiteSettings, value: string) =>
    setSettings((s) => ({ ...s, [field]: value }));

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="w-6 h-6 border-2 border-[var(--brand)] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="space-y-6 max-w-2xl">
      <div className="flex items-center justify-between">
        <p className="text-sm text-[var(--text-muted)]">Global site settings and contact info.</p>
        <button
          onClick={save}
          disabled={saving}
          className="btn-primary px-5 py-2 text-sm flex items-center gap-2 disabled:opacity-60"
        >
          {saved ? <><Check className="w-4 h-4" /> Saved</> : saving ? "Saving..." : "Save changes"}
        </button>
      </div>

      <section className="bg-[var(--surface)] border border-[var(--border)] rounded-2xl p-5 space-y-4">
        <h3 className="font-semibold text-sm text-[var(--text-primary)]">Brand</h3>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-medium text-[var(--text-muted)] mb-1.5">Site name</label>
            <input value={settings.siteName} onChange={(e) => set("siteName", e.target.value)} className="input-field text-sm w-full" />
          </div>
          <div>
            <label className="block text-xs font-medium text-[var(--text-muted)] mb-1.5">Tagline</label>
            <input value={settings.tagline} onChange={(e) => set("tagline", e.target.value)} className="input-field text-sm w-full" />
          </div>
        </div>
        <div>
          <label className="block text-xs font-medium text-[var(--text-muted)] mb-1.5">Meta description</label>
          <textarea
            value={settings.metaDescription}
            onChange={(e) => set("metaDescription", e.target.value)}
            rows={2}
            className="input-field text-sm w-full resize-none"
          />
        </div>
      </section>

      <section className="bg-[var(--surface)] border border-[var(--border)] rounded-2xl p-5 space-y-4">
        <h3 className="font-semibold text-sm text-[var(--text-primary)]">Contact info</h3>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-medium text-[var(--text-muted)] mb-1.5">Email</label>
            <input value={settings.email} onChange={(e) => set("email", e.target.value)} className="input-field text-sm w-full" />
          </div>
          <div>
            <label className="block text-xs font-medium text-[var(--text-muted)] mb-1.5">Phone</label>
            <input value={settings.phone} onChange={(e) => set("phone", e.target.value)} placeholder="+44 20 1234 5678" className="input-field text-sm w-full" />
          </div>
        </div>
        <div>
          <label className="block text-xs font-medium text-[var(--text-muted)] mb-1.5">Address</label>
          <input value={settings.address} onChange={(e) => set("address", e.target.value)} placeholder="123 Main St, London" className="input-field text-sm w-full" />
        </div>
      </section>

      <section className="bg-[var(--surface)] border border-[var(--border)] rounded-2xl p-5 space-y-4">
        <h3 className="font-semibold text-sm text-[var(--text-primary)]">CTA buttons</h3>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-medium text-[var(--text-muted)] mb-1.5">Primary CTA</label>
            <input value={settings.ctaPrimary} onChange={(e) => set("ctaPrimary", e.target.value)} className="input-field text-sm w-full" />
          </div>
          <div>
            <label className="block text-xs font-medium text-[var(--text-muted)] mb-1.5">Secondary CTA</label>
            <input value={settings.ctaSecondary} onChange={(e) => set("ctaSecondary", e.target.value)} className="input-field text-sm w-full" />
          </div>
        </div>
      </section>

      <section className="bg-[var(--surface)] border border-[var(--border)] rounded-2xl p-5 space-y-4">
        <h3 className="font-semibold text-sm text-[var(--text-primary)]">Social links</h3>
        <div className="space-y-3">
          <div>
            <label className="block text-xs font-medium text-[var(--text-muted)] mb-1.5">Twitter / X</label>
            <input value={settings.twitterUrl} onChange={(e) => set("twitterUrl", e.target.value)} placeholder="https://x.com/dinedash" className="input-field text-sm w-full" />
          </div>
          <div>
            <label className="block text-xs font-medium text-[var(--text-muted)] mb-1.5">LinkedIn</label>
            <input value={settings.linkedinUrl} onChange={(e) => set("linkedinUrl", e.target.value)} placeholder="https://linkedin.com/company/dinedash" className="input-field text-sm w-full" />
          </div>
          <div>
            <label className="block text-xs font-medium text-[var(--text-muted)] mb-1.5">Instagram</label>
            <input value={settings.instagramUrl} onChange={(e) => set("instagramUrl", e.target.value)} placeholder="https://instagram.com/dinedash" className="input-field text-sm w-full" />
          </div>
        </div>
      </section>
    </div>
  );
}
