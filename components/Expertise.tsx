"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import TextReveal from "./TextReveal";

const disciplines = [
  {
    num: "01",
    title: "Frontend Engineering",
    blurb:
      "Building fast, accessible, animation-driven interfaces with modern frameworks.",
    tools: ["React", "Next.js", "Vue.js", "TypeScript", "Tailwind CSS"],
  },
  {
    num: "02",
    title: "Backend & APIs",
    blurb:
      "Designing scalable services, RESTful APIs, and authentication that hold up in production.",
    tools: ["Laravel", "Golang (Gin)", "Node.js", "PHP", "Java", "JWT"],
  },
  {
    num: "03",
    title: "Databases & Data",
    blurb:
      "Modeling data and tuning queries — from ORMs to complex raw SQL — for speed and stability.",
    tools: ["PostgreSQL", "MySQL", "GORM", "Eloquent ORM"],
  },
  {
    num: "04",
    title: "Systems & Delivery",
    blurb:
      "Shipping with good practices: version control, CI/CD, OOP, and agile collaboration.",
    tools: ["Git", "CI/CD", "Agile", "OOP", "System Design"],
  },
];

export default function Expertise() {
  const [active, setActive] = useState<number | null>(0);

  return (
    <section id="expertise" className="mx-auto max-w-7xl px-6 sm:px-10 py-24 sm:py-32">
      <div className="flex items-baseline gap-4 border-t border-border pt-6">
        <span className="eyebrow">(02)</span>
        <span className="eyebrow">Expertise</span>
      </div>

      <div className="mt-10 lg:mt-12 grid lg:grid-cols-12 gap-8">
        <div className="lg:col-span-4">
          <TextReveal
            as="h2"
            className="font-display text-4xl sm:text-5xl leading-[1.02] tracking-[-0.01em]"
          >
            What I do
          </TextReveal>
          <p className="mt-5 text-text-secondary max-w-sm">
            A fullstack toolkit, sharpened across freelance studios, banking, and
            payment infrastructure.
          </p>
        </div>

        <div className="lg:col-span-8">
          {disciplines.map((d, i) => {
            const open = active === i;
            return (
              <div
                key={d.num}
                onMouseEnter={() => setActive(i)}
                onClick={() => setActive(open ? null : i)}
                data-cursor={open ? undefined : "Open"}
                className="group border-t border-border last:border-b cursor-pointer"
              >
                <div className="flex items-center gap-5 py-6">
                  <span className="eyebrow w-8 shrink-0">{d.num}</span>
                  <h3
                    className={`font-display text-2xl sm:text-4xl tracking-[-0.01em] transition-colors duration-300 ${
                      open ? "text-accent" : "text-text-primary group-hover:text-accent"
                    }`}
                  >
                    {d.title}
                  </h3>
                  <motion.span
                    animate={{ rotate: open ? 45 : 0 }}
                    transition={{ duration: 0.3 }}
                    className="ml-auto text-2xl text-text-muted"
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
                      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                      className="overflow-hidden"
                    >
                      <div className="pb-8 pl-13 sm:pl-[3.25rem] max-w-2xl">
                        <p className="text-text-secondary leading-relaxed">
                          {d.blurb}
                        </p>
                        <div className="mt-4 flex flex-wrap gap-2">
                          {d.tools.map((t) => (
                            <span
                              key={t}
                              className="rounded-full border border-border px-3 py-1 text-xs text-text-secondary"
                            >
                              {t}
                            </span>
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
