import { useEffect, useState } from "react";
import { X } from "lucide-react";

export interface ImageLightboxProps {
  src: string;
  alt: string;
  onClose: () => void;
}

export function ImageLightbox({ src, alt, onClose }: ImageLightboxProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const raf = requestAnimationFrame(() => setMounted(true));
    return () => cancelAnimationFrame(raf);
  }, []);

  useEffect(() => {
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Image lightbox"
      onClick={onClose}
      className={`fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4 backdrop-blur-sm transition-opacity duration-200 sm:p-8 ${
        mounted ? "opacity-100" : "opacity-0"
      }`}
    >
      <button
        type="button"
        onClick={onClose}
        aria-label="Close image viewer"
        className="pixel-step absolute right-4 top-4 z-50 flex h-11 w-11 items-center justify-center border border-white/20 bg-black/60 text-white transition-colors hover:border-primary hover:bg-black/80 hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
      >
        <X className="h-6 w-6" aria-hidden />
      </button>

      <div
        className="relative flex h-full w-full max-h-[90vh] max-w-[90vw] items-center justify-center"
        onClick={(e) => e.stopPropagation()}
      >
        <img
          src={src}
          alt={alt}
          className="max-h-[90vh] max-w-[90vw] select-none object-contain shadow-2xl"
        />
      </div>
    </div>
  );
}
