> **Historical record — completed 2026-08.** This plan has been executed; the codebase has since evolved past it (skill categories, content, and features have changed). Kept for context on original design decisions, not as a description of the current architecture. See `README.md` for the current state.

# Portfolio Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Redesign pahopu-portfolio with CONGBDAY-inspired pastel UI, route-based EN/VI i18n, Skills + Experience sections, CareLink + Uni-Voice projects, and a Konami code easter egg.

**Architecture:** Next.js 16 App Router with next-intl wrapping the app in `[locale]` route segments; all strings in `messages/en.json` + `messages/vi.json`; new sections as standalone RSC components; CSS custom properties drive the entire palette via Tailwind v4 theme tokens.

**Tech Stack:** Next.js 16, React 19, TypeScript, Tailwind CSS v4, shadcn/ui, Framer Motion, next-intl, canvas-confetti

**Spec:** `docs/superpowers/specs/2026-08-18-portfolio-redesign-design.md`

## Global Constraints

- Node/npm: whatever is already installed (no version change needed)
- Tailwind v4 syntax: `@theme inline` block in globals.css, NOT tailwind.config.js
- All oklch() values — Tailwind v4 uses oklch natively
- No fabricated metrics in project descriptions (user count, adoption numbers, etc.)
- DVA Group Holdings start date: leave as `"2023"` placeholder until user confirms
- `next-intl` version: `^3` (App Router compatible)
- `canvas-confetti` version: `^1.9`
- Each phase ends with `npm run build` passing before commit
- Dev server: `npm run dev` on port 3000

---

## Phase 1 — CONGBDAY Palette

### Task 1: Replace CSS custom properties with CONGBDAY palette

**Files:**
- Modify: `src/app/globals.css`

**Interfaces:**
- Produces: CSS tokens `--primary`, `--secondary`, `--accent`, `--background`, `--foreground`, `--muted`, `--muted-foreground`, `--card`, `--border`, `--ring`, `--radius` consumed by all components

- [ ] **Step 1: Open the file and locate the `:root` and `.dark` blocks**

  The blocks are at lines 46–113 of `src/app/globals.css`. You will replace both blocks entirely. Do NOT touch `@theme inline`, `@layer base`, or `@layer utilities`.

- [ ] **Step 2: Replace the `:root` block with CONGBDAY light palette**

  Replace the entire `:root { ... }` block (lines 46–79) with:

  ```css
  :root {
    --radius: 0.875rem;
    --background: oklch(0.987 0.015 55);
    --foreground: oklch(0.22 0.08 310);
    --card: oklch(0.993 0.008 70);
    --card-foreground: oklch(0.22 0.08 310);
    --popover: oklch(0.993 0.008 70);
    --popover-foreground: oklch(0.22 0.08 310);
    --primary: oklch(0.72 0.18 45);
    --primary-foreground: oklch(0.987 0.015 55);
    --secondary: oklch(0.84 0.1 5);
    --secondary-foreground: oklch(0.22 0.08 310);
    --muted: oklch(0.975 0.07 90);
    --muted-foreground: oklch(0.58 0.07 10);
    --accent: oklch(0.87 0.08 160);
    --accent-foreground: oklch(0.22 0.08 310);
    --destructive: oklch(0.577 0.245 27.325);
    --border: oklch(0.92 0.07 50);
    --input: oklch(0.92 0.07 50);
    --ring: oklch(0.72 0.18 45);
    --chart-1: oklch(0.72 0.18 45);
    --chart-2: oklch(0.84 0.1 5);
    --chart-3: oklch(0.87 0.08 160);
    --chart-4: oklch(0.975 0.07 90);
    --chart-5: oklch(0.72 0.1 300);
    --sidebar: oklch(0.987 0.015 55);
    --sidebar-foreground: oklch(0.22 0.08 310);
    --sidebar-primary: oklch(0.72 0.18 45);
    --sidebar-primary-foreground: oklch(0.987 0.015 55);
    --sidebar-accent: oklch(0.87 0.08 160);
    --sidebar-accent-foreground: oklch(0.22 0.08 310);
    --sidebar-border: oklch(0.92 0.07 50);
    --sidebar-ring: oklch(0.72 0.18 45);
  }
  ```

- [ ] **Step 3: Replace the `.dark` block with CONGBDAY dark palette**

  Replace the entire `.dark { ... }` block (lines 81–113) with:

  ```css
  .dark {
    --background: oklch(0.12 0.05 310);
    --foreground: oklch(0.975 0.02 50);
    --card: oklch(0.16 0.06 310);
    --card-foreground: oklch(0.975 0.02 50);
    --popover: oklch(0.16 0.06 310);
    --popover-foreground: oklch(0.975 0.02 50);
    --primary: oklch(0.71 0.16 25);
    --primary-foreground: oklch(0.12 0.05 310);
    --secondary: oklch(0.6 0.12 340);
    --secondary-foreground: oklch(0.975 0.02 50);
    --muted: oklch(0.19 0.07 310);
    --muted-foreground: oklch(0.63 0.05 310);
    --accent: oklch(0.72 0.1 300);
    --accent-foreground: oklch(0.975 0.02 50);
    --destructive: oklch(0.704 0.191 22.216);
    --border: oklch(0.25 0.08 310);
    --input: oklch(0.25 0.08 310);
    --ring: oklch(0.71 0.16 25);
    --chart-1: oklch(0.71 0.16 25);
    --chart-2: oklch(0.6 0.12 340);
    --chart-3: oklch(0.72 0.1 300);
    --chart-4: oklch(0.75 0.12 90);
    --chart-5: oklch(0.87 0.08 160);
    --sidebar: oklch(0.16 0.06 310);
    --sidebar-foreground: oklch(0.975 0.02 50);
    --sidebar-primary: oklch(0.71 0.16 25);
    --sidebar-primary-foreground: oklch(0.12 0.05 310);
    --sidebar-accent: oklch(0.72 0.1 300);
    --sidebar-accent-foreground: oklch(0.975 0.02 50);
    --sidebar-border: oklch(0.25 0.08 310);
    --sidebar-ring: oklch(0.71 0.16 25);
  }
  ```

