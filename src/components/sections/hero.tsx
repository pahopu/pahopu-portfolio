"use client";

import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { motion, Variants } from "framer-motion";
import {
  ArrowRight,
  Briefcase,
  Cpu,
  Download,
  Github,
  Linkedin,
  Mail,
} from "lucide-react";
import Link from "next/link";

/* --- CONFIG --- */
const ANIMATION_VARIANTS: Record<string, Variants> = {
  container: {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.3 },
    },
  },
  item: {
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 50 } },
  },
};

const SOCIALS = [
  { icon: Github, href: "https://github.com/pahopu", label: "Github" },
  {
    icon: Linkedin,
    href: "https://www.linkedin.com/in/pahopu",
    label: "LinkedIn",
  },
  { icon: Mail, href: "mailto:hoangphucpham.work@gmail.com", label: "Email" },
];

export const Hero = () => {
  return (
    <section
      id="home"
      className="relative w-full min-h-[calc(100vh-4rem)] flex items-center justify-center overflow-hidden"
    >
      {/* --- BACKGROUND --- */}
      <div
        className="absolute inset-0 -z-10 h-full w-full bg-background 
      bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] 
      bg-size-[40px_40px]"
      />
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_500px_at_50%_200px,#3b82f626,transparent)]" />

      {/* --- CONTENT --- */}
      <div className="container px-4 md:px-6 flex flex-col items-center text-center z-10">
        <motion.div
          variants={ANIMATION_VARIANTS.container}
          initial="hidden"
          animate="show"
          className="space-y-8 max-w-4xl"
        >
          {/* --- BADGE --- */}
          <motion.div
            variants={ANIMATION_VARIANTS.item}
            className="flex justify-center"
          >
            <Badge
              variant="outline"
              className="gap-2 py-1.5 px-4 text-sm font-medium bg-background/50 backdrop-blur-md border-primary/20 
              shadow-[0_0_15px_-3px_rgba(59,130,246,0.2)]"
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500" />
              </span>
              <span className="text-foreground/80">
                Ready for new challenges
              </span>
            </Badge>
          </motion.div>

          {/* --- HEADLINE --- */}
          <motion.h1
            variants={ANIMATION_VARIANTS.item}
            className="text-4xl font-extrabold tracking-tight sm:text-6xl md:text-7xl drop-shadow-sm"
          >
            Hi, I&apos;m <span className="text-foreground">pahopu</span> 👋
            <br />
            <span
              className="block mt-2 bg-linear-to-r from-emerald-500 via-blue-600 to-emerald-500 
            bg-clip-text text-transparent bg-size-[200%_auto] animate-gradient"
            >
              Front-End Developer
            </span>
          </motion.h1>

          {/* --- SUBTITLE --- */}
          <motion.div
            variants={ANIMATION_VARIANTS.item}
            className="mx-auto max-w-[700px] text-muted-foreground text-lg md:text-xl leading-relaxed flex flex-col gap-4"
          >
            <div className="flex items-center justify-center gap-2 text-primary font-medium">
              <Cpu className="h-5 w-5" />
              <span>Solid Computer Science Foundation</span>
            </div>

            <p>
              I build scalable, high-performance web applications. While I
              specialize in the{" "}
              <strong className="text-foreground font-semibold">
                React ecosystem
              </strong>
              , I remain{" "}
              <strong className="text-foreground font-semibold">
                flexible
              </strong>{" "}
              to adapt to any technology needed to solve the problem.
            </p>
          </motion.div>

          {/* --- CTA BUTTONS --- */}
          <motion.div
            variants={ANIMATION_VARIANTS.item}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4"
          >
            <Link
              href="#contact"
              className={cn(
                buttonVariants({ size: "lg" }),
                "group h-12 px-8 text-base font-semibold shadow-[0_0_20px_-5px_rgba(59,130,246,0.5)] hover:shadow-[0_0_25px_-5px_rgba(59,130,246,0.7)] transition-all duration-300"
              )}
            >
              Contact Me{" "}
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>

            <Link
              href="#projects"
              className={cn(
                buttonVariants({ variant: "outline", size: "lg" }),
                "hidden md:inline-flex h-12 px-8 text-base bg-background/50 backdrop-blur-sm border-foreground/10 hover:bg-accent/50"
              )}
            >
              View Projects <Briefcase className="h-4 w-4" />
            </Link>

            <a
              href="/resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className={cn(
                buttonVariants({ variant: "outline", size: "lg" }),
                "md:hidden h-12 px-8 text-base bg-background/50 backdrop-blur-sm border-foreground/10 hover:bg-accent/50"
              )}
            >
              Download CV <Download className="h-4 w-4" />
            </a>
          </motion.div>

          {/* --- SOCIAL ICONS --- */}
          <motion.div
            variants={ANIMATION_VARIANTS.item}
            className="flex items-center justify-center gap-4 pt-6"
          >
            {SOCIALS.map((social, index) => (
              <Link
                key={index}
                href={social.href}
                target="_blank"
                aria-label={social.label}
                className="p-3 rounded-full bg-background/50 border border-foreground/10 hover:border-primary/50 hover:bg-primary/10 hover:text-primary transition-all duration-300 backdrop-blur-sm group"
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
