import { randInt } from '../lib/random'
import type { AnimationProps, Lesson } from '../lib/types'
import { EquationSteps, type EquationProps } from '../components/visual'

const frames: EquationProps[] = [
  { a: 56, op: '+', b: 39, r: '?', toneR: 'dim', tagB: '1 short of 40' },
  { a: 56, op: '+', b: 40, r: 96, toneB: 'hot', toneR: 'hot', tagB: 'round up' },
  { a: 96, op: '−', b: 1, r: 95, toneB: 'hot', toneR: 'hot', tagB: 'give it back' },
  { a: 56, op: '+', b: 39, r: 95, toneR: 'good' },
]

function Animation({ step }: AnimationProps) {
  return <EquationSteps frames={frames} step={step} />
}

export const lesson: Lesson = {
  slug: 'add-nines',
  title: 'Adding 9, 19, 29, 39...',
  summary: 'Round up to the next ten, then give back the extra 1.',
  difficulty: 'beginner',
  publishDate: '2027-02-18',
  Animation,
  steps: [
    '39 is just 1 short of 40.',
    'Add 40 instead: 56 + 40 = 96.',
    'You added 1 too many, so subtract 1: 96 − 1 = 95.',
    'So 56 + 39 = 95.',
  ],
  generate: (rand = Math.random) => {
    const a = randInt(11, 79, rand)
    const b = randInt(0, 4, rand) * 10 + 9
    return { question: `${a} + ${b}`, answer: a + b }
  },
}
