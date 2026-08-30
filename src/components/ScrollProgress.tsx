import { useEffect, useState } from "react";

const SEGMENTS = 60;

/**
 * Pixel-segmented scroll progress bar fixed to the very top of the viewport —
 * a retro loading bar that fills in discrete blocks as you scroll.
 */
export function ScrollProgress() {
  const [filled, setFilled] = useState(0);

  useEffect(() => {
    let ticking = false;
    const update = () => {
      ticking = false;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const p = max > 0 ? Math.min(window.scrollY / max, 1) : 0;
      setFilled(Math.round(p * SEGMENTS));
    };
    const onScroll = () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(update);
      }
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <div aria-hidden className="fixed inset-x-0 top-0 z-[60] flex gap-[2px] px-[2px]">
      {Array.from({ length: SEGMENTS }, (_, i) => (
        <span
          key={i}
          className={`h-[3px] flex-1 transition-colors duration-150 ${
            i < filled ? "bg-primary" : "bg-transparent"
          }`}
        />
      ))}
    </div>
  );
}
