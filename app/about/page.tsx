import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Zap, Target, Heart, TrendingUp } from "lucide-react";
import { getContent } from "@/lib/getContent";
import { Reveal, RevealStagger, RevealItem } from "@/components/Reveal";

export const revalidate = 0;

export const metadata: Metadata = {
  title: "About DineDash",
  description:
    "We built DineDash to reward fast diners and help restaurants turn tables faster. Meet the team and learn the story behind the idea.",
  alternates: { canonical: "/about" },
  openGraph: {
    title: "About DineDash",
    description: "We built DineDash to reward fast diners and help restaurants turn tables faster.",
    url: "https://dinedash.app/about",
  },
};

interface DbMember {
  id: string;
  name: string;
  role: string;
  bio: string;
  avatar?: string;
  linkedin?: string;
  twitter?: string;
}

function getInitials(name: string) {
  return name.split(" ").slice(0, 2).map((w) => w[0]).join("").toUpperCase();
}

const values = [
  { icon: Zap, title: "Speed is rewarded", desc: "We believe efficient dining should be celebrated, not just expected. Every second counts — and we make sure it pays off." },
  { icon: Target, title: "Friction should be zero", desc: "No loyalty cards. No apps for staff. Just a quick sign-in — we obsess over removing every unnecessary step from the dining experience." },
  { icon: Heart, title: "Win-win design", desc: "The best product is one where both sides benefit. Restaurants get more covers. Diners pay less for eating fast. Always both." },
  { icon: TrendingUp, title: "Restaurants deserve better tech", desc: "The hospitality industry has been underserved by technology for too long. We're here to change that." },
];

const fallbackTeam = [
  { name: "Alex Chen", role: "Co-Founder & CEO", initials: "AC", bio: "Former restaurant operator who spent years frustrated by empty tables during peak hours.", linkedin: "", twitter: "" },
  { name: "Maya Patel", role: "Co-Founder & CTO", initials: "MP", bio: "Ex-Stripe engineer who knows payments inside out and believes the pay-less-for-speed model unlocks a new category.", linkedin: "", twitter: "" },
  { name: "Tom Walsh", role: "Head of Restaurant Success", initials: "TW", bio: "15 years in hospitality. Has personally onboarded 200+ restaurants across the UK.", linkedin: "", twitter: "" },
];

