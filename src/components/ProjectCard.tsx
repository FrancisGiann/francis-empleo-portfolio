import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import { ChevronLeft, ChevronRight, ExternalLink } from "lucide-react";
import { TechTag } from "@/components/TechTag";
import type { Project } from "@/data/projects";

interface ProjectCardProps {
  project: Project;
  reversed?: boolean;
}

const buttonClass =
  "pixel-step inline-flex min-h-11 items-center gap-2 px-5 py-2.5 font-pixel text-xs uppercase tracking-wider transition-all duration-200 hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background";

export function ProjectCard({ project, reversed = false }: ProjectCardProps) {
  const [photoIndex, setPhotoIndex] = useState(0);
  const [engaged, setEngaged] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(true);
  const photoCount = project.images.length;

  const goPhoto = (dir: 1 | -1) => {
    if (photoCount < 2) return;
    setPhotoIndex((i) => (i + dir + photoCount) % photoCount);
  };

  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReducedMotion(query.matches);
    update();
    query.addEventListener("change", update);
    return () => query.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    if (photoCount < 2 || reducedMotion || !engaged || document.hidden) return;

    const interval = window.setInterval(() => {
      setPhotoIndex((i) => (i + 1) % photoCount);
    }, 6500);

    return () => window.clearInterval(interval);
  }, [engaged, photoCount, reducedMotion]);

  useEffect(() => {
    const onVisibilityChange = () => {
      if (document.hidden) setEngaged(false);
    };
    document.addEventListener("visibilitychange", onVisibilityChange);
    return () => document.removeEventListener("visibilitychange", onVisibilityChange);
  }, []);

  const handleBlur = (event: React.FocusEvent<HTMLDivElement>) => {
    if (!event.currentTarget.contains(event.relatedTarget as Node | null)) setEngaged(false);
  };

  return (
    <article
      aria-labelledby={`project-title-${project.id}`}
      className="project-card grid items-center gap-8 md:grid-cols-[minmax(0,1.65fr)_minmax(260px,0.85fr)] md:gap-12"
    >
      <div className={reversed ? "md:order-2" : ""}>
        <div className="project-media">
          <div
            className="pixel-step project-media-frame group relative overflow-hidden border border-border bg-card"
            onPointerEnter={() => setEngaged(true)}
            onPointerLeave={() => setEngaged(false)}
            onFocusCapture={() => setEngaged(true)}
            onBlurCapture={handleBlur}
          >
            {project.status === "wip" && (
              <span className="absolute left-3 top-3 z-10 flex items-center gap-1.5 bg-wip px-2 py-1 font-pixel text-[10px] uppercase tracking-widest text-wip-foreground">
                <span
                  className="pixel-cursor inline-block h-1.5 w-1.5 bg-wip-foreground"
                  aria-hidden
                />
                WIP
              </span>
            )}

            <Link
              to="/projects/$projectId"
              params={{ projectId: project.id }}
              viewTransition={{ types: ["route"] }}
              aria-label={`Open case study: ${project.title}`}
              className="relative block aspect-[8/5] min-h-[180px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-ring"
            >
              {project.images.map((src, i) => (
                <img
                  key={src}
                  src={src}
                  alt={i === photoIndex ? project.imageAlt : ""}
                  aria-hidden={i !== photoIndex}
                  width={1280}
                  height={800}
                  loading="lazy"
                  className={`absolute inset-0 h-full w-full object-cover transition-[opacity,transform] duration-500 ease-out motion-reduce:transition-none group-hover:scale-[1.03] ${
                    i === photoIndex ? "opacity-100" : "pointer-events-none opacity-0"
                  }`}
                />
              ))}
              <span className="project-start-affordance pointer-events-none absolute bottom-3 left-3 z-[2] border border-white/50 bg-black/55 px-2 py-1 font-pixel text-[9px] uppercase tracking-[0.16em] text-white opacity-80 backdrop-blur-sm transition-opacity group-hover:opacity-100 group-focus-within:opacity-100">
                <span aria-hidden>▸ </span>
                <span className="normal-start-label">Press start</span>
                <span className="retro-start-label">Enter stage</span>
              </span>
            </Link>

            {photoCount > 1 && (
              <>
                <button
                  type="button"
                  onClick={() => goPhoto(-1)}
                  aria-label="Previous project screenshot"
                  className="project-photo-control absolute left-2 top-1/2 z-10 flex h-11 w-11 -translate-y-1/2 items-center justify-center border border-border bg-background/80 text-foreground opacity-0 backdrop-blur-sm transition-all duration-200 hover:bg-primary hover:text-primary-foreground focus-visible:opacity-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background group-hover:opacity-100"
                >
                  <ChevronLeft className="h-5 w-5" aria-hidden />
                </button>
                <button
                  type="button"
                  onClick={() => goPhoto(1)}
                  aria-label="Next project screenshot"
                  className="project-photo-control absolute right-2 top-1/2 z-10 flex h-11 w-11 -translate-y-1/2 items-center justify-center border border-border bg-background/80 text-foreground opacity-0 backdrop-blur-sm transition-all duration-200 hover:bg-primary hover:text-primary-foreground focus-visible:opacity-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background group-hover:opacity-100"
                >
                  <ChevronRight className="h-5 w-5" aria-hidden />
                </button>
                <div
                  className="absolute bottom-1 left-1/2 z-10 flex -translate-x-1/2 gap-1"
                  role="group"
                  aria-label="Choose project screenshot"
                >
                  {project.images.map((_, i) => (
                    <button
                      key={i}
                      type="button"
                      onClick={() => setPhotoIndex(i)}
                      aria-label={`Screenshot ${i + 1} of ${photoCount}`}
                      aria-pressed={i === photoIndex}
                      className="photo-dot flex h-9 w-9 items-center justify-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                    >
                      <span
                        aria-hidden
                        className={`h-2.5 w-2.5 transition-colors duration-200 motion-reduce:transition-none ${
                          i === photoIndex
                            ? "bg-primary"
                            : "bg-background/70 hover:bg-foreground/50"
                        }`}
                      />
                    </button>
                  ))}
                </div>
              </>
            )}
          </div>
        </div>
      </div>

      <div className={reversed ? "md:order-1" : ""}>
        <h3 id={`project-title-${project.id}`} className="text-2xl font-bold tracking-tight">
          {project.title}
        </h3>
        <p className="mt-3 leading-relaxed text-muted-foreground">{project.description}</p>
        <div className="mt-4 flex flex-wrap gap-2">
          {project.tech.map((t) => (
            <TechTag key={t} label={t} />
          ))}
        </div>
        <div className="mt-6 flex flex-wrap items-center gap-3">
          <Link
            to="/projects/$projectId"
            params={{ projectId: project.id }}
            viewTransition={{ types: ["route"] }}
            className={`${buttonClass} bg-primary text-primary-foreground hover:brightness-110`}
          >
            <span className="normal-cta-label">Open case study</span>
            <span className="retro-cta-label">Enter stage</span>
          </Link>
          {project.external?.repo && (
            <a
              href={project.external.repo}
              target="_blank"
              rel="noopener noreferrer"
              className={`${buttonClass} border border-border bg-transparent text-foreground hover:border-primary hover:text-primary`}
            >
              Repo <ExternalLink className="h-3.5 w-3.5" aria-hidden />
            </a>
          )}
          {project.external?.demo && (
            <a
              href={project.external.demo}
              target="_blank"
              rel="noopener noreferrer"
              className={`${buttonClass} border border-border bg-transparent text-foreground hover:border-primary hover:text-primary`}
            >
              Live demo <ExternalLink className="h-3.5 w-3.5" aria-hidden />
            </a>
          )}
        </div>
      </div>
    </article>
  );
}
