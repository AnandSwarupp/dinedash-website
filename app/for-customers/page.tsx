import type { Metadata } from "next";
import Link from "next/link";
import { Check, QrCode, Timer, CreditCard, Award, Lock, Zap, Smartphone, Shield } from "lucide-react";
import { getContent } from "@/lib/getContent";

export const revalidate = 0;

export const metadata: Metadata = {
  title: "For Customers",
  description:
    "Earn up to 30% back on your restaurant meal just by eating quickly. No signup, no loyalty card, no account — just scan, eat, and get refunded automatically.",
  alternates: { canonical: "/for-customers" },
  openGraph: {
    title: "For Customers | DineDash",
    description: "Earn up to 30% back on your meal. No signup needed. Refund goes straight to your card.",
    url: "https://dinedash.app/for-customers",
  },
};

interface DbTier {
  id: string;
  label: string;
  time: string;
  discount: string;
  description: string;
}

const tierStyles = [
  { color: "text-green-600 dark:text-green-400", bg: "bg-green-50 dark:bg-green-500/10 border-green-300 dark:border-green-500/30" },
  { color: "text-amber-500 dark:text-amber-400", bg: "bg-amber-50 dark:bg-amber-500/10 border-amber-300 dark:border-amber-500/30" },
  { color: "text-amber-600 dark:text-amber-400", bg: "bg-amber-50 dark:bg-amber-500/10 border-amber-400 dark:border-amber-500/30" },
  { color: "text-stone-400 dark:text-slate-500", bg: "bg-stone-50 dark:bg-slate-700/20 border-stone-200 dark:border-slate-600/30" },
];

const steps = [
  { num: 1, icon: QrCode, title: "Scan the table QR", desc: "Open DineDash, tap Scan, and point at the QR code on your table. Your session opens automatically.", color: "bg-green-600" },
  { num: 2, icon: CreditCard, title: "Order & pay upfront", desc: "Browse the menu, add items, then tap 'Pay & start timer'. Full price charged via Stripe, Apple Pay, or Google Pay.", color: "bg-amber-500" },
  { num: 3, icon: Timer, title: "Watch the timer", desc: "A live timer shows your current refund percentage. Green = 30%, amber = 20%, orange = 10%.", color: "bg-green-600" },
  { num: 4, icon: Award, title: "Scan the till & claim", desc: "Walk to the counter, scan the till QR, and your refund goes straight back to your card. Done.", color: "bg-green-600" },
];

const features = [
  { icon: Lock, title: "Zero signup required", desc: "No account, no email, no password. Your phone creates an anonymous ID — that's it.", iconBg: "bg-[var(--brand-light)]", iconColor: "text-[var(--brand)]" },
  { icon: Shield, title: "Stripe-secured payments", desc: "Your card details never touch DineDash servers. PCI-DSS compliant, bank-level security.", iconBg: "bg-blue-100 dark:bg-blue-500/10", iconColor: "text-blue-700 dark:text-blue-400" },
  { icon: Zap, title: "Instant refund calculation", desc: "The moment you scan the till QR, your refund is calculated and the return is initiated automatically.", iconBg: "bg-amber-100 dark:bg-amber-500/10", iconColor: "text-amber-700 dark:text-amber-400" },
  { icon: Smartphone, title: "Leave the app anytime", desc: "The timer runs on our servers. Lock your phone, go back to the app later — it's all still there.", iconBg: "bg-[var(--brand-light)]", iconColor: "text-[var(--brand)]" },
];

const tips = [
  "Decide what you want before scanning the QR — every second after payment counts.",
  "Order everything in one go — adding items mid-meal slows you down.",
  "Have your phone ready when you finish so you can scan the till QR immediately.",
  "Set Apple Pay or Google Pay as your default — it makes payment instant.",
  "Even the slowest tier saves you money — finishing under 45 minutes earns 10% back.",
];

