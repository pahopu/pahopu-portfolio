"use client";

import { Download, Menu } from "lucide-react";
import { StarDeco } from "@/components/shared/album-star";
import { useLocale, useTranslations } from "next-intl";
import Link from "next/link";
import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useTheme } from "next-themes";

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

// Logo badge: always shows a star, colors transition smoothly with the theme
const LogoBadge = ({ isDark }: { isDark: boolean }) => (
  <div
    className="w-7 h-7 rounded-full flex items-center justify-center shrink-0 shadow-sm"
    style={{
      backgroundColor: isDark ? "#1B2E6E" : "#5B8FE8",
      color: isDark ? "#FFE566" : "#C8E645",
      transition: "background-color 0.5s, color 0.5s",
    }}
  >
    <svg viewBox="0 0 24 24" width="14" height="14" aria-hidden>
      <path
        d="M12 2L14.39 8.26L21 9.27L16.5 13.97L17.78 21L12 17.77L6.22 21L7.5 13.97L3 9.27L9.61 8.26Z"
        fill="currentColor" stroke="currentColor" strokeWidth="3" strokeLinejoin="round"
      />
    </svg>
  </div>
);

export const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [trailEnabled, setTrailEnabled] = useState(false);
  const [activeSection, setActiveSection] = useState<string>("");
  const [logoHint, setLogoHint] = useState(0);

  const locale = useLocale();

  const t = useTranslations("nav");
  const { resolvedTheme } = useTheme();

  const mounted = useSyncExternalStore(() => () => {}, () => true, () => false);
  const isDark = mounted && resolvedTheme === "dark";

  const logoClickCount = useRef(0);
  const logoClickTimer = useRef<ReturnType<typeof setTimeout>>(undefined);
  const logoHintTimer = useRef<ReturnType<typeof setTimeout>>(undefined);

  const switchLocale = () => {
    const next = locale === "en" ? "vi" : "en";
    window.location.href = `/${next}`;
  };

  const handleLogoClick = async (e: React.MouseEvent) => {
    e.preventDefault();
    logoClickCount.current += 1;
    clearTimeout(logoClickTimer.current);
    clearTimeout(logoHintTimer.current);
    logoClickTimer.current = setTimeout(() => { logoClickCount.current = 0; setLogoHint(0); }, 1800);
    if (logoClickCount.current >= 5) {
      logoClickCount.current = 0;
      setLogoHint(0);
      // iOS 13+ requires explicit permission requests from a user gesture
      type PermissionableEvent = { requestPermission?: () => Promise<string> };
      if (typeof DeviceMotionEvent !== "undefined" &&
          typeof (DeviceMotionEvent as unknown as PermissionableEvent).requestPermission === "function") {
        try { await (DeviceMotionEvent as unknown as Required<PermissionableEvent>).requestPermission(); } catch { /* denied */ }
      }
      if (typeof DeviceOrientationEvent !== "undefined" &&
          typeof (DeviceOrientationEvent as unknown as PermissionableEvent).requestPermission === "function") {
        try { await (DeviceOrientationEvent as unknown as Required<PermissionableEvent>).requestPermission(); } catch { /* denied */ }
      }
      setTrailEnabled((prev: boolean) => !prev);
    } else {
      setLogoHint(logoClickCount.current);
      logoHintTimer.current = setTimeout(() => setLogoHint(0), 900);
    }
  };

  // Active section tracking via IntersectionObserver
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (visible.length > 0) setActiveSection(`#${visible[0].target.id}`);
      },
      { threshold: 0.3, rootMargin: "-10% 0px -60% 0px" }
    );

    NAV_LINKS.forEach((link) => {
      const el = document.getElementById(link.href.slice(1));
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  /* Cursor / touch star trail */
  useEffect(() => {
    if (!trailEnabled) return;
    let lastTime = 0;

    const spawnStar = (x: number, y: number) => {
      const now = Date.now();
      if (now - lastTime < 55) return;
      lastTime = now;
      const star = document.createElement("span");
      star.textContent = "★";
      const color = TRAIL_COLORS[Math.floor(Math.random() * TRAIL_COLORS.length)];
      const size = 10 + Math.random() * 12;
      star.style.cssText = `
        position:fixed;left:${x}px;top:${y}px;
        pointer-events:none;z-index:9997;font-size:${size}px;color:${color};
        transform:translate(-50%,-50%);
        animation:cursor-star 0.75s ease-out forwards;
        user-select:none;line-height:1;
      `;
      document.body.appendChild(star);
      setTimeout(() => star.remove(), 750);
    };

    const mouseHandler = (e: MouseEvent) => spawnStar(e.clientX, e.clientY);
    const touchHandler = (e: TouchEvent) => {
      Array.from(e.touches).forEach((t) => spawnStar(t.clientX, t.clientY));
    };

    window.addEventListener("mousemove", mouseHandler);
    window.addEventListener("touchmove", touchHandler, { passive: true });
    return () => {
      window.removeEventListener("mousemove", mouseHandler);
      window.removeEventListener("touchmove", touchHandler);
    };
  }, [trailEnabled]);

  /* Shake-to-burst easter egg (mobile) */
  useEffect(() => {
    let prev = { x: 0, y: 0, z: 0 };
    let lastBurst = 0;

    const handleMotion = (e: DeviceMotionEvent) => {
      const acc = e.accelerationIncludingGravity;
      if (!acc || acc.x == null) return;
      const dx = Math.abs((acc.x ?? 0) - prev.x);
      const dy = Math.abs((acc.y ?? 0) - prev.y);
      const dz = Math.abs((acc.z ?? 0) - prev.z);
      prev = { x: acc.x ?? 0, y: acc.y ?? 0, z: acc.z ?? 0 };

      const now = Date.now();
      if (dx + dy + dz > 30 && now - lastBurst > 1800) {
        lastBurst = now;
        const count = 22;
        for (let i = 0; i < count; i++) {
          setTimeout(() => {
            const star = document.createElement("span");
            star.textContent = "★";
            const color = TRAIL_COLORS[Math.floor(Math.random() * TRAIL_COLORS.length)];
            const size = 14 + Math.random() * 18;
            const x = 10 + Math.random() * (window.innerWidth - 20);
            const y = 10 + Math.random() * (window.innerHeight - 20);
            star.style.cssText = `
              position:fixed;left:${x}px;top:${y}px;
              pointer-events:none;z-index:9998;font-size:${size}px;color:${color};
              transform:translate(-50%,-50%);
              animation:cursor-star 1s ease-out forwards;
              user-select:none;line-height:1;
            `;
            document.body.appendChild(star);
            setTimeout(() => star.remove(), 1000);
          }, Math.random() * 350);
        }
      }
    };

    window.addEventListener("devicemotion", handleMotion);
    return () => window.removeEventListener("devicemotion", handleMotion);
  }, []);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const logoEl = (
    <span className="flex items-center gap-2 transition-transform hover:scale-105">
      <LogoBadge isDark={isDark} />
      <span
        className={cn("font-bold text-xl tracking-tight", trailEnabled ? "text-primary" : "text-foreground")}
        style={{ fontFamily: "var(--font-fredoka)" }}
      >
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
        <div className="relative">
          <button onClick={handleLogoClick} className="focus:outline-none cursor-pointer" aria-label="Home">
            {logoEl}
          </button>
          <AnimatePresence>
            {logoHint > 0 && (
              <motion.span
                key={logoHint}
                initial={{ opacity: 0, y: 2 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.15 }}
                className="absolute -bottom-4 left-1/2 -translate-x-1/2 text-[9px] font-bold text-primary whitespace-nowrap pointer-events-none"
              >
                {"★".repeat(logoHint)}{"☆".repeat(5 - logoHint)}
              </motion.span>
            )}
          </AnimatePresence>
        </div>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "text-sm font-medium transition-colors relative group",
                "after:absolute after:-bottom-0.5 after:left-0 after:h-0.5 after:rounded-full after:bg-primary",
                "after:transition-transform after:duration-300 after:origin-left",
                activeSection === link.href
                  ? "text-primary after:scale-x-100"
                  : "text-foreground/70 hover:text-primary after:scale-x-0 group-hover:after:scale-x-100"
              )}
            >
              {t(link.key as "about" | "skills" | "projects" | "experience" | "contact")}
            </Link>
          ))}

          <div className="flex items-center gap-4">
            <button
              onClick={switchLocale}
              className="text-xs font-bold px-2.5 py-1 rounded-full border border-border hover:bg-primary/10 hover:border-primary/30 hover:text-primary transition-all cursor-pointer"
              aria-label="Switch language"
            >
              {locale === "en" ? "VI" : "EN"}
            </button>
            <ModeToggle />
            <a href="/files/resume.pdf" target="_blank" rel="noopener noreferrer">
              <Button size="sm" className="whitespace-nowrap rounded-full bg-[#C8E645] text-[#1B2E6E] hover:bg-[#d4ed4f] border-0 font-bold shadow-sm">
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
              <SheetHeader className="text-left border-b px-6 py-4 relative overflow-hidden bg-[#5B8FE8]/5 dark:bg-[#1B2E6E]/20">
                <StarDeco className="absolute -top-4 -right-4 w-24 h-24 text-[#FFE566]/15 dark:text-[#FFF0B0]/10 rotate-12" />
                <StarDeco className="absolute -bottom-5 right-14 w-16 h-16 text-[#FFE566]/10 dark:text-[#FFF0B0]/8 -rotate-6" />
                <SheetTitle>
                  <span className="flex items-center gap-2">
                    <LogoBadge isDark={isDark} />
                    <span className="font-bold text-xl" style={{ fontFamily: "var(--font-fredoka)" }}>pahopu</span>
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
                    className={cn(
                      "block py-4 px-6 text-lg font-medium hover:text-primary hover:bg-accent/50 hover:pl-8 transition-all border-b border-border/40 last:border-0",
                      activeSection === link.href ? "text-primary" : "text-foreground/80"
                    )}
                  >
                    {t(link.key as "about" | "skills" | "projects" | "experience" | "contact")}
                  </Link>
                ))}
              </div>

              <div className="mt-auto p-6 border-t flex flex-col gap-3">
                <button
                  onClick={switchLocale}
                  className="w-full text-sm font-bold py-2.5 rounded-full border border-border hover:bg-primary/10 hover:border-primary/30 hover:text-primary transition-all cursor-pointer"
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
