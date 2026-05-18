"use client";

import { useEffect, useState, useCallback } from "react";
import { Search, Trash2, ChevronDown } from "lucide-react";

interface Contact {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  restaurantName?: string;
  phone?: string;
  status: string;
  createdAt: string;
}

const STATUS_OPTIONS = ["new", "read", "replied"];

const statusColors: Record<string, string> = {
  new: "bg-[var(--brand-light)] text-[var(--brand)]",
  read: "bg-slate-100 dark:bg-slate-700/50 text-slate-600 dark:text-slate-300",
  replied: "bg-purple-100 dark:bg-purple-500/10 text-purple-600 dark:text-purple-400",
};

export default function ContactsPage() {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState("");
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [updating, setUpdating] = useState<string | null>(null);

  const load = useCallback(async () => {
    setLoading(true);
    const params = new URLSearchParams();
    if (search) params.set("search", search);
    if (filterStatus) params.set("status", filterStatus);
    const res = await fetch(`/api/admin/contacts?${params}`);
    const data = await res.json();
    setContacts(data.contacts || []);
    setTotal(data.total || 0);
    setLoading(false);
  }, [search, filterStatus]);

  useEffect(() => {
    const t = setTimeout(load, 300);
    return () => clearTimeout(t);
  }, [load]);

  const updateStatus = async (id: string, status: string) => {
    setUpdating(id);
    await fetch(`/api/admin/contacts/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status }),
    });
    setContacts((prev) => prev.map((c) => (c.id === id ? { ...c, status } : c)));
    setUpdating(null);
  };

  const deleteContact = async (id: string) => {
    if (!confirm("Delete this message?")) return;
    await fetch(`/api/admin/contacts/${id}`, { method: "DELETE" });
    setContacts((prev) => prev.filter((c) => c.id !== id));
    setTotal((t) => t - 1);
  };

  return (
    <div className="space-y-5">
      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--text-muted)]" />
          <input
            type="text"
            placeholder="Search names, emails or subjects..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2.5 text-sm border border-[var(--border)] rounded-xl bg-[var(--surface)] text-[var(--text-primary)] placeholder:text-[var(--text-muted)] focus:outline-none focus:ring-2 focus:ring-[var(--brand)]"
          />
        </div>
        <select
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
          className="px-3 py-2.5 text-sm border border-[var(--border)] rounded-xl bg-[var(--surface)] text-[var(--text-primary)] focus:outline-none focus:ring-2 focus:ring-[var(--brand)]"
        >
          <option value="">All statuses</option>
          {STATUS_OPTIONS.map((s) => <option key={s} value={s}>{s}</option>)}
        </select>
      </div>

      {/* Table */}
      <div className="bg-[var(--surface)] border border-[var(--border)] rounded-2xl overflow-hidden">
        <div className="px-5 py-3.5 border-b border-[var(--border)]">
          <span className="text-sm font-medium text-[var(--text-secondary)]">
            {loading ? "Loading..." : `${total} message${total !== 1 ? "s" : ""}`}
          </span>
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-16">
            <div className="w-6 h-6 border-2 border-[var(--brand)] border-t-transparent rounded-full animate-spin" />
          </div>
        ) : contacts.length === 0 ? (
          <div className="py-16 text-center text-[var(--text-muted)] text-sm">No messages found.</div>
        ) : (
          <div className="divide-y divide-[var(--border)]">
            {contacts.map((c) => (
              <div key={c.id}>
                <div
                  className="px-5 py-4 flex items-center gap-4 cursor-pointer hover:bg-[var(--surface-alt)] transition-colors"
                  onClick={() => {
                    setExpandedId(expandedId === c.id ? null : c.id);
                    if (expandedId !== c.id && c.status === "new") updateStatus(c.id, "read");
                  }}
                >
                  <div className="flex-1 min-w-0">
                    <div className="font-medium text-sm text-[var(--text-primary)] truncate">{c.name}</div>
                    <div className="text-xs text-[var(--text-muted)] truncate">{c.subject}</div>
                  </div>
                  <div className="hidden sm:flex items-center gap-2 flex-shrink-0">
                    <span className={`text-xs px-2 py-0.5 rounded-full font-medium capitalize ${statusColors[c.status] || statusColors.new}`}>{c.status}</span>
                  </div>
                  <div className="text-xs text-[var(--text-muted)] flex-shrink-0 hidden md:block">
                    {new Date(c.createdAt).toLocaleDateString()}
                  </div>
                  <ChevronDown className={`w-4 h-4 text-[var(--text-muted)] flex-shrink-0 transition-transform ${expandedId === c.id ? "rotate-180" : ""}`} />
                </div>

                {expandedId === c.id && (
                  <div className="px-5 pb-5 bg-[var(--surface-alt)] border-t border-[var(--border)] space-y-4">
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4 pt-4">
                      <div>
                        <div className="text-xs text-[var(--text-muted)] mb-1">Email</div>
                        <a href={`mailto:${c.email}`} className="text-sm text-[var(--brand)] hover:underline">{c.email}</a>
                      </div>
                      {c.phone && (
                        <div>
                          <div className="text-xs text-[var(--text-muted)] mb-1">Phone</div>
                          <div className="text-sm text-[var(--text-primary)]">{c.phone}</div>
                        </div>
                      )}
                      {c.restaurantName && (
                        <div>
                          <div className="text-xs text-[var(--text-muted)] mb-1">Restaurant</div>
                          <div className="text-sm text-[var(--text-primary)]">{c.restaurantName}</div>
                        </div>
                      )}
                      <div>
                        <div className="text-xs text-[var(--text-muted)] mb-1">Received</div>
                        <div className="text-sm text-[var(--text-primary)]">{new Date(c.createdAt).toLocaleString()}</div>
                      </div>
                    </div>
                    <div>
                      <div className="text-xs text-[var(--text-muted)] mb-1">Message</div>
                      <div className="text-sm text-[var(--text-primary)] bg-[var(--surface)] border border-[var(--border)] rounded-xl px-4 py-3 whitespace-pre-wrap">{c.message}</div>
                    </div>
                    <div className="flex items-center gap-3 flex-wrap">
                      <div className="text-xs text-[var(--text-muted)] font-medium">Mark as:</div>
                      {STATUS_OPTIONS.map((s) => (
                        <button
                          key={s}
                          disabled={c.status === s || updating === c.id}
                          onClick={() => updateStatus(c.id, s)}
                          className={`text-xs px-3 py-1.5 rounded-lg font-medium capitalize transition-colors ${
                            c.status === s
                              ? `${statusColors[s] || statusColors.new} opacity-100`
                              : "bg-[var(--surface)] border border-[var(--border)] text-[var(--text-secondary)] hover:border-[var(--brand)] hover:text-[var(--brand)]"
                          } disabled:opacity-50`}
                        >
                          {s}
                        </button>
                      ))}
                      <a
                        href={`mailto:${c.email}?subject=Re: ${encodeURIComponent(c.subject)}`}
                        className="text-xs px-3 py-1.5 rounded-lg font-medium bg-[var(--brand-light)] text-[var(--brand)] hover:opacity-80 transition-opacity"
                      >
                        Reply via email
                      </a>
                      <button
                        onClick={() => deleteContact(c.id)}
                        className="ml-auto flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-lg font-medium text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 border border-transparent hover:border-red-200 dark:hover:border-red-700/50 transition-colors"
                      >
                        <Trash2 className="w-3.5 h-3.5" /> Delete
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
