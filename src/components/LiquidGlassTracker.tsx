"use client";

import { useEffect } from "react";

export default function LiquidGlassTracker() {
  useEffect(() => {
    // Only run on desktop devices with fine pointer (mouse/trackpad), never mobile touch
    const hasFinePointer = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (!hasFinePointer || prefersReducedMotion) return;

    let rafId: number | null = null;
    let currentCard: HTMLElement | null = null;
    let mouseX = 0;
    let mouseY = 0;

    const onPointerMove = (e: PointerEvent) => {
      const target = (e.target as HTMLElement)?.closest(".liquid-sheen") as HTMLElement | null;
      if (!target) return;

      currentCard = target;
      const rect = target.getBoundingClientRect();
      mouseX = e.clientX - rect.left;
      mouseY = e.clientY - rect.top;

      if (!rafId) {
        rafId = requestAnimationFrame(() => {
          if (currentCard) {
            currentCard.style.setProperty("--mouse-x", `${mouseX}px`);
            currentCard.style.setProperty("--mouse-y", `${mouseY}px`);
          }
          rafId = null;
        });
      }
    };

    window.addEventListener("pointermove", onPointerMove, { passive: true });

    return () => {
      window.removeEventListener("pointermove", onPointerMove);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, []);

  return null;
}
