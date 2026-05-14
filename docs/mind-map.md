# Project Mind Map

This document describes the product logic as a mind map. It can be copied into any Markdown renderer that supports Mermaid.

```mermaid
mindmap
  root((Plan Coach: AI Execution Map))
    Goal Input
      Messy goal
      Emotional intent
      Natural language
    AI Analysis
      Identify intent
      Split into tasks
      Choose minimum action
      Adjust by mood
    Execution Map
      Goal node
      Task nodes
      Mini task nodes
      Proof nodes
    Action System
      Today minimum action
      Complete task
      Break down task
      Focus mode
    Goal-to-Proof
      Proof Wall
      Demo tags
      Next step advice
      Evidence for presentation
    Competition Layer
      Demo Story Builder
      Judge Simulation
      Minimum Viable Win
      Readiness Score
      Final Memory Line
    Tech Architecture
      Next.js
      React
      TypeScript
      Tailwind CSS
      Framer Motion
      Zustand
      Mock AI
```

## Execution Flow

```mermaid
flowchart LR
  A["User enters emotional goal"] --> B["Mock AI generates plan"]
  B --> C["Execution Map creates goal and task nodes"]
  C --> D["User breaks task into mini tasks"]
  D --> E["Mini task nodes appear"]
  C --> F["User completes task"]
  F --> G["Proof is generated"]
  G --> H["Proof node appears on map"]
  H --> I["Demo Story Builder"]
  H --> J["Judge Simulation"]
  I --> K["Final Memory Line"]
  J --> K
```

## Why This Matters

The mind map is not only decoration. It explains the core product argument:

> Plan Coach does not manage tasks. It manages the transformation from goal to visible progress.
