import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";
import ThemeProvider from "@/components/ThemeProvider";
import SmoothScrollProvider from "@/components/SmoothScrollProvider";
import MarketingLayout from "@/components/MarketingLayout";
import { getContent } from "@/lib/getContent";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

interface SiteSettings { siteName?: string; metaDescription?: string; tagline?: string; }

export async function generateMetadata(): Promise<Metadata> {
  const s = await getContent<SiteSettings>("settings");
  const siteName = s?.siteName || "DineDash";
  const description = s?.metaDescription || "DineDash rewards diners for eating quickly with an automatic discount of up to 30% applied when they pay. Restaurants get faster table turnover with zero extra staff. Powered by Stripe.";
  const title = `${siteName} — Order First. Eat Fast. Pay Less.`;
  return {
    metadataBase: new URL("https://dinedash.app"),
    title: {
      default: title,
      template: `%s | ${siteName}`,
    },
    description,
    keywords: ["restaurant app", "dining discount", "table turnover", "QR ordering", "speed dining"],
    alternates: { canonical: "/" },
    openGraph: {
      title,
      description: "Finish in under 15 minutes and pay 30% less. Automatically.",
      siteName,
      type: "website",
      url: "https://dinedash.app",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description: "Finish in under 15 minutes and pay 30% less. Automatically.",
    },
  };
}

const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "DineDash",
  url: "https://dinedash.app",
  logo: "https://dinedash.app/favicon.ico",
  description:
    "DineDash rewards diners for eating quickly with an automatic discount of up to 30% applied when they pay. Restaurants get faster table turnover with zero extra staff.",
  sameAs: [],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${geistSans.variable} h-full`} suppressHydrationWarning>
      <body className="min-h-full flex flex-col antialiased">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
        <ThemeProvider>
          <SmoothScrollProvider>
            <MarketingLayout>{children}</MarketingLayout>
          </SmoothScrollProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
