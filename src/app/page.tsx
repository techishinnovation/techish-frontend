import Link from "next/link";
import {
  FiArrowRight,
  FiCheck,
  FiCheckCircle,
  FiClock,
  FiCode,
  FiCloud,
  FiCreditCard,
  FiEye,
  FiHeart,
  FiLayers,
  FiLock,
  FiPlay,
  FiSearch,
  FiShoppingCart,
  FiSmartphone,
  FiCpu,
  FiPenTool,
  FiTrendingUp,
  FiUsers,
} from "react-icons/fi";

import FaqItem from "@/components/FaqItem";
import FeatureGrid from "@/components/FeatureGrid";
import FeatureRows from "@/components/FeatureRows";
import HeroMedia from "@/components/HeroMedia";
import Marquee from "@/components/Marquee";
import ProcessSteps from "@/components/ProcessSteps";
import Reveal from "@/components/Reveal";
import ReviewsCarousel from "@/components/ReviewsCarousel";
import SEOContent from "@/components/SEOContent";
import { services } from "@/data/services";

const MARQUEE_ITEMS = [
  "Scalable Architecture",
  "Secure by Design",
  "Cloud-Native",
  "API-First",
  "Cross-Platform",
  "Senior Engineering",
  "Transparent Delivery",
];

const SERVICE_ICONS = [FiCpu, FiCode, FiLayers, FiSmartphone, FiPenTool, FiCloud];

const HIGHLIGHTS = [
  "Full-cycle product development",
  "Cross-functional engineering expertise",
  "Agile, transparent delivery process",
  "Dedicated post-launch support",
];

const STATS = [
  { value: "6", label: "Core service areas" },
  { value: "100%", label: "Client-focused delivery" },
  { value: "24h", label: "Average response time" },
];

const PROCESS_STEPS = [
  { icon: FiSearch, title: "Discover", desc: "We dig into your goals, users, and constraints to define a clear, achievable scope." },
  { icon: FiPenTool, title: "Design", desc: "Wireframes and prototypes translate strategy into an intuitive, tested user experience." },
  { icon: FiCode, title: "Build", desc: "Agile sprints turn designs into secure, scalable, well-tested production software." },
  { icon: FiTrendingUp, title: "Launch & Grow", desc: "We deploy with confidence and stay on for monitoring, iteration, and long-term growth." },
];

const DIFFERENTIATORS = [
  { icon: FiUsers, title: "Experienced Engineering Leadership", desc: "Your project is guided by engineers who understand production systems, architecture and real-world delivery." },
  { icon: FiEye, title: "Full transparency", desc: "Shared boards, weekly demos, and honest timelines — always know where things stand." },
  { icon: FiLock, title: "Security-first delivery", desc: "Secure-by-default architecture and code review baked into every engagement." },
  { icon: FiClock, title: "Fast, iterative cycles", desc: "Agile sprints ship working software early and often, not just at the finish line." },
];

const INDUSTRIES = [
  { icon: FiTrendingUp, title: "SaaS & Startups", desc: "MVPs and product platforms built to validate fast and scale without a rewrite." },
  { icon: FiShoppingCart, title: "E-Commerce", desc: "Custom storefronts, checkout flows, and backend systems built for conversion." },
  { icon: FiCreditCard, title: "FinTech", desc: "Secure, compliant platforms for payments, lending, and financial data." },
  { icon: FiHeart, title: "HealthTech", desc: "Reliable, privacy-conscious software for health and wellness products." },
  { icon: FiUsers, title: "Enterprise & Ops", desc: "Internal tools and automation that streamline complex business workflows." },
  { icon: FiCloud, title: "Cloud & Infrastructure", desc: "Migration, DevOps, and platform engineering for teams scaling their stack." },
];

