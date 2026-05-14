# Plan Coach: AI Execution Map

[Live Demo](https://jared11-cpu.github.io/plan-coach--plus/) | [Project Explanation](docs/project-explanation.md) | [Mind Map](docs/mind-map.md) | [Code Architecture](docs/code-architecture.md)

Plan Coach is an AI execution system for turning emotional, messy goals into a visual action map, then turning completed actions into proof for demos, pitches, and reviews.

It is not a normal todo list. A todo list assumes the user already knows what to do. Plan Coach helps the user find the first small action, visualize the execution path, complete the work, and convert progress into visible evidence.

## Core Idea

**Goal -> Execution Map -> Action -> Proof -> Demo Story**

The project is designed for hackathon and course-defense demos. The most important moment is not only checking off a task. It is watching a completed task become a Proof node that can be used in a demo story or judge Q&A.

## Main Innovations

- **Emotional goal visualization**: users can enter a vague goal such as "I want to build something judges remember", and the product turns it into a dynamic task map.
- **Goal-to-Proof engine**: each completed task generates a Proof card explaining what was done, why it matters, and how it can be used in a demo.
- **Dynamic execution mind map**: the center node is the goal, task nodes grow from it, mini-task nodes appear after breakdown, and Proof nodes appear after completion.
- **Minimum Viable Win**: when time or energy is low, the system compresses the plan to the smallest version that can still be demonstrated.
- **Demo Story Builder**: the project generates a 60-second pitch structure from the current goal, tasks, and proofs.
- **Judge Simulation Arena**: the product simulates technical, product, and impact judges with likely questions and suggested answers.

## Demo Flow

1. Open the homepage.
2. Enter a goal: `I want to build an AI project in 48 hours for a hackathon`.
3. Generate the execution system.
4. Open the AI Execution Map section.
5. Click a task node to inspect AI analysis.
6. Click **Break Down** to grow mini-task nodes.
7. Click **Complete and Generate Proof**.
8. Show the new Proof node and Proof Wall.
9. Generate the 60-second Demo Story.
10. Generate Judge Simulation.
11. End with the Final Memory Line.

## Product Notes

- This project should be presented as an **AI Execution Map**, not as a todo app.
- The best demo moment is completing one task and showing the Proof appear.
- AI is currently mocked in `lib/mock-ai.ts`, but the boundaries are intentionally isolated for future OpenAI API integration.
- Zustand stores the execution state, including tasks, proofs, readiness score, judge simulations, and the execution map.
- The first version of the mind map is intentionally stable: no drag, zoom, or infinite canvas. It focuses on a clear competition demo.

## Tech Stack

- Next.js
- React
- TypeScript
- Tailwind CSS
- shadcn/ui-style primitives
- Framer Motion
- Lucide React
- Zustand
- canvas-confetti
- Mock AI functions

## Project Structure

- `app/`: Next.js routes.
- `components/`: UI sections and reusable components.
- `components/execution-mind-map.tsx`: main dynamic task map.
- `store/use-plan-store.ts`: Zustand state and actions.
- `lib/mock-ai.ts`: local mock AI functions.
- `types/index.ts`: product data types.
- `docs/`: project explanation, architecture, and mind map documentation.

## Running Locally

```bash
npm install
npm run dev
```

Open:

```txt
http://127.0.0.1:3000
```

For verification:

```bash
npm run typecheck
npm run build
```

## Online Demo

After every push to `main`, GitHub Actions builds the static Next.js site and deploys it to GitHub Pages:

```txt
https://jared11-cpu.github.io/plan-coach--plus/
```

If the link shows a GitHub 404 right after pushing, wait for the `Deploy to GitHub Pages` workflow to finish in the repository Actions tab.

## Future Extensions

- Replace mock AI functions with OpenAI API calls.
- Persist goals, tasks, proofs, and reviews in Supabase.
- Add exportable demo report cards.
- Add real user accounts and project workspaces.
- Add optional drag and zoom to the execution map.
