"use client";

import { AnimatePresence, motion } from "framer-motion"; // Import motion
import { Menu, X } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

import { ModeToggle } from "@/components/shared/mode-toggle";
import { Button } from "@/components/ui/button";
import { NAV_LINKS } from "@/constants";
import { cn } from "@/lib/utils";

export const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);
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
        <Link
          href="/"
          className="text-xl font-bold tracking-tight flex items-center transition-opacity hover:opacity-80"
        >
          <span className="text-primary mr-0.5">&lt;</span>
          <span className="text-foreground">pahopu</span>
          <span className="text-primary ml-0.5 mr-0.5">/</span>
          <span className="text-primary">&gt;</span>
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

          <div className="flex items-center gap-4">
            <ModeToggle />
            <AnimatePresence>
              {isScrolled && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8, width: 0 }}
                  animate={{ opacity: 1, scale: 1, width: "auto" }}
                  exit={{ opacity: 0, scale: 0.8, width: 0 }}
                  transition={{ duration: 0.2 }}
                  className="overflow-hidden"
                >
                  <a
                    href="/resume.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Button
                      size="sm"
                      variant="default"
                      className="whitespace-nowrap"
                    >
                      Download CV
                    </Button>
                  </a>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </nav>

        {/* MOBILE MENU TOGGLE */}
        <div className="flex items-center gap-2 md:hidden">
          <ModeToggle />
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
          >
            <AnimatePresence mode="wait" initial={false}>
              {isMobileMenuOpen ? (
                <motion.div
                  key="close"
                  initial={{ scale: 0.5, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.5, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <X className="h-6 w-6" />
                </motion.div>
              ) : (
                <motion.div
                  key="menu"
                  initial={{ scale: 0.5, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.5, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <Menu className="h-6 w-6" />
                </motion.div>
              )}
            </AnimatePresence>
          </Button>
        </div>
      </div>

      {/* MOBILE NAV DROPDOWN */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2, ease: "easeInOut" }}
            className="md:hidden absolute top-16 left-0 w-full bg-background border-b shadow-lg p-4 flex flex-col gap-4"
          >
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm font-medium p-2 hover:bg-accent rounded-md transition-colors block"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <a
              href="/resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full"
            >
              <Button className="w-full" size="sm">
                Download CV
              </Button>
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};
