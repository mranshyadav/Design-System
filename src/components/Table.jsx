import React, { useState } from 'react'

/**
 * Table — data table with sortable columns, row selection, and status cells.
 *
 * @param {Array<{key: string, label: string, align?: 'left'|'right', mono?: boolean, sortable?: boolean}>} columns
 * @param {Array<Object>} rows — each row must have a unique `id` field
 * @param {Function} onRowClick — (row) => void
 * @param {string} selectedId — highlights selected row
 * @param {string} summary — footer summary text
 */
export function Table({ columns = [], rows = [], onRowClick, selectedId, summary, style }) {
  const [sortKey, setSortKey] = useState(null)
  const [sortDir, setSortDir] = useState('asc')

  const handleSort = (key) => {
    if (sortKey === key) setSortDir(d => d === 'asc' ? 'desc' : 'asc')
    else { setSortKey(key); setSortDir('asc') }
  }

  const sorted = sortKey
    ? [...rows].sort((a, b) => {
        const av = a[sortKey] ?? ''
        const bv = b[sortKey] ?? ''
        const cmp = String(av).localeCompare(String(bv), undefined, { numeric: true })
        return sortDir === 'asc' ? cmp : -cmp
      })
    : rows

  const headStyle = {
    fontFamily: 'var(--font-mono)', fontSize: 10, fontWeight: 500,
    letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--fg-3)',
    textAlign: 'left', padding: '10px 16px', background: 'var(--bg-3)',
    borderBottom: '1px solid var(--border-1)', position: 'sticky', top: 0,
    whiteSpace: 'nowrap',
  }

  const cellStyle = {
    padding: '13px 16px', fontSize: 'var(--fs-13)', color: 'var(--fg-1)',
    borderBottom: '1px solid var(--border-1)', verticalAlign: 'middle',
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', overflow: 'hidden', ...style }}>
      <div style={{ flex: 1, overflow: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              <th style={{ ...headStyle, paddingLeft: 24, width: 28 }}></th>
              {columns.map(col => (
                <th key={col.key} style={{
                  ...headStyle,
                  textAlign: col.align ?? 'left',
                  cursor: col.sortable ? 'pointer' : 'default',
                  userSelect: 'none',
                }}
                onClick={() => col.sortable && handleSort(col.key)}
                >
                  {col.label}
                  {col.sortable && sortKey === col.key && (
                    <span style={{ marginLeft: 4 }}>{sortDir === 'asc' ? '↑' : '↓'}</span>
                  )}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {sorted.map(row => {
              const sel = row.id === selectedId
              return (
                <tr key={row.id} onClick={() => onRowClick?.(row)} style={{
                  background: sel ? 'rgba(31,63,224,0.06)' : 'transparent',
                  cursor: onRowClick ? 'pointer' : 'default',
                }}
                onMouseEnter={e => { if (!sel) e.currentTarget.style.background = 'var(--bg-3)' }}
                onMouseLeave={e => { if (!sel) e.currentTarget.style.background = 'transparent' }}
                >
                  <td style={{ ...cellStyle, paddingLeft: 24, boxShadow: sel ? 'inset 2px 0 0 var(--accent)' : 'none' }}>
                    <input type="checkbox" style={{ accentColor: 'var(--accent)' }} onClick={e => e.stopPropagation()} />
                  </td>
                  {columns.map(col => (
                    <td key={col.key} style={{
                      ...cellStyle,
                      textAlign: col.align ?? 'left',
                      fontFamily: col.mono ? 'var(--font-mono)' : 'var(--font-sans)',
                      fontVariantNumeric: col.align === 'right' ? 'tabular-nums' : undefined,
                    }}>
                      {row[col.key]}
                    </td>
                  ))}
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
      {summary && (
        <div style={{
          padding: '10px 24px', borderTop: '1px solid var(--border-1)',
          fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--fg-3)',
          letterSpacing: '0.04em', display: 'flex', justifyContent: 'space-between',
        }}>
          <span>{summary}</span>
        </div>
      )}
    </div>
  )
}
