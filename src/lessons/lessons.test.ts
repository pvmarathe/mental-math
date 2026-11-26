import { describe, expect, it } from 'vitest'
import { allLessons, liveLessons } from './index'

describe('every lesson', () => {
  it('has a unique slug', () => {
    const slugs = allLessons.map((l) => l.slug)
    expect(new Set(slugs).size).toBe(slugs.length)
  })

  it('has a valid publish date', () => {
    for (const l of allLessons) expect(l.publishDate).toMatch(/^\d{4}-\d{2}-\d{2}$/)
  })

  it('generates problems whose answers are correct', () => {
    for (const l of allLessons) {
      for (let i = 0; i < 500; i++) {
        const { question, answer } = l.generate()
        // Safe: questions are digits and + - × ÷ only
        const expr = question.replace(/×/g, '*').replace(/÷/g, '/')
        expect(/^[\d\s+\-*/().]+$/.test(expr)).toBe(true)
        expect(Function(`return (${expr})`)()).toBe(answer)
      }
    }
  })
})

describe('liveLessons', () => {
  it('hides lessons scheduled in the future', () => {
    expect(liveLessons('1999-01-01')).toHaveLength(0)
    expect(liveLessons('2999-01-01')).toHaveLength(allLessons.length)
  })
})
