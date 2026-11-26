# Mental Math, Made Visible

A free site that teaches mental math with animated explanations and endless practice problems. A new lesson is published every week.

## Develop

```bash
npm install
npm run dev        # local site
npm test           # checks every lesson's practice problems are correct
npm run lint
npm run build
```

## Add a weekly lesson

1. Copy `src/lessons/add-near-100.tsx` to a new file, e.g. `src/lessons/week-02-<topic>.tsx`.
2. Change the slug, title, summary, difficulty, steps, animation and `generate`.
3. Set `publishDate` to the day it should go live (future dates stay hidden).
4. `npm test`, open a pull request, merge. The lesson stays hidden until its `publishDate`, then appears on its own (the check happens in the visitor's browser, so no redeploy is needed).

## Stack

React + TypeScript + Vite, Vitest, oxlint, GitHub Actions, GitHub Pages. No backend; progress stays in the browser.
