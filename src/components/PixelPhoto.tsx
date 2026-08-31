import { useEffect, useRef } from "react";
import { useRetroMode } from "@/hooks/use-retro-mode";

interface PixelPhotoProps {
  src: string;
  alt: string;
  width: number;
  height: number;
  pixelSrc?: string;
}

/**
 * Keeps the source photo as the primary image and offers a lightweight
 * pixel-art canvas preview on hover or keyboard focus, OR a custom pixel art image.
 */
export function PixelPhoto({ src, alt, width, height, pixelSrc }: PixelPhotoProps) {
  const { enabled } = useRetroMode();
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (pixelSrc) return; // Skip canvas generation if we have a custom pixel source
    const canvas = canvasRef.current;
    if (!canvas) return;

    let cancelled = false;
    const img = new Image();
    img.src = src;
    img.onload = () => {
      if (cancelled) return;
      const W = 340;
      const H = 425; // 4:5 to match the container
      const PIXEL_W = 56; // recognizable face with a clearly pixelated finish
      const PIXEL_H = 70;

      const off = document.createElement("canvas");
      off.width = PIXEL_W;
      off.height = PIXEL_H;
      const octx = off.getContext("2d");
      const ctx = canvas.getContext("2d");
      if (!octx || !ctx) return;

      // Cover-crop the source to 4:5 before downsampling
      const srcAspect = img.naturalWidth / img.naturalHeight;
      const dstAspect = W / H;
      let sw = img.naturalWidth;
      let sh = img.naturalHeight;
      let sx = 0;
      let sy = 0;
      if (srcAspect > dstAspect) {
        sw = sh * dstAspect;
        sx = (img.naturalWidth - sw) / 2;
      } else {
        sh = sw / dstAspect;
        sy = (img.naturalHeight - sh) / 2;
      }

      octx.drawImage(img, sx, sy, sw, sh, 0, 0, PIXEL_W, PIXEL_H);

      canvas.width = W;
      canvas.height = H;
      ctx.imageSmoothingEnabled = false;
      ctx.drawImage(off, 0, 0, PIXEL_W, PIXEL_H, 0, 0, W, H);
    };
    return () => {
      cancelled = true;
      img.onload = null;
    };
  }, [src, pixelSrc]);

  return (
    <div
      tabIndex={0}
      className="group pixel-step relative aspect-[4/5] w-full max-w-[340px] overflow-hidden border border-border bg-card focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
    >
      <img
        src={src}
        alt={alt}
        width={width}
        height={height}
        className="absolute inset-0 h-full w-full object-cover"
      />
      
      {pixelSrc ? (
        <img
          src={pixelSrc}
          alt={`Pixel art version of ${alt}`}
          className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-300 ease-out motion-reduce:transition-none ${
            enabled
              ? "opacity-100"
              : "opacity-0 group-hover:opacity-100 group-focus-visible:opacity-100"
          }`}
        />
      ) : (
        <canvas
          ref={canvasRef}
          aria-hidden
          className={`pointer-events-none absolute inset-0 h-full w-full [image-rendering:pixelated] transition-opacity duration-300 ease-out motion-reduce:transition-none ${
            enabled
              ? "opacity-100"
              : "opacity-0 group-hover:opacity-100 group-focus-visible:opacity-100"
          }`}
        />
      )}
      
      <span
        aria-hidden
        className={`pointer-events-none absolute bottom-2 right-2 font-pixel text-[9px] transition-opacity duration-300 ${
          enabled
            ? "opacity-100"
            : "opacity-0 group-hover:opacity-100 group-focus-visible:opacity-100"
        }`}
      >
        8-BIT PREVIEW
      </span>
    </div>
  );
}
