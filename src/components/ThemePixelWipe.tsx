interface ThemePixelWipeProps {
  phase: "opening" | "closing" | null;
}

export function ThemePixelWipe({ phase }: ThemePixelWipeProps) {
  if (!phase) return null;

  return <div aria-hidden className={`theme-pixel-wipe theme-pixel-wipe-${phase}`} />;
}
