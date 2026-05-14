import { defaultTasks } from "@/data/mock-data";
import type {
  DailyReview,
  DemoStory,
  ExecutionMap,
  JudgeSimulation,
  MiniTask,
  MinimumViableWinPlan,
  Plan,
  PlanTask,
  ProofItem,
  ReadinessScore,
  ReflectionInput,
  UserState
} from "@/types";

const wait = (ms = 520) => new Promise((resolve) => setTimeout(resolve, ms));

const id = (prefix: string) => `${prefix}-${Math.random().toString(36).slice(2, 9)}`;

export async function splitGoalIntoTasks(goal: string): Promise<PlanTask[]> {
  await wait(420);

  const normalized = goal.trim() || "建立一个清晰、可执行的 30 天计划";
  const topic = normalized.length > 24 ? normalized.slice(0, 24) : normalized;

  return [
    {
      ...defaultTasks[0],
      id: id("task-main"),
      title: `把「${topic}」拆成今天能开始的第一步`,
      description: "先不追求完整方案，只找到一个今天能在 25 分钟内完成的小动作。",
      isMain: true,
      status: "todo",
      miniTasks: [],
      isBrokenDown: false
    },
    {
      ...defaultTasks[1],
      id: id("task-practice"),
      title: "做一个 20 分钟的最小练习",
      description: "把目标中最关键的技能挑出来，只做一次最小可验证练习。",
      status: "todo",
      miniTasks: [],
      isBrokenDown: false
    },
    {
      ...defaultTasks[2],
      id: id("task-review"),
      title: "写下今天学到的 3 个关键点",
      description: "用很短的句子复盘，帮助大脑把今天的行动归档。",
      status: "todo",
      miniTasks: [],
      isBrokenDown: false
    },
    {
      ...defaultTasks[3],
      id: id("task-proof"),
      title: "留下一份可展示的小成果",
      description: "截图、草稿、链接或一段文字都可以，它会成为答辩时的证据链。",
      status: "todo",
      miniTasks: [],
      isBrokenDown: false
    }
  ];
}

export async function generateDailyPlan(tasks: PlanTask[]): Promise<PlanTask[]> {
  await wait(360);
  return tasks.map((task, index) => ({
    ...task,
    isMain: index === 0,
    status: "todo",
    isBrokenDown: false,
    miniTasks: []
  }));
}

export async function generatePlan(goal: string): Promise<Plan> {
  await wait(760);
  const tasks = await generateDailyPlan(await splitGoalIntoTasks(goal));

  return {
    id: id("plan"),
    goalId: id("goal"),
    title: "30 天 AI 行动计划",
    summary: "先建立每天能开始的惯性，再逐步加深难度。每一天只保留一个最重要动作。",
    createdAt: new Date().toISOString(),
    tasks
  };
}

export async function generateCoachReply(message: string, userState: UserState): Promise<string> {
  await wait(720);
  const lower = message.toLowerCase();

  if (
    message.includes("来不及") ||
    message.includes("最低") ||
    message.includes("MVP") ||
    message.includes("mvp") ||
    message.includes("压缩")
  ) {
    return "现在不要再加功能了。保留输入目标、生成最小行动、完成后生成 Proof、输出 60 秒演示稿这四个点，就已经能形成完整比赛闭环。";
  }

  if (message.includes("评委") || message.includes("普通")) {
    return "评委最容易记住的不是任务列表，而是你把完成动作转化成 Proof 的瞬间。答辩时要强调：Plan Coach 管理的是目标到证据的转化，不是普通 Todo。";
  }

  if (message.includes("pitch") || message.includes("演示")) {
    return "60 秒 pitch 可以这样讲：真实压力下，人不是缺任务清单，而是不知道第一步和如何证明进展。Plan Coach 把目标压成行动，再把行动变成可展示 Proof。";
  }

  if (message.includes("很累") || message.includes("不想") || message.includes("状态不好")) {
    return "那我们今天不拼强度，只保留一个 10 分钟任务。你只需要开始，不需要完美。做完之后就算今天守住了。";
  }

  if (message.includes("太难") || message.includes("不会") || message.includes("卡住")) {
    return "先把任务降到能启动的程度：看一个例子、照着写一遍、再用一句话总结。难不是问题，任务颗粒度太大才是问题。";
  }

  if (message.includes("重新安排") || message.includes("调整") || lower.includes("plan")) {
    return `我建议今天只保留 ${userState.lowEnergyMode ? "1" : "2"} 个动作：先做最小行动，再做一个 10 分钟复盘。这样不会断线，也不会把你压垮。`;
  }

  if (userState.completionRate >= 70) {
    return "你今天已经不是在靠情绪推进了，而是在靠系统推进。剩下的任务可以更轻一点，保持节奏比硬撑更重要。";
  }

  return "我们把今天缩小成一个可以马上开始的动作：打开资料，做 5 分钟，写下一句话。开始以后，阻力会自然下降。";
}

