"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect } from "react";
import { FiArrowRight, FiMail, FiX } from "react-icons/fi";

import type { JobOpening } from "@/lib/types";

export default function JobLightbox({ job, onClose }: { job: JobOpening | null; onClose: () => void }) {
  useEffect(() => {
    if (!job) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [job, onClose]);

  if (!job) return null;

  const tags = job.technology
    .split(",")
    .map((t) => t.trim())
    .filter(Boolean);

  const mailtoHref = `mailto:${job.application_email}?subject=${encodeURIComponent(
    `Application: ${job.title}`
  )}`;

  return (
    <AnimatePresence>
      {job && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-950/70 p-4 backdrop-blur-sm"
          onClick={onClose}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 12 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            onClick={(e) => e.stopPropagation()}
            className="relative flex h-[85vh] w-full max-w-2xl flex-col overflow-hidden rounded-3xl bg-white shadow-2xl md:h-auto md:max-h-[85vh]"
          >
            <button
              type="button"
              onClick={onClose}
              aria-label="Close"
              data-cursor-hover="true"
              className="absolute right-4 top-4 z-10 inline-flex h-10 w-10 items-center justify-center rounded-full bg-white/90 text-foreground shadow hover:bg-white"
            >
              <FiX size={18} />
            </button>

            <div className="relative overflow-hidden bg-gradient-to-br from-primary via-primary to-secondary px-8 py-10 sm:px-10">
              <div className="grain-overlay" />
              <div className="pointer-events-none absolute -top-10 -left-10 h-40 w-40 rounded-full bg-white/10 blur-3xl" />
              <h3 className="relative font-heading text-2xl font-bold leading-tight text-white sm:text-3xl">
                {job.title}
              </h3>
              {tags.length > 0 && (
                <div className="relative mt-4 flex flex-wrap gap-2">
                  {tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full bg-white/15 px-3 py-1 text-xs font-medium text-white backdrop-blur-sm"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}
            </div>

            <div className="flex-1 overflow-y-auto p-8 sm:p-10">
              <h4 className="font-heading text-sm font-semibold uppercase tracking-wide text-foreground-muted">
                About the Role
              </h4>
              <p className="mt-3 text-base leading-relaxed text-foreground-muted whitespace-pre-line">
                {job.description}
              </p>
            </div>

            <div className="border-t border-border bg-background-subtle p-6 sm:px-10">
              <a href={mailtoHref} data-cursor-hover="true" className="btn-primary w-full justify-center sm:w-auto">
                <FiMail size={14} /> Apply Now <FiArrowRight size={14} />
              </a>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
