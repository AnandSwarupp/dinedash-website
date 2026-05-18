"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Users, Mail, TrendingUp, Clock, ArrowRight, Zap } from "lucide-react";

interface Stats {
  totalLeads: number;
  newLeads: number;
  totalContacts: number;
  newContacts: number;
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<Stats>({ totalLeads: 0, newLeads: 0, totalContacts: 0, newContacts: 0 });
  const [recentLeads, setRecentLeads] = useState<{ id: string; restaurantName: string; plan: string; createdAt: string; status: string }[]>([]);
  const [recentContacts, setRecentContacts] = useState<{ id: string; name: string; subject: string; createdAt: string; status: string }[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      const [leadsRes, contactsRes] = await Promise.all([
        fetch("/api/admin/leads"),
        fetch("/api/admin/contacts"),
      ]);
      const leadsData = await leadsRes.json();
      const contactsData = await contactsRes.json();
      setStats({
        totalLeads: leadsData.total || 0,
        newLeads: leadsData.newCount || 0,
        totalContacts: contactsData.total || 0,
        newContacts: contactsData.newCount || 0,
      });
      setRecentLeads((leadsData.leads || []).slice(0, 5));
      setRecentContacts((contactsData.contacts || []).slice(0, 5));
      setLoading(false);
    }
    load();
  }, []);

  const statCards = [
    { label: "Total Leads", value: stats.totalLeads, sub: `${stats.newLeads} new`, icon: Users, color: "text-[var(--brand)]", bg: "bg-[var(--brand-light)]", href: "/admin/leads" },
    { label: "Contact Messages", value: stats.totalContacts, sub: `${stats.newContacts} unread`, icon: Mail, color: "text-blue-500", bg: "bg-blue-100 dark:bg-blue-500/10", href: "/admin/contacts" },
    { label: "This Month", value: stats.totalLeads + stats.totalContacts, sub: "total submissions", icon: TrendingUp, color: "text-amber-500", bg: "bg-amber-100 dark:bg-amber-500/10", href: "/admin/leads" },
    { label: "Response Time", value: "< 24h", sub: "target response", icon: Clock, color: "text-purple-500", bg: "bg-purple-100 dark:bg-purple-500/10", href: "/admin/contacts" },
  ];

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
    read: "bg-slate-100 dark:bg-slate-700/50 text-slate-600 dark:text-slate-300",
    replied: "bg-purple-100 dark:bg-purple-500/10 text-purple-600 dark:text-purple-400",
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="w-8 h-8 border-2 border-[var(--brand)] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Welcome */}
      <div className="bg-[var(--surface-dark)] text-white rounded-2xl p-6 flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold">Welcome back 👋</h2>
          <p className="text-white/60 text-sm mt-1">Here's what's happening with DineDash today.</p>
        </div>
        <div className="w-10 h-10 bg-[var(--brand)] rounded-xl flex items-center justify-center">
          <Zap className="w-5 h-5 text-[#0F1623] fill-[#0F1623]" />
        </div>
      </div>

      {/* Stat cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {statCards.map((card) => (
          <Link key={card.label} href={card.href} className="bg-[var(--surface)] border border-[var(--border)] rounded-2xl p-5 hover:border-[var(--brand)] transition-colors">
            <div className={`w-10 h-10 ${card.bg} rounded-xl flex items-center justify-center mb-3`}>
              <card.icon className={`w-5 h-5 ${card.color}`} />
            </div>
            <div className="text-2xl font-extrabold text-[var(--text-primary)]">{card.value}</div>
            <div className="text-xs text-[var(--text-muted)] mt-0.5">{card.label}</div>
            <div className={`text-xs font-medium mt-1 ${card.color}`}>{card.sub}</div>
          </Link>
        ))}
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Recent Leads */}
        <div className="bg-[var(--surface)] border border-[var(--border)] rounded-2xl overflow-hidden">
          <div className="flex items-center justify-between px-5 py-4 border-b border-[var(--border)]">
            <h3 className="font-semibold text-[var(--text-primary)]">Recent Leads</h3>
            <Link href="/admin/leads" className="text-xs text-[var(--brand)] hover:underline flex items-center gap-1">
              View all <ArrowRight className="w-3 h-3" />
            </Link>
          </div>
          {recentLeads.length === 0 ? (
            <div className="px-5 py-8 text-center text-[var(--text-muted)] text-sm">No leads yet.</div>
          ) : (
            <div className="divide-y divide-[var(--border)]">
              {recentLeads.map((lead) => (
                <div key={lead.id} className="px-5 py-3.5 flex items-center justify-between gap-3">
                  <div className="min-w-0">
                    <div className="font-medium text-sm text-[var(--text-primary)] truncate">{lead.restaurantName}</div>
                    <div className="text-xs text-[var(--text-muted)]">{new Date(lead.createdAt).toLocaleDateString()}</div>
                  </div>
                  <div className="flex items-center gap-2 flex-shrink-0">
                    <span className={`text-xs px-2 py-0.5 rounded-full font-medium capitalize ${planColors[lead.plan] || planColors.starter}`}>{lead.plan}</span>
                    <span className={`text-xs px-2 py-0.5 rounded-full font-medium capitalize ${statusColors[lead.status] || statusColors.new}`}>{lead.status}</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Recent Contacts */}
        <div className="bg-[var(--surface)] border border-[var(--border)] rounded-2xl overflow-hidden">
          <div className="flex items-center justify-between px-5 py-4 border-b border-[var(--border)]">
            <h3 className="font-semibold text-[var(--text-primary)]">Recent Messages</h3>
            <Link href="/admin/contacts" className="text-xs text-[var(--brand)] hover:underline flex items-center gap-1">
              View all <ArrowRight className="w-3 h-3" />
            </Link>
          </div>
          {recentContacts.length === 0 ? (
            <div className="px-5 py-8 text-center text-[var(--text-muted)] text-sm">No messages yet.</div>
          ) : (
            <div className="divide-y divide-[var(--border)]">
              {recentContacts.map((c) => (
                <div key={c.id} className="px-5 py-3.5 flex items-center justify-between gap-3">
                  <div className="min-w-0">
                    <div className="font-medium text-sm text-[var(--text-primary)] truncate">{c.name}</div>
                    <div className="text-xs text-[var(--text-muted)] truncate">{c.subject}</div>
                  </div>
                  <span className={`text-xs px-2 py-0.5 rounded-full font-medium capitalize flex-shrink-0 ${statusColors[c.status] || statusColors.new}`}>{c.status}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Quick Links */}
      <div className="bg-[var(--surface)] border border-[var(--border)] rounded-2xl p-5">
        <h3 className="font-semibold text-[var(--text-primary)] mb-4">Quick content edits</h3>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {[
            { label: "Edit Pricing", href: "/admin/content/pricing" },
            { label: "Edit Discount Tiers", href: "/admin/content/tiers" },
            { label: "Edit FAQs", href: "/admin/content/faqs" },
            { label: "Edit Testimonials", href: "/admin/content/testimonials" },
            { label: "Edit Team", href: "/admin/content/team" },
            { label: "Site Settings", href: "/admin/content/settings" },
          ].map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="flex items-center justify-between px-4 py-3 bg-[var(--surface-alt)] border border-[var(--border)] rounded-xl text-sm font-medium text-[var(--text-secondary)] hover:border-[var(--brand)] hover:text-[var(--brand)] transition-colors"
            >
              {link.label} <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
