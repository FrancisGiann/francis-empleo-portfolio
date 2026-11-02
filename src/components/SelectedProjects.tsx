import { ArrowUpRight, ExternalLink } from "lucide-react";
import { Reveal } from "@/components/Reveal";
import { ProjectCard } from "@/components/ProjectCard";
import { projects } from "@/data/projects";

export const GITHUB_REPOSITORIES_URL = "https://github.com/FrancisGiann?tab=repositories";

export function SelectedProjects() {
  return (
    <section
      id="projects"
      aria-labelledby="selected-projects-heading"
      className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20"
    >
      <Reveal>
        <div className="flex flex-col gap-6 border-b border-border pb-6 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="font-pixel text-[11px] uppercase tracking-[0.22em] text-primary">
              <span className="normal-eyebrow">Projects</span>
              <span className="retro-eyebrow">LEVEL 02 · SELECT STAGE</span>
            </p>
            <h2
              id="selected-projects-heading"
              className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl"
            >
              Selected Projects
            </h2>
            <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted-foreground sm:text-base">
              A few websites and apps I’ve built. There’s more on GitHub.
            </p>
          </div>
          <a
            href={GITHUB_REPOSITORIES_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-h-11 shrink-0 items-center justify-center gap-2 border border-border bg-card px-4 text-sm font-medium transition-colors hover:border-primary/50 hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            View all repositories on GitHub
            <ExternalLink className="h-4 w-4" aria-hidden />
          </a>
        </div>
      </Reveal>

      <div className="mt-8 grid grid-cols-1 gap-5 md:grid-cols-2 md:gap-6">
        {projects.map((project, index) => (
          <Reveal key={project.id} delay={(index % 2) * 80} className="h-full">
            <ProjectCard project={project} />
          </Reveal>
        ))}
      </div>

      <div className="mt-8 flex justify-end">
        <a
          href={GITHUB_REPOSITORIES_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex min-h-11 items-center gap-2 text-sm font-medium text-primary transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        >
          More on GitHub <ArrowUpRight className="h-4 w-4" aria-hidden />
        </a>
      </div>
    </section>
  );
}
