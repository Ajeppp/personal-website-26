"use client";

import { useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
  type MotionValue,
} from "framer-motion";

const ease: [number, number, number, number] = [0.22, 1, 0.36, 1];

/** Letters flip up out of the page, one by one. Driven by `show`. */
export function Chars({
  text,
  show,
  delay = 0,
  className = "",
}: {
  text: string;
  show: boolean;
  delay?: number;
  className?: string;
}) {
  return (
    <span className={`inline-block ${className}`} aria-label={text}>
      {text.split("").map((ch, i) => (
        <motion.span
          key={i}
          aria-hidden="true"
          className="inline-block origin-bottom will-change-transform"
          initial={{ opacity: 0, y: "45%", rotateX: -90 }}
          animate={show ? { opacity: 1, y: "0%", rotateX: 0 } : undefined}
          transition={{ duration: 1, ease, delay: delay + i * 0.045 }}
          style={{ transformPerspective: 700 }}
        >
          {ch}
        </motion.span>
      ))}
    </span>
  );
}

/** Words tilt up into place when scrolled into view. */
export function Words({
  children,
  className = "",
  delay = 0,
  as: Tag = "h2",
}: {
  children: string;
  className?: string;
  delay?: number;
  as?: "h2" | "h3" | "p" | "span";
}) {
  const words = children.split(" ");
  return (
    <Tag className={className}>
      {words.map((word, i) => (
        <span key={i} className="inline-block">
          <motion.span
            className="inline-block origin-bottom"
            initial={{ opacity: 0, y: "60%", rotateX: -75 }}
            whileInView={{ opacity: 1, y: "0%", rotateX: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.9, ease, delay: delay + i * 0.06 }}
            style={{ transformPerspective: 600 }}
          >
            {word}
          </motion.span>
          {i < words.length - 1 && " "}
        </span>
      ))}
    </Tag>
  );
}

function ScrubWord({
  progress,
  range,
  children,
}: {
  progress: MotionValue<number>;
  range: [number, number];
  children: string;
}) {
  const opacity = useTransform(progress, range, [0.14, 1]);
  return <motion.span style={{ opacity }}>{children} </motion.span>;
}

/** Paragraph that "lights up" word by word as you scroll through it. */
export function ScrubText({
  children,
  className = "",
}: {
  children: string;
  className?: string;
}) {
  const ref = useRef<HTMLParagraphElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.85", "end 0.5"],
  });
  const words = children.split(" ");
  return (
    <p ref={ref} className={className}>
      {words.map((w, i) => (
        <ScrubWord
          key={i}
          progress={scrollYProgress}
          range={[i / words.length, Math.min(1, (i + 1.5) / words.length)]}
        >
          {w}
        </ScrubWord>
      ))}
    </p>
  );
}
