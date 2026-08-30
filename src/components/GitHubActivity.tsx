import { GitHubCalendar } from "react-github-calendar";
import type { Activity } from "react-github-calendar";
import { Reveal } from "@/components/Reveal";
import { useTheme } from "@/hooks/use-theme";
import { useIsMobile } from "@/hooks/use-mobile";
import { profile } from "@/data/projects";
import { useRetroMode } from "@/hooks/use-retro-mode";

const calendarTheme = {
  light: ["#ebedf0", "#c7c9ff", "#8f88f0", "#6a5fec", "#4F46E5"],
  dark: ["#1c1e24", "#3b3157", "#5b4a8f", "#8267d6", "#A78BFA"],
};

const MOBILE_WINDOW_DAYS = 182;

function trimRecentActivity(data: Activity[]) {
  const endDate = data.at(-1)?.date;
  if (!endDate) return data;

  const start = new Date(`${endDate}T00:00:00Z`);
  start.setUTCDate(start.getUTCDate() - (MOBILE_WINDOW_DAYS - 1));
  const startDate = start.toISOString().slice(0, 10);

  return data.filter(({ date }) => date >= startDate && date <= endDate);
}

export function GitHubActivity() {
  const { theme, mounted } = useTheme();
  const { enabled: retro } = useRetroMode();
  const isMobile = useIsMobile();
  const calendarSize = isMobile
    ? { blockSize: 8, blockMargin: 2, fontSize: 11 }
    : { blockSize: 10, blockMargin: 2, fontSize: 12 };

  return (
    <section aria-labelledby="github-heading" className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
      <Reveal>
        <p
          className="font-pixel text-xs uppercase tracking-[0.25em] text-primary"
          aria-label={retro ? "Level 04, activity" : "GitHub"}
        >
          <span className="normal-eyebrow">GitHub</span>
          <span className="retro-eyebrow">LEVEL 04 · ACTIVITY</span>
        </p>
        <h2 id="github-heading" className="mt-3 text-3xl font-bold tracking-tight">
          Activity
        </h2>
        <p className="mt-3 text-muted-foreground">
          Live contribution graph from{" "}
          <a
            href={profile.github}
            target="_blank"
            rel="noopener noreferrer"
            className="font-medium text-primary underline-offset-4 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            @{profile.githubUsername}
          </a>
        </p>
      </Reveal>

      <Reveal delay={120}>
        <div className="mx-auto mt-8 w-full max-w-full border border-border bg-card p-2 sm:p-4">
          <div className="flex min-w-0 justify-center">
            {mounted && (
              <GitHubCalendar
                username={profile.githubUsername}
                colorScheme={theme}
                theme={calendarTheme}
                className="github-calendar"
                {...calendarSize}
                {...(isMobile ? { transformData: trimRecentActivity } : {})}
                labels={{
                  totalCount: isMobile
                    ? "{{count}} contributions in the last 6 months"
                    : "{{count}} contributions in the last year",
                }}
              />
            )}
          </div>
        </div>
      </Reveal>
    </section>
  );
}
