"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Brain, CheckCircle2, Flame, HeartHandshake, Sparkles } from "lucide-react";
import { BigTaskCard } from "@/components/big-task-card";
import { CoachPanel } from "@/components/coach-panel";
import { ConfettiEffect } from "@/components/confetti-effect";
import { DemoStoryBuilder } from "@/components/demo-story-builder";
import { ExecutionMindMap } from "@/components/execution-mind-map";
import { FinalMemoryCard } from "@/components/final-memory-card";
import { GoalInput } from "@/components/goal-input";
import { GoalToProofOverview } from "@/components/goal-to-proof-overview";
import { InlineFocusSection } from "@/components/inline-focus-section";
import { JudgeSimulationArena } from "@/components/judge-simulation-arena";
import { MinimumViableWinSection } from "@/components/minimum-viable-win-section";
import { ProofWall } from "@/components/proof-wall";
import { ProjectInnovationSection } from "@/components/project-innovation-section";
import { ReadinessScoreCard } from "@/components/readiness-score-card";
import { ProgressRing } from "@/components/progress-ring";
import { ReviewAnalyticsSection } from "@/components/review-analytics-section";
import { TodayMainTaskCard } from "@/components/today-main-task-card";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { usePlanStore } from "@/store/use-plan-store";

const features = [
  {
    title: "目标到证据闭环",
    description: "每次完成都不只是 done，而是自动沉淀成可展示 Proof。",
    icon: Brain
  },
  {
    title: "60 秒演示故事",
    description: "把当前进展组织成 Problem、Action、Proof、Impact 的上台稿。",
    icon: CheckCircle2
  },
  {
    title: "评委视角预演",
    description: "提前看到技术、产品、影响力评委最可能挑战你的问题。",
    icon: Flame
  }
];

const floatingFragments = [
  "Proof wall",
  "60s pitch",
  "Judge mode",
  "MVP route",
  "readiness +12"
];

