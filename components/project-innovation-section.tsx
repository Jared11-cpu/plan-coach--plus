"use client";

import { motion } from "framer-motion";
import { BadgeCheck, BrainCircuit, Presentation, ShieldCheck } from "lucide-react";

const innovations = [
  {
    title: "感性目标可视化",
    description: "用户输入的不是任务，而是一个混乱愿望。AI 把它拆成一张可执行地图，让第一步变清楚。",
    icon: BrainCircuit
  },
  {
    title: "Goal-to-Proof",
    description: "完成任务后自动生成 Proof，说明做了什么、证明了什么、能放进 Demo 的哪里。",
    icon: BadgeCheck
  },
  {
    title: "Demo Story Builder",
    description: "把执行过程整理成 60 秒比赛演示脚本，帮助项目从能用走向能讲清楚。",
    icon: Presentation
  },
  {
    title: "Minimum Viable Win",
    description: "状态不好或来不及时，AI 帮你砍掉非必要任务，保住最低可赢版本。",
    icon: ShieldCheck
  }
];

export function ProjectInnovationSection() {
  return (
    <section id="innovation" className="scroll-mt-24 px-5 py-20 sm:px-8">
      <div className="mx-auto max-w-[1500px]">
        <p className="mb-5 text-base font-black uppercase tracking-[0.3em] text-[#81796e]">Project Innovation</p>
        <h2 className="max-w-6xl text-5xl font-black leading-[1.02] tracking-[-0.07em] text-[#211f1c] sm:text-7xl">
          这个项目的创新，不是多一个清单，而是多一条从目标到证明的路。
        </h2>
        <div className="mt-12 grid gap-5 lg:grid-cols-4">
          {innovations.map((item, index) => {
            const Icon = item.icon;
            return (
              <motion.article
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.48, delay: index * 0.05 }}
                className="rounded-[2.5rem] border border-[#e7ded1] bg-[#fbf7ef]/74 p-7 shadow-[0_24px_80px_rgba(43,38,30,0.07)]"
              >
                <Icon className="h-9 w-9 text-[#211f1c]" />
                <h3 className="mt-8 text-3xl font-black tracking-[-0.06em] text-[#211f1c]">{item.title}</h3>
                <p className="mt-4 text-lg font-bold leading-7 text-[#746b60]">{item.description}</p>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
