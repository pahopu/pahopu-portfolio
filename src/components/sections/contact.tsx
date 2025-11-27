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
  Send,
  Terminal,
} from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form"; // Import Hook Form

/* --- SECTION: TYPES --- */
type ContactFormInputs = {
  user_name: string;
  user_email: string;
  subject: string;
  message: string;
};

/* --- SECTION: SETUP --- */
const MotionCard = motion(Card);

export const ContactSection = () => {
  /* --- STATE --- */
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");

  /* --- HOOK FORM SETUP --- */
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormInputs>();

  /* --- HANDLER --- */
  const onSubmit: SubmitHandler<ContactFormInputs> = async (data) => {
    setStatus("idle");
    try {
      await emailjs.send(
        process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!,
        process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID!,
        data,
        process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY!
      );
      setStatus("success");
      reset();
      setTimeout(() => setStatus("idle"), 5000);
    } catch (error) {
      console.error("FAILED...", error);
      setStatus("error");
    }
  };

  return (
    <section id="contact" className="relative w-full py-24 overflow-hidden">
      {/* --- SECTION: BACKGROUND EFFECTS (Copied from About) --- */}
      <div className="absolute inset-0 bg-slate-950/5 dark:bg-slate-950/20" />
      {/* Circuit Pattern */}
      <div
        className="absolute inset-0 opacity-[0.03] dark:opacity-[0.15]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%2306b6d4' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}
      />
      {/* Glow Effect (Cyan/Blue for Contact) */}
      <div className="absolute bottom-0 right-0 w-[600px] h-[400px] bg-cyan-500/5 rounded-full blur-[120px] -z-10" />

      <div className="container px-4 md:px-6 mx-auto max-w-6xl relative z-10">
        <motion.div
          variants={HERO_ANIMATION.container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid md:grid-cols-2 gap-12 lg:gap-24 items-start"
        >
          {/* --- SECTION: LEFT COLUMN (INFO) --- */}
          <div className="space-y-8">
            <motion.div variants={HERO_ANIMATION.item} className="space-y-4">
              <div className="flex items-center gap-2 text-cyan-600 dark:text-cyan-400 font-mono text-sm tracking-wider uppercase">
                <Terminal className="w-4 h-4" />
                <span>/contact-me</span>
              </div>
              <h2 className="text-4xl font-bold tracking-tighter sm:text-5xl">
                Let&apos;s build something <br />
                <span className="text-cyan-600 dark:text-cyan-400">
                  exceptional.
                </span>
              </h2>
              <p className="text-muted-foreground text-lg leading-relaxed max-w-md">
                Whether you have a question about my stack, a project proposal,
                or just want to discuss the latest in Front-End engineering — my
                inbox is always open.
              </p>
            </motion.div>

            {/* Status Badge */}
            <motion.div variants={HERO_ANIMATION.item}>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400 text-sm font-medium">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                </span>
                Open to new opportunities
              </div>
            </motion.div>

            {/* Direct Links */}
            <motion.div
              variants={HERO_ANIMATION.item}
              className="space-y-4 font-medium"
            >
              <Link
                href="mailto:hoangphucpham.work@gmail.com"
                className="flex items-center gap-4 p-4 rounded-xl border bg-card/50 hover:bg-cyan-500/5 hover:border-cyan-500/30 transition-all group"
              >
                <div className="p-3 rounded-lg bg-cyan-500/10 text-cyan-600 group-hover:scale-110 transition-transform">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Email me at</p>
                  <p className="font-semibold text-foreground group-hover:text-cyan-600 transition-colors">
                    hoangphucpham.work@gmail.com
                  </p>
                </div>
                <ArrowRight className="w-4 h-4 ml-auto text-muted-foreground group-hover:translate-x-1 transition-transform" />
              </Link>

              <div className="flex gap-4">
                <Link
                  href="https://github.com/pahopu"
                  target="_blank"
                  className="flex-1 flex items-center justify-center gap-2 p-3 rounded-xl border bg-card/50 hover:bg-card hover:border-foreground/30 transition-all"
                >
                  <Github className="w-5 h-5" />
                  <span>GitHub</span>
                </Link>
                <Link
                  href="https://www.linkedin.com/in/pahopu"
                  target="_blank"
                  className="flex-1 flex items-center justify-center gap-2 p-3 rounded-xl border bg-card/50 hover:bg-blue-500/5 hover:border-blue-500/30 hover:text-blue-600 transition-all"
                >
                  <Linkedin className="w-5 h-5" />
                  <span>LinkedIn</span>
                </Link>
              </div>
            </motion.div>
          </div>

          {/* --- SECTION: RIGHT COLUMN (FORM WITH HOOK FORM) --- */}
          <motion.div variants={HERO_ANIMATION.item}>
            {/* Styled MotionCard matching About section aesthetics (Cyan Accent) */}
            <MotionCard className="border-cyan-500/20 bg-linear-to-br from-cyan-500/5 via-card to-card relative overflow-hidden shadow-lg">
              {/* Internal decorative gradient */}
              <div className="absolute top-0 right-0 p-6 opacity-5 -rotate-12 pointer-events-none">
                <Send size={100} />
              </div>

              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-cyan-600 dark:text-cyan-400">
                  <MessageSquare className="w-5 h-5" /> Send a message
                </CardTitle>
                <CardDescription>
                  I usually respond within 24 hours.
                </CardDescription>
              </CardHeader>

              <CardContent>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    {/* Name Input */}
                    <div className="space-y-2">
                      <label className="text-xs font-bold uppercase text-muted-foreground tracking-wider">
                        Name
                      </label>
                      <Input
                        {...register("user_name", { required: true })}
                        placeholder="John Doe"
                        disabled={isSubmitting}
                        className={`bg-background/50 focus:bg-background transition-colors ${
                          errors.user_name
                            ? "border-red-500 focus-visible:ring-red-500"
                            : "focus-visible:ring-cyan-500/50 border-cyan-500/10"
                        }`}
                      />
                    </div>

                    {/* Email Input */}
                    <div className="space-y-2">
                      <label className="text-xs font-bold uppercase text-muted-foreground tracking-wider">
                        Email
                      </label>
                      <Input
                        {...register("user_email", {
                          required: true,
                          pattern: /^\S+@\S+$/i,
                        })}
                        placeholder="john@example.com"
                        type="email"
                        disabled={isSubmitting}
                        className={`bg-background/50 focus:bg-background transition-colors ${
                          errors.user_email
                            ? "border-red-500 focus-visible:ring-red-500"
                            : "focus-visible:ring-cyan-500/50 border-cyan-500/10"
                        }`}
                      />
                    </div>
                  </div>

                  {/* Subject Input */}
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase text-muted-foreground tracking-wider">
                      Subject
                    </label>
                    <Input
                      {...register("subject", { required: true })}
                      placeholder="Project Inquiry / Tech Talk"
                      disabled={isSubmitting}
                      className={`bg-background/50 focus:bg-background transition-colors ${
                        errors.subject
                          ? "border-red-500 focus-visible:ring-red-500"
                          : "focus-visible:ring-cyan-500/50 border-cyan-500/10"
                      }`}
                    />
                  </div>

                  {/* Message Input */}
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase text-muted-foreground tracking-wider">
                      Message
                    </label>
                    <Textarea
                      {...register("message", { required: true })}
                      placeholder="Tell me about your project..."
                      className={`min-h-[150px] bg-background/50 focus:bg-background transition-colors resize-none ${
                        errors.message
                          ? "border-red-500 focus-visible:ring-red-500"
                          : "focus-visible:ring-cyan-500/50 border-cyan-500/10"
                      }`}
                      disabled={isSubmitting}
                    />
                  </div>

                  {/* Submit Button */}
                  <Button
                    type="submit"
                    className="w-full gap-2 mt-2 bg-linear-to-r from-cyan-600 to-blue-600 hover:from-cyan-700 hover:to-blue-700 text-white border-none"
                    size="lg"
                    disabled={isSubmitting || status === "success"}
                  >
                    {isSubmitting ? (
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
                  {Object.keys(errors).length > 0 && (
                    <p className="text-xs text-red-500 text-center animate-in fade-in slide-in-from-top-1">
                      Please fill in all required fields.
                    </p>
                  )}
                </form>
              </CardContent>
            </MotionCard>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};
