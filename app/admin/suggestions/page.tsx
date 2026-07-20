"use client";

import { useEffect, useState, useCallback, useMemo } from "react";
import { Search, Lightbulb, Calendar, X, Tag } from "lucide-react";
import { FilterDropdown } from "@/components/admin/FilterDropdown";

interface Suggestion {
  id: string;
  customerId: string | null;
  customerName: string | null;
  category: string;
  suggestion: string;
  createdAt: string;
  customerEmail: string | null;
  customerPhone: string | null;
  customerCity: string | null;
}

const DATE_PRESETS = [
  { value: "", label: "All time" },
  { value: "today", label: "Today" },
  { value: "7d", label: "Last 7 days" },
  { value: "30d", label: "Last 30 days" },
  { value: "month", label: "This month" },
  { value: "custom", label: "Custom range" },
];

function fmtDate(d: Date) {
  return d.toISOString().slice(0, 10);
}

function presetRange(preset: string): { from: string; to: string } {
  const now = new Date();
  const to = fmtDate(now);
  if (preset === "today") return { from: to, to };
  if (preset === "7d") {
    const d = new Date(now);
    d.setDate(d.getDate() - 6);
    return { from: fmtDate(d), to };
  }
  if (preset === "30d") {
    const d = new Date(now);
    d.setDate(d.getDate() - 29);
    return { from: fmtDate(d), to };
  }
  if (preset === "month") {
    return { from: fmtDate(new Date(now.getFullYear(), now.getMonth(), 1)), to };
  }
  return { from: "", to: "" };
}

const CATEGORY_STYLES = [
  "bg-[var(--brand-light)] text-[var(--brand)]",
  "bg-blue-100 dark:bg-blue-500/10 text-blue-600 dark:text-blue-400",
  "bg-purple-100 dark:bg-purple-500/10 text-purple-600 dark:text-purple-400",
  "bg-amber-100 dark:bg-amber-500/10 text-amber-600 dark:text-amber-400",
  "bg-pink-100 dark:bg-pink-500/10 text-pink-600 dark:text-pink-400",
  "bg-cyan-100 dark:bg-cyan-500/10 text-cyan-600 dark:text-cyan-400",
];

function categoryStyle(category: string) {
  let hash = 0;
  for (let i = 0; i < category.length; i++) hash = (hash * 31 + category.charCodeAt(i)) >>> 0;
  return CATEGORY_STYLES[hash % CATEGORY_STYLES.length];
}

function initials(name: string | null) {
  if (!name) return "?";
  const parts = name.trim().split(/\s+/);
  return ((parts[0]?.[0] || "") + (parts[1]?.[0] || "")).toUpperCase() || "?";
}


