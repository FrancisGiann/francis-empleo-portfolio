import { useEffect, useRef, useState, useCallback } from "react";
import { useRetroMode } from "@/hooks/use-retro-mode";
import { PixelButton } from "./PixelButton";

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
      <div className="pixel-step border border-primary/50 bg-card p-5 text-center">
        <h3 className="font-pixel text-lg uppercase tracking-widest text-primary mb-4">
          MINI-GAME UNLOCKED
        </h3>

        {!isPlaying ? (
          <div>
            <p className="mb-6 font-pixel text-sm text-foreground leading-relaxed">
              Play <span className="text-primary">SNAKE</span> to pass the time.
            </p>
            <PixelButton
              href="#"
              onClick={(e: any) => {
                e.preventDefault();
                setIsPlaying(true);
              }}
            >
              START GAME
            </PixelButton>
          </div>
        ) : (
          <div className="flex flex-col items-center gap-5">
            {/* Canvas — forced into own GPU layer to avoid CRT overlay compositing flicker */}
            <div
              className="relative mx-auto w-full max-w-[400px] border-4 border-foreground bg-black"
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

            {/* D-Pad — visible on ALL screens, keyboard also works */}
            <div className="grid grid-cols-3 gap-1.5 w-fit mx-auto select-none">
              <div />
              <DPadBtn label="↑" onPress={() => steer(0, -1)} />
              <div />
              <DPadBtn label="←" onPress={() => steer(-1, 0)} />
              <div className="h-12 w-12" />
              <DPadBtn label="→" onPress={() => steer(1, 0)} />
              <div />
              <DPadBtn label="↓" onPress={() => steer(0, 1)} />
              <div />
            </div>

            <PixelButton
              href="#"
              onClick={(e: any) => {
                e.preventDefault();
                setIsPlaying(false);
              }}
            >
              QUIT GAME
            </PixelButton>
          </div>
        )}
      </div>
    </div>
  );
}

/* ── D-Pad Button ─────────────────────────────────────────── */
function DPadBtn({ label, onPress }: { label: string; onPress: () => void }) {
  return (
    <button
      type="button"
      onPointerDown={(e) => {
        e.preventDefault();
        onPress();
      }}
      className="flex h-12 w-12 items-center justify-center border-2 border-foreground bg-muted font-pixel text-lg text-foreground transition-colors active:bg-primary active:text-primary-foreground select-none touch-none"
    >
      {label}
    </button>
  );
}
