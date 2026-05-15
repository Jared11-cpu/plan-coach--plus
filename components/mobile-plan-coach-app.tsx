"use client";

import { FormEvent, useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  Award,
  BadgeCheck,
  Bot,
  CheckCircle2,
  ChevronRight,
  CircleDot,
  Home,
  Loader2,
  MessageCircle,
  Play,
  Send,
  Sparkles,
  Target,
  Trophy
} from "lucide-react";
import { ConfettiEffect } from "@/components/confetti-effect";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { usePlanStore } from "@/store/use-plan-store";
import type { PlanTask } from "@/types";

type MobileTab = "task" | "proof" | "coach" | "result";
type MobileTaskPhase = "cover" | "detail" | "reward" | "finished";

const fallbackGoal = "我想在 48 小时内做出一个 AI 项目参加比赛";

export function MobilePlanCoachApp() {
  const [goal, setGoal] = useState("");
  const [tab, setTab] = useState<MobileTab>("task");
  const [phase, setPhase] = useState<MobileTaskPhase>("cover");
  const [activeIndex, setActiveIndex] = useState(0);
  const [lastCompletedTaskId, setLastCompletedTaskId] = useState<string | undefined>();
  const [proofIndex, setProofIndex] = useState(0);

  const {
    plan,
    tasks,
    proofs,
    streak,
    completionPulse,
    readinessScore,
    isGeneratingPlan,
    generatePlanForGoal,
    completeTask,
    skipTask,
    breakTask,
    sendCoachMessage,
    coachMessages,
    isCoachTyping,
    finalMemoryLine,
    generateFinalMemoryLineForGoal
  } = usePlanStore();

  const visibleTasks = useMemo(() => tasks.filter((task) => task.status !== "deferred"), [tasks]);
  const currentTask = visibleTasks[activeIndex] ?? visibleTasks.find((task) => task.status === "todo") ?? visibleTasks[0];
  const currentIndex = currentTask ? Math.max(0, visibleTasks.findIndex((task) => task.id === currentTask.id)) : 0;
  const completedCount = visibleTasks.filter((task) => task.status === "completed").length;
  const completionRate = visibleTasks.length ? Math.round((completedCount / visibleTasks.length) * 100) : 0;
  const allDone = visibleTasks.length > 0 && visibleTasks.every((task) => task.status === "completed" || task.status === "skipped");

  useEffect(() => {
    if (!visibleTasks.length) return;
    if (allDone && phase !== "reward") {
      setPhase("finished");
      setTab("result");
      return;
    }
    const firstTodoIndex = visibleTasks.findIndex((task) => task.status === "todo");
    const activeTask = visibleTasks[activeIndex];
    if ((!activeTask || activeTask.status !== "todo") && firstTodoIndex >= 0 && phase !== "reward") {
      setActiveIndex(firstTodoIndex);
      setPhase("cover");
    }
  }, [activeIndex, allDone, phase, visibleTasks]);

  const handleGenerate = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    await generatePlanForGoal(goal.trim() || fallbackGoal);
    setTab("task");
    setPhase("cover");
    setActiveIndex(0);
  };

  const goNextTask = () => {
    const nextIndex = visibleTasks.findIndex((task, index) => index > currentIndex && task.status === "todo");
    if (nextIndex >= 0) {
      setActiveIndex(nextIndex);
      setLastCompletedTaskId(undefined);
      setPhase("cover");
      setTab("task");
    } else {
      setPhase("finished");
      setTab("result");
    }
  };

  const handleComplete = () => {
    if (!currentTask) return;
    setLastCompletedTaskId(currentTask.id);
    completeTask(currentTask.id);
    window.setTimeout(() => setPhase("reward"), 180);
  };

  const handleSkip = () => {
    if (!currentTask) return;
    skipTask(currentTask.id);
    window.setTimeout(goNextTask, 120);
  };

  const handleBreakTask = () => {
    if (!currentTask) return;
    void breakTask(currentTask.id);
  };

  if (!plan) {
    return (
      <MobileShell hasPlan={false} tab={tab} setTab={setTab}>
        <MobileGoalScreen
          goal={goal}
          setGoal={setGoal}
          isLoading={isGeneratingPlan}
          onSubmit={handleGenerate}
        />
      </MobileShell>
    );
  }

  return (
    <MobileShell hasPlan tab={tab} setTab={setTab}>
      <ConfettiEffect trigger={completionPulse?.nonce} />
      <div className="flex h-full min-h-0 flex-col">
        <MobileTopStatus
          completionRate={completionRate}
          currentIndex={currentIndex}
          total={visibleTasks.length}
          streak={streak}
        />
        <div className="min-h-0 flex-1">
          <AnimatePresence mode="wait">
            {tab === "task" ? (
              <MobilePunchCard
                key="task"
                task={currentTask}
                phase={phase}
                activePulse={completionPulse?.taskId === currentTask?.id || lastCompletedTaskId === currentTask?.id}
                onStart={() => setPhase("detail")}
                onComplete={handleComplete}
                onBreakTask={handleBreakTask}
                onSkip={handleSkip}
                onNext={goNextTask}
                onProof={() => {
                  setProofIndex(0);
                  setTab("proof");
                }}
                onCoach={() => setTab("coach")}
              />
            ) : null}
            {tab === "proof" ? (
              <MobileProofScreen
                key="proof"
                proofs={proofs}
                proofIndex={proofIndex}
                setProofIndex={setProofIndex}
                onTask={() => setTab("task")}
              />
            ) : null}
            {tab === "coach" ? (
              <MobileCoachScreen
                key="coach"
                messages={coachMessages}
                isTyping={isCoachTyping}
                onSend={sendCoachMessage}
              />
            ) : null}
            {tab === "result" ? (
              <MobileResultScreen
                key="result"
                readiness={readinessScore.value}
                label={readinessScore.label}
                proofCount={proofs.length}
                nextMove={readinessScore.nextBestMove}
                finalMemoryLine={finalMemoryLine}
                onGenerateMemory={() => void generateFinalMemoryLineForGoal()}
                onTask={() => setTab("task")}
              />
            ) : null}
          </AnimatePresence>
        </div>
      </div>
    </MobileShell>
  );
}