- [ ] **Step 4: Update the hero gradient text in `@layer utilities`**

  Find the `.animate-gradient-text` usage in `src/components/sections/hero.tsx` — the inline gradient string. Update it from the rainbow to:

  ```
  bg-[linear-gradient(to_right,#FF8C5A,#FFB3C6,#A8E6CF,#B39DDB,#FF8C5A)]
  ```

- [ ] **Step 5: Update the hero radial background glow in `hero.tsx`**

  Find this line in `src/components/sections/hero.tsx`:
  ```tsx
  <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_500px_at_50%_200px,#3b82f626,transparent)]" />
  ```
  Replace with:
  ```tsx
  <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_500px_at_50%_200px,#FF8C5A26,transparent)]" />
  ```

- [ ] **Step 6: Start dev server and verify visually**

  ```bash
  npm run dev
  ```

  Open http://localhost:3000 and check:
  - Light mode: warm cream background, peach-orange buttons, soft borders ✓
  - Toggle dark mode: deep indigo-plum background, coral buttons ✓
  - Hero gradient text cycles through peach → pink → mint → lavender ✓
  - No harsh blue anywhere ✓

- [ ] **Step 7: Build check**

  ```bash
  npm run build
  ```

  Expected: no TypeScript errors, build succeeds.

- [ ] **Step 8: Commit**

  ```bash
  git add src/app/globals.css src/components/sections/hero.tsx
  git commit -m "feat: apply CONGBDAY pastel palette (light + dark mode)"
  ```

---

## Phase 2 — Skills Section + Experience Timeline

### Task 2: Add SKILLS and EXPERIENCE data to constants

**Files:**
- Modify: `src/constants/index.tsx`

**Interfaces:**
- Produces:
  - `SKILLS: { category: string; items: { name: string; icon: string }[] }[]`
  - `EXPERIENCE: { company: string; role: string; period: string; current: boolean; highlights: string[] }[]`
  - Both consumed by Task 3 and Task 4

- [ ] **Step 1: Add SKILLS constant**

  Append to `src/constants/index.tsx`:

  ```tsx
  /* --- SECTION: SKILLS --- */
  export const SKILLS = [
    {
      category: "Frontend Frameworks",
      items: [
        { name: "Vue 3", icon: "vue" },
        { name: "React", icon: "react" },
        { name: "Next.js", icon: "nextdotjs" },
        { name: "Nuxt.js", icon: "nuxtdotjs" },
      ],
    },
    {
      category: "Languages & Styling",
      items: [
        { name: "TypeScript", icon: "typescript" },
        { name: "JavaScript", icon: "javascript" },
        { name: "Tailwind CSS", icon: "tailwindcss" },
        { name: "UnoCSS", icon: "unocss" },
      ],
    },
    {
      category: "UI Libraries",
      items: [
        { name: "Vuetify", icon: "vuetify" },
        { name: "Quasar", icon: "quasar" },
        { name: "shadcn/ui", icon: "shadcnui" },
        { name: "Framer Motion", icon: "framer" },
      ],
    },
    {
      category: "State & Data",
      items: [
        { name: "Pinia", icon: "pinia" },
        { name: "AG Grid", icon: "aggrid" },
        { name: "Vite", icon: "vite" },
        { name: "Firebase", icon: "firebase" },
      ],
    },
    {
      category: "Cloud & Infra",
      items: [
        { name: "AWS S3", icon: "amazons3" },
        { name: "AWS Amplify", icon: "awsamplify" },
        { name: "Git", icon: "git" },
        { name: "Python", icon: "python" },
      ],
    },
  ];

  /* --- SECTION: EXPERIENCE --- */
  export const EXPERIENCE = [
    {
      company: "Spring Knowledge Global",
      role: "Frontend Developer",
      period: "Mar 2026 – Present",
      current: true,
      highlights: [
        "Built CareLink — a healthcare platform with 3 Vue 3 portals (Admin, Doctor, Provider) featuring Statistics Dashboards, Provider management, and smart PDF/Excel export pipelines.",
        "Built Uni-Voice — a disaster-response admin system for Japanese municipalities using Vue 3 + Quasar + AWS, featuring interactive shelter mapping (Leaflet/GeoJSON), bulk CSV import, and map tile generation.",
        "Led the MedLink → CareLink rebrand across all 3 portals including i18n, dark mode, and shared component updates.",
      ],
    },
    {
      company: "DVA Group Holdings",
      role: "Frontend Developer",
      period: "2023 – Feb 2026",
      current: false,
      highlights: [
        "Built DIVA ERP — a large-scale enterprise system (Admin, POS, CRM) serving 2,000+ employees with shared component library and 40% bundle size reduction via code-splitting.",
        "Implemented Payroll Engine, Affiliate Hub, 360° Customer View, and Smart Appointment Calendar.",
        "Delivered the Lucky Draw gamification system with tier-based rewards and configurable events.",
      ],
    },
  ];
  ```

- [ ] **Step 2: Build check**

  ```bash
  npm run build
  ```

  Expected: no errors.

- [ ] **Step 3: Commit**

  ```bash
  git add src/constants/index.tsx
  git commit -m "feat: add SKILLS and EXPERIENCE data to constants"
  ```

---

### Task 3: Build Skills section component

**Files:**
- Create: `src/components/sections/skills.tsx`

**Interfaces:**
- Consumes: `SKILLS` from `@/constants`
- Produces: `<Skills />` React component (no props)

- [ ] **Step 1: Install simple-icons**

  ```bash
  npm install simple-icons
  ```

