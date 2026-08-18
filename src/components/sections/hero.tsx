"use client";

import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { HERO_ANIMATION, HERO_SOCIALS } from "@/constants";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { ArrowRight, Briefcase, Cpu, Download } from "lucide-react";
import Link from "next/link";
import { useTranslations } from "next-intl";

// Rounded SVG star — strokeLinejoin="round" softens the points
const Star = ({ size, className }: { size: number; className?: string }) => (
  <svg
    viewBox="0 0 24 24"
    width={size}
    height={size}
    className={cn("absolute pointer-events-none select-none", className)}
    aria-hidden
  >
    <path
      d="M12 2L14.39 8.26L21 9.27L16.5 13.97L17.78 21L12 17.77L6.22 21L7.5 13.97L3 9.27L9.61 8.26Z"
      fill="currentColor"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinejoin="round"
    />
  </svg>
);

// Clouds — light mode only
const Cloud = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 200 100" className={cn("absolute pointer-events-none select-none opacity-20 dark:hidden", className)} aria-hidden>
    <ellipse cx="100" cy="70" rx="90" ry="40" fill="white" />
    <ellipse cx="70" cy="55" rx="45" ry="35" fill="white" />
    <ellipse cx="130" cy="50" rx="50" ry="38" fill="white" />
    <ellipse cx="100" cy="45" rx="60" ry="38" fill="white" />
  </svg>
);

// Crescent moon — dark mode only
const Moon = ({ className }: { className?: string }) => (
  <svg
    viewBox="0 0 100 100"
    className={cn("absolute pointer-events-none select-none hidden dark:block", className)}
    aria-hidden
  >
    <circle cx="50" cy="50" r="38" fill="#FFE566" opacity="0.92" />
    <circle cx="68" cy="36" r="32" fill="#040D21" />
  </svg>
);

