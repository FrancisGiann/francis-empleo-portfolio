import sevillaImg from "@/assets/project-sevilla1.webp";
import sevillaImg2 from "@/assets/project-sevilla2.webp";
import sevillaImg3 from "@/assets/project-sevilla3.webp";
import sevillaImg4 from "@/assets/project-sevilla4.webp";
import sevillaImg5 from "@/assets/project-sevilla5.webp";
import sevillaImg6 from "@/assets/project-sevilla6.webp";
import GeneralLunaImg from "@/assets/project-generalluna-1.webp";
import GeneralLunaImg2 from "@/assets/project-generalluna-2.webp";
import GeneralLunaImg3 from "@/assets/project-generalluna-3.webp";
import GeneralLunaImg4 from "@/assets/project-generalluna-4.webp";
import FlowImg1 from "@/assets/project-flow1.webp";
import FlowImg3 from "@/assets/project-flow3.webp";
import FlowImg4 from "@/assets/project-flow4.webp";
import KapeezImg1 from "@/assets/project-kapeez1.webp";
import KapeezImg2 from "@/assets/project-kapeez2.webp";
import KapeezImg3 from "@/assets/project-kapeez3.webp";
import KapeezImg4 from "@/assets/project-kapeez4.webp";
import KapeezImg5 from "@/assets/project-kapeez5.webp";
import KapeezImg6 from "@/assets/project-kapeez6.webp";



export interface Project {
  id: string;
  title: string;
  description: string;
  tech: string[];
  status: "live" | "wip";
  images: string[];
  imageAlt: string;
  /** Optional, verified links supplied when a project is ready to publish. */
  external?: {
    repo?: string;
    demo?: string;
  };
  role?: string;
  timeframe?: string;
  problem?: string;
  solution?: string;
  architecture?: {
    summary?: string;
    nodes: Array<{
      label: string;
      description: string;
    }>;
  };
  challenges?: string[];
  outcomes?: string[];
  technologyDecisions?: Array<{
    technology: string;
    rationale: string;
  }>;
  beforeAfter?: {
    before: string;
    after: string;
  };
  performanceNotes?: string[];
  timeline?: Array<{
    label: string;
    detail: string;
  }>;
  lessonsLearned?: string[];
}

