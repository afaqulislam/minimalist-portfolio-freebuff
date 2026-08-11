import { useEffect, useRef } from "react";

// ---------------------------------------------------------------------------
// Scene3D — a dependency-free low-poly 3D robot head ("frontend engineer
// bot") rendered on a <canvas>. Monochrome wireframe boxes read the CSS
// `--foreground` token so the scene stays in theme (light and dark). The head
// slowly rotates with a subtle bob, tilts toward the pointer, and the visor
// eyes glow. Pauses off-screen and respects prefers-reduced-motion.
// ---------------------------------------------------------------------------

const TAU = Math.PI * 2;

type Vec3 = [number, number, number];

const CUBE_CORNERS: Vec3[] = [
  [-1, -1, -1],
  [1, -1, -1],
  [1, 1, -1],
  [-1, 1, -1],
  [-1, -1, 1],
  [1, -1, 1],
  [1, 1, 1],
  [-1, 1, 1],
];

const CUBE_EDGES: [number, number][] = [
  [0, 1],
  [1, 2],
  [2, 3],
  [3, 0], // back face
  [4, 5],
  [5, 6],
  [6, 7],
  [7, 4], // front face
  [0, 4],
  [1, 5],
  [2, 6],
  [3, 7], // connectors
];

type Box = { w: number; h: number; d: number; x: number; y: number; z: number };

// The robot head, built from boxes. Front of the face faces +z.
const BOXES: Box[] = [
  // Head
  { w: 1.0, h: 1.1, d: 0.9, x: 0, y: 0.1, z: 0 },
  // Visor (eye band)
  { w: 0.92, h: 0.2, d: 0.08, x: 0, y: 0.26, z: 0.46 },
  // Mouth slit
  { w: 0.34, h: 0.05, d: 0.08, x: 0, y: 0.02, z: 0.46 },
  // Ears
  { w: 0.18, h: 0.44, d: 0.22, x: -0.56, y: 0.1, z: 0 },
  { w: 0.18, h: 0.44, d: 0.22, x: 0.56, y: 0.1, z: 0 },
  // Neck
  { w: 0.36, h: 0.34, d: 0.36, x: 0, y: -0.76, z: 0 },
];

// Eyes — two glowing points on the visor.
const EYES: Vec3[] = [
  [-0.22, 0.26, 0.51],
  [0.22, 0.26, 0.51],
];

// Antenna — a line from the crown of the head up to a tip.
const ANTENNA: [Vec3, Vec3] = [
  [0, 0.66, 0],
  [0, 1.12, 0],
];

// Flatten boxes into a single vertex/edge pool.
const VERTICES: Vec3[] = [];
const EDGES: [number, number][] = [];
for (const box of BOXES) {
  const base = VERTICES.length;
  for (const corner of CUBE_CORNERS) {
    VERTICES.push([
      box.x + (corner[0] * box.w) / 2,
      box.y + (corner[1] * box.h) / 2,
      box.z + (corner[2] * box.d) / 2,
    ]);
  }
  for (const [a, b] of CUBE_EDGES) {
    EDGES.push([base + a, base + b]);
  }
}

function rotY(v: Vec3, a: number): Vec3 {
  const c = Math.cos(a);
  const s = Math.sin(a);
  return [v[0] * c + v[2] * s, v[1], -v[0] * s + v[2] * c];
}

function rotX(v: Vec3, a: number): Vec3 {
  const c = Math.cos(a);
  const s = Math.sin(a);
  return [v[0], v[1] * c - v[2] * s, v[1] * s + v[2] * c];
}

function rotZ(v: Vec3, a: number): Vec3 {
  const c = Math.cos(a);
  const s = Math.sin(a);
  return [v[0] * c - v[1] * s, v[0] * s + v[1] * c, v[2]];
}

