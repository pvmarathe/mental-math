import { randInt } from '../lib/random'
import type { AnimationProps, Lesson } from '../lib/types'
import { Chip, Row } from '../components/visual'

const given = ['3', '6', '7']
const result = ['6', '3', '3']
const tags = ['to make 9', 'to make 9', 'to make 10']

function Animation({ step }: AnimationProps) {
  const shown = (i: number) => (step >= 3 ? 'good' : step >= (i < 2 ? 1 : 2) ? 'hot' : 'hidden')
  return (
    <>
      <Row>
        <Chip tone="normal" tag="1000 −">{''}</Chip>
        {given.map((d, i) => <Chip key={i} tone={step >= 1 ? 'normal' : 'hot'} tag={tags[i]}>{d}</Chip>)}
      </Row>
      <Row>
        <Chip tone="hidden">{''}</Chip>
        {result.map((d, i) => <Chip key={i} tone={shown(i)}>{d}</Chip>)}
      </Row>
    </>
  )
}

export const lesson: Lesson = {
  slug: 'subtract-from-1000',
  title: 'Subtracting from 1000',
  summary: 'No borrowing: make each digit reach 9, and the last one reach 10.',
  difficulty: 'intermediate',
  publishDate: '2027-03-18',
  Animation,
  steps: [
    'For 1000 − 367, go digit by digit. No borrowing needed.',
    'The first two digits must add up to 9: 3 needs 6, and 6 needs 3.',
    'The last digit must add up to 10: 7 needs 3.',
    'Read the answer: 1000 − 367 = 633.',
  ],
  // Numbers ending in 0 are skipped: their last digit follows a different rule.
  generate: (rand = Math.random) => {
    let n = randInt(101, 999, rand)
    if (n % 10 === 0) n += 1
    return { question: `1000 − ${n}`, answer: 1000 - n }
  },
}
