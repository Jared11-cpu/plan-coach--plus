"use client";

import { create } from "zustand";
import { defaultGoal, defaultTasks, initialCoachMessages } from "@/data/mock-data";
import {
  adjustPlanByMood,
  breakTaskIntoMiniTasks,
  calculateReadinessScore,
  generateCoachReply,
  generateDailyReview,
  generateDemoStory,
  generateExecutionMap,
  generateFinalMemoryLine,
  generateJudgeSimulations,
  generateMinimumViableWinPlan,
  generatePlan,
  generateProofFromTask
} from "@/lib/mock-ai";
import type {
  CoachMessage,
  DailyReview,
  DemoStory,
  ExecutionMap,
  ExecutionMapMode,
  Goal,
  JudgeSimulation,
  MinimumViableWinPlan,
  Mood,
  Plan,
  PlanTask,
  ProofItem,
  ReadinessScore,
  ReflectionInput
} from "@/types";

interface CompletionPulse {
  taskId: string;
  nonce: number;
}

interface PlanCoachState {
  goals: Goal[];
  activeGoal: Goal;
  plan?: Plan;
  tasks: PlanTask[];
  coachMessages: CoachMessage[];
  streak: number;
  lowEnergyMode: boolean;
  focusTaskId?: string;
  completionPulse?: CompletionPulse;
  coachBanner?: string;
  review?: DailyReview;
  proofs: ProofItem[];
  executionMap: ExecutionMap;
  selectedMapNodeId?: string;
  mapMode: ExecutionMapMode;
  demoStory?: DemoStory;
  judgeSimulations: JudgeSimulation[];
  readinessScore: ReadinessScore;
  minimumViableWin?: MinimumViableWinPlan;
  finalMemoryLine?: string;
  isGeneratingPlan: boolean;
  isCoachTyping: boolean;
  addGoal: (goalTitle: string) => Promise<void>;
  generatePlanForGoal: (goalTitle: string) => Promise<void>;
  completeTask: (taskId: string) => void;
  skipTask: (taskId: string) => void;
  breakTask: (taskId: string) => Promise<void>;
  toggleMiniTasks: (taskId: string) => void;
  activateLowEnergyMode: () => Promise<void>;
  clearCoachBanner: () => void;
  sendCoachMessage: (content: string) => Promise<void>;
  setFocusTask: (taskId: string) => void;
  submitReflection: (reflection: ReflectionInput) => Promise<void>;
  refreshExecutionMap: () => void;
  selectMapNode: (nodeId: string) => void;
  setMapMode: (mode: ExecutionMapMode) => void;
  generateDemoStoryForGoal: () => Promise<void>;
  generateJudgeSimulationsForGoal: () => Promise<void>;
  activateMinimumViableWin: () => Promise<void>;
  generateFinalMemoryLineForGoal: () => Promise<void>;
}

const now = () => new Date().toISOString();
const uuid = (prefix: string) => `${prefix}-${Math.random().toString(36).slice(2, 10)}`;

const hasCompletedTask = (tasks: PlanTask[]) => tasks.some((task) => task.status === "completed");

const initialReadiness: ReadinessScore = {
  value: 18,
  label: "还需要先完成核心 Proof",
  nextBestMove: "先生成计划，再完成今日最小行动。",
  demoConfidence: "低",
  riskLevel: "高"
};

const buildExecutionMap = (goal: Goal, tasks: PlanTask[], proofs: ProofItem[]) =>
  generateExecutionMap(goal.title, tasks, proofs);

