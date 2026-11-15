import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, ExternalLink } from "lucide-react";
import { SiteNav } from "@/components/SiteNav";
import { SiteFooter } from "@/components/SiteFooter";
import { ProjectCard } from "@/components/ProjectCard";
import { isAndroidProject, isLiveWebsite, projects, profile } from "@/data/projects";
import { GITHUB_REPOSITORIES_URL } from "@/components/SelectedProjects";

type ProjectFilter = "android" | "live";
type ProjectsSearch = { category?: ProjectFilter };

function validateProjectsSearch(search: Record<string, unknown>): ProjectsSearch {
  const category = search.category;
  return {
    category: category === "android" || category === "live" ? category : undefined,
  };
}

export const Route = createFileRoute("/projects/")({
  validateSearch: validateProjectsSearch,
  head: () => ({
    meta: [
      { title: `Projects | ${profile.name}` },
      {
        name: "description",
        content:
          "A selection of web, Android, and developer-tool projects by Francis Giann Empleo.",
      },
      { property: "og:title", content: `Projects | ${profile.name}` },
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
  const { category } = Route.useSearch();
  const visibleProjects = projects.filter((project) => {
    if (category === "android") return isAndroidProject(project);
    if (category === "live") return isLiveWebsite(project);
    return true;
  });

  return (
    <div className="portfolio-shell min-h-screen bg-background text-foreground">
      <SiteNav />
      <main className="portfolio-module portfolio-projects mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-16">
        <Link
          to="/"
          viewTransition={{ types: ["route"] }}
          className="inline-flex min-h-11 items-center gap-2 text-sm font-medium text-muted-foreground transition-colors hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        >
          <ArrowLeft className="h-4 w-4" aria-hidden />
          <span className="normal-mode-copy">Home</span>
          <span className="arcade-mode-copy">Back to map</span>
        </Link>

        <header className="portfolio-projects-heading mt-8 flex flex-col gap-6 pb-7 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="font-pixel text-[11px] uppercase tracking-[0.22em] text-primary">
              <span className="normal-mode-copy">Projects</span>
              <span className="arcade-mode-copy">LEVEL 02 · SELECT QUEST</span>
            </p>
            <h1 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">
              <span className="normal-mode-copy">Projects</span>
              <span className="arcade-mode-copy">Select quest</span>
            </h1>
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
        </header>

        <nav className="portfolio-project-filters mt-6 flex flex-wrap gap-2" aria-label="Filter projects">
          <Link
            to="/projects"
            search={{ category: undefined }}
            activeOptions={{ exact: true, includeSearch: true, explicitUndefined: true }}
            aria-current={category === undefined ? "page" : undefined}
            className="portfolio-project-filter pixel-step-sm"
          >
            All projects
          </Link>
          <Link
            to="/projects"
            search={{ category: "live" }}
            activeOptions={{ exact: true, includeSearch: true, explicitUndefined: true }}
            aria-current={category === "live" ? "page" : undefined}
            className="portfolio-project-filter pixel-step-sm"
          >
            Live websites
          </Link>
          <Link
            to="/projects"
            search={{ category: "android" }}
            activeOptions={{ exact: true, includeSearch: true, explicitUndefined: true }}
            aria-current={category === "android" ? "page" : undefined}
            className="portfolio-project-filter pixel-step-sm"
          >
            Android apps
          </Link>
        </nav>

        <p className="mt-4 text-sm text-muted-foreground" aria-live="polite">
          {category === "live"
            ? `Showing ${visibleProjects.length} live websites.`
            : category === "android"
              ? `Showing ${visibleProjects.length} Android projects, including prerelease work.`
              : `Showing all ${visibleProjects.length} projects.`}
        </p>

        <div className="portfolio-project-grid mt-8 grid grid-cols-1 gap-5 md:grid-cols-2 md:gap-6">
          {visibleProjects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
