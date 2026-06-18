"use client";

import { motion } from "framer-motion";
import TextReveal from "./TextReveal";
import Reveal from "./Reveal";

const stats = [
  { value: "4+", label: "Companies" },
  { value: "6+", label: "Projects shipped" },
  { value: "2", label: "Years building" },
  { value: "3.66", label: "GPA / Informatics" },
];

export default function About() {
  return (
    <section id="about" className="mx-auto max-w-7xl px-6 sm:px-10 py-24 sm:py-32">
      {/* Section head */}
      <div className="flex items-baseline gap-4 border-t border-border pt-6">
        <span className="eyebrow">(01)</span>
        <span className="eyebrow">About</span>
      </div>

      <div className="mt-12 grid lg:grid-cols-12 gap-10 lg:gap-16">
        <div className="lg:col-span-7">
          <TextReveal
            as="h2"
            className="font-display text-3xl sm:text-5xl leading-[1.05] tracking-[-0.01em]"
          >
            I build software that solves real operational problems.
          </TextReveal>
        </div>

        <div className="lg:col-span-5 space-y-5 text-text-secondary leading-relaxed">
          <Reveal delay={0.05}>
            <p>
              I&apos;m a fullstack developer based in Tangerang, Indonesia, with a
              degree in Informatics from Universitas Multimedia Nusantara. I&apos;ve
              worked across the stack at companies like{" "}
              <span className="text-text-primary">BCA</span> and{" "}
              <span className="text-text-primary">Singapay</span>.
            </p>
          </Reveal>
          <Reveal delay={0.12}>
            <p>
              I co-founded{" "}
              <span className="text-text-primary">Hesed Tech</span>, a studio
              shipping animation-driven web products — integrating payment
              gateways, tuning APIs, and cutting content-update time by 60%.
            </p>
          </Reveal>
          <Reveal delay={0.19}>
            <p>
              Whether it&apos;s designing APIs, tuning database queries, or
              crafting interfaces, I care most about building things that are
              reliable and genuinely useful.
            </p>
          </Reveal>
        </div>
      </div>

      {/* Stats */}
      <div className="mt-16 grid grid-cols-2 md:grid-cols-4 border-t border-border">
        {stats.map((s, i) => (
          <Reveal
            key={s.label}
            delay={i * 0.08}
            className="border-b border-border md:border-b-0 md:border-r last:border-r-0 border-border px-2 py-8"
          >
            <div className="font-display text-4xl sm:text-5xl text-text-primary">
              {s.value}
            </div>
            <div className="eyebrow mt-2">{s.label}</div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
