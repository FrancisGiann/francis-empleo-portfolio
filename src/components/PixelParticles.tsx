import { useEffect, useRef } from "react";

interface Particle {
  x: number; // 0..1 horizontal position
  y: number; // 0..1 vertical position
  s: number; // size px
  v: number; // upward speed, css px per second
  sway: number; // horizontal sway amplitude
  phase: number;
  o: number; // opacity
}

/**
 * Ambient drifting pixel squares on a canvas. Sits behind hero content.
 * Pauses off-screen; renders one static frame under reduced-motion.
 */
export function PixelParticles({ className = "" }: { className?: string }) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    let raf = 0;
    let running = true;

    const resize = () => {
      const r = canvas.getBoundingClientRect();
      canvas.width = Math.max(1, r.width * dpr);
      canvas.height = Math.max(1, r.height * dpr);
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);

    const particles: Particle[] = Array.from({ length: 26 }, () => ({
      x: Math.random(),
      y: Math.random(),
      s: 4 + Math.random() * 6,
      v: 8 + Math.random() * 14,
      sway: 6 + Math.random() * 10,
      phase: Math.random() * Math.PI * 2,
      o: 0.08 + Math.random() * 0.12,
    }));

    const color = () =>
      getComputedStyle(document.documentElement).getPropertyValue("--primary").trim();

    let last = performance.now();
    let t = 0;

    const draw = (now: number) => {
      const dt = Math.min((now - last) / 1000, 0.05);
      last = now;
      t += dt;
      const W = canvas.width;
      const H = canvas.height;
      ctx.clearRect(0, 0, W, H);
      ctx.fillStyle = color();
      for (const p of particles) {
        if (!reduced) {
          p.y -= (p.v * dt) / (H / dpr);
          if (p.y < -0.05) {
            p.y = 1.05;
            p.x = Math.random();
          }
        }
        const x =
          p.x * W + (reduced ? 0 : Math.sin(t * 0.5 + p.phase) * p.sway * dpr);
        const y = p.y * H;
        const s = p.s * dpr;
        ctx.globalAlpha = p.o;
        ctx.fillRect(Math.round(x), Math.round(y), s, s);
      }
      ctx.globalAlpha = 1;
      if (running && !reduced) raf = requestAnimationFrame(draw);
    };

    const io = new IntersectionObserver(([entry]) => {
      running = entry?.isIntersecting ?? true;
      if (running && !reduced) {
        last = performance.now();
        cancelAnimationFrame(raf);
        raf = requestAnimationFrame(draw);
      }
    });
    io.observe(canvas);

    if (reduced) {
      draw(performance.now()); // single static frame
    }

    return () => {
      running = false;
      cancelAnimationFrame(raf);
      ro.disconnect();
      io.disconnect();
    };
  }, []);

  return (
    <canvas
      ref={ref}
      aria-hidden
      className={`pointer-events-none absolute inset-0 h-full w-full ${className}`}
    />
  );
}
