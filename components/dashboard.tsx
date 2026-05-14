"use client";

import { useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { HeartHandshake, Sparkles } from "lucide-react";
import { BigTaskCard } from "@/components/big-task-card";
import { ConfettiEffect } from "@/components/confetti-effect";
import { GlassCard } from "@/components/glass-card";
import { ProgressRing } from "@/components/progress-ring";
import { TodayMainTaskCard } from "@/components/today-main-task-card";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { usePlanStore } from "@/store/use-plan-store";

export function Dashboard() {
  const {
    activeGoal,
    tasks,
    streak,
    lowEnergyMode,
    completionPulse,
    coachBanner,
    completeTask,
    skipTask,
    breakTask,
    activateLowEnergyMode,
    clearCoachBanner,
    setFocusTask
  } = usePlanStore();

  const visibleTasks = lowEnergyMode ? tasks.filter((task) => task.isMain) : tasks.filter((task) => task.status !== "deferred");
  const mainTask = visibleTasks.find((task) => task.isMain) ?? visibleTasks[0];
  const completedCount = visibleTasks.filter((task) => task.status === "completed").length;
  const completionRate = visibleTasks.length ? Math.round((completedCount / visibleTasks.length) * 100) : 0;

  useEffect(() => {
    if (!coachBanner) return;
    const timer = window.setTimeout(clearCoachBanner, 4600);
    return () => window.clearTimeout(timer);
  }, [coachBanner, clearCoachBanner]);

  return (
    <main className={cn("min-h-screen px-5 py-10 transition-colors sm:px-8", lowEnergyMode && "soft-focus-mode")}>
      <ConfettiEffect trigger={completionPulse?.nonce} />

      <div className="mx-auto max-w-7xl">
        <AnimatePresence>
          {coachBanner ? (
            <motion.div
              initial={{ opacity: 0, y: -18, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -18, scale: 0.98 }}
              className="fixed left-1/2 top-24 z-50 w-[min(92vw,820px)] -translate-x-1/2 rounded-3xl border border-white/15 bg-slate-950/95 px-7 py-5 text-xl font-bold leading-8 text-white shadow-2xl shadow-slate-950/25 backdrop-blur-2xl"
            >
              {coachBanner}
            </motion.div>
          ) : null}
        </AnimatePresence>

        <section className="mb-10 flex flex-col gap-8 xl:flex-row xl:items-end xl:justify-between">
          <div>
            <p className="mb-5 inline-flex items-center gap-3 rounded-full bg-white/70 px-5 py-3 text-base font-bold text-slate-600 shadow-sm backdrop-blur">
              <Sparkles className="h-5 w-5 text-teal-600" />
              当前目标：{activeGoal.title}
            </p>
            <h1 className="max-w-5xl text-5xl font-black leading-[1.05] tracking-tight text-slate-950 sm:text-7xl">
              今天，你只需要赢下这一小步。
            </h1>
          </div>
          <Button
            variant="warm"
            size="xl"
            data-testid="low-energy-mode"
            className="rounded-3xl text-xl"
            onClick={activateLowEnergyMode}
          >
            <HeartHandshake className="mr-3 h-6 w-6" />
            我今天状态不好
          </Button>
        </section>

        {mainTask ? (
          <TodayMainTaskCard
            task={mainTask}
            activePulse={completionPulse?.taskId === mainTask.id}
            onComplete={completeTask}
            onFocus={setFocusTask}
          />
        ) : null}

        <section className="mt-8 grid gap-8 xl:grid-cols-[1fr_360px]">
          <div>
            <h2 className="mb-5 text-5xl font-black tracking-tight text-slate-950">今日任务列表</h2>
            <div className="grid gap-6">
              {visibleTasks.map((task) => (
                <BigTaskCard
                  key={task.id}
                  task={task}
                  activePulse={completionPulse?.taskId === task.id}
                  onComplete={completeTask}
                  onSkip={skipTask}
                  onBreakDown={(id) => void breakTask(id)}
                />
              ))}
            </div>
          </div>

          <div className="space-y-6">
            <GlassCard className="p-8">
              <div className="flex justify-center">
                <ProgressRing value={completionRate} />
              </div>
              <div className="mt-8 grid gap-4">
                <div className="rounded-3xl bg-white/65 p-6">
                  <p className="text-base font-bold text-slate-500">连续完成天数</p>
                  <motion.p
                    key={streak}
                    initial={{ scale: 0.9 }}
                    animate={{ scale: [1, 1.08, 1] }}
                    className="mt-2 text-6xl font-black text-slate-950"
                  >
                    {streak}
                  </motion.p>
                </div>
                <div className="rounded-3xl bg-teal-50/80 p-6">
                  <p className="text-base font-bold text-teal-700">AI 今日评价</p>
                  <p className="mt-3 text-xl font-bold leading-8 text-teal-950">
                    {completionRate >= 75
                      ? "今天的节奏非常稳，可以收尾而不是继续加压。"
                      : lowEnergyMode
                        ? "低能量模式已开启，守住最小行动就是胜利。"
                        : "先完成最小行动，后面的任务会更容易启动。"}
                  </p>
                </div>
              </div>
            </GlassCard>
          </div>
        </section>
      </div>
    </main>
  );
}
