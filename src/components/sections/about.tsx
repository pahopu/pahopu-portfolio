"use client";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { HERO_ANIMATION } from "@/constants";
import { motion } from "framer-motion";
import {
  BookOpen,
  Code2,
  Cpu,
  Database,
  GraduationCap,
  Layers,
  Sparkles,
  Terminal,
  Trophy,
} from "lucide-react";

const MotionCard = motion(Card);

export const About = () => {
  return (
    <section id="about" className="relative w-full py-24 overflow-hidden">
      {/* --- SECTION: BACKGROUND --- */}
      <div className="absolute inset-0 bg-[#F0F6FF]/60 dark:bg-[#0F1B40]/30" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[600px] bg-[#5B8FE8]/10 rounded-full blur-[150px] -z-10" />
      <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-[#C8E645]/8 rounded-full blur-[100px] -z-10" />
      <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-[#F5B8CC]/10 rounded-full blur-[80px] -z-10" />

      {/* --- SECTION: CONTENT CONTAINER --- */}
      <div className="container px-4 md:px-6 mx-auto max-w-6xl relative z-10">
        {/* --- HEADER --- */}
        <div className="text-center mb-14">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/15 border border-primary/25 text-primary font-semibold text-sm mb-4">
            <Terminal className="w-4 h-4" /> About Me
          </div>
          <h2 className="text-4xl font-bold sm:text-5xl">
            Engineering Profile
          </h2>
          <p className="mt-3 text-muted-foreground max-w-xl mx-auto">
            CS graduate, 1.5+ years building complex frontends. I care about code that scales.
          </p>
        </div>

        {/* --- BENTO GRID LAYOUT --- */}
        <motion.div
          variants={HERO_ANIMATION.container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-3 gap-4"
        >
          {/* --- CARD 1: BIO (BLUE ACCENT) --- */}
          <MotionCard
            variants={HERO_ANIMATION.item}
            className="md:col-span-2 relative overflow-hidden border-primary/20 bg-linear-to-br from-primary/5 via-card to-card rounded-3xl"
          >
            {/* Decoration Icon */}
            <div className="absolute -top-6 -right-6 opacity-[0.03] rotate-12 pointer-events-none">
              <Cpu size={200} />
            </div>

            <CardContent className="p-6 md:p-8 space-y-4">
              <div className="flex items-center gap-2 text-primary font-semibold text-lg mb-2">
                <Cpu className="w-5 h-5" /> The Engineer Mindset
              </div>
              <p className="text-muted-foreground leading-relaxed text-lg">
                I am a <strong>Front-End Developer</strong> with{" "}
                <strong className="text-foreground">1.5+ years</strong> of
                experience in building large-scale{" "}
                <strong className="text-foreground">ERP systems</strong>.
              </p>
              <p className="text-muted-foreground">
                With a strong <strong>Computer Science foundation</strong> (GPA
                9.14), I don&apos;t just code UI; I optimize for logic, memory,
                and scalability. I specialize in the{" "}
                <span className="text-foreground font-medium">Vue 3</span> &{" "}
                <span className="text-foreground font-medium">React</span>{" "}
                ecosystems to bridge complex backend logic with smooth user
                experiences.
              </p>
            </CardContent>
          </MotionCard>

          {/* --- CARD 2: GPA (AMBER ACCENT) --- */}
          <MotionCard
            variants={HERO_ANIMATION.item}
            className="md:col-span-1 border-primary/20 bg-linear-to-br from-primary/10 via-card to-card relative overflow-hidden rounded-3xl"
          >
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,#C8E64526,transparent_70%)]" />

            {/* Fully Centered Content */}
            <CardContent className="relative z-10 flex flex-col items-center justify-center h-full p-6 min-h-[200px]">
              <div className="p-3 rounded-full bg-primary/10 mb-3">
                <GraduationCap className="w-8 h-8 text-primary" />
              </div>

              <div className="text-5xl font-extrabold tracking-tighter text-primary mb-1">
                9.14
              </div>

              <p className="text-primary/80 font-medium uppercase tracking-widest text-[10px] mb-4">
                GPA / 10.0
              </p>

              <p className="text-xs text-muted-foreground text-center mb-3">
                University of Information Technology
              </p>

              <Badge
                variant="outline"
                className="border-primary/30 text-[#1B2E6E] dark:text-primary-foreground bg-primary/10 hover:bg-primary/20"
              >
                Top 8% Excellence
              </Badge>
            </CardContent>
          </MotionCard>

          {/* --- CARD 3: EDUCATION (VIOLET ACCENT) --- */}
          <MotionCard
            variants={HERO_ANIMATION.item}
            className="md:col-span-1 border-[#5B8FE8]/20 bg-linear-to-br from-[#5B8FE8]/5 via-card to-card rounded-3xl"
          >
            <CardContent className="flex flex-col justify-center h-full space-y-6">
              <div className="flex items-center gap-2 text-[#5B8FE8] font-semibold text-base">
                <BookOpen className="w-4 h-4" /> Education & Honors
              </div>

              <div>
                <h4 className="font-semibold text-sm text-foreground">
                  Bachelor of Computer Science
                </h4>
                <p className="text-xs text-muted-foreground mt-1">
                  2020 - 2024
                </p>
              </div>

              <div className="space-y-3 pt-4 border-t border-[#5B8FE8]/10">
                <div className="flex items-start gap-2 text-sm text-muted-foreground">
                  <Trophy className="w-4 h-4 text-[#5B8FE8] shrink-0 mt-0.5" />
                  <span>Scholarship for Excellence</span>
                </div>
                <div className="flex items-start gap-2 text-sm text-muted-foreground">
                  <Sparkles className="w-4 h-4 text-[#5B8FE8] shrink-0 mt-0.5" />
                  <span>Student of 5 Merits</span>
                </div>
              </div>
            </CardContent>
          </MotionCard>

          {/* --- CARD 4: TECH STACK (EMERALD ACCENT) --- */}
          <MotionCard
            variants={HERO_ANIMATION.item}
            className="md:col-span-2 border-[#FF8C42]/20 bg-linear-to-br from-[#FF8C42]/5 via-card to-card rounded-3xl"
          >
            <CardContent className="p-0 h-full flex flex-col">
              {/* Internal Header */}
              <div className="p-6 pt-0 border-b border-[#FF8C42]/10 flex items-center justify-between">
                <div className="flex items-center gap-2 text-[#FF8C42] font-semibold">
                  <Layers className="w-5 h-5" /> Technical Arsenal
                </div>
                <div className="flex gap-1.5 opacity-60">
                  <div className="w-2.5 h-2.5 rounded-full bg-red-500/40" />
                  <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/40" />
                  <div className="w-2.5 h-2.5 rounded-full bg-green-500/40" />
                </div>
              </div>

              {/* Internal Grid */}
              <div className="p-6 grid sm:grid-cols-2 gap-8 flex-1">
                {/* Core & Ecosystem */}
                <div className="space-y-3">
                  <h4 className="text-xs font-bold uppercase text-muted-foreground tracking-wider flex items-center gap-2">
                    <Code2 className="w-3 h-3" /> Core & Ecosystem
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {[
                      "JavaScript (ES6+)",
                      "TypeScript",
                      "Vue 3",
                      "React",
                      "Next.js",
                      "Quasar",
                      "Tailwind CSS",
                    ].map((t) => (
                      <Badge
                        key={t}
                        variant="secondary"
                        className="bg-[#FF8C42]/5 hover:bg-[#FF8C42]/10 text-[#CC6A1E] dark:text-[#FF8C42] border-transparent transition-colors"
                      >
                        {t}
                      </Badge>
                    ))}
                  </div>
                </div>

                {/* CS & Engineering */}
                <div className="space-y-3">
                  <h4 className="text-xs font-bold uppercase text-muted-foreground tracking-wider flex items-center gap-2">
                    <Database className="w-3 h-3" /> CS & Engineering
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {[
                      "C/C++",
                      "Python",
                      "PyTorch",
                      "OpenCV",
                      "MS SQL Server",
                      "Git/GitHub",
                    ].map((t) => (
                      <Badge
                        key={t}
                        variant="outline"
                        className="border-dashed border-[#FF8C42]/30"
                      >
                        {t}
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
