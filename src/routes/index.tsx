import { createFileRoute } from "@tanstack/react-router";
import { SiteNav } from "@/components/SiteNav";
import { Hero } from "@/components/Hero";
import { AboutSkills } from "@/components/AboutSkills";
import { ProjectCarousel } from "@/components/ProjectCarousel";
import { NowSection } from "@/components/NowSection";
import { GitHubActivity } from "@/components/GitHubActivity";
import { ContactSection } from "@/components/ContactSection";
import { SiteFooter } from "@/components/SiteFooter";
import { profile } from "@/data/projects";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: `${profile.name} — Full-Stack Developer` },
      {
        name: "description",
        content:
          "Portfolio of Francis Giann Empleo, a full-stack developer building fast, reliable web applications with React, TypeScript, and Node.js.",
      },
      { property: "og:title", content: `${profile.name} — Full-Stack Developer` },
      {
        property: "og:description",
        content:
          "Portfolio of Francis Giann Empleo, a full-stack developer building fast, reliable web applications with React, TypeScript, and Node.js.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <SiteNav />
      <main>
        <Hero />
        <hr className="divider-dotted mx-auto max-w-6xl" />
        <AboutSkills />
        <ProjectCarousel />
        <hr className="divider-dotted mx-auto max-w-6xl" />
        <NowSection />
        <hr className="divider-dotted mx-auto max-w-6xl" />
        <GitHubActivity />
        <hr className="divider-dotted mx-auto max-w-6xl" />
        <ContactSection />
      </main>
      <SiteFooter />
    </div>
  );
}
