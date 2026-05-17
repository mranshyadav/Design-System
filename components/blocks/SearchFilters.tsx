'use client'

import { useState } from 'react'
import { Search, X, SlidersHorizontal, Check } from 'lucide-react'
import clsx from 'clsx'

interface SearchFiltersProps {
  query: string
  onQueryChange: (q: string) => void
  activeCategory: string
  onCategoryChange: (c: string) => void
  sortBy: string
  onSortChange: (s: string) => void
  activeTags: string[]
  onTagToggle: (t: string) => void
  resultCount: number
  allTags: string[]
}

const sortOptions = [
  { value: 'newest', label: 'Newest' },
  { value: 'popular', label: 'Popular' },
  { value: 'az', label: 'A → Z' },
]

export function SearchFilters(props: SearchFiltersProps) {
  const { query, onQueryChange, activeCategory, onCategoryChange, sortBy, onSortChange, activeTags, onTagToggle, resultCount, allTags } = props
  const [showTagFilter, setShowTagFilter] = useState(false)

  return (
    <div className="space-y-3">
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
          <input
            type="text"
            placeholder="Search blocks, categories, tags..."
            value={query}
            onChange={e => onQueryChange(e.target.value)}
            className="w-full pl-10 pr-10 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-sm text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-accent-500/20 focus:border-accent-500 dark:focus:border-accent-500 transition-all shadow-sm"
          />
          {query && (
            <button
              onClick={() => onQueryChange('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 p-0.5 rounded-md text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            >
              <X size={14} />
            </button>
          )}
        </div>

        <select
          value={sortBy}
          onChange={e => onSortChange(e.target.value)}
          className="px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-sm text-gray-700 dark:text-gray-300 focus:outline-none focus:ring-2 focus:ring-accent-500/20 focus:border-accent-500 cursor-pointer appearance-none pr-8 shadow-sm transition-all"
        >
          {sortOptions.map(opt => (
            <option key={opt.value} value={opt.value}>{opt.label}</option>
          ))}
        </select>

        <button
          onClick={() => setShowTagFilter(f => !f)}
          className={clsx(
            'flex items-center gap-2 px-4 py-3 rounded-xl border text-sm font-medium shadow-sm transition-all',
            showTagFilter || activeTags.length > 0
              ? 'bg-accent-50 dark:bg-accent-500/10 border-accent-300 dark:border-accent-600 text-accent-600 dark:text-accent-400'
              : 'bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-400 hover:border-gray-300 dark:hover:border-gray-600'
          )}
        >
          <SlidersHorizontal size={14} />
          Filters
          {activeTags.length > 0 && (
            <span className="w-4 h-4 rounded-full bg-accent-500 text-white text-[9px] font-bold flex items-center justify-center">
              {activeTags.length}
            </span>
          )}
        </button>
      </div>

      {showTagFilter && (
        <div className="p-4 rounded-xl bg-gray-50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Filter by tag</span>
            {activeTags.length > 0 && (
              <button
                onClick={() => activeTags.forEach(t => onTagToggle(t))}
                className="text-xs text-accent-500 hover:text-accent-600 font-medium"
              >
                Clear all
              </button>
            )}
          </div>
          <div className="flex flex-wrap gap-2">
            {allTags.map(tag => (
              <button
                key={tag}
                onClick={() => onTagToggle(tag)}
                className={clsx(
                  'px-3 py-1.5 rounded-lg text-xs font-mono border transition-all flex items-center gap-1.5',
                  activeTags.includes(tag)
                    ? 'bg-accent-500/10 dark:bg-accent-500/20 border-accent-500/40 text-accent-600 dark:text-accent-400'
                    : 'bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 text-gray-500 dark:text-gray-400 hover:border-accent-300 hover:text-accent-600'
                )}
              >
                {activeTags.includes(tag) && <Check size={10} />}
                {tag}
              </button>
            ))}
          </div>
        </div>
      )}

      <div className="flex items-center justify-between">
        <p className="text-sm text-gray-500 dark:text-gray-400">
          Showing <span className="font-semibold text-gray-900 dark:text-white">{resultCount}</span> blocks
          {activeCategory !== 'all' ? <> in <span className="text-accent-500 font-semibold capitalize">{activeCategory}</span></> : ''}
          {query ? <> for "<span className="text-accent-500 font-semibold">{query}</span>"</> : ''}
        </p>
        {(activeTags.length > 0 || query) && (
          <button
            onClick={() => { onQueryChange(''); activeTags.forEach(t => onTagToggle(t)) }}
            className="flex items-center gap-1.5 text-xs text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 transition-colors"
          >
            <X size={12} /> Clear filters
          </button>
        )}
      </div>
    </div>
  )
}
