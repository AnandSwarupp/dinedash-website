"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import {
  QrCode, Timer, CreditCard, Zap, ArrowRight,
  ChevronDown, Shield, ChefHat, Lock,
  Award, Lightbulb, Store
} from "lucide-react";

const steps = [
  {
    num: 1,
    icon: QrCode,
    title: "Scan the QR code on your table",
    color: "bg-green-600",
    details: [
      "Open DineDash and sign in — a quick one-time step with your phone, email, or Apple/Google account.",
      "Tap the Scan tab and point your camera at the QR code on your table — your dining session opens automatically.",
      "Browse the in-app menu and tap + on each item you want.",
      "Your running total appears in a bar at the bottom of the screen.",
      "Tap items more than once to add more, or tap × on any item to remove it.",
    ],
  },
  {
    num: 2,
    icon: ChefHat,
    title: "Add items to your order",
    color: "bg-amber-500",
    details: [
      "Browse the restaurant's full digital menu inside the app.",
      "Tap + to add any item — your running total updates instantly.",
      "Order everything in one go for the best chance at a top-tier discount.",
      "No need to flag down a waiter — your order goes straight to the kitchen.",
    ],
  },
  {
    num: 3,
    icon: CreditCard,
    title: "Start the timer",
    color: "bg-green-600",
    details: [
      "When your order is complete, tap 'Start timer' at the bottom of the screen.",
      "No payment happens yet — this just confirms your order and starts your speed clock.",
      "Payment happens once, later, when you're ready to leave — nothing is charged now.",
      "If you want to add more items after starting, you can — just note the clock keeps running.",
    ],
  },
  {
    num: 4,
    icon: Timer,
    title: "Eat fast",
    color: "bg-green-600",
    details: [
      "A big pulsing timer appears on the Session screen the moment you start.",
      "The timer changes colour as you cross each tier — green for the top tier, amber, then red.",
      "Encouraging milestones pop up at 15, 30, and 45 minutes — no pressure, just cheers.",
      "The percentage shown next to the timer is your CURRENT discount — it's locked in the moment you pay.",
      "You can leave the app and come back at any time — the timer keeps running on the server.",
    ],
  },
  {
    num: 5,
    icon: Award,
    title: "Pay & get your discount",
    color: "bg-green-600",
    details: [
      "When you're ready to leave, tap 'Scan till QR to pay' on the Session screen.",
      "Walk to the restaurant's till and scan the till's QR code with your phone.",
      "DineDash works out your discount based on how long you took, then charges your card via Stripe for the discounted total — or pay cash at the till.",
      "Card payments are processed securely by Stripe — your card details never touch DineDash's servers.",
      "IMPORTANT: your order isn't paid until you scan the till QR — the timer doesn't pay your bill for you.",
    ],
  },
];

