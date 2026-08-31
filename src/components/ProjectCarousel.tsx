import { useRef, useState } from "react";
import { Link } from "@tanstack/react-router";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Magnetic } from "@/components/Magnetic";
import { ProjectCard } from "@/components/ProjectCard";
import { Reveal } from "@/components/Reveal";
import { projects } from "@/data/projects";
import { useRetroMode } from "@/hooks/use-retro-mode";

export function ProjectCarousel() {
  const { enabled: retro } = useRetroMode();
  const [index, setIndex] = useState(0);
  const tabRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const count = projects.length;
  const project = projects[index]!;

  const prev = () => setIndex((i) => (i - 1 + count) % count);
  const next = () => setIndex((i) => (i + 1) % count);
  const selectProject = (nextIndex: number, moveFocus = false) => {
    setIndex(nextIndex);
    if (moveFocus) tabRefs.current[nextIndex]?.focus();
  };

  const handleTabKeyDown = (event: React.KeyboardEvent<HTMLButtonElement>, tabIndex: number) => {
    let nextIndex: number | null = null;
    if (event.key === "ArrowRight" || event.key === "ArrowDown") {
      nextIndex = (tabIndex + 1) % count;
    } else if (event.key === "ArrowLeft" || event.key === "ArrowUp") {
      nextIndex = (tabIndex - 1 + count) % count;
    } else if (event.key === "Home") {
      nextIndex = 0;
    } else if (event.key === "End") {
      nextIndex = count - 1;
    }

    if (nextIndex === null) return;
    event.preventDefault();
    selectProject(nextIndex, true);
  };

  const panelId = "project-panel";

  return (
    <section
      id="projects"
      aria-labelledby="projects-heading"
      className="mx-auto max-w-6xl px-4 py-16 sm:px-6"
    >
      <Reveal>
        <p
          className="font-pixel text-xs uppercase tracking-[0.25em] text-primary"
          aria-label={retro ? "Level 02, select stage" : "Projects"}
        >
          <span className="normal-eyebrow">Projects</span>
          <span className="retro-eyebrow">LEVEL 02 · SELECT STAGE</span>
        </p>
        <div className="mt-3 flex flex-wrap items-end justify-between gap-4">
          <h2 id="projects-heading" className="text-3xl font-bold tracking-tight">
            Selected work
          </h2>
          <Link
            to="/projects"
            viewTransition={{ types: ["route"] }}
            aria-label="View all projects"
            className="nav-link text-sm font-medium text-primary focus-visible:outline-none"
          >
            <span className="normal-cta-label">View all projects →</span>
            <span className="retro-cta-label">Select stage →</span>
          </Link>
        </div>
      </Reveal>

      <Reveal delay={120}>
        <div className="mt-10">
          <div aria-live="polite" aria-atomic="true" className="sr-only">
            Showing project {index + 1} of {count}: {project.title}
          </div>
          <div
            id={panelId}
            role="tabpanel"
            tabIndex={0}
            aria-labelledby={`project-tab-${project.id}`}
            className="focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-4 focus-visible:ring-offset-background"
          >
            <ProjectCard project={project} />
          </div>
        </div>

        <div className="mt-10 flex flex-col items-center gap-6">
          <div className="flex items-center gap-4">
            <Magnetic>
              <button
                type="button"
                onClick={prev}
                aria-label="Previous project"
                aria-controls={panelId}
                className="pixel-step-sm flex h-11 w-11 items-center justify-center bg-muted text-foreground transition-all duration-200 hover:bg-primary hover:text-primary-foreground focus-visible:outline-none active:translate-y-0.5"
              >
                <ChevronLeft className="h-5 w-5" aria-hidden />
              </button>
            </Magnetic>
            <span className="font-pixel text-xs tracking-widest text-muted-foreground">
              {String(index + 1).padStart(2, "0")} / {String(count).padStart(2, "0")}
            </span>
            <Magnetic>
              <button
                type="button"
                onClick={next}
                aria-label="Next project"
                aria-controls={panelId}
                className="pixel-step-sm flex h-11 w-11 items-center justify-center bg-muted text-foreground transition-all duration-200 hover:bg-primary hover:text-primary-foreground focus-visible:outline-none active:translate-y-0.5"
              >
                <ChevronRight className="h-5 w-5" aria-hidden />
              </button>
            </Magnetic>
          </div>

          <div className="flex items-center gap-2.5" role="tablist" aria-label="Choose project">
            {projects.map((p, i) => (
              <button
                key={p.id}
                type="button"
                ref={(element) => {
                  tabRefs.current[i] = element;
                }}
                id={`project-tab-${p.id}`}
                role="tab"
                tabIndex={i === index ? 0 : -1}
                onClick={() => selectProject(i)}
                onKeyDown={(event) => handleTabKeyDown(event, i)}
                aria-selected={i === index}
                aria-controls={panelId}
                aria-label={`Go to project ${i + 1}: ${p.title}`}
                className="project-tab group flex h-9 w-9 items-center justify-center transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
              >
                <span
                  aria-hidden
                  className={`h-2.5 w-2.5 transition-all duration-300 ${
                    i === index
                      ? "scale-110 bg-primary"
                      : "bg-muted-foreground/30 group-hover:bg-muted-foreground/60"
                  }`}
                />
              </button>
            ))}
          </div>
        </div>
      </Reveal>
    </section>
  );
}
