import { useEffect, useState } from "react";

export function useTypingSequence(sequence: string): boolean {
  const [buffer, setBuffer] = useState("");
  const [triggered, setTriggered] = useState(false);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key.length !== 1 || e.ctrlKey || e.metaKey || e.altKey) return;
      setBuffer((prev) => {
        const next = (prev + e.key.toLowerCase()).slice(-sequence.length);
        if (next === sequence) {
          setTriggered(true);
          setTimeout(() => setTriggered(false), 6000);
        }
        return next;
      });
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [sequence]);

  return triggered;
}
