"use client";

import { useEffect, useState, useCallback } from "react";
import { Search, Trash2, ChevronDown } from "lucide-react";

interface Lead {
  id: string;
  restaurantName: string;
  ownerName: string;
  email: string;
  phone?: string;
  numberOfTables: string;
  plan: string;
  message?: string;
  status: string;
  createdAt: string;
}

const STATUS_OPTIONS = ["new", "contacted", "active", "closed"];
const PLAN_OPTIONS = ["starter", "growth", "enterprise"];

const planColors: Record<string, string> = {
  starter: "bg-slate-100 dark:bg-slate-700/50 text-slate-600 dark:text-slate-300",
  growth: "bg-[var(--brand-light)] text-[var(--brand)]",
  enterprise: "bg-amber-100 dark:bg-amber-500/10 text-amber-600 dark:text-amber-400",
};
const statusColors: Record<string, string> = {
  new: "bg-[var(--brand-light)] text-[var(--brand)]",
  contacted: "bg-blue-100 dark:bg-blue-500/10 text-blue-600 dark:text-blue-400",
  active: "bg-purple-100 dark:bg-purple-500/10 text-purple-600 dark:text-purple-400",
  closed: "bg-[var(--border)] text-[var(--text-muted)]",
};

export default function LeadsPage() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [filterPlan, setFilterPlan] = useState("");
  const [filterStatus, setFilterStatus] = useState("");
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [updating, setUpdating] = useState<string | null>(null);

  const load = useCallback(async () => {
    setLoading(true);
    const params = new URLSearchParams();
    if (search) params.set("search", search);
    if (filterPlan) params.set("plan", filterPlan);
    if (filterStatus) params.set("status", filterStatus);
    const res = await fetch(`/api/admin/leads?${params}`);
    const data = await res.json();
    setLeads(data.leads || []);
    setTotal(data.total || 0);
    setLoading(false);
  }, [search, filterPlan, filterStatus]);

  useEffect(() => {
    const t = setTimeout(load, 300);
    return () => clearTimeout(t);
  }, [load]);

  const updateStatus = async (id: string, status: string) => {
    setUpdating(id);
    await fetch(`/api/admin/leads/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status }),
    });
    setLeads((prev) => prev.map((l) => (l.id === id ? { ...l, status } : l)));
    setUpdating(null);
  };

  const deleteLead = async (id: string) => {
    if (!confirm("Delete this lead?")) return;
    await fetch(`/api/admin/leads/${id}`, { method: "DELETE" });
    setLeads((prev) => prev.filter((l) => l.id !== id));
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
            placeholder="Search restaurants or emails..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2.5 text-sm border border-[var(--border)] rounded-xl bg-[var(--surface)] text-[var(--text-primary)] placeholder:text-[var(--text-muted)] focus:outline-none focus:ring-2 focus:ring-[var(--brand)]"
          />
        </div>
        <select
          value={filterPlan}
          onChange={(e) => setFilterPlan(e.target.value)}
          className="px-3 py-2.5 text-sm border border-[var(--border)] rounded-xl bg-[var(--surface)] text-[var(--text-primary)] focus:outline-none focus:ring-2 focus:ring-[var(--brand)]"
        >
          <option value="">All plans</option>
          {PLAN_OPTIONS.map((p) => <option key={p} value={p}>{p}</option>)}
        </select>
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
        <div className="px-5 py-3.5 border-b border-[var(--border)] flex items-center justify-between">
          <span className="text-sm font-medium text-[var(--text-secondary)]">
            {loading ? "Loading..." : `${total} lead${total !== 1 ? "s" : ""}`}
          </span>
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-16">
            <div className="w-6 h-6 border-2 border-[var(--brand)] border-t-transparent rounded-full animate-spin" />
          </div>
        ) : leads.length === 0 ? (
          <div className="py-16 text-center text-[var(--text-muted)] text-sm">No leads found.</div>
        ) : (
          <div className="divide-y divide-[var(--border)]">
            {leads.map((lead) => (
              <div key={lead.id}>
                <div
                  className="px-5 py-4 flex items-center gap-4 cursor-pointer hover:bg-[var(--surface-alt)] transition-colors"
                  onClick={() => setExpandedId(expandedId === lead.id ? null : lead.id)}
                >
                  <div className="flex-1 min-w-0">
                    <div className="font-medium text-sm text-[var(--text-primary)] truncate">{lead.restaurantName}</div>
                    <div className="text-xs text-[var(--text-muted)]">{lead.ownerName} · {lead.email}</div>
                  </div>
                  <div className="hidden sm:flex items-center gap-2 flex-shrink-0">
                    <span className={`text-xs px-2 py-0.5 rounded-full font-medium capitalize ${planColors[lead.plan] || planColors.starter}`}>{lead.plan}</span>
                    <span className={`text-xs px-2 py-0.5 rounded-full font-medium capitalize ${statusColors[lead.status] || statusColors.new}`}>{lead.status}</span>
                  </div>
                  <div className="text-xs text-[var(--text-muted)] flex-shrink-0 hidden md:block">
                    {new Date(lead.createdAt).toLocaleDateString()}
                  </div>
                  <ChevronDown className={`w-4 h-4 text-[var(--text-muted)] flex-shrink-0 transition-transform ${expandedId === lead.id ? "rotate-180" : ""}`} />
                </div>

                {expandedId === lead.id && (
                  <div className="px-5 pb-5 bg-[var(--surface-alt)] border-t border-[var(--border)] space-y-4">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-4">
                      <div>
                        <div className="text-xs text-[var(--text-muted)] mb-1">Phone</div>
                        <div className="text-sm text-[var(--text-primary)]">{lead.phone || "—"}</div>
                      </div>
                      <div>
                        <div className="text-xs text-[var(--text-muted)] mb-1">Tables</div>
                        <div className="text-sm text-[var(--text-primary)]">{lead.numberOfTables}</div>
                      </div>
                      <div>
                        <div className="text-xs text-[var(--text-muted)] mb-1">Plan</div>
                        <span className={`text-xs px-2 py-0.5 rounded-full font-medium capitalize ${planColors[lead.plan] || planColors.starter}`}>{lead.plan}</span>
                      </div>
                      <div>
                        <div className="text-xs text-[var(--text-muted)] mb-1">Submitted</div>
                        <div className="text-sm text-[var(--text-primary)]">{new Date(lead.createdAt).toLocaleString()}</div>
                      </div>
                    </div>
                    {lead.message && (
                      <div>
                        <div className="text-xs text-[var(--text-muted)] mb-1">Message</div>
                        <div className="text-sm text-[var(--text-primary)] bg-[var(--surface)] border border-[var(--border)] rounded-xl px-4 py-3">{lead.message}</div>
                      </div>
                    )}
                    <div className="flex items-center gap-3 flex-wrap">
                      <div className="text-xs text-[var(--text-muted)] font-medium">Update status:</div>
                      {STATUS_OPTIONS.map((s) => (
                        <button
                          key={s}
                          disabled={lead.status === s || updating === lead.id}
                          onClick={() => updateStatus(lead.id, s)}
                          className={`text-xs px-3 py-1.5 rounded-lg font-medium capitalize transition-colors ${
                            lead.status === s
                              ? `${statusColors[s] || statusColors.new} opacity-100`
                              : "bg-[var(--surface)] border border-[var(--border)] text-[var(--text-secondary)] hover:border-[var(--brand)] hover:text-[var(--brand)]"
                          } disabled:opacity-50`}
                        >
                          {s}
                        </button>
                      ))}
                      <button
                        onClick={() => deleteLead(lead.id)}
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
