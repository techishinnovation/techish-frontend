"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import {
  FiArrowRight,
  FiAward,
  FiBriefcase,
  FiCheckCircle,
  FiClipboard,
  FiClock,
  FiCoffee,
  FiCompass,
  FiGlobe,
  FiHeart,
  FiMessageSquare,
  FiTrendingUp,
  FiUserCheck,
  FiUsers,
} from "react-icons/fi";

import EmptyState from "@/components/EmptyState";
import FeatureGrid from "@/components/FeatureGrid";
import JobCard from "@/components/JobCard";
import JobLightbox from "@/components/JobLightbox";
import Marquee from "@/components/Marquee";
import ProcessSteps from "@/components/ProcessSteps";
import Reveal from "@/components/Reveal";
import SEOContent from "@/components/SEOContent";
import { api } from "@/lib/api";
import type { JobOpening, PaginatedResponse } from "@/lib/types";

const MARQUEE_ITEMS = ["Remote-First", "Flexible Hours", "Real Ownership", "Senior Team", "Growth-Focused"];

const BENEFITS = [
  { icon: FiGlobe, title: "Remote-First Flexibility", desc: "Work from wherever you're most productive, with async-friendly collaboration." },
  { icon: FiTrendingUp, title: "Real Growth Opportunities", desc: "Take on meaningful projects and grow your skills faster than a typical agency role." },
  { icon: FiCheckCircle, title: "Genuine Ownership", desc: "You'll own features and decisions, not just tickets — your input shapes the product." },
  { icon: FiAward, title: "Competitive Compensation", desc: "Fair, transparent pay that reflects your experience and the value you bring." },
];

const HIRING_STEPS = [
  { icon: FiClipboard, title: "Apply", desc: "Send your application to the role's contact email with a short note about yourself." },
  { icon: FiCoffee, title: "Intro Call", desc: "A relaxed conversation to learn about you and share more about the role and team." },
  { icon: FiMessageSquare, title: "Technical Conversation", desc: "A practical discussion or exercise relevant to the actual work — no trick questions." },
  { icon: FiCheckCircle, title: "Offer & Onboarding", desc: "A clear offer and a structured onboarding so you're set up to contribute quickly." },
];

const TRAITS = [
  { title: "Curiosity", desc: "You ask why, not just how, and you're always looking to learn the next thing." },
  { title: "Ownership mindset", desc: "You treat problems as yours to solve, not tickets to close." },
  { title: "Clear communicator", desc: "You can explain a tricky tradeoff to both an engineer and a client." },
  { title: "Craft-focused", desc: "You care about the details other people don't notice — but feel." },
];

const CANDIDATE_FAQS = [
  {
    q: "Do you accept remote applicants from anywhere?",
    a: "Yes — we're a remote-first team and welcome applicants from any location that allows for reasonable timezone overlap with the team.",
  },
  {
    q: "What if there's no open role that matches my skills?",
    a: "Reach out anyway. We keep a shortlist of promising candidates in mind for when a matching role opens up.",
  },
  {
    q: "How long does the hiring process usually take?",
    a: "Most candidates go from application to offer within two to three weeks, depending on scheduling.",
  },
];

