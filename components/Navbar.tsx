"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence, useMotionValueEvent, useScroll } from "framer-motion";
import Wordmark from "./Wordmark";
import useReady from "./useReady";
import { lockScroll } from "./SmoothScroll";

const links = [
  { label: "About", href: "#about", num: "01" },
  { label: "Expertise", href: "#expertise", num: "02" },
  { label: "Experience", href: "#experience", num: "03" },
  { label: "Work", href: "#work", num: "04" },
  { label: "Contact", href: "#contact", num: "05" },
];

const ease: [number, number, number, number] = [0.76, 0, 0.24, 1];

export default function Navbar() {
  const ready = useReady();
  const [hidden, setHidden] = useState(false);
  const [open, setOpen] = useState(false);
  const { scrollY } = useScroll();

  // step aside while travelling down, come back on the way up
  useMotionValueEvent(scrollY, "change", (y) => {
    const prev = scrollY.getPrevious() ?? 0;
    setHidden(y > 160 && y > prev);
  });

  useEffect(() => {
    lockScroll(open);
    return () => lockScroll(false);
  }, [open]);

  return (
    <>
      <motion.header
        initial={{ y: "-110%" }}
        animate={{ y: !ready || (hidden && !open) ? "-110%" : "0%" }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        className="fixed inset-x-0 top-0 z-50"
      >
        <div className="pointer-events-none absolute inset-x-0 top-0 h-28 bg-gradient-to-b from-bg/85 to-transparent" />
        <nav className="relative flex h-16 items-center justify-between px-5 sm:h-20 sm:px-10">
          <a href="#top" data-cursor="Top" aria-label="Jefer Setiawan — home">
            <Wordmark className="text-[1.75rem] text-fg" />
          </a>

          <div className="hidden items-center gap-8 md:flex">
            {links.map((l) => (
              <a key={l.label} href={l.href} className="link-swap font-mono text-[0.72rem] uppercase tracking-[0.18em] text-fg-2">
                <span>{l.label}</span>
                <span className="dup text-accent">{l.label}</span>
              </a>
            ))}
          </div>

          <a
            href="./CV_Jefer_Setiawan.pdf"
            data-cursor="Open"
            className="group hidden items-center gap-2 rounded-full border border-line-strong px-4 py-2 font-mono text-[0.72rem] uppercase tracking-[0.18em] text-fg transition-colors duration-300 hover:border-accent hover:bg-accent hover:text-bg md:inline-flex"
          >
            Résumé
            <svg className="h-3 w-3 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25" />
            </svg>
          </a>

          <button
            type="button"
            onClick={() => setOpen(!open)}
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            className="flex items-center gap-3 font-mono text-[0.72rem] uppercase tracking-[0.18em] text-fg md:hidden"
          >
            {open ? "Close" : "Menu"}
            <span className="flex flex-col gap-[5px]">
              <span className={`block h-px w-6 bg-fg transition-transform duration-300 ${open ? "translate-y-[3px] rotate-45" : ""}`} />
              <span className={`block h-px w-6 bg-fg transition-transform duration-300 ${open ? "-translate-y-[3px] -rotate-45" : ""}`} />
            </span>
          </button>
        </nav>
      </motion.header>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ clipPath: "inset(0 0 100% 0)" }}
            animate={{ clipPath: "inset(0 0 0% 0)" }}
            exit={{ clipPath: "inset(0 0 100% 0)" }}
            transition={{ duration: 0.7, ease }}
            className="fixed inset-0 z-40 flex flex-col justify-end bg-bg px-5 pb-10 pt-24 md:hidden"
          >
            {links.map((l, i) => (
              <a
                key={l.label}
                href={l.href}
                onClick={() => setOpen(false)}
                className="flex items-baseline gap-4 overflow-hidden border-t border-line py-3"
              >
                <span className="eyebrow">{l.num}</span>
                <motion.span
                  initial={{ y: "110%" }}
                  animate={{ y: 0 }}
                  transition={{ delay: 0.25 + i * 0.06, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                  className="display block text-[3.4rem] text-fg"
                >
                  {l.label}
                </motion.span>
              </a>
            ))}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7 }}
              className="eyebrow mt-8 flex gap-6"
            >
              <a href="https://github.com/Ajeppp" target="_blank" rel="noopener noreferrer">GitHub</a>
              <a href="https://www.linkedin.com/in/jefer-setiawan/" target="_blank" rel="noopener noreferrer">LinkedIn</a>
              <a href="./CV_Jefer_Setiawan.pdf">Résumé</a>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
