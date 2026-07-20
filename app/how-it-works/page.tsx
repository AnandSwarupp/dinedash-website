import type { Metadata } from "next";
import HowItWorksClient from "../_components/HowItWorksClient";

export const metadata: Metadata = {
  title: "How It Works",
  description:
    "Five simple steps: sign in, scan the table QR, order, start the timer, then scan the till to pay — with your speed discount already applied.",
  alternates: { canonical: "/how-it-works" },
  openGraph: {
    title: "How DineDash Works | DineDash",
    description: "Five simple steps to pay up to 30% less on your restaurant meal. Quick sign-in, that's it.",
    url: "https://dinedash.app/how-it-works",
  },
};

export default function HowItWorksPage() {
  return <HowItWorksClient />;
}
