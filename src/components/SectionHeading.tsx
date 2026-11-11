import type { ReactNode } from "react";
import { useRetroMode } from "@/hooks/use-retro-mode";

export const SECTION_SHELL_CLASS = "mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:py-20";

interface SectionHeadingProps {
  id: string;
  eyebrow: string;
  retroEyebrow?: string;
  title: string;
  level?: "h1" | "h2";
  action?: ReactNode;
}

export function SectionHeading({
  id,
  eyebrow,
  retroEyebrow,
  title,
  level = "h2",
  action,
}: SectionHeadingProps) {
  const { enabled: retro } = useRetroMode();
  const Heading = level;

  return (
    <>
      <p
        className="font-pixel text-xs uppercase tracking-[0.25em] text-primary"
        aria-label={retro ? (retroEyebrow ?? eyebrow) : eyebrow}
      >
        {retroEyebrow ? (
          <>
            <span className="normal-eyebrow">{eyebrow}</span>
            <span className="retro-eyebrow">{retroEyebrow}</span>
          </>
        ) : (
          eyebrow
        )}
      </p>
      <div className={action ? "mt-3 flex flex-wrap items-end justify-between gap-4" : "mt-3"}>
        <Heading
          id={id}
          className={`text-3xl font-bold tracking-tight ${level === "h1" ? "sm:text-4xl" : ""}`}
        >
          {title}
        </Heading>
        {action}
      </div>
    </>
  );
}
