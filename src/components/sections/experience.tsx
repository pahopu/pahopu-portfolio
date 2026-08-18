"use client";

import { EXPERIENCE } from "@/constants";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { Briefcase } from "lucide-react";
import { useTranslations } from "next-intl";

// Rounded SVG star for timeline markers — color via CSS currentColor
const StarIcon = ({ className, size = 20, color }: { className?: string; size?: number; color?: string }) => (
  <svg
    viewBox="0 0 24 24"
    width={size}
    height={size}
    className={cn("shrink-0", className)}
    style={{ color }}
    aria-hidden
  >
    <path
      d="M12 2L14.39 8.26L21 9.27L16.5 13.97L17.78 21L12 17.77L6.22 21L7.5 13.97L3 9.27L9.61 8.26Z"
      fill="currentColor"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinejoin="round"
    />
  </svg>
);

export const Experience = () => {
  const t = useTranslations("experience");

  return (
    <section id="experience" className="relative w-full py-20 md:py-28 overflow-hidden">
      <div className="absolute inset-0 bg-[#F0F6FF]/50 dark:bg-[#0F1B40]/20" />
      <div className="absolute top-1/2 right-0 w-[500px] h-[400px] bg-[#F5B8CC]/8 rounded-full blur-[120px] -z-10" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[300px] bg-[#5B8FE8]/8 rounded-full blur-[100px] -z-10" />

      <div className="container px-4 md:px-6 mx-auto max-w-5xl relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#F5B8CC]/20 border border-[#F5B8CC]/30 text-[#C44D72] dark:text-[#F5B8CC] font-semibold text-sm mb-4">
            <Briefcase className="w-4 h-4" /> {t("label")}
          </div>
          <h2 className="text-4xl font-bold sm:text-5xl">{t("heading")}</h2>
          <p className="mt-3 text-muted-foreground max-w-md mx-auto">
            {t("subheading")}
          </p>
        </motion.div>

        {/* Timeline */}
        <div className="relative max-w-4xl mx-auto">
          <div className="absolute left-5 md:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary/40 via-[#5B8FE8]/30 to-[#F5B8CC]/20 md:-translate-x-px" />

          <div className="space-y-14">
            {EXPERIENCE.map((job, index) => (
              <motion.div
                key={job.company}
                initial={{ opacity: 0, x: index % 2 === 0 ? -40 : 40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.15 }}
                className="relative flex flex-col md:flex-row gap-0"
              >
                {/* Rounded star marker on the timeline line */}
                <div className="absolute top-5 z-10 left-5 md:left-1/2 -translate-x-1/2">
                  <StarIcon size={20} color={index === 0 ? "#C8E645" : "#5B8FE8"} />
                </div>

                {/* Card — alternates sides on desktop */}
                <div
                  className={cn(
                    "ml-14 md:ml-0 w-auto",
                    index % 2 === 0
                      ? "md:w-[calc(50%-2.5rem)] md:mr-auto md:pr-8"
                      : "md:w-[calc(50%-2.5rem)] md:ml-auto md:pl-8"
                  )}
                >
                  <div
                    className={cn(
                      "p-6 rounded-3xl border transition-all duration-300",
                      "hover:shadow-lg hover:-translate-y-0.5",
                      index === 0
                        ? "border-primary/25 bg-linear-to-br from-primary/8 via-card to-card hover:shadow-primary/10"
                        : "border-[#5B8FE8]/25 bg-linear-to-br from-[#5B8FE8]/8 via-card to-card hover:shadow-[#5B8FE8]/10"
                    )}
                  >
                    {/* Period + current badge */}
                    <div className="flex items-center gap-2 mb-2 flex-wrap">
                      <span
                        className={cn(
                          "text-xs font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full",
                          index === 0
                            ? "bg-primary/15 text-[#1B2E6E] dark:text-primary"
                            : "bg-[#5B8FE8]/15 text-[#5B8FE8]"
                        )}
                      >
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

                    {/* Company + Role */}
                    <h3 className="text-xl font-bold text-foreground mt-1">{job.company}</h3>
                    <p className="text-sm text-muted-foreground mb-4">{job.role}</p>

                    {/* Highlights */}
                    <ul className="space-y-2">
                      {job.highlights.map((h, i) => (
                        <li key={i} className="flex items-start gap-2.5 text-sm text-foreground/80 leading-relaxed">
                          <StarIcon
                            size={12}
                            className="mt-1"
                            color={index === 0 ? "#C8E645" : "#5B8FE8"}
                          />
                          {h}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
