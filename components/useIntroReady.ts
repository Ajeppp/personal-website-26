"use client";

import { useSyncExternalStore } from "react";
import { INTRO_EVENT } from "../lib/scene";

const subscribe = (cb: () => void) => {
  window.addEventListener(INTRO_EVENT, cb);
  return () => window.removeEventListener(INTRO_EVENT, cb);
};

/** True once the intro curtain is out of the way, so entrances aren't wasted behind it. */
export default function useIntroReady() {
  return useSyncExternalStore(
    subscribe,
    () => document.documentElement.dataset.ready === "1",
    () => false
  );
}