export async function breakTaskIntoMiniTasks(task: PlanTask): Promise<MiniTask[]> {
  await wait(380);

  if (task.title.includes("Hooks") || task.title.includes("React")) {
    return [
      { id: id("mini"), title: "看 5 分钟 useState 示例", done: false },
      { id: id("mini"), title: "自己写一个按钮计数器", done: false },
      { id: id("mini"), title: "总结一句 useState 的作用", done: false }
    ];
  }

  return [
    { id: id("mini"), title: "把任务打开，不要求马上完成", done: false },
    { id: id("mini"), title: "只做最前面的 5 分钟动作", done: false },
    { id: id("mini"), title: "写一句完成后的感受或结果", done: false }
  ];
}

export async function generateDailyReview(reflection: ReflectionInput): Promise<DailyReview> {
  await wait(680);

  const tired = reflection.mood === "很累" || reflection.mood === "很焦虑" || reflection.mood === "想放弃";

  return {
    summary: tired
      ? "你今天的状态不满格，但你仍然愿意复盘，这本身就是没有放弃的证据。计划需要照顾真实状态，而不是只服务理想状态。"
      : "你今天完成了有效推进，尤其是把行动留在了可执行范围内。真正的进步不是一口气做很多，而是让明天还愿意继续。",
    tomorrowMinimumAction: reflection.tomorrowAdjust || "明天只保留一个 15 分钟最小行动，先开始，再决定要不要加量。",
    encouragement: "你不是在追赶一个完美版本的自己，你是在一点点训练可持续的掌控感。",
    adjustment: reflection.blocker
      ? `明天先处理阻碍：「${reflection.blocker}」。把它缩成一个能在 10 分钟内完成的动作。`
      : "明天继续使用小步推进策略，不额外增加任务数量。"
  };
}

export async function adjustPlanByMood(mood: string): Promise<string> {
  await wait(360);

  if (mood === "很累" || mood === "很焦虑" || mood === "想放弃") {
    return "没关系，今天不用赢很多，只要别完全放弃。系统已切换到最低行动模式。";
  }

  if (mood === "很好") {
    return "今天状态不错，但仍然建议先完成核心任务，再选择是否加做。不要让好状态变成过度承诺。";
  }

  return "今天保持正常节奏，只盯住最重要的小步。";
}

export async function generateProofFromTask(task: PlanTask, goal: string): Promise<ProofItem> {
  await wait(300);

  const title = task.isMain ? "核心闭环证据" : `${task.category}证据`;
  const normalizedGoal = goal.trim() || "当前目标";

  return {
    id: id("proof"),
    taskId: task.id,
    title,
    evidence: `你完成了「${task.title}」，这证明「${normalizedGoal}」已经从想法进入了可执行阶段。`,
    value: task.isMain
      ? "这是 Demo 的第一段关键证据：用户输入目标后，系统能给出今天唯一要推进的小行动。"
      : "这条证据可以放进演示过程，说明产品不是停留在概念，而是在持续产出可展示进展。",
    tags: task.isMain ? ["Demo", "Pitch", "Review"] : ["Demo", "Next Step"],
    nextStep: task.isMain
      ? "接下来生成 60 秒演示脚本，把这个闭环讲成评委能记住的故事。"
      : "把这条成果转化成截图、口播或答辩中的一句证据。 ",
    createdAt: new Date().toISOString()
  };
}

export async function generateDemoStory(goal: string, tasks: PlanTask[], proofs: ProofItem[]): Promise<DemoStory> {
  await wait(520);
  const firstProof = proofs[0]?.value ?? "完成任务后，系统会自动生成可用于 Demo 和 Pitch 的 Proof。";
  const mainTask = tasks.find((task) => task.isMain)?.title ?? "今天唯一要赢下的小行动";

  return {
    problem: "我们不是又做了一个 Todo List。真实压力下，人最大的问题不是缺清单，而是目标混乱、第一步太大、进展无法证明。",
    moment: `用户输入「${goal || "一个比赛目标"}」后，Plan Coach 会把它压缩成今天唯一要推进的小行动：${mainTask}。`,
    action: "用户完成任务后，系统不是只打勾，而是把这次完成转化成一条 Proof。",
    proof: firstProof,
    impact: "这让努力从不可见的过程，变成能被导师、队友和评委理解的展示材料。",
    closingLine: "Plan Coach 把目标变成行动，把行动变成证据，把证据变成说服力。"
  };
}

