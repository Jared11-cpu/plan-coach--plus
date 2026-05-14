"use client";

import { motion } from "framer-motion";
import { CheckCircle2, Clock3, Gauge, ListTree, SkipForward } from "lucide-react";
import { BigButton } from "@/components/big-button";
import { CompletionAnimation } from "@/components/completion-animation";
import { GlassCard } from "@/components/glass-card";
import { MiniTaskBreakdown } from "@/components/mini-task-breakdown";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { PlanTask } from "@/types";

interface BigTaskCardProps {
  task: PlanTask;
  activePulse?: boolean;
  onComplete: (id: string) => void;
  onSkip: (id: string) => void;
  onBreakDown: (id: string) => void;
}

export function BigTaskCard({ task, activePulse, onComplete, onSkip, onBreakDown }: BigTaskCardProps) {
  const completed = task.status === "completed";
  const skipped = task.status === "skipped";

  return (
    <motion.div
      layout
      animate={activePulse ? { scale: [1, 1.025, 1] } : { scale: 1 }}
      transition={{ duration: 0.55, ease: "easeOut" }}
      className="relative"
    >
      <GlassCard
        className={cn(
          "relative overflow-hidden p-7 transition sm:p-9",
          completed && "completed-glow bg-emerald-50/70",
          skipped && "opacity-70"
        )}
      >
        <CompletionAnimation active={Boolean(activePulse)} />
        <div className="flex flex-col gap-6 xl:flex-row xl:items-start xl:justify-between">
          <div className="max-w-3xl">
            <div className="mb-5 flex flex-wrap items-center gap-3">
              <Badge className="text-base">
                <Clock3 className="mr-2 h-4 w-4" />
                {task.estimateMinutes} 分钟
              </Badge>
              <Badge className="text-base">
                <Gauge className="mr-2 h-4 w-4" />
                {task.difficulty}
              </Badge>
              <Badge className="text-base">{task.category}</Badge>
            </div>

            <h3
              className={cn(
                "text-2xl font-black leading-tight tracking-tight text-slate-950 sm:text-4xl",
                completed && "text-slate-400 line-through"
              )}
            >
              {task.title}
            </h3>
            <p className="mt-5 text-xl leading-8 text-slate-600">{task.description}</p>
            <div className="mt-6 rounded-3xl border border-teal-100 bg-teal-50/75 p-5 text-lg font-semibold leading-8 text-teal-950">
              {task.encouragement}
            </div>
          </div>

          <div className="flex min-w-72 flex-col gap-3">
            <BigButton
              variant={completed ? "success" : "default"}
              data-testid={`complete-task-${task.id}`}
              icon={<CheckCircle2 className="h-6 w-6" />}
              onClick={() => onComplete(task.id)}
              disabled={completed}
            >
              {completed ? "已完成" : "完成"}
            </BigButton>
            <div className="grid grid-cols-2 gap-3">
              <Button
                variant="secondary"
                size="lg"
                data-testid={`skip-task-${task.id}`}
                className="rounded-3xl text-lg"
                onClick={() => onSkip(task.id)}
                disabled={completed}
              >
                <SkipForward className="mr-2 h-5 w-5" />
                跳过
              </Button>
              <Button
                variant="outline"
                size="lg"
                data-testid={`break-task-${task.id}`}
                className="rounded-3xl text-lg"
                onClick={() => onBreakDown(task.id)}
                disabled={completed}
              >
                <ListTree className="mr-2 h-5 w-5" />
                拆小一点
              </Button>
            </div>
          </div>
        </div>

        <MiniTaskBreakdown items={task.miniTasks} open={task.isBrokenDown} />
      </GlassCard>
    </motion.div>
  );
}
