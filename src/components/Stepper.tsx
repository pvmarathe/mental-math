import { useEffect, useState } from 'react'
import type { Lesson } from '../lib/types'

const STEP_MS = 2400

/** Animation with Back / Play / Next controls and a caption for every step. */
export function Stepper({ lesson }: { lesson: Lesson }) {
  const total = lesson.steps.length
  const [step, setStep] = useState(0)
  const [wantsPlay, setWantsPlay] = useState(false)
  const atEnd = step >= total - 1
  const playing = wantsPlay && !atEnd

  useEffect(() => {
    if (!playing) return
    const id = setTimeout(() => setStep((s) => s + 1), STEP_MS)
    return () => clearTimeout(id)
  }, [playing, step])

  const toggle = () => {
    if (atEnd) {
      setStep(0)
      setWantsPlay(true)
    } else {
      setWantsPlay(!playing)
    }
  }
  const go = (n: number) => {
    setWantsPlay(false)
    setStep(Math.max(0, Math.min(total - 1, n)))
  }

  return (
    <section className="card">
      <div className="stage">
        <lesson.Animation step={step} />
      </div>
      <p className="caption" aria-live="polite">{lesson.steps[step]}</p>
      <div className="controls">
        <button type="button" className="ghost" onClick={() => go(step - 1)} disabled={step === 0}>← Back</button>
        <button type="button" onClick={toggle}>{atEnd ? '↻ Replay' : playing ? '⏸ Pause' : '▶ Play'}</button>
        <button type="button" className="ghost" onClick={() => go(step + 1)} disabled={atEnd}>Next →</button>
      </div>
      <ol className="steplist">
        {lesson.steps.map((s, i) => (
          <li key={s} className={i === step ? 'current' : i < step ? 'past' : ''}>
            <button type="button" onClick={() => go(i)}>{s}</button>
          </li>
        ))}
      </ol>
    </section>
  )
}
