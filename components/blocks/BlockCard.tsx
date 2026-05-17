'use client'
import Link from 'next/link'
import { useState } from 'react'
import { Eye, Copy, Check, Bookmark, BookmarkCheck, ExternalLink } from 'lucide-react'
import type { Block } from '@/lib/data'
import { PreviewMockup } from './PreviewMockup'
import clsx from 'clsx'

const categoryColors: Record<string, { bg: string; text: string; darkBg: string; darkText: string }> = {
  hero:           { bg: 'bg-blue-50',    text: 'text-blue-600',    darkBg: 'dark:bg-blue-500/10',   darkText: 'dark:text-blue-400' },
  dashboard:      { bg: 'bg-emerald-50', text: 'text-emerald-600', darkBg: 'dark:bg-emerald-500/10', darkText: 'dark:text-emerald-400' },
  tables:         { bg: 'bg-slate-50',   text: 'text-slate-600',   darkBg: 'dark:bg-slate-500/10',  darkText: 'dark:text-slate-400' },
  forms:          { bg: 'bg-violet-50',  text: 'text-violet-600',  darkBg: 'dark:bg-violet-500/10', darkText: 'dark:text-violet-400' },
  authentication: { bg: 'bg-indigo-50',  text: 'text-indigo-600',  darkBg: 'dark:bg-indigo-500/10', darkText: 'dark:text-indigo-400' },
  navigation:     { bg: 'bg-cyan-50',    text: 'text-cyan-600',    darkBg: 'dark:bg-cyan-500/10',   darkText: 'dark:text-cyan-400' },
  pricing:        { bg: 'bg-amber-50',   text: 'text-amber-600',   darkBg: 'dark:bg-amber-500/10',  darkText: 'dark:text-amber-400' },
  cards:          { bg: 'bg-pink-50',    text: 'text-pink-600',    darkBg: 'dark:bg-pink-500/10',   darkText: 'dark:text-pink-400' },
  marketing:      { bg: 'bg-orange-50',  text: 'text-orange-600',  darkBg: 'dark:bg-orange-500/10', darkText: 'dark:text-orange-400' },
  settings:       { bg: 'bg-teal-50',    text: 'text-teal-600',    darkBg: 'dark:bg-teal-500/10',   darkText: 'dark:text-teal-400' },
  ecommerce:      { bg: 'bg-rose-50',    text: 'text-rose-600',    darkBg: 'dark:bg-rose-500/10',   darkText: 'dark:text-rose-400' },
  footers:        { bg: 'bg-gray-100',   text: 'text-gray-600',    darkBg: 'dark:bg-gray-500/10',   darkText: 'dark:text-gray-400' },
  modals:         { bg: 'bg-indigo-50',  text: 'text-indigo-600',  darkBg: 'dark:bg-indigo-500/10', darkText: 'dark:text-indigo-400' },
}

export function BlockCard({ block }: { block: Block }) {
  const [copied, setCopied] = useState(false)
  const [bookmarked, setBookmarked] = useState(false)

  const handleCopy = () => {
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const colors = categoryColors[block.category] ?? { bg: 'bg-gray-50', text: 'text-gray-600', darkBg: 'dark:bg-gray-500/10', darkText: 'dark:text-gray-400' }

  return (
    <div className="group relative flex flex-col rounded-2xl bg-white dark:bg-gray-900 border border-gray-200/80 dark:border-gray-800 shadow-sm hover:shadow-xl hover:shadow-accent-500/5 hover:border-accent-300 dark:hover:border-accent-700/60 transition-all duration-300 hover:-translate-y-1.5 overflow-hidden cursor-pointer">

      {/* Top badges */}
      <div className="absolute top-3 left-3 flex gap-1.5 z-10">
        {block.isNew && (
          <span className="px-2 py-0.5 rounded-full bg-accent-500 text-white text-[9px] font-bold uppercase tracking-wider shadow-sm">New</span>
        )}
        {block.isPro && (
          <span className="px-2 py-0.5 rounded-full bg-gradient-to-r from-amber-400 to-orange-500 text-white text-[9px] font-bold uppercase tracking-wider shadow-sm">Pro</span>
        )}
      </div>

      {/* Bookmark button */}
      <button
        onClick={() => setBookmarked(b => !b)}
        className="absolute top-3 right-3 z-10 w-7 h-7 rounded-lg bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm border border-gray-200 dark:border-gray-700 flex items-center justify-center shadow-sm hover:border-accent-300 dark:hover:border-accent-600 transition-all opacity-0 group-hover:opacity-100"
      >
        {bookmarked
          ? <BookmarkCheck size={13} className="text-accent-500" />
          : <Bookmark size={13} className="text-gray-400" />}
      </button>

      {/* Preview area */}
      <div className="relative h-52 bg-gray-50 dark:bg-gray-800/60 overflow-hidden">
        <PreviewMockup category={block.category} />

        {/* Hover overlay */}
        <div className="absolute inset-0 flex items-center justify-center gap-2.5 opacity-0 group-hover:opacity-100 transition-all duration-200 bg-gradient-to-b from-black/5 via-black/20 to-black/30 dark:from-black/20 dark:via-black/40 dark:to-black/50 backdrop-blur-[1px]">
          <Link
            href={`/blocks/${block.id}`}
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-600 text-gray-800 dark:text-gray-100 text-xs font-semibold shadow-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
          >
            <Eye size={13} /> Preview
          </Link>
          <button
            onClick={handleCopy}
            className={clsx(
              'flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold shadow-lg transition-all',
              copied
                ? 'bg-emerald-500 text-white'
                : 'bg-accent-500 hover:bg-accent-600 text-white'
            )}
          >
            {copied ? <><Check size={13} /> Copied!</> : <><Copy size={13} /> Copy code</>}
          </button>
        </div>
      </div>

      {/* Card body */}
      <div className="flex flex-col flex-1 p-4 gap-3">

        {/* Category + count row */}
        <div className="flex items-start justify-between gap-2">
          <span className={clsx('px-2 py-0.5 rounded-md text-[10px] font-semibold capitalize', colors.bg, colors.text, colors.darkBg, colors.darkText)}>
            {block.category}
          </span>
          {block.componentCount && (
            <span className="flex-shrink-0 text-[10px] font-mono text-gray-400 dark:text-gray-500 bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 rounded-md">
              {block.componentCount} blocks
            </span>
          )}
        </div>

        {/* Title */}
        <h3 className="text-sm font-bold text-gray-900 dark:text-white leading-snug group-hover:text-accent-600 dark:group-hover:text-accent-400 transition-colors -mt-1">
          {block.title}
        </h3>

        {/* Description */}
        <p className="text-[11px] text-gray-500 dark:text-gray-400 leading-relaxed line-clamp-2">
          {block.description}
        </p>

        {/* Tags + view link */}
        <div className="flex items-center justify-between gap-2 mt-auto pt-1">
          <div className="flex flex-wrap gap-1">
            {block.tags.slice(0, 2).map(tag => (
              <span key={tag} className="px-1.5 py-0.5 rounded-md bg-gray-100 dark:bg-gray-800 text-[9px] font-mono text-gray-400 dark:text-gray-500">
                {tag}
              </span>
            ))}
          </div>
          <Link
            href={`/blocks/${block.id}`}
            className="flex items-center gap-1 text-[10px] font-semibold text-accent-500 hover:text-accent-600 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap flex-shrink-0"
          >
            View <ExternalLink size={9} />
          </Link>
        </div>
      </div>
    </div>
  )
}