const IMPACT_STATS = [
  { value: "10+", label: "Combined engineering experience" },
  { value: "Production", label: "Real-world systems experience" },
  { value: "AI + Automation", label: "Hands-on engineering expertise" },
  { value: "Enterprise", label: "Technology experience" },
];

const ENGAGEMENT_MODELS = [
  {
    tag: "Best for defined scope",
    title: "Fixed-Scope Projects",
    desc: "A clear brief, a fixed timeline, and a fixed price. Ideal when requirements are well understood and the goal is a defined deliverable.",
    points: ["Detailed proposal before kickoff", "Milestone-based delivery", "Predictable, fixed budget"],
  },
  {
    tag: "Best for evolving products",
    title: "Dedicated Team",
    desc: "An embedded team that scales with your roadmap — ideal for products that keep evolving well beyond a single release.",
    points: ["Flexible, ongoing capacity", "Direct access to your engineers", "Scales up or down with your needs"],
  },
];

const HOME_FAQS = [
  {
    q: "What makes Techish Innovation different from other software agencies?",
    a: "We stay small and senior by design — you work directly with the engineers building your product, not a rotating account-management layer, and every engagement includes full transparency into progress.",
  },
  {
    q: "Do you sign NDAs before discussing a project?",
    a: "Yes. We're happy to sign an NDA before any detailed discussion — your idea and business details stay confidential from the first conversation.",
  },
  {
    q: "Can you work alongside our existing in-house team?",
    a: "Absolutely. We regularly embed with in-house teams, either owning a specific feature area or augmenting engineering capacity during crunch periods.",
  },
  {
    q: "Do you offer fixed-price or time-and-materials engagements?",
    a: "Both. Well-defined projects work well as fixed-scope engagements, while evolving products are often better served by a dedicated team on a time-and-materials basis. We'll recommend what fits your project.",
  },
];

