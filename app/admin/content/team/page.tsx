"use client";

import { useEffect, useState } from "react";
import { Plus, Trash2, Check } from "lucide-react";

interface TeamMember {
  id: string;
  name: string;
  role: string;
  bio: string;
  avatar?: string;
  linkedin?: string;
  twitter?: string;
}

const defaultMember = (): TeamMember => ({
  id: `member_${Date.now()}_${Math.random().toString(36).slice(2, 6)}`,
  name: "",
  role: "",
  bio: "",
});

export default function TeamPage() {
  const [members, setMembers] = useState<TeamMember[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    fetch("/api/admin/content/team")
      .then((r) => r.json())
      .then((data) => {
        if (data?.data && Array.isArray(data.data)) setMembers(data.data);
        setLoading(false);
      });
  }, []);

  const save = async () => {
    setSaving(true);
    await fetch("/api/admin/content/team", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ data: members }),
    });
    setSaving(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const update = (id: string, field: keyof TeamMember, value: string) =>
    setMembers((prev) => prev.map((m) => (m.id === id ? { ...m, [field]: value } : m)));

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
        <p className="text-sm text-[var(--text-muted)]">Manage team members shown on the About page.</p>
        <div className="flex gap-3">
          <button
            onClick={() => setMembers((m) => [...m, defaultMember()])}
            className="flex items-center gap-2 text-sm px-4 py-2 rounded-xl border border-[var(--border)] text-[var(--text-secondary)] hover:border-[var(--brand)] hover:text-[var(--brand)] transition-colors"
          >
            <Plus className="w-4 h-4" /> Add member
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
        {members.map((member) => (
          <div key={member.id} className="bg-[var(--surface)] border border-[var(--border)] rounded-2xl p-5 space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-[var(--text-primary)]">{member.name || "New member"}</span>
              <button onClick={() => setMembers((m) => m.filter((x) => x.id !== member.id))} className="text-red-400 hover:text-red-600">
                <Trash2 className="w-4 h-4" />
              </button>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-medium text-[var(--text-muted)] mb-1.5">Full name</label>
                <input
                  value={member.name}
                  onChange={(e) => update(member.id, "name", e.target.value)}
                  placeholder="Alex Chen"
                  className="input-field text-sm w-full"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-[var(--text-muted)] mb-1.5">Role / Title</label>
                <input
                  value={member.role}
                  onChange={(e) => update(member.id, "role", e.target.value)}
                  placeholder="Co-founder & CEO"
                  className="input-field text-sm w-full"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-medium text-[var(--text-muted)] mb-1.5">Bio</label>
              <textarea
                value={member.bio}
                onChange={(e) => update(member.id, "bio", e.target.value)}
                placeholder="Brief bio about this team member..."
                rows={2}
                className="input-field text-sm w-full resize-none"
              />
            </div>

            <div className="grid grid-cols-3 gap-3">
              <div>
                <label className="block text-xs font-medium text-[var(--text-muted)] mb-1.5">Avatar URL</label>
                <input
                  value={member.avatar || ""}
                  onChange={(e) => update(member.id, "avatar", e.target.value)}
                  placeholder="https://..."
                  className="input-field text-sm w-full"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-[var(--text-muted)] mb-1.5">LinkedIn URL</label>
                <input
                  value={member.linkedin || ""}
                  onChange={(e) => update(member.id, "linkedin", e.target.value)}
                  placeholder="https://linkedin.com/in/..."
                  className="input-field text-sm w-full"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-[var(--text-muted)] mb-1.5">Twitter/X URL</label>
                <input
                  value={member.twitter || ""}
                  onChange={(e) => update(member.id, "twitter", e.target.value)}
                  placeholder="https://x.com/..."
                  className="input-field text-sm w-full"
                />
              </div>
            </div>
          </div>
        ))}
      </div>

      {members.length === 0 && (
        <div className="py-16 text-center text-[var(--text-muted)] text-sm border border-dashed border-[var(--border)] rounded-2xl">
          No team members yet. Click "Add member" to create one.
        </div>
      )}
    </div>
  );
}
