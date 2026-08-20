"use client";

import { useKonamiCode } from "@/hooks/use-konami-code";
import { useTypingSequence } from "@/hooks/use-typing-sequence";
import confetti from "canvas-confetti";
import { useEffect, useRef } from "react";

const CONGBDAY_COLORS = ["#C8E645", "#FFE566", "#5B8FE8", "#F5B8CC", "#FF8C42"];
const IDLE_MS = 30_000;
const STAR_INTERVAL_MS = 480;

function fireConfetti() {
  confetti({ particleCount: 120, spread: 80, origin: { y: 0.6 }, colors: CONGBDAY_COLORS });
  setTimeout(() => {
    confetti({ particleCount: 80, angle: 60, spread: 55, origin: { x: 0, y: 0.65 }, colors: CONGBDAY_COLORS });
    confetti({ particleCount: 80, angle: 120, spread: 55, origin: { x: 1, y: 0.65 }, colors: CONGBDAY_COLORS });
  }, 300);
}

function spawnIdleStar() {
  const el = document.createElement("span");
  el.textContent = "★";
  const size = 12 + Math.random() * 16;
  const x = Math.random() * window.innerWidth;
  const duration = 3 + Math.random() * 1.5;
  const color = CONGBDAY_COLORS[Math.floor(Math.random() * CONGBDAY_COLORS.length)];
  el.style.cssText = `
    position:fixed;left:${x}px;bottom:-20px;font-size:${size}px;
    color:${color};pointer-events:none;z-index:9990;user-select:none;
    animation:star-drift-up ${duration}s ease-out forwards;
  `;
  document.body.appendChild(el);
  setTimeout(() => el.remove(), (duration + 0.5) * 1000);
}

export const EasterEgg = () => {
  const { triggered: konamiTriggered } = useKonamiCode();
  const congbdayTriggered = useTypingSequence("congbday");
  const idleTimerRef = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  const spawnIntervalRef = useRef<ReturnType<typeof setInterval> | undefined>(undefined);

  useEffect(() => {
    if (!konamiTriggered) return;
    fireConfetti();
  }, [konamiTriggered]);

  useEffect(() => {
    if (!congbdayTriggered) return;
    fireConfetti();
    setTimeout(fireConfetti, 700);
  }, [congbdayTriggered]);

  // Idle screensaver
  useEffect(() => {
    const startSpawning = () => {
      clearInterval(spawnIntervalRef.current);
      spawnIntervalRef.current = setInterval(spawnIdleStar, STAR_INTERVAL_MS);
    };

    const stopSpawning = () => clearInterval(spawnIntervalRef.current);

    const resetIdle = () => {
      stopSpawning();
      clearTimeout(idleTimerRef.current);
      idleTimerRef.current = setTimeout(startSpawning, IDLE_MS);
    };

    const EVENTS = ["mousemove", "mousedown", "keydown", "touchstart", "scroll"] as const;
    EVENTS.forEach((e) => window.addEventListener(e, resetIdle, { passive: true }));
    resetIdle();

    return () => {
      stopSpawning();
      clearTimeout(idleTimerRef.current);
      EVENTS.forEach((e) => window.removeEventListener(e, resetIdle));
    };
  }, []);

  if (!konamiTriggered && !congbdayTriggered) return null;

  const isCongbday = congbdayTriggered;

  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[9999] animate-in fade-in slide-in-from-bottom-4 duration-300">
      <div className="px-5 py-3 rounded-2xl bg-card border border-primary/30 shadow-lg text-sm font-semibold text-foreground flex items-center gap-2 whitespace-nowrap">
        {isCongbday ? (
          <>
            <span>🎵</span>
            <span>CONGBDAY mode activated! / Chế độ CONGBDAY đã mở!</span>
            <span>🌟</span>
          </>
        ) : (
          <>
            <span>🎉</span>
            <span>Bạn vừa mở khóa chế độ vui vẻ! / You found the secret!</span>
            <span>✨</span>
          </>
        )}
      </div>
    </div>
  );
};
