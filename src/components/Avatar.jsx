import React from 'react'

const PALETTE = [
  'var(--ink)',
  'var(--graphite-70)',
  'var(--graphite-55)',
  'var(--accent)',
  '#1F6B47',
  '#8A5A14',
]

const SIZES = { 24: 10, 32: 12, 40: 14, 56: 18 }
const STATUS_COLORS = { online: '#1F6B47', busy: '#9A2222', away: '#8A5A14' }

/**
 * Avatar — initials, sizes, shapes, status dots, stack.
 *
 * @param {string} initials — e.g. "PR"
 * @param {number} size — 24 | 32 | 40 | 56
 * @param {boolean} square — square with radius-4 instead of circle
 * @param {'online'|'busy'|'away'} status — shows a status dot
 * @param {number} colorIndex — 0-5, picks from palette
 */
export function Avatar({ initials, size = 40, square = false, status, colorIndex = 0, style }) {
  const bg = PALETTE[colorIndex % PALETTE.length]
  const fs = SIZES[size] ?? 14

  return (
    <span style={{
      width: size, height: size,
      borderRadius: square ? 'var(--radius-4)' : '50%',
      background: bg, color: 'var(--paper)',
      display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
      fontFamily: 'var(--font-sans)', fontWeight: 500, fontSize: fs,
      position: 'relative', flexShrink: 0,
      ...style,
    }}>
      {initials}
      {status && (
        <span style={{
          position: 'absolute', bottom: 0, right: 0,
          width: 10, height: 10, borderRadius: '50%',
          background: STATUS_COLORS[status] ?? 'var(--fg-3)',
          border: '2px solid var(--paper)',
        }} />
      )}
    </span>
  )
}

/**
 * AvatarStack — overlapping group with +N overflow count.
 */
export function AvatarStack({ avatars = [], max = 4, size = 32 }) {
  const visible = avatars.slice(0, max)
  const overflow = avatars.length - max

  return (
    <span style={{ display: 'inline-flex' }}>
      {visible.map((av, i) => (
        <Avatar key={i} {...av} size={size} style={{
          border: '2px solid var(--paper)',
          marginLeft: i === 0 ? 0 : -8,
        }} />
      ))}
      {overflow > 0 && (
        <span style={{
          width: size, height: size, borderRadius: '50%',
          background: 'var(--graphite-04)', color: 'var(--fg-2)',
          fontFamily: 'var(--font-mono)', fontSize: 11,
          display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
          border: '2px solid var(--paper)', marginLeft: -8,
        }}>
          +{overflow}
        </span>
      )}
    </span>
  )
}