export const Hero = () => {
  const t = useTranslations("hero");

  return (
    <section
      id="home"
      className="relative w-full min-h-[calc(100vh-4rem)] flex items-center justify-center overflow-hidden bg-[#5B8FE8] dark:bg-[#040D21] transition-[background-color] duration-700"
    >
      {/* Yellow stars — day sky */}
      <Star size={56} className="top-[8%] left-[7%] text-[#FFE566] animate-bounce [animation-delay:200ms]" />
      <Star size={80} className="top-[12%] right-[9%] text-[#FFE566] dark:hidden animate-bounce [animation-delay:800ms]" />
      <Star size={44} className="bottom-[18%] left-[4%] text-[#FFE566] dark:text-[#FFF0B0] animate-bounce [animation-delay:1500ms]" />
      <Star size={68} className="bottom-[12%] right-[6%] text-[#FFE566] dark:text-[#FFF0B0] animate-bounce [animation-delay:500ms]" />
      <Star size={36} className="top-[45%] left-[1%] text-[#FFE566] dark:text-[#FFF0B0] animate-bounce [animation-delay:1200ms]" />
      <Star size={52} className="top-[30%] right-[2%] text-[#FFE566] dark:text-[#FFF0B0] animate-bounce [animation-delay:300ms]" />

      {/* Baby blue accent stars */}
      <Star size={28} className="top-[22%] left-[18%] text-[#C5D8F5] dark:text-white/40" />
      <Star size={32} className="bottom-[30%] right-[18%] text-[#C5D8F5] dark:text-white/35" />
      <Star size={20} className="top-[60%] left-[12%] text-[#C5D8F5] dark:text-white/30" />

      {/* Night sky extras — dark mode only */}
      <Star size={14} className="hidden dark:block top-[18%] left-[35%] text-white/50" />
      <Star size={10} className="hidden dark:block top-[55%] right-[28%] text-white/35" />
      <Star size={16} className="hidden dark:block top-[40%] left-[52%] text-white/25" />
      <Star size={11} className="hidden dark:block bottom-[25%] left-[25%] text-white/40" />
      <Star size={13} className="hidden dark:block top-[70%] right-[38%] text-white/30" />

      {/* Crescent moon — dark mode only, replaces big top-right star */}
      <Moon className="w-24 h-24 top-[6%] right-[7%]" />

      {/* Cloud shapes — light mode only */}
      <Cloud className="w-96 h-48 bottom-0 left-0 -translate-x-1/4 translate-y-1/4" />
      <Cloud className="w-80 h-40 top-0 right-0 translate-x-1/4 -translate-y-1/4 rotate-12" />

      {/* Content */}
      <div className="container px-4 md:px-6 flex flex-col items-center text-center z-10 pb-20 md:pb-28">
        <motion.div
          variants={HERO_ANIMATION.container}
          initial="hidden"
          animate="show"
          className="space-y-8 max-w-4xl"
        >
          {/* Badge */}
          <motion.div variants={HERO_ANIMATION.item} className="flex justify-center">
            <Badge
              variant="outline"
              className="gap-2 py-1.5 px-4 text-sm font-semibold bg-white/20 backdrop-blur-md border-white/30 text-white shadow-sm"
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#C8E645] opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#C8E645]" />
              </span>
              <span>{t("badge")}</span>
            </Badge>
          </motion.div>

          {/* Headline */}
          <motion.h1
            variants={HERO_ANIMATION.item}
            className="text-4xl font-bold tracking-tight sm:text-6xl md:text-7xl"
          >
            <span className="text-white drop-shadow-sm">{t("headline")}</span>
            <br />
            <span
              className="block mt-3 animate-gradient-text"
              style={{
                backgroundImage: "linear-gradient(to right, #C8E645, #FFE566, #C5D8F5, #F5B8CC, #C8E645)",
              }}
            >
              {t("role")}
            </span>
          </motion.h1>

          {/* Subtitle */}
          <motion.div
            variants={HERO_ANIMATION.item}
            className="mx-auto max-w-[700px] text-white/90 text-lg md:text-xl leading-relaxed flex flex-col gap-4"
          >
            <div className="flex items-center justify-center gap-2 text-[#C8E645] font-semibold">
              <Cpu className="h-5 w-5" />
              <span>{t("foundation")}</span>
            </div>
            <p>{t("tagline")}</p>
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            variants={HERO_ANIMATION.item}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4"
          >
            <Link
              href="#contact"
              className={cn(
                buttonVariants({ size: "lg" }),
                "group h-12 px-8 text-base font-bold bg-[#C8E645] text-[#1B2E6E] hover:bg-[#d4ed4f] hover:shadow-lg transition-all duration-300 border-0 rounded-full"
              )}
            >
              {t("cta_contact")}
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>

            <Link
              href="#projects"
              className={cn(
                buttonVariants({ variant: "outline", size: "lg" }),
                "hidden md:inline-flex h-12 px-8 text-base font-semibold bg-white/10 backdrop-blur-sm border-white/40 text-white hover:bg-white/20 rounded-full"
              )}
            >
              {t("cta_projects")} <Briefcase className="ml-2 h-4 w-4" />
            </Link>

            <a
              href="/files/resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className={cn(
                buttonVariants({ variant: "outline", size: "lg" }),
                "md:hidden h-12 px-8 text-base font-semibold bg-white/10 backdrop-blur-sm border-white/40 text-white hover:bg-white/20 rounded-full"
              )}
            >
              {t("cta_cv")} <Download className="ml-2 h-4 w-4" />
            </a>
          </motion.div>

          {/* Social Icons */}
          <motion.div
            variants={HERO_ANIMATION.item}
            className="flex items-center justify-center gap-4 pt-6"
          >
            {HERO_SOCIALS.map((social, index) => (
              <Link
                key={index}
                href={social.href}
                target="_blank"
                aria-label={social.label}
                className="p-3 rounded-full bg-white/15 border border-white/30 hover:bg-white/25 hover:border-[#C8E645]/60 hover:text-[#C8E645] text-white transition-all duration-300 group"
              >
                <social.icon className="h-5 w-5 group-hover:scale-110 transition-transform" />
              </Link>
            ))}
          </motion.div>
        </motion.div>
      </div>

      {/* Cloud wave transition — fill adapts to light/dark background */}
      <div className="absolute bottom-0 left-0 right-0 z-10 pointer-events-none">
        <svg
          viewBox="0 0 1440 100"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full block"
          preserveAspectRatio="none"
          aria-hidden
        >
          <path
            d="M0,50 C120,100 240,0 360,50 C480,100 600,0 720,50 C840,100 960,0 1080,50 C1200,100 1320,0 1440,50 L1440,100 L0,100 Z"
            className="fill-background"
          />
        </svg>
      </div>
    </section>
  );
};
