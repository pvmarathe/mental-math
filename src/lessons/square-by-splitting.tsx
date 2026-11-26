import { randInt } from '../lib/random'
import type { AnimationProps, Lesson } from '../lib/types'
import { AreaModel, Equation } from '../components/visual'

const reveal = [0, 1, 3, 4, 4]

function Animation({ step }: AnimationProps) {
  const done = step >= 4
  return (
    <>
      <AreaModel
        cols={[{ label: '60', weight: 4 }, { label: '3', weight: 1.2 }]}
        rows={[{ label: '60', weight: 4 }, { label: '3', weight: 1.2 }]}
        cells={['3600', '180', '180', '9']}
        reveal={reveal[Math.min(step, reveal.length - 1)]}
      />
      <Equation
        a="3600 + 180 + 180 + 9" r={3969}
        toneA={done ? 'hot' : 'hidden'} toneR={done ? 'good' : 'hidden'}
      />
    </>
  )
}

export const lesson: Lesson = {
  slug: 'square-by-splitting',
  title: 'Squaring by splitting',
  summary: 'Cut any two-digit square into a big corner, two strips and a small corner.',
  difficulty: 'advanced',
  publishDate: '2027-04-01',
  Animation,
  steps: [
    '63 × 63 is a square. Split each side into 60 and 3.',
    'The big corner: 60 × 60 = 3600.',
    'Two matching strips: 60 × 3 = 180, and another 180.',
    'The small corner: 3 × 3 = 9.',
    'Add all four pieces: 3600 + 180 + 180 + 9 = 3969.',
  ],
  generate: (rand = Math.random) => {
    const n = randInt(2, 9, rand) * 10 + randInt(1, 9, rand)
    return { question: `${n} × ${n}`, answer: n * n }
  },
}
