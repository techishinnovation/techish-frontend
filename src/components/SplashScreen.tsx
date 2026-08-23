"use client";

import { AnimatePresence, motion } from "framer-motion";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

declare global {
  interface Window {
    __techishSplashDone?: boolean;
  }
}

const PREFIX = "Building Better ";
const SUFFIX = "Software";

type Stage = "spin" | "reveal" | "hold" | "exit";

function markCursorReady() {
  if (typeof window === "undefined") return;
  window.__techishSplashDone = true;
  window.dispatchEvent(new Event("techish:splash-done"));
}

export default function SplashScreen() {
  const pathname = usePathname();
  const [visible, setVisible] = useState(false);
  const [stage, setStage] = useState<Stage>("spin");

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (pathname?.startsWith("/admin") || pathname?.startsWith("/feedback")) {
      markCursorReady();
      return;
    }

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduceMotion) {
      markCursorReady();
      return;
    }

    setVisible(true);

    const timers = [
      setTimeout(() => setStage("reveal"), 900),
      setTimeout(() => setStage("hold"), 900 + 950),
      setTimeout(() => setStage("exit"), 900 + 950 + 400),
      setTimeout(() => {
        setVisible(false);
        markCursorReady();
      }, 900 + 950 + 400 + 800),
    ];

    document.body.style.overflow = "hidden";
    const restoreScroll = setTimeout(() => {
      document.body.style.overflow = "";
    }, 900 + 950 + 400 + 800);

    return () => {
      timers.forEach(clearTimeout);
      clearTimeout(restoreScroll);
      document.body.style.overflow = "";
    };
  }, []);

  if (!visible) return null;

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="fixed inset-0 z-[200] flex items-center justify-center bg-white"
          animate={{ opacity: stage === "exit" ? 0 : 1 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <motion.div
            className="flex flex-col items-center gap-5"
            animate={{ scale: stage === "exit" ? 1.06 : 1 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <motion.img
              src="/images/logo.jpeg"
              alt="Techish Innovation"
              className="h-14 w-auto drop-shadow-xl sm:h-16"
              animate={{
                rotate: stage === "spin" ? 720 : 0,
                scale: stage === "spin" ? 1 : 1.15,
              }}
              transition={
                stage === "spin"
                  ? { duration: 0.9, ease: [0.65, 0, 0.35, 1] }
                  : { duration: 0.6, ease: [0.16, 1, 0.3, 1] }
              }
            />

            <span className="inline-flex overflow-hidden font-heading text-2xl font-bold text-foreground sm:text-3xl">
              {stage !== "spin" && (
                <>
                  {PREFIX.split("").map((ch, i) => (
                    <motion.span
                      key={`prefix-${i}`}
                      initial={{ opacity: 0, rotateX: -90, y: -6 }}
                      animate={{ opacity: 1, rotateX: 0, y: 0 }}
                      transition={{ duration: 0.35, delay: i * 0.035, ease: [0.16, 1, 0.3, 1] }}
                      className="inline-block"
                      style={{ transformOrigin: "50% 100%" }}
                    >
                      {ch === " " ? " " : ch}
                    </motion.span>
                  ))}
                  <span className="gradient-text inline-flex">
                    {SUFFIX.split("").map((ch, i) => (
                      <motion.span
                        key={`suffix-${i}`}
                        initial={{ opacity: 0, rotateX: -90, y: -6 }}
                        animate={{ opacity: 1, rotateX: 0, y: 0 }}
                        transition={{
                          duration: 0.35,
                          delay: (PREFIX.length + i) * 0.035,
                          ease: [0.16, 1, 0.3, 1],
                        }}
                        className="inline-block"
                        style={{ transformOrigin: "50% 100%" }}
                      >
                        {ch}
                      </motion.span>
                    ))}
                  </span>
                </>
              )}
            </span>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
