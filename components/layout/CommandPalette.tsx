'use client'
import { useState, useEffect, useRef } from 'react'
import { Search, ArrowRight, Package, Layout, Hash } from 'lucide-react'
import { components, blocks } from '@/lib/data'
import clsx from 'clsx'

export function CommandPalette() {
  const [open, setOpen]     = useState(false)
  const [query, setQuery]   = useState('')
  const [active, setActive] = useState(0)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    const handler = (e: Event) => { setOpen(true); setQuery('') }
    const keydown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') { e.preventDefault(); setOpen(o => !o); setQuery('') }
      if (e.key === 'Escape') setOpen(false)
    }
    window.addEventListener('open-command-palette', handler)
    window.addEventListener('keydown', keydown)
    return () => { window.removeEventListener('open-command-palette', handler); window.removeEventListener('keydown', keydown) }
  }, [])

  useEffect(() => { if (open) setTimeout(() => inputRef.current?.focus(), 50) }, [open])
  useEffect(() => setActive(0), [query])

  const q = query.toLowerCase()
  const matchedComponents = q ? components.filter(c => c.title.toLowerCase().includes(q) || c.tags.some(t => t.includes(q))).slice(0, 5) : components.slice(0, 4)
  const matchedBlocks     = q ? blocks.filter(b => b.title.toLowerCase().includes(q) || b.tags.some(t => t.includes(q))).slice(0, 4) : blocks.slice(0, 3)
  const allResults = [...matchedComponents.map(c => ({ ...c, type: 'component' as const })), ...matchedBlocks.map(b => ({ ...b, type: 'block' as const }))]

  if (!open) return null

  return (
    <div className="fixed inset-0 z-[100] flex items-start justify-center pt-[12vh] px-4">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/50 dark:bg-black/70 backdrop-blur-sm cmd-backdrop" onClick={() => setOpen(false)} />

      {/* Panel */}
      <div className="relative w-full max-w-xl bg-white dark:bg-gray-900 rounded-2xl shadow-card-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
        {/* Search input */}
        <div className="flex items-center gap-3 px-5 py-4 border-b border-gray-200 dark:border-gray-700">
          <Search size={18} className="text-gray-400 flex-shrink-0" />
          <input
            ref={inputRef}
            value={query}
            onChange={e => setQuery(e.target.value)}
            placeholder="Search components, blocks…"
            className="flex-1 bg-transparent text-gray-900 dark:text-white placeholder-gray-400 text-sm outline-none"
          />
          <kbd className="px-2 py-1 rounded bg-gray-100 dark:bg-gray-800 text-xs text-gray-500 font-mono">ESC</kbd>
        </div>

        {/* Results */}
        <div className="max-h-[60vh] overflow-y-auto p-2">
          {allResults.length === 0 && (
            <div className="py-12 text-center text-sm text-gray-400">No results for "{query}"</div>
          )}

          {matchedComponents.length > 0 && (
            <div>
              <div className="flex items-center gap-2 px-3 pt-3 pb-1.5">
                <Package size={11} className="text-gray-400" />
                <span className="text-[10px] font-semibold uppercase tracking-widest text-gray-400">Components</span>
              </div>
              {matchedComponents.map((c, i) => (
                <button
                  key={c.id}
                  className={clsx('w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-left transition-colors', i === active ? 'bg-accent-50 dark:bg-accent-500/10' : 'hover:bg-gray-100 dark:hover:bg-gray-800')}
                  onClick={() => setOpen(false)}
                >
                  <div className="w-7 h-7 rounded-lg bg-accent-100 dark:bg-accent-500/20 flex items-center justify-center text-accent-500 flex-shrink-0">
                    <Package size={13} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-medium text-gray-900 dark:text-white">{c.title}</div>
                    <div className="text-xs text-gray-500 truncate">{c.category}</div>
                  </div>
                  <ArrowRight size={13} className="text-gray-400 flex-shrink-0" />
                </button>
              ))}
            </div>
          )}

          {matchedBlocks.length > 0 && (
            <div>
              <div className="flex items-center gap-2 px-3 pt-3 pb-1.5">
                <Layout size={11} className="text-gray-400" />
                <span className="text-[10px] font-semibold uppercase tracking-widest text-gray-400">Blocks</span>
              </div>
              {matchedBlocks.map((b, i) => (
                <button
                  key={b.id}
                  className={clsx('w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-left transition-colors', matchedComponents.length + i === active ? 'bg-accent-50 dark:bg-accent-500/10' : 'hover:bg-gray-100 dark:hover:bg-gray-800')}
                  onClick={() => setOpen(false)}
                >
                  <div className="w-7 h-7 rounded-lg bg-emerald-100 dark:bg-emerald-500/20 flex items-center justify-center text-emerald-600 dark:text-emerald-400 flex-shrink-0">
                    <Layout size={13} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-medium text-gray-900 dark:text-white">{b.title}</div>
                    <div className="text-xs text-gray-500 capitalize">{b.category}</div>
                  </div>
                  <ArrowRight size={13} className="text-gray-400 flex-shrink-0" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between px-5 py-3 border-t border-gray-100 dark:border-gray-800 bg-gray-50/50 dark:bg-gray-900/50">
          <div className="flex items-center gap-4 text-[11px] text-gray-400">
            <span className="flex items-center gap-1"><kbd className="font-mono bg-gray-200 dark:bg-gray-700 px-1 rounded text-[10px]">↑↓</kbd> navigate</span>
            <span className="flex items-center gap-1"><kbd className="font-mono bg-gray-200 dark:bg-gray-700 px-1 rounded text-[10px]">↵</kbd> select</span>
          </div>
          <span className="text-[11px] text-gray-400">{allResults.length} results</span>
        </div>
      </div>
    </div>
  )
}
