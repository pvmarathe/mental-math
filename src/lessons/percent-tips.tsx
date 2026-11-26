import { randInt } from '../lib/random'
import type { AnimationProps, Lesson } from '../lib/types'
import { Equation } from '../components/visual'

function Animation({ step }: AnimationProps) {
  const frames = [
    <Equation key="0" a="15% of 80" r="?" toneR="dim" />,
    <Equation key="1" a="10% of 80" r={8} toneA="hot" toneR="hot" tagA="slide the decimal" />,
    <Equation key="2" a="5% of 80" r={4} toneA="hot" toneR="hot" tagA="half of 10%" />,
    <Equation key="3" a={8} op="+" b={4} r={12} toneR="good" tagA="10%" tagB="5%" tagR="15%" />,
  ]
  return (
    <>
      <div className="bar" aria-label="80 split into ten equal parts of 8">
        {Array.from({ length: 10 }, (_, i) => (
          <span key={i} className={`seg ${i === 0 && step >= 1 ? 'hot' : ''} ${i === 1 && step >= 2 ? 'half' : ''}`}>8</span>
        ))}
      </div>
      {frames[Math.min(step, frames.length - 1)]}
    </>
  )
}

export const lesson: Lesson = {
  slug: 'percent-tips',
  title: 'Percentages and tips',
  summary: 'Find 10% first, then build any other percent from it.',
  difficulty: 'intermediate',
  publishDate: '2026-12-31',
  Animation,
  steps: [
    'What is 15% of 80? Picture 80 cut into ten equal parts of 8.',
    '10% is one part: 8.',
    '5% is half of that part: 4.',
    '15% = 10% + 5% = 8 + 4 = 12.',
  ],
  generate: (rand = Math.random) => {
    const base = randInt(2, 10, rand) * 20
    const pct = [5, 10, 15, 20, 25][randInt(0, 4, rand)]
    return { question: `${pct}% of ${base}`, answer: (base * pct) / 100 }
  },
}