- [ ] **Step 2: Create `src/components/sections/skills.tsx`**

  ```tsx
  "use client";

  import { SKILLS } from "@/constants";
  import { motion } from "framer-motion";
  import * as SimpleIcons from "simple-icons";

  function getIcon(slug: string): string | null {
    const key = `si${slug.charAt(0).toUpperCase()}${slug.slice(1)}` as keyof typeof SimpleIcons;
    const icon = SimpleIcons[key] as { path: string; hex: string } | undefined;
    return icon ? icon.path : null;
  }

  export const Skills = () => {
    return (
      <section id="skills" className="w-full py-20 md:py-28">
        <div className="container px-4 md:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Skills
            </h2>
            <p className="mt-3 text-muted-foreground text-lg">
              Technologies I work with
            </p>
          </motion.div>

          <div className="space-y-10">
            {SKILLS.map((group, groupIndex) => (
              <div key={group.category}>
                <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-widest mb-4">
                  {group.category}
                </h3>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {group.items.map((skill, i) => {
                    const iconPath = getIcon(skill.icon);
                    return (
                      <motion.div
                        key={skill.name}
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{
                          delay: groupIndex * 0.05 + i * 0.05,
                          duration: 0.3,
                        }}
                        className="flex items-center gap-3 p-3 rounded-xl border border-border bg-card hover:border-primary/50 hover:bg-primary/5 transition-all duration-200 group cursor-default"
                      >
                        {iconPath ? (
                          <svg
                            role="img"
                            viewBox="0 0 24 24"
                            className="h-5 w-5 shrink-0 fill-foreground/70 group-hover:fill-primary transition-colors"
                          >
                            <path d={iconPath} />
                          </svg>
                        ) : (
                          <div className="h-5 w-5 shrink-0 rounded bg-muted" />
                        )}
                        <span className="text-sm font-medium text-foreground/80 group-hover:text-foreground transition-colors">
                          {skill.name}
                        </span>
                      </motion.div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  };
  ```

- [ ] **Step 3: Add `<Skills />` to `src/app/page.tsx`**

  Add import and insert between `<Hero />` and the section break before `<Projects />`:

  ```tsx
  import { Skills } from "@/components/sections/skills";
  // ...
  <Hero />
  <Skills />
  <Projects />
  ```

- [ ] **Step 4: Start dev server and verify**

  ```bash
  npm run dev
  ```

  Check http://localhost:3000#skills:
  - 5 skill categories visible ✓
  - Icons render (SVG paths from simple-icons) ✓
  - Hover: border turns peach, icon turns peach ✓
  - Stagger animation on scroll ✓

- [ ] **Step 5: Build check**

  ```bash
  npm run build
  ```

- [ ] **Step 6: Commit**

  ```bash
  git add src/components/sections/skills.tsx src/app/page.tsx
  git commit -m "feat: add Skills section with simple-icons and stagger animation"
  ```

---

### Task 4: Build Experience Timeline component

**Files:**
- Create: `src/components/sections/experience.tsx`

**Interfaces:**
- Consumes: `EXPERIENCE` from `@/constants`
- Produces: `<Experience />` React component (no props)

- [ ] **Step 1: Create `src/components/sections/experience.tsx`**

  ```tsx
  "use client";

  import { EXPERIENCE } from "@/constants";
  import { motion } from "framer-motion";
  import { Briefcase, MapPin } from "lucide-react";

  export const Experience = () => {
    return (
      <section id="experience" className="w-full py-20 md:py-28">
        <div className="container px-4 md:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Experience
            </h2>
            <p className="mt-3 text-muted-foreground text-lg">
              Where I&apos;ve worked
            </p>
          </motion.div>

          <div className="relative max-w-3xl mx-auto">
            {/* vertical line */}
            <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-border md:-translate-x-px" />

            <div className="space-y-12">
              {EXPERIENCE.map((job, index) => (
                <motion.div
                  key={job.company}
                  initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className={`relative flex flex-col md:flex-row gap-6 ${
                    index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                  }`}
                >
                  {/* dot */}
                  <div className="absolute left-4 md:left-1/2 top-5 -translate-x-1/2 w-3 h-3 rounded-full border-2 border-primary bg-background z-10" />

                  {/* card */}
                  <div
                    className={`ml-12 md:ml-0 md:w-[calc(50%-2rem)] ${
                      index % 2 === 0 ? "md:pr-8 md:text-right" : "md:pl-8"
                    }`}
                  >
                    <div className="p-5 rounded-2xl border border-border bg-card hover:border-primary/30 hover:shadow-sm transition-all duration-200">
                      <div
                        className={`flex items-center gap-2 mb-1 ${
                          index % 2 === 0
                            ? "md:flex-row-reverse"
                            : "flex-row"
                        }`}
                      >
                        <Briefcase className="h-4 w-4 text-primary shrink-0" />
                        <span className="text-xs font-semibold text-primary uppercase tracking-wide">
                          {job.period}
                        </span>
                        {job.current && (
                          <span className="inline-flex items-center gap-1 text-xs font-medium text-green-600 dark:text-green-400">
                            <span className="relative flex h-1.5 w-1.5">
                              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
                              <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-green-500" />
                            </span>
                            Current
                          </span>
                        )}
                      </div>
                      <h3 className="text-lg font-bold text-foreground">
                        {job.company}
                      </h3>
                      <p className="text-sm text-muted-foreground mb-3">
                        {job.role}
                      </p>
                      <ul className="space-y-1.5">
                        {job.highlights.map((h, i) => (
                          <li
                            key={i}
                            className="text-sm text-foreground/80 leading-relaxed"
                          >
                            {h}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* spacer for opposite side */}
                  <div className="hidden md:block md:w-[calc(50%-2rem)]" />
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>
    );
  };
  ```

