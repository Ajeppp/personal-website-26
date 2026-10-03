"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { stage } from "../../lib/stage";
import { BG, CAM_Z, VIEW_H, damp, measureChapters, view, type Chapter } from "./world";

/* One silk band (plus two fine threads orbiting it) that runs the whole page.
   The centre line is baked into the geometry; the twist, flutter and the
   "being drawn" head are all resolved in the vertex shader. */

const vertex = /* glsl */ `
uniform float uTime;
uniform float uWidth;
uniform float uHead;
uniform float uKnot;

attribute vec3 aN;
attribute vec3 aB;
attribute float aSide;
attribute float aS;
attribute float aKind;

varying vec3 vNormal;
varying vec3 vWorld;
varying float vS;
varying float vV;
varying float vKind;

void main() {
  vec3 T = normalize(cross(aN, aB));
  // pointed at the tail and at the head that is still being drawn
  float taper = smoothstep(0.0, 2.4, aS) * smoothstep(0.0, 3.0, uHead - aS);
  vec3 p = position;
  vec3 nrm;

  if (aKind < 0.5) {
    float ang = aS * 0.2 + sin(aS * 0.13) * 1.1 + uTime * 0.16;
    vec3 dir = cos(ang) * aB + sin(ang) * aN;
    nrm = cos(ang) * aN - sin(ang) * aB;
    p += nrm * (sin(aS * 0.9 - uTime * 0.9) * 0.06 + sin(aS * 0.31 + uTime * 0.5) * 0.1);
    // broad through the hero knot, slimmer once it runs behind copy
    float broad = 1.0 + 0.55 * (1.0 - smoothstep(uKnot - 3.0, uKnot + 4.0, aS));
    p += dir * aSide * uWidth * broad * (0.8 + 0.2 * sin(aS * 0.37 + 1.3)) * taper;
  } else {
    float ph = aKind > 1.5 ? 3.14159 : 0.0;
    float ang = aS * 0.8 + uTime * 0.4 + ph;
    float rad = uWidth * (1.55 + 0.4 * sin(aS * 0.4 + ph)) * taper;
    p += (cos(ang) * aN + sin(ang) * aB) * rad;
    vec3 toCam = normalize(cameraPosition - (modelMatrix * vec4(p, 1.0)).xyz);
    nrm = toCam;
    p += normalize(cross(T, toCam)) * aSide * 0.013 * (0.35 + 0.65 * taper);
  }

  vec4 world = modelMatrix * vec4(p, 1.0);
  vWorld = world.xyz;
  vNormal = normalize(mat3(modelMatrix) * nrm);
  vS = aS;
  vV = aSide;
  vKind = aKind;
  gl_Position = projectionMatrix * viewMatrix * world;
}
`;

