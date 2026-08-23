"use client";

import { useEffect, useState } from "react";
import { FiBriefcase, FiCode, FiHeadphones, FiFileText, FiPlay, FiShield } from "react-icons/fi";

import EmptyState from "@/components/EmptyState";
import FeatureRows from "@/components/FeatureRows";
import Marquee from "@/components/Marquee";
import Pagination from "@/components/Pagination";
import Reveal from "@/components/Reveal";
import SEOContent from "@/components/SEOContent";
import WorkCard from "@/components/WorkCard";
import WorkLightbox from "@/components/WorkLightbox";
import { api } from "@/lib/api";
import type { PaginatedResponse, WorkItem } from "@/lib/types";

const SHOWCASE_IMAGES = ["/images/5.jpg", "/images/7.jpg"];
const CATEGORIES = ["Web Applications", "Mobile Apps", "Internal Tools", "Cloud Platforms", "AI Integrations"];

const DELIVERABLES = [
  { icon: FiCode, title: "Full Source Code Ownership", desc: "You own 100% of the codebase we build — no licensing strings attached." },
  { icon: FiFileText, title: "Documentation & Handoff", desc: "Clear technical documentation so your team (or ours) can maintain it long-term." },
  { icon: FiShield, title: "QA & Security Review", desc: "Every project is tested and reviewed before launch, not just demoed and shipped." },
  { icon: FiHeadphones, title: "30-Day Post-Launch Support", desc: "We stay engaged after go-live to catch edge cases and support a smooth rollout." },
];

const MARQUEE_ITEMS = [
  "Full Source Code Ownership",
  "QA & Security Reviewed",
  "30-Day Post-Launch Support",
  "Documentation Included",
  "On-Time Delivery",
];

const OUTCOME_STATS = [
  { value: "95%", label: "Projects delivered on schedule" },
  { value: "<1%", label: "Post-launch critical defect rate" },
  { value: "100%", label: "Projects still in active use today" },
  { value: "30 Days", label: "Dedicated post-launch support window" },
];

