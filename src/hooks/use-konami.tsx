import { useCallback, useEffect, useRef, useState, type ReactNode } from "react";
import { toast } from "sonner";
import { RetroModeContext, type RetroToggleSource } from "@/hooks/retro-mode-context";

const SEQUENCE = [
  "arrowup",
  "arrowup",
  "arrowdown",
  "arrowdown",
  "arrowleft",
  "arrowright",
  "arrowleft",
  "arrowright",
  "b",
  "a",
];

const STORAGE_KEY = "konami-retro";

function playRetroSound(enable: boolean) {
  try {
    const ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    
    osc.connect(gain);
    gain.connect(ctx.destination);
    
    osc.type = 'square';
    
    const now = ctx.currentTime;
    
    if (enable) {
      // Power up arpeggio
      osc.frequency.setValueAtTime(440, now); // A4
      osc.frequency.setValueAtTime(554.37, now + 0.1); // C#5
      osc.frequency.setValueAtTime(659.25, now + 0.2); // E5
      osc.frequency.setValueAtTime(880, now + 0.3); // A5
      
      gain.gain.setValueAtTime(0, now);
      gain.gain.linearRampToValueAtTime(0.1, now + 0.05);
      gain.gain.setValueAtTime(0.1, now + 0.3);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.6);
      
      osc.start(now);
      osc.stop(now + 0.6);
    } else {
      // Power down pitch drop
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(440, now);
      osc.frequency.exponentialRampToValueAtTime(55, now + 0.4);
      
      gain.gain.setValueAtTime(0.1, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.4);
      
      osc.start(now);
      osc.stop(now + 0.4);
    }
  } catch (e) {
    console.error('Audio playback failed', e);
  }
}

function announceRetroMode(enabled: boolean, source: RetroToggleSource) {
  const keyboard = source === "keyboard";
  toast(
    enabled ? (keyboard ? "8-BIT MODE UNLOCKED" : "8-BIT MODE ENABLED") : "8-BIT MODE DISABLED",
    {
      className: "font-pixel",
      description: enabled
        ? keyboard
          ? "Konami code accepted. Welcome to the retro timeline."
          : "Tap again any time to return to the present."
        : "Back to the present.",
    },
  );
}

export function RetroModeProvider({ children }: { children: ReactNode }) {
  const [enabled, setEnabled] = useState(false);
  const enabledRef = useRef(false);

  useEffect(() => {
    const initial = localStorage.getItem(STORAGE_KEY) === "1";
    enabledRef.current = initial;
    setEnabled(initial);
    document.documentElement.classList.toggle("retro", initial);
  }, []);

  const toggle = useCallback((source: RetroToggleSource = "direct") => {
    const next = !enabledRef.current;
    enabledRef.current = next;
    setEnabled(next);
    localStorage.setItem(STORAGE_KEY, next ? "1" : "0");
    document.documentElement.classList.toggle("retro", next);
    announceRetroMode(next, source);
    playRetroSound(next);
  }, []);

  useEffect(() => {
    let progress = 0;
    const onKey = (event: KeyboardEvent) => {
      const key = event.key.toLowerCase();
      progress = key === SEQUENCE[progress] ? progress + 1 : key === SEQUENCE[0] ? 1 : 0;
      if (progress < SEQUENCE.length) return;
      progress = 0;
      toggle("keyboard");
    };

    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [toggle]);

  useEffect(() => {
    const onClick = () => {
      if (!enabledRef.current) return;
      try {
        const ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.connect(gain);
        gain.connect(ctx.destination);
        
        osc.type = 'square';
        osc.frequency.setValueAtTime(600, ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(300, ctx.currentTime + 0.05);
        
        gain.gain.setValueAtTime(0.08, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.05);
        
        osc.start(ctx.currentTime);
        osc.stop(ctx.currentTime + 0.05);
      } catch (e) {
        // Ignore audio errors
      }
    };

    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);

  return (
    <RetroModeContext.Provider value={{ enabled, toggle }}>{children}</RetroModeContext.Provider>
  );
}
