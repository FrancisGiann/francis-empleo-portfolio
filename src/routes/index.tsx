import { createFileRoute } from "@tanstack/react-router";
import { SiteNav } from "@/components/SiteNav";
import { Hero } from "@/components/Hero";
import { AboutSkills } from "@/components/AboutSkills";
import { SelectedProjects } from "@/components/SelectedProjects";
import { NowSection } from "@/components/NowSection";
import { GitHubActivity } from "@/components/GitHubActivity";
import { ContactSection } from "@/components/ContactSection";
import { SiteFooter } from "@/components/SiteFooter";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Francis Giann Empleo | Full-Stack Developer" },
      {
        name: "description",
        content:
          "Web and Android projects by Francis Giann Empleo, built with React, Flutter, Node.js, PHP and databases.",
      },
      { property: "og:title", content: "Francis Giann Empleo | Full-Stack Developer" },
      {
        property: "og:description",
        content:
          "Web and Android projects by Francis Giann Empleo, built with React, Flutter, Node.js, PHP and databases.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <div className="portfolio-shell min-h-screen bg-background text-foreground">
      <SiteNav />
      <main>
        <Hero />
        <SelectedProjects />
        <AboutSkills />
        <NowSection />
        <GitHubActivity />
        <ContactSection />
      </main>
      <SiteFooter />
    </div>
  );
}
