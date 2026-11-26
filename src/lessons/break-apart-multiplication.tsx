import { randInt } from '../lib/random'
import type { AnimationProps, Lesson } from '../lib/types'
import { AreaModel, Equation } from '../components/visual'

function Animation({ step }: AnimationProps) {
  return (
    <>
      <AreaModel
        cols={[{ label: '40', weight: 4 }, { label: '7', weight: 1.3 }]}
        rows={[{ label: '6', weight: 1 }]}
        cells={['240', '42']}
        reveal={Math.min(2, step)}
      />
      <Equation
        a={240} op="+" b={42} r={282}
        toneA={step >= 3 ? 'hot' : 'hidden'} toneB={step >= 3 ? 'hot' : 'hidden'} toneR={step >= 3 ? 'good' : 'hidden'}
      />
    </>
  )
}

export const lesson: Lesson = {
  slug: 'break-apart-multiplication',
  title: 'Break it apart',
  summary: 'Split a big number into tens and ones, multiply each, then add.',
  difficulty: 'intermediate',
  publishDate: '2026-12-24',
  Animation,
  steps: [
    '6 × 47 is hard to do in one go. Split 47 into 40 and 7.',
    'First piece: 6 × 40 = 240.',
    'Second piece: 6 × 7 = 42.',
    'Add the pieces: 240 + 42 = 282.',
  ],
  generate: (rand = Math.random) => {
    const a = randInt(3, 9, rand)
    const b = randInt(12, 98, rand)
    return { question: `${a} × ${b}`, answer: a * b }
  },
}
