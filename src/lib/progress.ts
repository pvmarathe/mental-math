/** Correct practice answers needed before a lesson counts as complete. */
export const MASTERY_CORRECT = 3

const KEY = 'mental-math:completed:v1'

export interface KeyValueStore {
  getItem(key: string): string | null
  setItem(key: string, value: string): void
  removeItem(key: string): void
}

/** Browser storage can be missing or blocked (private windows), so every access is guarded. */
function browserStore(): KeyValueStore | null {
  try {
    return window.localStorage
  } catch {
    return null
  }
}

const listeners = new Set<() => void>()
const notify = () => listeners.forEach((l) => l())

/** Calls `cb` whenever progress changes in this tab or in another tab. */
export function subscribeProgress(cb: () => void): () => void {
  listeners.add(cb)
  window.addEventListener('storage', cb)
  return () => {
    listeners.delete(cb)
    window.removeEventListener('storage', cb)
  }
}

/** The raw saved text. A plain string so React can tell cheaply whether it changed. */
export function readRaw(store: KeyValueStore | null = browserStore()): string | null {
  try {
    return store?.getItem(KEY) ?? null
  } catch {
    return null
  }
}

/** Turns saved text into a list of lesson slugs. Anything unexpected becomes an empty list. */
export function parseCompleted(raw: string | null): string[] {
  if (!raw) return []
  try {
    const parsed: unknown = JSON.parse(raw)
    return Array.isArray(parsed) ? parsed.filter((x): x is string => typeof x === 'string') : []
  } catch {
    return []
  }
}

export function markCompleted(slug: string, store: KeyValueStore | null = browserStore()): void {
  const current = parseCompleted(readRaw(store))
  if (current.includes(slug)) return
  try {
    store?.setItem(KEY, JSON.stringify([...current, slug]))
  } catch {
    // Storage full or blocked: progress just isn't saved.
  }
  notify()
}

export function resetProgress(store: KeyValueStore | null = browserStore()): void {
  try {
    store?.removeItem(KEY)
  } catch {
    // ignore
  }
  notify()
}
