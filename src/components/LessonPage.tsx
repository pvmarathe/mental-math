import type { Lesson } from '../lib/types'
import { Practice } from './Practice'

export function LessonPage({ lesson }: { lesson: Lesson }) {
  return (
    <article>
      <a href="#/">← All lessons</a>
      <h1>{lesson.title}</h1>
      <section className="card">
        <lesson.Animation />
        <ol>
          {lesson.steps.map((s) => <li key={s}>{s}</li>)}
        </ol>
      </section>
      <Practice key={lesson.slug} lesson={lesson} />
    </article>
  )
}
