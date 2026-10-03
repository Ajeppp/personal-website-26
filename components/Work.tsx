"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { projects } from "../lib/projects";
import { deckProgress } from "../lib/stage";
import { scrollToY } from "./SmoothScroll";
import { SectionHead } from "./Type";

const ease: [number, number, number, number] = [0.16, 1, 0.3, 1];
/** viewport heights of scroll each project is given while the stage is pinned */
const PER = 115;

/**
 * Pinned stage. The devices themselves live in the WebGL scene (three/Deck);
 * this is the copy that travels with them, driven by the same scroll maths.
 */
export default function Work() {
  const ref = useRef<HTMLElement>(null);
  const bar = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const count = projects.length;

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let raf = 0;
    const read = () => {
      const p = deckProgress(el, count);
      setActive(Math.min(count - 1, Math.max(0, Math.round(p))));
      if (bar.current) {
        const done = Math.min(1, Math.max(0, p / (count - 1)));
        bar.current.style.transform = `scaleX(${done})`;
      }
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
  }, [count]);

  const jump = (i: number) => {
    const el = ref.current;
    if (!el) return;
    const top = el.getBoundingClientRect().top + window.scrollY;
    const span = el.offsetHeight - window.innerHeight;
    scrollToY(top + ((i + 0.2) / count) * span);
  };

  const p = projects[active];

  return (
    <section
      ref={ref}
      id="work"
      data-chapter="work"
      className="relative z-[2]"
      style={{ height: `${count * PER + 100}vh` }}
    >
      <div className="sticky top-0 flex h-[100svh] flex-col overflow-hidden px-5 pb-6 pt-20 sm:px-10 sm:pt-24 lg:pb-16">
        <div className="flex items-center justify-between">
          <SectionHead num="04" label="Selected work" />
          <span className="font-mono text-[0.7rem] uppercase tracking-[0.2em] text-mute">
            <span className="text-fg">{p.num}</span> / 0{count}
          </span>
        </div>

        {/* copy: bottom half on phones (the device floats above), left column on desktop */}
        <div className="relative mt-auto md:my-auto md:w-[46%] lg:w-[42%]">
          <AnimatePresence mode="wait">
            <motion.div
              key={p.num}
              initial="hidden"
              animate="show"
              exit="gone"
              variants={{ show: { transition: { staggerChildren: 0.06 } } }}
            >
              <motion.div
                variants={{
                  hidden: { opacity: 0, y: 16 },
                  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease } },
                  gone: { opacity: 0, transition: { duration: 0.2 } },
                }}
                className="eyebrow flex flex-wrap items-center gap-x-3 gap-y-1"
              >
                <span className="!text-accent">{p.year}</span>
                <span className="h-px w-6 bg-line-strong" />
                <span>{p.subtitle}</span>
              </motion.div>

              <div className="-my-[0.08em] mt-3 overflow-hidden py-[0.08em]">
                <motion.h3
                  variants={{
                    hidden: { y: "110%" },
                    show: { y: 0, transition: { duration: 0.9, ease } },
                    gone: { y: "-110%", transition: { duration: 0.3, ease: [0.7, 0, 0.84, 0] } },
                  }}
                  className="display text-[clamp(3.6rem,10vw,9.5rem)] text-fg"
                >
                  {p.title}
                </motion.h3>
              </div>

              <motion.p
                variants={{
                  hidden: { opacity: 0, y: 16 },
                  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease } },
                  gone: { opacity: 0, transition: { duration: 0.2 } },
                }}
                className="mt-4 max-w-lg text-sm leading-relaxed text-fg-2 sm:text-base md:mt-6"
              >
                {p.description}
              </motion.p>

              <motion.ul
                variants={{
                  hidden: { opacity: 0, y: 16 },
                  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease } },
                  gone: { opacity: 0, transition: { duration: 0.2 } },
                }}
                className="mt-5 hidden space-y-1.5 font-mono text-[0.72rem] uppercase tracking-[0.12em] text-fg-2 md:block"
              >
                {p.points.map((pt) => (
                  <li key={pt} className="flex gap-3">
                    <span className="text-accent">+</span>
                    {pt}
                  </li>
                ))}
              </motion.ul>

              <motion.div
                variants={{
                  hidden: { opacity: 0, y: 16 },
                  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease } },
                  gone: { opacity: 0, transition: { duration: 0.2 } },
                }}
                className="mt-5 flex flex-wrap gap-1.5 md:mt-6"
              >
                {p.tags.map((t) => (
                  <span
                    key={t}
                    className="rounded-full border border-line-strong bg-bg/60 px-3 py-1 font-mono text-[0.62rem] uppercase tracking-[0.12em] text-fg-2 backdrop-blur-sm"
                  >
                    {t}
                  </span>
                ))}
              </motion.div>

              <motion.div
                variants={{
                  hidden: { opacity: 0, y: 16 },
                  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease } },
                  gone: { opacity: 0, transition: { duration: 0.2 } },
                }}
                className="mt-5 flex items-center gap-5 md:mt-7"
              >
                {p.link ? (
                  <a
                    href={p.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    data-cursor="Visit"
                    className="group inline-flex items-center gap-2 rounded-full bg-fg px-5 py-2.5 text-sm font-semibold text-bg transition-colors duration-300 hover:bg-accent"
                  >
                    {p.linkLabel ?? "Visit site"}
                    <svg className="h-3.5 w-3.5 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25" />
                    </svg>
                  </a>
                ) : (
                  <span className="inline-flex items-center gap-2 rounded-full border border-line-strong px-5 py-2.5 text-sm text-fg-2">
                    <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M7 11V8a5 5 0 0110 0v3M6 11h12v9H6z" />
                    </svg>
                    {p.status ?? "Private build"}
                  </span>
                )}
                <span className="eyebrow hidden sm:block">{p.role}</span>
              </motion.div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* index */}
        <div className="relative mt-6 lg:mr-24">
          <div className="hidden grid-cols-5 gap-3 md:grid">
            {projects.map((proj, i) => (
              <button
                key={proj.num}
                type="button"
                onClick={() => jump(i)}
                data-cursor="Jump"
                className={`pb-3 text-left font-mono text-[0.66rem] uppercase tracking-[0.18em] transition-colors duration-500 ${
                  i === active ? "text-fg" : "text-mute hover:text-fg-2"
                }`}
              >
                <span className={i === active ? "text-accent" : ""}>{proj.num}</span> {proj.title}
              </button>
            ))}
          </div>
          <div className="h-px w-full bg-line">
            <div ref={bar} className="h-px origin-left scale-x-0 bg-accent" />
          </div>
        </div>
      </div>
    </section>
  );
}
