# Code Architecture

## Overview

The project is a pure frontend web app built with Next.js, React, TypeScript, Tailwind CSS, Framer Motion, Zustand, Lucide React, and canvas-confetti.

There is no real backend yet. AI behavior is mocked locally, but all AI capabilities are isolated so they can later be replaced by real OpenAI API calls.

## Main Layers

### Routes

The main demo experience is in `/`.

Legacy routes are still kept:

- `/dashboard`
- `/coach`
- `/focus`
- `/review`
- `/analytics`

This protects old demos while making the homepage the primary competition flow.

### State Layer

`store/use-plan-store.ts` is the main state container.

It stores:

- goals,
- active goal,
- tasks,
- mini tasks,
- Proof items,
- execution map,
- selected map node,
- coach messages,
- readiness score,
- demo story,
- judge simulations,
- minimum viable win plan,
- final memory line.

Important actions:

- `generatePlanForGoal`
- `completeTask`
- `breakTask`
- `activateLowEnergyMode`
- `activateMinimumViableWin`
- `generateDemoStoryForGoal`
- `generateJudgeSimulationsForGoal`
- `refreshExecutionMap`
- `selectMapNode`

### AI Layer

`lib/mock-ai.ts` contains the AI boundaries.

Important functions:

- `generatePlan`
- `splitGoalIntoTasks`
- `generateCoachReply`
- `breakTaskIntoMiniTasks`
- `generateProofFromTask`
- `generateDemoStory`
- `generateJudgeSimulations`
- `generateMinimumViableWinPlan`
- `calculateReadinessScore`
- `generateFinalMemoryLine`
- `generateExecutionMap`

Future OpenAI integration should replace these functions first, without rewriting UI components.

### Type Layer

`types/index.ts` defines shared product data.

The most important types are:

- `PlanTask`
- `MiniTask`
- `ProofItem`
- `DemoStory`
- `JudgeSimulation`
- `MinimumViableWinPlan`
- `ReadinessScore`
- `ExecutionMapNode`
- `ExecutionMapEdge`
- `ExecutionMap`

### UI Layer

Important components:

- `PlanCoachLandingExperience`: main single-page experience.
- `ExecutionMindMap`: dynamic visual map.
- `MindMapNode`: visual node button.
- `MindMapEdge`: animated connection line.
- `MapNodeDetailPanel`: selected node details and actions.
- `TodayMainTaskCard`: today's core action.
- `BigTaskCard`: large task card with complete/skip/breakdown.
- `ProofWall`: generated evidence cards.
- `DemoStoryBuilder`: 60-second pitch.
- `JudgeSimulationArena`: simulated judge questions.
- `MinimumViableWinSection`: compressed demo route.
- `FinalMemoryCard`: final one-line memory card.

## Data Flow

```txt
GoalInput
  -> generatePlanForGoal
  -> tasks + executionMap
  -> ExecutionMindMap
  -> completeTask / breakTask
  -> proof generation
  -> executionMap refresh
  -> ProofWall / DemoStory / Judge Simulation
```

## Extension Points

- Replace mock AI with OpenAI API.
- Persist Zustand state to Supabase.
- Add authentication.
- Add export to PDF or image.
- Add richer map interactions such as drag and zoom.
