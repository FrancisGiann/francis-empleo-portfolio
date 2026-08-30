# Francis Empleo Portfolio

A personal IT/developer portfolio with a minimal visual system and restrained pixel-art accents.

The design keeps the interface modern and uncluttered while using retro details for emphasis rather than as the overall visual language.

## Design brief

Build a personal IT/developer portfolio site. Aesthetic: minimal, modern, and uncluttered — with pixel art used only as a deliberate accent, never as the whole visual language. Think a clean SaaS landing page that occasionally winks at retro/8-bit computing, not a game website. Support a light mode and a dark mode with a toggle in the nav; both modes should feel intentional, not like an inverted copy of each other.

Design system

Color tokens (use these instead of defaults):

Light mode: background #FAFAFA, surface #FFFFFF, text #101114, muted text #5B5F66, accent #4F46E5 (indigo)

Dark mode: background #0D0E12 (charcoal, not pure #000000), surface #16171C, text #F2F2F5, muted text #9195A0, accent #A78BFA (lavender — same hue family as light mode, shifted lighter for contrast)

Use the accent color sparingly: links, the active nav item, primary buttons, tech-stack tag borders. Do not tint large surfaces with it.

Typography:

Body and headings: a clean modern sans-serif (Inter or Space Grotesk).

Pixel/retro font (Silkscreen or Press Start 2P): reserved only for small accents — section eyebrows (e.g. "PROJECTS"), the nav logo/wordmark, and button labels. Never use it for paragraph copy or long headings — that's what makes it feel "overly pixel art" if overused.

Pixel-art accent language (use restrained, not everywhere):

Buttons and tech-stack tags: stepped/staircase corners instead of rounded corners (achievable with clip-path: polygon(...) in a staircase pattern), used as the site's one recurring geometric motif.

A subtle 1px dotted/dashed divider between sections instead of a plain solid rule.

No pixel-pattern backgrounds, no scanlines, no pixel borders around every element — keep those out entirely.

Signature element: the hero photo's hover-to-pixel-art transition is the one moment of visual flourish on the page. Everything else should be quiet and disciplined around it — don't compete with it using other animations.

Explicitly avoid these common AI-generated defaults: a warm cream background with a terracotta accent and serif display type; a near-black background with a single neon-green accent and nothing else; a broadsheet/newspaper layout with hairline rules and zero border-radius everywhere. None of those fit this brief.

Global structure

Nav bar (sticky): wordmark/logo on the left, links to Projects / GitHub / Contact, and a light/dark toggle (sun/moon icon, small pixel-style icon is fine here) on the right.

Footer: social links (GitHub, LinkedIn, email), small copyright line, minimal — one row, not a big multi-column footer.

Hero section

Short intro: name, role/title (e.g. "[Your Title — e.g. Full-Stack Developer]"), and a 2–3 sentence bio. Placeholder copy is fine — write something specific to an IT/software portfolio, not generic filler.

Profile photo, right-aligned or centered, roughly 300–400px.

Hover effect (do it this way so only one photo is needed): display the photo inside a fixed-size container with overflow: hidden. On hover, transition the image's image-rendering to pixelated while scaling it down and back up (render it small, e.g. 5–10% of its container size, then scale up with transform) so it blocks into visible pixels — cross-fade this pixelated state in over ~300–400ms. This produces a live pixel-art effect from a single source photo, no second image asset required. If a canvas-based pixelation gives a cleaner result in React, that's fine too — the point is: one photo in, pixelated version generated, not hand-crafted.

CTA buttons: "View Projects" (scrolls to projects section) and "Contact Me" (mailto or scrolls to footer).

Projects section — alternating full-width rows, not a grid

Projects should be large and prominent, one per row, alternating image/text sides (row 1: image left / text right, row 2: text left / image right, and so on).

Each row needs:

A large project image/screenshot placeholder

Project title

2–3 sentence description

Tech stack shown as small minimal tags (stepped corners per the design system, muted background, accent-colored border or text)

A "View Project" button that opens the live project or repo in a new tab

Seed the first row with this project (placeholder copy, refine later):

M.I. Sevilla Resort Virtual Showroom A virtual walkthrough experience for a resort property, letting visitors explore rooms and amenities online before booking. Built to give the client a modern, interactive alternative to static photo galleries. Tech: React Button: "View Project" → [link]

Add 2–3 more project rows using the same structure with placeholder content I can swap in later (title, description, tech tags, link).

GitHub activity section

Show a real GitHub contribution graph, not a screenshot. Use one of these two approaches:

Preferred: the react-github-calendar npm package — it renders an actual live contribution graph as a React component and its colors can be themed to match the accent tokens above in both light and dark mode.

Simplest fallback: an image embed via https://ghchart.rshah.org/{accentColorHex}/{githubUsername} — zero JavaScript, just an <img> tag, styled with the accent color.

Use placeholder GitHub username [your-github-username] so it's a one-line swap later.

Requirements floor (don't skip)

Fully responsive down to mobile — the alternating project rows should stack (image on top, text below) on small screens.

Visible keyboard focus states on all interactive elements (buttons, links, toggle).

Respect prefers-reduced-motion — the hero hover-pixelation and any transitions should degrade to a simple opacity fade if the user has reduced motion enabled.

All images need descriptive alt text.

Placeholders to leave for me to fill in

Francis Giann Empleo, [Full Stack Developer], [Short bio], [FrancisGiann}, [francisgiann25@gmail.com], [https://github.com/FrancisGiann], project images/links for rows 2–3.

## Development

This project uses Bun and the lockfile at `bun.lock`.

```sh
bun install
bun run dev
```

## Production

Build the application, then serve the production build with the existing Vite preview script:

```sh
bun run build
bun run preview
```
