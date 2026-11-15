import { useCallback, useContext, useEffect, useRef, useState, type ReactNode } from "react";
import { toast } from "sonner";
import { ArcadeModeContext, type ArcadeToggleSource } from "@/hooks/arcade-mode-context";

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
const STORAGE_KEY = "portfolio-arcade-mode";

function isEditableTarget(target: EventTarget | null) {
  if (!(target instanceof HTMLElement)) return false;
  return (
    target.isContentEditable ||
    target.matches("input, textarea, select, [role='textbox']") ||
    Boolean(target.closest("[data-game-controls]"))
  );
}

export function useKonami() {
  return useContext(ArcadeModeContext);
}

export function ArcadeModeProvider({ children }: { children: ReactNode }) {
  const [enabled, setEnabled] = useState(false);
  const enabledRef = useRef(false);

  useEffect(() => {
    let savedMode = false;
    try {
      savedMode = localStorage.getItem(STORAGE_KEY) === "1";
    } catch {
      // The arcade mode can still be toggled for this page view if storage is unavailable.
    }
    enabledRef.current = savedMode;
    setEnabled(savedMode);
    document.documentElement.classList.toggle("arcade-mode", savedMode);
    return () => document.documentElement.classList.remove("arcade-mode");
  }, []);

  const toggle = useCallback((source: ArcadeToggleSource = "direct") => {
    const next = !enabledRef.current;
    enabledRef.current = next;
    setEnabled(next);
    document.documentElement.classList.toggle("arcade-mode", next);
    try {
      localStorage.setItem(STORAGE_KEY, next ? "1" : "0");
    } catch {
      // Keep the current mode active even when storage is restricted.
    }

    if (next) {
      toast("ARCADE MODE UNLOCKED", {
        className: "font-pixel",
        description:
          source === "keyboard"
            ? "Konami code accepted. Play Snake from the home menu."
            : "Arcade visuals are on. Play Snake from the home menu.",
      });
    } else {
      toast("ARCADE MODE OFF", {
        className: "font-pixel",
        description: "The portfolio is back in its illustrated theme.",
      });
    }
  }, []);

  useEffect(() => {
    let progress = 0;
    const onKey = (event: KeyboardEvent) => {
      if (event.isComposing || isEditableTarget(event.target)) return;

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
    <ArcadeModeContext.Provider value={{ enabled, toggle }}>{children}</ArcadeModeContext.Provider>
  );
}
