"use client";

import { motion } from "framer-motion";

const steps = [
  {
    label: "Goal",
    title: "目标",
    description: "把混乱想法压成一个当前可执行目标。"
  },
  {
    label: "Plan",
    title: "计划",
    description: "生成今日最小行动，而不是一张越来越长的清单。"
  },
  {
    label: "Action",
    title: "行动",
    description: "进入 Focus 或直接完成任务，先拿下一小步。"
  },
  {
    label: "Proof",
    title: "证据",
    description: "完成后自动生成可用于 Demo、Pitch、复盘的 Proof。"
  }
];

export function GoalToProofOverview() {
  return (
    <section id="proof-flow" className="scroll-mt-24 px-5 py-24 sm:px-8">
      <div className="mx-auto max-w-[1500px]">
        <p className="mb-5 text-base font-black uppercase tracking-[0.3em] text-[#81796e]">
          Goal-to-Proof Engine
        </p>
        <h2 className="max-w-6xl text-5xl font-black leading-[1.02] tracking-[-0.07em] text-[#211f1c] sm:text-7xl lg:text-8xl">
          评委 30 秒内能看懂的，不是任务，是证据链。
        </h2>
        <div className="mt-12 grid gap-5 lg:grid-cols-4">
          {steps.map((step, index) => (
            <motion.article
              key={step.label}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.5, delay: index * 0.06 }}
              className="relative min-h-72 rounded-[2.5rem] border border-[#e7ded1] bg-[#fbf7ef]/72 p-7 shadow-[0_28px_90px_rgba(43,38,30,0.07)]"
            >
              <p className="text-sm font-black uppercase tracking-[0.28em] text-[#a08753]">{step.label}</p>
              <h3 className="mt-8 text-5xl font-black tracking-[-0.08em] text-[#211f1c]">{step.title}</h3>
              <p className="mt-7 text-xl font-bold leading-8 text-[#746b60]">{step.description}</p>
              <div className="absolute bottom-7 right-7 text-6xl font-black tracking-[-0.08em] text-[#211f1c]/10">
                0{index + 1}
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
