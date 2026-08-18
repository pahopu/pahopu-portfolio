"use client";

import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { HERO_ANIMATION, HERO_SOCIALS } from "@/constants";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { ArrowRight, Briefcase, Cpu, Download } from "lucide-react";
import Link from "next/link";

const Star = ({ size, color, className }: { size: number; color: string; className?: string }) => (
  <span
    className={cn("select-none pointer-events-none absolute font-bold leading-none", className)}
    style={{ fontSize: size, color, lineHeight: 1 }}
    aria-hidden
  >
    ★
  </span>
);

export const Hero = () => {
  return (
    <section
      id="home"
      className="relative w-full min-h-[calc(100vh-4rem)] flex items-center justify-center overflow-hidden"
      style={{ backgroundColor: "#5B8FE8" }}
    >
      {/* Yellow stars — scattered like album art */}
      <Star size={56} color="#FFE566" className="top-[8%] left-[7%] animate-bounce [animation-delay:200ms]" />
      <Star size={80} color="#FFE566" className="top-[12%] right-[9%] animate-bounce [animation-delay:800ms]" />
      <Star size={44} color="#FFE566" className="bottom-[18%] left-[4%] animate-bounce [animation-delay:1500ms]" />
      <Star size={68} color="#FFE566" className="bottom-[12%] right-[6%] animate-bounce [animation-delay:500ms]" />
      <Star size={36} color="#FFE566" className="top-[45%] left-[1%] animate-bounce [animation-delay:1200ms]" />
      <Star size={52} color="#FFE566" className="top-[30%] right-[2%] animate-bounce [animation-delay:300ms]" />
      {/* Baby blue stars (lighter, background layer) */}
      <Star size={28} color="#C5D8F5" className="top-[22%] left-[18%]" />
      <Star size={32} color="#C5D8F5" className="bottom-[30%] right-[18%]" />
      <Star size={20} color="#C5D8F5" className="top-[60%] left-[12%]" />

      {/* Content */}
      <div className="container px-4 md:px-6 flex flex-col items-center text-center z-10">
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
              <span>Ready for new challenges</span>
            </Badge>
          </motion.div>

          {/* Headline */}
          <motion.h1
            variants={HERO_ANIMATION.item}
            className="text-4xl font-bold tracking-tight sm:text-6xl md:text-7xl"
          >
            <span className="text-white drop-shadow-sm">
              Hi, I&apos;m pahopu <span className="animate-wave inline-block">👋</span>
            </span>
            <br />
            <span
              className="block mt-3 animate-gradient-text"
              style={{
                backgroundImage: "linear-gradient(to right, #C8E645, #FFE566, #C5D8F5, #F5B8CC, #C8E645)",
              }}
            >
              Front-End Developer
            </span>
          </motion.h1>

          {/* Subtitle */}
          <motion.div
            variants={HERO_ANIMATION.item}
            className="mx-auto max-w-[700px] text-white/90 text-lg md:text-xl leading-relaxed flex flex-col gap-4"
          >
            <div className="flex items-center justify-center gap-2 text-[#C8E645] font-semibold">
              <Cpu className="h-5 w-5" />
              <span>Solid Computer Science Foundation</span>
            </div>
            <p>
              I build scalable, high-performance web applications. While I specialize in the{" "}
              <strong className="text-white font-semibold">React ecosystem</strong>, I remain{" "}
              <strong className="text-white font-semibold">flexible</strong> to adapt to any technology needed.
            </p>
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
                "group h-12 px-8 text-base font-bold bg-[#C8E645] text-[#1B2E6E] hover:bg-[#d4ed4f] hover:shadow-lg transition-all duration-300 border-0"
              )}
            >
              Contact Me
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>

            <Link
              href="#projects"
              className={cn(
                buttonVariants({ variant: "outline", size: "lg" }),
                "hidden md:inline-flex h-12 px-8 text-base font-semibold bg-white/10 backdrop-blur-sm border-white/40 text-white hover:bg-white/20"
              )}
            >
              View Projects <Briefcase className="ml-2 h-4 w-4" />
            </Link>

            <a
              href="/files/resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className={cn(
                buttonVariants({ variant: "outline", size: "lg" }),
                "md:hidden h-12 px-8 text-base font-semibold bg-white/10 backdrop-blur-sm border-white/40 text-white hover:bg-white/20"
              )}
            >
              Download CV <Download className="ml-2 h-4 w-4" />
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
    </section>
  );
};
