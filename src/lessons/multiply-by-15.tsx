import { randInt } from '../lib/random'
import type { AnimationProps, Lesson } from '../lib/types'
import { EquationSteps, type EquationProps } from '../components/visual'

const frames: EquationProps[] = [
  { a: 24, op: '×', b: 15, r: '?', toneR: 'dim', tagB: '10 + 5' },
  { a: 24, op: '×', b: 10, r: 240, toneB: 'hot', toneR: 'hot', tagB: 'the "10" part' },
  { a: 240, op: '÷', b: 2, r: 120, toneB: 'hot', toneR: 'hot', tagB: 'the "5" part: half of that' },
  { a: 240, op: '+', b: 120, r: 360, toneR: 'good', tagA: '×10', tagB: '×5', tagR: '24 × 15' },
]

function Animation({ step }: AnimationProps) {
  return <EquationSteps frames={frames} step={step} />
}

export const lesson: Lesson = {
  slug: 'multiply-by-15',
  title: 'Multiplying by 15',
  summary: 'Times 10, plus half of that.',
  difficulty: 'intermediate',
  publishDate: '2027-03-04',
  Animation,
  steps: [
    'Fifteen is 10 plus 5.',
    'Do the 10 part: 24 × 10 = 240.',
    'The 5 part is half of the 10 part: 240 ÷ 2 = 120.',
    'Add them: 240 + 120 = 360.',
  ],
  generate: (rand = Math.random) => {
    const a = randInt(12, 60, rand)
    return { question: `${a} × 15`, answer: a * 15 }
  },
}
