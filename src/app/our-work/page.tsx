import type { Metadata } from "next";

import OurWorkPageClient from "./OurWorkPageClient";

export const metadata: Metadata = {
  title: "Our Work",
  description:
    "Explore selected projects from Techish Innovation's portfolio — web, mobile, and cloud products designed and built for our clients.",
};

export default function OurWorkPage() {
  return <OurWorkPageClient />;
}
