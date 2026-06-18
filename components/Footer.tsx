"use client";

import Wordmark from "./Wordmark";

export default function Footer() {
  return (
    <footer className="relative z-[2] mx-auto max-w-7xl px-6 sm:px-10 pb-12">
      <div className="flex flex-col gap-10 border-t border-border pt-10">
        <div className="flex items-end justify-between gap-6">
          <a href="#" data-cursor="Top" className="leading-[0.8]">
            <Wordmark className="text-6xl sm:text-8xl text-text-primary" />
          </a>
          <button
            type="button"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            data-cursor="Top"
            className="eyebrow underline-grow shrink-0"
          >
            Back to top ↑
          </button>
        </div>

        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <p className="eyebrow">© {new Date().getFullYear()} Jefer Setiawan</p>
          <p className="eyebrow">Fullstack Developer — Tangerang, ID</p>
          <p className="eyebrow">Fraunces · Geist · Next.js</p>
        </div>
      </div>
    </footer>
  );
}
