"use client";

import { motion } from "framer-motion";
import TextReveal from "./TextReveal";
import { spotlight } from "./spotlight";

const skills = [
  "React", "Next.js", "Vue.js", "TypeScript", "Tailwind CSS",
  "Laravel", "Node.js", "Golang", "Gin", "REST APIs",
  "PostgreSQL", "MySQL", "Git", "CI/CD", "PHP", "Java",
];

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "circOut" as const } },
};

function BentoCard({
  children,
  className = "",
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  return (
    <motion.div
      variants={fadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-80px" }}
      transition={{ delay }}
      onMouseMove={spotlight}
      className={`spotlight overflow-hidden rounded-2xl border border-border bg-surface/60 backdrop-blur-sm p-6 hover:border-border-hover hover-glow ${className}`}
    >
      <div className="relative z-10 h-full">{children}</div>
    </motion.div>
  );
}

export default function About() {
  return (
    <section id="about" className="py-28 sm:py-36">
      <div className="mx-auto max-w-6xl px-6">
        <div className="mb-14">
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-sm font-medium text-accent tracking-[0.2em] uppercase mb-3"
          >
            About
          </motion.p>
          <TextReveal
            as="h2"
            className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight"
          >
            A bit about me
          </TextReveal>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Bio — spans 2 cols + 2 rows */}
          <BentoCard className="sm:col-span-2 lg:col-span-2 lg:row-span-2">
            <div className="space-y-4">
              <p className="text-text-secondary leading-relaxed">
                I&apos;m a fullstack developer based in Tangerang, Indonesia.
                I studied Informatics at Universitas Multimedia Nusantara and
                fell in love with building software that solves real problems.
              </p>
              <p className="text-text-secondary leading-relaxed">
                I&apos;ve worked across the full stack at companies like{" "}
                <span className="text-text-primary font-medium">BCA</span> and{" "}
                <span className="text-text-primary font-medium">Singapay</span>,
                and co-founded{" "}
                <span className="text-text-primary font-medium">Hesed Tech</span>{" "}
                where we ship animation-driven web products for clients.
              </p>
              <p className="text-text-secondary leading-relaxed">
                Whether it&apos;s designing APIs, tuning database queries, or
                crafting interfaces — I care most about building things that
                are reliable and useful.
              </p>
            </div>
          </BentoCard>

          {/* Location */}
          <BentoCard delay={0.05}>
            <div className="flex flex-col h-full justify-between gap-4">
              <div className="w-10 h-10 rounded-xl bg-accent-dim flex items-center justify-center">
                <svg className="w-5 h-5 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                </svg>
              </div>
              <div>
                <p className="text-xs text-text-muted uppercase tracking-wider mb-1">Location</p>
                <p className="text-text-primary font-medium">Tangerang</p>
                <p className="text-sm text-text-secondary">Indonesia</p>
              </div>
            </div>
          </BentoCard>

          {/* Status */}
          <BentoCard delay={0.1}>
            <div className="flex flex-col h-full justify-between gap-4">
              <div className="w-10 h-10 rounded-xl bg-accent-dim flex items-center justify-center">
                <span className="relative flex h-3 w-3">
                  <span className="absolute inline-flex h-full w-full rounded-full bg-accent opacity-75 animate-ping" />
                  <span className="relative inline-flex h-3 w-3 rounded-full bg-accent" />
                </span>
              </div>
              <div>
                <p className="text-xs text-text-muted uppercase tracking-wider mb-1">Status</p>
                <p className="text-accent font-medium">Available</p>
                <p className="text-sm text-text-secondary">Open to work</p>
              </div>
            </div>
          </BentoCard>

          {/* Education */}
          <BentoCard delay={0.15}>
            <div className="flex flex-col h-full justify-between gap-4">
              <div className="w-10 h-10 rounded-xl bg-accent-dim flex items-center justify-center">
                <svg className="w-5 h-5 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4.26 10.147a60.438 60.438 0 00-.491 6.347A48.627 48.627 0 0112 20.904a48.627 48.627 0 018.232-4.41 60.46 60.46 0 00-.491-6.347m-15.482 0a50.57 50.57 0 00-2.658-.813A59.905 59.905 0 0112 3.493a59.902 59.902 0 0110.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.697 50.697 0 0112 13.489a50.702 50.702 0 017.74-3.342" />
                </svg>
              </div>
              <div>
                <p className="text-xs text-text-muted uppercase tracking-wider mb-1">Education</p>
                <p className="text-text-primary font-medium text-sm">Multimedia Nusantara</p>
                <p className="text-sm text-text-secondary">Informatics &middot; 3.66 GPA</p>
              </div>
            </div>
          </BentoCard>

          {/* Current role */}
          <BentoCard delay={0.2}>
            <div className="flex flex-col h-full justify-between gap-4">
              <div className="w-10 h-10 rounded-xl bg-accent-dim flex items-center justify-center">
                <svg className="w-5 h-5 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 14.15v4.25c0 1.094-.787 2.036-1.872 2.18-2.087.277-4.216.42-6.378.42s-4.291-.143-6.378-.42c-1.085-.144-1.872-1.086-1.872-2.18v-4.25m16.5 0a2.18 2.18 0 00.75-1.661V8.706c0-1.081-.768-2.015-1.837-2.175a48.114 48.114 0 00-3.413-.387m4.5 8.006c-.194.165-.42.295-.673.38A23.978 23.978 0 0112 15.75c-2.648 0-5.195-.429-7.577-1.22a2.016 2.016 0 01-.673-.38m0 0A2.18 2.18 0 013 12.489V8.706c0-1.081.768-2.015 1.837-2.175a48.111 48.111 0 013.413-.387m7.5 0V5.25A2.25 2.25 0 0013.5 3h-3a2.25 2.25 0 00-2.25 2.25v.894m7.5 0a48.667 48.667 0 00-7.5 0" />
                </svg>
              </div>
              <div>
                <p className="text-xs text-text-muted uppercase tracking-wider mb-1">Current</p>
                <p className="text-text-primary font-medium text-sm">IT Support Developer</p>
                <p className="text-sm text-text-secondary">Singapay</p>
              </div>
            </div>
          </BentoCard>

          {/* Tech Stack — spans 2 cols, marquee */}
          <BentoCard className="sm:col-span-2" delay={0.25}>
            <p className="text-xs text-text-muted uppercase tracking-wider mb-4">
              Tech Stack
            </p>
            <div className="overflow-hidden -mx-6">
              <div className="flex gap-3 animate-marquee w-max px-6">
                {[...skills, ...skills].map((s, i) => (
                  <span
                    key={i}
                    className="shrink-0 px-4 py-2 rounded-full text-sm bg-accent-dim text-accent border border-accent/10 hover:border-accent/30 transition-colors cursor-default"
                  >
                    {s}
                  </span>
                ))}
              </div>
            </div>
          </BentoCard>
        </div>
      </div>
    </section>
  );
}
