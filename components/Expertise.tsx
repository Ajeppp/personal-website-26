"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Reveal from "./Reveal";
import { SectionHead, Words } from "./Type";

const disciplines = [
  {
    num: "01",
    title: "Frontend Engineering",
    blurb: "Building fast, accessible, animation-driven interfaces with modern frameworks.",
    tools: ["React", "Next.js", "Vue.js", "TypeScript", "Tailwind CSS"],
  },
  {
    num: "02",
    title: "Backend & APIs",
    blurb: "Designing scalable services, RESTful APIs, and authentication that hold up in production.",
    tools: ["Laravel", "Golang (Gin)", "Node.js", "PHP", "Java", "JWT"],
  },
  {
    num: "03",
    title: "Databases & Data",
    blurb: "Modeling data and tuning queries — from ORMs to complex raw SQL — for speed and stability.",
    tools: ["PostgreSQL", "MySQL", "GORM", "Eloquent ORM"],
  },
  {
    num: "04",
    title: "Systems & Delivery",
    blurb: "Shipping with good practices: version control, CI/CD, OOP, and agile collaboration.",
    tools: ["Git", "CI/CD", "Agile", "OOP", "System Design"],
  },
];

const ease: [number, number, number, number] = [0.16, 1, 0.3, 1];

export default function Expertise() {
  const [active, setActive] = useState<number | null>(0);

  return (
    <section id="expertise" data-chapter="expertise" className="relative z-[2] px-5 py-28 sm:px-10 sm:py-40">
      <div className="mx-auto max-w-[92rem]">
        <div className="flex flex-wrap items-end justify-between gap-8">
          <div>
            <SectionHead num="02" label="Expertise" />
            <Words
              as="h2"
              text="Every *layer* of the stack."
              className="display mt-8 block text-[clamp(3rem,8.4vw,8.5rem)] text-fg"
            />
          </div>
          <Reveal className="max-w-xs pb-3 text-fg-2">
            A fullstack toolkit, sharpened across freelance studios, banking, and payment
            infrastructure.
          </Reveal>
        </div>

        <div className="mt-14 border-b border-line">
          {disciplines.map((d, i) => {
            const open = active === i;
            return (
              <motion.div
                key={d.num}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.8, ease, delay: i * 0.07 }}
              >
                <div
                  data-open={open}
                  onMouseEnter={() => setActive(i)}
                  onClick={() => setActive(open ? null : i)}
                  className={`flood cursor-pointer border-t border-line transition-colors duration-500 ${
                    open ? "text-bg" : "text-fg"
                  }`}
                >
                  <div className="flex items-center gap-4 px-2 py-5 sm:gap-8 sm:px-6 sm:py-7">
                    <span className={`font-mono text-xs tracking-[0.2em] ${open ? "text-bg/60" : "text-mute"}`}>
                      {d.num}
                    </span>
                    <h3 className="display text-[clamp(2rem,6vw,5.5rem)]">{d.title}</h3>
                    <motion.span
                      animate={{ rotate: open ? 45 : 0 }}
                      transition={{ duration: 0.5, ease }}
                      className="ml-auto text-3xl font-light sm:text-5xl"
                    >
                      +
                    </motion.span>
                  </div>

                  <AnimatePresence initial={false}>
                    {open && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.55, ease }}
                        className="overflow-hidden"
                      >
                        <div className="grid gap-5 px-2 pb-8 sm:grid-cols-12 sm:px-6">
                          <p className="text-base leading-relaxed text-bg/80 sm:col-span-5 sm:col-start-2 sm:text-lg">
                            {d.blurb}
                          </p>
                          <div className="flex flex-wrap content-start gap-2 sm:col-span-5 sm:col-start-8">
                            {d.tools.map((t, k) => (
                              <motion.span
                                key={t}
                                initial={{ opacity: 0, y: 12 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, ease, delay: 0.12 + k * 0.045 }}
                                className="rounded-full bg-bg px-3.5 py-1.5 font-mono text-[0.7rem] uppercase tracking-[0.14em] text-accent"
                              >
                                {t}
                              </motion.span>
                            ))}
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
