"use client";

import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown, Volume2, VolumeX } from "lucide-react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { useCallback, useEffect, useRef, useState } from "react";

const TRACK = {
  src: "/music/congbday.mp3",
  title: "Nhớ Em 8 Lần",
  artist: "CONGB, Mason Nguyen, Tez",
  cover: "/images/congbday_theme.png",
};

const EqBars = ({ compact = false }: { compact?: boolean }) => (
  <div className="flex items-end gap-[2px] h-3 shrink-0">
    {[0, 1, 2].map((i) => (
      <div
        key={i}
        className="w-[3px] rounded-full bg-primary transition-all duration-300"
        style={{
          height: compact ? "2px" : "3px",
          animation: `${compact ? "eq-bar-sm" : "eq-bar"} 0.8s ease-in-out ${i * 0.18}s infinite`,
        }}
      />
    ))}
  </div>
);

function formatTime(s: number) {
  if (!isFinite(s) || s < 0) return "0:00";
  const m = Math.floor(s / 60);
  const sec = Math.floor(s % 60);
  return `${m}:${sec.toString().padStart(2, "0")}`;
}

export const FloatingMusicPlayer = () => {
  const t = useTranslations("player");
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isExpanded, setIsExpanded] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isMuted, setIsMuted] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [isPillHovered, setIsPillHovered] = useState(false);

  useEffect(() => {
    const audio = new Audio(TRACK.src);
    audio.preload = "metadata";
    audio.onloadedmetadata = () => setDuration(audio.duration);
    audio.ontimeupdate = () => setCurrentTime(audio.currentTime);
    audio.onended = () => setIsPlaying(false);
    audioRef.current = audio;
    return () => { audio.pause(); audio.src = ""; };
  }, []);

  // Close on click outside
  useEffect(() => {
    if (!isExpanded) return;
    const handler = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsExpanded(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [isExpanded]);

  const togglePlay = useCallback(() => {
    const audio = audioRef.current;
    if (!audio) return;
    if (isPlaying) {
      audio.pause();
      setIsPlaying(false);
    } else {
      audio.play().then(() => setIsPlaying(true)).catch(() => {});
    }
  }, [isPlaying]);

  const toggleMute = useCallback(() => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.muted = !isMuted;
    setIsMuted(!isMuted);
  }, [isMuted]);

  const getPct = useCallback((clientX: number) => {
    if (!progressRef.current || !duration) return null;
    const rect = progressRef.current.getBoundingClientRect();
    return Math.max(0, Math.min(1, (clientX - rect.left) / rect.width));
  }, [duration]);

  const handleProgressMouseDown = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
    const pct = getPct(e.clientX);
    if (pct !== null && audioRef.current) audioRef.current.currentTime = pct * duration;
  }, [getPct, duration]);

  const handleProgressTouchStart = useCallback((e: React.TouchEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
    const pct = getPct(e.touches[0].clientX);
    if (pct !== null && audioRef.current) audioRef.current.currentTime = pct * duration;
  }, [getPct, duration]);

  useEffect(() => {
    if (!isDragging) return;
    const onMove = (e: MouseEvent) => {
      const pct = getPct(e.clientX);
      if (pct !== null && audioRef.current) audioRef.current.currentTime = pct * duration;
    };
    const onUp = () => setIsDragging(false);
    const onTouchMove = (e: TouchEvent) => {
      e.preventDefault();
      const pct = getPct(e.touches[0].clientX);
      if (pct !== null && audioRef.current) audioRef.current.currentTime = pct * duration;
    };
    const onTouchEnd = () => setIsDragging(false);
    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseup", onUp);
    window.addEventListener("touchmove", onTouchMove, { passive: false });
    window.addEventListener("touchend", onTouchEnd);
    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseup", onUp);
      window.removeEventListener("touchmove", onTouchMove);
      window.removeEventListener("touchend", onTouchEnd);
    };
  }, [isDragging, getPct, duration]);

  const progress = duration > 0 ? (currentTime / duration) * 100 : 0;

  return (
    <div ref={containerRef} className="fixed bottom-6 right-6 z-40 flex flex-col items-end gap-2.5">
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            key="player"
            initial={{ opacity: 0, y: 12, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.96 }}
            transition={{ type: "spring", stiffness: 320, damping: 30 }}
            onTouchMove={(e) => e.stopPropagation()}
            className="w-68 rounded-3xl bg-card/98 backdrop-blur-xl border border-border/50 shadow-2xl shadow-black/10 overflow-hidden"
          >
            {/* Header — state-aware */}
            <div className="flex items-center justify-between px-4 pt-3.5 pb-0">
              <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-primary/70">
                {isPlaying ? (
                  <>
                    <EqBars />
                    <span>{t("now_playing")}</span>
                  </>
                ) : (
                  <>
                    <span className="text-muted-foreground/50">♪</span>
                    <span className="text-muted-foreground/60">{t("paused")}</span>
                  </>
                )}
              </div>
              <button
                onClick={() => setIsExpanded(false)}
                className="p-1.5 -mr-1 rounded-full hover:bg-muted transition-colors text-muted-foreground hover:text-foreground cursor-pointer"
                aria-label={t("collapse")}
              >
                <ChevronDown className="h-3.5 w-3.5" />
              </button>
            </div>

            {/* Album art */}
            <div className="px-5 pt-3 pb-3 flex justify-center">
              <div className={cn(
                "relative w-36 h-36 rounded-2xl overflow-hidden shadow-lg transition-all duration-500",
                isPlaying ? "shadow-primary/20 ring-2 ring-primary/25 shadow-xl" : "shadow-black/10"
              )}>
                <Image
                  src={TRACK.cover}
                  alt={TRACK.title}
                  fill
                  className={cn(
                    "object-cover transition-transform duration-700",
                    isPlaying ? "scale-105" : "scale-100"
                  )}
                  sizes="144px"
                  priority
                />
                {!isPlaying && <div className="absolute inset-0 bg-black/15" />}
              </div>
            </div>

            {/* Track info */}
            <div className="px-5 text-center mb-3">
              <p className="font-bold text-sm text-foreground leading-snug truncate">{TRACK.title}</p>
              <p className="text-xs text-muted-foreground mt-0.5 truncate">{t("artist")}</p>
            </div>

            {/* Progress — draggable */}
            <div className="px-5 mb-1 select-none">
              {/* Hit area: fixed height so layout never shifts on hover */}
              <div
                ref={progressRef}
                onMouseDown={handleProgressMouseDown}
                onTouchStart={handleProgressTouchStart}
                className={cn(
                  "relative h-4 flex items-center group",
                  isDragging ? "cursor-grabbing" : "cursor-pointer"
                )}
                style={isDragging ? { touchAction: "none" } : undefined}
              >
                {/* Visual bar: thin by default, thickens on hover/drag */}
                <div className={cn(
                  "absolute inset-x-0 rounded-full bg-muted transition-all duration-150",
                  isDragging ? "h-1.5" : "h-1 group-hover:h-1.5"
                )}>
                  <div
                    className="absolute inset-y-0 left-0 rounded-full bg-linear-to-r from-primary to-[#5B8FE8]"
                    style={{ width: `${progress}%` }}
                  />
                </div>
                {/* Thumb */}
                <div
                  className={cn(
                    "absolute top-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-primary shadow-sm transition-opacity",
                    isDragging ? "opacity-100 scale-125" : "opacity-60 group-hover:opacity-100"
                  )}
                  style={{ left: `clamp(0px, calc(${progress}% - 6px), calc(100% - 12px))` }}
                />
              </div>
              <div className="flex justify-between text-[10px] text-muted-foreground/60 mt-1.5 tabular-nums">
                <span>{formatTime(currentTime)}</span>
                <span>{formatTime(duration)}</span>
              </div>
            </div>

            {/* Controls: mute + play/pause */}
            <div className="px-5 pb-4 flex items-center justify-between">
              {/* Mute toggle */}
              <button
                onClick={toggleMute}
                className="p-2 rounded-full hover:bg-muted transition-colors text-muted-foreground hover:text-foreground cursor-pointer"
                aria-label={isMuted ? t("unmute") : t("mute")}
              >
                {isMuted
                  ? <VolumeX className="h-4 w-4" />
                  : <Volume2 className="h-4 w-4" />
                }
              </button>

              {/* Play / Pause */}
              <button
                onClick={togglePlay}
                className={cn(
                  "w-11 h-11 rounded-full flex items-center justify-center transition-all duration-200 cursor-pointer",
                  "bg-primary hover:bg-primary/90 text-primary-foreground shadow-md",
                  isPlaying && "shadow-lg shadow-primary/25"
                )}
                aria-label={isPlaying ? t("pause") : t("play")}
              >
                {isPlaying ? (
                  <svg viewBox="0 0 24 24" className="h-4 w-4 fill-current">
                    <rect x="6" y="4" width="4" height="16" rx="1" />
                    <rect x="14" y="4" width="4" height="16" rx="1" />
                  </svg>
                ) : (
                  <svg viewBox="0 0 24 24" className="h-4 w-4 fill-current">
                    <path d="M8 5.14v14l11-7-11-7z" />
                  </svg>
                )}
              </button>

              {/* Spacer to balance mute button */}
              <div className="w-8" />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Collapsed pill */}
      <motion.button
        onClick={() => setIsExpanded((v) => !v)}
        onHoverStart={() => setIsPillHovered(true)}
        onHoverEnd={() => setIsPillHovered(false)}
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.97 }}
        className={cn(
          "flex items-center gap-2 pl-3 pr-3 h-9 rounded-full min-w-0 cursor-pointer",
          "bg-card/95 backdrop-blur-xl border shadow-lg transition-all duration-300",
          isExpanded || isPlaying
            ? "border-primary/35 shadow-primary/10"
            : "border-border/60 shadow-black/5 hover:border-primary/25"
        )}
      >
        {/* Indicator: eq bars when playing (compact until hovered), static dot when not */}
        {isPlaying ? (
          <EqBars compact={!isPillHovered} />
        ) : (
          <span className="w-2 h-2 rounded-full bg-muted-foreground/35 shrink-0" />
        )}

        <span className="text-xs font-medium text-foreground/75 whitespace-nowrap max-w-[110px] truncate">
          {isPlaying ? TRACK.title : t("picks")}
        </span>

        {/* Mini cover */}
        <div className="relative w-5 h-5 rounded shrink-0 overflow-hidden">
          <Image src={TRACK.cover} alt="" fill className="object-cover" sizes="20px" />
        </div>
      </motion.button>
    </div>
  );
};
