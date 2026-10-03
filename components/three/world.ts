export const FOV = 35;
export const CAM_Z = 10;
export const TAN = Math.tan((FOV * Math.PI) / 360);
/** World height of exactly one viewport at z = 0 — the plane that scrolls 1:1 with the page. */
export const VIEW_H = 2 * CAM_Z * TAN;
export const BG = "#050608";

/** Per-frame values the rig publishes for the rest of the scene. */
export const view = {
  /** camera height from scroll alone, before pointer parallax */
  camY: 0,
  /** smoothed pointer, -1..1 */
  px: 0,
  py: 0,
  /** false when the visitor prefers reduced motion: time stands still */
  live: true,
};

/** A page section, in viewport heights measured from the top of the document. */
export type Chapter = { top: number; height: number };

export function measureChapters(vh: number) {
  const out: Record<string, Chapter> = {};
  document.querySelectorAll<HTMLElement>("[data-chapter]").forEach((el) => {
    const r = el.getBoundingClientRect();
    out[el.dataset.chapter as string] = {
      top: (r.top + window.scrollY) / vh,
      height: r.height / vh,
    };
  });
  return out;
}

export const damp = (from: number, to: number, rate: number, dt: number) =>
  from + (to - from) * (1 - Math.exp(-rate * dt));

export const clamp01 = (v: number) => Math.min(1, Math.max(0, v));

export const smooth = (a: number, b: number, v: number) => {
  const t = clamp01((v - a) / (b - a));
  return t * t * (3 - 2 * t);
};
