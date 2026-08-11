import { useEffect, useRef } from "react";

// ---------------------------------------------------------------------------
// Wireframe3D — a dependency-free rotating wireframe icosahedron rendered on
// a <canvas>. Thin monochrome lines read the CSS `--foreground` token so the
// scene stays perfectly in theme (light and dark). Pauses off-screen and
// respects prefers-reduced-motion.
// ---------------------------------------------------------------------------

const PHI = (1 + Math.sqrt(5)) / 2;

// Icosahedron vertices (centered at origin).
const ICOSA_VERTICES: [number, number, number][] = [
  [-1, PHI, 0],
  [1, PHI, 0],
  [-1, -PHI, 0],
  [1, -PHI, 0],
  [0, -1, PHI],
  [0, 1, PHI],
  [0, -1, -PHI],
  [0, 1, -PHI],
  [PHI, 0, -1],
  [PHI, 0, 1],
  [-PHI, 0, -1],
  [-PHI, 0, 1],
];

// Edges: every vertex pair at distance 2.
const ICOSA_EDGES: [number, number][] = [];
for (let i = 0; i < ICOSA_VERTICES.length; i++) {
  for (let j = i + 1; j < ICOSA_VERTICES.length; j++) {
    const dx = ICOSA_VERTICES[i][0] - ICOSA_VERTICES[j][0];
    const dy = ICOSA_VERTICES[i][1] - ICOSA_VERTICES[j][1];
    const dz = ICOSA_VERTICES[i][2] - ICOSA_VERTICES[j][2];
    if (Math.abs(Math.hypot(dx, dy, dz) - 2) < 1e-6) {
      ICOSA_EDGES.push([i, j]);
    }
  }
}

// Inner octahedron for depth: (±1,0,0), (0,±1,0), (0,0,±1), pairs at dot 0.
const OCTA_VERTICES: [number, number, number][] = [
  [1, 0, 0],
  [-1, 0, 0],
  [0, 1, 0],
  [0, -1, 0],
  [0, 0, 1],
  [0, 0, -1],
];
const OCTA_EDGES: [number, number][] = [];
for (let i = 0; i < OCTA_VERTICES.length; i++) {
  for (let j = i + 1; j < OCTA_VERTICES.length; j++) {
    const dot =
      OCTA_VERTICES[i][0] * OCTA_VERTICES[j][0] +
      OCTA_VERTICES[i][1] * OCTA_VERTICES[j][1] +
      OCTA_VERTICES[i][2] * OCTA_VERTICES[j][2];
    if (dot === 0) OCTA_EDGES.push([i, j]);
  }
}

function normalize(v: [number, number, number]): [number, number, number] {
  const len = Math.hypot(v[0], v[1], v[2]);
  return [v[0] / len, v[1] / len, v[2] / len];
}

const ICOSA_NORM = ICOSA_VERTICES.map(normalize);
const OCTA_NORM = OCTA_VERTICES.map(normalize);

type Vec3 = [number, number, number];

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

export function Wireframe3D({ className }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

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

    const drawShape = (
      vertices: Vec3[],
      edges: [number, number][],
      rotation: { yaw: number; pitch: number },
      radius: number,
      alpha: number,
      cx: number,
      cy: number,
      f: number,
    ) => {
      const projected = vertices.map((v) => {
        let p = rotY(v, rotation.yaw);
        p = rotX(p, rotation.pitch);
        const scale = f / (f + p[2]);
        return {
          x: cx + p[0] * radius * scale,
          y: cy + p[1] * radius * scale,
        };
      });

      ctx.globalAlpha = alpha;
      ctx.beginPath();
      for (const [a, b] of edges) {
        ctx.moveTo(projected[a].x, projected[a].y);
        ctx.lineTo(projected[b].x, projected[b].y);
      }
      ctx.stroke();
    };

    const render = (time: number) => {
      const t = time / 1000;

      // Refresh the theme color occasionally (tracks dark-mode toggles).
      if (frame % 90 === 0) readColor();
      frame++;

      ctx.clearRect(0, 0, width, height);
      const cx = width / 2;
      const cy = height / 2;
      const radius = Math.min(width, height) * 0.34;
      const f = radius * 3.2;

      ctx.lineWidth = 1;
      ctx.strokeStyle = color;
      ctx.fillStyle = color;

      const yaw = t * 0.35;
      const pitch = 0.5 + Math.sin(t * 0.25) * 0.18;

      // Inner octahedron, counter-rotating.
      drawShape(
        OCTA_NORM,
        OCTA_EDGES,
        { yaw: -t * 0.5, pitch: 0.35 },
        radius * 0.42,
        0.22,
        cx,
        cy,
        f,
      );

      // Outer icosahedron.
      drawShape(
        ICOSA_NORM,
        ICOSA_EDGES,
        { yaw, pitch },
        radius,
        0.55,
        cx,
        cy,
        f,
      );

      // Faint vertices on the outer shape for crispness.
      const projected = ICOSA_NORM.map((v) => {
        let p = rotY(v, yaw);
        p = rotX(p, pitch);
        const scale = f / (f + p[2]);
        return { x: cx + p[0] * radius * scale, y: cy + p[1] * radius * scale };
      });
      ctx.globalAlpha = 0.35;
      for (const p of projected) {
        ctx.beginPath();
        ctx.arc(p.x, p.y, 1.1, 0, Math.PI * 2);
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
    <div role="img" aria-label="Rotating 3D wireframe" className={className}>
      <canvas ref={canvasRef} className="block h-full w-full" />
    </div>
  );
}
