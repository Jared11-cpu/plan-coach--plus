"use client";

import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { CheckCircle2, Pause, Play, RotateCcw } from "lucide-react";
import { ConfettiEffect } from "@/components/confetti-effect";
import { Button } from "@/components/ui/button";
import { usePlanStore } from "@/store/use-plan-store";

const FOCUS_SECONDS = 25 * 60;

function formatTime(seconds: number) {
  const minutes = Math.floor(seconds / 60).toString().padStart(2, "0");
  const remain = (seconds % 60).toString().padStart(2, "0");
  return `${minutes}:${remain}`;
}

export function InlineFocusSection() {
  const tasks = usePlanStore((state) => state.tasks);
  const focusTaskId = usePlanStore((state) => state.focusTaskId);
  const completeTask = usePlanStore((state) => state.completeTask);
  const [seconds, setSeconds] = useState(FOCUS_SECONDS);
  const [running, setRunning] = useState(false);
  const [done, setDone] = useState(false);
  const [burst, setBurst] = useState(0);

  const task = useMemo(
    () => tasks.find((item) => item.id === focusTaskId) ?? tasks.find((item) => item.isMain) ?? tasks[0],
    [focusTaskId, tasks]
  );

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
  }, [done, running]);

  const finish = () => {
    if (task) completeTask(task.id);
    setRunning(false);
    setDone(true);
    setBurst(Date.now());
  };

  return (
    <div className="relative overflow-hidden rounded-[3rem] bg-[#211f1c] px-6 py-14 text-center text-[#f8f3ea] shadow-[0_36px_120px_rgba(32,29,25,0.18)] sm:px-10 sm:py-20">
      <ConfettiEffect trigger={burst} />
      <div className="absolute inset-0 opacity-30 [background:radial-gradient(circle_at_50%_30%,rgba(255,246,226,0.18),transparent_38%)]" />
      <div className="relative z-10 mx-auto max-w-5xl">
        <p className="mb-7 text-base font-black uppercase tracking-[0.42em] text-[#b8fff3]">Focus Mode</p>
        <h3 className="text-4xl font-black leading-[1.05] tracking-[-0.06em] sm:text-6xl lg:text-7xl">
          {task?.title ?? "选择一个当前任务"}
        </h3>
        <p className="mx-auto mt-6 max-w-2xl text-2xl font-black leading-9 text-white/72">
          一次只推进一个可证明成果。
        </p>
        <motion.div
          key={seconds}
          initial={{ opacity: 0.86, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          className="mt-12 text-7xl font-black tracking-[-0.08em] sm:text-9xl"
        >
          {formatTime(seconds)}
        </motion.div>
        <div className="mt-10 flex flex-col justify-center gap-4 sm:flex-row">
          <Button
            size="xl"
            variant="secondary"
            data-testid="landing-focus-start"
            className="rounded-full bg-[#f8f3ea] text-xl text-[#211f1c] hover:bg-white"
            onClick={() => setRunning(true)}
          >
            <Play className="mr-3 h-6 w-6" />
            开始
          </Button>
          <Button
            size="xl"
            variant="outline"
            data-testid="landing-focus-pause"
            className="rounded-full border-white/15 bg-white/10 text-xl text-white hover:bg-white/15"
            onClick={() => setRunning(false)}
          >
            <Pause className="mr-3 h-6 w-6" />
            暂停
          </Button>
          <Button
            size="xl"
            variant="success"
            data-testid="landing-focus-complete"
            className="rounded-full text-xl"
            onClick={finish}
          >
            <CheckCircle2 className="mr-3 h-6 w-6" />
            完成
          </Button>
          <Button
            size="xl"
            variant="ghost"
            className="rounded-full text-xl text-white/80 hover:bg-white/10 hover:text-white"
            onClick={() => {
              setSeconds(FOCUS_SECONDS);
              setDone(false);
              setRunning(false);
            }}
          >
            <RotateCcw className="mr-3 h-6 w-6" />
            重置
          </Button>
        </div>
        <AnimatePresence>
          {done ? (
            <motion.div
              initial={{ opacity: 0, y: 18, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 18 }}
              className="mx-auto mt-10 max-w-3xl rounded-[2rem] border border-white/10 bg-white/8 p-7 text-3xl font-black leading-tight backdrop-blur"
            >
              这一轮完成了，你又赢回了一点掌控感。
            </motion.div>
          ) : null}
        </AnimatePresence>
      </div>
    </div>
  );
}