export default function CareersPageClient() {
  const [jobs, setJobs] = useState<JobOpening[]>([]);
  const [loading, setLoading] = useState(true);
  const [active, setActive] = useState<JobOpening | null>(null);

  useEffect(() => {
    api
      .get<PaginatedResponse<JobOpening>>("/careers/openings/?page_size=48")
      .then((res) => setJobs(res.data.results))
      .catch(() => setJobs([]))
      .finally(() => setLoading(false));
  }, []);

  return (
    <>
      {/* HERO */}
      <section className="relative overflow-hidden section pt-16 md:pt-24">
        <div className="pointer-events-none absolute inset-0 mesh-gradient" />
        <div className="container-page relative grid items-center gap-12 lg:grid-cols-2">
          <Reveal>
            <span className="badge-pill">Careers</span>
            <h1 className="mt-6 font-heading text-4xl font-bold leading-tight text-foreground sm:text-5xl">
              Build Your Best Work <span className="gradient-text">With Us</span>
            </h1>
            <p className="mt-6 max-w-lg text-base leading-relaxed text-foreground-muted sm:text-lg">
              We're a small, senior team that cares about craftsmanship and
              ownership. If you want your work to actually matter, we'd love
              to hear from you.
            </p>
            <Link href="#openings" data-cursor-hover="true" className="btn-primary mt-8">
              View Open Positions <FiArrowRight />
            </Link>
          </Reveal>

          <Reveal delay={0.15} className="relative">
            <div className="pointer-events-none absolute -inset-4 animate-pulse-glow rounded-[2rem] bg-gradient-to-br from-primary/15 via-secondary/10 to-accent/10 blur-xl" />
            <div className="relative grid h-[340px] grid-cols-2 grid-rows-2 gap-4 sm:h-[420px]">
              <div className="relative row-span-2 overflow-hidden rounded-2xl border-4 border-white shadow-xl">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/images/1.jpg" alt="The Techish Innovation team" className="h-full w-full object-cover" />
              </div>
              <div className="overflow-hidden rounded-2xl border-4 border-white shadow-lg">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/images/2.jpg" alt="A team member focused at work" className="h-full w-full object-cover" />
              </div>
              <div className="relative overflow-hidden rounded-2xl border-4 border-white shadow-lg">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/images/10.jpg" alt="Team discussing a project" className="h-full w-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-transparent" />
                <span className="absolute left-3 bottom-3 inline-flex items-center gap-1.5 rounded-full bg-white/90 px-2.5 py-1 text-[11px] font-semibold text-foreground shadow-sm">
                  <FiHeart className="text-primary" size={11} /> Meet the team
                </span>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* MARQUEE */}
      <Marquee items={MARQUEE_ITEMS} />

      {/* OPEN POSITIONS */}
      <section id="openings" className="section pt-0 border-t border-border scroll-mt-20">
        <div className="container-page">
          <Reveal className="mx-auto max-w-2xl text-center">
            <span className="badge-pill">Open Positions</span>
            <h2 className="mt-6 font-heading text-3xl font-bold text-foreground sm:text-4xl">
              Current Opportunities
            </h2>
          </Reveal>

          <div className="mt-12">
            {loading ? (
              <div className="grid gap-6 sm:grid-cols-2">
                {Array.from({ length: 4 }).map((_, i) => (
                  <div key={i} className="h-56 animate-pulse rounded-2xl bg-background-subtle" />
                ))}
              </div>
            ) : jobs.length === 0 ? (
              <EmptyState
                icon={FiBriefcase}
                title="No Open Positions Right Now"
                description="We don't have any open roles at the moment, but we're always interested in meeting talented people. Reach out and we'll keep you in mind for future opportunities."
                ctaLabel="Get in Touch"
                ctaHref="/contact"
              />
            ) : (
              <div className="grid gap-6 sm:grid-cols-2">
                {jobs.map((job, i) => (
                  <Reveal key={job.id} delay={(i % 2) * 0.08}>
                    <JobCard job={job} onClick={() => setActive(job)} />
                  </Reveal>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* WHAT WE LOOK FOR */}
      <section className="section border-t border-border">
        <div className="container-page">
          <Reveal className="mx-auto max-w-2xl text-center">
            <span className="badge-pill">Who Thrives Here</span>
            <h2 className="mt-6 font-heading text-3xl font-bold text-foreground sm:text-4xl">What We Look For</h2>
            <p className="mt-4 text-foreground-muted">
              Skills can be taught. These traits are what actually make someone a fit.
            </p>
          </Reveal>

          <div className="mx-auto mt-12 max-w-2xl space-y-5">
            {TRAITS.map((t, i) => (
              <Reveal key={t.title} delay={i * 0.06} className="flex items-start gap-3">
                <FiCheckCircle className="mt-1 shrink-0 text-primary" size={18} />
                <p className="text-base leading-relaxed text-foreground">
                  <span className="font-heading font-semibold text-foreground">{t.title}.</span>{" "}
                  <span className="text-foreground-muted">{t.desc}</span>
                </p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 1: WHY WORK HERE */}
      <SEOContent
        eyebrow="Why Techish Innovation"
        title="Why Engineers and Designers Choose to Work Here"
        intro="We built the kind of company we'd want to work at ourselves — small enough to matter, ambitious enough to challenge you."
        blocks={[
          {
            heading: "Meaningful, Real-World Work",
            text: "You won't be buried in busywork. Every role contributes directly to products real clients depend on, so your work has visible, immediate impact.",
          },
          {
            heading: "Ownership From Day One",
            text: "We trust people with real responsibility early. You'll own features, decisions, and outcomes — not just tickets assigned by someone else.",
          },
          {
            heading: "A Culture of Craftsmanship",
            text: "You'll work alongside people who care about doing things well — clean code, thoughtful design, and honest communication are the norm, not the exception.",
          },
          {
            heading: "Room to Grow",
            text: "Exposure to varied projects and industries, mentorship from senior team members, and support for continued learning help you grow faster than a typical role.",
          },
        ]}
      />

      {/* SECTION 2: WHAT WE OFFER */}
      <section className="section border-t border-border bg-background-subtle">
        <div className="container-page">
          <Reveal className="mx-auto max-w-2xl text-center">
            <span className="badge-pill">What We Offer</span>
            <h2 className="mt-6 font-heading text-3xl font-bold text-foreground sm:text-4xl">
              Benefits That Actually Matter
            </h2>
          </Reveal>

          <div className="mt-12">
            <FeatureGrid items={BENEFITS} variant="overlap" />
          </div>
        </div>
      </section>

      {/* SECTION 3: HIRING PROCESS */}
      <ProcessSteps
        eyebrow="Our Hiring Process"
        title="A Straightforward Path to Joining the Team"
        subtitle="No lengthy panel interviews or take-home tests that eat your weekend — just honest conversations."
        steps={HIRING_STEPS}
        variant="numbered"
      />

      {/* CANDIDATE FAQ */}
      <section className="section border-t border-border">
        <div className="container-page">
          <Reveal className="mx-auto max-w-2xl text-center">
            <span className="badge-pill">Candidate FAQ</span>
            <h2 className="mt-6 font-heading text-3xl font-bold text-foreground sm:text-4xl">
              Questions Candidates Often Ask
            </h2>
          </Reveal>

          <div className="mx-auto mt-12 max-w-2xl space-y-8">
            {CANDIDATE_FAQS.map((f, i) => (
              <Reveal key={f.q} delay={i * 0.08}>
                <h3 className="font-heading text-base font-semibold text-foreground">{f.q}</h3>
                <p className="mt-2 text-sm leading-relaxed text-foreground-muted">{f.a}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 4: LIFE AT TECHISH */}
      <section className="relative overflow-hidden section border-t border-border bg-background-subtle">
        <div className="container-page grid items-center gap-14 lg:grid-cols-2">
          <Reveal className="order-2 lg:order-1">
            <span className="badge-pill">
              <FiHeart size={12} /> Life at Techish
            </span>
            <h2 className="mt-6 font-heading text-3xl font-bold text-foreground sm:text-4xl">
              A Team That Cares How the Work Gets Done
            </h2>
            <p className="mt-4 text-foreground-muted">
              We're intentionally small so every voice matters. Here's what that looks like day to day.
            </p>
            <div className="mt-8 grid gap-6 sm:grid-cols-2">
              <div className="flex gap-3.5">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                  <FiUserCheck size={17} />
                </span>
                <div>
                  <h3 className="font-heading text-sm font-semibold text-foreground">Flat, Open Culture</h3>
                  <p className="mt-1 text-sm leading-relaxed text-foreground-muted">Direct access to leadership — no layers between you and decisions.</p>
                </div>
              </div>
              <div className="flex gap-3.5">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                  <FiClock size={17} />
                </span>
                <div>
                  <h3 className="font-heading text-sm font-semibold text-foreground">Flexible Hours</h3>
                  <p className="mt-1 text-sm leading-relaxed text-foreground-muted">We care about outcomes, not seat time or rigid schedules.</p>
                </div>
              </div>
              <div className="flex gap-3.5">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                  <FiUsers size={17} />
                </span>
                <div>
                  <h3 className="font-heading text-sm font-semibold text-foreground">Collaborative by Default</h3>
                  <p className="mt-1 text-sm leading-relaxed text-foreground-muted">Weekly syncs and shared boards keep everyone aligned and unblocked.</p>
                </div>
              </div>
              <div className="flex gap-3.5">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                  <FiCompass size={17} />
                </span>
                <div>
                  <h3 className="font-heading text-sm font-semibold text-foreground">Room to Explore</h3>
                  <p className="mt-1 text-sm leading-relaxed text-foreground-muted">Variety of projects means you're never stuck doing the same thing for years.</p>
                </div>
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.1} className="relative order-1 lg:order-2">
            <div className="relative flex min-h-[300px] flex-wrap items-center justify-center gap-3 overflow-hidden rounded-3xl border border-border bg-white p-10 shadow-sm sm:min-h-[360px]">
              <div className="pointer-events-none absolute inset-0 mesh-gradient" />
              {[
                "Craftsmanship",
                "Ownership",
                "Curiosity",
                "Trust",
                "Momentum",
                "Honesty",
                "Growth",
                "Balance",
              ].map((tag, i) => (
                <span
                  key={tag}
                  className={`badge-pill relative ${i % 3 === 0 ? "px-5 py-2.5 text-sm" : ""}`}
                  style={{ transform: `rotate(${(i % 2 === 0 ? -1 : 1) * (2 + (i % 4))}deg)` }}
                >
                  {tag}
                </span>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* EQUAL OPPORTUNITY */}
      <section className="section pt-0">
        <div className="container-page">
          <Reveal className="mx-auto max-w-3xl rounded-2xl border border-border bg-white p-8 text-center sm:p-10">
            <FiUsers className="mx-auto text-primary" size={24} />
            <h3 className="mt-4 font-heading text-lg font-semibold text-foreground">
              Our Commitment to Equal Opportunity
            </h3>
            <p className="mt-3 text-sm leading-relaxed text-foreground-muted">
              Techish Innovation is committed to building a team as diverse as the businesses we serve. We evaluate
              every candidate on skill, judgment, and character — regardless of background — and welcome applicants
              from all walks of life.
            </p>
          </Reveal>
        </div>
      </section>

      {/* CTA */}
      <section className="section pt-0">
        <div className="container-page">
          <Reveal className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-primary via-primary to-secondary px-8 py-16 text-center sm:px-16">
            <div className="grain-overlay" />
            <div className="pointer-events-none absolute -top-16 -left-16 h-56 w-56 rounded-full bg-white/10 blur-3xl" />
            <div className="pointer-events-none absolute -bottom-16 -right-16 h-56 w-56 rounded-full bg-white/10 blur-3xl" />
            <h2 className="relative font-heading text-3xl font-bold text-white sm:text-4xl">
              Don&apos;t See the Right Role?
            </h2>
            <p className="relative mx-auto mt-4 max-w-xl text-white/85">
              We're always open to meeting talented people. Reach out and tell us how you'd like to contribute.
            </p>
            <Link
              href="/contact"
              data-cursor-hover="true"
              className="relative mt-8 inline-flex items-center gap-2 rounded-full bg-white px-7 py-3 text-sm font-semibold text-primary shadow-xl transition-transform hover:scale-105"
            >
              Get in Touch <FiArrowRight />
            </Link>
          </Reveal>
        </div>
      </section>

      <JobLightbox job={active} onClose={() => setActive(null)} />
    </>
  );
}
