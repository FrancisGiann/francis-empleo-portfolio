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
      { title: "Francis Giann Empleo | Web Developer Portfolio" },
      {
        name: "description",
        content:
          "Welcome to the web developer portfolio of Francis Giann (Francis Empleo). View my latest full-stack projects, skills, and interactive experiences.",
      },
      { property: "og:title", content: "Francis Giann Empleo | Web Developer Portfolio" },
      {
        property: "og:description",
        content:
          "Welcome to the web developer portfolio of Francis Giann (Francis Empleo). View my latest full-stack projects, skills, and interactive experiences.",
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
