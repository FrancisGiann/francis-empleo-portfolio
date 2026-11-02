import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowLeft, ArrowRight, ExternalLink } from "lucide-react";
import { ProjectShowcase } from "@/components/ProjectShowcase";
import { Reveal } from "@/components/Reveal";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteNav } from "@/components/SiteNav";
import { TechTag } from "@/components/TechTag";
import { getProject, profile, projects } from "@/data/projects";

export const Route = createFileRoute("/projects/$projectId")({
  loader: ({ params }) => {
    const project = getProject(params.projectId);
    if (!project) throw notFound();
    return { project };
  },
  head: ({ loaderData }) => {
    const project = loaderData?.project;
    const title = project ? `${project.title} — ${profile.name}` : `Project — ${profile.name}`;
    const description = project?.description ?? "Selected project by Francis Giann Empleo.";
    return {
      meta: [
        { title },
        { name: "description", content: description },
        { property: "og:title", content: title },
        { property: "og:description", content: description },
        { property: "og:type", content: "article" },
        { name: "twitter:card", content: "summary_large_image" },
      ],
    };
  },
  component: ProjectDetailPage,
});

function ProjectDetailPage() {
  const { project } = Route.useLoaderData();
  const projectIndex = projects.findIndex((item) => item.id === project.id);
  const previous = projects[(projectIndex - 1 + projects.length) % projects.length]!;
  const next = projects[(projectIndex + 1) % projects.length]!;
  const statusLabel =
    project.statusLabel ?? (project.status === "wip" ? "In progress" : "Completed");

  return (
    <div className="min-h-screen bg-background text-foreground">
      <SiteNav />
      <main className="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-16">
        <Reveal>
          <Link
            to="/projects"
            viewTransition={{ types: ["route"] }}
            className="inline-flex min-h-11 items-center gap-2 text-sm font-medium text-muted-foreground transition-colors hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            <ArrowLeft className="h-4 w-4" aria-hidden />
            <span className="normal-cta-label">Back to projects</span>
            <span className="retro-cta-label">Back to stage select</span>
          </Link>
        </Reveal>

        <article className="mt-8">
          <Reveal>
            <div className="grid gap-6 border-b border-border pb-7 md:grid-cols-[minmax(0,1fr)_auto] md:items-end">
              <div>
                <p className="font-pixel text-[11px] uppercase tracking-[0.22em] text-primary">
                  <span className="normal-eyebrow">{project.category ?? "Project"}</span>
                  <span className="retro-eyebrow">
                    SELECTED STAGE // {String(projectIndex + 1).padStart(2, "0")}
                  </span>
                </p>
                <h1 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">
                  {project.title}
                </h1>
                <p className="mt-3 max-w-3xl text-base leading-relaxed text-muted-foreground sm:text-lg">
                  {project.description}
                </p>
              </div>
              <p className="w-fit border border-border bg-muted/50 px-3 py-2 text-sm font-medium text-muted-foreground">
                {statusLabel}
              </p>
            </div>
          </Reveal>

          <Reveal delay={80}>
            <div className="mt-8">
              <ProjectShowcase project={project} />
              {project.mediaNote ? (
                <p className="mt-3 text-xs leading-relaxed text-muted-foreground">
                  {project.mediaNote}
                </p>
              ) : null}
            </div>
          </Reveal>

          <Reveal delay={120}>
            <section className="mt-8 flex flex-col gap-4 border-y border-border py-6 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h2 className="text-sm font-semibold">Built with</h2>
                <div className="mt-3 flex flex-wrap gap-2">
                  {project.tech.map((technology) => (
                    <TechTag key={technology} label={technology} />
                  ))}
                </div>
              </div>
              <div className="flex flex-wrap gap-3">
                {project.external?.demo ? (
                  <a
                    href={project.external.demo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex min-h-11 items-center gap-2 bg-primary px-4 text-sm font-medium text-primary-foreground transition-colors hover:brightness-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                  >
                    Live website <ExternalLink className="h-4 w-4" aria-hidden />
                  </a>
                ) : null}
                {project.external?.repo ? (
                  <a
                    href={project.external.repo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex min-h-11 items-center gap-2 border border-border px-4 text-sm font-medium transition-colors hover:border-primary/50 hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                  >
                    GitHub repository <ExternalLink className="h-4 w-4" aria-hidden />
                  </a>
                ) : null}
              </div>
            </section>
          </Reveal>
        </article>

        <nav
          className="mt-10 grid grid-cols-[1fr_auto_1fr] items-center gap-3 border-t border-border pt-6"
          aria-label="Project navigation"
        >
          <Link
            to="/projects/$projectId"
            params={{ projectId: previous.id }}
            viewTransition={{ types: ["route"] }}
            className="inline-flex min-h-11 items-center gap-2 justify-self-start text-sm text-muted-foreground transition-colors hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            <ArrowLeft className="h-4 w-4" aria-hidden />
            <span className="hidden sm:inline">{previous.title}</span>
            <span className="sm:hidden">Previous</span>
          </Link>
          <Link
            to="/projects"
            viewTransition={{ types: ["route"] }}
            className="inline-flex min-h-11 items-center px-2 text-sm font-medium text-primary transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            Selected Projects
          </Link>
          <Link
            to="/projects/$projectId"
            params={{ projectId: next.id }}
            viewTransition={{ types: ["route"] }}
            className="inline-flex min-h-11 items-center gap-2 justify-self-end text-sm text-muted-foreground transition-colors hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            <span className="hidden sm:inline">{next.title}</span>
            <span className="sm:hidden">Next</span>
            <ArrowRight className="h-4 w-4" aria-hidden />
          </Link>
        </nav>
      </main>
      <SiteFooter />
    </div>
  );
}
