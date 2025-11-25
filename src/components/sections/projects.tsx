"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
// 1. Import các thành phần Card bạn vừa cung cấp
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { ExternalLink, Github, Lock } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

// --- 2. Tạo MotionCard để có animation ---
const MotionCard = motion(Card);

// --- 3. DỮ LIỆU DỰ ÁN (Giữ nguyên như đã bàn) ---
const PROJECTS = [
  {
    title: "DVA Omnichannel ERP",
    description:
      "A massive Enterprise Resource Planning ecosystem serving 2,000+ employees. Developed 3 core subsystems: Admin Dashboard, POS, and CRM.",
    image: "/images/erp-placeholder.png",
    tags: ["Vue 3", "TypeScript", "Quasar", "System Architecture"],
    links: { demo: null, github: null },
    achievements: [
      "Admin: Optimized Timekeeping module.",
      "POS: Developed Affiliate Marketing features.",
      "CRM: Refactored business logic.",
    ],
    featured: true,
  },
  {
    title: "Image Lens - AI Search",
    description:
      "Content-based image retrieval system using Deep Learning (Xception) to search for similar images via query photo.",
    image: "/images/image-lens-logo.png",
    tags: ["Python", "Flask", "OpenCV", "React"],
    links: { demo: "#", github: "https://github.com/pahopu" },
    featured: false,
  },
  {
    title: "Super Mario Bros 3 Clone",
    description:
      "A complete recreation of the classic NES game built from scratch using C++ and DirectX 10 with custom game engine.",
    image: "/images/mario-placeholder.png",
    tags: ["C++", "DirectX 10", "Game Logic"],
    links: { demo: null, github: "https://github.com/pahopu" },
    featured: false,
  },
];

export const Projects = () => {
  return (
    <section id="projects" className="py-20 bg-secondary/20">
      <div className="container px-4 md:px-6">
        {/* Title Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12 text-center"
        >
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
            Featured Projects
          </h2>
          <p className="mt-4 text-muted-foreground text-lg max-w-2xl mx-auto">
            Showcasing my expertise in solving complex engineering problems.
          </p>
        </motion.div>

        {/* Grid Layout */}
        <div className="grid gap-8 md:grid-cols-2">
          {PROJECTS.map((project, index) => (
            <MotionCard
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2, duration: 0.5 }}
              // --- QUAN TRỌNG: Override class mặc định ---
              // p-0: Để ảnh tràn viền
              // gap-0: Để ta tự quản lý khoảng cách
              // h-full: Để các card cao bằng nhau
              className={cn(
                "flex flex-col h-full overflow-hidden p-0 gap-0 bg-background hover:shadow-lg transition-shadow duration-300",
                project.featured
                  ? "md:col-span-2 lg:grid lg:grid-cols-2 lg:gap-0"
                  : ""
              )}
            >
              {/* --- A. IMAGE AREA --- */}
              {/* Đặt ảnh nằm ngoài Header/Content để tràn viền */}
              <div
                className={cn(
                  "relative h-64 w-full overflow-hidden bg-muted border-b",
                  project.featured ? "lg:h-full lg:border-b-0 lg:border-r" : ""
                )}
              >
                {/* Logic render ảnh (Dùng lại code cũ của bạn ở đây) */}
                {project.title.includes("Image Lens") ? (
                  <div className="absolute inset-0 flex items-center justify-center bg-white p-8">
                    <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#3b82f6_1px,transparent_1px)] [background-size:16px_16px]" />
                    <Image
                      src={project.image}
                      alt={project.title}
                      width={120}
                      height={120}
                      className="object-contain relative z-10"
                    />
                  </div>
                ) : project.title.includes("ERP") ? (
                  <div className="absolute inset-0 flex flex-col items-center justify-center text-white p-6 bg-gradient-to-br from-blue-900 to-slate-900">
                    <h4 className="text-xl font-bold tracking-wider opacity-90">
                      DVA ERP
                    </h4>
                  </div>
                ) : (
                  <div className="absolute inset-0 flex flex-col items-center justify-center text-white p-6 bg-gradient-to-br from-red-600 to-orange-600">
                    <h4 className="text-xl font-bold tracking-wider">
                      MARIO BROS 3
                    </h4>
                  </div>
                )}
              </div>

              {/* --- B. CARD DETAILS --- */}
              {/* Bao bọc phần nội dung còn lại trong 1 div flex để căn chỉnh Footer xuống đáy */}
              <div className="flex flex-col flex-1">
                {/* 1. HEADER: Title & Status */}
                <CardHeader className="pb-2 pt-6">
                  <div className="flex items-start justify-between gap-2">
                    <CardTitle className="text-xl group-hover:text-primary transition-colors">
                      {project.title}
                    </CardTitle>
                    {project.links.demo === null &&
                      project.links.github === null && (
                        <Badge variant="secondary" className="gap-1 shrink-0">
                          <Lock className="h-3 w-3" /> Private
                        </Badge>
                      )}
                  </div>
                  <CardDescription className="line-clamp-3">
                    {project.description}
                  </CardDescription>
                </CardHeader>

                {/* 2. CONTENT: Achievements & Tags */}
                <CardContent className="pb-4">
                  {/* List module con cho ERP */}
                  {project.achievements && (
                    <ul className="mb-4 space-y-1.5 text-sm text-muted-foreground/90">
                      {project.achievements.map((item, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-primary shrink-0" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  )}

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 mt-auto">
                    {project.tags.map((tag) => (
                      <Badge
                        key={tag}
                        variant="outline"
                        className="bg-primary/5 border-primary/20"
                      >
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </CardContent>

                {/* 3. FOOTER: Buttons (Dùng mt-auto để đẩy xuống đáy nếu card dài ngắn khác nhau) */}
                <CardFooter className="pt-0 mt-auto pb-6">
                  <div className="flex gap-3 w-full pt-2 border-t">
                    {project.links.github && (
                      <Link href={project.links.github} target="_blank">
                        <Button variant="outline" size="sm" className="gap-2">
                          <Github className="h-4 w-4" /> Code
                        </Button>
                      </Link>
                    )}

                    {project.links.demo && (
                      <Link href={project.links.demo} target="_blank">
                        <Button size="sm" className="gap-2">
                          <ExternalLink className="h-4 w-4" /> Live Demo
                        </Button>
                      </Link>
                    )}

                    {project.links.demo === null && (
                      <Button
                        variant="ghost"
                        size="sm"
                        className="gap-2 cursor-not-allowed opacity-70 px-0"
                      >
                        Internal System
                      </Button>
                    )}
                  </div>
                </CardFooter>
              </div>
            </MotionCard>
          ))}
        </div>
      </div>
    </section>
  );
};