const accordionSections = [
  {
    icon: Zap,
    title: "What is DineDash?",
    color: "bg-green-600",
    content: [
      "DineDash rewards you for eating quickly — the faster you finish, the bigger your discount.",
      "Finish in under 15 minutes for 30% off.",
      "Finish in under 30 minutes for 20% off.",
      "Finish in under 45 minutes for 10% off.",
      "If you take longer than 45 minutes, no discount applies — you simply pay full price.",
      "Every restaurant can tweak its own time limits and discount percentages, so check the restaurant's screen for the exact tiers.",
    ],
  },
  {
    icon: Lock,
    title: "Quick sign-in",
    color: "bg-green-600",
    content: [
      "Sign in once with your phone number, email, or Apple/Google account — it takes seconds.",
      "Your details are saved, so you won't need to sign in again on that device.",
      "No loyalty cards, no points — just a simple account that remembers you.",
      "Signing in also means your order history is there next time you visit.",
    ],
  },
  {
    icon: Shield,
    title: "How payment works",
    color: "bg-amber-500",
    content: [
      "Starting your order and starting the timer doesn't charge you anything.",
      "Payment happens once, at the end — tap 'Scan till QR to pay' when you're ready to leave.",
      "DineDash calculates your discount and charges your card via Stripe for the discounted total — or you can pay cash at the till instead.",
      "Card payments are processed securely by Stripe — your card details never touch DineDash's servers.",
      "There's no separate refund step — the discount is already taken off before you pay.",
    ],
  },
  {
    icon: Timer,
    title: "Eating fast",
    color: "bg-green-600",
    content: [
      "A big pulsing timer appears on the Session screen the moment you start.",
      "The timer changes colour as you cross each tier — green for the top tier, amber, then red.",
      "Encouraging milestones pop up at 15, 30, and 45 minutes — no pressure, just cheers.",
      "The percentage shown next to the timer is your CURRENT discount — it's locked in the moment you pay.",
      "You can leave the app and come back at any time — the timer keeps running on the server.",
    ],
  },
  {
    icon: Award,
    title: "Paying at the till",
    color: "bg-green-600",
    content: [
      "When you're ready to leave, tap 'Scan till QR to pay' on the Session screen.",
      "Walk to the restaurant's till and scan the till's QR code with your phone.",
      "DineDash works out your discount based on how long you took, then charges your card for the discounted total.",
      "There's nothing to claim afterwards — the discount is already applied before you pay.",
      "IMPORTANT: if you don't scan the till QR, your order isn't paid — the timer alone doesn't settle your bill.",
    ],
  },
  {
    icon: Lightbulb,
    title: "Tips for the biggest discount",
    color: "bg-amber-500",
    content: [
      "Decide what you want before scanning the QR — every second after starting counts.",
      "Order everything in one go — adding items mid-meal slows you down.",
      "Have your phone ready when you finish so you can scan the till QR immediately.",
      "Add your card in the app before your first visit — it makes checkout instant. Paying cash works too.",
      "Got time to spare? Even the slowest tier still saves you money — finishing under 45 minutes still gets 10% off.",
    ],
  },
  {
    icon: Store,
    title: "For restaurant owners",
    color: "bg-green-600",
    content: [
      "Diners sign in and use DineDash for free — only restaurants pay a subscription.",
      "Tap Profile, then 'Owner Sign In' to create or sign into your owner account.",
      "From the dashboard you can manage your restaurant, menu, tables, and live sessions.",
      "Print the table QR codes from the QR Codes screen and place them on each table.",
      "Print the till QR code and display it at your payment counter — diners need it to pay with their discount applied.",
    ],
  },
];

const fallbackTierStyles = [
  { color: "text-green-600 dark:text-green-400", bg: "bg-green-50 dark:bg-green-500/10 border-green-300 dark:border-green-500/30", desc: "Biggest discount — eat efficiently" },
  { color: "text-amber-500 dark:text-amber-400", bg: "bg-amber-50 dark:bg-amber-500/10 border-amber-300 dark:border-amber-500/30", desc: "Great discount — comfortable pace" },
  { color: "text-amber-600 dark:text-amber-400", bg: "bg-amber-50 dark:bg-amber-500/10 border-amber-400 dark:border-amber-500/30", desc: "Good discount — relaxed dining" },
  { color: "text-stone-400 dark:text-slate-500", bg: "bg-stone-50 dark:bg-slate-700/20 border-stone-200 dark:border-slate-600/30", desc: "No discount — full price only" },
];

const fallbackDiscountTiers = [
  { time: "Under 15 min", discount: "30%", ...fallbackTierStyles[0] },
  { time: "Under 30 min", discount: "20%", ...fallbackTierStyles[1] },
  { time: "Under 45 min", discount: "10%", ...fallbackTierStyles[2] },
  { time: "Over 45 min",  discount: "0%",  ...fallbackTierStyles[3] },
];

