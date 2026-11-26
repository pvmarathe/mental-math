# AGENTS.md

Guidance for AI coding agents (and humans) working in this repo.

## What this is
A free website that teaches mental math through step-by-step animations plus endless practice problems. One new lesson is published every week. Audience: everyone, beginner to advanced, written for a layman. No accounts, no backend; progress stays in the browser.

## Stack
React 19 + TypeScript + Vite, Vitest (tests), oxlint (lint), GitHub Actions (CI), GitHub Pages (hosting). Plain CSS in `src/index.css`. No animation or routing libraries; routing is hash-based (`#/lesson/<slug>`) so it works on GitHub Pages.

## Commands
```bash
npm install
npm run dev         # local dev server
npm test            # lesson correctness + render tests
npm run lint
npm run typecheck
npm run build       # typecheck + production build
```
Before opening a PR, `npm run lint && npm test && npm run build` must all pass. CI runs the same.

## Layout
- `src/lessons/*.tsx`: one file per lesson. Auto-discovered by `src/lessons/index.ts`; no registration step.
- `src/lessons/lessons.test.ts`: checks that apply to every lesson automatically.
- `src/components/visual.tsx`: shared building blocks (`Chip`, `Equation`, `Row`, `NumberLine`, `AreaModel`). Reuse these before writing new visuals.
- `src/components/Stepper.tsx`: the Back / Play / Next player. `Practice.tsx`: the practice box.
- `src/lib/types.ts`: the `Lesson` contract.

## Adding a weekly lesson
1. Copy an existing file in `src/lessons/` and export `lesson: Lesson`.
2. Fill in `slug` (unique, kebab-case), `title`, `summary`, `difficulty`, `publishDate`.
3. `steps`: one short plain-English caption per animation step.
4. `Animation({ step })`: draw the picture for that step index. It must render for every index from 0 to `steps.length - 1`.
5. `generate(rand = Math.random)`: return `{ question, answer }`.
   - Questions use only digits and `+ − × ÷ ( )`, or the form `P% of N`. The test evaluates them independently of the lesson's own logic.
   - Answers must be positive whole numbers.
   - Always take randomness from the `rand` argument so tests can control it.
6. `publishDate` must be at least 7 days after the previous lesson (a test enforces this). Dates in the future stay hidden; visibility is decided in the browser, so no redeploy is needed.
7. Keep difficulty roughly rising over time: beginner, then intermediate, then advanced.

## Writing style for lesson content
- Plain language, short sentences, no jargon. Explain the trick, not just the steps.
- Show the same worked example in the animation and the captions.
- Only teach what the practice generator can produce. If a lesson ignores a case (like carrying), restrict the generator and say so in a code comment.

## Code conventions
- TypeScript strict; no `any`. Small, focused components. Function components and hooks only.
- Animations are CSS/SVG only. Respect `prefers-reduced-motion` (already handled globally in the CSS). Animation must not auto-play on load.
- Keep it accessible: real `<button>` elements, labels on inputs, `aria-live` for captions, colors from the CSS variables (they handle dark mode).
- Don't add dependencies without a clear reason. Mention the reason in the PR.
- Never commit secrets, `.env` files or `node_modules`/`dist`.

## Git workflow
- Never push directly to `main`. Branch from `main` (`feature/<topic>` or `lesson/<slug>`), open a pull request, wait for CI to pass, then merge.
- Small, focused commits with imperative messages ("Add multiply-by-9 lesson").
- Do not add `Co-Authored-By` or "Generated with" lines to commits or PR descriptions.
- Merging to `main` deploys to GitHub Pages automatically (`.github/workflows/deploy.yml`).
