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
  link: string;
  status: "live" | "wip";
  images: string[];
  imageAlt: string;
}

export const projects: Project[] = [
  {
    id: "mi-sevilla-showroom",
    title: "M.I. Sevilla Resort Virtual Showroom",
    description:
      "A virtual walkthrough experience for a resort property, letting visitors explore rooms and amenities online before booking. Built to give the client a modern, interactive alternative to static photo galleries.",
    tech: ["React"],
    link: "https://github.com/FrancisGiann",
    status: "live",
    images: [sevillaImg, sevillaImg2],
    imageAlt:
      "Screenshot of the M.I. Sevilla Resort virtual showroom showing an interactive walkthrough of a beachfront suite",
  },
  {
    id: "taskflow-board",
    title: "TaskFlow — Team Kanban Board",
    description:
      "A collaborative task management app with drag-and-drop boards, real-time updates, and per-project permissions. Designed for small teams that want structure without the bloat of enterprise tooling.",
    tech: ["React", "TypeScript", "Node.js", "PostgreSQL"],
    link: "https://github.com/FrancisGiann",
    status: "live",
    images: [kanbanImg, kanbanImg2],
    imageAlt:
      "Screenshot of the TaskFlow kanban dashboard with cards organized into columns",
  },
  {
    id: "skycast",
    title: "Skycast — Weather Companion",
    description:
      "A clean weather app with hourly and seven-day forecasts, location search, and severe-weather alerts. Focused on fast load times and a glanceable layout rather than feature overload.",
    tech: ["Next.js", "TypeScript", "OpenWeather API"],
    link: "https://github.com/FrancisGiann",
    status: "live",
    images: [weatherImg, weatherImg2],
    imageAlt:
      "Screenshot of the Skycast weather app showing current conditions and a weekly forecast",
  },
  {
    id: "pulse-api",
    title: "Pulse — API Analytics Dashboard",
    description:
      "A monitoring dashboard for REST APIs that tracks latency, error rates, and traffic patterns per endpoint. Includes alerting rules and a log explorer for digging into slow requests.",
    tech: ["React", "Node.js", "Docker", "AWS"],
    link: "https://github.com/FrancisGiann",
    status: "live",
    images: [apiImg, apiImg2],
    imageAlt:
      "Screenshot of the Pulse API analytics dashboard with latency charts and request logs",
  },
  {
    id: "orbit-3d",
    title: "Orbit — Three.js Playground",
    description:
      "An interactive 3D solar-system explorer built with Three.js and React Three Fiber — orbit controls, planet facts, and a shader-based starfield. Currently prototyping the camera and lighting setup.",
    tech: ["Three.js", "React Three Fiber", "TypeScript"],
    link: "https://github.com/FrancisGiann",
    status: "wip",
    images: [orbitImg],
    imageAlt:
      "Screenshot of the Orbit 3D playground showing a stylized solar system with orbiting planets",
  },
  {
    id: "habitgrid",
    title: "HabitGrid — Habit Tracker",
    description:
      "A habit tracker with a GitHub-style streak grid per habit, weekly targets, and gentle reminders. Designing the data model and offline-first sync before polishing the UI.",
    tech: ["React", "TypeScript", "PWA"],
    link: "https://github.com/FrancisGiann",
    status: "wip",
    images: [habitgridImg],
    imageAlt:
      "Screenshot of the HabitGrid habit tracker showing a monthly streak grid and progress ring",
  },
];

export const liveProjects = projects.filter((p) => p.status === "live");
export const wipProjects = projects.filter((p) => p.status === "wip");

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
