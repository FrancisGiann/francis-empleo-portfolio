import { useEffect, useRef } from "react";

interface PixelPhotoProps {
  src: string;
  alt: string;
  width: number;
  height: number;
}

/**
 * One photo in, pixel-art version generated live: the source image is drawn
 * to a tiny offscreen canvas, then scaled back up with smoothing disabled.
 * The pixelated canvas cross-fades in over the original on hover.
 */
export function PixelPhoto({ src, alt, width, height }: PixelPhotoProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const img = new Image();
    img.src = src;
    img.onload = () => {
      const W = 340;
      const H = 425; // 4:5 to match the container
      const PIXEL_W = 34; // ~10% resolution → chunky visible pixels
      const PIXEL_H = 43;

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
  }, [src]);

  return (
    <div className="group pixel-step relative aspect-[4/5] w-[280px] overflow-hidden border border-border bg-card sm:w-[340px]">
      <img
        src={src}
        alt={alt}
        width={width}
        height={height}
        className="absolute inset-0 h-full w-full object-cover"
      />
      <canvas
        ref={canvasRef}
        aria-hidden
        className="pointer-events-none absolute inset-0 h-full w-full opacity-0 transition-opacity duration-300 ease-out group-hover:opacity-100 motion-reduce:duration-150"
      />
      <span
        aria-hidden
        className="pointer-events-none absolute bottom-2 right-2 font-pixel text-[9px] text-primary opacity-0 transition-opacity duration-300 group-hover:opacity-100"
      >
        8-BIT MODE
      </span>
    </div>
  );
}
