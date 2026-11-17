import { ExternalLink } from "lucide-react";
import { Reveal } from "@/components/Reveal";
import { ProjectCard } from "@/components/ProjectCard";
import { projects } from "@/data/projects";

export const GITHUB_REPOSITORIES_URL = "https://github.com/FrancisGiann?tab=repositories";

export function SelectedProjects() {
  return (
    <section
      id="projects"
      aria-labelledby="selected-projects-heading"
      className="portfolio-module portfolio-projects mx-auto max-w-6xl px-4 pt-10 pb-16 sm:px-6 sm:pt-12 sm:pb-20"
    >
      <Reveal>
        <div className="portfolio-projects-heading flex flex-col items-start gap-4 md:flex-row md:items-end md:justify-between md:gap-6">
          <div>
            <p className="arcade-mode-copy mb-3 font-pixel text-[11px] uppercase tracking-[0.22em] text-primary">
              LEVEL 02 · SELECT QUEST
            </p>
            <h2
              id="selected-projects-heading"
              className="text-3xl font-semibold tracking-tight sm:text-4xl"
            >
              <span className="normal-mode-copy">Projects</span>
              <span className="arcade-mode-copy">Select quest</span>
            </h2>
            <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted-foreground sm:text-base">
              Websites, Android apps, and other software projects.
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

      <div className="portfolio-project-grid mt-8 grid grid-cols-1 gap-5 md:grid-cols-2 md:gap-6">
        {projects.map((project, index) => (
          <Reveal key={project.id} delay={(index % 2) * 80} className="h-full">
            <ProjectCard project={project} />
          </Reveal>
        ))}
      </div>
    </section>
  );
}
