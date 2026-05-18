"use client";

import Link from "next/link";
import { useState } from "react";
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
      "Open DineDash and tap the Scan tab.",
      "Point your camera at the QR code on your table — your dining session opens automatically.",
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
      "Order everything in one go for the best chance at a top-tier refund.",
      "No need to flag down a waiter — your order goes straight to the kitchen.",
    ],
  },
  {
    num: 3,
    icon: CreditCard,
    title: "Pay the full price upfront",
    color: "bg-green-600",
    details: [
      "When your order is complete, tap 'Pay & start timer' at the bottom of the screen.",
      "DineDash charges the FULL price of your order to your card, Apple Pay, or Google Pay.",
      "Payments are processed securely by Stripe — your card details never touch DineDash's servers.",
      "Your speed timer starts the moment payment confirms — no staff action needed.",
      "If you change your mind before paying, just back out — you're charged nothing.",
    ],
  },
  {
    num: 4,
    icon: Timer,
    title: "Beat the timer",
    color: "bg-green-600",
    details: [
      "Once you've paid, a big pulsing timer appears on the Session screen.",
      "The timer changes colour as you cross each tier — green for the top tier, amber, then red.",
      "Encouraging milestones pop up at 15, 30, and 45 minutes — no pressure, just cheers.",
      "The percentage shown next to the timer is your CURRENT refund — it's locked in if you go to the till right now.",
      "You can leave the app and come back at any time — the timer keeps running on the server.",
    ],
  },
  {
    num: 5,
    icon: Award,
    title: "Scan the till QR to get your refund",
    color: "bg-green-600",
    details: [
      "When you're ready to leave, tap 'Scan till QR to claim refund' on the Session screen.",
      "Walk to the restaurant's till and scan the till's QR code with your phone.",
      "DineDash works out your refund based on how long you took, then sends the money back to the card you paid with.",
      "Refunds usually appear on your card within 5 business days, depending on your bank.",
      "IMPORTANT: if you walk out without scanning the till QR, no refund is issued — you keep paying full price.",
    ],
  },
];

const accordionSections = [
  {
    icon: Zap,
    title: "What is DineDash?",
    color: "bg-green-600",
    content: [
      "DineDash rewards you for eating quickly — the faster you finish, the bigger your refund.",
      "Finish in under 15 minutes for a 30% refund.",
      "Finish in under 30 minutes for a 20% refund.",
      "Finish in under 45 minutes for a 10% refund.",
      "If you take longer than 45 minutes, no refund is issued — you simply pay full price.",
      "Every restaurant can tweak its own time limits and refund percentages, so check the restaurant's screen for the exact tiers.",
    ],
  },
  {
    icon: Lock,
    title: "No signup required",
    color: "bg-green-600",
    content: [
      "There's no account, no email, no password — your phone is your ticket.",
      "DineDash creates an anonymous device ID the first time you open the app and stores it locally.",
      "We never ask for your name, phone number, or email.",
      "If you delete the app, your anonymous ID is gone — there's nothing to log in to next time.",
    ],
  },
  {
    icon: Shield,
    title: "Paying upfront",
    color: "bg-amber-500",
    content: [
      "When your order is complete, tap 'Pay & start timer' at the bottom of the screen.",
      "DineDash charges the FULL price of your order to your card, Apple Pay, or Google Pay.",
      "Payments are processed securely by Stripe — your card details never touch DineDash's servers.",
      "Your speed timer starts the moment payment confirms — no staff action needed.",
      "If you change your mind before paying, just back out — you're charged nothing.",
    ],
  },
  {
    icon: Timer,
    title: "Beating the timer",
    color: "bg-green-600",
    content: [
      "Once you've paid, a big pulsing timer appears on the Session screen.",
      "The timer changes colour as you cross each tier — green for the top tier, amber, then red.",
      "Encouraging milestones pop up at 15, 30, and 45 minutes — no pressure, just cheers.",
      "The percentage shown next to the timer is your CURRENT refund — it's locked in if you go to the till right now.",
      "You can leave the app and come back at any time — the timer keeps running on the server.",
    ],
  },
  {
    icon: Award,
    title: "Claiming your refund",
    color: "bg-green-600",
    content: [
      "When you're ready to leave, tap 'Scan till QR to claim refund' on the Session screen.",
      "Walk to the restaurant's till and scan the till's QR code with your phone.",
      "DineDash works out your refund based on how long you took, then sends the money back to the card you paid with.",
      "Refunds usually appear on your card within 5 business days, depending on your bank.",
      "IMPORTANT: if you walk out without scanning the till QR, no refund is issued — you keep paying full price.",
    ],
  },
  {
    icon: Lightbulb,
    title: "Tips for the biggest refund",
    color: "bg-amber-500",
    content: [
      "Decide what you want before scanning the QR — every second after payment counts.",
      "Order everything in one go — adding items mid-meal slows you down.",
      "Have your phone ready when you finish so you can scan the till QR immediately.",
      "Set Apple Pay or Google Pay as your default before your first visit — it makes payment instant.",
      "Got time to spare? Even the slowest tier still saves you money — finishing under 45 minutes still earns 10% back.",
    ],
  },
  {
    icon: Store,
    title: "For restaurant owners",
    color: "bg-green-600",
    content: [
      "Diners use DineDash anonymously and for free — only restaurants need an account.",
      "Tap Profile, then 'Owner Sign In' to create or sign into your owner account.",
      "From the dashboard you can manage your restaurant, menu, tables, and live sessions.",
      "Print the table QR codes from the QR Codes screen and place them on each table.",
      "Print the till QR code and display it at your payment counter — diners need it to claim refunds.",
    ],
  },
];

const discountTiers = [
  { time: "Under 15 min", discount: "30%", color: "text-green-600 dark:text-green-400", bg: "bg-green-50 dark:bg-green-500/10 border-green-300 dark:border-green-500/30", desc: "Highest refund — eat efficiently" },
  { time: "Under 30 min", discount: "20%", color: "text-amber-500 dark:text-amber-400", bg: "bg-amber-50 dark:bg-amber-500/10 border-amber-300 dark:border-amber-500/30", desc: "Great refund — comfortable pace" },
  { time: "Under 45 min", discount: "10%", color: "text-amber-600 dark:text-amber-400", bg: "bg-amber-50 dark:bg-amber-500/10 border-amber-400 dark:border-amber-500/30", desc: "Good refund — relaxed dining" },
  { time: "Over 45 min",  discount: "0%",  color: "text-stone-400 dark:text-slate-500", bg: "bg-stone-50 dark:bg-slate-700/20 border-stone-200 dark:border-slate-600/30", desc: "No refund — full price only" },
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

export default function HowItWorksPage() {
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
            Pay first. Eat fast. Get money back. Here's everything you need to know about the DineDash dining experience.
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
            <h2 className="text-3xl font-extrabold text-[var(--text-primary)] mb-3">Pay first. Eat fast. Get money back.</h2>
            <p className="text-[var(--text-secondary)] max-w-xl mx-auto">
              Scan your table QR, order, pay the full price upfront, then beat the timer for an automatic refund of your speed discount — straight back to your card.
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
          <p className="text-green-100 text-lg mb-8">Download DineDash and earn your first refund today. No signup needed.</p>
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
