# Project showcase source notes

Each project uses a reviewed branded composite wired through `showcaseImage` in `src/data/projects.ts`. The composites pair the source screen below with the project name, short headline, logo when available, and project-colored device frame. They were rendered at 1440×900, DPR 2, then exported as 1076×672 WebP files in `public/showcases/` (about 364 KB total). The review contact sheet was checked before wiring these assets.

| Project | Public composite | Source screen | Provenance and limits |
| --- | --- | --- | --- |
| Sevilla360 | `public/showcases/sevilla360.webp` | Existing `src/assets/project-sevilla1.webp` | Public landing page. |
| HealthMate | `public/showcases/healthmate.webp` | `source/healthmate-landing.png` | Public landing page; no clinic records. |
| ARKTIESIIS | `public/showcases/arktiesiis.webp` | `source/arktiesiis-landing.png` | Public landing page; no student records. |
| PonPon | `public/showcases/ponpon.webp` | `source/ponpon-home-wallet-breakdown.png` | Synthetic app preview; no financial records. |
| Ready Yet? | `public/showcases/ready-yet.webp` | `source/ready-yet-today.png` | Synthetic Flutter test render from 1.0.3; older than 1.0.6+7 and not a launcher capture. |
| Arkhive | `public/showcases/arkhive.webp` | `source/arkhive-library-0.4.0.png` | Synthetic public gallery capture from 0.4.0; older than the 0.4.22 test prerelease. |
| Defense Studio | `public/showcases/defense-studio.webp` | `source/defense-studio-rehearsal.png` | Synthetic rehearsal with a fictional teaching paper and answer; the current app name is PanelReady. |
| Makko | `public/showcases/makko.webp` | `source/makko-login.png` | Sign-in screen from an existing static build; it may lag the current source. |
| RKO | `public/showcases/rko.webp` | `source/rko-v5-3-overview.png` | Offline diagnostic capture with no saved session; paper trades only. |
| Flow | `public/showcases/flow-typing-workspace.webp` | Existing `src/assets/project-flow1.webp` | Empty typing session with no user activity. |

Original source captures remain in `src/assets/references/source/`. The full-size PNG originals of the reviewed composites are kept locally in `task/evidence/showcases/`; only the WebP exports are published. The project branding and device frame do not change the source app screen. Makko's static image shows sign-in only and does not establish implementation of project-management features.