- [ ] **Step 2: Add `<Experience />` to `src/app/page.tsx`**

  Add import and insert between `<Projects />` and `<ContactSection />`:

  ```tsx
  import { Experience } from "@/components/sections/experience";
  // ...
  <Projects />
  <Experience />
  <ContactSection />
  ```

- [ ] **Step 3: Update NAV_LINKS in `src/constants/index.tsx`**

  Add Skills and Experience links:

  ```tsx
  export const NAV_LINKS = [
    { label: "About", href: "#about" },
    { label: "Skills", href: "#skills" },
    { label: "Projects", href: "#projects" },
    { label: "Experience", href: "#experience" },
    { label: "Contact", href: "#contact" },
  ];
  ```

- [ ] **Step 4: Start dev server and verify**

  ```bash
  npm run dev
  ```

  Check http://localhost:3000#experience:
  - Two timeline entries visible ✓
  - Alternating left/right on desktop ✓
  - Single column on mobile (resize to verify) ✓
  - "Current" badge with green ping on SK-Global entry ✓
  - Vertical line connecting entries ✓
  - Nav links updated ✓

- [ ] **Step 5: Build check**

  ```bash
  npm run build
  ```

- [ ] **Step 6: Commit**

  ```bash
  git add src/components/sections/experience.tsx src/app/page.tsx src/constants/index.tsx
  git commit -m "feat: add Experience timeline section"
  ```

---

## Phase 3 — next-intl Setup + Routing

### Task 5: Install next-intl and configure routing

**Files:**
- Create: `src/i18n/routing.ts`
- Create: `src/i18n/request.ts`
- Create: `middleware.ts` (project root)
- Create: `messages/en.json` (empty scaffold — populated in Phase 4)
- Create: `messages/vi.json` (empty scaffold — populated in Phase 5)

**Interfaces:**
- Produces: `routing` object and `locales`/`defaultLocale` consumed by middleware and request config; `useTranslations` hook available in all components

- [ ] **Step 1: Install next-intl**

  ```bash
  npm install next-intl
  ```

- [ ] **Step 2: Create `src/i18n/routing.ts`**

  ```ts
  import { defineRouting } from "next-intl/routing";

  export const routing = defineRouting({
    locales: ["en", "vi"],
    defaultLocale: "en",
  });
  ```

- [ ] **Step 3: Create `src/i18n/request.ts`**

  ```ts
  import { getRequestConfig } from "next-intl/server";
  import { routing } from "./routing";

  export default getRequestConfig(async ({ requestLocale }) => {
    let locale = await requestLocale;
    if (!locale || !routing.locales.includes(locale as "en" | "vi")) {
      locale = routing.defaultLocale;
    }
    return {
      locale,
      messages: (await import(`../../messages/${locale}.json`)).default,
    };
  });
  ```

- [ ] **Step 4: Create `middleware.ts` at project root**

  ```ts
  import createMiddleware from "next-intl/middleware";
  import { routing } from "./src/i18n/routing";

  export default createMiddleware(routing);

  export const config = {
    matcher: ["/((?!api|_next|_vercel|.*\\..*).*)"],
  };
  ```

- [ ] **Step 5: Create empty message scaffolds**

  Create `messages/en.json`:
  ```json
  {}
  ```

  Create `messages/vi.json`:
  ```json
  {}
  ```

- [ ] **Step 6: Restructure `src/app/` to `src/app/[locale]/`**

  ```bash
  mkdir -p src/app/\[locale\]
  mv src/app/page.tsx src/app/\[locale\]/page.tsx
  mv src/app/layout.tsx src/app/\[locale\]/layout.tsx
  mv src/app/icon.tsx src/app/icon.tsx
  mv src/app/opengraph-image.tsx src/app/opengraph-image.tsx
  ```

  Note: `icon.tsx` and `opengraph-image.tsx` stay at `src/app/` root (not locale-specific).

- [ ] **Step 7: Update `src/app/[locale]/layout.tsx`**

  Replace the entire file with:

  ```tsx
  import type { Metadata } from "next";
  import { Geist, Geist_Mono } from "next/font/google";
  import { ThemeProvider } from "@/components/providers/theme-provider";
  import { Navbar } from "@/components/shared/navbar";
  import { routing } from "@/i18n/routing";
  import { NextIntlClientProvider } from "next-intl";
  import { getMessages } from "next-intl/server";
  import { notFound } from "next/navigation";
  import "../globals.css";

  const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
  const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

  export const metadata: Metadata = {
    title: "pahopu — Frontend Developer",
    description: "Portfolio of pahopu, a Frontend Developer specializing in Vue 3 and React.",
  };

  export function generateStaticParams() {
    return routing.locales.map((locale) => ({ locale }));
  }

  export default async function LocaleLayout({
    children,
    params,
  }: {
    children: React.ReactNode;
    params: Promise<{ locale: string }>;
  }) {
    const { locale } = await params;
    if (!routing.locales.includes(locale as "en" | "vi")) {
      notFound();
    }
    const messages = await getMessages();

    return (
      <html lang={locale} suppressHydrationWarning>
        <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
          <NextIntlClientProvider messages={messages}>
            <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
              <Navbar />
              {children}
            </ThemeProvider>
          </NextIntlClientProvider>
        </body>
      </html>
    );
  }
  ```

- [ ] **Step 8: Update `next.config.ts` (or create it) to add next-intl plugin**

  Check if file is `next.config.ts` or `next.config.js`:

  ```bash
  ls /Users/pahopu/Personal/pahopu-portfolio/next.config*
  ```

  If `next.config.ts` exists, replace content with:

  ```ts
  import createNextIntlPlugin from "next-intl/plugin";

  const withNextIntl = createNextIntlPlugin("./src/i18n/request.ts");

  const nextConfig = {};

  export default withNextIntl(nextConfig);
  ```

  If `next.config.js` exists, replace content with:

  ```js
  const createNextIntlPlugin = require("next-intl/plugin");

  const withNextIntl = createNextIntlPlugin("./src/i18n/request.ts");

  const nextConfig = {};

  module.exports = withNextIntl(nextConfig);
  ```