const fragment = /* glsl */ `
precision highp float;

uniform float uTime;
uniform float uHead;
uniform float uGain;
uniform vec3 uBg;

varying vec3 vNormal;
varying vec3 vWorld;
varying float vS;
varying float vV;
varying float vKind;

// lime → mint → azure → indigo and back, so the gradient never jumps
vec3 ramp(float t) {
  t = abs(fract(t) * 2.0 - 1.0);
  vec3 col = mix(vec3(0.80, 1.00, 0.24), vec3(0.16, 0.90, 0.66), smoothstep(0.0, 0.33, t));
  col = mix(col, vec3(0.20, 0.50, 1.00), smoothstep(0.33, 0.66, t));
  return mix(col, vec3(0.38, 0.22, 0.96), smoothstep(0.66, 1.0, t));
}

float hash(float n) {
  return fract(sin(n * 127.1) * 43758.5453);
}

void main() {
  if (vS > uHead) discard;

  vec3 v = normalize(cameraPosition - vWorld);
  vec3 col;

  if (vKind > 0.5) {
    // hair-thin light trails: lime, flaring white where a packet passes
    float ph = fract(vS * 0.05 - uTime * 0.11 + vKind * 0.37);
    float pulse = pow(ph, 10.0);
    col = mix(vec3(0.62, 0.86, 0.22), vec3(0.96, 1.0, 0.8), pulse) * (0.72 + pulse * 0.6);
  } else {
    vec3 n = normalize(vNormal);
    float facing = dot(n, v);
    float front = step(0.0, facing);
    n *= front * 2.0 - 1.0;
    float fres = pow(1.0 - abs(facing), 2.0);

    vec3 base = ramp(vS * 0.022 + fres * 0.22 - uTime * 0.015);
    vec3 L = normalize(vec3(0.35, 0.8, 0.6));
    float diff = 0.5 + 0.5 * dot(n, L);
    float spec = pow(max(dot(n, normalize(L + v)), 0.0), 48.0);

    // woven lanes, each carrying its own packets of light
    float lx = (vV * 0.5 + 0.5) * 9.0;
    float id = floor(lx);
    float lf = fract(lx);
    float groove = smoothstep(0.0, 0.1, lf) * (1.0 - smoothstep(0.9, 1.0, lf));
    float ph = fract(vS * 0.045 - uTime * (0.05 + 0.06 * hash(id)) + hash(id + 7.0));
    float pulse = pow(ph, 16.0) * step(0.45, hash(id + 3.0));

    vec3 lit = base * (0.32 + 0.78 * diff) * mix(0.68, 1.0, groove);
    lit += spec * vec3(1.0, 1.0, 0.9) * 0.55;
    lit += pulse * vec3(0.95, 1.0, 0.7) * 0.9;
    lit += fres * ramp(vS * 0.022 + 0.35) * 0.5;

    vec3 under = mix(vec3(0.03, 0.04, 0.09), base * 0.22, 0.6) * (0.5 + 0.6 * diff) * mix(0.75, 1.0, groove);
    under += fres * vec3(0.25, 0.3, 0.9) * 0.55;

    col = mix(under, lit, front);
    col += smoothstep(0.86, 1.0, abs(vV)) * 0.18 * vec3(0.9, 1.0, 0.8);
  }

  // the leading tip burns lime while it is being drawn
  float tip = 1.0 - smoothstep(0.0, 3.5, uHead - vS);
  col = mix(col, vec3(0.92, 1.0, 0.55), tip * 0.75);

  float fog = smoothstep(11.0, 27.0, length(cameraPosition - vWorld));
  gl_FragColor = vec4(mix(col * uGain, uBg, fog * 0.94), 1.0);
}
`;

type Built = {
  geometry: THREE.BufferGeometry;
  /** arc length at each sample */
  s: Float32Array;
  /** running max of page depth (viewport heights) at each sample — monotone, so it can be searched */
  reach: Float32Array;
  total: number;
  width: number;
  /** arc length at which the hero knot hands over to the tail */
  knot: number;
  /** where the pinned Work stage sits, in viewport heights — the band dims behind it */
  work: Chapter | undefined;
  rings: { position: THREE.Vector3; quaternion: THREE.Quaternion; s: number }[];
};

