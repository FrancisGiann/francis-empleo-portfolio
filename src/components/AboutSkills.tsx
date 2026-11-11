import { Reveal } from "@/components/Reveal";
import { TechTag } from "@/components/TechTag";
import { profile, skillGroups } from "@/data/projects";
import { MiniGame } from "@/components/MiniGame";
import { SECTION_SHELL_CLASS, SectionHeading } from "@/components/SectionHeading";

export function AboutSkills() {
  return (
    <section id="about" aria-labelledby="about-heading" className={SECTION_SHELL_CLASS}>
      <Reveal>
        <SectionHeading
          id="about-heading"
          eyebrow="About"
          retroEyebrow="LEVEL 01 · ABOUT"
          title="A bit about me"
        />
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
          <div className="mt-5 flex flex-wrap gap-2" role="list">
            {skillGroups.flatMap((group) =>
              group.skills.map((skill) => (
                <div
                  key={skill}
                  className="inline-flex items-center gap-1.5 border border-border bg-muted/40 px-2 py-1 text-xs"
                  role="listitem"
                >
                  <span className="h-1.5 w-1.5 shrink-0 bg-primary" aria-hidden />
                  <span className="font-medium">{skill}</span>
                </div>
              )),
            )}
          </div>
        </div>
      </Reveal>

      <MiniGame />
    </section>
  );
}
