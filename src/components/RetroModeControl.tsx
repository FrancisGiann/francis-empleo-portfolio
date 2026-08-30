import { useRetroMode } from "@/hooks/use-retro-mode";

const KONAMI_LABEL = "↑ ↑ ↓ ↓ ← → ← → B A";

export function RetroModeControl() {
  const { enabled, toggle } = useRetroMode();

  return (
    <div className="retro-mode-control mt-5 max-w-full">
      <button
        type="button"
        onClick={() => toggle("direct")}
        aria-pressed={enabled}
        aria-label={enabled ? "Disable 8-bit mode" : "Enable 8-bit mode"}
        className="pixel-step-sm inline-flex min-h-11 max-w-full items-center gap-3 border border-primary/50 bg-muted px-3 py-2 font-pixel text-[10px] uppercase tracking-wider text-foreground transition-all duration-200 hover:-translate-y-0.5 hover:border-primary hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background md:hidden"
      >
        <span className="flex items-center gap-2 whitespace-nowrap">
          <span
            aria-hidden
            className={`h-2 w-2 ${enabled ? "bg-primary" : "bg-muted-foreground/50"}`}
          />
          8-BIT MODE
        </span>
      </button>
      <p
        className="hidden max-w-md font-pixel text-[9px] uppercase tracking-[0.12em] text-muted-foreground md:block"
        aria-live="polite"
      >
        {enabled ? (
          <>
            8-BIT MODE ACTIVE <span className="text-primary">·</span> REPEAT SEQUENCE TO EXIT
          </>
        ) : (
          <>TIP: PRESS {KONAMI_LABEL} TO UNLOCK 8-BIT MODE</>
        )}
      </p>
      <p className="mt-2 text-xs text-muted-foreground md:hidden">
        {enabled ? "Tap again to return to the present." : "Tap to switch timelines."}
      </p>
    </div>
  );
}
