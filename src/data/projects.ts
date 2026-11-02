import sevillaScreen from "@/assets/project-sevilla1.webp";
import flowScreen from "@/assets/project-flow1.webp";

export interface Project {
  id: string;
  title: string;
  description: string;
  tech: string[];
  status: "live" | "wip";
  statusLabel?: string;
  category?: string;
  headline?: string;
  accent?: string;
  device?: "phone" | "browser";
  /** Future static branded composite. Keep empty until the capture is reviewed. */
  images: string[];
  /** Safe source capture used inside the browser or phone mockup. */
  showcaseScreen?: string;
  showcaseImage?: string;
  logo?: string;
  imageAlt: string;
  mediaNote?: string;
  role?: string;
  timeframe?: string;
  problem?: string;
  solution?: string;
  architecture?: {
    summary?: string;
    nodes: Array<{ label: string; description: string }>;
  };
  challenges?: string[];
  outcomes?: string[];
  technologyDecisions?: Array<{ technology: string; rationale: string }>;
  beforeAfter?: { before: string; after: string };
  performanceNotes?: string[];
  timeline?: Array<{ label: string; detail: string }>;
  lessonsLearned?: string[];
  external?: {
    repo?: string;
    demo?: string;
  };
}

export const projects: Project[] = [
  {
    id: "sevilla360",
    title: "Sevilla360",
    category: "Resort website",
    headline: "Explore the resort before you book.",
    description:
      "A resort website with a 360° virtual tour and online booking for M.I. Sevilla Resort.",
    tech: ["PHP", "MariaDB", "JavaScript", "Panolens.js"],
    status: "live",
    statusLabel: "Completed · Live",
    accent: "#997745",
    device: "browser",
    images: [],
    showcaseImage: "/showcases/sevilla360.webp",
    showcaseScreen: sevillaScreen,
    imageAlt: "Sevilla360 resort website landing page.",
    mediaNote: "Public landing page capture.",
    external: {
      repo: "https://github.com/FrancisGiann/Sevilla360",
      demo: "https://misevillas.com",
    },
  },
  {
    id: "healthmate",
    title: "HealthMate",
    category: "Clinic management",
    headline: "Clinic visits and records, in one place.",
    description: "A role-based clinic system for student visits, health records, and appointments.",
    tech: ["React", "Vite", "Express", "PostgreSQL"],
    status: "live",
    statusLabel: "Live website",
    accent: "#1b3d68",
    device: "browser",
    images: [],
    showcaseImage: "/showcases/healthmate.webp",
    showcaseScreen: "/references/healthmate-screen.webp",
    logo: "/references/logos/healthmate.svg",
    imageAlt: "HealthMate public landing page with clinic software branding.",
    mediaNote: "Public landing page; no clinic records are shown.",
    external: {
      demo: "https://healthmateplus.com",
    },
  },
  {
    id: "arktiesiis",
    title: "ARKTIESIIS",
    category: "School information system",
    headline: "School workflows for enrollment, grades, and finance.",
    description:
      "A school information system covering enrollment, grades, finance, and student records. AI-assisted name and field checks require staff review.",
    tech: ["Node.js", "Express", "EJS", "MariaDB", "Gemini"],
    status: "live",
    statusLabel: "Live website",
    accent: "#9d293c",
    device: "browser",
    images: [],
    showcaseImage: "/showcases/arktiesiis.webp",
    showcaseScreen: "/references/arktiesiis-screen.webp",
    logo: "/references/logos/arktiesiis.webp",
    imageAlt: "ARKTIESIIS public school-system landing page.",
    mediaNote: "Public landing page; no student records are shown.",
    external: {
      repo: "https://github.com/FrancisGiann/ARKTIESIIS",
      demo: "https://arklucena.com",
    },
  },
  {
    id: "ponpon",
    title: "PonPon",
    category: "Android app",
    headline: "See your balances. Log an expense fast.",
    description:
      "An offline Android budget tracker for manually recorded wallets, spending, income, and transfers.",
    tech: ["Flutter", "Dart", "Kotlin"],
    status: "live",
    statusLabel: "Android app",
    accent: "#8a5573",
    device: "phone",
    images: [],
    showcaseImage: "/showcases/ponpon.webp",
    showcaseScreen: "/references/ponpon-screen.webp",
    logo: "/references/logos/ponpon.webp",
    imageAlt: "PonPon wallet overview with synthetic sample balances.",
    mediaNote: "Synthetic app preview.",
    external: {
      repo: "https://github.com/FrancisGiann/Ponpon",
    },
  },
  {
    id: "ready-yet",
    title: "Ready Yet?",
    category: "Android app",
    headline: "Know what to bring before you go.",
    description:
      "An offline checklist for reusable packing lists, scheduled outings, reminders, and home-screen widgets.",
    tech: ["Flutter", "Dart", "Kotlin"],
    status: "live",
    statusLabel: "Android app",
    accent: "#718c32",
    device: "phone",
    images: [],
    showcaseImage: "/showcases/ready-yet.webp",
    showcaseScreen: "/references/ready-yet-screen.webp",
    logo: "/references/logos/ready-yet.webp",
    imageAlt: "Ready Yet? checklist screen rendered with fixture data.",
    mediaNote: "Synthetic Flutter preview from 1.0.3.",
    external: {
      repo: "https://github.com/FrancisGiann/ready-yet",
    },
  },
  {
    id: "arkhive",
    title: "Arkhive",
    category: "Android reader",
    headline: "Keep your reading library in one place.",
    description:
      "An Android reader for manga, webtoons, online novels, and local EPUB, PDF, and text files.",
    tech: ["Kotlin", "Jetpack Compose", "Android"],
    status: "wip",
    statusLabel: "Android prerelease",
    accent: "#6864a7",
    device: "phone",
    images: [],
    showcaseImage: "/showcases/arkhive.webp",
    showcaseScreen: "/references/arkhive-screen.webp",
    logo: "/references/logos/arkhive.webp",
    imageAlt: "Arkhive reading library using synthetic sample titles.",
    mediaNote: "Synthetic gallery preview from 0.4.0.",
    external: {
      repo: "https://github.com/FrancisGiann/Arkhive",
    },
  },
  {
    id: "defense-studio",
    title: "Defense Studio",
    category: "Thesis rehearsal workspace",
    headline: "Practice your defense with your paper in view.",
    description:
      "A local workspace for reviewing a thesis PDF, practising typed answers, and checking citations against source pages.",
    tech: ["React", "TypeScript", "Node.js", "SQLite"],
    status: "live",
    statusLabel: "Local app",
    accent: "#52727e",
    device: "browser",
    images: [],
    showcaseImage: "/showcases/defense-studio.webp",
    showcaseScreen: "/references/defense-studio-screen.webp",
    logo: "/references/logos/defense-studio.svg",
    imageAlt: "PanelReady rehearsal screen using a fictional teaching paper.",
    mediaNote: "Fictional teaching paper and synthetic answer; current brand is PanelReady.",
    external: {
      repo: "https://github.com/FrancisGiann/Defense-Studio",
    },
  },
  {
    id: "makko",
    title: "Makko",
    category: "Developer project tracker",
    headline: "Keep side projects moving.",
    description:
      "A personal tracker for side projects, tasks, bugs, and read-only GitHub activity. Supabase backend and web modules are in place; the Flutter Android client is in development.",
    tech: ["React", "TypeScript", "Flutter", "Supabase", "PostgreSQL"],
    status: "wip",
    statusLabel: "In development",
    accent: "#16a9bf",
    device: "browser",
    images: [],
    showcaseImage: "/showcases/makko.webp",
    showcaseScreen: "/references/makko-screen.webp",
    logo: "/references/logos/makko.webp",
    imageAlt: "Makko web sign-in screen from an existing static build.",
    mediaNote: "Web sign-in preview from an existing static build.",
    external: {
      repo: "https://github.com/FrancisGiann/makko",
    },
  },
  {
    id: "rko",
    title: "RKO",
    category: "Paper trading lab",
    headline: "Explore crypto strategies without real trades.",
    description:
      "A paper-trading workspace for testing crypto strategy ideas with local history. Paper trades only; no real-money execution.",
    tech: ["Python", "SQLite", "HTML", "CSS", "JavaScript"],
    status: "wip",
    statusLabel: "WIP · Paper trading",
    accent: "#b47b3c",
    device: "browser",
    images: [],
    showcaseImage: "/showcases/rko.webp",
    showcaseScreen: "/references/rko-screen.webp",
    imageAlt: "RKO paper-trading overview with no session or trade records.",
    mediaNote: "Offline diagnostic capture from v5.3; paper trades only.",
    external: {
      repo: "https://github.com/FrancisGiann/rko",
    },
  },
  {
    id: "flow-typing-workspace",
    title: "Flow",
    category: "Typing practice",
    headline: "Build speed with calm, focused practice.",
    description:
      "A typing workspace with Ghost Racer pacing, progress insights, weakness analysis, and targeted drills with offline fallbacks.",
    tech: ["React", "JavaScript", "Express", "SQLite", "Supabase", "OpenRouter"],
    status: "live",
    statusLabel: "Completed",
    accent: "#39806e",
    device: "browser",
    images: [],
    showcaseImage: "/showcases/flow-typing-workspace.webp",
    showcaseScreen: flowScreen,
    logo: "/references/logos/flow.webp",
    imageAlt: "Flow empty typing practice screen.",
    mediaNote: "Empty typing session capture with no user activity.",
    external: {
      repo: "https://github.com/FrancisGiann/Flow",
    },
  },
];