export default function OurWorkPageClient() {
  const [items, setItems] = useState<WorkItem[]>([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const [active, setActive] = useState<WorkItem | null>(null);

  useEffect(() => {
    setLoading(true);
    api
      .get<PaginatedResponse<WorkItem>>(`/work/items/?page=${page}`)
      .then((res) => {
        setItems(res.data.results);
        setTotalPages(Math.max(1, Math.ceil(res.data.count / 12)));
      })
      .catch(() => {
        setItems([]);
        setTotalPages(1);
      })
      .finally(() => setLoading(false));
  }, [page]);

  return (
    <>
      {/* HERO: portfolio strip with video + photos */}
      <section className="relative overflow-hidden section pt-16 md:pt-24">
        <div className="pointer-events-none absolute inset-0 mesh-gradient" />
        <div className="pointer-events-none absolute -top-24 right-0 h-72 w-72 rounded-full bg-secondary/15 blur-3xl animate-float-slow" />
        <div className="pointer-events-none absolute bottom-0 -left-16 h-64 w-64 rounded-full bg-primary/15 blur-3xl animate-float-slower" />
        <div className="container-page relative grid items-center gap-10 lg:grid-cols-2">
          <Reveal>
            <span className="badge-pill">Our Work</span>
            <h1 className="mt-6 font-heading text-4xl font-bold leading-tight text-foreground sm:text-5xl">
              Products We&apos;ve <span className="gradient-text">Designed &amp; Shipped</span>
            </h1>
            <p className="mt-6 max-w-lg text-base leading-relaxed text-foreground-muted sm:text-lg">
              A selection of projects where we partnered with founders and
              product teams to build software that performs.
            </p>
            <div className="mt-8 flex flex-wrap gap-2">
              {CATEGORIES.map((c) => (
                <span key={c} className="rounded-full border border-border bg-white px-3.5 py-1.5 text-xs font-medium text-foreground-muted">
                  {c}
                </span>
              ))}
            </div>
          </Reveal>

          <Reveal delay={0.15} className="grid grid-cols-2 gap-3">
            <div className="relative col-span-2 overflow-hidden rounded-2xl border-4 border-white shadow-xl">
              <video src="/videos/4.mp4" autoPlay muted loop playsInline className="h-40 w-full object-cover sm:h-48" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
              <span className="absolute left-3 bottom-3 inline-flex items-center gap-1.5 rounded-full bg-white/90 px-2.5 py-1 text-xs font-semibold text-foreground shadow-sm">
                <FiPlay className="text-primary" size={11} /> Project demo
              </span>
            </div>
            {SHOWCASE_IMAGES.map((src) => (
              // eslint-disable-next-line @next/next/no-img-element
              <img key={src} src={src} alt="" className="h-28 w-full rounded-2xl border-4 border-white object-cover shadow-lg transition-transform duration-500 hover:-translate-y-1.5 hover:shadow-xl sm:h-32" />
            ))}
          </Reveal>
        </div>
      </section>

      {/* MARQUEE */}
      <Marquee items={MARQUEE_ITEMS} />

      <section className="section pt-0 border-t border-border">
        <div className="container-page">
          {loading ? (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {Array.from({ length: 8 }).map((_, i) => (
                <div key={i} className="h-80 animate-pulse rounded-2xl bg-background-subtle" />
              ))}
            </div>
          ) : items.length === 0 ? (
            <EmptyState
              icon={FiBriefcase}
              title="Portfolio Coming Soon"
              description="Our project gallery is currently being curated and will be added shortly. In the meantime, reach out directly and our team will walk you through recent web, mobile, and cloud engagements."
              ctaLabel="Talk to Our Team"
              ctaHref="/contact"
            />
          ) : (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {items.map((item, i) => (
                <Reveal key={item.id} delay={(i % 4) * 0.06}>
                  <WorkCard item={item} onClick={() => setActive(item)} />
                </Reveal>
              ))}
            </div>
          )}

          <Pagination page={page} totalPages={totalPages} onChange={setPage} />
        </div>
      </section>

      {/* OUTCOME STATS */}
      <section className="section border-t border-border">
        <div className="container-page">
          <Reveal className="mx-auto max-w-2xl text-center">
            <span className="badge-pill">Track Record</span>
            <h2 className="mt-6 font-heading text-3xl font-bold text-foreground sm:text-4xl">
              Outcomes We Hold Ourselves To
            </h2>
            <p className="mt-4 text-foreground-muted">
              Numbers we track internally on every engagement — not vanity metrics.
            </p>
          </Reveal>

          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {OUTCOME_STATS.map((s, i) => (
              <Reveal key={s.label} delay={i * 0.08} className="rounded-2xl border border-border bg-white p-6 text-center">
                <p className="font-heading text-3xl font-bold">
                  <span className="gradient-text">{s.value}</span>
                </p>
                <p className="mt-2 text-sm leading-relaxed text-foreground-muted">{s.label}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* WHAT'S INCLUDED */}
      <section className="section border-t border-border bg-background-subtle">
        <div className="container-page">
          <Reveal className="mx-auto max-w-2xl text-center">
            <span className="badge-pill">What's Included</span>
            <h2 className="mt-6 font-heading text-3xl font-bold text-foreground sm:text-4xl">
              Every Project Ships With More Than Code
            </h2>
            <p className="mt-4 text-foreground-muted">
              These aren't add-ons — they're part of how we deliver every engagement, regardless of size.
            </p>
          </Reveal>

          <div className="mt-12">
            <FeatureRows items={DELIVERABLES} variant="checklist" />
          </div>
        </div>
      </section>

      {/* ENGAGEMENT NARRATIVE */}
      <section className="section">
        <div className="container-page">
          <div className="mx-auto max-w-3xl">
            <Reveal className="text-center">
              <span className="badge-pill">Behind the Portfolio</span>
              <h2 className="mt-6 font-heading text-3xl font-bold text-foreground sm:text-4xl">
                From Brief to Launch: A Typical Engagement
              </h2>
            </Reveal>
            <Reveal delay={0.1} className="mt-8 rounded-3xl border border-border bg-white p-8 sm:p-10">
              <p className="text-base leading-relaxed text-foreground-muted">
                Most projects in our portfolio follow the same rhythm: a focused discovery phase to nail down
                scope, a design sprint to validate the experience, and short weekly build cycles with visible
                progress the whole way through. Clients see working software early — often within the first two
                weeks — instead of waiting until launch day to find out if it matches what they had in mind.
              </p>
              <div className="mt-8 grid grid-cols-3 gap-4 border-t border-border pt-6 text-center">
                <div>
                  <p className="font-heading text-xl font-bold text-foreground">2 Weeks</p>
                  <p className="mt-1 text-xs text-foreground-muted">To first working build</p>
                </div>
                <div>
                  <p className="font-heading text-xl font-bold text-foreground">Weekly</p>
                  <p className="mt-1 text-xs text-foreground-muted">Progress demos</p>
                </div>
                <div>
                  <p className="font-heading text-xl font-bold text-foreground">Zero</p>
                  <p className="mt-1 text-xs text-foreground-muted">Surprise scope changes</p>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* SEO CONTENT */}
      <SEOContent
        tone="plain"
        eyebrow="Our Portfolio"
        title="A Software Development Portfolio Built Across Web, Mobile & Cloud"
        intro="Every project in our portfolio reflects the same standard: thoughtful engineering, clean design, and software built to last."
        blocks={[
          {
            heading: "Real Products, Real Outcomes",
            text: "Our portfolio spans custom web applications, mobile apps, internal tools, and cloud platforms built for startups and growing businesses. Each project was scoped, designed, and engineered around a specific business goal — not built as a generic template.",
          },
          {
            heading: "End-to-End Case Studies",
            text: "From the first discovery call to production deployment, our case studies show the full software development lifecycle: product strategy, UI/UX design, full-stack engineering, QA, and post-launch support.",
          },
          {
            heading: "Built to Last, Not Just to Launch",
            text: "Every project in our portfolio is engineered with modern, production-grade practices — clean architecture, thorough testing, and cloud infrastructure designed to scale as usage grows. The specific technology is chosen for each product's requirements, not the other way around.",
          },
          {
            heading: "From Startups to Scaling Teams",
            text: "Whether it's a founder validating a first MVP or an established team modernizing legacy software, our portfolio reflects engagements at every stage of the product lifecycle — always with the same commitment to quality.",
          },
        ]}
      />

      {/* GUARANTEE */}
      <section className="section pt-0">
        <div className="container-page">
          <Reveal className="mx-auto flex max-w-4xl flex-col items-center gap-6 rounded-3xl border border-border bg-white p-8 text-center shadow-sm sm:flex-row sm:p-10 sm:text-left">
            <span className="inline-flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-primary to-secondary text-white shadow-lg shadow-primary/30">
              <FiShield size={26} />
            </span>
            <div>
              <h3 className="font-heading text-xl font-bold text-foreground">No Scope-Creep Surprises, Guaranteed</h3>
              <p className="mt-2 text-sm leading-relaxed text-foreground-muted">
                Every fixed-scope engagement comes with a locked proposal before work begins. If something falls
                outside that scope, you&apos;ll know before it&apos;s built — never on an invoice after the fact.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      <WorkLightbox item={active} onClose={() => setActive(null)} />
    </>
  );
}
