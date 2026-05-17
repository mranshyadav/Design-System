'use client'
import { useState } from 'react'
import Link from 'next/link'
import { ChevronRight, Search, BookOpen, Package, Palette } from 'lucide-react'
import clsx from 'clsx'
import { components, componentCategories } from '@/lib/data'

interface DocLeftSidebarProps {
  activeId: string
}

const categoryIcons: Record<string, string> = {
  Foundations: '◈',
  Display: '⊞',
  Forms: '⊟',
  Feedback: '◉',
  Overlay: '⊙',
  Navigation: '↗',
  Data: '≡',
  Pickers: '⊕',
}

const gettingStartedLinks = [
  { label: 'Introduction', href: '/docs', icon: BookOpen },
  { label: 'Installation', href: '/docs/installation', icon: Package },
  { label: 'Theming', href: '/docs/theming', icon: Palette },
]

export function DocLeftSidebar({ activeId }: DocLeftSidebarProps) {
  const [query, setQuery] = useState('')
  const [openCategories, setOpenCategories] = useState<Record<string, boolean>>(() => {
    const active = components.find(c => c.id === activeId)
    const initial: Record<string, boolean> = {}
    if (active) initial[active.category] = true
    return initial
  })

  const toggleCategory = (cat: string) => {
    setOpenCategories(prev => ({ ...prev, [cat]: !prev[cat] }))
  }

  const filteredComponents = query.trim()
    ? components.filter(c =>
        c.title.toLowerCase().includes(query.toLowerCase()) ||
        c.tags.some(t => t.toLowerCase().includes(query.toLowerCase()))
      )
    : null

  const categories = componentCategories.filter(c => c !== 'All')

  return (
    <aside className="w-[260px] h-full flex-shrink-0 border-r border-gray-200 dark:border-gray-800 flex flex-col bg-white dark:bg-gray-950">
      {/* Filter input */}
      <div className="px-3 py-3 border-b border-gray-100 dark:border-gray-800/50">
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

        {filteredComponents ? (
          /* Flat filtered list */
          <div className="px-2">
            <p className="px-2 py-1 text-[10px] font-semibold uppercase tracking-widest text-gray-400 mb-1">
              {filteredComponents.length} result{filteredComponents.length !== 1 ? 's' : ''}
            </p>
            {filteredComponents.length === 0 && (
              <p className="px-2 py-4 text-xs text-gray-400 text-center">No components found</p>
            )}
            {filteredComponents.map(c => (
              <Link
                key={c.id}
                href={`/components/${c.id}`}
                onClick={() => setQuery('')}
                className={clsx(
                  'flex items-center justify-between gap-2 px-2.5 py-1.5 rounded-lg text-sm transition-colors group',
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
                  {c.variants}
                </span>
              </Link>
            ))}
          </div>
        ) : (
          <>
            {/* Getting Started section */}
            <div className="px-2 mb-2">
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
            </div>

            {/* Divider */}
            <div className="mx-4 my-2 border-t border-gray-100 dark:border-gray-800" />

            {/* Components section */}
            <div className="px-2">
              <p className="px-2 py-1 text-[10px] font-semibold uppercase tracking-widest text-gray-400 mb-1">
                Components
              </p>

              {categories.map(cat => {
                const catComponents = components.filter(c => c.category === cat)
                const isOpen = openCategories[cat] !== false
                  ? (openCategories[cat] ?? catComponents.some(c => c.id === activeId))
                  : false

                return (
                  <div key={cat} className="mb-0.5">
                    <button
                      onClick={() => toggleCategory(cat)}
                      className="w-full flex items-center gap-2 px-2.5 py-1.5 rounded-lg text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors group"
                    >
                      <span className="text-base leading-none w-4 text-center flex-shrink-0 opacity-60">
                        {categoryIcons[cat]}
                      </span>
                      <span className="flex-1 text-left">{cat}</span>
                      <span className="text-[10px] font-mono text-gray-400">{catComponents.length}</span>
                      <ChevronRight
                        size={13}
                        className={clsx(
                          'flex-shrink-0 text-gray-400 transition-transform duration-200',
                          isOpen && 'rotate-90'
                        )}
                      />
                    </button>

                    {isOpen && (
                      <div className="ml-6 mt-0.5 space-y-0.5">
                        {catComponents.map(c => (
                          <Link
                            key={c.id}
                            href={`/components/${c.id}`}
                            className={clsx(
                              'flex items-center justify-between gap-2 px-2.5 py-1.5 rounded-lg text-sm transition-colors',
                              c.id === activeId
                                ? 'bg-accent-50 dark:bg-accent-500/10 text-accent-600 dark:text-accent-400 font-medium'
                                : 'text-gray-500 dark:text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-gray-800 dark:hover:text-gray-300'
                            )}
                          >
                            <span className="truncate">{c.title}</span>
                            <span className={clsx(
                              'text-[10px] font-mono flex-shrink-0',
                              c.id === activeId ? 'text-accent-400' : 'text-gray-400'
                            )}>
                              {c.variants}
                            </span>
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                )
              })}
            </div>
          </>
        )}
      </div>
    </aside>
  )
}
