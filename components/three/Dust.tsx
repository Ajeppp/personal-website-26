"use client";

import { useEffect, useMemo, useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { view } from "./world";

/* Sparse motes at every depth. They wrap around the camera, so there is always
   something sliding past to read speed and depth from. */

const RANGE = 16;

const vertex = /* glsl */ `
uniform float uCamY;
uniform float uTime;
uniform float uScale;
attribute float aSeed;
varying float vFade;
varying float vSeed;
void main() {
  vec3 p = position;
  p.y = uCamY + mod(p.y - uCamY + ${(RANGE / 2).toFixed(1)}, ${RANGE.toFixed(1)}) - ${(RANGE / 2).toFixed(1)};
  p.x += sin(uTime * 0.2 + aSeed * 40.0) * 0.25;
  p.y += cos(uTime * 0.17 + aSeed * 31.0) * 0.25;
  vec4 mv = modelViewMatrix * vec4(p, 1.0);
  gl_Position = projectionMatrix * mv;
  gl_PointSize = uScale * (0.6 + aSeed * 1.6) * (14.0 / -mv.z);
  // fade out at the wrap seam and in the far fog
  vFade = (1.0 - smoothstep(${(RANGE / 2 - 2.5).toFixed(1)}, ${(RANGE / 2).toFixed(1)}, abs(p.y - uCamY)))
    * (1.0 - smoothstep(14.0, 26.0, -mv.z));
  vSeed = aSeed;
}`;

const fragment = /* glsl */ `
varying float vFade;
varying float vSeed;
void main() {
  float d = length(gl_PointCoord - 0.5) * 2.0;
  float a = (1.0 - smoothstep(0.2, 1.0, d)) * vFade;
  vec3 col = mix(vec3(0.82, 0.9, 0.8), vec3(0.78, 1.0, 0.24), step(0.72, vSeed));
  gl_FragColor = vec4(col, a * (0.22 + vSeed * 0.4));
}`;

function scatter() {
  const count = 240;
  const position = new Float32Array(count * 3);
  const seed = new Float32Array(count);
  // deterministic scatter (no Math.random: keeps renders stable)
  let n = 7;
  const rnd = () => {
    n = (n * 16807) % 2147483647;
    return n / 2147483647;
  };
  for (let i = 0; i < count; i++) {
    position[i * 3] = (rnd() - 0.5) * 22;
    position[i * 3 + 1] = rnd() * RANGE;
    position[i * 3 + 2] = -12 + rnd() * 19;
    seed[i] = rnd();
  }
  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute("position", new THREE.BufferAttribute(position, 3));
  geometry.setAttribute("aSeed", new THREE.BufferAttribute(seed, 1));
  return geometry;
}

export default function Dust() {
  const gl = useThree((st) => st.gl);
  const ref = useRef<THREE.Points<THREE.BufferGeometry, THREE.ShaderMaterial>>(null);

  const geometry = useMemo(() => scatter(), []);
  const material = useMemo(
    () =>
      new THREE.ShaderMaterial({
        vertexShader: vertex,
        fragmentShader: fragment,
        transparent: true,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
        uniforms: { uCamY: { value: 0 }, uTime: { value: 0 }, uScale: { value: 1 } },
      }),
    [],
  );

  useEffect(
    () => () => {
      geometry.dispose();
      material.dispose();
    },
    [geometry, material],
  );

  useFrame((_, dt) => {
    const u = ref.current?.material.uniforms;
    if (!u) return;
    u.uCamY.value = view.camY;
    u.uScale.value = gl.getPixelRatio();
    if (view.live) u.uTime.value += Math.min(dt, 0.05);
  });

  return <points ref={ref} geometry={geometry} material={material} frustumCulled={false} />;
}
