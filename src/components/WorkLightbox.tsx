"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { FiChevronLeft, FiChevronRight, FiExternalLink, FiX } from "react-icons/fi";

import type { WorkItem } from "@/lib/types";
import { getVideoEmbedInfo } from "@/lib/videoEmbed";

interface WorkLightboxProps {
  item: WorkItem | null;
  onClose: () => void;
}

export default function WorkLightbox({ item, onClose }: WorkLightboxProps) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    setIndex(0);
  }, [item?.id]);

  const media = item?.media?.length
    ? item.media
    : item
    ? [{ id: "none", file: "/images/no-img.png", media_type: "image" as const, order: 0 }]
    : [];

  const hasMultiple = media.length > 1;

  const goPrev = () => setIndex((i) => (i - 1 + media.length) % media.length);
  const goNext = () => setIndex((i) => (i + 1) % media.length);

  useEffect(() => {
    if (!item) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") goPrev();
      if (e.key === "ArrowRight") goNext();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [item, media.length]);

  return (
    <AnimatePresence>
      {item && (
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

            {/* Left: media viewer */}
            <div className="relative flex h-80 items-center justify-center bg-slate-950 md:h-full">
              {media[index]?.media_type === "video" ? (
                (() => {
                  const embed = getVideoEmbedInfo(media[index].file);
                  if (embed.type === "direct") {
                    return (
                      <video
                        key={media[index].id}
                        src={embed.embedUrl}
                        controls
                        autoPlay
                        className="h-full w-full object-contain"
                      />
                    );
                  }
                  return (
                    <iframe
                      key={media[index].id}
                      src={embed.embedUrl}
                      title={item.title}
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                      className="h-full w-full"
                    />
                  );
                })()
              ) : (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  key={media[index]?.id}
                  src={media[index]?.file ?? "/images/no-img.png"}
                  alt={item.title}
                  className="h-full w-full object-contain"
                />
              )}

              {hasMultiple && (
                <>
                  <button
                    type="button"
                    onClick={goPrev}
                    aria-label="Previous media"
                    data-cursor-hover="true"
                    className="absolute left-4 top-1/2 z-10 inline-flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-foreground shadow-lg transition-transform hover:scale-110 hover:bg-white"
                  >
                    <FiChevronLeft size={20} />
                  </button>
                  <button
                    type="button"
                    onClick={goNext}
                    aria-label="Next media"
                    data-cursor-hover="true"
                    className="absolute right-4 top-1/2 z-10 inline-flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-foreground shadow-lg transition-transform hover:scale-110 hover:bg-white"
                  >
                    <FiChevronRight size={20} />
                  </button>
                </>
              )}

              {hasMultiple && (
                <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 gap-1.5">
                  {media.map((m, i) => (
                    <span
                      key={m.id}
                      className={`h-1.5 rounded-full transition-all ${
                        i === index ? "w-6 bg-white" : "w-1.5 bg-white/50"
                      }`}
                    />
                  ))}
                </div>
              )}
            </div>

            {/* Right: details */}
            <div className="flex flex-col overflow-y-auto p-8 sm:p-10">
              <h3 className="font-heading text-2xl font-bold leading-tight text-foreground sm:text-3xl">
                {item.title}
              </h3>
              <div className="mt-3 h-1 w-14 rounded-full bg-gradient-to-r from-primary to-secondary" />
              <p className="mt-6 text-base leading-relaxed text-foreground-muted whitespace-pre-line">
                {item.description}
              </p>
              {item.project_url && (
                <a
                  href={item.project_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-cursor-hover="true"
                  className="btn-primary mt-8 w-fit"
                >
                  Visit Project <FiExternalLink />
                </a>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
