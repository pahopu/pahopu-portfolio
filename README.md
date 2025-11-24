# ⚡ pahopu (Pham Hoang Phuc) - Portfolio

<!-- ![Project Banner](public/screenshot.png) -->

> A modern, performance-optimized personal portfolio built with **Next.js 14 (App Router)**, **TypeScript**, and **Tailwind CSS**. Designed to showcase my projects and technical skills as a Front-end Developer.

<div align="center">

[![Next.js](https://img.shields.io/badge/Next.js-14-black?style=flat-square&logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-Blue?style=flat-square&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-CSS-38B2AC?style=flat-square&logo=tailwind-css)](https://tailwindcss.com/)
[![Shadcn UI](https://img.shields.io/badge/Shadcn-UI-000000?style=flat-square&logo=shadcnui)](https://ui.shadcn.com/)
[![Vercel](https://img.shields.io/badge/Deployed_on-Vercel-black?style=flat-square&logo=vercel)](https://vercel.com/)

</div>

## 🚀 Tech Stack

This project leverages the latest ecosystem for React development:

- **Core:** [Next.js 14](https://nextjs.org/) (App Router, Server Components)
- **Language:** [TypeScript](https://www.typescriptlang.org/) (Strict mode enabled)
- **Styling:** [Tailwind CSS](https://tailwindcss.com/)
- **UI Component Library:** [Shadcn UI](https://ui.shadcn.com/) (Radix UI primitives)
- **Animations:** [Framer Motion](https://www.framer.com/motion/) (Smooth transitions & scroll effects)
- **Theme Management:** [Next-Themes](https://github.com/pacocoursey/next-themes) (System/Dark/Light mode)
- **Icons:** [Lucide React](https://lucide.dev/)
- **Form Handling:** React Hook Form
- **Deployment:** Vercel

## ✨ Key Features

- **🎨 Modern UI/UX:** Clean, minimalist design with Glassmorphism effects.
- **🌑 Dark Mode Ready:** Fully integrated dark/light theme switching with zero hydration mismatch.
- **📱 Fully Responsive:** Mobile-first approach, optimized for all screen sizes.
- **⚡ High Performance:** 100/100 Lighthouse score, optimized Core Web Vitals.
- **🔍 SEO Optimized:** Semantic HTML, dynamic metadata, and Open Graph tags.
- **🧩 Clean Architecture:** Modular code structure separating logic, UI, and data.

## 📂 Project Structure

Organized for scalability using the `src` directory pattern:

```bash
├── public/                  # Static assets (images, fonts, resume)
├── src/
│   ├── app/                 # Next.js App Router (Pages, Layouts)
│   │   ├── layout.tsx       # Root layout with ThemeProvider
│   │   ├── page.tsx         # Landing page combining all sections
│   │   └── globals.css      # Global styles & Tailwind directives
│   │
│   ├── components/
│   │   ├── ui/              # Atomic UI components (Button, Card, Input...)
│   │   ├── shared/          # Global components (Navbar, Footer, ModeToggle...)
│   │   └── sections/        # Page sections (Hero, About, Projects, Contact...)
│   │
│   ├── constants/           # Static data (Nav links, Project details, Socials)
│   ├── lib/                 # Utility functions (cn class merger)
│   ├── hooks/               # Custom React hooks
│   └── types/               # TypeScript interfaces
│
├── tailwind.config.ts       # Tailwind configuration
├── components.json          # Shadcn UI configuration
└── next.config.mjs          # Next.js configuration
```

## 🛠️ Getting Started

Follow these steps to run the project locally:

### 1\. Clone the repository

```bash
git clone [https://github.com/pahopu/pahopu-portfolio.git](https://github.com/pahopu/pahopu-portfolio.git)
cd pahopu-portfolio
```

### 2\. Install dependencies

```bash
npm install
# or
yarn install
```

### 3\. Run the development server

```bash
npm run dev
```

Open [http://localhost:3000](https://www.google.com/search?q=http://localhost:3000) with your browser to see the result.

## 📝 Configuration

### Content Management

You can easily update the portfolio content (Bio, Projects, Experience) without touching the UI code by modifying:
`src/constants/data.ts`

### Environment Variables

Rename `.env.example` to `.env.local` and update necessary API keys (if you integrate Email services or CMS).

## 🤝 Contact

**Pham Hoang Phuc (Pahopu)** - Front-end Developer

  <!-- - 🌐 Website: [pahopu.dev](https://www.google.com/search?q=https://pahopu.dev) -->
  - 💼 LinkedIn: [linkedin.com/in/pahopu](https://www.linkedin.com/in/pahopu/)
  - 📧 Email: [hoangphucpham.work@gmail.com](mailto:hoangphucpham.work@gmail.com)
  - 🐙 GitHub: [@pahopu](https://github.com/pahopu)

-----

*Thank you for visiting my portfolio\! If you find this code useful, please give it a star ⭐️.*