function MobileShell({
  children,
  hasPlan,
  tab,
  setTab
}: {
  children: React.ReactNode;
  hasPlan: boolean;
  tab: MobileTab;
  setTab: (tab: MobileTab) => void;
}) {
  return (
    <main className="fixed inset-0 overflow-hidden bg-[#f4efe7] text-[#211f1c]">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_12%,rgba(255,255,255,0.9),transparent_32%),radial-gradient(circle_at_86%_84%,rgba(246,202,66,0.18),transparent_32%),linear-gradient(180deg,#f8f3ea_0%,#eee6db_100%)]" />
      <div className="relative mx-auto flex h-[100dvh] max-w-[480px] flex-col overflow-hidden px-4 pb-[calc(env(safe-area-inset-bottom)+96px)] pt-[calc(env(safe-area-inset-top)+14px)]">
        {children}
      </div>
      {hasPlan ? <MobileBottomDock tab={tab} setTab={setTab} /> : null}
    </main>
  );
}

function MobileGoalScreen({
  goal,
  setGoal,
  isLoading,
  onSubmit
}: {
  goal: string;
  setGoal: (goal: string) => void;
  isLoading: boolean;
  onSubmit: (event: FormEvent<HTMLFormElement>) => void;
}) {
  return (
    <section className="flex h-full flex-col justify-between">
      <div>
        <div className="mb-7 flex items-center justify-between">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#211f1c] text-[#f8f3ea] shadow-[0_18px_48px_rgba(33,31,28,0.2)]">
            <Sparkles className="h-6 w-6" />
          </div>
          <span className="rounded-full border border-[#ded7cc] bg-white/62 px-4 py-2 text-xs font-black uppercase tracking-[0.18em] text-[#746b60]">
            Mobile APK
          </span>
        </div>
        <p className="text-sm font-black uppercase tracking-[0.26em] text-[#8a7d70]">Plan Coach Plus</p>
        <h1 className="mt-4 text-5xl font-black leading-[0.96] tracking-[-0.08em] text-[#211f1c]">
          把目标变成今天能打卡的一步。
        </h1>
        <p className="mt-5 text-lg font-bold leading-7 text-[#71675c]">
          手机端只保留一个动作：生成计划，然后像记单词一样一张一张完成任务。
        </p>
      </div>
      <form onSubmit={onSubmit} className="rounded-[2.2rem] border border-[#e4dacb] bg-[#fbf7ef]/82 p-4 shadow-[0_28px_80px_rgba(43,38,30,0.1)]">
        <Textarea
          value={goal}
          onChange={(event) => setGoal(event.target.value)}
          placeholder={fallbackGoal}
          className="h-36 min-h-0 resize-none rounded-[1.7rem] bg-white/80 px-5 py-5 text-xl font-black leading-7"
        />
        <Button
          type="submit"
          size="xl"
          className="mt-4 h-16 w-full rounded-full bg-[#211f1c] text-lg font-black text-[#f8f3ea]"
          disabled={isLoading}
          data-testid="mobile-generate-plan"
        >
          {isLoading ? <Loader2 className="mr-3 h-5 w-5 animate-spin" /> : <Sparkles className="mr-3 h-5 w-5" />}
          {isLoading ? "正在生成执行系统" : "生成执行系统"}
        </Button>
      </form>
    </section>
  );
}

