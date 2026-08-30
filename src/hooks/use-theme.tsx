import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { ThemePixelWipe } from "@/components/ThemePixelWipe";

type Theme = "light" | "dark";

interface ThemeContextValue {
  theme: Theme;
  toggle: () => void;
  mounted: boolean;
  isTransitioning: boolean;
}

const ThemeContext = createContext<ThemeContextValue>({
  theme: "light",
  toggle: () => {},
  mounted: false,
  isTransitioning: false,
});

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<Theme>("light");
  const [mounted, setMounted] = useState(false);
  const [wipePhase, setWipePhase] = useState<"opening" | "closing" | null>(null);
  const wipePhaseRef = useRef<"opening" | "closing" | null>(null);
  const timers = useRef<number[]>([]);

  const clearTimers = useCallback(() => {
    timers.current.forEach((timer) => window.clearTimeout(timer));
    timers.current = [];
  }, []);

  useEffect(() => {
    const stored = localStorage.getItem("theme");
    const initial: Theme =
      stored === "dark" || stored === "light"
        ? stored
        : window.matchMedia("(prefers-color-scheme: dark)").matches
          ? "dark"
          : "light";
    setTheme(initial);
    document.documentElement.classList.toggle("dark", initial === "dark");
    setMounted(true);
    return clearTimers;
  }, [clearTimers]);

  const toggle = useCallback(() => {
    if (!mounted || wipePhaseRef.current) return;

    const next: Theme = theme === "dark" ? "light" : "dark";
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const applyTheme = () => {
      setTheme(next);
      localStorage.setItem("theme", next);
      document.documentElement.classList.toggle("dark", next === "dark");
    };

    clearTimers();
    if (reducedMotion) {
      applyTheme();
      return;
    }

    wipePhaseRef.current = "opening";
    setWipePhase("opening");
    timers.current.push(
      window.setTimeout(() => {
        applyTheme();
        wipePhaseRef.current = "closing";
        setWipePhase("closing");
      }, 180),
      window.setTimeout(() => {
        wipePhaseRef.current = null;
        setWipePhase(null);
        timers.current = [];
      }, 480),
    );
  }, [clearTimers, mounted, theme]);

  return (
    <ThemeContext.Provider value={{ theme, toggle, mounted, isTransitioning: wipePhase !== null }}>
      <ThemePixelWipe phase={wipePhase} />
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  return useContext(ThemeContext);
}
