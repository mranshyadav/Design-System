import React from 'react'

const COLORS = {
  accent:  'var(--accent)',
  success: '#1F6B47',
  warning: '#8A5A14',
  danger:  '#9A2222',
}

/**
 * ProgressBar — linear progress with label and percentage.
 *
 * @param {number} value — 0–100
 * @param {'sm'|'md'|'lg'} size
 * @param {'accent'|'success'|'warning'|'danger'} color
 * @param {boolean} square — square ends instead of rounded
 * @param {string} label
 */
export function ProgressBar({ value = 0, size = 'md', color = 'accent', square = false, label, style }) {
  const h = size === 'sm' ? 4 : size === 'lg' ? 12 : 8
  const radius = square ? 2 : 9999
  const fill = COLORS[color] ?? COLORS.accent

  return (
    <div style={style}>
      {label !== undefined && (
        <div style={{
          display: 'flex', justifyContent: 'space-between', alignItems: 'baseline',
          marginBottom: 6, fontSize: 'var(--fs-13)',
        }}>
          {label && <span style={{ color: 'var(--fg-1)' }}>{label}</span>}
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: 'var(--fs-12)', color: 'var(--fg-3)' }}>
            {Math.round(value)}%
          </span>
        </div>
      )}
      <div style={{
        background: 'var(--graphite-08)', height: h,
        borderRadius: radius, overflow: 'hidden', position: 'relative',
      }}>
        <div style={{
          height: '100%', width: `${Math.min(100, Math.max(0, value))}%`,
          background: fill, borderRadius: radius,
          transition: 'width 200ms var(--ease-standard)',
        }} />
      </div>
    </div>
  )
}

/**
 * ProgressSegmented — step-based progress (e.g. 4 of 6 steps).
 *
 * @param {number} total — total segments
 * @param {number} filled — number of filled segments
 */
export function ProgressSegmented({ total = 6, filled = 3, style }) {
  return (
    <div style={{ display: 'flex', gap: 4, ...style }}>
      {Array.from({ length: total }).map((_, i) => (
        <div key={i} style={{
          flex: 1, height: 8,
          background: i < filled ? 'var(--accent)' : 'var(--graphite-08)',
          borderRadius: 2,
        }} />
      ))}
    </div>
  )
}

/**
 * ProgressCircle — circular progress indicator.
 *
 * @param {number} value — 0–100 (undefined = indeterminate)
 * @param {number} size — diameter in px
 * @param {'accent'|'success'|'warning'|'danger'} color
 */
export function ProgressCircle({ value, size = 56, color = 'accent', style }) {
  const r = (size - 8) / 2
  const circ = 2 * Math.PI * r
  const offset = value !== undefined ? circ - (value / 100) * circ : undefined
  const fill = COLORS[color] ?? COLORS.accent
  const isIndet = value === undefined

  return (
    <div style={{ width: size, height: size, position: 'relative', ...style }}>
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} style={{ transform: 'rotate(-90deg)' }}>
        <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="var(--graphite-08)" strokeWidth={5} />
        <circle
          cx={size / 2} cy={size / 2} r={r} fill="none"
          stroke={fill} strokeWidth={5} strokeLinecap="round"
          strokeDasharray={circ}
          strokeDashoffset={isIndet ? circ * 0.75 : (offset ?? 0)}
          style={isIndet ? { animation: 'sr-spin 1.2s linear infinite' } : { transition: 'stroke-dashoffset 200ms var(--ease-standard)' }}
        />
      </svg>
      <span style={{
        position: 'absolute', inset: 0,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--fg-1)',
      }}>
        {isIndet ? '…' : `${Math.round(value)}%`}
      </span>
    </div>
  )
}
