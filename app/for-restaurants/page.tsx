import Link from "next/link";
import { ArrowRight, Check, QrCode, BarChart3, Smartphone, Users, TrendingUp, ChefHat, Zap, Shield, Settings } from "lucide-react";

const benefits = [
  { icon: TrendingUp, title: "More covers per day", desc: "Customers who earn refunds for eating faster free up tables sooner. More covers = more revenue without any extra space.", stat: "+25%", statLabel: "avg. daily covers" },
  { icon: Shield, title: "Upfront payment — zero walkouts", desc: "Every diner pays in full before the timer starts. No more unpaid bills or dine-and-dash situations.", stat: "£0", statLabel: "unpaid bills" },
  { icon: QrCode, title: "Zero staff training needed", desc: "There's no waiter app. No POS integration required. Just print QR codes, place them on tables, and go live.", stat: "<1hr", statLabel: "to go live" },
  { icon: BarChart3, title: "Real-time session dashboard", desc: "See every active dining session, which tier each table is in, and your daily turnover stats — all in one place.", stat: "Live", statLabel: "session tracking" },
  { icon: Smartphone, title: "Manage from anywhere", desc: "Update your menu, view sessions, and manage tables from your phone. No desktop required.", stat: "iOS + Android", statLabel: "owner dashboard" },
  { icon: Settings, title: "Fully customisable tiers", desc: "Set your own time limits and refund percentages. Default is 15/30/45 min but you can tune it to your service style.", stat: "Custom", statLabel: "tier control" },
];

const setupSteps = [
  { num: 1, title: "Sign up for a plan", desc: "Choose a subscription that fits your restaurant size. Cancel anytime.", icon: Users },
  { num: 2, title: "Add your restaurant & menu", desc: "Enter your restaurant details and add your menu items with prices.", icon: ChefHat },
  { num: 3, title: "Print your QR codes", desc: "Download and print your unique table QR codes and your till QR code from the dashboard.", icon: QrCode },
  { num: 4, title: "Place and go live", desc: "Stick table QR codes on each table, place the till QR at your counter. You're live.", icon: Zap },
];

const faqs = [
  { q: "Do my staff need a separate app?", a: "No. There's no waiter or staff app. Customers manage everything themselves through their own phone. Your staff simply focus on preparing and delivering food." },
  { q: "Can I set my own discount percentages?", a: "Yes. From your dashboard you can set custom time limits and refund percentages for your restaurant. Customers will always see your exact tiers in the app." },
  { q: "What if a customer overstays the time limit?", a: "They simply pay full price — they already paid upfront so there's nothing extra to collect. Your revenue is never at risk." },
  { q: "How does the subscription work?", a: "You pay a monthly or annual subscription fee. There are no per-transaction fees from DineDash — the refund is funded by the discount you set for your restaurant." },
  { q: "Can I manage multiple locations?", a: "Yes. Our Restaurant Group plan supports multiple locations from a single dashboard with centralized reporting." },
];

