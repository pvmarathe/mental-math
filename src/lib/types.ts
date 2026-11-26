import type { ComponentType } from 'react'

export type Difficulty = 'beginner' | 'intermediate' | 'advanced'

export interface Problem {
  question: string
  answer: number
}

export interface Lesson {
  /** URL-safe id, e.g. "add-near-100" */
  slug: string
  title: string
  /** One-line plain-English summary shown on the home page */
  summary: string
  difficulty: Difficulty
  /** ISO date (YYYY-MM-DD) the lesson goes live. Future dates stay hidden. */
  publishDate: string
  /** The animated explanation */
  Animation: ComponentType
  /** Short plain-English steps shown under the animation */
  steps: string[]
  /** Creates one fresh practice problem. Pass a random function for tests. */
  generate: (rand?: () => number) => Problem
}
