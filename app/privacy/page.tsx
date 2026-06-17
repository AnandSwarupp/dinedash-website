import type { Metadata } from "next";
import LegalPage, { LegalSection } from "../_components/LegalPage";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "How DineDash collects, uses, and protects your data.",
  alternates: { canonical: "/privacy" },
  openGraph: {
    title: "Privacy Policy | DineDash",
    description: "How DineDash collects, uses, and protects your data.",
    url: "https://dinedash.app/privacy",
  },
};

const FALLBACK = {
  updated: "16 June 2026",
  intro: "This Privacy Policy explains how DineDash ('we', 'us') collects, uses, and protects information when you use our website, app, or in-restaurant service. This is placeholder content and should be reviewed by a qualified lawyer before publishing.",
  sections: [
    {
      heading: "1. Information we collect",
      body: [
        "When you use DineDash as a diner, we generate an anonymous session ID on your device — no account, email, or personal details are required to use the core service.",
        "When you contact us, sign up for a restaurant trial, or subscribe to updates, we collect the information you provide directly, such as your name, email address, phone number, and restaurant details.",
        "Payments are processed by Stripe. We do not store your card details — Stripe handles all payment data under its own privacy and security policies.",
      ],
    },
    {
      heading: "2. How we use your information",
      body: [
        "To operate the refund-timer service, process payments, and provide restaurant dashboards.",
        "To respond to support requests and communicate about your account or trial.",
        "To improve our product through aggregated, anonymised usage analytics.",
      ],
    },
    {
      heading: "3. Data sharing",
      body: [
        "We do not sell personal data. We share data only with service providers necessary to operate DineDash (e.g. Stripe for payments, hosting providers), and only to the extent required to provide the service.",
      ],
    },
    {
      heading: "4. Your rights",
      body: [
        "You may request access to, correction of, or deletion of your personal data at any time by contacting us. UK and EU residents have additional rights under GDPR.",
      ],
    },
    {
      heading: "5. Contact",
      body: ["For privacy questions, reach us at hello@dinedash.app."],
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
    const res = await fetch(`${base}/api/content/privacy-policy`, { next: { revalidate: 300 } });
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

export default async function PrivacyPage() {
  const content = await getLegalContent();
  const { updated, intro, sections } = content ?? FALLBACK;
  return <LegalPage title="Privacy Policy" updated={updated} intro={intro} sections={sections} />;
}
