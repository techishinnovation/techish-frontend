import type { Metadata } from "next";
import Link from "next/link";
import {
  FiArrowRight,
  FiCheck,
  FiCloud,
  FiCode,
  FiCpu,
  FiEye,
  FiLayers,
  FiLock,
  FiPenTool,
  FiPlay,
  FiRepeat,
  FiSearch,
  FiShield,
  FiSmartphone,
  FiX,
} from "react-icons/fi";

import FeatureGrid from "@/components/FeatureGrid";
import Marquee from "@/components/Marquee";
import ProcessSteps from "@/components/ProcessSteps";
import Reveal from "@/components/Reveal";
import SEOContent from "@/components/SEOContent";
import { services } from "@/data/services";

const MARQUEE_ITEMS = [
  "Web Development",
  "Mobile Apps",
  "Custom Software",
  "UI/UX Design",
  "Cloud & DevOps",
  "AI & Data",
];

export const metadata: Metadata = {
  title: "Our Craft",
  description:
    "Explore Techish Innovation's core services — web development, mobile app development, custom software, UI/UX design, cloud & DevOps, and AI solutions.",
};

const ICONS = [FiCode, FiSmartphone, FiLayers, FiPenTool, FiCloud, FiCpu];

const DELIVERY_STEPS = [
  { icon: FiSearch, title: "Scope & Estimate", desc: "We break your idea into a concrete plan with clear milestones and realistic timelines." },
  { icon: FiPenTool, title: "Design Sprint", desc: "Rapid prototyping validates the experience before a single line of production code is written." },
  { icon: FiCode, title: "Build in Sprints", desc: "Short, transparent sprints with working demos — never a black box until the deadline." },
  { icon: FiShield, title: "Test, Ship & Support", desc: "Rigorous QA, a confident launch, and ongoing support as your product evolves." },
];

const CAPABILITY_LEVELS = [
  { label: "Frontend Engineering", value: 95 },
  { label: "Backend & API Design", value: 96 },
  { label: "Cloud & Infrastructure", value: 90 },
  { label: "Product & UI/UX Design", value: 88 },
  { label: "AI & Data Integration", value: 85 },
];

const COMMON_MISTAKES = [
  "Rushing straight to code without a clear plan",
  "One engineer owning critical decisions alone",
  "Security treated as a launch-day checklist",
  "Silence between milestones, surprises at the end",
];

const OUR_APPROACH = [
  "A scoped plan with clear milestones before a line of code",
  "Every change reviewed by a second senior engineer",
  "Secure-by-default architecture from day one",
  "Weekly visibility into real, working progress",
];

const QUALITY_STANDARDS = [
  { icon: FiEye, title: "Code Review, Always", desc: "Every change is reviewed by a second engineer before it ships — no exceptions." },
  { icon: FiShield, title: "Automated Testing", desc: "Unit, integration, and end-to-end tests catch regressions before your users ever do." },
  { icon: FiLock, title: "Security-First Architecture", desc: "We design with secure defaults from day one, not bolt security on after launch." },
  { icon: FiRepeat, title: "Continuous Improvement", desc: "Post-launch monitoring and iteration keep performance and reliability high over time." },
];

