"use client";

import { useKonamiCode } from "@/hooks/use-konami-code";
import { useTypingSequence } from "@/hooks/use-typing-sequence";
import confetti from "canvas-confetti";
import { useEffect } from "react";

const CONGBDAY_COLORS = ["#C8E645", "#FFE566", "#5B8FE8", "#F5B8CC", "#FF8C42"];

function fireConfetti() {
  confetti({ particleCount: 120, spread: 80, origin: { y: 0.6 }, colors: CONGBDAY_COLORS });
  setTimeout(() => {
    confetti({ particleCount: 80, angle: 60, spread: 55, origin: { x: 0, y: 0.65 }, colors: CONGBDAY_COLORS });
    confetti({ particleCount: 80, angle: 120, spread: 55, origin: { x: 1, y: 0.65 }, colors: CONGBDAY_COLORS });
  }, 300);
}

export const EasterEgg = () => {
  const { triggered: konamiTriggered } = useKonamiCode();
  const congbdayTriggered = useTypingSequence("congbday");

  useEffect(() => {
    if (!konamiTriggered) return;
    fireConfetti();
  }, [konamiTriggered]);

  useEffect(() => {
    if (!congbdayTriggered) return;
    // Double burst for the special keyword
    fireConfetti();
    setTimeout(fireConfetti, 700);
  }, [congbdayTriggered]);

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
