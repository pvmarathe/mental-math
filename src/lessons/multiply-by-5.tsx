import { randInt } from '../lib/random'
import type { AnimationProps, Lesson } from '../lib/types'
import { Equation, type Tone } from '../components/visual'

const frames: { a: number; op: string; b: number; r: string | number; tone: Tone; tagB?: string; tagR?: string }[] = [
  { a: 48, op: '×', b: 5, r: '?', tone: 'normal', tagB: 'awkward' },
  { a: 48, op: '×', b: 10, r: 480, tone: 'hot', tagB: 'easy: add a zero' },
  { a: 480, op: '÷', b: 2, r: 240, tone: 'hot', tagB: 'half of it' },
  { a: 48, op: '×', b: 5, r: 240, tone: 'good' },
]

function Animation({ step }: AnimationProps) {
  const f = frames[Math.min(step, frames.length - 1)]
  return <Equation a={f.a} op={f.op} b={f.b} r={f.r} toneR={f.tone} tagB={f.tagB} />
}

export const lesson: Lesson = {
  slug: 'multiply-by-5',
  title: 'Multiplying by 5',
  summary: 'Times 5 is just times 10, then cut it in half.',
  difficulty: 'beginner',
  publishDate: '2026-12-03',
  Animation,
  steps: [
    'Multiplying by 5 feels awkward.',
    'Multiplying by 10 is easy: 48 × 10 = 480.',
    'Five is half of ten, so halve the answer: 480 ÷ 2 = 240.',
    'So 48 × 5 = 240.',
  ],
  generate: (rand = Math.random) => {
    const a = randInt(12, 98, rand)
    return { question: `${a} × 5`, answer: a * 5 }
  },
}
