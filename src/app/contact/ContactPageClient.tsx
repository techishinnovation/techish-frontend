"use client";

import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { useState } from "react";
import useSWR from "swr";
import {
  FiArrowRight,
  FiBookOpen,
  FiBriefcase,
  FiCheckCircle,
  FiClipboard,
  FiCoffee,
  FiCreditCard,
  FiFolder,
  FiLock,
  FiMail,
  FiMapPin,
  FiPhone,
  FiPlay,
  FiUsers,
  FiZap,
  FiSend,
} from "react-icons/fi";

import FeatureRows from "@/components/FeatureRows";
import Marquee from "@/components/Marquee";
import ProcessSteps from "@/components/ProcessSteps";
import Reveal from "@/components/Reveal";
import SEOContent from "@/components/SEOContent";
import SocialIcons from "@/components/SocialIcons";
import { api } from "@/lib/api";
import type { SiteSettingsPublic } from "@/lib/types";

const fetcher = (url: string) => api.get(url).then((res) => res.data as SiteSettingsPublic);

const MARQUEE_ITEMS = ["Fast Response", "NDA-Ready", "Direct Access", "No Sales Queue", "Transparent Pricing"];

const CONTACT_FALLBACK = "Not available right now — please use the message form below and we'll get back to you.";

const NEXT_STEPS = [
  { icon: FiClipboard, title: "Share Your Vision", desc: "Tell us what you're building through the form or a quick call — no lengthy questionnaires, no gatekeeping." },
  { icon: FiCheckCircle, title: "We Scope It Together", desc: "A real engineer reviews your idea and comes back with honest feedback and a rough plan within a day." },
  { icon: FiZap, title: "We Get to Work", desc: "Once scope and timeline are locked in, development starts — you'll see real progress within the week." },
];

const COMMITMENTS = [
  { icon: FiLock, title: "Confidential by Default", desc: "Happy to sign an NDA before any detailed discussion — your idea stays protected from day one." },
  { icon: FiUsers, title: "Direct Access to Engineers", desc: "No account-manager relay. You talk directly with the people who'll build your software." },
  { icon: FiZap, title: "Replies Within 24 Hours", desc: "Every message gets a real response from our team within one business day." },
  { icon: FiCreditCard, title: "Flexible Engagement Models", desc: "Fixed-scope or dedicated team — we structure pricing around how you want to work." },
];

const CONNECT_CHANNELS = [
  { icon: FiMail, label: "Email", detail: "Best for detailed briefs, documents, and anything worth keeping in writing." },
  { icon: FiPhone, label: "Video Call", detail: "Best for discovery conversations, kickoff sessions, and live Q&A." },
  { icon: FiZap, label: "Async Updates", detail: "Ongoing progress shared through shared boards once a project is underway." },
];

const QUICK_LINKS = [
  { icon: FiFolder, label: "See Our Work", desc: "Browse recent projects and case studies", href: "/our-work" },
  { icon: FiBookOpen, label: "Read the Blog", desc: "Engineering & product insights", href: "/blog" },
  { icon: FiBriefcase, label: "View Careers", desc: "Open roles on our team", href: "/careers" },
];


