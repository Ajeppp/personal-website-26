"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import useReady from "./useReady";
import { scrollToY } from "./SmoothScroll";

const chapters = [
  { id: "hero", label: "Intro" },
  { id: "about", label: "About" },
  { id: "expertise", label: "Expertise" },
  { id: "experience", label: "Experience" },
  { id: "work", label: "Work" },
  { id: "contact", label: "Contact" },
];

/** Viewfinder chrome: which chapter you are in, how far down, what time it is at home. */
export default function Hud() {
  const ready = useReady();
  const [active, setActive] = useState(0);
  const [time, setTime] = useState("");
  const pct = useRef<HTMLSpanElement>(null);
  const fill = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let raf = 0;
    const read = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const p = max > 0 ? Math.min(1, Math.max(0, window.scrollY / max)) : 0;
      if (pct.current) pct.current.textContent = String(Math.round(p * 100)).padStart(3, "0");
      if (fill.current) fill.current.style.transform = `scaleY(${p})`;

      const line = window.innerHeight * 0.5;
      let current = 0;
      chapters.forEach((c, i) => {
        const el = document.querySelector(`[data-chapter="${c.id}"]`);
        if (el && el.getBoundingClientRect().top <= line) current = i;
      });
      setActive(current);
    };
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(read);
    };
    read();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  useEffect(() => {
    const fmt = new Intl.DateTimeFormat("en-GB", {
      hour: "2-digit",
      minute: "2-digit",
      timeZone: "Asia/Jakarta",
    });
    const tick = () => setTime(fmt.format(new Date()));
    tick();
    const id = window.setInterval(tick, 20_000);
    return () => window.clearInterval(id);
  }, []);

  const jump = (id: string) => {
    const el = document.querySelector<HTMLElement>(`[data-chapter="${id}"]`);
    if (el) scrollToY(el.getBoundingClientRect().top + window.scrollY);
  };

  return (
    <motion.div
      aria-hidden="true"
      initial={{ opacity: 0 }}
      animate={{ opacity: ready ? 1 : 0 }}
      transition={{ duration: 1, delay: 1.2 }}
      className="pointer-events-none fixed inset-0 z-[45] hidden lg:block"
    >
      {/* chapter readout */}
      <div className="absolute bottom-5 left-8 flex items-center gap-3 rounded-full bg-bg/55 px-3 py-2 font-mono backdrop-blur-md text-[0.66rem] uppercase tracking-[0.2em] text-mute">
        <span className="text-accent">{String(active).padStart(2, "0")}</span>
        <span className="h-px w-6 bg-line-strong" />
        <span className="relative block h-4 w-28 overflow-hidden">
          <AnimatePresence initial={false}>
            <motion.span
              key={active}
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "-100%" }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="absolute inset-0 text-fg-2"
            >
              {chapters[active].label}
            </motion.span>
          </AnimatePresence>
        </span>
      </div>

      {/* depth + clock */}
      <div className="absolute bottom-5 right-8 flex items-center gap-4 rounded-full bg-bg/55 px-3 py-2 font-mono backdrop-blur-md text-[0.66rem] uppercase tracking-[0.2em] text-mute">
        <span>
          Tangerang <span className="text-fg-2">{time}</span> WIB
        </span>
        <span className="h-px w-6 bg-line-strong" />
        <span>
          <span ref={pct} className="text-fg-2">
            000
          </span>
          %
        </span>
      </div>

      {/* chapter rail */}
      <div className="pointer-events-auto absolute right-10 top-1/2 flex -translate-y-1/2 flex-col items-end gap-3">
        <div className="absolute -right-3 top-0 h-full w-px bg-line">
          <div ref={fill} className="h-full w-px origin-top scale-y-0 bg-accent" />
        </div>
        {chapters.map((c, i) => (
          <button
            key={c.id}
            type="button"
            tabIndex={-1}
            onClick={() => jump(c.id)}
            data-cursor={c.label}
            className="group flex h-4 items-center justify-end"
          >
            <span
              className={`block h-px transition-all duration-500 ${
                i === active ? "w-7 bg-accent" : "w-3 bg-line-strong group-hover:w-5 group-hover:bg-fg"
              }`}
            />
          </button>
        ))}
      </div>
    </motion.div>
  );
}
