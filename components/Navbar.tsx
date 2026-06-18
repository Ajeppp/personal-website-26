"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ThemeToggle from "./ThemeToggle";
import Wordmark from "./Wordmark";

const links = [
  { label: "About", href: "#about", num: "01" },
  { label: "Expertise", href: "#expertise", num: "02" },
  { label: "Work", href: "#work", num: "03" },
  { label: "Contact", href: "#contact", num: "04" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: "circOut" as const, delay: 0.1 }}
        className={`fixed top-0 left-0 right-0 z-50 transition-colors duration-500 ${
          scrolled
            ? "bg-bg/80 backdrop-blur-xl border-b border-border"
            : "border-b border-transparent"
        }`}
      >
        <nav className="mx-auto max-w-7xl px-6 sm:px-10 h-20 flex items-center justify-between">
          <a href="#" data-cursor="Home" className="leading-none">
            <Wordmark className="text-2xl" />
          </a>

          <div className="hidden md:flex items-center gap-9">
            {links.map((l) => (
              <a
                key={l.label}
                href={l.href}
                className="link-swap text-sm tracking-wide text-text-secondary"
              >
                <span>{l.label}</span>
                <span className="dup text-accent">{l.label}</span>
              </a>
            ))}
          </div>

          <div className="hidden md:flex items-center gap-3">
            <ThemeToggle />
            <a
              href="./CV_Jefer_Setiawan.pdf"
              data-cursor="Open"
              className="group inline-flex items-center gap-2 text-sm text-text-primary underline-grow"
            >
              Résumé
              <svg className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25" />
              </svg>
            </a>
          </div>

          <div className="flex items-center gap-3 md:hidden">
            <ThemeToggle />
            <button
              type="button"
              onClick={() => setOpen(!open)}
              aria-label="Menu"
              className="flex flex-col gap-[6px] p-2"
            >
              <span className={`block h-px w-6 bg-text-primary transition-all duration-300 ${open ? "translate-y-[3.5px] rotate-45" : ""}`} />
              <span className={`block h-px w-6 bg-text-primary transition-all duration-300 ${open ? "-translate-y-[3.5px] -rotate-45" : ""}`} />
            </button>
          </div>
        </nav>
      </motion.header>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ clipPath: "inset(0 0 100% 0)" }}
            animate={{ clipPath: "inset(0 0 0% 0)" }}
            exit={{ clipPath: "inset(0 0 100% 0)" }}
            transition={{ duration: 0.6, ease: [0.76, 0, 0.24, 1] }}
            className="fixed inset-0 z-40 bg-bg md:hidden flex flex-col justify-center px-8"
          >
            {links.map((l, i) => (
              <motion.a
                key={l.label}
                href={l.href}
                onClick={() => setOpen(false)}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 + i * 0.07, ease: "circOut" as const }}
                className="group flex items-baseline gap-4 border-b border-border py-5"
              >
                <span className="eyebrow">{l.num}</span>
                <span className="font-display text-4xl text-text-primary group-hover:text-accent transition-colors">
                  {l.label}
                </span>
              </motion.a>
            ))}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="mt-10 flex gap-6 eyebrow"
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
