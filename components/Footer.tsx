import Link from "next/link";
import { Zap, Mail, MapPin, Phone } from "lucide-react";

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

const discountTiers = [
  { time: "< 15 min", discount: "30%", color: "text-green-400 bg-green-500/10 border-green-500/30" },
  { time: "< 30 min", discount: "20%", color: "text-amber-400 bg-amber-500/10 border-amber-500/30" },
  { time: "< 45 min", discount: "10%", color: "text-amber-300 bg-amber-500/10 border-amber-500/20" },
  { time: "> 45 min", discount: "0%",  color: "text-slate-500 bg-slate-700/20 border-slate-600/30" },
];

export default function Footer() {
  return (
    <footer className="bg-[var(--surface-dark)] text-white">
      {/* Top CTA strip */}
      <div className="bg-[var(--brand)] py-10 px-4">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h3 className="text-2xl font-bold text-[#0F1623]">Ready to fill your tables faster?</h3>
            <p className="text-[#0F1623]/70 mt-1">Join hundreds of restaurants already using Dine Dash.</p>
          </div>
          <div className="flex gap-3">
            <Link href="/get-started" className="bg-[#0F1623] text-[var(--brand)] font-bold px-6 py-3 rounded-full hover:opacity-90 transition-opacity">
              Get Started Free
            </Link>
            <Link href="/contact" className="border-2 border-[#0F1623]/40 text-[#0F1623] font-semibold px-6 py-3 rounded-full hover:bg-[#0F1623]/10 transition-colors">
              Talk to Us
            </Link>
          </div>
        </div>
      </div>

      {/* Discount tiers quick reference */}
      <div className="border-b border-[var(--border)] py-8 px-4">
        <div className="max-w-7xl mx-auto">
          <p className="text-[var(--text-muted)] text-sm mb-4 text-center">Speed discount tiers</p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {discountTiers.map((tier) => (
              <div key={tier.time} className={`rounded-xl border px-4 py-3 text-center ${tier.color}`}>
                <div className="text-2xl font-bold">{tier.discount}</div>
                <div className="text-xs mt-1 font-medium opacity-80">{tier.time}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Main footer */}
      <div className="max-w-7xl mx-auto px-4 py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Brand */}
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center gap-2.5 mb-4">
              <div className="w-9 h-9 bg-[var(--brand)] rounded-xl flex items-center justify-center">
                <Zap className="w-5 h-5 text-[#0F1623] fill-[#0F1623]" />
              </div>
              <span className="text-xl font-bold text-white">
                Dine<span className="text-[var(--brand)]">Dash</span>
              </span>
            </Link>
            <p className="text-[var(--text-muted)] text-sm leading-relaxed max-w-xs">
              Pay first. Eat fast. Get money back. The dining experience that rewards speed and helps restaurants serve more covers every day.
            </p>
            <div className="mt-6 space-y-2">
              <div className="flex items-center gap-2 text-[var(--text-muted)] text-sm">
                <Mail className="w-4 h-4 text-[var(--brand)]" />
                <span>hello@dinedash.app</span>
              </div>
              <div className="flex items-center gap-2 text-[var(--text-muted)] text-sm">
                <Phone className="w-4 h-4 text-[var(--brand)]" />
                <span>+44 20 0000 0000</span>
              </div>
              <div className="flex items-center gap-2 text-[var(--text-muted)] text-sm">
                <MapPin className="w-4 h-4 text-[var(--brand)]" />
                <span>London, United Kingdom</span>
              </div>
            </div>
            {/* App badges */}
            <div className="mt-6 flex gap-3">
              <div className="bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 flex items-center gap-2 cursor-pointer hover:border-[var(--brand)] transition-colors">
                <div className="text-xl">🍎</div>
                <div>
                  <div className="text-[10px] text-[var(--text-muted)]">Download on the</div>
                  <div className="text-sm font-semibold text-white">App Store</div>
                </div>
              </div>
              <div className="bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 flex items-center gap-2 cursor-pointer hover:border-[var(--brand)] transition-colors">
                <div className="text-xl">▶️</div>
                <div>
                  <div className="text-[10px] text-[var(--text-muted)]">Get it on</div>
                  <div className="text-sm font-semibold text-white">Google Play</div>
                </div>
              </div>
            </div>
          </div>

          {/* Links */}
          <div>
            <h4 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">Product</h4>
            <ul className="space-y-3">
              {footerLinks.product.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-[var(--text-muted)] text-sm hover:text-[var(--brand)] transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">Company</h4>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-[var(--text-muted)] text-sm hover:text-[var(--brand)] transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">Legal</h4>
            <ul className="space-y-3">
              {footerLinks.legal.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-[var(--text-muted)] text-sm hover:text-[var(--brand)] transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
            <div className="mt-8">
              <h4 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">Follow Us</h4>
              <div className="flex gap-3">
                <a href="#" className="w-9 h-9 bg-white/5 border border-white/10 rounded-xl flex items-center justify-center hover:bg-[var(--brand)] hover:border-[var(--brand)] transition-colors">
                  <IconInstagram className="w-4 h-4" />
                </a>
                <a href="#" className="w-9 h-9 bg-white/5 border border-white/10 rounded-xl flex items-center justify-center hover:bg-[var(--brand)] hover:border-[var(--brand)] transition-colors">
                  <IconLinkedin className="w-4 h-4" />
                </a>
                <a href="#" className="w-9 h-9 bg-white/5 border border-white/10 rounded-xl flex items-center justify-center hover:bg-[var(--brand)] hover:border-[var(--brand)] transition-colors">
                  <IconFacebook className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-14 pt-8 border-t border-[var(--border)] flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-[var(--text-muted)] text-sm">
            © {new Date().getFullYear()} DineDash. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2 text-[var(--text-muted)] text-sm">
              <span className="text-yellow-400">★</span> Powered by Stripe
            </div>
            <div className="flex items-center gap-2 text-[var(--text-muted)] text-sm">
              <span className="text-[var(--brand)]">●</span> All systems operational
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
