"use client";

import { BadgeCheck, CheckCircle2, Clock3, Gauge, ListTree, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { ExecutionMapNode, PlanTask, ProofItem } from "@/types";

interface MapNodeDetailPanelProps {
  node?: ExecutionMapNode;
  task?: PlanTask;
  proof?: ProofItem;
  onComplete: (id: string) => void;
  onBreakDown: (id: string) => void;
}

export function MapNodeDetailPanel({ node, task, proof, onComplete, onBreakDown }: MapNodeDetailPanelProps) {
  if (!node) {
    return (
      <aside className="rounded-[2.5rem] border border-[#e7ded1] bg-[#fbf7ef]/82 p-8 shadow-[0_28px_90px_rgba(43,38,30,0.08)]">
        <Sparkles className="h-9 w-9 text-[#a08753]" />
        <h3 className="mt-8 text-4xl font-black leading-tight tracking-[-0.06em] text-[#211f1c]">
          选择一个节点，查看 AI 如何拆解它。
        </h3>
      </aside>
    );
  }

  const completed = task?.status === "completed";

  return (
    <aside className="rounded-[2.5rem] border border-[#e7ded1] bg-[#fbf7ef]/88 p-7 shadow-[0_28px_90px_rgba(43,38,30,0.09)] sm:p-8">
      <p className="inline-flex items-center gap-2 rounded-full bg-white/75 px-4 py-2 text-sm font-black uppercase tracking-[0.22em] text-[#81796e]">
        {node.type === "goal" ? <Sparkles className="h-4 w-4" /> : <BadgeCheck className="h-4 w-4" />}
        {node.type}
      </p>
      <h3 className="mt-7 text-4xl font-black leading-tight tracking-[-0.06em] text-[#211f1c]">{node.label}</h3>
      <p className="mt-5 text-xl font-bold leading-8 text-[#746b60]">{node.description}</p>

      {task ? (
        <div className="mt-7 grid gap-3">
          <div className="flex flex-wrap gap-3">
            <span className="inline-flex items-center rounded-full bg-white/75 px-4 py-2 text-base font-black text-[#4c463f]">
              <Clock3 className="mr-2 h-4 w-4" />
              {task.estimateMinutes} 分钟
            </span>
            <span className="inline-flex items-center rounded-full bg-white/75 px-4 py-2 text-base font-black text-[#4c463f]">
              <Gauge className="mr-2 h-4 w-4" />
              {task.difficulty}
            </span>
          </div>
          <div className="rounded-[1.75rem] bg-[#eef8f3] p-5 text-lg font-black leading-7 text-[#123f39]">
            AI 建议：{task.encouragement}
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            <Button
              size="lg"
              data-testid="map-complete-task"
              className="rounded-full bg-[#211f1c] text-lg text-[#f8f3ea] hover:bg-[#2e2a24]"
              disabled={completed}
              onClick={() => onComplete(task.id)}
            >
              <CheckCircle2 className="mr-2 h-5 w-5" />
              {completed ? "已生成 Proof" : "完成并生成 Proof"}
            </Button>
            <Button
              size="lg"
              variant="secondary"
              data-testid="map-break-task"
              className="rounded-full border border-[#e7ded1] bg-white/75 text-lg text-[#211f1c]"
              disabled={completed}
              onClick={() => onBreakDown(task.id)}
            >
              <ListTree className="mr-2 h-5 w-5" />
              拆小一点
            </Button>
          </div>
        </div>
      ) : null}

      {proof ? (
        <div className="mt-7 rounded-[1.75rem] bg-[#eef8f3] p-5 text-[#123f39]">
          <p className="text-sm font-black uppercase tracking-[0.22em] text-[#0f766e]">Proof Value</p>
          <p className="mt-3 text-xl font-black leading-8">{proof.value}</p>
          <p className="mt-4 text-lg font-bold leading-7">下一步：{proof.nextStep}</p>
        </div>
      ) : null}

      {node.type === "goal" ? (
        <div className="mt-7 rounded-[1.75rem] bg-[#fff6d8] p-5 text-xl font-black leading-8 text-[#4f3b10]">
          这张地图的重点不是展示任务数量，而是展示 AI 如何把一个感性的目标变成可执行、可证明、可讲述的路线。
        </div>
      ) : null}
    </aside>
  );
}
