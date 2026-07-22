"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Zap, Mail, MapPin, Phone, ArrowUpRight } from "lucide-react";
import { FaApple, FaGooglePlay } from "react-icons/fa";

// TODO: replace with the live App Store URL once the app is published
const APP_STORE_URL = "https://apps.apple.com/app/dinedash";
// TODO: replace with the live Google Play URL once the app is published
const PLAY_STORE_URL = "https://play.google.com/store/apps/details?id=com.dinedash.app";

function IconInstagram({ className }: { className?: string }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
    </svg>
  );
}

function IconLinkedin({ className }: { className?: string }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
    </svg>
  );
}

function IconFacebook({ className }: { className?: string }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
    </svg>
  );
}

const footerLinks = {
  product: [
    { label: "How It Works", href: "/how-it-works" },
    { label: "For Restaurants", href: "/for-restaurants" },
    { label: "For Customers", href: "/for-customers" },
    { label: "Pricing", href: "/pricing" },
  ],
  company: [
    { label: "About Us", href: "/about" },
    { label: "Contact", href: "/contact" },
    { label: "Get Started", href: "/get-started" },
    { label: "Blog", href: "/blog" },
  ],
  legal: [
    { label: "Privacy Policy", href: "/privacy" },
    { label: "Terms of Service", href: "/terms" },
    { label: "Cookie Policy", href: "/cookies" },
  ],
};

interface Settings { siteName?: string; tagline?: string; email?: string; phone?: string; address?: string; ctaPrimary?: string; ctaSecondary?: string; twitterUrl?: string; linkedinUrl?: string; instagramUrl?: string; }

export default function Footer() {
  const [settings, setSettings] = useState<Settings>({
    siteName: "DineDash",
    tagline: "Pay first. Eat fast. Get money back. The dining experience that rewards speed and helps restaurants serve more covers every day.",
    email: "hello@dinedash.app",
    phone: "+44 20 0000 0000",
    address: "London, United Kingdom",
  });

  useEffect(() => {
    fetch("/api/content/settings")
      .then((r) => r.json())
      .then((data) => { if (data?.data) setSettings(data.data); })
      .catch(() => {});
  }, []);

  return (
    <footer className="bg-[var(--surface-dark)] text-white">
      {/* Main footer */}
      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Brand */}
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center gap-2.5 mb-5">
              <div className="w-8 h-8 bg-[var(--brand)] rounded-lg flex items-center justify-center">
                <Zap className="w-4 h-4 text-[#0F1623] fill-[#0F1623]" />
              </div>
              <span className="text-[15px] font-semibold tracking-tight text-white">
                {settings.siteName || "DineDash"}
              </span>
            </Link>
            <p className="text-[var(--text-muted)] text-sm leading-relaxed max-w-xs">
              {settings.tagline || "Pay first. Eat fast. Get money back. The dining experience that rewards speed and helps restaurants serve more covers every day."}
            </p>
            <div className="mt-6 space-y-2.5">
              {settings.email && (
                <div className="flex items-center gap-2.5 text-[var(--text-muted)] text-sm">
                  <Mail className="w-3.5 h-3.5 text-[var(--brand)]" />
                  <span>{settings.email}</span>
                </div>
              )}
              {settings.phone && (
                <div className="flex items-center gap-2.5 text-[var(--text-muted)] text-sm">
                  <Phone className="w-3.5 h-3.5 text-[var(--brand)]" />
                  <span>{settings.phone}</span>
                </div>
              )}
              {settings.address && (
                <div className="flex items-center gap-2.5 text-[var(--text-muted)] text-sm">
                  <MapPin className="w-3.5 h-3.5 text-[var(--brand)]" />
                  <span>{settings.address}</span>
                </div>
              )}
            </div>
            {/* App badges */}
            <div className="mt-6 flex gap-3">
              <a
                href={APP_STORE_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white/[0.03] border border-white/10 rounded-xl px-4 py-2.5 flex items-center gap-2.5 hover:border-white/25 transition-colors duration-300"
              >
                <FaApple className="w-5 h-5 text-white flex-shrink-0" />
                <div>
                  <div className="text-[10px] text-[var(--text-muted)]">Download on the</div>
                  <div className="text-sm font-semibold text-white">App Store</div>
                </div>
              </a>
              <a
                href={PLAY_STORE_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white/[0.03] border border-white/10 rounded-xl px-4 py-2.5 flex items-center gap-2.5 hover:border-white/25 transition-colors duration-300"
              >
                <FaGooglePlay className="w-4 h-4 text-white flex-shrink-0" />
                <div>
                  <div className="text-[10px] text-[var(--text-muted)]">Get it on</div>
                  <div className="text-sm font-semibold text-white">Google Play</div>
                </div>
              </a>
            </div>
          </div>

          {/* Links */}
          <div>
            <h4 className="text-xs font-semibold text-white/40 uppercase tracking-widest mb-5">Product</h4>
            <ul className="space-y-3.5">
              {footerLinks.product.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-[var(--text-muted)] text-sm hover:text-white transition-colors duration-300">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-semibold text-white/40 uppercase tracking-widest mb-5">Company</h4>
            <ul className="space-y-3.5">
              {footerLinks.company.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-[var(--text-muted)] text-sm hover:text-white transition-colors duration-300">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-semibold text-white/40 uppercase tracking-widest mb-5">Legal</h4>
            <ul className="space-y-3.5">
              {footerLinks.legal.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-[var(--text-muted)] text-sm hover:text-white transition-colors duration-300">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
            <div className="mt-8">
              <h4 className="text-xs font-semibold text-white/40 uppercase tracking-widest mb-5">Follow Us</h4>
              <div className="flex gap-3">
                {(settings.instagramUrl || "#") !== "" && (
                  <a href={settings.instagramUrl || "#"} target="_blank" rel="noopener noreferrer" className="w-8 h-8 bg-white/[0.03] border border-white/10 rounded-lg flex items-center justify-center hover:bg-white/10 hover:border-white/25 transition-colors duration-300">
                    <IconInstagram className="w-3.5 h-3.5" />
                  </a>
                )}
                {(settings.linkedinUrl || "#") !== "" && (
                  <a href={settings.linkedinUrl || "#"} target="_blank" rel="noopener noreferrer" className="w-8 h-8 bg-white/[0.03] border border-white/10 rounded-lg flex items-center justify-center hover:bg-white/10 hover:border-white/25 transition-colors duration-300">
                    <IconLinkedin className="w-3.5 h-3.5" />
                  </a>
                )}
                {(settings.twitterUrl || "#") !== "" && (
                  <a href={settings.twitterUrl || "#"} target="_blank" rel="noopener noreferrer" className="w-8 h-8 bg-white/[0.03] border border-white/10 rounded-lg flex items-center justify-center hover:bg-white/10 hover:border-white/25 transition-colors duration-300">
                    <IconFacebook className="w-3.5 h-3.5" />
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-16 pt-10 border-t border-white/10 flex flex-col items-center gap-5 text-center">
          <a
            href="https://trizentechnologies.com"
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-2 text-base md:text-lg font-semibold text-white/60 transition-colors duration-300 hover:text-white"
          >
            Crafted by
            <span className="text-white group-hover:text-[var(--brand)] transition-colors duration-300">
              Trizen Technologies
            </span>
            <ArrowUpRight className="w-4 h-4 text-white/40 group-hover:text-[var(--brand)] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-300" />
          </a>
          <p className="text-[var(--text-muted)] text-xs">
            © {new Date().getFullYear()} {settings.siteName || "DineDash"}. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
