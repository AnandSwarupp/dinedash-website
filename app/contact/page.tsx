import type { Metadata } from "next";
import ContactClient from "../_components/ContactClient";

export const metadata: Metadata = {
  title: "Contact Us",
  description:
    "Get in touch with the DineDash team. Questions about pricing, restaurant setup, partnerships, or technical support — we reply within 24 hours.",
  alternates: { canonical: "/contact" },
  openGraph: {
    title: "Contact Us | DineDash",
    description: "Get in touch with the DineDash team. We reply within 24 hours.",
    url: "https://dinedash.app/contact",
  },
};

export default function ContactPage() {
  return <ContactClient />;
}
