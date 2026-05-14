"use client";

import { AnimatePresence, motion } from "framer-motion";
import { CheckCircle2, Clock3, Gauge, ListTree, Play, SkipForward, Sparkles } from "lucide-react";
import { CompletionAnimation } from "@/components/completion-animation";
import { MiniTaskBreakdown } from "@/components/mini-task-breakdown";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { PlanTask } from "@/types";

type PunchPhase = "cover" | "detail" | "reward" | "finished";

interface PunchTaskCardProps {
  task: PlanTask;
  index: number;
  total: number;
  phase: PunchPhase;
  activePulse?: boolean;
  onStart: () => void;
  onComplete: () => void;
  onSkip: () => void;
  onBreakDown: () => void;
}

export function PunchTaskCard({
  task,
  index,
  total,
  phase,
  activePulse,
  onStart,
  onComplete,
  onSkip,
  onBreakDown
}: PunchTaskCardProps) {
  const detailOpen = phase === "detail" || phase === "reward";
  const completed = task.status === "completed" || phase === "reward";

  return (
    <motion.article
      key={task.id}
      layout
      initial={{ opacity: 0, y: 44, rotateX: -8, scale: 0.96 }}
      animate={{
        opacity: 1,
        y: 0,
        rotateX: 0,
        scale: activePulse ? [1, 1.025, 1] : 1
      }}
      exit={{ opacity: 0, y: -34, scale: 0.96 }}
      transition={{ duration: 0.48, ease: "easeOut" }}
      className="relative mx-auto max-w-5xl"
      data-testid="punch-task-card"
    >
      <div
        className={cn(
          "relative overflow-hidden rounded-[3.2rem] border bg-[#fbf7ef]/88 p-7 shadow-[0_36px_110px_rgba(43,38,30,0.12)] backdrop-blur-xl sm:p-10 lg:p-12",
          completed ? "border-[#bfe7d5] bg-[#eef8f3]/92" : "border-[#e4dacb]"
        )}
      >
        <CompletionAnimation active={Boolean(activePulse)} />
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(255,255,255,0.95),transparent_34%),radial-gradient(circle_at_82%_78%,rgba(246,202,66,0.18),transparent_30%)]" />
        <div className="relative z-10">
          <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
            <Badge className="w-fit rounded-full bg-[#211f1c] px-5 py-2 text-base text-[#f8f3ea]">
              第 {index + 1} / {total} 步
            </Badge>
            <div className="flex flex-wrap gap-3">
              <Badge className="rounded-full bg-white/72 px-4 py-2 text-base text-[#5d554d]">
                <Clock3 className="mr-2 h-4 w-4" />
                {task.estimateMinutes} 分钟
              </Badge>
              <Badge className="rounded-full bg-white/72 px-4 py-2 text-base text-[#5d554d]">
                <Gauge className="mr-2 h-4 w-4" />
                {task.difficulty}
              </Badge>
            </div>
          </div>

          <div className="mt-10 text-center">
            <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-[#f6ca42] text-[#211f1c] shadow-[0_18px_48px_rgba(212,158,24,0.24)]">
              {completed ? <CheckCircle2 className="h-8 w-8" /> : <Sparkles className="h-8 w-8" />}
            </div>
            <h3
              className={cn(
                "mx-auto max-w-4xl text-4xl font-black leading-[1.02] tracking-[-0.07em] text-[#211f1c] sm:text-6xl lg:text-7xl",
                completed && "text-[#1b6a51]"
              )}
            >
              {task.title}
            </h3>
            <p className="mx-auto mt-6 max-w-3xl text-xl font-bold leading-8 text-[#746b60] sm:text-2xl sm:leading-10">
              {task.encouragement}
            </p>
          </div>

          <AnimatePresence initial={false}>
            {detailOpen ? (
              <motion.div
                initial={{ opacity: 0, y: 22, height: 0 }}
                animate={{ opacity: 1, y: 0, height: "auto" }}
                exit={{ opacity: 0, y: -12, height: 0 }}
                transition={{ duration: 0.34, ease: "easeOut" }}
                className="overflow-hidden"
              >
                <div className="mt-9 rounded-[2.2rem] border border-[#e3d9c9] bg-white/62 p-6 text-left shadow-[0_18px_55px_rgba(43,38,30,0.06)] sm:p-7">
                  <p className="text-sm font-black uppercase tracking-[0.24em] text-[#a08753]">行动说明</p>
                  <p className="mt-4 text-2xl font-black leading-9 tracking-[-0.03em] text-[#332d27]">
                    {task.description}
                  </p>
                </div>
                <MiniTaskBreakdown items={task.miniTasks} open={task.isBrokenDown} />
              </motion.div>
            ) : null}
          </AnimatePresence>

          <div className="mt-10">
            {phase === "cover" ? (
              <Button
                size="xl"
                className="mx-auto flex rounded-full bg-[#211f1c] px-12 text-xl text-[#f8f3ea] shadow-[0_22px_70px_rgba(33,31,28,0.22)] hover:bg-[#2e2a24]"
                onClick={onStart}
                data-testid="punch-start-task"
              >
                <Play className="mr-3 h-6 w-6" />
                开始这一小步
              </Button>
            ) : phase === "detail" ? (
              <motion.div
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                className="grid gap-3 lg:grid-cols-[1.2fr_0.8fr_0.8fr]"
              >
                <Button
                  size="xl"
                  className="rounded-full bg-[#19a974] text-xl text-white shadow-[0_22px_70px_rgba(25,169,116,0.24)] hover:bg-[#12855d]"
                  onClick={onComplete}
                  data-testid={`punch-complete-task-${task.id}`}
                >
                  <CheckCircle2 className="mr-3 h-6 w-6" />
                  我完成了
                </Button>
                <Button
                  size="xl"
                  variant="secondary"
                  className="rounded-full bg-white/78 text-xl text-[#211f1c]"
                  onClick={onBreakDown}
                  data-testid={`punch-break-task-${task.id}`}
                >
                  <ListTree className="mr-3 h-6 w-6" />
                  拆小一点
                </Button>
                <Button
                  size="xl"
                  variant="outline"
                  className="rounded-full border-[#d8cbb9] bg-white/42 text-xl text-[#6f675e]"
                  onClick={onSkip}
                  data-testid={`punch-skip-task-${task.id}`}
                >
                  <SkipForward className="mr-3 h-6 w-6" />
                  暂时跳过
                </Button>
              </motion.div>
            ) : null}
          </div>
        </div>
      </div>
    </motion.article>
  );
}

export type { PunchPhase };
