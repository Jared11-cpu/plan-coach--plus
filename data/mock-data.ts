import type { AnalyticsMetric, CoachMessage, Goal, PlanTask } from "@/types";

const now = new Date().toISOString();

export const defaultGoal: Goal = {
  id: "goal-react-30",
  title: "我想在 30 天内学会 React，并做出一个能展示的作品",
  createdAt: now,
  horizonDays: 30
};

export const defaultTasks: PlanTask[] = [
  {
    id: "task-main-react-hooks",
    title: "用自己的话讲清楚 React Hooks 是什么",
    description: "今天不追求全面，只把 useState 和 useEffect 的基本作用讲明白，并写下一个例子。",
    estimateMinutes: 25,
    difficulty: "中等",
    category: "学习",
    encouragement: "你今天只需要理解一个核心概念，不需要把 React 一口气吃完。",
    status: "todo",
    miniTasks: [],
    isBrokenDown: false,
    isMain: true
  },
  {
    id: "task-counter-demo",
    title: "写一个按钮计数器小组件",
    description: "创建一个 Counter 组件，点击按钮后数字增加。这个练习会让 useState 从概念变成手感。",
    estimateMinutes: 18,
    difficulty: "轻松",
    category: "练习",
    encouragement: "小组件不小，它是你把抽象知识变成作品的第一步。",
    status: "todo",
    miniTasks: [],
    isBrokenDown: false
  },
  {
    id: "task-notes-react-state",
    title: "写 3 句 React 状态管理笔记",
    description: "用自己的语言记录：状态是什么、什么时候会更新、为什么更新后页面会变化。",
    estimateMinutes: 10,
    difficulty: "轻松",
    category: "复盘",
    encouragement: "能写出来，说明你不是在看热闹，而是在建立自己的理解系统。",
    status: "todo",
    miniTasks: [],
    isBrokenDown: false
  },
  {
    id: "task-share-progress",
    title: "把今天的小成果整理成 1 张展示截图",
    description: "截一张组件运行截图，配一句今天学到的东西，为最终作品展示积累素材。",
    estimateMinutes: 12,
    difficulty: "轻松",
    category: "输出",
    encouragement: "展示不是最后一天才开始，展示是每天给自己留下一点证据。",
    status: "todo",
    miniTasks: [],
    isBrokenDown: false
  }
];

export const initialCoachMessages: CoachMessage[] = [
  {
    id: "coach-welcome",
    role: "assistant",
    content: "今天我们不追求燃起来，只追求推进一点点。把目标变小，你就会重新拿回掌控感。",
    createdAt: now
  }
];

export const analyticsMetrics: AnalyticsMetric[] = [
  {
    label: "本周完成率",
    value: "76%",
    detail: "比上周提高 18%，说明你的计划颗粒度正在变得更合理。"
  },
  {
    label: "连续完成天数",
    value: "6",
    detail: "已经形成短期惯性，接下来要守住最低行动线。"
  },
  {
    label: "最容易拖延",
    value: "输出型任务",
    detail: "建议把输出任务改成截图、三句话、一个草稿这类轻动作。"
  },
  {
    label: "本周成长评价",
    value: "稳定上升",
    detail: "不是靠爆发，而是靠每天把任务压到可开始的程度。"
  }
];
