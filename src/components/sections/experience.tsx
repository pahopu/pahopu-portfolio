"use client";

import { EXPERIENCE } from "@/constants";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";

// Rounded star icon
const StarIcon = ({ size = 14, color }: { size?: number; color?: string }) => (
  <svg viewBox="0 0 24 24" width={size} height={size} style={{ color }} className="shrink-0" aria-hidden>
    <path
      d="M12 2L14.39 8.26L21 9.27L16.5 13.97L17.78 21L12 17.77L6.22 21L7.5 13.97L3 9.27L9.61 8.26Z"
      fill="currentColor" stroke="currentColor" strokeWidth="3.5" strokeLinejoin="round"
    />
  </svg>
);

const TRACK_ACCENTS = [
  { border: "border-l-primary", bg: "bg-primary/8", num: "text-primary/12", badge: "bg-primary/15 text-[#1B2E6E] dark:text-primary", star: "#C8E645" },
  { border: "border-l-[#5B8FE8]", bg: "bg-[#5B8FE8]/8", num: "text-[#5B8FE8]/12", badge: "bg-[#5B8FE8]/15 text-[#5B8FE8]", star: "#5B8FE8" },
];

export const Experience = () => {
  const t = useTranslations("experience");

  return (
    <section id="experience" className="relative w-full py-20 md:py-28 overflow-hidden">
      <div className="absolute inset-0 bg-[#F0F6FF]/50 dark:bg-[#0F1B40]/20" />
      <div className="absolute top-1/2 right-0 w-[500px] h-[400px] bg-[#F5B8CC]/6 rounded-full blur-[120px] -z-10" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[300px] bg-[#5B8FE8]/6 rounded-full blur-[100px] -z-10" />

      <div className="container px-4 md:px-6 mx-auto max-w-4xl relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-14"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#F5B8CC]/20 border border-[#F5B8CC]/30 text-[#C44D72] dark:text-[#F5B8CC] font-semibold text-sm mb-4">
            ★ {t("label")}
          </div>
          <h2 className="text-4xl font-bold sm:text-5xl">{t("heading")}</h2>
          <p className="mt-3 text-muted-foreground max-w-md mx-auto">{t("subheading")}</p>
        </motion.div>

        {/* Tracklist */}
        <div className="space-y-6">
          {EXPERIENCE.map((job, index) => {
            const accent = TRACK_ACCENTS[index % TRACK_ACCENTS.length];
            return (
              <motion.div
                key={job.company}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.12 }}
                className={cn(
                  "relative flex gap-5 md:gap-8 p-5 md:p-7 rounded-3xl border-l-4 transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5",
                  accent.border, accent.bg,
                  "bg-card/80 border border-border/40 dark:border-border/20"
                )}
              >
                {/* Track number — big faded */}
                <div className={cn("text-6xl md:text-7xl font-extrabold leading-none select-none shrink-0 w-14 md:w-16 pt-1", accent.num)}>
                  {String(index + 1).padStart(2, "0")}
                </div>

                {/* Track content */}
                <div className="flex-1 min-w-0">
                  {/* Period + current badge */}
                  <div className="flex items-center gap-2.5 mb-2 flex-wrap">
                    <span className={cn("text-xs font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full", accent.badge)}>
                      {job.period}
                    </span>
                    {job.current && (
                      <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-primary">
                        <span className="relative flex h-1.5 w-1.5">
                          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75" />
                          <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-primary" />
                        </span>
                        {t("current")}
                      </span>
                    )}
                  </div>

                  {/* Company as track title */}
                  <h3 className="text-2xl font-bold text-foreground leading-tight">{job.company}</h3>
                  <p className="text-sm text-muted-foreground mt-0.5 mb-4">{job.role}</p>

                  {/* Highlights as tracklist entries */}
                  <ul className="space-y-2.5">
                    {job.highlights.map((h, i) => (
                      <li key={i} className="flex items-start gap-2.5 text-sm text-foreground/80 leading-relaxed">
                        <span className="mt-[3px] shrink-0"><StarIcon size={12} color={accent.star} /></span>
                        <span>{h}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
