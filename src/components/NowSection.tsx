import { Reveal } from "@/components/Reveal";
import { nowItems } from "@/data/projects";
import { useRetroMode } from "@/hooks/use-retro-mode";

/**
 * Compact "Now" section — what Francis is currently learning, building, reading.
 */
export function NowSection() {
  const { enabled: retro } = useRetroMode();

  return (
    <section aria-labelledby="now-heading" className="mx-auto max-w-5xl px-4 py-16 sm:px-6">
      <Reveal>
        <p
          className="font-pixel text-xs uppercase tracking-[0.25em] text-primary"
          aria-label={retro ? "Level 03, now" : "Now"}
        >
          <span className="normal-eyebrow">Now</span>
          <span className="retro-eyebrow">LEVEL 03 · NOW</span>
        </p>
        <h2 id="now-heading" className="mt-3 text-3xl font-bold tracking-tight">
          What I'm up to
        </h2>
      </Reveal>

      <div className="mt-10 grid gap-4 sm:grid-cols-3">
        {nowItems.map((item, i) => (
          <Reveal key={item.label} delay={i * 100}>
            <div className="pixel-step-sm h-full border border-border bg-card p-5 transition-transform duration-200 hover:-translate-y-1">
              <p className="flex items-center gap-2 font-pixel text-[10px] uppercase tracking-[0.2em] text-primary">
                <span className="inline-block h-2 w-2 bg-primary" aria-hidden />
                {item.label}
              </p>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{item.text}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