/** Centre line of the ribbon, routed through whatever sections are on the page. */
function route(ch: Record<string, Chapter>, halfW: number, narrow: boolean) {
  const pts: THREE.Vector3[] = [];
  // xf is in half-viewport-widths as seen on screen, whatever the depth
  const P = (xf: number, yv: number, z: number) =>
    new THREE.Vector3(((xf * halfW * (CAM_Z - z)) / CAM_Z), VIEW_H * (0.5 - yv), z);
  const at = (c: Chapter, t: number) => c.top + c.height * t;
  const m = narrow ? 0.9 : 1; // keep the band nearer the edges on phones

  // Hero — an open trefoil: reads as a tied bow with one tail running down the page.
  const hero = ch.hero ?? { top: 0, height: 1 };
  const cx = (narrow ? 0.08 : 0.42) * halfW;
  const cy = VIEW_H * (0.5 - (narrow ? 0.33 : 0.46));
  const k = (narrow ? Math.min(halfW * 0.9, VIEW_H * 0.19) : Math.min(halfW * 0.52, VIEW_H * 0.41)) / 3;
  const t0 = (-2 * Math.PI) / 3;
  const t1 = (5 * Math.PI) / 6;
  for (let i = 0; i <= 26; i++) {
    const t = t0 + ((t1 - t0) * i) / 26;
    pts.push(
      new THREE.Vector3(
        cx + (Math.sin(t) + 2 * Math.sin(2 * t)) * k,
        cy + (Math.cos(t) - 2 * Math.cos(2 * t)) * k,
        -0.6 - Math.sin(3 * t) * k * 1.5,
      ),
    );
  }
  pts.push(P(narrow ? -0.7 : -0.1, at(hero, 0.97), 0.3));

  /** a single loop the band ties around itself between chapters */
  const curl = (xf: number, yv: number, z: number, r: number, dir: 1 | -1) => {
    const c = P(xf, yv, z);
    for (let j = 0; j <= 6; j++) {
      const a = Math.PI * 0.5 + dir * (j / 6) * Math.PI * 2.1;
      pts.push(new THREE.Vector3(c.x + Math.cos(a) * r, c.y + Math.sin(a) * r * 0.86, z + Math.sin(a * 0.5 + 0.4) * r * 1.1));
    }
  };
  const curlR = narrow ? 0.42 : 0.72;

  if (ch.about) {
    const c = ch.about;
    pts.push(P(-1.1 * m, at(c, 0.16), -1.2));
    pts.push(P(-1.16 * m, at(c, 0.52), -2.8));
    pts.push(P(-0.5, at(c, 0.93), -1.6));
  }
  if (ch.expertise) {
    const c = ch.expertise;
    curl(0.52, at(c, 0.02), -1.4, curlR, -1);
    pts.push(P(1.12 * m, at(c, 0.3), -2.4));
    pts.push(P(1.14 * m, at(c, 0.72), -3.4));
  }
  if (ch.experience) {
    const c = ch.experience;
    pts.push(P(0.3, at(c, 0.0), -1.6));
    pts.push(P(1.1 * m, at(c, 0.3), -2.2));
    pts.push(P(1.12 * m, at(c, 0.7), -3.2));
  }
  if (ch.work) {
    const c = ch.work;
    curl(0.1, at(c, 0.0) - 0.08, -1.8, curlR, 1);
    // pinned stage: the band drops far behind the devices and wanders there
    pts.push(P(-0.75, at(c, 0.12), -6.5));
    pts.push(P(0.55, at(c, 0.3), -9));
    pts.push(P(-0.6, at(c, 0.5), -8));
    pts.push(P(0.65, at(c, 0.7), -9));
    pts.push(P(-0.4, at(c, 0.9), -6));
  }
  if (ch.contact) {
    const c = ch.contact;
    pts.push(P(-0.95 * m, at(c, 0.02), -2));
    // a halo that closes around the last headline, wherever the layout puts it
    const mid = P(0, ch.halo ? at(ch.halo, 0.5) : at(c, 0.46), -1.6);
    const r = narrow ? halfW * 1.02 : Math.min(halfW * 0.74, VIEW_H * 0.47);
    for (let j = 0; j <= 15; j++) {
      const a = Math.PI * 0.86 + (j / 15) * Math.PI * 2.5;
      const rr = r * (1 - 0.07 * (j / 15));
      pts.push(new THREE.Vector3(mid.x + Math.cos(a) * rr * (narrow ? 1 : 1.28), mid.y - Math.sin(a) * rr * 0.96, mid.z + Math.sin(a) * 1.5));
    }
  }
  return pts;
}

