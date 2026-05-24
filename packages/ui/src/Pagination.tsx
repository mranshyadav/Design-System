import React from 'react'
import { cn } from './utils'

export interface PaginationProps {
  page: number
  totalPages: number
  onPageChange: (page: number) => void
  siblingCount?: number
  showFirst?: boolean
  showLast?: boolean
  className?: string
}

function generatePages(
  page: number,
  totalPages: number,
  siblingCount: number
): Array<number | '...'> {
  if (totalPages <= 0) return []

  const range = (start: number, end: number): number[] =>
    Array.from({ length: end - start + 1 }, (_, i) => start + i)

  const totalPageNumbers = siblingCount * 2 + 5 // first + last + current + 2*sibling + 2*ellipsis

  if (totalPages <= totalPageNumbers) {
    return range(1, totalPages)
  }

  const leftSiblingIndex = Math.max(page - siblingCount, 1)
  const rightSiblingIndex = Math.min(page + siblingCount, totalPages)

  const showLeftEllipsis = leftSiblingIndex > 2
  const showRightEllipsis = rightSiblingIndex < totalPages - 1

  if (!showLeftEllipsis && showRightEllipsis) {
    const leftRange = range(1, 3 + 2 * siblingCount)
    return [...leftRange, '...', totalPages]
  }

  if (showLeftEllipsis && !showRightEllipsis) {
    const rightRange = range(totalPages - (3 + 2 * siblingCount) + 1, totalPages)
    return [1, '...', ...rightRange]
  }

  const middleRange = range(leftSiblingIndex, rightSiblingIndex)
  return [1, '...', ...middleRange, '...', totalPages]
}

export function Pagination({
  page,
  totalPages,
  onPageChange,
  siblingCount = 1,
  showFirst = false,
  showLast = false,
  className,
}: PaginationProps) {
  const pages = generatePages(page, totalPages, siblingCount)

  const canPrev = page > 1
  const canNext = page < totalPages

  const btnBase = 'px-3 py-1.5 rounded-lg text-sm transition-colors select-none'
  const btnActive = 'bg-violet-600 text-white font-medium'
  const btnInactive = 'text-gray-600 hover:bg-gray-100'
  const btnDisabled = 'opacity-40 cursor-not-allowed text-gray-600'

  return (
    <nav
      className={cn('flex items-center gap-1', className)}
      aria-label="Pagination"
    >
      {showFirst && (
        <button
          onClick={() => canPrev && onPageChange(1)}
          disabled={!canPrev}
          className={cn(btnBase, canPrev ? btnInactive : btnDisabled)}
          aria-label="First page"
        >
          «
        </button>
      )}

      <button
        onClick={() => canPrev && onPageChange(page - 1)}
        disabled={!canPrev}
        className={cn(btnBase, canPrev ? btnInactive : btnDisabled)}
        aria-label="Previous page"
      >
        ←
      </button>

      {pages.map((p, i) =>
        p === '...' ? (
          <span key={`ellipsis-${i}`} className="px-2 text-gray-400 text-sm select-none">
            ...
          </span>
        ) : (
          <button
            key={p}
            onClick={() => onPageChange(p)}
            className={cn(btnBase, p === page ? btnActive : btnInactive)}
            aria-label={`Page ${p}`}
            aria-current={p === page ? 'page' : undefined}
          >
            {p}
          </button>
        )
      )}

      <button
        onClick={() => canNext && onPageChange(page + 1)}
        disabled={!canNext}
        className={cn(btnBase, canNext ? btnInactive : btnDisabled)}
        aria-label="Next page"
      >
        →
      </button>

      {showLast && (
        <button
          onClick={() => canNext && onPageChange(totalPages)}
          disabled={!canNext}
          className={cn(btnBase, canNext ? btnInactive : btnDisabled)}
          aria-label="Last page"
        >
          »
        </button>
      )}
    </nav>
  )
}
