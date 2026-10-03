"use client";

import { motion } from "framer-motion";
import { Words } from "./Type";
import Magnetic from "./Magnetic";

const socials = [
  { label: "LinkedIn", handle: "in/jefer-setiawan", href: "https://www.linkedin.com/in/jefer-setiawan/" },
  { label: "GitHub", handle: "@Ajeppp", href: "https://github.com/Ajeppp" },
  { label: "WhatsApp", handle: "+62 812 5764 3560", href: "https://wa.me/6281257643560" },
  { label: "Email", handle: "jefersetiawan04@gmail.com", href: "mailto:jefersetiawan04@gmail.com" },
];

export default function Contact() {
  return (
    <section
      id="contact"
      data-stage="5"
      className="mx-auto flex min-h-screen max-w-7xl flex-col px-6 sm:px-10 pt-24 pb-24"
    >
      <div className="flex items-baseline gap-4 border-t border-border pt-6">
        <span className="eyebrow">(05)</span>
        <span className="eyebrow">Contact</span>
      </div>

      {/* The 3D planet parks itself on this spot */}
      <div data-orb-anchor aria-hidden="true" className="h-[30vh] sm:h-[42vh]" />

      <div className="text-center">
        <Words className="font-display font-bold text-[clamp(3rem,11vw,10.5rem)] leading-[0.86] tracking-[-0.055em]">
          Let&apos;s work
        </Words>
        <Words
          as="p"
          delay={0.12}
          className="font-serif font-light italic text-[clamp(3rem,11vw,10.5rem)] leading-[0.95] tracking-[-0.04em]"
        >
          together.
        </Words>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-12"
        >
          <Magnetic strength={0.5}>
            <a
              href="mailto:jefersetiawan04@gmail.com"
              data-cursor="Email"
              className="group inline-flex items-center gap-3 rounded-full bg-accent px-8 py-4 text-base font-medium text-bg transition-colors hover:bg-accent-hover"
            >
              jefersetiawan04@gmail.com
              <svg className="w-5 h-5 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </a>
          </Magnetic>
        </motion.div>
      </div>

      {/* Socials */}
      <div className="mt-20 grid sm:grid-cols-2 lg:grid-cols-4 border-t border-border">
        {socials.map((s, i) => (
          <motion.a
            key={s.label}
            href={s.href}
            target={s.label === "Email" ? undefined : "_blank"}
            rel={s.label === "Email" ? undefined : "noopener noreferrer"}
            data-cursor="Open"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.08 }}
            className="group flex flex-col gap-2 border-b sm:border-b-0 sm:border-r last:border-r-0 border-border px-1 py-7 sm:px-5"
          >
            <span className="eyebrow">{s.label}</span>
            <span className="text-text-primary group-hover:text-accent transition-colors break-all">
              {s.handle}
            </span>
          </motion.a>
        ))}
      </div>
    </section>
  );
}
