import type { Metadata } from "next";
import HomePageClient from "./_components/HomePageClient";

export const metadata: Metadata = {
  title: "DineDash — Pay First. Eat Fast. Get Money Back.",
  description:
    "Scan your table QR, order, pay the full price upfront, then beat the timer for an automatic refund of up to 30% — straight back to your card. No signup needed.",
  alternates: { canonical: "/" },
  openGraph: {
    title: "DineDash — Pay First. Eat Fast. Get Money Back.",
    description: "Finish in under 15 minutes and get 30% back. Automatically.",
    url: "https://dinedash.app",
  },
};

export default function HomePage() {
  return <HomePageClient />;
}
