import React, { useState } from 'react'

const ChevronIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M6 9l6 6 6-6"/>
  </svg>
)

/**
 * Accordion — bordered or flush (editorial FAQ) variants.
 *
 * @param {Array<{id: string, title: string, body: React.ReactNode, meta?: string, num?: string}>} items
 * @param {'bordered'|'flush'} variant
 * @param {boolean} allowMultiple — allow multiple panels open at once
 */
export function Accordion({ items = [], variant = 'bordered', allowMultiple = false, defaultOpen, style }) {
  const [openIds, setOpenIds] = useState(() => defaultOpen ? [defaultOpen] : [])

  const toggle = (id) => {
    setOpenIds(prev => {
      const isOpen = prev.includes(id)
      if (allowMultiple) return isOpen ? prev.filter(x => x !== id) : [...prev, id]
      return isOpen ? [] : [id]
    })
  }

  const isFlush = variant === 'flush'

  const wrapper = isFlush ? {
    borderRadius: 0, background: 'transparent', border: 0,
    ...style,
  } : {
    background: 'var(--surface)', border: '1px solid var(--border-1)',
    borderRadius: 'var(--radius-8)', overflow: 'hidden',
    ...style,
  }

  return (
    <div style={wrapper}>
      {items.map((item, i) => {
        const isOpen = openIds.includes(item.id)
        const isLast = i === items.length - 1
        const hasNum = !!item.num

        return (
          <div key={item.id} style={{
            borderBottom: isLast ? 'none' : '1px solid var(--border-1)',
          }}>
            <button onClick={() => toggle(item.id)} style={{
              display: 'flex', justifyContent: 'space-between', alignItems: hasNum ? 'flex-start' : 'center',
              width: '100%', textAlign: 'left', border: 0, background: 'transparent', cursor: 'pointer',
              padding: isFlush ? '14px 0' : '12px 14px', gap: 12,
            }}>
              {hasNum && (
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: '0.04em', color: 'var(--fg-3)', width: 28, flexShrink: 0 }}>
                  {item.num}
                </span>
              )}
              <span style={{
                flex: 1,
                fontFamily: isFlush ? 'var(--font-display)' : 'var(--font-sans)',
                fontSize: isFlush ? 'var(--fs-20)' : 'var(--fs-14)',
                fontWeight: isFlush ? 400 : 500,
                letterSpacing: isFlush ? '-0.01em' : 0,
                color: 'var(--fg-1)',
              }}>
                {item.title}
              </span>
              {item.meta && (
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--fg-3)', letterSpacing: '0.04em' }}>
                  {item.meta}
                </span>
              )}
              <span style={{
                color: 'var(--fg-3)', display: 'inline-flex', flexShrink: 0,
                transform: isOpen ? 'rotate(180deg)' : 'rotate(0)',
                transition: 'transform 200ms var(--ease-standard)',
              }}>
                <ChevronIcon />
              </span>
            </button>
            {isOpen && (
              <div style={{
                padding: isFlush
                  ? `0 0 16px ${hasNum ? '28px' : '0'}`
                  : '0 14px 14px',
                fontSize: 'var(--fs-13)', color: 'var(--fg-2)', lineHeight: 1.55,
              }}>
                {item.body}
              </div>
            )}
          </div>
        )
      })}
    </div>
  )
}