export function PlanCoachLandingExperience() {
  const planRef = useRef<HTMLElement | null>(null);
  const [showPlan, setShowPlan] = useState(false);
  const {
    activeGoal,
    plan,
    tasks,
    streak,
    proofs,
    demoStory,
    judgeSimulations,
    readinessScore,
    minimumViableWin,
    finalMemoryLine,
    lowEnergyMode,
    completionPulse,
    coachBanner,
    isGeneratingPlan,
    generatePlanForGoal,
    completeTask,
    skipTask,
    breakTask,
    activateLowEnergyMode,
    clearCoachBanner,
    setFocusTask,
    generateDemoStoryForGoal,
    generateJudgeSimulationsForGoal,
    activateMinimumViableWin,
    generateFinalMemoryLineForGoal
  } = usePlanStore();

  const visibleTasks = useMemo(
    () => (lowEnergyMode ? tasks.filter((task) => task.isMain) : tasks.filter((task) => task.status !== "deferred")),
    [lowEnergyMode, tasks]
  );
  const shouldShowPlan = showPlan || Boolean(plan);
  const mainTask = visibleTasks.find((task) => task.isMain) ?? visibleTasks[0];
  const completedCount = visibleTasks.filter((task) => task.status === "completed").length;
  const completionRate = visibleTasks.length ? Math.round((completedCount / visibleTasks.length) * 100) : 0;

  useEffect(() => {
    if (!coachBanner) return;
    const timer = window.setTimeout(clearCoachBanner, 4600);
    return () => window.clearTimeout(timer);
  }, [coachBanner, clearCoachBanner]);

  const handleGenerate = async (goal: string) => {
    await generatePlanForGoal(goal);
    setShowPlan(true);
    window.setTimeout(() => {
      planRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 120);
  };

  return (
    <main id="top" className={cn("min-h-screen overflow-hidden bg-[#f3eee6] text-[#211f1c]", lowEnergyMode && "soft-focus-mode")}>
      <ConfettiEffect trigger={completionPulse?.nonce} />

      <AnimatePresence>
        {coachBanner ? (
          <motion.div
            initial={{ opacity: 0, y: -18, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -18, scale: 0.98 }}
            className="fixed left-1/2 top-24 z-[60] w-[min(92vw,820px)] -translate-x-1/2 rounded-full border border-[#40392f]/10 bg-[#211f1c]/95 px-7 py-5 text-center text-lg font-black leading-7 text-[#f8f3ea] shadow-[0_30px_80px_rgba(32,29,25,0.20)] backdrop-blur-xl sm:text-xl"
          >
            {coachBanner}
          </motion.div>
        ) : null}
      </AnimatePresence>

      <section className="landing-hero relative flex min-h-screen items-center justify-center px-5 pb-16 pt-28 sm:px-8">
        <div className="absolute inset-0 pointer-events-none">
          {floatingFragments.map((fragment, index) => (
            <motion.div
              key={fragment}
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 0.2, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 + index * 0.12 }}
              className="absolute hidden rounded-3xl border border-[#ded7cc] bg-white/50 px-5 py-4 text-sm font-black uppercase tracking-[0.18em] text-[#6f675e] shadow-[0_20px_70px_rgba(43,38,30,0.05)] backdrop-blur md:block"
              style={{
                left: `${14 + (index % 3) * 28}%`,
                top: `${24 + index * 11}%`,
                transform: `rotate(${index % 2 ? -4 : 5}deg)`
              }}
            >
              {fragment}
            </motion.div>
          ))}
        </div>

        <div className="relative z-10 mx-auto max-w-7xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
          >
            <div className="mx-auto mb-9 inline-flex items-center gap-3 rounded-full border border-[#ded7cc]/80 bg-[#fbf7ef]/80 px-5 py-3 text-base font-black text-[#6f675e] shadow-[0_16px_45px_rgba(43,38,30,0.07)] backdrop-blur">
              <Sparkles className="h-5 w-5 text-[#0f9f8c]" />
              Goal-to-Proof AI Execution System
            </div>
            <h1 className="text-7xl font-black tracking-[-0.08em] text-[#211f1c] sm:text-8xl lg:text-[10rem]">
              Plan Coach
            </h1>
            <p className="mx-auto mt-8 max-w-5xl text-4xl font-black leading-[1.05] tracking-[-0.05em] text-[#332d27] sm:text-6xl">
              把目标变成行动，把行动变成证据。
            </p>
            <p className="mx-auto mt-7 max-w-3xl text-xl font-bold leading-8 text-[#746b60] sm:text-2xl sm:leading-10">
              不只是列计划，而是把每一次推进转化成可展示、可复盘、可被评委理解的 Proof。
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.15, ease: "easeOut" }}
            className="mx-auto mt-12 max-w-5xl"
          >
            <GoalInput
              onGenerate={handleGenerate}
              isLoading={isGeneratingPlan}
              placeholder="例如：我想在 48 小时内做出一个 AI 计划教练并参加比赛"
              buttonLabel="生成我的执行系统"
              loadingLabel="正在生成执行系统"
              fallbackGoal="我想在 48 小时内做出一个 AI 计划教练并参加比赛"
            />
          </motion.div>

          <div className="mx-auto mt-14 grid max-w-6xl gap-5 lg:grid-cols-3">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <motion.article
                  key={feature.title}
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.55, delay: 0.24 + index * 0.08 }}
                  className="rounded-[2.2rem] border border-[#e3dbd0] bg-[#fbf7ef]/62 p-7 text-left shadow-[0_24px_80px_rgba(43,38,30,0.06)] backdrop-blur-xl"
                >
                  <Icon className="h-8 w-8 text-[#211f1c]" />
                  <h2 className="mt-8 text-2xl font-black tracking-[-0.04em] text-[#211f1c]">{feature.title}</h2>
                  <p className="mt-4 text-lg font-bold leading-7 text-[#746b60]">{feature.description}</p>
                </motion.article>
              );
            })}
          </div>
        </div>
      </section>

      <ProjectInnovationSection />

      <GoalToProofOverview />

      {shouldShowPlan ? (
        <>
          <ExecutionMindMap />

          <section id="plan" ref={planRef} className="scroll-mt-24 px-5 py-24 sm:px-8">
            <div className="mx-auto max-w-[1500px]">
              <div className="mb-10 flex flex-col gap-8 xl:flex-row xl:items-end xl:justify-between">
                <div>
                  <p className="mb-5 inline-flex items-center gap-3 rounded-full border border-[#ded7cc] bg-[#fbf7ef]/80 px-5 py-3 text-base font-black text-[#6f675e] shadow-sm backdrop-blur">
                    <Sparkles className="h-5 w-5 text-[#0f9f8c]" />
                    当前目标：{activeGoal.title}
                  </p>
                  <h2 className="max-w-6xl text-5xl font-black leading-[1.02] tracking-[-0.07em] text-[#211f1c] sm:text-7xl lg:text-8xl">
                    今天，你只需要推进一个可证明成果。
                  </h2>
                </div>
                <Button
                  variant="warm"
                  size="xl"
                  data-testid="landing-low-energy-mode"
                  className="rounded-full bg-[#f6ca42] text-xl text-[#211f1c] shadow-[0_22px_70px_rgba(212,158,24,0.24)] hover:bg-[#ffd95a]"
                  onClick={activateLowEnergyMode}
                >
                  <HeartHandshake className="mr-3 h-6 w-6" />
                  我今天状态不好
                </Button>
              </div>

              {mainTask ? (
                <TodayMainTaskCard
                  task={mainTask}
                  activePulse={completionPulse?.taskId === mainTask.id}
                  onComplete={completeTask}
                  onFocus={setFocusTask}
                  focusHref="#focus"
                />
              ) : null}

              <div className="mt-8 grid gap-6 lg:grid-cols-4">
                <div className="rounded-[2.5rem] border border-[#e7ded1] bg-[#fbf7ef]/78 p-7 shadow-[0_25px_80px_rgba(43,38,30,0.08)]">
                  <ProgressRing value={completionRate} size={180} />
                </div>
                <div className="rounded-[2.5rem] border border-[#e7ded1] bg-white/58 p-8 shadow-[0_25px_80px_rgba(43,38,30,0.07)]">
                  <p className="text-base font-black uppercase tracking-[0.24em] text-[#81796e]">Streak</p>
                  <motion.p
                    key={streak}
                    initial={{ scale: 0.92 }}
                    animate={{ scale: [1, 1.06, 1] }}
                    className="mt-5 text-7xl font-black tracking-[-0.08em] text-[#211f1c]"
                  >
                    {streak}
                  </motion.p>
                </div>
                <div className="rounded-[2.5rem] border border-[#cfe8df] bg-[#eef8f3]/82 p-8 shadow-[0_25px_80px_rgba(43,38,30,0.07)]">
                  <p className="text-base font-black uppercase tracking-[0.24em] text-[#0f766e]">AI 今日评价</p>
                  <p className="mt-5 text-2xl font-black leading-9 text-[#123f39]">
                    {completionRate >= 75
                      ? "今天的节奏非常稳，可以收尾而不是继续加压。"
                      : lowEnergyMode
                        ? "低能量模式已开启，守住最小行动就是胜利。"
                        : "先完成最小行动，后面的任务会更容易启动。"}
                  </p>
                </div>
                <ReadinessScoreCard readiness={readinessScore} proofCount={proofs.length} />
              </div>
            </div>
          </section>

          <section id="tasks" className="scroll-mt-24 px-5 py-24 sm:px-8">
            <div className="mx-auto max-w-[1500px]">
              <p className="mb-5 text-base font-black uppercase tracking-[0.3em] text-[#81796e]">Task Breakdown</p>
              <h2 className="max-w-5xl text-5xl font-black leading-[1.02] tracking-[-0.07em] text-[#211f1c] sm:text-7xl">
                不是任务列表，是今天的行动地图。
              </h2>
              <div className="mt-12 grid gap-6">
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
          </section>

          <ProofWall proofs={proofs} />

          <DemoStoryBuilder story={demoStory} onGenerate={generateDemoStoryForGoal} />

          <JudgeSimulationArena simulations={judgeSimulations} onGenerate={generateJudgeSimulationsForGoal} />

          <MinimumViableWinSection plan={minimumViableWin} onActivate={activateMinimumViableWin} />

          <section id="coach" className="scroll-mt-24 px-5 py-24 sm:px-8">
            <div className="mx-auto grid max-w-[1500px] gap-10 xl:grid-cols-[0.8fr_1fr] xl:items-center">
              <div>
                <p className="mb-5 text-base font-black uppercase tracking-[0.3em] text-[#81796e]">AI Coach</p>
                <h2 className="text-5xl font-black leading-[1.02] tracking-[-0.07em] text-[#211f1c] sm:text-7xl">
                  状态不好时，计划应该变温柔。
                </h2>
                <p className="mt-7 max-w-2xl text-2xl font-bold leading-10 text-[#746b60]">
                  不做复杂聊天窗口，只保留最关键的对话：你说真实状态，AI 把任务压到能开始。
                </p>
              </div>
              <CoachPanel />
            </div>
          </section>

          <section id="focus" className="scroll-mt-24 px-5 py-24 sm:px-8">
            <div className="mx-auto max-w-[1500px]">
              <p className="mb-5 text-base font-black uppercase tracking-[0.3em] text-[#81796e]">Deep Work</p>
              <h2 className="mb-12 max-w-5xl text-5xl font-black leading-[1.02] tracking-[-0.07em] text-[#211f1c] sm:text-7xl">
                一次只推进一个可证明成果。
              </h2>
              <InlineFocusSection />
            </div>
          </section>

          <section id="review" className="scroll-mt-24 px-5 py-24 sm:px-8">
            <div className="mx-auto max-w-[1500px]">
              <p className="mb-5 text-base font-black uppercase tracking-[0.3em] text-[#81796e]">Review & Growth</p>
              <h2 className="mb-12 max-w-6xl text-5xl font-black leading-[1.02] tracking-[-0.07em] text-[#211f1c] sm:text-7xl">
                复盘不是后台数据，是明天继续的理由。
              </h2>
              <div className="mb-8 grid gap-5 lg:grid-cols-4">
                <ReadinessScoreCard readiness={readinessScore} proofCount={proofs.length} />
                <div className="rounded-[2.5rem] border border-[#e7ded1] bg-white/62 p-8 shadow-[0_25px_80px_rgba(43,38,30,0.07)]">
                  <p className="text-base font-black uppercase tracking-[0.24em] text-[#81796e]">Proof Count</p>
                  <p className="mt-5 text-7xl font-black tracking-[-0.08em] text-[#211f1c]">{proofs.length}</p>
                </div>
                <div className="rounded-[2.5rem] border border-[#e7ded1] bg-white/62 p-8 shadow-[0_25px_80px_rgba(43,38,30,0.07)]">
                  <p className="text-base font-black uppercase tracking-[0.24em] text-[#81796e]">Demo Confidence</p>
                  <p className="mt-5 text-7xl font-black tracking-[-0.08em] text-[#211f1c]">{readinessScore.demoConfidence}</p>
                </div>
                <div className="rounded-[2.5rem] border border-[#e7ded1] bg-white/62 p-8 shadow-[0_25px_80px_rgba(43,38,30,0.07)]">
                  <p className="text-base font-black uppercase tracking-[0.24em] text-[#81796e]">Risk Level</p>
                  <p className="mt-5 text-7xl font-black tracking-[-0.08em] text-[#211f1c]">{readinessScore.riskLevel}</p>
                </div>
              </div>
              <ReviewAnalyticsSection />
            </div>
          </section>

          <FinalMemoryCard line={finalMemoryLine} onGenerate={generateFinalMemoryLineForGoal} />
        </>
      ) : null}
    </main>
  );
}
