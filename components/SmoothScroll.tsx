"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import "lenis/dist/lenis.css";

const scroller: { lenis: Lenis | null } = { lenis: null };

/** Freeze / release page scroll (intro curtain, mobile menu). */
export function lockScroll(locked: boolean) {
  document.body.style.overflow = locked ? "hidden" : "";
  if (locked) scroller.lenis?.stop();
  else scroller.lenis?.start();
}

export function scrollToTop() {
  if (scroller.lenis) scroller.lenis.scrollTo(0, { duration: 1.6 });
  else window.scrollTo({ top: 0, behavior: "smooth" });
}

export default function SmoothScroll() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const lenis = new Lenis({ lerp: 0.09, autoRaf: true, anchors: true });
    scroller.lenis = lenis;
    return () => {
      lenis.destroy();
      scroller.lenis = null;
    };
  }, []);

  return null;
}