export const completedProjects = projects.filter((project) => project.status === "live");
export const liveProjects = completedProjects;
export const wipProjects = projects.filter((project) => project.status === "wip");

export function getProject(projectId: string) {
  return projects.find((project) => project.id === projectId);
}

export const profile = {
  name: "Francis Giann Empleo",
  role: "Full-Stack Developer",
  shortBio: "I build web and Android apps with React, Flutter, and backend tools.",
  longBio:
    "I build software across React, Flutter, and backend systems, from data and APIs to the interfaces people use. My projects include offline apps, clinic and school software, and developer tools.",
  email: "empleo.francisgiann@gmail.com",
  resumeHref: "/Francis-Giann-Empleo-Resume.pdf",
  github: "https://github.com/FrancisGiann",
  githubUsername: "FrancisGiann",
  linkedin: "https://www.linkedin.com/in/francisgiann/",
};

export const skillGroups: { label: string; skills: string[] }[] = [
  {
    label: "Languages",
    skills: ["TypeScript", "JavaScript", "Python", "PHP", "Java", "Dart", "Kotlin", "SQL"],
  },
  {
    label: "Frameworks",
    skills: ["React", "Flutter", "Node.js", "Express", "Vite", "Tailwind CSS", "Jetpack Compose"],
  },
  {
    label: "Data & tools",
    skills: ["PostgreSQL", "MariaDB", "SQLite", "Supabase", "Git", "GitHub Actions"],
  },
  {
    label: "AI & developer tools",
    skills: ["Gemini API", "OpenRouter", "OpenAI Codex", "Claude Code", "OpenCode"],
  },
];

export const nowItems: { label: string; text: string }[] = [
  {
    label: "Portfolio",
    text: "Refreshing this site with concise project notes and verified screenshots.",
  },
  {
    label: "Android",
    text: "Maintaining an offline budget tracker and developing a cross-format reader.",
  },
  {
    label: "Web & data",
    text: "Building a personal project tracker with React, Flutter, and Supabase.",
  },
];
