import { PixelButton } from "@/components/PixelButton";
import { profile } from "@/data/projects";

export function ContactSection() {
  return (
    <section id="contact" className="mx-auto max-w-6xl px-4 py-20 sm:px-6 sm:py-24">
      <div className="mx-auto max-w-2xl border border-border bg-card p-6 text-center shadow-sm sm:p-10">
        <p className="font-pixel text-xs uppercase tracking-[0.2em] text-primary">Contact</p>
        <h2 className="mt-3 text-3xl font-semibold tracking-tight text-foreground">Let’s talk</h2>
        <p className="mx-auto mt-4 max-w-lg leading-relaxed text-muted-foreground">
          For questions about my work or an opportunity, email me at{" "}
          <a
            href={`mailto:${profile.email}`}
            className="font-medium text-primary underline underline-offset-4 hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            {profile.email}
          </a>
          .
        </p>
        <div className="mt-7 flex flex-wrap justify-center gap-3">
          <PixelButton href={`mailto:${profile.email}`} aria-label="Email Francis Giann">
            Email me
          </PixelButton>
          {profile.resumeHref ? (
            <PixelButton
              href={profile.resumeHref}
              download
              variant="outline"
              aria-label="Download Résumé as a PDF"
            >
              Download Résumé
            </PixelButton>
          ) : null}
        </div>
      </div>
    </section>
  );
}
