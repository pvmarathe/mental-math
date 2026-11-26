import { liveLessons } from '../lessons'
import { resetProgress } from '../lib/progress'
import { useCompleted } from '../lib/useCompleted'

export function Home() {
  const lessons = liveLessons().reverse() // newest first
  const completed = useCompleted()
  const doneCount = lessons.filter((l) => completed.includes(l.slug)).length

  const reset = () => {
    if (window.confirm('Clear your progress on this device?')) resetProgress()
  }

  return (
    <>
      <h1>Mental Math, Made Visible</h1>
      <p className="lead">Watch the trick, then try it yourself. A new lesson arrives every week.</p>
      {lessons.length > 0 && (
        <div className="progress">
          <progress max={lessons.length} value={doneCount} aria-label="Lessons completed" />
          <span>{doneCount} of {lessons.length} complete</span>
        </div>
      )}
      {lessons.length === 0 && <p>The first lesson is coming soon.</p>}
      <ul className="lesson-list">
        {lessons.map((l) => (
          <li key={l.slug}>
            <a href={`#/lesson/${l.slug}`} className="card">
              <span className="meta">
                <span className={`badge ${l.difficulty}`}>{l.difficulty}</span>
                {completed.includes(l.slug) && <span className="check">✓ Complete</span>}
              </span>
              <strong>{l.title}</strong>
              <span>{l.summary}</span>
            </a>
          </li>
        ))}
      </ul>
      {doneCount > 0 && <button type="button" className="link" onClick={reset}>Reset my progress</button>}
    </>
  )
}
