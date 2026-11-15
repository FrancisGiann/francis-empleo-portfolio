import { Reveal } from "@/components/Reveal";
import { TechTag } from "@/components/TechTag";
import { profile, skillGroups } from "@/data/projects";
import { SECTION_SHELL_CLASS, SectionHeading } from "@/components/SectionHeading";

export function AboutSkills() {
  return (
    <section
      id="about"
      aria-labelledby="about-heading"
      className={`portfolio-module portfolio-about ${SECTION_SHELL_CLASS}`}
    >
      <Reveal>
        <SectionHeading
          id="about-heading"
          eyebrow="About"
          arcadeEyebrow="LEVEL 01 · ABOUT"
          title="A bit about me"
          arcadeTitle="Player profile"
        />
        <p className="mt-5 max-w-2xl leading-relaxed text-muted-foreground">{profile.longBio}</p>
      </Reveal>

      <div className="portfolio-inventory-heading mt-10 flex flex-wrap items-end justify-between gap-3">
        <div>
          <p className="font-pixel text-[10px] uppercase tracking-[0.2em] text-primary">
            <span className="normal-mode-copy">Skills &amp; tools</span>
            <span className="arcade-mode-copy">Inventory</span>
          </p>
          <h3 className="mt-2 text-xl font-semibold tracking-tight">
            <span className="normal-mode-copy">What I work with</span>
            <span className="arcade-mode-copy">Skills equipped</span>
          </h3>
        </div>
        <p className="text-xs text-muted-foreground arcade-mode-copy">
          {skillGroups.length} skill groups
        </p>
      </div>

      <div className="portfolio-skill-grid portfolio-skill-panel mt-5 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {skillGroups.map((group, index) => (
          <Reveal key={group.label} delay={index * 80} className="portfolio-skill-grid-item h-full">
            <article className="portfolio-skill-group pixel-step-sm h-full border border-border bg-card p-5">
              <h4 className="font-pixel text-[10px] uppercase tracking-wider text-foreground">
                {group.label}
              </h4>
              <div className="mt-4 flex flex-wrap gap-2">
                {group.skills.map((skill) => (
                  <TechTag key={skill} label={skill} />
                ))}
              </div>
            </article>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
