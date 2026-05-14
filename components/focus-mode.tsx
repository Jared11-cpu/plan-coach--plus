"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { CheckCircle2, Pause, Play, RotateCcw } from "lucide-react";
import { ConfettiEffect } from "@/components/confetti-effect";
import { Button } from "@/components/ui/button";
import { usePlanStore } from "@/store/use-plan-store";

const FOCUS_SECONDS = 25 * 60;

const formatTime = (seconds: number) => {
  const minutes = Math.floor(seconds / 60).toString().padStart(2, "0");
  const remain = (seconds % 60).toString().padStart(2, "0");
  return `${minutes}:${remain}`;
};

export function FocusMode() {
  const tasks = usePlanStore((state) => state.tasks);
  const focusTaskId = usePlanStore((state) => state.focusTaskId);
  const completeTask = usePlanStore((state) => state.completeTask);
  const [seconds, setSeconds] = useState(FOCUS_SECONDS);
  const [running, setRunning] = useState(false);
  const [done, setDone] = useState(false);
  const [burst, setBurst] = useState(0);

  const task = useMemo(() => {
    return tasks.find((item) => item.id === focusTaskId) ?? tasks.find((item) => item.isMain) ?? tasks[0];
  }, [focusTaskId, tasks]);

  useEffect(() => {
    if (!running || done) return;
    const timer = window.setInterval(() => {
      setSeconds((value) => {
        if (value <= 1) {
          window.clearInterval(timer);
          setRunning(false);
          setDone(true);
          setBurst(Date.now());
          return 0;
        }
        return value - 1;
      });
    }, 1000);

    return () => window.clearInterval(timer);
  }, [running, done]);

  const finish = () => {
    if (task) completeTask(task.id);
    setDone(true);
    setRunning(false);
    setBurst(Date.now());
  };

  return (
    <main className="min-h-screen bg-slate-950 px-5 py-8 text-white sm:px-8">
      <ConfettiEffect trigger={burst} />
      <div className="mx-auto flex min-h-[calc(100vh-64px)] max-w-7xl flex-col">
        <div className="flex items-center justify-between">
          <Link href="/dashboard" className="rounded-full border border-white/10 bg-white/5 px-5 py-3 text-lg font-bold text-white/80 backdrop-blur transition hover:bg-white/10">
            返回 Dashboard
          </Link>
          <button
            onClick={() => {
              setSeconds(FOCUS_SECONDS);
              setDone(false);
              setRunning(false);
            }}
            className="rounded-full border border-white/10 bg-white/5 px-5 py-3 text-lg font-bold text-white/80 backdrop-blur transition hover:bg-white/10"
          >
            <RotateCcw className="mr-2 inline h-5 w-5" />
            重置
          </button>
        </div>

        <section className="flex flex-1 items-center justify-center py-12">
          <div className="w-full max-w-6xl text-center">
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-8 text-xl font-bold uppercase tracking-[0.32em] text-teal-200"
            >
              Focus Mode
            </motion.p>
            <motion.h1
              key={task?.id}
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              className="mx-auto max-w-5xl text-5xl font-black leading-[1.05] tracking-tight sm:text-7xl lg:text-8xl"
            >
              {task?.title ?? "选择一个当前任务"}
            </motion.h1>
            <motion.div
              key={seconds}
              initial={{ opacity: 0.85, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              className="mt-14 text-7xl font-black tracking-tight text-white sm:text-9xl"
            >
              {formatTime(seconds)}
            </motion.div>

            <div className="mt-12 flex flex-col justify-center gap-4 sm:flex-row">
              <Button size="xl" variant="secondary" data-testid="focus-start" className="rounded-3xl text-xl" onClick={() => setRunning(true)}>
                <Play className="mr-3 h-6 w-6" />
                开始
              </Button>
              <Button size="xl" variant="outline" data-testid="focus-pause" className="rounded-3xl border-white/15 bg-white/10 text-xl text-white hover:bg-white/15" onClick={() => setRunning(false)}>
                <Pause className="mr-3 h-6 w-6" />
                暂停
              </Button>
              <Button size="xl" variant="success" data-testid="focus-complete" className="rounded-3xl text-xl" onClick={finish}>
                <CheckCircle2 className="mr-3 h-6 w-6" />
                完成
              </Button>
            </div>

            <AnimatePresence>
              {done ? (
                <motion.div
                  initial={{ opacity: 0, y: 24, scale: 0.96 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 24 }}
                  className="glass-dark mx-auto mt-12 max-w-3xl rounded-[2rem] p-8 text-3xl font-black leading-tight"
                >
                  这一轮完成了，你又赢回了一点掌控感。
                </motion.div>
              ) : null}
            </AnimatePresence>
          </div>
        </section>
      </div>
    </main>
  );
}
