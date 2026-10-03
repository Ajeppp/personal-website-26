/**
 * Mutable bridge between the DOM and the WebGL scene.
 * Read every frame by the scene, written by plain event handlers —
 * nothing here triggers a React render except the `ready` flag.
 */
export const stage = {
  /** true once the intro curtain lifts; starts the ribbon draw + hero type */
  ready: false,
  /** pointer in -1..1, y up */
  pointer: { x: 0, y: 0 },
};

const listeners = new Set<() => void>();

export function markReady() {
  if (stage.ready) return;
  stage.ready = true;
  listeners.forEach((fn) => fn());
}

export function subscribeReady(fn: () => void) {
  listeners.add(fn);
  return () => {
    listeners.delete(fn);
  };
}

const clamp01 = (v: number) => Math.min(1, Math.max(0, v));
const smooth = (a: number, b: number, v: number) => {
  const t = clamp01((v - a) / (b - a));
  return t * t * (3 - 2 * t);
};

/** Share of each project's scroll spent resting before the deck advances. */
const HOLD = 0.6;

/**
 * Continuous project index for the pinned Work deck:
 * -1 while the section is still below the fold, 0…count-1 while pinned
 * (resting on each project, then gliding to the next), count once it has left.
 */
export function deckProgress(el: HTMLElement, count: number) {
  const r = el.getBoundingClientRect();
  const vh = window.innerHeight;
  const span = Math.max(r.height - vh, 1);
  const enter = smooth(0, 1, (vh - r.top) / vh);
  const exit = smooth(0, 1, (vh - r.bottom) / vh);
  const t = clamp01(-r.top / span) * count;
  const i = Math.min(Math.floor(t), count - 1);
  const step = i < count - 1 ? smooth(HOLD, 1, t - i) : 0;
  return enter - 1 + i + step + exit;
}
