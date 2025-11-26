"use client";

import { PROJECTS } from "@/constants";
import { motion } from "framer-motion";
import { ProjectCard } from "./projects/project-card";

export const Projects = () => {
  return (
    <section id="projects" className="relative w-full py-20 overflow-hidden">
      {/* --- BACKGROUND --- */}
      <div
        className="absolute inset-0 -z-10 h-full w-full bg-background 
        bg-[radial-gradient(#80808033_1px,transparent_1px)] 
        bg-size-[40px_40px]"
      />
      <div className="absolute -top-1/2 -right-1/2 -z-10 h-[1000px] w-[1000px] bg-primary/30 blur-[2000px] rounded-full pointer-events-none" />
      <div className="absolute -bottom-1/2 -left-1/2 -z-10 h-[1000px] w-[1000px] bg-blue-500/30 blur-[2000px] rounded-full pointer-events-none" />

      {/* --- CONTAINER --- */}
      <div className="container mx-auto px-4 md:px-6 max-w-6xl">
        {/* --- HEADER --- */}
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
            Selected works demonstrating my expertise in large-scale systems, AI
            integration, and software engineering.
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
