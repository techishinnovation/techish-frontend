import type { Metadata } from "next";

import CareersPageClient from "./CareersPageClient";

export const metadata: Metadata = {
  title: "Careers",
  description:
    "Join Techish Innovation — explore open software engineering, design, and product roles at a company built around craftsmanship and ownership.",
};

export default function CareersPage() {
  return <CareersPageClient />;
}
