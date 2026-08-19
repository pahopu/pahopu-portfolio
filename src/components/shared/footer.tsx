"use client";

import { HERO_SOCIALS } from "@/constants";
import { useKonamiCode } from "@/hooks/use-konami-code";
import { cn } from "@/lib/utils";
import { Code2, Copyright } from "lucide-react";
import Link from "next/link";
import { useTranslations } from "next-intl";

const KONAMI_DISPLAY = ["↑", "↑", "↓", "↓", "←", "→", "←", "→", "B", "A"];

export const Footer = () => {
  const t = useTranslations("footer");
  const currentYear = new Date().getFullYear();
  const { step } = useKonamiCode();

  return (
    <footer className="w-full py-8 relative overflow-hidden bg-[#F0F6FF]/80 dark:bg-[#0A1232]/60">
      <div className="absolute top-0 left-0 w-full h-px bg-linear-to-r from-transparent via-primary/40 to-transparent" />
      <div className="absolute top-0 left-1/4 w-64 h-64 bg-[#5B8FE8]/8 rounded-full blur-[80px] -z-10" />
      <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-primary/8 rounded-full blur-[80px] -z-10" />

      <div className="container px-4 md:px-6 mx-auto relative z-10">
        {/* Konami code hint */}
        <div className="flex items-center justify-center gap-0.5 mb-5 select-none">
          {KONAMI_DISPLAY.map((char, i) => (
            <span
              key={i}
              className={cn(
                "text-[10px] font-bold w-5 h-5 flex items-center justify-center rounded-md transition-all duration-200",
                i < step
                  ? "text-primary bg-primary/15 border border-primary/30 shadow-sm shadow-primary/20"
                  : "text-muted-foreground/20 border border-transparent"
              )}
            >
              {char}
            </span>
          ))}
        </div>

        <div className="flex flex-col md:flex-row items-center justify-between gap-6 md:gap-0">
          {/* Copyright */}
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Copyright className="w-4 h-4" />
            <span className="font-medium">{currentYear} Pham Hoang Phuc</span>
            <span className="hidden sm:inline text-border">|</span>
            <span className="hidden sm:inline">{t("rights")}</span>
          </div>

          {/* Built-with badge */}
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-card border border-primary/20 shadow-sm backdrop-blur-sm transition-all hover:border-primary/40">
            <Code2 className="w-3.5 h-3.5 text-primary" />
            <span className="text-xs font-medium text-foreground/70">
              {t("built_with")}
            </span>
          </div>

          {/* Social links */}
          <div className="flex items-center gap-3">
            {HERO_SOCIALS.map((social, index) => (
              <Link
                key={index}
                href={social.href}
                target="_blank"
                aria-label={social.label}
                className="p-2 rounded-full hover:bg-primary/10 text-muted-foreground hover:text-primary transition-all duration-300 hover:scale-110"
              >
                <social.icon className="w-5 h-5" />
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};
