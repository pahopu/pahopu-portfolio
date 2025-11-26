"use client";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";
import { Award, BookOpen, Code2, GraduationCap, Terminal } from "lucide-react";

export const About = () => {
  return (
    <section id="about" className="py-24 bg-muted/30">
      <div className="container px-4 md:px-6 mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="grid md:grid-cols-2 gap-12 items-start"
        >
          {/* --- LEFT COLUMN: BIO & EDUCATION --- */}
          <div className="space-y-8">
            <div className="space-y-4">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl flex items-center gap-2">
                <Terminal className="w-8 h-8 text-primary" />
                About Me
              </h2>
              <p className="text-muted-foreground text-lg leading-relaxed">
                I&apos;m a <strong>Front-End Developer</strong> with a deep
                passion for building scalable, high-performance web
                applications. Unlike many, my journey started with a strong
                foundation in <strong>Computer Science</strong>, allowing me to
                approach frontend challenges with an engineering
                mindset—optimizing not just for pixels, but for logic, memory,
                and speed.
              </p>
            </div>

            {/* Education Card */}
            <Card className="bg-background/50 backdrop-blur border-primary/10 shadow-sm">
              <CardContent className="p-6 flex flex-col gap-4">
                <div className="flex items-center gap-3 text-primary mb-1">
                  <GraduationCap className="w-6 h-6" />
                  <h3 className="font-semibold text-xl">Education</h3>
                </div>

                <div className="pl-2 border-l-2 border-primary/20 space-y-1">
                  <h4 className="font-bold">
                    University of Information Technology (VNU-HCM)
                  </h4>
                  <p className="text-muted-foreground text-sm">
                    Bachelor of Computer Science (2020 - 2024)
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-4 mt-2">
                  <div className="bg-primary/5 p-3 rounded-lg border border-primary/10 text-center">
                    <span className="block text-2xl font-bold text-primary">
                      9.14
                    </span>
                    <span className="text-xs text-muted-foreground uppercase tracking-wider">
                      GPA / 10.0
                    </span>
                  </div>
                  <div className="bg-primary/5 p-3 rounded-lg border border-primary/10 text-center">
                    <span className="block text-2xl font-bold text-primary">
                      Top 8%
                    </span>
                    <span className="text-xs text-muted-foreground uppercase tracking-wider">
                      Excellence
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Awards */}
            <div className="flex gap-4 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <Award className="w-4 h-4 text-yellow-500" />
                <span>Student of 5 Merits</span>
              </div>
              <div className="flex items-center gap-2">
                <BookOpen className="w-4 h-4 text-blue-500" />
                <span>Scholarship for Excellence</span>
              </div>
            </div>
          </div>

          {/* --- RIGHT COLUMN: TECH STACK --- */}
          <div className="space-y-6">
            <div className="flex items-center gap-2 mb-4">
              <Code2 className="w-6 h-6 text-primary" />
              <h3 className="font-semibold text-2xl">Tech Stack</h3>
            </div>

            {/* 1. Core & Frameworks */}
            <div className="space-y-3">
              <h4 className="text-sm font-medium text-muted-foreground uppercase tracking-widest">
                Core & Frameworks
              </h4>
              <div className="flex flex-wrap gap-2">
                {[
                  "JavaScript (ES6+)",
                  "TypeScript",
                  "React",
                  "Next.js",
                  "Vue 3",
                  "Quasar",
                  "HTML5/CSS3",
                ].map((skill) => (
                  <Badge
                    key={skill}
                    variant="secondary"
                    className="px-3 py-1 text-sm bg-background border hover:border-primary/50 transition-colors"
                  >
                    {skill}
                  </Badge>
                ))}
              </div>
            </div>

            {/* 2. State & Styling */}
            <div className="space-y-3">
              <h4 className="text-sm font-medium text-muted-foreground uppercase tracking-widest">
                State & Styling
              </h4>
              <div className="flex flex-wrap gap-2">
                {[
                  "Redux",
                  "Pinia",
                  "TanStack Query",
                  "Tailwind CSS",
                  "Shadcn UI",
                  "Framer Motion",
                ].map((skill) => (
                  <Badge
                    key={skill}
                    variant="secondary"
                    className="px-3 py-1 text-sm bg-background border hover:border-primary/50 transition-colors"
                  >
                    {skill}
                  </Badge>
                ))}
              </div>
            </div>

            {/* 3. Computer Science & Tools */}
            <div className="space-y-3">
              <h4 className="text-sm font-medium text-muted-foreground uppercase tracking-widest">
                Engineering & Tools
              </h4>
              <div className="flex flex-wrap gap-2">
                {[
                  "C/C++",
                  "Python",
                  "Algorithms",
                  "Git/GitHub",
                  "Figma",
                  "RESTful API",
                  "GraphQL",
                ].map((skill) => (
                  <Badge
                    key={skill}
                    variant="outline"
                    className="px-3 py-1 text-sm border-dashed"
                  >
                    {skill}
                  </Badge>
                ))}
              </div>
            </div>

            {/* Decorative Terminal Line */}
            <div className="mt-8 p-4 rounded-md bg-black/80 font-mono text-xs text-green-400 border border-border shadow-lg">
              <p>$ echo &quot;Ready to build something amazing?&quot;</p>
              <p className="mt-1 text-white">_</p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
