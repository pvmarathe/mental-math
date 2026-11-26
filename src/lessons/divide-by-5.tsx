import { randInt } from '../lib/random'
import type { AnimationProps, Lesson } from '../lib/types'
import { EquationSteps, type EquationProps } from '../components/visual'

const frames: EquationProps[] = [
  { a: 135, op: '÷', b: 5, r: '?', toneR: 'dim', tagB: 'awkward' },
  { a: 135, op: '×', b: 2, r: 270, toneB: 'hot', toneR: 'hot', tagB: 'double it' },
  { a: 270, op: '÷', b: 10, r: 27, toneB: 'hot', toneR: 'hot', tagB: 'easy: drop a zero' },
  { a: 135, op: '÷', b: 5, r: 27, toneR: 'good' },
]

function Animation({ step }: AnimationProps) {
  return <EquationSteps frames={frames} step={step} />
}

export const lesson: Lesson = {
  slug: 'divide-by-5',
  title: 'Dividing by 5',
  summary: 'Double the number, then divide by 10.',
  difficulty: 'beginner',
  publishDate: '2027-02-25',
  Animation,
  steps: [
    'Dividing by 5 is awkward, but dividing by 10 is easy.',
    'Five goes into a number twice as many times as ten does, so double first: 135 × 2 = 270.',
    'Now divide by 10: 270 ÷ 10 = 27.',
    'So 135 ÷ 5 = 27.',
  ],
  generate: (rand = Math.random) => {
    const k = randInt(12, 98, rand)
    return { question: `${k * 5} ÷ 5`, answer: k }
  },
}
