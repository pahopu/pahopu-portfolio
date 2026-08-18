# Portfolio Redesign Design Spec
**Date:** 2026-08-18  
**Status:** Approved for implementation  
**Owner:** pahopu (phphuc@sk-global.biz)

---

## Overview

Full redesign of `pahopu-portfolio` (Next.js 16 + React 19 + Tailwind v4 + shadcn/ui + Framer Motion) covering:
- CONGBDAY-inspired pastel UI (light + dark mode)
- Route-based i18n (EN + VI, full bilingual including project descriptions)
- Two new sections: Skills (visual icons) + Experience (vertical timeline)
- Two new projects: CareLink + Uni-Voice
- Easter egg (fun, fits CONGB vibe)

Implementation is **incremental** — each phase is reviewed before the next starts.

---

## Phase 1 — UI Redesign (CONGBDAY Palette)

### Motivation
Current palette is a blue-gray monotone with no personality. CONGBDAY by CONGB — "Vitamin C", "Sweet Love", positive energy — provides the reference aesthetic: warm pastels, playful, youthful, vibrant but not harsh.

### Light Mode Tokens

| CSS Token | Value (oklch) | Hex approx | Purpose |
|-----------|--------------|------------|---------|
| `--background` | warm cream | `#FFF8F2` | Main background |
| `--foreground` | deep plum | `#3D1C52` | Primary text |
| `--primary` | peach-orange | `#FF8C5A` | Buttons, CTA, active states |
| `--primary-foreground` | warm white | `#FFF8F2` | Text on primary |
| `--secondary` | bubblegum pink | `#FFB3C6` | Hover, secondary actions |
| `--secondary-foreground` | deep plum | `#3D1C52` | Text on secondary |
| `--accent` | mint/sky | `#A8E6CF` | Tag highlights, accents |
| `--accent-foreground` | deep plum | `#3D1C52` | Text on accent |
| `--muted` | soft lemon | `#FFF3CD` | Card bg, muted surfaces |
| `--muted-foreground` | dusty rose | `#A07080` | Secondary text |
| `--border` | peach tint | `#FFD6C0` | Borders |
| `--card` | warm white | `#FFFBF7` | Card surface |
| `--ring` | peach-orange | `#FF8C5A` | Focus rings |

### Dark Mode Tokens

| CSS Token | Value | Purpose |
|-----------|-------|---------|
| `--background` | deep indigo-plum `#1A1025` | Main background |
| `--foreground` | warm white `#FFF0E8` | Primary text |
| `--primary` | soft coral `#FF7F6E` | Buttons, CTA |
| `--primary-foreground` | deep plum `#1A1025` | Text on primary |
| `--secondary` | mauve `#C678A0` | Secondary actions |
| `--card` | deep purple-gray `#231535` | Card surface |
| `--accent` | lavender `#B39DDB` | Highlights |
| `--muted` | dark plum `#2D1B40` | Muted surfaces |
| `--muted-foreground` | dusty lavender `#9E8BA8` | Secondary text |
| `--border` | plum-tinted `#3D2550` | Borders |

### Layout Changes
- `--radius` increased to `0.875rem` — softer, more playful corners
- Hero gradient: peach → pink → mint (replaces current blue radial)
- Hero gradient text: `#FF8C5A → #FFB3C6 → #A8E6CF → #B39DDB` (replaces rainbow)
- Card hover: subtle lift + warm shadow (pastel tinted)
- Scrollbar thumb: peach-orange on hover

### Files Changed
- `src/app/globals.css` — all CSS custom properties

---

## Phase 2 — New Sections: Skills + Experience

### Skills Section
- Positioned between Hero and Projects
- Visual grid of tech icons + labels (no prose)
- Categories: Frontend Frameworks, Languages, Tools & Infra
- Icons: use `simple-icons` or SVG sprites (no heavy icon lib)
- Animation: stagger fade-in on scroll (Framer Motion)

**Skills to show (from actual work):**
- Frontend: Vue 3, React, TypeScript, JavaScript
- Styling: Tailwind CSS, UnoCSS, Vuetify, Quasar
- Tools: Pinia, Vite, AG Grid, Framer Motion
- Backend/Infra: Firebase, AWS (S3/Cognito/Amplify), Python/Flask (minor)

### Experience Section (Timeline)
- Positioned after Projects, before Contact
- Vertical timeline, alternating left/right on desktop, single column on mobile
- Each entry: Company, Role, Period, 2-3 bullet highlights
- Animate on scroll

**Entries:**
1. **Spring Knowledge Global (SK-Global)** — Frontend Developer  
   Mar 2026 – Present  
   Projects: CareLink (Vue 3 healthcare platform, 3 portals) + Uni-Voice (Vue 3 + Quasar disaster-response admin)

2. **DVA Group Holdings** — Frontend Developer  
   [Start date TBD] – Feb 2026  
   Project: DIVA ERP (Vue 3 + Quasar, 3 integrated sites: Admin, POS, CRM)

