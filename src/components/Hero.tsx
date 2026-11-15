import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { Magnetic } from "@/components/Magnetic";
import { MiniGame } from "@/components/MiniGame";
import { PixelButton } from "@/components/PixelButton";
import { PixelPhoto } from "@/components/PixelPhoto";
import { RetroModeControl } from "@/components/RetroModeControl";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useKonami } from "@/hooks/use-konami";
import { useTypewriter } from "@/hooks/use-typewriter";
import {
  isAndroidProject,
  profile,
  projects,
  skillGroups,
} from "@/data/projects";
import portrait from "@/assets/portrait.jpg";
import pixelPortrait from "@/assets/pixel-portrait.jpg";

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null;
}

async function fetchLastYearContributionCount(signal: AbortSignal) {
  const response = await fetch(
    `https://github-contributions-api.jogruber.de/v4/${encodeURIComponent(profile.githubUsername)}?y=last&client=portfolio-stats`,
    { signal },
  );
  if (!response.ok) throw new Error("GitHub activity is unavailable");

  const payload: unknown = await response.json();
  if (!isRecord(payload) || !Array.isArray(payload.contributions)) {
    throw new Error("GitHub activity returned an invalid response");
  }

  return payload.contributions.reduce<number>((total, day) => {
    if (
      !isRecord(day) ||
      typeof day.count !== "number" ||
      !Number.isInteger(day.count) ||
      day.count < 0 ||
      typeof day.date !== "string" ||
      !/^\d{4}-\d{2}-\d{2}$/.test(day.date)
    ) {
      throw new Error("GitHub activity returned an invalid contribution day");
    }
    return total + day.count;
  }, 0);
}

