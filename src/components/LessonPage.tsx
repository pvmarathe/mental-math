import type { Lesson } from '../lib/types'
import { Practice } from './Practice'
import { Stepper } from './Stepper'

export function LessonPage({ lesson }: { lesson: Lesson }) {
  return (
    <article>
      <a href="#/">← All lessons</a>
      <h1>{lesson.title}</h1>
      <Stepper key={lesson.slug} lesson={lesson} />
      <Practice key={`practice-${lesson.slug}`} lesson={lesson} />
    </article>
  )
}
