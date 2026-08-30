import { useEffect, useRef, type ReactNode } from "react";

interface MagneticProps {
  children: ReactNode;
  className?: string;
}

/**
 * Subtly pulls its child toward the cursor when nearby (pointer devices
 * only, disabled under reduced-motion). Springs back on release via the
 * transition on the wrapper.
 */
export function Magnetic({ children, className = "" }: MagneticProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (!window.matchMedia("(hover: hover) and (prefers-reduced-motion: no-preference)").matches)
      return;

    const RANGE = 60; // px beyond the element's edge
    const onMove = (e: MouseEvent) => {
      const r = el.getBoundingClientRect();
      const dx = e.clientX - (r.left + r.width / 2);
      const dy = e.clientY - (r.top + r.height / 2);
      const dist = Math.hypot(dx, dy) - Math.max(r.width, r.height) / 2;
      if (dist < RANGE) {
        const pull = 1 - Math.max(dist, 0) / RANGE;
        el.style.transform = `translate(${(dx * pull * 0.22).toFixed(1)}px, ${(dy * pull * 0.22).toFixed(1)}px)`;
      } else if (el.style.transform) {
        el.style.transform = "";
      }
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  return (
    <div
      ref={ref}
      className={`inline-block transition-transform duration-200 ease-out ${className}`}
    >
      {children}
    </div>
  );
}