export const projects: Project[] = [
  {
  id: "sevilla360",
  title: "Sevilla360",
  description: "A booking and virtual showroom site for M.I. Sevilla Resort. Guests can explore the place through a 360-degree tour and book rooms right from the same page.",
  tech: ["PHP", "MySQL", "JavaScript", "Panolens.js", "Node.js", "Redis"],
  status: "wip",
  images: [sevillaImg, sevillaImg2, sevillaImg3, sevillaImg4, sevillaImg5, sevillaImg6],
  imageAlt: "Sevilla360 virtual showroom and online booking interface",
  external: {
    repo: "https://github.com/FrancisGiann/Sevilla360"
  },
  role: "Full Stack Developer",
  problem: "Guests lacked a way to digitally explore the resort before booking, and the resort needed an integrated platform for online reservations and administrative management.",
  solution: "Developed an interactive digital experience using Panolens.js for 360-degree virtual tours seamlessly integrated with a custom online booking system and admin dashboards.",
  architecture: {
    summary: "A PHP/MySQL backend that serves responsive HTML/JS clients, with an optional Node.js/Redis real-time WebSocket notification gateway.",
    nodes: [
      {
        label: "Frontend Client",
        description: "Browser-based interface featuring a Panolens.js 360-degree interactive tour, responsive layouts, and short-polling fallback logic."
      },
      {
        label: "PHP Application Server",
        description: "Handles core business logic, session management, secure Google OAuth verification, and authoritative PDF receipt generation via Dompdf."
      },
      {
        label: "MySQL Database",
        description: "Primary relational data store for user accounts, bookings, and configuration data."
      },
      {
        label: "Real-time Gateway",
        description: "Optional Node.js service utilizing Redis Pub/Sub for deployment-grade WebSocket notifications."
      }
    ]
  },
  challenges: [
    "Generating secure server-side A4 PDF receipts with Dompdf without exposing the server to remote resource execution vulnerabilities.",
    "Designing an optional, secure real-time notification gateway with Node.js and Redis that gracefully falls back to authenticated short-polling.",
    "Integrating Google OAuth securely to rigorously verify ID tokens and link accounts without exposing administrative roles."
  ],
  outcomes: [
    "Successfully delivered an immersive virtual showroom with clickable navigation hotspots.",
    "Implemented a highly secure authentication and booking flow with robust, automated server-side backup protections."
  ],
  technologyDecisions: [
    {
      technology: "Panolens.js",
      rationale: "Selected to power the interactive 360-degree environments and built-in navigation hotspots natively in the browser."
    },
    {
      technology: "Dompdf",
      rationale: "Used for generating immutable offline PDF receipts server-side while maintaining strict execution security controls."
    },
    {
      technology: "Node.js & Redis",
      rationale: "Chosen for the real-time gateway extension to efficiently manage concurrent WebSocket connections and Pub/Sub messaging."
    }
  ],
  performanceNotes: [
    "Client-side real-time logic utilizes bounded event deduplication and intelligent backoff reconnects to maintain WebSocket stability.",
    "Browser history and navigation state are managed explicitly via replaceState to prevent unwanted form resubmissions and ensure clean state transitions."
  ]
},
  {
  id: "general-luna-game",
  title: "General Luna Game",
  description: "A 2D fighting game built in Java with a main menu, character select, boss fights, and real-time combat. Made as a final class project.",
  tech: ["Java", "JavaFX", "Object-Oriented Programming (OOP)", "Git"],
  status: "live",
  images: [GeneralLunaImg, GeneralLunaImg2, GeneralLunaImg3, GeneralLunaImg4],
  imageAlt: "Screenshots showcasing General Luna Game's menus and gameplay",
  external: {
    repo: "https://github.com/FrancisGiann/GeneralLunaGame"
  },
  role: "Team Lead and Lead Developer",
  timeframe: "Final Project Term",
  problem: "We needed to build a comprehensive final project that practically demonstrated advanced object-oriented programming concepts like inheritance and state management.",
  solution: "I led the development of a real-time 2D fighting game utilizing JavaFX and strict OOP principles to handle player controls, collision detection, and UI state.",
  architecture: {
    summary: "The application relies on JavaFX for rendering, utilizing an MVC pattern for the menu screens and a dedicated game loop for real-time play.",
    nodes: [
      {
        label: "Game Loop",
        description: "Continuously updates game state, player movement, hitboxes, and particle effects."
      },
      {
        label: "UI Controllers",
        description: "JavaFX FXML controllers manage views for character selection, shop, leaderboard, and menus."
      },
      {
        label: "Entity System",
        description: "Object-oriented models encapsulate distinct properties and behaviors for the Hero, Enemies, Boss, and Projectiles."
      }
    ]
  },
  challenges: [
    "Synchronizing the real-time game loop with JavaFX's UI rendering thread to maintain smooth performance.",
    "Implementing precise collision detection between varied character hitboxes and projectiles.",
    "Leading the team and integrating different components under an academic deadline."
  ],
  outcomes: [
    "Delivered a fully functional game with custom visuals, sound integration, and a working shop/leaderboard system.",
    "Successfully demonstrated complex OOP principles, fulfilling all requirements for the final class project."
  ],
  technologyDecisions: [
    {
      technology: "JavaFX",
      rationale: "Provided a more modern scene graph and FXML controller structure for building the game's UI compared to Swing."
    },
    {
      technology: "OOP Architecture",
      rationale: "Allowed for reusable and extensible entity models, simplifying the addition of new enemies and items."
    }
  ],
  lessonsLearned: [
    "Learned to effectively manage project scope and delegate tasks as a team lead.",
    "Gained practical experience handling continuous game loops and real-time state in a UI-based framework."
  ]
},
  {
  id: "flow-typing-workspace",
  title: "Flow — Quiet Precision Typing",
  description: "A clean typing app built for focused practice. Features ghost pacing, works offline, and uses AI to generate custom drills based on your weak points.",
  tech: [
    "React",
    "JavaScript",
    "Node.js",
    "Express",
    "SQLite",
    "Supabase",
    "Tailwind CSS",
    "Vite",
    "OpenRouter"
  ],
  status: "live",
  images: [
    FlowImg1,
    FlowImg3,
    FlowImg4
  ],
  imageAlt: "Flow typing practice application showcasing the distraction-free UI, Ghost Racer pacing, and progress dashboard.",
  external: {
    repo: "https://github.com/FrancisGiann/Flow"
  },
  role: "Full Stack Developer",
  problem: "Most typing platforms are cluttered with ads and leaderboards, require constant internet connectivity, and fail to provide intelligent, personalized feedback to correct specific typing weaknesses.",
  solution: "Built a minimalist, offline-capable workspace that tracks high-fidelity metrics in real-time, features an adjustable ghost pacing opponent, and uses AI to dynamically generate practice drills based on user error patterns.",
  architecture: {
    summary: "A local-first application using a React/Vite SPA for the frontend and a Node.js/Express backend. Data is primarily managed locally via SQLite for zero-latency performance and synced to Supabase.",
    nodes: [
      {
        label: "Frontend Application",
        description: "React SPA with Tailwind CSS, utilizing versioned static caching for an installable offline app shell experience."
      },
      {
        label: "Backend Server",
        description: "Node.js and Express API handling local practice queues, caching, and securely proxying external OpenRouter LLM requests."
      },
      {
        label: "Data & Sync Layer",
        description: "Better-SQLite3 for synchronous, high-performance local persistence, integrated with Supabase for cloud synchronization and backup."
      },
      {
        label: "AI Engine",
        description: "OpenRouter API integration for generating personalized weakness-targeting drills with graceful offline fallbacks."
      }
    ]
  },
  challenges: [
    "Optimizing React render cycles to maintain perfectly responsive, zero-latency caret movement and active-word breathline feedback during high-speed typing.",
    "Designing a robust local-first practice queue capable of deduplicating weak spots and falling back to in-memory/SQLite states when the network is unavailable.",
    "Tuning the Ghost Racer opponent pacing algorithm to provide realistic and adjustable competition without overwhelming the user."
  ],
  outcomes: [
    "Successfully delivered a highly responsive, accessible typing environment with custom themes and optional focus sounds.",
    "Created an automated progression dashboard that highlights weaknesses, graphs speed metrics, and provides actionable AI coaching.",
    "Maintained strict data portability and offline reliability via the hybrid SQLite and Supabase architecture."
  ],
  technologyDecisions: [
    {
      technology: "Better-SQLite3 & Supabase",
      rationale: "Selected to guarantee fast local database operations essential for real-time metric tracking, while still offering cross-device cloud synchronization."
    },
    {
      technology: "Vite & React",
      rationale: "Chosen for rapid development iteration and efficient bundling required for a performant, installable offline production app shell."
    },
    {
      technology: "OpenRouter",
      rationale: "Enabled flexible API access to varied LLMs for generating intelligent, targeted error-correction drills without vendor lock-in."
    }
  ],
  performanceNotes: [
    "Used network-only API patterns alongside versioned static asset caching to minimize load times and ensure functionality without an internet connection.",
    "Memoized high-frequency keystroke event listeners to prevent unnecessary re-renders of the surrounding progress dashboard and UI components."
  ],
  lessonsLearned: [
    "Managing state for millisecond-level interactions requires careful decoupling of visual feedback (like the caret) from heavier dashboard computations.",
    "Building offline-first applications introduces significant complexity in queue management, but massively improves the core user experience for focused utility apps."
  ]
},
  {
  id: "kapeez-cafe-pos",
  title: "Kapeez",
  description: "An offline-first Point of Sale (POS) app for cafes. Handles drink modifiers, auto-decrements inventory ingredients, and manages shift reports without needing a backend or internet connection.",
  tech: [
    "React 19",
    "TypeScript",
    "Tailwind CSS v4",
    "Vite",
    "Recharts"
  ],
  status: "live",
  images: [
    KapeezImg1,
    KapeezImg2,
    KapeezImg3,
    KapeezImg4,
    KapeezImg5,
    KapeezImg6
  ],
  imageAlt: "Screenshots of the Kapeez POS terminal, analytics, and authentication interfaces",
  external: {
    repo: "https://github.com/FrancisGiann/Kapeez"
  },
  role: "Full Stack Engineer",
  problem: "Legacy POS systems often require complex cloud configurations, internet reliance, and extensive backend setup, which can severely disrupt cafe operations during network outages.",
  solution: "Engineered an offline-first web application that persists all menu, inventory, shift, and order data directly in the browser, ensuring zero setup time and completely uninterrupted offline service.",
  architecture: {
    summary: "Offline-First / Local-First architecture relying completely on client-side storage to eliminate the need for a traditional backend or internet connection.",
    nodes: [
      {
        label: "Frontend UI",
        description: "React 19 paired with Tailwind CSS v4 and Vite for blazing-fast performance and dynamic UI generation from structured catalog data."
      },
      {
        label: "Local Storage Engine",
        description: "Browser localStorage utilized as a serverless database to instantly persist all application state including shifts, orders, and ingredient stock."
      }
    ]
  },
  challenges: [
    "Architecting a dynamic modifier engine capable of handling complex rules (Required/Optional, Multi-select/Single-select) for highly customizable cafe drinks.",
    "Designing a smart inventory engine that accurately maps custom orders and their specific modifiers to precise ingredient deductions in real-time."
  ],
  outcomes: [
    "Successfully migrated a legacy JavaFX desktop prototype to a modern, performant web stack.",
    "Delivered a zero-setup POS system that can be deployed instantly on any device with a web browser.",
    "Built a comprehensive real-time reporting dashboard for managers tracking KPIs, sales trends, and top performers."
  ],
  technologyDecisions: [
    {
      technology: "Browser localStorage",
      rationale: "Selected to guarantee an offline-first environment, allowing the POS to function reliably without any backend infrastructure or network connectivity."
    },
    {
      technology: "Recharts",
      rationale: "Integrated to provide clean, customizable pie and bar charts for real-time sales trends and revenue visualization on the manager dashboard."
    }
  ],
  beforeAfter: {
    before: "A basic, legacy JavaFX desktop prototype.",
    after: "A modern, zero-cloud web application with role-based auth, smart inventory mapping, and real-time analytics."
  },
  timeline: [
    {
      label: "Phase 1",
      detail: "Core Order & Checkout (Smart cart, Modifier Engine, Checkout Math)"
    },
    {
      label: "Phase 2",
      detail: "Staff & Shifts (Role-based Auth, Register Opening/Closing)"
    },
    {
      label: "Phase 3",
      detail: "Smart Inventory Engine (Ingredient Mapping, Auto-Decrementing Stock)"
    },
    {
      label: "Phase 4",
      detail: "Reports & Analytics (KPI Tracking, Visualizations, Top Performers)"
    }
  ]
},
];

