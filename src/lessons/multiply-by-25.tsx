import { randInt } from '../lib/random'
import type { AnimationProps, Lesson } from '../lib/types'
import { EquationSteps, type EquationProps } from '../components/visual'

const frames: EquationProps[] = [
  { a: 36, op: '×', b: 25, r: '?', toneR: 'dim', tagB: 'a quarter of 100' },
  { a: 36, op: '×', b: 100, r: 3600, toneB: 'hot', toneR: 'hot', tagB: 'easy: add two zeros' },
  { a: 3600, op: '÷', b: 4, r: 900, toneB: 'hot', toneR: 'hot', tagB: 'halve, then halve again' },
  { a: 36, op: '×', b: 25, r: 900, toneR: 'good' },
]

function Animation({ step }: AnimationProps) {
  return <EquationSteps frames={frames} step={step} />
}

export const lesson: Lesson = {
  slug: 'multiply-by-25',
  title: 'Multiplying by 25',
  summary: 'Think of 25 as a quarter of 100.',
  difficulty: 'beginner',
  publishDate: '2027-02-11',
  Animation,
  steps: [
    'Twenty-five is a quarter of 100, like a quarter coin in a dollar.',
    'Multiply by 100: 36 × 100 = 3600.',
    'Now take a quarter: halve 3600 to 1800, halve again to 900.',
    'So 36 × 25 = 900.',
  ],
  generate: (rand = Math.random) => {
    const a = randInt(12, 60, rand)
    return { question: `${a} × 25`, answer: a * 25 }
  },
}
