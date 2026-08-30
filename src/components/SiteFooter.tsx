import { Mail } from "lucide-react";
import { profile } from "@/data/projects";

export function SiteFooter() {
  return (
    <footer id="contact" className="border-t border-border">
      <div className="mx-auto flex max-w-5xl flex-col items-center justify-between gap-4 px-4 py-8 sm:flex-row sm:px-6">
        <p className="text-sm text-muted-foreground">
          © 2026 {profile.name}
        </p>
        <div className="flex items-center gap-6">
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
        </div>
      </div>
    </footer>
  );
}