function MobileTopStatus({
  completionRate,
  currentIndex,
  total,
  streak
}: {
  completionRate: number;
  currentIndex: number;
  total: number;
  streak: number;
}) {
  return (
    <header className="mb-3 shrink-0 rounded-[1.8rem] border border-[#e4dacb] bg-[#fbf7ef]/78 p-4 shadow-[0_18px_55px_rgba(43,38,30,0.08)]">
      <div className="flex items-center justify-between gap-3">
        <div>
          <p className="text-xs font-black uppercase tracking-[0.22em] text-[#8a7d70]">Today Punch</p>
          <p className="mt-1 text-3xl font-black tracking-[-0.06em]">{completionRate}%</p>
        </div>
        <div className="flex items-center gap-2">
          {Array.from({ length: Math.max(total, 1) }).slice(0, 5).map((_, index) => (
            <span
              key={index}
              className={cn(
                "h-3 w-3 rounded-full border border-[#cfc3b2]",
                index < currentIndex ? "bg-[#19a974]" : index === currentIndex ? "bg-[#211f1c]" : "bg-white/82"
              )}
            />
          ))}
        </div>
        <div className="text-right">
          <p className="text-xs font-black uppercase tracking-[0.22em] text-[#8a7d70]">Streak</p>
          <p className="mt-1 text-3xl font-black tracking-[-0.06em]">{streak}</p>
        </div>
      </div>
    </header>
  );
}

