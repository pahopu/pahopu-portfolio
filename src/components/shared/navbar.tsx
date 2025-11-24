"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { ModeToggle } from "@/components/shared/mode-toggle";
import { NAV_LINKS } from "@/constants";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button"; // Giả sử đã có shadcn button

export const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Xử lý hiệu ứng khi cuộn trang
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed top-0 w-full z-50 transition-all duration-300 border-b border-transparent",
        isScrolled
          ? "bg-background/80 backdrop-blur-md border-border shadow-sm"
          : "bg-transparent"
      )}
    >
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        {/* LOGO */}
        <Link href="/" className="text-xl font-bold tracking-tighter">
          NamVo<span className="text-primary">.dev</span>
        </Link>

        {/* DESKTOP NAV */}
        <nav className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-medium hover:text-primary transition-colors"
            >
              {link.label}
            </Link>
          ))}
          <ModeToggle />
          <Button size="sm">Download CV</Button>
        </nav>

        {/* MOBILE MENU TOGGLE */}
        <div className="flex items-center gap-4 md:hidden">
          <ModeToggle />
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="p-2"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* MOBILE NAV DROPDOWN */}
      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-16 left-0 w-full bg-background border-b shadow-lg p-4 flex flex-col gap-4 animate-in slide-in-from-top-5">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-medium p-2 hover:bg-accent rounded-md"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              {link.label}
            </Link>
          ))}
          <Button className="w-full" size="sm">
            Download CV
          </Button>
        </div>
      )}
    </header>
  );
};
