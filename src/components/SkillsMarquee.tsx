import { skillGroups } from "@/data/projects";

const skills = skillGroups.flatMap((g) => g.skills);

function Track({ hidden = false }: { hidden?: boolean }) {
  return (
    <div aria-hidden={hidden} className="flex w-max shrink-0 items-center">
      {skills.map((skill, i) => (
        <span key={`${skill}-${i}`} className="flex items-center">
          <span className="font-pixel text-xs uppercase tracking-[0.2em] text-muted-foreground transition-colors duration-200 hover:text-primary">
            {skill}
          </span>
          <span className="mx-6 inline-block h-2 w-2 bg-primary/40" />
        </span>
      ))}
    </div>
  );
}

/**
 * Infinite skills ticker between sections. Pure CSS loop, pauses on hover.
 */
export function SkillsMarquee() {
  return (
    <div className="marquee -rotate-[0.5deg] overflow-hidden border-y border-dashed border-border bg-card/50 py-4">
      <p className="sr-only">Skills: {skills.join(", ")}</p>
      <div className="marquee-track flex w-max" aria-hidden>
        <Track />
        <Track hidden />
      </div>
    </div>
  );
}
