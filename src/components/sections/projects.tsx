"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { ExternalLink, Github, Lock } from "lucide-react";
import Link from "next/link";

// --- 1. DỮ LIỆU DỰ ÁN (DATA) ---
const PROJECTS = [
  {
    title: "DVA Omnichannel ERP",
    // Mô tả tổng quan, nhấn mạnh quy mô
    description:
      "A massive Enterprise Resource Planning ecosystem serving 2,000+ employees and 10,000+ customers. I played a key role in developing 3 core subsystems: Admin Dashboard, POS, and CRM.",
    image: "/images/erp-placeholder.png", // Nhớ tạo ảnh này
    tags: [
      "Vue 3",
      "TypeScript",
      "Quasar",
      "Pinia",
      "System Architecture",
      "Large-scale",
    ],
    links: {
      demo: null, // Private Project
      github: null,
    },
    // Phần chi tiết từng site con (Admin, POS, CRM)
    achievements: [
      "Admin (HR/Payroll): Optimized Timekeeping module for handling large datasets.",
      "POS (Retail): Developed Affiliate Marketing features & Commission tracking.",
      "CRM (Customer): Refactored business logic for faster customer queries.",
    ],
    featured: true, // Card này sẽ to hơn
  },
  {
    title: "AI Image Search Engine",
    description:
      "A Content-Based Image Retrieval (CBIR) system. It uses Deep Learning (Xception model) to extract features and allows users to search for similar images by uploading a query photo.",
    image: "/images/image-search-placeholder.png",
    tags: ["Python", "Flask", "OpenCV", "Keras", "React", "Full-stack"],
    links: {
      demo: "#", // Điền link demo nếu có
      github: "https://github.com/pahopu",
    },
    featured: false,
  },
  {
    title: "Super Mario Bros 3 Clone",
    description:
      "A complete recreation of the classic NES game built from scratch using C++ and DirectX 10. Features a custom game engine with physics-based collision detection, sprite animation, and map rendering.",
    image: "/images/mario-placeholder.png",
    tags: ["C++", "DirectX 10", "Game Engine", "OOP"],
    links: {
      demo: null,
      github: "https://github.com/pahopu",
    },
    featured: false,
  },
];

export const Projects = () => {
  return (
    <section id="projects" className="py-20 bg-secondary/20">
      <div className="container px-4 md:px-6">
        {/* --- TITLE --- */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-12 text-center"
        >
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
            Featured Projects
          </h2>
          <p className="mt-4 text-muted-foreground text-lg max-w-2xl mx-auto">
            A selection of projects demonstrating my expertise in building
            complex systems and solving engineering problems.
          </p>
        </motion.div>

        {/* --- GRID LAYOUT --- */}
        <div className="grid gap-8 md:grid-cols-2">
          {PROJECTS.map((project, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2, duration: 0.5 }}
              className={cn(
                "group relative overflow-hidden rounded-xl border bg-background shadow-md hover:shadow-xl transition-all duration-300 flex flex-col",
                // Logic: Nếu là featured (ERP) -> Chiếm 2 cột trên màn hình lớn
                project.featured
                  ? "md:col-span-2 lg:grid lg:grid-cols-2 lg:gap-0"
                  : ""
              )}
            >
              {/* --- IMAGE AREA --- */}
              <div
                className={cn(
                  "relative h-64 w-full overflow-hidden bg-muted",
                  project.featured ? "lg:h-full" : ""
                )}
              >
                {/* Placeholder hiển thị khi chưa có ảnh thật */}
                <div className="absolute inset-0 flex items-center justify-center text-muted-foreground bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-900">
                  <span className="font-semibold">{project.title} Preview</span>
                </div>
                {/* Khi có ảnh thật, bạn dùng thẻ <Image src={project.image} fill ... /> tại đây */}
              </div>

              {/* --- CONTENT AREA --- */}
              <div className="flex flex-col justify-between p-6 sm:p-8 h-full">
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-2xl font-bold group-hover:text-primary transition-colors">
                      {project.title}
                    </h3>
                    {/* Icon khóa cho dự án bảo mật */}
                    {project.links.demo === null &&
                      project.links.github === null && (
                        <Badge variant="secondary" className="gap-1">
                          <Lock className="h-3 w-3" /> Private
                        </Badge>
                      )}
                  </div>

                  <p className="text-muted-foreground mb-4 leading-relaxed">
                    {project.description}
                  </p>

                  {/* --- LOGIC HIỂN THỊ SUB-MODULES (CHO ERP) --- */}
                  {project.achievements && (
                    <ul className="mb-6 space-y-2 text-sm text-muted-foreground/90">
                      {project.achievements.map((item, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-primary shrink-0" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  )}

                  {/* TAGS */}
                  <div className="flex flex-wrap gap-2 mb-8">
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
                </div>

                {/* BUTTONS ACTIONS */}
                <div className="flex gap-4 pt-4 border-t mt-auto">
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

                  {/* Nút thay thế cho Private Project */}
                  {project.links.demo === null &&
                    project.links.github === null && (
                      <Button
                        variant="ghost"
                        size="sm"
                        className="gap-2 cursor-not-allowed opacity-70"
                      >
                        Internal Enterprise System
                      </Button>
                    )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
