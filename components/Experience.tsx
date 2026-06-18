"use client";

import { motion } from "framer-motion";
import TextReveal from "./TextReveal";
import { spotlight } from "./spotlight";

const experiences = [
  {
    company: "PT Abadi Singapay Indonesia",
    role: "IT Support Developer",
    period: "2026 — Present",
    description:
      "Troubleshoot payment system operations — transaction, settlement, and reconciliation issues. Debug production issues across payment gateway integrations including VA, QRIS, and e-wallet. Collaborate with backend and vendor teams to resolve root causes.",
    tags: ["Payment Systems", "Debugging", "QRIS", "e-Wallet"],
  },
  {
    company: "Hesed Tech",
    role: "Co-Founder",
    period: "2024 — Present",
    description:
      "Co-founded a web development studio building animation-driven interfaces. Integrated DOKU payment gateway and OngkirMurah logistics API. Reduced content update time by 60% through CMS optimization. Contributed to a 40% increase in user retention.",
    tags: ["Laravel", "Vue.js", "DOKU", "CMS", "Leadership"],
  },
  {
    company: "Bank Central Asia (BCA)",
    role: "Software Developer — Fullstack Intern",
    period: "Jul — Dec 2024",
    description:
      "Developed automation programs to digitalize manual operational tasks using OutSystems. Enhanced internal applications with new features and improved backend logic. Collaborated with QA engineers for testing and validation.",
    tags: ["OutSystems", "Automation", "Internal Tools"],
  },
  {
    company: "Focus on Family Indonesia",
    role: "Fullstack Developer — Intern",
    period: "Jan — Jun 2024",
    description:
      "Optimized internal CMS using Laravel. Refactored legacy codebase for maintainability. Designed RESTful APIs and tuned database performance through Eloquent ORM and complex raw SQL queries.",
    tags: ["Laravel", "MySQL", "REST APIs", "Refactoring"],
  },
];

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "circOut" as const } },
};

export default function Experience() {
  return (
    <section id="experience" className="py-28 sm:py-36">
      <div className="mx-auto max-w-6xl px-6">
        <div className="mb-14">
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-sm font-medium text-accent tracking-[0.2em] uppercase mb-3"
          >
            Experience
          </motion.p>
          <TextReveal
            as="h2"
            className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight"
          >
            Where I&apos;ve worked
          </TextReveal>
        </div>

        <div className="space-y-4">
          {experiences.map((exp, i) => (
            <motion.div
              key={i}
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-60px" }}
              transition={{ delay: i * 0.08 }}
              onMouseMove={spotlight}
              className="spotlight group rounded-2xl border border-border bg-surface/40 backdrop-blur-sm hover:bg-surface/70 hover:border-border-hover transition-all duration-400 overflow-hidden"
            >
              <div className="relative z-10 p-6 sm:p-8">
                {/* Header */}
                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 mb-4">
                  <div>
                    <h3 className="text-lg font-semibold text-text-primary group-hover:text-accent transition-colors duration-300">
                      {exp.role}
                    </h3>
                    <p className="text-text-secondary">{exp.company}</p>
                  </div>
                  <span className="text-sm text-text-muted font-[family-name:var(--font-geist-mono)] shrink-0">
                    {exp.period}
                  </span>
                </div>

                {/* Description */}
                <p className="text-sm text-text-muted leading-relaxed mb-5 max-w-3xl group-hover:text-text-secondary transition-colors duration-300">
                  {exp.description}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-2">
                  {exp.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2.5 py-1 text-xs rounded-md bg-accent-dim text-accent/80 border border-accent/10"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Bottom accent line */}
              <div className="h-px w-0 group-hover:w-full bg-gradient-to-r from-accent/40 to-transparent transition-all duration-700" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
