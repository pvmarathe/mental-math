import { randInt } from '../lib/random'
import type { AnimationProps, Lesson } from '../lib/types'
import { EquationSteps, type EquationProps } from '../components/visual'

const frames: EquationProps[] = [
  { a: 7, op: '×', b: 298, r: '?', toneR: 'dim', tagB: '2 short of 300' },
  { a: 7, op: '×', b: 300, r: 2100, toneB: 'hot', toneR: 'hot', tagB: 'round up' },
  { a: 7, op: '×', b: 2, r: 14, toneB: 'hot', toneR: 'hot', tagB: 'the extra bit' },
  { a: 2100, op: '−', b: 14, r: 2086, toneR: 'good', tagR: '7 × 298' },
]

function Animation({ step }: AnimationProps) {
  return <EquationSteps frames={frames} step={step} />
}

export const lesson: Lesson = {
  slug: 'round-and-compensate',
  title: 'Round up, then pay it back',
  summary: 'Multiply by a nice round number, then subtract what you over-counted.',
  difficulty: 'advanced',
  publishDate: '2027-04-08',
  Animation,
  steps: [
    '298 is just 2 short of 300.',
    'Multiply by 300 instead: 7 × 300 = 2100.',
    'You counted 2 extra sevens: 7 × 2 = 14.',
    'Take them back: 2100 − 14 = 2086.',
  ],
  generate: (rand = Math.random) => {
    const a = randInt(3, 9, rand)
    const n = randInt(2, 9, rand) * 100 - randInt(1, 3, rand)
    return { question: `${a} × ${n}`, answer: a * n }
  },
}