export async function generateJudgeSimulations(
  goal: string,
  tasks: PlanTask[],
  proofs: ProofItem[]
): Promise<JudgeSimulation[]> {
  await wait(560);
  const proofCount = proofs.length;
  const completedCount = tasks.filter((task) => task.status === "completed").length;

  return [
    {
      id: id("judge-tech"),
      judgeType: "技术评委",
      score: proofCount > 0 ? 86 : 78,
      question: "你的 AI 现在是 mock，如何证明后续能接真实模型？",
      weakness: "当前版本还没有真实 OpenAI API，但架构已经把 AI 逻辑隔离在 mock-ai.ts。",
      recommendation: "展示代码边界：前端状态、页面交互和 AI 函数已经解耦。",
      answer: "我们把 generatePlan、generateCoachReply、generateProofFromTask 等能力封装为独立函数，未来替换真实 API 不会重写页面和状态结构。"
    },
    {
      id: id("judge-product"),
      judgeType: "产品评委",
      score: completedCount > 0 ? 90 : 82,
      question: "为什么这不是普通 Todo List？",
      weakness: "如果只展示任务卡片，会被误解成计划工具。",
      recommendation: "演示完成任务后自动生成 Proof 的瞬间。",
      answer: "Todo List 管理任务，Plan Coach 管理目标到行动再到证据的转化，让进展能被看见、复盘和展示。"
    },
    {
      id: id("judge-impact"),
      judgeType: "影响力评委",
      score: goal ? 88 : 80,
      question: "这个产品真正帮助了谁？",
      weakness: "需要把目标人群说得更具体：比赛团队、学生项目、独立创作者。",
      recommendation: "强调压力场景：来不及、想放弃、目标太大时的 Minimum Viable Win。",
      answer: "它帮助人在压力下保住最低可赢版本，把混乱目标压成一个可证明成果，尤其适合黑客松、课程设计和个人项目冲刺。"
    }
  ];
}

export async function generateMinimumViableWinPlan(goal: string, tasks: PlanTask[]): Promise<MinimumViableWinPlan> {
  await wait(460);
  const mainTask = tasks.find((task) => task.isMain)?.title ?? "完成核心闭环";

  return {
    mustKeep: [
      "输入目标并生成最小行动",
      "完成任务后生成 Proof",
      "生成 60 秒演示脚本",
      "展示评委模拟问题与推荐回答"
    ],
    canCut: ["复杂多页面导航", "非核心数据图表", "过多任务数量", "装饰性动效"],
    demoMoment: `现场输入目标后，完成「${mainTask}」，系统立刻生成 Proof，并把它放进演示故事。`,
    finalHourMove: "最后一小时只做三件事：修首屏文案、彩排完整 demo flow、准备评委问题回答。",
    advice: goal
      ? `围绕「${goal}」只讲一个闭环：目标变行动，行动变证据，证据变说服力。`
      : "不要再加功能，把已有闭环讲清楚就能赢。"
  };
}

export function calculateReadinessScore(
  tasks: PlanTask[],
  proofs: ProofItem[],
  demoStory?: DemoStory,
  judgeSimulations: JudgeSimulation[] = [],
  minimumViableWin?: MinimumViableWinPlan
): ReadinessScore {
  const activeTasks = tasks.filter((task) => task.status !== "deferred");
  const completedTasks = activeTasks.filter((task) => task.status === "completed");
  const completionScore = activeTasks.length ? Math.round((completedTasks.length / activeTasks.length) * 42) : 0;
  const proofScore = Math.min(proofs.length * 12, 24);
  const storyScore = demoStory ? 14 : 0;
  const judgeScore = judgeSimulations.length ? 12 : 0;
  const winScore = minimumViableWin ? 8 : 0;
  const value = Math.min(100, 18 + completionScore + proofScore + storyScore + judgeScore + winScore);

  return {
    value,
    label:
      value >= 86
        ? "已经具备强演示闭环"
        : value >= 68
          ? "已有可演示基础，还缺一个强记忆点"
          : "还需要先完成核心 Proof",
    nextBestMove:
      proofs.length === 0
        ? "先完成今日最小行动，生成第一条 Proof。"
        : !demoStory
          ? "现在生成 60 秒演示脚本，把 Proof 讲成故事。"
          : judgeSimulations.length === 0
            ? "模拟评委提问，准备最容易被挑战的问题。"
            : "彩排完整 Demo Flow，减少现场不确定性。",
    demoConfidence: value >= 82 ? "高" : value >= 60 ? "中" : "低",
    riskLevel: value >= 82 ? "低" : value >= 60 ? "中" : "高"
  };
}