- [ ] **Step 9: Add language switcher to Navbar**

  Open `src/components/shared/navbar.tsx`. Add a locale switcher button next to the theme toggle. Import `useRouter`, `usePathname`, `useLocale` from next-intl:

  ```tsx
  "use client";
  import { useLocale } from "next-intl";
  import { useRouter, usePathname } from "next-intl/navigation"; // NOT next/navigation
  // ... existing imports

  // Inside the Navbar component, after the theme toggle:
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  const switchLocale = () => {
    const next = locale === "en" ? "vi" : "en";
    router.replace(pathname, { locale: next });
  };

  // In JSX, add next to ModeToggle:
  <button
    onClick={switchLocale}
    className="text-xs font-semibold px-2 py-1 rounded-md border border-border hover:bg-accent hover:text-accent-foreground transition-colors"
    aria-label="Switch language"
  >
    {locale === "en" ? "VI" : "EN"}
  </button>
  ```

  Note: You will need to read the existing navbar.tsx first to find the right insertion point. The key change is adding the switcher button and updating imports to use `next-intl/navigation` instead of `next/navigation` for `useRouter`/`usePathname`.

- [ ] **Step 10: Start dev server and verify**

  ```bash
  npm run dev
  ```

  Check:
  - http://localhost:3000 redirects to http://localhost:3000/en ✓
  - http://localhost:3000/vi loads ✓
  - Language switcher button visible in navbar ✓
  - Clicking switcher toggles EN ↔ VI in URL ✓

- [ ] **Step 11: Build check**

  ```bash
  npm run build
  ```

- [ ] **Step 12: Commit**

  ```bash
  git add src/i18n/ middleware.ts messages/ src/app/\[locale\]/ next.config.* src/components/shared/navbar.tsx
  git commit -m "feat: add next-intl route-based i18n (/en, /vi)"
  ```

---

## Phase 4 — EN Content (messages/en.json)

### Task 6: Populate full English message file

**Files:**
- Modify: `messages/en.json`

**Interfaces:**
- Produces: translation keys consumed by all components via `useTranslations(namespace)`

- [ ] **Step 1: Replace `messages/en.json` with full EN content**

  ```json
  {
    "nav": {
      "about": "About",
      "skills": "Skills",
      "projects": "Projects",
      "experience": "Experience",
      "contact": "Contact"
    },
    "hero": {
      "badge": "Ready for new challenges",
      "headline": "Hi, I'm pahopu 👋",
      "role": "Front-End Developer",
      "tagline": "I build scalable, high-performance web applications. While I specialize in the React & Vue ecosystems, I remain flexible to adapt to any technology needed to solve the problem.",
      "foundation": "Solid Computer Science Foundation",
      "cta_contact": "Contact Me",
      "cta_projects": "View Projects",
      "cta_cv": "Download CV"
    },
    "about": {
      "heading": "About Me",
      "body": "I'm a Frontend Developer with a strong Computer Science foundation, passionate about crafting high-quality user interfaces. I specialize in Vue 3 and React, and I thrive in complex, data-heavy applications — from healthcare platforms to enterprise ERP systems and disaster-response tools."
    },
    "skills": {
      "heading": "Skills",
      "subheading": "Technologies I work with"
    },
    "projects": {
      "heading": "Projects",
      "subheading": "Things I've built",
      "view_demo": "Live Demo",
      "view_github": "GitHub",
      "view_case_study": "Case Study",
      "close": "Close",
      "no_demo": "No demo available",
      "no_github": "Private repository"
    },
    "experience": {
      "heading": "Experience",
      "subheading": "Where I've worked",
      "current": "Current"
    },
    "contact": {
      "heading": "Get In Touch",
      "subheading": "Have a project in mind? Let's talk.",
      "name_label": "Name",
      "email_label": "Email",
      "message_label": "Message",
      "send": "Send Message",
      "sending": "Sending...",
      "success": "Message sent! I'll get back to you soon.",
      "error": "Something went wrong. Please try again."
    },
    "footer": {
      "built_with": "Built with Next.js & ❤️"
    }
  }
  ```

- [ ] **Step 2: Wire up translations in components**

  For each component that has hardcoded strings, add:
  ```tsx
  import { useTranslations } from "next-intl";
  const t = useTranslations("namespace");
  // Replace hardcoded strings with t("key")
  ```

  Components to update (in order):
  1. `src/components/shared/navbar.tsx` — use `t("nav.*")`
  2. `src/components/sections/hero.tsx` — use `t("hero.*")`
  3. `src/components/sections/about.tsx` — use `t("about.*")`
  4. `src/components/sections/skills.tsx` — use `t("skills.*")`
  5. `src/components/sections/projects.tsx` + `project-card.tsx` — use `t("projects.*")`
  6. `src/components/sections/experience.tsx` — use `t("experience.*")`
  7. `src/components/sections/contact.tsx` — use `t("contact.*")`
  8. `src/components/shared/footer.tsx` — use `t("footer.*")`

  Note: Project titles/descriptions/achievements can stay in `constants/index.tsx` for Phase 4 — move them to messages in Phase 6 when adding CareLink/Uni-Voice.

- [ ] **Step 3: Verify EN content in browser**

  ```bash
  npm run dev
  ```

  Open http://localhost:3000/en — all text renders correctly from translations ✓

- [ ] **Step 4: Build check**

  ```bash
  npm run build
  ```

- [ ] **Step 5: Commit**

  ```bash
  git add messages/en.json src/components/
  git commit -m "feat: wire up English translations via next-intl"
  ```

---

## Phase 5 — VI Content (messages/vi.json)

