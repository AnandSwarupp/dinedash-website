"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import {
  QrCode, Timer, CreditCard, Zap, ArrowRight, Check,
  ChevronDown, Star, TrendingUp, Users, Clock, Shield,
  Smartphone, ChefHat, BarChart3, Banknote, Lock
} from "lucide-react";
import { FaApple, FaGooglePlay } from "react-icons/fa";
import { Reveal, RevealStagger, RevealItem } from "@/components/Reveal";

const tierStyles = [
  { color: "text-green-600 dark:text-green-400", bg: "bg-green-50 dark:bg-green-500/10 border-green-200 dark:border-green-500/30" },
  { color: "text-amber-500 dark:text-amber-400", bg: "bg-amber-50 dark:bg-amber-500/10 border-amber-200 dark:border-amber-500/30" },
  { color: "text-amber-600 dark:text-amber-400", bg: "bg-amber-50 dark:bg-amber-500/10 border-amber-200 dark:border-amber-500/30" },
  { color: "text-stone-400 dark:text-slate-500", bg: "bg-stone-50 dark:bg-slate-700/20 border-stone-200 dark:border-slate-600/30" },
];

const fallbackTiers = [
  { time: "Under 15 min", discount: "30%", color: "text-green-600 dark:text-green-400", bg: "bg-green-50 dark:bg-green-500/10 border-green-200 dark:border-green-500/30" },
  { time: "Under 30 min", discount: "20%", color: "text-amber-500 dark:text-amber-400", bg: "bg-amber-50 dark:bg-amber-500/10 border-amber-200 dark:border-amber-500/30" },
  { time: "Under 45 min", discount: "10%", color: "text-amber-600 dark:text-amber-400", bg: "bg-amber-50 dark:bg-amber-500/10 border-amber-200 dark:border-amber-500/30" },
  { time: "Over 45 min",  discount: "0%",  color: "text-stone-400 dark:text-slate-500", bg: "bg-stone-50 dark:bg-slate-700/20 border-stone-200 dark:border-slate-600/30" },
];

const steps = [
  { num: 1, icon: QrCode, title: "Scan the table QR", desc: "Open DineDash and point your camera at the QR code on your table. Your dining session opens instantly." },
  { num: 2, icon: ChefHat, title: "Add items to your order", desc: "Browse the restaurant's digital menu and tap + to build your order. Everything in one go." },
  { num: 3, icon: CreditCard, title: "Start the timer", desc: "Tap 'Start timer' to confirm your order. No payment yet — the clock just starts counting." },
  { num: 4, icon: Timer, title: "Eat fast", desc: "A live pulsing timer shows your current discount. It runs server-side — safe to leave the app." },
  { num: 5, icon: Zap, title: "Pay & get your discount", desc: "Scan the till QR to pay. Your discount is applied automatically — pay less, right there." },
];

const stats = [
  { value: "30%", label: "Max discount for fastest diners", icon: TrendingUp },
  { value: "5 steps", label: "All it takes to earn your discount", icon: Zap },
  { value: "Free", label: "Sign-in for customers, always", icon: Users },
  { value: "Stripe", label: "Payments — bank-level security", icon: Shield },
];

const restaurantBenefits = [
  { icon: TrendingUp, title: "More covers per day", desc: "Faster table turnover means more revenue without expanding your space." },
  { icon: BarChart3, title: "Zero friction setup", desc: "Print QR codes, place them on tables. No hardware, no training, no staff app." },
  { icon: Smartphone, title: "Real-time dashboard", desc: "See live sessions, track table status, and manage your menu from anywhere." },
  { icon: Clock, title: "Faster checkout", desc: "Diners pay in one scan at the till — no card machines, no waiting on staff for the bill." },
];

const fallbackTestimonials = [
  { name: "Sarah M.", role: "Restaurant Owner, London", quote: "Since we started with DineDash, our average table time dropped by 18 minutes. We're fitting in an extra turn during dinner service every night.", rating: 5, avatar: "S", color: "bg-green-600" },
  { name: "James K.", role: "Customer", quote: "Got 30% off a £60 dinner because we finished quickly. The app is dead simple — scan, order, eat fast, pay less. That's it.", rating: 5, avatar: "J", color: "bg-green-600" },
  { name: "Priya R.", role: "Restaurant Manager, Manchester", quote: "Setup took under an hour. We printed the QR codes, tested it ourselves, and went live. Our customers love the gamification of it.", rating: 5, avatar: "P", color: "bg-amber-500" },
];

