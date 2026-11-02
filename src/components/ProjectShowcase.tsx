import type { CSSProperties } from "react";
import type { Project } from "@/data/projects";

export function ProjectShowcase({ project }: { project: Project }) {
  const device = project.device ?? "browser";
  const staticImage =
    project.showcaseImage ?? project.images.find((image) => image.startsWith("/showcases/"));
  const screen = project.showcaseScreen ?? project.images[0];
  const accentStyle = { "--showcase-accent": project.accent ?? "#4f46e5" } as CSSProperties;
  const mediaNote = project.mediaNote ?? `${project.title} project preview.`;

  if (staticImage) {
    return (
      <figure className="project-showcase project-showcase-static" style={accentStyle}>
        <img src={staticImage} alt={project.imageAlt} loading="lazy" decoding="async" />
        <figcaption className="sr-only">{mediaNote}</figcaption>
      </figure>
    );
  }

  return (
    <figure className={`project-showcase project-showcase-${device}`} style={accentStyle}>
      <div className="project-showcase-copy">
        <div className="project-showcase-brand">
          {project.logo ? <img src={project.logo} alt="" loading="lazy" decoding="async" /> : null}
          <div>
            <p className="project-showcase-category">{project.category ?? "Project"}</p>
            <p className="project-showcase-name">{project.title}</p>
          </div>
        </div>
        <p className="project-showcase-headline">{project.headline ?? project.description}</p>
      </div>

      <div className={`project-showcase-device project-showcase-device-${device}`}>
        {device === "phone" ? (
          <span className="project-showcase-notch" aria-hidden="true" />
        ) : (
          <div className="project-showcase-toolbar" aria-hidden="true">
            <span />
            <span />
            <span />
            <i>{project.title}</i>
          </div>
        )}
        <div className="project-showcase-screen">
          {screen ? (
            <img src={screen} alt={project.imageAlt} loading="lazy" decoding="async" />
          ) : (
            <div className="project-showcase-unavailable">
              {project.logo ? (
                <img src={project.logo} alt="" loading="lazy" decoding="async" />
              ) : null}
              <span>UI preview unavailable</span>
            </div>
          )}
        </div>
      </div>

      <figcaption className="sr-only">{mediaNote}</figcaption>
    </figure>
  );
}
