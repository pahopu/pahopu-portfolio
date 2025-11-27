"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { HERO_ANIMATION } from "@/constants";
import emailjs from "@emailjs/browser";
import { motion } from "framer-motion";
import {
  ArrowRight,
  CheckCircle2,
  Github,
  Linkedin,
  Loader2,
  Mail,
  MessageSquare,
  Terminal,
} from "lucide-react";
import Link from "next/link";
import { useRef, useState } from "react";

export const ContactSection = () => {
  /* --- SECTION: STATE & REFS --- */
  const formRef = useRef<HTMLFormElement>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");

  /* --- SECTION: HANDLERS --- */
  const sendEmail = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formRef.current) return;

    setIsLoading(true);
    setStatus("idle");

    emailjs
      .sendForm(
        process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!,
        process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID!,
        formRef.current,
        process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY!
      )
      .then(
        () => {
          setStatus("success");
          formRef.current?.reset();
          setTimeout(() => setStatus("idle"), 5000);
        },
        (error) => {
          console.error("FAILED...", error);
          setStatus("error");
        }
      )
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <section id="contact" className="relative w-full py-24 overflow-hidden">
      {/* --- SECTION: BACKGROUND EFFECTS --- */}
      <div className="absolute inset-0 bg-slate-950/5 dark:bg-slate-950/20" />
      {/* Grid Pattern Bottom-Right */}
      <div
        className="absolute bottom-0 right-0 w-1/2 h-1/2 opacity-[0.03] dark:opacity-[0.05]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%239C92AC' fill-opacity='1' fill-rule='evenodd'%3E%3Cpath d='M0 40L40 0H20L0 20M40 40V20L20 40'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}
      />

      <div className="container px-4 md:px-6 mx-auto max-w-6xl relative z-10">
        <motion.div
          variants={HERO_ANIMATION.container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid md:grid-cols-2 gap-12 lg:gap-24"
        >
          {/* --- SECTION: LEFT COLUMN (INFO) --- */}
          <div className="space-y-8">
            <motion.div variants={HERO_ANIMATION.item} className="space-y-4">
              <div className="flex items-center gap-2 text-primary font-mono text-sm tracking-wider uppercase">
                <Terminal className="w-4 h-4" />
                <span>/contact-me</span>
              </div>
              <h2 className="text-4xl font-bold tracking-tighter sm:text-5xl">
                Let&apos;s build something <br />
                <span className="text-primary">exceptional.</span>
              </h2>
              <p className="text-muted-foreground text-lg leading-relaxed max-w-md">
                Whether you have a question about my stack, a project proposal,
                or just want to discuss the latest in Front-End engineering — my
                inbox is always open.
              </p>
            </motion.div>

            {/* Status Badge */}
            <motion.div variants={HERO_ANIMATION.item}>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-green-500/10 border border-green-500/20 text-green-600 dark:text-green-400 text-sm font-medium">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                </span>
                Open to new opportunities
              </div>
            </motion.div>

            {/* Direct Links */}
            <motion.div variants={HERO_ANIMATION.item} className="space-y-4">
              <Link
                href="mailto:hoangphucpham.work@gmail.com"
                className="flex items-center gap-4 p-4 rounded-xl border bg-card/50 hover:bg-card hover:border-primary/50 transition-all group"
              >
                <div className="p-3 rounded-lg bg-primary/10 text-primary group-hover:scale-110 transition-transform">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">
                    Email me at
                  </p>
                  <p className="font-semibold group-hover:text-primary transition-colors">
                    hoangphucpham.work@gmail.com
                  </p>
                </div>
                <ArrowRight className="w-4 h-4 ml-auto text-muted-foreground group-hover:translate-x-1 transition-transform" />
              </Link>

              <div className="flex gap-4">
                <Link
                  href="https://github.com/pahopu"
                  target="_blank"
                  className="flex-1 flex items-center justify-center gap-2 p-3 rounded-xl border bg-card/50 hover:bg-card hover:border-foreground/20 transition-all"
                >
                  <Github className="w-5 h-5" />
                  <span className="font-medium">GitHub</span>
                </Link>
                <Link
                  href="https://www.linkedin.com/in/pahopu"
                  target="_blank"
                  className="flex-1 flex items-center justify-center gap-2 p-3 rounded-xl border bg-card/50 hover:bg-card hover:border-blue-500/50 hover:text-blue-500 transition-all"
                >
                  <Linkedin className="w-5 h-5" />
                  <span className="font-medium">LinkedIn</span>
                </Link>
              </div>
            </motion.div>
          </div>

          {/* --- SECTION: RIGHT COLUMN (FORM) --- */}
          <motion.div variants={HERO_ANIMATION.item}>
            <Card className="border-primary/10 bg-linear-to-br from-card via-card to-primary/5 shadow-xl relative overflow-hidden">
              {/* Top border highlight */}
              <div className="absolute top-0 left-0 w-full h-1 bg-linear-to-r from-transparent via-primary to-transparent opacity-50" />

              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MessageSquare className="w-5 h-5 text-primary" />
                  Send a message
                </CardTitle>
                <CardDescription>
                  I usually respond within 24 hours.
                </CardDescription>
              </CardHeader>

              <CardContent>
                <form ref={formRef} onSubmit={sendEmail} className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-xs font-medium uppercase text-muted-foreground">
                        Name
                      </label>
                      <Input
                        name="user_name"
                        placeholder="John Doe"
                        required
                        disabled={isLoading}
                        className="bg-background/50 focus:bg-background transition-colors"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-medium uppercase text-muted-foreground">
                        Email
                      </label>
                      <Input
                        name="user_email"
                        type="email"
                        placeholder="john@example.com"
                        required
                        disabled={isLoading}
                        className="bg-background/50 focus:bg-background transition-colors"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-medium uppercase text-muted-foreground">
                      Subject
                    </label>
                    <Input
                      name="subject"
                      placeholder="Project Inquiry / Tech Talk"
                      required
                      disabled={isLoading}
                      className="bg-background/50 focus:bg-background transition-colors"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-medium uppercase text-muted-foreground">
                      Message
                    </label>
                    <Textarea
                      name="message"
                      placeholder="Tell me about your project..."
                      className="min-h-[150px] bg-background/50 focus:bg-background transition-colors resize-none"
                      required
                      disabled={isLoading}
                    />
                  </div>

                  <Button
                    type="submit"
                    className="w-full gap-2 mt-2"
                    size="lg"
                    disabled={isLoading || status === "success"}
                  >
                    {isLoading ? (
                      <>
                        <Loader2 className="h-4 w-4 animate-spin" />
                        Sending...
                      </>
                    ) : status === "success" ? (
                      <>
                        <CheckCircle2 className="h-4 w-4" />
                        Message Sent
                      </>
                    ) : (
                      <>
                        Send Message <ArrowRight className="h-4 w-4" />
                      </>
                    )}
                  </Button>

                  {/* Status Messages */}
                  {status === "error" && (
                    <p className="text-xs text-red-500 text-center animate-in fade-in slide-in-from-top-1">
                      Something went wrong. Please try again or email me
                      directly.
                    </p>
                  )}
                </form>
              </CardContent>
            </Card>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};
