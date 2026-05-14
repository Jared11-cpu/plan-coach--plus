"use client";

import { motion } from "framer-motion";
import { BadgeCheck, Brain, CheckCircle2, CircleDot, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";
import type { ExecutionMapNode } from "@/types";

interface MindMapNodeProps {
  node: ExecutionMapNode;
  selected?: boolean;
  onSelect: (id: string) => void;
}

const iconMap = {
  goal: Brain,
  task: CircleDot,
  miniTask: CheckCircle2,
  proof: BadgeCheck
};

export function MindMapNode({ node, selected, onSelect }: MindMapNodeProps) {
  const Icon = iconMap[node.type];
  const completed = node.status === "completed" || node.type === "proof";
  const isGoal = node.type === "goal";

  return (
    <motion.button
      type="button"
      data-testid={`map-node-${node.type}`}
      initial={{ opacity: 0, scale: 0.84, y: 12 }}
      animate={{ opacity: 1, scale: selected ? 1.04 : 1, y: 0 }}
      whileHover={{ scale: selected ? 1.04 : 1.03, y: -2 }}
      transition={{ type: "spring", stiffness: 260, damping: 22 }}
      onClick={() => onSelect(node.id)}
      className={cn(
        "absolute z-10 flex -translate-x-1/2 -translate-y-1/2 items-center gap-3 rounded-full border px-4 py-3 text-left shadow-[0_18px_55px_rgba(43,38,30,0.10)] backdrop-blur-xl transition",
        isGoal && "max-w-[330px] border-[#211f1c]/10 bg-[#211f1c] text-[#f8f3ea]",
        node.type === "task" && "max-w-[280px] border-[#e7ded1] bg-[#fbf7ef]/92 text-[#211f1c]",
        node.type === "miniTask" && "max-w-[230px] border-[#ded7cc] bg-white/82 text-[#4c463f]",
        node.type === "proof" && "max-w-[260px] border-[#cfe8df] bg-[#eef8f3]/95 text-[#123f39]",
        completed && node.type !== "goal" && "completed-glow",
        selected && "ring-4 ring-[#f6ca42]/45"
      )}
      style={{ left: `${node.x}%`, top: `${node.y}%` }}
    >
      <span
        className={cn(
          "flex h-10 w-10 shrink-0 items-center justify-center rounded-full",
          isGoal ? "bg-[#f8f3ea] text-[#211f1c]" : completed ? "bg-[#0f9f8c] text-white" : "bg-[#211f1c] text-[#f8f3ea]"
        )}
      >
        {node.type === "proof" ? <Sparkles className="h-5 w-5" /> : <Icon className="h-5 w-5" />}
      </span>
      <span className="min-w-0">
        <span className={cn("block truncate text-base font-black leading-tight", isGoal && "text-lg")}>{node.label}</span>
        {node.meta ? (
          <span className={cn("mt-1 block text-xs font-black uppercase tracking-[0.16em]", isGoal ? "text-[#d8c79a]" : "text-[#81796e]")}>
            {node.meta}
          </span>
        ) : null}
      </span>
    </motion.button>
  );
}