export function Scene3D({ className }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const targetX = useRef(0);
  const targetY = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    let width = 0;
    let height = 0;
    let raf = 0;
    let visible = true;
    let frame = 0;
    let color = "#18181b";
    let px = 0; // smoothed pointer offset, -1..1
    let py = 0;

    const readColor = () => {
      const value = getComputedStyle(document.documentElement)
        .getPropertyValue("--foreground")
        .trim();
      if (value) color = value;
    };

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = rect.width;
      height = rect.height;
      canvas.width = Math.max(1, Math.round(width * dpr));
      canvas.height = Math.max(1, Math.round(height * dpr));
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const render = (time: number) => {
      const t = time / 1000;

      // Refresh the theme color occasionally (tracks dark-mode toggles).
      if (frame % 90 === 0) readColor();
      frame++;

      // Ease the rotation toward the pointer for a subtle parallax tilt.
      if (!reducedMotion) {
        px += (targetX.current - px) * 0.045;
        py += (targetY.current - py) * 0.045;
      }

      ctx.clearRect(0, 0, width, height);
      const cx = width / 2;
      const cy = height / 2;
      const radius = Math.min(width, height) * 0.36;
      const f = radius * 2.8;

      // Soft radial glow behind the robot.
      const glow = ctx.createRadialGradient(cx, cy, 0, cx, cy, radius);
      glow.addColorStop(0, "rgba(128,128,128,0.14)");
      glow.addColorStop(1, "rgba(128,128,128,0)");
      ctx.fillStyle = glow;
      ctx.beginPath();
      ctx.arc(cx, cy, radius, 0, TAU);
      ctx.fill();

      const yaw = t * 0.22 + Math.sin(t * 0.35) * 0.16 + px * 0.5;
      const pitch = 0.16 + Math.sin(t * 0.3) * 0.1 + py * 0.35;
      const roll = Math.sin(t * 0.17) * 0.08;
      const bob = Math.sin(t * 0.9) * 0.035;

      // Rotate + project every vertex once.
      const projected = VERTICES.map((v) => {
        let p = rotY(v, yaw);
        p = rotX(p, pitch);
        p = rotZ(p, roll);
        const scale = f / (f + p[2] * radius);
        return {
          x: cx + p[0] * radius * scale,
          y: cy + (p[1] + bob) * radius * scale,
          z: p[2],
        };
      });

      ctx.lineWidth = Math.max(1, radius * 0.007);
      ctx.strokeStyle = color;

      // Edges, farthest first, with depth-based brightness.
      const edgeOrder = EDGES.map(([a, b], i) => ({
        i,
        z: (projected[a].z + projected[b].z) / 2,
      })).sort((m, n) => n.z - m.z);

      for (const { i, z } of edgeOrder) {
        const [a, b] = EDGES[i];
        const depth = (z + 1) / 2; // 0..1
        ctx.globalAlpha = 0.1 + depth * 0.45;
        ctx.beginPath();
        ctx.moveTo(projected[a].x, projected[a].y);
        ctx.lineTo(projected[b].x, projected[b].y);
        ctx.stroke();
      }

      // Antenna: bright line + glowing tip.
      const antA = rotY(ANTENNA[0], yaw);
      const antB = rotY(ANTENNA[1], yaw);
      const aA = rotX(antA, pitch);
      const aB = rotX(antB, pitch);
      const rA = rotZ(aA, roll);
      const rB = rotZ(aB, roll);
      const sA = f / (f + rA[2] * radius);
      const sB = f / (f + rB[2] * radius);
      ctx.globalAlpha = 0.55;
      ctx.beginPath();
      ctx.moveTo(cx + rA[0] * radius * sA, cy + (rA[1] + bob) * radius * sA);
      ctx.lineTo(cx + rB[0] * radius * sB, cy + (rB[1] + bob) * radius * sB);
      ctx.stroke();
      ctx.globalAlpha = 0.9;
      ctx.fillStyle = color;
      ctx.beginPath();
      ctx.arc(
        cx + rB[0] * radius * sB,
        cy + (rB[1] + bob) * radius * sB,
        Math.max(1.5, radius * 0.018),
        0,
        TAU,
      );
      ctx.fill();

      // Glowing visor eyes.
      const eyePulse = 0.2 + Math.sin(t * 1.7) * 0.06;
      for (const eye of EYES) {
        let p = rotY(eye, yaw);
        p = rotX(p, pitch);
        p = rotZ(p, roll);
        const scale = f / (f + p[2] * radius);
        const ex = cx + p[0] * radius * scale;
        const ey = cy + (p[1] + bob) * radius * scale;
        // Halo
        ctx.fillStyle = color;
        ctx.globalAlpha = eyePulse;
        ctx.beginPath();
        ctx.arc(ex, ey, radius * 0.14, 0, TAU);
        ctx.fill();
        // Core
        ctx.globalAlpha = 0.95;
        ctx.beginPath();
        ctx.arc(ex, ey, Math.max(1.4, radius * 0.022), 0, TAU);
        ctx.fill();
      }

      // Vertex dots on the wireframe.
      ctx.globalAlpha = 0.5;
      for (const p of projected) {
        const depth = (p.z + 1) / 2;
        ctx.beginPath();
        ctx.arc(p.x, p.y, Math.max(0.7, 0.9 + depth * 0.9), 0, TAU);
        ctx.fill();
      }

      ctx.globalAlpha = 1;
    };

    const loop = (time: number) => {
      if (!visible) return;
      render(time);
      raf = requestAnimationFrame(loop);
    };

    const start = () => {
      cancelAnimationFrame(raf);
      if (reducedMotion) {
        render(0);
      } else {
        raf = requestAnimationFrame(loop);
      }
    };

    resize();
    readColor();
    start();

    const ro = new ResizeObserver(() => {
      resize();
      if (reducedMotion) render(0);
    });
    ro.observe(canvas);

    const io = new IntersectionObserver(
      (entries) => {
        visible = entries[0]?.isIntersecting ?? true;
        if (visible) start();
      },
      { rootMargin: "120px" },
    );
    io.observe(canvas);

    const onVisibility = () => {
      visible = !document.hidden;
      if (visible) start();
    };
    document.addEventListener("visibilitychange", onVisibility);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      io.disconnect();
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, []);

  return (
    <div
      role="img"
      aria-label="Rotating 3D robot head — frontend engineer"
      className={className}
      onPointerMove={(event) => {
        const rect = event.currentTarget.getBoundingClientRect();
        if (rect.width === 0 || rect.height === 0) return;
        // Normalized pointer position in [-1, 1], origin at center.
        targetX.current = ((event.clientX - rect.left) / rect.width) * 2 - 1;
        targetY.current = ((event.clientY - rect.top) / rect.height) * 2 - 1;
      }}
      onPointerLeave={() => {
        targetX.current = 0;
        targetY.current = 0;
      }}
    >
      <canvas ref={canvasRef} className="block h-full w-full" />
    </div>
  );
}
