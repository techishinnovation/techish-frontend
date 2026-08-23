"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import type { IconType } from "react-icons";
import { FiArrowRight, FiImage } from "react-icons/fi";

interface EmptyStateProps {
  icon?: IconType;
  title: string;
  description: string;
  ctaLabel?: string;
  ctaHref?: string;
  onCtaClick?: () => void;
}

export default function EmptyState({
  icon: Icon = FiImage,
  title,
  description,
  ctaLabel = "Talk to Our Team",
  ctaHref = "/contact",
  onCtaClick,
}: EmptyStateProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      className="relative mx-auto max-w-lg overflow-hidden rounded-3xl border border-border bg-white px-8 py-14 text-center shadow-sm"
    >
      <div className="pointer-events-none absolute -right-6 -top-6 h-24 w-24 rounded-full border border-primary/20" />
      <div className="pointer-events-none absolute -left-10 bottom-0 h-32 w-32 rounded-full bg-primary/5 blur-2xl" />
      <span className="absolute right-10 top-8 h-1.5 w-1.5 rounded-full bg-secondary animate-pulse-glow" />

      <span className="relative mx-auto inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-primary/10 to-secondary/10 text-primary">
        <Icon size={26} />
      </span>
      <h3 className="relative mt-6 font-heading text-xl font-semibold text-foreground sm:text-2xl">{title}</h3>
      <p className="relative mx-auto mt-3 max-w-sm text-sm leading-relaxed text-foreground-muted">{description}</p>
      {ctaLabel && onCtaClick && (
        <button type="button" onClick={onCtaClick} data-cursor-hover="true" className="btn-primary relative mt-7">
          {ctaLabel} <FiArrowRight />
        </button>
      )}
      {ctaLabel && !onCtaClick && ctaHref && (
        <Link href={ctaHref} data-cursor-hover="true" className="btn-primary relative mt-7">
          {ctaLabel} <FiArrowRight />
        </Link>
      )}
    </motion.div>
  );
}
