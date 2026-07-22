import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Check, QrCode, BarChart3, Smartphone, Users, TrendingUp, ChefHat, Zap, Shield, Settings } from "lucide-react";
import { getContent } from "@/lib/getContent";
import { Reveal, RevealStagger, RevealItem } from "@/components/Reveal";

export const metadata: Metadata = {
  title: "For Restaurants",
  description:
    "Turn tables faster, eliminate walkouts, and serve more covers every day with DineDash. No hardware, no staff training — go live in under 1 hour.",
  alternates: { canonical: "/for-restaurants" },
  openGraph: {
    title: "For Restaurants | DineDash",
    description: "Turn tables faster, eliminate walkouts, go live in under 1 hour. No hardware needed.",
    url: "https://dinedash.app/for-restaurants",
  },
};

const benefits = [
  { icon: TrendingUp, title: "More covers per day", desc: "Customers who save by eating faster free up tables sooner. More covers = more revenue without any extra space.", stat: "+25%", statLabel: "avg. daily covers" },
  { icon: Shield, title: "Fast, friction-free checkout", desc: "Diners settle up with one scan at the till — no card machines, no waiting on staff to bring the bill.", stat: "1 scan", statLabel: "to pay" },
  { icon: QrCode, title: "Zero staff training needed", desc: "There's no waiter app. No POS integration required. Just print QR codes, place them on tables, and go live.", stat: "<1hr", statLabel: "to go live" },
  { icon: BarChart3, title: "Real-time session dashboard", desc: "See every active dining session, which tier each table is in, and your daily turnover stats — all in one place.", stat: "Live", statLabel: "session tracking" },
  { icon: Smartphone, title: "Manage from anywhere", desc: "Update your menu, view sessions, and manage tables from your phone. No desktop required.", stat: "iOS + Android", statLabel: "owner dashboard" },
  { icon: Settings, title: "Fully customisable tiers", desc: "Set your own time limits and discount percentages. Default is 15/30/45 min but you can tune it to your service style.", stat: "Custom", statLabel: "tier control" },
];

const setupSteps = [
  { num: 1, title: "Sign up for a plan", desc: "Choose a subscription that fits your restaurant size. Cancel anytime.", icon: Users },
  { num: 2, title: "Add your restaurant & menu", desc: "Enter your restaurant details and add your menu items with prices.", icon: ChefHat },
  { num: 3, title: "Print your QR codes", desc: "Download and print your unique table QR codes and your till QR code from the dashboard.", icon: QrCode },
  { num: 4, title: "Place and go live", desc: "Stick table QR codes on each table, place the till QR at your counter. You're live.", icon: Zap },
];

const fallbackFaqs = [
  { q: "Do my staff need a separate app?", a: "No. There's no waiter or staff app. Customers manage everything themselves through their own phone. Your staff simply focus on preparing and delivering food." },
  { q: "Can I set my own discount percentages?", a: "Yes. From your dashboard you can set custom time limits and discount percentages for your restaurant. Customers will always see your exact tiers in the app." },
  { q: "What if a customer overstays the time limit?", a: "They simply pay full price when they scan to pay at the till — no discount applies past your slowest tier. Payment still happens in one scan, just like any other table." },
  { q: "How does the subscription work?", a: "You pay a monthly or annual subscription fee. There are no per-transaction fees from DineDash — the discount is set by you and simply reduces what the diner pays at checkout." },
  { q: "Can I manage multiple locations?", a: "Yes. Our Restaurant Group plan supports multiple locations from a single dashboard with centralized reporting." },
];

export const revalidate = 0;

