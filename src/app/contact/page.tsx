import type { Metadata } from "next";

import ContactPageClient from "./ContactPageClient";

export const metadata: Metadata = {
  title: "Contact Us",
  description:
    "Get in touch with Techish Innovation to discuss your web, mobile, or custom software project.",
};

export default function ContactPage() {
  return <ContactPageClient />;
}
