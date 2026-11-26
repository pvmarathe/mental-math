import { describe, expect, it } from 'vitest'
import { markCompleted, parseCompleted, readRaw, resetProgress, type KeyValueStore } from './progress'

function fakeStore(initial: Record<string, string> = {}): KeyValueStore {
  const data = { ...initial }
  return {
    getItem: (k) => data[k] ?? null,
    setItem: (k, v) => { data[k] = v },
    removeItem: (k) => { delete data[k] },
  }
}

describe('parseCompleted', () => {
  it('handles empty, broken and unexpected data', () => {
    expect(parseCompleted(null)).toEqual([])
    expect(parseCompleted('not json')).toEqual([])
    expect(parseCompleted('{"a":1}')).toEqual([])
    expect(parseCompleted('["a", 3, "b"]')).toEqual(['a', 'b'])
  })
})

describe('markCompleted', () => {
  it('saves a slug once', () => {
    const store = fakeStore()
    markCompleted('a', store)
    markCompleted('a', store)
    markCompleted('b', store)
    expect(parseCompleted(readRaw(store))).toEqual(['a', 'b'])
  })

  it('does not crash when storage is unavailable or throws', () => {
    expect(() => markCompleted('a', null)).not.toThrow()
    const broken: KeyValueStore = {
      getItem: () => { throw new Error('blocked') },
      setItem: () => { throw new Error('blocked') },
      removeItem: () => { throw new Error('blocked') },
    }
    expect(() => markCompleted('a', broken)).not.toThrow()
    expect(() => resetProgress(broken)).not.toThrow()
  })
})

describe('resetProgress', () => {
  it('clears everything', () => {
    const store = fakeStore()
    markCompleted('a', store)
    resetProgress(store)
    expect(parseCompleted(readRaw(store))).toEqual([])
  })
})
