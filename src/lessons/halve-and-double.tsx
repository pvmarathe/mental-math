import { randInt } from '../lib/random'
import type { AnimationProps, Lesson } from '../lib/types'
import { EquationSteps, type EquationProps } from '../components/visual'

const frames: EquationProps[] = [
  { a: 14, op: '×', b: 35, r: '?', toneR: 'dim' },
  { a: 7, op: '×', b: 70, r: '?', toneA: 'hot', toneB: 'hot', toneR: 'dim', tagA: 'half of 14', tagB: 'double 35' },
  { a: 7, op: '×', b: 70, r: 490, toneR: 'hot' },
  { a: 14, op: '×', b: 35, r: 490, toneR: 'good' },
]

function Animation({ step }: AnimationProps) {
  return <EquationSteps frames={frames} step={step} />
}

export const lesson: Lesson = {
  slug: 'halve-and-double',
  title: 'Halve one, double the other',
  summary: 'Make a hard multiplication easy without changing the answer.',
  difficulty: 'intermediate',
  publishDate: '2027-03-11',
  Animation,
  steps: [
    '14 × 35 has an even number in it, and that is the clue.',
    'Halve the even number (14 → 7) and double the other (35 → 70). The answer stays the same.',
    'Now it is easy: 7 × 70 = 490.',
    'So 14 × 35 = 490.',
  ],
  generate: (rand = Math.random) => {
    const a = randInt(3, 12, rand) * 2
    const b = randInt(11, 49, rand)
    return { question: `${a} × ${b}`, answer: a * b }
  },
}
