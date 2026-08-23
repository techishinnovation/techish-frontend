"use client";

import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { useEffect } from "react";
import { FiCalendar, FiTag, FiX } from "react-icons/fi";

import type { AnyBlogPost } from "@/lib/types";

function formatDate(value: string) {
  return new Date(value).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export default function BlogLightbox({ post, onClose }: { post: AnyBlogPost | null; onClose: () => void }) {
  useEffect(() => {
    if (!post) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [post, onClose]);

  if (!post) return null;

  const image = post.source === "static" ? post.image : post.image || "/images/no-img.png";
  const date = post.source === "static" ? post.date : post.created_at;
  const category = post.source === "static" ? post.category : "Company Update";

  return (
    <AnimatePresence>
      {post && (
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
            className="relative grid h-[85vh] w-full max-w-7xl grid-cols-1 overflow-hidden rounded-3xl bg-white shadow-2xl md:h-[720px] md:grid-cols-[1.5fr_1fr]"
          >
            <button
              type="button"
              onClick={onClose}
              aria-label="Close"
              data-cursor-hover="true"
              className="absolute right-4 top-4 z-20 inline-flex h-10 w-10 items-center justify-center rounded-full bg-white/90 text-foreground shadow hover:bg-white"
            >
              <FiX size={18} />
            </button>

            <div className="relative h-80 md:h-full">
              <Image src={image} alt={post.title} fill sizes="(max-width: 768px) 100vw, 65vw" className="object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/5 to-transparent" />
              <span className="absolute left-5 bottom-5 inline-flex items-center gap-1.5 rounded-full bg-white/95 px-3.5 py-1.5 text-xs font-medium text-primary shadow-sm">
                <FiTag size={12} /> {category}
              </span>
            </div>

            <div className="flex flex-col overflow-y-auto p-8 sm:p-10">
              <span className="inline-flex items-center gap-1.5 text-xs font-medium text-foreground-muted">
                <FiCalendar size={12} /> {formatDate(date)}
              </span>
              <h3 className="mt-4 font-heading text-2xl font-bold leading-tight text-foreground sm:text-3xl">
                {post.title}
              </h3>
              <div className="mt-3 h-1 w-14 rounded-full bg-gradient-to-r from-primary to-secondary" />
              <p className="mt-6 text-base leading-relaxed text-foreground-muted whitespace-pre-line">
                {post.description}
              </p>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
