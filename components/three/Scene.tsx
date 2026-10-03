"use client";

import { useEffect, useMemo, useRef } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { sceneStore } from "../../lib/scene";
import {
  particlesVertex,
  particlesFragment,
  coreVertex,
  coreFragment,
} from "./shaders";

const WARM = "#ff5a36";
const COOL = "#7d93ff";

// Where the object sits for each stage, in world units (camera at z=6, fov 40).
// x is multiplied by the viewport aspect so it tracks the layout on any width.
type Pose = { x: number; y: number; z: number; scale: number; opacity: number; core: number };
const DESKTOP: Pose[] = [
  { x: 0.5, y: 0.05, z: 0, scale: 1.3, opacity: 0.95, core: 1 }, // hero — orb
  { x: 0, y: 0, z: 0, scale: 1, opacity: 0.4, core: 0 }, // about — dust
  { x: 0.52, y: -0.05, z: 0, scale: 1.15, opacity: 1, core: 0 }, // expertise — stack
  { x: 0.6, y: 0, z: 0, scale: 1, opacity: 0.9, core: 0 }, // experience — helix
  { x: 0, y: 0, z: 0, scale: 1, opacity: 0.85, core: 0 }, // work — tunnel
  { x: 0, y: 0.5, z: 0, scale: 0.82, opacity: 0.9, core: 0.78 }, // contact — planet (x/y follow [data-orb-anchor])
];
const MOBILE: Pose[] = [
  { x: 0.42, y: 0.55, z: 0, scale: 0.62, opacity: 0.9, core: 1 },
  { x: 0, y: 0, z: 0, scale: 0.7, opacity: 0.35, core: 0 },
  { x: 0, y: 0.2, z: -1, scale: 0.6, opacity: 0.3, core: 0 },
  { x: 0.5, y: 0, z: -1, scale: 0.6, opacity: 0.3, core: 0 },
  { x: 0, y: 0, z: 0, scale: 0.6, opacity: 0.4, core: 0 },
  { x: 0, y: 0.75, z: 0, scale: 0.42, opacity: 0.85, core: 0.8 },
];

const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
const smooth = (t: number) => {
  const c = Math.min(1, Math.max(0, t));
  return c * c * (3 - 2 * c);
};

function buildShapes(n: number) {
  const p0 = new Float32Array(n * 3);
  const p1 = new Float32Array(n * 3);
  const p2 = new Float32Array(n * 3);
  const p3 = new Float32Array(n * 3);
  const p4 = new Float32Array(n * 3);
  const p5 = new Float32Array(n * 3);
  const rand = new Float32Array(n * 4);

  const perLayer = Math.ceil(n / 4);
  const side = Math.ceil(Math.sqrt(perLayer));
  const golden = Math.PI * (3 - Math.sqrt(5));
  const set = (arr: Float32Array, i: number, x: number, y: number, z: number) => {
    arr[i * 3] = x;
    arr[i * 3 + 1] = y;
    arr[i * 3 + 2] = z;
  };
  const sphere = (i: number, total: number, r: number) => {
    const y = 1 - (i / Math.max(1, total - 1)) * 2;
    const rad = Math.sqrt(1 - y * y);
    const th = golden * i;
    return [Math.cos(th) * rad * r, y * r, Math.sin(th) * rad * r] as const;
  };

  for (let i = 0; i < n; i++) {
    const r1 = Math.random();
    const r2 = Math.random();
    const r3 = Math.random();
    const layer = Math.min(3, Math.floor(i / perLayer));
    rand.set([r1, r2, r3, layer], i * 4);

    // 0 — orb: a shell hugging the core plus a wide orbiting disc
    if (i % 3 !== 0) {
      const [x, y, z] = sphere(i, n, 1.02 + Math.pow(r1, 3) * 0.5);
      set(p0, i, x, y, z);
    } else {
      const a = r1 * Math.PI * 2;
      const r = 1.5 + Math.pow(r2, 1.6) * 0.9;
      set(p0, i, Math.cos(a) * r, (r3 - 0.5) * 0.06, Math.sin(a) * r);
    }

    // 1 — dust
    set(p1, i, (r1 - 0.5) * 15, (r2 - 0.5) * 8.5, -7 + r3 * 9.5);

    // 2 — stack: four grids, top layer = frontend
    const j = i - layer * perLayer;
    const gx = (j % side) / (side - 1) - 0.5;
    const gz = Math.floor(j / side) / (side - 1) - 0.5;
    set(p2, i, gx * 2.0, (1.5 - layer) * 0.72, gz * 2.0);

    // 3 — double helix with rungs
    const tt = i / n;
    const ang = tt * Math.PI * 2 * 3.2;
    const hy = (tt - 0.5) * 5.4;
    if (i % 6 === 0) {
      const u = (r1 - 0.5) * 2;
      const snapped = Math.round(ang / 0.5) * 0.5;
      set(p3, i, Math.cos(snapped) * 0.78 * u, ((snapped / (Math.PI * 2 * 3.2)) - 0.5) * 5.4, Math.sin(snapped) * 0.78 * u);
    } else {
      const strand = i % 2 === 0 ? 0 : Math.PI;
      const jit = 0.05;
      set(
        p3,
        i,
        Math.cos(ang + strand) * 0.78 + (r1 - 0.5) * jit,
        hy + (r2 - 0.5) * jit,
        Math.sin(ang + strand) * 0.78 + (r3 - 0.5) * jit
      );
    }

    // 4 — tunnel around the view axis
    const ta = r1 * Math.PI * 2;
    const tr = 2.5 + Math.pow(r2, 2) * 2.4;
    set(p4, i, Math.cos(ta) * tr, Math.sin(ta) * tr * 0.72, -12 + r3 * 16);

    // 5 — planet with a ring
    if (i % 5 < 2) {
      const [x, y, z] = sphere(i, n, 0.92 + Math.pow(r1, 4) * 0.25);
      set(p5, i, x, y, z);
    } else {
      const a = r1 * Math.PI * 2;
      const r = 1.35 + Math.pow(r2, 1.3) * 1.0;
      set(p5, i, Math.cos(a) * r, (r3 - 0.5) * 0.03, Math.sin(a) * r);
    }
  }

  return { p0, p1, p2, p3, p4, p5, rand };
}