function MobilePunchCard({
  task,
  phase,
  activePulse,
  onStart,
  onComplete,
  onBreakTask,
  onSkip,
  onNext,
  onProof,
  onCoach
}: {
  task?: PlanTask;
  phase: MobileTaskPhase;
  activePulse?: boolean;
  onStart: () => void;
  onComplete: () => void;
  onBreakTask: () => void;
  onSkip: () => void;
  onNext: () => void;
  onProof: () => void;
  onCoach: () => void;
}) {
  if (!task) return null;

  if (phase === "reward") {
    return <MobileRewardOverlay onNext={onNext} onProof={onProof} onCoach={onCoach} />;
  }

  if (phase === "finished") {
    return (
      <MobileCard>
        <div className="flex h-full flex-col items-center justify-center text-center">
          <Trophy className="h-16 w-16 text-[#19a974]" />
          <h2 className="mt-6 text-4xl font-black leading-[0.98] tracking-[-0.07em]">今天的执行闭环已经形成。</h2>
          <Button size="xl" className="mt-8 h-14 rounded-full bg-[#211f1c] px-8 text-[#f8f3ea]" onClick={onProof}>
            查看 Proof
          </Button>
        </div>
      </MobileCard>
    );
  }

  const detailOpen = phase === "detail";

  return (
    <motion.div
      initial={{ opacity: 0, y: 24, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: activePulse ? [1, 1.03, 1] : 1 }}
      exit={{ opacity: 0, y: -18, scale: 0.98 }}
      className="h-full"
      data-testid="mobile-punch-card"
    >
      <MobileCard>
        <div className="flex h-full flex-col">
          <div className="flex items-center justify-between">
            <span className="rounded-full bg-[#211f1c] px-4 py-2 text-sm font-black text-[#f8f3ea]">任务卡</span>
            <span className="rounded-full bg-white/72 px-4 py-2 text-sm font-black text-[#746b60]">{task.estimateMinutes} 分钟</span>
          </div>
          <div className="flex flex-1 flex-col justify-center py-5 text-center">
            <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-full bg-[#f6ca42] shadow-[0_16px_40px_rgba(212,158,24,0.22)]">
              <Target className="h-7 w-7" />
            </div>
            <h2 className="text-4xl font-black leading-[0.96] tracking-[-0.075em]">{task.title}</h2>
            <p className="mt-4 line-clamp-2 text-base font-bold leading-6 text-[#746b60]">{task.encouragement}</p>
          </div>
          <AnimatePresence initial={false}>
            {detailOpen ? (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="overflow-hidden"
              >
                <div className="mb-3 rounded-[1.6rem] bg-white/68 p-4">
                  <p className="line-clamp-3 text-base font-black leading-6 text-[#3a342d]">{task.description}</p>
                </div>
                {task.isBrokenDown ? (
                  <div className="mb-3 grid gap-2">
                    {task.miniTasks.slice(0, 3).map((item) => (
                      <div key={item.id} className="flex items-center gap-2 rounded-2xl bg-white/70 px-3 py-2 text-sm font-black text-[#3a342d]">
                        <CheckCircle2 className="h-4 w-4 shrink-0 text-[#19a974]" />
                        <span className="line-clamp-1">{item.title}</span>
                      </div>
                    ))}
                  </div>
                ) : null}
              </motion.div>
            ) : null}
          </AnimatePresence>
          {detailOpen ? (
            <div className="grid shrink-0 gap-2">
              <Button size="lg" className="h-14 rounded-full bg-[#19a974] text-lg font-black text-white" onClick={onComplete} data-testid="mobile-complete-task">
                <CheckCircle2 className="mr-2 h-5 w-5" />
                完成
              </Button>
              <div className="grid grid-cols-2 gap-2">
                <Button size="lg" variant="secondary" className="h-13 rounded-full bg-white/80 text-base font-black" onClick={onBreakTask}>
                  拆小
                </Button>
                <Button size="lg" variant="outline" className="h-13 rounded-full border-[#d8cbb9] bg-white/42 text-base font-black" onClick={onSkip}>
                  跳过
                </Button>
              </div>
            </div>
          ) : (
            <Button size="xl" className="h-16 shrink-0 rounded-full bg-[#211f1c] text-lg font-black text-[#f8f3ea]" onClick={onStart} data-testid="mobile-start-task">
              <Play className="mr-2 h-5 w-5" />
              开始
            </Button>
          )}
        </div>
      </MobileCard>
    </motion.div>
  );
}

function MobileRewardOverlay({
  onNext,
  onProof,
  onCoach
}: {
  onNext: () => void;
  onProof: () => void;
  onCoach: () => void;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -18, scale: 0.98 }}
      className="h-full"
      data-testid="mobile-reward"
    >
      <MobileCard className="border-[#bfe7d5] bg-[#eef8f3]/92">
        <div className="flex h-full flex-col items-center justify-center text-center">
          <div className="relative flex h-24 w-24 items-center justify-center rounded-full bg-[#19a974] text-white shadow-[0_24px_70px_rgba(25,169,116,0.28)]">
            <span className="absolute inset-[-18px] animate-ring-burst rounded-full border border-[#19a974]/50" />
            <BadgeCheck className="h-12 w-12" />
          </div>
          <h2 className="mt-8 text-4xl font-black leading-[0.98] tracking-[-0.07em] text-[#123f39]">Proof 已生成。</h2>
          <p className="mt-4 text-lg font-bold leading-7 text-[#4f6b61]">
            你完成的不只是任务，它已经变成可以展示的进展证据。
          </p>
          <div className="mt-8 grid w-full gap-2">
            <Button size="lg" className="h-14 rounded-full bg-[#211f1c] text-lg font-black text-[#f8f3ea]" onClick={onNext}>
              继续下一步
              <ChevronRight className="ml-2 h-5 w-5" />
            </Button>
            <div className="grid grid-cols-2 gap-2">
              <Button size="lg" variant="secondary" className="h-13 rounded-full bg-white/82 font-black" onClick={onProof}>
                查看证据
              </Button>
              <Button size="lg" variant="outline" className="h-13 rounded-full border-[#b9ddcf] bg-white/42 font-black" onClick={onCoach}>
                问 Coach
              </Button>
            </div>
          </div>
        </div>
      </MobileCard>
    </motion.div>
  );
}

