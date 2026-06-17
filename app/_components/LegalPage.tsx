import Link from "next/link";
import { ShieldCheck, Lock, Globe, Mail } from "lucide-react";

export type LegalSection = {
  heading: string;
  body: string[];
};

const TRUST_BADGES = [
  { icon: ShieldCheck, label: "Your data is never sold" },
  { icon: Lock, label: "Encrypted in transit" },
  { icon: Globe, label: "GDPR compliant" },
];

export default function LegalPage({
  title,
  updated,
  intro,
  sections,
}: {
  title: string;
  updated: string;
  intro: string;
  sections: LegalSection[];
}) {
  return (
    <div className="overflow-x-hidden">

      {/* ── Hero ── */}
      <section className="relative pt-36 pb-20 px-6 overflow-hidden border-b border-[var(--border)]">
        {/* background grid */}
        <div
          className="absolute inset-0 pointer-events-none opacity-[0.035] dark:opacity-[0.06]"
          style={{
            backgroundImage: "linear-gradient(var(--border) 1px, transparent 1px), linear-gradient(90deg, var(--border) 1px, transparent 1px)",
            backgroundSize: "48px 48px",
          }}
        />
        {/* glow */}
        <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-[var(--brand)] opacity-[0.07] blur-[120px] rounded-full pointer-events-none" />

        <div className="relative max-w-5xl mx-auto">
          <div className="inline-flex items-center gap-2 border border-[var(--border)] text-[var(--text-muted)] text-xs px-3 py-1.5 rounded-full mb-8 bg-[var(--surface)]">
            Last updated {updated}
          </div>
          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight leading-[1.0] mb-8 text-[var(--text-primary)]">
            {title}
          </h1>
          <p className="text-[var(--text-secondary)] text-lg leading-relaxed max-w-2xl mb-10">
            {intro}
          </p>

          {/* Trust badges */}
          <div className="flex flex-wrap gap-3">
            {TRUST_BADGES.map(({ icon: Icon, label }) => (
              <div
                key={label}
                className="flex items-center gap-2 bg-[var(--surface)] border border-[var(--border)] px-4 py-2 rounded-full text-sm text-[var(--text-secondary)]"
              >
                <Icon className="w-4 h-4 text-[var(--brand)]" />
                {label}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Body ── */}
      <div className="max-w-5xl mx-auto px-6 py-16 pb-32 grid lg:grid-cols-[200px_1fr] gap-16 items-start">

        {/* Sticky TOC */}
        <aside className="hidden lg:block sticky top-28">
          <p className="text-[10px] font-bold text-[var(--text-muted)] uppercase tracking-widest mb-4">
            On this page
          </p>
          <nav className="space-y-0.5 border-l border-[var(--border)]">
            {sections.map((section, i) => (
              <a
                key={i}
                href={`#section-${i}`}
                className="group flex items-center gap-0 pl-4 py-2 text-sm text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors leading-snug relative"
              >
                <span className="absolute left-0 top-1/2 -translate-y-1/2 w-px h-5 bg-[var(--brand)] opacity-0 group-hover:opacity-100 transition-opacity" />
                {section.heading.replace(/^\d+\.\s*/, "")}
              </a>
            ))}
          </nav>
          <div className="mt-8 pt-6 border-t border-[var(--border)] space-y-2">
            <p className="text-[10px] font-bold text-[var(--text-muted)] uppercase tracking-widest">
              Questions
            </p>
            <Link href="/contact" className="flex items-center gap-1.5 text-sm text-[var(--brand)] hover:underline">
              <Mail className="w-3.5 h-3.5" />
              Contact us
            </Link>
          </div>
        </aside>

        {/* Sections */}
        <article className="space-y-4">
          {sections.map((section, i) => (
            <div
              key={i}
              id={`section-${i}`}
              className="group relative bg-[var(--surface)] border border-[var(--border)] rounded-2xl p-8 overflow-hidden scroll-mt-32 hover:border-[var(--brand)]/40 transition-colors duration-300"
            >
              {/* Ghost number */}
              <span
                aria-hidden="true"
                className="absolute right-5 top-1/2 -translate-y-1/2 text-[9rem] font-black text-[var(--text-primary)] opacity-[0.03] leading-none select-none pointer-events-none"
              >
                {String(i + 1).padStart(2, "0")}
              </span>

              {/* Section number pill */}
              <span className="inline-flex items-center text-xs font-bold text-[var(--brand)] bg-[var(--brand-light)] px-2.5 py-1 rounded-full mb-4">
                {String(i + 1).padStart(2, "0")}
              </span>

              <h2 className="text-lg font-bold text-[var(--text-primary)] mb-5 leading-snug">
                {section.heading.replace(/^\d+\.\s*/, "")}
              </h2>

              <div className="space-y-4">
                {section.body.map((paragraph, j) => (
                  <p key={j} className="text-[15px] text-[var(--text-secondary)] leading-[1.85]">
                    {paragraph}
                  </p>
                ))}
              </div>
            </div>
          ))}

          {/* Footer */}
          <div className="mt-6 p-6 rounded-2xl border border-[var(--border)] bg-[var(--surface)] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <p className="text-sm font-semibold text-[var(--text-primary)] mb-0.5">Still have questions?</p>
              <p className="text-sm text-[var(--text-muted)]">We're happy to help clarify anything in plain language.</p>
            </div>
            <Link
              href="/contact"
              className="btn-primary px-5 py-2.5 text-sm font-semibold whitespace-nowrap inline-flex items-center gap-2 flex-shrink-0"
            >
              <Mail className="w-4 h-4" />
              Get in touch
            </Link>
          </div>
        </article>
      </div>
    </div>
  );
}
