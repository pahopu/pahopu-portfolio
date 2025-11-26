"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { PROJECTS } from "@/constants";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { ExternalLink, Eye, Github, Lock } from "lucide-react";
import Link from "next/link";
import { ResponsiveModal } from "@/components/shared/responsive-modal";
import { ProjectCaseStudy } from "./project-case-study";
import { ProjectImage } from "./project-image";

const MotionCard = motion(Card);

interface ProjectCardProps {
  project: (typeof PROJECTS)[0];
  index: number;
}

export const ProjectCard = ({ project, index }: ProjectCardProps) => {
  return (
    <MotionCard
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{
        once: true,
        margin: "-50px",
      }}
      transition={{
        duration: 0.5,
        delay: index * 0.1,
        ease: "easeOut",
      }}
      style={{ willChange: "opacity, transform" }}
      className={cn(
        "flex flex-col h-full overflow-hidden p-0 gap-0 transition-all duration-300 border bg-card hover:shadow-xl hover:border-primary/20",
        project.featured ? "md:col-span-2 lg:grid lg:grid-cols-2 lg:gap-0" : ""
      )}
    >
      {/* --- SECTION: IMAGE --- */}
      <div
        className={cn(
          "relative h-64 w-full overflow-hidden bg-muted border-b",
          project.featured ? "lg:h-full lg:border-b-0 lg:border-r" : ""
        )}
      >
        <ProjectImage
          id={project.id}
          title={project.title}
          image={project.image}
        />
      </div>

      {/* --- SECTION: DETAILS --- */}
      <div className="flex flex-col flex-1">
        {/* Header */}
        <CardHeader className="pb-2 pt-6">
          <div className="flex items-start justify-between gap-2">
            <CardTitle className="text-xl group-hover:text-primary transition-colors">
              {project.title}
            </CardTitle>
            {project.links.demo === null && project.links.github === null && (
              <Badge variant="secondary" className="gap-1 shrink-0">
                <Lock className="h-3 w-3" /> Private
              </Badge>
            )}
          </div>
          <CardDescription className="line-clamp-3">
            {project.description}
          </CardDescription>
        </CardHeader>

        {/* Content */}
        <CardContent className="pb-4">
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

        {/* Footer Actions */}
        <CardFooter className="pt-0 mt-auto pb-6">
          <div className="flex gap-3 w-full pt-2 border-t">
            {/* GitHub */}
            {project.links.github && (
              <Link href={project.links.github} target="_blank">
                <Button variant="outline" size="sm" className="gap-2">
                  <Github className="h-4 w-4" /> Code
                </Button>
              </Link>
            )}

            {/* Demo */}
            {project.links.demo && (
              <Link href={project.links.demo} target="_blank">
                <Button size="sm" className="gap-2">
                  <ExternalLink className="h-4 w-4" /> Live Demo
                </Button>
              </Link>
            )}

            {/* Case Study Modal Trigger */}
            {project.caseStudy ? (
              <ResponsiveModal
                title={project.title}
                description="Deep dive into system architecture, challenges, and solutions."
                content={<ProjectCaseStudy data={project.caseStudy} />}
              >
                <Button
                  variant="default"
                  size="sm"
                  className="gap-2 w-full sm:w-auto"
                >
                  <Eye className="h-4 w-4" /> Read Case Study
                </Button>
              </ResponsiveModal>
            ) : (
              // Fallback for Private Projects
              project.links.demo === null &&
              project.links.github === null && (
                <Button
                  variant="ghost"
                  size="sm"
                  className="gap-2 cursor-not-allowed opacity-70 px-0 hover:bg-transparent"
                >
                  Internal Enterprise System
                </Button>
              )
            )}
          </div>
        </CardFooter>
      </div>
    </MotionCard>
  );
};
