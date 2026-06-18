"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

export default function Portrait() {
  const [errored, setErrored] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);
  const ref = useRef<HTMLDivElement>(null);

  // Catch images that fail before hydration (SSR onError race)
  useEffect(() => {
    const el = imgRef.current;
    if (el && el.complete && el.naturalWidth === 0) setErrored(true);
  }, []);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const yImg = useTransform(scrollYProgress, [0, 1], ["0%", "16%"]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.08]);

  return (
    <div ref={ref} className="relative">
      <motion.div
        initial={{ clipPath: "inset(100% 0 0 0)" }}
        animate={{ clipPath: "inset(0% 0 0 0)" }}
        transition={{ duration: 1.1, ease: [0.76, 0, 0.24, 1], delay: 0.3 }}
        className="relative aspect-[4/5] w-full overflow-hidden rounded-sm border border-border bg-surface"
      >
        {errored ? (
          <div className="absolute inset-0 flex flex-col items-center justify-center overflow-hidden">
            <div
              className="absolute inset-0"
              style={{
                background:
                  "linear-gradient(150deg, var(--color-surface), var(--color-bg-lighter) 55%, var(--color-accent-dim))",
              }}
            />
            <div className="grain absolute inset-0 opacity-[0.05]" />
            <span className="relative font-display italic text-accent/70 text-[9rem] leading-none">
              JS
            </span>
            <span className="relative eyebrow mt-2">Add public/portrait.jpg</span>
          </div>
        ) : (
          <motion.img
            ref={imgRef}
            src="/portrait.jpeg"
            onError={() => setErrored(true)}
            alt="Jefer Setiawan"
            style={{ y: yImg, scale }}
            className="absolute inset-0 h-[116%] w-full object-cover object-center"
          />
        )}
        {/* subtle vignette */}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-transparent" />
      </motion.div>

      <div className="mt-3 flex items-center justify-between">
        <span className="eyebrow">Jefer Setiawan</span>
        <span className="eyebrow">Est. 2024</span>
      </div>
    </div>
  );
}
