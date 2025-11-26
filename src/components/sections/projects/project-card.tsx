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
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { PROJECTS } from "@/constants";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import {
  CheckCircle2,
  ExternalLink,
  Eye,
  Github,
  Layers,
  Lightbulb,
  Lock,
  Target,
  Zap,
} from "lucide-react";
import Link from "next/link";
import { ProjectImage } from "./project-image";

const MotionCard = motion(Card);

interface ProjectCardProps {
  project: (typeof PROJECTS)[0];
  index: number;
}

export const ProjectCard = ({ project, index }: ProjectCardProps) => {
  return (
    <MotionCard
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.2, duration: 0.5 }}
      className={cn(
        "flex flex-col h-full overflow-hidden p-0 gap-0 transition-all duration-300 border bg-card hover:shadow-xl hover:border-primary/20",
        project.featured ? "md:col-span-2 lg:grid lg:grid-cols-2 lg:gap-0" : ""
      )}
    >
      {/* --- VISUAL SECTION --- */}
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

      {/* --- CONTENT SECTION --- */}
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

            {/* CASE STUDY DIALOG (STAR METHOD) */}
            {project.caseStudy ? (
              <Dialog>
                <DialogTrigger asChild>
                  <Button
                    variant="default"
                    size="sm"
                    className="gap-2 w-full sm:w-auto"
                  >
                    <Eye className="h-4 w-4" /> Read Case Study
                  </Button>
                </DialogTrigger>

                <DialogContent className="max-w-4xl max-h-[85vh] overflow-y-auto">
                  <DialogHeader>
                    <DialogTitle className="text-2xl font-bold flex items-center gap-2">
                      {project.title}
                    </DialogTitle>
                    <DialogDescription className="text-base mt-2">
                      Deep dive into the challenges, solutions, and impact of
                      this project.
                    </DialogDescription>
                  </DialogHeader>

                  <div className="mt-4 space-y-8">
                    {/* 1. THE CHALLENGE (SITUATION & TASK) */}
                    <div className="bg-muted/50 p-6 rounded-xl border">
                      <h4 className="text-lg font-semibold text-primary flex items-center gap-2 mb-3">
                        <Target className="h-5 w-5" /> The Challenge
                      </h4>
                      <p className="text-muted-foreground leading-relaxed">
                        {project.caseStudy.challenge}
                      </p>
                    </div>

                    {/* 2. THE SOLUTION (ACTION) */}
                    <div className="space-y-4">
                      <h4 className="text-lg font-semibold text-primary flex items-center gap-2">
                        <Lightbulb className="h-5 w-5" /> The Solution
                      </h4>
                      <div className="grid md:grid-cols-3 gap-4">
                        {project.caseStudy.solutions.map((sol, idx) => (
                          <div
                            key={idx}
                            className="p-4 rounded-lg border bg-card/50"
                          >
                            <h5 className="font-semibold mb-2 text-foreground">
                              {sol.title}
                            </h5>
                            <p
                              className="text-sm text-muted-foreground leading-relaxed"
                              dangerouslySetInnerHTML={{
                                __html: sol.content.replace(
                                  /\*\*(.*?)\*\*/g,
                                  '<strong class="text-primary">$1</strong>'
                                ),
                              }}
                            />
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* 3. ARCHITECTURE DIAGRAM VISUALIZATION (CSS ONLY) */}
                    <div className="space-y-4">
                      <h4 className="text-lg font-semibold text-primary flex items-center gap-2">
                        <Layers className="h-5 w-5" /> System Architecture
                      </h4>
                      {/* Abstract Diagram Placeholder */}
                      <div className="w-full h-48 bg-muted/30 rounded-xl border border-dashed border-primary/20 flex items-center justify-center relative overflow-hidden">
                        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#3b82f6_1px,transparent_1px)] [background-size:16px_16px]" />
                        <div className="flex items-center gap-4 z-10">
                          <div className="flex flex-col gap-2">
                            <Badge variant="outline" className="bg-background">
                              Admin
                            </Badge>
                            <Badge variant="outline" className="bg-background">
                              POS
                            </Badge>
                            <Badge variant="outline" className="bg-background">
                              CRM
                            </Badge>
                          </div>
                          <div className="h-px w-12 bg-primary/50" />
                          <div className="p-4 rounded-lg border bg-background shadow-sm flex flex-col items-center gap-2">
                            <span className="text-xs font-mono text-muted-foreground">
                              Shared Core
                            </span>
                            <div className="flex gap-1">
                              <div className="w-2 h-2 rounded-full bg-blue-500" />
                              <div className="w-2 h-2 rounded-full bg-green-500" />
                              <div className="w-2 h-2 rounded-full bg-orange-500" />
                            </div>
                          </div>
                          <div className="h-px w-12 bg-primary/50" />
                          <div className="p-3 rounded-lg border bg-background shadow-sm">
                            <span className="text-sm font-bold">
                              Optimized Bundle
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* 4. THE IMPACT (RESULT) */}
                    <div className="space-y-4">
                      <h4 className="text-lg font-semibold text-primary flex items-center gap-2">
                        <Zap className="h-5 w-5" /> Key Impact
                      </h4>
                      <ul className="grid sm:grid-cols-2 gap-3">
                        {project.caseStudy.impact.map((res, idx) => (
                          <li
                            key={idx}
                            className="flex items-start gap-3 bg-primary/5 p-3 rounded-lg border border-primary/10"
                          >
                            <CheckCircle2 className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                            <span
                              className="text-sm text-foreground/90"
                              dangerouslySetInnerHTML={{
                                __html: res.replace(
                                  /\*\*(.*?)\*\*/g,
                                  '<strong class="text-foreground">$1</strong>'
                                ),
                              }}
                            />
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
            ) : (
              // Fallback for Private Projects without case study
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
