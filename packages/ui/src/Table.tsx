import React, { useState, ReactNode } from 'react'
import { cn } from './utils'

export interface Column {
  key: string
  label: string
  sortable?: boolean
  align?: 'left' | 'center' | 'right'
  render?: (value: unknown, row: Record<string, unknown>) => ReactNode
}

export interface TableProps {
  columns: Column[]
  rows: Array<Record<string, unknown> & { id: string }>
  selectable?: boolean
  selected?: string[]
  onSelectionChange?: (ids: string[]) => void
  loading?: boolean
  emptyState?: ReactNode
  onSort?: (key: string, dir: 'asc' | 'desc') => void
  className?: string
}

const alignClass = {
  left: 'text-left',
  center: 'text-center',
  right: 'text-right',
}

function SkeletonRow({ cols }: { cols: number }) {
  return (
    <tr>
      {Array.from({ length: cols }).map((_, i) => (
        <td key={i} className="px-4 py-3">
          <div className="h-4 bg-gray-200 rounded animate-pulse w-full" />
        </td>
      ))}
    </tr>
  )
}

export function Table({
  columns,
  rows,
  selectable = false,
  selected = [],
  onSelectionChange,
  loading = false,
  emptyState,
  onSort,
  className,
}: TableProps) {
  const [sortKey, setSortKey] = useState<string | null>(null)
  const [sortDir, setSortDir] = useState<'asc' | 'desc'>('asc')

  function handleSort(key: string) {
    let newDir: 'asc' | 'desc' = 'asc'
    if (sortKey === key) {
      newDir = sortDir === 'asc' ? 'desc' : 'asc'
    }
    setSortKey(key)
    setSortDir(newDir)
    onSort?.(key, newDir)
  }

  function handleSelectAll(checked: boolean) {
    if (!onSelectionChange) return
    onSelectionChange(checked ? rows.map((r) => r.id) : [])
  }

  function handleSelectRow(id: string, checked: boolean) {
    if (!onSelectionChange) return
    onSelectionChange(
      checked ? [...selected, id] : selected.filter((s) => s !== id)
    )
  }

  const allSelected = rows.length > 0 && rows.every((r) => selected.includes(r.id))
  const someSelected = rows.some((r) => selected.includes(r.id)) && !allSelected

  const totalCols = columns.length + (selectable ? 1 : 0)

  function SortIcon({ colKey }: { colKey: string }) {
    if (sortKey !== colKey) {
      return <span className="ml-1 text-gray-300">↕</span>
    }
    return (
      <span className="ml-1 text-violet-600">
        {sortDir === 'asc' ? '↑' : '↓'}
      </span>
    )
  }

  return (
    <div className={cn('overflow-x-auto rounded-xl border border-gray-200', className)}>
      <table className="w-full text-sm">
        <thead className="bg-gray-50 border-b border-gray-200">
          <tr>
            {selectable && (
              <th className="px-4 py-3 w-10">
                <input
                  type="checkbox"
                  checked={allSelected}
                  ref={(el) => {
                    if (el) el.indeterminate = someSelected
                  }}
                  onChange={(e) => handleSelectAll(e.target.checked)}
                  className="rounded border-gray-300 text-violet-600 focus:ring-violet-500"
                  aria-label="Select all"
                />
              </th>
            )}
            {columns.map((col) => (
              <th
                key={col.key}
                className={cn(
                  'px-4 py-3 font-semibold text-gray-600',
                  alignClass[col.align ?? 'left'],
                  col.sortable && 'cursor-pointer hover:bg-gray-100 select-none transition-colors'
                )}
                onClick={() => col.sortable && handleSort(col.key)}
              >
                <span className="inline-flex items-center">
                  {col.label}
                  {col.sortable && <SortIcon colKey={col.key} />}
                </span>
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100">
          {loading ? (
            <>
              <SkeletonRow cols={totalCols} />
              <SkeletonRow cols={totalCols} />
              <SkeletonRow cols={totalCols} />
            </>
          ) : rows.length === 0 ? (
            <tr>
              <td
                colSpan={totalCols}
                className="px-4 py-12 text-center text-gray-400"
              >
                {emptyState ?? 'No data'}
              </td>
            </tr>
          ) : (
            rows.map((row) => {
              const isSelected = selected.includes(row.id)
              return (
                <tr
                  key={row.id}
                  className={cn(
                    'hover:bg-gray-50 transition-colors',
                    isSelected && 'bg-violet-50'
                  )}
                >
                  {selectable && (
                    <td className="px-4 py-3 w-10">
                      <input
                        type="checkbox"
                        checked={isSelected}
                        onChange={(e) => handleSelectRow(row.id, e.target.checked)}
                        className="rounded border-gray-300 text-violet-600 focus:ring-violet-500"
                        aria-label={`Select row ${row.id}`}
                      />
                    </td>
                  )}
                  {columns.map((col) => (
                    <td
                      key={col.key}
                      className={cn('px-4 py-3', alignClass[col.align ?? 'left'])}
                    >
                      {col.render
                        ? col.render(row[col.key], row)
                        : (row[col.key] as ReactNode) ?? '—'}
                    </td>
                  ))}
                </tr>
              )
            })
          )}
        </tbody>
      </table>
    </div>
  )
}
