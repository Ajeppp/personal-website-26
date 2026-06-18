"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView, useMotionValue, useSpring } from "framer-motion";
import TextReveal from "./TextReveal";
import Magnetic from "./Magnetic";

function Counter({ target, label }: { target: number; label: string }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  const val = useMotionValue(0);
  const spring = useSpring(val, { stiffness: 40, damping: 25 });
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (inView) val.set(target);
  }, [inView, target, val]);

  useEffect(() => {
    const unsub = spring.on("change", (v) => setDisplay(Math.round(v)));
    return unsub;
  }, [spring]);

  return (
    <div ref={ref} className="text-center">
      <div className="text-3xl sm:text-4xl font-bold text-text-primary">
        {display}
        <span className="text-accent">+</span>
      </div>
      <div className="text-xs uppercase tracking-[0.2em] text-text-muted mt-1">
        {label}
      </div>
    </div>
  );
}

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12, delayChildren: 0.3 } },
};
const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "circOut" as const } },
};

export default function Hero() {
  return (
    <section className="relative min-h-screen flex flex-col justify-center">
      <div className="mx-auto max-w-6xl px-6 w-full py-32">
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="space-y-8"
        >
          {/* Status badge */}
          <motion.div variants={fadeUp} className="flex items-center gap-3">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full rounded-full bg-teal-400 opacity-75 animate-ping" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-teal-500" />
            </span>
            <span className="text-sm text-text-secondary tracking-wide">
              Open to opportunities
            </span>
          </motion.div>

          {/* Name — massive display type with per-word gradient reveal */}
          <TextReveal
            as="h1"
            gradient
            className="text-[clamp(3rem,10vw,8rem)] font-bold leading-[1.05] tracking-tight"
            delay={0.4}
          >
            JEFER SETIAWAN
          </TextReveal>

          {/* Subtitle + description */}
          <motion.div variants={fadeUp} className="max-w-2xl space-y-4">
            <p className="text-xl sm:text-2xl font-medium text-text-secondary">
              Fullstack Developer
            </p>
            <p className="text-base sm:text-lg text-text-muted leading-relaxed">
              I build reliable systems from database to interface. Currently at{" "}
              <span className="text-text-secondary">Singapay</span> working on
              payment infrastructure, and co-founding{" "}
              <span className="text-text-secondary">Hesed Tech</span> to craft
              modern web experiences.
            </p>
          </motion.div>

          {/* CTAs */}
          <motion.div variants={fadeUp} className="flex flex-wrap gap-4 pt-2">
            <Magnetic>
              <a
                href="#contact"
                className="group inline-flex items-center gap-2.5 px-7 py-3.5 rounded-full bg-accent text-[#060606] font-semibold text-sm hover:shadow-[0_0_30px_rgba(20,184,166,0.3)] transition-shadow duration-300"
              >
                Get in Touch
                <svg className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </a>
            </Magnetic>
            <Magnetic>
              <a
                href="./CV_Jefer_Setiawan.pdf"
                className="inline-flex items-center gap-2.5 px-7 py-3.5 rounded-full text-sm font-medium text-text-secondary border border-border hover:border-text-muted hover:text-text-primary transition-all duration-300"
              >
                Download CV
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                </svg>
              </a>
            </Magnetic>
          </motion.div>

          {/* Stats */}
          <motion.div variants={fadeUp} className="pt-8 flex gap-12 sm:gap-16">
            <Counter target={4} label="Companies" />
            <Counter target={3} label="Projects" />
            <Counter target={2} label="Years Exp" />
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
        >
          <svg className="w-5 h-5 text-text-muted" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 13.5L12 21m0 0l-7.5-7.5M12 21V3" />
          </svg>
        </motion.div>
      </motion.div>
    </section>
  );
}
