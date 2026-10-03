"use client";

import Wordmark from "./Wordmark";
import { scrollToY } from "./SmoothScroll";

export default function Footer() {
  return (
    <footer className="relative z-[2] overflow-hidden px-5 pb-8 sm:px-10">
      <div className="mx-auto flex max-w-[92rem] flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <p className="eyebrow">© {new Date().getFullYear()} Jefer Setiawan</p>
        <p className="eyebrow">Fullstack Developer — Tangerang, ID</p>
        <button
          type="button"
          onClick={() => scrollToY(0)}
          data-cursor="Top"
          className="eyebrow underline-grow self-start !text-fg sm:self-auto"
        >
          Back to top ↑
        </button>
      </div>
      <a href="#top" data-cursor="Top" aria-label="Back to top" className="mt-6 block text-center lg:pr-0">
        <Wordmark className="block text-[38vw] leading-[0.74] text-fg sm:text-[34vw]" />
      </a>
    </footer>
  );
}
