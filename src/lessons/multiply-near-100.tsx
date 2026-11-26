import { randInt } from '../lib/random'
import type { AnimationProps, Lesson } from '../lib/types'
import { Chip, Equation, Op, Row } from '../components/visual'

function Animation({ step }: AnimationProps) {
  return (
    <>
      <Row>
        <Chip tone="hot" tag="3 short of 100">97</Chip>
        <Op>×</Op>
        <Chip tone="hot" tag="4 short of 100">96</Chip>
      </Row>
      {step === 1 && <Equation a={97} op="−" b={4} r={93} toneR="hot" tagB="the other's shortfall" />}
      {step === 2 && <Equation a={3} op="×" b={4} r={12} toneR="hot" tagA="shortfall" tagB="shortfall" />}
      {step >= 3 && (
        <Row>
          <Chip tone="good" tag="front">93</Chip>
          <Chip tone="good" tag="back">12</Chip>
        </Row>
      )}
    </>
  )
}

export const lesson: Lesson = {
  slug: 'multiply-near-100',
  title: 'Multiplying numbers near 100',
  summary: 'Use how far each number is from 100 to build the answer in two halves.',
  difficulty: 'intermediate',
  publishDate: '2027-01-14',
  Animation,
  steps: [
    '97 × 96: both are just under 100, by 3 and by 4.',
    'Front half: take one number and subtract the other\'s shortfall. 97 − 4 = 93.',
    'Back half: multiply the shortfalls. 3 × 4 = 12.',
    'Glue them together: 9312. (If the back half is one digit, put a 0 before it.)',
  ],
  generate: (rand = Math.random) => {
    const a = 100 - randInt(1, 9, rand)
    const b = 100 - randInt(1, 9, rand)
    return { question: `${a} × ${b}`, answer: a * b }
  },
}