### Files Changed
- `src/components/sections/skills.tsx` (new)
- `src/components/sections/experience.tsx` (new)
- `src/app/page.tsx` — add new sections
- `src/constants/index.tsx` — add SKILLS and EXPERIENCE data

---

## Phase 3 — i18n Setup (next-intl, route-based)

### Routing
- Install `next-intl`
- Add `middleware.ts` — redirect `/` → `/en`, handle locale detection
- Restructure `src/app/` → `src/app/[locale]/`
- Supported locales: `['en', 'vi']`, default: `'en'`
- Language switcher in Navbar (toggle EN ↔ VI)

### File Structure
```
src/
├── app/[locale]/
│   ├── layout.tsx
│   ├── page.tsx
│   └── not-found.tsx
├── i18n/
│   ├── routing.ts
│   └── request.ts
├── messages/
│   ├── en.json
│   └── vi.json
└── middleware.ts
```

### Locale Persistence
- Save chosen locale to cookie (`NEXT_LOCALE`) via next-intl built-in — no extra lib needed

---

## Phase 4 — EN Content (messages/en.json)

All UI strings and content in English:
- Navigation labels, section headings, CTA buttons
- Hero headline, tagline, badge text
- About paragraph
- Skills section labels
- Experience entries (role, highlights)
- Project titles, descriptions, achievements, case study text
- Contact section copy
- Footer copy

This phase locks the canonical English content before translation.

---

## Phase 5 — VI Content (messages/vi.json)

Full Vietnamese translation of all strings in Phase 4.
- Technical terms (AG Grid, Vue 3, TypeScript) stay as-is
- Project names (CareLink, Uni-Voice, DIVA ERP) stay as-is
- Tone: professional but approachable (not stiff formal Vietnamese)

---

## Phase 6 — New Projects: CareLink + Uni-Voice

### CareLink (Spring Knowledge Global)
- **Type:** Healthcare platform — 3 portals (Admin, Doctor, Provider)
- **Stack:** Vue 3, TypeScript, Vuetify 3, UnoCSS, Pinia, AG Grid, Chart.js/ApexCharts, vee-validate + Zod, vue-i18n, Firebase, CASL
- **Period:** Mar 2026 – Jun 2026
- **Featured:** true
- **Key highlights (no fabricated metrics):**
  - Statistics Dashboard (largest module — KPIs, trend charts, commission calc, PDF export)
  - Provider/Facility management (create/approve/restore/deactivate, Google Maps, file upload)
  - Smart PDF/Excel export pipeline (auto page-break slicing, custom font embedding)
  - Patient document module (viewer, thumbnails, dedup, search)
  - Indication slip sharing (responsive PDF preview, QR code, geocoding)
  - MedLink → CareLink rebrand execution across 3 portals

### Uni-Voice (Spring Knowledge Global)
- **Type:** Hazard map admin system for Japanese municipal disaster-response operators
- **Stack:** Vue 3, Quasar, TypeScript, AWS S3/Cognito, AWS Amplify CI/CD, Leaflet, Google Maps, GeoJSON
- **Period:** May 2026 – Present
- **Featured:** false
- **Key highlights:**
  - Interactive shelter mapping (Leaflet + Google Maps, GeoJSON, clustering)
  - Bulk CSV import/export for shelter data by prefecture
  - Machine translation pipeline (Google Translate API) for multilingual shelter data
  - Map tile generation job system — stepper wizard, S3 pipeline, drag-and-drop layer ordering
  - Cross-resource tag management (CRUD, ag-grid, dedupe)
  - Evacuation behavior management (bulk import + validation, misconfiguration audit tool)

---

## Phase 7 — Easter Egg

### Design
**Trigger:** Konami code (↑↑↓↓←→←→BA) anywhere on page  
**Effect:**
1. Confetti burst in CONGBDAY palette colors (peach, pink, mint, lemon, lavender)
2. Small toast notification: "🎉 Bạn vừa mở khóa chế độ vui vẻ!" (EN: "🎉 You found the secret!")
3. For 5 seconds: cursor changes to a star ✨, background gets subtle sparkle overlay

**Implementation:** `canvas-confetti` (tiny lib, 3KB gzipped) + custom hook `useKonamiCode`

---

## Constraints & Non-Goals

- No fabricated metrics (user count, adoption rate, scale numbers) — none exist in source repos
- No blog section (out of scope)
- No GitHub activity widget (out of scope)
- DVA Group start date TBD — leave as "20XX" placeholder until user provides it
- `resume.pdf` update is a separate task, not part of this spec

---

## Implementation Order Summary

| Phase | Scope | Estimated complexity |
|-------|-------|---------------------|
| 1 | CONGBDAY palette + layout polish | Low |
| 2 | Skills + Experience sections | Medium |
| 3 | next-intl setup + routing | Medium-High |
| 4 | EN content (messages/en.json) | Medium |
| 5 | VI translation (messages/vi.json) | Medium |
| 6 | CareLink + Uni-Voice project data | Low |
| 7 | Konami code easter egg | Low |
