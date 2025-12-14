import { Variants } from "framer-motion";
import { Github, Linkedin, Mail } from "lucide-react";

/* --- SECTION: NAVIGATION LINKS --- */
export const NAV_LINKS = [
  { label: "About", href: "#about" },
  { label: "Projects", href: "#projects" },
  { label: "Contact", href: "#contact" },
];

/* --- SECTION: HERO ANIMATION & SOCIALS --- */
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

/* --- SECTION: PROJECTS DATA --- */
export const PROJECTS = [
  /* --- PROJECT 1: ERP SYSTEM --- */
  {
    id: "erp",
    title: "DIVA ERP - Large-scale Enterprise System",
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
      type: "complex",
      overview: {
        challenge:
          "The system needed to support 3 different user groups (Admin, Sales, Support) with shared logic but distinct interfaces. The bundle size was becoming too large, causing slow initial loads.",
        solution:
          "Adopted a **Monorepo-like strategy** to share UI components and business logic across 3 sites. Implemented **Code-splitting** to exclude unused modules from specific site bundles.",
        impact:
          "Reduced bundle size by **40%**, ensured UI consistency, and accelerated development speed for new features.",
      },
      diagram: {
        type: "hub-spoke" as const,
        title: "Shared Core",
        nodes: [{ label: "Admin" }, { label: "POS" }, { label: "CRM" }],
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

  /* --- PROJECT 2: IMAGE LENS --- */
  {
    id: "image-lens",
    title: "Image Lens - AI Visual Search",
    description:
      "A Content-Based Image Retrieval (CBIR) system allowing users to search for similar images using a query photo. Built with deep learning models for feature extraction.",
    image: "/images/image-lens-logo.png",
    tags: ["Python", "Flask", "OpenCV", "Keras (Xception)", "Full-stack"],
    links: {
      demo: null,
      github: "https://github.com/pahopu/CS336_ImageSearch_Project2",
    },
    featured: false,
    achievements: [
      "Built a complete CBIR system from data collection to frontend.",
      "Implemented feature extraction using Xception model & OpenCV.",
      "Developed a Flask API to serve ranked search results.",
    ],
    caseStudy: {
      type: "simple",
      overview: {
        challenge:
          "Traditional text-based search fails when users want to find visually similar images but lack specific keywords.",
        solution:
          "Developed a **Content-Based Image Retrieval (CBIR)** system using **Transfer Learning (Xception)** to extract image feature vectors and calculate cosine similarity.",
        impact:
          "Enabled accurate retrieval of similar images from the Oxford/Paris datasets with a user-friendly web interface.",
      },
      diagram: {
        type: "pipeline" as const,
        title: "Search Pipeline",
        nodes: [
          { label: "Input", sub: "User Image" },
          { label: "Extraction", sub: "Xception (CNN)" },
          { label: "Indexing", sub: "Feature Vectors" },
          { label: "Ranking", sub: "Cosine Sim." },
        ],
      },
      modules: [
        {
          id: "ai-model",
          name: "AI & Processing",
          icon: "Box",
          star: {
            situation:
              "Raw images are high-dimensional data, making direct comparison computationally expensive and inaccurate.",
            task: "Extract meaningful feature representations from images for efficient comparison.",
            action: [
              "**Data Pipeline:** Automated collection and pre-processing of Oxford/Paris datasets.",
              "**Feature Extraction:** Utilized the **Keras Xception** model (pre-trained on ImageNet) to generate dense feature vectors.",
              "**Similarity Search:** Implemented **OpenCV** and Numpy to calculate distance metrics between query and database images.",
            ],
            result:
              "Achieved high precision in retrieving visually similar landmarks and objects.",
          },
        },
        {
          id: "fullstack",
          name: "Web Application",
          icon: "LayoutDashboard",
          star: {
            situation:
              "The underlying model was powerful but accessible only via command-line scripts.",
            task: "Create an intuitive web interface for end-users to upload and search images.",
            action: [
              "**Backend API:** Built a **Flask** server to handle image uploads, process features, and return ranked results.",
              "**Frontend UI:** Designed a responsive interface using HTML/CSS/JS for drag-and-drop uploads and result grid display.",
            ],
            result:
              "Delivered a complete, usable product that bridges complex AI logic with simple user interaction.",
          },
        },
      ],
    },
  },

  /* --- PROJECT 3: MARIO CLONE --- */
  {
    id: "mario",
    title: "Super Mario Bros 3 - Engine Recreation",
    description:
      "A recreation of the classic NES game logic built from scratch using C++ and DirectX 10. Focused on low-level game loop, physics collision, and scene management.",
    image: "/images/mario-placeholder.png",
    tags: ["C++", "DirectX 10", "Game Engine", "OOP", "Physics"],
    links: {
      demo: null,
      github: "https://github.com/pahopu/SE102_SuperMarioBros3",
    },
    featured: false,
    achievements: [
      "Engineered a custom Game Engine using DirectX 10 & C++.",
      "Implemented Grid-based Collision Detection (Swept AABB).",
      "Successfully rendered Intro, Grass Land Map, and World 1-1.",
    ],
    caseStudy: {
      type: "simple",
      overview: {
        challenge:
          "Building a game without a commercial engine requires handling low-level graphics, memory management, and physics manually.",
        solution:
          "Constructed a custom 2D Game Engine using **DirectX 10** and **C++**, implementing design patterns like Singleton and Component-based architecture.",
        impact:
          "Successfully recreated the gameplay feel of the original title with stable 60FPS performance and accurate physics.",
      },
      diagram: {
        type: "layers" as const,
        title: "Engine Architecture",
        nodes: [
          { label: "Scenes & Objects", sub: "Intro, Map 1, World 1-1" },
          { label: "Game Systems", sub: "Physics, Animation, Camera" },
          { label: "Core / DirectX", sub: "Input, Sprites, Window" },
        ],
      },
      modules: [
        {
          id: "engine",
          name: "Game Engine",
          icon: "LayoutDashboard",
          star: {
            situation:
              "DirectX provides raw graphics power but lacks high-level game abstractions.",
            task: "Build a reusable engine core to manage game loops, rendering, and assets.",
            action: [
              "**Sprite System:** Developed a sprite handler for loading textures and managing animation frames.",
              "**Scene Management:** Implemented a system to switch seamlessly between the **Intro Sequence**, **Grass Land Map**, and **World 1-1**.",
              "**Camera Control:** Created a side-scrolling camera that follows the player with smooth tracking.",
            ],
            result:
              "Created a solid foundation allowing for easy addition of new levels and objects.",
          },
        },
        {
          id: "physics",
          name: "Physics & Logic",
          icon: "Box",
          star: {
            situation:
              "Platformers require precise collision detection to prevent falling through floors or getting stuck in walls.",
            task: "Implement a robust physics system similar to the NES original.",
            action: [
              "**Collision Detection:** Implemented **Swept AABB** (Axis-Aligned Bounding Box) for precise continuous collision detection.",
              "**Grid Partitioning:** Optimized collision checks using a spatial grid (Quadtree-like) to reduce calculation overhead.",
              "**Entity Logic:** Programmed state machines for Mario (Small, Big, Raccoon) and enemies (Goomba, Koopa) with distinct behaviors.",
            ],
            result:
              "Achieved bug-free movement and interactions, replicating the 'tight' control feel of the original game.",
          },
        },
      ],
    },
  },
];