const fallbackFaqs = [
  { q: "Do customers need to create an account?", a: "Yes — a quick one-time sign-in with your phone, email, or Apple/Google account. It takes seconds and your details are saved for next time." },
  { q: "What if a customer takes longer than 45 minutes?", a: "They simply pay full price at checkout — no discount applies, but no penalty either. It's exactly what they'd pay without DineDash." },
  { q: "How is the discount applied?", a: "The moment a customer scans the till QR to pay, DineDash calculates their discount based on how long they took and deducts it from the bill instantly — before the card is charged. Nothing to claim afterwards." },
  { q: "Can restaurants customise their own time limits and discount percentages?", a: "Yes. Every restaurant can set their own time tiers and discount percentages from the owner dashboard. The app always shows the current restaurant's exact tiers." },
  { q: "Do waitstaff need to use an app?", a: "No dedicated staff app is needed. Waitstaff simply point customers to the table QR code. The entire flow is customer-driven through their own phone." },
  { q: "How does a restaurant get started?", a: "Sign up for a subscription, add your restaurant details and menu, then print your unique table QR codes and till QR code. You can be live in under an hour." },
];

const avatarColors = ["bg-green-600", "bg-amber-500", "bg-blue-600", "bg-purple-600", "bg-rose-500"];

function FAQ({ items }: { items: { q: string; a: string }[] }) {
  const [open, setOpen] = useState<number | null>(null);
  return (
    <div className="space-y-3">
      {items.map((faq, i) => (
        <div key={i} className="bg-[var(--surface)] border border-[var(--border)] rounded-2xl overflow-hidden">
          <button
            className="w-full flex items-center justify-between px-6 py-5 text-left"
            onClick={() => setOpen(open === i ? null : i)}
          >
            <span className="font-semibold text-[var(--text-primary)] pr-4">{faq.q}</span>
            <ChevronDown className={`w-4 h-4 text-[var(--text-muted)] flex-shrink-0 transition-transform duration-300 ${open === i ? "rotate-180" : ""}`} />
          </button>
          {open === i && (
            <div className="px-6 pb-5 text-[var(--text-secondary)] text-sm leading-relaxed border-t border-[var(--border)] pt-4">
              {faq.a}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

export default function HomePageClient() {
  const [discountTiers, setDiscountTiers] = useState(fallbackTiers);
  const [testimonialItems, setTestimonialItems] = useState(fallbackTestimonials);
  const [faqItems, setFaqItems] = useState(fallbackFaqs);

  useEffect(() => {
    fetch("/api/content/tiers")
      .then((r) => r.json())
      .then((data) => {
        if (Array.isArray(data?.data) && data.data.length > 0) {
          setDiscountTiers(data.data.map((t: { time: string; discount: string }, i: number) => ({
            time: t.time, discount: t.discount,
            ...(tierStyles[i] ?? tierStyles[tierStyles.length - 1]),
          })));
        }
      }).catch(() => {});

    fetch("/api/content/testimonials")
      .then((r) => r.json())
      .then((data) => {
        if (Array.isArray(data?.data) && data.data.length > 0) {
          setTestimonialItems(data.data.map((t: { name: string; role: string; restaurant: string; text: string; rating: number; avatar?: string }, i: number) => ({
            name: t.name,
            role: t.role || t.restaurant,
            quote: t.text,
            rating: t.rating || 5,
            avatar: t.avatar || t.name?.[0]?.toUpperCase() || "?",
            color: avatarColors[i % avatarColors.length],
          })));
        }
      }).catch(() => {});

    fetch("/api/content/faqs")
      .then((r) => r.json())
      .then((data) => {
        if (Array.isArray(data?.data) && data.data.length > 0) {
          setFaqItems(data.data.map((f: { question: string; answer: string }) => ({ q: f.question, a: f.answer })));
        }
      }).catch(() => {});
  }, []);

  return (
    <div className="overflow-x-hidden">
      {/* HERO */}
      <section className="relative min-h-screen flex items-center pt-20 pb-16 px-4">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-40 -right-40 w-[600px] h-[600px] bg-green-100 dark:bg-green-500/5 rounded-full opacity-40 blur-3xl" />
          <div className="absolute -bottom-40 -left-40 w-[500px] h-[500px] bg-amber-100 dark:bg-amber-500/5 rounded-full opacity-40 blur-3xl" />
        </div>
        <div className="relative max-w-7xl mx-auto w-full">
          <div className="grid lg:grid-cols-2 gap-14 items-center">
            <Reveal>
              <div className="eyebrow mb-6">
                Speed rewards — automatically
              </div>
              <h1 className="headline-xl text-[var(--text-primary)] mb-6">
                Order first.{" "}
                <span className="gradient-text">Eat fast.</span>
                <br />
                Pay less.
              </h1>
              <p className="body-lead mb-8 max-w-lg">
                Scan your table QR, order, and start the timer. Eat fast — the quicker you finish, the bigger the discount applied automatically when you pay.
              </p>
              <div className="flex flex-wrap gap-3 mb-10">
                {discountTiers.map((t) => (
                  <div key={t.discount} className={`border rounded-xl px-4 py-2.5 text-center min-w-[90px] ${t.bg}`}>
                    <div className={`text-xl font-bold ${t.color}`}>{t.discount}</div>
                    <div className="text-xs text-[var(--text-muted)] font-medium mt-0.5">{t.time}</div>
                  </div>
                ))}
              </div>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/get-started" className="btn-primary text-base px-7 py-3.5">
                  Get Started Free <ArrowRight className="w-5 h-5" />
                </Link>
                <Link href="/how-it-works" className="btn-outline text-base px-7 py-3.5">
                  See How It Works
                </Link>
              </div>
              <div className="mt-8 flex flex-wrap items-center gap-6 text-sm text-[var(--text-muted)]">
                <span className="flex items-center gap-1.5"><Check className="w-4 h-4 text-[var(--brand)]" /> Quick sign-in for diners</span>
                <span className="flex items-center gap-1.5"><Check className="w-4 h-4 text-[var(--brand)]" /> Powered by Stripe</span>
                <span className="flex items-center gap-1.5"><Check className="w-4 h-4 text-[var(--brand)]" /> Live in &lt; 1 hour</span>
              </div>
            </Reveal>

            {/* Phone mockup */}
            <Reveal delay={0.15} y={32} className="flex justify-center lg:justify-end lg:pr-14">
              <div className="relative px-4 sm:px-16">
                <div className="hidden sm:block absolute -left-4 top-16 bg-[var(--surface)] rounded-2xl shadow-xl border border-[var(--border)] px-5 py-4 z-10">
                  <div className="text-xs text-[var(--text-muted)] font-medium">Your discount</div>
                  <div className="text-3xl font-bold text-[var(--brand-text)] mt-1">30%</div>
                  <div className="text-xs text-[var(--text-muted)] mt-0.5">12m 34s remaining</div>
                </div>
                <div className="w-72 h-[560px] bg-stone-900 rounded-[3rem] border-4 border-stone-700 shadow-2xl overflow-hidden">
                  <div className="bg-stone-900 px-6 pt-4 pb-2 flex justify-between items-center">
                    <span className="text-white text-xs font-semibold">11:01</span>
                    <div className="w-24 h-5 bg-stone-800 rounded-full" />
                  </div>
                  <div className="bg-[#1a1f2e] h-full px-4 pt-4 pb-8">
                    <div className="text-center mb-6">
                      <div className="text-white/60 text-xs mb-1">Session Active</div>
                      <div className="text-white font-bold text-lg">Beat the timer</div>
                    </div>
                    <div className="flex flex-col items-center mb-6">
                      <div className="w-40 h-40 rounded-full border-8 border-green-500/30 flex items-center justify-center relative">
                        <div className="absolute inset-2 rounded-full border-4 border-green-500 border-t-transparent animate-spin" style={{animationDuration: '3s'}} />
                        <div className="text-center">
                          <div className="text-green-400 text-3xl font-bold">30%</div>
                          <div className="text-white/60 text-xs">discount now</div>
                        </div>
                      </div>
                      <div className="text-white/80 text-2xl font-mono font-bold mt-4">12:34</div>
                      <div className="text-white/40 text-xs mt-1">time elapsed</div>
                    </div>
                    <div className="grid grid-cols-4 gap-2 mb-6">
                      {[{l:"30%",s:"<15m",a:true,c:"bg-green-500"},{l:"20%",s:"<30m",a:false,c:"bg-amber-500/30"},{l:"10%",s:"<45m",a:false,c:"bg-stone-700"},{l:"0%",s:">45m",a:false,c:"bg-stone-800"}].map((t) => (
                        <div key={t.l} className={`${t.c} rounded-xl p-2 text-center`}>
                          <div className={`text-xs font-bold ${t.a ? "text-white" : "text-white/40"}`}>{t.l}</div>
                          <div className={`text-[10px] ${t.a ? "text-white/70" : "text-white/20"}`}>{t.s}</div>
                        </div>
                      ))}
                    </div>
                    <button className="w-full bg-green-500 text-white font-bold py-3.5 rounded-2xl text-sm">
                      Scan Till QR to Pay
                    </button>
                  </div>
                </div>
                <div className="hidden sm:block absolute -right-14 top-[52%] bg-[var(--surface)] rounded-2xl shadow-xl border border-[var(--border)] px-5 py-4">
                  <div className="text-xs text-[var(--text-muted)] font-medium">Stripe secure</div>
                  <div className="text-sm font-bold text-[var(--text-primary)] mt-1">💳 £18.00 saved</div>
                  <div className="text-xs text-[var(--text-muted)] mt-0.5">Charged instantly</div>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* STATS BAR */}
      <section className="bg-[var(--surface-alt)] py-14 px-4">
        <RevealStagger className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((s) => (
            <RevealItem key={s.label} className="text-center">
              <div className="text-3xl font-bold text-[var(--brand)] mb-1">{s.value}</div>
              <div className="text-[var(--text-muted)] text-sm">{s.label}</div>
            </RevealItem>
          ))}
        </RevealStagger>
      </section>

      {/* HOW IT WORKS */}
      <section className="section-padding px-4 bg-[var(--surface)]">
        <div className="max-w-7xl mx-auto">
          <Reveal className="text-center mb-16">
            <div className="eyebrow justify-center mb-4">Simple 5-step flow</div>
            <h2 className="headline-lg text-[var(--text-primary)] mb-4">
              How <span className="gradient-text">DineDash</span> works
            </h2>
            <p className="body-lead max-w-2xl mx-auto">
              From sitting down to paying less — the entire experience takes just five steps.
            </p>
          </Reveal>
          <RevealStagger className="grid grid-cols-1 md:grid-cols-5 gap-8">
            {steps.map((step) => (
              <RevealItem key={step.num} className="flex flex-col items-center text-center group">
                <div className="icon-tile icon-tile-lg mb-5 relative transition-transform duration-500 group-hover:-translate-y-1">
                  <step.icon className="w-7 h-7" />
                  <div className="absolute -top-2 -right-2 w-7 h-7 bg-[var(--surface)] border-2 border-[var(--border)] rounded-full flex items-center justify-center text-xs font-bold text-[var(--text-primary)]">
                    {step.num}
                  </div>
                </div>
                <h3 className="font-semibold text-[var(--text-primary)] mb-2">{step.title}</h3>
                <p className="text-sm text-[var(--text-muted)] leading-relaxed">{step.desc}</p>
              </RevealItem>
            ))}
          </RevealStagger>
          <Reveal className="mt-14 text-center">
            <Link href="/how-it-works" className="btn-primary text-base px-8 py-3.5">
              See the full details <ArrowRight className="w-5 h-5" />
            </Link>
          </Reveal>
        </div>
      </section>

      {/* DISCOUNT TIERS */}
      <section className="section-padding px-4 bg-[var(--surface-alt)]">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-14 items-center">
            <Reveal>
              <div className="eyebrow mb-6">Discount tiers</div>
              <h2 className="headline-lg text-[var(--text-primary)] mb-6">
                The faster you eat,<br />
                <span className="gradient-text-green">the more you save</span>
              </h2>
              <p className="text-lg text-[var(--text-secondary)] mb-8">
                Every restaurant can customise their own time limits and discount percentages. The tiers shown are standard defaults — check your restaurant's screen for their exact breakdown.
              </p>
              <ul className="space-y-3 text-[var(--text-secondary)]">
                {["Quick sign-in, no loyalty cards — just eat and save","Timer runs server-side — safe to lock your phone","Your discount is applied automatically when you pay","Scan the till QR when you're ready to pay and go"].map((point) => (
                  <li key={point} className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-[var(--brand)] flex-shrink-0 mt-0.5" />
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </Reveal>
            <RevealStagger className="grid grid-cols-2 gap-4" stagger={0.1}>
              {discountTiers.map((t) => (
                <RevealItem key={t.discount} className={`card-premium border-2 p-6 text-center ${t.bg}`}>
                  <div className={`text-5xl font-bold mb-2 ${t.color}`}>{t.discount}</div>
                  <div className="text-[var(--text-secondary)] font-medium">{t.time}</div>
                  <div className="text-[var(--text-muted)] text-xs mt-2">discount tier</div>
                </RevealItem>
              ))}
            </RevealStagger>
          </div>
        </div>
      </section>

      {/* FOR RESTAURANTS */}
      <section className="section-padding px-4 bg-[var(--surface)]">
        <div className="max-w-7xl mx-auto">
          <Reveal className="text-center mb-16">
            <div className="eyebrow justify-center mb-4">For restaurant owners</div>
            <h2 className="headline-lg text-[var(--text-primary)] mb-4">
              Turn tables faster.<br />
              <span className="text-[var(--brand)]">Earn more every day.</span>
            </h2>
            <p className="body-lead max-w-2xl mx-auto">
              Diners use DineDash for free. Only restaurants subscribe. Get live in under an hour.
            </p>
          </Reveal>
          <RevealStagger className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {restaurantBenefits.map((b) => (
              <RevealItem key={b.title} className="bg-[var(--surface-alt)] border border-[var(--border)] rounded-2xl p-6 hover:border-[var(--brand)]/30 transition-colors duration-300">
                <div className="icon-tile mb-4">
                  <b.icon className="w-5 h-5" />
                </div>
                <h3 className="font-semibold text-[var(--text-primary)] mb-2">{b.title}</h3>
                <p className="text-[var(--text-muted)] text-sm leading-relaxed">{b.desc}</p>
              </RevealItem>
            ))}
          </RevealStagger>
          <Reveal className="text-center flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/get-started" className="btn-primary">
              Start Free Trial <ArrowRight className="w-5 h-5" />
            </Link>
            <Link href="/pricing" className="btn-outline">
              View Pricing
            </Link>
          </Reveal>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="section-padding px-4 bg-[var(--surface)] border-t border-[var(--border)]">
        <div className="max-w-7xl mx-auto">
          <Reveal className="text-center mb-16">
            <div className="eyebrow justify-center mb-4">What people say</div>
            <h2 className="headline-lg text-[var(--text-primary)]">
              Loved by diners and<br />
              <span className="gradient-text">restaurants alike</span>
            </h2>
          </Reveal>
          <RevealStagger className="grid md:grid-cols-3 gap-6">
            {testimonialItems.map((t) => (
              <RevealItem key={t.name} className="card-premium p-7">
                <div className="flex items-center gap-1 mb-4">
                  {Array.from({ length: t.rating }).map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <p className="text-[var(--text-secondary)] leading-relaxed mb-6 italic">"{t.quote}"</p>
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 ${t.color} rounded-full flex items-center justify-center text-white font-bold text-sm`}>
                    {t.avatar}
                  </div>
                  <div>
                    <div className="font-semibold text-[var(--text-primary)] text-sm">{t.name}</div>
                    <div className="text-[var(--text-muted)] text-xs">{t.role}</div>
                  </div>
                </div>
              </RevealItem>
            ))}
          </RevealStagger>
        </div>
      </section>

      {/* PAYMENT SECURITY */}
      <section className="section-padding px-4 bg-[var(--surface-alt)]">
        <div className="max-w-7xl mx-auto">
          <Reveal className="bg-[var(--surface)] border border-[var(--border)] rounded-3xl p-10 md:p-14">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <div className="eyebrow mb-6">Bank-level security</div>
                <h2 className="headline-md text-[var(--text-primary)] mb-4">
                  Your card details never touch our servers
                </h2>
                <p className="text-[var(--text-secondary)] mb-6 leading-relaxed">
                  All payments are processed securely by Stripe — the same technology trusted by Shopify, Amazon, and millions of businesses worldwide.
                </p>
                <ul className="space-y-3">
                  {["Card via Stripe, or pay cash at the till","PCI-DSS compliant via Stripe","Discount applied automatically — no manual claims","You only pay once, at the end — nothing charged upfront"].map((point) => (
                    <li key={point} className="flex items-center gap-3 text-[var(--text-secondary)] text-sm">
                      <div className="w-5 h-5 bg-[var(--brand-light)] rounded-full flex items-center justify-center flex-shrink-0">
                        <Check className="w-3 h-3 text-[var(--brand-text)]" />
                      </div>
                      {point}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="grid grid-cols-2 gap-4">
                {[
                  { icon: CreditCard, label: "Card Payments", sub: "Visa, Mastercard, Amex via Stripe" },
                  { icon: Banknote, label: "Cash", sub: "Pay at the till, the classic way" },
                  { icon: Shield, label: "Stripe Security", sub: "Bank-level encryption" },
                  { icon: Lock, label: "PCI-DSS Compliant", sub: "Certified secure payments" },
                ].map((p) => (
                  <div key={p.label} className="bg-[var(--surface-alt)] border border-[var(--border)] rounded-2xl p-5 text-center">
                    <div className="icon-tile mx-auto mb-3">
                      <p.icon className="w-5 h-5" />
                    </div>
                    <div className="font-semibold text-[var(--text-primary)] text-sm">{p.label}</div>
                    <div className="text-[var(--text-muted)] text-xs mt-1">{p.sub}</div>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* FAQ */}
      <section className="section-padding px-4 bg-[var(--surface)]">
        <div className="max-w-4xl mx-auto">
          <Reveal className="text-center mb-14">
            <h2 className="headline-lg text-[var(--text-primary)] mb-4">
              Frequently asked<br />
              <span className="gradient-text">questions</span>
            </h2>
            <p className="text-[var(--text-muted)] text-lg">Everything you need to know about DineDash.</p>
          </Reveal>
          <Reveal>
            <FAQ items={faqItems} />
          </Reveal>
          <Reveal className="mt-10 text-center">
            <p className="text-[var(--text-muted)] mb-4">Still have questions?</p>
            <Link href="/contact" className="btn-primary px-8 py-3.5">
              Contact Us <ArrowRight className="w-5 h-5" />
            </Link>
          </Reveal>
        </div>
      </section>

      {/* APP DOWNLOAD CTA */}
      <section className="section-padding px-4 bg-gradient-to-br from-green-600 to-emerald-500 text-white">
        <Reveal className="max-w-4xl mx-auto text-center">
          <div className="eyebrow eyebrow-light justify-center mb-6 !text-white/80">
            Available on iOS & Android
          </div>
          <h2 className="headline-lg mb-4">Ready to start saving?</h2>
          <p className="text-xl text-green-100 mb-10 max-w-xl mx-auto">
            Download DineDash, walk into any participating restaurant, and start paying less for eating fast. Quick sign-in, that's it.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <div className="bg-white/15 hover:bg-white/25 border border-white/25 rounded-2xl px-8 py-4 flex items-center gap-4 cursor-pointer transition-colors duration-300">
              <FaApple className="w-8 h-8 text-white flex-shrink-0" />
              <div className="text-left">
                <div className="text-white/70 text-xs">Download on the</div>
                <div className="text-white font-bold text-lg">App Store</div>
              </div>
            </div>
            <div className="bg-white/15 hover:bg-white/25 border border-white/25 rounded-2xl px-8 py-4 flex items-center gap-4 cursor-pointer transition-colors duration-300">
              <FaGooglePlay className="w-7 h-7 text-white flex-shrink-0" />
              <div className="text-left">
                <div className="text-white/70 text-xs">Get it on</div>
                <div className="text-white font-bold text-lg">Google Play</div>
              </div>
            </div>
          </div>
          <p className="mt-6 text-green-100 text-sm">
            Are you a restaurant owner?{" "}
            <Link href="/get-started" className="text-white font-semibold underline underline-offset-2">
              Get started with a free trial →
            </Link>
          </p>
        </Reveal>
      </section>
    </div>
  );
}