export default function ForRestaurantsPage() {
  return (
    <div className="overflow-x-hidden">
      {/* HERO */}
      <section className="relative pt-32 pb-20 px-4 bg-[var(--surface-dark)] text-white overflow-hidden">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-40 right-0 w-[500px] h-[500px] bg-green-600/10 rounded-full blur-3xl" />
        </div>
        <div className="relative max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-14 items-center">
            <div>
              <div className="inline-flex items-center gap-2 bg-[var(--brand)]/20 text-[var(--brand)] text-sm font-semibold px-4 py-2 rounded-full mb-6">
                <ChefHat className="w-4 h-4" /> For restaurant owners
              </div>
              <h1 className="text-5xl md:text-6xl font-extrabold mb-6 leading-tight">
                More covers.<br />
                <span className="text-[var(--brand)]">Zero friction.</span>
              </h1>
              <p className="text-xl text-white/60 mb-8 leading-relaxed">
                DineDash turns every table into a higher-turnover asset. Customers are incentivised to dine efficiently. You get more covers. Everyone wins.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/get-started" className="bg-[var(--brand)] text-[#0F1623] font-bold px-7 py-3.5 rounded-full hover:opacity-90 transition-opacity inline-flex items-center gap-2">
                  Start Free Trial <ArrowRight className="w-5 h-5" />
                </Link>
                <Link href="/pricing" className="border-2 border-white/20 text-white/80 font-semibold px-7 py-3.5 rounded-full hover:border-[var(--brand)] hover:text-[var(--brand)] transition-colors">
                  View Plans
                </Link>
              </div>
              <div className="mt-8 flex flex-wrap gap-5 text-sm text-white/50">
                <span className="flex items-center gap-2"><Check className="w-4 h-4 text-[var(--brand)]" /> Live in under 1 hour</span>
                <span className="flex items-center gap-2"><Check className="w-4 h-4 text-[var(--brand)]" /> No hardware required</span>
                <span className="flex items-center gap-2"><Check className="w-4 h-4 text-[var(--brand)]" /> Cancel anytime</span>
              </div>
            </div>

            {/* Dashboard mockup */}
            <div className="flex justify-center">
              <div className="w-full max-w-md bg-white/5 border border-white/10 rounded-3xl p-6">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <div className="text-white font-bold text-lg">Live Sessions</div>
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
                      <div className={`text-2xl font-extrabold ${row.color}`}>{row.tier}</div>
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
            </div>
          </div>
        </div>
      </section>

      {/* BENEFITS */}
      <section className="section-padding px-4 bg-[var(--surface)]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-14">
            <h2 className="text-4xl md:text-5xl font-extrabold text-[var(--text-primary)] mb-4">
              Built for restaurant <span className="gradient-text">growth</span>
            </h2>
            <p className="text-xl text-[var(--text-muted)] max-w-2xl mx-auto">
              Every feature is designed to help you serve more customers and protect your revenue.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {benefits.map((b) => (
              <div key={b.title} className="bg-[var(--surface-alt)] border border-[var(--border)] rounded-2xl p-7 card-hover">
                <div className="flex items-start justify-between mb-4">
                  <div className="w-12 h-12 bg-[var(--brand-light)] rounded-xl flex items-center justify-center">
                    <b.icon className="w-6 h-6 text-[var(--brand)]" />
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-extrabold text-[var(--text-primary)]">{b.stat}</div>
                    <div className="text-xs text-[var(--text-muted)]">{b.statLabel}</div>
                  </div>
                </div>
                <h3 className="font-bold text-[var(--text-primary)] text-lg mb-2">{b.title}</h3>
                <p className="text-[var(--text-muted)] text-sm leading-relaxed">{b.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SETUP STEPS */}
      <section className="section-padding px-4 bg-[var(--surface-alt)]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-14">
            <h2 className="text-4xl font-extrabold text-[var(--text-primary)] mb-4">
              Live in <span className="gradient-text">under 1 hour</span>
            </h2>
            <p className="text-[var(--text-muted)] text-lg">No engineers, no hardware. Just four simple steps.</p>
          </div>
          <div className="grid md:grid-cols-4 gap-8">
            {setupSteps.map((step) => (
              <div key={step.num} className="text-center">
                <div className="relative inline-block mb-5">
                  <div className="w-20 h-20 bg-[var(--brand)] rounded-2xl flex items-center justify-center shadow-lg mx-auto">
                    <step.icon className="w-9 h-9 text-[#0F1623]" />
                  </div>
                  <div className="absolute -top-2 -right-2 w-8 h-8 bg-[var(--surface)] border-2 border-[var(--border)] rounded-full flex items-center justify-center text-sm font-extrabold text-[var(--text-primary)]">
                    {step.num}
                  </div>
                </div>
                <h3 className="font-bold text-[var(--text-primary)] text-lg mb-2">{step.title}</h3>
                <p className="text-[var(--text-muted)] text-sm leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>
          <div className="mt-12 text-center">
            <Link href="/get-started" className="btn-primary text-base px-8 py-3.5">
              Get Started Now <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="section-padding px-4 bg-[var(--surface)]">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-extrabold text-[var(--text-primary)] text-center mb-10">Restaurant owner FAQs</h2>
          <div className="space-y-4">
            {faqs.map((faq) => (
              <div key={faq.q} className="bg-[var(--surface-alt)] border border-[var(--border)] rounded-2xl p-6">
                <h3 className="font-bold text-[var(--text-primary)] mb-2">{faq.q}</h3>
                <p className="text-[var(--text-muted)] text-sm leading-relaxed">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* BOTTOM CTA */}
      <section className="section-padding px-4 bg-[var(--surface-dark)] text-white">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-extrabold mb-4">Start your free trial today</h2>
          <p className="text-white/50 text-lg mb-8">No credit card required to sign up. Cancel any time.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/get-started" className="bg-[var(--brand)] text-[#0F1623] font-bold px-8 py-3.5 rounded-full hover:opacity-90 transition-opacity inline-flex items-center gap-2">
              Get Started Free <ArrowRight className="w-5 h-5" />
            </Link>
            <Link href="/contact" className="border-2 border-white/20 text-white/70 font-semibold px-8 py-3.5 rounded-full hover:border-[var(--brand)] hover:text-[var(--brand)] transition-colors">
              Talk to Us First
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
