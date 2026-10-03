"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence, animate } from "framer-motion";
import Wordmark from "./Wordmark";
import { lockScroll } from "./SmoothScroll";
import { markIntroDone } from "../lib/scene";

export default function Intro() {
  const [show, setShow] = useState(false);
  const counter = useRef<HTMLSpanElement>(null);
  const bar = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let seen = false;
    try {
      seen = sessionStorage.getItem("introSeen") === "1";
    } catch {}
    if (seen || window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      markIntroDone();
      return;
    }

    setShow(true);
    lockScroll(true);

    const controls = animate(0, 100, {
      duration: 1.9,
      ease: [0.65, 0, 0.35, 1],
      onUpdate: (v) => {
        if (counter.current) counter.current.textContent = String(Math.round(v)).padStart(3, "0");
        if (bar.current) bar.current.style.transform = `scaleX(${v / 100})`;
      },
      onComplete: () => {
        setShow(false);
        lockScroll(false);
        markIntroDone();
        try {
          sessionStorage.setItem("introSeen", "1");
        } catch {}
      },
    });

    return () => {
      controls.stop();
      lockScroll(false);
    };
  }, []);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          className="fixed inset-0 z-[100] flex flex-col justify-between bg-bg p-6 sm:p-10"
          exit={{ clipPath: "inset(0 0 100% 0)" }}
          initial={{ clipPath: "inset(0 0 0% 0)" }}
          transition={{ duration: 1, ease: [0.76, 0, 0.24, 1] }}
        >
          <div className="flex items-center justify-between eyebrow">
            <span>Jefer Setiawan</span>
            <span>Portfolio — 2026</span>
          </div>

          <motion.div
            initial={{ y: 40, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            className="self-center"
          >
            <Wordmark className="text-6xl sm:text-8xl text-text-primary" />
          </motion.div>

          <div>
            <div className="flex items-end justify-between">
              <span className="eyebrow">Loading the stack</span>
              <span
                ref={counter}
                className="font-display text-6xl sm:text-8xl font-semibold leading-none tracking-[-0.04em] tabular-nums"
              >
                000
              </span>
            </div>
            <div className="mt-4 h-px w-full bg-border">
              <div ref={bar} className="h-px w-full origin-left bg-accent" style={{ transform: "scaleX(0)" }} />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
