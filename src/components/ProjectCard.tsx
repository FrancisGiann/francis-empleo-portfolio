import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { PixelButton } from "@/components/PixelButton";
import { TechTag } from "@/components/TechTag";
import type { Project } from "@/data/projects";

interface ProjectCardProps {
  project: Project;
  reversed?: boolean;
}

export function ProjectCard({ project, reversed = false }: ProjectCardProps) {
  const [photoIndex, setPhotoIndex] = useState(0);
  const photoCount = project.images.length;

  const goPhoto = (dir: 1 | -1) => {
    if (photoCount < 2) return;
    setPhotoIndex((i) => (i + dir + photoCount) % photoCount);
  };

  return (
    <article
      aria-labelledby={`project-title-${project.id}`}
      className="project-card grid items-center gap-8 md:grid-cols-[minmax(0,1.65fr)_minmax(260px,0.85fr)] md:gap-12"
    >
      <div className={reversed ? "md:order-2" : ""}>
        <div className="project-media">
          <div className="pixel-step project-media-frame group relative overflow-hidden border border-border bg-card">
            {project.status === "wip" && (
              <span className="absolute left-3 top-3 z-10 flex items-center gap-1.5 bg-wip px-2 py-1 font-pixel text-[10px] uppercase tracking-widest text-wip-foreground">
                <span
                  className="pixel-cursor inline-block h-1.5 w-1.5 bg-wip-foreground"
                  aria-hidden
                />
                WIP
              </span>
            )}
            {/* Cross-fading photo stack */}
            {project.images.map((src, i) => (
              <img
                key={src}
                src={src}
                alt={i === photoIndex ? project.imageAlt : ""}
                aria-hidden={i !== photoIndex}
                width={1280}
                height={800}
                loading="lazy"
                className={`project-photo aspect-[8/5] w-full object-cover transition-[opacity,transform] duration-500 ease-out group-hover:scale-[1.03] ${
                  i === photoIndex ? "opacity-100" : "absolute inset-0 opacity-0"
                }`}
              />
            ))}

            {photoCount > 1 && (
              <>
                {/* Prev / next photo arrows, visible on hover, touch, and keyboard focus */}
                <button
                  type="button"
                  onClick={() => goPhoto(-1)}
                  aria-label="Previous photo"
                  className="project-photo-control absolute left-2 top-1/2 z-10 flex h-11 w-11 -translate-y-1/2 items-center justify-center border border-border bg-background/80 text-foreground opacity-0 backdrop-blur-sm transition-all duration-200 hover:bg-primary hover:text-primary-foreground focus-visible:opacity-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background group-hover:opacity-100"
                >
                  <ChevronLeft className="h-5 w-5" aria-hidden />
                </button>
                <button
                  type="button"
                  onClick={() => goPhoto(1)}
                  aria-label="Next photo"
                  className="project-photo-control absolute right-2 top-1/2 z-10 flex h-11 w-11 -translate-y-1/2 items-center justify-center border border-border bg-background/80 text-foreground opacity-0 backdrop-blur-sm transition-all duration-200 hover:bg-primary hover:text-primary-foreground focus-visible:opacity-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background group-hover:opacity-100"
                >
                  <ChevronRight className="h-5 w-5" aria-hidden />
                </button>

                {/* Pixel photo dots with a larger touch target */}
                <div
                  className="absolute bottom-1 left-1/2 z-10 flex -translate-x-1/2 gap-1"
                  role="group"
                  aria-label="Choose project photo"
                >
                  {project.images.map((_, i) => (
                    <button
                      key={i}
                      type="button"
                      onClick={() => setPhotoIndex(i)}
                      aria-label={`Photo ${i + 1} of ${photoCount}`}
                      aria-pressed={i === photoIndex}
                      className="photo-dot flex h-9 w-9 items-center justify-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                    >
                      <span
                        aria-hidden
                        className={`h-2.5 w-2.5 transition-colors duration-200 ${
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
        <div className="mt-6">
          {project.status === "wip" ? (
            <span className="pixel-step inline-flex cursor-not-allowed items-center gap-2 bg-muted px-5 py-2.5 font-pixel text-xs uppercase tracking-wider text-muted-foreground">
              In Progress
            </span>
          ) : (
            <PixelButton href={project.link} target="_blank" rel="noopener noreferrer">
              View Project
            </PixelButton>
          )}
        </div>
      </div>
    </article>
  );
}
