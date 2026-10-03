"use client";

import dynamic from "next/dynamic";

const Scene = dynamic(() => import("./three/Scene"), { ssr: false });

export default function Background() {
  return (
    <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none" aria-hidden="true">
      <div className="scene-fade absolute inset-0">
        <Scene />
      </div>
      <div className="vignette" />
      <div className="grain" />
    </div>
  );
}
