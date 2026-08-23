"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import {
  FiArrowRight,
  FiArrowUpRight,
  FiBookOpen,
  FiCloud,
  FiCode,
  FiCpu,
  FiPenTool,
  FiPlay,
  FiSmartphone,
} from "react-icons/fi";

import BlogCard from "@/components/BlogCard";
import BlogLightbox from "@/components/BlogLightbox";
import Marquee from "@/components/Marquee";
import Pagination from "@/components/Pagination";
import Reveal from "@/components/Reveal";
import SEOContent from "@/components/SEOContent";
import staticBlogs from "@/data/blogs.json";
import { api } from "@/lib/api";
import type { AnyBlogPost, BlogPost } from "@/lib/types";

const PAGE_SIZE = 12;
const TOPICS = Array.from(new Set(staticBlogs.map((p) => p.category)));
const TOPIC_ICONS = [FiCode, FiSmartphone, FiCloud, FiPenTool, FiCpu];
const MARQUEE_ITEMS = [
  "Written by Engineers",
  "No Recycled Content",
  "Practical Perspectives",
  "Updated Regularly",
  "Real Project Experience",
];

export default function BlogPageClient() {
  const [apiPosts, setApiPosts] = useState<AnyBlogPost[]>([]);
  const [page, setPage] = useState(1);
  const [active, setActive] = useState<AnyBlogPost | null>(null);

  useEffect(() => {
    api
      .get("/blog/posts/?page_size=100")
      .then((res) => {
        const results: BlogPost[] = res.data.results ?? [];
        setApiPosts(results.map((p) => ({ ...p, source: "api" as const })));
      })
      .catch(() => setApiPosts([]));
  }, []);

  const allPosts: AnyBlogPost[] = useMemo(() => {
    const staticPosts: AnyBlogPost[] = staticBlogs.map((p) => ({ ...p, source: "static" as const }));
    return [...apiPosts, ...staticPosts];
  }, [apiPosts]);

  const totalPages = Math.max(1, Math.ceil(allPosts.length / PAGE_SIZE));
  const pageItems = allPosts.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  return (
    <>
      {/* HERO: editorial split layout */}
      <section className="relative overflow-hidden section pt-16 md:pt-24">
        <div className="pointer-events-none absolute inset-0 mesh-gradient" />
        <div className="pointer-events-none absolute -top-24 right-1/4 h-72 w-72 rounded-full bg-secondary/10 blur-3xl animate-float-slow" />
        <div className="pointer-events-none absolute bottom-0 left-0 h-64 w-64 rounded-full bg-primary/10 blur-3xl animate-float-slower" />

        <div className="container-page relative grid items-center gap-14 lg:grid-cols-2">
          <Reveal>
            <span className="badge-pill">
              <FiBookOpen size={12} /> Insights &amp; Ideas
            </span>
            <h1 className="mt-6 font-heading text-4xl font-bold leading-tight text-foreground sm:text-5xl">
              Ideas on <span className="gradient-text">Engineering &amp; Product</span>, From Our Team
            </h1>
            <p className="mt-6 max-w-lg text-base leading-relaxed text-foreground-muted sm:text-lg">
              Practical, no-fluff perspectives on software engineering,
              product strategy, and design — written by the people building it,
              not a content mill chasing keywords.
            </p>
            <p className="mt-4 max-w-lg text-sm leading-relaxed text-foreground-muted">
              We write across <span className="font-medium text-foreground">{TOPICS.join(", ")}</span>,
              and everything else our engineering team touches day to day.
            </p>
          </Reveal>

          {/* Mobile / tablet: compact featured-article card */}
          <Reveal delay={0.15} className="relative lg:hidden">
            <div className="relative overflow-hidden rounded-3xl border-4 border-white shadow-2xl">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/images/13.jpg" alt="Featured article" className="h-56 w-full object-cover sm:h-72" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-4">
                <span className="inline-flex items-center rounded-full bg-white/90 px-2.5 py-1 text-[11px] font-semibold text-primary">
                  Featured
                </span>
                <p className="mt-2 font-heading text-sm font-semibold leading-snug text-white sm:text-base">
                  Building Scalable Web Architecture in 2026
                </p>
                <span className="mt-2 inline-flex items-center gap-1 text-xs text-white/80">
                  Read article <FiArrowUpRight size={11} />
                </span>
              </div>
            </div>
          </Reveal>

          {/* Featured-article visual: stacked video + photo cards */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            className="relative mx-auto hidden aspect-[4/5] w-full max-w-sm lg:block"
          >
            {/* Back card: video peeking out */}
            <div className="absolute right-0 top-6 h-64 w-56 rotate-[8deg] overflow-hidden rounded-2xl border-4 border-white shadow-xl">
              <video src="/videos/5.mp4" autoPlay muted loop playsInline className="h-full w-full object-cover" />
              <div className="absolute inset-0 bg-black/20" />
              <span className="absolute right-3 top-3 inline-flex h-8 w-8 items-center justify-center rounded-full bg-white/90 text-primary shadow-sm">
                <FiPlay size={13} />
              </span>
            </div>

            {/* Front card: featured post preview */}
            <div className="absolute left-0 bottom-0 w-72 rotate-[-4deg] overflow-hidden rounded-2xl border-4 border-white shadow-2xl transition-transform duration-500 hover:rotate-0">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/images/13.jpg" alt="Featured article" className="h-80 w-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-4">
                <span className="inline-flex items-center rounded-full bg-white/90 px-2.5 py-1 text-[11px] font-semibold text-primary">
                  Featured
                </span>
                <p className="mt-2 font-heading text-sm font-semibold leading-snug text-white">
                  Building Scalable Web Architecture in 2026
                </p>
                <span className="mt-2 inline-flex items-center gap-1 text-xs text-white/80">
                  Read article <FiArrowUpRight size={11} />
                </span>
              </div>
            </div>

            {/* Floating stat */}
            <div className="glass-panel absolute -right-4 -bottom-4 rounded-2xl border border-white/60 px-4 py-3 shadow-xl animate-float-slow">
              <p className="font-heading text-lg font-bold text-foreground">{TOPICS.length}+</p>
              <p className="text-xs text-foreground-muted">Topics covered</p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* MARQUEE */}
      <Marquee items={MARQUEE_ITEMS} />

      <section className="section pt-0 border-t border-border">
        <div className="container-page">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {pageItems.map((post, i) => (
              <Reveal key={`${post.source}-${post.id}`} delay={(i % 4) * 0.06}>
                <BlogCard post={post} onClick={() => setActive(post)} />
              </Reveal>
            ))}
          </div>

          <Pagination page={page} totalPages={totalPages} onChange={setPage} />
        </div>
      </section>

      {/* TOPIC DIRECTORY */}
      <section className="section border-t border-border">
        <div className="container-page">
          <Reveal className="mx-auto max-w-2xl text-center">
            <span className="badge-pill">Browse by Topic</span>
            <h2 className="mt-6 font-heading text-3xl font-bold text-foreground sm:text-4xl">
              Find What You&apos;re Looking For
            </h2>
          </Reveal>

          <div className="mt-12 flex flex-wrap justify-center gap-3">
            {TOPICS.map((topic, i) => {
              const Icon = TOPIC_ICONS[i % TOPIC_ICONS.length];
              return (
                <Reveal
                  key={topic}
                  delay={i * 0.05}
                  className="flex items-center gap-2.5 rounded-full border border-border bg-white px-5 py-3 text-sm font-medium text-foreground shadow-sm transition-colors hover:border-primary/30 hover:text-primary"
                >
                  <Icon size={15} className="text-primary" /> {topic}
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* SEO CONTENT */}
      <SEOContent
        eyebrow="Why Read Our Blog"
        title="Software Engineering Insights That Help You Build Better"
        intro="We write about the same problems we solve for clients — practical, no-fluff perspective on building and scaling software."
        blocks={[
          {
            heading: "Topics That Matter to Builders",
            text: "Our articles cover web application development, mobile app development, cloud infrastructure, UI/UX design, and AI integration — the same disciplines our engineering team works in every day, not recycled industry news.",
          },
          {
            heading: "Written by Practicing Engineers",
            text: "Every post is grounded in real project experience, not generic advice. When we write about database indexing, CI/CD pipelines, or design systems, it's because we've implemented them for actual products.",
          },
          {
            heading: "Stay Current With Software Trends",
            text: "Technology moves fast. Our blog tracks meaningful shifts in frameworks, cloud platforms, and AI tooling — helping founders and engineering leaders make informed decisions instead of chasing hype.",
          },
          {
            heading: "A Resource for Technical Decision-Makers",
            text: "Whether you're evaluating a software development partner, planning an architecture, or scoping a new product, our blog is built to help you ask better questions and make better technical decisions.",
          },
        ]}
      />

      {/* STAY UPDATED */}
      <section className="section border-t border-border bg-background-subtle">
        <div className="container-page">
          <Reveal className="mx-auto flex max-w-3xl flex-col items-center justify-between gap-6 rounded-3xl border border-border bg-white p-8 text-center shadow-sm sm:flex-row sm:p-10 sm:text-left">
            <div>
              <h3 className="font-heading text-xl font-bold text-foreground">Never Miss a New Article</h3>
              <p className="mt-2 text-sm leading-relaxed text-foreground-muted">
                Get in touch and we&apos;ll personally notify you whenever we publish something new on engineering,
                product, or design.
              </p>
            </div>
            <Link href="/contact" data-cursor-hover="true" className="btn-primary shrink-0">
              Get Notified <FiArrowRight />
            </Link>
          </Reveal>
        </div>
      </section>

      {/* CLOSING CTA */}
      <section className="section pt-0 pb-24 text-center">
        <div className="container-page">
          <Reveal>
            <h2 className="font-heading text-2xl font-bold text-foreground sm:text-3xl">
              Ready to Put These Ideas Into Practice?
            </h2>
            <p className="mx-auto mt-3 max-w-md text-foreground-muted">Let&apos;s talk about what you&apos;re building.</p>
            <Link href="/contact" data-cursor-hover="true" className="btn-primary mt-7">
              Start a Project <FiArrowRight />
            </Link>
          </Reveal>
        </div>
      </section>

      <BlogLightbox post={active} onClose={() => setActive(null)} />
    </>
  );
}
