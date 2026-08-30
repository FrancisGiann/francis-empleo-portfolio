import sevillaImg from "@/assets/project-sevilla.jpg";
import sevillaImg2 from "@/assets/project-sevilla-2.jpg";
import kanbanImg from "@/assets/project-kanban.jpg";
import kanbanImg2 from "@/assets/project-kanban-2.jpg";
import weatherImg from "@/assets/project-weather.jpg";
import weatherImg2 from "@/assets/project-weather-2.jpg";
import apiImg from "@/assets/project-api.jpg";
import apiImg2 from "@/assets/project-api-2.jpg";
import orbitImg from "@/assets/project-orbit.jpg";
import habitgridImg from "@/assets/project-habitgrid.jpg";

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
    id: "mi-sevilla-showroom",
    title: "M.I. Sevilla Resort Virtual Showroom",
    description:
      "A virtual walkthrough experience for a resort property, letting visitors explore rooms and amenities online before booking. Built to give the client a modern, interactive alternative to static photo galleries.",
    tech: ["React"],
    status: "live",
    images: [sevillaImg, sevillaImg2],
    imageAlt:
      "Screenshot of the M.I. Sevilla Resort virtual showroom showing an interactive walkthrough of a beachfront suite",
    role: "Interactive web experience (draft)",
    problem:
      "A resort needs a more engaging way for visitors to explore rooms and amenities online than a static photo gallery.",
    solution:
      "A browser-based virtual showroom presents the property as an interactive walkthrough, giving visitors a richer way to preview the space before booking.",
    architecture: {
      summary:
        "Draft architecture based on the current React implementation and project description.",
      nodes: [
        { label: "Visitor", description: "Explores the showroom from a browser." },
        {
          label: "React experience",
          description: "Renders the walkthrough and interaction states.",
        },
        {
          label: "Property media",
          description: "Supplies room and amenity visuals for the experience.",
        },
      ],
    },
    technologyDecisions: [
      {
        technology: "React",
        rationale: "Provides a component model for composing the interactive showroom experience.",
      },
    ],
    beforeAfter: {
      before: "Static property photos provide limited context for visitors planning a stay.",
      after:
        "The showroom gives visitors an interactive way to preview rooms and amenities online.",
    },
    challenges: [
      "Balancing a welcoming property presentation with clear, usable interactions is a central design consideration for this experience.",
    ],
    timeline: [
      { label: "Scope", detail: "Interactive resort walkthrough and property preview (draft)." },
      { label: "Build", detail: "React-based experience with media-led exploration (draft)." },
    ],
    lessonsLearned: [
      "Rich media is most useful when it helps a visitor make a confident next decision, such as exploring a room before booking.",
    ],
  },
  {
    id: "taskflow-board",
    title: "TaskFlow — Team Kanban Board",
    description:
      "A collaborative task management app with drag-and-drop boards, real-time updates, and per-project permissions. Designed for small teams that want structure without the bloat of enterprise tooling.",
    tech: ["React", "TypeScript", "Node.js", "PostgreSQL"],
    status: "live",
    images: [kanbanImg, kanbanImg2],
    imageAlt: "Screenshot of the TaskFlow kanban dashboard with cards organized into columns",
    role: "Full-stack task management product (draft)",
    problem:
      "Small teams need shared task structure and project permissions without the complexity of enterprise tooling.",
    solution:
      "TaskFlow organizes work in collaborative drag-and-drop boards with real-time updates and per-project permissions.",
    architecture: {
      summary: "Draft architecture based on the current React, Node.js, and PostgreSQL stack.",
      nodes: [
        { label: "Team member", description: "Creates, moves, and reviews work on a board." },
        {
          label: "React + TypeScript",
          description: "Provides the typed board interface and interaction layer.",
        },
        {
          label: "Node.js service",
          description: "Coordinates project and collaboration behavior.",
        },
        { label: "PostgreSQL", description: "Stores projects, permissions, and task state." },
      ],
    },
    technologyDecisions: [
      {
        technology: "React + TypeScript",
        rationale: "Supports a component-based board UI with explicit types for shared task state.",
      },
      {
        technology: "Node.js",
        rationale:
          "Provides a JavaScript/TypeScript-friendly server layer for collaboration features.",
      },
      {
        technology: "PostgreSQL",
        rationale: "Offers structured persistence for projects, permissions, and tasks.",
      },
    ],
    beforeAfter: {
      before: "Team work can become scattered when a lightweight group has no shared project view.",
      after: "A focused Kanban board gives a small team one place to organize and move work.",
    },
    challenges: [
      "Keeping drag-and-drop interactions, real-time updates, and permission boundaries understandable is a key product challenge.",
    ],
    timeline: [
      { label: "Model", detail: "Define projects, permissions, and task states (draft)." },
      {
        label: "Experience",
        detail: "Shape the board around quick, low-friction team updates (draft).",
      },
    ],
    lessonsLearned: [
      "A smaller tool can feel more useful when its workflow stays close to the team's everyday decisions.",
    ],
  },
  {
    id: "skycast",
    title: "Skycast — Weather Companion",
    description:
      "A clean weather app with hourly and seven-day forecasts, location search, and severe-weather alerts. Focused on fast load times and a glanceable layout rather than feature overload.",
    tech: ["Next.js", "TypeScript", "OpenWeather API"],
    status: "live",
    images: [weatherImg, weatherImg2],
    imageAlt:
      "Screenshot of the Skycast weather app showing current conditions and a weekly forecast",
    role: "Weather companion interface (draft)",
    problem:
      "Weather information is often difficult to scan when current conditions, hourly detail, and the weekly outlook compete for attention.",
    solution:
      "Skycast presents current conditions, hourly and seven-day forecasts, location search, and severe-weather alerts in a glanceable layout.",
    architecture: {
      summary:
        "Draft architecture based on the current Next.js, TypeScript, and OpenWeather API stack.",
      nodes: [
        { label: "Person", description: "Searches for a location and reads the forecast." },
        { label: "Next.js interface", description: "Renders the weather views and search flow." },
        { label: "OpenWeather API", description: "Supplies current, hourly, and forecast data." },
      ],
    },
    technologyDecisions: [
      {
        technology: "Next.js + TypeScript",
        rationale:
          "Provides a structured web application foundation with typed UI and data boundaries.",
      },
      {
        technology: "OpenWeather API",
        rationale: "Supplies the weather data needed for location-based forecasts and alerts.",
      },
    ],
    beforeAfter: {
      before: "Forecast information can feel noisy when every detail receives equal emphasis.",
      after:
        "A focused layout prioritizes the weather information people typically need to scan first.",
    },
    challenges: [
      "Combining several forecast horizons and alerts without turning a quick check into a dense dashboard is the core design challenge.",
    ],
    timeline: [
      { label: "Data", detail: "Connect location search to forecast data (draft)." },
      {
        label: "Interface",
        detail: "Organize current and forecast views for quick scanning (draft).",
      },
    ],
    lessonsLearned: [
      "A weather interface earns trust by making the most relevant detail obvious before asking people to explore further.",
    ],
  },
  {
    id: "pulse-api",
    title: "Pulse — API Analytics Dashboard",
    description:
      "A monitoring dashboard for REST APIs that tracks latency, error rates, and traffic patterns per endpoint. Includes alerting rules and a log explorer for digging into slow requests.",
    tech: ["React", "Node.js", "Docker", "AWS"],
    status: "live",
    images: [apiImg, apiImg2],
    imageAlt:
      "Screenshot of the Pulse API analytics dashboard with latency charts and request logs",
    role: "API observability dashboard (draft)",
    problem:
      "Teams need a clear way to inspect API latency, errors, traffic patterns, and the requests behind an alert.",
    solution:
      "Pulse brings endpoint metrics, alerting rules, and a log explorer into one monitoring dashboard for REST APIs.",
    architecture: {
      summary: "Draft architecture based on the current React, Node.js, Docker, and AWS stack.",
      nodes: [
        {
          label: "API traffic",
          description: "Produces endpoint requests and operational signals.",
        },
        {
          label: "Node.js service",
          description: "Coordinates metric and log data for the dashboard.",
        },
        {
          label: "React dashboard",
          description: "Shows endpoint trends, alerts, and request details.",
        },
        {
          label: "Docker + AWS",
          description: "Represent the deployment tooling named for the project.",
        },
      ],
    },
    technologyDecisions: [
      {
        technology: "React",
        rationale: "Supports a dashboard made of focused metric and log-exploration views.",
      },
      {
        technology: "Node.js",
        rationale:
          "Provides the service layer for collecting and presenting API monitoring information.",
      },
      {
        technology: "Docker + AWS",
        rationale: "Provide the named packaging and cloud platform context for the dashboard.",
      },
    ],
    beforeAfter: {
      before:
        "API issues can require piecing together endpoint metrics and individual request logs.",
      after:
        "One dashboard connects high-level endpoint patterns with a log explorer for investigation.",
    },
    challenges: [
      "The monitoring experience needs to move from a broad signal to a specific request without overwhelming the person investigating an issue.",
    ],
    timeline: [
      { label: "Signals", detail: "Define endpoint latency, error, and traffic views (draft)." },
      { label: "Investigation", detail: "Connect alert context to request-level logs (draft)." },
    ],
    lessonsLearned: [
      "Observability tools are strongest when summary metrics and detailed evidence are designed as one investigation path.",
    ],
  },
  {
    id: "orbit-3d",
    title: "Orbit — Three.js Playground",
    description:
      "An interactive 3D solar-system explorer built with Three.js and React Three Fiber — orbit controls, planet facts, and a shader-based starfield. Currently prototyping the camera and lighting setup.",
    tech: ["Three.js", "React Three Fiber", "TypeScript"],
    status: "wip",
    images: [orbitImg],
    imageAlt:
      "Screenshot of the Orbit 3D playground showing a stylized solar system with orbiting planets",
    role: "3D interaction prototype (draft)",
    problem:
      "The prototype explores how a web interface can make a solar-system model and its supporting facts feel interactive rather than static.",
    solution:
      "Orbit combines orbit controls, planet facts, and a shader-based starfield while the camera and lighting setup remains in progress.",
    architecture: {
      summary:
        "Draft architecture based on the current Three.js, React Three Fiber, and TypeScript stack.",
      nodes: [
        { label: "Visitor", description: "Navigates the scene and selects planets." },
        {
          label: "React Three Fiber",
          description: "Composes the interactive scene through React components.",
        },
        {
          label: "Three.js scene",
          description: "Provides planets, camera, lighting, and orbit controls.",
        },
        { label: "Shader starfield", description: "Adds the prototype's starfield visual layer." },
      ],
    },
    technologyDecisions: [
      {
        technology: "Three.js + React Three Fiber",
        rationale: "Combines a 3D rendering engine with a React-oriented scene composition model.",
      },
      {
        technology: "TypeScript",
        rationale:
          "Keeps the interactive scene's data and component boundaries explicit while the prototype evolves.",
      },
    ],
    beforeAfter: {
      before:
        "A solar-system concept starts as a visual experiment with camera and lighting questions still open.",
      after:
        "The prototype establishes an interactive scene with orbit controls and planet facts to guide further exploration.",
    },
    challenges: [
      "The camera and lighting setup is still being prototyped, so the experience needs room to evolve without locking in the wrong scene assumptions.",
    ],
    timeline: [
      { label: "Prototype", detail: "Explore scene composition and orbit interaction." },
      {
        label: "Next",
        detail: "Refine camera and lighting behavior before polishing the experience.",
      },
    ],
    lessonsLearned: [
      "Interactive 3D work benefits from validating camera and lighting decisions early, before adding more scene detail.",
    ],
  },
  {
    id: "habitgrid",
    title: "HabitGrid — Habit Tracker",
    description:
      "A habit tracker with a GitHub-style streak grid per habit, weekly targets, and gentle reminders. Designing the data model and offline-first sync before polishing the UI.",
    tech: ["React", "TypeScript", "PWA"],
    status: "wip",
    images: [habitgridImg],
    imageAlt:
      "Screenshot of the HabitGrid habit tracker showing a monthly streak grid and progress ring",
    role: "Offline-first habit tracker prototype (draft)",
    problem:
      "People building habits need progress feedback that feels encouraging while remaining useful when connectivity is limited.",
    solution:
      "HabitGrid is being shaped around a GitHub-style streak grid per habit, weekly targets, and gentle reminders, with the data model and offline-first sync coming first.",
    architecture: {
      summary: "Draft architecture based on the current React, TypeScript, and PWA direction.",
      nodes: [
        { label: "Person", description: "Records habits and reviews streak progress." },
        { label: "React interface", description: "Renders grids, targets, and reminder settings." },
        {
          label: "Offline data",
          description: "Keeps the core habit workflow available without a connection.",
        },
        {
          label: "Sync layer",
          description: "Will reconcile local progress when connectivity returns.",
        },
      ],
    },
    technologyDecisions: [
      {
        technology: "React + TypeScript",
        rationale: "Supports a component-based tracker UI with explicit progress data shapes.",
      },
      {
        technology: "PWA",
        rationale:
          "Matches the goal of keeping the habit workflow useful across visits and connectivity states.",
      },
    ],
    beforeAfter: {
      before:
        "Habit progress is easy to lose in a generic list or when a connection is unavailable.",
      after:
        "A per-habit streak grid and offline-first direction make progress more visible and resilient (in progress).",
    },
    challenges: [
      "Designing the data model and sync behavior before polishing the UI is important to avoid making progress history fragile.",
    ],
    timeline: [
      { label: "Model", detail: "Design habit, streak, and weekly-target data." },
      { label: "Sync", detail: "Explore offline-first persistence before final UI polish." },
    ],
    lessonsLearned: [
      "For an offline-first product, the data model and conflict behavior deserve attention before visual polish.",
    ],
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
    "I build web applications end to end — from database schema to polished UI. I care about clean architecture, fast load times, and interfaces that feel effortless to use.",
  longBio:
    "I'm an IT graduate who enjoys owning features across the whole stack — designing the data model, wiring up the API, and sweating the last 10% of the UI. I like problems where performance, reliability, and user experience all pull on each other. Right now I'm deepening my TypeScript and cloud skills, and exploring 3D and interactive experiences on the web.",
  email: "francisgiann25@gmail.com",
  github: "https://github.com/FrancisGiann",
  githubUsername: "FrancisGiann",
  linkedin: "https://www.linkedin.com/",
};

export const skillGroups: { label: string; skills: string[] }[] = [
  { label: "Languages", skills: ["JavaScript", "TypeScript", "Python"] },
  { label: "Frameworks", skills: ["React", "Next.js", "Node.js"] },
  { label: "Tools & Platforms", skills: ["Git", "Docker", "AWS"] },
];

export const nowItems: { label: string; text: string }[] = [
  {
    label: "Learning",
    text: "Three.js and WebGL shaders — pushing beyond flat UIs into interactive 3D on the web.",
  },
  {
    label: "Building",
    text: "This portfolio, plus HabitGrid — an offline-first habit tracker with a streak grid.",
  },
  {
    label: "Exploring",
    text: "Cloud architecture on AWS and how to design APIs that stay fast under real load.",
  },
];
