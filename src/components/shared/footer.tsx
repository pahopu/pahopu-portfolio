"use client";

import { AlbumStar, StarDeco } from "@/components/shared/album-star";
import { HERO_SOCIALS } from "@/constants";
import { useKonamiCode } from "@/hooks/use-konami-code";
import { cn } from "@/lib/utils";
import { ArrowDown, ArrowLeft, ArrowRight, ArrowUp, Code2, Copyright, type LucideIcon } from "lucide-react";
import Link from "next/link";
import { useTranslations } from "next-intl";

type KonamiKey = { icon: LucideIcon } | { char: string };
const KONAMI_DISPLAY: KonamiKey[] = [
  { icon: ArrowUp }, { icon: ArrowUp },
  { icon: ArrowDown }, { icon: ArrowDown },
  { icon: ArrowLeft }, { icon: ArrowRight },
  { icon: ArrowLeft }, { icon: ArrowRight },
  { char: "B" }, { char: "A" },
];

export const Footer = () => {
  const t = useTranslations("footer");
  const currentYear = new Date().getFullYear();
  const { step } = useKonamiCode();

  return (
    <footer className="w-full pt-10 pb-8 relative overflow-hidden bg-[#F0F6FF]/80 dark:bg-[#0A1232]/60">
      {/* Top edge gradient */}
      <div className="absolute top-0 left-0 w-full h-px bg-linear-to-r from-transparent via-primary/40 to-transparent" />

      {/* Background blobs */}
      <div className="absolute top-0 left-1/4 w-64 h-64 bg-[#5B8FE8]/8 rounded-full blur-[80px] -z-10" />
      <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-primary/8 rounded-full blur-[80px] -z-10" />

      {/* Album stars — left cluster */}
      <AlbumStar size={32} className="top-2 left-[3%]"  style={{ animationDuration: "5.5s" }} />
      <AlbumStar size={18} className="bottom-3 left-[7%]" style={{ animationDuration: "4.2s", animationDelay: "1.0s" }} />
      <AlbumStar dim size={16} className="top-5 left-[13%]" style={{ animationDuration: "6.0s", animationDelay: "0.5s" }} />

      {/* Album stars — right cluster */}
      <AlbumStar size={28} className="top-2 right-[3%]"  style={{ animationDuration: "4.8s", animationDelay: "0.8s" }} />
      <AlbumStar size={20} className="bottom-3 right-[7%]" style={{ animationDuration: "5.2s", animationDelay: "1.6s" }} />
      <AlbumStar dim size={14} className="top-4 right-[13%]" style={{ animationDuration: "3.9s", animationDelay: "2.0s" }} />

      <div className="container px-4 md:px-6 mx-auto relative z-10">

        {/* ── Branding mark ── */}
        <div className="flex flex-col items-center gap-2 mb-6">
          <div className="flex items-center gap-2.5">
            <StarDeco className="w-4 h-4 text-[#FFE566] dark:text-[#FFF0B0] opacity-90" />
            <span
              className="font-bold text-xl tracking-tight text-foreground"
              style={{ fontFamily: "var(--font-fredoka)" }}
            >
              pahopu
            </span>
            <StarDeco className="w-4 h-4 text-[#FFE566] dark:text-[#FFF0B0] opacity-90" />
          </div>
          <p className="text-xs text-muted-foreground/60">{t("tagline")}</p>
        </div>

        {/* ── Konami code hint ── */}
        <div className="flex items-center justify-center gap-0.5 mb-6 select-none">
          {KONAMI_DISPLAY.map((key, i) => (
            <span
              key={i}
              className={cn(
                "w-6 h-6 flex items-center justify-center rounded-md border transition-all duration-200",
                i < step
                  ? "text-primary bg-primary/15 border-primary/30 shadow-sm shadow-primary/20"
                  : "text-muted-foreground/20 border-muted-foreground/10"
              )}
            >
              {"icon" in key
                ? <key.icon className="w-3 h-3" />
                : <span className="text-[10px] font-bold">{key.char}</span>
              }
            </span>
          ))}
        </div>

        {/* ── Bottom row ── */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 md:gap-0 pt-4 border-t border-border/40">
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
