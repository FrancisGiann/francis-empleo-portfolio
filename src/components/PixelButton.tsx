import type { AnchorHTMLAttributes, ReactNode } from "react";

interface PixelButtonProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  children: ReactNode;
  variant?: "primary" | "outline";
  href: string;
}

export function PixelButton({
  children,
  variant = "primary",
  href,
  className = "",
  ...rest
}: PixelButtonProps) {
  const base =
    "pixel-step inline-flex items-center gap-2 px-5 py-2.5 font-pixel text-xs uppercase tracking-wider transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0";
  const styles =
    variant === "primary"
      ? "bg-primary text-primary-foreground hover:brightness-110"
      : "bg-transparent text-primary ring-2 ring-inset ring-primary hover:bg-primary hover:text-primary-foreground";

  return (
    <a href={href} className={`${base} ${styles} ${className}`} {...rest}>
      {children}
    </a>
  );
}
