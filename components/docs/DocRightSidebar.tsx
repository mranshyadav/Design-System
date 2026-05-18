'use client'
import { motion } from 'framer-motion'
import { ExternalLink, Edit3, AlertCircle } from 'lucide-react'
import clsx from 'clsx'

interface TocItem {
  id: string
  label: string
}

interface DocRightSidebarProps {
  items: TocItem[]
  activeId: string
  onNavigate: (id: string) => void
}

const extraItems = [
  { id: 'props-api', label: 'Props API' },
  { id: 'accessibility', label: 'Accessibility' },
  { id: 'changelog', label: 'Changelog' },
]

export function DocRightSidebar({ items, activeId, onNavigate }: DocRightSidebarProps) {
  return (
    <aside className="hidden xl:flex w-[260px] h-full flex-shrink-0 border-x border-gray-200 dark:border-gray-800 flex-col bg-white dark:bg-gray-950">
      <div className="flex-1 overflow-y-auto scrollbar-hide py-6 px-5">
        {/* Header */}
        <p className="text-[10px] font-semibold uppercase tracking-widest text-gray-400 mb-3">
          On This Page
        </p>

        {/* Variant TOC */}
        <nav className="space-y-0.5 relative">
          {items.map(item => {
            const isActive = activeId === item.id
            return (
              <button
                key={item.id}
                onClick={() => onNavigate(item.id)}
                className={clsx(
                  'relative w-full flex items-center gap-2.5 px-2.5 py-1.5 rounded-lg text-sm text-left transition-colors',
                  isActive
                    ? 'text-accent-600 dark:text-accent-400 font-medium'
                    : 'text-gray-500 dark:text-gray-500 hover:text-gray-800 dark:hover:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
                )}
              >
                {isActive && (
                  <motion.div
                    layoutId="toc-indicator"
                    className="absolute inset-0 rounded-lg bg-accent-50 dark:bg-accent-500/10"
                    transition={{ type: 'spring', stiffness: 400, damping: 35 }}
                  />
                )}
                <span className={clsx(
                  'relative w-1.5 h-1.5 rounded-full flex-shrink-0 transition-colors',
                  isActive ? 'bg-accent-500' : 'bg-gray-300 dark:bg-gray-600'
                )} />
                <span className="relative truncate">{item.label}</span>
              </button>
            )
          })}
        </nav>

        {/* Divider */}
        {items.length > 0 && (
          <div className="my-3 border-t border-gray-100 dark:border-gray-800" />
        )}

        {/* Static extra items */}
        <div className="space-y-0.5">
          {extraItems.map(item => (
            <button
              key={item.id}
              className="w-full flex items-center gap-2.5 px-2.5 py-1.5 rounded-lg text-sm text-left text-gray-500 dark:text-gray-500 hover:text-gray-800 dark:hover:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-gray-200 dark:bg-gray-700 flex-shrink-0" />
              <span className="truncate">{item.label}</span>
            </button>
          ))}
        </div>

        {/* Divider */}
        <div className="my-4 border-t border-gray-100 dark:border-gray-800" />

        {/* Footer links */}
        <div className="space-y-1">
          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-2.5 py-1.5 rounded-lg text-xs text-gray-500 dark:text-gray-500 hover:text-gray-800 dark:hover:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors group"
          >
            <Edit3 size={11} className="flex-shrink-0" />
            <span>Edit this page</span>
            <ExternalLink size={9} className="ml-auto opacity-0 group-hover:opacity-60 transition-opacity" />
          </a>
          <a
            href="https://github.com/issues/new"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-2.5 py-1.5 rounded-lg text-xs text-gray-500 dark:text-gray-500 hover:text-gray-800 dark:hover:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors group"
          >
            <AlertCircle size={11} className="flex-shrink-0" />
            <span>Report an issue</span>
            <ExternalLink size={9} className="ml-auto opacity-0 group-hover:opacity-60 transition-opacity" />
          </a>
        </div>
      </div>
    </aside>
  )
}
