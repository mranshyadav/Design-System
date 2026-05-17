'use client'
import { useState, useMemo } from 'react'
import { blocks, categories } from '@/lib/data'
import { BlocksHero } from '@/components/blocks/BlocksHero'
import { SearchFilters } from '@/components/blocks/SearchFilters'
import { BlockCard } from '@/components/blocks/BlockCard'
import { Sidebar } from '@/components/blocks/Sidebar'
import { Grid3x3, LayoutGrid } from 'lucide-react'
import clsx from 'clsx'
import Link from 'next/link'
import { Eye, ArrowRight } from 'lucide-react'
import type { Block } from '@/lib/data'

function BlockListRow({ block }: { block: Block }) {
  return (
    <div className="group flex items-center gap-4 p-4 rounded-2xl bg-white dark:bg-gray-900 border border-gray-200/80 dark:border-gray-800 hover:border-accent-300 dark:hover:border-accent-700/60 hover:shadow-md transition-all duration-200">
      {/* Category color strip */}
      <div className="flex-shrink-0 w-1.5 h-12 rounded-full bg-accent-500/60" />

      {/* Info */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-0.5">
          <h3 className="text-sm font-bold text-gray-900 dark:text-white group-hover:text-accent-600 dark:group-hover:text-accent-400 transition-colors">{block.title}</h3>
          {block.isNew && <span className="px-1.5 py-0.5 rounded-full bg-accent-500 text-white text-[8px] font-bold uppercase">New</span>}
          {block.isPro && <span className="px-1.5 py-0.5 rounded-full bg-amber-500 text-white text-[8px] font-bold uppercase">Pro</span>}
        </div>
        <p className="text-xs text-gray-500 dark:text-gray-400 truncate">{block.description}</p>
      </div>

      {/* Tags */}
      <div className="hidden md:flex items-center gap-1.5 flex-shrink-0">
        {block.tags.slice(0, 2).map(tag => (
          <span key={tag} className="px-2 py-0.5 rounded-md bg-gray-100 dark:bg-gray-800 text-[10px] font-mono text-gray-400">{tag}</span>
        ))}
      </div>

      {/* Actions */}
      <div className="flex items-center gap-2 flex-shrink-0 opacity-0 group-hover:opacity-100 transition-opacity">
        <Link href={`/blocks/${block.id}`} className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 text-xs font-semibold hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors">
          <Eye size={12} /> Preview
        </Link>
        <ArrowRight size={14} className="text-gray-400 group-hover:text-accent-500 transition-colors" />
      </div>
    </div>
  )
}

export default function BlocksPage() {
  const [activeCategory, setActiveCategory] = useState('all')
  const [query, setQuery] = useState('')
  const [sortBy, setSortBy] = useState('newest')
  const [activeTags, setActiveTags] = useState<string[]>([])
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')

  const allTags = useMemo(() => {
    const tags = new Set<string>()
    blocks.forEach(b => b.tags.forEach(t => tags.add(t)))
    return Array.from(tags).sort()
  }, [])

  const counts = useMemo(() => {
    const c: Record<string, number> = { all: blocks.length }
    blocks.forEach(b => { c[b.category] = (c[b.category] ?? 0) + 1 })
    return c
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
    if (sortBy === 'az') {
      result = [...result].sort((a, b) => a.title.localeCompare(b.title))
    } else if (sortBy === 'popular') {
      result = [...result].sort((a, b) => (b.componentCount ?? 0) - (a.componentCount ?? 0))
    }
    return result
  }, [activeCategory, query, activeTags, sortBy])

  const toggleTag = (tag: string) => {
    setActiveTags(prev => prev.includes(tag) ? prev.filter(t => t !== tag) : [...prev, tag])
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
      <BlocksHero />

      {/* Main content */}
      <div id="blocks" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">

        {/* Search + filter */}
        <div className="mb-8">
          <SearchFilters
            query={query}
            onQueryChange={setQuery}
            activeCategory={activeCategory}
            onCategoryChange={setActiveCategory}
            sortBy={sortBy}
            onSortChange={setSortBy}
            activeTags={activeTags}
            onTagToggle={toggleTag}
            resultCount={filtered.length}
            allTags={allTags}
          />
        </div>

        {/* Content area */}
        <div className="flex gap-8">

          {/* Sidebar */}
          <div className="hidden lg:block">
            <Sidebar
              activeCategory={activeCategory}
              onSelect={setActiveCategory}
              counts={counts}
            />
          </div>

          {/* Grid */}
          <div className="flex-1 min-w-0">

            {/* Top bar: view toggle */}
            <div className="flex items-center justify-between mb-5">
              <p className="text-sm text-gray-500 dark:text-gray-400">
                <span className="font-semibold text-gray-900 dark:text-white">{filtered.length}</span> blocks
              </p>
              <div className="flex items-center gap-1 p-1 rounded-lg bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-sm">
                <button
                  onClick={() => setViewMode('grid')}
                  className={clsx('p-1.5 rounded-md transition-all', viewMode === 'grid' ? 'bg-accent-500 text-white shadow-sm' : 'text-gray-400 hover:text-gray-600 dark:hover:text-gray-300')}
                >
                  <Grid3x3 size={14} />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={clsx('p-1.5 rounded-md transition-all', viewMode === 'list' ? 'bg-accent-500 text-white shadow-sm' : 'text-gray-400 hover:text-gray-600 dark:hover:text-gray-300')}
                >
                  <LayoutGrid size={14} />
                </button>
              </div>
            </div>

            {/* Empty state */}
            {filtered.length === 0 && (
              <div className="flex flex-col items-center justify-center py-24 text-center">
                <div className="w-16 h-16 rounded-2xl bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 flex items-center justify-center mb-4 text-2xl">⊘</div>
                <h3 className="text-base font-semibold text-gray-900 dark:text-white mb-1">No blocks found</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 max-w-xs mb-5">Try adjusting your search or selecting a different category.</p>
                <button
                  onClick={() => { setQuery(''); setActiveCategory('all'); setActiveTags([]) }}
                  className="px-5 py-2.5 rounded-xl bg-accent-500 hover:bg-accent-600 text-white text-sm font-semibold transition-colors shadow-sm"
                >
                  Reset filters
                </button>
              </div>
            )}

            {/* Blocks grid - when viewMode === 'grid' */}
            {filtered.length > 0 && viewMode === 'grid' && (
              <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-5">
                {filtered.map(block => (
                  <BlockCard key={block.id} block={block} />
                ))}
              </div>
            )}

            {/* Blocks list - when viewMode === 'list' */}
            {filtered.length > 0 && viewMode === 'list' && (
              <div className="flex flex-col gap-3">
                {filtered.map(block => (
                  <BlockListRow key={block.id} block={block} />
                ))}
              </div>
            )}

          </div>
        </div>
      </div>
    </div>
  )
}
