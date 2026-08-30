import { Reveal } from "@/components/Reveal";
import { TechTag } from "@/components/TechTag";
import { profile, skillGroups } from "@/data/projects";

export function AboutSkills() {
  return (
    <section id="about" aria-labelledby="about-heading" className="mx-auto max-w-5xl px-4 py-16 sm:px-6">
      <Reveal>
        <p className="font-pixel text-xs uppercase tracking-[0.25em] text-primary">
          About
        </p>
        <h2 id="about-heading" className="mt-3 text-3xl font-bold tracking-tight">
          A bit about me
        </h2>
        <p className="mt-5 max-w-2xl leading-relaxed text-muted-foreground">
          {profile.longBio}
        </p>
      </Reveal>

      <div className="mt-12 grid gap-8 sm:grid-cols-3">
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
    </section>
  );
}
