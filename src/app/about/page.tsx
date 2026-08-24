import type { Metadata } from "next";
import Link from "next/link";
import {
  FiArrowRight,
  FiCompass,
  FiGlobe,
  FiHeart,
  FiMessageSquare,
  FiTarget,
  FiUserCheck,
  FiUsers,
} from "react-icons/fi";

import FeatureGrid from "@/components/FeatureGrid";
import Marquee from "@/components/Marquee";
import Reveal from "@/components/Reveal";
import SEOContent from "@/components/SEOContent";

const MARQUEE_ITEMS = ["Craftsmanship", "Transparency", "Ownership", "Continuous Learning", "Trust", "Accountability"];

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Learn about Techish Innovation — a software engineering company committed to craftsmanship, transparency, and building reliable digital products.",
};

const VALUES = [
  {
    icon: FiTarget,
    title: "Craftsmanship",
    desc: "We treat every line of code and every pixel as a reflection of our standards — built to last, not just to ship.",
  },
  {
    icon: FiUsers,
    title: "Transparency",
    desc: "Clear communication, honest timelines, and no surprises. You always know where your project stands.",
  },
  {
    icon: FiHeart,
    title: "Ownership",
    desc: "We treat your product like our own, taking full accountability from first commit to production launch.",
  },
  {
    icon: FiCompass,
    title: "Continuous Learning",
    desc: "Technology moves fast. We invest constantly in new tools and practices to keep our clients ahead.",
  },
];

const CULTURE = [
  { icon: FiUserCheck, title: "Small, senior teams", desc: "You work directly with experienced engineers and designers — never a rotating cast of juniors." },
  { icon: FiMessageSquare, title: "Weekly demos", desc: "Regular check-ins and shared boards mean you always see real, working progress." },
  { icon: FiGlobe, title: "Timezone-friendly", desc: "Async-first collaboration and flexible overlap hours designed around your team." },
  { icon: FiHeart, title: "Genuine investment", desc: "We measure success by your outcomes, not just hours logged." },
];

const MILESTONES = [
  {
    stage: "Year One",
    title: "Foundation",
    desc: "Started with a small team and one commitment: do client work differently — senior-only, fully transparent.",
  },
  {
    stage: "Early Growth",
    title: "First Long-Term Partners",
    desc: "Built lasting relationships with early clients who trusted us with mission-critical products.",
  },
  {
    stage: "Scaling Up",
    title: "Expanded Capabilities",
    desc: "Grew from engineering alone into full-cycle delivery — design, cloud, and AI now included in-house.",
  },
  {
    stage: "Today",
    title: "A Trusted Partner",
    desc: "A senior, multidisciplinary team helping ambitious companies ship software that lasts.",
  },
];

const PHILOSOPHIES = [
  {
    quote: "Good software is invisible — it just works. That's the bar we hold ourselves to on every project.",
    role: "Engineering Lead",
  },
  {
    quote: "Design isn't decoration. It's how complexity becomes usable, and that shapes every decision we make.",
    role: "Design Lead",
  },
  {
    quote: "Transparency isn't a policy here, it's a habit. Clients should never have to wonder what's happening.",
    role: "Delivery Lead",
  },
];

const COMMITMENT_BADGES = [
  "NDA-Ready From Day One",
  "Timezone-Flexible Collaboration",
  "Post-Launch Support Included",
  "Transparent, No-Surprise Pricing",
];

