# Francis Empleo Portfolio

A modern, responsive full-stack developer portfolio with a restrained pixel-art identity and an optional 8-bit mode. It presents selected work, skills, GitHub activity, and in-progress experiments in a focused, accessible interface.

## Features

- Responsive home and projects routes.
- Light/dark theme with a pixel-ripple transition and persisted preference.
- Discoverable 8-bit mode, with the Konami sequence `↑ ↑ ↓ ↓ ← → ← → B A` as a keyboard shortcut.
- Typewriter hero, pixel-photo hover preview, ambient particles, segmented scroll progress, and reveal and magnetic interactions.
- Large, accessible project and photo carousels with keyboard controls and descriptive image text.
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
│   └── projects.tsx  # Projects route
├── styles.css        # Theme tokens, typography, pixel styling, and motion
└── server.ts         # TanStack Start server entry
public/               # Static assets such as the favicon and robots.txt
```

## Customization

- Personal profile, projects, skills, and current items: `src/data/projects.ts`
- Images: `src/assets/`
- Color, type, and motion: `src/styles.css`
- Page metadata: `src/routes/index.tsx`, `src/routes/projects.tsx`, `src/routes/__root.tsx`

## Accessibility and performance

The interface supports keyboard controls and visible focus states, uses descriptive image alt text, respects `prefers-reduced-motion`, and lazy-loads project imagery.

## Production

Build and preview the production output with:

```sh
bun run build
bun run preview
```

The build produces a `.output/` artifact, which is ignored by Git.

## Status

Project content and URLs are still being personalized. Some project entries are placeholders for portfolio content and should not be treated as finished public case studies.
