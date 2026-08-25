# pahopu — Personal Portfolio

> Personal portfolio of **Pham Hoang Phuc**, built with **Next.js 15**, **TypeScript**, and **Tailwind CSS v4**. Themed after the CONGBDAY album — star fields, vinyl player, and a few hidden surprises.

<div align="center">

[![Next.js](https://img.shields.io/badge/Next.js-15-black?style=flat-square&logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-blue?style=flat-square&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-v4-38B2AC?style=flat-square&logo=tailwind-css)](https://tailwindcss.com/)
[![Framer Motion](https://img.shields.io/badge/Framer-Motion-E902BD?style=flat-square&logo=framer)](https://www.framer.com/motion/)
[![Vercel](https://img.shields.io/badge/Deployed_on-Vercel-black?style=flat-square&logo=vercel)](https://vercel.com/)

</div>

## Features

- **CONGBDAY album theme** — star field animations, album palette (`#C8E645`, `#FFE566`, `#5B8FE8`, `#F5B8CC`, `#FF8C42`) consistent across all sections
- **Floating vinyl music player** — draggable, dockable to any corner; sleeve reveal animation on first play, disc spin with ramp-up/down, double-click boost easter egg
- **Day / Night hero** — sky switches between day (clouds + yellow stars) and night (moon + twinkling stars); gyroscope parallax on mobile
- **Star cursor trail** — stars follow mouse/touch across the whole page; click burst effect
- **Idle star screensaver** — animated stars drift across the screen when idle
- **Custom SVG project illustrations** — each project has a hand-crafted illustration instead of a screenshot
- **Interactive case study modal** — per-project deep dive with STAR-format modules and architecture diagrams
- **i18n** — English / Vietnamese via `next-intl`
- **Dark mode** — `next-themes`, semantic color tokens throughout
- **Functional contact form** — EmailJS + React Hook Form, no backend required
- **Easter eggs** — Konami code, shake (mobile), typing sequence, logo click burst

## Tech Stack

| Layer | Library |
|---|---|
| Framework | Next.js 15 (App Router) |
| Language | TypeScript |
| Styling | Tailwind CSS v4 |
| UI Primitives | shadcn/ui (Radix) |
| Animation | Framer Motion |
| i18n | next-intl |
| Theme | next-themes |
| Forms | React Hook Form |
| Email | EmailJS |
| Icons | Lucide React, Simple Icons |

## Project Structure

```
├── messages/               # i18n translations (en.json, vi.json)
├── public/
│   ├── files/resume.pdf
│   ├── images/             # Album art, project assets
│   └── music/              # Background track
├── src/
│   ├── app/[locale]/       # Next.js App Router with locale segment
│   ├── components/
│   │   ├── sections/       # Hero, About, Skills, Projects, Experience, Contact
│   │   │   └── projects/   # ProjectCard, ProjectCaseStudy, ProjectImage
│   │   ├── shared/         # Navbar, Footer, FloatingMusicPlayer, EasterEgg, ...
│   │   └── ui/             # shadcn/ui primitives
│   ├── constants/          # All content data (projects, skills, experience, socials)
│   ├── hooks/              # useKonamiCode, useTypingSequence, useMediaQuery
│   └── i18n/               # next-intl routing & request config
```

## Getting Started

### 1. Clone

```bash
git clone https://github.com/pahopu/pahopu-portfolio.git
cd pahopu-portfolio
```

### 2. Install

```bash
npm install
```

### 3. Environment variables

Create `.env.local` for the contact form:

```env
NEXT_PUBLIC_EMAILJS_SERVICE_ID=your_service_id
NEXT_PUBLIC_EMAILJS_TEMPLATE_ID=your_template_id
NEXT_PUBLIC_EMAILJS_PUBLIC_KEY=your_public_key
```

Get these from [emailjs.com](https://www.emailjs.com/).

### 4. Run

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Customization

- **Content** (projects, experience, skills, socials): `src/constants/index.tsx`
- **Translations**: `messages/en.json`, `messages/vi.json`
- **Project illustrations**: `src/components/sections/projects/project-image.tsx`
- **Music track**: update `TRACK` in `src/components/shared/floating-music-player.tsx`

## Contact

**Pham Hoang Phuc** — Front-End Developer

- LinkedIn: [linkedin.com/in/pahopu](https://www.linkedin.com/in/pahopu)
- GitHub: [github.com/pahopu](https://github.com/pahopu)
- Email: hoangphucpham.work@gmail.com

---

<p align="center"><i>© 2026 Pham Hoang Phuc</i></p>