export default function AboutPage() {
  return (
    <>
      {/* HERO: split layout with video */}
      <section className="relative overflow-hidden section pt-16 md:pt-24">
        <div className="pointer-events-none absolute inset-0 mesh-gradient" />
        <div className="pointer-events-none absolute -top-28 -left-20 h-72 w-72 rounded-full bg-primary/15 blur-3xl animate-float-slow" />
        <div className="pointer-events-none absolute bottom-0 right-0 h-64 w-64 rounded-full bg-secondary/15 blur-3xl animate-float-slower" />
        <div className="container-page relative grid items-center gap-12 lg:grid-cols-2">
          <Reveal>
            <span className="badge-pill">About Techish Innovation</span>
            <h1 className="mt-6 font-heading text-4xl font-bold leading-tight text-foreground sm:text-5xl">
              A Software Partner That Builds <span className="gradient-text">Like It&apos;s Their Own Product</span>
            </h1>
            <p className="mt-6 text-base leading-relaxed text-foreground-muted sm:text-lg">
              Techish Innovation is a full-stack software engineering company
              that designs, builds, and scales digital products for startups
              and enterprises. We combine strategy, design, and engineering to
              turn ambitious ideas into reliable, production-grade software —
              helping businesses move faster through thoughtful technology.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link href="/our-work" data-cursor-hover="true" className="btn-primary">
                See Our Work <FiArrowRight />
              </Link>
              <Link href="/contact" data-cursor-hover="true" className="btn-outline">
                Get in Touch
              </Link>
            </div>
          </Reveal>

          <Reveal delay={0.15} className="relative">
            <div className="absolute -inset-4 rounded-[2rem] bg-gradient-to-br from-primary/20 via-secondary/15 to-accent/10 blur-xl" />
            <div className="relative overflow-hidden rounded-3xl border border-border shadow-2xl">
              <video
                src="/videos/2.mp4"
                autoPlay
                muted
                loop
                playsInline
                className="h-[420px] w-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
              <span className="absolute left-4 bottom-4 inline-flex items-center gap-2 rounded-full bg-white/90 px-3 py-1.5 text-xs font-semibold text-foreground shadow-sm backdrop-blur-sm">
                Life at Techish Innovation
              </span>
            </div>
            <div className="absolute -left-8 -bottom-8 w-32 rotate-[-5deg] overflow-hidden rounded-xl border-4 border-white shadow-xl animate-float-slower">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/images/6.jpg" alt="Our team at work" className="h-24 w-full object-cover" />
            </div>
          </Reveal>
        </div>
      </section>

      {/* MARQUEE */}
      <Marquee items={MARQUEE_ITEMS} />

      {/* MISSION / VISION */}
      <section className="section border-t border-border bg-background-subtle">
        <div className="container-page grid gap-8 md:grid-cols-2">
          <Reveal className="surface-card p-8">
            <h2 className="font-heading text-2xl font-bold text-foreground">Our Mission</h2>
            <p className="mt-4 leading-relaxed text-foreground-muted">
              To help businesses move faster through thoughtful technology —
              delivering software that is reliable, maintainable, and built
              around real user needs, not just feature lists.
            </p>
          </Reveal>
          <Reveal delay={0.1} className="surface-card p-8">
            <h2 className="font-heading text-2xl font-bold text-foreground">Our Vision</h2>
            <p className="mt-4 leading-relaxed text-foreground-muted">
              To be the engineering partner companies trust for
              mission-critical software — known for craftsmanship,
              transparency, and long-term reliability.
            </p>
          </Reveal>
        </div>
      </section>

      {/* JOURNEY / MILESTONES */}
      <section className="section border-t border-border">
        <div className="container-page">
          <Reveal className="mx-auto max-w-2xl text-center">
            <span className="badge-pill">Our Journey</span>
            <h2 className="mt-6 font-heading text-3xl font-bold text-foreground sm:text-4xl">How We Got Here</h2>
            <p className="mt-4 text-foreground-muted">
              A small team with a simple goal: build software worth being proud of.
            </p>
          </Reveal>

          <div className="relative mx-auto mt-16 max-w-5xl">
            <div className="pointer-events-none absolute left-0 right-0 top-3 hidden h-px bg-border sm:block" />
            <div className="grid gap-10 sm:grid-cols-4">
              {MILESTONES.map((m, i) => (
                <Reveal key={m.stage} delay={i * 0.1} className="relative flex flex-col items-center text-center">
                  <span className="relative z-10 mb-4 flex h-6 w-6 items-center justify-center rounded-full bg-gradient-to-br from-primary to-secondary shadow-md shadow-primary/30">
                    <span className="h-2 w-2 rounded-full bg-white" />
                  </span>
                  <p className="text-xs font-bold uppercase tracking-wider text-primary/70">{m.stage}</p>
                  <h3 className="mt-2 font-heading text-base font-semibold text-foreground">{m.title}</h3>
                  <p className="mt-1.5 text-center text-sm leading-relaxed text-foreground-muted">{m.desc}</p>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* VALUES */}
      <section className="section">
        <div className="container-page">
          <Reveal className="mx-auto max-w-2xl text-center">
            <h2 className="font-heading text-3xl font-bold text-foreground sm:text-4xl">
              What Drives Us
            </h2>
            <p className="mt-4 text-foreground-muted">
              The principles that shape how we work with every client and every project.
            </p>
          </Reveal>

          <div className="mt-12">
            <FeatureGrid items={VALUES} variant="spotlight" />
          </div>
        </div>
      </section>

      {/* CULTURE / HOW WE WORK */}
      <section className="relative overflow-hidden section border-t border-border bg-background-subtle">
        <div className="container-page grid items-center gap-14 lg:grid-cols-2">
          <Reveal className="order-2 lg:order-1">
            <span className="badge-pill">Day to Day</span>
            <h2 className="mt-6 font-heading text-3xl font-bold text-foreground sm:text-4xl">
              How We Actually <span className="gradient-text">Work Together</span>
            </h2>
            <p className="mt-4 text-foreground-muted">
              No black boxes. You get a small, senior team, a shared roadmap,
              and visibility into progress every step of the way.
            </p>
            <div className="mt-8 grid gap-6 sm:grid-cols-2">
              {CULTURE.map((c) => (
                <div key={c.title} className="flex gap-3.5">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                    <c.icon size={17} />
                  </span>
                  <div>
                    <h3 className="font-heading text-sm font-semibold text-foreground">{c.title}</h3>
                    <p className="mt-1 text-sm leading-relaxed text-foreground-muted">{c.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </Reveal>

          <Reveal delay={0.1} className="relative order-1 lg:order-2">
            <div className="grid grid-cols-2 gap-4">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/images/9.jpg" alt="Team working session" className="h-52 w-full rounded-2xl object-cover shadow-lg" />
              <div className="mt-8 flex h-52 flex-col justify-between rounded-2xl bg-gradient-to-br from-foreground to-foreground/85 p-6 text-white shadow-lg">
                <FiMessageSquare className="text-white/40" size={26} />
                <p className="font-heading text-sm font-medium leading-relaxed">
                  &ldquo;We treat every client&apos;s product like it&apos;s our own — that&apos;s non-negotiable.&rdquo;
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* PHILOSOPHY QUOTE WALL */}
      <section className="section">
        <div className="container-page">
          <Reveal className="mx-auto max-w-2xl text-center">
            <span className="badge-pill">In Our Own Words</span>
            <h2 className="mt-6 font-heading text-3xl font-bold text-foreground sm:text-4xl">
              What Guides How We Work
            </h2>
          </Reveal>

          <div className="mt-12 grid gap-6 sm:grid-cols-3">
            {PHILOSOPHIES.map((p, i) => (
              <Reveal key={p.role} delay={i * 0.1} className="surface-card h-full p-7">
                <span className="font-heading text-4xl font-bold leading-none text-primary/15">&ldquo;</span>
                <p className="-mt-1 text-sm leading-relaxed text-foreground">{p.quote}</p>
                <p className="mt-4 text-xs font-semibold uppercase tracking-wide text-foreground-muted">{p.role}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* SEO CONTENT */}
      <SEOContent
        tone="plain"
        eyebrow="Software Development Company"
        title="The Software Development Partner Growing Businesses Choose"
        intro="Techish Innovation combines strategic thinking with hands-on engineering to help companies ship reliable software faster."
        blocks={[
          {
            heading: "Custom Software Development, Done Right",
            text: "We don't force your business into a generic template. Every engagement starts with understanding your workflow, users, and constraints, so the software we build — whether a custom web application, a mobile app, or an internal platform — fits the way your business actually operates.",
          },
          {
            heading: "Agile, Transparent Delivery",
            text: "Our software development process is built around short sprints, shared project boards, and regular demos. You always know what's shipping next and can course-correct early, instead of waiting until launch to see the result.",
          },
          {
            heading: "Full-Stack Engineering Expertise",
            text: "From frontend interfaces to backend APIs, databases, and cloud infrastructure, our engineers work across the entire stack. That means fewer handoffs, fewer integration surprises, and a single accountable team for your whole product.",
          },
          {
            heading: "A Team Invested in Your Success",
            text: "We measure success by the outcomes our software creates for your business, not just hours billed. That's why our relationships with clients extend well past launch day into ongoing support, iteration, and growth.",
          },
        ]}
      />

      {/* COMMITMENTS STRIP */}
      <section className="border-t border-border py-10">
        <div className="container-page flex flex-wrap items-center justify-center gap-3">
          {COMMITMENT_BADGES.map((b) => (
            <span key={b} className="badge-pill">
              {b}
            </span>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="section">
        <div className="container-page">
          <Reveal className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-primary via-primary to-secondary px-8 py-16 text-center sm:px-16">
            <div className="grain-overlay" />
            <div className="pointer-events-none absolute -top-16 -left-16 h-56 w-56 rounded-full bg-white/10 blur-3xl" />
            <div className="pointer-events-none absolute -bottom-16 -right-16 h-56 w-56 rounded-full bg-white/10 blur-3xl" />
            <h2 className="relative font-heading text-3xl font-bold text-white sm:text-4xl">
              Let&apos;s Build Something Worth Talking About
            </h2>
            <p className="relative mx-auto mt-4 max-w-xl text-white/85">
              Whether you have a detailed spec or just a strong idea, we&apos;d love to hear about it.
            </p>
            <Link
              href="/contact"
              data-cursor-hover="true"
              className="relative mt-8 inline-flex items-center gap-2 rounded-full bg-white px-7 py-3 text-sm font-semibold text-primary shadow-xl transition-transform hover:scale-105"
            >
              Start the Conversation <FiArrowRight />
            </Link>
          </Reveal>
        </div>
      </section>
    </>
  );
}
