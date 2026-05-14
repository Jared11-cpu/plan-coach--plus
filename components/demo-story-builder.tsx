"use client";

import { motion } from "framer-motion";
import { Mic2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { DemoStory } from "@/types";

interface DemoStoryBuilderProps {
  story?: DemoStory;
  onGenerate: () => Promise<void>;
}

export function DemoStoryBuilder({ story, onGenerate }: DemoStoryBuilderProps) {
  const storyItems = story
    ? [
        ["Problem", story.problem],
        ["Moment", story.moment],
        ["Action", story.action],
        ["Proof", story.proof],
        ["Impact", story.impact]
      ]
    : [];

  return (
    <section id="demo-story" data-testid="demo-story-section" className="scroll-mt-24 px-5 py-24 sm:px-8">
      <div className="mx-auto grid max-w-[1500px] gap-10 xl:grid-cols-[0.78fr_1fr] xl:items-start">
        <div>
          <p className="mb-5 text-base font-black uppercase tracking-[0.3em] text-[#81796e]">Live Demo Story</p>
          <h2 className="text-5xl font-black leading-[1.02] tracking-[-0.07em] text-[#211f1c] sm:text-7xl">
            把 Proof 讲成 60 秒能打动人的故事。
          </h2>
          <p className="mt-7 max-w-2xl text-2xl font-bold leading-10 text-[#746b60]">
            评委不是来看你完成了多少清单，而是看你能不能把核心闭环讲清楚。
          </p>
          <Button
            size="xl"
            data-testid="generate-demo-story"
            className="mt-8 rounded-full bg-[#211f1c] px-10 text-xl text-[#f8f3ea] hover:bg-[#2e2a24]"
            onClick={() => void onGenerate()}
          >
            <Mic2 className="mr-3 h-6 w-6" />
            生成 60 秒比赛演示脚本
          </Button>
        </div>

        <motion.article
          data-testid={story ? "demo-story-card" : "demo-story-empty"}
          key={story ? "story-ready" : "story-empty"}
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          className="rounded-[3rem] border border-[#e7ded1] bg-[#fbf7ef]/82 p-7 shadow-[0_30px_100px_rgba(43,38,30,0.08)] sm:p-9"
        >
          {story ? (
            <>
              <div className="grid gap-4">
                {storyItems.map(([label, content]) => (
                  <div key={label} className="rounded-[2rem] bg-white/64 p-5">
                    <p className="text-sm font-black uppercase tracking-[0.24em] text-[#a08753]">{label}</p>
                    <p className="mt-3 text-xl font-black leading-8 text-[#211f1c]">{content}</p>
                  </div>
                ))}
              </div>
              <div className="mt-6 rounded-[2rem] bg-[#211f1c] p-7 text-3xl font-black leading-tight tracking-[-0.04em] text-[#f8f3ea]">
                {story.closingLine}
              </div>
            </>
          ) : (
            <div className="flex min-h-[520px] items-center justify-center text-center">
              <div>
                <p className="text-5xl font-black tracking-[-0.06em] text-[#211f1c]">等待生成演示故事</p>
                <p className="mx-auto mt-5 max-w-xl text-xl font-bold leading-8 text-[#746b60]">
                  完成至少一条 Proof 后生成，效果最好。脚本会按 Problem、Moment、Action、Proof、Impact 组织。
                </p>
              </div>
            </div>
          )}
        </motion.article>
      </div>
    </section>
  );
}