### Task 7: Populate full Vietnamese message file

**Files:**
- Modify: `messages/vi.json`

**Interfaces:**
- Consumes: same key structure as `messages/en.json`

- [ ] **Step 1: Replace `messages/vi.json` with full VI content**

  ```json
  {
    "nav": {
      "about": "Giới thiệu",
      "skills": "Kỹ năng",
      "projects": "Dự án",
      "experience": "Kinh nghiệm",
      "contact": "Liên hệ"
    },
    "hero": {
      "badge": "Sẵn sàng cho thử thách mới",
      "headline": "Xin chào, tôi là pahopu 👋",
      "role": "Lập trình viên Front-End",
      "tagline": "Tôi xây dựng các ứng dụng web hiệu suất cao và có thể mở rộng. Dù chuyên sâu về hệ sinh thái React và Vue, tôi luôn linh hoạt để thích nghi với bất kỳ công nghệ nào phù hợp nhất.",
      "foundation": "Nền tảng Khoa học Máy tính vững chắc",
      "cta_contact": "Liên hệ ngay",
      "cta_projects": "Xem dự án",
      "cta_cv": "Tải CV"
    },
    "about": {
      "heading": "Về tôi",
      "body": "Tôi là Lập trình viên Frontend với nền tảng Khoa học Máy tính vững chắc, đam mê tạo ra giao diện người dùng chất lượng cao. Tôi chuyên về Vue 3 và React, và phát triển mạnh trong các ứng dụng phức tạp, nhiều dữ liệu — từ nền tảng y tế đến hệ thống ERP doanh nghiệp và công cụ ứng phó thảm họa."
    },
    "skills": {
      "heading": "Kỹ năng",
      "subheading": "Công nghệ tôi sử dụng"
    },
    "projects": {
      "heading": "Dự án",
      "subheading": "Những thứ tôi đã xây dựng",
      "view_demo": "Xem Demo",
      "view_github": "GitHub",
      "view_case_study": "Chi tiết",
      "close": "Đóng",
      "no_demo": "Chưa có demo",
      "no_github": "Kho lưu trữ riêng tư"
    },
    "experience": {
      "heading": "Kinh nghiệm",
      "subheading": "Nơi tôi đã làm việc",
      "current": "Hiện tại"
    },
    "contact": {
      "heading": "Liên hệ",
      "subheading": "Có dự án trong đầu? Hãy nói chuyện.",
      "name_label": "Họ tên",
      "email_label": "Email",
      "message_label": "Tin nhắn",
      "send": "Gửi tin nhắn",
      "sending": "Đang gửi...",
      "success": "Đã gửi! Tôi sẽ phản hồi sớm nhất có thể.",
      "error": "Có lỗi xảy ra. Vui lòng thử lại."
    },
    "footer": {
      "built_with": "Được xây dựng bằng Next.js & ❤️"
    }
  }
  ```

- [ ] **Step 2: Verify VI content in browser**

  Open http://localhost:3000/vi — all text renders in Vietnamese ✓
  Switch to http://localhost:3000/en — English renders correctly ✓
  Language switcher button toggles between the two ✓

- [ ] **Step 3: Build check**

  ```bash
  npm run build
  ```

- [ ] **Step 4: Commit**

  ```bash
  git add messages/vi.json
  git commit -m "feat: add full Vietnamese translations"
  ```

---

## Phase 6 — CareLink + Uni-Voice Projects

### Task 8: Add CareLink and Uni-Voice to PROJECTS constant

**Files:**
- Modify: `src/constants/index.tsx`

**Interfaces:**
- Produces: 2 new entries in `PROJECTS` array with the same shape as existing entries

