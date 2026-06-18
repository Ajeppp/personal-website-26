"use client";

import { motion, type Variants } from "framer-motion";
import Portrait from "./Portrait";
import Magnetic from "./Magnetic";

const ease: [number, number, number, number] = [0.22, 1, 0.36, 1];

const lineMask: Variants = {
  hidden: { y: "115%" },
  show: (i: number) => ({
    y: 0,
    transition: { duration: 0.9, ease, delay: 0.3 + i * 0.12 },
  }),
};

const fade: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease, delay: 0.7 + i * 0.1 },
  }),
};

export default function Hero() {
  return (
    <section className="relative mx-auto max-w-7xl px-6 sm:px-10 pt-32 sm:pt-36 pb-20">
      {/* Meta row */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="flex items-center justify-between border-b border-border pb-5"
      >
        <span className="eyebrow">Portfolio — 2025</span>
        <span className="eyebrow hidden sm:block">Tangerang, Indonesia</span>
        <span className="eyebrow flex items-center gap-2">
          <span className="relative flex h-1.5 w-1.5">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-75" />
            <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-accent" />
          </span>
          Available
        </span>
      </motion.div>

      <div className="grid lg:grid-cols-12 gap-10 lg:gap-12 items-end mt-10 lg:mt-14">
        {/* Left — type */}
        <div className="lg:col-span-7 order-2 lg:order-1">
          <h1 className="font-display font-medium leading-[0.92] tracking-[-0.02em] text-[clamp(3.5rem,11vw,9rem)]">
            <span className="block overflow-hidden">
              <motion.span variants={lineMask} initial="hidden" animate="show" custom={0} className="block">
                Jefer
              </motion.span>
            </span>
            <span className="block overflow-hidden">
              <motion.span variants={lineMask} initial="hidden" animate="show" custom={1} className="block italic">
                Setiawan<span className="text-accent not-italic">.</span>
              </motion.span>
            </span>
          </h1>

          <motion.div
            variants={fade}
            initial="hidden"
            animate="show"
            custom={0}
            className="mt-8 max-w-xl"
          >
            <p className="text-lg sm:text-xl text-text-secondary leading-relaxed">
              Fullstack developer crafting reliable, scalable web applications —
              from databases and APIs to refined, human interfaces.
            </p>
          </motion.div>

          <motion.div
            variants={fade}
            initial="hidden"
            animate="show"
            custom={1}
            className="mt-9 flex flex-wrap items-center gap-4"
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
        </div>

        {/* Right — portrait */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="lg:col-span-5 order-1 lg:order-2 w-2/3 sm:w-1/2 lg:w-full ml-auto lg:ml-0"
        >
          <Portrait />
        </motion.div>
      </div>

      {/* Scroll cue */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4 }}
        className="mt-16 flex items-center gap-3 eyebrow"
      >
        <motion.span
          animate={{ y: [0, 5, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          ↓
        </motion.span>
        Scroll to explore
      </motion.div>
    </section>
  );
}
