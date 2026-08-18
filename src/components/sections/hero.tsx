"use client";

import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { HERO_ANIMATION, HERO_SOCIALS } from "@/constants";
import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, Briefcase, Cpu, Download } from "lucide-react";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { useTheme } from "next-themes";
import { useSyncExternalStore } from "react";


const Star = ({ size, className, style }: {
  size: number;
  className?: string;
  style?: React.CSSProperties;
}) => (
  <svg
    viewBox="0 0 24 24" width={size} height={size}
    className={cn("absolute pointer-events-none select-none", className)}
    aria-hidden
    style={style}
  >
    <path
      d="M12 2L14.39 8.26L21 9.27L16.5 13.97L17.78 21L12 17.77L6.22 21L7.5 13.97L3 9.27L9.61 8.26Z"
      fill="currentColor" stroke="currentColor" strokeWidth="3.5" strokeLinejoin="round"
    />
  </svg>
);

const Cloud = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 200 100" className={cn("absolute pointer-events-none select-none opacity-20", className)} aria-hidden>
    <ellipse cx="100" cy="70" rx="90" ry="40" fill="white" />
    <ellipse cx="70" cy="55" rx="45" ry="35" fill="white" />
    <ellipse cx="130" cy="50" rx="50" ry="38" fill="white" />
    <ellipse cx="100" cy="45" rx="60" ry="38" fill="white" />
  </svg>
);

const Moon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 100 100" className={cn("pointer-events-none select-none", className)} aria-hidden>
    <circle cx="50" cy="50" r="38" fill="#FFE566" opacity="0.92" />
    <circle cx="68" cy="36" r="32" fill="#040D21" />
  </svg>
);

const skyFade = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0, transition: { duration: 0.5 } },
  transition: { duration: 0.7 },
};

