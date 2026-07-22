import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Clock, Calendar, Tag, ArrowRight } from "lucide-react";
import { Reveal } from "@/components/Reveal";

interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  author: string;
  authorRole?: string;
  category: string;
  tags: string[];
  coverImage?: string;
  readingTime?: number;
  publishedAt?: string;
}

const DUMMY_POSTS: BlogPost[] = [
  {
    slug: "how-table-turnover-impacts-revenue",
    title: "How Table Turnover Rate Directly Impacts Your Restaurant's Revenue",
    excerpt: "Most restaurant owners focus on food costs and staffing. But the single biggest lever for revenue growth is often hiding in plain sight: how fast tables turn.",
    content: `Most restaurant owners spend their energy managing food costs and staffing ratios. These are important levers — but they're also the ones everyone else is pulling. The real competitive edge, especially for high-volume casual and mid-market restaurants, lives somewhere else entirely.

Table turnover rate.

It's the metric that tells you how many times each table in your restaurant gets used during a service period. And it has a direct, compounding relationship with your top-line revenue that most operators drastically underestimate.

## The maths behind turnover

Let's take a simple example. A 50-seat restaurant runs lunch service from noon to 3pm — a 3-hour window.

If the average dine time is 90 minutes, each table turns 2 times during that window. At an average spend of £22 per head and 2 guests per table, that's £44 per table × 50 tables × 2 turns = £4,400 in lunch revenue.

Now imagine you reduce average dine time to 72 minutes — just 18 minutes less. Tables turn 2.5 times in the same window. Everything else stays equal: £44 × 50 × 2.5 = £5,500. That's £1,100 more revenue from the same physical space, same staff, same kitchen.

Annualised across 250 trading days, that's £275,000.

## Where the time actually goes

Most dwell time isn't spent eating. Studies of full-service restaurants consistently show the same breakdown: 20–25 minutes waiting for the bill, 10–15 minutes waiting to order, and 5–10 minutes being seated. The meal itself is actually the minority of total table time.

This means the biggest opportunities to recover time are administrative, not culinary. You don't need to rush the food — you need to remove the waiting.

## What DineDash does differently

Traditional loyalty programmes try to bring customers back more often. DineDash flips the model: instead of rewarding frequency, it rewards speed.

When a table finishes their meal in under the target time, DineDash automatically generates a discount they can use on their next visit. The faster they dine, the better the reward — and because the reward is automatic and instant (no app, no card scanning), customers actually engage with it.

The result is a natural, friction-free incentive that reduces dwell time by 15–25% in our restaurant partners without any pressure on front-of-house staff.

## Getting started

The first step is measuring your current average table dwell time by service period. Most POS systems can give you table open/close times — start there.

Once you know your baseline, even a 10% improvement in dwell time typically translates to a meaningful revenue lift in peak periods. From there, technology like DineDash can do the heavy lifting to make that improvement consistent and sustainable.`,
    author: "Anand Swarup",
    authorRole: "Founder, DineDash",
    category: "Operations",
    tags: ["table turnover", "revenue", "operations"],
    coverImage: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=1200&q=80",
    readingTime: 6,
    publishedAt: "2026-06-10T10:00:00Z",
  },
  {
    slug: "speed-rewards-psychology",
    title: "The Psychology of Speed: Why Customers Who Wait Less Spend More",
    excerpt: "There's a counterintuitive truth buried in dining data: customers who receive faster service don't just leave happier — they spend significantly more on their next visit.",
    content: `Speed and spending don't seem like obvious bedfellows. Conventional wisdom might even suggest the opposite — that a leisurely, unhurried dining experience encourages customers to linger over dessert and an extra bottle of wine.

The data tells a different story.

## The happiness-spending loop

Research in service psychology has long established a relationship between perceived wait times and customer satisfaction. But the more interesting finding is downstream: customers who leave with a positive perception of service speed are measurably more likely to return, and when they do return, they spend more.

The mechanism is intuitive once you notice it. A negative experience with waiting — for a table, for a server, for the bill — colours the entire dining memory. Even a technically excellent meal can be rated lower if it was accompanied by frustration at slow service. Conversely, a meal that felt effortless and well-paced tends to be remembered more fondly than its individual components might warrant.

## The "time well spent" effect

Psychologist Barry Schwartz, in his work on the paradox of choice, notes that satisfaction is heavily influenced by whether people feel their time was respected. This is especially acute in dining, where customers are often time-constrained — a business lunch that risks running over, a date where punctuality signals care, a family dinner squeezed between school pick-up and homework.

When a restaurant respects the customer's time — through prompt seating, attentive ordering, proactive bill delivery — it signals something important: we understand that your time has value.

That signal builds trust. And trust is the foundation of repeat business.

## What DineDash found in the wild

Across our restaurant partners, customers who engaged with DineDash's speed-reward system showed a 34% higher rate of return visits within 30 days compared to diners who didn't. More strikingly, their average spend on return visits was 18% higher.

We believe this happens for two reasons. First, the DineDash reward creates a concrete, positive association with the restaurant — the customer leaves not just with a good meal in their memory, but with a tangible reward in their pocket. Second, the speed of service that enabled the reward means the overall dining experience felt good, creating a warm halo that makes the next visit feel like a safe choice.

## Implications for restaurant operators

The practical takeaway isn't "rush your customers." That's the wrong frame entirely, and customers can feel it.

The right frame is: proactively remove the things that make dining feel slow. Ensure menus are available immediately on seating. Train staff to read table readiness signals. Use technology to surface the bill at the right moment, without the customer needing to flag someone down.

When speed comes from attentiveness rather than pressure, customers feel served rather than processed — and that's the experience they'll come back for.`,
    author: "Anand Swarup",
    authorRole: "Founder, DineDash",
    category: "Customer Experience",
    tags: ["psychology", "customer loyalty", "spending"],
    coverImage: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=1200&q=80",
    readingTime: 5,
    publishedAt: "2026-06-05T10:00:00Z",
  },
  {
    slug: "restaurant-loyalty-without-app",
    title: "Building Restaurant Loyalty Without Making Customers Download Another App",
    excerpt: "App fatigue is real. Here's how forward-thinking restaurants are building repeat business using ambient incentives that require zero friction from diners.",
    content: `The average smartphone user has 80+ apps installed and regularly uses fewer than 10. The average person downloads zero new apps per month. And yet, the default response to "how do we build customer loyalty?" in the restaurant industry is still, reflexively, "build an app."

This is worth questioning.

## The friction problem

Every loyalty programme that requires a download is asking a lot from a customer who just had a nice meal and wants to go home. Even if they say yes in the moment — and most won't — the app needs to survive the great phone cull that happens every few months when storage runs low.

Stamp cards have the opposite problem: they're low-friction to receive but high-friction to remember, maintain, and redeem. How many stamp cards do you have sitting forgotten in a drawer?

The best loyalty mechanisms are ones that work without the customer having to do anything different at all.

## Ambient loyalty

The concept of ambient loyalty is simple: the reward is generated automatically as a byproduct of normal behaviour, and it arrives in a form the customer doesn't have to manage.

DineDash is built on this principle. When a table finishes their meal within the target time window, a discount code is automatically generated and — if the restaurant has it configured — delivered via the customer's phone without any app download required. The customer doesn't scan anything, doesn't sign up for anything, doesn't have to remember anything.

The loyalty mechanism is completely invisible. The reward just appears.

## Why this works

Behavioural economics tells us that the most effective incentives are immediate, certain, and effortless. A stamp card fails on all three: the reward is distant, you might forget your card, and you have to remember to bring it. An app fails on effort. A generic email newsletter fails on immediacy and certainty.

A discount that arrives automatically the moment you finish your meal is immediate, certain, and entirely effortless. It's the closest thing to perfect incentive design a restaurant can deploy.

## The network effect for restaurants

Beyond the individual customer relationship, there's a network effect worth considering. When loyalty is tied to speed, faster tables create more loyalty. More loyalty drives more return visits. More return visits means more opportunities to create more loyalty.

This self-reinforcing loop is what makes DineDash different from traditional loyalty plays: it compounds.

## Getting there

You don't need to abandon everything you're doing. Start by auditing where loyalty breaks down in your current system. Is it the initial sign-up? The redemption? The communication?

Whatever the friction point, the answer is almost always to remove a step, not add one.`,
    author: "Anand Swarup",
    authorRole: "Founder, DineDash",
    category: "Growth",
    tags: ["loyalty", "no-app", "friction", "repeat visits"],
    coverImage: "https://images.unsplash.com/photo-1498654896293-37aacf113fd9?w=1200&q=80",
    readingTime: 7,
    publishedAt: "2026-05-28T10:00:00Z",
  },
  {
    slug: "dinedash-case-study-pizza-express",
    title: "Case Study: How One Restaurant Added £18k in Monthly Revenue With One Change",
    excerpt: "We worked with a 60-seat Italian restaurant in Manchester. Within 8 weeks of going live with DineDash, their Friday lunch revenue jumped by 34%. Here's what happened.",
    content: `Numbers in restaurant case studies are often murky. So let's be specific.

Bella Cucina (name changed) is a 60-seat Italian restaurant in the Northern Quarter, Manchester. They opened in 2021, survived the post-pandemic chaos, and by early 2026 were running a solid business — but lunch service was underperforming relative to their dinner numbers.

## The situation before DineDash

Bella Cucina's Friday lunch service ran from noon to 3pm. With an average dine time of 85 minutes and tables mostly for two, they were turning each table approximately 2.1 times per service.

Average spend per cover: £19.50. Average table size: 2.2 covers. Number of tables: 30.

Friday lunch revenue: £19.50 × 2.2 × 30 × 2.1 = approximately £2,695 per Friday lunch.

The owner, Marco, suspected they were leaving money on the table — literally. The neighbourhood is full of office workers with a finite lunch window. He believed faster service would drive more covers, but didn't want to pressure diners.

## What changed with DineDash

DineDash was configured with a 65-minute target dine time. Tables that finished within this window received an automatic 12% discount on their next visit.

Within 4 weeks, average dine time had dropped to 71 minutes — a 16% reduction. This wasn't from rushing anyone. It came from two sources: staff becoming more proactive about bill delivery (the system surfaced signals when a table was likely finishing), and diners who knew about the speed reward naturally being a bit more decisive.

By week 8, dine time had stabilised at 68 minutes. Table turns in the Friday lunch window increased from 2.1 to 2.6.

## The revenue impact

At 2.6 turns: £19.50 × 2.2 × 30 × 2.6 = approximately £3,341 per Friday lunch. That's an increase of £646 per Friday lunch service.

Across all lunch services that week (Tuesday–Saturday), the pattern held — not as dramatically, but consistently. Total weekly lunch revenue increase: approximately £2,100.

Monthly uplift from lunch alone: approximately £8,400.

But there was a second effect: return visit rate from DineDash reward holders was 41% higher than the restaurant's historical baseline. These return visitors skewed toward dinner service, where average spend per cover is £34. The combined effect of higher turnover at lunch and more loyal, higher-spending dinner guests pushed monthly revenue up by approximately £18,200.

## What Marco says

"I was sceptical about any system that claimed to speed up service without annoying my customers. What surprised me was that customers didn't feel rushed — they felt looked after. The discount gives them a reason to come back that feels like a gift, not a gimmick."

## The lesson

The biggest gains weren't from a dramatic operational overhaul. They came from one change, applied consistently, with a built-in incentive that made diners willing participants in the process.`,
    author: "Anand Swarup",
    authorRole: "Founder, DineDash",
    category: "Case Study",
    tags: ["case study", "results", "revenue"],
    coverImage: "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=1200&q=80",
    readingTime: 8,
    publishedAt: "2026-05-20T10:00:00Z",
  },
  {
    slug: "peak-hours-optimisation-guide",
    title: "The Complete Guide to Peak Hour Optimisation for Modern Restaurants",
    excerpt: "Lunch rush. Friday dinner. Brunch chaos. Peak hours make or break profitability. This guide walks through every lever you can pull — with and without technology.",
    content: `Peak hours are when restaurants make their money. They're also when things go wrong.

The operational decisions you make in the 90 minutes of a Friday dinner service have more impact on your annual profitability than almost anything else. Getting peak hours right isn't just about managing a rush — it's about extracting maximum value from your most precious resource: finite physical space during finite high-demand windows.

## Understanding your peaks

Before you can optimise, you need to know what your peaks actually look like. Most operators have an intuitive sense of when they're busy, but the detail matters.

A 30-minute granularity of covers seated is a good starting point. You're looking for:

- When your true peak begins and ends (often narrower than operators expect)
- The "cliff" — where demand falls off sharply at the end of a peak
- Shoulder periods that are often underutilised

Most modern POS systems can generate this data. If yours can't, two weeks of manual logging will give you a solid baseline.

## The four levers

**1. Reservation strategy**

Staggered booking slots reduce the "flood" effect where too many tables are seated simultaneously, overwhelming the kitchen and front-of-house. If you're currently taking reservations on the hour and half-hour, try moving to 15-minute intervals and capping the number of tables per slot.

**2. Table configuration flexibility**

Fixed table layouts leave money on the floor during peak hours. A dedicated zone of 2-tops that can be pushed together for 4s or 6s gives you flexibility to accommodate walk-in demand without turning parties away.

**3. Menu engineering for speed**

A menu with 12 starters and 18 mains requires more decision time than one with 6 and 10. During peak periods especially, a tighter menu isn't just easier to execute in the kitchen — it gets food to the table faster, which means tables turn faster.

Consider a peak-hours menu that's a curated subset of your full offering. Restaurants that do this often find customer satisfaction goes up, not down — fewer choices means less decision paralysis.

**4. Bill proactivity**

The bill is the single most underused tool in a restaurant operator's arsenal. The average table waits 18–22 minutes from when they're ready to leave to when they've actually paid. That's dead time — the table is occupied, the guests are done, and the kitchen has moved on.

Training staff to read table-ready signals (conversation slowing, phones out, chairs angled away from the table) and bring the bill proactively — without being asked — can recover 15+ minutes per table. Across a busy service, that's multiple extra turns.

## Where technology helps

Manual processes for all of the above work, but they're hard to sustain consistently across staff and services. This is where technology like DineDash earns its place: not by replacing human judgement, but by surfacing the signals that enable better human decisions.

A system that flags when a table has been in the "eating complete" phase for 10 minutes gives your server an obvious, actionable prompt. A system that automatically rewards fast tables creates a self-reinforcing culture of efficient dining without any staff intervention at all.

## Building the habit

Peak hour optimisation is not a one-time project. It's a discipline. The restaurants that sustain it do two things: they measure what matters (table dwell time, revenue per seat-hour, turn rate by service) and they review those metrics weekly, not quarterly.

The good news is that the baseline changes quickly. Within 4–6 weeks of focused attention on peak efficiency, most operators see measurable improvement. Within 12 weeks, the gains tend to compound as staff behaviours and customer expectations both shift.`,
    author: "Anand Swarup",
    authorRole: "Founder, DineDash",
    category: "Tips & Tricks",
    tags: ["peak hours", "optimisation", "staffing"],
    coverImage: "https://images.unsplash.com/photo-1466978913421-dad2ebd01d17?w=1200&q=80",
    readingTime: 10,
    publishedAt: "2026-05-12T10:00:00Z",
  },
];

