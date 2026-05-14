"use client";

import { motion } from "framer-motion";
import type { ExecutionMapEdge, ExecutionMapNode } from "@/types";

interface MindMapEdgeProps {
  edge: ExecutionMapEdge;
  source?: ExecutionMapNode;
  target?: ExecutionMapNode;
}

export function MindMapEdge({ edge, source, target }: MindMapEdgeProps) {
  if (!source || !target) return null;

  const completed = edge.status === "completed";
  const active = edge.status === "active";

  return (
    <motion.line
      initial={{ pathLength: 0, opacity: 0 }}
      animate={{ pathLength: 1, opacity: completed ? 0.85 : active ? 0.68 : 0.34 }}
      transition={{ duration: 0.7, ease: "easeOut" }}
      x1={`${source.x}%`}
      y1={`${source.y}%`}
      x2={`${target.x}%`}
      y2={`${target.y}%`}
      stroke={completed ? "#0f9f8c" : active ? "#a08753" : "#8d8378"}
      strokeDasharray={completed ? "0" : "7 10"}
      strokeLinecap="round"
      strokeWidth={completed ? 3 : 2}
    />
  );
}
