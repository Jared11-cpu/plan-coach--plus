"use client";

import { motion } from "framer-motion";
import { ArrowDown } from "lucide-react";
import type { PlanTask } from "@/types";

interface NextTaskPreviewProps {
  task?: PlanTask;
}

export function NextTaskPreview({ task }: NextTaskPreviewProps) {
  if (!task) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 0.82, y: 0 }}
      className="pointer-events-none mx-auto -mt-8 flex w-[min(92%,760px)] items-center justify-between rounded-b-[2.4rem] border border-t-0 border-[#e3d9c9] bg-[#ede4d8]/78 px-8 pb-6 pt-12 text-[#766c60] shadow-[0_18px_55px_rgba(43,38,30,0.07)]"
      data-testid="next-task-preview"
    >
      <div>
        <p className="text-xs font-black uppercase tracking-[0.24em]">下一张任务卡</p>
        <p className="mt-2 line-clamp-1 text-xl font-black tracking-[-0.04em]">{task.title}</p>
      </div>
      <ArrowDown className="h-6 w-6" />
    </motion.div>
  );
}