async function getPost(slug: string): Promise<BlogPost | null> {
  try {
    const base = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";
    const res = await fetch(`${base}/api/blogs/${slug}`, { next: { revalidate: 60 } });
    if (res.ok) {
      const data = await res.json();
      if (data.post) return data.post;
    }
  } catch {
    // fall through to dummy
  }
  return DUMMY_POSTS.find((p) => p.slug === slug) ?? null;
}

async function getAllSlugs(): Promise<string[]> {
  return DUMMY_POSTS.map((p) => p.slug);
}

export async function generateStaticParams() {
  const slugs = await getAllSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPost(slug);
  if (!post) return { title: "Post not found" };
  return {
    title: post.title,
    description: post.excerpt,
    alternates: { canonical: `/blog/${slug}` },
    openGraph: {
      title: `${post.title} | DineDash Blog`,
      description: post.excerpt,
      url: `https://dinedash.app/blog/${slug}`,
      images: post.coverImage ? [{ url: post.coverImage }] : undefined,
    },
  };
}

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString("en-GB", {
    day: "numeric", month: "long", year: "numeric",
  });
}

function renderContent(content: string) {
  const paragraphs = content.split("\n\n");
  return paragraphs.map((block, i) => {
    if (block.startsWith("## ")) {
      return (
        <h2 key={i} className="text-xl font-bold text-[var(--text-primary)] mt-10 mb-4">
          {block.replace("## ", "")}
        </h2>
      );
    }
    if (block.startsWith("**") && block.endsWith("**")) {
      return (
        <p key={i} className="font-semibold text-[var(--text-primary)] leading-relaxed mb-4">
          {block.replace(/\*\*/g, "")}
        </p>
      );
    }
    return (
      <p key={i} className="text-[var(--text-secondary)] leading-[1.85] mb-5 text-base">
        {block}
      </p>
    );
  });
}

