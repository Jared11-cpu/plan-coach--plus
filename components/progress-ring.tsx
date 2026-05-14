"use client";

import { motion } from "framer-motion";
import { formatPercent } from "@/lib/utils";

interface ProgressRingProps {
  value: number;
  label?: string;
  size?: number;
  stroke?: number;
}

export function ProgressRing({ value, label = "今日完成率", size = 210, stroke = 16 }: ProgressRingProps) {
  const radius = (size - stroke) / 2;
  const circumference = 2 * Math.PI * radius;
  const progress = Math.max(0, Math.min(value, 100));

  return (
    <div className="relative flex items-center justify-center" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="-rotate-90">
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="rgba(15, 23, 42, 0.08)"
          strokeWidth={stroke}
        />
        <motion.circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="url(#progress-gradient)"
          strokeWidth={stroke}
          strokeLinecap="round"
          strokeDasharray={circumference}
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset: circumference - (progress / 100) * circumference }}
          transition={{ duration: 0.9, ease: "easeOut" }}
        />
        <defs>
          <linearGradient id="progress-gradient" x1="0" x2="1" y1="0" y2="1">
            <stop offset="0%" stopColor="#14b8a6" />
            <stop offset="54%" stopColor="#22c55e" />
            <stop offset="100%" stopColor="#f59e0b" />
          </linearGradient>
        </defs>
      </svg>
      <div className="absolute text-center">
        <motion.div
          key={progress}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-5xl font-black tracking-tight text-slate-950"
        >
          {formatPercent(progress)}
        </motion.div>
        <p className="mt-2 text-base font-bold text-slate-500">{label}</p>
      </div>
    </div>
  );
}
