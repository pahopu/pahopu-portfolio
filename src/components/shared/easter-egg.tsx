"use client";

import { useKonamiCode } from "@/hooks/use-konami-code";
import confetti from "canvas-confetti";
import { useEffect } from "react";

const CONGBDAY_COLORS = ["#C8E645", "#FFE566", "#5B8FE8", "#F5B8CC", "#FF8C42"];

export const EasterEgg = () => {
  const triggered = useKonamiCode();

  useEffect(() => {
    if (!triggered) return;

    confetti({
      particleCount: 120,
      spread: 80,
      origin: { y: 0.6 },
      colors: CONGBDAY_COLORS,
    });
    setTimeout(() => {
      confetti({
        particleCount: 80,
        angle: 60,
        spread: 55,
        origin: { x: 0, y: 0.65 },
        colors: CONGBDAY_COLORS,
      });
      confetti({
        particleCount: 80,
        angle: 120,
        spread: 55,
        origin: { x: 1, y: 0.65 },
        colors: CONGBDAY_COLORS,
      });
    }, 300);
  }, [triggered]);

  if (!triggered) return null;

  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[9999] animate-in fade-in slide-in-from-bottom-4 duration-300">
      <div className="px-5 py-3 rounded-2xl bg-card border border-primary/30 shadow-lg text-sm font-semibold text-foreground flex items-center gap-2 whitespace-nowrap">
        <span>🎉</span>
        <span>Bạn vừa mở khóa chế độ vui vẻ! / You found the secret!</span>
        <span>✨</span>
      </div>
    </div>
  );
};
