import { Link } from "@tanstack/react-router";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "@/hooks/use-theme";
import { profile } from "@/data/projects";

export function SiteNav() {
  const { theme, toggle, mounted, isTransitioning } = useTheme();
  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur-md">
      <nav
        aria-label="Main navigation"
        className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6"
      >
        <Link
          to="/"
          hash="top"
          viewTransition={{ types: ["route"] }}
          className="inline-flex min-h-11 items-center font-pixel text-xs tracking-widest text-foreground transition-colors hover:text-primary sm:text-sm"
        >
          FGE<span className="text-primary">_</span>
        </Link>

        <div className="flex items-center gap-3 sm:gap-7">
          <Link
            to="/"
            hash="projects"
            viewTransition={{ types: ["route"] }}
            className="nav-link inline-flex min-h-11 items-center whitespace-nowrap text-xs font-medium text-muted-foreground transition-colors hover:text-foreground focus-visible:text-foreground focus-visible:outline-none sm:text-sm"
          >
            Projects
          </Link>
          <a
            href={profile.github}
            target="_blank"
            rel="noopener noreferrer"
            className="nav-link inline-flex min-h-11 items-center whitespace-nowrap text-xs font-medium text-muted-foreground transition-colors hover:text-foreground focus-visible:text-foreground focus-visible:outline-none sm:text-sm"
          >
            GitHub
          </a>
          <Link
            to="/"
            hash="contact"
            viewTransition={{ types: ["route"] }}
            className="nav-link inline-flex min-h-11 items-center whitespace-nowrap text-xs font-medium text-muted-foreground transition-colors hover:text-foreground focus-visible:text-foreground focus-visible:outline-none sm:text-sm"
          >
            Contact
          </Link>

          <button
            type="button"
            onClick={(event) => {
              toggle({
                x: event.clientX,
                y: event.clientY,
              });
            }}
            disabled={isTransitioning}
            aria-label={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
            aria-busy={isTransitioning}
            data-theme-toggle
            className="pixel-step-sm flex h-11 w-11 shrink-0 items-center justify-center bg-muted text-foreground transition-colors hover:text-primary focus-visible:outline-none disabled:cursor-wait disabled:opacity-70"
          >
            {mounted && theme === "dark" ? (
              <Moon key="moon" className="theme-icon-in h-4 w-4" aria-hidden />
            ) : (
              <Sun key="sun" className="theme-icon-in h-4 w-4" aria-hidden />
            )}
          </button>
        </div>
      </nav>
    </header>
  );
}
