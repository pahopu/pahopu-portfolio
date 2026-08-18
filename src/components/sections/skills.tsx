"use client";

import { SKILLS } from "@/constants";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import * as SimpleIcons from "simple-icons";
import { useTranslations } from "next-intl";

// Cycle through CONGBDAY colors per category
const CATEGORY_COLORS = [
  { bg: "bg-[#5B8FE8]/10 border-[#5B8FE8]/20", icon: "fill-[#5B8FE8]", pill: "bg-[#5B8FE8]/15 text-[#5B8FE8] border-[#5B8FE8]/25" },
  { bg: "bg-primary/10 border-primary/20", icon: "fill-primary", pill: "bg-primary/15 text-[#1B2E6E] dark:text-primary border-primary/25" },
  { bg: "bg-[#FFE566]/20 border-[#FFE566]/30", icon: "fill-[#1B2E6E] dark:fill-[#FFE566]", pill: "bg-[#FFE566]/20 text-[#1B2E6E] dark:text-[#FFE566] border-[#FFE566]/30" },
  { bg: "bg-[#F5B8CC]/20 border-[#F5B8CC]/30", icon: "fill-[#C44D72] dark:fill-[#F5B8CC]", pill: "bg-[#F5B8CC]/20 text-[#C44D72] dark:text-[#F5B8CC] border-[#F5B8CC]/30" },
  { bg: "bg-[#FF8C42]/10 border-[#FF8C42]/20", icon: "fill-[#CC6A1E] dark:fill-[#FF8C42]", pill: "bg-[#FF8C42]/15 text-[#CC6A1E] dark:text-[#FF8C42] border-[#FF8C42]/25" },
];

function getIcon(slug: string): string | null {
  const key = `si${slug.charAt(0).toUpperCase()}${slug.slice(1)}` as keyof typeof SimpleIcons;
  const icon = SimpleIcons[key] as { path: string } | undefined;
  return icon?.path ?? null;
}

export const Skills = () => {
  const t = useTranslations("skills");

  return (
    <section id="skills" className="relative w-full py-20 md:py-28 overflow-hidden">
      {/* Soft background */}
      <div className="absolute inset-0 bg-[#F8FBFF]/60 dark:bg-[#0F1B40]/20" />
      <div className="absolute top-0 right-0 w-[500px] h-[400px] bg-[#C8E645]/8 rounded-full blur-[120px] -z-10" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[300px] bg-[#5B8FE8]/8 rounded-full blur-[100px] -z-10" />

      <div className="container px-4 md:px-6 mx-auto max-w-5xl relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-14"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#5B8FE8]/15 border border-[#5B8FE8]/25 text-[#5B8FE8] font-semibold text-sm mb-4">
            ✦ {t("label")}
          </div>
          <h2 className="text-4xl font-bold sm:text-5xl">{t("heading")}</h2>
          <p className="mt-3 text-muted-foreground max-w-md mx-auto">
            {t("subheading")}
          </p>
        </motion.div>

        {/* Skills grid by category */}
        <div className="space-y-10">
          {SKILLS.map((group, groupIndex) => {
            const colors = CATEGORY_COLORS[groupIndex % CATEGORY_COLORS.length];
            return (
              <motion.div
                key={group.category}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: groupIndex * 0.08 }}
              >
                {/* Category pill */}
                <div className="flex items-center gap-3 mb-5">
                  <span className={cn("px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider border", colors.pill)}>
                    {group.category}
                  </span>
                  <div className="flex-1 h-px bg-border/50" />
                </div>

                {/* Skill bubbles */}
                <div className="flex flex-wrap gap-3">
                  {group.items.map((skill, i) => {
                    const iconPath = getIcon(skill.icon);
                    return (
                      <motion.div
                        key={skill.name}
                        initial={{ opacity: 0, scale: 0.85 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: groupIndex * 0.05 + i * 0.04, duration: 0.3 }}
                        className={cn(
                          "flex items-center gap-2.5 px-4 py-2.5 rounded-full border transition-all duration-200 hover:scale-105 hover:shadow-sm cursor-default",
                          colors.bg
                        )}
                      >
                        {iconPath ? (
                          <svg
                            role="img"
                            aria-label={skill.name}
                            viewBox="0 0 24 24"
                            className={cn("h-4 w-4 shrink-0 transition-colors", colors.icon)}
                          >
                            <path d={iconPath} />
                          </svg>
                        ) : (
                          <div className="h-4 w-4 shrink-0 rounded-full bg-current opacity-40" />
                        )}
                        <span className="text-sm font-semibold text-foreground/80">
                          {skill.name}
                        </span>
                      </motion.div>
                    );
                  })}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
