"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, Sparkles } from "lucide-react";
import { analyticsMetrics } from "@/data/mock-data";
import { GlassCard } from "@/components/glass-card";

export function AnalyticsPage() {
  return (
    <main className="min-h-screen px-5 py-10 sm:px-8">
      <div className="mx-auto max-w-7xl">
        <p className="mb-5 inline-flex items-center gap-3 rounded-full bg-white/70 px-5 py-3 text-base font-bold text-slate-600 shadow-sm backdrop-blur">
          <Sparkles className="h-5 w-5 text-teal-600" />
          Growth Analytics
        </p>
        <h1 className="text-5xl font-black tracking-tight text-slate-950 sm:text-7xl">不是小图表，是大趋势。</h1>
        <p className="mt-6 max-w-3xl text-2xl font-semibold leading-10 text-slate-600">
          Plan Coach 更关心你的执行质量、状态波动和可持续节奏。
        </p>

        <section className="mt-10 grid gap-6 lg:grid-cols-2">
          {analyticsMetrics.map((metric, index) => (
            <motion.div
              key={metric.label}
              initial={{ opacity: 0, y: 26 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: index * 0.08 }}
            >
              <GlassCard className="min-h-72 p-8 sm:p-10">
                <div className="flex items-start justify-between gap-8">
                  <div>
                    <p className="text-2xl font-black text-slate-500">{metric.label}</p>
                    <h2 className="mt-8 text-7xl font-black tracking-tight text-slate-950 sm:text-8xl">
                      {metric.value}
                    </h2>
                  </div>
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-950 text-white">
                    <ArrowUpRight className="h-7 w-7" />
                  </div>
                </div>
                <p className="mt-8 max-w-xl text-2xl font-semibold leading-10 text-slate-600">{metric.detail}</p>
              </GlassCard>
            </motion.div>
          ))}
        </section>

        <GlassCard className="mt-8 p-8 sm:p-10">
          <p className="text-xl font-bold text-teal-700">AI 改进建议</p>
          <h2 className="mt-4 max-w-5xl text-4xl font-black leading-tight text-slate-950 sm:text-6xl">
            把输出型任务改成“一个截图 + 三句话说明”，你的拖延概率会明显下降。
          </h2>
        </GlassCard>
      </div>
    </main>
  );
}
