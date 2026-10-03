"use client";

import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import { animate, motion, AnimatePresence } from "framer-motion";
import Wordmark from "./Wordmark";
import { lockScroll } from "./SmoothScroll";
import { markReady } from "../lib/stage";

const ease: [number, number, number, number] = [0.76, 0, 0.24, 1];

// Decided once per page load: returning visitors (this tab) and reduced-motion
// users go straight to the page. Cached so finishing the intro can't flip it.
let skipIntro: boolean | null = null;
const readSkip = () => {
  if (skipIntro === null) {
    let seen = false;
    try {
      seen = sessionStorage.getItem("introSeen") === "1";
    } catch {}
    skipIntro = seen || window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  }
  return skipIntro;
};
const never = () => () => {};

export default function Intro() {
  // The server renders the curtain, so the page never flashes before it.
  const skip = useSyncExternalStore(never, readSkip, () => false);
  const [done, setDone] = useState(false);
  const count = useRef<HTMLSpanElement>(null);
  const bar = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (skip) {
      markReady();
      return;
    }

    lockScroll(true);
    const controls = animate(0, 100, {
      duration: 1.9,
      ease: [0.65, 0, 0.35, 1],
      onUpdate: (v) => {
        if (count.current) count.current.textContent = String(Math.round(v)).padStart(3, "0");
        if (bar.current) bar.current.style.transform = `scaleX(${v / 100})`;
      },
      onComplete: () => {
        setDone(true);
        // the ribbon starts drawing while the curtain is still lifting
        markReady();
        lockScroll(false);
        try {
          sessionStorage.setItem("introSeen", "1");
        } catch {}
      },
    });

    return () => {
      controls.stop();
      lockScroll(false);
    };
  }, [skip]);

  if (skip) return null;

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          className="fixed inset-0 z-[100] flex flex-col justify-between bg-bg px-5 py-6 sm:px-10 sm:py-8"
          exit={{ clipPath: "inset(0 0 100% 0)" }}
          initial={{ clipPath: "inset(0 0 0% 0)" }}
          transition={{ duration: 1, ease }}
        >
          <div className="flex items-start justify-between">
            <Wordmark className="text-3xl text-fg" />
            <span className="eyebrow text-right">
              Portfolio
              <br />
              2026
            </span>
          </div>

          <div>
            <div className="flex items-end justify-between gap-6">
              <motion.span
                ref={count}
                exit={{ y: "-30%", opacity: 0 }}
                transition={{ duration: 0.6, ease }}
                className="display block text-[34vw] leading-[0.78] text-fg sm:text-[22vw]"
              >
                000
              </motion.span>
              <span className="eyebrow mb-3 hidden text-right sm:block">
                Loading the flow
                <br />
                <span className="text-accent">Fullstack Developer</span>
              </span>
            </div>
            <div className="mt-5 h-px w-full bg-line">
              <div ref={bar} className="h-px origin-left scale-x-0 bg-accent" />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
