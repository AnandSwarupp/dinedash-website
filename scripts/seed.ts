/**
 * Run with: npx tsx scripts/seed.ts
 * Seeds Neon (Postgres) with the current hardcoded site content.
 * Safe to re-run — uses upsert so existing data is overwritten.
 */

// Load .env.local manually before any imports that need env vars
import { readFileSync } from "fs";
import { resolve } from "path";
import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import { siteContent } from "../lib/db/schema";

try {
  const env = readFileSync(resolve(process.cwd(), ".env.local"), "utf-8");
  for (const line of env.split("\n")) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;
    const eqIdx = trimmed.indexOf("=");
    if (eqIdx === -1) continue;
    const key = trimmed.slice(0, eqIdx).trim();
    const val = trimmed.slice(eqIdx + 1).trim();
    if (!process.env[key]) process.env[key] = val;
  }
} catch {
  // .env.local not found — rely on actual env vars
}

const uri = process.env.DATABASE_URL;
if (!uri) {
  console.error("DATABASE_URL not set in .env.local");
  process.exit(1);
}

const db = drizzle(neon(uri), { schema: { siteContent } });

const content: Record<string, unknown> = {
  pricing: [
    {
      id: "plan_starter",
      name: "Starter",
      price: "£49",
      period: "/month",
      description: "Perfect for single-location restaurants getting started.",
      features: [
        "Up to 50 tables",
        "Automated discount engine",
        "Real-time kitchen dashboard",
        "Basic analytics",
        "Email support",
      ],
      highlighted: false,
      cta: "Get started",
    },
    {
      id: "plan_growth",
      name: "Growth",
      price: "£99",
      period: "/month",
      description: "For growing restaurants that want deeper insights.",
      features: [
        "Unlimited tables",
        "Advanced analytics & reports",
        "Custom discount rules",
        "Priority support",
        "API access",
        "Multi-device dashboard",
      ],
      highlighted: true,
      badge: "Most popular",
      cta: "Start free trial",
    },
    {
      id: "plan_enterprise",
      name: "Enterprise",
      price: "Custom",
      period: "",
      description: "For multi-location groups and franchise chains.",
      features: [
        "Everything in Growth",
        "Multi-location management",
        "Dedicated account manager",
        "Custom integrations",
        "SLA guarantee",
        "On-site onboarding",
      ],
      highlighted: false,
      cta: "Contact us",
    },
  ],

  tiers: [
    { id: "tier_1", label: "Under 15 min", time: "< 15 min", discount: "30%", description: "Lightning fast" },
    { id: "tier_2", label: "Under 30 min", time: "< 30 min", discount: "20%", description: "Great time" },
    { id: "tier_3", label: "Under 45 min", time: "< 45 min", discount: "10%", description: "On time" },
    { id: "tier_4", label: "Over 45 min", time: "> 45 min", discount: "0%", description: "No discount" },
  ],

  faqs: [
    {
      id: "faq_1",
      question: "How does the automatic discounting work?",
      answer: "DineDash tracks delivery time from the moment an order is confirmed to when it's delivered. Based on the time taken, it automatically applies a pre-configured discount to the customer's bill — no manual input needed.",
    },
    {
      id: "faq_2",
      question: "Can I customise the discount tiers?",
      answer: "Yes! You can set your own time brackets and discount percentages from the admin dashboard. You can also cap the maximum discount per order.",
    },
    {
      id: "faq_3",
      question: "Does DineDash integrate with my existing POS?",
      answer: "We support integrations with major POS systems including Square, Toast, and Lightspeed. Custom API integrations are available on the Enterprise plan.",
    },
    {
      id: "faq_4",
      question: "What happens if my internet goes down?",
      answer: "DineDash uses offline-first architecture. Orders queue locally and sync as soon as connectivity is restored. No orders are lost.",
    },
    {
      id: "faq_5",
      question: "Is there a free trial?",
      answer: "Yes — the Growth plan comes with a 14-day free trial, no credit card required. The Starter plan is free for the first month.",
    },
    {
      id: "faq_6",
      question: "How do customers know about the discounts?",
      answer: "Customers see a real-time countdown on the order tracking screen. The discount is applied automatically at checkout if the delivery beats the target time.",
    },
  ],

  testimonials: [
    {
      id: "test_1",
      name: "Sarah Johnson",
      role: "Owner",
      restaurant: "The Cosy Kitchen",
      text: "Since installing DineDash our average delivery time dropped from 42 minutes to 28. Customers love the discount — and so do we because it's brought repeat business through the roof.",
      rating: 5,
    },
    {
      id: "test_2",
      name: "Marco Ricci",
      role: "Operations Manager",
      restaurant: "Ricci Trattoria",
      text: "The live kitchen dashboard is a game-changer. The team can see every order status at a glance and the real-time speed incentive has genuinely changed how we work.",
      rating: 5,
    },
    {
      id: "test_3",
      name: "Priya Nair",
      role: "Co-founder",
      restaurant: "Spice Route",
      text: "We saw a 35% reduction in complaints within the first month. The automatic discounting resolves tension before it starts — customers feel looked after.",
      rating: 5,
    },
  ],

  team: [
    {
      id: "team_1",
      name: "Alex Chen",
      role: "Co-founder & CEO",
      bio: "Former head of logistics at Deliveroo. Built DineDash to solve the delivery speed problem from the inside out.",
    },
    {
      id: "team_2",
      name: "Priya Sharma",
      role: "Co-founder & CTO",
      bio: "Ex-Google engineer. Obsessed with real-time systems and making complex infrastructure feel invisible.",
    },
    {
      id: "team_3",
      name: "James O'Brien",
      role: "Head of Partnerships",
      bio: "Spent a decade running restaurant groups across London before joining DineDash to bridge the tech–hospitality gap.",
    },
  ],

  settings: {
    siteName: "DineDash",
    tagline: "Delivery that rewards speed",
    email: "hello@dinedash.app",
    phone: "",
    address: "",
    ctaPrimary: "Get started free",
    ctaSecondary: "See how it works",
    twitterUrl: "",
    linkedinUrl: "",
    instagramUrl: "",
    metaDescription: "DineDash rewards fast delivery with automatic discounts. Restaurants earn loyalty. Customers save more.",
  },
};

async function seed() {
  console.log("Connected to Neon");

  for (const [section, data] of Object.entries(content)) {
    await db
      .insert(siteContent)
      .values({ section, data })
      .onConflictDoUpdate({ target: siteContent.section, set: { data, updatedAt: new Date() } });
    console.log(`✓ Seeded: ${section}`);
  }

  console.log("\nDone! All content sections seeded.");
}

seed().catch((err) => {
  console.error(err);
  process.exit(1);
});
