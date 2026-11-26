import { randInt } from '../lib/random'
import type { AnimationProps, Lesson } from '../lib/types'
import { Chip, Op, Row } from '../components/visual'

function Animation({ step }: AnimationProps) {
  return (
    <>
      <Row>
        <Chip tone="normal">34</Chip>
        <Op>×</Op>
        <Chip tone="normal">11</Chip>
      </Row>
      <Row>
        <Chip tone={step === 2 ? 'good' : 'hot'} tag="tens digit">3</Chip>
        <Chip tone={step === 0 ? 'dim' : step === 2 ? 'good' : 'hot'} tag={step >= 1 ? '3 + 4' : 'gap'}>{step >= 1 ? 7 : '_'}</Chip>
        <Chip tone={step === 2 ? 'good' : 'hot'} tag="ones digit">4</Chip>
      </Row>
    </>
  )
}

export const lesson: Lesson = {
  slug: 'multiply-by-11',
  title: 'Multiplying by 11',
  summary: 'Split the digits apart and put their sum in the gap.',
  difficulty: 'beginner',
  publishDate: '2026-12-17',
  Animation,
  steps: [
    'Take 34 and spread its two digits apart: 3 _ 4.',
    'Add the two digits: 3 + 4 = 7.',
    'Drop the 7 into the gap: 34 × 11 = 374.',
  ],
  // This week keeps the digit sum at 9 or less so there is no carrying to explain yet.
  generate: (rand = Math.random) => {
    const tens = randInt(1, 8, rand)
    const ones = randInt(0, 9 - tens, rand)
    const n = tens * 10 + ones
    return { question: `${n} × 11`, answer: n * 11 }
  },
}