export function Hero() {
  const { display, done } = useTypewriter(profile.name);
  const { enabled: arcadeEnabled } = useKonami();
  const [bonusStageOpen, setBonusStageOpen] = useState(false);
  const contributionQuery = useQuery({
    queryKey: ["github-contribution-count", profile.githubUsername, "last"],
    queryFn: ({ signal }) => fetchLastYearContributionCount(signal),
    staleTime: 60 * 60 * 1000,
    retry: 1,
  });
  // User-provided portfolio total; its fourth website isn't identified in the project catalogue.
  const liveWebsiteCount = 4;
  const androidProjects = projects.filter(isAndroidProject);
  const prereleaseAndroidCount = androidProjects.filter((project) =>
    /pre.?release/i.test(project.statusLabel ?? ""),
  ).length;

  useEffect(() => {
    if (!arcadeEnabled) setBonusStageOpen(false);
  }, [arcadeEnabled]);

  const identity = (
    <div className="portfolio-hero-identity">
      <div className="portfolio-hero-name-group">
        <p className="portfolio-hero-kicker">
          <span className="portfolio-kicker-spark" aria-hidden="true" />
          Player 1 ready
        </p>
        <h1 className="portfolio-hero-name" aria-label={profile.name}>
          <span aria-hidden="true">{display}</span>
          <span
            aria-hidden="true"
            className={`pixel-cursor ml-1 inline-block h-[0.78em] w-[0.32em] translate-y-[0.08em] bg-primary ${done ? "opacity-80" : ""}`}
          />
        </h1>
        <p className="portfolio-hero-role">{profile.role}</p>
      </div>
    </div>
  );

  const résuméLink = profile.resumeHref ? (
    <Magnetic key="resume">
      <PixelButton
        href={profile.resumeHref}
        download
        variant="outline"
        aria-label="Download résumé as a PDF"
      >
        Download Résumé
      </PixelButton>
    </Magnetic>
  ) : null;

  const playerPortrait = (
    <div className="portfolio-player-portrait">
      <PixelPhoto
        src={portrait}
        pixelSrc={pixelPortrait}
        alt="Portrait of the portfolio owner"
        width={768}
        height={960}
      />
    </div>
  );

  const playerStats = (
    <div className="arcade-player-stats" role="group" aria-label="Player stats">
      <div className="portfolio-player-stat" role="group" aria-label={`${projects.length} projects in the archive`}>
        <div className="portfolio-player-stat-label">
          <span>PROJECTS</span>
          <span>{String(projects.length).padStart(2, "0")}</span>
        </div>
        <div className="portfolio-player-bar" aria-hidden="true">
          {Array.from({ length: projects.length }, (_, index) => (
            <span key={index} />
          ))}
        </div>
      </div>
      <div
        className="portfolio-player-stat"
        role="group"
        aria-label={`${skillGroups.length} skill groups in the inventory`}
      >
        <div className="portfolio-player-stat-label">
          <span>SKILL GROUPS</span>
          <span>{String(skillGroups.length).padStart(2, "0")}</span>
        </div>
        <div className="portfolio-player-bar" aria-hidden="true">
          {skillGroups.map((group) => (
            <span key={group.label} />
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <>
      <section id="top" className="portfolio-hero relative isolate overflow-hidden">
        <div className="portfolio-hero-inner relative mx-auto max-w-6xl px-4 py-10 sm:px-6 sm:py-14">
          {arcadeEnabled ? (
            <div className="arcade-game-menu pixel-step">
              {playerPortrait}
              <div className="arcade-game-menu-copy">
                {identity}
                <p className="portfolio-hero-bio">{profile.shortBio}</p>
                <div className="portfolio-hero-actions">
                  <Magnetic>
                    <a
                      className="arcade-start"
                      href="#projects"
                      aria-label="Press start to view projects"
                    >
                      <span aria-hidden="true">▶</span> Press Start
                    </a>
                  </Magnetic>
                  {résuméLink}
                </div>
                <div className="arcade-menu-bonus">
                  <Dialog open={bonusStageOpen} onOpenChange={setBonusStageOpen}>
                    <DialogTrigger asChild>
                      <button type="button" className="arcade-bonus-link">
                        <span>Play Snake</span>
                        <span className="arcade-bonus-label">Bonus game</span>
                      </button>
                    </DialogTrigger>
                    <DialogContent className="bonus-game-dialog portfolio-shell p-0">
                      <MiniGame />
                    </DialogContent>
                  </Dialog>
                </div>
              </div>
              {playerStats}
            </div>
          ) : (
            <div className="portfolio-hero-layout">
              {identity}
              <aside className="portfolio-hero-normal-portrait">
                <PixelPhoto
                  src={portrait}
                  pixelSrc={pixelPortrait}
                  alt="Portrait of a full-stack developer"
                  width={768}
                  height={960}
                />
              </aside>
              <p className="portfolio-hero-bio">{profile.shortBio}</p>
              <div className="portfolio-hero-actions">
                <Magnetic>
                  <PixelButton href="#projects">View Projects</PixelButton>
                </Magnetic>
                {résuméLink}
              </div>
              <div className="portfolio-hero-retro">
                <RetroModeControl />
              </div>
            </div>
          )}
        </div>
      </section>
      <section className="portfolio-hero-stats" aria-label="Portfolio at a glance">
        <div className="portfolio-hero-stats-grid">
          <article className="portfolio-hero-stat-card" aria-busy={contributionQuery.isLoading}>
            <p className="portfolio-hero-stat-value" aria-live="polite">
              {contributionQuery.data === undefined
                ? "—"
                : contributionQuery.data.toLocaleString()}
            </p>
            <p className="portfolio-hero-stat-label">GitHub contributions in the last year</p>
            <a href="#github-activity" className="portfolio-hero-stat-link">
              View contribution calendar
            </a>
          </article>
          <article className="portfolio-hero-stat-card">
            <p className="portfolio-hero-stat-value">{liveWebsiteCount}</p>
            <p className="portfolio-hero-stat-label">Live websites</p>
            <Link
              to="/projects"
              search={{ category: "live" }}
              activeOptions={{ exact: true, includeSearch: true, explicitUndefined: true }}
              className="portfolio-hero-stat-link"
            >
              Explore live websites
            </Link>
          </article>
          <article className="portfolio-hero-stat-card">
            <p className="portfolio-hero-stat-value">{androidProjects.length}</p>
              <p className="portfolio-hero-stat-label">Android apps</p>
            {prereleaseAndroidCount > 0 && (
              <p className="portfolio-hero-stat-note">
                  Includes {prereleaseAndroidCount} prerelease reader
              </p>
            )}
            <Link
              to="/projects"
              search={{ category: "android" }}
              activeOptions={{ exact: true, includeSearch: true, explicitUndefined: true }}
              className="portfolio-hero-stat-link"
            >
              Explore Android work
            </Link>
          </article>
        </div>
      </section>
    </>
  );
}
