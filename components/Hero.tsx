"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Magnetic from "./Magnetic";
import { Chars } from "./Type";
import useIntroReady from "./useIntroReady";

const ease: [number, number, number, number] = [0.22, 1, 0.36, 1];

export default function Hero() {
  const ready = useIntroReady();
  const ref = useRef<HTMLElement>(null);

  // The headline sinks back and fades as the page scrolls away from it
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "-18%"]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.88]);
  const opacity = useTransform(scrollYProgress, [0, 0.75], [1, 0]);

  const fade = (i: number) => ({
    initial: { opacity: 0, y: 24 },
    animate: ready ? { opacity: 1, y: 0 } : undefined,
    transition: { duration: 0.9, ease, delay: 0.75 + i * 0.1 },
  });

  return (
    <section
      ref={ref}
      data-stage="0"
      className="relative flex min-h-svh flex-col justify-between px-6 sm:px-10 pt-28 pb-8"
    >
      {/* Meta row */}
      <motion.div {...fade(3)} className="flex items-center justify-between">
        <span className="eyebrow">Portfolio — 2026</span>
        <span className="eyebrow hidden sm:block">6.18° S, 106.63° E — Tangerang</span>
        <span className="eyebrow flex items-center gap-2">
          <span className="relative flex h-1.5 w-1.5">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-75" />
            <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-accent" />
          </span>
          Available
        </span>
      </motion.div>

      <motion.div style={{ y, scale, opacity }} className="origin-left">
        <motion.p {...fade(0)} className="eyebrow mb-4 sm:mb-6 !text-text-secondary">
          Fullstack developer
        </motion.p>
        <h1 className="text-[clamp(4rem,16.5vw,17rem)] leading-[0.84] tracking-[-0.055em]">
          <span className="block font-display font-bold">
            <Chars text="Jefer" show={ready} delay={0.1} />
          </span>
          <span className="block font-serif font-light italic tracking-[-0.04em] sm:pl-[9vw]">
            <Chars text="Setiawan" show={ready} delay={0.3} />
          </span>
        </h1>
      </motion.div>

      <div className="grid grid-cols-12 items-end gap-6">
        <motion.p
          {...fade(1)}
          className="col-span-12 md:col-span-5 text-base sm:text-lg text-text-secondary leading-relaxed"
        >
          I build reliable, scalable web applications — from databases and APIs
          up to refined, human interfaces.
        </motion.p>

        <motion.div
          {...fade(2)}
          className="col-span-12 md:col-span-5 md:col-start-7 flex flex-wrap items-center gap-4"
        >
          <Magnetic>
            <a
              href="#contact"
              data-cursor="Say hi"
              className="group inline-flex items-center gap-3 rounded-full bg-accent px-7 py-3.5 text-sm font-medium text-bg transition-colors hover:bg-accent-hover"
            >
              Get in touch
              <svg className="w-4 h-4 transition-transform group-hover:translate-x-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </a>
          </Magnetic>
          <Magnetic>
            <a
              href="./CV_Jefer_Setiawan.pdf"
              data-cursor="Open"
              className="inline-flex items-center gap-2 px-3 py-3.5 text-sm text-text-primary underline-grow"
            >
              Download CV
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
            </a>
          </Magnetic>
        </motion.div>

        <motion.div
          {...fade(4)}
          className="hidden md:flex col-span-1 col-start-12 justify-end items-center gap-3 eyebrow"
        >
          <motion.span
            animate={{ y: [0, 6, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          >
            ↓
          </motion.span>
          Scroll
        </motion.div>
      </div>
    </section>
  );
}
