import { Link, useRouterState } from "@tanstack/react-router";
import { Moon, Sun } from "lucide-react";
import { useEffect, useState } from "react";
import { useTheme } from "@/hooks/use-theme";
import { useKonami } from "@/hooks/use-konami";
import { profile } from "@/data/projects";

export function SiteNav() {
  const { theme, toggle, mounted, isTransitioning } = useTheme();
  const { enabled: arcadeEnabled, toggle: toggleArcade } = useKonami();
  const locationHref = useRouterState({ select: (state) => state.location.href });
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (!arcadeEnabled) {
      setProgress(0);
      return;
    }
    let ticking = false;
    const update = () => {
      ticking = false;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const value = max > 0 ? Math.min(Math.max(window.scrollY / max, 0), 1) : 0;
      setProgress(Math.round(value * 100));
    };
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      window.requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [locationHref, arcadeEnabled]);

  const score = String(Math.round((progress / 100) * 9999)).padStart(4, "0");
  const filledSegments = Math.round((progress / 100) * 24);

  return (
    <header className="portfolio-nav sticky top-0 z-50 border-b border-border bg-background/90 backdrop-blur-md">
      <nav
        aria-label="Main navigation"
        className="mx-auto flex h-14 max-w-6xl items-center justify-between px-4 sm:px-6"
      >
        <Link
          to="/"
          hash="top"
          viewTransition={{ types: ["route"] }}
          className="inline-flex min-h-11 items-center font-pixel text-xs tracking-widest text-foreground transition-colors hover:text-primary sm:text-sm"
        >
          FGE<span className="text-primary">_</span>
        </Link>

        {arcadeEnabled ? (
          <div className="portfolio-nav-arcade flex items-center gap-2 sm:gap-5">
            <Link
              to="/"
              hash="projects"
              viewTransition={{ types: ["route"] }}
              className="nav-link inline-flex min-h-10 items-center whitespace-nowrap text-[10px] font-medium text-muted-foreground transition-colors hover:text-foreground focus-visible:text-foreground focus-visible:outline-none sm:text-sm"
            >
              Quests
            </Link>
            <Link
              to="/"
              hash="about"
              viewTransition={{ types: ["route"] }}
              className="nav-link inline-flex min-h-10 items-center whitespace-nowrap text-[10px] font-medium text-muted-foreground transition-colors hover:text-foreground focus-visible:text-foreground focus-visible:outline-none sm:text-sm"
            >
              Inventory
            </Link>
            <Link
              to="/"
              hash="now"
              viewTransition={{ types: ["route"] }}
              className="nav-link hidden min-h-10 items-center whitespace-nowrap text-[10px] font-medium text-muted-foreground transition-colors hover:text-foreground focus-visible:text-foreground focus-visible:outline-none sm:inline-flex sm:text-sm"
            >
              Now
            </Link>
            <Link
              to="/"
              hash="github-activity"
              viewTransition={{ types: ["route"] }}
              className="nav-link hidden min-h-10 items-center whitespace-nowrap text-[10px] font-medium text-muted-foreground transition-colors hover:text-foreground focus-visible:text-foreground focus-visible:outline-none sm:inline-flex sm:text-sm"
            >
              Activity
            </Link>
            <Link
              to="/"
              hash="contact"
              viewTransition={{ types: ["route"] }}
              className="nav-link inline-flex min-h-10 items-center whitespace-nowrap text-[10px] font-medium text-muted-foreground transition-colors hover:text-foreground focus-visible:text-foreground focus-visible:outline-none sm:text-sm"
            >
              Contact
            </Link>
          </div>
        ) : (
          <div className="portfolio-nav-normal flex items-center gap-3 sm:gap-7">
          <Link
            to="/"
            hash="projects"
            viewTransition={{ types: ["route"] }}
            className="nav-link inline-flex min-h-11 items-center whitespace-nowrap text-xs font-medium text-muted-foreground transition-colors hover:text-foreground focus-visible:text-foreground focus-visible:outline-none sm:text-sm"
          >
            <span>Projects</span>
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
          </div>
        )}

        <div className="flex items-center gap-2 sm:gap-3">
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
      {arcadeEnabled ? (
        <div className="arcade-hud-row mx-auto flex max-w-6xl items-center gap-3 px-4 pb-2 sm:gap-5 sm:px-6">
        <span className="arcade-score font-pixel text-[9px] uppercase tracking-wider text-foreground">
          SCORE <span className="arcade-score-value text-primary">{score}</span>
        </span>
        <div className="arcade-health flex min-w-0 flex-1 items-center gap-2">
          <span className="font-pixel text-[8px] uppercase tracking-wider text-muted-foreground">
            HP
          </span>
          <div
            role="progressbar"
            aria-label="Page scroll progress"
            aria-valuemin={0}
            aria-valuemax={100}
            aria-valuenow={progress}
            aria-valuetext={`${progress}% through page`}
            className="arcade-hud-meter grid min-w-0 flex-1 gap-[2px]"
          >
            {Array.from({ length: 24 }, (_, index) => (
              <span
                key={index}
                aria-hidden="true"
                className={index < filledSegments ? "is-filled" : undefined}
              />
            ))}
          </div>
          <span className="arcade-progress-value w-8 text-right font-mono text-[9px] tabular-nums text-muted-foreground">
            {String(progress).padStart(2, "0")}%
          </span>
          <button
            type="button"
            onClick={() => toggleArcade("direct")}
            className="arcade-exit pixel-step-sm inline-flex min-h-9 shrink-0 items-center border border-primary/70 bg-card px-2.5 font-pixel text-[8px] uppercase tracking-wide text-foreground transition-colors hover:bg-primary hover:text-primary-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring sm:px-3 sm:text-[9px]"
          >
            Exit Arcade
          </button>
        </div>
        </div>
      ) : null}
    </header>
  );
}
