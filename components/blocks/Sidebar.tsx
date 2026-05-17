'use client'
import { categories } from '@/lib/data'
import clsx from 'clsx'

interface SidebarProps {
  activeCategory: string
  onSelect: (id: string) => void
  counts: Record<string, number>
}

export function Sidebar({ activeCategory, onSelect, counts }: SidebarProps) {
  return (
    <aside className="w-64 flex-shrink-0 hidden lg:block">
      <div className="sticky top-20 bg-white dark:bg-gray-950 rounded-2xl border border-gray-200 dark:border-gray-800 overflow-hidden shadow-card">
        <div className="px-4 py-3 border-b border-gray-100 dark:border-gray-800">
          <h3 className="text-xs font-semibold uppercase tracking-widest text-gray-400 dark:text-gray-500">Categories</h3>
        </div>
        <nav className="p-2 sidebar-scroll max-h-[calc(100vh-8rem)] overflow-y-auto">
          {categories.map(cat => {
            const count = cat.id === 'all' ? counts.all : (counts[cat.id] ?? 0)
            const isActive = activeCategory === cat.id
            return (
              <button
                key={cat.id}
                onClick={() => onSelect(cat.id)}
                className={clsx(
                  'w-full flex items-center justify-between gap-3 px-3 py-2.5 rounded-xl text-left transition-all duration-150 mb-0.5',
                  isActive
                    ? 'bg-accent-50 dark:bg-accent-500/10 text-accent-600 dark:text-accent-400'
                    : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-white'
                )}
              >
                <div className="flex items-center gap-2.5 min-w-0">
                  <span className={clsx('text-base flex-shrink-0 transition-colors', isActive ? 'text-accent-500' : 'text-gray-400 dark:text-gray-600')}>
                    {cat.icon}
                  </span>
                  <span className="text-sm font-medium truncate">{cat.label}</span>
                </div>
                {count > 0 && (
                  <span className={clsx(
                    'flex-shrink-0 text-[10px] font-semibold px-1.5 py-0.5 rounded-md min-w-[20px] text-center',
                    isActive
                      ? 'bg-accent-100 dark:bg-accent-500/20 text-accent-600 dark:text-accent-400'
                      : 'bg-gray-100 dark:bg-gray-800 text-gray-400 dark:text-gray-500'
                  )}>
                    {count}
                  </span>
                )}
              </button>
            )
          })}
        </nav>
      </div>
    </aside>
  )
}
