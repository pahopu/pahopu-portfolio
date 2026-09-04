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
import { CONTACT_EMAIL, HERO_ANIMATION } from "@/constants";
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
} from "lucide-react";
import { AlbumStar, StarDeco } from "@/components/shared/album-star";
import Link from "next/link";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useTranslations } from "next-intl";

type ContactFormInputs = {
  user_name: string;
  user_email: string;
  subject: string;
  message: string;
};

const MotionCard = motion(Card);

export const ContactSection = () => {
  const t = useTranslations("contact");
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormInputs>();

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
      <div className="absolute inset-0 bg-[#F0F8FF]/40 dark:bg-[#0F1B40]/20" />
      <div className="absolute bottom-0 right-0 w-[600px] h-[400px] bg-[#C8E645]/12 rounded-full blur-[100px] -z-10" />
      <div className="absolute top-0 left-0 w-[500px] h-[400px] bg-[#5B8FE8]/12 rounded-full blur-[100px] -z-10" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,var(--background)_90%)]" />
      <AlbumStar size={64} className="top-[4%] right-[2%]"     style={{ animationDuration: "5.4s" }} />
      <AlbumStar size={24} className="top-[18%] right-[7%]"    style={{ animationDuration: "4.1s", animationDelay: "1.6s" }} />
      <AlbumStar size={40} className="top-[46%] right-[1%]"    style={{ animationDuration: "6.7s", animationDelay: "0.5s" }} />
      <AlbumStar size={18} className="bottom-[24%] right-[5%]" style={{ animationDuration: "5.1s", animationDelay: "2.0s" }} />
      <AlbumStar size={52} className="bottom-[6%] right-[3%]"  style={{ animationDuration: "4.8s", animationDelay: "0.2s" }} />
      <AlbumStar size={48} className="top-[5%] left-[2%]"      style={{ animationDuration: "6.0s", animationDelay: "1.1s" }} />
      <AlbumStar size={20} className="top-[32%] left-[1%]"     style={{ animationDuration: "5.8s", animationDelay: "1.9s" }} />
      <AlbumStar size={36} className="bottom-[16%] left-[3%]"  style={{ animationDuration: "7.2s", animationDelay: "0.7s" }} />
      <AlbumStar size={16} className="bottom-[35%] left-[6%]"  style={{ animationDuration: "4.5s", animationDelay: "2.3s" }} />
      <AlbumStar dim size={20} className="top-[26%] right-[9%]"   style={{ animationDuration: "4.1s", animationDelay: "1.2s" }} />
      <AlbumStar dim size={14} className="bottom-[48%] left-[9%]" style={{ animationDuration: "5.4s", animationDelay: "0.7s" }} />
      <AlbumStar dim size={18} className="top-[65%] right-[8%]"   style={{ animationDuration: "3.9s", animationDelay: "2.2s" }} />

      <div className="container px-4 md:px-6 mx-auto max-w-6xl relative z-10">
        <motion.div
          variants={HERO_ANIMATION.container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid md:grid-cols-2 gap-12 lg:gap-24 items-start"
        >
          {/* Left column */}
          <div className="space-y-8">
            <motion.div variants={HERO_ANIMATION.item} className="space-y-4">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/15 border border-primary/25 text-primary font-semibold text-sm">
                <Mail className="h-3.5 w-3.5" /> {t("label")}
              </div>
              <h2 className="text-4xl font-bold tracking-tighter sm:text-5xl">
                {t("heading")} <br />
                <span className="text-primary">{t("accent")}</span>
              </h2>
              <p className="text-muted-foreground text-lg leading-relaxed max-w-md">
                {t("subheading")}
              </p>
            </motion.div>

            <motion.div variants={HERO_ANIMATION.item} className="space-y-4 font-medium">
              <Link
                href={`mailto:${CONTACT_EMAIL}`}
                className="select-none flex items-center gap-4 p-4 rounded-xl border bg-card/50 hover:bg-primary/5 hover:border-primary/30 transition-all group"
              >
                <div className="p-3 rounded-lg bg-primary/10 text-[#1B2E6E] dark:text-primary group-hover:scale-110 transition-transform">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">{t("email_prompt")}</p>
                  <p className="font-semibold text-foreground group-hover:text-primary transition-colors">
                    {CONTACT_EMAIL}
                  </p>
                </div>
                <ArrowRight className="w-4 h-4 ml-auto text-muted-foreground group-hover:translate-x-1 transition-transform" />
              </Link>

              <div className="flex gap-4">
                <Link
                  href="https://github.com/pahopu"
                  target="_blank"
                  className="select-none flex-1 flex items-center justify-center gap-2 p-3 rounded-xl border bg-card/50 hover:bg-card hover:border-foreground/30 transition-all"
                >
                  <Github className="w-5 h-5" />
                  <span>GitHub</span>
                </Link>
                <Link
                  href="https://www.linkedin.com/in/pahopu"
                  target="_blank"
                  className="select-none flex-1 flex items-center justify-center gap-2 p-3 rounded-xl border bg-card/50 hover:bg-[#5B8FE8]/10 hover:border-[#5B8FE8]/30 hover:text-[#5B8FE8] transition-all"
                >
                  <Linkedin className="w-5 h-5" />
                  <span>LinkedIn</span>
                </Link>
              </div>
            </motion.div>
          </div>

          {/* Right column — form */}
          <motion.div variants={HERO_ANIMATION.item}>
            <MotionCard className="border-primary/20 bg-linear-to-br from-primary/5 via-card to-card relative overflow-hidden shadow-lg">
              <StarDeco className="absolute -top-5 -right-5 w-28 h-28 text-[#FFE566]/12 dark:text-[#FFF0B0]/8 -rotate-12" />
              <StarDeco className="absolute -bottom-5 -left-3 w-20 h-20 text-[#FFE566]/10 dark:text-[#FFF0B0]/7 rotate-6" />

              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-[#1B2E6E] dark:text-primary">
                  <MessageSquare className="w-5 h-5" /> {t("send_label")}
                </CardTitle>
                <CardDescription>{t("response_note")}</CardDescription>
              </CardHeader>

              <CardContent>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-xs font-bold uppercase text-muted-foreground tracking-wider">
                        {t("name_label")}
                      </label>
                      <Input
                        {...register("user_name", { required: true })}
                        placeholder="John Doe"
                        disabled={isSubmitting}
                        className={`bg-background/50 focus:bg-background transition-colors ${
                          errors.user_name
                            ? "border-red-500 focus-visible:ring-red-500"
                            : "focus-visible:ring-primary/50 border-primary/10"
                        }`}
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-bold uppercase text-muted-foreground tracking-wider">
                        {t("email_label")}
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
                            : "focus-visible:ring-primary/50 border-primary/10"
                        }`}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase text-muted-foreground tracking-wider">
                      {t("subject_label")}
                    </label>
                    <Input
                      {...register("subject", { required: true })}
                      placeholder={t("subject_placeholder")}
                      disabled={isSubmitting}
                      className={`bg-background/50 focus:bg-background transition-colors ${
                        errors.subject
                          ? "border-red-500 focus-visible:ring-red-500"
                          : "focus-visible:ring-primary/50 border-primary/10"
                      }`}
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase text-muted-foreground tracking-wider">
                      {t("message_label")}
                    </label>
                    <Textarea
                      {...register("message", { required: true })}
                      placeholder={t("message_placeholder")}
                      className={`min-h-[150px] bg-background/50 focus:bg-background transition-colors resize-none ${
                        errors.message
                          ? "border-red-500 focus-visible:ring-red-500"
                          : "focus-visible:ring-primary/50 border-primary/10"
                      }`}
                      disabled={isSubmitting}
                    />
                  </div>

                  <Button
                    type="submit"
                    className="w-full gap-2 mt-2 bg-primary text-[#1B2E6E] hover:bg-primary/90 font-bold rounded-full border-none"
                    size="lg"
                    disabled={isSubmitting || status === "success"}
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="h-4 w-4 animate-spin" />
                        {t("sending_btn")}
                      </>
                    ) : status === "success" ? (
                      <>
                        <CheckCircle2 className="h-4 w-4" />
                        {t("sent_btn")}
                      </>
                    ) : (
                      <>
                        {t("send_btn")} <ArrowRight className="h-4 w-4" />
                      </>
                    )}
                  </Button>

                  {status === "error" && (
                    <p className="text-xs text-red-500 text-center animate-in fade-in slide-in-from-top-1">
                      {t("error_msg")}
                    </p>
                  )}
                  {Object.keys(errors).length > 0 && (
                    <p className="text-xs text-red-500 text-center animate-in fade-in slide-in-from-top-1">
                      {t("validation_msg")}
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
