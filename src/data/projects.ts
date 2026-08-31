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
    description:
      "A booking and virtual showroom website for M.I. Sevilla Resort. Guests can explore the resort through a 360-degree tour, check available dates, and make reservations online.",
    tech: ["PHP", "MySQL", "JavaScript", "Panolens.js", "Node.js", "Redis"],
    status: "wip",
    images: [
      sevillaImg,
      sevillaImg2,
      sevillaImg3,
      sevillaImg4,
      sevillaImg5,
      sevillaImg6
    ],
    imageAlt: "Sevilla360 virtual showroom and online booking interface",
    external: {
      repo: "https://github.com/FrancisGiann/Sevilla360"
    },
    role: "Full Stack Developer",
    problem:
      "The resort mainly handled inquiries and bookings manually. Guests also had no easy way to look around the resort online before deciding to book.",
    solution:
      "I built a website that combines a 360-degree virtual tour with an online booking system. Guests can explore the resort, check dates, and send a booking request, while staff can manage reservations from an admin dashboard.",
    architecture: {
      summary:
        "The main system uses PHP and MySQL, with JavaScript handling the interactive parts of the website. A Node.js and Redis setup can also be used for real-time notifications.",
      nodes: [
        {
          label: "Frontend Client",
          description:
            "The main website interface where guests can explore the 360-degree tour, check booking dates, and manage their reservations."
        },
        {
          label: "PHP Application Server",
          description:
            "Handles authentication, bookings, user sessions, Google sign in, business rules, and PDF receipt generation."
        },
        {
          label: "MySQL Database",
          description:
            "Stores users, customer information, bookings, venue data, payments, and other system records."
        },
        {
          label: "Real-time Gateway",
          description:
            "An optional Node.js and Redis service used for WebSocket notifications, with regular polling available as a fallback."
        }
      ]
    },
    challenges: [
      "Creating PDF booking receipts on the server while keeping the process secure.",
      "Adding real-time notifications without making them required for the rest of the booking system to work.",
      "Setting up Google sign in while making sure user roles and account data are handled correctly."
    ],
    outcomes: [
      "Built a working 360-degree virtual showroom with clickable hotspots for moving around the resort.",
      "Created the main booking flow, customer accounts, admin tools, authentication, and booking management features."
    ],
    technologyDecisions: [
      {
        technology: "Panolens.js",
        rationale:
          "I used Panolens.js because it made it possible to create interactive 360-degree scenes and navigation hotspots directly in the browser."
      },
      {
        technology: "Dompdf",
        rationale:
          "I used Dompdf to generate booking receipts as PDF files on the server."
      },
      {
        technology: "Node.js & Redis",
        rationale:
          "I added Node.js and Redis as an optional way to handle real-time notifications using WebSockets."
      }
    ],
    performanceNotes: [
      "The notification system includes reconnect handling and duplicate event checks to avoid showing the same notification more than once.",
      "Browser history is handled carefully so refreshing or going back does not accidentally submit forms again."
    ]
  },

  {
    id: "general-luna-game",
    title: "General Luna Game",
    description:
      "A 2D fighting game made in JavaFX for a school final project. It includes character selection, boss fights, a shop, leaderboard, and real-time combat.",
    tech: ["Java", "JavaFX", "Object-Oriented Programming (OOP)", "Git"],
    status: "live",
    images: [
      GeneralLunaImg,
      GeneralLunaImg2,
      GeneralLunaImg3,
      GeneralLunaImg4
    ],
    imageAlt: "Screenshots showcasing General Luna Game's menus and gameplay",
    external: {
      repo: "https://github.com/FrancisGiann/GeneralLunaGame"
    },
    role: "Team Lead and Lead Developer",
    timeframe: "Final Project Term",
    problem:
      "For our final project, we needed to create an application that showed our understanding of Java and object-oriented programming while still being challenging enough for a group project.",
    solution:
      "Our group decided to build a 2D fighting game. I led the development and worked on the main game systems, including movement, combat, enemies, menus, and game state.",
    architecture: {
      summary:
        "The game uses JavaFX for the interface and rendering, with separate classes for characters, enemies, projectiles, menus, and gameplay logic.",
      nodes: [
        {
          label: "Game Loop",
          description:
            "Updates player movement, enemies, attacks, collisions, animations, and other gameplay events."
        },
        {
          label: "UI Controllers",
          description:
            "JavaFX controllers manage screens such as the main menu, character selection, shop, and leaderboard."
        },
        {
          label: "Entity System",
          description:
            "Separate classes are used for the player, enemies, bosses, projectiles, and other game objects."
        }
      ]
    },
    challenges: [
      "Keeping the game loop smooth while JavaFX was also updating the interface.",
      "Getting collision detection and attack hitboxes to feel consistent during combat.",
      "Combining work from different team members while keeping the project working before the deadline."
    ],
    outcomes: [
      "Finished a playable fighting game with multiple screens, combat, sound, a shop, and a leaderboard.",
      "Used object-oriented programming in a larger project instead of only using it in small exercises."
    ],
    technologyDecisions: [
      {
        technology: "JavaFX",
        rationale:
          "We used JavaFX because it gave us better tools for scenes, controls, animations, and interface design for the game."
      },
      {
        technology: "OOP Architecture",
        rationale:
          "Using separate classes for game objects made the code easier to organize and made it simpler to add more enemies and features."
      }
    ],
    lessonsLearned: [
      "I learned how important it is to divide tasks properly when working as a team lead.",
      "I also learned more about game loops, collision detection, state management, and organizing a larger Java project."
    ]
  },

  {
    id: "flow-typing-workspace",
    title: "Flow",
    description:
      "A focused typing practice app with offline support, a ghost racer, progress tracking, and AI generated drills based on the keys and words you struggle with.",
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
    images: [FlowImg1, FlowImg3, FlowImg4],
    imageAlt:
      "Flow typing practice application showing the typing interface, Ghost Racer, and progress dashboard",
    external: {
      repo: "https://github.com/FrancisGiann/Flow"
    },
    role: "Full Stack Developer",
    problem:
      "A lot of typing websites have distracting interfaces or focus mostly on scores and leaderboards. I wanted something simpler that could also help users practice the mistakes they actually make.",
    solution:
      "I built Flow as a focused typing workspace that tracks typing mistakes, speed, and accuracy. It can create practice drills from weak areas and also includes a ghost racer that gives users a pace to follow.",
    architecture: {
      summary:
        "Flow uses React for the frontend and Node.js with Express for the backend. SQLite handles local data, while Supabase can be used for syncing data across devices.",
      nodes: [
        {
          label: "Frontend Application",
          description:
            "A React interface for typing tests, practice sessions, settings, statistics, and the Ghost Racer."
        },
        {
          label: "Backend Server",
          description:
            "An Express API used for application logic and for sending AI requests without exposing API keys in the frontend."
        },
        {
          label: "Data & Sync Layer",
          description:
            "SQLite stores local data for fast access, while Supabase is used for cloud storage and syncing."
        },
        {
          label: "AI Engine",
          description:
            "OpenRouter is used to create custom typing drills based on the user's common mistakes."
        }
      ]
    },
    challenges: [
      "Keeping typing input responsive while updating accuracy, speed, the caret, and other information at the same time.",
      "Making local data work properly even when there is no internet connection.",
      "Making the Ghost Racer feel useful without distracting the user from normal typing practice."
    ],
    outcomes: [
      "Built a distraction-free typing interface that works well for both short tests and longer practice sessions.",
      "Added progress tracking that shows common mistakes, typing speed, and other useful statistics.",
      "Added offline support so the main typing features can still work without an internet connection."
    ],
    technologyDecisions: [
      {
        technology: "Better-SQLite3 & Supabase",
        rationale:
          "SQLite is used for fast local storage, while Supabase gives the project an option for cloud syncing and backup."
      },
      {
        technology: "Vite & React",
        rationale:
          "I chose React and Vite because they work well for a responsive interface with a lot of changing state."
      },
      {
        technology: "OpenRouter",
        rationale:
          "OpenRouter made it easier to experiment with different AI models for generating custom typing drills."
      }
    ],
    performanceNotes: [
      "Static files are cached so the main interface can still load when the user is offline.",
      "Frequently updated typing state is kept separate from heavier dashboard updates to avoid unnecessary renders."
    ],
    lessonsLearned: [
      "I learned that small performance problems become much easier to notice in an app that reacts to every keystroke.",
      "I also learned more about offline storage, syncing data, and deciding which features should depend on an internet connection."
    ]
  },

  {
    id: "kapeez-cafe-pos",
    title: "Kapeez",
    description:
      "An offline-first Point of Sale system for cafes. It handles orders, drink options, inventory deductions, staff shifts, and sales reports without needing a backend.",
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
    imageAlt:
      "Screenshots of the Kapeez POS terminal, analytics, and authentication interfaces",
    external: {
      repo: "https://github.com/FrancisGiann/Kapeez"
    },
    role: "Full Stack Developer",
    problem:
      "Some small cafes do not need a complicated cloud POS system, especially if their internet connection is unreliable. I wanted to see how much of a POS system I could make work completely in the browser.",
    solution:
      "I rebuilt my older Java cafe project as a modern web app. Kapeez stores orders, menu items, inventory, shifts, and reports locally so the main POS features can work without an internet connection.",
    architecture: {
      summary:
        "Kapeez uses a local-first setup where the application and its data run directly in the browser without a traditional backend.",
      nodes: [
        {
          label: "Frontend UI",
          description:
            "React and Tailwind CSS handle the cashier interface, menu management, inventory pages, staff screens, and reports."
        },
        {
          label: "Local Storage Engine",
          description:
            "Browser localStorage stores menu data, orders, staff shifts, inventory, and other application information."
        }
      ]
    },
    challenges: [
      "Building a modifier system that could support things like cup size, add-ons, required options, and multiple selections.",
      "Connecting menu items and modifiers to ingredients so inventory is reduced correctly after each order."
    ],
    outcomes: [
      "Rebuilt my old Java cafe project using React and TypeScript.",
      "Created a POS that can run without a server or internet connection.",
      "Added a manager dashboard for viewing sales, popular products, staff performance, and other basic reports."
    ],
    technologyDecisions: [
      {
        technology: "Browser localStorage",
        rationale:
          "I used localStorage because I wanted the project to work completely offline without needing a database server."
      },
      {
        technology: "Recharts",
        rationale:
          "I used Recharts for the manager dashboard because it made it simple to turn sales data into readable charts."
      }
    ],
    beforeAfter: {
      before:
        "A simple JavaFX cafe ordering system made as an earlier school project.",
      after:
        "A browser-based POS with inventory tracking, staff shifts, reports, roles, and offline support."
    },
    timeline: [
      {
        label: "Phase 1",
        detail:
          "Built the ordering screen, shopping cart, product modifiers, and checkout calculations."
      },
      {
        label: "Phase 2",
        detail:
          "Added staff accounts, roles, and opening and closing shifts."
      },
      {
        label: "Phase 3",
        detail:
          "Added ingredient tracking and automatic inventory deductions."
      },
      {
        label: "Phase 4",
        detail:
          "Built the manager dashboard with sales reports, charts, and performance data."
      }
    ]
  }
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
    "I'm a graduating IT student who enjoys building full-stack projects. I like working on both the backend and frontend, from setting up the database and logic to making the interface clean and easy to use.",
  longBio:
    "I'm a graduating IT student who enjoys turning ideas into working applications. I usually work across the whole project, including the database, backend logic, APIs, and frontend. I especially enjoy improving the small details in the UI and figuring out better ways to organize my code. Right now, I'm learning more about TypeScript, cloud services, and 3D experiences on the web.",
  email: "francisgiann25@gmail.com",
  github: "https://github.com/FrancisGiann",
  githubUsername: "FrancisGiann",
  linkedin: "https://www.linkedin.com/in/francisgiann/",
};

export const skillGroups: { label: string; skills: string[] }[] = [
  {
    label: "Languages",
    skills: [
      "JavaScript",
      "TypeScript",
      "Python",
      "Java",
      "C#",
      "PHP",
      "CSS"
    ]
  },
  {
    label: "Frameworks",
    skills: [
      "React",
      "Node.js",
      "Express",
      "Tailwind CSS"
    ]
  },
  {
    label: "Tools & Databases",
    skills: [
      "Git",
      "AWS",
      "MySQL",
      "SQLite",
      "Supabase"
    ]
  },
  {
    label: "AI & Developer Tools",
    skills: [
      "OpenAI Codex",
      "Claude Code",
      "OpenCode",
      "OpenRouter",
      "API Integration"
    ]
  }
];

export const nowItems: { label: string; text: string }[] = [
  {
    label: "Learning",
    text:
      "Learning Three.js and WebGL so I can start adding more interactive 3D elements to my web projects."
  },
  {
    label: "Building",
    text:
      "Currently working on this portfolio and experimenting with more projects that I can actually use and improve over time."
  },
  {
    label: "Exploring",
    text:
      "Learning more about cloud architecture, APIs, deployment, and how applications are handled outside of local development."
  },
];
