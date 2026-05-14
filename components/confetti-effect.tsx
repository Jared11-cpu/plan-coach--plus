"use client";

import { useEffect } from "react";
import confetti from "canvas-confetti";

interface ConfettiEffectProps {
  trigger?: number;
}

export function ConfettiEffect({ trigger }: ConfettiEffectProps) {
  useEffect(() => {
    if (!trigger) return;

    const choices = [
      () =>
        confetti({
          particleCount: 90,
          spread: 72,
          origin: { y: 0.64 },
          colors: ["#14b8a6", "#22c55e", "#f59e0b", "#0f172a"]
        }),
      () => {
        confetti({ particleCount: 50, angle: 60, spread: 55, origin: { x: 0, y: 0.78 } });
        confetti({ particleCount: 50, angle: 120, spread: 55, origin: { x: 1, y: 0.78 } });
      },
      () =>
        confetti({
          particleCount: 140,
          startVelocity: 38,
          spread: 110,
          ticks: 180,
          scalar: 0.84,
          origin: { y: 0.72 }
        })
    ];

    choices[Math.floor(Math.random() * choices.length)]();
  }, [trigger]);

  return null;
}
