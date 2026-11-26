import { createElement } from 'react'
import { renderToString } from 'react-dom/server'
import { describe, expect, it } from 'vitest'
import { allLessons, liveLessons } from './index'

/** Turns a question like "15% of 80" or "83 − 47" into plain arithmetic we can evaluate. */
function evaluate(question: string): number {
  const expr = question
    .replace(/(\d+)% of (\d+)/g, '(($2*$1)/100)')
    .replace(/×/g, '*')
    .replace(/÷/g, '/')
    .replace(/−/g, '-')
  if (!/^[\d\s+\-*/().]+$/.test(expr)) throw new Error(`Unexpected question format: ${question}`)
  return Function(`return (${expr})`)() as number
}

const DAY = 24 * 60 * 60 * 1000
const asTime = (d: string) => new Date(`${d}T00:00:00Z`).getTime()

describe('every lesson', () => {
  it('has a unique slug', () => {
    const slugs = allLessons.map((l) => l.slug)
    expect(new Set(slugs).size).toBe(slugs.length)
  })

  it('has a valid publish date', () => {
    for (const l of allLessons) expect(l.publishDate).toMatch(/^\d{4}-\d{2}-\d{2}$/)
  })

  it('is published at least a week after the previous lesson', () => {
    for (let i = 1; i < allLessons.length; i++) {
      const gap = asTime(allLessons[i].publishDate) - asTime(allLessons[i - 1].publishDate)
      expect(gap, `${allLessons[i].slug} is too close to ${allLessons[i - 1].slug}`).toBeGreaterThanOrEqual(7 * DAY)
    }
  })

  it('has at least two captioned steps', () => {
    for (const l of allLessons) expect(l.steps.length).toBeGreaterThanOrEqual(2)
  })

  it('draws every step without crashing', () => {
    for (const l of allLessons) {
      for (let step = 0; step < l.steps.length; step++) {
        expect(() => renderToString(createElement(l.Animation, { step })), `${l.slug} step ${step}`).not.toThrow()
      }
    }
  })

  it('generates problems whose answers are correct whole numbers', () => {
    for (const l of allLessons) {
      for (let i = 0; i < 500; i++) {
        const { question, answer } = l.generate()
        expect(Number.isInteger(answer), `${l.slug}: ${question}`).toBe(true)
        expect(answer, `${l.slug}: ${question}`).toBeGreaterThan(0)
        expect(evaluate(question), `${l.slug}: ${question}`).toBe(answer)
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
