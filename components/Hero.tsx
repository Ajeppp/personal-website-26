"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Magnetic from "./Magnetic";
import useReady from "./useReady";

const ease: [number, number, number, number] = [0.16, 1, 0.3, 1];

/** One line of the name: every letter climbs out of the line's own mask. */
function Line({ text, delay, show, children }: { text: string; delay: number; show: boolean; children?: React.ReactNode }) {
  return (
    <span className="-my-[0.06em] block overflow-hidden py-[0.06em]" aria-hidden="true">
      {text.split("").map((ch, i) => (
        <motion.span
          key={i}
          className="inline-block"
          initial={{ y: "112%" }}
          animate={{ y: show ? "0%" : "112%" }}
          transition={{ duration: 1.1, ease, delay: delay + i * 0.045 }}
        >
          {ch}
        </motion.span>
      ))}
      {children}
    </span>
  );
}

export default function Hero() {
  const ready = useReady();
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "28%"]);
  const fade = useTransform(scrollYProgress, [0, 0.75], [1, 0]);
  const spread = useTransform(scrollYProgress, [0, 1], ["-0.012em", "0.05em"]);

  const rise = (i: number) => ({
    initial: { opacity: 0, y: 24 },
    animate: ready ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 },
    transition: { duration: 0.9, ease, delay: 0.75 + i * 0.1 },
  });

  return (
    <section
      ref={ref}
      id="top"
      data-chapter="hero"
      className="relative flex min-h-[100svh] flex-col px-5 pb-7 pt-20 sm:px-10 lg:pb-[4.5rem]"
    >
      {/* The name sits BEHIND the WebGL canvas, so the ribbon ties itself in front of the letters. */}
      <motion.h1
        style={{ y, opacity: fade, letterSpacing: spread }}
        aria-label="Jefer Setiawan"
        className="display relative z-0 mt-auto flex select-none flex-col whitespace-nowrap pt-[36svh] text-[25.5vw] leading-[0.8] text-fg md:pt-0 md:text-[min(24.2vw,38.5svh)]"
      >
        <Line text="Jefer" delay={0.1} show={ready} />
        <Line text="Setiawan" delay={0.3} show={ready}>
          <motion.span
            className="inline-block text-accent"
            initial={{ scale: 0 }}
            animate={{ scale: ready ? 1 : 0 }}
            transition={{ type: "spring", stiffness: 260, damping: 14, delay: 1.25 }}
          >
            .
          </motion.span>
        </Line>
      </motion.h1>

      {/* pitch + actions */}
      <div className="relative z-[2] mt-6 grid items-end gap-6 md:mt-7 md:grid-cols-12">
        <motion.div {...rise(0)} className="md:col-span-5">
          <p className="eyebrow">Fullstack Developer — Tangerang, Indonesia</p>
          <p className="mt-3 max-w-md text-base leading-relaxed text-fg-2 sm:text-lg">
            I build reliable, scalable web applications — from databases and APIs to refined,{" "}
            <span className="serif-i text-[1.15em] text-fg">human</span> interfaces.
          </p>
        </motion.div>

        <motion.div {...rise(1)} className="flex flex-wrap items-center gap-3 md:col-span-4">
          <Magnetic>
            <a
              href="#work"
              data-cursor="Dive in"
              className="group inline-flex items-center gap-3 rounded-full bg-accent px-6 py-3.5 text-sm font-semibold text-bg"
            >
              See the work
              <span className="flex h-5 w-5 items-center justify-center overflow-hidden">
                <svg className="h-4 w-4 transition-transform duration-500 group-hover:translate-y-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m0 0l-6-6m6 6l6-6" />
                </svg>
              </span>
            </a>
          </Magnetic>
          <Magnetic>
            <a
              href="./CV_Jefer_Setiawan.pdf"
              data-cursor="Open"
              className="inline-flex items-center gap-2 rounded-full border border-line-strong bg-bg/40 px-6 py-3.5 text-sm text-fg backdrop-blur-sm transition-colors duration-300 hover:border-fg"
            >
              Download CV
            </a>
          </Magnetic>
        </motion.div>

        <motion.div {...rise(2)} className="flex items-center justify-between gap-6 md:col-span-3 md:flex-col md:items-end md:gap-3">
          <span className="eyebrow flex items-center gap-2 !text-fg-2">
            <span className="relative flex h-1.5 w-1.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-75" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-accent" />
            </span>
            Available for work
          </span>
          <span className="eyebrow flex items-center gap-3">
            Scroll
            <span className="relative block h-px w-9 overflow-hidden bg-line-strong">
              <motion.span
                className="absolute inset-y-0 left-0 w-3 bg-accent"
                animate={{ x: ["-100%", "300%"] }}
                transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
              />
            </span>
          </span>
        </motion.div>
      </div>
    </section>
  );
}
