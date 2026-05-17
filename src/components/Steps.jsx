import React from 'react'

/**
 * Steps — horizontal progress steps.
 *
 * @param {Array<{label: string, description?: string}>} steps
 * @param {number} current — 0-based active step index
 * @param {'horizontal'|'vertical'} orientation
 */
export function Steps({ steps = [], current = 0, orientation = 'horizontal', style }) {
  if (orientation === 'vertical') {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', ...style }}>
        {steps.map((step, i) => {
          const done = i < current
          const active = i === current
          const last = i === steps.length - 1

          return (
            <div key={i} style={{ display: 'flex', gap: 16 }}>
              {/* Line column */}
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <span style={{
                  width: 24, height: 24, borderRadius: '50%', flexShrink: 0,
                  display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                  fontFamily: 'var(--font-mono)', fontSize: 11, fontWeight: 500,
                  background: done ? 'var(--ink)' : active ? 'var(--accent)' : 'var(--surface)',
                  color: (done || active) ? 'var(--paper)' : 'var(--fg-3)',
                  border: `1.5px solid ${done ? 'var(--ink)' : active ? 'var(--accent)' : 'var(--border-2)'}`,
                }}>
                  {done ? '✓' : i + 1}
                </span>
                {!last && (
                  <div style={{
                    width: 1, flex: 1, minHeight: 24,
                    background: done ? 'var(--ink)' : 'var(--border-1)',
                    margin: '4px 0',
                  }} />
                )}
              </div>
              {/* Content */}
              <div style={{ paddingBottom: last ? 0 : 24 }}>
                <div style={{
                  fontSize: 'var(--fs-14)', fontWeight: active ? 500 : 400,
                  color: active ? 'var(--fg-1)' : done ? 'var(--fg-2)' : 'var(--fg-3)',
                }}>
                  {step.label}
                </div>
                {step.description && (
                  <div style={{ fontSize: 'var(--fs-12)', color: 'var(--fg-3)', marginTop: 2 }}>
                    {step.description}
                  </div>
                )}
              </div>
            </div>
          )
        })}
      </div>
    )
  }

  // horizontal
  return (
    <div style={{ display: 'flex', alignItems: 'flex-start', gap: 0, ...style }}>
      {steps.map((step, i) => {
        const done = i < current
        const active = i === current
        const last = i === steps.length - 1

        return (
          <React.Fragment key={i}>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8, flex: last ? 0 : undefined, minWidth: 0 }}>
              <span style={{
                width: 28, height: 28, borderRadius: '50%', flexShrink: 0,
                display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                fontFamily: 'var(--font-mono)', fontSize: 11, fontWeight: 500,
                background: done ? 'var(--ink)' : active ? 'var(--accent)' : 'var(--surface)',
                color: (done || active) ? 'var(--paper)' : 'var(--fg-3)',
                border: `1.5px solid ${done ? 'var(--ink)' : active ? 'var(--accent)' : 'var(--border-2)'}`,
              }}>
                {done ? '✓' : i + 1}
              </span>
              <span style={{
                fontSize: 'var(--fs-12)', fontWeight: active ? 500 : 400,
                color: active ? 'var(--fg-1)' : done ? 'var(--fg-2)' : 'var(--fg-3)',
                textAlign: 'center', whiteSpace: 'nowrap',
              }}>
                {step.label}
              </span>
            </div>
            {!last && (
              <div style={{
                height: 1.5, flex: 1, marginTop: 14,
                background: done ? 'var(--ink)' : 'var(--border-1)',
              }} />
            )}
          </React.Fragment>
        )
      })}
    </div>
  )
}