const fallbackDiscountTiers = [
  { time: "Under 15 min", discount: "30%", color: "text-green-600 dark:text-green-400", bg: "bg-green-50 dark:bg-green-500/10 border-green-300 dark:border-green-500/30" },
  { time: "Under 30 min", discount: "20%", color: "text-amber-500 dark:text-amber-400", bg: "bg-amber-50 dark:bg-amber-500/10 border-amber-300 dark:border-amber-500/30" },
  { time: "Under 45 min", discount: "10%", color: "text-amber-600 dark:text-amber-400", bg: "bg-amber-50 dark:bg-amber-500/10 border-amber-400 dark:border-amber-500/30" },
  { time: "Over 45 min",  discount: "0%",  color: "text-stone-400 dark:text-slate-500", bg: "bg-stone-50 dark:bg-slate-700/20 border-stone-200 dark:border-slate-600/30" },
];

export default async function ForCustomersPage() {
  const dbTiers = await getContent<DbTier[]>("tiers");

  const discountTiers = dbTiers && dbTiers.length > 0
    ? dbTiers.map((t, i) => ({
        time: t.time,
        discount: t.discount,
        ...(tierStyles[i] ?? tierStyles[tierStyles.length - 1]),
      }))
    : fallbackDiscountTiers;

  return (
    <div className="overflow-x-hidden">
      {/* HERO */}
      <section className="relative pt-32 pb-20 px-4 bg-[var(--surface-alt)] overflow-hidden">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-40 -right-40 w-[500px] h-[500px] bg-green-100 dark:bg-green-500/5 rounded-full opacity-60 blur-3xl" />
          <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-amber-100 dark:bg-amber-500/5 rounded-full opacity-40 blur-3xl" />
        </div>
        <div className="relative max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-[var(--brand-light)] border border-[var(--brand)]/20 text-[var(--brand)] text-sm font-semibold px-4 py-2 rounded-full mb-6">
            <Zap className="w-4 h-4 fill-[var(--brand)] text-[var(--brand)]" /> For diners
          </div>
          <h1 className="text-5xl md:text-6xl font-extrabold text-[var(--text-primary)] leading-tight mb-6">
            Eat at restaurants.<br />
            <span className="gradient-text">Get money back.</span>
          </h1>
          <p className="text-xl text-[var(--text-secondary)] mb-10 max-w-2xl mx-auto">
            No loyalty cards. No accounts. No points. Just scan a QR code, eat your meal, and get a real cash refund automatically — straight to your card.
          </p>
          <div className="flex flex-wrap justify-center gap-3 mb-10">
            {discountTiers.map((t) => (
              <div key={t.discount} className={`border-2 rounded-xl px-5 py-3 text-center ${t.bg}`}>
                <div className={`text-2xl font-extrabold ${t.color}`}>{t.discount}</div>
                <div className="text-xs text-[var(--text-muted)] mt-0.5 font-medium">{t.time}</div>
              </div>
            ))}
          </div>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <div className="bg-[var(--surface-dark)] text-white font-bold px-8 py-3.5 rounded-2xl flex items-center gap-3 cursor-pointer hover:opacity-90 transition-opacity">
              <span className="text-2xl">🍎</span>
              <div className="text-left">
                <div className="text-white/60 text-xs">Download on the</div>
                <div className="text-base">App Store</div>
              </div>
            </div>
            <div className="bg-[var(--surface-dark)] text-white font-bold px-8 py-3.5 rounded-2xl flex items-center gap-3 cursor-pointer hover:opacity-90 transition-opacity">
              <span className="text-2xl">▶️</span>
              <div className="text-left">
                <div className="text-white/60 text-xs">Get it on</div>
                <div className="text-base">Google Play</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="section-padding px-4 bg-[var(--surface)]">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-14">
            <h2 className="text-4xl font-extrabold text-[var(--text-primary)] mb-4">How it works for you</h2>
            <p className="text-[var(--text-muted)] text-lg">4 simple steps. One automatic refund.</p>
          </div>
          <div className="grid md:grid-cols-4 gap-8">
            {steps.map((step) => (
              <div key={step.num} className="text-center">
                <div className={`${step.color} w-20 h-20 rounded-2xl flex items-center justify-center shadow-lg mx-auto mb-5 relative`}>
                  <step.icon className="w-9 h-9 text-white" />
                  <div className="absolute -top-2 -right-2 w-7 h-7 bg-[var(--surface)] border-2 border-[var(--border)] rounded-full flex items-center justify-center text-xs font-extrabold text-[var(--text-primary)]">
                    {step.num}
                  </div>
                </div>
                <h3 className="font-bold text-[var(--text-primary)] mb-2">{step.title}</h3>
                <p className="text-sm text-[var(--text-muted)] leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section className="section-padding px-4 bg-[var(--surface-alt)]">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-14">
            <h2 className="text-4xl font-extrabold text-[var(--text-primary)] mb-4">Simple. Private. Secure.</h2>
            <p className="text-[var(--text-muted)] text-lg">We built DineDash around your privacy and security.</p>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            {features.map((f) => (
              <div key={f.title} className="bg-[var(--surface)] border border-[var(--border)] rounded-2xl p-7 card-hover">
                <div className={`inline-flex items-center justify-center w-12 h-12 rounded-xl mb-4 ${f.iconBg}`}>
                  <f.icon className={`w-6 h-6 ${f.iconColor}`} />
                </div>
                <h3 className="font-bold text-[var(--text-primary)] text-lg mb-2">{f.title}</h3>
                <p className="text-[var(--text-muted)] text-sm leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TIPS */}
      <section className="section-padding px-4 bg-[var(--surface)]">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-10">
            <div className="inline-flex items-center gap-2 bg-amber-100 dark:bg-amber-500/10 text-amber-700 dark:text-amber-400 text-sm font-semibold px-4 py-2 rounded-full mb-4">
              💡 Pro tips
            </div>
            <h2 className="text-3xl font-extrabold text-[var(--text-primary)]">Tips for the biggest refund</h2>
          </div>
          <div className="bg-[var(--surface-alt)] border border-[var(--border)] rounded-2xl p-8">
            <ul className="space-y-4">
              {tips.map((tip, i) => (
                <li key={i} className="flex items-start gap-4">
                  <div className="w-6 h-6 bg-[var(--brand-light)] rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Check className="w-3.5 h-3.5 text-[var(--brand)]" />
                  </div>
                  <span className="text-[var(--text-secondary)] leading-relaxed">{tip}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* DOWNLOAD CTA */}
      <section className="section-padding px-4 bg-gradient-to-br from-green-600 to-emerald-500 text-white">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-extrabold mb-4">Download DineDash today</h2>
          <p className="text-green-100 text-lg mb-8">No signup needed. Walk into any participating restaurant and start saving.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <div className="bg-white/15 hover:bg-white/25 border-2 border-white/30 rounded-2xl px-8 py-4 flex items-center gap-4 cursor-pointer transition-colors">
              <span className="text-3xl">🍎</span>
              <div className="text-left">
                <div className="text-white/70 text-xs">Download on the</div>
                <div className="text-white font-bold text-lg">App Store</div>
              </div>
            </div>
            <div className="bg-white/15 hover:bg-white/25 border-2 border-white/30 rounded-2xl px-8 py-4 flex items-center gap-4 cursor-pointer transition-colors">
              <span className="text-3xl">▶️</span>
              <div className="text-left">
                <div className="text-white/70 text-xs">Get it on</div>
                <div className="text-white font-bold text-lg">Google Play</div>
              </div>
            </div>
          </div>
          <p className="mt-6 text-green-100 text-sm">
            Are you a restaurant owner?{" "}
            <Link href="/get-started" className="text-white font-semibold underline underline-offset-2">
              Start your free trial →
            </Link>
          </p>
        </div>
      </section>
    </div>
  );
}
