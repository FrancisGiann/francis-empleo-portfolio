import type { ReactNode } from "react";

export const SECTION_SHELL_CLASS = "mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:py-20";

interface SectionHeadingProps {
  id: string;
  eyebrow: string;
  arcadeEyebrow?: string;
  title: string;
  arcadeTitle?: string;
  level?: "h1" | "h2";
  action?: ReactNode;
}

export function SectionHeading({
  id,
  eyebrow,
  arcadeEyebrow,
  title,
  arcadeTitle,
  level = "h2",
  action,
}: SectionHeadingProps) {
  const Heading = level;

  return (
    <>
      <p
        className="font-pixel text-xs uppercase tracking-[0.25em] text-primary"
      >
        <span className="normal-mode-copy">{eyebrow}</span>
        <span className="arcade-mode-copy">{arcadeEyebrow ?? eyebrow}</span>
      </p>
      <div className={action ? "mt-3 flex flex-wrap items-end justify-between gap-4" : "mt-3"}>
        <Heading
          id={id}
          className={`text-3xl font-bold tracking-tight ${level === "h1" ? "sm:text-4xl" : ""}`}
        >
          <span className="normal-mode-copy">{title}</span>
          <span className="arcade-mode-copy">{arcadeTitle ?? title}</span>
        </Heading>
        {action}
      </div>
    </>
  );
}
