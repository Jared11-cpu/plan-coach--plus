"use client";

import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown, ChevronUp, HeartHandshake, Map, Sparkles, Trophy } from "lucide-react";
import { BigTaskCard } from "@/components/big-task-card";
import { NextTaskPreview } from "@/components/next-task-preview";
import { PunchProgressDots } from "@/components/punch-progress-dots";
import { PunchRewardPanel } from "@/components/punch-reward-panel";
import { PunchTaskCard, type PunchPhase } from "@/components/punch-task-card";
import { ReadinessScoreCard } from "@/components/readiness-score-card";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { usePlanStore } from "@/store/use-plan-store";

const scrollToId = (id: string) => {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
};

export function TaskPunchSession() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [phase, setPhase] = useState<PunchPhase>("cover");
  const [showAllTasks, setShowAllTasks] = useState(false);
  const [lastCompletedTaskId, setLastCompletedTaskId] = useState<string | undefined>();

  const {
    activeGoal,
    tasks,
    streak,
    proofs,
    readinessScore,
    lowEnergyMode,
    completionPulse,
    completeTask,
    skipTask,
    breakTask,
    activateLowEnergyMode,
    setFocusTask,
    generateDemoStoryForGoal
  } = usePlanStore();

  const visibleTasks = useMemo(
    () => (lowEnergyMode ? tasks.filter((task) => task.isMain) : tasks.filter((task) => task.status !== "deferred")),
    [lowEnergyMode, tasks]
  );
  const completedCount = visibleTasks.filter((task) => task.status === "completed").length;
  const currentTask = visibleTasks[activeIndex] ?? visibleTasks.find((task) => task.status === "todo") ?? visibleTasks[0];
  const currentIndex = currentTask ? Math.max(0, visibleTasks.findIndex((task) => task.id === currentTask.id)) : 0;
  const nextTask = visibleTasks.slice(currentIndex + 1).find((task) => task.status === "todo");
  const allDone = visibleTasks.length > 0 && visibleTasks.every((task) => task.status === "completed" || task.status === "skipped");

  useEffect(() => {
    if (!visibleTasks.length) return;
    if (activeIndex >= visibleTasks.length) {
      setActiveIndex(Math.max(0, visibleTasks.length - 1));
    }
  }, [activeIndex, visibleTasks.length]);

  useEffect(() => {
    if (!visibleTasks.length) return;
    const activeTask = visibleTasks[activeIndex];
    const firstTodoIndex = visibleTasks.findIndex((task) => task.status === "todo");

    if (allDone && phase !== "reward") {
      setPhase("finished");
      return;
    }

    if ((!activeTask || activeTask.status !== "todo") && firstTodoIndex >= 0) {
      setActiveIndex(firstTodoIndex);
      if (phase !== "reward") {
        setPhase("cover");
      }
    }
  }, [activeIndex, allDone, phase, visibleTasks]);

  if (!currentTask) {
    return null;
  }

  const goNext = () => {
    const nextIndex = visibleTasks.findIndex((task, index) => index > currentIndex && task.status === "todo");
    if (nextIndex >= 0) {
      setActiveIndex(nextIndex);
      setPhase("cover");
      setLastCompletedTaskId(undefined);
    } else {
      setPhase("finished");
    }
  };

  const handleComplete = () => {
    setLastCompletedTaskId(currentTask.id);
    completeTask(currentTask.id);
    window.setTimeout(() => setPhase("reward"), 180);
  };

  const handleSkip = () => {
    skipTask(currentTask.id);
    window.setTimeout(goNext, 120);
  };

  const handleBreakDown = () => {
    void breakTask(currentTask.id);
  };

  const handleGenerateStory = () => {
    void generateDemoStoryForGoal().then(() => scrollToId("demo-story"));
  };

  const completionRate = visibleTasks.length ? Math.round((completedCount / visibleTasks.length) * 100) : 0;

  return (
    <section id="plan" className="scroll-mt-24 px-5 py-20 sm:px-8">
      <div className="mx-auto max-w-[1500px]">
        <div className="mb-10 flex flex-col gap-8 xl:flex-row xl:items-end xl:justify-between">
          <div>
            <p className="mb-5 inline-flex items-center gap-3 rounded-full border border-[#ded7cc] bg-[#fbf7ef]/80 px-5 py-3 text-base font-black text-[#6f675e] shadow-sm backdrop-blur">
              <Sparkles className="h-5 w-5 text-[#0f9f8c]" />
              当前目标：{activeGoal.title}
            </p>
            <h2 className="max-w-6xl text-5xl font-black leading-[1.02] tracking-[-0.07em] text-[#211f1c] sm:text-7xl lg:text-8xl">
              像记单词一样，今天只推进一个任务。
            </h2>
            <p className="mt-7 max-w-4xl text-2xl font-bold leading-10 text-[#746b60]">
              一次只看一张卡，完成后再出现下一张。每次打卡都会转化成可展示的 Proof。
            </p>
          </div>
          <Button
            variant="warm"
            size="xl"
            data-testid="punch-low-energy-mode"
            className="rounded-full bg-[#f6ca42] text-xl text-[#211f1c] shadow-[0_22px_70px_rgba(212,158,24,0.24)] hover:bg-[#ffd95a]"
            onClick={() => void activateLowEnergyMode()}
          >
            <HeartHandshake className="mr-3 h-6 w-6" />
            我今天状态不好
          </Button>
        </div>

        <div className="grid gap-6 lg:grid-cols-[1fr_360px] lg:items-start">
          <div className="rounded-[3.2rem] border border-[#e7ded1] bg-[#efe7dc]/52 p-4 shadow-[0_30px_100px_rgba(43,38,30,0.08)] sm:p-6">
            <div className="mb-7 grid gap-5 rounded-[2.4rem] border border-[#e4dacb] bg-[#fbf7ef]/78 p-5 sm:grid-cols-3 sm:items-center">
              <div>
                <p className="text-sm font-black uppercase tracking-[0.22em] text-[#81796e]">Punch Progress</p>
                <p className="mt-2 text-3xl font-black tracking-[-0.05em] text-[#211f1c]">{completionRate}%</p>
              </div>
              <PunchProgressDots tasks={visibleTasks} activeIndex={currentIndex} />
              <div className="text-left sm:text-right">
                <p className="text-sm font-black uppercase tracking-[0.22em] text-[#81796e]">Streak</p>
                <p className="mt-2 text-3xl font-black tracking-[-0.05em] text-[#211f1c]">{streak} 天</p>
              </div>
            </div>

            <AnimatePresence mode="wait">
              {phase === "finished" ? (
                <motion.div
                  key="finished"
                  initial={{ opacity: 0, y: 28, scale: 0.98 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -18 }}
                  className="rounded-[3.2rem] border border-[#bfe7d5] bg-[#eef8f3]/92 p-9 text-center shadow-[0_36px_110px_rgba(43,38,30,0.12)] sm:p-12"
                  data-testid="punch-finished-card"
                >
                  <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-[#211f1c] text-[#f8f3ea]">
                    <Trophy className="h-10 w-10" />
                  </div>
                  <h3 className="mx-auto mt-8 max-w-4xl text-5xl font-black leading-[1.02] tracking-[-0.07em] text-[#123f39] sm:text-7xl">
                    今天的执行闭环已经形成。
                  </h3>
                  <p className="mx-auto mt-6 max-w-3xl text-2xl font-bold leading-10 text-[#4f6b61]">
                    现在可以把它变成演示说服力：查看 Proof、生成 60 秒脚本，或者模拟评委问题。
                  </p>
                  <div className="mt-9 grid gap-3 sm:grid-cols-3">
                    <Button size="xl" className="rounded-full bg-[#211f1c] text-xl text-[#f8f3ea]" onClick={() => scrollToId("proof-wall")}>
                      查看 Proof
                    </Button>
                    <Button size="xl" variant="secondary" className="rounded-full bg-white/78 text-xl" onClick={handleGenerateStory}>
                      生成演示脚本
                    </Button>
                    <Button size="xl" variant="outline" className="rounded-full border-[#d8cbb9] bg-white/42 text-xl" onClick={() => scrollToId("judge")}>
                      模拟评委
                    </Button>
                  </div>
                </motion.div>
              ) : (
                <div key={currentTask.id}>
                  <PunchTaskCard
                    task={currentTask}
                    index={currentIndex}
                    total={visibleTasks.length}
                    phase={phase}
                    activePulse={completionPulse?.taskId === currentTask.id || lastCompletedTaskId === currentTask.id}
                    onStart={() => setPhase("detail")}
                    onComplete={handleComplete}
                    onSkip={handleSkip}
                    onBreakDown={handleBreakDown}
                  />
                  {phase === "reward" ? (
                    <PunchRewardPanel
                      proofCount={proofs.length}
                      hasNextTask={Boolean(nextTask)}
                      onNext={goNext}
                      onViewProof={() => scrollToId("proof-wall")}
                      onGenerateStory={handleGenerateStory}
                    />
                  ) : (
                    <NextTaskPreview task={nextTask} />
                  )}
                </div>
              )}
            </AnimatePresence>
          </div>

          <ReadinessScoreCard readiness={readinessScore} proofCount={proofs.length} />
        </div>

        <div className="mt-10 flex flex-col gap-4 rounded-[2.5rem] border border-[#e7ded1] bg-[#fbf7ef]/72 p-5 shadow-[0_24px_80px_rgba(43,38,30,0.06)] sm:flex-row sm:items-center sm:justify-between sm:p-7">
          <div>
            <p className="text-2xl font-black tracking-[-0.04em] text-[#211f1c]">想看完整任务列表？</p>
            <p className="mt-2 text-lg font-bold text-[#746b60]">主流程保持单张卡片，答辩细节可以在这里展开。</p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Button
              size="lg"
              variant="secondary"
              className="rounded-full bg-white/76 text-lg text-[#211f1c]"
              onClick={() => scrollToId("execution-map")}
            >
              <Map className="mr-2 h-5 w-5" />
              查看执行地图
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="rounded-full border-[#d8cbb9] bg-white/42 text-lg text-[#211f1c]"
              onClick={() => setShowAllTasks((value) => !value)}
              data-testid="toggle-all-tasks"
            >
              {showAllTasks ? <ChevronUp className="mr-2 h-5 w-5" /> : <ChevronDown className="mr-2 h-5 w-5" />}
              {showAllTasks ? "收起全部任务" : "查看全部任务"}
            </Button>
          </div>
        </div>

        <AnimatePresence initial={false}>
          {showAllTasks ? (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.36, ease: "easeOut" }}
              className="overflow-hidden"
              data-testid="all-tasks-collapsible"
            >
              <div className="mt-8 grid gap-6">
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
            </motion.div>
          ) : null}
        </AnimatePresence>
      </div>
    </section>
  );
}
