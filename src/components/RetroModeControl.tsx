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
        className="pixel-step-sm inline-flex max-w-full items-center gap-3 border border-primary/50 bg-muted px-3 py-2 font-pixel text-[10px] uppercase tracking-wider text-foreground transition-all duration-200 hover:-translate-y-0.5 hover:border-primary hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
      >
        <span className="flex items-center gap-2 whitespace-nowrap">
          <span
            aria-hidden
            className={`h-2 w-2 ${enabled ? "bg-primary" : "bg-muted-foreground/50"}`}
          />
          8-BIT MODE
        </span>
        <span
          aria-hidden
          className="hidden whitespace-nowrap text-[9px] text-muted-foreground sm:inline"
        >
          {KONAMI_LABEL}
        </span>
      </button>
      <p className="mt-2 max-w-sm text-xs text-muted-foreground">
        Tip: tap the mode or enter the Konami code to switch timelines.
      </p>
    </div>
  );
}
