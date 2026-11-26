import { useEffect, useState } from 'react'
import { randInt } from '../lib/random'
import type { Lesson } from '../lib/types'

/** Shows 98 + 47 as: borrow 2 from 47 to make 100, then add the rest. */
function Animation() {
  const [step, setStep] = useState(0)
  useEffect(() => {
    const id = setInterval(() => setStep((s) => (s + 1) % 4), 1800)
    return () => clearInterval(id)
  }, [])

  const left = step >= 1 ? 100 : 98
  const right = step >= 1 ? 45 : 47
  return (
    <div className="stage" role="img" aria-label="98 plus 47 becomes 100 plus 45">
      <span className="num" style={{ color: step >= 1 ? 'var(--accent)' : undefined }}>{left}</span>
      <span className="op">+</span>
      <span className="num">{right}</span>
      <span className="op">=</span>
      <span className="num">{step >= 2 ? 145 : '?'}</span>
      {step === 1 && <span className="note">2 moves across</span>}
    </div>
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
    'Take 2 from the other number: 47 becomes 45.',
    'Now add 100 + 45 = 145. Easy!',
  ],
  generate: (rand = Math.random) => {
    const a = randInt(95, 99, rand)
    const b = randInt(11, 89, rand)
    return { question: `${a} + ${b}`, answer: a + b }
  },
}
