import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Check, X, Zap } from "lucide-react";
import { getContent } from "@/lib/getContent";

export const revalidate = 0;

export const metadata: Metadata = {
  title: "Pricing",
  description:
    "Simple monthly plans for restaurants. Starter at £49/month, Growth at £99/month, Enterprise at £249/month. 30-day free trial via the App Store or Google Play.",
  alternates: { canonical: "/pricing" },
  openGraph: {
    title: "Pricing | DineDash",
    description: "Simple monthly plans from £49/month. 30-day free trial via the App Store or Google Play.",
    url: "https://dinedash.app/pricing",
  },
};

interface DbPlan {
  id: string;
  name: string;
  price: string;
  period: string;
  description: string;
  features: string[];
  highlighted: boolean;
  badge?: string;
  cta: string;
  ctaHref?: string;
}

interface DbFaq {
  id: string;
  question: string;
  answer: string;
}

const fallbackPlans = [
  {
    name: "Starter",
    price: "£49",
    period: "/month",
    description: "Perfect for independent restaurants just getting started with DineDash.",
    highlight: false,
    badge: null,
    features: [
      { text: "Up to 10 tables", included: true },
      { text: "QR code generation (table + till)", included: true },
      { text: "Digital menu management", included: true },
      { text: "Real-time session dashboard", included: true },
      { text: "Custom time tiers & discount %", included: true },
      { text: "Stripe payment processing", included: true },
      { text: "Email support", included: true },
      { text: "Multi-location management", included: false },
      { text: "Advanced analytics", included: false },
      { text: "Priority support", included: false },
    ],
    cta: "Start Free Trial",
    ctaHref: "/get-started",
  },
  {
    name: "Growth",
    price: "£99",
    period: "/month",
    description: "For established restaurants that want deeper insights and more tables.",
    highlight: true,
    badge: "Most Popular",
    features: [
      { text: "Up to 30 tables", included: true },
      { text: "QR code generation (table + till)", included: true },
      { text: "Digital menu management", included: true },
      { text: "Real-time session dashboard", included: true },
      { text: "Custom time tiers & discount %", included: true },
      { text: "Stripe payment processing", included: true },
      { text: "Priority email & chat support", included: true },
      { text: "Advanced analytics & reports", included: true },
      { text: "Multi-location management", included: false },
      { text: "Dedicated account manager", included: false },
    ],
    cta: "Start Free Trial",
    ctaHref: "/get-started",
  },
  {
    name: "Enterprise",
    price: "£249",
    period: "/month",
    description: "For restaurant groups and multi-location operators who need centralised control.",
    highlight: false,
    badge: "Best for Groups",
    features: [
      { text: "Unlimited tables", included: true },
      { text: "QR code generation (table + till)", included: true },
      { text: "Digital menu management", included: true },
      { text: "Real-time session dashboard", included: true },
      { text: "Custom time tiers & discount %", included: true },
      { text: "Stripe payment processing", included: true },
      { text: "Priority 24/7 support", included: true },
      { text: "Advanced analytics & reports", included: true },
      { text: "Multi-location management", included: true },
      { text: "Dedicated account manager", included: true },
    ],
    cta: "Contact Sales",
    ctaHref: "/contact",
  },
];

const fallbackFaqs = [
  { q: "Is there a free trial?", a: "Yes — all plans include a 30-day free trial. Approve the subscription in the App Store or Google Play to start." },
  { q: "Are there transaction fees?", a: "DineDash charges no per-transaction fees. You pay a flat monthly subscription. Stripe's standard processing fees apply to the customer's payment." },
  { q: "Who funds the customer's discount?", a: "The discount simply reduces the total the customer pays at checkout — you receive the discounted amount directly. There's no separate refund to fund; the subscription fee is what covers DineDash." },
  { q: "Can I switch plans?", a: "Yes. You can upgrade or downgrade at any time. Changes take effect at the start of your next billing cycle." },
  { q: "What happens if I cancel?", a: "You can cancel at any time. Your account remains active until the end of your paid period, then closes automatically." },
  { q: "Is there an annual discount?", a: "Yes — paying annually gives you 2 months free (equivalent to ~17% off). Contact us to switch to annual billing." },
];

