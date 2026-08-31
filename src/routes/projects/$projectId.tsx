import { useState } from "react";
import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowLeft, ArrowRight, ExternalLink, ChevronLeft, ChevronRight, Maximize2 } from "lucide-react";
import { ImageLightbox } from "@/components/ImageLightbox";
import { Reveal } from "@/components/Reveal";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteNav } from "@/components/SiteNav";
import { TechTag } from "@/components/TechTag";
import { useRetroMode } from "@/hooks/use-retro-mode";
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
    const description = project?.description ?? "Project case study by Francis Giann Empleo.";
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

const linkClass =
  "inline-flex min-h-11 items-center gap-2 text-sm font-medium text-primary transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring";
const buttonClass =
  "pixel-step inline-flex min-h-11 items-center gap-2 px-5 py-2.5 font-pixel text-xs uppercase tracking-wider transition-all duration-200 hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background";

function ProjectDetailPage() {
  const { project } = Route.useLoaderData();
  const { enabled: retro } = useRetroMode();
  const [photoIndex, setPhotoIndex] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const projectIndex = projects.findIndex((item) => item.id === project.id);

  const previous = projects[(projectIndex - 1 + projects.length) % projects.length]!;
  const next = projects[(projectIndex + 1) % projects.length]!;

  return (
    <div className="min-h-screen bg-background text-foreground">
      <SiteNav />
      <main className="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-16">
        <Reveal>
          <Link to="/projects" viewTransition={{ types: ["route"] }} className={linkClass}>
            <ArrowLeft className="h-4 w-4" aria-hidden />
            <span className="normal-cta-label">Back to all projects</span>
            <span className="retro-cta-label">Back to stage select</span>
          </Link>
        </Reveal>

        <article className="mt-10">
          <Reveal>
            <div className="grid gap-10 lg:grid-cols-[minmax(0,1.5fr)_minmax(260px,0.75fr)] lg:items-end lg:gap-16">
              <div>
                <p className="font-pixel text-xs uppercase tracking-[0.25em] text-primary">
                  <span className="normal-eyebrow">Case study</span>
                  <span className="retro-eyebrow">
                    SELECTED STAGE // {String(projectIndex + 1).padStart(2, "0")}
                  </span>
                </p>
                <h1 className="mt-4 text-4xl font-bold tracking-tight sm:text-5xl">
                  {project.title}
                </h1>
                <p className="mt-5 max-w-2xl text-lg leading-relaxed text-muted-foreground">
                  {project.description}
                </p>
                <div className="mt-6 flex flex-wrap gap-2" aria-label="Project technology">
                  {project.tech.map((technology) => (
                    <TechTag key={technology} label={technology} />
                  ))}
                </div>
              </div>
              <dl className="grid grid-cols-2 gap-4 border-l border-border pl-5 text-sm sm:grid-cols-3 lg:grid-cols-1">
                <MetaItem
                  label="Status"
                  value={project.status === "live" ? "Live draft" : "Work in progress"}
                />
                {project.role && <MetaItem label="Role" value={project.role} />}
                {project.timeframe && <MetaItem label="Timeframe" value={project.timeframe} />}
              </dl>
            </div>
          </Reveal>

          <Reveal delay={100}>
            <figure className="project-detail-media mt-12">
              <div className="pixel-step cartridge-frame group relative aspect-[8/5] overflow-hidden border border-border bg-card">
                <button
                  type="button"
                  onClick={() => setLightboxOpen(true)}
                  aria-label="Expand image"
                  className="absolute right-3 top-3 z-10 flex h-8 w-8 items-center justify-center border border-border bg-background/80 text-foreground opacity-90 backdrop-blur-sm transition-all duration-200 hover:bg-primary hover:text-primary-foreground focus-visible:opacity-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring md:opacity-0 md:group-hover:opacity-100"
                >
                  <Maximize2 className="h-4 w-4" aria-hidden />
                </button>

                {project.images.map((src, i) => (
                  <img
                    key={src}
                    src={src}
                    alt={i === photoIndex ? project.imageAlt : ""}
                    aria-hidden={i !== photoIndex}
                    width={1280}
                    height={800}
                    className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-300 ${
                      i === photoIndex ? "opacity-100" : "pointer-events-none opacity-0"
                    }`}
                  />
                ))}
                
                {project.images.length > 1 && (
                  <>
                    <button
                      type="button"
                      onClick={() => setPhotoIndex(i => (i - 1 + project.images.length) % project.images.length)}
                      className="absolute left-3 top-1/2 z-10 flex h-11 w-11 -translate-y-1/2 items-center justify-center border border-border bg-background/80 text-foreground backdrop-blur-sm transition-all duration-200 hover:bg-primary hover:text-primary-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                    >
                      <ChevronLeft className="h-5 w-5" aria-hidden />
                    </button>
                    <button
                      type="button"
                      onClick={() => setPhotoIndex(i => (i + 1) % project.images.length)}
                      className="absolute right-3 top-1/2 z-10 flex h-11 w-11 -translate-y-1/2 items-center justify-center border border-border bg-background/80 text-foreground backdrop-blur-sm transition-all duration-200 hover:bg-primary hover:text-primary-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                    >
                      <ChevronRight className="h-5 w-5" aria-hidden />
                    </button>
                    
                    <div className="absolute bottom-3 left-1/2 z-10 flex -translate-x-1/2 gap-1.5">
                      {project.images.map((_, i) => (
                        <button
                          key={i}
                          type="button"
                          onClick={() => setPhotoIndex(i)}
                          className="flex h-3 w-3 items-center justify-center focus-visible:outline-none"
                        >
                          <span
                            className={`block h-full w-full rounded-none transition-colors ${
                              i === photoIndex ? "bg-primary" : "bg-background/70 hover:bg-foreground/50"
                            }`}
                          />
                        </button>
                      ))}
                    </div>
                  </>
                )}
              </div>
              <figcaption className="mt-3 flex flex-wrap items-center justify-between gap-2 text-xs text-muted-foreground">
                <span>Project screenshot {photoIndex + 1} of {project.images.length}</span>
                <span>
                  {project.images.length} {project.images.length === 1 ? "view" : "views"} in the
                  project media set
                </span>
              </figcaption>
            </figure>
          </Reveal>

          {(project.external?.repo || project.external?.demo) && (
            <Reveal delay={140}>
              <div className="mt-6 flex flex-wrap gap-3">
                {project.external.repo && (
                  <a
                    href={project.external.repo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`${buttonClass} border border-border hover:border-primary hover:text-primary`}
                  >
                    Repository <ExternalLink className="h-3.5 w-3.5" aria-hidden />
                  </a>
                )}
                {project.external.demo && (
                  <a
                    href={project.external.demo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`${buttonClass} border border-border hover:border-primary hover:text-primary`}
                  >
                    Live demo <ExternalLink className="h-3.5 w-3.5" aria-hidden />
                  </a>
                )}
              </div>
            </Reveal>
          )}

          <div className="mt-16 grid gap-12 lg:grid-cols-[minmax(0,1.4fr)_minmax(220px,0.6fr)] lg:gap-20">
            <div className="space-y-12">
              {project.problem && <CopySection title="Problem" text={project.problem} />}
              {project.solution && <CopySection title="Solution" text={project.solution} />}

              {project.architecture && (
                <Reveal>
                  <section aria-labelledby="architecture-heading">
                    <SectionHeading
                      id="architecture-heading"
                      eyebrow="Architecture"
                      retro="SYSTEM MAP"
                    />
                    {project.architecture.summary && (
                      <p className="mt-3 text-sm text-muted-foreground">
                        {project.architecture.summary}
                      </p>
                    )}
                    <ol className="architecture-flow mt-6" aria-label="Architecture flow">
                      {project.architecture.nodes.map((node, index) => (
                        <li
                          key={node.label}
                          className="architecture-node pixel-step-sm border border-border bg-card p-4"
                        >
                          <div className="flex items-center gap-2">
                            <span className="font-pixel text-[10px] text-primary">
                              {String(index + 1).padStart(2, "0")}
                            </span>
                            <h3 className="font-semibold">
                              {node.label}
                            </h3>
                          </div>
                          <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                            {node.description}
                          </p>
                        </li>
                      ))}
                    </ol>
                    <p className="sr-only">
                      Flow: {project.architecture.nodes.map((node) => node.label).join(" then ")}.
                    </p>
                  </section>
                </Reveal>
              )}

              {project.technologyDecisions && (
                <Reveal>
                  <section aria-labelledby="decisions-heading">
                    <SectionHeading
                      id="decisions-heading"
                      eyebrow="Technology decisions"
                      retro="LOADOUT"
                    />
                    <ul className="mt-5 divide-y divide-border border-y border-border">
                      {project.technologyDecisions.map((decision) => (
                        <li
                          key={decision.technology}
                          className="grid gap-2 py-4 sm:grid-cols-[minmax(140px,0.45fr)_minmax(0,1fr)] sm:gap-6"
                        >
                          <h3 className="font-medium">{decision.technology}</h3>
                          <p className="text-sm leading-relaxed text-muted-foreground">
                            {decision.rationale}
                          </p>
                        </li>
                      ))}
                    </ul>
                  </section>
                </Reveal>
              )}

              {project.beforeAfter && (
                <Reveal>
                  <section aria-labelledby="before-after-heading">
                    <SectionHeading
                      id="before-after-heading"
                      eyebrow="Before / after"
                      retro="STATE CHANGE"
                    />
                    <div className="mt-5 grid gap-4 sm:grid-cols-2">
                      <ComparisonCard label="Before" text={project.beforeAfter.before} />
                      <ComparisonCard label="After" text={project.beforeAfter.after} accent />
                    </div>
                  </section>
                </Reveal>
              )}

              {project.performanceNotes && (
                <BulletSection
                  title="Performance notes"
                  retro="SYSTEM CHECK"
                  items={project.performanceNotes}
                />
              )}
              {project.challenges && (
                <BulletSection title="Challenges" retro="BOSSES" items={project.challenges} />
              )}
              {project.outcomes && (
                <BulletSection title="Results" retro="CLEAR SCREEN" items={project.outcomes} />
              )}
              {project.lessonsLearned && (
                <BulletSection
                  title="Lessons learned"
                  retro="LESSONS"
                  items={project.lessonsLearned}
                />
              )}
            </div>

            {project.timeline && (
              <Reveal>
                <section
                  aria-labelledby="timeline-heading"
                  className="h-fit border-l border-border pl-5"
                >
                  <SectionHeading
                    id="timeline-heading"
                    eyebrow="Development timeline"
                    retro="RUN LOG"
                  />
                  <ol className="mt-6 space-y-6 border-l border-primary/40 pl-5">
                    {project.timeline.map((entry) => (
                      <li key={entry.label} className="relative">
                        <span
                          className="absolute -left-[1.65rem] top-1 h-2 w-2 bg-primary"
                          aria-hidden
                        />
                        <h3 className="font-medium">{entry.label}</h3>
                        <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                          {entry.detail}
                        </p>
                      </li>
                    ))}
                  </ol>
                </section>
              </Reveal>
            )}
          </div>
        </article>

        <nav className="mt-20 border-t border-border pt-6" aria-label="Project navigation">
          <div className="flex flex-wrap items-center justify-between gap-5">
            <Link
              to="/projects/$projectId"
              params={{ projectId: previous.id }}
              viewTransition={{ types: ["route"] }}
              className={linkClass}
            >
              <ArrowLeft className="h-4 w-4" aria-hidden />
              <span className="text-left">
                <span className="block text-xs uppercase tracking-widest text-muted-foreground">
                  {retro ? "Previous stage" : "Previous project"}
                </span>
                <span className="mt-1 block">{previous.title}</span>
              </span>
            </Link>
            <Link
              to="/projects"
              viewTransition={{ types: ["route"] }}
              className="font-pixel text-[10px] uppercase tracking-widest text-muted-foreground hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              <span className="normal-cta-label">All projects</span>
              <span className="retro-cta-label">Stage select</span>
            </Link>
            <Link
              to="/projects/$projectId"
              params={{ projectId: next.id }}
              viewTransition={{ types: ["route"] }}
              className={`${linkClass} text-right`}
            >
              <span className="text-right">
                <span className="block text-xs uppercase tracking-widest text-muted-foreground">
                  {retro ? "Next stage" : "Next project"}
                </span>
                <span className="mt-1 block">{next.title}</span>
              </span>
              <ArrowRight className="h-4 w-4" aria-hidden />
            </Link>
          </div>
        </nav>
      </main>
      <SiteFooter />

      {lightboxOpen && (
        <ImageLightbox
          images={project.images}
          initialIndex={photoIndex}
          alt={project.imageAlt}
          onClose={() => setLightboxOpen(false)}
        />
      )}
    </div>
  );
}

function MetaItem({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <dt className="font-pixel text-[9px] uppercase tracking-widest text-muted-foreground">
        {label}
      </dt>
      <dd className="mt-1 leading-snug">{value}</dd>
    </div>
  );
}

function SectionHeading({ id, eyebrow, retro }: { id: string; eyebrow: string; retro: string }) {
  return (
    <>
      <p className="font-pixel text-xs uppercase tracking-[0.2em] text-primary">
        <span className="normal-eyebrow">{eyebrow}</span>
        <span className="retro-eyebrow">{retro}</span>
      </p>
      <h2 id={id} className="mt-2 text-2xl font-bold tracking-tight">
        {eyebrow}
      </h2>
    </>
  );
}

function CopySection({ title, text }: { title: string; text: string }) {
  const id = `${title.toLowerCase().replaceAll(" ", "-")}-heading`;
  return (
    <Reveal>
      <section aria-labelledby={id}>
        <SectionHeading id={id} eyebrow={title} retro={title.toUpperCase()} />
        <p className="mt-4 max-w-2xl text-lg leading-relaxed text-muted-foreground">{text}</p>
      </section>
    </Reveal>
  );
}

function BulletSection({ title, retro, items }: { title: string; retro: string; items: string[] }) {
  const id = `${title.toLowerCase().replaceAll(" ", "-")}-heading`;
  return (
    <Reveal>
      <section aria-labelledby={id}>
        <SectionHeading id={id} eyebrow={title} retro={retro} />
        <ul className="mt-4 space-y-3 text-muted-foreground">
          {items.map((item) => (
            <li key={item} className="flex gap-3 leading-relaxed">
              <span className="mt-2 h-1.5 w-1.5 shrink-0 bg-primary" aria-hidden />
              {item}
            </li>
          ))}
        </ul>
      </section>
    </Reveal>
  );
}

function ComparisonCard({
  label,
  text,
  accent = false,
}: {
  label: string;
  text: string;
  accent?: boolean;
}) {
  return (
    <div
      className={`pixel-step-sm border p-5 ${accent ? "border-primary/60 bg-primary/5" : "border-border bg-card"}`}
    >
      <p className="font-pixel text-[10px] uppercase tracking-widest text-primary">{label}</p>
      <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{text}</p>
    </div>
  );
}