export default function HomePage() {
  return (
    <>
      {/* HERO */}
      <section className="relative overflow-hidden">
        <div className="pointer-events-none absolute inset-0 mesh-gradient" />
        <div className="pointer-events-none absolute -top-32 -right-32 h-96 w-96 rounded-full bg-primary/15 blur-3xl animate-float-slow" />
        <div className="pointer-events-none absolute top-52 -left-24 h-72 w-72 rounded-full bg-secondary/15 blur-3xl animate-float-slower" />
        <div className="pointer-events-none absolute bottom-0 right-10 h-64 w-64 rounded-full bg-accent/10 blur-3xl animate-float-slow" />

        <div className="container-page relative section pt-20 md:pt-28">
          <div className="grid items-center gap-14 lg:grid-cols-2">
            <Reveal y={16}>
              <span className="badge-pill">
                <span className="h-1.5 w-1.5 rounded-full bg-secondary animate-pulse-glow" /> Software Engineering
                Partner
              </span>
              <h1 className="mt-6 font-heading text-4xl font-bold leading-tight tracking-tight text-foreground sm:text-5xl lg:text-[3.4rem]">
                We Build Software That Solves <span className="gradient-text">Real Business Problems</span>.
              </h1>
              <p className="mt-6 max-w-xl text-base leading-relaxed text-foreground-muted sm:text-lg">
                Techish Innovation is a software engineering company founded by
                experienced engineers who have worked on real-world platforms,
                automation systems, AI solutions and enterprise technology. We now
                help businesses turn ideas, workflows and challenges into reliable
                software.
              </p>
              <div className="mt-8 flex flex-wrap gap-4">
                <Link href="/our-work" data-cursor-hover="true" className="btn-primary">
                  View Our Work <FiArrowRight />
                </Link>
                <Link href="/contact" data-cursor-hover="true" className="btn-outline">
                  Start a Project
                </Link>
              </div>
              <ul className="mt-10 grid grid-cols-1 gap-3 sm:grid-cols-2">
                {HIGHLIGHTS.map((h) => (
                  <li key={h} className="flex items-center gap-2.5 text-sm text-foreground-muted">
                    <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-gradient-to-br from-primary to-secondary" />
                    {h}
                  </li>
                ))}
              </ul>

              <div className="mt-10 flex flex-wrap gap-x-10 gap-y-4 border-t border-border pt-8">
                {STATS.map((s) => (
                  <div key={s.label}>
                    <p className="font-heading text-2xl font-bold text-foreground sm:text-3xl">
                      <span className="gradient-text">{s.value}</span>
                    </p>
                    <p className="mt-1 text-xs text-foreground-muted">{s.label}</p>
                  </div>
                ))}
              </div>
            </Reveal>

            {/* Mobile / tablet: compact media card */}
            <Reveal delay={0.15} className="relative lg:hidden">
              <div className="pointer-events-none absolute -inset-4 rounded-[2rem] bg-gradient-to-br from-primary/20 via-secondary/15 to-accent/10 blur-xl" />
              <div className="relative overflow-hidden rounded-3xl border border-border shadow-2xl">
                <video
                  src="/videos/1.mp4"
                  autoPlay
                  muted
                  loop
                  playsInline
                  className="h-64 w-full object-cover sm:h-80"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
                <span className="absolute left-4 bottom-4 inline-flex items-center gap-2 rounded-full bg-white/90 px-3 py-1.5 text-xs font-semibold text-foreground shadow-sm backdrop-blur-sm">
                  <FiPlay className="text-primary" size={12} /> Product walkthrough
                </span>
              </div>
              <div className="absolute -right-3 -bottom-6 w-28 rotate-[6deg] overflow-hidden rounded-xl border-4 border-white shadow-xl animate-float-slower sm:w-32">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/images/3.jpg" alt="Techish Innovation project preview" className="h-24 w-full object-cover" />
              </div>
            </Reveal>

            {/* Desktop: layered browser-frame media */}
            <div className="relative hidden lg:block">
              <HeroMedia
                videoSrc="/videos/1.mp4"
                photoSrc="/images/3.jpg"
                caption="Product walkthrough"
                statValue="6"
                statLabel="Core service areas"
              />
            </div>
          </div>
        </div>
      </section>

      {/* MARQUEE */}
      <Marquee items={MARQUEE_ITEMS} />

      {/* PROCESS */}
      <ProcessSteps
        eyebrow="How We Work"
        title="A Process Built for Predictable Outcomes"
        subtitle="A clear, collaborative path from first conversation to a product in production."
        steps={PROCESS_STEPS}
      />

      {/* SERVICES */}
      <section className="section border-t border-border bg-background-subtle">
        <div className="container-page">
          <Reveal className="mx-auto max-w-2xl text-center">
            <h2 className="font-heading text-3xl font-bold text-foreground sm:text-4xl">
              What We Build
            </h2>
            <p className="mt-4 text-foreground-muted">
              From product strategy to production, we build reliable software for
              real-world business needs.
            </p>
          </Reveal>

          <div className="mt-12">
            <FeatureGrid
              items={services.map((s, i) => ({ icon: SERVICE_ICONS[i], title: s.title, desc: s.description }))}
              ctaLabel="Explore Our Craft"
              ctaHref="/our-craft"
            />
          </div>
        </div>
      </section>

      {/* WHY CHOOSE US */}
      <section className="section">
        <div className="container-page grid items-center gap-14 lg:grid-cols-2">
          <Reveal className="relative">
            <div className="grid grid-cols-2 gap-4">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/images/8.jpg" alt="Techish engineers collaborating" className="h-56 w-full rounded-2xl object-cover shadow-lg sm:h-64" />
              <div className="mt-8 space-y-4">
                <div className="relative flex h-32 flex-col items-center justify-center overflow-hidden rounded-2xl bg-gradient-to-br from-primary via-primary to-secondary text-center text-white shadow-lg">
                  <div className="grain-overlay" />
                  <p className="relative font-heading text-2xl font-bold">6+</p>
                  <p className="relative mt-1 px-3 text-[11px] text-white/85">Disciplines under one roof</p>
                </div>
                <div className="glass-panel rounded-2xl border border-white/60 p-4 shadow-lg">
                  <FiCheckCircle className="text-primary" size={20} />
                  <p className="mt-2 text-sm font-semibold text-foreground">100% Client-Focused Delivery</p>
                </div>
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <span className="badge-pill">Why Techish</span>
            <h2 className="mt-6 font-heading text-3xl font-bold text-foreground sm:text-4xl">
              Engineering Experience. <span className="gradient-text">Directly Applied.</span>
            </h2>
            <p className="mt-4 text-foreground-muted">
              Techish is founded by engineers with experience building real-world
              software across AI, automation, enterprise systems and business
              platforms.
            </p>

            <div className="mt-8 space-y-6">
              {DIFFERENTIATORS.map((d) => (
                <div key={d.title} className="flex gap-4">
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                    <d.icon size={18} />
                  </span>
                  <div>
                    <h3 className="font-heading text-base font-semibold text-foreground">{d.title}</h3>
                    <p className="mt-1 text-sm leading-relaxed text-foreground-muted">{d.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* INDUSTRIES WE SERVE */}
      <section className="section border-t border-border bg-background-subtle">
        <div className="container-page">
          <Reveal className="mx-auto max-w-2xl text-center">
            <span className="badge-pill">Industries We Serve</span>
            <h2 className="mt-6 font-heading text-3xl font-bold text-foreground sm:text-4xl">
              Software Built for Your Industry
            </h2>
            <p className="mt-4 text-foreground-muted">
              Every industry has different constraints. We bring the right context, not just generic code.
            </p>
          </Reveal>

          <div className="mt-12">
            <FeatureRows items={INDUSTRIES} />
          </div>
        </div>
      </section>

      {/* IMPACT STATS BAND */}
      <section className="border-t border-border bg-foreground py-14 text-white sm:py-16">
        <div className="container-page grid grid-cols-2 gap-8 sm:grid-cols-4">
          {IMPACT_STATS.map((s, i) => (
            <Reveal key={s.label} delay={i * 0.08} className="text-center sm:text-left">
              <p className="font-heading text-3xl font-bold sm:text-4xl">
                <span className="gradient-text">{s.value}</span>
              </p>
              <p className="mt-2 text-xs leading-relaxed text-white/60 sm:text-sm">{s.label}</p>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ENGAGEMENT MODELS */}
      <section className="section border-t border-border">
        <div className="container-page">
          <Reveal className="mx-auto max-w-2xl text-center">
            <span className="badge-pill">How You Can Work With Us</span>
            <h2 className="mt-6 font-heading text-3xl font-bold text-foreground sm:text-4xl">
              Choose the Engagement That Fits
            </h2>
            <p className="mt-4 text-foreground-muted">
              Every project is different. We shape the engagement model around your goals, not the other way around.
            </p>
          </Reveal>

          <div className="mx-auto mt-12 grid max-w-4xl gap-6 sm:grid-cols-2">
            {ENGAGEMENT_MODELS.map((m, i) => {
              const dark = i === 1;
              return (
                <Reveal
                  key={m.title}
                  delay={i * 0.1}
                  className={`surface-card p-8 ${
                    dark ? "bg-gradient-to-br from-primary via-primary to-secondary text-white" : ""
                  }`}
                >
                  <span
                    className={
                      dark
                        ? "inline-flex rounded-full bg-white/15 px-4 py-1.5 text-xs font-semibold backdrop-blur-sm"
                        : "badge-pill"
                    }
                  >
                    {m.tag}
                  </span>
                  <h3 className={`mt-5 font-heading text-xl font-bold ${dark ? "text-white" : "text-foreground"}`}>
                    {m.title}
                  </h3>
                  <p className={`mt-3 text-sm leading-relaxed ${dark ? "text-white/85" : "text-foreground-muted"}`}>
                    {m.desc}
                  </p>
                  <ul className="mt-6 space-y-2.5">
                    {m.points.map((p) => (
                      <li
                        key={p}
                        className={`flex items-center gap-2.5 text-sm ${dark ? "text-white/85" : "text-foreground-muted"}`}
                      >
                        <FiCheck className={dark ? "text-white" : "text-primary"} size={14} /> {p}
                      </li>
                    ))}
                  </ul>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* SEO CONTENT */}
      <SEOContent
        tone="plain"
        eyebrow="Why Techish Innovation"
        title="A Custom Software Development Company Built for Long-Term Partnership"
        intro="From early-stage MVPs to enterprise-grade platforms, we help businesses across industries plan, build, and scale software that lasts."
        blocks={[
          {
            heading: "Full-Cycle Software Development Services",
            text: "Techish Innovation delivers end-to-end software development services — from product strategy and UI/UX design through web application development, mobile app development, backend engineering, and cloud infrastructure. Whether you need a customer-facing web platform, a native mobile app, or an internal automation tool, our engineering team handles the full lifecycle so you don't have to coordinate multiple vendors.",
          },
          {
            heading: "Dedicated, Senior Development Teams",
            text: "Every engagement is staffed with senior software engineers and designers, not a rotating bench of juniors. Whether you need a dedicated development team to own a product roadmap or additional engineering capacity to accelerate an existing team, we structure our staffing model around your goals and timeline.",
          },
          {
            heading: "Industries We Support",
            text: "Our team has experience building software for SaaS platforms, e-commerce businesses, fintech products, healthcare-adjacent tools, and internal enterprise systems. We bring the same rigor to every engagement: secure architecture, scalable infrastructure, and software that's built to be maintained, not just shipped.",
          },
          {
            heading: "Technology-Agnostic, Outcome-Focused",
            text: "We select the right technology for your specific goals based on performance, security, and long-term maintainability — never brand familiarity or what's trending. Our engineers work comfortably across the full modern development landscape, so the stack is chosen to fit your product, not the other way around.",
          },
        ]}
      />

      {/* TEAM QUOTE */}
      <section className="section border-t border-border bg-background-subtle">
        <div className="container-page">
          <Reveal className="mx-auto max-w-3xl text-center">
            <span className="font-heading text-6xl leading-none text-primary/15">&ldquo;</span>
            <p className="-mt-4 font-heading text-2xl font-semibold leading-snug text-foreground sm:text-3xl">
              We started Techish Innovation because we were tired of watching good ideas get lost in bad execution.
              Every project we take on gets the same thing: senior attention, honest communication, and code we&apos;d
              be proud to maintain ourselves.
            </p>
            <p className="mt-6 text-sm font-semibold text-foreground-muted">— The Techish Innovation Team</p>
          </Reveal>
        </div>
      </section>

      {/* CLIENT REVIEWS */}
      <ReviewsCarousel />

      {/* FAQ */}
      <section className="section border-t border-border bg-background-subtle">
        <div className="container-page max-w-3xl">
          <Reveal className="text-center">
            <span className="badge-pill">FAQ</span>
            <h2 className="mt-6 font-heading text-3xl font-bold text-foreground sm:text-4xl">
              Questions We Hear Often
            </h2>
          </Reveal>

          <div className="mt-10 space-y-4">
            {HOME_FAQS.map((f, i) => (
              <Reveal key={f.q} delay={i * 0.06}>
                <FaqItem q={f.q} a={f.a} />
              </Reveal>
            ))}
          </div>
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
              Ready to Build Something Great?
            </h2>
            <p className="relative mx-auto mt-4 max-w-xl text-white/85">
              Tell us about your project and let&apos;s explore how Techish
              Innovation can help you ship it faster and better.
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
    </>
  );
}
