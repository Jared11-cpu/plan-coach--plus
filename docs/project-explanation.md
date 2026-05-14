# Project Explanation

## Product Positioning

**Plan Coach: AI Execution Map** is an AI execution system. It helps users transform vague goals into a visible action map, then turns completed actions into proof that can be shown in a demo, pitch, or project review.

The product is built for people under pressure: hackathon teams, students doing course projects, independent creators, and anyone who has a goal but does not know the first step.

## User Pain Points

- The user has a goal, but the goal is emotional and unclear.
- Traditional todo lists require the user to already know the tasks.
- Under pressure, users often need a smaller plan rather than more motivation.
- Completed work is often invisible and hard to explain to judges or teachers.
- A project may work technically but still fail because the story is unclear.

## AI Responsibilities

The AI layer currently uses mock functions, but the product design treats AI as a set of replaceable capabilities:

- Identify the user's goal intent.
- Split the goal into daily executable tasks.
- Break a large task into smaller startup actions.
- Adjust the plan when the user is tired or short on time.
- Generate Proof after a task is completed.
- Create a 60-second demo story.
- Simulate judges and likely questions.
- Generate a final memory line for the presentation.

## Main Modules

### 1. Goal Input

The user enters a goal in natural language. The system does not ask for a clean project plan. It accepts messy input and turns it into a structured execution path.

### 2. AI Execution Map

The execution map is the visual center of the project:

- Goal node: the user's original goal.
- Task nodes: AI-generated tasks.
- Mini-task nodes: smaller actions after breakdown.
- Proof nodes: evidence generated after completion.

This makes the product feel different from a list-based productivity app.

### 3. Today Minimum Action

The system always highlights one key action. This avoids overwhelming the user and creates a clear first step.

### 4. Proof Wall

When the user completes a task, the system generates a Proof. A Proof explains:

- what was completed,
- what it proves,
- why it matters,
- whether it can be used in a demo,
- what to do next.

### 5. Demo Story Builder

The project creates a 60-second pitch structure:

- Problem
- Moment
- Action
- Proof
- Impact

This helps the project move from "usable" to "presentable".

### 6. Judge Simulation

The system simulates three judge types:

- technical judge,
- product judge,
- impact judge.

Each judge gives a likely question, current weakness, and recommended answer.

### 7. Minimum Viable Win

When the user is tired or time is limited, the system compresses the plan:

- keep the core demo loop,
- defer non-essential tasks,
- show the final-hour plan,
- protect the minimum winning version.

## Presentation Notes

During a demo, do not present this as a todo list. Present it as a system that converts:

```txt
goal -> map -> action -> proof -> story
```

The strongest moment is:

1. enter a messy goal,
2. generate the execution map,
3. complete one task,
4. show the Proof node appear,
5. generate the demo story.

That proves the product's unique loop.
