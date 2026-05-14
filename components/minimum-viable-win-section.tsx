"use client";

import { motion } from "framer-motion";
import { ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { MinimumViableWinPlan } from "@/types";

interface MinimumViableWinSectionProps {
  plan?: MinimumViableWinPlan;
  onActivate: () => Promise<void>;
}

export function MinimumViableWinSection({ plan, onActivate }: MinimumViableWinSectionProps) {
  return (
    <section id="minimum-win" data-testid="minimum-win-section" className="scroll-mt-24 px-5 py-24 sm:px-8">
      <div className="mx-auto grid max-w-[1500px] gap-10 xl:grid-cols-[0.82fr_1fr] xl:items-start">
        <div>
          <p className="mb-5 text-base font-black uppercase tracking-[0.3em] text-[#81796e]">
            Minimum Viable Win
          </p>
          <h2 className="text-5xl font-black leading-[1.02] tracking-[-0.07em] text-[#211f1c] sm:text-7xl">
            来不及的时候，AI 应该帮你做取舍。
          </h2>
          <p className="mt-7 max-w-2xl text-2xl font-bold leading-10 text-[#746b60]">
            不再安慰式鼓励，而是自动压缩到最低可赢版本，保住演示闭环。
          </p>
          <Button
            size="xl"
            variant="warm"
            data-testid="activate-minimum-win"
            className="mt-8 rounded-full bg-[#f6ca42] px-10 text-xl text-[#211f1c] shadow-[0_22px_70px_rgba(212,158,24,0.24)] hover:bg-[#ffd95a]"
            onClick={() => void onActivate()}
          >
            <ShieldCheck className="mr-3 h-6 w-6" />
            帮我保住最低可赢版本
          </Button>
        </div>

        <motion.article
          data-testid={plan ? "minimum-win-card" : "minimum-win-empty"}
          key={plan ? "win-ready" : "win-empty"}
          initial={{ opacity: 0, y: 22 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          className="rounded-[3rem] border border-[#e7ded1] bg-[#fbf7ef]/82 p-7 shadow-[0_30px_100px_rgba(43,38,30,0.08)] sm:p-9"
        >
          {plan ? (
            <div className="grid gap-5">
              <div className="grid gap-5 lg:grid-cols-2">
                <div className="rounded-[2rem] bg-[#eef8f3] p-6">
                  <p className="text-sm font-black uppercase tracking-[0.22em] text-[#0f766e]">必须保留</p>
                  <ul className="mt-4 space-y-3 text-xl font-black leading-8 text-[#123f39]">
                    {plan.mustKeep.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </div>
                <div className="rounded-[2rem] bg-white/70 p-6">
                  <p className="text-sm font-black uppercase tracking-[0.22em] text-[#a08753]">可以砍掉</p>
                  <ul className="mt-4 space-y-3 text-xl font-black leading-8 text-[#4c463f]">
                    {plan.canCut.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </div>
              </div>
              <div className="rounded-[2rem] bg-[#211f1c] p-7 text-[#f8f3ea]">
                <p className="text-sm font-black uppercase tracking-[0.22em] text-[#d8c79a]">60 秒 Demo 必须展示</p>
                <p className="mt-4 text-3xl font-black leading-tight tracking-[-0.04em]">{plan.demoMoment}</p>
              </div>
              <div className="rounded-[2rem] bg-white/70 p-6 text-xl font-black leading-8 text-[#211f1c]">
                最后一小时：{plan.finalHourMove}
              </div>
              <div className="rounded-[2rem] bg-[#fff6d8] p-6 text-xl font-black leading-8 text-[#4f3b10]">
                {plan.advice}
              </div>
            </div>
          ) : (
            <div className="flex min-h-[460px] items-center justify-center text-center">
              <p className="max-w-2xl text-4xl font-black leading-tight tracking-[-0.06em] text-[#211f1c]">
                当你说“来不及了”，这里会生成最低可赢路线。
              </p>
            </div>
          )}
        </motion.article>
      </div>
    </section>
  );
}
