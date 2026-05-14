"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { CheckCircle2, Focus, Sparkles } from "lucide-react";
import { BigButton } from "@/components/big-button";
import { CompletionAnimation } from "@/components/completion-animation";
import { GlassCard } from "@/components/glass-card";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { PlanTask } from "@/types";

interface TodayMainTaskCardProps {
  task: PlanTask;
  activePulse?: boolean;
  onComplete: (id: string) => void;
  onFocus: (id: string) => void;
  focusHref?: string;
}

export function TodayMainTaskCard({ task, activePulse, onComplete, onFocus, focusHref = "/focus" }: TodayMainTaskCardProps) {
  const completed = task.status === "completed";

  return (
    <motion.div
      layout
      animate={activePulse ? { scale: [1, 1.018, 1] } : { scale: 1 }}
      transition={{ duration: 0.55, ease: "easeOut" }}
      className="relative"
    >
      <GlassCard className={cn("relative overflow-hidden p-8 sm:p-12", completed && "completed-glow bg-emerald-50/80")}>
        <CompletionAnimation active={Boolean(activePulse)} />
        <div className="flex flex-col gap-10 xl:flex-row xl:items-end xl:justify-between">
          <div className="max-w-4xl">
            <div className="mb-8 inline-flex items-center gap-3 rounded-full bg-slate-950 px-5 py-3 text-lg font-bold text-white shadow-lg shadow-slate-950/15">
              <Sparkles className="h-5 w-5 text-amber-200" />
              今日最小行动
            </div>
            <h2
              className={cn(
                "text-4xl font-black leading-[1.04] tracking-tight text-slate-950 sm:text-6xl",
                completed && "text-slate-400 line-through"
              )}
            >
              {task.title}
            </h2>
            <p className="mt-7 max-w-3xl text-2xl leading-10 text-slate-600">{task.encouragement}</p>
          </div>

          <div className="flex min-w-80 flex-col gap-4">
            <BigButton
              variant={completed ? "success" : "default"}
              data-testid="complete-main-task"
              icon={<CheckCircle2 className="h-7 w-7" />}
              onClick={() => onComplete(task.id)}
              disabled={completed}
            >
              {completed ? "已经完成" : "我完成了"}
            </BigButton>
            <Button asChild variant="secondary" size="xl" className="rounded-3xl text-xl" onClick={() => onFocus(task.id)}>
              <Link href={focusHref}>
                <Focus className="mr-3 h-6 w-6" />
                进入专注模式
              </Link>
            </Button>
          </div>
        </div>
      </GlassCard>
    </motion.div>
  );
}
