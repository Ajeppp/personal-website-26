"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export default function CursorLabel() {
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const sx = useSpring(x, { stiffness: 500, damping: 40, mass: 0.5 });
  const sy = useSpring(y, { stiffness: 500, damping: 40, mass: 0.5 });
  const [label, setLabel] = useState<string | null>(null);
  const [enabled, setEnabled] = useState(false);
  const [moved, setMoved] = useState(false);
  const [down, setDown] = useState(false);

  useEffect(() => {
    if (
      window.matchMedia("(pointer: coarse)").matches ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      return;
    }
    setEnabled(true);
    document.body.classList.add("cursor-none");

    const move = (e: MouseEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
      setMoved(true);
    };
    const over = (e: MouseEvent) => {
      const t = (e.target as HTMLElement)?.closest?.("[data-cursor]");
      setLabel(t ? t.getAttribute("data-cursor") : null);
    };
    const dn = () => setDown(true);
    const up = () => setDown(false);

    window.addEventListener("mousemove", move, { passive: true });
    window.addEventListener("mouseover", over, { passive: true });
    window.addEventListener("mousedown", dn);
    window.addEventListener("mouseup", up);

    return () => {
      document.body.classList.remove("cursor-none");
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mouseover", over);
      window.removeEventListener("mousedown", dn);
      window.removeEventListener("mouseup", up);
    };
  }, [x, y]);

  if (!enabled) return null;

  const hasLabel = !!label;

  return (
    <motion.div
      aria-hidden="true"
      style={{ x: sx, y: sy, opacity: moved ? 1 : 0 }}
      className="pointer-events-none fixed left-0 top-0 z-[90]"
    >
      <motion.div
        className="-translate-x-1/2 -translate-y-1/2 flex items-center justify-center rounded-full font-mono uppercase tracking-[0.15em]"
        animate={{
          width: hasLabel ? 76 : down ? 10 : 14,
          height: hasLabel ? 76 : down ? 10 : 14,
          backgroundColor: hasLabel
            ? "var(--color-accent)"
            : "var(--color-text-primary)",
        }}
        transition={{ type: "spring", stiffness: 350, damping: 28 }}
      >
        {hasLabel && (
          <span className="text-[10px] text-[var(--color-bg)]">{label}</span>
        )}
      </motion.div>
    </motion.div>
  );
}
