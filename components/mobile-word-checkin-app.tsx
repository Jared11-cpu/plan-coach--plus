"use client";

import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowRight,
  BookOpen,
  CheckCircle2,
  Flame,
  PenLine,
  RotateCcw,
  Sparkles,
  Trophy,
  Volume2
} from "lucide-react";

type WordCard = {
  word: string;
  phonetic: string;
  meaning: string;
  scene: string;
  example: string;
  proof: string;
};

const dailyWords: WordCard[] = [
  {
    word: "proof",
    phonetic: "/pruːf/",
    meaning: "证据；证明",
    scene: "把完成的动作变成可展示结果",
    example: "My proof today is one finished sentence.",
    proof: "今天我能用 proof 说清楚：行动要留下证据。"
  },
  {
    word: "focus",
    phonetic: "/ˈfəʊkəs/",
    meaning: "专注；聚焦",
    scene: "一次只做一个最小任务",
    example: "I focus on one tiny task first.",
    proof: "今天我能用 focus 提醒自己：先完成一小步。"
  },
  {
    word: "streak",
    phonetic: "/striːk/",
    meaning: "连续记录；连胜",
    scene: "每天连续打卡形成可见进步",
    example: "My learning streak starts with one word.",
    proof: "今天我能用 streak 记录持续学习的节奏。"
  },
  {
    word: "tiny",
    phonetic: "/ˈtaɪni/",
    meaning: "微小的",
    scene: "把大目标拆成能立刻开始的小动作",
    example: "A tiny action can start a big change.",
    proof: "今天我能用 tiny 设计一个不拖延的小任务。"
  },
  {
    word: "momentum",
    phonetic: "/məˈmentəm/",
    meaning: "势头；推进力",
    scene: "完成后马上进入下一步",
    example: "One check-in gives me momentum.",
    proof: "今天我能用 momentum 描述完成带来的推进感。"
  },
  {
    word: "refine",
    phonetic: "/rɪˈfaɪn/",
    meaning: "改进；打磨",
    scene: "复盘后把计划变得更简单",
    example: "I refine my plan after each try.",
    proof: "今天我能用 refine 表达小步优化。"
  },
  {
    word: "habit",
    phonetic: "/ˈhæbɪt/",
    meaning: "习惯",
    scene: "把学习变成每天自动发生的动作",
    example: "A small habit is easier to keep.",
    proof: "今天我能用 habit 说出可坚持的学习方式。"
  }
];

const taskCopy = [
  {
    title: "听读 3 遍",
    description: "读音 + 拼写",
    icon: Volume2
  },
  {
    title: "看懂场景",
    description: "知道何时用",
    icon: BookOpen
  },
  {
    title: "造句打卡",
    description: "留下 Proof",
    icon: PenLine
  }
];

const storageKey = "plan-coach-word-punch";

function getTodayKey() {
  return new Date().toISOString().slice(0, 10);
}

function getDailyIndex() {
  const today = new Date();
  const start = new Date(today.getFullYear(), 0, 0);
  const diff = today.getTime() - start.getTime();
  const day = Math.floor(diff / 86_400_000);
  return day % dailyWords.length;
}

function classNames(...names: Array<string | false | null | undefined>) {
  return names.filter(Boolean).join(" ");
}

