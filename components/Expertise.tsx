"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Words } from "./Type";
import { setActiveLayer } from "../lib/scene";

// Ordered top-to-bottom: each one is a layer of the 3D stack beside the list.
const layers = [
  {
    num: "L1",
    title: "Frontend Engineering",
    blurb:
      "Building fast, accessible, animation-driven interfaces with modern frameworks.",
    tools: ["React", "Next.js", "Vue.js", "TypeScript", "Tailwind CSS"],
  },
  {
    num: "L2",
    title: "Backend & APIs",
    blurb:
      "Designing scalable services, RESTful APIs, and authentication that hold up in production.",
    tools: ["Laravel", "Golang (Gin)", "Node.js", "PHP", "Java", "JWT"],
  },
  {
    num: "L3",
    title: "Databases & Data",
    blurb:
      "Modeling data and tuning queries — from ORMs to complex raw SQL — for speed and stability.",
    tools: ["PostgreSQL", "MySQL", "GORM", "Eloquent ORM"],
  },
  {
    num: "L4",
    title: "Systems & Delivery",
    blurb:
      "Shipping with good practices: version control, CI/CD, OOP, and agile collaboration.",
    tools: ["Git", "CI/CD", "Agile", "OOP", "System Design"],
  },
];

export default function Expertise() {
  const [active, setActive] = useState(0);

  const select = (i: number) => {
    setActive(i);
    setActiveLayer(i);
  };

  return (
    <section
      id="expertise"
      data-stage="2"
      className="mx-auto flex min-h-screen max-w-7xl flex-col justify-center px-6 sm:px-10 py-28 sm:py-40"
    >
      <div className="flex items-baseline gap-4 border-t border-border pt-6">
        <span className="eyebrow">(02)</span>
        <span className="eyebrow">Expertise</span>
      </div>

      <div className="mt-12 grid lg:grid-cols-12 gap-8">
        <div className="lg:col-span-7">
          <Words className="font-display font-semibold text-[clamp(2.6rem,6vw,5.5rem)] leading-[0.95] tracking-[-0.04em]">
            Every layer of the stack.
          </Words>
          <p className="mt-6 max-w-md text-text-secondary">
            A fullstack toolkit, sharpened across freelance studios, banking, and
            payment infrastructure. Pick a layer.
          </p>

          <div className="mt-12">
            {layers.map((d, i) => {
              const open = active === i;
              return (
                <div
                  key={d.num}
                  onMouseEnter={() => select(i)}
                  onClick={() => select(i)}
                  data-cursor={open ? undefined : "Lift"}
                  className="group relative cursor-pointer border-t border-border last:border-b"
                >
                  <motion.span
                    aria-hidden="true"
                    className="absolute left-0 top-0 h-px w-full origin-left bg-accent"
                    initial={false}
                    animate={{ scaleX: open ? 1 : 0 }}
                    transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                  />
                  <div className="flex items-center gap-5 py-5">
                    <span className={`eyebrow w-8 shrink-0 ${open ? "!text-accent" : ""}`}>
                      {d.num}
                    </span>
                    <h3
                      className={`font-display font-medium text-2xl sm:text-4xl tracking-[-0.03em] transition-[color,transform] duration-500 ${
                        open
                          ? "text-text-primary translate-x-2"
                          : "text-text-muted group-hover:text-text-primary"
                      }`}
                    >
                      {d.title}
                    </h3>
                  </div>

                  <AnimatePresence initial={false}>
                    {open && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                        className="overflow-hidden"
                      >
                        <div className="pb-7 pl-[3.25rem] max-w-xl">
                          <p className="text-text-secondary leading-relaxed">
                            {d.blurb}
                          </p>
                          <div className="mt-4 flex flex-wrap gap-2">
                            {d.tools.map((t) => (
                              <span
                                key={t}
                                className="rounded-full border border-border bg-bg/40 px-3 py-1 text-xs text-text-secondary backdrop-blur-sm"
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
      </div>
    </section>
  );
}