export const usePlanStore = create<PlanCoachState>((set, get) => ({
  goals: [defaultGoal],
  activeGoal: defaultGoal,
  tasks: defaultTasks,
  coachMessages: initialCoachMessages,
  streak: 5,
  lowEnergyMode: false,
  proofs: [],
  executionMap: buildExecutionMap(defaultGoal, defaultTasks, []),
  selectedMapNodeId: "goal-root",
  mapMode: "tasks",
  judgeSimulations: [],
  readinessScore: initialReadiness,
  isGeneratingPlan: false,
  isCoachTyping: false,

  addGoal: async (goalTitle) => {
    const goal: Goal = {
      id: uuid("goal"),
      title: goalTitle,
      createdAt: now(),
      horizonDays: 30
    };

    set((state) => ({
      goals: [goal, ...state.goals],
      activeGoal: goal
    }));
  },

  generatePlanForGoal: async (goalTitle) => {
    const goal: Goal = {
      id: uuid("goal"),
      title: goalTitle,
      createdAt: now(),
      horizonDays: 30
    };

    set({ isGeneratingPlan: true, activeGoal: goal, goals: [goal, ...get().goals] });
    const plan = await generatePlan(goalTitle);
    set({
      plan: { ...plan, goalId: goal.id },
      tasks: plan.tasks,
      lowEnergyMode: false,
      proofs: [],
      executionMap: buildExecutionMap(goal, plan.tasks, []),
      selectedMapNodeId: "goal-root",
      mapMode: "tasks",
      demoStory: undefined,
      judgeSimulations: [],
      minimumViableWin: undefined,
      finalMemoryLine: undefined,
      readinessScore: calculateReadinessScore(plan.tasks, []),
      isGeneratingPlan: false,
      coachBanner: "计划已生成。今天先赢下最小的一步，不用急着证明全部。"
    });
  },

  completeTask: (taskId) => {
    const before = get().tasks;
    const firstCompletionToday = !hasCompletedTask(before);
    const completedTask = before.find((task) => task.id === taskId);
    const proofAlreadyExists = get().proofs.some((proof) => proof.taskId === taskId);

    const nextTasks = before.map((task) =>
      task.id === taskId ? { ...task, status: "completed" as const, isBrokenDown: false } : task
    );
    const nextReadiness = calculateReadinessScore(
      nextTasks,
      get().proofs,
      get().demoStory,
      get().judgeSimulations,
      get().minimumViableWin
    );

    set((state) => ({
      tasks: nextTasks,
      streak: firstCompletionToday ? state.streak + 1 : state.streak,
      completionPulse: { taskId, nonce: Date.now() },
      executionMap: buildExecutionMap(state.activeGoal, nextTasks, state.proofs),
      selectedMapNodeId: `task-${taskId}`,
      readinessScore: nextReadiness,
      coachBanner: "很好，你不是完成了任务，你是在重建自己的掌控感。"
    }));

    if (completedTask && !proofAlreadyExists) {
      void generateProofFromTask(completedTask, get().activeGoal.title).then((proof) => {
        set((state) => {
          const proofs = [proof, ...state.proofs];
          return {
            proofs,
            executionMap: buildExecutionMap(state.activeGoal, state.tasks, proofs),
            selectedMapNodeId: `proof-${proof.id}`,
            mapMode: "proofs",
            readinessScore: calculateReadinessScore(
              state.tasks,
              proofs,
              state.demoStory,
              state.judgeSimulations,
              state.minimumViableWin
            ),
            coachBanner: "Proof 已生成：你的完成动作现在变成了可展示证据。"
          };
        });
      });
    }
  },

  skipTask: (taskId) => {
    set((state) => ({
      tasks: state.tasks.map((task) => (task.id === taskId ? { ...task, status: "skipped" } : task)),
      executionMap: buildExecutionMap(
        state.activeGoal,
        state.tasks.map((task) => (task.id === taskId ? { ...task, status: "skipped" } : task)),
        state.proofs
      ),
      readinessScore: calculateReadinessScore(
        state.tasks.map((task) => (task.id === taskId ? { ...task, status: "skipped" } : task)),
        state.proofs,
        state.demoStory,
        state.judgeSimulations,
        state.minimumViableWin
      ),
      coachBanner: "已跳过。跳过不是失败，我们把注意力留给真正重要的下一步。"
    }));
  },

  breakTask: async (taskId) => {
    const target = get().tasks.find((task) => task.id === taskId);
    if (!target) return;

    if (target.miniTasks.length > 0) {
      get().toggleMiniTasks(taskId);
      return;
    }

    const miniTasks = await breakTaskIntoMiniTasks(target);
    set((state) => ({
      tasks: state.tasks.map((task) =>
        task.id === taskId ? { ...task, miniTasks, isBrokenDown: true } : task
      ),
      executionMap: buildExecutionMap(
        state.activeGoal,
        state.tasks.map((task) =>
          task.id === taskId ? { ...task, miniTasks, isBrokenDown: true } : task
        ),
        state.proofs
      ),
      selectedMapNodeId: `task-${taskId}`
    }));
  },

  toggleMiniTasks: (taskId) => {
    set((state) => ({
      tasks: state.tasks.map((task) =>
        task.id === taskId ? { ...task, isBrokenDown: !task.isBrokenDown } : task
      ),
      executionMap: buildExecutionMap(
        state.activeGoal,
        state.tasks.map((task) =>
          task.id === taskId ? { ...task, isBrokenDown: !task.isBrokenDown } : task
        ),
        state.proofs
      ),
      selectedMapNodeId: `task-${taskId}`
    }));
  },

  activateLowEnergyMode: async () => {
    const message = await adjustPlanByMood("很累");
    set((state) => ({
      lowEnergyMode: true,
      tasks: state.tasks.map((task, index) =>
        index === 0 ? { ...task, isMain: true } : { ...task, status: "deferred" }
      ),
      executionMap: buildExecutionMap(
        state.activeGoal,
        state.tasks.map((task, index) =>
          index === 0 ? { ...task, isMain: true } : { ...task, status: "deferred" }
        ),
        state.proofs
      ),
      coachBanner: message
    }));
  },

  clearCoachBanner: () => set({ coachBanner: undefined }),

  sendCoachMessage: async (content) => {
    const userMessage: CoachMessage = {
      id: uuid("msg-user"),
      role: "user",
      content,
      createdAt: now()
    };

    set((state) => ({
      coachMessages: [...state.coachMessages, userMessage],
      isCoachTyping: true
    }));

    const tasks = get().tasks;
    const completed = tasks.filter((task) => task.status === "completed").length;
    const completionRate = tasks.length ? Math.round((completed / tasks.length) * 100) : 0;

    const reply = await generateCoachReply(content, {
      activeGoal: get().activeGoal,
      tasks,
      completionRate,
      lowEnergyMode: get().lowEnergyMode,
      streak: get().streak
    });

    const assistantMessage: CoachMessage = {
      id: uuid("msg-ai"),
      role: "assistant",
      content: reply,
      createdAt: now()
    };

    set((state) => ({
      coachMessages: [...state.coachMessages, assistantMessage],
      isCoachTyping: false
    }));
  },

  setFocusTask: (taskId) => set({ focusTaskId: taskId }),

  submitReflection: async (reflection) => {
    const review = await generateDailyReview(reflection);
    set({ review, coachBanner: "复盘已生成。明天的计划会更贴近真实状态。" });
  },

  refreshExecutionMap: () => {
    set((state) => ({
      executionMap: buildExecutionMap(state.activeGoal, state.tasks, state.proofs)
    }));
  },

  selectMapNode: (nodeId) => set({ selectedMapNodeId: nodeId }),

  setMapMode: (mode) => set({ mapMode: mode }),

  generateDemoStoryForGoal: async () => {
    const story = await generateDemoStory(get().activeGoal.title, get().tasks, get().proofs);
    set((state) => ({
      demoStory: story,
      readinessScore: calculateReadinessScore(
        state.tasks,
        state.proofs,
        story,
        state.judgeSimulations,
        state.minimumViableWin
      ),
      coachBanner: "60 秒演示脚本已生成，可以直接拿去彩排。"
    }));
  },

  generateJudgeSimulationsForGoal: async () => {
    const judgeSimulations = await generateJudgeSimulations(get().activeGoal.title, get().tasks, get().proofs);
    set((state) => ({
      judgeSimulations,
      readinessScore: calculateReadinessScore(
        state.tasks,
        state.proofs,
        state.demoStory,
        judgeSimulations,
        state.minimumViableWin
      ),
      coachBanner: "评委模拟已生成：现在可以提前准备最难的问题。"
    }));
  },

  activateMinimumViableWin: async () => {
    const minimumViableWin = await generateMinimumViableWinPlan(get().activeGoal.title, get().tasks);
    set((state) => {
      const nextTasks = state.tasks.map((task, index) =>
        index <= 1 ? { ...task, status: task.status === "deferred" ? "todo" : task.status } : { ...task, status: "deferred" as const }
      );
      return {
        lowEnergyMode: true,
        tasks: nextTasks,
        minimumViableWin,
        executionMap: buildExecutionMap(state.activeGoal, nextTasks, state.proofs),
        mapMode: "demo",
        readinessScore: calculateReadinessScore(
          nextTasks,
          state.proofs,
          state.demoStory,
          state.judgeSimulations,
          minimumViableWin
        ),
        coachBanner: "Minimum Viable Win 已开启：现在只保留最低可赢闭环。"
      };
    });
  },

  generateFinalMemoryLineForGoal: async () => {
    const finalMemoryLine = await generateFinalMemoryLine(get().activeGoal.title, get().proofs);
    set({ finalMemoryLine, coachBanner: "最终记忆金句已生成，可以作为答辩收尾。" });
  }
}));
