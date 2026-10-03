"use client";

import Wordmark from "./Wordmark";
import { scrollToTop } from "./SmoothScroll";

export default function Footer() {
  return (
    <footer className="relative z-[2] mx-auto max-w-7xl px-6 sm:px-10 pb-12">
      <div className="flex flex-col gap-10 border-t border-border pt-10">
        <div className="flex items-end justify-between gap-6">
          <a href="#" data-cursor="Top" className="leading-[0.8]">
            <Wordmark className="text-[clamp(4rem,16vw,14rem)] leading-[0.8] text-text-primary" />
          </a>
          <button
            type="button"
            onClick={scrollToTop}
            data-cursor="Top"
            className="eyebrow underline-grow shrink-0"
          >
            Back to top ↑
          </button>
        </div>

        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <p className="eyebrow">© {new Date().getFullYear()} Jefer Setiawan</p>
          <p className="eyebrow">Fullstack Developer — Tangerang, ID</p>
          <p className="eyebrow">Three.js · Next.js · Motion</p>
        </div>
      </div>
    </footer>
  );
}