function MobileProofScreen({
  proofs,
  proofIndex,
  setProofIndex,
  onTask
}: {
  proofs: ReturnType<typeof usePlanStore.getState>["proofs"];
  proofIndex: number;
  setProofIndex: (index: number) => void;
  onTask: () => void;
}) {
  const proof = proofs[proofIndex];
  return (
    <MobileCard>
      {proof ? (
        <div className="flex h-full flex-col">
          <p className="text-xs font-black uppercase tracking-[0.24em] text-[#0f766e]">Proof {proofIndex + 1} / {proofs.length}</p>
          <h2 className="mt-4 text-4xl font-black leading-[0.98] tracking-[-0.07em]">{proof.title}</h2>
          <p className="mt-5 line-clamp-4 text-lg font-bold leading-7 text-[#32544c]">{proof.evidence}</p>
          <div className="mt-4 flex flex-wrap gap-2">
            {proof.tags.map((tag) => (
              <span key={tag} className="rounded-full bg-[#eef8f3] px-3 py-2 text-xs font-black text-[#123f39]">{tag}</span>
            ))}
          </div>
          <div className="mt-auto grid grid-cols-2 gap-2">
            <Button size="lg" variant="secondary" className="h-13 rounded-full bg-white/78 font-black" disabled={proofIndex === 0} onClick={() => setProofIndex(Math.max(0, proofIndex - 1))}>
              上一条
            </Button>
            <Button size="lg" className="h-13 rounded-full bg-[#211f1c] font-black text-[#f8f3ea]" onClick={() => proofIndex < proofs.length - 1 ? setProofIndex(proofIndex + 1) : onTask()}>
              {proofIndex < proofs.length - 1 ? "下一条" : "继续任务"}
            </Button>
          </div>
        </div>
      ) : (
        <div className="flex h-full flex-col items-center justify-center text-center">
          <BadgeCheck className="h-16 w-16 text-[#a08753]" />
          <h2 className="mt-6 text-4xl font-black leading-[0.98] tracking-[-0.07em]">还没有 Proof。</h2>
          <p className="mt-4 text-lg font-bold text-[#746b60]">完成第一张任务卡后，证据会出现在这里。</p>
          <Button size="lg" className="mt-8 h-14 rounded-full bg-[#211f1c] px-8 text-[#f8f3ea]" onClick={onTask}>
            去打卡
          </Button>
        </div>
      )}
    </MobileCard>
  );
}

function MobileCoachScreen({
  messages,
  isTyping,
  onSend
}: {
  messages: ReturnType<typeof usePlanStore.getState>["coachMessages"];
  isTyping: boolean;
  onSend: (content: string) => Promise<void>;
}) {
  const [message, setMessage] = useState("");
  const latest = messages.slice(-2);
  const quick = ["我今天很累", "任务太难", "帮我压缩成 MVP"];

  const send = async (content: string) => {
    const clean = content.trim();
    if (!clean) return;
    setMessage("");
    await onSend(clean);
  };

  return (
    <MobileCard>
      <div className="flex h-full flex-col">
        <p className="text-xs font-black uppercase tracking-[0.24em] text-[#8a7d70]">AI Coach</p>
        <h2 className="mt-3 text-4xl font-black tracking-[-0.07em]">说真实状态。</h2>
        <div className="mt-4 grid min-h-0 flex-1 gap-3">
          {latest.map((item) => (
            <div
              key={item.id}
              className={cn(
                "rounded-[1.4rem] p-4 text-base font-bold leading-6",
                item.role === "user" ? "ml-8 bg-[#211f1c] text-[#f8f3ea]" : "mr-8 bg-white/76 text-[#332d27]"
              )}
            >
              {item.content}
            </div>
          ))}
          {isTyping ? <div className="mr-8 rounded-[1.4rem] bg-white/76 p-4 text-base font-black">Coach 正在压缩计划...</div> : null}
        </div>
        <div className="mb-3 flex gap-2 overflow-hidden">
          {quick.map((item) => (
            <button key={item} className="rounded-full bg-white/76 px-3 py-2 text-xs font-black text-[#5d554d]" onClick={() => void send(item)}>
              {item}
            </button>
          ))}
        </div>
        <div className="flex gap-2">
          <Input value={message} onChange={(event) => setMessage(event.target.value)} placeholder="这个任务太难" className="h-13 rounded-full px-5 text-base" />
          <Button size="icon" className="h-13 w-13 rounded-full bg-[#211f1c] text-[#f8f3ea]" onClick={() => void send(message)}>
            <Send className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </MobileCard>
  );
}

