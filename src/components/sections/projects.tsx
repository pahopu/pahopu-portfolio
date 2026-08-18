"use client";

import { PROJECTS } from "@/constants";
import { motion } from "framer-motion";
import { ProjectCard } from "./projects/project-card";
import { useTranslations } from "next-intl";

export const Projects = () => {
  const t = useTranslations("projects");

  return (
    <section id="projects" className="relative w-full py-20 overflow-hidden">
      {/* --- BACKGROUND --- */}
      <div className="absolute inset-0 -z-10 bg-background" />
      <div className="absolute -top-32 -right-32 -z-10 w-[600px] h-[600px] bg-[#5B8FE8]/12 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute -bottom-32 -left-32 -z-10 w-[500px] h-[500px] bg-[#C8E645]/10 blur-[100px] rounded-full pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 -z-10 w-[400px] h-[400px] bg-[#FFE566]/8 blur-[100px] rounded-full pointer-events-none" />

      {/* --- CONTAINER --- */}
      <div className="container mx-auto px-4 md:px-6 max-w-6xl">
        {/* --- HEADER --- */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-14 text-center"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/15 border border-primary/25 text-primary font-semibold text-sm mb-4">
            ★ {t("label")}
          </div>
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
            {t("heading")}
          </h2>
          <p className="mt-4 text-muted-foreground text-lg max-w-2xl mx-auto">
            {t("subheading")}
          </p>
        </motion.div>

        {/* --- GRID --- */}
        <div className="grid gap-8 md:grid-cols-2">
          {PROJECTS.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};
