import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from "react";

type PixelButtonBaseProps = {
  children: ReactNode;
  variant?: "primary" | "outline";
  className?: string;
};

type AsAnchor = PixelButtonBaseProps & AnchorHTMLAttributes<HTMLAnchorElement> & { href: string };

type AsButton = PixelButtonBaseProps & ButtonHTMLAttributes<HTMLButtonElement> & { href?: never };

type PixelButtonProps = AsAnchor | AsButton;

export function PixelButton(props: PixelButtonProps) {
  const { children, variant = "primary", className = "", ...rest } = props;

  const base =
    "pixel-step inline-flex min-h-11 items-center gap-2 border px-5 py-2.5 font-pixel text-xs uppercase tracking-wider transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0 motion-reduce:transform-none motion-reduce:transition-none";
  const styles =
    variant === "primary"
      ? "border-transparent bg-primary text-primary-foreground hover:brightness-110"
      : "pixel-button-outline border-transparent text-primary hover:text-primary-foreground";

  const combined = `${base} ${styles} ${className}`;

  if ("href" in props && props.href) {
    const {
      variant: _v,
      href: _h,
      ...anchorRest
    } = rest as Omit<AsAnchor, "children" | "className">;
    return (
      <a className={combined} {...anchorRest} href={props.href}>
        <span className="relative z-10">{children}</span>
      </a>
    );
  }

  const { variant: _v, ...buttonRest } = rest as Omit<AsButton, "children" | "className">;
  return (
    <button className={combined} {...buttonRest}>
      <span className="relative z-10">{children}</span>
    </button>
  );
}
