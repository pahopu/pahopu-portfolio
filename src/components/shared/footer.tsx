"use client";

import { HERO_SOCIALS } from "@/constants";
import { Code2, Copyright } from "lucide-react";
import Link from "next/link";

export const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full py-8 relative overflow-hidden bg-slate-50 dark:bg-slate-950/50">
      {/* --- SECTION: BACKGROUND EFFECTS --- */}
      <div className="absolute top-0 left-0 w-full h-px bg-linear-to-r from-transparent via-cyan-500/50 to-transparent" />
      <div className="absolute top-0 left-1/4 w-64 h-64 bg-blue-500/10 rounded-full blur-[80px] -z-10" />
      <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-cyan-500/10 rounded-full blur-[80px] -z-10" />

      <div className="container px-4 md:px-6 mx-auto relative z-10">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 md:gap-0">
          {/* --- SECTION: COPYRIGHT --- */}
          <div className="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400">
            <Copyright className="w-4 h-4" />
            <span className="font-medium">{currentYear} Pham Hoang Phuc</span>
            <span className="hidden sm:inline text-slate-300 dark:text-slate-700">
              |
            </span>
            <span className="hidden sm:inline">All rights reserved.</span>
          </div>

          {/* --- SECTION: TECH STACK BADGE --- */}
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 shadow-sm backdrop-blur-sm transition-all hover:border-cyan-500/30">
            <Code2 className="w-3.5 h-3.5 text-cyan-500" />
            <span className="text-xs font-medium text-slate-600 dark:text-slate-300">
              Built with{" "}
              <span className="font-bold bg-linear-to-r from-cyan-500 to-blue-500 bg-clip-text text-transparent">
                Next.js
              </span>{" "}
              &{" "}
              <span className="font-bold bg-linear-to-r from-blue-500 to-violet-500 bg-clip-text text-transparent">
                Tailwind
              </span>
            </span>
          </div>

          {/* --- SECTION: SOCIAL LINKS --- */}
          <div className="flex items-center gap-3">
            {HERO_SOCIALS.map((social, index) => (
              <Link
                key={index}
                href={social.href}
                target="_blank"
                aria-label={social.label}
                className="p-2 rounded-full hover:bg-white dark:hover:bg-slate-800 text-slate-400 hover:text-cyan-500 transition-all duration-300 hover:scale-110 shadow-xs"
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
