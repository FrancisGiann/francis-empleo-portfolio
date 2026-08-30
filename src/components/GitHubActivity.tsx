import { GitHubCalendar } from "react-github-calendar";
import { Reveal } from "@/components/Reveal";
import { useTheme } from "@/hooks/use-theme";
import { profile } from "@/data/projects";

const calendarTheme = {
  light: ["#ebedf0", "#c7c9ff", "#8f88f0", "#6a5fec", "#4F46E5"],
  dark: ["#1c1e24", "#3b3157", "#5b4a8f", "#8267d6", "#A78BFA"],
};

export function GitHubActivity() {
  const { theme, mounted } = useTheme();

  return (
    <section aria-labelledby="github-heading" className="mx-auto max-w-5xl px-4 py-16 sm:px-6">
      <Reveal>
        <p className="font-pixel text-xs uppercase tracking-[0.25em] text-primary">
          GitHub
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
        <div className="mt-8 overflow-x-auto border border-border bg-card p-6">
          {mounted && (
            <GitHubCalendar
              username={profile.githubUsername}
              colorScheme={theme}
              theme={calendarTheme}
              blockSize={12}
              blockMargin={4}
              fontSize={13}
            />
          )}
        </div>
      </Reveal>
    </section>
  );
}
