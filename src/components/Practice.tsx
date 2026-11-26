import { useState } from 'react'
import type { Lesson, Problem } from '../lib/types'

export function Practice({ lesson }: { lesson: Lesson }) {
  const [problem, setProblem] = useState<Problem>(() => lesson.generate())
  const [guess, setGuess] = useState('')
  const [result, setResult] = useState<'right' | 'wrong' | null>(null)
  const [score, setScore] = useState({ right: 0, total: 0 })

  const check = (e: React.FormEvent) => {
    e.preventDefault()
    if (result || guess.trim() === '') return
    const ok = Number(guess) === problem.answer
    setResult(ok ? 'right' : 'wrong')
    setScore((s) => ({ right: s.right + (ok ? 1 : 0), total: s.total + 1 }))
  }

  const next = () => {
    setProblem(lesson.generate())
    setGuess('')
    setResult(null)
  }

  return (
    <section className="card">
      <h2>Your turn</h2>
      <p className="question">{problem.question} = ?</p>
      <form onSubmit={check}>
        <input
          inputMode="numeric"
          aria-label="Your answer"
          value={guess}
          onChange={(e) => setGuess(e.target.value)}
          disabled={result !== null}
          autoFocus
        />
        {result === null ? <button type="submit">Check</button> : <button type="button" onClick={next}>Next</button>}
      </form>
      <p role="status" className={result ?? ''}>
        {result === 'right' && 'Correct!'}
        {result === 'wrong' && `Not quite. The answer is ${problem.answer}.`}
      </p>
      <p className="score">Score: {score.right} / {score.total}</p>
    </section>
  )
}