export function MobileWordCheckinApp() {
  const todayKey = useMemo(() => getTodayKey(), []);
  const [wordIndex, setWordIndex] = useState(0);
  const [doneTasks, setDoneTasks] = useState<boolean[]>([false, false, false]);
  const [sentence, setSentence] = useState("");
  const [streak, setStreak] = useState(0);
  const [doneDate, setDoneDate] = useState("");
  const [hydrated, setHydrated] = useState(false);

  const activeWord = dailyWords[wordIndex];
  const completedCount = doneTasks.filter(Boolean).length;
  const progress = Math.round((completedCount / taskCopy.length) * 100);
  const isComplete = completedCount === taskCopy.length;

  useEffect(() => {
    const defaultIndex = getDailyIndex();
    setWordIndex(defaultIndex);

    try {
      const saved = window.localStorage.getItem(storageKey);
      if (saved) {
        const parsed = JSON.parse(saved) as {
          date?: string;
          wordIndex?: number;
          doneTasks?: boolean[];
          sentence?: string;
          streak?: number;
          doneDate?: string;
        };

        setStreak(parsed.streak ?? 0);
        setDoneDate(parsed.doneDate ?? "");

        if (parsed.date === todayKey) {
          setWordIndex(parsed.wordIndex ?? defaultIndex);
          setDoneTasks(parsed.doneTasks ?? [false, false, false]);
          setSentence(parsed.sentence ?? "");
        }
      }
    } catch {
      window.localStorage.removeItem(storageKey);
    } finally {
      setHydrated(true);
    }
  }, [todayKey]);

  useEffect(() => {
    if (!hydrated) return;

    window.localStorage.setItem(
      storageKey,
      JSON.stringify({
        date: todayKey,
        wordIndex,
        doneTasks,
        sentence,
        streak,
        doneDate
      })
    );
  }, [doneDate, doneTasks, hydrated, sentence, streak, todayKey, wordIndex]);

  const completeTask = (index: number) => {
    setDoneTasks((current) => {
      const next = current.map((done, taskIndex) => (taskIndex === index ? true : done));
      const willComplete = next.every(Boolean);

      if (willComplete && doneDate !== todayKey) {
        setDoneDate(todayKey);
        setStreak((value) => value + 1);
      }

      return next;
    });
  };

  const resetToday = () => {
    setDoneTasks([false, false, false]);
    setSentence("");
    setDoneDate("");
  };

  const nextWord = () => {
    setWordIndex((index) => (index + 1) % dailyWords.length);
    setDoneTasks([false, false, false]);
    setSentence("");
    setDoneDate("");
  };

  return (
    <main
      className="h-[100dvh] max-h-[100dvh] overflow-hidden bg-[#f3eee6] px-4 text-[#211f1c]"
      style={{
        paddingTop: "max(12px, env(safe-area-inset-top))",
        paddingBottom: "max(10px, env(safe-area-inset-bottom))"
      }}
    >
      <div className="mx-auto flex h-full max-w-[430px] flex-col gap-3 overflow-hidden">
        <header className="flex shrink-0 items-center justify-between rounded-[1.7rem] border border-[#e3dbd0] bg-white/70 px-4 py-3 shadow-[0_18px_50px_rgba(43,38,30,0.08)] backdrop-blur-xl">
          <div>
            <p className="flex items-center gap-2 text-[11px] font-black uppercase tracking-[0.24em] text-[#0f9f8c]">
              <Sparkles className="h-3.5 w-3.5" /> Word Punch
            </p>
            <h1 className="mt-1 text-2xl font-black tracking-[-0.06em]">单词小任务打卡</h1>
          </div>
          <div className="rounded-2xl bg-[#211f1c] px-3 py-2 text-right text-[#f8f3ea]">
            <p className="text-[10px] font-black uppercase tracking-[0.18em] text-[#b8fff5]">Streak</p>
            <p className="text-2xl font-black leading-none">{streak}</p>
          </div>
        </header>

        <motion.section
          key={activeWord.word}
          initial={{ opacity: 0, y: 12, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.35, ease: "easeOut" }}
          className="shrink-0 rounded-[2rem] border border-[#e2d8ca] bg-[#fbf7ef]/90 p-4 shadow-[0_20px_70px_rgba(43,38,30,0.08)]"
        >
          <div className="flex items-start justify-between gap-3">
            <div>
              <p className="text-xs font-black uppercase tracking-[0.24em] text-[#81796e]">Today&apos;s word</p>
              <div className="mt-1 flex items-end gap-2">
                <h2 className="text-5xl font-black tracking-[-0.09em] text-[#211f1c]">{activeWord.word}</h2>
                <span className="pb-1 text-sm font-black text-[#0f9f8c]">{activeWord.phonetic}</span>
              </div>
            </div>
            <button
              type="button"
              onClick={nextWord}
              className="rounded-2xl border border-[#ded7cc] bg-white/80 p-3 text-[#211f1c] shadow-sm active:scale-95"
              aria-label="换一个单词"
            >
              <ArrowRight className="h-5 w-5" />
            </button>
          </div>

          <div className="mt-3 grid grid-cols-[0.8fr_1.2fr] gap-2">
            <div className="rounded-2xl bg-white/75 p-3">
              <p className="text-[11px] font-black uppercase tracking-[0.18em] text-[#81796e]">Meaning</p>
              <p className="mt-1 text-lg font-black leading-5">{activeWord.meaning}</p>
            </div>
            <div className="rounded-2xl bg-[#dff7f3] p-3">
              <p className="text-[11px] font-black uppercase tracking-[0.18em] text-[#168878]">Use it</p>
              <p className="mt-1 text-sm font-black leading-5 text-[#23433f]">{activeWord.scene}</p>
            </div>
          </div>
        </motion.section>

        <section className="shrink-0 rounded-[1.8rem] border border-[#e5ded3] bg-white/62 p-3 shadow-[0_18px_55px_rgba(43,38,30,0.06)]">
          <div className="mb-3 flex items-center justify-between">
            <div>
              <p className="text-xs font-black uppercase tracking-[0.22em] text-[#81796e]">Mini tasks</p>
              <p className="text-lg font-black tracking-[-0.04em]">3 步完成今天的词</p>
            </div>
            <div className="relative grid h-12 w-12 place-items-center rounded-full bg-[#211f1c] text-sm font-black text-[#f8f3ea]">
              {progress}%
            </div>
          </div>

          <div className="grid grid-cols-3 gap-2">
            {taskCopy.map((task, index) => {
              const Icon = task.icon;
              const done = doneTasks[index];

              return (
                <button
                  key={task.title}
                  type="button"
                  onClick={() => completeTask(index)}
                  className={classNames(
                    "min-h-[92px] rounded-[1.35rem] border p-2.5 text-left transition active:scale-[0.97]",
                    done
                      ? "border-[#7cd7c9] bg-[#dff7f3] text-[#123f38]"
                      : "border-[#eee4d6] bg-[#fbf7ef] text-[#332d27]"
                  )}
                >
                  <div className="flex items-center justify-between">
                    <Icon className="h-4 w-4" />
                    {done ? <CheckCircle2 className="h-4 w-4 text-[#0f9f8c]" /> : null}
                  </div>
                  <p className="mt-2 text-sm font-black leading-4">{task.title}</p>
                  <p className="mt-1 text-[11px] font-bold leading-4 text-[#746b60]">{task.description}</p>
                </button>
              );
            })}
          </div>
        </section>

        <section className="flex min-h-0 flex-1 flex-col rounded-[1.8rem] border border-[#e5ded3] bg-[#211f1c] p-3 text-[#f8f3ea] shadow-[0_24px_90px_rgba(32,29,25,0.18)]">
          <div className="flex items-start justify-between gap-3">
            <div>
              <p className="text-xs font-black uppercase tracking-[0.22em] text-[#9af2e7]">Proof sentence</p>
              <p className="mt-1 text-sm font-bold leading-5 text-[#d9d2c7]">{activeWord.example}</p>
            </div>
            <button
              type="button"
              onClick={resetToday}
              className="rounded-2xl bg-white/10 p-2.5 text-[#f8f3ea] active:scale-95"
              aria-label="重置今日打卡"
            >
              <RotateCcw className="h-4 w-4" />
            </button>
          </div>

          <textarea
            value={sentence}
            onChange={(event) => setSentence(event.target.value)}
            onFocus={() => completeTask(2)}
            className="mt-3 min-h-0 flex-1 resize-none rounded-[1.35rem] border border-white/10 bg-white/10 p-3 text-base font-bold leading-6 text-white outline-none placeholder:text-[#b7ada2]"
            placeholder={`用 ${activeWord.word} 写一句自己的话...`}
            maxLength={90}
          />

          <div className="mt-3 flex shrink-0 items-center gap-2">
            <button
              type="button"
              onClick={() => completeTask(2)}
              className="flex flex-1 items-center justify-center gap-2 rounded-2xl bg-[#b8fff5] px-4 py-3 text-sm font-black text-[#123f38] active:scale-[0.98]"
            >
              <Trophy className="h-4 w-4" />
              完成打卡
            </button>
            <div className="rounded-2xl bg-white/10 px-3 py-3 text-center">
              <p className="text-[10px] font-black uppercase tracking-[0.18em] text-[#9af2e7]">Done</p>
              <p className="text-sm font-black">{completedCount}/3</p>
            </div>
          </div>
        </section>

        <AnimatePresence>
          {isComplete ? (
            <motion.div
              initial={{ opacity: 0, y: 18, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 18, scale: 0.98 }}
              className="shrink-0 rounded-[1.6rem] border border-[#95e9dd] bg-[#dff7f3] px-4 py-3 text-[#123f38] shadow-[0_20px_60px_rgba(15,159,140,0.18)]"
            >
              <div className="flex items-center gap-2">
                <Flame className="h-5 w-5" />
                <p className="text-sm font-black">今日 Proof 已生成</p>
              </div>
              <p className="mt-1 text-sm font-bold leading-5">{sentence.trim() || activeWord.proof}</p>
            </motion.div>
          ) : null}
        </AnimatePresence>
      </div>
    </main>
  );
}
