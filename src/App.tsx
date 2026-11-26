import { Home } from './components/Home'
import { LessonPage } from './components/LessonPage'
import { liveLessons } from './lessons'
import { useHashRoute } from './lib/useHashRoute'

export default function App() {
  const route = useHashRoute()
  const slug = route.startsWith('/lesson/') ? route.slice('/lesson/'.length) : null
  const lesson = slug ? liveLessons().find((l) => l.slug === slug) : undefined

  return (
    <main>
      {slug && !lesson ? (
        <>
          <h1>Lesson not found</h1>
          <a href="#/">← All lessons</a>
        </>
      ) : lesson ? (
        <LessonPage lesson={lesson} />
      ) : (
        <Home />
      )}
    </main>
  )
}
