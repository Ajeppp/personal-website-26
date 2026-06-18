"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import TextReveal from "./TextReveal";

const experiences = [
  {
    period: "2026 — Now",
    company: "PT Abadi Singapay Indonesia",
    role: "IT Support Developer",
    detail:
      "Troubleshoot payment system operations — transaction, settlement, and reconciliation. Debug production issues across payment gateway integrations (VA, QRIS, e-wallet) and work with backend and vendor teams to resolve root causes.",
    tags: ["Payment Systems", "Debugging", "QRIS"],
  },
  {
    period: "2024 — Now",
    company: "Hesed Tech",
    role: "Co-Founder",
    detail:
      "Co-founded a studio building animation-driven web interfaces. Integrated DOKU payment gateway and OngkirMurah logistics API, cut content-update time by 60% via CMS optimization, and helped lift user retention by 40%.",
    tags: ["Laravel", "Vue.js", "DOKU", "Leadership"],
  },
  {
    period: "Jul — Dec 2024",
    company: "Bank Central Asia (BCA)",
    role: "Software Developer — Fullstack Intern",
    detail:
      "Built automation programs to digitalize manual operational tasks using OutSystems. Enhanced internal applications with new features and improved backend logic, collaborating with QA for testing and validation.",
    tags: ["OutSystems", "Automation"],
  },
  {
    period: "Jan — Jun 2024",
    company: "Focus on Family Indonesia",
    role: "Fullstack Developer — Intern",
    detail:
      "Optimized an internal CMS with Laravel, refactored legacy code for maintainability, designed RESTful APIs, and tuned database performance through Eloquent ORM and complex raw SQL queries.",
    tags: ["Laravel", "MySQL", "REST APIs"],
  },
];

export default function Experience() {
  const [active, setActive] = useState<number | null>(null);

  return (
    <section className="mx-auto max-w-7xl px-6 sm:px-10 py-24 sm:py-32">
      <div className="flex items-baseline gap-4 border-t border-border pt-6">
        <span className="eyebrow">(03)</span>
        <span className="eyebrow">Experience</span>
      </div>

      <TextReveal
        as="h2"
        className="mt-10 font-display text-4xl sm:text-6xl leading-[1.0] tracking-[-0.01em] max-w-3xl"
      >
        A short history of building.
      </TextReveal>

      <div className="mt-12">
        {experiences.map((exp, i) => {
          const open = active === i;
          return (
            <div
              key={i}
              onClick={() => setActive(open ? null : i)}
              data-cursor={open ? undefined : "Read"}
              className="group border-t border-border last:border-b cursor-pointer"
            >
              <div className="grid grid-cols-12 items-center gap-3 py-7">
                <span className="col-span-12 sm:col-span-3 eyebrow">
                  {exp.period}
                </span>
                <h3 className="col-span-10 sm:col-span-7 font-display text-2xl sm:text-3xl tracking-[-0.01em] text-text-primary group-hover:text-accent transition-colors duration-300">
                  {exp.role}
                  <span className="block text-base sm:text-lg text-text-muted font-body mt-1">
                    {exp.company}
                  </span>
                </h3>
                <motion.span
                  animate={{ rotate: open ? 45 : 0 }}
                  transition={{ duration: 0.3 }}
                  className="col-span-2 justify-self-end text-2xl text-text-muted"
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
                    <div className="grid grid-cols-12 gap-3 pb-8">
                      <div className="col-span-12 sm:col-span-9 sm:col-start-4 max-w-2xl">
                        <p className="text-text-secondary leading-relaxed">
                          {exp.detail}
                        </p>
                        <div className="mt-4 flex flex-wrap gap-2">
                          {exp.tags.map((t) => (
                            <span
                              key={t}
                              className="rounded-full border border-border px-3 py-1 text-xs text-text-secondary"
                            >
                              {t}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>
    </section>
  );
}
