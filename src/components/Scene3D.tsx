import { useEffect, useRef } from "react";

// ---------------------------------------------------------------------------
// Scene3D — a dependency-free 3D particle torus knot rendered on a <canvas>.
// ~1,300 monochrome points orbit in perspective; nearer points are larger and
// brighter, with a soft radial glow behind. Tracks the pointer for a subtle
// parallax tilt, pauses off-screen, and respects prefers-reduced-motion.
// ---------------------------------------------------------------------------

const TAU = Math.PI * 2;

type Vec3 = [number, number, number];

// Parametric (3, 2) torus knot.
function torusKnotPoints(count: number, p = 3, q = 2): Vec3[] {
  const R = 2.4;
  const r = 0.95;
  const points: Vec3[] = [];
  for (let i = 0; i < count; i++) {
    const t = (i / count) * TAU;
    const tube = R + r * Math.cos(q * t);
    points.push([
      tube * Math.cos(p * t),
      tube * Math.sin(p * t),
      r * Math.sin(q * t),
    ]);
  }
  // Normalize so the widest point sits exactly at radius 1.
  let max = 0;
  for (const v of points) {
    max = Math.max(max, Math.hypot(v[0], v[1], v[2]));
  }
  return points.map((v) => [v[0] / max, v[1] / max, v[2] / max]);
}

const KNOT = torusKnotPoints(1300);

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
      const f = radius * 2.6;

      // Soft radial glow behind the knot.
      const glow = ctx.createRadialGradient(cx, cy, 0, cx, cy, radius);
      glow.addColorStop(0, "rgba(128,128,128,0.16)");
      glow.addColorStop(1, "rgba(128,128,128,0)");
      ctx.fillStyle = glow;
      ctx.beginPath();
      ctx.arc(cx, cy, radius, 0, TAU);
      ctx.fill();

      const yaw = t * 0.28 + px * 0.5;
      const pitch = 0.45 + Math.sin(t * 0.2) * 0.15 + py * 0.35;
      const roll = Math.sin(t * 0.11) * 0.12;

      ctx.fillStyle = color;
      for (const p of KNOT) {
        let v = rotY(p, yaw);
        v = rotX(v, pitch);
        v = rotZ(v, roll);
        const scale = f / (f + v[2] * radius);
        const sx = cx + v[0] * radius * scale;
        const sy = cy + v[1] * radius * scale;
        // Nearer points are larger and brighter.
        const depth = (v[2] + 1) / 2; // 0..1
        const dotRadius = (0.7 + depth * 1.3) * scale;
        ctx.globalAlpha = 0.18 + depth * 0.72;
        ctx.beginPath();
        ctx.arc(sx, sy, dotRadius, 0, TAU);
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
      aria-label="Rotating 3D particle torus knot"
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
