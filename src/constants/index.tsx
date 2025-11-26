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

    // --- STAR METHOD CASE STUDY ---
    caseStudy: {
      challenge:
        "Managing operations for a rapidly growing enterprise with 2,000+ employees using fragmented tools and spreadsheets resulted in data inconsistency, slow processing times, and operational bottlenecks. The goal was to digitize the entire workflow into a unified, high-performance ecosystem.",
      solutions: [
        {
          title: "POS & Order Processing",
          content:
            "Implemented a flexible **Commission System** (per-item & payment-based) and integrated **Affiliate Marketing** (CTV) directly into the checkout flow. Added a **360° Customer View** consolidating history, rewards, and appointments for personalized service.",
        },
        {
          title: "CRM & Operations",
          content:
            "Revamped **Ticket Management** with tabbed views to reduce cognitive load. Optimized the **Appointment Calendar** to render only essential data, ensuring smooth performance even with heavy scheduling loads.",
        },
        {
          title: "System Architecture",
          content:
            "Adopted a **Monorepo-like strategy** to share reusable components across Admin, POS, and CRM. Applied **Code-splitting & Tree-shaking** to remove unused modules from site-specific bundles, improving load times by ~40%.",
        },
      ],
      impact: [
        "Streamlined payroll processing for **2,000+ employees** with automated Excel imports.",
        "Expanded customer network significantly through the new **Affiliate/CTV system**.",
        "Reduced page load latency and improved UX for high-traffic modules like POS and Timekeeping.",
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
