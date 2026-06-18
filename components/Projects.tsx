"use client";

import { motion } from "framer-motion";
import TextReveal from "./TextReveal";

const projects = [
  {
    num: "01",
    title: "MOSES",
    subtitle: "Ministry Organization & Scheduling Engine System",
    description:
      "A full-stack automated scheduling web app for managing church volunteer assignments. Mitigates human errors caused by manual scheduling and complex unavailability factors. Features secure JWT authentication and scalable RESTful APIs.",
    tags: ["Next.js", "Golang", "Gin", "PostgreSQL", "JWT"],
    type: "Personal Project",
  },
  {
    num: "02",
    title: "Nikmat Group",
    subtitle: "Corporate Website",
    description:
      "Corporate website for a food & beverage company. Built with Laravel and Vue.js using Twill as CMS framework. Worked as frontend developer in a team environment to deliver a polished, content-managed web presence.",
    tags: ["Laravel", "Vue.js", "Twill CMS"],
    link: "https://nikmatgroup.co/",
    type: "Freelance",
  },
  {
    num: "03",
    title: "Me But Better",
    subtitle: "Skincare E-Commerce",
    description:
      "E-commerce website for a skincare brand. Handled both frontend and backend in a small team. Features product catalog, content management, and a streamlined shopping experience.",
    tags: ["Laravel", "Vue.js", "E-Commerce"],
    link: "https://mebutbetter.co",
    type: "Freelance",
  },
];

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "circOut" as const } },
};

function onTilt(e: React.MouseEvent<HTMLDivElement>) {
  const el = e.currentTarget;
  const r = el.getBoundingClientRect();
  const px = (e.clientX - r.left) / r.width;
  const py = (e.clientY - r.top) / r.height;
  el.style.setProperty("--sx", `${e.clientX - r.left}px`);
  el.style.setProperty("--sy", `${e.clientY - r.top}px`);
  el.style.transform = `perspective(900px) rotateX(${(0.5 - py) * 5}deg) rotateY(${(px - 0.5) * 5}deg)`;
}

function onTiltLeave(e: React.MouseEvent<HTMLDivElement>) {
  e.currentTarget.style.transform = "perspective(900px) rotateX(0deg) rotateY(0deg)";
}

export default function Projects() {
  return (
    <section id="projects" className="py-28 sm:py-36">
      <div className="mx-auto max-w-6xl px-6">
        <div className="mb-14">
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-sm font-medium text-accent tracking-[0.2em] uppercase mb-3"
          >
            Projects
          </motion.p>
          <TextReveal
            as="h2"
            className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight"
          >
            Selected work
          </TextReveal>
        </div>

        <div className="space-y-6">
          {projects.map((project) => (
            <motion.div
              key={project.num}
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-60px" }}
            >
              <div
                onMouseMove={onTilt}
                onMouseLeave={onTiltLeave}
                style={{ transform: "perspective(900px)" }}
                className="spotlight group relative rounded-2xl border border-border bg-surface/40 backdrop-blur-sm overflow-hidden hover:border-accent/20 transition-[border-color,box-shadow] duration-500 will-change-transform"
              >
                <div className="relative z-10 p-6 sm:p-8 md:p-10">
                  <div className="flex flex-col md:flex-row md:items-start gap-6 md:gap-10">
                    {/* Number */}
                    <span className="text-6xl sm:text-7xl font-bold text-text-primary/[0.05] group-hover:text-accent/10 transition-colors duration-500 leading-none shrink-0 font-[family-name:var(--font-geist-mono)]">
                      {project.num}
                    </span>

                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-4 mb-1">
                        <div>
                          <span className="text-xs text-text-muted uppercase tracking-wider">
                            {project.type}
                          </span>
                          <h3 className="text-2xl sm:text-3xl font-bold text-text-primary mt-1 group-hover:text-accent transition-colors duration-300">
                            {project.title}
                          </h3>
                          <p className="text-sm text-text-muted mt-0.5">
                            {project.subtitle}
                          </p>
                        </div>

                        {project.link && (
                          <a
                            href={project.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="shrink-0 w-10 h-10 rounded-full border border-border flex items-center justify-center text-text-muted hover:text-accent hover:border-accent/30 transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                            aria-label={`Visit ${project.title}`}
                          >
                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                              <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25" />
                            </svg>
                          </a>
                        )}
                      </div>

                      <p className="text-text-muted text-sm leading-relaxed mt-4 max-w-2xl group-hover:text-text-secondary transition-colors duration-300">
                        {project.description}
                      </p>

                      <div className="flex flex-wrap gap-2 mt-5">
                        {project.tags.map((tag) => (
                          <span
                            key={tag}
                            className="px-3 py-1 text-xs rounded-full bg-surface border border-border text-text-muted group-hover:text-text-secondary group-hover:border-border-hover transition-colors duration-300"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Bottom accent line */}
                <div className="h-px w-0 group-hover:w-full bg-gradient-to-r from-accent/30 via-accent-secondary/20 to-transparent transition-all duration-1000" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
