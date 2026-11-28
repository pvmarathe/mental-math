# AGENTS.md

Guidance for AI coding agents (and humans) working in this repo. Keep this file current: if you change how the project works, update it in the same pull request.

## What this is
A free website that teaches mental math through step-by-step animations plus endless practice problems. One new lesson is published every week. Audience: everyone, beginner to advanced, written for a layman. No accounts and no backend; progress stays in the visitor's browser.

Live site: https://pvmarathe.github.io/mental-math/ (GitHub repo `pvmarathe/mental-math`, branch `main`). The owner is not a developer: explain changes in plain words and say what you changed and why.

## Stack
React 19 + TypeScript + Vite, Vitest (tests), oxlint (lint), GitHub Actions (CI and deploy), GitHub Pages (hosting). Plain CSS in `src/index.css`. No animation or routing libraries; routing is hash-based (`#/lesson/<slug>`) so it works on GitHub Pages.

## Commands
```bash
npm install
npm run dev         # local dev server
npm test            # lesson correctness, render tests, progress tests
npm run lint
npm run typecheck
npm run build       # typecheck + production build
```
Before opening a PR, `npm run lint && npm test && npm run build` must all pass. CI runs the same.

## Layout
- `src/lessons/*.tsx`: one file per lesson. Auto-discovered by `src/lessons/index.ts`; no registration step.
- `src/lessons/lessons.test.ts`: checks that apply to every lesson automatically.
- `src/components/visual.tsx`: shared building blocks (`Chip`, `Equation`, `EquationSteps`, `Row`, `NumberLine`, `AreaModel`). Reuse these before writing new visuals. `EquationSteps` shows one equation per step from a list of frames, which keeps simple lessons short.
- `src/components/Stepper.tsx`: the Back / Play / Next player. `Practice.tsx`: the practice box. `Home.tsx`: the lesson list with the progress bar. `LessonPage.tsx`: one lesson.
- `src/lib/types.ts`: the `Lesson` contract. `random.ts`: `randInt`.
- `src/lib/progress.ts` (+ `progress.test.ts`) and `useCompleted.ts`: saved progress (see below). `useHashRoute.ts`: the router.

## Progress (saved in the browser)
- A lesson counts as complete after `MASTERY_CORRECT` (3) correct practice answers.
- Completed slugs are stored in `localStorage` under `mental-math:completed:v1`. The home page shows "X of Y complete" and a Reset link.
- Storage can be missing, blocked or corrupted (private windows). Every access is wrapped in try/catch and must never crash the site; keep it that way and keep the tests for it.
- If you change the stored format, bump the `v1` in the key and handle old data.

## Adding a weekly lesson
1. Copy an existing file in `src/lessons/` and export `lesson: Lesson`.
2. Fill in `slug` (unique, kebab-case), `title`, `summary`, `difficulty`, `publishDate`.
3. `steps`: one short plain-English caption per animation step.
4. `Animation({ step })`: draw the picture for that step index. It must render for every index from 0 to `steps.length - 1`.
5. `generate(rand = Math.random)`: return `{ question, answer }`.
   - Questions use only digits and `+ − × ÷ ( )`, or the form `P% of N`. The test evaluates them independently of the lesson's own logic.
   - Answers must be positive whole numbers.
   - Always take randomness from the `rand` argument so tests can control it.
6. `publishDate` must be at least 7 days after the previous lesson (a test enforces this). Dates in the future stay hidden; visibility is decided in the visitor's browser, so no redeploy is needed. Anyone who reads the page's code can see unreleased lessons; that is accepted for free content.
7. Keep difficulty roughly rising over time: beginner, then intermediate, then advanced.

### The lesson calendar
There are 20 lessons, one per Thursday, from 2026-11-26 to 2027-04-08 (weeks 1-10 run to 2027-01-28, weeks 11-20 start 2027-02-04). The next new lesson goes on 2027-04-15 or later. Difficulty goes beginner (weeks 1-4), intermediate (5-8), advanced (9-10), then again beginner (11-14), intermediate (15-18), advanced (19-20).

## The weekly email
A scheduled cloud routine (managed by the owner at https://claude.ai/code/routines, "Weekly mental math lesson email") emails the owner on lesson day at 12:00 PM US Eastern. It runs at two UTC hours and checks the Eastern hour itself, so it keeps working across daylight saving time. It reads `src/lessons/*.tsx` and relies on these fields staying simple and exact: `publishDate` (YYYY-MM-DD), `slug`, `title`, `summary`, `difficulty`, `steps` and `generate`. If you rename or restructure them, tell the owner so the routine's prompt can be updated. Adding a lesson needs no routine change. The routine's ID and the owner's address are not stored here because the repo is public.

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
- Never push directly to `main`. Branch from `main` (`feature/<topic>`, `lesson/<slug>`, `fix/<topic>` or `docs/<topic>`), open a pull request and wait for its CI check to pass. Then ask the owner before merging; merging is what publishes to the live site.
- Small, focused commits with imperative messages ("Add multiply-by-9 lesson").
- Do not add `Co-Authored-By` or "Generated with" lines to commits or PR descriptions.

## Deploying
- Merging to `main` runs `.github/workflows/deploy.yml`, which tests, builds and publishes to GitHub Pages. Only `main` may deploy to the `github-pages` environment; a branch run is rejected by design.
- The deploy has a "Wait for the artifact to be listed" step and the workflow grants `actions: read`. Do not remove either. Without them the final step failed with "No artifacts named github-pages were found": it looked for the uploaded file 0.3 seconds after upload, before GitHub listed it.
- After a merge, check the run: `gh run list --workflow deploy.yml --limit 2`. A cancelled deploy right after another merge is normal (a newer run replaces it); a failed one is not.
- GitHub Pages lets browsers keep files for about 10 minutes. After a deploy, tell the owner to hard refresh (Cmd+Shift+R) if they do not see the change.
- Keep the actions in the workflows on current major versions; old ones start logging deprecation warnings.
