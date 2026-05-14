"use client";

import { Check, Circle } from "lucide-react";
import { cn } from "@/lib/utils";
import type { PlanTask } from "@/types";

interface PunchProgressDotsProps {
  tasks: PlanTask[];
  activeIndex: number;
}

export function PunchProgressDots({ tasks, activeIndex }: PunchProgressDotsProps) {
  return (
    <div className="flex flex-wrap items-center justify-center gap-3" data-testid="punch-progress-dots">
      {tasks.map((task, index) => {
        const completed = task.status === "completed";
        const skipped = task.status === "skipped";
        const active = index === activeIndex;

        return (
          <div
            key={task.id}
            className={cn(
              "flex h-11 min-w-11 items-center justify-center rounded-full border px-3 text-sm font-black transition-all",
              completed && "border-[#4fbf8a] bg-[#dff5e9] text-[#126043] shadow-[0_10px_28px_rgba(42,139,92,0.16)]",
              skipped && "border-[#e1d5c4] bg-[#eee6da] text-[#8a7b68]",
              !completed && !skipped && "border-[#ded4c5] bg-[#fbf7ef] text-[#776d61]",
              active && "scale-110 border-[#211f1c] bg-[#211f1c] text-[#f8f3ea] shadow-[0_16px_42px_rgba(33,31,28,0.18)]"
            )}
            title={task.title}
          >
            {completed ? <Check className="h-5 w-5" /> : active ? index + 1 : <Circle className="h-4 w-4" />}
          </div>
        );
      })}
    </div>
  );
}
