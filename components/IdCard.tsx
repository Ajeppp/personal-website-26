"use client";

import { useRef } from "react";
import { motion, useMotionTemplate, useMotionValue, useSpring, useTransform } from "framer-motion";
import Mark from "./Mark";

const fields = [
  ["Name", "Jefer Setiawan"],
  ["Role", "Fullstack Developer"],
  ["Base", "Tangerang, ID"],
  ["Since", "2024"],
];

/** A lanyard pass that tilts under the pointer, with a holographic sheen riding on top. */
export default function IdCard() {
  const ref = useRef<HTMLDivElement>(null);
  const px = useMotionValue(0.5);
  const py = useMotionValue(0.5);
  const sx = useSpring(px, { stiffness: 140, damping: 16, mass: 0.6 });
  const sy = useSpring(py, { stiffness: 140, damping: 16, mass: 0.6 });
  const rotateY = useTransform(sx, [0, 1], [-14, 14]);
  const rotateX = useTransform(sy, [0, 1], [11, -11]);
  const sheenX = useTransform(sx, [0, 1], [100, 0]);
  const sheenY = useTransform(sy, [0, 1], [100, 0]);
  const sheen = useMotionTemplate`${sheenX}% ${sheenY}%`;

  const move = (e: React.PointerEvent<HTMLDivElement>) => {
    const r = ref.current?.getBoundingClientRect();
    if (!r) return;
    px.set((e.clientX - r.left) / r.width);
    py.set((e.clientY - r.top) / r.height);
  };
  const leave = () => {
    px.set(0.5);
    py.set(0.5);
  };

  return (
    <div ref={ref} onPointerMove={move} onPointerLeave={leave} className="group mx-auto w-full max-w-[22rem] [perspective:1100px]" data-cursor="Hello">
      {/* lanyard */}
      <div className="mx-auto h-16 w-px bg-gradient-to-b from-transparent to-line-strong" />
      <motion.div
        style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
        initial={{ opacity: 0, rotateZ: -7, y: 50 }}
        whileInView={{ opacity: 1, rotateZ: -2.5, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ type: "spring", stiffness: 60, damping: 11 }}
        className="relative origin-top rounded-[1.4rem] border border-line-strong bg-surface p-4 shadow-[0_40px_90px_-30px_rgba(0,0,0,0.9)]"
      >
        <div className="mx-auto mb-4 h-2.5 w-14 rounded-full border border-line-strong bg-bg" />

        <div className="flex items-center justify-between" style={{ transform: "translateZ(30px)" }}>
          <Mark className="h-8 w-8 text-base" />
          <span className="eyebrow">Access — all layers</span>
        </div>

        <div className="relative mt-4 aspect-[4/5] overflow-hidden rounded-xl bg-surface-2">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/portrait.jpeg"
            alt="Jefer Setiawan"
            className="absolute inset-0 h-full w-full object-cover object-top grayscale contrast-[1.08] transition-[filter] duration-700 group-hover:grayscale-0"
          />
          <div className="absolute inset-0 bg-accent mix-blend-multiply transition-opacity duration-700 group-hover:opacity-0" />
          <div className="absolute inset-0 bg-gradient-to-t from-bg/70 via-transparent to-transparent" />
          <span className="display absolute bottom-3 left-3 text-4xl text-fg" style={{ transform: "translateZ(40px)" }}>
            JS<span className="text-accent">.</span>
          </span>
        </div>

        <dl className="mt-4 grid grid-cols-2 gap-x-4 gap-y-3" style={{ transform: "translateZ(24px)" }}>
          {fields.map(([k, v]) => (
            <div key={k}>
              <dt className="eyebrow !text-[0.58rem]">{k}</dt>
              <dd className="mt-0.5 text-sm text-fg">{v}</dd>
            </div>
          ))}
        </dl>

        <div className="mt-4 flex items-end justify-between border-t border-line pt-3">
          <div
            className="h-7 w-32 opacity-70"
            style={{
              background:
                "repeating-linear-gradient(90deg, var(--color-fg) 0 2px, transparent 2px 5px, var(--color-fg) 5px 6px, transparent 6px 10px, var(--color-fg) 10px 13px, transparent 13px 15px)",
            }}
          />
          <span className="eyebrow !text-[0.58rem]">jefer.my.id</span>
        </div>

        <motion.div
          aria-hidden="true"
          style={{ backgroundPosition: sheen }}
          className="holo pointer-events-none absolute inset-0 rounded-[1.4rem] opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        />
      </motion.div>
    </div>
  );
}
