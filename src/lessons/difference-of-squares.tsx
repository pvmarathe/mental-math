import { randInt } from '../lib/random'
import type { AnimationProps, Lesson } from '../lib/types'
import { Equation, NumberLine, type Tone } from '../components/visual'

const jumps = [
  { from: 47, to: 50, label: '3' },
  { from: 50, to: 53, label: '3' },
]

type F = { a: string | number; op: string; b: string | number; r: string | number; toneA?: Tone; toneB?: Tone; toneR?: Tone }
const frames: F[] = [
  { a: 47, op: '×', b: 53, r: '?', toneR: 'dim' },
  { a: '50 × 50', op: '−', b: '3 × 3', r: '?', toneA: 'hot', toneB: 'hot', toneR: 'dim' },
  { a: 2500, op: '−', b: '3 × 3', r: '?', toneA: 'hot', toneB: 'dim', toneR: 'dim' },
  { a: 2500, op: '−', b: 9, r: '?', toneA: 'dim', toneB: 'hot', toneR: 'dim' },
  { a: 2500, op: '−', b: 9, r: 2491, toneR: 'good' },
]

function Animation({ step }: AnimationProps) {
  const f = frames[Math.min(step, frames.length - 1)]
  return (
    <>
      <NumberLine min={44} max={56} marks={[47, 50, 53]} jumps={jumps} shown={step >= 0 ? 2 : 0} />
      <Equation {...f} />
    </>
  )
}

export const lesson: Lesson = {
  slug: 'difference-of-squares',
  title: 'The mirror trick',
  summary: 'When two numbers sit equally far either side of a round number, multiplying is easy.',
  difficulty: 'advanced',
  publishDate: '2027-01-21',
  Animation,
  steps: [
    '47 and 53 are mirror images around 50: each is 3 away.',
    'The answer is 50 × 50, minus the distance times itself: 3 × 3.',
    '50 × 50 = 2500.',
    '3 × 3 = 9.',
    '2500 − 9 = 2491. So 47 × 53 = 2491.',
  ],
  generate: (rand = Math.random) => {
    const centre = randInt(2, 8, rand) * 10
    const d = randInt(1, 9, rand)
    return { question: `${centre - d} × ${centre + d}`, answer: centre * centre - d * d }
  },
}
