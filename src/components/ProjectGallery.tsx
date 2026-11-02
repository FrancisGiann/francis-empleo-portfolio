import { useCallback, useState } from "react";
import { Expand, Images } from "lucide-react";
import { ImageLightbox } from "@/components/ImageLightbox";
import type { Project } from "@/data/projects";

export function ProjectGallery({ project }: { project: Project }) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const closeViewer = useCallback(() => setActiveIndex(null), []);
  const screenCount = project.screenshots.length;
  const previewAspect = project.device === "phone" ? "aspect-[3/4]" : "aspect-[4/3]";

  return (
    <section
      id="gallery"
      aria-labelledby="project-gallery-heading"
      className="mt-10 scroll-mt-24 border-t border-border pt-8"
    >
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <p className="font-pixel text-[11px] uppercase tracking-[0.2em] text-primary">Screens</p>
          <h2 id="project-gallery-heading" className="mt-2 text-2xl font-semibold tracking-tight">
            Screen gallery
          </h2>
        </div>
        {screenCount > 0 ? (
          <p className="inline-flex items-center gap-2 text-sm text-muted-foreground">
            <Images className="h-4 w-4" aria-hidden />
            {screenCount} {screenCount === 1 ? "screen" : "screens"}
          </p>
        ) : null}
      </div>

      {screenCount > 0 ? (
        <>
          <ul className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {project.screenshots.map((screenshot, index) => (
              <li key={screenshot.src}>
                <figure className="h-full overflow-hidden border border-border bg-card">
                  <button
                    type="button"
                    onClick={() => setActiveIndex(index)}
                    aria-label={`Open screenshot ${index + 1} of ${screenCount}: ${screenshot.caption}`}
                    className="group block w-full overflow-hidden bg-muted/30 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-ring"
                  >
                    <span
                      className={`relative flex ${previewAspect} items-center justify-center p-3 sm:p-4`}
                    >
                      <img
                        src={screenshot.src}
                        alt={screenshot.alt}
                        loading="lazy"
                        decoding="async"
                        className="max-h-full max-w-full object-contain transition-transform duration-300 group-hover:scale-[1.015] motion-reduce:transition-none motion-reduce:group-hover:scale-100"
                      />
                      <span className="absolute bottom-2 right-2 inline-flex h-9 w-9 items-center justify-center border border-border bg-background/90 text-foreground shadow-sm">
                        <Expand className="h-4 w-4" aria-hidden />
                      </span>
                    </span>
                  </button>
                  <figcaption className="min-h-20 border-t border-border px-4 py-3 text-sm leading-relaxed text-muted-foreground">
                    {screenshot.caption}
                  </figcaption>
                </figure>
              </li>
            ))}
          </ul>
          {project.coverageNote ? (
            <p className="mt-4 border-l-2 border-border pl-3 text-sm leading-relaxed text-muted-foreground">
              {project.coverageNote}
            </p>
          ) : null}
        </>
      ) : (
        <p className="mt-4 max-w-3xl border-l-2 border-border pl-3 text-sm leading-relaxed text-muted-foreground">
          {project.coverageNote ??
            "No verified application screens are available for this project yet."}
        </p>
      )}

      {activeIndex !== null ? (
        <ImageLightbox
          screenshots={project.screenshots}
          initialIndex={activeIndex}
          onClose={closeViewer}
        />
      ) : null}
    </section>
  );
}
