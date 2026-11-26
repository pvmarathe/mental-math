import { useMemo, useSyncExternalStore } from 'react'
import { parseCompleted, readRaw, subscribeProgress } from './progress'

/** Slugs of lessons the visitor has completed. Updates live when progress changes. */
export function useCompleted(): string[] {
  const raw = useSyncExternalStore(subscribeProgress, () => readRaw(), () => null)
  return useMemo(() => parseCompleted(raw), [raw])
}