export default async function AboutPage() {
  const dbTeam = await getContent<DbMember[]>("team");

  const team = dbTeam && dbTeam.length > 0
    ? dbTeam.map((m) => ({
        name: m.name,
        role: m.role,
        initials: getInitials(m.name),
        bio: m.bio,
        linkedin: m.linkedin || "",
        twitter: m.twitter || "",
      }))
    : fallbackTeam;

  return (
    <div className="overflow-x-hidden">
      {/* HERO */}
      <section className="relative pt-32 pb-20 px-4 overflow-hidden">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-40 -right-40 w-[500px] h-[500px] bg-green-600/10 rounded-full blur-3xl" />
          <div className="absolute -bottom-20 -left-20 w-[400px] h-[400px] bg-amber-500/10 rounded-full blur-3xl" />
        </div>
        <Reveal className="relative max-w-4xl mx-auto text-center">
          <div className="eyebrow justify-center mb-6">Our story</div>
          <h1 className="headline-xl text-[var(--text-primary)] mb-6">
            We built DineDash because<br />
            <span className="gradient-text">restaurants deserve more</span>
          </h1>
          <p className="body-lead max-w-2xl mx-auto">
            Empty tables during rush hour. Slow diners holding up the queue. No way to incentivise speed without being rude. We saw this problem every day — and decided to fix it.
          </p>
        </Reveal>
      </section>

      {/* STORY */}
      <section className="section-padding px-4 bg-[var(--surface)]">
        <div className="max-w-4xl mx-auto">
          <div className="grid md:grid-cols-2 gap-14 items-center">
            <Reveal>
              <h2 className="headline-md text-[var(--text-primary)] mb-6">The problem we saw</h2>
              <div className="space-y-4 text-[var(--text-secondary)] leading-relaxed">
                <p>
                  Restaurants across the UK lose thousands in revenue every week because tables sit occupied for far longer than the actual meal takes. A 45-minute meal turns into a 90-minute table block.
                </p>
                <p>
                  The solution wasn't to rush customers — that ruins the experience. The solution was to make eating efficiently <strong className="text-[var(--text-primary)]">rewarding</strong>.
                </p>
                <p>
                  We built DineDash around a simple insight: if customers could earn real money back by finishing in a reasonable time, they would naturally self-optimise — without any pressure from staff.
                </p>
              </div>
            </Reveal>
            <Reveal delay={0.1} className="bg-[var(--surface-alt)] border border-[var(--border)] rounded-3xl p-8">
              <div className="space-y-6">
                {[
                  { stat: "£4.2B", desc: "Lost annually by UK restaurants to idle table time" },
                  { stat: "34 min", desc: "Average time a UK table sits empty between covers" },
                  { stat: "1 hr", desc: "Time to go live with DineDash — zero hardware" },
                ].map((item) => (
                  <div key={item.stat} className="flex items-start gap-4">
                    <div className="text-4xl font-bold text-[var(--brand-text)]">{item.stat}</div>
                    <div className="text-[var(--text-muted)] text-sm leading-relaxed pt-2">{item.desc}</div>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* VALUES */}
      <section className="section-padding px-4 bg-[var(--surface-alt)]">
        <div className="max-w-5xl mx-auto">
          <Reveal className="text-center mb-16">
            <h2 className="headline-lg text-[var(--text-primary)] mb-4">What we believe</h2>
            <p className="text-[var(--text-muted)] text-lg">The principles behind every decision we make.</p>
          </Reveal>
          <RevealStagger className="grid md:grid-cols-2 gap-6">
            {values.map((v) => (
              <RevealItem key={v.title} className="card-premium p-7">
                <div className="icon-tile mb-4">
                  <v.icon className="w-5 h-5" />
                </div>
                <h3 className="font-semibold text-[var(--text-primary)] text-lg mb-2">{v.title}</h3>
                <p className="text-[var(--text-muted)] text-sm leading-relaxed">{v.desc}</p>
              </RevealItem>
            ))}
          </RevealStagger>
        </div>
      </section>

      {/* TEAM */}
      <section className="section-padding px-4 bg-[var(--surface)]">
        <div className="max-w-5xl mx-auto">
          <Reveal className="text-center mb-16">
            <h2 className="headline-lg text-[var(--text-primary)] mb-4">The team behind Dine<span className="text-[var(--brand)]">Dash</span></h2>
            <p className="text-[var(--text-muted)] text-lg">Built by people who care deeply about restaurants and technology.</p>
          </Reveal>
          <RevealStagger className="grid md:grid-cols-3 gap-6">
            {team.map((member) => (
              <RevealItem key={member.name} className="bg-[var(--surface-alt)] border border-[var(--border)] rounded-2xl p-7 text-center">
                <div className="w-20 h-20 bg-[var(--brand)] rounded-2xl flex items-center justify-center text-[#0F1623] font-bold text-2xl mx-auto mb-4">
                  {member.initials}
                </div>
                <h3 className="font-semibold text-[var(--text-primary)] text-lg">{member.name}</h3>
                <div className="text-[var(--brand-text)] text-sm font-semibold mb-3">{member.role}</div>
                <p className="text-[var(--text-muted)] text-sm leading-relaxed mb-4">{member.bio}</p>
                {(member.linkedin || member.twitter) && (
                  <div className="flex justify-center gap-3">
                    {member.linkedin && (
                      <a href={member.linkedin} target="_blank" rel="noopener noreferrer" className="text-xs text-[var(--text-muted)] hover:text-[var(--brand-text)] transition-colors border border-[var(--border)] rounded-lg px-3 py-1.5">
                        LinkedIn
                      </a>
                    )}
                    {member.twitter && (
                      <a href={member.twitter} target="_blank" rel="noopener noreferrer" className="text-xs text-[var(--text-muted)] hover:text-[var(--brand-text)] transition-colors border border-[var(--border)] rounded-lg px-3 py-1.5">
                        Twitter
                      </a>
                    )}
                  </div>
                )}
              </RevealItem>
            ))}
          </RevealStagger>
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding px-4 bg-[var(--surface-alt)]">
        <Reveal className="max-w-3xl mx-auto text-center">
          <h2 className="headline-lg text-[var(--text-primary)] mb-4">Join us in reshaping dining</h2>
          <p className="text-[var(--text-secondary)] text-lg mb-8">Whether you're a restaurant ready to go live, or a diner curious to try — we'd love to hear from you.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/get-started" className="btn-primary">
              Get Started <ArrowRight className="w-5 h-5" />
            </Link>
            <Link href="/contact" className="btn-outline">
              Contact the Team
            </Link>
          </div>
        </Reveal>
      </section>
    </div>
  );
}
