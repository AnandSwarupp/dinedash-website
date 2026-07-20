"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  Zap, LayoutDashboard, Users, Mail, Tag, Timer,
  HelpCircle, Star, UserCheck, Settings, LogOut, Menu, X, ChevronDown,
  Newspaper, ShieldCheck, Package, Lightbulb
} from "lucide-react";
import ThemeToggle from "@/components/ThemeToggle";

const navItems = [
  { label: "Dashboard", href: "/admin", icon: LayoutDashboard },
  { label: "Leads", href: "/admin/leads", icon: Users },
  { label: "Contacts", href: "/admin/contacts", icon: Mail },
  { label: "Blog", href: "/admin/blogs", icon: Newspaper },
  { label: "Business Supplies", href: "/admin/supplies", icon: Package },
  { label: "Suggestions", href: "/admin/suggestions", icon: Lightbulb },
  {
    label: "Content", icon: Tag, children: [
      { label: "Pricing Plans", href: "/admin/content/pricing", icon: Tag },
      { label: "Discount Tiers", href: "/admin/content/tiers", icon: Timer },
      { label: "FAQs", href: "/admin/content/faqs", icon: HelpCircle },
      { label: "Testimonials", href: "/admin/content/testimonials", icon: Star },
      { label: "Team", href: "/admin/content/team", icon: UserCheck },
      { label: "Site Settings", href: "/admin/content/settings", icon: Settings },
    ]
  },
  {
    label: "Legal", icon: ShieldCheck, children: [
      { label: "Privacy Policy", href: "/admin/legal/privacy", icon: ShieldCheck },
      { label: "Terms of Service", href: "/admin/legal/terms", icon: ShieldCheck },
      { label: "Cookie Policy", href: "/admin/legal/cookies", icon: ShieldCheck },
    ]
  },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [contentOpen, setContentOpen] = useState(pathname.startsWith("/admin/content"));
  const [legalOpen, setLegalOpen] = useState(pathname.startsWith("/admin/legal"));
  const [loggingOut, setLoggingOut] = useState(false);

  const handleLogout = async () => {
    setLoggingOut(true);
    await fetch("/api/admin/auth/logout", { method: "POST" });
    router.push("/admin/login");
    router.refresh();
  };

  const isActive = (href: string) =>
    href === "/admin" ? pathname === "/admin" : pathname.startsWith(href);

  const Sidebar = () => (
    <div className="flex flex-col h-full">
      {/* Logo */}
      <div className="flex items-center gap-2.5 px-5 py-5 border-b border-[var(--border)]">
        <div className="w-8 h-8 bg-[var(--brand)] rounded-lg flex items-center justify-center">
          <Zap className="w-4 h-4 text-[#0F1623] fill-[#0F1623]" />
        </div>
        <div>
          <span className="font-bold text-[var(--text-primary)] text-sm">DineDash</span>
          <div className="text-[10px] text-[var(--text-muted)] font-medium">Admin Panel</div>
        </div>
      </div>

      {/* Nav */}
      <nav className="flex-1 px-3 py-4 space-y-0.5 overflow-y-auto">
        {navItems.map((item) => {
          if (item.children) {
            const sectionKey = item.label === "Legal" ? "legal" : "content";
            const isOpen = sectionKey === "legal" ? legalOpen : contentOpen;
            const toggleOpen = sectionKey === "legal"
              ? () => setLegalOpen(!legalOpen)
              : () => setContentOpen(!contentOpen);
            const sectionActive = sectionKey === "legal"
              ? pathname.startsWith("/admin/legal")
              : pathname.startsWith("/admin/content");
            return (
              <div key={item.label}>
                <button
                  onClick={toggleOpen}
                  className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                    sectionActive
                      ? "bg-[var(--brand-light)] text-[var(--brand)]"
                      : "text-[var(--text-secondary)] hover:bg-[var(--surface-alt)] hover:text-[var(--text-primary)]"
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <item.icon className="w-4 h-4" />
                    {item.label}
                  </div>
                  <ChevronDown className={`w-3.5 h-3.5 transition-transform ${isOpen ? "rotate-180" : ""}`} />
                </button>
                {isOpen && (
                  <div className="ml-4 mt-0.5 space-y-0.5">
                    {item.children.map((child) => (
                      <Link
                        key={child.href}
                        href={child.href}
                        onClick={() => setSidebarOpen(false)}
                        className={`flex items-center gap-2.5 px-3 py-2 rounded-xl text-sm transition-colors ${
                          isActive(child.href)
                            ? "bg-[var(--brand-light)] text-[var(--brand)] font-medium"
                            : "text-[var(--text-muted)] hover:text-[var(--text-primary)] hover:bg-[var(--surface-alt)]"
                        }`}
                      >
                        <child.icon className="w-3.5 h-3.5" />
                        {child.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            );
          }
          return (
            <Link
              key={item.href}
              href={item.href!}
              onClick={() => setSidebarOpen(false)}
              className={`flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                isActive(item.href!)
                  ? "bg-[var(--brand-light)] text-[var(--brand)]"
                  : "text-[var(--text-secondary)] hover:bg-[var(--surface-alt)] hover:text-[var(--text-primary)]"
              }`}
            >
              <item.icon className="w-4 h-4" />
              {item.label}
            </Link>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="px-3 py-4 border-t border-[var(--border)]">
        <Link
          href="/"
          target="_blank"
          className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-sm text-[var(--text-muted)] hover:text-[var(--text-primary)] hover:bg-[var(--surface-alt)] transition-colors mb-1"
        >
          <Zap className="w-4 h-4" />
          View Website
        </Link>
        <button
          onClick={handleLogout}
          disabled={loggingOut}
          className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-sm text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
        >
          <LogOut className="w-4 h-4" />
          {loggingOut ? "Logging out..." : "Logout"}
        </button>
      </div>
    </div>
  );

  if (pathname === "/admin/login") {
    return <>{children}</>;
  }

  return (
    <div className="min-h-screen bg-[var(--page-bg)] flex">
      {/* Desktop sidebar */}
      <aside className="hidden lg:flex w-56 flex-col bg-[var(--surface)] border-r border-[var(--border)] fixed inset-y-0 left-0 z-30">
        <Sidebar />
      </aside>

      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}
      <aside className={`fixed inset-y-0 left-0 w-56 bg-[var(--surface)] border-r border-[var(--border)] z-50 lg:hidden transform transition-transform ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}`}>
        <Sidebar />
      </aside>

      {/* Main content */}
      <div className="flex-1 lg:ml-56 flex flex-col min-h-screen">
        {/* Top bar */}
        <header className="sticky top-0 z-20 bg-[var(--surface)] border-b border-[var(--border)] px-4 py-3 flex items-center gap-3">
          <button
            className="lg:hidden p-2 rounded-xl text-[var(--text-secondary)] hover:bg-[var(--surface-alt)]"
            onClick={() => setSidebarOpen(!sidebarOpen)}
          >
            {sidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
          <h1 className="font-semibold text-[var(--text-primary)] text-sm flex-1">
            {pathname === "/admin" && "Dashboard"}
            {pathname === "/admin/leads" && "Restaurant Leads"}
            {pathname === "/admin/contacts" && "Contact Messages"}
            {pathname === "/admin/blogs" && "Blog Posts"}
            {pathname === "/admin/supplies" && "Business Supplies"}
            {pathname === "/admin/suggestions" && "Suggestions"}
            {pathname === "/admin/blogs/new" && "New Post"}
            {pathname.startsWith("/admin/blogs/") && pathname !== "/admin/blogs/new" && "Edit Post"}
            {pathname === "/admin/content/pricing" && "Pricing Plans"}
            {pathname === "/admin/content/tiers" && "Discount Tiers"}
            {pathname === "/admin/content/faqs" && "FAQs"}
            {pathname === "/admin/content/testimonials" && "Testimonials"}
            {pathname === "/admin/content/team" && "Team Members"}
            {pathname === "/admin/content/settings" && "Site Settings"}
            {pathname === "/admin/legal/privacy" && "Privacy Policy"}
            {pathname === "/admin/legal/terms" && "Terms of Service"}
            {pathname === "/admin/legal/cookies" && "Cookie Policy"}
          </h1>
          <ThemeToggle />
        </header>

        <main className="flex-1 p-4 md:p-6">
          {children}
        </main>
      </div>
    </div>
  );
}
