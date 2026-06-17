import type { Metadata } from "next";
import Link from "next/link";
import { Clock, ArrowRight, Tag } from "lucide-react";

export const metadata: Metadata = {
  title: "Blog",
  description: "Tips, stories, and insights on table turnover, restaurant operations, and faster dining.",
  alternates: { canonical: "/blog" },
  openGraph: {
    title: "Blog | DineDash",
    description: "Tips, stories, and insights on table turnover, restaurant operations, and faster dining.",
    url: "https://dinedash.app/blog",
  },
};

interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
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
    author: "Anand Swarup",
    authorRole: "Founder, DineDash",
    category: "Operations",
    tags: ["table turnover", "revenue", "operations"],
    coverImage: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800&q=80",
    readingTime: 6,
    publishedAt: "2026-06-10T10:00:00Z",
  },
  {
    slug: "speed-rewards-psychology",
    title: "The Psychology of Speed: Why Customers Who Wait Less Spend More",
    excerpt: "There's a counterintuitive truth buried in dining data: customers who receive faster service don't just leave happier — they spend significantly more on their next visit.",
    author: "Anand Swarup",
    authorRole: "Founder, DineDash",
    category: "Customer Experience",
    tags: ["psychology", "customer loyalty", "spending"],
    coverImage: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=800&q=80",
    readingTime: 5,
    publishedAt: "2026-06-05T10:00:00Z",
  },
  {
    slug: "restaurant-loyalty-without-app",
    title: "Building Restaurant Loyalty Without Making Customers Download Another App",
    excerpt: "App fatigue is real. Here's how forward-thinking restaurants are building repeat business using ambient incentives that require zero friction from diners.",
    author: "Anand Swarup",
    authorRole: "Founder, DineDash",
    category: "Growth",
    tags: ["loyalty", "no-app", "friction", "repeat visits"],
    coverImage: "https://images.unsplash.com/photo-1498654896293-37aacf113fd9?w=800&q=80",
    readingTime: 7,
    publishedAt: "2026-05-28T10:00:00Z",
  },
  {
    slug: "dinedash-case-study-pizza-express",
    title: "Case Study: How One Restaurant Added £18k in Monthly Revenue With One Change",
    excerpt: "We worked with a 60-seat Italian restaurant in Manchester. Within 8 weeks of going live with DineDash, their Friday lunch revenue jumped by 34%. Here's what happened.",
    author: "Anand Swarup",
    authorRole: "Founder, DineDash",
    category: "Case Study",
    tags: ["case study", "results", "revenue"],
    coverImage: "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=800&q=80",
    readingTime: 8,
    publishedAt: "2026-05-20T10:00:00Z",
  },
  {
    slug: "peak-hours-optimisation-guide",
    title: "The Complete Guide to Peak Hour Optimisation for Modern Restaurants",
    excerpt: "Lunch rush. Friday dinner. Brunch chaos. Peak hours make or break profitability. This guide walks through every lever you can pull — with and without technology.",
    author: "Anand Swarup",
    authorRole: "Founder, DineDash",
    category: "Tips & Tricks",
    tags: ["peak hours", "optimisation", "staffing"],
    coverImage: "https://images.unsplash.com/photo-1466978913421-dad2ebd01d17?w=800&q=80",
    readingTime: 10,
    publishedAt: "2026-05-12T10:00:00Z",
  },
];

async function getPosts(): Promise<BlogPost[]> {
  try {
    const base = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";
    const res = await fetch(`${base}/api/blogs`, { next: { revalidate: 60 } });
    if (!res.ok) return DUMMY_POSTS;
    const data = await res.json();
    return data.posts?.length ? data.posts : DUMMY_POSTS;
  } catch {
    return DUMMY_POSTS;
  }
}

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString("en-GB", {
    day: "numeric", month: "long", year: "numeric",
  });
}

const CATEGORY_COLORS: Record<string, string> = {
  "Operations": "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400",
  "Customer Experience": "bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400",
  "Growth": "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400",
  "Case Study": "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400",
  "Tips & Tricks": "bg-pink-100 text-pink-700 dark:bg-pink-900/30 dark:text-pink-400",
  "Technology": "bg-cyan-100 text-cyan-700 dark:bg-cyan-900/30 dark:text-cyan-400",
  "Industry News": "bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400",
};

function getCategoryColor(cat: string) {
  return CATEGORY_COLORS[cat] ?? "bg-[var(--surface-alt)] text-[var(--text-muted)]";
}

