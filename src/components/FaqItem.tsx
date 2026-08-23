"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { FiChevronDown } from "react-icons/fi";

export default function FaqItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="surface-card overflow-hidden">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        data-cursor-hover="true"
        className="flex w-full items-center justify-between gap-4 p-5 text-left"
      >
        <span className="font-heading text-sm font-semibold text-foreground sm:text-base">{q}</span>
        <FiChevronDown
          className={`shrink-0 text-primary transition-transform duration-300 ${open ? "rotate-180" : ""}`}
        />
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-hidden"
          >
            <p className="px-5 pb-5 text-sm leading-relaxed text-foreground-muted">{a}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