function build(ch: Record<string, Chapter>, aspect: number): Built {
  const halfW = (VIEW_H * aspect) / 2;
  const narrow = aspect < 0.9;
  const pts = route(ch, halfW, narrow);

  const curve = new THREE.CatmullRomCurve3(pts, false, "centripetal");
  curve.arcLengthDivisions = pts.length * 28;
  const total = curve.getLength();
  const n = Math.min(4600, Math.ceil(total / 0.085));
  const c = curve.getSpacedPoints(n);

  // parallel-transport frame, seeded so the band starts face-on to the camera
  const T: THREE.Vector3[] = c.map((_, i) =>
    new THREE.Vector3().subVectors(c[Math.min(i + 1, n)], c[Math.max(i - 1, 0)]).normalize(),
  );
  const N: THREE.Vector3[] = [];
  const B: THREE.Vector3[] = [];
  const nrm = new THREE.Vector3(0, 0, 1);
  const axis = new THREE.Vector3();
  for (let i = 0; i <= n; i++) {
    if (i > 0) {
      axis.crossVectors(T[i - 1], T[i]);
      const len = axis.length();
      if (len > 1e-6) nrm.applyAxisAngle(axis.divideScalar(len), Math.asin(Math.min(1, len)));
    }
    nrm.addScaledVector(T[i], -nrm.dot(T[i])).normalize();
    N.push(nrm.clone());
    B.push(new THREE.Vector3().crossVectors(T[i], nrm));
  }

  const s = new Float32Array(n + 1);
  const reach = new Float32Array(n + 1);
  let max = -Infinity;
  for (let i = 0; i <= n; i++) {
    s[i] = (i / n) * total;
    max = Math.max(max, 0.5 - c[i].y / VIEW_H);
    reach[i] = max;
  }

  const strips = 3; // band + two threads
  const count = (n + 1) * 2 * strips;
  const position = new Float32Array(count * 3);
  const aN = new Float32Array(count * 3);
  const aB = new Float32Array(count * 3);
  const aSide = new Float32Array(count);
  const aS = new Float32Array(count);
  const aKind = new Float32Array(count);
  const index: number[] = [];
  let v = 0;
  for (let kind = 0; kind < strips; kind++) {
    const start = v;
    for (let i = 0; i <= n; i++) {
      for (const side of [-1, 1]) {
        c[i].toArray(position, v * 3);
        N[i].toArray(aN, v * 3);
        B[i].toArray(aB, v * 3);
        aSide[v] = side;
        aS[v] = s[i];
        aKind[v] = kind;
        v++;
      }
    }
    for (let i = 0; i < n; i++) {
      const a = start + i * 2;
      index.push(a, a + 1, a + 2, a + 1, a + 3, a + 2);
    }
  }

  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute("position", new THREE.BufferAttribute(position, 3));
  geometry.setAttribute("aN", new THREE.BufferAttribute(aN, 3));
  geometry.setAttribute("aB", new THREE.BufferAttribute(aB, 3));
  geometry.setAttribute("aSide", new THREE.BufferAttribute(aSide, 1));
  geometry.setAttribute("aS", new THREE.BufferAttribute(aS, 1));
  geometry.setAttribute("aKind", new THREE.BufferAttribute(aKind, 1));
  geometry.setIndex(index);

  // a chrome ring wherever the band crosses into a new chapter
  const forward = new THREE.Vector3(0, 0, 1);
  const rings = ["about", "expertise", "experience", "work", "contact"]
    .filter((id) => ch[id])
    .map((id) => {
      let i = 0;
      while (i < n && reach[i] < ch[id].top + 0.06) i++;
      return {
        position: c[i].clone(),
        quaternion: new THREE.Quaternion().setFromUnitVectors(forward, T[i]),
        s: s[i],
      };
    });

  // the knot ends where the band first reaches the foot of the hero
  const hero = ch.hero ?? { top: 0, height: 1 };
  let k = 0;
  while (k < n && reach[k] < hero.top + hero.height * 0.9) k++;

  return { geometry, s, reach, total, width: narrow ? 0.2 : 0.34, knot: s[k], work: ch.work, rings };
}

