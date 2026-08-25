"use client";

import { cn } from "@/lib/utils";
import { AnimatePresence, type AnimationPlaybackControls, PanInfo, animate, motion, useDragControls, useMotionValue } from "framer-motion";
import { ChevronDown, Volume2, VolumeX } from "lucide-react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { useCallback, useEffect, useRef, useState } from "react";

type Corner = "br" | "bl" | "tr" | "tl";

const CORNER_CLASS: Record<Corner, string> = {
  br: "bottom-6 right-6 flex-col items-end",
  bl: "bottom-6 left-6 flex-col items-start",
  tr: "top-20 right-6 flex-col-reverse items-end",
  tl: "top-20 left-6 flex-col-reverse items-start",
};

const TRACK = {
  src: "/music/congbday.mp3",
  title: "Nhớ Em 8 Lần",
  artist: "CONGB ft. Mason Nguyen & TEZ",
  cover: "/images/congbday_theme.png",
  // 1×1 px placeholder matching the album's dominant blue (#5B8FE8)
  blurDataURL: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAIAAACQd1PeAAAADElEQVR4nGOI7n8BAAMbAdMfi3rWAAAAAElFTkSuQmCC",
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
  const isDraggingPlayerRef = useRef(false);

  const [corner, setCorner] = useState<Corner>("br");
  const [isExpanded, setIsExpanded] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isMuted, setIsMuted] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [isPillHovered, setIsPillHovered] = useState(false);
  const [albumPhase, setAlbumPhase] = useState<"sleeved" | "disc">("sleeved");
  const [hasEverPlayed, setHasEverPlayed] = useState(false);

  const dragX = useMotionValue(0);
  const dragY = useMotionValue(0);
  const discRotation = useMotionValue(0);
  // In "sleeved" state, disc is offset right so sleeve+disc are centered as a unit
  const discX = useMotionValue(36);
  const controls = useDragControls();
  const hasRevealedRef = useRef(false);
  const spinAnimRef = useRef<AnimationPlaybackControls | null>(null);
  const isSpinningRef = useRef(false);
  const isPlayingRef = useRef(false);

  useEffect(() => {
    const audio = new Audio(TRACK.src);
    audio.preload = "metadata";
    audio.onloadedmetadata = () => setDuration(audio.duration);
    audio.ontimeupdate = () => setCurrentTime(audio.currentTime);
    audio.onended = () => setIsPlaying(false);
    audioRef.current = audio;
    return () => { audio.pause(); audio.src = ""; };
  }, []);

  // Close on outside click — skip during player drag
  useEffect(() => {
    if (!isExpanded) return;
    const handler = (e: MouseEvent | TouchEvent) => {
      if (isDraggingPlayerRef.current) return;
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsExpanded(false);
      }
    };
    document.addEventListener("mousedown", handler);
    document.addEventListener("touchstart", handler);
    return () => {
      document.removeEventListener("mousedown", handler);
      document.removeEventListener("touchstart", handler);
    };
  }, [isExpanded]);

  const handleDragStart = useCallback(() => {
    isDraggingPlayerRef.current = true;
  }, []);

  const handleDragEnd = useCallback((_: PointerEvent, info: PanInfo) => {
    const vw = window.innerWidth;
    const vh = window.innerHeight;
    const isRight = info.point.x > vw / 2;
    const isBottom = info.point.y - window.scrollY > vh / 2;
    const newCorner: Corner = `${isBottom ? "b" : "t"}${isRight ? "r" : "l"}` as Corner;
    setCorner(newCorner);
    animate(dragX, 0, { type: "spring", stiffness: 500, damping: 35 });
    animate(dragY, 0, { type: "spring", stiffness: 500, damping: 35 });
    setTimeout(() => { isDraggingPlayerRef.current = false; }, 100);
  }, [dragX, dragY]);

  const togglePlay = useCallback(() => {
    const audio = audioRef.current;
    if (!audio) return;
    if (isPlaying) {
      audio.pause();
      setIsPlaying(false);
    } else {
      if (!hasRevealedRef.current) {
        // First play: slide sleeve out first, then start audio + spin
        hasRevealedRef.current = true;
        setAlbumPhase("disc");
        setTimeout(() => {
          audio.play().then(() => setIsPlaying(true)).catch(() => {});
        }, 680); // after sleeve exits (520ms) + disc settles to center (300+320ms)
      } else {
        audio.play().then(() => setIsPlaying(true)).catch(() => {});
      }
    }
  }, [isPlaying]);

  // startSpin(rampUp=true): ramp from 0→normal speed on first loop, then linear.
  // rampUp=false: skip ramp (used after boost, which already ends at normal speed).
  const startSpin = useCallback((rampUp = true) => {
    const start = discRotation.get();
    spinAnimRef.current?.stop();
    isSpinningRef.current = true;

    const loop = (from: number) => {
      spinAnimRef.current = animate(discRotation, from + 360, {
        duration: 2.4,
        ease: "linear",
        from,
        onComplete: () => { if (isSpinningRef.current) loop(discRotation.get()); },
      });
    };

    if (rampUp) {
      // Ease [0.3,0,0.7,0.7]: slope=0 at t=0 (starts slow), slope=1 at t=1 (normal speed).
      // This makes the ramp-up end at exactly 150 deg/s so the loop chain is seamless.
      spinAnimRef.current = animate(discRotation, start + 360, {
        duration: 2.4,
        ease: [0.3, 0, 0.7, 0.7],
        from: start,
        onComplete: () => { if (isSpinningRef.current) loop(discRotation.get()); },
      });
    } else {
      loop(start);
    }
  }, [discRotation]);

  const stopSpin = useCallback(() => {
    if (!isSpinningRef.current) return;
    isSpinningRef.current = false;
    const current = discRotation.get();
    spinAnimRef.current?.stop();
    const remaining = (360 - (current % 360)) % 360;
    const target = current + (remaining < 5 ? remaining + 360 : remaining);
    // Duration ∝ remaining degrees so initial velocity = 150 deg/s (normal speed).
    // ease [0.3,0.3,0.7,1]: slope=1 at t=0 (matches spin speed) → decelerates to 0.
    spinAnimRef.current = animate(discRotation, target, {
      duration: (target - current) / 150,
      ease: [0.3, 0.3, 0.7, 1],
      from: current,
    });
  }, [discRotation]);

  // Drive spin from isPlaying — reveal is handled in togglePlay with delay
  useEffect(() => {
    isPlayingRef.current = isPlaying;
    if (isPlaying) {
      setHasEverPlayed(true);
      startSpin();
    } else {
      stopSpin();
    }
  }, [isPlaying, startSpin, stopSpin]);

  // Restart spin when panel is reopened while audio is playing.
  // The disc unmounts with the panel, losing its connection to the running animation.
  useEffect(() => {
    if (isExpanded && isPlayingRef.current) {
      startSpin(false); // no ramp-up — disc was already at speed
    }
  }, [isExpanded, startSpin]);

  // Animate disc to center after sleeve exits; reset offset if somehow re-sleeved
  useEffect(() => {
    if (albumPhase === "disc") {
      // Sleeve exits in 0.52s; disc settles into center starting at 0.3s
      animate(discX, 0, { duration: 0.32, ease: [0.32, 0, 0.67, 0], delay: 0.28 });
    } else {
      discX.set(36);
    }
  }, [albumPhase, discX]);

  useEffect(() => () => { spinAnimRef.current?.stop(); }, []);

  // Easter egg: double-click disc → fast spin burst, then resume normal loop
  const handleAlbumDoubleClick = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!isPlaying) return;
    spinAnimRef.current?.stop();
    isSpinningRef.current = true;
    const from = discRotation.get();
    // Ease ends at ~normal loop speed (360/2.4s) so startSpin picks up seamlessly:
    // slope at t=1 = (1-0.917)/(1-0.7) ≈ 0.277 ≈ loop_speed/boost_speed
    spinAnimRef.current = animate(discRotation, from + 1080, {
      duration: 2.0,
      ease: [0.05, 0.8, 0.7, 0.917],
      from,
      onComplete: () => { if (isSpinningRef.current) startSpin(false); },
    });

    const rect = e.currentTarget.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const symbols = ["♪", "♫", "★", "♩", "♬"];
    const colors = ["#C8E645", "#FFE566", "#5B8FE8", "#F5B8CC", "#FF8C42"];
    for (let i = 0; i < 10; i++) {
      setTimeout(() => {
        const el = document.createElement("span");
        el.textContent = symbols[Math.floor(Math.random() * symbols.length)];
        const color = colors[Math.floor(Math.random() * colors.length)];
        const size = 14 + Math.random() * 14;
        const angle = (i / 10) * Math.PI * 2 + Math.random() * 0.5;
        const dist = 35 + Math.random() * 45;
        const tx = Math.cos(angle) * dist;
        const ty = Math.sin(angle) * dist;
        el.style.cssText = `
          position:fixed;left:${cx}px;top:${cy}px;
          pointer-events:none;z-index:9999;font-size:${size}px;color:${color};
          transform:translate(-50%,-50%);user-select:none;line-height:1;
        `;
        document.body.appendChild(el);
        requestAnimationFrame(() => requestAnimationFrame(() => {
          el.style.transition = "transform 0.7s ease-out, opacity 0.5s ease-out 0.15s";
          el.style.transform = `translate(calc(-50% + ${tx}px), calc(-50% + ${ty}px)) scale(0)`;
          el.style.opacity = "0";
        }));
        setTimeout(() => el.remove(), 1000);
      }, i * 45);
    }
  }, [isPlaying, discRotation, startSpin]);

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
  const isTopCorner = corner.startsWith("t");

  return (
    <motion.div
      ref={containerRef as React.RefObject<HTMLDivElement>}
      drag
      dragMomentum={false}
      dragElastic={0.05}
      dragControls={controls}
      dragListener={false}
      style={{ x: dragX, y: dragY, touchAction: "none" }}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      className={cn("fixed z-40 flex gap-2.5", CORNER_CLASS[corner])}
    >
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            key="player"
            initial={{ opacity: 0, y: isTopCorner ? -12 : 12, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: isTopCorner ? -12 : 12, scale: 0.96 }}
            transition={{ type: "spring", stiffness: 320, damping: 30 }}
            onTouchMove={(e) => e.stopPropagation()}
            style={{ touchAction: "none" }}
            className="w-68 rounded-3xl bg-card/98 backdrop-blur-xl border border-border/50 shadow-2xl shadow-black/10 overflow-hidden cursor-default"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-4 pt-3.5 pb-0">
              <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-primary/70">
                {isPlaying ? (
                  <><EqBars /><span>{t("now_playing")}</span></>
                ) : (
                  <><span className="text-muted-foreground/50">♪</span><span className="text-muted-foreground/60">{t("paused")}</span></>
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

            {/* Album art: disc always behind, square sleeve slides left on first play */}
            <div className="px-5 pt-3 pb-3 flex justify-center">
              <div className="relative w-36 h-36 select-none rounded-full bg-[#5B8FE8]">

                {/* Disc — always rendered, circular.
                    In sleeved state: discX=36 (offset right so sleeve+disc are centered together).
                    On play: sleeve exits, disc animates to discX=0 (true centre), then spins. */}
                <motion.div
                  className={cn("absolute inset-0", isPlaying && albumPhase === "disc" && "cursor-pointer")}
                  onDoubleClick={albumPhase === "disc" ? handleAlbumDoubleClick : undefined}
                  style={{
                    x: discX,
                    clipPath: "inset(0 round 50%)",
                    filter: isPlaying && albumPhase === "disc"
                      ? "drop-shadow(0 0 12px oklch(0.87 0.20 128 / 40%)) drop-shadow(0 4px 16px rgba(0,0,0,0.20))"
                      : "drop-shadow(0 3px 10px rgba(0,0,0,0.25))",
                    transition: "filter 0.4s ease",
                  }}
                >
                  <motion.div className="absolute inset-0" style={{ rotate: discRotation }}>
                    <Image src={TRACK.cover} alt={TRACK.title} fill className="object-cover" sizes="144px" priority placeholder="blur" blurDataURL={TRACK.blurDataURL} draggable={false} />
                    <div
                      className="absolute inset-0 pointer-events-none"
                      style={{
                        background: "repeating-radial-gradient(circle at 50% 50%, transparent 22%, rgba(0,0,0,0.07) 23%, transparent 24%, transparent 32%, rgba(0,0,0,0.07) 33%, transparent 34%)",
                      }}
                    />
                  </motion.div>
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <div className="w-10 h-10 rounded-full bg-card/90 shadow-md flex items-center justify-center">
                      <div className="w-3 h-3 rounded-full bg-muted-foreground/25" />
                    </div>
                  </div>
                  {/* Dim overlay — only after first play; fades in/out with filter */}
                  <div
                    className="absolute inset-0 pointer-events-none"
                    style={{
                      backgroundColor: "rgba(0,0,0,0.15)",
                      opacity: hasEverPlayed && !isPlaying ? 1 : 0,
                      transition: "opacity 0.5s ease",
                    }}
                  />
                </motion.div>

                {/* Sleeve — 148×148 (4px bigger than disc on each side).
                    left:-40 so the combined (sleeve+disc) visual is centred in the panel.
                    Notch R=20 at local (148,74) = container (108,72) = disc centre when offset.
                    Slides left on first play, then disc animates to true centre. */}
                <AnimatePresence>
                  {albumPhase === "sleeved" && (
                    <motion.div
                      key="sleeve"
                      className="absolute z-10"
                      exit={{ x: -200 }}
                      transition={{ duration: 0.52, ease: [0.32, 0, 0.67, 0] }}
                      style={{
                        left: -40,
                        top: -2,
                        width: 148,
                        height: 148,
                        // Local (0,0)..(148,148). Notch R=20 at right edge mid-height (148,74).
                        clipPath: 'path("M 0,0 L 148,0 L 148,54 A 20,20 0 0,0 148,94 L 148,148 L 0,148 Z")',
                        filter: "drop-shadow(3px 0 10px rgba(0,0,0,0.32))",
                      }}
                    >
                      <Image
                        src={TRACK.cover}
                        alt={TRACK.title}
                        fill
                        className="object-cover"
                        sizes="148px"
                        priority
                        placeholder="blur"
                        blurDataURL={TRACK.blurDataURL}
                        draggable={false}
                      />
                      {/* Sheen overlay */}
                      <div
                        className="absolute inset-0 pointer-events-none"
                        style={{
                          background: "linear-gradient(135deg, rgba(255,255,255,0.14) 0%, transparent 50%, rgba(0,0,0,0.08) 100%)",
                        }}
                      />
                      {/* Left edge highlight */}
                      <div
                        className="absolute inset-y-0 left-0 w-1 pointer-events-none"
                        style={{ background: "linear-gradient(to right, rgba(255,255,255,0.24), transparent)" }}
                      />
                      {/* Right edge shadow for depth */}
                      <div
                        className="absolute inset-y-0 right-0 w-8 pointer-events-none"
                        style={{ background: "linear-gradient(to left, rgba(0,0,0,0.20), transparent)" }}
                      />
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>

            {/* Track info */}
            <div className="px-5 text-center mb-3">
              <p className="font-bold text-sm text-foreground leading-snug truncate">{TRACK.title}</p>
              <p className="text-xs text-muted-foreground mt-0.5 truncate">{TRACK.artist}</p>
            </div>

            {/* Progress */}
            <div className="px-5 mb-1 select-none">
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
                <div className={cn(
                  "absolute inset-x-0 rounded-full bg-muted transition-all duration-150",
                  isDragging ? "h-1.5" : "h-1 group-hover:h-1.5"
                )}>
                  <div
                    className="absolute inset-y-0 left-0 rounded-full bg-linear-to-r from-primary to-[#5B8FE8]"
                    style={{ width: `${progress}%` }}
                  />
                </div>
                <div
                  className={cn(
                    "absolute top-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-primary shadow-sm ring-2 ring-card transition-[opacity,transform] duration-150",
                    isDragging ? "opacity-100 scale-125" : "opacity-100"
                  )}
                  style={{ left: `clamp(0px, calc(${progress}% - 6px), calc(100% - 12px))` }}
                />
              </div>
              <div className="flex justify-between text-[10px] text-muted-foreground/60 mt-1.5 tabular-nums">
                <span>{formatTime(currentTime)}</span>
                <span>{formatTime(duration)}</span>
              </div>
            </div>

            {/* Controls */}
            <div className="px-5 pb-4 flex items-center justify-between">
              <button
                onClick={toggleMute}
                className="select-none p-2 rounded-full hover:bg-muted transition-colors text-muted-foreground hover:text-foreground cursor-pointer"
                aria-label={isMuted ? t("unmute") : t("mute")}
              >
                {isMuted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
              </button>
              <button
                onClick={togglePlay}
                className={cn(
                  "select-none w-11 h-11 rounded-full flex items-center justify-center transition-all duration-200 cursor-pointer",
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
              <div className="w-8" />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Pill — also the drag handle */}
      <motion.button
        onPointerDown={(e) => controls.start(e)}
        onClick={() => { if (!isDraggingPlayerRef.current) setIsExpanded((v) => !v); }}
        onHoverStart={() => setIsPillHovered(true)}
        onHoverEnd={() => setIsPillHovered(false)}
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.97 }}
        className={cn(
          "select-none flex items-center gap-2 pl-3 pr-3 h-9 rounded-full min-w-0 cursor-grab active:cursor-grabbing",
          "bg-card/95 backdrop-blur-xl border shadow-lg transition-all duration-300",
          isExpanded || isPlaying
            ? "border-primary/35 shadow-primary/10"
            : "border-border/60 shadow-black/5 hover:border-primary/25"
        )}
      >
        {isPlaying ? (
          <EqBars compact={!isPillHovered} />
        ) : (
          <span className="w-2 h-2 rounded-full bg-muted-foreground/35 shrink-0" />
        )}
        <span className="text-xs font-medium text-foreground/75 whitespace-nowrap max-w-[110px] truncate">
          {isPlaying ? TRACK.title : t("picks")}
        </span>
        <div className="relative w-5 h-5 rounded shrink-0 overflow-hidden">
          <Image src={TRACK.cover} alt="" fill className="object-cover" sizes="20px" priority placeholder="blur" blurDataURL={TRACK.blurDataURL} draggable={false} />
        </div>
      </motion.button>
    </motion.div>
  );
};
