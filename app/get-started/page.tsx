import type { Metadata } from "next";
import GetStartedClient from "../_components/GetStartedClient";

export const metadata: Metadata = {
  title: "Get Started",
  description:
    "Start your free 14-day DineDash trial. No credit card required. Go live in under 1 hour and start turning tables faster today.",
  alternates: { canonical: "/get-started" },
  openGraph: {
    title: "Get Started | DineDash",
    description: "Start your free 14-day trial. No credit card required. Go live in under 1 hour.",
    url: "https://dinedash.app/get-started",
  },
};

export default function GetStartedPage() {
  return <GetStartedClient />;
}
