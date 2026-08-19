"use client";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { HERO_ANIMATION } from "@/constants";
import { motion } from "framer-motion";
import {
  Award,
  Briefcase,
  Code2,
  Cpu,
  GraduationCap,
  Layers,
  Rocket,
  Sparkles,
  UserRound,
} from "lucide-react";
import { AlbumStar, StarDeco } from "@/components/shared/album-star";
import { useTranslations } from "next-intl";

const MotionCard = motion(Card);

export const About = () => {
  const t = useTranslations("about");

  return (
    <section id="about" className="relative w-full py-24 overflow-hidden">
      <div className="absolute inset-0 bg-[#F0F6FF]/60 dark:bg-[#0F1B40]/30" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[600px] bg-[#5B8FE8]/8 rounded-full blur-[150px] -z-10" />
      <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-primary/6 rounded-full blur-[100px] -z-10" />
      <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-[#F5B8CC]/8 rounded-full blur-[80px] -z-10" />
      <AlbumStar size={68} className="top-[4%] right-[3%]"     style={{ animationDuration: "5.2s" }} />
      <AlbumStar size={28} className="top-[18%] right-[7%]"    style={{ animationDuration: "4.0s", animationDelay: "1.8s" }} />
      <AlbumStar size={44} className="top-[44%] right-[1%]"    style={{ animationDuration: "6.8s", animationDelay: "0.7s" }} />
      <AlbumStar size={18} className="top-[62%] right-[5%]"    style={{ animationDuration: "5.8s", animationDelay: "2.3s" }} />
      <AlbumStar size={52} className="bottom-[8%] right-[4%]"  style={{ animationDuration: "4.5s", animationDelay: "0.3s" }} />
      <AlbumStar size={40} className="top-[5%] left-[3%]"      style={{ animationDuration: "6.1s", animationDelay: "1.0s" }} />
      <AlbumStar size={20} className="top-[30%] left-[1%]"     style={{ animationDuration: "5.6s", animationDelay: "2.0s" }} />
      <AlbumStar size={56} className="bottom-[6%] left-[2%]"   style={{ animationDuration: "7.1s", animationDelay: "1.2s" }} />
      <AlbumStar size={16} className="bottom-[22%] left-[6%]"  style={{ animationDuration: "4.3s", animationDelay: "0.9s" }} />
      <AlbumStar dim size={22} className="top-[25%] right-[9%]"   style={{ animationDuration: "3.8s", animationDelay: "1.1s" }} />
      <AlbumStar dim size={14} className="bottom-[40%] left-[9%]" style={{ animationDuration: "4.6s", animationDelay: "2.5s" }} />
      <AlbumStar dim size={18} className="top-[70%] right-[8%]"   style={{ animationDuration: "5.2s", animationDelay: "0.4s" }} />

      <div className="container px-4 md:px-6 mx-auto max-w-6xl relative z-10">
        {/* Section header */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/15 border border-primary/25 text-primary font-semibold text-sm mb-3">
            <UserRound className="h-3.5 w-3.5" /> {t("label")}
          </div>
          <h2 className="text-4xl font-bold sm:text-5xl">{t("heading")}</h2>
          <p className="mt-3 text-muted-foreground max-w-xl mx-auto">{t("subheading")}</p>
        </div>

        <motion.div
          variants={HERO_ANIMATION.container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          className="flex flex-col gap-5"
        >
          {/* ── Bio card (full width) ── */}
          <MotionCard
            variants={HERO_ANIMATION.item}
            className="rounded-3xl relative overflow-hidden border-primary/20 bg-linear-to-br from-primary/5 via-card to-card"
          >
            <StarDeco className="absolute -top-4 -right-4 w-28 h-28 text-primary/5 rotate-12 pointer-events-none" />
            <StarDeco className="absolute -bottom-6 -left-6 w-36 h-36 text-[#5B8FE8]/5 -rotate-12 pointer-events-none" />

            <CardContent className="p-6 md:p-8">
              {/* Decorative label divider */}
              <div className="flex items-center gap-3 mb-5">
                <div className="h-px flex-1 bg-border" />
                <span className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest text-primary/80">
                  <Sparkles className="h-3 w-3" />
                  {t("mindset_label")}
                </span>
                <div className="h-px flex-1 bg-border" />
              </div>

              {/* Bio text — 2-col on md+ */}
              <div className="grid md:grid-cols-2 gap-4 mb-5">
                <p className="text-muted-foreground leading-relaxed">{t("bio_1")}</p>
                <p className="text-muted-foreground leading-relaxed">{t("bio_2")}</p>
              </div>

              {/* Edu / Awards divider */}
              <div className="flex items-center gap-3 mb-4">
                <div className="h-px flex-1 bg-border" />
                <span className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest text-muted-foreground/70">
                  <GraduationCap className="h-3 w-3" />
                  {t("edu_label")}
                </span>
                <div className="h-px flex-1 bg-border" />
              </div>

              {/* Edu / Awards */}
              <div className="flex flex-col sm:flex-row gap-3 mb-6">
                <div className="flex items-start gap-3 text-sm text-muted-foreground flex-1">
                  <span className="p-1 rounded-md bg-[#5B8FE8]/10 text-[#5B8FE8] shrink-0 mt-0.5">
                    <GraduationCap className="h-3.5 w-3.5" />
                  </span>
                  <span>{t("edu_line")}</span>
                </div>
                <div className="flex items-start gap-3 text-sm text-muted-foreground flex-1">
                  <span className="p-1 rounded-md bg-[#FFE566]/20 text-[#B8930A] dark:text-[#FFE566] shrink-0 mt-0.5">
                    <Award className="h-3.5 w-3.5" />
                  </span>
                  <span>{t("awards_line")}</span>
                </div>
              </div>

              {/* Stats strip */}
              <div className="grid grid-cols-3 gap-4 pt-5 border-t border-border">
                {/* GPA */}
                <div className="flex flex-col items-center text-center gap-2">
                  <span className="p-2 rounded-xl bg-primary/15 text-primary">
                    <GraduationCap className="h-5 w-5" />
                  </span>
                  <div className="text-3xl font-extrabold text-primary leading-none">{t("gpa")}</div>
                  <div className="text-xs text-muted-foreground uppercase tracking-widest leading-tight">{t("gpa_label")}</div>
                  <Badge variant="outline" className="rounded-full border-primary/40 text-primary bg-primary/15 text-xs px-2 py-0.5">
                    {t("gpa_badge")}
                  </Badge>
                </div>

                {/* Experience */}
                <div className="flex flex-col items-center text-center gap-2 border-x border-border px-4">
                  <span className="p-2 rounded-xl bg-[#5B8FE8]/15 text-[#5B8FE8]">
                    <Briefcase className="h-5 w-5" />
                  </span>
                  <div className="text-3xl font-extrabold text-[#5B8FE8] leading-none">{t("exp_number")}</div>
                  <div className="text-xs text-muted-foreground uppercase tracking-widest leading-tight">{t("exp_label")}</div>
                </div>

                {/* Projects */}
                <div className="flex flex-col items-center text-center gap-2">
                  <span className="p-2 rounded-xl bg-[#FFE566]/30 text-[#1B2E6E] dark:text-[#FFE566]">
                    <Rocket className="h-5 w-5" />
                  </span>
                  <div className="text-3xl font-extrabold text-[#1B2E6E] dark:text-[#FFE566] leading-none">{t("projects_number")}</div>
                  <div className="text-xs text-muted-foreground uppercase tracking-widest leading-tight">{t("projects_label")}</div>
                </div>
              </div>
            </CardContent>
          </MotionCard>

          {/* ── Technical Arsenal ── */}
          <MotionCard
            variants={HERO_ANIMATION.item}
            className="rounded-3xl border-[#FF8C42]/20 bg-linear-to-br from-[#FF8C42]/5 via-card to-card relative overflow-hidden"
          >
            <StarDeco className="absolute -top-5 -right-5 w-28 h-28 text-[#FFE566]/8 dark:text-[#FFF0B0]/6 rotate-12" />
            <StarDeco className="absolute -bottom-6 -left-6 w-24 h-24 text-[#FF8C42]/8 -rotate-6" />
            <CardContent className="p-5 md:p-6">
              <div className="flex items-center justify-between mb-5">
                <div className="flex items-center gap-2.5 text-[#FF8C42] font-semibold">
                  <span className="p-1.5 rounded-lg bg-[#FF8C42]/15">
                    <Code2 className="h-4 w-4" />
                  </span>
                  {t("stack_label")}
                </div>
                <div className="flex gap-1.5 opacity-40">
                  <div className="w-2.5 h-2.5 rounded-full bg-[#FF8C42]/60" />
                  <div className="w-2.5 h-2.5 rounded-full bg-[#FFE566]/60" />
                  <div className="w-2.5 h-2.5 rounded-full bg-primary/60" />
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <h4 className="text-xs font-bold uppercase text-muted-foreground tracking-wider flex items-center gap-1.5">
                    <Layers className="h-3.5 w-3.5" /> {t("core_label")}
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {["JavaScript (ES6+)", "TypeScript", "Vue 3", "React", "Next.js", "Quasar", "Tailwind CSS"].map((tech) => (
                      <Badge key={tech} variant="secondary" className="rounded-full bg-[#FF8C42]/5 hover:bg-[#FF8C42]/10 text-[#CC6A1E] dark:text-[#FF8C42] border-transparent transition-colors">
                        {tech}
                      </Badge>
                    ))}
                  </div>
                </div>
                <div className="space-y-3">
                  <h4 className="text-xs font-bold uppercase text-muted-foreground tracking-wider flex items-center gap-1.5">
                    <Cpu className="h-3.5 w-3.5" /> {t("cs_label")}
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {["C/C++", "Python", "Keras", "OpenCV", "MS SQL Server", "Git/GitHub"].map((tech) => (
                      <Badge key={tech} variant="outline" className="rounded-full border-dashed border-[#FF8C42]/30">
                        {tech}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </MotionCard>
        </motion.div>
      </div>
    </section>
  );
};
