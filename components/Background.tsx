"use client";

import { useEffect, useRef } from "react";
import { useTheme } from "./ThemeProvider";

export default function Background() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { theme } = useTheme();
  const colorsRef = useRef({ dot: "20,184,166", dotA: 1, lineA: 1 });

  useEffect(() => {
    colorsRef.current =
      theme === "light"
        ? { dot: "13,148,136", dotA: 1.8, lineA: 1.7 }
        : { dot: "20,184,166", dotA: 1, lineA: 1 };
  }, [theme]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let w = 0;
    let h = 0;
    let mx = -9999;
    let my = -9999;
    let raf = 0;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    type Dot = {
      x: number;
      y: number;
      vx: number;
      vy: number;
      r: number;
      a: number;
    };

    let dots: Dot[] = [];
    const MAX_DIST = 130;
    const MOUSE_R = 170;

    const resize = () => {
      w = window.innerWidth;
      h = window.innerHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const seed = () => {
      const n = w < 640 ? 30 : w < 1024 ? 50 : 70;
      dots = Array.from({ length: n }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.35,
        vy: (Math.random() - 0.5) * 0.35,
        r: Math.random() * 1.4 + 0.4,
        a: Math.random() * 0.4 + 0.15,
      }));
    };

    const tick = () => {
      const c = colorsRef.current;
      ctx.clearRect(0, 0, w, h);

      for (let i = 0; i < dots.length; i++) {
        const p = dots[i];

        const dmx = p.x - mx;
        const dmy = p.y - my;
        const md = Math.sqrt(dmx * dmx + dmy * dmy);
        if (md < MOUSE_R && md > 0) {
          const f = (1 - md / MOUSE_R) * 0.012;
          p.vx += dmx * f;
          p.vy += dmy * f;
        }

        p.x += p.vx;
        p.y += p.vy;
        p.vx *= 0.993;
        p.vy *= 0.993;

        if (p.x < -20) p.x = w + 20;
        if (p.x > w + 20) p.x = -20;
        if (p.y < -20) p.y = h + 20;
        if (p.y > h + 20) p.y = -20;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${c.dot},${p.a * c.dotA})`;
        ctx.fill();

        for (let j = i + 1; j < dots.length; j++) {
          const q = dots[j];
          const dx = p.x - q.x;
          const dy = p.y - q.y;
          const d2 = dx * dx + dy * dy;
          if (d2 < MAX_DIST * MAX_DIST) {
            const alpha = (1 - Math.sqrt(d2) / MAX_DIST) * 0.1 * c.lineA;
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(q.x, q.y);
            ctx.strokeStyle = `rgba(${c.dot},${alpha})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }

      raf = requestAnimationFrame(tick);
    };

    const onMove = (e: MouseEvent) => {
      mx = e.clientX;
      my = e.clientY;
    };
    const onLeave = () => {
      mx = -9999;
      my = -9999;
    };

    resize();
    seed();
    tick();

    const onResize = () => {
      resize();
      seed();
    };

    window.addEventListener("resize", onResize);
    window.addEventListener("mousemove", onMove, { passive: true });
    document.addEventListener("mouseleave", onLeave);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", onResize);
      window.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseleave", onLeave);
    };
  }, []);

  return (
    <div className="fixed inset-0 z-0 pointer-events-none" aria-hidden="true">
      <canvas ref={canvasRef} className="absolute inset-0" />
      <div className="noise-overlay" />
    </div>
  );
}