export default async function BlogPage() {
  const posts = await getPosts();
  const [featured, ...rest] = posts;

  return (
    <div className="overflow-x-hidden">
      {/* Hero */}
      <section className="relative pt-32 pb-16 px-4 overflow-hidden">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-40 -right-40 w-[600px] h-[600px] bg-[var(--brand-light)] rounded-full opacity-30 blur-3xl" />
          <div className="absolute top-60 -left-40 w-[400px] h-[400px] bg-blue-100 dark:bg-blue-900/20 rounded-full opacity-20 blur-3xl" />
        </div>
        <div className="relative max-w-5xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-[var(--brand-light)] text-[var(--brand-text)] text-xs font-bold px-4 py-2 rounded-full mb-6 uppercase tracking-wider">
            DineDash Journal
          </div>
          <h1 className="text-4xl md:text-6xl font-extrabold text-[var(--text-primary)] mb-5 leading-[1.1] tracking-tight">
            Insights for the <br className="hidden md:block" />
            <span className="gradient-text">modern restaurateur</span>
          </h1>
          <p className="text-[var(--text-secondary)] text-lg leading-relaxed max-w-2xl mx-auto">
            Practical guides, case studies, and ideas on table turnover, customer loyalty, and building a more profitable dining room.
          </p>
        </div>
      </section>

      <section className="max-w-5xl mx-auto px-4 pb-24 space-y-16">
        {/* Featured post */}
        {featured && (
          <Link href={`/blog/${featured.slug}`} className="group block">
            <div className="relative rounded-3xl overflow-hidden border border-[var(--border)] bg-[var(--surface)] hover:border-[var(--brand)] transition-all duration-300 shadow-[var(--card-shadow)] hover:shadow-[0_8px_40px_rgba(0,0,0,0.12)]">
              {featured.coverImage && (
                <div className="relative h-64 md:h-80 overflow-hidden">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={featured.coverImage}
                    alt={featured.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                  <div className="absolute bottom-5 left-6">
                    <span className={`text-xs font-bold px-3 py-1.5 rounded-full ${getCategoryColor(featured.category)}`}>
                      {featured.category}
                    </span>
                  </div>
                </div>
              )}
              <div className="p-7 md:p-8">
                <div className="flex items-center gap-3 mb-4">
                  {!featured.coverImage && (
                    <span className={`text-xs font-bold px-3 py-1.5 rounded-full ${getCategoryColor(featured.category)}`}>
                      {featured.category}
                    </span>
                  )}
                  <span className="text-xs text-[var(--text-muted)] flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5" /> {featured.readingTime} min read
                  </span>
                  {featured.publishedAt && (
                    <span className="text-xs text-[var(--text-muted)]">{formatDate(featured.publishedAt)}</span>
                  )}
                </div>
                <h2 className="text-2xl md:text-3xl font-extrabold text-[var(--text-primary)] mb-3 leading-tight group-hover:text-[var(--brand)] transition-colors">
                  {featured.title}
                </h2>
                <p className="text-[var(--text-secondary)] leading-relaxed mb-5 line-clamp-3">{featured.excerpt}</p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-[var(--brand-light)] flex items-center justify-center text-[var(--brand)] font-bold text-sm">
                      {featured.author.charAt(0)}
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-[var(--text-primary)]">{featured.author}</p>
                      {featured.authorRole && (
                        <p className="text-xs text-[var(--text-muted)]">{featured.authorRole}</p>
                      )}
                    </div>
                  </div>
                  <span className="flex items-center gap-1.5 text-sm font-semibold text-[var(--brand)] group-hover:gap-2.5 transition-all">
                    Read article <ArrowRight className="w-4 h-4" />
                  </span>
                </div>
              </div>
            </div>
          </Link>
        )}

        {/* Grid of remaining posts */}
        {rest.length > 0 && (
          <div>
            <h2 className="text-lg font-bold text-[var(--text-primary)] mb-6">More articles</h2>
            <div className="grid md:grid-cols-2 gap-6">
              {rest.map((post) => (
                <Link key={post.slug} href={`/blog/${post.slug}`} className="group block">
                  <div className="h-full rounded-2xl border border-[var(--border)] bg-[var(--surface)] hover:border-[var(--brand)] transition-all duration-300 overflow-hidden shadow-[var(--card-shadow)] hover:shadow-[0_8px_32px_rgba(0,0,0,0.1)]">
                    {post.coverImage && (
                      <div className="h-44 overflow-hidden">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={post.coverImage}
                          alt={post.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                        />
                      </div>
                    )}
                    <div className="p-6">
                      <div className="flex items-center gap-2 mb-3 flex-wrap">
                        <span className={`text-xs font-bold px-2.5 py-1 rounded-full ${getCategoryColor(post.category)}`}>
                          {post.category}
                        </span>
                        <span className="text-xs text-[var(--text-muted)] flex items-center gap-1">
                          <Clock className="w-3 h-3" /> {post.readingTime} min
                        </span>
                      </div>
                      <h3 className="font-bold text-[var(--text-primary)] leading-snug mb-2 group-hover:text-[var(--brand)] transition-colors line-clamp-2">
                        {post.title}
                      </h3>
                      <p className="text-sm text-[var(--text-secondary)] leading-relaxed line-clamp-3 mb-4">
                        {post.excerpt}
                      </p>
                      {post.tags?.length > 0 && (
                        <div className="flex items-center gap-1.5 flex-wrap mb-4">
                          <Tag className="w-3 h-3 text-[var(--text-muted)]" />
                          {post.tags.slice(0, 3).map((tag) => (
                            <span key={tag} className="text-xs text-[var(--text-muted)] bg-[var(--surface-alt)] px-2 py-0.5 rounded-md">
                              {tag}
                            </span>
                          ))}
                        </div>
                      )}
                      <div className="flex items-center justify-between pt-4 border-t border-[var(--border)]">
                        <div className="flex items-center gap-2">
                          <div className="w-6 h-6 rounded-full bg-[var(--brand-light)] flex items-center justify-center text-[var(--brand)] font-bold text-xs">
                            {post.author.charAt(0)}
                          </div>
                          <span className="text-xs text-[var(--text-muted)]">{post.author}</span>
                        </div>
                        {post.publishedAt && (
                          <span className="text-xs text-[var(--text-muted)]">{formatDate(post.publishedAt)}</span>
                        )}
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}

      </section>
    </div>
  );
}
