// Shared state between the DOM and the WebGL scene.
// Plain mutable object on purpose: the scene reads it every frame,
// so going through React state would only add re-renders.
export const sceneStore = {
  /** Which layer of the stack (0-3) is highlighted in the Expertise section. */
  activeLayer: 0,
};

export function setActiveLayer(i: number) {
  sceneStore.activeLayer = i;
}

/** Fired once the intro curtain has lifted (or was skipped). */
export const INTRO_EVENT = "intro:done";

export function markIntroDone() {
  document.documentElement.dataset.ready = "1";
  window.dispatchEvent(new Event(INTRO_EVENT));
}
