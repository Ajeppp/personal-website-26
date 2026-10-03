"use client";

import { useEffect, useMemo, useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { projects } from "../../lib/projects";
import { BROWSER, PHONE, screenSvg } from "../../lib/screens";
import { deckProgress } from "../../lib/stage";
import { CAM_Z, TAN, clamp01, damp, smooth, view } from "./world";

/* The Work section's projects as real objects: a phone or a browser slab each,
   queued in depth. Scroll pulls the next one forward and throws the last one
   past the camera. */

const SIZE = {
  phone: { w: 1.56, h: 3.2, r: 0.27, depth: 0.12, bevel: 0.025, inset: 0.07 },
  browser: { w: 4.4, h: 2.75, r: 0.12, depth: 0.06, bevel: 0.015, inset: 0.04 },
};

function roundedRect(w: number, h: number, r: number) {
  const x = -w / 2;
  const y = -h / 2;
  const s = new THREE.Shape();
  s.moveTo(x + r, y);
  s.lineTo(x + w - r, y);
  s.quadraticCurveTo(x + w, y, x + w, y + r);
  s.lineTo(x + w, y + h - r);
  s.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
  s.lineTo(x + r, y + h);
  s.quadraticCurveTo(x, y + h, x, y + h - r);
  s.lineTo(x, y + r);
  s.quadraticCurveTo(x, y, x + r, y);
  return s;
}

/** Flat rounded panel with UVs stretched 0..1 across it. */
function panel(w: number, h: number, r: number) {
  const g = new THREE.ShapeGeometry(roundedRect(w, h, r), 12);
  const pos = g.attributes.position;
  const uv = g.attributes.uv;
  for (let i = 0; i < pos.count; i++) uv.setXY(i, pos.getX(i) / w + 0.5, pos.getY(i) / h + 0.5);
  return g;
}

const glowVertex = /* glsl */ `
varying vec2 vUv;
void main() {
  vUv = uv;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}`;
const glowFragment = /* glsl */ `
uniform vec3 uColor;
uniform float uOpacity;
varying vec2 vUv;
void main() {
  float a = 1.0 - smoothstep(0.0, 1.0, length(vUv - 0.5) * 2.0);
  gl_FragColor = vec4(uColor, a * a * uOpacity);
}`;

function svgTexture(svg: string, w: number, h: number, scale: number, anisotropy: number) {
  return new Promise<THREE.CanvasTexture>((resolve, reject) => {
    const img = new Image();
    img.onload = () => {
      const canvas = document.createElement("canvas");
      canvas.width = Math.round(w * scale);
      canvas.height = Math.round(h * scale);
      canvas.getContext("2d")?.drawImage(img, 0, 0, canvas.width, canvas.height);
      const tex = new THREE.CanvasTexture(canvas);
      tex.colorSpace = THREE.SRGBColorSpace;
      tex.anisotropy = anisotropy;
      resolve(tex);
    };
    img.onerror = reject;
    img.src = `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`;
  });
}

type Device = {
  group: THREE.Group;
  screen: THREE.MeshStandardMaterial;
  glow: THREE.ShaderMaterial;
  kind: "phone" | "browser";
};

export default function Deck() {
  const size = useThree((st) => st.size);
  const gl = useThree((st) => st.gl);
  const section = useRef<HTMLElement | null>(null);
  const spin = useRef({ x: 0, y: 0 });

  const { root, devices, dispose } = useMemo(() => {
    const root = new THREE.Group();
    const trash: { dispose: () => void }[] = [];
    const shell = new THREE.MeshStandardMaterial({ color: "#12141a", metalness: 0.92, roughness: 0.28 });
    const geo = {
      phone: buildGeometry("phone"),
      browser: buildGeometry("browser"),
    };
    const halo = new THREE.PlaneGeometry(1, 1);
    trash.push(shell, halo, geo.phone.body, geo.phone.face, geo.browser.body, geo.browser.face);

    const devices: Device[] = projects.map((p) => {
      const d = SIZE[p.device];
      const group = new THREE.Group();
      group.visible = false;

      const screen = new THREE.MeshStandardMaterial({
        color: "#000000",
        emissive: "#000000",
        roughness: 0.2,
        metalness: 0,
        envMapIntensity: 0.3,
      });
      const glow = new THREE.ShaderMaterial({
        vertexShader: glowVertex,
        fragmentShader: glowFragment,
        transparent: true,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
        uniforms: { uColor: { value: new THREE.Color(p.hue) }, uOpacity: { value: 0 } },
      });
      trash.push(screen, glow);

      const aura = new THREE.Mesh(halo, glow);
      aura.scale.set(d.w * 2.6, d.h * 1.9, 1);
      aura.position.z = -0.7;
      aura.renderOrder = -1;

      const face = new THREE.Mesh(geo[p.device].face, screen);
      face.position.z = d.depth / 2 + d.bevel + 0.002;

      group.add(aura, new THREE.Mesh(geo[p.device].body, shell), face);
      root.add(group);
      return { group, screen, glow, kind: p.device };
    });

    return { root, devices, dispose: () => trash.forEach((t) => t.dispose()) };
  }, []);

  useEffect(() => dispose, [dispose]);

  // Rasterise the interface sketches once the scene is up.
  useEffect(() => {
    let alive = true;
    const loaded: THREE.Texture[] = [];
    const scale = window.innerWidth < 768 ? 1 : 1.3;
    const anisotropy = Math.min(8, gl.capabilities.getMaxAnisotropy());
    projects.forEach((p, i) => {
      const dim = p.device === "phone" ? PHONE : BROWSER;
      svgTexture(screenSvg(p.screen), dim.w, dim.h, scale, anisotropy)
        .then((tex) => {
          if (!alive) return tex.dispose();
          loaded.push(tex);
          const m = devices[i].screen;
          m.emissiveMap = tex;
          m.emissive.set("#ffffff");
          m.needsUpdate = true;
        })
        .catch(() => {});
    });
    return () => {
      alive = false;
      loaded.forEach((t) => t.dispose());
    };
  }, [devices, gl]);

  const time = useRef(0);

  useFrame((_, dt) => {
    const step = Math.min(dt, 0.05);
    if (view.live) time.current += step;
    section.current ??= document.querySelector<HTMLElement>("[data-chapter='work']");
    const el = section.current;
    const count = devices.length;
    const p = el ? deckProgress(el, count) : -1;

    const on = p > -0.999 && p < count - 0.001;
    root.visible = on;
    if (!on) return;

    const aspect = size.width / size.height;
    const narrow = aspect < 0.9;
    const tw = TAN * aspect; // half-width of the view, per unit of depth
    const focus = 7.2;
    const sx0 = narrow ? 0 : tw * 0.47;
    const sy0 = narrow ? TAN * 0.35 : -TAN * 0.02;
    // everything starts far back in the fog and is pulled in as the section arrives
    const arrive = 1 - smooth(-1, -0.25, p);

    spin.current.x = damp(spin.current.x, view.px, 4, step);
    spin.current.y = damp(spin.current.y, view.py, 4, step);

    devices.forEach((dev, i) => {
      const d = i - p;
      const g = dev.group;
      g.visible = d < 2.3 && d > -1.02;
      if (!g.visible) return;

      const dim = SIZE[dev.kind];
      const phone = dev.kind === "phone";
      const fit = phone
        ? (2 * TAN * focus * (narrow ? 0.39 : 0.68)) / dim.h
        : Math.min((2 * tw * focus * (narrow ? 0.9 : 0.47)) / dim.w, (2 * TAN * focus * (narrow ? 0.32 : 0.6)) / dim.h);
      g.scale.setScalar(fit);

      const baseY = narrow ? -0.16 : phone ? -0.5 : -0.36;
      let depth: number;
      let sx: number;
      let sy: number;
      let ry: number;
      let rx = 0.05;
      let rz = phone ? 0.035 : 0;

      if (d >= 0) {
        // queued behind the current one, up and to the side
        depth = focus + d * 6.5 + arrive * 16;
        sx = sx0 + d * tw * (narrow ? 0.1 : 0.2);
        sy = sy0 + d * TAN * 0.34;
        ry = baseY - d * 0.75;
        rx += d * 0.16;
        rz += d * 0.14;
      } else {
        // thrown past the camera
        const k = -d;
        const e = k * k;
        depth = focus - k * 2.8;
        sx = sx0 + e * tw * (narrow ? 0.3 : 1.7);
        sy = sy0 + e * TAN * (narrow ? 2.6 : 0.5);
        ry = baseY + k * 1.5;
        rz -= k * 0.4;
      }

      const near = clamp01(1 - Math.abs(d) * 1.6);
      const bob = time.current * 0.7 + i * 1.7;
      g.position.set(sx * depth, view.camY + sy * depth + Math.sin(bob) * 0.035 * near, CAM_Z - depth);
      g.rotation.set(
        rx - spin.current.y * 0.12 * near + Math.cos(bob * 0.8) * 0.02,
        ry + spin.current.x * 0.22 * near + Math.sin(bob * 0.6) * 0.045,
        rz,
      );
      dev.glow.uniforms.uOpacity.value = near * (narrow ? 0.32 : 0.42);
    });
  });

  return <primitive object={root} />;
}

function buildGeometry(kind: "phone" | "browser") {
  const d = SIZE[kind];
  const body = new THREE.ExtrudeGeometry(roundedRect(d.w - d.bevel * 2, d.h - d.bevel * 2, d.r - d.bevel), {
    depth: d.depth,
    bevelEnabled: true,
    bevelThickness: d.bevel,
    bevelSize: d.bevel,
    bevelSegments: 4,
    curveSegments: 16,
  });
  body.translate(0, 0, -d.depth / 2);
  return { body, face: panel(d.w - d.inset, d.h - d.inset, d.r - d.inset / 2) };
}
