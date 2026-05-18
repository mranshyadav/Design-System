'use client'
import { useState } from 'react'
import Link from 'next/link'
import { Search, BookOpen, Package, Palette } from 'lucide-react'
import clsx from 'clsx'
import { components } from '@/lib/data'

interface DocLeftSidebarProps {
  activeId: string
}

const gettingStartedLinks = [
  { label: 'Introduction', href: '/docs', icon: BookOpen },
  { label: 'Installation', href: '/docs/installation', icon: Package },
  { label: 'Theming', href: '/docs/theming', icon: Palette },
]

const sortedComponents = [...components].sort((a, b) => a.title.localeCompare(b.title))

export function DocLeftSidebar({ activeId }: DocLeftSidebarProps) {
  const [query, setQuery] = useState('')

  const filtered = query.trim()
    ? sortedComponents.filter(c =>
        c.title.toLowerCase().includes(query.toLowerCase()) ||
        c.tags.some(t => t.toLowerCase().includes(query.toLowerCase()))
      )
    : sortedComponents

  return (
    <aside className="hidden lg:flex w-[280px] h-full flex-shrink-0 border-r border-gray-200 dark:border-gray-800 flex-col bg-white dark:bg-gray-950">
      {/* Filter input */}
      <div className="px-4 py-3 border-b border-gray-100 dark:border-gray-800/50">
        <div className="relative">
          <Search size={13} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            value={query}
            onChange={e => setQuery(e.target.value)}
            placeholder="Filter components..."
            className="w-full h-7 pl-7 pr-3 rounded-lg bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-xs text-gray-700 dark:text-gray-300 placeholder-gray-400 outline-none focus:ring-1 focus:ring-accent-500 focus:border-accent-400 transition-all"
          />
        </div>
      </div>

      {/* Scrollable content */}
      <div className="flex-1 overflow-y-auto scrollbar-hide py-3">
        <div className="px-3">

          {/* Getting Started */}
          {!query.trim() && (
            <>
              <p className="px-2 py-1 text-[10px] font-semibold uppercase tracking-widest text-gray-400 mb-0.5">
                Getting Started
              </p>
              {gettingStartedLinks.map(link => (
                <Link
                  key={link.label}
                  href={link.href}
                  className="flex items-center gap-2.5 px-2.5 py-1.5 rounded-lg text-sm text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-gray-200 transition-colors"
                >
                  <link.icon size={13} className="flex-shrink-0" />
                  <span>{link.label}</span>
                </Link>
              ))}
              <div className="mx-2 my-3 border-t border-gray-100 dark:border-gray-800" />
              <p className="px-2 py-1 text-[10px] font-semibold uppercase tracking-widest text-gray-400 mb-1">
                Components
              </p>
            </>
          )}

          {/* A–Z component list */}
          {query.trim() && (
            <p className="px-2 py-1 text-[10px] font-semibold uppercase tracking-widest text-gray-400 mb-1">
              {filtered.length} result{filtered.length !== 1 ? 's' : ''}
            </p>
          )}

          {filtered.length === 0 && (
            <p className="px-2 py-4 text-xs text-gray-400 text-center">No components found</p>
          )}

          <div className="space-y-0.5">
            {filtered.map(c => (
              <Link
                key={c.id}
                href={`/components/${c.id}`}
                className={clsx(
                  'flex items-center justify-between gap-2 px-2.5 py-1.5 rounded-lg text-sm transition-colors',
                  c.id === activeId
                    ? 'bg-accent-50 dark:bg-accent-500/10 text-accent-600 dark:text-accent-400 font-medium'
                    : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-gray-200'
                )}
              >
                <span className="truncate">{c.title}</span>
                <span className={clsx(
                  'text-[10px] font-mono flex-shrink-0',
                  c.id === activeId ? 'text-accent-400' : 'text-gray-400'
                )}>
                  {c.variants}v
                </span>
              </Link>
            ))}
          </div>

        </div>
      </div>
    </aside>
  )
}
