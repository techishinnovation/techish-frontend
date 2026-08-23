import Link from "next/link";
import type { IconType } from "react-icons";
import { FiArrowRight, FiCheck } from "react-icons/fi";

import Reveal from "@/components/Reveal";

export interface FeatureGridItem {
  icon: IconType;
  title: string;
  desc: string;
}

interface FeatureGridProps {
  items: FeatureGridItem[];
  ctaLabel?: string;
  ctaHref?: string;
  variant?: "bento" | "spotlight" | "badges" | "overlap";
}

function BentoVariant({ items, ctaLabel, ctaHref }: FeatureGridProps) {
  return (
    <div className="grid gap-2.5 sm:grid-cols-2 lg:grid-flow-dense lg:auto-rows-[160px] lg:grid-cols-3">
      {items.map((item, i) => {
        const featured = i === 0;
        const Icon = item.icon;
        return (
          <Reveal key={item.title} delay={(i % 3) * 0.08} className={featured ? "lg:col-span-2 lg:row-span-2" : ""}>
            <div
              className={`surface-card group relative flex h-full flex-col overflow-hidden ${
                featured
                  ? "bg-gradient-to-br from-primary via-primary to-secondary p-4 text-white sm:p-5 lg:flex-row lg:items-center lg:gap-4"
                  : "p-3.5"
              }`}
            >
              {featured && (
                <>
                  <div className="grain-overlay" />
                  <div className="pointer-events-none absolute -left-8 -top-8 h-32 w-32 rounded-full bg-white/10 blur-3xl" />
                </>
              )}
              <div className={featured ? "relative z-10 lg:max-w-[54%]" : "contents"}>
                <span
                  className={`relative inline-flex shrink-0 items-center justify-center rounded-lg shadow-lg ${
                    featured
                      ? "h-10 w-10 animate-bob bg-white/15 text-white backdrop-blur-sm"
                      : "h-9 w-9 bg-gradient-to-br from-primary to-secondary text-white shadow-primary/30"
                  }`}
                >
                  <Icon size={featured ? 17 : 14} />
                </span>
                <h3
                  className={`relative mt-2.5 font-heading font-semibold ${
                    featured ? "text-base text-white sm:text-lg" : "text-sm text-foreground"
                  }`}
                >
                  {item.title}
                </h3>
                <p
                  className={`relative mt-1 leading-relaxed ${
                    featured ? "text-sm text-white/85" : "text-xs text-foreground-muted"
                  }`}
                >
                  {item.desc}
                </p>
              </div>
              {featured && (
                <div className="relative z-10 mt-3 hidden flex-1 items-center justify-center lg:flex">
                  <Icon className="text-white/[0.16]" size={140} />
                </div>
              )}
            </div>
          </Reveal>
        );
      })}

      {ctaLabel && ctaHref && (
        <Reveal delay={(items.length % 3) * 0.08}>
          <Link
            href={ctaHref}
            data-cursor-hover="true"
            className="surface-card group flex h-full min-h-[95px] flex-col items-start justify-center gap-2 p-3.5 transition-colors"
          >
            <span className="inline-flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10 text-primary transition-transform duration-300 group-hover:translate-x-1 group-hover:bg-primary group-hover:text-white">
              <FiArrowRight size={15} />
            </span>
            <p className="font-heading text-sm font-semibold text-foreground">{ctaLabel}</p>
          </Link>
        </Reveal>
      )}
    </div>
  );
}

function SpotlightVariant({ items }: FeatureGridProps) {
  return (
    <div className="mx-auto grid max-w-4xl overflow-hidden rounded-3xl border border-border sm:grid-cols-2">
      {items.map((item, i) => {
        const Icon = item.icon;
        const tinted = i % 2 === 1;
        return (
          <Reveal
            key={item.title}
            delay={i * 0.07}
            className={`relative p-8 sm:p-10 ${tinted ? "bg-background-subtle" : "bg-white"} ${
              i > 0 ? "border-t border-border sm:border-t-0" : ""
            } ${i % 2 === 1 ? "sm:border-l sm:border-border" : ""} ${i >= 2 ? "sm:border-t sm:border-border" : ""}`}
          >
            <span className="inline-flex h-14 w-14 items-center justify-center rounded-full border-2 border-primary/25 text-primary">
              <Icon size={24} />
            </span>
            <span className="mt-6 block font-heading text-5xl font-bold text-primary/10">
              {String(i + 1).padStart(2, "0")}
            </span>
            <h3 className="mt-2 font-heading text-xl font-semibold text-foreground">{item.title}</h3>
            <p className="mt-3 text-sm leading-relaxed text-foreground-muted">{item.desc}</p>
          </Reveal>
        );
      })}
    </div>
  );
}

function BadgesVariant({ items }: FeatureGridProps) {
  return (
    <div className="grid gap-0 overflow-hidden rounded-2xl border border-border bg-white sm:grid-cols-2 lg:grid-cols-4">
      {items.map((item, i) => {
        const Icon = item.icon;
        return (
          <Reveal
            key={item.title}
            delay={i * 0.07}
            className={`relative border-dashed border-border p-6 ${
              i > 0 ? "border-t sm:border-t-0 sm:border-l" : ""
            }`}
          >
            <span className="pointer-events-none absolute left-0 top-6 h-3 w-3 -translate-x-1/2 rounded-full border border-border bg-background-subtle sm:block hidden" />
            <span className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-gradient-to-br from-primary to-secondary text-white shadow-md shadow-primary/25">
              <Icon size={18} />
            </span>
            <h3 className="mt-4 font-heading text-sm font-semibold text-foreground">{item.title}</h3>
            <p className="mt-2 text-xs leading-relaxed text-foreground-muted">{item.desc}</p>
          </Reveal>
        );
      })}
    </div>
  );
}

function OverlapVariant({ items }: FeatureGridProps) {
  const rotations = ["-rotate-2", "rotate-1", "-rotate-1", "rotate-2"];
  return (
    <div className="mx-auto grid max-w-5xl gap-x-4 gap-y-10 pt-4 sm:grid-cols-2 lg:grid-cols-4">
      {items.map((item, i) => {
        const Icon = item.icon;
        return (
          <Reveal key={item.title} delay={i * 0.08} className={`${rotations[i % rotations.length]} hover:rotate-0 transition-transform duration-500`}>
            <div className="surface-card relative h-full p-6 shadow-xl">
              <span className="absolute -top-5 left-6 inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-primary to-secondary text-white shadow-lg shadow-primary/30">
                <Icon size={18} />
              </span>
              <h3 className="mt-6 font-heading text-base font-semibold text-foreground">{item.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-foreground-muted">{item.desc}</p>
              <FiCheck className="absolute bottom-5 right-5 text-primary/20" size={20} />
            </div>
          </Reveal>
        );
      })}
    </div>
  );
}

export default function FeatureGrid({ items, ctaLabel, ctaHref, variant = "bento" }: FeatureGridProps) {
  if (variant === "spotlight") return <SpotlightVariant items={items} />;
  if (variant === "badges") return <BadgesVariant items={items} />;
  if (variant === "overlap") return <OverlapVariant items={items} />;
  return <BentoVariant items={items} ctaLabel={ctaLabel} ctaHref={ctaHref} />;
}
