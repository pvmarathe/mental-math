import { randInt } from '../lib/random'
import type { AnimationProps, Lesson } from '../lib/types'
import { Chip, Op, Row } from '../components/visual'

function Animation({ step }: AnimationProps) {
  const below = step >= 3
  const parts = below ? ['2500', '−300', '+9', '2209'] : ['2500', '+300', '+9', '2809']
  const show = (i: number) => (below || step >= i ? 'hot' : 'hidden')
  return (
    <>
      <Row>
        <Chip>{below ? '47 × 47' : '53 × 53'}</Chip>
      </Row>
      <Row>
        <Chip tone={step >= 0 ? 'hot' : 'hidden'} tag="50 × 50">{parts[0]}</Chip>
        <Chip tone={show(1)} tag={below ? '3 below × 100' : '3 above × 100'}>{parts[1]}</Chip>
        <Chip tone={show(2)} tag="3 × 3">{parts[2]}</Chip>
        <Op>=</Op>
        <Chip tone={below || step >= 2 ? 'good' : 'hidden'}>{parts[3]}</Chip>
      </Row>
    </>
  )
}

export const lesson: Lesson = {
  slug: 'square-near-50',
  title: 'Squaring numbers near 50',
  summary: 'Start at 2500, then adjust by 100 for every step away from 50.',
  difficulty: 'advanced',
  publishDate: '2027-01-28',
  Animation,
  steps: [
    '53 is 3 above 50. Start from 50 × 50 = 2500.',
    'Add 100 for every step above: 3 × 100 = 300, so 2800.',
    'Add the steps squared: 3 × 3 = 9, so 2809.',
    'Below 50? Subtract the 100s instead: 47 × 47 = 2500 − 300 + 9 = 2209.',
  ],
  generate: (rand = Math.random) => {
    const d = randInt(1, 9, rand)
    const n = rand() < 0.5 ? 50 + d : 50 - d
    return { question: `${n} × ${n}`, answer: n * n }
  },
}