export const liveProjects = projects.filter((p) => p.status === "live");
export const wipProjects = projects.filter((p) => p.status === "wip");

export function getProject(projectId: string) {
  return projects.find((project) => project.id === projectId);
}

export const profile = {
  name: "Francis Giann Empleo",
  role: "Full-Stack Developer",
  shortBio:
    "I like building things for the web — everything from the database all the way up to the pixels on screen. I'm big on writing clean code, keeping things fast, and making sure the UI just works.",
  longBio:
    "I'm an IT graduate who genuinely likes working across the full stack. I'll design the database, set up the API, then spend way too long tweaking the UI until it feels right. I'm drawn to the kind of work where you have to balance speed, reliability, and how things look and feel. Currently getting deeper into TypeScript, cloud stuff on AWS, and playing around with 3D on the web.",
  email: "francisgiann25@gmail.com",
  github: "https://github.com/FrancisGiann",
  githubUsername: "FrancisGiann",
  linkedin: "https://www.linkedin.com/in/francisgiann/",
};

export const skillGroups: { label: string; skills: string[] }[] = [
  { label: "Languages", skills: ["JavaScript", "TypeScript", "Python", "Java", "C#", "PHP", "CSS"] },
  { label: "Frameworks", skills: ["React", "Node.js", "Express", "Tailwind CSS"] },
  { label: "Tools & Databases", skills: ["Git", "AWS", "MySQL", "SQLite", "Supabase"] },
];

export const nowItems: { label: string; text: string }[] = [
  {
    label: "Learning",
    text: "Getting into Three.js and WebGL shaders — trying to move past flat UIs and build some actual 3D stuff on the web.",
  },
  {
    label: "Building",
    text: "This portfolio you're looking at, and HabitGrid — an offline-first habit tracker with a streak grid.",
  },
  {
    label: "Exploring",
    text: "Cloud architecture on AWS and figuring out how to build APIs that don't fall over under real traffic.",
  },
];