export default async function ForRestaurantsPage() {
  const dbFaqs = await getContent<{ question: string; answer: string }[]>("faqs");
  const faqs = dbFaqs && dbFaqs.length > 0
    ? dbFaqs.map((f) => ({ q: f.question, a: f.answer }))
    : fallbackFaqs;
  return (
    <div className="overflow-x-hidden">
      {/* HERO */}
      <section className="relative pt-32 pb-20 px-4 overflow-hidden">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-40 right-0 w-[500px] h-[500px] bg-green-600/10 rounded-full blur-3xl" />
        </div>
        <div className="relative max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-14 items-center">
            <Reveal>
              <div className="eyebrow mb-6">For restaurant owners</div>
              <h1 className="headline-xl text-[var(--text-primary)] mb-6">
                More covers.<br />
                <span className="text-[var(--brand)]">Zero friction.</span>
              </h1>
              <p className="body-lead mb-8">
                DineDash turns every table into a higher-turnover asset. Customers are incentivised to dine efficiently. You get more covers. Everyone wins.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/get-started" className="btn-primary">
                  Start Free Trial <ArrowRight className="w-5 h-5" />
                </Link>
                <Link href="/pricing" className="btn-outline">
                  View Plans
                </Link>
              </div>
              <div className="mt-8 flex flex-wrap gap-5 text-sm text-[var(--text-secondary)]">
                <span className="flex items-center gap-2"><Check className="w-4 h-4 text-[var(--brand)]" /> Live in under 1 hour</span>
                <span className="flex items-center gap-2"><Check className="w-4 h-4 text-[var(--brand)]" /> No hardware required</span>
                <span className="flex items-center gap-2"><Check className="w-4 h-4 text-[var(--brand)]" /> Cancel anytime</span>
              </div>
            </Reveal>

            {/* Dashboard mockup — deliberately dark, mimics a real app/dashboard screenshot */}
            <Reveal delay={0.15} y={32} className="flex justify-center">
              <div className="w-full max-w-md bg-[var(--surface-dark)] border border-white/10 rounded-3xl p-6 shadow-2xl">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <div className="text-white font-semibold text-lg">Live Sessions</div>
                    <div className="text-white/50 text-sm">Tonight — 6 tables active</div>
                  </div>
                  <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse" />
                </div>
                <div className="space-y-3">
                  {[
                    { table: "Table 4", timer: "08:23", tier: "30%", color: "text-green-400", bg: "bg-green-500/10 border-green-500/30" },
                    { table: "Table 7", timer: "22:14", tier: "20%", color: "text-amber-400", bg: "bg-amber-500/10 border-amber-500/30" },
                    { table: "Table 2", timer: "31:05", tier: "10%", color: "text-green-500", bg: "bg-green-600/10 border-green-600/30" },
                    { table: "Table 9", timer: "47:30", tier: "0%",  color: "text-white/40", bg: "bg-white/5 border-white/10" },
                  ].map((row) => (
                    <div key={row.table} className={`flex items-center justify-between border rounded-xl px-4 py-3 ${row.bg}`}>
                      <div>
                        <div className="text-white font-semibold text-sm">{row.table}</div>
                        <div className="text-white/40 text-xs font-mono">{row.timer}</div>
                      </div>
                      <div className={`text-2xl font-bold ${row.color}`}>{row.tier}</div>
                    </div>
                  ))}
                </div>
                <div className="mt-6 grid grid-cols-3 gap-3">
                  {[{ label: "Today's covers", val: "34" }, { label: "Avg table time", val: "28m" }, { label: "Revenue", val: "£1,240" }].map((s) => (
                    <div key={s.label} className="bg-white/5 rounded-xl p-3 text-center">
                      <div className="text-white font-bold text-lg">{s.val}</div>
                      <div className="text-white/40 text-xs mt-1">{s.label}</div>
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* BENEFITS */}
      <section className="section-padding px-4 bg-[var(--surface)]">
        <div className="max-w-7xl mx-auto">
          <Reveal className="text-center mb-16">
            <h2 className="headline-lg text-[var(--text-primary)] mb-4">
              Built for restaurant <span className="gradient-text">growth</span>
            </h2>
            <p className="body-lead max-w-2xl mx-auto">
              Every feature is designed to help you serve more customers and protect your revenue.
            </p>
          </Reveal>
          <RevealStagger className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {benefits.map((b) => (
              <RevealItem key={b.title} className="card-premium p-7">
                <div className="flex items-start justify-between mb-4">
                  <div className="icon-tile">
                    <b.icon className="w-5 h-5" />
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-[var(--text-primary)]">{b.stat}</div>
                    <div className="text-xs text-[var(--text-muted)]">{b.statLabel}</div>
                  </div>
                </div>
                <h3 className="font-semibold text-[var(--text-primary)] text-lg mb-2">{b.title}</h3>
                <p className="text-[var(--text-muted)] text-sm leading-relaxed">{b.desc}</p>
              </RevealItem>
            ))}
          </RevealStagger>
        </div>
      </section>

      {/* SETUP STEPS */}
      <section className="section-padding px-4 bg-[var(--surface-alt)]">
        <div className="max-w-7xl mx-auto">
          <Reveal className="text-center mb-16">
            <h2 className="headline-lg text-[var(--text-primary)] mb-4">
              Live in <span className="gradient-text">under 1 hour</span>
            </h2>
            <p className="text-[var(--text-muted)] text-lg">No engineers, no hardware. Just four simple steps.</p>
          </Reveal>
          <RevealStagger className="grid md:grid-cols-4 gap-8">
            {setupSteps.map((step) => (
              <RevealItem key={step.num} className="text-center">
                <div className="relative inline-block mb-5">
                  <div className="icon-tile icon-tile-lg mx-auto">
                    <step.icon className="w-7 h-7" />
                  </div>
                  <div className="absolute -top-2 -right-2 w-8 h-8 bg-[var(--surface)] border-2 border-[var(--border)] rounded-full flex items-center justify-center text-sm font-bold text-[var(--text-primary)]">
                    {step.num}
                  </div>
                </div>
                <h3 className="font-semibold text-[var(--text-primary)] text-lg mb-2">{step.title}</h3>
                <p className="text-[var(--text-muted)] text-sm leading-relaxed">{step.desc}</p>
              </RevealItem>
            ))}
          </RevealStagger>
          <Reveal className="mt-14 text-center">
            <Link href="/get-started" className="btn-primary text-base px-8 py-3.5">
              Get Started Now <ArrowRight className="w-5 h-5" />
            </Link>
          </Reveal>
        </div>
      </section>

      {/* FAQ */}
      <section className="section-padding px-4 bg-[var(--surface)]">
        <div className="max-w-3xl mx-auto">
          <Reveal>
            <h2 className="headline-lg text-[var(--text-primary)] text-center mb-14">Restaurant owner FAQs</h2>
          </Reveal>
          <RevealStagger className="space-y-4" stagger={0.06}>
            {faqs.map((faq) => (
              <RevealItem key={faq.q} className="bg-[var(--surface-alt)] border border-[var(--border)] rounded-2xl p-6">
                <h3 className="font-semibold text-[var(--text-primary)] mb-2">{faq.q}</h3>
                <p className="text-[var(--text-muted)] text-sm leading-relaxed">{faq.a}</p>
              </RevealItem>
            ))}
          </RevealStagger>
        </div>
      </section>

      {/* BOTTOM CTA */}
      <section className="section-padding px-4 bg-[var(--surface)]">
        <Reveal className="max-w-3xl mx-auto text-center">
          <h2 className="headline-lg text-[var(--text-primary)] mb-4">Start your free trial today</h2>
          <p className="text-[var(--text-secondary)] text-lg mb-8">Approve your free trial via the App Store or Google Play. Cancel any time.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/get-started" className="btn-primary">
              Get Started Free <ArrowRight className="w-5 h-5" />
            </Link>
            <Link href="/contact" className="btn-outline">
              Talk to Us First
            </Link>
          </div>
        </Reveal>
      </section>
    </div>
  );
}
