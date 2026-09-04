# pahopu — Personal Portfolio

Personal portfolio of **Pham Hoang Phuc**, built with **Next.js 16**, **TypeScript**, and **Tailwind CSS v4**. Themed after the CONGBDAY album — star fields, a vinyl player, and a few hidden surprises.

<div align="center">

[![CI](https://github.com/pahopu/pahopu-portfolio/actions/workflows/ci.yml/badge.svg)](https://github.com/pahopu/pahopu-portfolio/actions/workflows/ci.yml)
[![Next.js](https://img.shields.io/badge/Next.js-16-black?style=flat-square&logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-blue?style=flat-square&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-v4-38B2AC?style=flat-square&logo=tailwind-css)](https://tailwindcss.com/)
[![Framer Motion](https://img.shields.io/badge/Framer-Motion-E902BD?style=flat-square&logo=framer)](https://www.framer.com/motion/)
[![pnpm](https://img.shields.io/badge/pnpm-F69220?style=flat-square&logo=pnpm&logoColor=white)](https://pnpm.io/)
[![Vercel](https://img.shields.io/badge/Deployed_on-Vercel-black?style=flat-square&logo=vercel)](https://vercel.com/)

</div>

## Features

- **CONGBDAY album theme** — star field animations, album palette (`#C8E645`, `#FFE566`, `#5B8FE8`, `#F5B8CC`, `#FF8C42`) consistent across all sections
- **Floating vinyl music player** — draggable, dockable to any corner; sleeve-reveal animation on first play, disc spin with ramp-up/down, double-click boost easter egg
- **Day / Night hero** — sky switches between day (clouds + yellow stars) and night (moon + twinkling stars); gyroscope parallax on mobile
- **Star cursor trail** — stars follow mouse/touch across the whole page; click burst effect
- **Idle star screensaver** — animated stars drift across the screen when idle
- **Custom SVG project illustrations** — each project has a hand-crafted illustration instead of a screenshot
- **Interactive case study modal** — per-project deep dive with STAR-format modules and architecture diagrams
- **i18n** — English / Vietnamese via `next-intl`, with `sitemap.xml`/`robots.txt` covering both locales
- **Dark mode** — `next-themes`, semantic color tokens throughout
- **Functional contact form** — EmailJS + React Hook Form, no backend required
- **Easter eggs** — Konami code, shake (mobile), typing sequence, logo click burst — all respect `prefers-reduced-motion`
- **Security headers** — CSP, `X-Frame-Options`, `Referrer-Policy`, `Permissions-Policy` set via `next.config.ts`

## Tech Stack

| Layer | Library |
|---|---|
| Framework | Next.js 16 (App Router, Turbopack) |
| Language | TypeScript |
| Styling | Tailwind CSS v4 |
| UI Primitives | shadcn/ui (Radix) |
| Animation | Framer Motion |
| i18n | next-intl |
| Theme | next-themes |
| Forms | React Hook Form |
| Email | EmailJS |
| Icons | Lucide React, Simple Icons |
| Testing | Vitest + React Testing Library (unit), Playwright (E2E) |
| Package manager | pnpm |

## Project Structure

```
├── .github/workflows/      # CI (lint, test, build) on push/PR to main
├── messages/                # i18n translations (en.json, vi.json)
├── public/
│   ├── files/resume.pdf
│   ├── images/               # Album art, project assets
│   └── music/                 # Background track
├── src/
│   ├── app/
│   │   ├── [locale]/         # Next.js App Router with locale segment
│   │   ├── sitemap.ts        # /sitemap.xml — both locales, hreflang alternates
│   │   └── robots.ts         # /robots.txt
│   ├── components/
│   │   ├── sections/          # Hero, About, Skills, Projects, Experience, Contact
│   │   │   └── projects/       # ProjectCard, ProjectCaseStudy, ProjectImage
│   │   ├── shared/             # Navbar, Footer, FloatingMusicPlayer, EasterEgg, ...
│   │   │   └── deferred-widgets.tsx  # Lazy-loads the music player & easter egg (no SSR)
│   │   └── ui/                  # shadcn/ui primitives
│   ├── constants/              # All content data (projects, skills, experience, socials)
│   ├── hooks/                   # useKonamiCode, useTypingSequence, useMediaQuery
│   ├── i18n/                     # next-intl routing & request config
│   └── lib/utils.ts               # cn(), prefersReducedMotion()
└── vitest.config.ts
```

## Getting Started

### 1. Clone

```bash
git clone https://github.com/pahopu/pahopu-portfolio.git
cd pahopu-portfolio
```

### 2. Install

```bash
pnpm install
```

### 3. Environment variables

Copy `.env.example` to `.env.local` and fill in your EmailJS credentials:

```bash
cp .env.example .env.local
```

Get these from [emailjs.com](https://www.emailjs.com/).

### 4. Run

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000).

## Scripts

| Command | Description |
|---|---|
| `pnpm dev` | Start the dev server (Turbopack) |
| `pnpm build` | Production build |
| `pnpm start` | Serve the production build |
| `pnpm lint` | ESLint |
| `pnpm test` | Run the Vitest unit suite |
| `pnpm test:e2e` | Run the Playwright E2E suite (builds + serves the app, needs `pnpm exec playwright install chromium` once) |

CI (`.github/workflows/ci.yml`) runs lint, unit tests, build, and the E2E suite on every push/PR to `main`.

### E2E test coverage (`e2e/`)

Beyond page-load smoke checks, the suite locks in the accessibility/UX fixes from the last review pass — regressions here would otherwise only be caught by eyeballing the site:

- **`reduced-motion.spec.ts` / `idle-screensaver.spec.ts`** — decorative star effects (cursor trail, click sparkle, idle screensaver) are disabled under `prefers-reduced-motion: reduce`, and still fire normally otherwise. Idle timers are advanced with Playwright's clock API (`page.clock.runFor`) instead of real waits.
- **`idle-screensaver.spec.ts`** — the idle-star's `z-index` stays below an open case-study dialog's, so it can't visually overlap a modal.
- **`focus-visible.spec.ts`** — the logo button shows a visible focus ring on keyboard `Tab`.
- **`smoke.spec.ts`** — both locales render, the locale switcher navigates correctly, `sitemap.xml`/`robots.txt` are served.

## Content Model

Adding or editing content doesn't require touching component code — everything lives in `src/constants/index.tsx` and `messages/*.json`.

**Adding a project** — append an entry to the `PROJECTS` array in `src/constants/index.tsx`. Shape:

```ts
{
  id: "my-project",
  title: "...",
  description: "...",
  tags: ["Vue 3", "TypeScript", ...],
  links: { demo: "https://...", github: null },
  achievements: ["...", "..."],
  featured: false,
  caseStudy: {
    type: "complex", // drives which case-study layout renders
    overview: { challenge, solution, impact },
    diagram: { type: "hub-spoke" | "pipeline", title, nodes: [{ label }] },
    modules: [
      { id, name, icon, star: { situation, task, action: [...], result } },
    ],
  },
}
```

Project illustrations are hand-drawn SVGs, not screenshots — see `src/components/sections/projects/project-image.tsx` for the pattern.

**Adding a locale** — add the locale code to `locales` in `src/i18n/routing.ts`, add a matching `messages/<locale>.json` with the same top-level keys (`nav`, `hero`, `about`, `skills`, `projects`, `experience`, `contact`, `player`, `footer`), and it flows through automatically to routing, `generateStaticParams`, and `sitemap.ts`.

## Customization

- **Content** (projects, experience, skills, socials): `src/constants/index.tsx`
- **Translations**: `messages/en.json`, `messages/vi.json`
- **Project illustrations**: `src/components/sections/projects/project-image.tsx`
- **Music track**: update `TRACK` in `src/components/shared/floating-music-player.tsx`
- **Security headers / CSP**: `next.config.ts`

## Contact

**Pham Hoang Phuc** — Front-End Developer

- LinkedIn: [linkedin.com/in/pahopu](https://www.linkedin.com/in/pahopu)
- GitHub: [github.com/pahopu](https://github.com/pahopu)
- Email: hoangphucpham.work@gmail.com

---

<p align="center"><i>© 2026 Pham Hoang Phuc</i></p>
