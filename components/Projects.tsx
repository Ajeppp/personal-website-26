"use client";

import { motion } from "framer-motion";
import TextReveal from "./TextReveal";

const projects = [
  {
    num: "01",
    title: "MOSES",
    subtitle: "Scheduling Engine",
    year: "2026",
    description:
      "A fullstack automated scheduling app for managing church volunteer assignments — eliminating manual errors and complex unavailability conflicts. Secure JWT auth and scalable REST APIs.",
    tags: ["Next.js", "Golang", "Gin", "PostgreSQL"],
    initials: "MO",
  },
  {
    num: "02",
    title: "Nikmat Group",
    subtitle: "Corporate Website",
    year: "2024",
    description:
      "A polished, content-managed corporate site for a food & beverage company. Built with Laravel and Vue.js on the Twill CMS framework as part of a focused frontend team.",
    tags: ["Laravel", "Vue.js", "Twill"],
    link: "https://nikmatgroup.co/",
    initials: "NG",
  },
  {
    num: "03",
    title: "Me But Better",
    subtitle: "Skincare E-Commerce",
    year: "2024",
    description:
      "An end-to-end e-commerce experience for a skincare brand — product catalog, content management, and a streamlined checkout. Owned both frontend and backend in a small team.",
    tags: ["Laravel", "Vue.js", "E-Commerce"],
    link: "https://mebutbetter.co",
    initials: "MB",
  },
];

function onTilt(e: React.MouseEvent<HTMLDivElement>) {
  const el = e.currentTarget;
  const r = el.getBoundingClientRect();
  const px = (e.clientX - r.left) / r.width;
  const py = (e.clientY - r.top) / r.height;
  el.style.transform = `perspective(1000px) rotateX(${(0.5 - py) * 6}deg) rotateY(${(px - 0.5) * 6}deg)`;
}
function onLeave(e: React.MouseEvent<HTMLDivElement>) {
  e.currentTarget.style.transform = "perspective(1000px) rotateX(0deg) rotateY(0deg)";
}

function Panel({
  initials,
  flip,
}: {
  initials: string;
  flip: boolean;
}) {
  return (
    <div
      onMouseMove={onTilt}
      onMouseLeave={onLeave}
      style={{ transform: "perspective(1000px)" }}
      className={`relative aspect-[16/10] w-full overflow-hidden rounded-sm border border-border transition-transform duration-300 will-change-transform ${
        flip ? "lg:order-1" : ""
      }`}
    >
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(135deg, var(--color-surface), var(--color-bg-lighter))",
        }}
      />
      <div className="absolute inset-0 grain opacity-[0.05]" />
      <div className="absolute -right-6 -bottom-10 select-none font-display italic text-accent/15 text-[12rem] leading-none">
        {initials}
      </div>
      <div className="absolute left-6 top-6 h-2 w-2 rounded-full bg-accent" />
    </div>
  );
}

export default function Projects() {
  return (
    <section id="work" className="mx-auto max-w-7xl px-6 sm:px-10 py-24 sm:py-32">
      <div className="flex items-baseline gap-4 border-t border-border pt-6">
        <span className="eyebrow">(04)</span>
        <span className="eyebrow">Selected Work</span>
      </div>

      <TextReveal
        as="h2"
        className="mt-10 font-display text-4xl sm:text-6xl leading-[1.0] tracking-[-0.01em] max-w-3xl"
      >
        Things I&apos;ve designed &amp; shipped.
      </TextReveal>

      <div className="mt-16 space-y-24 sm:space-y-32">
        {projects.map((p, i) => {
          const flip = i % 2 === 1;
          const Wrapper = p.link ? "a" : "div";
          return (
            <motion.div
              key={p.num}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, ease: "circOut" as const }}
              className="grid lg:grid-cols-2 gap-8 lg:gap-14 items-center"
            >
              <Panel initials={p.initials} flip={flip} />

              <Wrapper
                {...(p.link
                  ? {
                      href: p.link,
                      target: "_blank",
                      rel: "noopener noreferrer",
                      "data-cursor": "View",
                    }
                  : { "data-cursor": "Soon" })}
                className="group block"
              >
                <div className="flex items-center gap-4 eyebrow">
                  <span>{p.num}</span>
                  <span className="h-px w-8 bg-border-hover" />
                  <span>{p.year}</span>
                  <span>{p.subtitle}</span>
                </div>

                <h3 className="mt-4 font-display text-5xl sm:text-7xl leading-[0.95] tracking-[-0.02em] text-text-primary group-hover:text-accent transition-colors duration-300">
                  {p.title}
                </h3>

                <p className="mt-5 max-w-md text-text-secondary leading-relaxed">
                  {p.description}
                </p>

                <div className="mt-5 flex flex-wrap gap-2">
                  {p.tags.map((t) => (
                    <span
                      key={t}
                      className="rounded-full border border-border px-3 py-1 text-xs text-text-secondary"
                    >
                      {t}
                    </span>
                  ))}
                </div>

                {p.link && (
                  <span className="mt-6 inline-flex items-center gap-2 text-sm text-text-primary underline-grow">
                    Visit site
                    <svg className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25" />
                    </svg>
                  </span>
                )}
              </Wrapper>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
