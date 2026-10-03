"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Words } from "./Type";
import TiltCard from "./TiltCard";

type Mock = "schedule" | "corporate" | "shop";

const projects: {
  num: string;
  title: string;
  subtitle: string;
  year: string;
  description: string;
  tags: string[];
  link?: string;
  mock: Mock;
}[] = [
  {
    num: "01",
    title: "MOSES",
    subtitle: "Scheduling Engine",
    year: "2026",
    description:
      "A fullstack automated scheduling app for managing church volunteer assignments — eliminating manual errors and complex unavailability conflicts. Secure JWT auth and scalable REST APIs.",
    tags: ["Next.js", "Golang", "Gin", "PostgreSQL"],
    mock: "schedule",
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
    mock: "corporate",
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
    mock: "shop",
  },
];

// Filled cells of the schedule mock (col,row) — a fixed pattern so SSR matches
const slots = new Set(["0-1", "1-0", "2-2", "3-1", "4-0", "4-3", "5-2", "6-1", "1-3", "3-3"]);
const hot = new Set(["2-2", "4-0", "6-1"]);

/** Abstract interface sketch per project; its pieces float at different depths. */
function MockUI({ kind }: { kind: Mock }) {
  if (kind === "schedule") {
    return (
      <>
        <div className="z-lift-sm absolute inset-x-6 top-14 bottom-6 grid grid-cols-7 grid-rows-4 gap-1.5">
          {Array.from({ length: 28 }, (_, i) => {
            const key = `${i % 7}-${Math.floor(i / 7)}`;
            return (
              <div
                key={key}
                className={`rounded-[3px] ${
                  hot.has(key)
                    ? "bg-accent"
                    : slots.has(key)
                      ? "bg-accent-secondary/50"
                      : "bg-text-primary/[0.05]"
                }`}
              />
            );
          })}
        </div>
        <div className="z-lift-lg absolute right-4 bottom-4 rounded-md border border-border bg-bg/90 px-3 py-2 font-mono text-[10px] uppercase tracking-[0.14em] text-text-primary">
          0 conflicts
        </div>
      </>
    );
  }
  if (kind === "corporate") {
    return (
      <>
        <div className="z-lift-sm absolute left-6 top-9 bottom-0 sm:bottom-12 flex w-1/2 flex-col justify-center gap-2 sm:gap-2.5">
          <div className="h-3 sm:h-5 w-full rounded-sm bg-text-primary/80" />
          <div className="h-3 sm:h-5 w-3/4 rounded-sm bg-text-primary/80" />
          <div className="mt-2 h-1.5 sm:h-2 w-2/3 rounded-sm bg-text-primary/20" />
          <div className="h-1.5 sm:h-2 w-1/2 rounded-sm bg-text-primary/20" />
          <div className="mt-2 h-5 sm:h-7 w-16 sm:w-24 rounded-full bg-accent" />
        </div>
        <div className="z-lift absolute right-6 top-14 bottom-6 sm:bottom-16 w-[34%] rounded-md bg-gradient-to-br from-accent-secondary/60 to-accent/50" />
        <div className="z-lift-sm absolute inset-x-6 bottom-6 hidden sm:grid grid-cols-4 gap-2">
          {[0, 1, 2, 3].map((i) => (
            <div key={i} className="h-6 rounded-sm bg-text-primary/[0.07]" />
          ))}
        </div>
      </>
    );
  }
  return (
    <>
      <div className="z-lift-sm absolute inset-x-6 top-14 bottom-6 grid grid-cols-3 gap-3">
        {[0, 1, 2].map((i) => (
          <div key={i} className="flex flex-col rounded-md bg-text-primary/[0.05] p-3">
            <div className="flex flex-1 items-center justify-center">
              <div
                className={`h-[62%] w-[38%] rounded-t-full rounded-b-md ${
                  i === 1 ? "bg-accent" : "bg-accent-secondary/50"
                }`}
              />
            </div>
            <div className="mt-2 h-1.5 w-3/4 rounded-sm bg-text-primary/30" />
            <div className="mt-1.5 h-1.5 w-1/3 rounded-sm bg-text-primary/15" />
          </div>
        ))}
      </div>
      <div className="z-lift-lg absolute right-4 top-12 rounded-full bg-accent px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.14em] text-bg">
        Add to bag
      </div>
    </>
  );
}

