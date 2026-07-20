import type { Metadata } from "next";
import HomePageClient from "./_components/HomePageClient";

export const metadata: Metadata = {
  title: "DineDash — Order First. Eat Fast. Pay Less.",
  description:
    "Scan your table QR, order, and start the timer. Eat fast — the quicker you finish, the bigger the discount of up to 30% applied automatically when you pay. Quick sign-in, that's it.",
  alternates: { canonical: "/" },
  openGraph: {
    title: "DineDash — Order First. Eat Fast. Pay Less.",
    description: "Finish in under 15 minutes and pay 30% less. Automatically.",
    url: "https://dinedash.app",
  },
};

export default function HomePage() {
  return <HomePageClient />;
}