export const Hero = () => {
  const t = useTranslations("hero");
  const { resolvedTheme } = useTheme();
  const mounted = useSyncExternalStore(() => () => {}, () => true, () => false);
  const isDark = mounted && resolvedTheme === "dark";

  return (
    <section
      id="home"
      className="relative w-full min-h-[calc(100vh-4rem)] flex items-center justify-center overflow-hidden bg-[#5B8FE8] dark:bg-[#040D21] transition-[background-color] duration-700"
    >
      {/* ── Accent stars — visible in both modes, fade in on mount ── */}
      <AnimatePresence>
        {mounted && (
          <motion.div
            key="accent"
            className="absolute inset-0 pointer-events-none select-none"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6, delay: 0.15 }}
          >
            <Star size={28} className="top-[22%] left-[18%] text-[#C5D8F5] dark:text-white/40 animate-float"
              style={{ animationDuration: "4s" }} />
            <Star size={32} className="bottom-[30%] right-[18%] text-[#C5D8F5] dark:text-white/35 animate-float"
              style={{ animationDuration: "5.2s", animationDelay: "1s" }} />
            <Star size={20} className="top-[60%] left-[12%] text-[#C5D8F5] dark:text-white/30 animate-float"
              style={{ animationDuration: "3.8s", animationDelay: "0.5s" }} />
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Day sky: big yellow stars + clouds ──────────────────────── */}
      <AnimatePresence>
        {mounted && !isDark && (
          <motion.div key="day" className="absolute inset-0 pointer-events-none select-none" {...skyFade}>
            <Star size={56} className="top-[8%] left-[7%] text-[#FFE566] animate-float"
              style={{ animationDuration: "3.2s" }} />
            <Star size={80} className="top-[12%] right-[9%] text-[#FFE566] animate-float"
              style={{ animationDuration: "4.1s", animationDelay: "0.8s" }} />
            <Star size={44} className="bottom-[18%] left-[4%] text-[#FFE566] animate-float"
              style={{ animationDuration: "5s", animationDelay: "1.5s" }} />
            <Star size={68} className="bottom-[12%] right-[6%] text-[#FFE566] animate-float"
              style={{ animationDuration: "3.8s", animationDelay: "0.5s" }} />
            <Star size={36} className="top-[45%] left-[1%] text-[#FFE566] animate-float"
              style={{ animationDuration: "4.5s", animationDelay: "1.2s" }} />
            <Star size={52} className="top-[30%] right-[2%] text-[#FFE566] animate-float"
              style={{ animationDuration: "3.5s", animationDelay: "0.3s" }} />
            <Cloud className="w-96 h-48 bottom-0 left-0 -translate-x-1/4 translate-y-1/4" />
            <Cloud className="w-80 h-40 top-0 right-0 translate-x-1/4 -translate-y-1/4 rotate-12" />
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Night sky: twinkling stars + dim large stars ─────────────── */}
      <AnimatePresence>
        {mounted && isDark && (
          <motion.div key="night" className="absolute inset-0 pointer-events-none select-none" {...skyFade}>
            {/* Tiny twinkling stars */}
            <Star size={14} className="top-[18%] left-[35%] text-white/50 animate-pulse"
              style={{ animationDuration: "2.5s", animationDelay: "0.2s" }} />
            <Star size={10} className="top-[55%] right-[28%] text-white/35 animate-pulse"
              style={{ animationDuration: "1.8s", animationDelay: "0.8s" }} />
            <Star size={16} className="top-[40%] left-[52%] text-white/25 animate-pulse"
              style={{ animationDuration: "3s", animationDelay: "1.3s" }} />
            <Star size={11} className="bottom-[25%] left-[25%] text-white/40 animate-pulse"
              style={{ animationDuration: "2.2s", animationDelay: "0.5s" }} />
            <Star size={13} className="top-[70%] right-[38%] text-white/30 animate-pulse"
              style={{ animationDuration: "2.8s", animationDelay: "1.0s" }} />
            <Star size={9} className="top-[28%] left-[44%] text-white/45 animate-pulse"
              style={{ animationDuration: "2s", animationDelay: "1.6s" }} />
            <Star size={12} className="top-[82%] left-[58%] text-white/35 animate-pulse"
              style={{ animationDuration: "3.2s", animationDelay: "0.7s" }} />
            {/* Dim large stars — still float gently in dark */}
            <Star size={44} className="bottom-[18%] left-[4%] text-[#FFF0B0] animate-float"
              style={{ animationDuration: "5s", animationDelay: "1.5s", opacity: 0.5 }} />
            <Star size={68} className="bottom-[12%] right-[6%] text-[#FFF0B0] animate-float"
              style={{ animationDuration: "3.8s", animationDelay: "0.5s", opacity: 0.45 }} />
            <Star size={36} className="top-[45%] left-[1%] text-[#FFF0B0] animate-float"
              style={{ animationDuration: "4.5s", animationDelay: "1.2s", opacity: 0.4 }} />
            <Star size={52} className="top-[30%] right-[2%] text-[#FFF0B0] animate-float"
              style={{ animationDuration: "3.5s", animationDelay: "0.3s", opacity: 0.4 }} />
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Moon — own AnimatePresence for independent rise/set ─────── */}
      <AnimatePresence>
        {mounted && isDark && (
          <motion.div
            key="moon"
            className="absolute top-[6%] right-[7%] pointer-events-none select-none"
            initial={{ y: -60, opacity: 0, scale: 0.7 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: -50, opacity: 0, scale: 0.8, transition: { duration: 0.45 } }}
            transition={{ type: "spring", stiffness: 80, damping: 18, delay: 0.15 }}
          >
            <Moon className="w-24 h-24" />
          </motion.div>
        )}
      </AnimatePresence>

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
            className="text-4xl font-bold tracking-tight sm:text-6xl md:text-7xl leading-[1.15] pb-2"
          >
            <span className="text-white drop-shadow-sm inline-flex items-center gap-3 flex-wrap justify-center">
              {t("headline")}
              <span
                className="text-5xl sm:text-6xl md:text-7xl leading-none select-none"
                style={{ fontFamily: "'Segoe UI Emoji','Apple Color Emoji','Noto Color Emoji',sans-serif" }}
                aria-label="unicorn"
              >🦄</span>
            </span>
            <br />
            <span
              className="block mt-3 pb-1 animate-gradient-text"
              style={{
                backgroundImage: "linear-gradient(to right, #C8E645, #FFE566, #FF8C42, #C5D8F5, #F5B8CC, #C8E645)",
              }}
            >
              {t("role")}
            </span>
          </motion.h1>

          {/* Subtitle */}
          <motion.div
            variants={HERO_ANIMATION.item}
            className="mx-auto max-w-[700px] text-lg md:text-xl leading-relaxed flex flex-col gap-4"
          >
            <div className="flex items-center justify-center gap-2 text-[#C8E645] font-semibold bg-white/10 backdrop-blur-sm rounded-full px-5 py-1.5 border border-white/20 w-fit mx-auto">
              <Cpu className="h-5 w-5 shrink-0" />
              <span>{t("foundation")}</span>
            </div>
            <p className="text-white/80 font-light">{t("tagline")}</p>
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

      {/* Wave transition — fill adapts to background */}
      <div className="absolute bottom-0 left-0 right-0 z-10 pointer-events-none">
        <svg
          viewBox="0 0 1440 100" xmlns="http://www.w3.org/2000/svg"
          className="w-full block" preserveAspectRatio="none" aria-hidden
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