export default async function PricingPage() {
  const dbPlans = await getContent<DbPlan[]>("pricing");
  const dbFaqs = await getContent<DbFaq[]>("faqs");

  const plans = dbPlans && dbPlans.length > 0
    ? dbPlans.map((p) => ({
        name: p.name,
        price: p.price,
        period: p.period,
        description: p.description,
        highlight: p.highlighted,
        badge: p.badge || null,
        features: p.features.map((text) => ({ text, included: true })),
        cta: p.cta,
        ctaHref: p.ctaHref || "/get-started",
      }))
    : fallbackPlans;

  const faqs = dbFaqs && dbFaqs.length > 0
    ? dbFaqs.map((f) => ({ q: f.question, a: f.answer }))
    : fallbackFaqs;

  return (
    <div className="overflow-x-hidden">
      {/* HERO */}
      <section className="relative pt-32 pb-16 px-4 text-center overflow-hidden">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[700px] h-[400px] bg-green-100 dark:bg-green-500/5 rounded-full opacity-50 blur-3xl" />
        </div>
        <div className="relative max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 bg-[var(--brand-light)] text-[var(--brand)] text-sm font-semibold px-4 py-2 rounded-full mb-6">
            <Zap className="w-4 h-4" /> Simple, transparent pricing
          </div>
          <h1 className="text-5xl md:text-6xl font-extrabold text-[var(--text-primary)] mb-6">
            Plans that grow<br />
            <span className="gradient-text">with your restaurant</span>
          </h1>
          <p className="text-xl text-[var(--text-secondary)] mb-4">
            No hidden fees. No per-transaction charges. Cancel any time.
          </p>
          <p className="text-[var(--text-muted)] text-sm">All plans include a 30-day free trial • Annual billing saves 2 months</p>
        </div>
      </section>

      {/* PLANS */}
      <section className="pb-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-3 gap-6">
            {plans.map((plan) => (
              <div
                key={plan.name}
                className={`rounded-3xl p-8 relative ${
                  plan.highlight
                    ? "bg-[var(--surface-dark)] text-white border-2 border-[var(--brand)] shadow-2xl scale-105"
                    : "bg-[var(--surface)] border-2 border-[var(--border)]"
                }`}
              >
                {plan.badge && (
                  <div className={`absolute -top-3.5 left-1/2 -translate-x-1/2 text-xs font-bold px-4 py-1.5 rounded-full ${
                    plan.highlight ? "bg-[var(--brand)] text-[#0F1623]" : "bg-[var(--surface-dark)] text-white"
                  }`}>
                    {plan.badge}
                  </div>
                )}
                <div className="mb-6">
                  <h3 className={`text-xl font-bold mb-1 ${plan.highlight ? "text-white" : "text-[var(--text-primary)]"}`}>{plan.name}</h3>
                  <div className="flex items-end gap-1 mb-3">
                    <span className={`text-5xl font-extrabold ${plan.highlight ? "text-[var(--brand)]" : "text-[var(--text-primary)]"}`}>{plan.price}</span>
                    <span className={`text-sm mb-2 ${plan.highlight ? "text-white/50" : "text-[var(--text-muted)]"}`}>{plan.period}</span>
                  </div>
                  <p className={`text-sm leading-relaxed ${plan.highlight ? "text-white/50" : "text-[var(--text-muted)]"}`}>{plan.description}</p>
                </div>

                <Link
                  href={plan.ctaHref}
                  className={`w-full flex items-center justify-center gap-2 font-bold py-3.5 rounded-full mb-8 transition-colors ${
                    plan.highlight
                      ? "bg-[var(--brand)] text-[#0F1623] hover:opacity-90"
                      : "bg-[var(--surface-dark)] text-white hover:opacity-90"
                  }`}
                >
                  {plan.cta} <ArrowRight className="w-4 h-4" />
                </Link>

                <ul className="space-y-3">
                  {plan.features.map((feat) => (
                    <li key={feat.text} className="flex items-center gap-3 text-sm">
                      {feat.included ? (
                        <div className="w-5 h-5 bg-[var(--brand-light)] rounded-full flex items-center justify-center flex-shrink-0">
                          <Check className="w-3 h-3 text-[var(--brand)]" />
                        </div>
                      ) : (
                        <div className="w-5 h-5 bg-[var(--border)] rounded-full flex items-center justify-center flex-shrink-0">
                          <X className="w-3 h-3 text-[var(--text-muted)]" />
                        </div>
                      )}
                      <span className={
                        feat.included
                          ? (plan.highlight ? "text-white/80" : "text-[var(--text-secondary)]")
                          : (plan.highlight ? "text-white/30" : "text-[var(--text-muted)]")
                      }>
                        {feat.text}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <p className="text-center text-[var(--text-muted)] text-sm mt-8">
            All prices exclude VAT. Stripe transaction fees apply to customer payments (typically ~1.5% + 20p per card transaction).
          </p>
        </div>
      </section>

      {/* COMPARISON TABLE */}
      <section className="section-padding px-4 bg-[var(--surface)]">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-extrabold text-[var(--text-primary)] text-center mb-10">Diners always use DineDash for free</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-[var(--surface-alt)] border border-[var(--border)] rounded-2xl p-8">
              <div className="text-4xl mb-4">🍽️</div>
              <h3 className="text-xl font-bold text-[var(--text-primary)] mb-4">For diners — always free</h3>
              <ul className="space-y-3">
                {["Download the app — free","Quick one-time sign-in","Scan any participating restaurant","Eat fast to earn your discount","Pay via card or cash — discount already applied"].map((item) => (
                  <li key={item} className="flex items-center gap-3 text-sm text-[var(--text-secondary)]">
                    <Check className="w-4 h-4 text-[var(--brand)] flex-shrink-0" /> {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-[var(--surface-dark)] text-white rounded-2xl p-8">
              <div className="text-4xl mb-4">🏪</div>
              <h3 className="text-xl font-bold text-white mb-4">For restaurants — subscription</h3>
              <ul className="space-y-3">
                {["Monthly subscription (£49–£249/mo)","No per-transaction fees","30-day free trial via App Store or Google Play","Cancel any time","Full dashboard + QR code generation"].map((item) => (
                  <li key={item} className="flex items-center gap-3 text-sm text-white/70">
                    <Check className="w-4 h-4 text-[var(--brand)] flex-shrink-0" /> {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="section-padding px-4 bg-[var(--surface-alt)]">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-extrabold text-[var(--text-primary)] text-center mb-10">Pricing FAQs</h2>
          <div className="space-y-4">
            {faqs.map((faq) => (
              <div key={faq.q} className="bg-[var(--surface)] border border-[var(--border)] rounded-2xl p-6">
                <h3 className="font-bold text-[var(--text-primary)] mb-2">{faq.q}</h3>
                <p className="text-[var(--text-muted)] text-sm leading-relaxed">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding px-4 bg-green-600 text-white">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-extrabold mb-4">Try DineDash free for 30 days</h2>
          <p className="text-green-100 text-lg mb-8">Approve your free trial via the App Store or Google Play. Cancel any time. Be live in under 1 hour.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/get-started" className="bg-white text-green-700 font-bold px-8 py-3.5 rounded-full hover:bg-green-50 transition-colors inline-flex items-center gap-2">
              Start Free Trial <ArrowRight className="w-5 h-5" />
            </Link>
            <Link href="/contact" className="border-2 border-white/60 text-white font-semibold px-8 py-3.5 rounded-full hover:bg-white/10 transition-colors">
              Talk to Sales
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
