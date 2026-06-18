"use client";

import { motion } from "framer-motion";

export default function TextReveal({
  children,
  className = "",
  delay = 0,
  once = true,
  gradient = false,
  as: Tag = "span",
}: {
  children: string;
  className?: string;
  delay?: number;
  once?: boolean;
  gradient?: boolean;
  as?: "span" | "h1" | "h2" | "h3" | "p";
}) {
  const words = children.split(" ");

  return (
    <Tag className={className}>
      {words.map((word, i) => (
        <span
          key={i}
          className={`inline-block overflow-hidden align-bottom pb-[0.12em] -mb-[0.12em] ${
            i < words.length - 1 ? "mr-[0.25em]" : ""
          }`}
        >
          <motion.span
            className={`inline-block ${gradient ? "gradient-text" : ""}`}
            initial={{ y: "110%" }}
            whileInView={{ y: 0 }}
            viewport={{ once, margin: "-50px" }}
            transition={{
              duration: 0.6,
              ease: "circOut" as const,
              delay: delay + i * 0.04,
            }}
          >
            {word}
          </motion.span>
        </span>
      ))}
    </Tag>
  );
}
