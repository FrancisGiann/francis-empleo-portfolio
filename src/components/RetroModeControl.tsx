import { useKonami } from "@/hooks/use-konami";

const KONAMI_LABEL = "↑ ↑ ↓ ↓ ← → ← → B A";

export function RetroModeControl() {
  const { enabled, toggle } = useKonami();

  return (
    <div className="arcade-mode-control mt-4 flex flex-wrap items-center gap-x-3 gap-y-2">
      <button
        type="button"
        onClick={() => toggle("direct")}
        aria-pressed={enabled}
        aria-label={enabled ? "Exit arcade mode" : "Enter arcade mode"}
        className="arcade-toggle pixel-step-sm inline-flex min-h-10 items-center border border-primary/50 bg-card/85 px-3 py-2 font-pixel text-[9px] uppercase tracking-wider text-foreground transition-colors hover:border-primary hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
      >
        {enabled ? "Exit Arcade" : "Enter Arcade"}
      </button>
      {!enabled ? (
        <p className="arcade-konami-hint text-[10px] text-muted-foreground">
          Secret code: <span className="font-pixel text-[9px] text-primary">{KONAMI_LABEL}</span>
        </p>
      ) : null}
    </div>
  );
}
