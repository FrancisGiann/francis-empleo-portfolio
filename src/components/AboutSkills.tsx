import { Reveal } from "@/components/Reveal";
import { TechTag } from "@/components/TechTag";
import { profile, skillGroups } from "@/data/projects";
import { useRetroMode } from "@/hooks/use-retro-mode";

export function AboutSkills() {
  const { enabled: retro } = useRetroMode();

  return (
    <section
      id="about"
      aria-labelledby="about-heading"
      className="mx-auto max-w-5xl px-4 py-16 sm:px-6"
    >
      <Reveal>
        <p
          className="font-pixel text-xs uppercase tracking-[0.25em] text-primary"
          aria-label={retro ? "Level 01, about" : "About"}
        >
          <span className="normal-eyebrow">About</span>
          <span className="retro-eyebrow">LEVEL 01 · ABOUT</span>
        </p>
        <h2 id="about-heading" className="mt-3 text-3xl font-bold tracking-tight">
          A bit about me
        </h2>
        <p className="mt-5 max-w-2xl leading-relaxed text-muted-foreground">{profile.longBio}</p>
      </Reveal>

      <div className="normal-skills mt-12 grid gap-8 sm:grid-cols-3">
        {skillGroups.map((group, i) => (
          <Reveal key={group.label} delay={i * 120}>
            <h3 className="font-pixel text-[11px] uppercase tracking-widest text-muted-foreground">
              {group.label}
            </h3>
            <div className="mt-3 flex flex-wrap gap-2">
              {group.skills.map((skill) => (
                <TechTag key={skill} label={skill} />
              ))}
            </div>
          </Reveal>
        ))}
      </div>

      <Reveal className="retro-inventory mt-12" delay={120}>
        <div
          className="pixel-step border border-primary/50 bg-card p-5"
          aria-label="Skill inventory"
        >
          <p className="font-pixel text-[11px] uppercase tracking-[0.2em] text-primary">
            Inventory // skills equipped
          </p>
          <ul className="mt-5 grid gap-3 sm:grid-cols-2" role="list">
            {skillGroups.flatMap((group) =>
              group.skills.map((skill) => (
                <li
                  key={skill}
                  className="flex items-center gap-3 border border-border bg-muted/40 px-3 py-3 text-sm"
                >
                  <span className="h-2 w-2 shrink-0 bg-primary" aria-hidden />
                  <span>{skill}</span>
                  <span className="ml-auto font-pixel text-[9px] uppercase tracking-widest text-muted-foreground">
                    {group.label}
                  </span>
                </li>
              )),
            )}
          </ul>
        </div>
      </Reveal>
    </section>
  );
}