function Accordion({ sections }: { sections: typeof accordionSections }) {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <div className="space-y-3">
      {sections.map((s, i) => (
        <div key={i} className="bg-[var(--surface)] border border-[var(--border)] rounded-2xl overflow-hidden">
          <button
            className="w-full flex items-center gap-4 px-6 py-5 text-left"
            onClick={() => setOpen(open === i ? null : i)}
          >
            <div className={`${s.color} w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0`}>
              <s.icon className="w-5 h-5 text-white" />
            </div>
            <span className="font-semibold text-[var(--text-primary)] flex-1">{s.title}</span>
            <ChevronDown className={`w-5 h-5 text-[var(--text-muted)] flex-shrink-0 transition-transform ${open === i ? "rotate-180" : ""}`} />
          </button>
          {open === i && (
            <div className="px-6 pb-6 border-t border-[var(--border)] pt-4">
              <ul className="space-y-3">
                {s.content.map((line, j) => (
                  <li key={j} className="flex items-start gap-3 text-[var(--text-secondary)] text-sm leading-relaxed">
                    <div className="w-1.5 h-1.5 rounded-full bg-[var(--brand)] flex-shrink-0 mt-2" />
                    {line}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

export default function HowItWorksClient() {
  const [discountTiers, setDiscountTiers] = useState(fallbackDiscountTiers);

  useEffect(() => {
    fetch("/api/content/tiers")
      .then((r) => r.json())
      .then((data) => {
        if (Array.isArray(data?.data) && data.data.length > 0) {
          setDiscountTiers(data.data.map((t: { time: string; discount: string; description?: string }, i: number) => ({
            time: t.time,
            discount: t.discount,
            ...(fallbackTierStyles[i] ?? fallbackTierStyles[fallbackTierStyles.length - 1]),
            desc: t.description || (fallbackTierStyles[i] ?? fallbackTierStyles[fallbackTierStyles.length - 1]).desc,
          })));
        }
      }).catch(() => {});
  }, []);

  return (
    <div className="overflow-x-hidden">
      {/* HERO */}
      <section className="relative pt-32 pb-20 px-4 bg-[var(--surface-dark)] text-white overflow-hidden">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-40 -right-40 w-[500px] h-[500px] bg-green-600/10 rounded-full blur-3xl" />
          <div className="absolute -bottom-20 -left-20 w-[400px] h-[400px] bg-amber-500/10 rounded-full blur-3xl" />
        </div>
        <div className="relative max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-[var(--brand)]/20 text-[var(--brand)] text-sm font-semibold px-4 py-2 rounded-full mb-6">
            <Zap className="w-4 h-4" /> Complete guide
          </div>
          <h1 className="text-5xl md:text-6xl font-extrabold mb-6">
            How DineDash<br />
            <span className="text-[var(--brand)]">works</span>
          </h1>
          <p className="text-xl text-white/60 max-w-2xl mx-auto mb-8">
            Order first. Eat fast. Pay less. Here's everything you need to know about the DineDash dining experience.
          </p>
          {/* Mini tiers */}
          <div className="flex flex-wrap justify-center gap-3">
            {discountTiers.map((t) => (
              <div key={t.discount} className="bg-white/5 border border-white/10 rounded-xl px-4 py-2 text-center">
                <span className={`font-extrabold text-lg ${t.color}`}>{t.discount}</span>
                <span className="text-white/50 text-sm ml-2">{t.time}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* HERO SUMMARY CARD */}
      <section className="px-4 -mt-8 mb-0 relative z-10">
        <div className="max-w-4xl mx-auto bg-[var(--surface)] border border-[var(--border)] rounded-3xl shadow-xl p-8 md:p-12">
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-2 bg-[var(--brand-light)] text-[var(--brand)] font-semibold px-4 py-2 rounded-full text-sm mb-4">
              <Zap className="w-4 h-4 fill-[var(--brand)] text-[var(--brand)]" /> The core idea
            </div>
            <h2 className="text-3xl font-extrabold text-[var(--text-primary)] mb-3">Order first. Eat fast. Pay less.</h2>
            <p className="text-[var(--text-secondary)] max-w-xl mx-auto">
              Scan your table QR, order, and start the timer. Eat fast — the quicker you finish, the bigger the discount applied automatically when you pay at the end.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            {steps.map((step) => (
              <div key={step.num} className="flex flex-col items-center text-center">
                <div className={`${step.color} w-14 h-14 rounded-xl flex items-center justify-center mb-3 relative`}>
                  <step.icon className="w-7 h-7 text-white" />
                  <div className="absolute -top-1.5 -right-1.5 w-5 h-5 bg-[var(--surface)] border-2 border-[var(--border)] rounded-full flex items-center justify-center text-[10px] font-extrabold text-[var(--text-primary)]">
                    {step.num}
                  </div>
                </div>
                <p className="text-xs font-semibold text-[var(--text-secondary)] leading-tight">{step.title}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* DISCOUNT TIERS */}
      <section className="section-padding px-4 bg-[var(--surface-alt)]">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-extrabold text-[var(--text-primary)] text-center mb-3">Speed discount tiers</h2>
          <p className="text-[var(--text-muted)] text-center mb-10">The faster you finish, the more you get back. These are the standard tiers — each restaurant can set their own.</p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {discountTiers.map((t) => (
              <div key={t.discount} className={`border-2 rounded-2xl p-6 text-center ${t.bg}`}>
                <div className={`text-4xl font-extrabold mb-1 ${t.color}`}>{t.discount}</div>
                <div className="text-[var(--text-primary)] font-semibold text-sm">{t.time}</div>
                <div className="text-[var(--text-muted)] text-xs mt-2 leading-tight">{t.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* DETAILED STEPS */}
      <section className="section-padding px-4 bg-[var(--surface)]">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-extrabold text-[var(--text-primary)] text-center mb-3">Step-by-step breakdown</h2>
          <p className="text-[var(--text-muted)] text-center mb-12">Every detail of the DineDash experience, explained.</p>
          <div className="space-y-8">
            {steps.map((step) => (
              <div key={step.num} className="flex gap-6">
                <div className="flex flex-col items-center">
                  <div className={`${step.color} w-14 h-14 rounded-2xl flex items-center justify-center flex-shrink-0 shadow-md`}>
                    <step.icon className="w-7 h-7 text-white" />
                  </div>
                  {step.num < steps.length && <div className="w-0.5 h-full bg-[var(--border)] mt-3" />}
                </div>
                <div className="flex-1 pb-8">
                  <div className="flex items-center gap-3 mb-4">
                    <span className="bg-[var(--surface-alt)] text-[var(--text-secondary)] text-xs font-bold px-2.5 py-1 rounded-full">Step {step.num}</span>
                    <h3 className="text-xl font-bold text-[var(--text-primary)]">{step.title}</h3>
                  </div>
                  <ul className="space-y-2.5">
                    {step.details.map((detail, i) => (
                      <li key={i} className="flex items-start gap-3 text-[var(--text-secondary)] text-sm leading-relaxed">
                        <div className="w-1.5 h-1.5 rounded-full bg-[var(--brand)] flex-shrink-0 mt-2" />
                        {detail}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ACCORDION SECTIONS */}
      <section className="section-padding px-4 bg-[var(--surface-alt)]">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-extrabold text-[var(--text-primary)] text-center mb-3">Everything explained</h2>
          <p className="text-[var(--text-muted)] text-center mb-10">Tap any section to learn more about each part of DineDash.</p>
          <Accordion sections={accordionSections} />
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding px-4 bg-green-600 text-white">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-extrabold mb-4">Ready to try it?</h2>
          <p className="text-green-100 text-lg mb-8">Download DineDash and earn your first discount today. Quick sign-in, that's it.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/get-started" className="bg-white text-green-700 font-bold px-8 py-3.5 rounded-full hover:bg-green-50 transition-colors inline-flex items-center gap-2">
              Restaurant owner? Start here <ArrowRight className="w-5 h-5" />
            </Link>
            <Link href="/for-customers" className="border-2 border-white/60 text-white font-semibold px-8 py-3.5 rounded-full hover:bg-white/10 transition-colors">
              I&apos;m a diner →
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
