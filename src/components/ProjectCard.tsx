import { ArrowUpRight, ExternalLink, Images } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { TechTag } from "@/components/TechTag";
import { ProjectShowcase } from "@/components/ProjectShowcase";
import type { Project } from "@/data/projects";

const actionClass =
  "inline-flex min-h-10 items-center gap-2 px-3 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring";

export function ProjectCard({ project }: { project: Project }) {
  const statusLabel = project.statusLabel ?? (project.status === "wip" ? "WIP" : "Completed");
  return (
    <article className="project-card group flex h-full min-w-0 flex-col overflow-hidden border border-border bg-card shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-primary/40 hover:shadow-lg motion-reduce:transform-none motion-reduce:transition-none motion-reduce:hover:translate-y-0">
      <Link
        to="/projects/$projectId"
        params={{ projectId: project.id }}
        viewTransition={{ types: ["route"] }}
        aria-label={`View ${project.title} project details`}
        className="block overflow-hidden focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-ring"
      >
        <ProjectShowcase project={project} />
      </Link>

      <div className="flex flex-1 flex-col p-5 sm:p-6">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-muted-foreground">
            {project.category ?? "Project"}
          </p>
          <span
            className={`inline-flex min-h-7 items-center border px-2.5 text-[11px] font-medium ${
              project.status === "wip"
                ? "border-wip/50 bg-wip/15 text-foreground"
                : "border-border bg-muted/50 text-muted-foreground"
            }`}
          >
            {statusLabel}
          </span>
        </div>

        <h3 className="mt-3 text-xl font-semibold tracking-tight">
          <Link
            to="/projects/$projectId"
            params={{ projectId: project.id }}
            viewTransition={{ types: ["route"] }}
            className="rounded-sm transition-colors hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            {project.title}
          </Link>
        </h3>
        <p className="mt-2 max-w-prose text-sm leading-relaxed text-muted-foreground">
          {project.description}
        </p>
        <p className="mt-3 border-l-2 border-primary/50 pl-3 text-sm leading-relaxed text-foreground/85">
          <span className="font-semibold">My work:</span> {project.contribution}
        </p>

        <div className="mt-4 flex flex-wrap gap-1.5">
          {project.tech.slice(0, 4).map((technology) => (
            <TechTag key={technology} label={technology} />
          ))}
        </div>

        <div className="mt-auto flex flex-wrap items-center gap-1 pt-5">
          <Link
            to="/projects/$projectId"
            params={{ projectId: project.id }}
            hash="gallery"
            viewTransition={{ types: ["route"] }}
            aria-label={
              project.screenshots.length > 0
                ? `View ${project.screenshots.length} screenshots for ${project.title}`
                : `View gallery note for ${project.title}`
            }
            className={`${actionClass} pl-0 text-primary hover:text-foreground`}
          >
            <Images className="h-4 w-4" aria-hidden />
            <span>
              {project.screenshots.length === 0
                ? "Gallery note"
                : project.screenshots.length === 1
                  ? "View 1 screenshot"
                  : `View ${project.screenshots.length} screenshots`}
            </span>
          </Link>
          <Link
            to="/projects/$projectId"
            params={{ projectId: project.id }}
            viewTransition={{ types: ["route"] }}
            className={`${actionClass} pl-0 text-primary hover:text-foreground`}
          >
            <span className="normal-cta-label">Details</span>
            <span className="retro-cta-label">Open stage</span>
            <ArrowUpRight className="h-4 w-4" aria-hidden />
          </Link>
          {project.external?.demo ? (
            <a
              href={project.external.demo}
              target="_blank"
              rel="noopener noreferrer"
              className={`${actionClass} text-muted-foreground hover:text-primary`}
            >
              Live site <ExternalLink className="h-3.5 w-3.5" aria-hidden />
            </a>
          ) : null}
          {project.external?.repo ? (
            <a
              href={project.external.repo}
              target="_blank"
              rel="noopener noreferrer"
              className={`${actionClass} text-muted-foreground hover:text-primary`}
            >
              GitHub <ExternalLink className="h-3.5 w-3.5" aria-hidden />
            </a>
          ) : null}
        </div>
      </div>
    </article>
  );
}