export default function ContactPageClient() {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const { data: settings } = useSWR("/settings/public/", fetcher, { revalidateOnFocus: false });

  const infoCards = [
    {
      icon: FiMail,
      title: "Email",
      content: settings?.contact_email || CONTACT_FALLBACK,
      href: settings?.contact_email ? `mailto:${settings.contact_email}` : undefined,
    },
    {
      icon: FiPhone,
      title: "Phone",
      content: settings?.contact_phone || CONTACT_FALLBACK,
      href: settings?.contact_phone ? `tel:${settings.contact_phone.replace(/[^+\d]/g, "")}` : undefined,
    },
    {
      icon: FiMapPin,
      title: "Location",
      content: settings?.contact_address || CONTACT_FALLBACK,
    },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <>
      {/* HERO: split with media */}
      <section className="relative overflow-hidden section pt-16 md:pt-24">
        <div className="pointer-events-none absolute inset-0 mesh-gradient" />
        <div className="container-page relative grid items-center gap-12 lg:grid-cols-2">
          <Reveal>
            <span className="badge-pill">Contact Us</span>
            <h1 className="mt-6 font-heading text-4xl font-bold leading-tight text-foreground sm:text-5xl">
              Let&apos;s Build Your <span className="gradient-text">Next Product</span>
            </h1>
            <p className="mt-6 max-w-lg text-base leading-relaxed text-foreground-muted sm:text-lg">
              Tell us about your project and our team will get back to you
              within one business day — no automated runaround, just a real conversation.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-2">
              <span className="text-xs font-medium uppercase tracking-wider text-foreground-muted/70">
                Follow along
              </span>
              <SocialIcons variant="header" />
            </div>
          </Reveal>

          <Reveal delay={0.15} className="relative">
            <div className="absolute -inset-4 animate-pulse-glow rounded-[2rem] bg-gradient-to-br from-primary/20 via-secondary/15 to-accent/10 blur-xl" />
            <div className="relative overflow-hidden rounded-3xl border border-border shadow-2xl">
              <video src="/videos/6.mp4" autoPlay muted loop playsInline className="h-80 w-full object-cover sm:h-96" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
              <span className="absolute left-4 bottom-4 inline-flex items-center gap-2 rounded-full bg-white/90 px-3 py-1.5 text-xs font-semibold text-foreground shadow-sm backdrop-blur-sm">
                <FiPlay className="text-primary" size={12} /> Say hello
              </span>
            </div>
            <div className="absolute -right-8 -bottom-8 w-32 rotate-[5deg] overflow-hidden rounded-xl border-4 border-white shadow-xl animate-float-slower">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/images/11.jpg" alt="Our team collaborating" className="h-24 w-full object-cover" />
            </div>
          </Reveal>
        </div>
      </section>

      {/* MARQUEE */}
      <Marquee items={MARQUEE_ITEMS} />

      {/* INFO + FORM */}
      <section className="section pt-0 border-t border-border">
        <div className="container-page grid gap-10 lg:grid-cols-[1fr_1.3fr] lg:items-start">
          <Reveal className="space-y-6">
            {infoCards.map((c) => (
              <div key={c.title} className="surface-card p-6">
                <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-secondary text-white shadow-lg shadow-primary/30">
                  <c.icon size={18} />
                </span>
                <h3 className="mt-4 font-heading text-base font-semibold text-foreground">{c.title}</h3>
                {c.href ? (
                  <a href={c.href} data-cursor-hover="true" className="mt-1 block text-sm text-foreground-muted hover:text-primary">
                    {c.content}
                  </a>
                ) : (
                  <p className="mt-1 text-sm text-foreground-muted">{c.content}</p>
                )}
              </div>
            ))}
            <div className="surface-card p-6">
              <h3 className="font-heading text-base font-semibold text-foreground mb-3">Follow Us</h3>
              <SocialIcons variant="footer" />
            </div>
          </Reveal>

          <Reveal delay={0.1} className="relative overflow-hidden rounded-3xl border border-border bg-white p-8 shadow-sm sm:p-10">
            <div className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full bg-gradient-to-br from-primary/10 to-secondary/10 blur-2xl" />

            {!submitted && (
              <div className="relative mb-7 flex flex-wrap items-center justify-between gap-3 border-b border-border pb-6">
                <div>
                  <h2 className="font-heading text-xl font-semibold text-foreground">Send Us a Message</h2>
                  <p className="mt-1 text-sm text-foreground-muted">Fill out the form and we&apos;ll be in touch shortly.</p>
                </div>
                <span className="badge-pill">
                  <FiZap size={12} /> Replies within 24h
                </span>
              </div>
            )}

            <AnimatePresence mode="wait">
              {submitted ? (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex h-full flex-col items-center justify-center py-10 text-center"
                >
                  <span className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-primary to-secondary text-white shadow-lg shadow-primary/30">
                    <FiCheckCircle size={30} />
                  </span>
                  <h3 className="mt-5 font-heading text-xl font-semibold text-foreground">
                    Thank you for reaching out!
                  </h3>
                  <p className="mt-2 max-w-sm text-sm text-foreground-muted">
                    We&apos;ve received your message and will get back to you within one business day.
                  </p>
                </motion.div>
              ) : (
                <motion.form
                  key="form"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onSubmit={handleSubmit}
                  className="space-y-5"
                >
                  <div className="grid gap-5 sm:grid-cols-2">
                    <div>
                      <label className="mb-1.5 block text-sm font-medium text-foreground">Full Name</label>
                      <input
                        required
                        value={form.name}
                        onChange={(e) => setForm({ ...form, name: e.target.value })}
                        className="w-full rounded-xl border border-border bg-background-subtle px-4 py-2.5 text-sm outline-none transition-shadow focus:border-primary focus:shadow-[0_0_0_4px_rgba(79,70,229,0.1)]"
                        placeholder="Jane Doe"
                      />
                    </div>
                    <div>
                      <label className="mb-1.5 block text-sm font-medium text-foreground">Email Address</label>
                      <input
                        required
                        type="email"
                        value={form.email}
                        onChange={(e) => setForm({ ...form, email: e.target.value })}
                        className="w-full rounded-xl border border-border bg-background-subtle px-4 py-2.5 text-sm outline-none transition-shadow focus:border-primary focus:shadow-[0_0_0_4px_rgba(79,70,229,0.1)]"
                        placeholder="jane@company.com"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="mb-1.5 block text-sm font-medium text-foreground">Subject</label>
                    <input
                      required
                      value={form.subject}
                      onChange={(e) => setForm({ ...form, subject: e.target.value })}
                      className="w-full rounded-xl border border-border bg-background-subtle px-4 py-2.5 text-sm outline-none transition-shadow focus:border-primary focus:shadow-[0_0_0_4px_rgba(79,70,229,0.1)]"
                      placeholder="Project inquiry"
                    />
                  </div>
                  <div>
                    <label className="mb-1.5 block text-sm font-medium text-foreground">Message</label>
                    <textarea
                      required
                      rows={5}
                      value={form.message}
                      onChange={(e) => setForm({ ...form, message: e.target.value })}
                      className="w-full resize-none rounded-xl border border-border bg-background-subtle px-4 py-2.5 text-sm outline-none transition-shadow focus:border-primary focus:shadow-[0_0_0_4px_rgba(79,70,229,0.1)]"
                      placeholder="Tell us a bit about your project..."
                    />
                  </div>
                  <div className="flex flex-wrap items-center gap-4 pt-1">
                    <button type="submit" data-cursor-hover="true" className="btn-primary">
                      Send Message <FiSend size={14} />
                    </button>
                    <p className="text-xs text-foreground-muted">
                      No spam, ever. We only use this to reply to your inquiry.
                    </p>
                  </div>
                </motion.form>
              )}
            </AnimatePresence>
          </Reveal>
        </div>
      </section>

      {/* WHAT HAPPENS NEXT */}
      <ProcessSteps
        eyebrow="How It Works"
        title="Your Idea, Our Process"
        subtitle="A clear, no-nonsense path from the first hello to a project in motion."
        steps={NEXT_STEPS}
        variant="mini"
      />

      {/* HOW WE PREFER TO CONNECT */}
      <section className="section border-t border-border">
        <div className="container-page">
          <Reveal className="mx-auto max-w-2xl text-center">
            <span className="badge-pill">Communication</span>
            <h2 className="mt-6 font-heading text-3xl font-bold text-foreground sm:text-4xl">
              How We Prefer to Connect
            </h2>
            <p className="mt-4 text-foreground-muted">
              Different conversations call for different channels — here&apos;s what works best for each.
            </p>
          </Reveal>

          <div className="mx-auto mt-12 grid max-w-3xl gap-px overflow-hidden rounded-2xl border border-border bg-border sm:grid-cols-3">
            {CONNECT_CHANNELS.map((c, i) => (
              <Reveal key={c.label} delay={i * 0.08} className="bg-white p-6 text-center">
                <c.icon className="mx-auto text-primary" size={20} />
                <p className="mt-3 font-heading text-sm font-semibold text-foreground">{c.label}</p>
                <p className="mt-1.5 text-xs leading-relaxed text-foreground-muted">{c.detail}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* OUR COMMITMENTS */}
      <section className="section bg-background-subtle">
        <div className="container-page">
          <Reveal className="mx-auto max-w-2xl text-center">
            <span className="badge-pill">Our Commitments</span>
            <h2 className="mt-6 font-heading text-3xl font-bold text-foreground sm:text-4xl">
              What You Can Expect From Us
            </h2>
          </Reveal>

          <div className="mt-12">
            <FeatureRows items={COMMITMENTS} variant="rail" />
          </div>
        </div>
      </section>

      {/* QUICK LINKS */}
      <section className="section bg-background-subtle">
        <div className="container-page">
          <Reveal className="mx-auto max-w-2xl text-center">
            <span className="badge-pill">Looking for Something Else?</span>
            <h2 className="mt-6 font-heading text-3xl font-bold text-foreground sm:text-4xl">
              A Few Other Places to Look
            </h2>
          </Reveal>

          <div className="mt-12 grid gap-6 sm:grid-cols-3">
            {QUICK_LINKS.map((l, i) => (
              <Reveal key={l.label} delay={i * 0.08}>
                <Link
                  href={l.href}
                  data-cursor-hover="true"
                  className="surface-card group flex h-full flex-col items-center p-7 text-center"
                >
                  <span className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-secondary text-white shadow-lg shadow-primary/30 transition-transform duration-300 group-hover:scale-105">
                    <l.icon size={20} />
                  </span>
                  <h3 className="mt-4 font-heading text-base font-semibold text-foreground">{l.label}</h3>
                  <p className="mt-1.5 text-sm text-foreground-muted">{l.desc}</p>
                  <span className="mt-3 inline-flex items-center gap-1 text-xs font-semibold text-primary">
                    Explore <FiArrowRight size={12} />
                  </span>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* SEO CONTENT */}
      <SEOContent
        eyebrow="Get Started"
        title="Start Your Software Development Project With Confidence"
        intro="Reaching out is the easiest step — here's what to expect once you do."
        blocks={[
          {
            heading: "A Real Conversation, Not a Sales Pitch",
            text: "When you contact Techish Innovation, you speak with people who actually build software — not a sales queue. We ask real questions about your goals so we can give you an honest read on scope, timeline, and approach.",
          },
          {
            heading: "No-Obligation Discovery Call",
            text: "Every inquiry starts with a short, no-pressure discovery call. It's a chance for us to understand your project and for you to evaluate whether we're the right software development partner — no commitment required.",
          },
          {
            heading: "Clear Next Steps, Fast",
            text: "We reply to every message within one business day, and most projects move from first contact to a proposal within a week. No lengthy procurement runaround — just a clear path to getting started.",
          },
          {
            heading: "Support for Every Project Size",
            text: "Whether you're a founder scoping an MVP or an enterprise team planning a larger initiative, we tailor the conversation — and the engagement — to the size and complexity of what you're building.",
          },
        ]}
      />

      {/* TRUST STRIP */}
      <section className="border-t border-border bg-background-subtle py-10">
        <div className="container-page">
          <Reveal className="mx-auto max-w-2xl text-center">
            <p className="text-sm leading-relaxed text-foreground-muted">
              <FiLock className="mr-1.5 inline text-primary" size={14} /> Your information stays confidential.
              Everything you share is used only to respond to your inquiry — we&apos;re happy to sign an NDA before
              any deeper conversation, and we never share your details with third parties.
            </p>
          </Reveal>
        </div>
      </section>
    </>
  );
}
