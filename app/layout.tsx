import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";
import ThemeProvider from "@/components/ThemeProvider";
import MarketingLayout from "@/components/MarketingLayout";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "DineDash — Pay First. Eat Fast. Get Money Back.",
    template: "%s | DineDash",
  },
  description:
    "DineDash rewards diners for eating quickly with automatic refunds up to 30%. Restaurants get faster table turnover with zero extra staff. Powered by Stripe.",
  keywords: ["restaurant app", "dining discount", "table turnover", "QR ordering", "speed dining"],
  openGraph: {
    title: "DineDash — Pay First. Eat Fast. Get Money Back.",
    description: "Finish in under 15 minutes and get 30% back. Automatically.",
    siteName: "DineDash",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${geistSans.variable} h-full`} suppressHydrationWarning>
      <body className="min-h-full flex flex-col antialiased">
        <ThemeProvider>
          <MarketingLayout>{children}</MarketingLayout>
        </ThemeProvider>
      </body>
    </html>
  );
}
