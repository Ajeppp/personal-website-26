"use client";

import { useEffect, useRef } from "react";
import { animate, useInView } from "framer-motion";
import Reveal from "./Reveal";
import IdCard from "./IdCard";
import { SectionHead, Words } from "./Type";

const stats = [
  { value: 4, suffix: "+", label: "Companies" },
  { value: 6, suffix: "+", label: "Projects shipped" },
  { value: 2, suffix: "", label: "Years building" },
  { value: 3.66, suffix: "", decimals: 2, label: "GPA / Informatics" },
];

function Count({ value, decimals = 0, suffix }: { value: number; decimals?: number; suffix: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const seen = useInView(ref, { once: true, margin: "-60px" });

  useEffect(() => {
    if (!seen) return;
    const controls = animate(0, value, {
      duration: 1.6,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (v) => {
        if (ref.current) ref.current.textContent = v.toFixed(decimals);
      },
    });
    return () => controls.stop();
  }, [seen, value, decimals]);

  return (
    <>
      <span ref={ref}>{(0).toFixed(decimals)}</span>
      <span className="text-accent">{suffix}</span>
    </>
  );
}

export default function About() {
  return (
    <section id="about" data-chapter="about" className="relative z-[2] px-5 py-28 sm:px-10 sm:py-40">
      <div className="mx-auto max-w-[92rem]">
        <SectionHead num="01" label="About" />

        <div className="mt-10 grid gap-14 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-8">
            <Words
              as="h2"
              text="I build software that solves *real* operational problems."
              className="display block text-[clamp(3rem,8.4vw,8.5rem)] text-fg"
            />

            <div className="mt-12 grid max-w-3xl gap-6 text-base leading-relaxed text-fg-2 sm:grid-cols-2 sm:text-[1.05rem]">
              <Reveal delay={0.05}>
                <p>
                  I&apos;m a fullstack developer based in Tangerang, Indonesia, with a degree in
                  Informatics from Universitas Multimedia Nusantara. I&apos;ve worked across the
                  stack at companies like <span className="text-fg">BCA</span> and{" "}
                  <span className="text-fg">Singapay</span>.
                </p>
              </Reveal>
              <Reveal delay={0.14}>
                <p>
                  I co-founded <span className="text-fg">Hesed Tech</span>, a studio shipping
                  animation-driven web products — integrating payment gateways, tuning APIs, and
                  cutting content-update time by 60%.
                </p>
              </Reveal>
              <Reveal delay={0.23} className="sm:col-span-2">
                <p className="border-l border-accent pl-5 text-fg">
                  Whether it&apos;s designing APIs, tuning database queries, or crafting interfaces,
                  I care most about building things that are reliable and genuinely useful.
                </p>
              </Reveal>
            </div>
          </div>

          <div className="lg:col-span-4 lg:pt-6">
            <IdCard />
          </div>
        </div>

        <div className="mt-24 grid grid-cols-2 border-t border-line md:grid-cols-4">
          {stats.map((s, i) => (
            <Reveal
              key={s.label}
              delay={i * 0.08}
              className="border-b border-line px-1 py-8 odd:border-r md:border-b-0 md:border-r md:px-6 md:first:pl-1 md:last:border-r-0"
            >
              <div className="display text-6xl text-fg sm:text-8xl">
                <Count value={s.value} decimals={s.decimals} suffix={s.suffix} />
              </div>
              <div className="eyebrow mt-3">{s.label}</div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