export default function SuggestionsPage() {
  const [suggestions, setSuggestions] = useState<Suggestion[]>([]);
  const [total, setTotal] = useState(0);
  const [categories, setCategories] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [filterCategory, setFilterCategory] = useState("");
  const [datePreset, setDatePreset] = useState("");
  const [customFrom, setCustomFrom] = useState("");
  const [customTo, setCustomTo] = useState("");

  const { from, to } = useMemo(
    () => (datePreset === "custom" ? { from: customFrom, to: customTo } : presetRange(datePreset)),
    [datePreset, customFrom, customTo]
  );

  const load = useCallback(async () => {
    setLoading(true);
    const params = new URLSearchParams();
    if (search) params.set("search", search);
    if (filterCategory) params.set("category", filterCategory);
    if (from) params.set("from", from);
    if (to) params.set("to", to);
    const res = await fetch(`/api/admin/suggestions?${params}`);
    const data = await res.json();
    setSuggestions(data.suggestions || []);
    setTotal(data.total || 0);
    setCategories(data.categories || []);
    setLoading(false);
  }, [search, filterCategory, from, to]);

  useEffect(() => {
    const t = setTimeout(load, 300);
    return () => clearTimeout(t);
  }, [load]);

  const clearDateFilter = () => {
    setDatePreset("");
    setCustomFrom("");
    setCustomTo("");
  };

  return (
    <div className="space-y-5">
      <div className="flex flex-col sm:flex-row sm:flex-wrap gap-3">
        <div className="relative flex-1 min-w-[200px]">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--text-muted)]" />
          <input
            type="text"
            placeholder="Search suggestions or customer name..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2.5 text-sm border border-[var(--border)] rounded-xl bg-[var(--surface)] text-[var(--text-primary)] placeholder:text-[var(--text-muted)] focus:outline-none focus:ring-2 focus:ring-[var(--brand)]"
          />
        </div>
        <FilterDropdown
          icon={Tag}
          value={filterCategory}
          onChange={setFilterCategory}
          capitalizeLabels
          options={[{ value: "", label: "All categories" }, ...categories.map((c) => ({ value: c, label: c }))]}
        />
        <FilterDropdown icon={Calendar} value={datePreset} onChange={setDatePreset} options={DATE_PRESETS} />
        {datePreset === "custom" && (
          <div className="flex items-center gap-2 bg-[var(--surface)] border border-[var(--border)] rounded-xl px-3 py-2.5">
            <input
              type="date"
              value={customFrom}
              onChange={(e) => setCustomFrom(e.target.value)}
              className="text-sm bg-transparent text-[var(--text-primary)] focus:outline-none [color-scheme:light] dark:[color-scheme:dark]"
            />
            <span className="text-[var(--text-muted)] text-sm">–</span>
            <input
              type="date"
              value={customTo}
              onChange={(e) => setCustomTo(e.target.value)}
              className="text-sm bg-transparent text-[var(--text-primary)] focus:outline-none [color-scheme:light] dark:[color-scheme:dark]"
            />
            <button onClick={clearDateFilter} className="text-[var(--text-muted)] hover:text-[var(--text-primary)] flex-shrink-0">
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        )}
      </div>

      <div className="text-sm font-medium text-[var(--text-secondary)] px-1">
        {loading ? "Loading..." : `${total} suggestion${total !== 1 ? "s" : ""}`}
      </div>

      {loading ? (
        <div className="flex items-center justify-center py-16">
          <div className="w-6 h-6 border-2 border-[var(--brand)] border-t-transparent rounded-full animate-spin" />
        </div>
      ) : suggestions.length === 0 ? (
        <div className="py-16 text-center text-[var(--text-muted)] text-sm bg-[var(--surface)] border border-[var(--border)] rounded-2xl">
          No suggestions found.
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {suggestions.map((s) => (
            <div key={s.id} className="bg-[var(--surface)] border border-[var(--border)] rounded-2xl p-5 space-y-4 hover:border-[var(--brand)]/40 transition-colors">
              <div className="flex items-start justify-between gap-3">
                <span className={`inline-flex items-center gap-1.5 text-xs px-2.5 py-1 rounded-full font-medium capitalize ${categoryStyle(s.category)}`}>
                  <Lightbulb className="w-3 h-3" />
                  {s.category}
                </span>
                <div className="text-xs text-[var(--text-muted)] flex-shrink-0">
                  {new Date(s.createdAt).toLocaleString(undefined, { dateStyle: "medium", timeStyle: "short" })}
                </div>
              </div>

              <p className="text-sm text-[var(--text-primary)] leading-relaxed">{s.suggestion}</p>

              <div className="flex items-center gap-3 pt-3 border-t border-[var(--border)]">
                <div className="w-8 h-8 rounded-full bg-[var(--brand-light)] text-[var(--brand)] flex items-center justify-center text-xs font-semibold flex-shrink-0">
                  {initials(s.customerName)}
                </div>
                <div className="min-w-0">
                  <div className="text-sm font-medium text-[var(--text-primary)] truncate">
                    {s.customerName || "Anonymous"}
                  </div>
                  {(s.customerEmail || s.customerPhone || s.customerCity) && (
                    <div className="text-xs text-[var(--text-muted)] truncate">
                      {[s.customerEmail, s.customerPhone, s.customerCity].filter(Boolean).join(" · ")}
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
