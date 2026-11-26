import { randInt } from '../lib/random'
import type { AnimationProps, Lesson } from '../lib/types'
import { Chip, Equation, Row } from '../components/visual'

function Animation({ step }: AnimationProps) {
  return (
    <>
      <Row>
        <Chip tone="normal">35 × 35</Chip>
      </Row>
      {step === 0 && (
        <Row>
          <Chip tone="hot" tag="look at this">3</Chip>
          <Chip tone="dim" tag="ends in 5">5</Chip>
        </Row>
      )}
      {step === 1 && <Equation a={3} op="×" b={4} r={12} toneA="hot" toneB="hot" toneR="hot" tagB="next number up" />}
      {step === 2 && (
        <Row>
          <Chip tone="good" tag="3 × 4">12</Chip>
          <Chip tone="good" tag="always 25">25</Chip>
        </Row>
      )}
    </>
  )
}

export const lesson: Lesson = {
  slug: 'square-ending-5',
  title: 'Squaring numbers that end in 5',
  summary: 'A neat shortcut: multiply the front digit by the next one, then add 25.',
  difficulty: 'intermediate',
  publishDate: '2027-01-07',
  Animation,
  steps: [
    'For 35 × 35, set the 5 aside and look at the 3.',
    'Multiply 3 by the next number up, 4: 3 × 4 = 12.',
    'Write 25 after it: 1225.',
  ],
  generate: (rand = Math.random) => {
    const n = randInt(1, 9, rand) * 10 + 5
    return { question: `${n} × ${n}`, answer: n * n }
  },
}
