import React from 'react'

const btnBase = {
  minWidth: 32, height: 32, padding: '0 10px',
  border: '1px solid var(--border-1)', background: 'var(--surface)',
  borderRadius: 'var(--radius-4)',
  fontFamily: 'var(--font-mono)', fontSize: 'var(--fs-13)', color: 'var(--fg-1)',
  display: 'inline-flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer',
}

/**
 * Pagination — numbered, with load-more, and cursor/jump variants.
 *
 * @param {number} page — current page (1-based)
 * @param {number} total — total page count
 * @param {Function} onChange — (page) => void
 * @param {'numbered'|'load-more'} variant
 * @param {string} summary — e.g. "Showing 21–40 of 312"
 */
export function Pagination({ page = 1, total = 1, onChange, variant = 'numbered', summary, style }) {
  const pages = []
  const WING = 1
  for (let p = 1; p <= total; p++) {
    if (p === 1 || p === total || (p >= page - WING && p <= page + WING)) {
      pages.push(p)
    }
  }

  const rendered = []
  let prev = null
  for (const p of pages) {
    if (prev !== null && p - prev > 1) rendered.push('…')
    rendered.push(p)
    prev = p
  }

  if (variant === 'load-more') {
    return (
      <div style={style}>
        <button
          onClick={() => onChange?.(page + 1)}
          disabled={page >= total}
          style={{ ...btnBase, width: 'max-content', padding: '0 16px', opacity: page >= total ? 0.4 : 1 }}
        >
          Load 20 more
        </button>
      </div>
    )
  }

  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: summary ? '16px' : '4px', ...style }}>
      {summary && <span style={{ fontFamily: 'var(--font-mono)', fontSize: 'var(--fs-12)', color: 'var(--fg-3)', letterSpacing: '0.04em' }}>{summary}</span>}
      <div style={{ display: 'flex', gap: 4, alignItems: 'center' }}>
        <button onClick={() => onChange?.(page - 1)} disabled={page <= 1} style={{ ...btnBase, border: 0, background: 'transparent', opacity: page <= 1 ? 0.4 : 1 }}>‹</button>
        {rendered.map((p, i) =>
          p === '…'
            ? <span key={`gap-${i}`} style={{ color: 'var(--fg-3)', padding: '0 4px', fontFamily: 'var(--font-mono)' }}>…</span>
            : (
              <button key={p} onClick={() => onChange?.(p)} style={{
                ...btnBase,
                background: p === page ? 'var(--ink)' : 'var(--surface)',
                color: p === page ? 'var(--paper)' : 'var(--fg-1)',
                borderColor: p === page ? 'var(--ink)' : 'var(--border-1)',
              }}>
                {p}
              </button>
            )
        )}
        <button onClick={() => onChange?.(page + 1)} disabled={page >= total} style={{ ...btnBase, border: 0, background: 'transparent', opacity: page >= total ? 0.4 : 1 }}>›</button>
      </div>
    </div>
  )
}
