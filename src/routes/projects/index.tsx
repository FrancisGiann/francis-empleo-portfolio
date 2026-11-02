import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, ExternalLink } from "lucide-react";
import { SiteNav } from "@/components/SiteNav";
import { SiteFooter } from "@/components/SiteFooter";
import { ProjectCard } from "@/components/ProjectCard";
import { projects, profile } from "@/data/projects";
import { GITHUB_REPOSITORIES_URL } from "@/components/SelectedProjects";

export const Route = createFileRoute("/projects/")({
  head: () => ({
    meta: [
      { title: `Selected Projects | ${profile.name}` },
      {
        name: "description",
        content:
          "A selection of web, Android, and developer-tool projects by Francis Giann Empleo.",
      },
      { property: "og:title", content: `Selected Projects | ${profile.name}` },
      {
        property: "og:description",
        content:
          "A selection of web, Android, and developer-tool projects by Francis Giann Empleo.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: ProjectsPage,
});

function ProjectsPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <SiteNav />
      <main className="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-16">
        <Link
          to="/"
          viewTransition={{ types: ["route"] }}
          className="inline-flex min-h-11 items-center gap-2 text-sm font-medium text-muted-foreground transition-colors hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        >
          <ArrowLeft className="h-4 w-4" aria-hidden />
          <span className="normal-cta-label">Home</span>
          <span className="retro-cta-label">Back to map</span>
        </Link>

        <header className="mt-8 flex flex-col gap-6 border-b border-border pb-7 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="font-pixel text-[11px] uppercase tracking-[0.22em] text-primary">
              <span className="normal-eyebrow">Projects</span>
              <span className="retro-eyebrow">LEVEL 02 · SELECT STAGE</span>
            </p>
            <h1 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">
              Selected Projects
            </h1>
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
        </header>

        <div className="mt-8 grid grid-cols-1 gap-5 md:grid-cols-2 md:gap-6">
          {projects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