- [ ] **Step 1: Add CareLink project object to PROJECTS array**

  Append before the closing `];` of the `PROJECTS` array:

  ```tsx
  /* --- PROJECT 4: CARELINK --- */
  {
    id: "carelink",
    title: "CareLink — Healthcare Platform",
    description:
      "A multi-portal healthcare platform comprising 3 Vue 3 applications (Admin, Doctor, Provider) for managing providers, patients, appointments, and clinical data. Built for Spring Knowledge Global.",
    image: "/images/carelink-placeholder.png",
    tags: [
      "Vue 3",
      "TypeScript",
      "Vuetify 3",
      "UnoCSS",
      "Pinia",
      "AG Grid",
      "Firebase",
      "CASL",
    ],
    links: {
      demo: null,
      github: null,
    },
    achievements: [
      "Built Statistics Dashboards across 3 portals — KPIs, trend charts, commission calculations, and PDF/Excel export with auto page-break slicing.",
      "End-to-end Provider/Facility management with Google Maps integration, file uploads, and role-based access via CASL.",
      "Patient document module with PDF viewer, thumbnail previews, deduplication, and search; Indication slip sharing with QR code and geocoding.",
    ],
    featured: true,
    caseStudy: {
      type: "complex",
      overview: {
        challenge:
          "Three distinct user groups (Admins, Doctors, Providers) needed tailored workflows with shared business logic — and the platform was mid-project rebranded from MedLink to CareLink, requiring consistent updates across all portals.",
        solution:
          "Adopted a **shared architecture** with Vuetify 3 + UnoCSS + Pinia across all 3 portals, with CASL-based permission gating per user type. Led the **rebrand execution** — updating component names, i18n strings, dark mode tokens, and assets across the entire codebase.",
        impact:
          "Delivered a cohesive multi-portal product with consistent UX, permission-aware feature access, and a full-featured Statistics Dashboard as the primary analytical tool for all three user groups.",
      },
      diagram: {
        type: "hub-spoke" as const,
        title: "3-Portal Architecture",
        nodes: [
          { label: "Admin Portal" },
          { label: "Doctor Portal" },
          { label: "Provider Portal" },
        ],
      },
      modules: [
        {
          id: "statistics",
          name: "Statistics Dashboard",
          icon: "LayoutDashboard",
          star: {
            situation:
              "All three portals needed analytical dashboards giving each user type visibility into their own KPIs — revenue, patient flow, appointment TAT, and commission.",
            task: "Build rich, interactive dashboards with chart visualizations and exportable reports for each portal.",
            action: [
              "**KPI Cards & Trend Charts:** Implemented Chart.js/ApexCharts visualizations for revenue, retention, and TAT metrics tailored per portal.",
              "**Smart PDF/Excel Export:** Built an auto page-break pipeline with custom font embedding for high-fidelity report generation.",
              "**Provider Dashboard (10k+ lines):** Built the Provider Statistics module from scratch in a single focused sprint.",
            ],
            result:
              "Each portal has a fully featured, export-ready dashboard as its primary analytical surface.",
          },
        },
        {
          id: "provider-mgmt",
          name: "Provider & Patient Management",
          icon: "Users",
          star: {
            situation:
              "Admins needed to manage provider onboarding, facility verification, and patient records across a growing network.",
            task: "Build end-to-end management flows with map integration, file handling, and permission-gated actions.",
            action: [
              "**Provider/Facility CRUD:** Create, approve, restore, and deactivate providers with Google Maps location picker and multi-file upload.",
              "**Patient Documents:** Viewer, thumbnail strip, deduplication logic, and search for patient attachments.",
              "**Indication Slips:** Responsive PDF preview with QR code generation and geocoding for sharing.",
            ],
            result:
              "Admins and doctors can manage the full provider/patient lifecycle from a single, cohesive interface.",
          },
        },
      ],
    },
  },

  /* --- PROJECT 5: UNI-VOICE (HMAU) --- */
  {
    id: "uni-voice",
    title: "Uni-Voice — Hazard Map Admin System",
    description:
      "An admin system for Japanese municipal disaster-response operators to manage hazard maps, shelter locations, and evacuation data. Built for Spring Knowledge Global.",
    image: "/images/uni-voice-placeholder.png",
    tags: [
      "Vue 3",
      "Quasar",
      "TypeScript",
      "AWS S3",
      "AWS Amplify",
      "Leaflet",
      "GeoJSON",
      "AG Grid",
    ],
    links: {
      demo: null,
      github: null,
    },
    achievements: [
      "Interactive shelter mapping system with Leaflet + Google Maps, GeoJSON layers, and clustering for prefecture-level data.",
      "Map tile generation job system — stepper wizard UI, S3-backed pipeline, drag-and-drop layer ordering.",
      "Machine translation pipeline (Google Translate API) for multilingual shelter data; bulk CSV import/export by prefecture.",
    ],
    featured: false,
    caseStudy: {
      type: "complex",
      overview: {
        challenge:
          "Japanese municipal operators needed to manage complex geospatial datasets — shelter locations, hazard zones, evacuation routes — across multiple prefectures, with multilingual output requirements.",
        solution:
          "Built a Vue 3 + Quasar admin system backed by AWS S3/Cognito/Amplify, with Leaflet for interactive mapping, AG Grid for bulk data management, and a Google Translate integration for automated multilingual data generation.",
        impact:
          "Delivered a full-featured geospatial admin tool enabling operators to manage, translate, and publish hazard map data without manual GIS tooling.",
      },
      diagram: {
        type: "pipeline" as const,
        title: "Map Tile Pipeline",
        nodes: [
          { label: "Input", sub: "Layer Config" },
          { label: "Wizard", sub: "Stepper UI" },
          { label: "Generate", sub: "S3 Job" },
          { label: "Publish", sub: "Tile Output" },
        ],
      },
      modules: [
        {
          id: "mapping",
          name: "Shelter Mapping",
          icon: "MapPin",
          star: {
            situation:
              "Operators needed to view and edit hundreds of shelter locations across multiple prefectures on an interactive map.",
            task: "Build a geospatial management UI with clustering, GeoJSON layer support, and inline editing.",
            action: [
              "**Interactive Map:** Leaflet + Google Maps with GeoJSON polygon layers, marker clustering, and click-to-edit shelter details.",
              "**Bulk CSV Import/Export:** Prefecture-level CSV pipeline for uploading and downloading shelter datasets.",
              "**Translation Pipeline:** Google Translate API integration to auto-generate multilingual shelter names and descriptions.",
            ],
            result:
              "Operators can manage the full shelter dataset visually and export translation-ready data for multilingual publications.",
          },
        },
        {
          id: "tile-gen",
          name: "Map Tile Generation",
          icon: "Layers",
          star: {
            situation:
              "Publishing updated hazard maps required a complex multi-step pipeline — layer ordering, tile generation, and S3 upload — with no existing UI.",
            task: "Build a guided wizard UI for the tile generation job system with progress tracking and layer management.",
            action: [
              "**Stepper Wizard:** Multi-step form guiding operators through layer selection, ordering (drag-and-drop), and job submission.",
              "**S3 Pipeline Integration:** Connected wizard output to the backend tile generation job, with real-time status polling.",
              "**Tag Management:** Cross-resource tag CRUD with AG Grid mapping and deduplication across the system.",
            ],
            result:
              "Operators can publish updated hazard maps through a guided UI without needing direct S3 or CLI access.",
          },
        },
      ],
    },
  },
  ```

- [ ] **Step 2: Add placeholder images**

  ```bash
  cp /Users/pahopu/Personal/pahopu-portfolio/public/images/image-lens-logo.png \
     /Users/pahopu/Personal/pahopu-portfolio/public/images/carelink-placeholder.png
  cp /Users/pahopu/Personal/pahopu-portfolio/public/images/image-lens-logo.png \
     /Users/pahopu/Personal/pahopu-portfolio/public/images/uni-voice-placeholder.png
  ```

  (Placeholder until real screenshots are available — user can swap these.)

