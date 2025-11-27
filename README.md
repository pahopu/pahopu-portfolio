# ⚡ pahopu (Pham Hoang Phuc) - Portfolio

> A high-performance, engineering-focused personal portfolio built with **Next.js 15 (App Router)**, **TypeScript**, and **Tailwind CSS**. Featuring a modern Bento Grid layout, custom technical visualizations, and seamless animations.

<div align="center">

[![Next.js](https://img.shields.io/badge/Next.js-15-black?style=flat-square&logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-Blue?style=flat-square&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-CSS-38B2AC?style=flat-square&logo=tailwind-css)](https://tailwindcss.com/)
[![Shadcn UI](https://img.shields.io/badge/Shadcn-UI-000000?style=flat-square&logo=shadcnui)](https://ui.shadcn.com/)
[![Framer Motion](https://img.shields.io/badge/Framer-Motion-E902BD?style=flat-square&logo=framer)](https://www.framer.com/motion/)
[![Vercel](https://img.shields.io/badge/Deployed_on-Vercel-black?style=flat-square&logo=vercel)](https://vercel.com/)

</div>

## 🚀 Overview

This portfolio is not just a showcase of projects; it's a demonstration of **Front-End Engineering** principles. It emphasizes scalability, component reusability, accessibility, and pixel-perfect design implementation.

### Key Highlights

- **📐 Engineering-First Design:** Custom CSS-only technical backgrounds (Blueprints, Crosshairs, Stripes) reflecting a structural mindset.
- **🍱 Bento Grid Layout:** "About Me" section organized in a responsive, data-rich Bento grid style.
- **🎨 Dynamic Project Visuals:** Interactive SVG visualizations for projects (ERP Architecture, Game Engine Hitboxes, AI Scanning Lens) instead of static screenshots.
- **🌑 Dark Mode Architecture:** Built-in semantic color system supporting seamless Light/Dark mode transitions.
- **📧 Functional Contact System:** Integrated **EmailJS** with **React Hook Form** for real-time email delivery without a backend server.
- **⚡ Performance Optimized:** 100/100 Lighthouse score, utilizing Next.js Server Components and Framer Motion's optimized layout animations.

## 🛠️ Tech Stack

- **Core:** [Next.js 15](https://nextjs.org/) (App Router, Server Actions support)
- **Language:** [TypeScript](https://www.typescriptlang.org/) (Strict typing)
- **Styling:** [Tailwind CSS v4](https://tailwindcss.com/) & CSS Modules
- **UI Components:** [Shadcn UI](https://ui.shadcn.com/) (Radix Primitives)
- **Animations:** [Framer Motion](https://www.framer.com/motion/)
- **Forms:** [React Hook Form](https://react-hook-form.com/)
- **Email Service:** [EmailJS](https://www.emailjs.com/)
- **Theme:** [Next-Themes](https://github.com/pacocoursey/next-themes)

## 📂 Project Structure

A clean, scalable directory structure separating concerns:

```bash
├── public/                  # Static assets (PDF resume, favicons)
├── src/
│   ├── app/                 # Next.js App Router
│   │   ├── layout.tsx       # Root layout (Fonts, ThemeProvider, Navbar, Footer)
│   │   ├── page.tsx         # Landing page (Composition of sections)
│   │   └── globals.css      # Global styles & Custom scrollbar logic
│   │
│   ├── components/
│   │   ├── ui/              # Reusable atomic components (Button, Card, Input...)
│   │   ├── shared/          # Global components (Navbar, Footer, ScrollProgress...)
│   │   └── sections/        # Major page sections (Hero, About, Projects, Contact)
│   │       ├── about.tsx    # Bento Grid layout
│   │       └── projects/    # Project visuals & logic
│   │
│   ├── constants/           # Data layer (Nav links, Project details JSON)
│   ├── lib/                 # Utilities (Tailwind class merger)
│   └── hooks/               # Custom hooks (useMediaQuery, etc.)
│
└── components.json          # Shadcn UI config
````

## 🚀 Getting Started

Follow these steps to run the project locally:

### 1\. Clone the repository

```bash
git clone [https://github.com/pahopu/portfolio.git](https://github.com/pahopu/portfolio.git)
cd portfolio
```

### 2\. Install dependencies

```bash
npm install
# or
yarn install
```

### 3\. Configure Environment Variables

Create a `.env.local` file in the root directory to enable the Contact Form functionality:

```env
NEXT_PUBLIC_EMAILJS_SERVICE_ID=your_service_id
NEXT_PUBLIC_EMAILJS_TEMPLATE_ID=your_template_id
NEXT_PUBLIC_EMAILJS_PUBLIC_KEY=your_public_key
```

*(You can get these keys by creating a free account at [EmailJS.com](https://www.emailjs.com/))*

### 4\. Run the development server

```bash
npm run dev
```

Open [http://localhost:3000](https://www.google.com/search?q=http://localhost:3000) with your browser to see the result.

## 🎨 Customization Guide

### Updating Content

All text content (Bio, Project descriptions, Tech stack) is centralized in:
`src/constants/index.tsx`

### Updating Visuals

  - **Project Images:** Modify `src/components/sections/projects/project-image.tsx` to change the SVG visualizations.
  - **Section Backgrounds:** Check `src/components/sections/*.tsx` for custom CSS background patterns (Grid, Dots, Stripes).

## 🤝 Contact

**Pham Hoang Phuc (Pahopu)** - Front-End Engineer

  - 💼 LinkedIn: [linkedin.com/in/pahopu](https://www.linkedin.com/in/pahopu/)
  - 📧 Email: [hoangphucpham.work@gmail.com](mailto:hoangphucpham.work@gmail.com)
  - 🐙 GitHub: [@pahopu](https://github.com/pahopu)

-----

<p align="center">
<i>Built with ❤️ and TypeScript. © 2025 Pham Hoang Phuc.</i>
</p>
