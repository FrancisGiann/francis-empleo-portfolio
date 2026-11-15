import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";

interface AmbientLeavesContextValue {
  enabled: boolean;
  toggle: () => void;
}

const AmbientLeavesContext = createContext<AmbientLeavesContextValue>({
  enabled: true,
  toggle: () => {},
});

const LEAF_COUNT = 8;
const LEAVES_STORAGE_KEY = "portfolio-falling-leaves";

export function AmbientLeavesProvider({ children }: { children: ReactNode }) {
  const [enabled, setEnabled] = useState(true);

  useEffect(() => {
    try {
      setEnabled(window.localStorage.getItem(LEAVES_STORAGE_KEY) !== "paused");
    } catch {
      setEnabled(true);
    }
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle("ambient-leaves-paused", !enabled);
  }, [enabled]);

  const toggle = useCallback(() => {
    const next = !enabled;
    setEnabled(next);
    document.documentElement.classList.toggle("ambient-leaves-paused", !next);
    try {
      window.localStorage.setItem(LEAVES_STORAGE_KEY, next ? "running" : "paused");
    } catch {
      // Keep the in-memory control usable when storage is unavailable.
    }
  }, [enabled]);

  return (
    <AmbientLeavesContext.Provider value={{ enabled, toggle }}>
      <div className="ambient-leaves" aria-hidden="true">
        {Array.from({ length: LEAF_COUNT }, (_, index) => (
          <span key={index} className={`ambient-leaf ambient-leaf-${index + 1}`} />
        ))}
      </div>
      {children}
    </AmbientLeavesContext.Provider>
  );
}

export function useAmbientLeaves() {
  return useContext(AmbientLeavesContext);
}
