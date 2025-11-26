"use client";

import { Download, Menu } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

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

export const Navbar = () => {
  /* --- STATE --- */
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  /* --- SCROLL EFFECT --- */
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed top-0 w-full z-50 transition-all duration-300 border-b bg-background/80 backdrop-blur-md",
        "pr-(--removed-body-scroll-bar-size)",
        isScrolled
          ? "border-border shadow-sm"
          : "border-transparent shadow-none"
      )}
    >
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        {/* --- LOGO --- */}
        <Link
          href="/"
          className="text-xl font-bold tracking-tight flex items-center transition-opacity hover:opacity-80"
        >
          <span className="text-primary mr-0.5">&lt;</span>
          <span className="text-foreground">pahopu</span>
          <span className="text-primary ml-0.5 mr-0.5">/</span>
          <span className="text-primary">&gt;</span>
        </Link>

        {/* --- DESKTOP NAV --- */}
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

          <div className="flex items-center gap-4">
            <ModeToggle />
            <a
              href="/files/resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button size="sm" variant="default" className="whitespace-nowrap">
                Download CV <Download className="h-4 w-4 ml-2" />
              </Button>
            </a>
          </div>
        </nav>

        {/* --- MOBILE TOGGLE --- */}
        <div className="flex items-center gap-2 md:hidden">
          <ModeToggle />
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" aria-label="Open menu">
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>

            <SheetContent
              side="right"
              className="w-[300px] sm:w-[400px] flex flex-col p-0 gap-0"
            >
              {/* --- MOBILE HEADER --- */}
              <SheetHeader className="text-left border-b">
                <SheetTitle>
                  <div className="text-2xl font-bold tracking-tight flex items-center">
                    <span className="text-primary mr-0.5">&lt;</span>
                    <span className="text-foreground">pahopu</span>
                    <span className="text-primary ml-0.5 mr-0.5">/</span>
                    <span className="text-primary">&gt;</span>
                  </div>
                </SheetTitle>
                <SheetDescription className="sr-only">
                  Mobile Navigation Menu
                </SheetDescription>
              </SheetHeader>

              {/* --- MOBILE LINKS --- */}
              <div className="flex flex-col flex-1 overflow-y-auto">
                {NAV_LINKS.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setIsOpen(false)}
                    className="block py-4 px-6 text-lg font-medium text-foreground/80 hover:text-primary hover:bg-accent/50 hover:pl-8 transition-all border-b border-border/40 last:border-0"
                  >
                    {link.label}
                  </Link>
                ))}
              </div>

              {/* --- MOBILE FOOTER --- */}
              <div className="mt-auto p-6 border-t">
                <a
                  href="/files/resume.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full block"
                >
                  <Button className="w-full h-12 text-base shadow-md" size="lg">
                    Download CV <Download className="h-5 w-5 ml-2" />
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
