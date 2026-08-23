"use client";

import { motion } from "framer-motion";
import { FiPlay } from "react-icons/fi";

interface HeroMediaProps {
  videoSrc: string;
  photoSrc: string;
  caption: string;
  statValue?: string;
  statLabel?: string;
  aspect?: string;
  mirrored?: boolean;
  delay?: number;
}

export default function HeroMedia({
  videoSrc,
  photoSrc,
  caption,
  statValue,
  statLabel,
  aspect = "aspect-[4/5]",
  mirrored = false,
  delay = 0.15,
}: HeroMediaProps) {
  const photoSide = mirrored ? "right" : "left";

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.7, delay, ease: [0.16, 1, 0.3, 1] }}
      className="relative mx-auto max-w-md"
    >
      <div className="absolute -inset-6 rounded-[2rem] bg-gradient-to-br from-primary/25 via-secondary/20 to-accent/20 blur-2xl" />

      <div className="relative overflow-hidden rounded-2xl border border-border bg-white shadow-2xl">
        <div className="flex items-center gap-1.5 border-b border-border bg-background-subtle px-4 py-3">
          <span className="h-2.5 w-2.5 rounded-full bg-red-400" />
          <span className="h-2.5 w-2.5 rounded-full bg-amber-400" />
          <span className="h-2.5 w-2.5 rounded-full bg-emerald-400" />
        </div>
        <div className={`relative ${aspect} w-full overflow-hidden bg-slate-950`}>
          <video src={videoSrc} autoPlay muted loop playsInline className="h-full w-full object-cover opacity-90" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
          <span className="absolute left-4 bottom-4 inline-flex items-center gap-2 rounded-full bg-white/90 px-3 py-1.5 text-xs font-semibold text-foreground shadow-sm backdrop-blur-sm">
            <FiPlay className="text-primary" size={12} /> {caption}
          </span>
        </div>
      </div>

      {/* Floating photo card */}
      <div
        className={`absolute -bottom-8 w-36 overflow-hidden rounded-xl border-4 border-white shadow-2xl animate-float-slower ${
          photoSide === "left" ? "-left-10 rotate-[-6deg]" : "-right-10 rotate-[6deg]"
        }`}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={photoSrc} alt="Techish Innovation project preview" className="h-28 w-full object-cover" />
      </div>

      {/* Floating glass stat card */}
      {statValue && (
        <div
          className={`glass-panel absolute top-10 rounded-2xl border border-white/60 px-4 py-3 shadow-xl animate-float-slow ${
            photoSide === "left" ? "-right-6" : "-left-6"
          }`}
        >
          <p className="font-heading text-lg font-bold text-foreground">{statValue}</p>
          <p className="text-xs text-foreground-muted">{statLabel}</p>
        </div>
      )}
    </motion.div>
  );
}
