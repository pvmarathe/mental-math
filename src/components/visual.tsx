import { Fragment, type ReactNode } from 'react'

export type Tone = 'normal' | 'hot' | 'dim' | 'good' | 'hidden'

export function Row({ children }: { children: ReactNode }) {
  return <div className="row">{children}</div>
}

export function Op({ children }: { children: ReactNode }) {
  return <span className="op">{children}</span>
}

/** A number (or short text) in a box, with an optional small label underneath. */
export function Chip({ children, tone = 'normal', tag }: { children: ReactNode; tone?: Tone; tag?: string }) {
  return (
    <span className="chipwrap">
      <span className={`chip ${tone}`}>{children}</span>
      <span className={`tag ${tone === 'hidden' ? 'hidden' : ''}`}>{tag ?? ' '}</span>
    </span>
  )
}

interface EquationProps {
  a: ReactNode
  op?: string
  b?: ReactNode
  r: ReactNode
  toneA?: Tone
  toneB?: Tone
  toneR?: Tone
  tagA?: string
  tagB?: string
  tagR?: string
}

/** "a op b = r". Leave out `b` for a one-sided "a = r". */
export function Equation({ a, op, b, r, toneA, toneB, toneR, tagA, tagB, tagR }: EquationProps) {
  return (
    <Row>
      <Chip tone={toneA} tag={tagA}>{a}</Chip>
      {b !== undefined && (
        <>
          <Op>{op}</Op>
          <Chip tone={toneB} tag={tagB}>{b}</Chip>
        </>
      )}
      <Op>=</Op>
      <Chip tone={toneR} tag={tagR}>{r}</Chip>
    </Row>
  )
}

export interface Jump {
  from: number
  to: number
  label: string
}

/** A number line. Jumps fade in one by one: the first `shown` jumps are visible. */
export function NumberLine({ min, max, marks, jumps, shown }: {
  min: number
  max: number
  marks: number[]
  jumps: Jump[]
  shown: number
}) {
  const W = 600
  const H = 150
  const pad = 30
  const y = 95
  const x = (v: number) => pad + ((v - min) / (max - min)) * (W - 2 * pad)
  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="numline" role="img" aria-label="Number line">
      <line x1={x(min)} x2={x(max)} y1={y} y2={y} stroke="currentColor" strokeWidth={2} opacity={0.5} />
      {marks.map((m) => (
        <g key={m}>
          <line x1={x(m)} x2={x(m)} y1={y - 6} y2={y + 6} stroke="currentColor" strokeWidth={2} />
          <text x={x(m)} y={y + 30} textAnchor="middle" fontSize={20} fill="currentColor">{m}</text>
        </g>
      ))}
      {jumps.map((j, i) => {
        const x1 = x(j.from)
        const x2 = x(j.to)
        const mid = (x1 + x2) / 2
        return (
          <g key={i} style={{ opacity: i < shown ? 1 : 0, transition: 'opacity .5s' }}>
            <path d={`M${x1} ${y} Q${mid} ${y - 60} ${x2} ${y}`} fill="none" stroke="var(--accent)" strokeWidth={3} />
            <text x={mid} y={y - 42} textAnchor="middle" fontSize={22} fontWeight={700} fill="var(--accent)">{j.label}</text>
          </g>
        )
      })}
    </svg>
  )
}

export interface Part {
  label: string
  /** Visual width/height share. Not the true value, so tiny parts stay readable. */
  weight: number
}

/** A rectangle split into labelled parts. The first `reveal` cells (row by row) show their text. */
export function AreaModel({ cols, rows, cells, reveal }: {
  cols: Part[]
  rows: Part[]
  cells: string[]
  reveal: number
}) {
  return (
    <div
      className="area"
      style={{
        gridTemplateColumns: `auto ${cols.map((c) => `${c.weight}fr`).join(' ')}`,
        gridTemplateRows: `auto ${rows.map((r) => `${r.weight}fr`).join(' ')}`,
      }}
    >
      <span />
      {cols.map((c) => <span key={c.label} className="ah">{c.label}</span>)}
      {rows.map((r, ri) => (
        <Fragment key={r.label}>
          <span className="ah">{r.label}</span>
          {cols.map((c, ci) => {
            const i = ri * cols.length + ci
            return (
              <span key={c.label} className={`cell ${i < reveal ? 'on' : ''} ${i === reveal - 1 ? 'hot' : ''}`}>
                {i < reveal ? cells[i] : ''}
              </span>
            )
          })}
        </Fragment>
      ))}
    </div>
  )
}
