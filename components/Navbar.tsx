"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, ChevronDown, Zap } from "lucide-react";
import ThemeToggle from "./ThemeToggle";

const navItems = [
  {
    label: "How It Works",
    href: "/how-it-works",
    children: [
      { label: "For Customers", href: "/for-customers", desc: "Scan, order, beat the timer, get refunded" },
      { label: "For Restaurants", href: "/for-restaurants", desc: "Boost table turnover with zero friction" },
      { label: "The Timer System", href: "/how-it-works#timer", desc: "How discounts are calculated" },
      { label: "Payments & Security", href: "/how-it-works#payments", desc: "Stripe-powered, fully secure" },
    ],
  },
  {
    label: "For Restaurants",
    href: "/for-restaurants",
    children: [
      { label: "Getting Started", href: "/for-restaurants#getting-started", desc: "Set up your restaurant in minutes" },
      { label: "QR Code Setup", href: "/for-restaurants#qr", desc: "Table & till QR code management" },
      { label: "Menu Management", href: "/for-restaurants#menu", desc: "Add and update your menu items" },
      { label: "Pricing Plans", href: "/pricing", desc: "Subscription options for restaurants" },
    ],
  },
  { label: "Pricing", href: "/pricing" },
  { label: "About", href: "/about" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
    setActiveDropdown(null);
  }, [pathname]);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-[var(--navbar-bg)] backdrop-blur-md shadow-sm border-b border-[var(--border)]"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-18 py-4">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="w-9 h-9 bg-[var(--brand)] rounded-xl flex items-center justify-center shadow-md transition-opacity group-hover:opacity-80">
              <Zap className="w-5 h-5 text-[#0F1623] fill-[#0F1623]" />
            </div>
            <span className="text-xl font-bold text-[var(--text-primary)]">
              Dine<span className="text-[var(--brand)]">Dash</span>
            </span>
          </Link>

          {/* Desktop nav */}
          <div className="hidden lg:flex items-center gap-1">
            {navItems.map((item) => (
              <div
                key={item.label}
                className="relative"
                onMouseEnter={() => item.children && setActiveDropdown(item.label)}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                <Link
                  href={item.href}
                  className={`flex items-center gap-1 px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                    pathname === item.href
                      ? "text-[var(--brand)] bg-[var(--brand-light)]"
                      : "text-[var(--text-secondary)] hover:text-[var(--brand)] hover:bg-[var(--brand-light)]"
                  }`}
                >
                  {item.label}
                  {item.children && (
                    <ChevronDown
                      className={`w-3.5 h-3.5 transition-transform ${
                        activeDropdown === item.label ? "rotate-180" : ""
                      }`}
                    />
                  )}
                </Link>

                {/* Dropdown */}
                {item.children && activeDropdown === item.label && (
                  <div className="absolute top-full left-0 pt-2 w-72 z-50">
                    <div className="bg-[var(--surface)] rounded-2xl shadow-xl border border-[var(--border)] p-2">
                      {item.children.map((child) => (
                        <Link
                          key={child.href}
                          href={child.href}
                          className="flex flex-col px-4 py-3 rounded-xl hover:bg-[var(--brand-light)] transition-colors group"
                        >
                          <span className="text-sm font-semibold text-[var(--text-primary)] group-hover:text-[var(--brand)] transition-colors">
                            {child.label}
                          </span>
                          <span className="text-xs text-[var(--text-muted)] mt-0.5">{child.desc}</span>
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Desktop CTAs */}
          <div className="hidden lg:flex items-center gap-3">
            <ThemeToggle />
            <Link
              href="/contact"
              className="text-sm font-medium text-[var(--text-secondary)] hover:text-[var(--brand)] px-4 py-2 rounded-full hover:bg-[var(--brand-light)] transition-colors"
            >
              Contact
            </Link>
            <Link href="/get-started" className="btn-primary text-sm py-2.5 px-5">
              Get Started
            </Link>
          </div>

          {/* Mobile: theme toggle + hamburger */}
          <div className="lg:hidden flex items-center gap-2">
            <ThemeToggle />
            <button
              className="p-2 rounded-xl text-[var(--text-secondary)] hover:bg-[var(--brand-light)] transition-colors"
              onClick={() => setIsOpen(!isOpen)}
              aria-label="Toggle menu"
            >
              {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div
          className="lg:hidden fixed inset-0 top-[72px] bg-black/40 z-40"
          onClick={() => setIsOpen(false)}
        />
      )}
      {isOpen && (
        <div className="lg:hidden fixed inset-x-0 top-[72px] bottom-0 z-40 bg-[var(--surface)] border-t border-[var(--border)] shadow-lg overflow-y-auto">
          <div className="max-w-7xl mx-auto px-4 py-4 space-y-1">
            {navItems.map((item) => (
              <div key={item.label}>
                <Link
                  href={item.href}
                  className={`block px-4 py-3 rounded-xl text-sm font-medium transition-colors ${
                    pathname === item.href
                      ? "text-[var(--brand)] bg-[var(--brand-light)]"
                      : "text-[var(--text-secondary)] hover:text-[var(--brand)] hover:bg-[var(--brand-light)]"
                  }`}
                >
                  {item.label}
                </Link>
                {item.children && (
                  <div className="ml-4 mt-1 space-y-1">
                    {item.children.map((child) => (
                      <Link
                        key={child.href}
                        href={child.href}
                        className="block px-4 py-2.5 rounded-xl text-sm text-[var(--text-muted)] hover:text-[var(--brand)] hover:bg-[var(--brand-light)] transition-colors"
                      >
                        {child.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
            <div className="pt-3 border-t border-[var(--border)] flex flex-col gap-2">
              <Link href="/contact" className="btn-outline text-sm text-center justify-center">
                Contact Us
              </Link>
              <Link href="/get-started" className="btn-primary text-sm text-center justify-center">
                Get Started
              </Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
