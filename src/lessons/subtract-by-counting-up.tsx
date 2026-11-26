import { randInt } from '../lib/random'
import type { AnimationProps, Lesson } from '../lib/types'
import { Equation, NumberLine } from '../components/visual'

const jumps = [
  { from: 47, to: 50, label: '+3' },
  { from: 50, to: 80, label: '+30' },
  { from: 80, to: 83, label: '+3' },
]

function Animation({ step }: AnimationProps) {
  return (
    <>
      <NumberLine min={42} max={88} marks={[47, 50, 80, 83]} jumps={jumps} shown={Math.max(0, step)} />
      <Equation a="83 − 47" r={step >= 4 ? 36 : '?'} toneR={step >= 4 ? 'good' : 'dim'} tagR={step >= 4 ? '3 + 30 + 3' : undefined} />
    </>
  )
}

export const lesson: Lesson = {
  slug: 'subtract-by-counting-up',
  title: 'Subtracting by counting up',
  summary: 'Instead of taking away, walk from the small number up to the big one.',
  difficulty: 'beginner',
  publishDate: '2026-12-10',
  Animation,
  steps: [
    'For 83 − 47, ask: how far is it from 47 up to 83?',
    'Hop to the next round number: 47 to 50 is 3.',
    'Hop by tens: 50 to 80 is 30.',
    'Finish the walk: 80 to 83 is 3.',
    'Add the hops: 3 + 30 + 3 = 36.',
  ],
  generate: (rand = Math.random) => {
    const a = randInt(51, 99, rand)
    const b = randInt(11, a - 11, rand)
    return { question: `${a} − ${b}`, answer: a - b }
  },
}
