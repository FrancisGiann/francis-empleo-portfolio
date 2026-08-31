import { useEffect, useRef, useState, useCallback } from "react";
import { useRetroMode } from "@/hooks/use-retro-mode";

export function MiniGame() {
  const { enabled } = useRetroMode();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  // Direction ref shared between keyboard + D-pad buttons and game loop
  const dirRef = useRef({ dx: 1, dy: 0 });
  const currentDirRef = useRef({ dx: 1, dy: 0 });

  const steer = useCallback((dx: number, dy: number) => {
    const cur = currentDirRef.current;
    // Prevent 180-degree reversal
    if (dx !== 0 && cur.dx === 0) dirRef.current = { dx, dy: 0 };
    else if (dy !== 0 && cur.dy === 0) dirRef.current = { dx: 0, dy };
  }, []);

  useEffect(() => {
    if (!enabled || !isPlaying) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let raf: number;
    let lastTick = 0;

    const GRID = 10;
    const W = canvas.width;
    const H = canvas.height;
    const COLS = W / GRID;
    const ROWS = H / GRID;

    let snake = [
      { x: 10, y: 12 },
      { x: 9, y: 12 },
      { x: 8, y: 12 },
    ];
    let food = spawnFood();
    let score = 0;
    let gameOver = false;

    // Reset direction refs
    dirRef.current = { dx: 1, dy: 0 };
    currentDirRef.current = { dx: 1, dy: 0 };

    // Audio — single shared context
    let audioCtx: AudioContext | null = null;
    function beep(freq = 800, dur = 0.05) {
      try {
        if (!audioCtx) {
          const C = window.AudioContext || (window as any).webkitAudioContext;
          if (C) audioCtx = new C();
        }
        if (audioCtx?.state === "suspended") audioCtx.resume();
        if (!audioCtx) return;
        const o = audioCtx.createOscillator();
        const g = audioCtx.createGain();
        o.type = "square";
        o.frequency.value = freq;
        g.gain.value = 0.04;
        o.connect(g).connect(audioCtx.destination);
        o.start();
        o.stop(audioCtx.currentTime + dur);
      } catch (_) {}
    }

    function spawnFood() {
      let f: { x: number; y: number };
      do {
        f = { x: Math.floor(Math.random() * COLS), y: Math.floor(Math.random() * ROWS) };
      } while (snake.some((s) => s.x === f.x && s.y === f.y));
      return f;
    }

    // Keyboard
    function onKey(e: KeyboardEvent) {
      const k = e.key;
      const low = k.toLowerCase();
      if (k === "ArrowUp" || low === "w") { steer(0, -1); e.preventDefault(); }
      else if (k === "ArrowDown" || low === "s") { steer(0, 1); e.preventDefault(); }
      else if (k === "ArrowLeft" || low === "a") { steer(-1, 0); e.preventDefault(); }
      else if (k === "ArrowRight" || low === "d") { steer(1, 0); e.preventDefault(); }
    }
    window.addEventListener("keydown", onKey, { passive: false });

    // Draw helper
    function draw() {
      // Background
      ctx.fillStyle = "#000";
      ctx.fillRect(0, 0, W, H);

      if (gameOver) {
        ctx.fillStyle = "#fff";
        ctx.font = "28px 'Silkscreen', monospace";
        const msg = "GAME OVER";
        const tw = ctx.measureText(msg).width;
        ctx.fillText(msg, (W - tw) / 2, H / 2 - 10);
        ctx.font = "14px 'Silkscreen', monospace";
        const s = `SCORE: ${score}`;
        ctx.fillText(s, (W - ctx.measureText(s).width) / 2, H / 2 + 20);
        const r = "Tap to restart";
        ctx.fillText(r, (W - ctx.measureText(r).width) / 2, H / 2 + 50);
        return;
      }

      // Food
      ctx.fillStyle = "#a78bfa";
      ctx.fillRect(food.x * GRID + 1, food.y * GRID + 1, GRID - 2, GRID - 2);

      // Snake
      snake.forEach((seg, i) => {
        ctx.fillStyle = i === 0 ? "#fff" : "#ccc";
        ctx.fillRect(seg.x * GRID + 1, seg.y * GRID + 1, GRID - 2, GRID - 2);
      });

      // Score overlay
      ctx.fillStyle = "rgba(255,255,255,0.4)";
      ctx.font = "11px 'Silkscreen', monospace";
      ctx.fillText(`SCORE ${score}`, 8, 16);
    }

    // Tick
    function tick() {
      currentDirRef.current = { ...dirRef.current };
      const dir = currentDirRef.current;
      const head = { x: snake[0].x + dir.dx, y: snake[0].y + dir.dy };

      // Collision: walls
      if (head.x < 0 || head.x >= COLS || head.y < 0 || head.y >= ROWS) {
        gameOver = true;
        beep(200, 0.2);
        return;
      }
      // Collision: self
      if (snake.some((s) => s.x === head.x && s.y === head.y)) {
        gameOver = true;
        beep(200, 0.2);
        return;
      }

      snake.unshift(head);

      if (head.x === food.x && head.y === food.y) {
        score += 10;
        beep(1200, 0.04);
        food = spawnFood();
      } else {
        snake.pop();
      }
    }

    // Main loop — only ticks at ~12 FPS but draws every frame for smoothness
    function loop(ts: number) {
      raf = requestAnimationFrame(loop);
      if (!gameOver && ts - lastTick >= 85) {
        lastTick = ts;
        tick();
      }
      draw();
    }

    // Click to restart
    function onClick() {
      if (!gameOver) return;
      gameOver = false;
      snake = [
        { x: 10, y: 12 },
        { x: 9, y: 12 },
        { x: 8, y: 12 },
      ];
      dirRef.current = { dx: 1, dy: 0 };
      currentDirRef.current = { dx: 1, dy: 0 };
      score = 0;
      food = spawnFood();
    }
    canvas.addEventListener("click", onClick);

    raf = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("keydown", onKey);
      canvas.removeEventListener("click", onClick);
      if (audioCtx) try { audioCtx.close(); } catch (_) {}
    };
  }, [enabled, isPlaying, steer]);

  if (!enabled) return null;

  return (
    <div className="retro-inventory mt-12 mb-8">
      {/* ── Handheld Console Shell ── */}
      <div className="mx-auto w-full max-w-[380px]">
        <div
          className="relative overflow-hidden border-2 border-foreground/50 bg-[hsl(var(--muted))] px-5 pb-6 pt-4 shadow-[4px_4px_0_var(--foreground)]"
          style={{ borderRadius: "12px 12px 40px 40px" }}
        >
          {/* Console branding */}
          <div className="mb-3 flex items-center justify-between px-1">
            <span className="font-pixel text-[10px] uppercase tracking-[0.3em] text-primary">
              FGE · PLAY
            </span>
            <div className="flex items-center gap-1.5">
              <span className="h-1.5 w-1.5 rounded-full bg-red-500/70" />
              <span className="font-pixel text-[8px] uppercase tracking-widest text-muted-foreground">
                PWR
              </span>
            </div>
          </div>

          {/* Screen bezel */}
          <div className="mx-auto rounded-sm border-[3px] border-foreground/30 bg-black/90 p-2 shadow-[inset_0_3px_8px_rgba(0,0,0,0.6)]">
            {!isPlaying ? (
              /* ── Title Screen ── */
              <div className="flex aspect-[8/5] flex-col items-center justify-center gap-4 text-center">
                <p className="font-pixel text-lg uppercase tracking-widest text-primary">
                  SNAKE
                </p>
                <p className="font-pixel text-[9px] text-white/50">
                  Use D-Pad or Keyboard
                </p>
                <button
                  type="button"
                  onClick={() => setIsPlaying(true)}
                  className="mt-1 border border-primary/50 bg-primary/10 px-6 py-2 font-pixel text-xs uppercase tracking-widest text-primary transition-colors hover:bg-primary/20 active:bg-primary/30"
                >
                  ▸ START
                </button>
              </div>
            ) : (
              /* ── Game Screen ── */
              <div
                className="relative mx-auto w-full"
                style={{ aspectRatio: "400/250", isolation: "isolate" }}
              >
                <canvas
                  ref={canvasRef}
                  width={400}
                  height={250}
                  className="block h-full w-full outline-none"
                  style={{ imageRendering: "pixelated", transform: "translateZ(0)" }}
                  tabIndex={0}
                />
              </div>
            )}
          </div>

          {/* ── Controls Area ── */}
          <div className="mt-5 flex items-start justify-between px-2">
            {/* D-Pad (left side) */}
            <div className="relative h-[100px] w-[100px] select-none touch-none" aria-label="D-Pad controls">
              {/* Cross shape */}
              <div className="absolute left-1/2 top-0 h-full w-[34px] -translate-x-1/2 rounded-[3px] border border-foreground/40 bg-foreground/10 shadow-[inset_0_1px_3px_rgba(0,0,0,0.3)]" />
              <div className="absolute top-1/2 left-0 h-[34px] w-full -translate-y-1/2 rounded-[3px] border border-foreground/40 bg-foreground/10 shadow-[inset_0_1px_3px_rgba(0,0,0,0.3)]" />
              <div className="absolute left-1/2 top-1/2 z-10 h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-foreground/15" />
              {/* Up */}
              <button type="button" onPointerDown={(e) => { e.preventDefault(); steer(0, -1); }}
                className="absolute left-1/2 top-0 z-20 flex h-[33px] w-[34px] -translate-x-1/2 items-center justify-center text-foreground/40 active:text-primary transition-colors" aria-label="Up">
                <svg width="14" height="8" viewBox="0 0 14 8" fill="currentColor"><polygon points="7,0 14,8 0,8" /></svg>
              </button>
              {/* Down */}
              <button type="button" onPointerDown={(e) => { e.preventDefault(); steer(0, 1); }}
                className="absolute left-1/2 bottom-0 z-20 flex h-[33px] w-[34px] -translate-x-1/2 items-center justify-center text-foreground/40 active:text-primary transition-colors" aria-label="Down">
                <svg width="14" height="8" viewBox="0 0 14 8" fill="currentColor"><polygon points="0,0 14,0 7,8" /></svg>
              </button>
              {/* Left */}
              <button type="button" onPointerDown={(e) => { e.preventDefault(); steer(-1, 0); }}
                className="absolute top-1/2 left-0 z-20 flex h-[34px] w-[33px] -translate-y-1/2 items-center justify-center text-foreground/40 active:text-primary transition-colors" aria-label="Left">
                <svg width="8" height="14" viewBox="0 0 8 14" fill="currentColor"><polygon points="0,7 8,0 8,14" /></svg>
              </button>
              {/* Right */}
              <button type="button" onPointerDown={(e) => { e.preventDefault(); steer(1, 0); }}
                className="absolute top-1/2 right-0 z-20 flex h-[34px] w-[33px] -translate-y-1/2 items-center justify-center text-foreground/40 active:text-primary transition-colors" aria-label="Right">
                <svg width="8" height="14" viewBox="0 0 8 14" fill="currentColor"><polygon points="8,7 0,0 0,14" /></svg>
              </button>
            </div>

            {/* Action buttons (right side) */}
            <div className="flex flex-col items-center gap-3 pt-1">
              <div className="flex -rotate-[20deg] gap-3">
                {/* B button — QUIT */}
                <div className="flex flex-col items-center gap-1">
                  <button
                    type="button"
                    onClick={() => setIsPlaying(false)}
                    className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-foreground/40 bg-foreground/10 font-pixel text-sm text-foreground/60 shadow-[inset_0_-2px_3px_rgba(0,0,0,0.2),0_2px_0_rgba(255,255,255,0.05)] transition-colors active:bg-destructive/30 active:text-destructive select-none touch-none"
                  >
                    B
                  </button>
                  <span className="font-pixel text-[7px] uppercase tracking-widest text-muted-foreground">quit</span>
                </div>
                {/* A button (decorative / future use) */}
                <div className="flex flex-col items-center gap-1">
                  <div
                    className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-foreground/40 bg-foreground/10 font-pixel text-sm text-foreground/60 shadow-[inset_0_-2px_3px_rgba(0,0,0,0.2),0_2px_0_rgba(255,255,255,0.05)]"
                  >
                    A
                  </div>
                  <span className="font-pixel text-[7px] uppercase tracking-widest text-muted-foreground/40">·</span>
                </div>
              </div>
            </div>
          </div>

          {/* Speaker grille */}
          <div className="mx-auto mt-4 flex w-16 -rotate-[25deg] flex-col gap-[3px]">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="h-[2px] w-full rounded-full bg-foreground/15" />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