export default function OurCraftPage() {
  return (
    <>
      {/* HERO: tile grid + mesh gradient + media strip */}
      <section className="relative overflow-hidden section pt-16 md:pt-24">
        <div className="pointer-events-none absolute inset-0 mesh-gradient" />
        <div className="pointer-events-none absolute inset-0 grid grid-cols-3 gap-4 p-8 opacity-[0.05] sm:grid-cols-6">
          {Array.from({ length: 24 }).map((_, i) => (
            <div key={i} className="aspect-square rounded-2xl bg-primary" />
          ))}
        </div>

        <Reveal className="container-page relative text-center">
          <span className="badge-pill">Our Craft</span>
          <h1 className="mx-auto mt-6 max-w-3xl font-heading text-4xl font-bold leading-tight text-foreground sm:text-5xl">
            Engineering, Design, and Strategy — <span className="gradient-text">Under One Roof</span>
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-foreground-muted sm:text-lg">
            From the first line of code to production infrastructure, our
            multidisciplinary team delivers software that performs, scales,
            and looks the part.
          </p>
        </Reveal>

        <Reveal delay={0.15} className="container-page relative mt-14">
          <div className="relative mx-auto max-w-4xl">
            <div className="grid h-[300px] grid-cols-4 grid-rows-2 gap-4 sm:h-[420px]">
              <div className="relative col-span-2 row-span-2 overflow-hidden rounded-2xl shadow-xl">
                <video src="/videos/3.mp4" autoPlay muted loop playsInline className="h-full w-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-transparent" />
                <span className="absolute left-4 bottom-4 inline-flex items-center gap-2 rounded-full bg-white/90 px-3 py-1.5 text-xs font-semibold text-foreground shadow-sm backdrop-blur-sm">
                  <FiPlay className="text-primary" size={12} /> Inside our process
                </span>
              </div>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/images/4.jpg" alt="Design workshop" className="col-span-1 h-full w-full rounded-2xl object-cover shadow-lg transition-transform duration-500 hover:scale-105" />
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/images/12.jpg" alt="Engineering review" className="col-span-1 h-full w-full rounded-2xl object-cover shadow-lg transition-transform duration-500 hover:scale-105" />
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/images/14.jpg" alt="Cross-functional collaboration" className="col-span-2 h-full w-full rounded-2xl object-cover shadow-lg transition-transform duration-500 hover:scale-105" />
            </div>

            {/* Floating service icon badges */}
            <span className="glass-panel absolute -left-5 top-10 hidden h-14 w-14 items-center justify-center rounded-2xl border border-white/60 text-primary shadow-xl animate-float-slow sm:flex">
              <FiCode size={22} />
            </span>
            <span className="glass-panel absolute -right-5 bottom-16 hidden h-14 w-14 items-center justify-center rounded-2xl border border-white/60 text-secondary shadow-xl animate-float-slower sm:flex">
              <FiCloud size={22} />
            </span>
          </div>
        </Reveal>
      </section>

      {/* MARQUEE */}
      <Marquee items={MARQUEE_ITEMS} />

      {/* SERVICES DETAIL */}
      <section className="section border-t border-border">
        <div className="container-page">
          <Reveal className="mx-auto max-w-2xl text-center">
            <span className="badge-pill">What We Offer</span>
            <h2 className="mt-6 font-heading text-3xl font-bold text-foreground sm:text-4xl">
              Six Disciplines, One Team
            </h2>
            <p className="mt-4 text-foreground-muted">
              Every engagement draws on the same core capabilities — mixed and matched to fit your project.
            </p>
          </Reveal>

          <div className="mt-12 grid gap-6 sm:grid-cols-2">
            {services.map((s, i) => {
              const Icon = ICONS[i];
              return (
                <Reveal key={s.title} delay={(i % 2) * 0.08}>
                  <div className="surface-card relative flex h-full flex-col overflow-hidden p-8">
                    <span className="pointer-events-none absolute -right-2 -top-6 font-heading text-7xl font-bold text-primary/5">
                      {String(i + 1).padStart(2, "0")}
                    </span>

                    <div className="relative flex items-center gap-4">
                      <span className="inline-flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-primary to-secondary text-white shadow-lg shadow-primary/30">
                        <Icon size={24} />
                      </span>
                      <h3 className="font-heading text-xl font-bold text-foreground">{s.title}</h3>
                    </div>

                    <p className="relative mt-4 text-sm leading-relaxed text-foreground-muted">{s.description}</p>

                    <div className="relative mt-6 flex flex-wrap gap-2 border-t border-border pt-5">
                      {s.points.map((p) => (
                        <span
                          key={p}
                          className="inline-flex items-center gap-1.5 rounded-full bg-background-subtle px-3 py-1.5 text-xs font-medium text-foreground-muted"
                        >
                          <FiCheck className="text-primary" size={11} />
                          {p}
                        </span>
                      ))}
                    </div>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* CAPABILITY LEVELS */}
      <section className="section border-t border-border">
        <div className="container-page grid gap-14 lg:grid-cols-2 lg:items-center">
          <Reveal>
            <span className="badge-pill">Where We're Strongest</span>
            <h2 className="mt-6 font-heading text-3xl font-bold text-foreground sm:text-4xl">
              Depth Across the Full Stack
            </h2>
            <p className="mt-4 text-foreground-muted">
              We don&apos;t specialize in a single layer of the stack. Our team carries deep, hands-on capability
              across every discipline a modern product needs.
            </p>
          </Reveal>
          <Reveal delay={0.1} className="space-y-5">
            {CAPABILITY_LEVELS.map((c) => (
              <div key={c.label}>
                <div className="flex items-center justify-between text-sm">
                  <span className="font-medium text-foreground">{c.label}</span>
                  <span className="text-foreground-muted">{c.value}%</span>
                </div>
                <div className="mt-2 h-2 w-full overflow-hidden rounded-full bg-background-subtle">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-primary to-secondary"
                    style={{ width: `${c.value}%` }}
                  />
                </div>
              </div>
            ))}
          </Reveal>
        </div>
      </section>

      {/* DELIVERY PROCESS */}
      <ProcessSteps
        eyebrow="Delivery Process"
        title="How Every Engagement Runs"
        subtitle="A consistent, transparent framework that keeps every project on time and on scope."
        steps={DELIVERY_STEPS}
        variant="stairs"
      />

      {/* QUALITY STANDARDS */}
      <section className="section border-t border-border bg-background-subtle">
        <div className="container-page">
          <Reveal className="mx-auto max-w-2xl text-center">
            <span className="badge-pill">
              <FiRepeat size={12} /> How We Build
            </span>
            <h2 className="mt-6 font-heading text-3xl font-bold text-foreground sm:text-4xl">
              Quality Standards We Never Skip
            </h2>
            <p className="mt-4 text-foreground-muted">
              The tools change project to project. These standards don&apos;t.
            </p>
          </Reveal>

          <div className="mt-12">
            <FeatureGrid items={QUALITY_STANDARDS} variant="badges" />
          </div>
        </div>
      </section>

      {/* COMMON PITFALLS VS OUR APPROACH */}
      <section className="section">
        <div className="container-page">
          <Reveal className="mx-auto max-w-2xl text-center">
            <span className="badge-pill">Why It Matters</span>
            <h2 className="mt-6 font-heading text-3xl font-bold text-foreground sm:text-4xl">
              What Sets Our Approach Apart
            </h2>
          </Reveal>

          <div className="mx-auto mt-12 grid max-w-4xl overflow-hidden rounded-2xl border border-border sm:grid-cols-2">
            <Reveal className="bg-white p-8">
              <h3 className="font-heading text-sm font-semibold uppercase tracking-wide text-foreground-muted">
                Common Pitfalls We Avoid
              </h3>
              <ul className="mt-5 space-y-3">
                {COMMON_MISTAKES.map((m) => (
                  <li key={m} className="flex items-start gap-2.5 text-sm text-foreground-muted">
                    <FiX className="mt-0.5 shrink-0 text-red-400" size={14} /> {m}
                  </li>
                ))}
              </ul>
            </Reveal>
            <Reveal delay={0.1} className="border-t border-border bg-white p-8 sm:border-l sm:border-t-0">
              <h3 className="font-heading text-sm font-semibold uppercase tracking-wide text-primary">
                Our Standard Approach
              </h3>
              <ul className="mt-5 space-y-3">
                {OUR_APPROACH.map((a) => (
                  <li key={a} className="flex items-start gap-2.5 text-sm text-foreground-muted">
                    <FiCheck className="mt-0.5 shrink-0 text-primary" size={14} /> {a}
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
        </div>
      </section>

      {/* SEO CONTENT */}
      <SEOContent
        tone="plain"
        eyebrow="How We Deliver"
        title="Why Businesses Choose Techish Innovation for Software Development"
        intro="Our craft goes beyond writing code — it's a disciplined approach to building software that performs in production, not just in a demo."
        blocks={[
          {
            heading: "End-to-End Service Delivery",
            text: "From product strategy and UI/UX design through frontend development, backend engineering, and cloud deployment, we cover the full software development lifecycle under one roof — reducing handoffs and keeping quality consistent from start to finish.",
          },
          {
            heading: "Flexible Engagement Models",
            text: "Whether you need a fixed-scope project, a dedicated development team, or staff augmentation to extend your in-house engineers, we structure our engagement model around how you actually want to work with a software development partner.",
          },
          {
            heading: "Quality Assurance Built In",
            text: "Every feature we ship goes through code review, automated testing, and QA before release. Security and performance aren't an afterthought — they're part of how we architect software from day one.",
          },
          {
            heading: "A Stack Chosen for Your Goals",
            text: "We're deliberately technology-agnostic. Our engineers work comfortably across the modern development landscape, so every technology decision is made to fit your product's specific requirements — not to match what we already know.",
          },
        ]}
      />

      {/* MANIFESTO */}
      <section className="section pt-0">
        <div className="container-page">
          <Reveal className="mx-auto max-w-3xl text-center">
            <h2 className="font-heading text-2xl font-bold leading-snug text-foreground sm:text-3xl">
              We don&apos;t chase trends. We choose <span className="gradient-text">the right tool for the job</span>,
              every single time — because your product has to outlive whatever&apos;s fashionable this year.
            </h2>
          </Reveal>
        </div>
      </section>

      {/* CTA */}
      <section className="section pt-0 mt-14">
        <div className="container-page">
          <Reveal className="relative overflow-hidden rounded-3xl border border-border bg-background-subtle px-8 py-14 text-center sm:px-16">
            <div className="pointer-events-none absolute inset-0 mesh-gradient" />
            <div className="relative">
              <h2 className="font-heading text-2xl font-bold text-foreground sm:text-3xl">
                Not sure which service fits your project?
              </h2>
              <p className="mx-auto mt-3 max-w-lg text-foreground-muted">
                Tell us what you&apos;re building — we&apos;ll help you scope the right approach.
              </p>
              <Link href="/contact" data-cursor-hover="true" className="btn-primary mt-7">
                Talk to Our Team <FiArrowRight />
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
