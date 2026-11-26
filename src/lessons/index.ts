import type { Lesson } from '../lib/types'

// Every file in this folder that exports `lesson` is picked up automatically.
const modules = import.meta.glob<{ lesson: Lesson }>('./*.tsx', { eager: true })

const today = () => new Date().toISOString().slice(0, 10)

/** All lessons, oldest first. */
export const allLessons: Lesson[] = Object.values(modules)
  .map((m) => m.lesson)
  .sort((a, b) => a.publishDate.localeCompare(b.publishDate))

/** Only lessons whose publish date has arrived. */
export function liveLessons(now: string = today()): Lesson[] {
  return allLessons.filter((l) => l.publishDate <= now)
}
