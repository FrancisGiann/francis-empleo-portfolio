import { Leaf, Mail } from "lucide-react";
import { profile, projects } from "@/data/projects";
import { useAmbientLeaves } from "@/components/AmbientLeaves";

export function SiteFooter() {
  const { enabled: leavesEnabled, toggle: toggleLeaves } = useAmbientLeaves();

  return (
    <footer className="portfolio-footer border-t border-border">
      <div className="mx-auto flex max-w-6xl flex-col items-start justify-between gap-5 px-4 pt-8 pb-[calc(5rem+env(safe-area-inset-bottom,0px))] sm:flex-row sm:items-center sm:px-6">
        <div>
          <p className="font-pixel text-[10px] uppercase tracking-widest text-primary">
            <span className="normal-mode-copy">Portfolio</span>
            <span className="arcade-mode-copy">Player: FGE</span>
          </p>
          <p className="mt-2 text-sm text-muted-foreground">
            <span className="normal-mode-copy">© 2026 {profile.name}</span>
            <span className="arcade-mode-copy">{projects.length} quests // ready</span>
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-4">
          <nav aria-label="Social links" className="flex items-center gap-6">
            <a
              href={profile.github}
              target="_blank"
              rel="noopener noreferrer"
              className="font-pixel text-[10px] uppercase tracking-widest text-muted-foreground transition-colors hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              GitHub
            </a>
            <a
              href={profile.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="font-pixel text-[10px] uppercase tracking-widest text-muted-foreground transition-colors hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              LinkedIn
            </a>
            <a
              href={`mailto:${profile.email}`}
              aria-label="Send email"
              className="text-muted-foreground transition-colors hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              <Mail className="h-5 w-5" aria-hidden />
            </a>
          </nav>
          <button
            type="button"
            onClick={toggleLeaves}
            aria-label="Falling leaves animation"
            aria-pressed={leavesEnabled}
            title={leavesEnabled ? "Pause falling leaves" : "Resume falling leaves"}
            className="ambient-leaves-toggle pixel-step-sm inline-flex h-11 w-11 items-center justify-center border border-border bg-card/90 text-primary transition-colors hover:border-primary hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            <Leaf className="h-4 w-4" aria-hidden />
          </button>
        </div>
      </div>
    </footer>
  );
}
