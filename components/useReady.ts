"use client";

import { useSyncExternalStore } from "react";
import { stage, subscribeReady } from "../lib/stage";

/** True once the intro curtain has lifted — entrance animations wait on this. */
export default function useReady() {
  return useSyncExternalStore(
    subscribeReady,
    () => stage.ready,
    () => false,
  );
}
