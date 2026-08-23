import type { Metadata } from "next";

import BlogPageClient from "./BlogPageClient";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Insights on software engineering, product strategy, and design from the Techish Innovation team.",
};

export default function BlogPage() {
  return <BlogPageClient />;
}