function MobileResultScreen({
  readiness,
  label,
  proofCount,
  nextMove,
  finalMemoryLine,
  onGenerateMemory,
  onTask
}: {
  readiness: number;
  label: string;
  proofCount: number;
  nextMove: string;
  finalMemoryLine?: string;
  onGenerateMemory: () => void;
  onTask: () => void;
}) {
  return (
    <MobileCard>
      <div className="flex h-full flex-col">
        <p className="text-xs font-black uppercase tracking-[0.24em] text-[#8a7d70]">Result</p>
        <div className="mt-4 rounded-[2rem] bg-[#211f1c] p-6 text-[#f8f3ea]">
          <p className="text-sm font-black uppercase tracking-[0.18em] text-[#d8cbb9]">Readiness</p>
          <p className="mt-2 text-7xl font-black tracking-[-0.1em]">{readiness}<span className="text-2xl text-[#d8cbb9]">/100</span></p>
          <p className="mt-2 text-lg font-black leading-6">{label}</p>
        </div>
        <div className="mt-4 grid grid-cols-2 gap-3">
          <div className="rounded-[1.6rem] bg-white/68 p-4">
            <p className="text-xs font-black uppercase tracking-[0.18em] text-[#8a7d70]">Proof</p>
            <p className="mt-2 text-4xl font-black">{proofCount}</p>
          </div>
          <div className="rounded-[1.6rem] bg-[#eef8f3] p-4">
            <p className="text-xs font-black uppercase tracking-[0.18em] text-[#0f766e]">Next</p>
            <p className="mt-2 line-clamp-3 text-sm font-black leading-5 text-[#123f39]">{nextMove}</p>
          </div>
        </div>
        <div className="mt-4 min-h-0 flex-1 rounded-[1.6rem] bg-white/68 p-4">
          <p className="text-xs font-black uppercase tracking-[0.18em] text-[#8a7d70]">Memory Line</p>
          <p className="mt-3 line-clamp-4 text-2xl font-black leading-7 tracking-[-0.05em]">
            {finalMemoryLine ?? "Plan Coach 把努力变成可证明的进展。"}
          </p>
        </div>
        <div className="mt-3 grid grid-cols-2 gap-2">
          <Button size="lg" variant="secondary" className="h-13 rounded-full bg-white/80 font-black" onClick={onTask}>
            继续打卡
          </Button>
          <Button size="lg" className="h-13 rounded-full bg-[#211f1c] font-black text-[#f8f3ea]" onClick={onGenerateMemory}>
            生成金句
          </Button>
        </div>
      </div>
    </MobileCard>
  );
}

function MobileBottomDock({ tab, setTab }: { tab: MobileTab; setTab: (tab: MobileTab) => void }) {
  const items: Array<{ id: MobileTab; label: string; icon: React.ComponentType<{ className?: string }> }> = [
    { id: "task", label: "任务", icon: CircleDot },
    { id: "proof", label: "Proof", icon: BadgeCheck },
    { id: "coach", label: "Coach", icon: MessageCircle },
    { id: "result", label: "成果", icon: Award }
  ];

  return (
    <nav className="fixed inset-x-0 bottom-[calc(env(safe-area-inset-bottom)+14px)] z-50 mx-auto flex w-[min(92vw,430px)] items-center justify-between rounded-full border border-[#ded7cc] bg-[#fbf7ef]/92 p-2 shadow-[0_24px_70px_rgba(33,31,28,0.18)] backdrop-blur-xl">
      {items.map((item) => {
        const Icon = item.icon;
        const active = tab === item.id;
        return (
          <button
            key={item.id}
            className={cn(
              "flex h-12 min-w-0 flex-1 items-center justify-center gap-1 rounded-full text-xs font-black transition",
              active ? "bg-[#211f1c] text-[#f8f3ea]" : "text-[#6f675e]"
            )}
            onClick={() => setTab(item.id)}
          >
            <Icon className="h-4 w-4" />
            <span>{item.label}</span>
          </button>
        );
      })}
    </nav>
  );
}

function MobileCard({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <div
      className={cn(
        "h-full overflow-hidden rounded-[2.4rem] border border-[#e4dacb] bg-[#fbf7ef]/86 p-5 shadow-[0_28px_80px_rgba(43,38,30,0.11)] backdrop-blur-xl",
        className
      )}
    >
      {children}
    </div>
  );
}
