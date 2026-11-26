import { randInt } from '../lib/random'
import type { AnimationProps, Lesson } from '../lib/types'
import { EquationSteps, type EquationProps } from '../components/visual'

const frames: EquationProps[] = [
  { a: 13, op: '×', b: 16, r: '?', toneR: 'dim', tagA: 'a teen', tagB: 'a teen' },
  { a: '13 + 6', r: 19, toneA: 'hot', toneR: 'hot', tagA: 'add the other\'s ones digit' },
  { a: '19 × 10', r: 190, toneA: 'hot', toneR: 'hot', tagA: 'put a zero on it' },
  { a: '3 × 6', r: 18, toneA: 'hot', toneR: 'hot', tagA: 'multiply the ones digits' },
  { a: 190, op: '+', b: 18, r: 208, toneR: 'good', tagR: '13 × 16' },
]

function Animation({ step }: AnimationProps) {
  return <EquationSteps frames={frames} step={step} />
}

export const lesson: Lesson = {
  slug: 'multiply-teens',
  title: 'Multiplying two teens',
  summary: 'Add, add a zero, then multiply the small digits.',
  difficulty: 'intermediate',
  publishDate: '2027-03-25',
  Animation,
  steps: [
    'Both numbers are in the teens: 13 × 16.',
    'Add the first number and the ones digit of the second: 13 + 6 = 19.',
    'Put a zero on the end: 190.',
    'Multiply the two ones digits: 3 × 6 = 18.',
    'Add them: 190 + 18 = 208.',
  ],
  generate: (rand = Math.random) => {
    const a = randInt(11, 19, rand)
    const b = randInt(11, 19, rand)
    return { question: `${a} × ${b}`, answer: a * b }
  },
}
