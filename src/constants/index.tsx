import { Variants } from "framer-motion";
import { Github, Linkedin, Mail } from "lucide-react";

// --- NAVIGATION LINKS ---
export const NAV_LINKS = [
  { label: "About", href: "#about" },
  { label: "Experience", href: "#experience" },
  { label: "Projects", href: "#projects" },
  { label: "Contact", href: "#contact" },
];

// --- HERO SECTION ---
export const HERO_ANIMATION: Record<string, Variants> = {
  container: {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.3 },
    },
  },
  item: {
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 50 } },
  },
};

export const HERO_SOCIALS = [
  {
    icon: Github,
    href: "https://github.com/pahopu",
    label: "Github",
  },
  {
    icon: Linkedin,
    href: "https://www.linkedin.com/in/pahopu",
    label: "LinkedIn",
  },
  {
    icon: Mail,
    href: "mailto:hoangphucpham.work@gmail.com",
    label: "Email",
  },
];

// --- PROJECTS DATA ---
export const PROJECTS = [
  {
    id: "erp",
    title: "DIVA Omnichannel ERP",
    description:
      "A comprehensive Enterprise Resource Planning ecosystem comprising 3 integrated sites: Admin, POS, and CRM. Designed to manage operations for 2,000+ employees and serve 10,000+ customers daily.",
    image: "/images/erp-placeholder.png",
    tags: [
      "Vue 3",
      "TypeScript",
      "Quasar",
      "Pinia",
      "System Architecture",
      "Large-scale",
    ],
    links: {
      demo: null,
      github: null,
    },
    achievements: [
      "Admin: Optimized HR/Payroll & Affiliate Marketing modules.",
      "POS: Implemented complex Commission logic & 360° Customer View.",
      "Architecture: Shared component library & Bundle optimization for 3 sites.",
    ],
    featured: true,
    caseStudy: {
      overview: {
        challenge:
          "The system needed to support 3 different user groups (Admin, Sales, Support) with shared logic but distinct interfaces. The bundle size was becoming too large, causing slow initial loads.",
        solution:
          "Adopted a **Monorepo-like strategy** to share UI components and business logic across 3 sites. Implemented **Code-splitting** to exclude unused modules from specific site bundles.",
        impact:
          "Reduced bundle size by **40%**, ensured UI consistency, and accelerated development speed for new features.",
      },
      modules: [
        {
          id: "admin",
          name: "Admin Portal",
          icon: "LayoutDashboard",
          star: {
            situation:
              "Managing payroll, commissions, and inventory for 2,000+ employees manually was error-prone and slow.",
            task: "Digitize the entire HR and Affiliate Marketing workflow with high precision and transparency.",
            action: [
              "**Payroll Engine:** Built a dynamic payroll table visualizing salary, insurance, and taxes. Added Excel import/export for bulk processing.",
              "**Affiliate Hub:** Created a comprehensive approval workflow for Collaborators, enabling automated commission tracking and payout verification.",
              "**Gamification:** Developed a configurable 'Lucky Draw' event system with tier-based rewards to boost customer engagement.",
            ],
            result:
              "Reduced payroll processing time by **50%** and expanded the affiliate network with transparent tracking.",
          },
        },
        {
          id: "pos",
          name: "POS System",
          icon: "ShoppingCart",
          star: {
            situation:
              "The sales process was rigid, lacking flexibility in commission assignment and customer insights.",
            task: "Create a flexible Order system that supports complex commission rules and provides a 360-degree customer view.",
            action: [
              "**Flexible Commission:** Implemented logic to configure commission per item or per payment, assigned to specific staff or referrers.",
              "**360° Customer View:** Consolidated order history, rewards, appointments, and interactions into a single dashboard for sales staff.",
              "**Smart Scheduling:** Optimized the Appointment Calendar to render only essential data, solving performance lag on heavy schedule days.",
            ],
            result:
              "Increased sales efficiency and accuracy in commission calculation; eliminated UI lag in the calendar view.",
          },
        },
        {
          id: "crm",
          name: "CRM Tool",
          icon: "Users",
          star: {
            situation:
              "Customer support staff struggled with cluttered ticket interfaces, leading to slow response times.",
            task: "Streamline the ticket management process and reduce cognitive load for support agents.",
            action: [
              "**Tabbed UI:** Redesigned Ticket Details into clear tabs (Notes, Details, History, Logs) for better information organization.",
              "**Workflow Optimization:** Simplified the status transition flow and improved layout density for better tracking.",
            ],
            result:
              "Improved agent productivity and tracking of customer issues.",
          },
        },
      ],
    },
  },
  {
    id: "image-lens",
    title: "Image Lens - AI Search",
    description:
      "A Content-Based Image Retrieval (CBIR) system allowing users to search for similar images using a query photo. Built with deep learning models for feature extraction.",
    image: "/images/image-lens-logo.png",
    tags: ["Python", "Flask", "OpenCV", "Keras (Xception)", "Full-stack"],
    links: {
      demo: "#",
      github: "https://github.com/pahopu/CS336_ImageSearch_Project2",
    },
    featured: false,
  },
  {
    id: "mario",
    title: "Super Mario Bros 3 Clone",
    description:
      "A complete recreation of the classic NES game built from scratch without game engines. Features a custom engine handling physics collision, sprite animation, and scene management.",
    image: "/images/mario-placeholder.png",
    tags: ["C++", "DirectX 10", "Game Engine", "OOP", "Physics"],
    links: {
      demo: null,
      github: "https://github.com/pahopu/SE102_SuperMarioBros3",
    },
    featured: false,
  },
];
