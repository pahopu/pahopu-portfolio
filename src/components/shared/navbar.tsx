"use client";

import { Download, Menu } from "lucide-react";
import { StarDeco } from "@/components/shared/album-star";
import { useLocale, useTranslations } from "next-intl";
import Link from "next/link";
import { useEffect, useRef, useState, useSyncExternalStore } from "react";
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
  const [activeSection, setActiveSection] = useState<string>("");

  const locale = useLocale();

  const t = useTranslations("nav");
  const { resolvedTheme } = useTheme();

  const mounted = useSyncExternalStore(() => () => {}, () => true, () => false);
  const isDark = mounted && resolvedTheme === "dark";

  const switchLocale = () => {
    const next = locale === "en" ? "vi" : "en";
    window.location.href = `/${next}`;
  };

  const handleLogoClick = async (e: React.MouseEvent) => {
    e.preventDefault();
    const clickX = e.clientX;
    const clickY = e.clientY;

    // iOS 13+ requires explicit permission requests from a user gesture (for shake easter egg)
    type PermissionableEvent = { requestPermission?: () => Promise<string> };
    if (typeof DeviceMotionEvent !== "undefined" &&
        typeof (DeviceMotionEvent as unknown as PermissionableEvent).requestPermission === "function") {
      try { await (DeviceMotionEvent as unknown as Required<PermissionableEvent>).requestPermission(); } catch { /* denied */ }
    }
    if (typeof DeviceOrientationEvent !== "undefined" &&
        typeof (DeviceOrientationEvent as unknown as PermissionableEvent).requestPermission === "function") {
      try { await (DeviceOrientationEvent as unknown as Required<PermissionableEvent>).requestPermission(); } catch { /* denied */ }
    }

    for (let i = 0; i < 10; i++) {
      setTimeout(() => {
        const star = document.createElement("span");
        star.textContent = "★";
        const color = TRAIL_COLORS[Math.floor(Math.random() * TRAIL_COLORS.length)];
        const size = 10 + Math.random() * 14;
        const x = clickX + (Math.random() - 0.5) * 60;
        const y = clickY + (Math.random() - 0.5) * 30;
        star.style.cssText = `
          position:fixed;left:${x}px;top:${y}px;
          pointer-events:none;z-index:9997;font-size:${size}px;color:${color};
          transform:translate(-50%,-50%);
          animation:cursor-star 0.75s ease-out forwards;
          user-select:none;line-height:1;
        `;
        document.body.appendChild(star);
        setTimeout(() => star.remove(), 750);
      }, i * 25);
    }

    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Active section tracking via scroll position
  useEffect(() => {
    const links = NAV_LINKS
      .map((link) => ({ href: link.href, el: document.getElementById(link.href.slice(1)) }))
      .filter((s): s is { href: string; el: HTMLElement } => s.el !== null);

    const update = () => {
      const threshold = window.innerHeight * 0.35;
      let active = links[0]?.href ?? "";
      for (const { href, el } of links) {
        if (el.getBoundingClientRect().top <= threshold) active = href;
      }
      setActiveSection(active);
    };

    update();
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, []);

  /* Cursor / touch star trail — always active */
  useEffect(() => {
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
  }, []);

  /* Click anywhere → ring sparkle */
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      const count = 5;
      for (let i = 0; i < count; i++) {
        setTimeout(() => {
          const star = document.createElement("span");
          star.textContent = "★";
          const color = TRAIL_COLORS[Math.floor(Math.random() * TRAIL_COLORS.length)];
          const size = 8 + Math.random() * 8;
          const angle = (i / count) * Math.PI * 2 + Math.random() * 0.5;
          const radius = 14 + Math.random() * 16;
          const x = e.clientX + Math.cos(angle) * radius;
          const y = e.clientY + Math.sin(angle) * radius;
          star.style.cssText = `
            position:fixed;left:${x}px;top:${y}px;
            pointer-events:none;z-index:9997;font-size:${size}px;color:${color};
            transform:translate(-50%,-50%);
            animation:cursor-star 0.55s ease-out forwards;
            user-select:none;line-height:1;
          `;
          document.body.appendChild(star);
          setTimeout(() => star.remove(), 600);
        }, i * 35);
      }
    };
    window.addEventListener("click", handleClick);
    return () => window.removeEventListener("click", handleClick);
  }, []);

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
        className="font-bold text-xl tracking-tight text-foreground"
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
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        {/* Logo — click to scroll to top + star burst */}
        <div className="relative">
          <button onClick={handleLogoClick} className="select-none focus:outline-none cursor-pointer" aria-label="Home">
            {logoEl}
          </button>
        </div>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "select-none text-sm font-medium transition-colors relative group",
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
              className="select-none text-xs font-bold px-2.5 py-1 rounded-full border border-border hover:bg-primary/10 hover:border-primary/30 hover:text-primary transition-all cursor-pointer"
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
                      "select-none block py-4 px-6 text-lg font-medium hover:text-primary hover:bg-accent/50 hover:pl-8 transition-all border-b border-border/40 last:border-0",
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
                  className="select-none w-full text-sm font-bold py-2.5 rounded-full border border-border hover:bg-primary/10 hover:border-primary/30 hover:text-primary transition-all cursor-pointer"
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
