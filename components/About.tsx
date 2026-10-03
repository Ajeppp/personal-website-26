"use client";

import { motion } from "framer-motion";
import { ScrubText } from "./Type";
import Reveal from "./Reveal";
import TiltCard from "./TiltCard";
import CountUp from "./CountUp";

const stats = [
  { to: 4, suffix: "+", label: "Companies" },
  { to: 6, suffix: "+", label: "Projects shipped" },
  { to: 2, suffix: "", label: "Years building" },
  { to: 3.66, decimals: 2, suffix: "", label: "GPA / Informatics" },
];

export default function About() {
  return (
    <section
      id="about"
      data-stage="1"
      className="mx-auto max-w-7xl px-6 sm:px-10 py-28 sm:py-40"
    >
      <div className="flex items-baseline gap-4 border-t border-border pt-6">
        <span className="eyebrow">(01)</span>
        <span className="eyebrow">About</span>
      </div>

      <div className="mt-14 grid lg:grid-cols-12 gap-12 lg:gap-16 items-start">
        <div className="lg:col-span-7">
          <ScrubText className="font-display font-medium text-[clamp(1.9rem,4.4vw,3.9rem)] leading-[1.06] tracking-[-0.03em]">
            I build software that solves real operational problems — payment flows that reconcile, APIs that hold under load, and interfaces people actually enjoy using.
          </ScrubText>

          <div className="mt-12 grid sm:grid-cols-2 gap-6 text-text-secondary leading-relaxed">
            <Reveal>
              <p>
                Based in Tangerang, Indonesia, with a degree in Informatics from
                Universitas Multimedia Nusantara. I&apos;ve worked across the
                stack at <span className="text-text-primary">BCA</span> and{" "}
                <span className="text-text-primary">Singapay</span>.
              </p>
            </Reveal>
            <Reveal delay={0.1}>
              <p>
                I co-founded{" "}
                <span className="text-text-primary">Hesed Tech</span>, a studio
                shipping animation-driven web products — integrating payment
                gateways, tuning APIs, and cutting content-update time by 60%.
              </p>
            </Reveal>
          </div>
        </div>

        {/* Portrait — a tilting 3D card with layers at different depths */}
        <motion.div
          initial={{ opacity: 0, y: 60, rotateY: -18 }}
          whileInView={{ opacity: 1, y: 0, rotateY: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
          style={{ transformPerspective: 1200 }}
          className="lg:col-span-4 lg:col-start-9 w-3/4 sm:w-1/2 lg:w-full mx-auto"
        >
          <TiltCard className="aspect-[4/5] w-full">
            <div
              aria-hidden="true"
              className="absolute inset-0 rounded-md border border-accent/50"
              style={{ transform: "translate3d(16px,16px,-40px)" }}
            />
            <div className="group absolute inset-0 overflow-hidden rounded-md border border-border bg-surface">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/portrait.jpeg"
                alt="Jefer Setiawan"
                className="h-full w-full object-cover object-top grayscale contrast-110 transition-[filter] duration-700 group-hover:grayscale-0"
              />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-bg/80 via-transparent to-transparent" />
            </div>
            <div className="z-lift absolute -left-4 bottom-8 rounded-full border border-border bg-bg/80 px-4 py-2 backdrop-blur-md eyebrow !text-text-primary">
              Jefer Setiawan
            </div>
            <div className="z-lift-lg absolute -right-3 top-8 flex h-16 w-16 items-center justify-center rounded-full bg-accent font-mono text-[10px] uppercase leading-tight tracking-[0.12em] text-bg text-center">
              Est.
              <br />
              2024
            </div>
          </TiltCard>
        </motion.div>
      </div>

      {/* Stats */}
      <div className="mt-20 grid grid-cols-2 md:grid-cols-4 border-t border-border">
        {stats.map((s, i) => (
          <Reveal
            key={s.label}
            delay={i * 0.08}
            className="border-b border-border md:border-b-0 md:border-r last:border-r-0 px-2 md:px-6 first:md:pl-0 py-8"
          >
            <div className="font-display font-semibold text-5xl sm:text-6xl tracking-[-0.04em] text-text-primary">
              <CountUp to={s.to} decimals={s.decimals} suffix={s.suffix} />
            </div>
            <div className="eyebrow mt-3">{s.label}</div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
