"use client";

import { Download, Menu } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import { usePathname, useRouter } from "@/i18n/navigation";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

import { ModeToggle } from "@/components/shared/mode-toggle";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { NAV_LINKS } from "@/constants";
import { cn } from "@/lib/utils";

const TRAIL_COLORS = ["#C8E645", "#FFE566", "#5B8FE8", "#F5B8CC", "#FF8C42"];

// CONGBDAY star badge for the logo
const LogoStar = () => (
  <div className="w-7 h-7 rounded-full bg-[#5B8FE8] flex items-center justify-center shrink-0 shadow-sm">
    <svg viewBox="0 0 24 24" width="14" height="14" aria-hidden>
      <path
        d="M12 2L14.39 8.26L21 9.27L16.5 13.97L17.78 21L12 17.77L6.22 21L7.5 13.97L3 9.27L9.61 8.26Z"
        fill="#C8E645" stroke="#C8E645" strokeWidth="1.5" strokeLinejoin="round"
      />
    </svg>
  </div>
);

export const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [trailEnabled, setTrailEnabled] = useState(false);

  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const t = useTranslations("nav");

  // Logo click counter for cursor trail easter egg
  const logoClickCount = useRef(0);
  const logoClickTimer = useRef<ReturnType<typeof setTimeout>>(undefined);

  const switchLocale = () => {
    const next = locale === "en" ? "vi" : "en";
    router.replace(pathname, { locale: next });
  };

  const handleLogoClick = (e: React.MouseEvent) => {
    e.preventDefault();
    logoClickCount.current += 1;
    clearTimeout(logoClickTimer.current);
    logoClickTimer.current = setTimeout(() => { logoClickCount.current = 0; }, 1800);
    if (logoClickCount.current >= 5) {
      logoClickCount.current = 0;
      setTrailEnabled((prev) => !prev);
    }
  };

  /* Cursor star trail effect */
  useEffect(() => {
    if (!trailEnabled) return;
    let lastTime = 0;

    const handler = (e: MouseEvent) => {
      const now = Date.now();
      if (now - lastTime < 55) return;
      lastTime = now;

      const star = document.createElement("span");
      star.textContent = "★";
      const color = TRAIL_COLORS[Math.floor(Math.random() * TRAIL_COLORS.length)];
      const size = 10 + Math.random() * 12;
      star.style.cssText = `
        position:fixed;left:${e.clientX}px;top:${e.clientY}px;
        pointer-events:none;z-index:9997;font-size:${size}px;color:${color};
        transform:translate(-50%,-50%);
        animation:cursor-star 0.75s ease-out forwards;
        user-select:none;line-height:1;
      `;
      document.body.appendChild(star);
      setTimeout(() => star.remove(), 750);
    };

    window.addEventListener("mousemove", handler);
    return () => window.removeEventListener("mousemove", handler);
  }, [trailEnabled]);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const logoEl = (
    <span className="flex items-center gap-2 transition-transform hover:scale-105">
      <LogoStar />
      <span className={cn(
        "font-bold text-xl tracking-tight font-display",
        trailEnabled ? "text-primary" : "text-foreground"
      )}>
        pahopu
      </span>
    </span>
  );

  return (
    <header
      className={cn(
        "fixed top-0 w-full z-50 transition-all duration-300 border-b bg-background/80 backdrop-blur-md",
        "pr-(--removed-body-scroll-bar-size)",
        isScrolled ? "border-[#5B8FE8]/30 shadow-sm shadow-[#5B8FE8]/10" : "border-transparent shadow-none"
      )}
    >
      {/* Cursor trail active indicator */}
      {trailEnabled && (
        <div className="absolute top-0 left-0 right-0 h-0.5 bg-linear-to-r from-transparent via-primary to-transparent opacity-60" />
      )}

      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        {/* Logo — click 5× to toggle cursor trail */}
        <button onClick={handleLogoClick} className="focus:outline-none" aria-label="Home">
          {logoEl}
        </button>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-medium hover:text-primary transition-colors"
            >
              {t(link.key as "about" | "skills" | "projects" | "experience" | "contact")}
            </Link>
          ))}

          <div className="flex items-center gap-4">
            <button
              onClick={switchLocale}
              className="text-xs font-bold px-2.5 py-1 rounded-full border border-border hover:bg-primary/10 hover:border-primary/30 hover:text-primary transition-all"
              aria-label="Switch language"
            >
              {locale === "en" ? "VI" : "EN"}
            </button>
            <ModeToggle />
            <a href="/files/resume.pdf" target="_blank" rel="noopener noreferrer">
              <Button size="sm" variant="default" className="whitespace-nowrap">
                {t("download_cv")} <Download className="h-4 w-4 ml-2" />
              </Button>
            </a>
          </div>
        </nav>

        {/* Mobile toggle */}
        <div className="flex items-center gap-2 md:hidden">
          <ModeToggle />
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" aria-label="Open menu">
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>

            <SheetContent side="right" className="w-[300px] sm:w-[400px] flex flex-col p-0 gap-0">
              <SheetHeader className="text-left border-b px-6 py-4">
                <SheetTitle>
                  <span className="flex items-center gap-2">
                    <LogoStar />
                    <span className="font-bold text-xl font-display">pahopu</span>
                  </span>
                </SheetTitle>
                <SheetDescription className="sr-only">Mobile Navigation Menu</SheetDescription>
              </SheetHeader>

              <div className="flex flex-col flex-1 overflow-y-auto">
                {NAV_LINKS.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setIsOpen(false)}
                    className="block py-4 px-6 text-lg font-medium text-foreground/80 hover:text-primary hover:bg-accent/50 hover:pl-8 transition-all border-b border-border/40 last:border-0"
                  >
                    {t(link.key as "about" | "skills" | "projects" | "experience" | "contact")}
                  </Link>
                ))}
              </div>

              <div className="mt-auto p-6 border-t flex flex-col gap-3">
                <button
                  onClick={switchLocale}
                  className="w-full text-sm font-bold py-2.5 rounded-full border border-border hover:bg-primary/10 hover:border-primary/30 hover:text-primary transition-all"
                  aria-label="Switch language"
                >
                  {locale === "en" ? "Switch to Vietnamese (VI)" : "Switch to English (EN)"}
                </button>
                <a href="/files/resume.pdf" target="_blank" rel="noopener noreferrer" className="w-full block">
                  <Button className="w-full h-12 text-base shadow-md" size="lg">
                    {t("download_cv")} <Download className="h-5 w-5 ml-2" />
                  </Button>
                </a>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
};
