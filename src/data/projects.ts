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
  /** Legacy field retained for compatibility; cover and gallery images are separate. */
  images: string[];
  /** Distinct application screens; branded cover images never belong here. */
  screenshots: ProjectScreenshot[];
  /** Brief public context for gallery data, versions, or capture coverage. */
  coverageNote?: string;
  /** Short, evidence-backed summary of this contributor's work. */
  contribution: string;
  /** Concrete features that make the project useful. */
  features: string[];
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

export interface ProjectScreenshot {
  src: string;
  alt: string;
  caption: string;
}

export const projects: Project[] = [
  {
    id: "sevilla360",
    title: "Sevilla360",
    category: "Resort website",
    headline: "Explore the resort before you book.",
    description:
      "Sevilla360 is a resort website for M.I. Sevilla Resort that helps guests review accommodations, event venues, availability, and the property through an interactive 360° showroom before submitting a reservation. Its booking flow captures venue and date selections, guest details, and payment information for staff review, while separate guest and admin areas support account access and booking management. A content management system lets resort staff update site information, and the public experience includes accessibility improvements.",
    tech: ["PHP", "MariaDB", "JavaScript", "Panolens.js"],
    status: "live",
    statusLabel: "Completed · Live",
    accent: "#997745",
    device: "browser",
    images: [],
    screenshots: [
      {
        src: "/references/gallery/sevilla-booking.webp",
        alt: "Public Sevilla360 booking flow with event hall selection.",
        caption: "Choose a venue and begin a booking request.",
      },
      {
        src: "/references/gallery/sevilla-venue-inquiry.webp",
        alt: "Public event-date inquiry screen for Abelardo Hall.",
        caption: "Review event dates for Abelardo Hall.",
      },
      {
        src: "/references/gallery/sevilla-accommodations.webp",
        alt: "Public resort accommodations and event-space listing.",
        caption: "Browse resort accommodations and event spaces.",
      },
    ],
    coverageNote: "Booking and venue screens; the 360° tour is not pictured.",
    contribution: "360° showroom, booking, and staff-reviewed payment workflows.",
    features: [
      "Explore resort spaces through an interactive 360° panorama.",
      "Submit booking requests and payment proof for staff review.",
      "Staff can review and finalize booking and payment records.",
    ],
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
    description:
      "HealthMate+ is a campus clinic management system for student health visits and records, serving guardians, nurses, and administrators. Guardian accounts can request links to student records, submit health information or appointment requests, and follow review status; nurses validate submissions, record visits, manage scheduling, and review incident reports. Administrative tools cover user access, clinic inventory, reports, and audit history, keeping record changes within role-controlled workflows.",
    tech: ["React", "Vite", "Express", "PostgreSQL"],
    status: "live",
    statusLabel: "Live website",
    accent: "#1b3d68",
    device: "browser",
    images: [],
    screenshots: [
      {
        src: "/references/gallery/healthmate-review-queue.webp",
        alt: "HealthMate clinic review queue with demo records.",
        caption: "Review submission status in the clinic queue. Demo data.",
      },
      {
        src: "/references/gallery/healthmate-review-open.webp",
        alt: "HealthMate health-record submission review with demo data.",
        caption: "Review a health-record submission and document status. Demo data.",
      },
      {
        src: "/references/gallery/healthmate-paper-picker.webp",
        alt: "HealthMate paper-transcription student selector with demo data.",
        caption: "Select a student for paper transcription. Demo data.",
      },
    ],
    coverageNote: "Demo records only; these captures do not show live clinic data.",
    contribution: "Role-guarded clinic visits and guardian-to-nurse health-record review.",
    features: [
      "Record clinic visits with role-based access controls.",
      "Route guardian health-record requests to nurses for review.",
      "Manage appointment availability and visit scheduling.",
    ],
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
      "ARKTIESIIS centralizes learner profiles, enrollment history, academic records, school documents, and finance records for school staff, with a student portal for personal read-only records. Front-desk staff capture paper pre-enrollment details, registrars review documents and placements and approve teacher-submitted grade records, while Finance manages assessments and payments before enrollment is finalized. Report-card uploads can receive a limited name and file-format precheck, but staff retain the final document and record decisions.",
    tech: ["Node.js", "Express", "EJS", "MariaDB", "Gemini"],
    status: "live",
    statusLabel: "Live website",
    accent: "#9d293c",
    device: "browser",
    images: [],
    screenshots: [
      {
        src: "/references/gallery/arktiesiis-registrar.webp",
        alt: "ARKTIESIIS registrar enrollment overview with synthetic aggregate counts.",
        caption: "Registrar enrollment overview — demo data.",
      },
      {
        src: "/references/gallery/arktiesiis-student.webp",
        alt: "ARKTIESIIS student records and document statuses with synthetic data.",
        caption: "Student records and document status — demo data.",
      },
    ],
    coverageNote: "Demo data.",
    contribution: "Enrollment and finance review, grade imports, and bounded document checks.",
    features: [
      "Route enrollment and finance decisions through staff review.",
      "Import grades for registrar approval.",
      "Use AI-assisted name and field checks as staff-reviewed prechecks.",
    ],
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
      "PonPon is an offline Android ledger for people who want to track cash and e-wallet balances without linking bank accounts or moving money. It stores manually entered income, expenses, and wallet-to-wallet transfers, with active-wallet totals, transaction history, category breakdowns, and monthly spending budgets. Users can also configure scheduled allowance entries and add records from home-screen or quick-entry widgets; all figures come from the local ledger rather than linked account balances.",
    tech: ["Flutter", "Dart", "Kotlin"],
    status: "live",
    statusLabel: "Android app",
    accent: "#8a5573",
    device: "phone",
    images: [],
    screenshots: [
      {
        src: "/references/gallery/ponpon-history.webp",
        alt: "PonPon transaction history with synthetic entries.",
        caption: "Filter income, expense, and transfer entries by type or category. Demo data.",
      },
      {
        src: "/references/gallery/ponpon-plan.webp",
        alt: "PonPon monthly budget plan with synthetic totals.",
        caption: "Review monthly spending limits and category totals. Demo data.",
      },
      {
        src: "/references/gallery/ponpon-allowance.webp",
        alt: "PonPon scheduled allowance settings with synthetic values.",
        caption: "Set an allowance amount, wallet, start date, and weekdays. Demo data.",
      },
      {
        src: "/references/gallery/ponpon-transfer.webp",
        alt: "PonPon wallet-to-wallet transfer form with synthetic values.",
        caption: "Record a transfer between two wallets. Demo data.",
      },
      {
        src: "/references/gallery/ponpon-settings.webp",
        alt: "PonPon settings for wallets, bills, categories, widgets, and appearance.",
        caption: "Manage wallet, allowance, bill, category, widget, and appearance settings.",
      },
    ],
    coverageNote: "Demo wallet data; no bank or e-wallet accounts are connected.",
    contribution: "Offline ledger flows, budgets, and Android quick-entry widgets.",
    features: [
      "Track manually entered wallets, income, expenses, and transfers offline.",
      "Set budgets and review spending by category.",
      "Add entries from Android quick-entry and balance widgets.",
    ],
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
      "Ready Yet? is an offline Android checklist for preparing recurring outings such as school, work, gym, and trips. Reusable packing lists feed separate checklists for each outing, so edits to a template do not overwrite a plan already underway; weekday schedules can create daily lists and send optional departure reminders. Home-screen widgets show today’s list progress and let people check items or open the list directly, while unfinished and dismissed outings remain available to resume or restore.",
    tech: ["Flutter", "Dart", "Kotlin"],
    status: "live",
    statusLabel: "Android app",
    accent: "#718c32",
    device: "phone",
    images: [],
    screenshots: [
      {
        src: "/references/gallery/ready-yet-pack.webp",
        alt: "Ready Yet? packing checklist with generic test items.",
        caption: "Check items off a reusable packing list and finish the outing checklist.",
      },
      {
        src: "/references/gallery/ready-yet-history.webp",
        alt: "Ready Yet? dismissed outing history with generic fixture items.",
        caption: "Review a dismissed outing and restore it to the active list.",
      },
      {
        src: "/references/gallery/ready-yet-settings.webp",
        alt: "Ready Yet? schedule, theme, and widget settings.",
        caption: "Adjust outing schedules, theme, and widget preferences.",
      },
    ],
    coverageNote: "Flutter QA render from 1.0.2; not a device screenshot of the 1.0.6+7 release.",
    contribution: "Reusable packing lists, outing reminders, and home-screen widgets.",
    features: [
      "Reuse packing lists and checklists for planned outings.",
      "Schedule reminders for upcoming plans.",
      "Check list progress from Android home-screen widgets.",
    ],
    showcaseImage: "/showcases/ready-yet.webp",
    showcaseScreen: "/references/ready-yet-screen.webp",
    logo: "/references/logos/ready-yet.webp",
    imageAlt: "Ready Yet? checklist screen rendered with fixture data.",
    mediaNote: "Flutter test-engine render · 1.0.2 QA capture set; not a device screenshot.",
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
      "Arkhive is an Android reading library for manga, webtoons, and novels from supported online sources, alongside books imported as EPUB, PDF, or text files. A unified library organizes titles and chapters, while format-specific readers track progress and bookmarks; manga readers support page or vertical reading, and saved chapters can be queued for offline access. The project also includes source browsing and a separate catalog and discovery area for identifying books and editions.",
    tech: ["Kotlin", "Jetpack Compose", "Android"],
    status: "wip",
    statusLabel: "Android prerelease",
    accent: "#6864a7",
    device: "phone",
    images: [],
    screenshots: [
      {
        src: "/references/gallery/arkhive-local-chapters.webp",
        alt: "Arkhive local chapter list with demo content.",
        caption: "Browse chapters from a local title. Demo data.",
      },
      {
        src: "/references/gallery/arkhive-manga-chapters.webp",
        alt: "Arkhive manga chapter list with demo content.",
        caption: "Choose a chapter from a manga title. Demo data.",
      },
      {
        src: "/references/gallery/arkhive-manga-reader.webp",
        alt: "Arkhive manga reader showing demo pages.",
        caption: "Read pages from a manga title. Demo data.",
      },
      {
        src: "/references/gallery/arkhive-webtoon-reader.webp",
        alt: "Arkhive webtoon reader showing demo panels.",
        caption: "Read a webtoon in the vertical reader. Demo data.",
      },
      {
        src: "/references/gallery/arkhive-novel-reader.webp",
        alt: "Arkhive novel reader showing demo text.",
        caption: "Read a locally stored novel. Demo data.",
      },
    ],
    coverageNote: "Self-authored Originals demo screens from the 0.4.0 preview.",
    contribution: "Ongoing reader and library work for online titles and local files.",
    features: [
      "Organize manga, webtoons, online novels, and local books in one library.",
      "Read supported EPUB, PDF, and text files on Android.",
    ],
    showcaseImage: "/showcases/arkhive.webp",
    showcaseScreen: "/references/arkhive-screen.webp",
    logo: "/references/logos/arkhive.webp",
    imageAlt: "Arkhive reading library using synthetic sample titles.",
    mediaNote: "Self-authored Originals demo screen.",
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
      "Defense Studio, now branded PanelReady, is a local thesis-defense rehearsal workspace for students preparing to present a research paper. It lets students read an uploaded PDF, practise typed answers in guided or timed mock-defense sessions, and revisit answers, feedback, and focus areas beside the cited source pages. Citation controls point to retained excerpts in the selected document; optional AI coaching requires session consent, and papers and rehearsal records stay in the local workspace.",
    tech: ["React", "TypeScript", "Node.js", "SQLite"],
    status: "live",
    statusLabel: "Local app",
    accent: "#52727e",
    device: "browser",
    images: [],
    screenshots: [
      {
        src: "/references/gallery/panelready-source.webp",
        alt: "PanelReady source excerpt and page navigation for a sample paper.",
        caption: "Review a sample paper excerpt and navigate its pages.",
      },
      {
        src: "/references/gallery/panelready-feedback.webp",
        alt: "PanelReady practice feedback alongside a sample source excerpt.",
        caption: "Review practice feedback alongside the source excerpt.",
      },
      {
        src: "/references/gallery/panelready-report.webp",
        alt: "PanelReady practice report with sample question and answer content.",
        caption: "Revisit a report with the practice question, answer, and feedback.",
      },
    ],
    contribution: "PDF-grounded rehearsal, typed practice answers, and source-page checks.",
    features: [
      "Review a thesis PDF while preparing practice answers.",
      "Check citations against pages in the selected source document.",
      "Keep rehearsal data in a local workspace.",
    ],
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
    id: "rko",
    title: "RKO",
    category: "Paper trading lab",
    headline: "Explore crypto strategies without real trades.",
    description:
      "RKO is a local research dashboard for examining cryptocurrency strategy rules in paper-only workflows. Its historical view summarizes results from previously inspected Binance BTC and ETH price history, including return, drawdown, exposure, and trade counts; those retrospective experiments have not produced a selected strategy. A separate timed forward-paper cohort simulates USD positions against fresh public quotes under a server-enforced duration limit, distinct from the historical analysis; the app has no exchange-order path and does not execute real-money trades.",
    tech: ["Python", "SQLite", "HTML", "CSS", "JavaScript"],
    status: "wip",
    statusLabel: "WIP · Paper trading",
    accent: "#b47b3c",
    device: "browser",
    images: [],
    screenshots: [
      {
        src: "/references/gallery/rko-v5_1-overview.png",
        alt: "RKO v5.1 historical strategy comparison with a notice that no candidate was selected.",
        caption: "Compare fixed strategy rules on previously inspected history; no candidate was selected.",
      },
      {
        src: "/references/gallery/rko-v5_1-forward-review.png",
        alt: "RKO timed paper-session review showing a one-minute duration and zero trades expected.",
        caption: "Review a timed paper session before starting; the one-minute QA run ended with no fills or positions.",
      },
    ],
    coverageNote:
      "V5.1 captures: historical results reuse already-inspected market data and no strategy was selected. The one-minute timed-session QA ended with no fills or positions.",
    contribution: "Requirements, UX iteration, and AI-assisted paper-trading prototypes.",
    features: [
      "Explore strategy ideas with paper trades only.",
      "Review local history without connecting to a live exchange.",
      "No real-money execution is available.",
    ],
    showcaseScreen: "/references/gallery/rko-v5_1-overview.png",
    imageAlt: "RKO v5.1 historical strategy comparison using previously inspected data.",
    mediaNote:
      "V5.1 historical results reuse already-inspected market data; no candidate was selected. The timed paper-session screenshot shows a one-minute QA flow that ended with no fills or positions. No exchange orders are placed.",
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
      "Flow is a typing-practice workspace for people building speed and accuracy through short, repeatable sessions. Timed passage lessons report words per minute and accuracy, while optional Ghost Racer pacing provides a moving target during practice. Session history and a progress dashboard surface recurring key and character-pattern errors, then assemble focused drills from saved content or offline fallback passages when network or AI services are unavailable.",
    tech: ["React", "JavaScript", "Express", "SQLite", "Supabase", "OpenRouter"],
    status: "live",
    statusLabel: "Completed",
    accent: "#39806e",
    device: "browser",
    images: [],
    screenshots: [
      {
        src: "/references/gallery/flow-settings.webp",
        alt: "Flow practice settings and daily goals controls in a guest profile.",
        caption: "Adjust practice settings and daily goals in the guest profile.",
      },
      {
        src: "/references/gallery/flow-dashboard.webp",
        alt: "Flow empty guest progress dashboard with no sessions or user records.",
        caption: "Empty guest dashboard with no typing sessions or user records.",
      },
    ],
    coverageNote: "Offline guest captures from an existing build that may predate current source.",
    contribution: "Typing practice, progress insights, and targeted drills.",
    features: [
      "Practice with Ghost Racer pacing and offline fallback text.",
      "Review progress and areas that need more practice.",
      "Use targeted drills for identified typing weaknesses.",
    ],
    showcaseImage: "/showcases/flow-typing-workspace.webp",
    showcaseScreen: flowScreen,
    logo: "/references/logos/flow.webp",
    imageAlt: "Flow empty typing practice screen.",
    mediaNote: "Empty typing practice screen.",
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
  shortBio:
    "I’m an IT student who designs and builds websites and Android apps.",
  longBio:
    "My work includes resort booking websites, clinic appointment systems, and Android apps for budgeting and planning.",
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
];