function World() {
  const group = useRef<THREE.Group>(null);
  const core = useRef<THREE.Mesh<THREE.BufferGeometry, THREE.ShaderMaterial>>(null);
  const points = useRef<THREE.Points<THREE.BufferGeometry, THREE.ShaderMaterial>>(null);
  const { size, viewport, gl } = useThree();
  const mobile = size.width < 768;

  const count = mobile ? 7000 : 18000;
  const shapes = useMemo(() => buildShapes(count), [count]);

  // Materials are built by hand (not as JSX) so the uniform objects below
  // stay the exact ones the shaders read — R3F clones a `uniforms` prop.
  const { pMaterial, cMaterial } = useMemo(() => {
    const pUniforms = {
      uTime: { value: 0 },
      uStage: { value: 0 },
      uSize: { value: 20 },
      uVel: { value: 0 },
      uOpacity: { value: 0 },
      uLayerW: { value: new THREE.Vector4(1, 0, 0, 0) },
      uMouse: { value: new THREE.Vector3(99, 99, 0) },
      uWarm: { value: new THREE.Color(WARM) },
      uCool: { value: new THREE.Color(COOL) },
    };
    const cUniforms = {
      uTime: { value: 0 },
      uVel: { value: 0 },
      uWarm: { value: new THREE.Color(WARM) },
      uCool: { value: new THREE.Color(COOL) },
    };
    const pMaterial = new THREE.ShaderMaterial({
      vertexShader: particlesVertex,
      fragmentShader: particlesFragment,
      uniforms: pUniforms,
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    });
    const cMaterial = new THREE.ShaderMaterial({
      vertexShader: coreVertex,
      fragmentShader: coreFragment,
      uniforms: cUniforms,
    });
    return { pMaterial, cMaterial };
  }, []);

  useEffect(
    () => () => {
      pMaterial.dispose();
      cMaterial.dispose();
    },
    [pMaterial, cMaterial]
  );

  // Scroll → stage. Each [data-stage] section top is a boundary; the morph
  // runs while that top travels from 85% down the viewport up to 35%.
  const bounds = useRef<number[]>([]);
  const anchor = useRef<HTMLElement | null>(null);
  const pointer = useRef({ x: 0, y: 0, tx: 0, ty: 0, active: false });
  const motion = useRef({ lastY: 0, vel: 0, reduced: false });

  useEffect(() => {
    const measure = () => {
      const els = Array.from(document.querySelectorAll<HTMLElement>("[data-stage]")).sort(
        (a, b) => Number(a.dataset.stage) - Number(b.dataset.stage)
      );
      bounds.current = els.slice(1).map((el) => el.getBoundingClientRect().top + window.scrollY);
      anchor.current = document.querySelector<HTMLElement>("[data-orb-anchor]");
    };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(document.body);
    window.addEventListener("resize", measure);

    const onMove = (e: PointerEvent) => {
      pointer.current.tx = (e.clientX / window.innerWidth) * 2 - 1;
      pointer.current.ty = -((e.clientY / window.innerHeight) * 2 - 1);
      pointer.current.active = e.pointerType === "mouse";
    };
    window.addEventListener("pointermove", onMove, { passive: true });

    motion.current.lastY = window.scrollY;
    motion.current.reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    return () => {
      ro.disconnect();
      window.removeEventListener("resize", measure);
      window.removeEventListener("pointermove", onMove);
    };
  }, []);

  useFrame((state, rawDt) => {
    if (!points.current || !core.current) return;
    const pUniforms = points.current.material.uniforms;
    const cUniforms = core.current.material.uniforms;

    const dt = Math.min(rawDt, 0.05);
    const vh = window.innerHeight;
    const y = window.scrollY;
    const c = y + vh * 0.5;

    let stage = 0;
    for (const b of bounds.current) stage += smooth((c - b + vh * 0.35) / (vh * 0.5));

    const m = motion.current;
    // frame-rate independent smoothing factors
    const k = 1 - Math.exp(-dt * 5);
    const kFast = 1 - Math.exp(-dt * 8);
    m.vel = lerp(m.vel, Math.min(Math.abs(y - m.lastY) / 60, 1.5), kFast);
    m.lastY = y;

    const poses = mobile ? MOBILE : DESKTOP;
    const i = Math.min(poses.length - 2, Math.floor(stage));
    const f = smooth(stage - i);
    const a = poses[i];
    const b = poses[i + 1];
    const halfW = viewport.width / 2;
    const halfH = viewport.height / 2;

    // The last pose is pinned to an element in the Contact section, so the
    // planet scrolls with the page instead of sitting under the footer.
    let bx = b.x * halfW;
    let by = b.y * halfH;
    if (i + 1 === poses.length - 1 && anchor.current) {
      const r = anchor.current.getBoundingClientRect();
      bx = ((r.left + r.width / 2) / window.innerWidth) * 2 * halfW - halfW;
      by = halfH - ((r.top + r.height / 2) / vh) * 2 * halfH;
    }

    const p = pointer.current;
    p.x = lerp(p.x, p.tx, k * 0.7);
    p.y = lerp(p.y, p.ty, k * 0.7);

    const g = group.current;
    if (g) {
      // once fully in the last stage, track the anchor tightly
      const kPos = stage > 4.95 ? 1 - Math.exp(-dt * 18) : k;
      g.position.x = lerp(g.position.x, lerp(a.x * halfW, bx, f), kPos);
      g.position.y = lerp(g.position.y, lerp(a.y * halfH, by, f), kPos);
      g.position.z = lerp(g.position.z, lerp(a.z, b.z, f), k);
      g.scale.setScalar(lerp(g.scale.x, lerp(a.scale, b.scale, f), k));
      g.rotation.y = p.x * 0.22;
      g.rotation.x = -p.y * 0.16;
    }

    const t = m.reduced ? 0 : state.clock.elapsedTime;
    pUniforms.uTime.value = t;
    pUniforms.uStage.value = stage;
    pUniforms.uVel.value = m.reduced ? 0 : m.vel;
    pUniforms.uOpacity.value = lerp(pUniforms.uOpacity.value, lerp(a.opacity, b.opacity, f), k);
    pUniforms.uSize.value = size.height * gl.getPixelRatio() * (mobile ? 0.02 : 0.025);
    if (p.active) pUniforms.uMouse.value.set(p.x * halfW, p.y * halfH, 0);

    const w = pUniforms.uLayerW.value;
    const al = sceneStore.activeLayer;
    w.x = lerp(w.x, al === 0 ? 1 : 0, kFast);
    w.y = lerp(w.y, al === 1 ? 1 : 0, kFast);
    w.z = lerp(w.z, al === 2 ? 1 : 0, kFast);
    w.w = lerp(w.w, al === 3 ? 1 : 0, kFast);

    cUniforms.uTime.value = t;
    cUniforms.uVel.value = pUniforms.uVel.value;
    const cs = lerp(a.core, b.core, f);
    core.current.scale.setScalar(lerp(core.current.scale.x, cs, kFast));
    core.current.visible = core.current.scale.x > 0.01;
    core.current.rotation.y = t * 0.1;

    state.camera.position.x = lerp(state.camera.position.x, p.x * 0.18, k * 0.6);
    state.camera.position.y = lerp(state.camera.position.y, p.y * 0.12, k * 0.6);
    state.camera.lookAt(0, 0, 0);
  });

  return (
    <group ref={group}>
      <mesh ref={core} scale={0}>
        <icosahedronGeometry args={[0.82, mobile ? 32 : 56]} />
        <primitive object={cMaterial} attach="material" />
      </mesh>
      <points ref={points} frustumCulled={false}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[shapes.p0, 3]} />
          <bufferAttribute attach="attributes-aP1" args={[shapes.p1, 3]} />
          <bufferAttribute attach="attributes-aP2" args={[shapes.p2, 3]} />
          <bufferAttribute attach="attributes-aP3" args={[shapes.p3, 3]} />
          <bufferAttribute attach="attributes-aP4" args={[shapes.p4, 3]} />
          <bufferAttribute attach="attributes-aP5" args={[shapes.p5, 3]} />
          <bufferAttribute attach="attributes-aRand" args={[shapes.rand, 4]} />
        </bufferGeometry>
        <primitive object={pMaterial} attach="material" />
      </points>
    </group>
  );
}

export default function Scene() {
  return (
    <Canvas
      flat
      dpr={[1, 1.75]}
      camera={{ position: [0, 0, 6], fov: 40, near: 0.1, far: 50 }}
      gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      style={{ pointerEvents: "none" }}
    >
      <World />
    </Canvas>
  );
}
