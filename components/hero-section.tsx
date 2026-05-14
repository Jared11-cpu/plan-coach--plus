"use client";

import { motion } from "framer-motion";
import { Brain, CheckCircle2, Flame, Sparkles } from "lucide-react";
import { GlassCard } from "@/components/glass-card";
import { GoalInput } from "@/components/goal-input";
import { usePlanStore } from "@/store/use-plan-store";

const features = [
  {
    title: "AI 自动拆解目标",
    description: "把一个模糊目标拆成阶段、今日重点和最低行动线。",
    icon: Brain
  },
  {
    title: "每天只做最重要的小任务",
    description: "不再被长清单压垮，每天先赢下一个真正关键动作。",
    icon: CheckCircle2
  },
  {
    title: "即时反馈和动态鼓励",
    description: "完成任务后给你可感知的反馈，让坚持变得有回报。",
    icon: Flame
  }
];

export function HeroSection() {
  const generatePlanForGoal = usePlanStore((state) => state.generatePlanForGoal);
  const isGeneratingPlan = usePlanStore((state) => state.isGeneratingPlan);

  const handleGenerate = async (goal: string) => {
    await generatePlanForGoal(goal);
    window.setTimeout(() => {
      document.getElementById("plan")?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 120);
  };

  return (
    <section className="hero-gradient noise-mask min-h-[calc(100vh-80px)] px-5 pb-16 pt-20 sm:px-8">
      <div className="relative z-10 mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="mx-auto max-w-6xl text-center"
        >
          <div className="mx-auto mb-8 inline-flex items-center gap-3 rounded-full border border-white/70 bg-white/55 px-5 py-3 text-base font-bold text-slate-700 shadow-sm backdrop-blur">
            <Sparkles className="h-5 w-5 text-teal-600" />
            Web AI Plan Coach for focused daily execution
          </div>

          <h1 className="text-6xl font-black tracking-tight text-slate-950 sm:text-7xl lg:text-8xl">
            Plan Coach
          </h1>
          <p className="mx-auto mt-8 max-w-4xl text-3xl font-semibold leading-tight text-slate-700 sm:text-4xl">
            把混乱目标，变成每天能完成的小行动
          </p>
          <p className="mx-auto mt-6 max-w-3xl text-xl leading-8 text-slate-500 sm:text-2xl">
            一个大字、沉浸式、有 AI 教练感的网页版计划系统。它不催你变完美，只帮你今天开始。
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 22 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.15, ease: "easeOut" }}
          className="mt-12"
        >
          <GoalInput onGenerate={handleGenerate} isLoading={isGeneratingPlan} />
        </motion.div>

        <div className="mt-14 grid gap-6 lg:grid-cols-3">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 28 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.22 + index * 0.08 }}
              >
                <GlassCard className="h-full p-8">
                  <div className="mb-10 flex h-16 w-16 items-center justify-center rounded-3xl bg-slate-950 text-white shadow-lg shadow-slate-950/15">
                    <Icon className="h-8 w-8" />
                  </div>
                  <h2 className="text-3xl font-black tracking-tight text-slate-950">{feature.title}</h2>
                  <p className="mt-4 text-xl leading-8 text-slate-600">{feature.description}</p>
                </GlassCard>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
