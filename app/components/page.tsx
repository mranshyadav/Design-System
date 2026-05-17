'use client'
import { useState, useMemo } from 'react'
import Link from 'next/link'
import { Search, X, ArrowRight } from 'lucide-react'
import { components, componentCategories } from '@/lib/data'
import clsx from 'clsx'

function MiniPreview({ id }: { id: string }) {
  const previews: Record<string, React.ReactNode> = {
    badge: (
      <div className="flex flex-wrap gap-1.5 p-2 justify-center">
        {[['bg-emerald-100 text-emerald-700','Active'],['bg-amber-100 text-amber-700','Pending'],['bg-red-100 text-red-700','Failed'],['bg-blue-100 text-blue-600','Draft']].map(([cls, label]) => (
          <span key={label} className={`px-2 py-0.5 rounded-full text-[9px] font-semibold ${cls}`}>{label}</span>
        ))}
      </div>
    ),
    button: (
      <div className="flex gap-1.5 flex-wrap justify-center p-2">
        <span className="px-3 py-1.5 rounded-lg bg-accent-500 text-white text-[9px] font-semibold">Primary</span>
        <span className="px-3 py-1.5 rounded-lg border border-gray-200 dark:border-gray-600 text-gray-700 dark:text-gray-300 text-[9px] font-semibold">Secondary</span>
        <span className="px-3 py-1.5 rounded-lg bg-red-500 text-white text-[9px] font-semibold">Danger</span>
      </div>
    ),
    input: (
      <div className="flex flex-col gap-1.5 p-3 w-full max-w-[160px]">
        <div className="text-[8px] text-gray-500 font-medium">Label</div>
        <div className="px-2 py-1.5 rounded-lg border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-900 text-[9px] text-gray-400">Placeholder text</div>
        <div className="text-[8px] text-gray-400">Helper text</div>
      </div>
    ),
    alert: (
      <div className="flex flex-col gap-1 p-2 w-full max-w-[180px]">
        {[['bg-blue-50 border-blue-200 text-blue-700','ℹ Info'],['bg-emerald-50 border-emerald-200 text-emerald-700','✓ Success'],['bg-red-50 border-red-200 text-red-700','⚠ Error']].map(([cls, label]) => (
          <div key={label} className={`px-2 py-1.5 rounded-lg border text-[8px] font-medium ${cls}`}>{label}</div>
        ))}
      </div>
    ),
    modal: (
      <div className="relative w-full h-full flex items-center justify-center">
        <div className="absolute inset-0 bg-black/20 rounded-xl" />
        <div className="relative bg-white dark:bg-gray-800 rounded-xl shadow-lg p-3 w-32 z-10">
          <div className="text-[9px] font-semibold text-gray-800 dark:text-white mb-1">Confirm action?</div>
          <div className="text-[8px] text-gray-500 mb-2">This cannot be undone.</div>
          <div className="flex gap-1">
            <span className="flex-1 text-center px-1 py-1 rounded bg-gray-100 dark:bg-gray-700 text-[8px] text-gray-600 dark:text-gray-300">Cancel</span>
            <span className="flex-1 text-center px-1 py-1 rounded bg-accent-500 text-white text-[8px]">Confirm</span>
          </div>
        </div>
      </div>
    ),
    table: (
      <div className="w-full p-1.5">
        <div className="w-full rounded-lg overflow-hidden border border-gray-200 dark:border-gray-700">
          <div className="flex items-center gap-2 px-2 py-1.5 bg-gray-50 dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
            {['Name','Status','Value'].map(h => <span key={h} className="text-[8px] font-semibold text-gray-500 flex-1">{h}</span>)}
          </div>
          {[['Item one','Active','$120'],['Item two','Pending','$84'],['Item three','Done','$210']].map(([name, status, val]) => (
            <div key={name} className="flex items-center gap-2 px-2 py-1.5 border-t border-gray-100 dark:border-gray-700/50">
              <span className="text-[8px] font-mono text-gray-700 dark:text-gray-300 flex-1 truncate">{name}</span>
              <span className="text-[7px] px-1 py-0.5 rounded-full bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400">{status}</span>
              <span className="text-[8px] text-gray-500 font-mono flex-1 text-right">{val}</span>
            </div>
          ))}
        </div>
      </div>
    ),
  }

  return (
    <div className="w-full h-full flex items-center justify-center">
      {previews[id] || (
        <div className="text-2xl text-gray-300 dark:text-gray-600">
          {['◈','◇','▦','≡','⊟','◉','▷','⊙'][Math.abs(id.charCodeAt(0) % 8)]}
        </div>
      )}
    </div>
  )
}

