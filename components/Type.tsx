"use client";

import { motion } from "framer-motion";

const ease: [number, number, number, number] = [0.16, 1, 0.3, 1];

const word = {
  hidden: { y: "120%", rotate: 5 },
  show: { y: "0%", rotate: 0, transition: { duration: 0.95, ease } },
};

/**
 * Words rise out of their own masks as the block scrolls into view.
 * Wrap a word in *asterisks* to set it in the serif accent.
 *
 * The in-view trigger lives on the block, not on the words: a word parked
 * outside its mask is fully clipped, so it would never report as visible.
 */
export function Words({
  text,
  className = "",
  delay = 0,
  stagger = 0.05,
  as = "span",
}: {
  text: string;
  className?: string;
  delay?: number;
  stagger?: number;
  as?: "span" | "h2" | "h3" | "p";
}) {
  const Tag = motion[as] as typeof motion.span;
  const words = text.split(" ");
  return (
    <Tag
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-60px" }}
      variants={{ hidden: {}, show: { transition: { staggerChildren: stagger, delayChildren: delay } } }}
    >
      {words.map((w, i) => {
        const accent = w.startsWith("*");
        return (
          <span
            key={i}
            className={`-my-[0.1em] inline-block overflow-hidden py-[0.1em] align-bottom ${
              i < words.length - 1 ? "mr-[0.2em]" : ""
            }`}
          >
            <motion.span
              variants={word}
              className={`inline-block origin-bottom-left ${accent ? "serif-i text-accent" : ""}`}
            >
              {w.replace(/\*/g, "")}
            </motion.span>
          </span>
        );
      })}
    </Tag>
  );
}

/** Chapter marker: number, hairline, label. */
export function SectionHead({ num, label }: { num: string; label: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -16 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.8, ease }}
      className="flex items-center gap-4"
    >
      <span className="eyebrow !text-accent">{num}</span>
      <span className="h-px w-10 bg-line-strong" />
      <span className="eyebrow">{label}</span>
    </motion.div>
  );
}
