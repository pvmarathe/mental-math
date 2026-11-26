import { randInt } from '../lib/random'
import type { AnimationProps, Lesson } from '../lib/types'
import { Chip, Op, Row } from '../components/visual'

function Animation({ step }: AnimationProps) {
  const moved = step >= 1
  return (
    <Row>
      <Chip tone="hot" tag={moved ? 'got +2' : '2 short of 100'}>{moved ? 100 : 98}</Chip>
      <Op>+</Op>
      <Chip tone={moved ? 'hot' : 'normal'} tag={moved ? 'gave −2' : undefined}>{moved ? 45 : 47}</Chip>
      <Op>=</Op>
      <Chip tone={step >= 3 ? 'good' : 'dim'}>{step >= 3 ? 145 : '?'}</Chip>
    </Row>
  )
}

export const lesson: Lesson = {
  slug: 'add-near-100',
  title: 'Adding numbers near 100',
  summary: 'Make one number a round 100 by borrowing from the other.',
  difficulty: 'beginner',
  publishDate: '2026-11-26',
  Animation,
  steps: [
    '98 is just 2 short of 100.',
    'Take 2 from 47 and give it to 98.',
    'Now the sum is 100 + 45, which is easy.',
    '100 + 45 = 145.',
  ],
  generate: (rand = Math.random) => {
    const a = randInt(95, 99, rand)
    const b = randInt(11, 89, rand)
    return { question: `${a} + ${b}`, answer: a + b }
  },
}
