"use client";

import { motion } from "framer-motion";
import { Scale } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { JudgeSimulation } from "@/types";

interface JudgeSimulationArenaProps {
  simulations: JudgeSimulation[];
  onGenerate: () => Promise<void>;
}

export function JudgeSimulationArena({ simulations, onGenerate }: JudgeSimulationArenaProps) {
  return (
    <section id="judge" data-testid="judge-section" className="scroll-mt-24 px-5 py-24 sm:px-8">
      <div className="mx-auto max-w-[1500px]">
        <div className="mb-10 flex flex-col gap-7 xl:flex-row xl:items-end xl:justify-between">
          <div>
            <p className="mb-5 text-base font-black uppercase tracking-[0.3em] text-[#81796e]">
              Judge Simulation Arena
            </p>
            <h2 className="max-w-6xl text-5xl font-black leading-[1.02] tracking-[-0.07em] text-[#211f1c] sm:text-7xl">
              提前听见评委最可能问的问题。
            </h2>
          </div>
          <Button
            size="xl"
            data-testid="generate-judge-simulations"
            className="rounded-full bg-[#211f1c] px-10 text-xl text-[#f8f3ea] hover:bg-[#2e2a24]"
            onClick={() => void onGenerate()}
          >
            <Scale className="mr-3 h-6 w-6" />
            模拟评委提问
          </Button>
        </div>

        <div className="grid gap-5 lg:grid-cols-3">
          {simulations.length > 0 ? (
            simulations.map((simulation, index) => (
              <motion.article
                key={simulation.id}
                data-testid="judge-card"
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.45, delay: index * 0.06 }}
                className="rounded-[2.5rem] border border-[#e7ded1] bg-[#fbf7ef]/78 p-7 shadow-[0_28px_90px_rgba(43,38,30,0.08)]"
              >
                <p className="text-base font-black uppercase tracking-[0.22em] text-[#81796e]">
                  {simulation.judgeType}
                </p>
                <div className="mt-6 text-7xl font-black tracking-[-0.08em] text-[#211f1c]">
                  {simulation.score}
                </div>
                <div className="mt-7 space-y-5">
                  <div>
                    <p className="text-sm font-black uppercase tracking-[0.22em] text-[#a08753]">会问什么</p>
                    <p className="mt-2 text-xl font-black leading-8 text-[#211f1c]">{simulation.question}</p>
                  </div>
                  <div>
                    <p className="text-sm font-black uppercase tracking-[0.22em] text-[#a08753]">当前弱点</p>
                    <p className="mt-2 text-lg font-bold leading-7 text-[#746b60]">{simulation.weakness}</p>
                  </div>
                  <div className="rounded-[1.75rem] bg-white/70 p-5">
                    <p className="text-sm font-black uppercase tracking-[0.22em] text-[#0f766e]">推荐回答</p>
                    <p className="mt-2 text-lg font-black leading-7 text-[#123f39]">{simulation.answer}</p>
                  </div>
                </div>
              </motion.article>
            ))
          ) : (
            <div
              data-testid="judge-empty"
              className="lg:col-span-3 rounded-[2.5rem] border border-[#e7ded1] bg-[#fbf7ef]/68 p-10 text-center shadow-[0_28px_90px_rgba(43,38,30,0.07)]"
            >
              <p className="text-4xl font-black tracking-[-0.06em] text-[#211f1c]">
                点击后生成技术、产品、影响力三类评委模拟。
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
