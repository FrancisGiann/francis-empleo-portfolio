import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";
type Theme = "light" | "dark";

export interface ThemeToggleOrigin {
  x: number;
  y: number;
}

interface ThemeContextValue {
  theme: Theme;
  toggle: (origin?: ThemeToggleOrigin) => void;
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
  const [isTransitioning, setIsTransitioning] = useState(false);
  const transitionLockRef = useRef(false);

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
  }, []);

  const toggle = useCallback(
    (origin?: ThemeToggleOrigin) => {
      if (!mounted || transitionLockRef.current) return;

      const next: Theme = theme === "dark" ? "light" : "dark";
      const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      const nextOrigin: ThemeToggleOrigin = {
        x:
          origin && Number.isFinite(origin.x)
            ? Math.min(Math.max(origin.x, 0), window.innerWidth)
            : window.innerWidth / 2,
        y:
          origin && Number.isFinite(origin.y)
            ? Math.min(Math.max(origin.y, 0), window.innerHeight)
            : window.innerHeight / 2,
      };

      const applyTheme = () => {
        setTheme(next);
        localStorage.setItem("theme", next);
        document.documentElement.classList.toggle("dark", next === "dark");
      };

      if (reducedMotion) {
        applyTheme();
        return;
      }

      const startViewTransition = document.startViewTransition;
      if (typeof startViewTransition !== "function") {
        applyTheme();
        return;
      }

      const radius = Math.hypot(
        Math.max(nextOrigin.x, window.innerWidth - nextOrigin.x),
        Math.max(nextOrigin.y, window.innerHeight - nextOrigin.y),
      );
      const root = document.documentElement;
      root.style.setProperty("--theme-origin-x", String(nextOrigin.x) + "px");
      root.style.setProperty("--theme-origin-y", String(nextOrigin.y) + "px");
      root.style.setProperty("--theme-ripple-radius", String(Math.max(radius, 1)) + "px");

      transitionLockRef.current = true;
      setIsTransitioning(true);
      root.classList.add("theme-transition");

      try {
        const transition = startViewTransition.call(document, applyTheme);
        transition.finished.then(
          () => {
            root.classList.remove("theme-transition");
            transitionLockRef.current = false;
            setIsTransitioning(false);
          },
          () => {
            root.classList.remove("theme-transition");
            transitionLockRef.current = false;
            setIsTransitioning(false);
          },
        );
      } catch {
        applyTheme();
        root.classList.remove("theme-transition");
        transitionLockRef.current = false;
        setIsTransitioning(false);
      }
    },
    [mounted, theme],
  );

  return (
    <ThemeContext.Provider value={{ theme, toggle, mounted, isTransitioning }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  return useContext(ThemeContext);
}
