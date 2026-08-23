"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { FiStar, FiX } from "react-icons/fi";
import useSWR from "swr";

import Reveal from "@/components/Reveal";
import { api } from "@/lib/api";
import type { ClientReviewPublic } from "@/lib/types";

const fetcher = (url: string) => api.get(url).then((res) => res.data as ClientReviewPublic[]);

const GROUP_SIZE = 3;
const AUTOPLAY_MS = 6000;

function Stars({ size = 13 }: { size?: number }) {
  return (
    <div className="flex gap-0.5 text-amber-400">
      {Array.from({ length: 5 }).map((_, i) => (
        <FiStar key={i} size={size} fill="currentColor" />
      ))}
    </div>
  );
}

export default function ReviewsCarousel() {
  const { data } = useSWR("/reviews/public/", fetcher, { revalidateOnFocus: false });
  const [slide, setSlide] = useState(0);
  const [active, setActive] = useState<ClientReviewPublic | null>(null);

  const reviews = data ?? [];
  const slides: ClientReviewPublic[][] = [];
  for (let i = 0; i < reviews.length; i += GROUP_SIZE) {
    slides.push(reviews.slice(i, i + GROUP_SIZE));
  }
  const shouldAutoplay = reviews.length > GROUP_SIZE && slides.length > 1;

  useEffect(() => {
    setSlide(0);
  }, [reviews.length]);

  useEffect(() => {
    if (!shouldAutoplay) return;
    const id = setInterval(() => {
      setSlide((s) => (s + 1) % slides.length);
    }, AUTOPLAY_MS);
    return () => clearInterval(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [shouldAutoplay, slides.length]);

  if (!data || reviews.length === 0) return null;

  return (
    <section className="section border-t border-border bg-background-subtle">
      <div className="container-page">
        <Reveal className="mx-auto max-w-2xl text-center">
          <span className="badge-pill">Client Reviews</span>
          <h2 className="mt-6 font-heading text-3xl font-bold text-foreground sm:text-4xl">What Clients Say</h2>
          <p className="mt-4 text-foreground-muted">
            Real feedback from the founders and teams we&apos;ve partnered with.
          </p>
        </Reveal>

        <div className="relative mt-12 overflow-x-hidden py-2">
          <div
            className="flex transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]"
            style={{ transform: `translateX(-${slide * 100}%)` }}
          >
            {slides.map((group, gi) => (
              <div key={gi} className="grid w-full shrink-0 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {group.map((r) => (
                  <button
                    key={r.id}
                    type="button"
                    onClick={() => setActive(r)}
                    data-cursor-hover="true"
                    className="surface-card flex h-full flex-col p-6 text-left"
                  >
                    <div className="flex items-center gap-3">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src="/images/client.png"
                        alt={r.client_name}
                        className="h-11 w-11 shrink-0 rounded-full object-cover"
                      />
                      <div>
                        <p className="font-heading text-sm font-semibold text-foreground">{r.client_name}</p>
                        <p className="text-xs text-foreground-muted">{r.project_title}</p>
                      </div>
                    </div>
                    <div className="mt-3">
                      <Stars />
                    </div>
                    <p className="mt-3 line-clamp-4 flex-1 text-sm leading-relaxed text-foreground-muted">
                      {r.feedback}
                    </p>
                  </button>
                ))}
              </div>
            ))}
          </div>
        </div>

        {slides.length > 1 && (
          <div className="mt-8 flex items-center justify-center gap-2">
            {slides.map((_, i) => (
              <button
                key={i}
                type="button"
                onClick={() => setSlide(i)}
                aria-label={`Go to slide ${i + 1}`}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  i === slide ? "w-6 bg-primary" : "w-1.5 bg-border"
                }`}
              />
            ))}
          </div>
        )}
      </div>

      <AnimatePresence>
        {active && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-950/60 p-4 backdrop-blur-sm"
            onClick={() => setActive(null)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.96, y: 12 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: 12 }}
              transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
              onClick={(e) => e.stopPropagation()}
              className="relative flex max-h-[85vh] w-full max-w-lg flex-col overflow-y-auto rounded-3xl bg-white p-8 shadow-2xl sm:p-10"
            >
              <button
                type="button"
                onClick={() => setActive(null)}
                aria-label="Close"
                data-cursor-hover="true"
                className="absolute right-4 top-4 inline-flex h-9 w-9 items-center justify-center rounded-full text-foreground-muted hover:bg-background-subtle"
              >
                <FiX size={18} />
              </button>

              <div className="flex items-center gap-4">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/images/client.png"
                  alt={active.client_name}
                  className="h-14 w-14 shrink-0 rounded-full object-cover"
                />
                <div>
                  <p className="font-heading text-base font-semibold text-foreground">{active.client_name}</p>
                  <p className="text-sm text-foreground-muted">{active.project_title}</p>
                </div>
              </div>

              <div className="mt-4">
                <Stars size={15} />
              </div>

              <p className="mt-5 text-base leading-relaxed text-foreground-muted whitespace-pre-line">
                {active.feedback}
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