export default function ComponentsPage() {
  const [query, setQuery] = useState('')
  const [activeCategory, setActiveCategory] = useState('All')

  const filtered = useMemo(() => {
    let result = components
    if (activeCategory !== 'All') result = result.filter(c => c.category === activeCategory)
    if (query.trim()) {
      const q = query.toLowerCase()
      result = result.filter(c =>
        c.title.toLowerCase().includes(q) ||
        c.description.toLowerCase().includes(q) ||
        c.category.toLowerCase().includes(q)
      )
    }
    return result
  }, [query, activeCategory])

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
      {/* Header */}
      <div className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 lg:py-14">
          <div className="max-w-2xl mb-8">
            <p className="text-xs font-semibold uppercase tracking-widest text-accent-500 mb-2">Components</p>
            <h1 className="text-3xl lg:text-4xl font-extrabold text-gray-900 dark:text-white tracking-tight mb-3">
              Component library
            </h1>
            <p className="text-gray-500 dark:text-gray-400 text-base leading-relaxed">
              27 production-ready components built with React and Tailwind CSS. MIT licensed, no dependencies.
            </p>
          </div>

          {/* Search */}
          <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
            <div className="relative flex-1 max-w-md">
              <Search size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search components..."
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

            {/* Category filters */}
            <div className="flex items-center gap-2 flex-wrap">
              {['All', ...componentCategories.filter(c => c !== 'All')].map(cat => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={clsx(
                    'flex-shrink-0 px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all',
                    activeCategory === cat
                      ? 'bg-accent-500 text-white shadow-sm'
                      : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700'
                  )}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="flex items-center justify-between mb-6">
          <p className="text-sm text-gray-500 dark:text-gray-400">
            <span className="font-semibold text-gray-900 dark:text-white">{filtered.length}</span> components
            {activeCategory !== 'All' && <> in <span className="text-accent-500 font-semibold">{activeCategory}</span></>}
          </p>
        </div>

        {filtered.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-24 text-center">
            <div className="w-16 h-16 rounded-2xl bg-gray-100 dark:bg-gray-800 flex items-center justify-center mb-4">
              <Search size={24} className="text-gray-400" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">No components found</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">Try a different search term.</p>
            <button
              onClick={() => { setQuery(''); setActiveCategory('All') }}
              className="px-4 py-2 rounded-lg bg-accent-500 hover:bg-accent-600 text-white text-sm font-semibold transition-colors"
            >
              Clear search
            </button>
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {filtered.map(component => (
              <Link
                key={component.id}
                href={`/components/${component.id}`}
                className="group flex flex-col p-5 rounded-2xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 hover:border-accent-300 dark:hover:border-accent-700 shadow-card hover:shadow-card-md transition-all duration-200 hover:-translate-y-0.5"
              >
                {/* Mini preview */}
                <div className="w-full h-28 rounded-xl bg-gray-50 dark:bg-gray-800/60 border border-gray-100 dark:border-gray-700/50 mb-4 flex items-center justify-center overflow-hidden">
                  <MiniPreview id={component.id} />
                </div>

                {/* Info */}
                <div className="flex items-start justify-between gap-2 mb-1">
                  <h3 className="text-sm font-semibold text-gray-900 dark:text-white group-hover:text-accent-500 transition-colors">{component.title}</h3>
                  <span className="flex-shrink-0 text-[10px] font-mono bg-gray-100 dark:bg-gray-800 text-gray-500 dark:text-gray-400 px-1.5 py-0.5 rounded">
                    {component.variants}v
                  </span>
                </div>
                <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed mb-3 flex-1">{component.description}</p>

                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono text-gray-400 dark:text-gray-500 capitalize">{component.category}</span>
                  <ArrowRight size={12} className="text-gray-400 group-hover:text-accent-500 transition-colors" />
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
