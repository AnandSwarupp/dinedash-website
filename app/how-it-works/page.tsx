import type { Metadata } from "next";
import HowItWorksClient from "../_components/HowItWorksClient";

export const metadata: Metadata = {
  title: "How It Works",
  description:
    "Five simple steps: scan the table QR, order, pay upfront, beat the timer, then scan the till to claim your refund. No signup needed.",
  alternates: { canonical: "/how-it-works" },
  openGraph: {
    title: "How DineDash Works | DineDash",
    description: "Five simple steps to earn up to 30% back on your restaurant meal. No signup needed.",
    url: "https://dinedash.app/how-it-works",
  },
};

export default function HowItWorksPage() {
  return <HowItWorksClient />;
}
