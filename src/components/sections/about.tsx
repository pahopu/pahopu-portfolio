"use client";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { HERO_ANIMATION } from "@/constants";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";

const MotionCard = motion(Card);

// Rotating star decoration used in card corners
const StarDeco = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" className={className} aria-hidden>
    <path
      d="M12 2L14.39 8.26L21 9.27L16.5 13.97L17.78 21L12 17.77L6.22 21L7.5 13.97L3 9.27L9.61 8.26Z"
      fill="currentColor" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"
    />
  </svg>
);

export const About = () => {
  const t = useTranslations("about");

  return (
    <section id="about" className="relative w-full py-24 overflow-hidden">
      {/* Background blobs */}
      <div className="absolute inset-0 bg-[#F0F6FF]/60 dark:bg-[#0F1B40]/30" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[600px] bg-[#5B8FE8]/8 rounded-full blur-[150px] -z-10" />
      <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-primary/6 rounded-full blur-[100px] -z-10" />
      <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-[#F5B8CC]/8 rounded-full blur-[80px] -z-10" />

      <div className="container px-4 md:px-6 mx-auto max-w-6xl relative z-10">
        {/* Section header */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/15 border border-primary/25 text-primary font-semibold text-sm mb-3">
            ✦ {t("label")}
          </div>
          <h2 className="text-4xl font-bold sm:text-5xl">{t("heading")}</h2>
          <p className="mt-3 text-muted-foreground max-w-xl mx-auto">{t("subheading")}</p>
        </div>

        <motion.div
          variants={HERO_ANIMATION.container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-3 gap-5"
        >
          {/* Liner Notes card */}
          <MotionCard
            variants={HERO_ANIMATION.item}
            className="md:col-span-2 rounded-3xl relative overflow-hidden border-primary/20 bg-linear-to-br from-primary/5 via-card to-card"
          >
            {/* Corner star deco */}
            <StarDeco className="absolute -top-4 -right-4 w-24 h-24 text-primary/5 rotate-12 pointer-events-none" />
            <StarDeco className="absolute -bottom-6 -left-6 w-32 h-32 text-[#5B8FE8]/5 -rotate-12 pointer-events-none" />

            <CardContent className="p-6 md:p-8 space-y-5">
              <div className="flex items-center gap-2 text-primary font-semibold text-lg">
                <span className="text-xl">✦</span> {t("mindset_label")}
              </div>
              <p className="text-muted-foreground leading-relaxed text-lg">{t("bio_1")}</p>
              <p className="text-muted-foreground leading-relaxed">{t("bio_2")}</p>

              {/* Credits strip — album liner style */}
              <div className="pt-3 border-t border-primary/10 space-y-2">
                <div className="flex items-start gap-2.5 text-sm text-muted-foreground">
                  <span className="text-[#5B8FE8] text-base leading-none mt-0.5">🎓</span>
                  <span>{t("edu_line")}</span>
                </div>
                <div className="flex items-start gap-2.5 text-sm text-muted-foreground">
                  <span className="text-[#FFE566] text-base leading-none mt-0.5">🏆</span>
                  <span>{t("awards_line")}</span>
                </div>
              </div>
            </CardContent>
          </MotionCard>

          {/* Award sticker badges column */}
          <div className="md:col-span-1 flex flex-col gap-4">
            {/* GPA sticker */}
            <MotionCard
              variants={HERO_ANIMATION.item}
              className="rounded-3xl text-center border-primary/20 bg-linear-to-br from-primary/15 via-card to-card flex-1 relative overflow-hidden"
            >
              <StarDeco className="absolute top-2 right-2 w-8 h-8 text-primary/15" />
              <CardContent className="flex flex-col items-center justify-center h-full py-7 px-4">
                <span className="text-3xl mb-1">🎓</span>
                <div className="text-5xl font-extrabold text-primary leading-none mb-1">{t("gpa")}</div>
                <div className="text-xs text-muted-foreground uppercase tracking-widest">{t("gpa_label")}</div>
                <Badge variant="outline" className="mt-3 rounded-full border-primary/30 text-[#1B2E6E] dark:text-primary-foreground bg-primary/10 text-xs">
                  {t("gpa_badge")}
                </Badge>
              </CardContent>
            </MotionCard>

            {/* Experience sticker */}
            <MotionCard
              variants={HERO_ANIMATION.item}
              className="rounded-3xl text-center border-[#5B8FE8]/20 bg-linear-to-br from-[#5B8FE8]/10 via-card to-card flex-1"
            >
              <CardContent className="flex flex-col items-center justify-center h-full py-7 px-4">
                <span className="text-3xl mb-1">⚡</span>
                <div className="text-5xl font-extrabold text-[#5B8FE8] leading-none mb-1">{t("exp_number")}</div>
                <div className="text-xs text-muted-foreground uppercase tracking-widest">{t("exp_label")}</div>
              </CardContent>
            </MotionCard>

            {/* Projects sticker */}
            <MotionCard
              variants={HERO_ANIMATION.item}
              className="rounded-3xl text-center border-[#FFE566]/30 bg-linear-to-br from-[#FFE566]/20 via-card to-card flex-1"
            >
              <CardContent className="flex flex-col items-center justify-center h-full py-7 px-4">
                <span className="text-3xl mb-1">🚀</span>
                <div className="text-5xl font-extrabold text-[#1B2E6E] dark:text-[#FFE566] leading-none mb-1">{t("projects_number")}</div>
                <div className="text-xs text-muted-foreground uppercase tracking-widest">{t("projects_label")}</div>
              </CardContent>
            </MotionCard>
          </div>

          {/* "Produced With" credits card */}
          <MotionCard
            variants={HERO_ANIMATION.item}
            className="md:col-span-3 rounded-3xl border-[#FF8C42]/20 bg-linear-to-br from-[#FF8C42]/5 via-card to-card"
          >
            <CardContent className="p-0 h-full flex flex-col">
              <div className="p-5 border-b border-[#FF8C42]/10 flex items-center justify-between">
                <div className="flex items-center gap-2 text-[#FF8C42] font-semibold">
                  <span>⚡</span> {t("stack_label")}
                </div>
                {/* Decorative traffic-light dots (album art nod) */}
                <div className="flex gap-1.5 opacity-50">
                  <div className="w-2.5 h-2.5 rounded-full bg-[#FF8C42]/60" />
                  <div className="w-2.5 h-2.5 rounded-full bg-[#FFE566]/60" />
                  <div className="w-2.5 h-2.5 rounded-full bg-primary/60" />
                </div>
              </div>
              <div className="p-5 grid sm:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <h4 className="text-xs font-bold uppercase text-muted-foreground tracking-wider flex items-center gap-1.5">
                    🎨 {t("core_label")}
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
                    🔬 {t("cs_label")}
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {["C/C++", "Python", "PyTorch", "OpenCV", "MS SQL Server", "Git/GitHub"].map((tech) => (
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
