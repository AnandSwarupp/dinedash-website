import type { Metadata } from "next";
import LegalPage, { LegalSection } from "../_components/LegalPage";

export const metadata: Metadata = {
  title: "Terms of Service",
  description: "The terms that govern your use of DineDash.",
  alternates: { canonical: "/terms" },
  openGraph: {
    title: "Terms of Service | DineDash",
    description: "The terms that govern your use of DineDash.",
    url: "https://dinedash.app/terms",
  },
};

const FALLBACK = {
  updated: "16 June 2026",
  intro: "These Terms of Service ('Terms') govern your use of DineDash's website, app, and in-restaurant service. This is placeholder content and should be reviewed by a qualified lawyer before publishing.",
  sections: [
    {
      heading: "1. Using DineDash",
      body: [
        "DineDash lets diners start a timer when they order, then pay for their meal with an automatic partial discount based on how quickly they finish, subject to the tiers shown at the time of payment.",
        "Restaurants subscribe to a monthly plan to access the DineDash dashboard, QR codes, and table-session tools. Plan details and pricing are described on our Pricing page and may change with notice.",
      ],
    },
    {
      heading: "2. Payments and discounts",
      body: [
        "All payments are processed securely via Stripe. Discount percentages are calculated automatically based on the dining session timer and applied to the bill before your card is charged.",
        "Restaurant subscriptions include a 30-day free trial. You may cancel at any time before the trial ends without being charged.",
      ],
    },
    {
      heading: "3. Acceptable use",
      body: [
        "You agree not to misuse the service, attempt to manipulate session timers, or interfere with the normal operation of DineDash for other users or restaurants.",
      ],
    },
    {
      heading: "4. Limitation of liability",
      body: [
        "DineDash is provided 'as is'. To the maximum extent permitted by law, we are not liable for indirect or consequential losses arising from use of the service.",
      ],
    },
    {
      heading: "5. Changes to these terms",
      body: [
        "We may update these Terms from time to time. Continued use of DineDash after changes take effect constitutes acceptance of the revised Terms.",
      ],
    },
    {
      heading: "6. Contact",
      body: ["Questions about these Terms can be sent to hello@dinedash.app."],
    },
  ] as LegalSection[],
};

interface StoredSection {
  id?: string;
  heading: string;
  body: string;
}

async function getLegalContent() {
  try {
    const base = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";
    const res = await fetch(`${base}/api/content/terms-of-service`, { next: { revalidate: 300 } });
    if (!res.ok) return null;
    const data = await res.json();
    if (!data?.data || !Array.isArray(data.data.sections)) return null;
    return {
      updated: data.data.updated || FALLBACK.updated,
      intro: data.data.intro || FALLBACK.intro,
      sections: data.data.sections.map((s: StoredSection) => ({
        heading: s.heading,
        body: s.body.split("\n\n").filter(Boolean),
      })) as LegalSection[],
    };
  } catch {
    return null;
  }
}

export default async function TermsPage() {
  const content = await getLegalContent();
  const { updated, intro, sections } = content ?? FALLBACK;
  return <LegalPage title="Terms of Service" updated={updated} intro={intro} sections={sections} />;
}
