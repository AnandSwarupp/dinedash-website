"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, ChevronDown, Zap } from "lucide-react";

const navItems = [
  { label: "Home", href: "/" },
  {
    label: "How It Works",
    href: "/how-it-works",
    children: [
      { label: "Complete Guide", href: "/how-it-works", desc: "Everything about the DineDash experience" },
      { label: "For Customers", href: "/for-customers", desc: "Scan, order, beat the timer, get refunded" },
      { label: "For Restaurants", href: "/for-restaurants", desc: "Boost table turnover with zero friction" },
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
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
    setActiveDropdown(null);
  }, [pathname]);

  // A balanced ease-in-out (rather than the site-wide expo-out --ease-premium,
  // which front-loads motion and made this two-way morph feel abrupt).
  const ease = { transitionTimingFunction: "cubic-bezier(0.65, 0, 0.35, 1)" };

  return (
    <nav className="fixed top-0 inset-x-0 z-50">
      {/* Capsule — a single element that morphs from a full-width bar into a
          centered floating pill on scroll, so everything animates continuously
          instead of cross-fading between two different elements. */}
      <div
        className={`mx-auto transition-all duration-[650ms] ${
          scrolled
            ? "max-w-7xl lg:max-w-[480px] mt-0 lg:mt-3 px-4 sm:px-6 lg:px-3"
            : "max-w-7xl mt-0 px-4 sm:px-6 lg:px-8"
        }`}
        style={ease}
      >
        <div className={`relative transition-all duration-[650ms] ${scrolled ? "h-16 lg:h-14" : "h-20"}`} style={ease}>
          {/* Background layer — filter/border/shadow stay constant, only opacity
              animates, so the (expensive) blur never has to be recomputed mid-transition. */}
          <div
            className={`absolute inset-0 rounded-none lg:rounded-full bg-[var(--navbar-bg)] backdrop-blur-xl backdrop-saturate-150 border border-[var(--border)] lg:shadow-lg transition-opacity duration-[650ms] ${
              scrolled ? "opacity-100" : "opacity-0"
            }`}
            style={ease}
          />

          {/* Content layer */}
          <div className="relative flex items-center justify-between w-full h-full">
            {/* Logo — collapses away only once scrolled past lg */}
            <Link
              href="/"
              className={`flex items-center gap-2.5 group shrink-0 overflow-hidden transition-all duration-[650ms] ${
                scrolled
                  ? "lg:max-w-0 lg:opacity-0 lg:mr-0 lg:pointer-events-none max-w-[220px] opacity-100 mr-4"
                  : "max-w-[220px] opacity-100 mr-4"
              }`}
              style={ease}
            >
              <div className="w-9 h-9 bg-[var(--brand)] rounded-lg flex items-center justify-center transition-transform duration-300 group-hover:scale-95 shrink-0">
                <Zap className="w-5 h-5 text-[#0F1623] fill-[#0F1623]" />
              </div>
              <span className="text-[17px] font-semibold tracking-tight text-[var(--text-primary)] whitespace-nowrap">
                Dine<span className="text-[var(--brand)]">Dash</span>
              </span>
            </Link>

            {/* Nav links — always centered in whatever space remains. Size stays
                constant across scroll states so it never has to animate, only
                the space around it (logo/CTA collapsing) changes. */}
            <div className="hidden lg:flex items-center justify-center gap-3 flex-1 min-w-0">
              {navItems.map((item) => (
                <div
                  key={item.label}
                  className="relative"
                  onMouseEnter={() => item.children && setActiveDropdown(item.label)}
                  onMouseLeave={() => setActiveDropdown(null)}
                >
                  <Link
                    href={item.href}
                    data-active={pathname === item.href}
                    className={`nav-link flex items-center gap-1.5 rounded-full px-4 py-2.5 text-[15px] font-semibold tracking-tight whitespace-nowrap transition-colors ${
                      pathname === item.href
                        ? "text-[var(--text-primary)]"
                        : "text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
                    }`}
                  >
                    {item.label}
                    {item.children && (
                      <ChevronDown
                        className={`w-4 h-4 transition-transform duration-300 ${
                          activeDropdown === item.label ? "rotate-180" : ""
                        }`}
                      />
                    )}
                  </Link>

                  {/* Dropdown */}
                  {item.children && activeDropdown === item.label && (
                    <div className="absolute top-full left-1/2 -translate-x-1/2 pt-3 w-72 z-50">
                      <div className="bg-[var(--surface)] rounded-2xl shadow-xl border border-[var(--border)] p-2">
                        {item.children.map((child) => (
                          <Link
                            key={child.href}
                            href={child.href}
                            className="flex flex-col px-4 py-3 rounded-xl hover:bg-[var(--brand-light)] transition-colors group"
                          >
                            <span className="text-sm font-semibold text-[var(--text-primary)] group-hover:text-[var(--brand-text)] transition-colors">
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

            {/* Desktop CTAs — collapse away once scrolled */}
            <div
              className={`hidden lg:flex items-center gap-2 shrink-0 overflow-hidden transition-all duration-[650ms] ${
                scrolled ? "max-w-0 opacity-0 ml-0 pointer-events-none" : "max-w-[320px] opacity-100 ml-4"
              }`}
              style={ease}
            >
              <Link
                href="/contact"
                className="text-[14px] font-semibold tracking-tight text-[var(--text-secondary)] hover:text-[var(--text-primary)] px-4 py-2 transition-colors whitespace-nowrap"
              >
                Contact
              </Link>
              <Link href="/get-started" className="btn-primary text-[14px] py-2.5 px-5 whitespace-nowrap">
                Get Started
              </Link>
            </div>

            {/* Mobile: hamburger — always visible, unaffected by the collapse */}
            <div className="lg:hidden flex items-center gap-2 shrink-0">
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
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div
          className="lg:hidden fixed inset-0 top-20 bg-black/40 backdrop-blur-sm z-40"
          onClick={() => setIsOpen(false)}
        />
      )}
      {isOpen && (
        <div className="lg:hidden fixed inset-x-0 top-20 bottom-0 z-40 bg-[var(--surface)] border-t border-[var(--border)] shadow-lg overflow-y-auto">
          <div className="max-w-7xl mx-auto px-4 py-4 space-y-1">
            {navItems.map((item) => (
              <div key={item.label}>
                <Link
                  href={item.href}
                  className={`block px-4 py-3.5 rounded-xl text-base font-semibold transition-colors ${
                    pathname === item.href
                      ? "text-[var(--brand-text)] bg-[var(--brand-light)]"
                      : "text-[var(--text-secondary)] hover:text-[var(--brand-text)] hover:bg-[var(--brand-light)]"
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
                        className="block px-4 py-2.5 rounded-xl text-sm text-[var(--text-muted)] hover:text-[var(--brand-text)] hover:bg-[var(--brand-light)] transition-colors"
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
