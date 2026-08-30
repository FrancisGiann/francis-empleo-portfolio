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

  return (
    <RetroModeContext.Provider value={{ enabled, toggle }}>{children}</RetroModeContext.Provider>
  );
}
