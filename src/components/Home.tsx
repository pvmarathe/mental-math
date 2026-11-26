import { liveLessons } from '../lessons'

export function Home() {
  const lessons = liveLessons().reverse() // newest first
  return (
    <>
      <h1>Mental Math, Made Visible</h1>
      <p className="lead">Watch the trick, then try it yourself. A new lesson arrives every week.</p>
      {lessons.length === 0 && <p>The first lesson is coming soon.</p>}
      <ul className="lesson-list">
        {lessons.map((l) => (
          <li key={l.slug}>
            <a href={`#/lesson/${l.slug}`} className="card">
              <span className={`badge ${l.difficulty}`}>{l.difficulty}</span>
              <strong>{l.title}</strong>
              <span>{l.summary}</span>
            </a>
          </li>
        ))}
      </ul>
    </>
  )
}