function Card({ p }: { p: (typeof projects)[number] }) {
  const Wrapper = p.link ? "a" : "div";
  return (
    <article className="grid shrink-0 items-center gap-8 lg:w-[76vw] lg:max-w-[1180px] lg:grid-cols-[1.35fr_1fr] lg:gap-14">
      <TiltCard className="aspect-[16/10] w-full" max={9}>
        <div className="absolute inset-0 overflow-hidden rounded-lg border border-border bg-surface/80 backdrop-blur-md">
          <div className="grain opacity-[0.05]" />
        </div>
        {/* window chrome */}
        <div className="absolute inset-x-0 top-0 flex h-9 items-center gap-1.5 border-b border-border px-4">
          <span className="h-2 w-2 rounded-full bg-accent" />
          <span className="h-2 w-2 rounded-full bg-text-primary/20" />
          <span className="h-2 w-2 rounded-full bg-text-primary/20" />
          <span className="ml-3 font-mono text-[10px] uppercase tracking-[0.16em] text-text-muted">
            {p.subtitle}
          </span>
        </div>
        <MockUI kind={p.mock} />
      </TiltCard>

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
          <span className="!text-accent">{p.num}</span>
          <span className="h-px w-8 bg-border-hover" />
          <span>{p.year}</span>
        </div>

        <h3 className="mt-4 font-display font-semibold text-5xl sm:text-6xl xl:text-7xl leading-[0.92] tracking-[-0.045em] text-text-primary group-hover:text-accent transition-colors duration-300">
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
    </article>
  );
}

export default function Projects() {
  const section = useRef<HTMLElement>(null);
  const track = useRef<HTMLDivElement>(null);
  // How far the track has to travel sideways; 0 = stacked (mobile) layout
  const [dist, setDist] = useState(0);
  const distRef = useRef(0);

  useEffect(() => {
    const el = track.current;
    if (!el) return;
    const measure = () => {
      const d =
        window.innerWidth >= 1024
          ? Math.max(0, el.scrollWidth - window.innerWidth)
          : 0;
      distRef.current = d;
      setDist(d);
    };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    window.addEventListener("resize", measure);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, []);

  const { scrollYProgress } = useScroll({
    target: section,
    offset: ["start start", "end end"],
  });
  const x = useTransform(scrollYProgress, (v) => -v * distRef.current);

  return (
    <section
      id="work"
      ref={section}
      data-stage="4"
      className="relative"
      style={{ height: dist ? `calc(100vh + ${dist}px)` : undefined }}
    >
      <div className="lg:sticky lg:top-0 lg:flex lg:h-screen lg:flex-col lg:justify-center lg:overflow-hidden py-28 lg:py-0">
        <motion.div
          ref={track}
          style={{ x }}
          className="flex flex-col gap-24 px-6 sm:px-10 lg:w-max lg:flex-row lg:items-center lg:gap-[9vw] lg:pr-[12vw]"
        >
          {/* Lead panel */}
          <div className="shrink-0 lg:w-[38vw]">
            <div className="flex items-baseline gap-4 border-t border-border pt-6">
              <span className="eyebrow">(04)</span>
              <span className="eyebrow">Selected Work</span>
            </div>
            <Words className="mt-10 font-display font-semibold text-[clamp(2.6rem,6vw,5.5rem)] leading-[0.95] tracking-[-0.04em]">
              Things I&apos;ve designed &amp; shipped.
            </Words>
            <p className="mt-8 hidden lg:flex items-center gap-3 eyebrow">
              Keep scrolling
              <motion.span
                animate={{ x: [0, 8, 0] }}
                transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
              >
                →
              </motion.span>
            </p>
          </div>

          {projects.map((p) => (
            <Card key={p.num} p={p} />
          ))}
        </motion.div>

        {/* Progress rail */}
        <div className="absolute bottom-8 left-6 right-6 sm:left-10 sm:right-10 hidden lg:block">
          <div className="h-px w-full bg-border">
            <motion.div
              style={{ scaleX: scrollYProgress }}
              className="h-px w-full origin-left bg-accent"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
