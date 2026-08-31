import { Magnetic } from "@/components/Magnetic";
import { PixelButton } from "@/components/PixelButton";
import { PixelParticles } from "@/components/PixelParticles";
import { PixelPhoto } from "@/components/PixelPhoto";
import { RetroModeControl } from "@/components/RetroModeControl";
import { useTypewriter } from "@/hooks/use-typewriter";
import { profile } from "@/data/projects";
import portrait from "@/assets/portrait.jpg";
import pixelPortrait from "@/assets/pixel-portrait.jpg";

export function Hero() {
  const { display, done } = useTypewriter(profile.name);
  const lastSpace = display.lastIndexOf(" ");
  const namePrefix = lastSpace === -1 ? "" : display.slice(0, lastSpace + 1);
  const nameLastWord = lastSpace === -1 ? display : display.slice(lastSpace + 1);

  return (
    <section id="top" className="relative overflow-hidden">
      {/* Quiet ambient glow — slow drift, never competing with the photo effect */}
      <div
        aria-hidden
        className="ambient-glow pointer-events-none absolute -top-32 right-[-10%] h-[420px] w-[420px] rounded-full bg-primary/10 blur-3xl"
      />

      {/* Floating pixel particles behind everything */}
      <PixelParticles />

      <div className="hero-grid relative mx-auto max-w-6xl px-4 py-20 sm:px-6 sm:py-28">
        <div className="hero-intro min-w-0">
          <p className="hero-in font-pixel text-xs uppercase tracking-[0.25em] text-primary">
            Hello, I'm
          </p>
          <h1
            className="hero-in mt-4 min-h-[1.2em] text-4xl font-bold tracking-tight sm:text-5xl"
            style={{ animationDelay: "100ms" }}
          >
            <span>{namePrefix}</span>
            <span className="whitespace-nowrap">
              {nameLastWord}
              <span
                aria-hidden
                className={`pixel-cursor ml-1 inline-block h-[0.9em] w-[0.45em] translate-y-[0.1em] bg-primary ${
                  done ? "opacity-80" : ""
                }`}
              />
            </span>
          </h1>
          <p
            className="hero-in mt-2 text-xl font-medium text-primary"
            style={{ animationDelay: "200ms" }}
          >
            {profile.role}
          </p>
        </div>

        <div className="hero-photo hero-in" style={{ animationDelay: "250ms" }}>
          <PixelPhoto
            src={portrait}
            pixelSrc={pixelPortrait}
            alt={`Portrait of ${profile.name}, full-stack developer`}
            width={768}
            height={960}
          />
        </div>

        <div className="hero-details min-w-0">
          <p
            className="hero-in max-w-md leading-relaxed text-muted-foreground"
            style={{ animationDelay: "300ms" }}
          >
            {profile.shortBio}
          </p>
          <div className="hero-in mt-8 flex flex-wrap gap-4" style={{ animationDelay: "400ms" }}>
            <Magnetic>
              <PixelButton href="#projects">View Projects</PixelButton>
            </Magnetic>
            <Magnetic>
              <PixelButton href={`mailto:${profile.email}`} variant="outline">
                Contact Me
              </PixelButton>
            </Magnetic>
          </div>
          <RetroModeControl />
        </div>
      </div>
    </section>
  );
}
