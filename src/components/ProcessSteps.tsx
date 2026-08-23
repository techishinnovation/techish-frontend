import { Fragment } from "react";
import type { IconType } from "react-icons";
import { FiArrowRight } from "react-icons/fi";

import Reveal from "@/components/Reveal";

export interface ProcessStep {
  icon: IconType;
  title: string;
  desc: string;
}

interface ProcessStepsProps {
  eyebrow: string;
  title: string;
  subtitle: string;
  steps: ProcessStep[];
  variant?: "timeline" | "stairs" | "numbered" | "mini";
}

function TimelineVariant({ steps }: { steps: ProcessStep[] }) {
  return (
    <div className="relative mx-auto mt-16 max-w-4xl">
      <div className="pointer-events-none absolute left-6 top-2 bottom-2 w-0.5 rounded-full bg-gradient-to-b from-primary via-secondary to-accent sm:left-1/2 sm:-translate-x-1/2" />
      <div className="space-y-8 sm:space-y-3">
        {steps.map((step, i) => {
          const Icon = step.icon;
          const isRight = i % 2 === 1;
          return (
            <div key={step.title} className="relative sm:grid sm:min-h-[128px] sm:grid-cols-2 sm:items-center sm:gap-x-14">
              <span className="absolute left-6 top-0 z-10 flex h-12 w-12 -translate-x-1/2 items-center justify-center rounded-2xl bg-gradient-to-br from-primary to-secondary text-white shadow-lg shadow-primary/30 sm:left-1/2 sm:top-1/2 sm:-translate-y-1/2">
                <Icon size={20} />
              </span>
              <Reveal
                delay={i * 0.1}
                className={`pl-16 sm:pl-0 ${
                  isRight ? "sm:col-start-2 sm:pl-14 sm:text-left" : "sm:col-start-1 sm:pr-14 sm:text-right"
                }`}
              >
                <span className="text-xs font-bold uppercase tracking-wider text-primary/70">
                  Step {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-2 font-heading text-lg font-semibold text-foreground">{step.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-foreground-muted">{step.desc}</p>
              </Reveal>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function StairsVariant({ steps }: { steps: ProcessStep[] }) {
  return (
    <div className="mt-16 flex flex-col gap-6 lg:flex-row lg:items-start lg:gap-3">
      {steps.map((step, i) => {
        const Icon = step.icon;
        return (
          <div key={step.title} className="flex flex-1 items-stretch gap-3">
            <Reveal delay={i * 0.1} className="flex-1">
              <div
                className="surface-card relative h-full p-6"
                style={{ marginTop: `${(i % 2 === 0 ? 0 : 1) * 1.5}rem` }}
              >
                <span className="pointer-events-none absolute right-4 top-4 font-heading text-xs font-bold text-primary/30">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="relative inline-flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-secondary text-white shadow-lg shadow-primary/30">
                  <Icon size={20} />
                </span>
                <h3 className="relative mt-4 font-heading text-base font-semibold text-foreground">{step.title}</h3>
                <p className="relative mt-2 text-sm leading-relaxed text-foreground-muted">{step.desc}</p>
              </div>
            </Reveal>
            {i < steps.length - 1 && (
              <span className="hidden shrink-0 items-center text-primary/30 lg:flex">
                <FiArrowRight size={20} />
              </span>
            )}
          </div>
        );
      })}
    </div>
  );
}

function NumberedVariant({ steps }: { steps: ProcessStep[] }) {
  return (
    <div className="relative mt-16">
      <div className="pointer-events-none absolute left-0 right-0 top-1/2 hidden border-t border-dashed border-border lg:block" />
      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
        {steps.map((step, i) => {
          const Icon = step.icon;
          return (
            <Reveal key={step.title} delay={i * 0.1} className="relative flex flex-col items-center text-center">
              <span className="pointer-events-none select-none font-heading text-7xl font-bold text-primary/[0.07]">
                {String(i + 1).padStart(2, "0")}
              </span>
              <span className="relative -mt-9 flex h-14 w-14 items-center justify-center rounded-full border-4 border-white bg-gradient-to-br from-primary to-secondary text-white shadow-lg shadow-primary/30">
                <Icon size={20} />
              </span>
              <h3 className="mt-4 font-heading text-base font-semibold text-foreground">{step.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-foreground-muted">{step.desc}</p>
            </Reveal>
          );
        })}
      </div>
    </div>
  );
}

function MiniVariant({ steps }: { steps: ProcessStep[] }) {
  return (
    <div className="mx-auto mt-12 flex max-w-3xl flex-col items-stretch gap-3 sm:flex-row sm:items-center sm:gap-2">
      {steps.map((step, i) => {
        const Icon = step.icon;
        return (
          <Fragment key={step.title}>
            <Reveal delay={i * 0.08} className="flex-1">
              <div className="flex items-center gap-3 rounded-xl border border-border bg-white px-4 py-3.5">
                <span className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                  <Icon size={16} />
                </span>
                <div>
                  <h3 className="font-heading text-sm font-semibold text-foreground">{step.title}</h3>
                  <p className="mt-0.5 text-xs leading-relaxed text-foreground-muted">{step.desc}</p>
                </div>
              </div>
            </Reveal>
            {i < steps.length - 1 && (
              <span className="hidden shrink-0 rotate-90 text-primary/40 sm:block sm:rotate-0">
                <FiArrowRight size={16} />
              </span>
            )}
          </Fragment>
        );
      })}
    </div>
  );
}

export default function ProcessSteps({ eyebrow, title, subtitle, steps, variant = "timeline" }: ProcessStepsProps) {
  return (
    <section className="section border-t border-border">
      <div className="container-page">
        <Reveal className="mx-auto max-w-2xl text-center">
          <span className="badge-pill">{eyebrow}</span>
          <h2 className="mt-6 font-heading text-3xl font-bold text-foreground sm:text-4xl">{title}</h2>
          <p className="mt-4 text-foreground-muted">{subtitle}</p>
        </Reveal>

        {variant === "stairs" && <StairsVariant steps={steps} />}
        {variant === "numbered" && <NumberedVariant steps={steps} />}
        {variant === "mini" && <MiniVariant steps={steps} />}
        {variant === "timeline" && <TimelineVariant steps={steps} />}
      </div>
    </section>
  );
}