const CATEGORY_COLORS: Record<string, string> = {
  "Operations": "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400",
  "Customer Experience": "bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400",
  "Growth": "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400",
  "Case Study": "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400",
  "Tips & Tricks": "bg-pink-100 text-pink-700 dark:bg-pink-900/30 dark:text-pink-400",
  "Technology": "bg-cyan-100 text-cyan-700 dark:bg-cyan-900/30 dark:text-cyan-400",
};

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = await getPost(slug);

  if (!post) notFound();

  const related = DUMMY_POSTS.filter((p) => p.slug !== slug && p.category === post.category).slice(0, 2);

  return (
    <div className="overflow-x-hidden">
      {/* Hero */}
      <section className="relative pt-28 pb-10 px-4 overflow-hidden">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-40 -right-40 w-[500px] h-[500px] bg-[var(--brand-light)] rounded-full opacity-25 blur-3xl" />
        </div>
        <Reveal className="relative max-w-3xl mx-auto">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-sm text-[var(--text-muted)] hover:text-[var(--brand-text)] transition-colors duration-300 mb-8 group"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform duration-300" />
            Back to Blog
          </Link>

          <div className="flex items-center gap-3 mb-5 flex-wrap">
            <span className={`text-xs font-bold px-3 py-1.5 rounded-full ${CATEGORY_COLORS[post.category] ?? "bg-[var(--surface-alt)] text-[var(--text-muted)]"}`}>
              {post.category}
            </span>
            <span className="flex items-center gap-1.5 text-sm text-[var(--text-muted)]">
              <Clock className="w-4 h-4" /> {post.readingTime} min read
            </span>
            {post.publishedAt && (
              <span className="flex items-center gap-1.5 text-sm text-[var(--text-muted)]">
                <Calendar className="w-4 h-4" /> {formatDate(post.publishedAt)}
              </span>
            )}
          </div>

          <h1 className="headline-lg text-[var(--text-primary)] mb-5">
            {post.title}
          </h1>
          <p className="text-lg text-[var(--text-secondary)] leading-relaxed mb-8">{post.excerpt}</p>

          {/* Author */}
          <div className="flex items-center gap-3 pb-8 border-b border-[var(--border)]">
            <div className="w-10 h-10 rounded-full bg-[var(--brand-light)] flex items-center justify-center text-[var(--brand-text)] font-bold">
              {post.author.charAt(0)}
            </div>
            <div>
              <p className="font-semibold text-[var(--text-primary)] text-sm">{post.author}</p>
              {post.authorRole && <p className="text-xs text-[var(--text-muted)]">{post.authorRole}</p>}
            </div>
          </div>
        </Reveal>
      </section>

      {/* Cover image */}
      {post.coverImage && (
        <Reveal className="max-w-4xl mx-auto px-4 mb-12">
          <div className="rounded-2xl overflow-hidden aspect-[21/9]">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={post.coverImage} alt={post.title} className="w-full h-full object-cover" />
          </div>
        </Reveal>
      )}

      {/* Content */}
      <article className="max-w-3xl mx-auto px-4 pb-16">
        <div className="prose-custom">
          {renderContent(post.content)}
        </div>

        {/* Tags */}
        {post.tags?.length > 0 && (
          <div className="flex items-center gap-2 flex-wrap mt-10 pt-8 border-t border-[var(--border)]">
            <Tag className="w-4 h-4 text-[var(--text-muted)]" />
            {post.tags.map((tag) => (
              <span key={tag} className="text-xs text-[var(--text-muted)] bg-[var(--surface-alt)] border border-[var(--border)] px-3 py-1 rounded-full">
                {tag}
              </span>
            ))}
          </div>
        )}

        {/* Author card */}
        <div className="mt-10 p-6 bg-[var(--surface)] border border-[var(--border)] rounded-2xl flex gap-4 items-start">
          <div className="w-12 h-12 rounded-full bg-[var(--brand-light)] flex items-center justify-center text-[var(--brand-text)] font-bold text-lg flex-shrink-0">
            {post.author.charAt(0)}
          </div>
          <div>
            <p className="font-bold text-[var(--text-primary)] mb-0.5">{post.author}</p>
            {post.authorRole && <p className="text-sm text-[var(--text-muted)] mb-2">{post.authorRole}</p>}
            <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
              Building DineDash to help restaurants earn more from every service through smarter table management and automatic loyalty rewards.
            </p>
          </div>
        </div>
      </article>

      {/* Related posts */}
      {related.length > 0 && (
        <section className="max-w-3xl mx-auto px-4 pb-16">
          <h3 className="text-lg font-bold text-[var(--text-primary)] mb-5">More in {post.category}</h3>
          <div className="grid md:grid-cols-2 gap-5">
            {related.map((p) => (
              <Link key={p.slug} href={`/blog/${p.slug}`} className="group block">
                <div className="h-full rounded-2xl border border-[var(--border)] bg-[var(--surface)] hover:border-[var(--brand)] transition-all duration-300 overflow-hidden">
                  {p.coverImage && (
                    <div className="h-36 overflow-hidden">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={p.coverImage} alt={p.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                    </div>
                  )}
                  <div className="p-5">
                    <span className="text-xs text-[var(--text-muted)] flex items-center gap-1 mb-2">
                      <Clock className="w-3 h-3" /> {p.readingTime} min read
                    </span>
                    <h4 className="font-bold text-sm text-[var(--text-primary)] leading-snug group-hover:text-[var(--brand)] transition-colors line-clamp-2">
                      {p.title}
                    </h4>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* CTA */}
      <Reveal className="max-w-3xl mx-auto px-4 pb-20">
        <div className="relative rounded-3xl overflow-hidden bg-[var(--surface)] border border-[var(--border)] p-8 text-center">
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute -top-16 -right-16 w-48 h-48 bg-[var(--brand-light)] rounded-full opacity-40 blur-2xl" />
          </div>
          <div className="relative">
            <h3 className="text-xl font-bold text-[var(--text-primary)] mb-2">Ready to try DineDash?</h3>
            <p className="text-sm text-[var(--text-secondary)] mb-5 max-w-sm mx-auto">
              Join restaurants turning every table faster and building loyal repeat customers automatically.
            </p>
            <Link href="/get-started" className="btn-primary inline-flex items-center gap-2 px-6 py-2.5 text-sm font-semibold">
              Get early access <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </Reveal>
    </div>
  );
}
