"use client";

import dynamic from "next/dynamic";

// WebGL only exists in the browser; keep three.js out of the server bundle.
const Scene = dynamic(() => import("./three/Scene"), { ssr: false });

export default function SceneMount() {
  return <Scene />;
}
