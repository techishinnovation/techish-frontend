"use client";

import { useEffect, useRef, useState } from "react";

declare global {
  interface Window {
    __techishSplashDone?: boolean;
  }
}

const HOVER_SELECTOR =
  'a, button, input, textarea, select, [role="button"], [data-cursor-hover="true"]';

export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (window.__techishSplashDone) {
      setReady(true);
      return;
    }
    const onDone = () => setReady(true);
    window.addEventListener("techish:splash-done", onDone);
    return () => window.removeEventListener("techish:splash-done", onDone);
  }, []);

  useEffect(() => {
    if (!ready) return;
    const isFinePointer = window.matchMedia("(pointer: fine)").matches;
    if (!isFinePointer) return;

    document.documentElement.classList.add("has-custom-cursor");

    let ringX = window.innerWidth / 2;
    let ringY = window.innerHeight / 2;
    let targetX = ringX;
    let targetY = ringY;

    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    const onMove = (e: MouseEvent) => {
      targetX = e.clientX;
      targetY = e.clientY;
      dot.style.transform = `translate3d(${targetX}px, ${targetY}px, 0) translate(-50%, -50%)`;
    };

    const onOver = (e: MouseEvent) => {
      const target = e.target as Element | null;
      if (target?.closest(HOVER_SELECTOR)) {
        ring.classList.add("is-hovering");
      }
    };

    const onOut = (e: MouseEvent) => {
      const target = e.target as Element | null;
      if (target?.closest(HOVER_SELECTOR)) {
        ring.classList.remove("is-hovering");
      }
    };

    const onLeave = () => {
      dot.style.opacity = "0";
      ring.style.opacity = "0";
    };

    const onEnter = () => {
      dot.style.opacity = "1";
      ring.style.opacity = "0.55";
    };

    let rafId: number;
    const animate = () => {
      ringX += (targetX - ringX) * 0.18;
      ringY += (targetY - ringY) * 0.18;
      ring.style.transform = `translate3d(${ringX}px, ${ringY}px, 0) translate(-50%, -50%)`;
      rafId = requestAnimationFrame(animate);
    };
    rafId = requestAnimationFrame(animate);

    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseover", onOver);
    window.addEventListener("mouseout", onOut);
    document.addEventListener("mouseleave", onLeave);
    document.addEventListener("mouseenter", onEnter);

    return () => {
      document.documentElement.classList.remove("has-custom-cursor");
      cancelAnimationFrame(rafId);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseover", onOver);
      window.removeEventListener("mouseout", onOut);
      document.removeEventListener("mouseleave", onLeave);
      document.removeEventListener("mouseenter", onEnter);
    };
  }, [ready]);

  return (
    <>
      <div
        ref={dotRef}
        className="cursor-dot hidden md:block"
        style={{ opacity: ready ? undefined : 0 }}
      />
      <div
        ref={ringRef}
        className="cursor-ring hidden md:block"
        style={{ opacity: ready ? undefined : 0 }}
      />
    </>
  );
}
