import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";
import { SiteNav } from "@/components/SiteNav";
import { SiteFooter } from "@/components/SiteFooter";
import { ProjectCard } from "@/components/ProjectCard";
import { Reveal } from "@/components/Reveal";
import { liveProjects, profile, wipProjects } from "@/data/projects";

export const Route = createFileRoute("/projects")({
  head: () => ({
    meta: [
      { title: `All Projects — ${profile.name}` },
      {
        name: "description",
        content:
          "All projects by Francis Giann Empleo — web applications, dashboards, and interactive experiences built with React, TypeScript, and Node.js.",
      },
      { property: "og:title", content: `All Projects — ${profile.name}` },
      {
        property: "og:description",
        content:
          "All projects by Francis Giann Empleo — web applications, dashboards, and interactive experiences built with React, TypeScript, and Node.js.",
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
      <main className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <Reveal>
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground transition-colors hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            <ArrowLeft className="h-4 w-4" aria-hidden />
            Back home
          </Link>
          <p className="mt-8 font-pixel text-xs uppercase tracking-[0.25em] text-primary">
            Projects
          </p>
          <h1 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">All projects</h1>
          <p className="mt-3 max-w-xl text-muted-foreground">
            Everything I've shipped or am actively building — from client work to side projects.
          </p>
        </Reveal>

        <div className="mt-14 space-y-20">
          {liveProjects.map((project, i) => (
            <Reveal key={project.id}>
              <ProjectCard project={project} reversed={i % 2 === 1} />
            </Reveal>
          ))}
        </div>

        {wipProjects.length > 0 && (
          <div className="mt-24">
            <Reveal>
              <p className="font-pixel text-xs uppercase tracking-[0.25em] text-primary">
                In the lab
              </p>
              <h2 className="mt-3 text-2xl font-bold tracking-tight">Work in progress</h2>
              <p className="mt-2 max-w-xl text-muted-foreground">
                Things I'm actively building — rough around the edges, but real.
              </p>
            </Reveal>
            <div className="mt-12 space-y-20">
              {wipProjects.map((project, i) => (
                <Reveal key={project.id}>
                  <ProjectCard project={project} reversed={i % 2 === 1} />
                </Reveal>
              ))}
            </div>
          </div>
        )}
      </main>
      <SiteFooter />
    </div>
  );
}
