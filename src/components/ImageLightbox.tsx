import {
  useCallback,
  useEffect,
  useId,
  useRef,
  useState,
  type KeyboardEvent as ReactKeyboardEvent,
  type TouchEvent as ReactTouchEvent,
} from "react";
import { createPortal } from "react-dom";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import type { ProjectScreenshot } from "@/data/projects";

export interface ImageLightboxProps {
  screenshots: ProjectScreenshot[];
  initialIndex: number;
  onClose: () => void;
}

export function ImageLightbox({ screenshots, initialIndex, onClose }: ImageLightboxProps) {
  const [mounted, setMounted] = useState(false);
  const [index, setIndex] = useState(initialIndex);
  const dialogRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const touchStartRef = useRef<{ x: number; y: number } | null>(null);
  const titleId = useId();
  const historyMarker = `project-gallery-${useId()}`;
  const count = screenshots.length;

  const prev = useCallback(() => {
    setIndex((current) => (current - 1 + count) % count);
  }, [count]);
  const next = useCallback(() => {
    setIndex((current) => (current + 1) % count);
  }, [count]);

  const requestClose = useCallback(() => {
    const state = window.history.state;
    if (state && typeof state === "object" && state[historyMarker]) {
      window.history.back();
      return;
    }
    onClose();
  }, [historyMarker, onClose]);

  useEffect(() => {
    const originalOverflow = document.body.style.overflow;
    const previousFocus =
      document.activeElement instanceof HTMLElement ? document.activeElement : null;
    const oldState = window.history.state;
    const currentState = oldState && typeof oldState === "object" ? oldState : {};

    window.history.pushState({ ...currentState, [historyMarker]: true }, "", window.location.href);
    document.body.style.overflow = "hidden";

    const focusFrame = requestAnimationFrame(() => closeButtonRef.current?.focus());
    const handlePopState = () => {
      const state = window.history.state;
      if (!state || typeof state !== "object" || !state[historyMarker]) onClose();
    };

    window.addEventListener("popstate", handlePopState);
    return () => {
      cancelAnimationFrame(focusFrame);
      window.removeEventListener("popstate", handlePopState);
      document.body.style.overflow = originalOverflow;
      const state = window.history.state;
      if (state && typeof state === "object" && state[historyMarker]) {
        const cleanedState = { ...state };
        delete cleanedState[historyMarker];
        window.history.replaceState(cleanedState, "", window.location.href);
      }
      previousFocus?.focus();
    };
  }, [historyMarker, onClose]);

  useEffect(() => {
    const frame = requestAnimationFrame(() => setMounted(true));
    return () => cancelAnimationFrame(frame);
  }, []);

  const handleKeyDown = (event: ReactKeyboardEvent<HTMLDivElement>) => {
    if (event.key === "Escape") {
      event.preventDefault();
      requestClose();
    } else if (event.key === "ArrowLeft" && count > 1) {
      event.preventDefault();
      prev();
    } else if (event.key === "ArrowRight" && count > 1) {
      event.preventDefault();
      next();
    } else if (event.key === "Tab") {
      const focusable = dialogRef.current?.querySelectorAll<HTMLElement>(
        'button:not([disabled]), [href], [tabindex]:not([tabindex="-1"])',
      );
      const items = focusable ? Array.from(focusable) : [];
      const first = items[0];
      const last = items[items.length - 1];
      if (!first || !last) return;
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    }
  };

  const handleTouchStart = (event: ReactTouchEvent<HTMLDivElement>) => {
    const touch = event.changedTouches[0];
    touchStartRef.current = touch ? { x: touch.clientX, y: touch.clientY } : null;
  };

  const handleTouchEnd = (event: ReactTouchEvent<HTMLDivElement>) => {
    const start = touchStartRef.current;
    touchStartRef.current = null;
    const touch = event.changedTouches[0];
    if (!start || !touch || count < 2) return;

    const deltaX = touch.clientX - start.x;
    const deltaY = touch.clientY - start.y;
    if (Math.abs(deltaX) < 48 || Math.abs(deltaX) < Math.abs(deltaY)) return;
    if (deltaX < 0) next();
    else prev();
  };

  const screenshot = screenshots[index];
  if (!screenshot) return null;

  const content = (
    <div
      ref={dialogRef}
      role="dialog"
      aria-modal="true"
      aria-labelledby={titleId}
      tabIndex={-1}
      onKeyDown={handleKeyDown}
      onClick={(event) => {
        if (event.target === event.currentTarget) requestClose();
      }}
      className={`fixed inset-0 z-[9999] flex items-center justify-center bg-black/90 p-4 backdrop-blur-sm transition-opacity duration-200 motion-reduce:transition-none sm:p-8 ${
        mounted ? "opacity-100" : "opacity-0"
      }`}
    >
      <button
        ref={closeButtonRef}
        type="button"
        onClick={requestClose}
        aria-label="Close viewer and return to the project gallery"
        className="absolute right-4 top-4 z-[10000] flex h-11 w-11 items-center justify-center border border-white/20 bg-black/60 text-white transition-colors hover:border-primary hover:bg-black/80 hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
      >
        <X className="h-6 w-6" aria-hidden />
      </button>

      {count > 1 ? (
        <>
          <button
            type="button"
            onClick={prev}
            aria-label="Previous screenshot"
            className="absolute left-3 top-1/2 z-[10000] flex h-12 w-12 -translate-y-1/2 items-center justify-center border border-white/20 bg-black/60 text-white transition-colors hover:border-primary hover:bg-black/80 hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring sm:left-6"
          >
            <ChevronLeft className="h-6 w-6" aria-hidden />
          </button>
          <button
            type="button"
            onClick={next}
            aria-label="Next screenshot"
            className="absolute right-3 top-1/2 z-[10000] flex h-12 w-12 -translate-y-1/2 items-center justify-center border border-white/20 bg-black/60 text-white transition-colors hover:border-primary hover:bg-black/80 hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring sm:right-6"
          >
            <ChevronRight className="h-6 w-6" aria-hidden />
          </button>
        </>
      ) : null}

      <div
        className="flex h-full w-full max-w-6xl flex-col items-center justify-center gap-4 pb-12 pt-12 sm:pb-14"
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
        onClick={(event) => event.stopPropagation()}
      >
        <img
          src={screenshot.src}
          alt={screenshot.alt}
          loading="eager"
          decoding="async"
          draggable={false}
          className="max-h-[76vh] max-w-full select-none object-contain shadow-2xl"
        />
        <div className="max-w-3xl text-center text-white">
          <h2 id={titleId} className="sr-only">
            {screenshot.caption}
          </h2>
          <p className="text-sm leading-relaxed text-white/85">{screenshot.caption}</p>
          {count > 1 ? (
            <p aria-live="polite" className="mt-2 font-pixel text-xs tracking-widest text-white/60">
              {String(index + 1).padStart(2, "0")} / {String(count).padStart(2, "0")}
            </p>
          ) : null}
        </div>
      </div>
    </div>
  );

  return createPortal(content, document.body);
}
