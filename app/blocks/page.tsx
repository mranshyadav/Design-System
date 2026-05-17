'use client'
import { useState, useMemo } from 'react'
import { Search, SlidersHorizontal, X } from 'lucide-react'
import { blocks, categories } from '@/lib/data'
import { Sidebar } from '@/components/blocks/Sidebar'
import { BlockCard } from '@/components/blocks/BlockCard'
import clsx from 'clsx'

export default function BlocksPage() {
  const [activeCategory, setActiveCategory] = useState('all')
  const [query, setQuery] = useState('')
  const [showFilters, setShowFilters] = useState(false)
  const [activeTags, setActiveTags] = useState<string[]>([])

  const allTags = useMemo(() => {
    const tags = new Set<string>()
    blocks.forEach(b => b.tags.forEach(t => tags.add(t)))
    return Array.from(tags).sort()
  }, [])

  const filtered = useMemo(() => {
    let result = blocks
    if (activeCategory !== 'all') result = result.filter(b => b.category === activeCategory)
    if (query.trim()) {
      const q = query.toLowerCase()
      result = result.filter(b =>
        b.title.toLowerCase().includes(q) ||
        b.description.toLowerCase().includes(q) ||
        b.tags.some(t => t.toLowerCase().includes(q))
      )
    }
    if (activeTags.length > 0) {
      result = result.filter(b => activeTags.every(t => b.tags.includes(t)))
    }
    return result
  }, [activeCategory, query, activeTags])

  const counts = useMemo(() => {
    const c: Record<string, number> = { all: blocks.length }
    blocks.forEach(b => { c[b.category] = (c[b.category] ?? 0) + 1 })
    return c
  }, [])

  const toggleTag = (tag: string) => {
    setActiveTags(prev => prev.includes(tag) ? prev.filter(t => t !== tag) : [...prev, tag])
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
      {/* Page header */}
      <div className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 lg:py-14">
          <div className="max-w-2xl">
            <p className="text-xs font-semibold uppercase tracking-widest text-accent-500 mb-2">UI Blocks</p>
            <h1 className="text-3xl lg:text-4xl font-extrabold text-gray-900 dark:text-white tracking-tight mb-3">
              Browse all blocks
            </h1>
            <p className="text-gray-500 dark:text-gray-400 text-base leading-relaxed">
              Pre-built product UI sections built with SRIIO components. Copy the code, paste into your project, and ship faster.
            </p>
          </div>

          {/* Search + filter bar */}
          <div className="mt-7 flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1 max-w-lg">
              <Search size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search blocks..."
                value={query}
                onChange={e => setQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-sm text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-accent-500/30 focus:border-accent-400 transition-all"
              />
              {query && (
                <button onClick={() => setQuery('')} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
                  <X size={14} />
                </button>
              )}
            </div>
            <button
              onClick={() => setShowFilters(f => !f)}
              className={clsx(
                'flex items-center gap-2 px-4 py-2.5 rounded-xl border text-sm font-medium transition-all',
                showFilters || activeTags.length > 0
                  ? 'bg-accent-50 dark:bg-accent-500/10 border-accent-200 dark:border-accent-700 text-accent-600 dark:text-accent-400'
                  : 'bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-400 hover:border-gray-300 dark:hover:border-gray-600'
              )}
            >
              <SlidersHorizontal size={14} />
              Filters
              {activeTags.length > 0 && (
                <span className="ml-0.5 px-1.5 py-0.5 rounded-full bg-accent-500 text-white text-[10px] font-bold">{activeTags.length}</span>
              )}
            </button>
          </div>

          {/* Tag filters */}
          {showFilters && (
            <div className="mt-4 flex flex-wrap gap-2">
              {allTags.map(tag => (
                <button
                  key={tag}
                  onClick={() => toggleTag(tag)}
                  className={clsx(
                    'px-3 py-1 rounded-lg text-xs font-mono transition-all border',
                    activeTags.includes(tag)
                      ? 'bg-accent-500 text-white border-accent-500'
                      : 'bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-400 border-gray-200 dark:border-gray-700 hover:border-accent-300 dark:hover:border-accent-700'
                  )}
                >
                  {tag}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex gap-8">
          {/* Sidebar */}
          <Sidebar
            activeCategory={activeCategory}
            onSelect={setActiveCategory}
            counts={counts}
          />

          {/* Main grid */}
          <div className="flex-1 min-w-0">
            {/* Results info */}
            <div className="flex items-center justify-between mb-6">
              <p className="text-sm text-gray-500 dark:text-gray-400">
                <span className="font-semibold text-gray-900 dark:text-white">{filtered.length}</span>{' '}
                {filtered.length === 1 ? 'block' : 'blocks'}
                {activeCategory !== 'all' && (
                  <> in <span className="text-accent-500 font-semibold capitalize">{activeCategory}</span></>
                )}
                {query && <> matching <span className="text-accent-500 font-semibold">"{query}"</span></>}
              </p>

              {(activeTags.length > 0 || query) && (
                <button
                  onClick={() => { setActiveTags([]); setQuery('') }}
                  className="text-xs text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 flex items-center gap-1"
                >
                  <X size={12} /> Clear filters
                </button>
              )}
            </div>

            {filtered.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-24 text-center">
                <div className="w-16 h-16 rounded-2xl bg-gray-100 dark:bg-gray-800 flex items-center justify-center mb-4">
                  <Search size={24} className="text-gray-400" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">No blocks found</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 max-w-xs">
                  Try adjusting your search or filter to find what you're looking for.
                </p>
                <button
                  onClick={() => { setQuery(''); setActiveCategory('all'); setActiveTags([]) }}
                  className="mt-4 px-4 py-2 rounded-lg bg-accent-500 hover:bg-accent-600 text-white text-sm font-semibold transition-colors"
                >
                  Clear all filters
                </button>
              </div>
            ) : (
              <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-5">
                {filtered.map(block => (
                  <BlockCard key={block.id} block={block} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
