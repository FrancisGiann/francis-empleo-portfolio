# Francis Empleo Portfolio

A modern, responsive full-stack developer portfolio with a restrained pixel-art identity and an optional 8-bit mode. It presents selected work, skills, GitHub activity, and in-progress experiments in a focused, accessible interface.

## Features

- Responsive home, projects, and `/projects/:projectId` case-study routes with router-level 404 handling.
- Light/dark theme with a pixel-ripple transition and persisted preference.
- Discoverable 8-bit mode, with the Konami sequence `↑ ↑ ↓ ↓ ← → ← → B A` as a keyboard shortcut.
- Typewriter hero, pixel-photo hover preview, ambient particles, segmented scroll progress, and reveal and magnetic interactions.
- Playable project cartridges with engagement-aware screenshot cycling, touch/keyboard controls, and internal case studies.
- Data-driven case studies with architecture flow, technology decisions, comparisons, timelines, and optional outcome/performance sections.
- A short first-visit boot status (`FGE_OS v1.0`) that skips on repeat visits and reduced-motion preferences.
- Retro-only stage labels, skill inventory, player-status footer, and a code-native pixel avatar.
- Live GitHub contribution calendar.
- Reduced-motion and keyboard accessibility support.
- SSR and production output through TanStack Start and Nitro.

## Tech stack

- React 19
- TypeScript
- TanStack Start, Router, and Query
- Vite 8
- Tailwind CSS 4
- Bun
- Nitro
- Radix UI primitives and Lucide icons

## Getting started

Prerequisite: [Bun](https://bun.sh/) installed locally.

```sh
git clone https://github.com/FrancisGiann/francis-empleo-portfolio.git
cd francis-empleo-portfolio
bun install
bun run dev
```

Open the URL printed by Vite in your browser.

## Scripts

| Script      | Command                         |
| ----------- | ------------------------------- |
| `dev`       | `vite dev`                      |
| `build`     | `vite build`                    |
| `build:dev` | `vite build --mode development` |
| `preview`   | `vite preview`                  |
| `lint`      | `eslint .`                      |
| `format`    | `prettier --write .`            |

## Project structure

```text
src/
├── components/       # Portfolio, layout, interaction, and visual components
├── data/
│   └── projects.ts   # Profile, project, skill, and current-focus content
├── hooks/            # Theme, retro-mode, typewriter, and responsive behavior
├── routes/
│   ├── __root.tsx    # Root shell and shared providers
│   ├── index.tsx     # Home route
│   ├── projects.tsx  # Projects route
│   └── projects/
│       └── $projectId.tsx # Dynamic case-study route
├── styles.css        # Theme tokens, typography, pixel styling, and motion
└── server.ts         # TanStack Start server entry
public/               # Static assets such as the favicon and robots.txt
```

## Customization

- Personal profile, projects, skills, current items, and structured case studies: `src/data/projects.ts`
- Images: `src/assets/`
- Color, type, and motion: `src/styles.css`
- Page metadata: `src/routes/index.tsx`, `src/routes/projects.tsx`, `src/routes/projects/$projectId.tsx`, `src/routes/__root.tsx`

Each project is customized from one entry in `src/data/projects.ts`. Add verified `external.repo` or `external.demo` values only when those URLs are real; the UI omits those actions when they are absent. The structured case-study fields are intentionally qualitative drafts until the real role, dates, measurements, outcomes, and project links are supplied.

## Accessibility and performance

The interface supports keyboard controls and visible focus states, uses descriptive image alt text, respects `prefers-reduced-motion`, pauses carousel timers when not engaged or when the document is hidden, and lazy-loads project imagery. Internal route transitions use native View Transitions when available and fall back to normal router navigation.

## Production

Build and preview the production output with:

```sh
bun run build
bun run preview
```

The build produces a `.output/` artifact, which is ignored by Git.

## Status

Project content and URLs are still being personalized. Current project entries and case-study sections are qualitative drafts/placeholders and should not be treated as finished public case studies until the real project details, repository/demo links, role, timeframe, measured performance, and outcomes are added.