export default function Ribbon() {
  const size = useThree((st) => st.size);
  const [chapters, setChapters] = useState<Record<string, Chapter> | null>(null);

  // Measure the page once it has laid out, and again whenever it reflows
  // (fonts landing, breakpoints, the viewport changing shape).
  useEffect(() => {
    let timer = 0;
    const ro = new ResizeObserver(() => {
      window.clearTimeout(timer);
      timer = window.setTimeout(() => setChapters(measureChapters(size.height)), 160);
    });
    ro.observe(document.body);
    return () => {
      ro.disconnect();
      window.clearTimeout(timer);
    };
  }, [size.width, size.height]);

  const built = useMemo(
    () => (chapters ? build(chapters, size.width / size.height) : null),
    [chapters, size.width, size.height],
  );
  useEffect(() => () => built?.geometry.dispose(), [built]);

  const material = useMemo(
    () =>
      new THREE.ShaderMaterial({
        vertexShader: vertex,
        fragmentShader: fragment,
        side: THREE.DoubleSide,
        uniforms: {
          uTime: { value: 0 },
          uWidth: { value: 0.34 },
          uHead: { value: 0 },
          uKnot: { value: 0 },
          uGain: { value: 1 },
          uBg: { value: new THREE.Color(BG) },
        },
      }),
    [],
  );
  const chrome = useMemo(
    () => new THREE.MeshStandardMaterial({ color: "#dfe8dc", metalness: 1, roughness: 0.16 }),
    [],
  );
  const torus = useMemo(() => new THREE.TorusGeometry(1, 0.018, 12, 96), []);
  useEffect(
    () => () => {
      material.dispose();
      chrome.dispose();
      torus.dispose();
    },
    [material, chrome, torus],
  );

  const band = useRef<THREE.Mesh<THREE.BufferGeometry, THREE.ShaderMaterial>>(null);
  const ringRefs = useRef<(THREE.Group | null)[]>([]);
  const state = useRef({ head: 0, furthest: 0, drawn: false, time: 0 });

  useFrame((_, dt) => {
    const u = band.current?.material.uniforms;
    if (!built || !u) return;
    const st = state.current;
    const step = Math.min(dt, 0.05);
    if (view.live) st.time += step;
    u.uTime.value = st.time;
    u.uWidth.value = built.width;
    u.uKnot.value = built.knot;

    // how far down the page the band has been drawn: just short of the fold
    const doc = document.documentElement;
    const atEnd = window.scrollY >= doc.scrollHeight - window.innerHeight - 4;
    const fold = window.scrollY / size.height + 0.88;
    let lo = 0;
    let hi = built.reach.length - 1;
    while (lo < hi) {
      const mid = (lo + hi + 1) >> 1;
      if (built.reach[mid] <= fold) lo = mid;
      else hi = mid - 1;
    }
    st.furthest = Math.min(Math.max(st.furthest, atEnd ? built.total : built.s[lo]), built.total);

    if (!stage.ready) st.head = 0;
    else if (!view.live) st.head = st.furthest;
    else {
      // first pass is a slow flourish, afterwards it keeps pace with the scroll
      st.head = damp(st.head, st.furthest, st.drawn ? 5 : 1.5, step);
      if (st.furthest - st.head < 0.6) st.drawn = true;
    }
    u.uHead.value = st.head;

    // brightest in the hero, calmer once there is copy on top, a backdrop behind the devices
    const at = window.scrollY / size.height;
    const w = built.work;
    const staged = w && at > w.top - 0.6 && at < w.top + w.height - 0.6;
    const target = staged ? 0.42 : 1 - Math.min(1, Math.max(0, at - 0.35)) * 0.3;
    u.uGain.value = damp(u.uGain.value, target, 3, step);

    built.rings.forEach((r, i) => {
      const g = ringRefs.current[i];
      if (!g) return;
      const open = Math.min(1, Math.max(0, (st.head - r.s) / 2.5));
      const ease = 1 - Math.pow(1 - open, 3);
      g.visible = open > 0;
      g.scale.setScalar(built.width * 3.4 * ease);
      const [outer, inner] = g.children;
      outer.rotation.x = Math.sin(st.time * 0.35 + i) * 0.5;
      outer.rotation.y = Math.cos(st.time * 0.27 + i * 2) * 0.4;
      inner.rotation.y = st.time * 0.4 + i;
      inner.rotation.x = st.time * 0.23;
    });
  });

  if (!built) return null;

  return (
    <>
      <mesh ref={band} geometry={built.geometry} material={material} frustumCulled={false} />
      {built.rings.map((r, i) => (
        <group
          key={i}
          ref={(g) => {
            ringRefs.current[i] = g;
          }}
          position={r.position}
          quaternion={r.quaternion}
          visible={false}
        >
          <mesh geometry={torus} material={chrome} />
          <mesh geometry={torus} material={chrome} scale={0.72} />
        </group>
      ))}
    </>
  );
}
