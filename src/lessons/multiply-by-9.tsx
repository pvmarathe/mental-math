import { randInt } from '../lib/random'
import type { AnimationProps, Lesson } from '../lib/types'
import { EquationSteps, type EquationProps } from '../components/visual'

const frames: EquationProps[] = [
  { a: 36, op: '×', b: 9, r: '?', toneR: 'dim', tagB: 'one less than 10' },
  { a: 36, op: '×', b: 10, r: 360, toneB: 'hot', toneR: 'hot', tagB: 'easy: add a zero' },
  { a: 360, op: '−', b: 36, r: 324, toneB: 'hot', toneR: 'hot', tagB: 'one extra 36' },
  { a: 36, op: '×', b: 9, r: 324, toneR: 'good' },
]

function Animation({ step }: AnimationProps) {
  return <EquationSteps frames={frames} step={step} />
}

export const lesson: Lesson = {
  slug: 'multiply-by-9',
  title: 'Multiplying by 9',
  summary: 'Times 10, then take one copy away.',
  difficulty: 'beginner',
  publishDate: '2027-02-04',
  Animation,
  steps: [
    'Nine is just one less than ten.',
    'Multiply by 10 first: 36 × 10 = 360.',
    'That is one 36 too many, so take one 36 away: 360 − 36 = 324.',
    'So 36 × 9 = 324.',
  ],
  generate: (rand = Math.random) => {
    const a = randInt(12, 98, rand)
    return { question: `${a} × 9`, answer: a * 9 }
  },
}
