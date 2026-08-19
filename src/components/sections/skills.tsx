"use client";

import { SKILLS } from "@/constants";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { Layers } from "lucide-react";
import * as SimpleIcons from "simple-icons";
import { useTranslations } from "next-intl";

const CATEGORY_COLORS = [
  { bg: "bg-[#5B8FE8]/10 border-[#5B8FE8]/25", icon: "fill-[#5B8FE8]", pill: "bg-[#5B8FE8]/15 text-[#5B8FE8] border-[#5B8FE8]/30" },
  { bg: "bg-primary/10 border-primary/25", icon: "fill-primary", pill: "bg-primary/15 text-[#1B2E6E] dark:text-primary border-primary/30" },
  { bg: "bg-[#FFE566]/20 border-[#FFE566]/35", icon: "fill-[#1B2E6E] dark:fill-[#FFE566]", pill: "bg-[#FFE566]/20 text-[#1B2E6E] dark:text-[#FFE566] border-[#FFE566]/35" },
  { bg: "bg-[#F5B8CC]/20 border-[#F5B8CC]/35", icon: "fill-[#C44D72] dark:fill-[#F5B8CC]", pill: "bg-[#F5B8CC]/20 text-[#C44D72] dark:text-[#F5B8CC] border-[#F5B8CC]/35" },
  { bg: "bg-[#FF8C42]/10 border-[#FF8C42]/25", icon: "fill-[#CC6A1E] dark:fill-[#FF8C42]", pill: "bg-[#FF8C42]/15 text-[#CC6A1E] dark:text-[#FF8C42] border-[#FF8C42]/30" },
];

// Album-concept emoji for each category
const CATEGORY_EMOJI = ["⚡", "🎨", "✦", "📦", "☁️"];

function getIcon(slug: string): string | null {
  const key = `si${slug.charAt(0).toUpperCase()}${slug.slice(1)}` as keyof typeof SimpleIcons;
  const icon = SimpleIcons[key] as { path: string } | undefined;
  return icon?.path ?? null;
}

export const Skills = () => {
  const t = useTranslations("skills");

  return (
    <section id="skills" className="relative w-full py-20 md:py-28 overflow-hidden">
      <div className="absolute inset-0 bg-[#F8FBFF]/60 dark:bg-[#0F1B40]/20" />
      <div className="absolute top-0 right-0 w-[500px] h-[400px] bg-primary/6 rounded-full blur-[120px] -z-10" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[300px] bg-[#5B8FE8]/6 rounded-full blur-[100px] -z-10" />

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
            <Layers className="h-3.5 w-3.5" /> {t("label")}
          </div>
          <h2 className="text-4xl font-bold sm:text-5xl">{t("heading")}</h2>
          <p className="mt-3 text-muted-foreground max-w-md mx-auto">{t("subheading")}</p>
        </motion.div>

        {/* Skills grid by category */}
        <div className="space-y-10">
          {SKILLS.map((group, groupIndex) => {
            const colors = CATEGORY_COLORS[groupIndex % CATEGORY_COLORS.length];
            const emoji = CATEGORY_EMOJI[groupIndex % CATEGORY_EMOJI.length];
            return (
              <motion.div
                key={group.category}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: groupIndex * 0.08 }}
              >
                {/* Category label with emoji */}
                <div className="flex items-center gap-3 mb-5">
                  <span className={cn("px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider border flex items-center gap-1.5", colors.pill)}>
                    <span>{emoji}</span>
                    {group.category}
                  </span>
                  <div className="flex-1 h-px bg-border/40" />
                </div>

                {/* Skill bubbles — slightly larger */}
                <div className="flex flex-wrap gap-3">
                  {group.items.map((skill, i) => {
                    const iconPath = getIcon(skill.icon);
                    return (
                      <motion.div
                        key={skill.name}
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: groupIndex * 0.05 + i * 0.04, duration: 0.3 }}
                        className={cn(
                          "flex items-center gap-2.5 px-4 py-2.5 rounded-full border transition-all duration-200 hover:scale-110 hover:shadow-md cursor-default select-none",
                          colors.bg
                        )}
                      >
                        {iconPath ? (
                          <svg
                            role="img"
                            aria-label={skill.name}
                            viewBox="0 0 24 24"
                            className={cn("h-4.5 w-4.5 shrink-0 transition-colors", colors.icon)}
                            style={{ width: 18, height: 18 }}
                          >
                            <path d={iconPath} />
                          </svg>
                        ) : (
                          <span className="text-sm">✦</span>
                        )}
                        <span className="text-sm font-semibold text-foreground/80">{skill.name}</span>
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
