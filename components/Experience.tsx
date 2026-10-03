"use client";

import { useRef } from "react";
import { motion, useScroll, useSpring } from "framer-motion";
import { SectionHead, Words } from "./Type";

const experiences = [
  {
    period: "2026 — Now",
    current: true,
    company: "PT Abadi Singapay Indonesia",
    role: "IT Support Developer",
    detail:
      "Troubleshoot payment system operations — transaction, settlement, and reconciliation. Debug production issues across payment gateway integrations (VA, QRIS, e-wallet) and work with backend and vendor teams to resolve root causes.",
    tags: ["Payment Systems", "Debugging", "QRIS"],
  },
  {
    period: "2024 — Now",
    current: true,
    company: "Hesed Tech",
    role: "Co-Founder",
    detail:
      "Co-founded a studio building animation-driven web interfaces. Integrated DOKU payment gateway and OngkirMurah logistics API, cut content-update time by 60% via CMS optimization, and helped lift user retention by 40%.",
    tags: ["Laravel", "Vue.js", "DOKU", "Leadership"],
  },
  {
    period: "Jul — Dec 2024",
    current: false,
    company: "Bank Central Asia (BCA)",
    role: "Software Developer — Fullstack Intern",
    detail:
      "Built automation programs to digitalize manual operational tasks using OutSystems. Enhanced internal applications with new features and improved backend logic, collaborating with QA for testing and validation.",
    tags: ["OutSystems", "Automation"],
  },
  {
    period: "Jan — Jun 2024",
    current: false,
    company: "Focus on Family Indonesia",
    role: "Fullstack Developer — Intern",
    detail:
      "Optimized an internal CMS with Laravel, refactored legacy code for maintainability, designed RESTful APIs, and tuned database performance through Eloquent ORM and complex raw SQL queries.",
    tags: ["Laravel", "MySQL", "REST APIs"],
  },
];

const ease: [number, number, number, number] = [0.16, 1, 0.3, 1];

export default function Experience() {
  const list = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: list, offset: ["start 0.75", "end 0.55"] });
  const drawn = useSpring(scrollYProgress, { stiffness: 90, damping: 24, mass: 0.4 });

  return (
    <section id="experience" data-chapter="experience" className="relative z-[2] px-5 py-28 sm:px-10 sm:py-40">
      <div className="mx-auto max-w-[92rem]">
        <SectionHead num="03" label="Experience" />
        <Words
          as="h2"
          text="A short history of *building.*"
          className="display mt-8 block max-w-[14ch] text-[clamp(3rem,8.4vw,8.5rem)] text-fg"
        />

        <div ref={list} className="relative mt-16 lg:mr-[24%]">
          {/* the line draws itself as the list scrolls through */}
          <div className="absolute bottom-0 left-[5px] top-2 w-px bg-line md:left-[calc(25%+5px)]">
            <motion.div style={{ scaleY: drawn }} className="h-full w-px origin-top bg-accent" />
          </div>

          {experiences.map((exp, i) => (
            <motion.article
              key={exp.company}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-90px" }}
              transition={{ duration: 0.9, ease, delay: 0.05 }}
              className="relative grid gap-3 pb-16 pl-9 last:pb-2 md:grid-cols-4 md:gap-0 md:pl-0"
            >
              <div className="eyebrow md:pr-8 md:pt-3 md:text-right">
                {exp.period}
                {exp.current && <span className="mt-1 block !text-accent">Current</span>}
              </div>

              <span className="absolute left-0 top-1.5 flex h-[11px] w-[11px] items-center justify-center md:left-1/4 md:top-3">
                {exp.current && (
                  <span className="absolute h-full w-full animate-ping rounded-full bg-accent opacity-60" />
                )}
                <span className={`relative h-[11px] w-[11px] rounded-full border ${exp.current ? "border-accent bg-accent" : "border-line-strong bg-bg"}`} />
              </span>

              <div className="md:col-span-3 md:pl-12">
                <h3 className="display text-[clamp(1.9rem,4.4vw,3.9rem)] text-fg">{exp.role}</h3>
                <p className="serif-i mt-1 text-2xl text-accent sm:text-3xl">{exp.company}</p>
                <p className="mt-5 max-w-2xl leading-relaxed text-fg-2">{exp.detail}</p>
                <div className="mt-5 flex flex-wrap gap-2">
                  {exp.tags.map((t) => (
                    <span
                      key={t}
                      className="rounded-full border border-line-strong px-3 py-1 font-mono text-[0.66rem] uppercase tracking-[0.14em] text-fg-2"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
              <span className="display pointer-events-none absolute right-0 top-0 hidden text-7xl text-line-strong xl:block">
                0{i + 1}
              </span>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
