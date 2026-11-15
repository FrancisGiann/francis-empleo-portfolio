import { Mail } from "lucide-react";
import { profile, projects } from "@/data/projects";

export function SiteFooter() {
  return (
    <footer className="portfolio-footer border-t border-border">
      <div className="mx-auto flex max-w-6xl flex-col items-start justify-between gap-5 px-4 py-8 sm:flex-row sm:items-center sm:px-6">
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
      </div>
    </footer>
  );
}
