import { useEffect, useRef, useState } from "react";
import { useRetroMode } from "@/hooks/use-retro-mode";
import { PixelButton } from "./PixelButton";

export function MiniGame() {
  const { enabled } = useRetroMode();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  
  useEffect(() => {
    if (!enabled || !isPlaying) return;
    
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    
    let isPaused = false;
    
    // Auto-pause if user scrolls away
    const observer = new IntersectionObserver((entries) => {
      if (entries[0]) {
        isPaused = !entries[0].isIntersecting;
      }
    }, { threshold: 0.1 });
    observer.observe(canvas);
    
    let animationFrameId: number;
    let upPressed = false;
    let downPressed = false;
    
    const W = canvas.width;
    const H = canvas.height;
    
    // Game state
    const ball = { x: W / 2, y: H / 2, size: 8, dx: 4, dy: 4 };
    const p1 = { x: 10, y: H / 2 - 25, width: 8, height: 50, score: 0 };
    const p2 = { x: W - 18, y: H / 2 - 25, width: 8, height: 50, score: 0 };
    let gameOver = false;
    
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowUp") { upPressed = true; e.preventDefault(); }
      else if (e.key === "ArrowDown") { downPressed = true; e.preventDefault(); }
    };
    
    const onKeyUp = (e: KeyboardEvent) => {
      if (e.key === "ArrowUp") upPressed = false;
      else if (e.key === "ArrowDown") downPressed = false;
    };
    
    window.addEventListener("keydown", onKeyDown, { passive: false });
    window.addEventListener("keyup", onKeyUp);
    
    const onTouchMove = (e: TouchEvent) => {
      e.preventDefault(); // prevent scrolling
      if (gameOver) return;
      const rect = canvas.getBoundingClientRect();
      const scaleY = H / rect.height;
      const touchY = (e.touches[0].clientY - rect.top) * scaleY;
      p1.y = Math.max(0, Math.min(H - p1.height, touchY - p1.height / 2));
    };
    
    canvas.addEventListener("touchstart", onTouchMove, { passive: false });
    canvas.addEventListener("touchmove", onTouchMove, { passive: false });
    
    const playBeep = (freq: number = 800, type: OscillatorType = "square") => {
      try {
        const audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
        const osc = audioCtx.createOscillator();
        const gain = audioCtx.createGain();
        
        osc.type = type;
        osc.connect(gain);
        gain.connect(audioCtx.destination);
        gain.gain.setValueAtTime(0.05, audioCtx.currentTime);
        
        osc.frequency.setValueAtTime(freq, audioCtx.currentTime);
        osc.start();
        osc.stop(audioCtx.currentTime + 0.05);
      } catch(e) {}
    };
    
    const loop = () => {
      animationFrameId = requestAnimationFrame(loop);
      if (isPaused) return;
      
      // Clear
      ctx.fillStyle = "#000000";
      ctx.fillRect(0, 0, W, H);
      
      if (gameOver) {
        ctx.fillStyle = "#ffffff";
        ctx.font = "30px 'Silkscreen', monospace";
        const msg = p1.score >= 10 ? "YOU WIN!" : "GAME OVER";
        ctx.fillText(msg, W / 2 - 80, H / 2);
        ctx.font = "16px 'Silkscreen', monospace";
        ctx.fillText("Click screen to restart", W / 2 - 115, H / 2 + 40);
        return; // stop loop
      }
      
      // Draw center dashed line
      ctx.setLineDash([10, 10]);
      ctx.beginPath();
      ctx.moveTo(W/2, 0);
      ctx.lineTo(W/2, H);
      ctx.strokeStyle = "#ffffff";
      ctx.stroke();
      
      // Update p1
      if (upPressed && p1.y > 0) p1.y -= 5;
      else if (downPressed && p1.y < H - p1.height) p1.y += 5;
      
      // Update p2 (simple AI - slowed down so it's easier to beat)
      if (ball.y < p2.y + p2.height / 2 && p2.y > 0) p2.y -= 2.6;
      else if (ball.y > p2.y + p2.height / 2 && p2.y < H - p2.height) p2.y += 2.6;
      
      // Update ball
      ball.x += ball.dx;
      ball.y += ball.dy;
      
      // Top/Bottom collision
      if (ball.y <= 0 || ball.y + ball.size >= H) {
        ball.dy *= -1;
      }
      
      // Paddle collision
      if (ball.dx < 0 && ball.x <= p1.x + p1.width && ball.y + ball.size >= p1.y && ball.y <= p1.y + p1.height) {
        ball.dx *= -1;
        playBeep();
      } else if (ball.dx > 0 && ball.x + ball.size >= p2.x && ball.y + ball.size >= p2.y && ball.y <= p2.y + p2.height) {
        ball.dx *= -1;
        playBeep();
      }
      
      // Score
      if (ball.x < 0) {
        p2.score++;
        ball.x = W / 2; ball.y = H / 2; ball.dx = 4;
        playBeep(300, "sawtooth");
      } else if (ball.x > W) {
        p1.score++;
        ball.x = W / 2; ball.y = H / 2; ball.dx = -4;
        playBeep(1200, "square");
      }
      
      // Win condition
      if (p1.score >= 10 || p2.score >= 10) {
        gameOver = true;
      }
      
      // Draw everything
      ctx.fillStyle = "#ffffff";
      ctx.fillRect(p1.x, p1.y, p1.width, p1.height);
      ctx.fillRect(p2.x, p2.y, p2.width, p2.height);
      ctx.fillRect(ball.x, ball.y, ball.size, ball.size);
      
      ctx.font = "30px 'Silkscreen', monospace";
      ctx.fillText(p1.score.toString(), W / 2 - 50, 40);
      ctx.fillText(p2.score.toString(), W / 2 + 30, 40);
      
    };
    
    const onCanvasClick = () => {
      if (gameOver) {
        gameOver = false;
        p1.score = 0;
        p2.score = 0;
        ball.x = W / 2;
        ball.y = H / 2;
        ball.dx = 4;
        ball.dy = 4;
        loop();
      }
    };
    
    canvas.addEventListener("click", onCanvasClick);
    
    loop();
    
    return () => {
      observer.disconnect();
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("keydown", onKeyDown);
      window.removeEventListener("keyup", onKeyUp);
      canvas.removeEventListener("click", onCanvasClick);
      canvas.removeEventListener("touchstart", onTouchMove);
      canvas.removeEventListener("touchmove", onTouchMove);
    };
  }, [enabled, isPlaying]);

  if (!enabled) return null;

  return (
    <div className="retro-inventory mt-12 mb-8">
      <div className="pixel-step border border-primary/50 bg-card p-5 text-center">
        <h3 className="font-pixel text-lg uppercase tracking-widest text-primary mb-4">
          MINI-GAME UNLOCKED
        </h3>
        
        {!isPlaying ? (
          <div>
            <p className="mb-6 font-pixel text-sm text-foreground">
              Use <span className="text-primary">↑ ↓</span> or swipe screen to play.
            </p>
            <PixelButton href="#" onClick={(e: any) => { e.preventDefault(); setIsPlaying(true); }}>
              PLAY PONG
            </PixelButton>
          </div>
        ) : (
          <div className="flex flex-col items-center gap-4">
            <div className="flex justify-center border-[4px] border-foreground p-1 bg-black overflow-hidden relative mx-auto w-full max-w-[400px]" style={{ height: "250px" }}>
              <canvas
                ref={canvasRef}
                width={400}
                height={250}
                className="pixel-cursor outline-none touch-none w-full h-full object-contain"
                tabIndex={0}
              />
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
