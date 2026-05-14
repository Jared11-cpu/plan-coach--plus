"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import type { Mood } from "@/types";

const moods: Mood[] = ["很好", "一般", "很累", "很焦虑", "想放弃"];

interface MoodSelectorProps {
  value: Mood;
  onChange: (mood: Mood) => void;
}

export function MoodSelector({ value, onChange }: MoodSelectorProps) {
  return (
    <div className="grid gap-3 sm:grid-cols-5">
      {moods.map((mood) => {
        const active = mood === value;
        return (
          <motion.button
            whileTap={{ scale: 0.96 }}
            key={mood}
            type="button"
            onClick={() => onChange(mood)}
            className={cn(
              "relative rounded-3xl border px-5 py-6 text-xl font-black transition",
              active
                ? "border-slate-950 bg-slate-950 text-white shadow-xl shadow-slate-950/15"
                : "border-white/70 bg-white/65 text-slate-700 hover:bg-white"
            )}
          >
            {mood}
          </motion.button>
        );
      })}
    </div>
  );
}
