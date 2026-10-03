"use client";

import { motion } from "framer-motion";
import Magnetic from "./Magnetic";
import { SectionHead, Words } from "./Type";

const socials = [
  { label: "LinkedIn", handle: "in/jefer-setiawan", href: "https://www.linkedin.com/in/jefer-setiawan/" },
  { label: "GitHub", handle: "@Ajeppp", href: "https://github.com/Ajeppp" },
  { label: "WhatsApp", handle: "+62 812 5764 3560", href: "https://wa.me/6281257643560" },
  { label: "Email", handle: "jefersetiawan04@gmail.com", href: "mailto:jefersetiawan04@gmail.com" },
];

const ease: [number, number, number, number] = [0.16, 1, 0.3, 1];

export default function Contact() {
  return (
    <section id="contact" data-chapter="contact" className="relative z-[2] px-5 pb-20 pt-32 sm:px-10 sm:pt-48">
      <div className="mx-auto max-w-[92rem]">
        <div className="flex justify-center">
          <SectionHead num="05" label="Contact" />
        </div>

        <div className="mt-12 text-center">
          <h2 data-chapter="halo" className="display text-[clamp(4.2rem,17.5vw,18rem)] leading-[0.82] text-fg">
            <Words text="Let's work" className="block" />
            <Words text="*together.*" delay={0.16} className="block" />
          </h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease, delay: 0.25 }}
            className="mx-auto mt-10 max-w-md text-fg-2"
          >
            Open to new opportunities and freelance builds. Tell me what you&apos;re making.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease, delay: 0.35 }}
            className="mt-9"
          >
            <Magnetic strength={0.45}>
              <a
                href="mailto:jefersetiawan04@gmail.com"
                data-cursor="Write"
                className="group inline-flex items-center gap-3 rounded-full bg-accent px-7 py-4 text-sm font-semibold text-bg sm:px-9 sm:py-5 sm:text-lg"
              >
                jefersetiawan04@gmail.com
                <svg className="h-5 w-5 transition-transform duration-500 group-hover:translate-x-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </a>
            </Magnetic>
          </motion.div>
        </div>

        <div className="mt-28 grid border-t border-line sm:grid-cols-2 xl:grid-cols-4">
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
              transition={{ duration: 0.7, ease, delay: i * 0.08 }}
              className="group flex items-center justify-between gap-4 border-b border-line bg-bg/40 px-1 py-7 backdrop-blur-sm sm:px-5 sm:odd:border-r xl:border-r xl:last:border-r-0"
            >
              <span>
                <span className="eyebrow block">{s.label}</span>
                <span className="mt-2 block text-fg [overflow-wrap:anywhere] transition-colors duration-300 group-hover:text-accent">
                  {s.handle}
                </span>
              </span>
              <svg className="h-4 w-4 shrink-0 text-mute transition-all duration-300 group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25" />
              </svg>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}
