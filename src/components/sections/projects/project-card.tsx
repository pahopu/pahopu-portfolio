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
import { ExternalLink, Eye, Github, GraduationCap, Lock } from "lucide-react";
import Link from "next/link";
import { ResponsiveModal } from "@/components/shared/responsive-modal";
import { ProjectCaseStudy } from "./project-case-study";
import { ProjectImage } from "./project-image";
import { useTranslations } from "next-intl";

const MotionCard = motion(Card);

// CONGBDAY accent colors cycling per card
const CARD_ACCENTS = [
  "hover:border-primary/50 hover:shadow-primary/15",
  "hover:border-[#5B8FE8]/50 hover:shadow-[#5B8FE8]/15",
  "hover:border-[#FFE566]/50 hover:shadow-[#FFE566]/15",
  "hover:border-[#F5B8CC]/50 hover:shadow-[#F5B8CC]/15",
  "hover:border-[#FF8C42]/50 hover:shadow-[#FF8C42]/15",
];

interface ProjectCardProps {
  project: (typeof PROJECTS)[0];
  index: number;
}

export const ProjectCard = ({ project, index }: ProjectCardProps) => {
  const t = useTranslations("projects");
  const accent = CARD_ACCENTS[index % CARD_ACCENTS.length];

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
        "flex flex-col h-full overflow-hidden p-0 gap-0 transition-all duration-300 border bg-card hover:shadow-lg",
        accent,
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
            {"academic" in project && project.academic && (
              <Badge variant="secondary" className="gap-1 shrink-0 bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20">
                <GraduationCap className="h-3 w-3" /> {t("academic_badge")}
              </Badge>
            )}
            {project.links.demo === null && project.links.github === null && (
              <Badge variant="secondary" className="gap-1 shrink-0">
                <Lock className="h-3 w-3" /> {t("private_badge")}
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
                className="bg-primary/5 border-primary/20 rounded-full"
              >
                {tag}
              </Badge>
            ))}
          </div>
        </CardContent>

        {/* Footer Actions */}
        <CardFooter className="pt-0 mt-auto pb-6">
          <div className="flex flex-wrap gap-3 w-full pt-4 border-t">
            {/* GitHub */}
            {project.links.github && (
              <Link href={project.links.github} target="_blank">
                <Button variant="outline" size="sm" className="gap-2">
                  <Github className="h-4 w-4" /> {t("code")}
                </Button>
              </Link>
            )}

            {project.links.demo && (
              <Link href={project.links.demo} target="_blank">
                <Button size="sm" className="gap-2">
                  <ExternalLink className="h-4 w-4" /> {t("live_demo")}
                </Button>
              </Link>
            )}

            {project.caseStudy ? (
              <ResponsiveModal
                title={project.title}
                description={t("case_study_desc")}
                content={<ProjectCaseStudy data={project.caseStudy} />}
              >
                <Button variant="default" size="sm" className="gap-2">
                  <Eye className="h-4 w-4" /> {t("case_study")}
                </Button>
              </ResponsiveModal>
            ) : (
              project.links.demo === null &&
              project.links.github === null && (
                <Button
                  variant="ghost"
                  size="sm"
                  className="gap-2 cursor-not-allowed opacity-70 px-0 hover:bg-transparent"
                >
                  {t("internal_label")}
                </Button>
              )
            )}
          </div>
        </CardFooter>
      </div>
    </MotionCard>
  );
};
