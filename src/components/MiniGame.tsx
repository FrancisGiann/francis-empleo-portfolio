import { useEffect, useRef, useState } from "react";
import { useRetroMode } from "@/hooks/use-retro-mode";
import { PixelButton } from "./PixelButton";

export function MiniGame() {
  const { enabled } = useRetroMode();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const inputRef = useRef({ dx: 1, dy: 0 }); // Initial direction: right

  useEffect(() => {
    if (!enabled || !isPlaying) return;
    
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    
    let animationFrameId: number;
    let lastTime = 0;
    
    const GRID_SIZE = 10;
    const W = canvas.width;
    const H = canvas.height;
    const COLS = W / GRID_SIZE;
    const ROWS = H / GRID_SIZE;
    
    let snake = [
      { x: 10, y: 10 },
      { x: 9, y: 10 },
      { x: 8, y: 10 },
    ];
    let food = { x: 15, y: 10 };
    let score = 0;
    let gameOver = false;
    let currentDir = { dx: 1, dy: 0 };
    
    // Shared single AudioContext instance
    let audioCtx: AudioContext | null = null;

    const playBeep = (freq: number = 800, type: OscillatorType = "square", duration: number = 0.05) => {
      try {
        if (!audioCtx) {
          const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
          if (AudioContextClass) audioCtx = new AudioContextClass();
        }
        if (!audioCtx || audioCtx.state === "suspended") {
          audioCtx?.resume();
        }
        if (!audioCtx) return;

        const osc = audioCtx.createOscillator();
        const gain = audioCtx.createGain();
        
        osc.type = type;
        osc.connect(gain);
        gain.connect(audioCtx.destination);
        gain.gain.setValueAtTime(0.05, audioCtx.currentTime);
        
        osc.frequency.setValueAtTime(freq, audioCtx.currentTime);
        osc.start();
        osc.stop(audioCtx.currentTime + duration);
      } catch(e) {}
    };

    const placeFood = () => {
      let valid = false;
      while (!valid) {
        food.x = Math.floor(Math.random() * COLS);
        food.y = Math.floor(Math.random() * ROWS);
        valid = !snake.some(segment => segment.x === food.x && segment.y === food.y);
      }
    };
    
    const onKeyDown = (e: KeyboardEvent) => {
      const isUp = e.key === "ArrowUp" || e.key.toLowerCase() === "w";
      const isDown = e.key === "ArrowDown" || e.key.toLowerCase() === "s";
      const isLeft = e.key === "ArrowLeft" || e.key.toLowerCase() === "a";
      const isRight = e.key === "ArrowRight" || e.key.toLowerCase() === "d";
      
      if (isUp && currentDir.dy === 0) { inputRef.current = { dx: 0, dy: -1 }; e.preventDefault(); }
      else if (isDown && currentDir.dy === 0) { inputRef.current = { dx: 0, dy: 1 }; e.preventDefault(); }
      else if (isLeft && currentDir.dx === 0) { inputRef.current = { dx: -1, dy: 0 }; e.preventDefault(); }
      else if (isRight && currentDir.dx === 0) { inputRef.current = { dx: 1, dy: 0 }; e.preventDefault(); }
    };
    
    window.addEventListener("keydown", onKeyDown, { passive: false });
    
    const loop = (timestamp: number) => {
      animationFrameId = requestAnimationFrame(loop);
      
      if (gameOver) {
        ctx.fillStyle = "#000000";
        ctx.fillRect(0, 0, W, H);
        ctx.fillStyle = "#ffffff";
        ctx.font = "30px 'Silkscreen', monospace";
        ctx.fillText("GAME OVER", W / 2 - 100, H / 2 - 10);
        ctx.font = "16px 'Silkscreen', monospace";
        ctx.fillText(`SCORE: ${score}`, W / 2 - 45, H / 2 + 25);
        ctx.fillText("Click to restart", W / 2 - 95, H / 2 + 60);
        return;
      }
      
      // Throttle to ~12 FPS
      if (timestamp - lastTime < 80) return;
      lastTime = timestamp;
      
      currentDir = { ...inputRef.current };
      
      const head = { x: snake[0].x + currentDir.dx, y: snake[0].y + currentDir.dy };
      
      // Wall collision
      if (head.x < 0 || head.x >= COLS || head.y < 0 || head.y >= ROWS) {
        gameOver = true;
        playBeep(200, "sawtooth", 0.3);
        return;
      }
      
      // Self collision
      if (snake.some(segment => segment.x === head.x && segment.y === head.y)) {
        gameOver = true;
        playBeep(200, "sawtooth", 0.3);
        return;
      }
      
      snake.unshift(head);
      
      // Food collision
      if (head.x === food.x && head.y === food.y) {
        score += 10;
        playBeep(1200, "square", 0.05);
        placeFood();
      } else {
        snake.pop();
      }
      
      // Draw Clear
      ctx.fillStyle = "#000000";
      ctx.fillRect(0, 0, W, H);
      
      // Draw Food
      ctx.fillStyle = "#primary"; // Fallback if css var fails
      ctx.fillStyle = getComputedStyle(document.documentElement).getPropertyValue("--primary").trim() ? `hsl(${getComputedStyle(document.documentElement).getPropertyValue("--primary")})` : "#22c55e";
      ctx.fillRect(food.x * GRID_SIZE, food.y * GRID_SIZE, GRID_SIZE - 1, GRID_SIZE - 1);
      
      // Draw Snake
      ctx.fillStyle = "#ffffff";
      snake.forEach((segment, i) => {
        if (i === 0) {
          ctx.fillStyle = "#dddddd"; // Head slightly darker
        } else {
          ctx.fillStyle = "#ffffff";
        }
        ctx.fillRect(segment.x * GRID_SIZE, segment.y * GRID_SIZE, GRID_SIZE - 1, GRID_SIZE - 1);
      });
      
      // Draw Score
      ctx.fillStyle = "rgba(255, 255, 255, 0.5)";
      ctx.font = "12px 'Silkscreen', monospace";
      ctx.fillText(`SCORE: ${score}`, 10, 20);
    };
    
    const onCanvasClick = () => {
      if (gameOver) {
        gameOver = false;
        snake = [
          { x: 10, y: 10 },
          { x: 9, y: 10 },
          { x: 8, y: 10 },
        ];
        currentDir = { dx: 1, dy: 0 };
        inputRef.current = { dx: 1, dy: 0 };
        score = 0;
        placeFood();
      }
    };
    
    canvas.addEventListener("click", onCanvasClick);
    
    animationFrameId = requestAnimationFrame(loop);
    
    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("keydown", onKeyDown);
      canvas.removeEventListener("click", onCanvasClick);
      if (audioCtx) {
        try { audioCtx.close(); } catch(e) {}
      }
    };
  }, [enabled, isPlaying]);

  if (!enabled) return null;

  const handleDir = (dx: number, dy: number) => {
    // Prevent 180-degree self-turns
    const isHorizontal = dx !== 0;
    if (isHorizontal && inputRef.current.dx === 0) {
      inputRef.current = { dx, dy };
    } else if (!isHorizontal && inputRef.current.dy === 0) {
      inputRef.current = { dx, dy };
    }
  };

  return (
    <div className="retro-inventory mt-12 mb-8">
      <div className="pixel-step border border-primary/50 bg-card p-5 text-center">
        <h3 className="font-pixel text-lg uppercase tracking-widest text-primary mb-4">
          MINI-GAME UNLOCKED
        </h3>
        
        {!isPlaying ? (
          <div>
            <p className="mb-6 font-pixel text-sm text-foreground leading-relaxed">
              Play <span className="text-primary">SNAKE</span> to pass the time.<br />
              Use <span className="text-primary">W A S D</span>, arrow keys, or the D-Pad.
            </p>
            <PixelButton href="#" onClick={(e: any) => { e.preventDefault(); setIsPlaying(true); }}>
              START GAME
            </PixelButton>
          </div>
        ) : (
          <div className="flex flex-col items-center gap-6">
            <div className="pixel-step flex justify-center border-[4px] border-foreground p-1 bg-black overflow-hidden relative mx-auto w-full max-w-[400px]" style={{ height: "250px" }}>
              <canvas
                ref={canvasRef}
                width={400}
                height={250}
                className="pixel-cursor outline-none touch-none w-full h-full object-contain"
                tabIndex={0}
              />
            </div>
            
            {/* Mobile On-Screen D-Pad (Cross shape) */}
            <div className="grid grid-cols-3 grid-rows-3 gap-2 sm:hidden mx-auto w-fit">
              <div />
              <button
                type="button"
                className="pixel-step flex h-14 w-14 items-center justify-center border-4 border-foreground bg-muted text-2xl font-bold active:bg-primary active:text-primary-foreground touch-none select-none"
                onPointerDown={(e) => { e.preventDefault(); handleDir(0, -1); }}
              >
                ↑
              </button>
              <div />
              
              <button
                type="button"
                className="pixel-step flex h-14 w-14 items-center justify-center border-4 border-foreground bg-muted text-2xl font-bold active:bg-primary active:text-primary-foreground touch-none select-none"
                onPointerDown={(e) => { e.preventDefault(); handleDir(-1, 0); }}
              >
                ←
              </button>
              <div className="h-14 w-14" /> {/* center empty */}
              <button
                type="button"
                className="pixel-step flex h-14 w-14 items-center justify-center border-4 border-foreground bg-muted text-2xl font-bold active:bg-primary active:text-primary-foreground touch-none select-none"
                onPointerDown={(e) => { e.preventDefault(); handleDir(1, 0); }}
              >
                →
              </button>
              
              <div />
              <button
                type="button"
                className="pixel-step flex h-14 w-14 items-center justify-center border-4 border-foreground bg-muted text-2xl font-bold active:bg-primary active:text-primary-foreground touch-none select-none"
                onPointerDown={(e) => { e.preventDefault(); handleDir(0, 1); }}
              >
                ↓
              </button>
              <div />
            </div>

            <PixelButton href="#" onClick={(e: any) => { e.preventDefault(); setIsPlaying(false); }}>
              QUIT GAME
            </PixelButton>
          </div>
        )}
      </div>
    </div>
  );
}
