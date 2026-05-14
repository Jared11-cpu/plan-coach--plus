export type TaskStatus = "todo" | "completed" | "skipped" | "deferred";

export type Difficulty = "轻松" | "中等" | "挑战";

export type Mood = "很好" | "一般" | "很累" | "很焦虑" | "想放弃";

export type CoachRole = "user" | "assistant";

export interface Goal {
  id: string;
  title: string;
  createdAt: string;
  horizonDays: number;
}

export interface MiniTask {
  id: string;
  title: string;
  done: boolean;
}

export interface PlanTask {
  id: string;
  title: string;
  description: string;
  estimateMinutes: number;
  difficulty: Difficulty;
  category: "学习" | "输出" | "复盘" | "沟通" | "练习";
  encouragement: string;
  status: TaskStatus;
  miniTasks: MiniTask[];
  isBrokenDown: boolean;
  isMain?: boolean;
}

export interface Plan {
  id: string;
  goalId: string;
  title: string;
  summary: string;
  createdAt: string;
  tasks: PlanTask[];
}

export interface CoachMessage {
  id: string;
  role: CoachRole;
  content: string;
  createdAt: string;
}

export interface UserState {
  activeGoal?: Goal;
  tasks: PlanTask[];
  completionRate: number;
  lowEnergyMode: boolean;
  streak: number;
}

export interface ReflectionInput {
  mood: Mood;
  completed: string;
  blocker: string;
  tomorrowAdjust: string;
}

export interface DailyReview {
  summary: string;
  tomorrowMinimumAction: string;
  encouragement: string;
  adjustment: string;
}

export interface AnalyticsMetric {
  label: string;
  value: string;
  detail: string;
}

export type ProofTag = "Demo" | "Pitch" | "Review" | "Risk" | "Next Step";

export interface ProofItem {
  id: string;
  taskId: string;
  title: string;
  evidence: string;
  value: string;
  tags: ProofTag[];
  nextStep: string;
  createdAt: string;
}

export interface DemoStory {
  problem: string;
  moment: string;
  action: string;
  proof: string;
  impact: string;
  closingLine: string;
}

export interface JudgeSimulation {
  id: string;
  judgeType: "技术评委" | "产品评委" | "影响力评委";
  score: number;
  question: string;
  weakness: string;
  recommendation: string;
  answer: string;
}

export interface MinimumViableWinPlan {
  mustKeep: string[];
  canCut: string[];
  demoMoment: string;
  finalHourMove: string;
  advice: string;
}

export interface ReadinessScore {
  value: number;
  label: string;
  nextBestMove: string;
  demoConfidence: "低" | "中" | "高";
  riskLevel: "低" | "中" | "高";
}

export type ExecutionMapNodeType = "goal" | "task" | "miniTask" | "proof";

export type ExecutionMapMode = "tasks" | "proofs" | "demo";

export interface ExecutionMapNode {
  id: string;
  type: ExecutionMapNodeType;
  label: string;
  description: string;
  status: TaskStatus | "active" | "generated";
  x: number;
  y: number;
  taskId?: string;
  miniTaskId?: string;
  proofId?: string;
  meta?: string;
}

export interface ExecutionMapEdge {
  id: string;
  source: string;
  target: string;
  status: "planned" | "active" | "completed";
}

export interface ExecutionMap {
  nodes: ExecutionMapNode[];
  edges: ExecutionMapEdge[];
}
