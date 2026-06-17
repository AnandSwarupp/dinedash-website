import type { Metadata } from "next";
import LegalPage, { LegalSection } from "../_components/LegalPage";

export const metadata: Metadata = {
  title: "Cookie Policy",
  description: "How DineDash uses cookies and similar technologies.",
  alternates: { canonical: "/cookies" },
  openGraph: {
    title: "Cookie Policy | DineDash",
    description: "How DineDash uses cookies and similar technologies.",
    url: "https://dinedash.app/cookies",
  },
};

const FALLBACK = {
  updated: "16 June 2026",
  intro: "This Cookie Policy explains how DineDash uses cookies and similar technologies on our website. This is placeholder content and should be reviewed by a qualified lawyer before publishing.",
  sections: [
    {
      heading: "1. What are cookies",
      body: [
        "Cookies are small text files stored on your device that help websites function and remember preferences across visits.",
      ],
    },
    {
      heading: "2. How we use cookies",
      body: [
        "Essential cookies: required for core site functionality, such as keeping you signed into the admin dashboard, and remembering your light/dark theme preference.",
        "Analytics cookies: help us understand how visitors use the site so we can improve it. These are only set with your consent where required by law.",
      ],
    },
    {
      heading: "3. Managing cookies",
      body: [
        "You can control or delete cookies through your browser settings. Disabling certain cookies may affect site functionality.",
      ],
    },
    {
      heading: "4. Contact",
      body: ["Questions about this policy can be sent to hello@dinedash.app."],
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
    const res = await fetch(`${base}/api/content/cookie-policy`, { next: { revalidate: 300 } });
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

export default async function CookiesPage() {
  const content = await getLegalContent();
  const { updated, intro, sections } = content ?? FALLBACK;
  return <LegalPage title="Cookie Policy" updated={updated} intro={intro} sections={sections} />;
}
