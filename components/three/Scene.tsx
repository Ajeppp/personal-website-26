"use client";

import { useEffect, useMemo, useRef } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { RoomEnvironment } from "three/examples/jsm/environments/RoomEnvironment.js";
import { stage } from "../../lib/stage";
import { BG, CAM_Z, FOV, VIEW_H, damp, view } from "./world";
import Ribbon from "./Ribbon";
import Deck from "./Deck";
import Dust from "./Dust";

/** Soft studio reflections for the devices and rings — generated, nothing fetched. */
function Studio() {
  const gl = useThree((st) => st.gl);
  const env = useMemo(() => {
    const pmrem = new THREE.PMREMGenerator(gl);
    const target = pmrem.fromScene(new RoomEnvironment(), 0.04);
    pmrem.dispose();
    return target;
  }, [gl]);
  useEffect(() => () => env.dispose(), [env]);

  return (
    <>
      <primitive object={env.texture} attach="environment" />
      <fog attach="fog" args={[BG, 11.5, 27]} />
      <directionalLight position={[3, 5, 7]} intensity={1.4} />
      <ambientLight intensity={0.25} />
    </>
  );
}

/** Scroll is the camera: one viewport of page = one viewport of world, straight down. */
function Rig() {
  const size = useThree((st) => st.size);
  const last = useRef({ y: 0, tilt: 0 });

  useEffect(() => {
    view.live = !window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const move = (e: PointerEvent) => {
      if (e.pointerType === "touch") return;
      stage.pointer.x = (e.clientX / window.innerWidth) * 2 - 1;
      stage.pointer.y = -((e.clientY / window.innerHeight) * 2 - 1);
    };
    window.addEventListener("pointermove", move, { passive: true });
    return () => window.removeEventListener("pointermove", move);
  }, []);

  useFrame(({ camera }, dt) => {
    const step = Math.min(dt, 0.05);
    const y = window.scrollY;
    view.camY = -(y / size.height) * VIEW_H;
    if (view.live) {
      view.px = damp(view.px, stage.pointer.x, 3, step);
      view.py = damp(view.py, stage.pointer.y, 3, step);
      // lean into the direction of travel
      const speed = (y - last.current.y) / size.height / Math.max(step, 0.001);
      last.current.tilt = damp(last.current.tilt, Math.max(-1, Math.min(1, speed * 0.25)), 4, step);
    }
    last.current.y = y;

    camera.position.set(view.px * 0.32, view.camY + view.py * 0.2, CAM_Z);
    camera.rotation.set(view.py * 0.012 - last.current.tilt * 0.045, -view.px * 0.02, 0);
  });

  return null;
}

export default function Scene() {
  return (
    <div className="pointer-events-none fixed inset-x-0 top-0 z-[1] h-[100lvh]" aria-hidden="true">
      <Canvas
        flat
        dpr={[1, 1.75]}
        resize={{ scroll: false }}
        camera={{ fov: FOV, position: [0, 0, CAM_Z], near: 0.1, far: 70 }}
        scene={{ environmentIntensity: 0.75 }}
        gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      >
        <Studio />
        <Rig />
        <Ribbon />
        <Deck />
        <Dust />
      </Canvas>
    </div>
  );
}