- [ ] **Step 3: Start dev server and verify**

  ```bash
  npm run dev
  ```

  Check:
  - Projects section shows 5 cards ✓
  - CareLink and Uni-Voice case studies open correctly ✓
  - All existing projects (DIVA ERP, Image Lens, Mario) still render ✓

- [ ] **Step 4: Build check**

  ```bash
  npm run build
  ```

- [ ] **Step 5: Commit**

  ```bash
  git add src/constants/index.tsx public/images/
  git commit -m "feat: add CareLink and Uni-Voice projects to portfolio"
  ```

---

## Phase 7 — Easter Egg (Konami Code)

### Task 9: Konami code hook + confetti easter egg

**Files:**
- Create: `src/hooks/use-konami-code.ts`
- Create: `src/components/shared/easter-egg.tsx`
- Modify: `src/app/[locale]/layout.tsx`

**Interfaces:**
- Produces: `useKonamiCode(): boolean` hook; `<EasterEgg />` component that activates on trigger

- [ ] **Step 1: Install canvas-confetti**

  ```bash
  npm install canvas-confetti
  npm install --save-dev @types/canvas-confetti
  ```

- [ ] **Step 2: Create `src/hooks/use-konami-code.ts`**

  ```ts
  import { useEffect, useState } from "react";

  const KONAMI = [
    "ArrowUp", "ArrowUp",
    "ArrowDown", "ArrowDown",
    "ArrowLeft", "ArrowRight",
    "ArrowLeft", "ArrowRight",
    "b", "a",
  ];

  export function useKonamiCode(): boolean {
    const [index, setIndex] = useState(0);
    const [triggered, setTriggered] = useState(false);

    useEffect(() => {
      const handler = (e: KeyboardEvent) => {
        if (e.key === KONAMI[index]) {
          const next = index + 1;
          if (next === KONAMI.length) {
            setTriggered(true);
            setIndex(0);
            setTimeout(() => setTriggered(false), 6000);
          } else {
            setIndex(next);
          }
        } else {
          setIndex(0);
        }
      };
      window.addEventListener("keydown", handler);
      return () => window.removeEventListener("keydown", handler);
    }, [index]);

    return triggered;
  }
  ```

- [ ] **Step 3: Create `src/components/shared/easter-egg.tsx`**

  ```tsx
  "use client";

  import { useKonamiCode } from "@/hooks/use-konami-code";
  import confetti from "canvas-confetti";
  import { useEffect } from "react";

  const CONGBDAY_COLORS = ["#FF8C5A", "#FFB3C6", "#A8E6CF", "#B39DDB", "#FFF3CD"];

  export const EasterEgg = () => {
    const triggered = useKonamiCode();

    useEffect(() => {
      if (!triggered) return;

      confetti({
        particleCount: 120,
        spread: 80,
        origin: { y: 0.6 },
        colors: CONGBDAY_COLORS,
      });
      setTimeout(() => {
        confetti({
          particleCount: 80,
          angle: 60,
          spread: 55,
          origin: { x: 0, y: 0.65 },
          colors: CONGBDAY_COLORS,
        });
        confetti({
          particleCount: 80,
          angle: 120,
          spread: 55,
          origin: { x: 1, y: 0.65 },
          colors: CONGBDAY_COLORS,
        });
      }, 300);
    }, [triggered]);

    if (!triggered) return null;

    return (
      <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[9999] animate-in fade-in slide-in-from-bottom-4 duration-300">
        <div className="px-5 py-3 rounded-2xl bg-card border border-primary/30 shadow-lg text-sm font-medium text-foreground flex items-center gap-2">
          <span>🎉</span>
          <span>Bạn vừa mở khóa chế độ vui vẻ! / You found the secret!</span>
          <span>✨</span>
        </div>
      </div>
    );
  };
  ```

- [ ] **Step 4: Add `<EasterEgg />` to layout**

  In `src/app/[locale]/layout.tsx`, import and add inside `<ThemeProvider>`:

  ```tsx
  import { EasterEgg } from "@/components/shared/easter-egg";
  // ...
  <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
    <Navbar />
    {children}
    <EasterEgg />
  </ThemeProvider>
  ```

- [ ] **Step 5: Start dev server and verify easter egg**

  ```bash
  npm run dev
  ```

  Open http://localhost:3000/en, focus the page, then type: `↑ ↑ ↓ ↓ ← → ← → b a`

  Expected:
  - Triple confetti burst in CONGBDAY colors ✓
  - Toast notification appears at bottom ✓
  - Toast disappears after ~5s ✓

- [ ] **Step 6: Build check**

  ```bash
  npm run build
  ```

- [ ] **Step 7: Commit**

  ```bash
  git add src/hooks/use-konami-code.ts src/components/shared/easter-egg.tsx src/app/\[locale\]/layout.tsx
  git commit -m "feat: add Konami code easter egg with CONGBDAY confetti"
  ```

---

## Self-Review Checklist

- [x] **Spec coverage:** Phase 1 palette ✓, Phase 2 Skills+Experience ✓, Phase 3 next-intl routing ✓, Phase 4 EN content ✓, Phase 5 VI content ✓, Phase 6 CareLink+Uni-Voice ✓, Phase 7 Easter egg ✓
- [x] **Placeholders:** DVA start date uses "2023" with note to confirm — not a hard TBD ✓
- [x] **Type consistency:** `SKILLS` shape defined in Task 2, consumed in Task 3 ✓; `EXPERIENCE` shape defined in Task 2, consumed in Task 4 ✓; `useKonamiCode(): boolean` defined in Task 9 step 2, consumed in step 3 ✓
- [x] **No fabricated metrics:** CareLink/Uni-Voice achievements contain no user-count or scale numbers ✓
- [x] **Image placeholders flagged:** Tasks 8 notes placeholder images, user can swap ✓