export async function generateFinalMemoryLine(goal: string, proofs: ProofItem[]): Promise<string> {
  await wait(360);

  if (proofs.length > 0) {
    return "Plan Coach 把努力变成可证明的进展。";
  }

  if (goal) {
    return `Plan Coach 不是帮你列计划，而是帮你把「${goal.slice(0, 22)}」变成可被看见的成果。`;
  }

  return "Plan Coach 把目标变成行动，把行动变成证据。";
}

export function generateExecutionMap(goal: string, tasks: PlanTask[], proofs: ProofItem[]): ExecutionMap {
  const activeGoal = goal.trim() || "一个还没有被说清楚的目标";
  const nodes: ExecutionMap["nodes"] = [
    {
      id: "goal-root",
      type: "goal",
      label: activeGoal,
      description: "AI 会先识别这个目标真正想抵达的结果，再把它压缩成今天能开始的行动地图。",
      status: "active",
      x: 50,
      y: 50,
      meta: "感性目标"
    }
  ];
  const edges: ExecutionMap["edges"] = [];

  const taskCount = Math.max(tasks.length, 1);
  tasks.forEach((task, index) => {
    const side = index % 2 === 0 ? -1 : 1;
    const lane = Math.ceil((index + 1) / 2);
    const x = 50 + side * (22 + lane * 4);
    const y = 25 + index * (50 / taskCount);
    const taskNodeId = `task-${task.id}`;

    nodes.push({
      id: taskNodeId,
      type: "task",
      label: task.title,
      description: task.description,
      status: task.status,
      x,
      y,
      taskId: task.id,
      meta: `${task.estimateMinutes} min / ${task.difficulty}`
    });
    edges.push({
      id: `edge-goal-${task.id}`,
      source: "goal-root",
      target: taskNodeId,
      status: task.status === "completed" ? "completed" : task.isMain ? "active" : "planned"
    });

    if (task.isBrokenDown || task.miniTasks.length > 0) {
      task.miniTasks.forEach((miniTask, miniIndex) => {
        const miniNodeId = `mini-${task.id}-${miniTask.id}`;
        const miniX = x + side * 13;
        const miniY = y + (miniIndex - 1) * 9;

        nodes.push({
          id: miniNodeId,
          type: "miniTask",
          label: miniTask.title,
          description: "这是 AI 把大任务继续压小后的可启动动作。",
          status: miniTask.done ? "completed" : "todo",
          x: Math.max(6, Math.min(94, miniX)),
          y: Math.max(8, Math.min(92, miniY)),
          taskId: task.id,
          miniTaskId: miniTask.id,
          meta: "mini task"
        });
        edges.push({
          id: `edge-${task.id}-${miniTask.id}`,
          source: taskNodeId,
          target: miniNodeId,
          status: miniTask.done ? "completed" : "planned"
        });
      });
    }
  });

  proofs.forEach((proof, index) => {
    const parentTask = tasks.find((task) => task.id === proof.taskId);
    const parentIndex = Math.max(0, tasks.findIndex((task) => task.id === proof.taskId));
    const side = parentIndex % 2 === 0 ? -1 : 1;
    const y = 20 + ((parentIndex + index + 1) * 13) % 65;
    const proofNodeId = `proof-${proof.id}`;

    nodes.push({
      id: proofNodeId,
      type: "proof",
      label: proof.title,
      description: proof.evidence,
      status: "generated",
      x: 50 + side * 42,
      y,
      taskId: proof.taskId,
      proofId: proof.id,
      meta: proof.tags.join(" / ")
    });
    edges.push({
      id: `edge-proof-${proof.id}`,
      source: parentTask ? `task-${parentTask.id}` : "goal-root",
      target: proofNodeId,
      status: "completed"
    });
  });

  return { nodes, edges };
}
