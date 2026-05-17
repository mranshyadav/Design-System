'use client'
import Link from 'next/link'
import { useState } from 'react'
import { Eye, Copy, Check, Bookmark, BookmarkCheck } from 'lucide-react'
import type { Block } from '@/lib/data'
import clsx from 'clsx'

function Thumbnail({ category }: { category: string }) {
  const palettes: Record<string, string[]> = {
    hero:           ['from-accent-500/8 to-blue-400/8', '#1F3FE0', '#60A5FA'],
    dashboard:      ['from-emerald-500/8 to-teal-400/8', '#10B981', '#34D399'],
    tables:         ['from-gray-500/8 to-slate-400/8', '#6B7280', '#9CA3AF'],
    forms:          ['from-violet-500/8 to-purple-400/8', '#8B5CF6', '#A78BFA'],
    authentication: ['from-accent-500/8 to-indigo-400/8', '#1F3FE0', '#818CF8'],
    navigation:     ['from-cyan-500/8 to-sky-400/8', '#06B6D4', '#38BDF8'],
    pricing:        ['from-amber-500/8 to-yellow-400/8', '#F59E0B', '#FCD34D'],
    cards:          ['from-pink-500/8 to-rose-400/8', '#EC4899', '#FB7185'],
    marketing:      ['from-orange-500/8 to-red-400/8', '#F97316', '#FB923C'],
    settings:       ['from-teal-500/8 to-emerald-400/8', '#14B8A6', '#34D399'],
    ecommerce:      ['from-rose-500/8 to-pink-400/8', '#F43F5E', '#FB7185'],
    footers:        ['from-slate-500/8 to-gray-400/8', '#64748B', '#94A3B8'],
    modals:         ['from-indigo-500/8 to-violet-400/8', '#6366F1', '#8B5CF6'],
  }
  const [grad = 'from-gray-500/8 to-slate-400/8', primary = '#6B7280', secondary = '#9CA3AF'] = palettes[category] ?? []

  return (
    <div className={clsx('w-full h-full bg-gradient-to-br', grad, 'flex items-center justify-center relative overflow-hidden')}>
      {/* Abstract mini UI */}
      <div className="w-[85%] h-[75%] rounded-xl bg-white dark:bg-gray-900 shadow-sm border border-white/60 dark:border-gray-700/60 overflow-hidden">
        {/* Top bar */}
        <div className="flex items-center gap-1.5 px-3 py-2 border-b border-gray-100 dark:border-gray-800" style={{ background: `${primary}18` }}>
          <div className="flex gap-1">
            {[1,2,3].map(i => <div key={i} className="w-1.5 h-1.5 rounded-full bg-gray-200 dark:bg-gray-700" />)}
          </div>
          <div className="flex-1 h-1.5 rounded-full bg-gray-100 dark:bg-gray-800 mx-2" />
          <div className="w-8 h-1.5 rounded-full" style={{ background: `${primary}60` }} />
        </div>

        {/* Content area */}
        <div className="p-3 flex flex-col gap-2">
          {category === 'hero' ? (
            <>
              <div className="h-2 w-2/3 rounded-full" style={{ background: primary }} />
              <div className="h-1.5 w-full rounded-full bg-gray-100 dark:bg-gray-800" />
              <div className="h-1.5 w-4/5 rounded-full bg-gray-100 dark:bg-gray-800" />
              <div className="flex gap-1.5 mt-1">
                <div className="h-4 w-14 rounded-lg" style={{ background: primary }} />
                <div className="h-4 w-14 rounded-lg border border-gray-200 dark:border-gray-600" />
              </div>
            </>
          ) : category === 'dashboard' ? (
            <>
              <div className="grid grid-cols-3 gap-1.5">
                {[primary, secondary, `${primary}80`].map((c, i) => (
                  <div key={i} className="rounded-lg p-1.5 border border-gray-100 dark:border-gray-700" style={{ background: `${c}15` }}>
                    <div className="h-1 rounded-full w-full mb-1" style={{ background: `${c}60` }} />
                    <div className="h-1.5 rounded-full w-2/3" style={{ background: c }} />
                  </div>
                ))}
              </div>
              <div className="flex items-end gap-0.5 h-8 mt-1">
                {[35,60,45,80,55,90,70,85].map((h, i) => (
                  <div key={i} className="flex-1 rounded-sm" style={{ height: `${h}%`, background: `${primary}${Math.round(30 + h * 0.5).toString(16)}` }} />
                ))}
              </div>
            </>
          ) : category === 'tables' ? (
            <div className="rounded-lg overflow-hidden border border-gray-100 dark:border-gray-700">
              <div className="flex gap-2 px-2 py-1 bg-gray-50 dark:bg-gray-800">
                {[40,30,30].map((w, i) => <div key={i} className="h-1 rounded-full bg-gray-200 dark:bg-gray-600" style={{ width: `${w}%` }} />)}
              </div>
              {[1,2,3].map(i => (
                <div key={i} className="flex gap-2 px-2 py-1.5 border-t border-gray-50 dark:border-gray-800">
                  <div className="h-1.5 rounded-full bg-gray-200 dark:bg-gray-700" style={{ width: '40%' }} />
                  <div className="h-1.5 rounded-full" style={{ width: '30%', background: `${primary}60` }} />
                  <div className="h-1.5 rounded-full bg-gray-200 dark:bg-gray-700" style={{ width: '30%' }} />
                </div>
              ))}
            </div>
          ) : (
            <>
              <div className="h-2 rounded-full" style={{ width: '60%', background: primary }} />
              {[1,2,3].map(i => (
                <div key={i} className="h-3 rounded-lg border border-gray-100 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50" />
              ))}
              <div className="flex gap-1.5 mt-0.5">
                <div className="h-4 flex-1 rounded-lg" style={{ background: primary }} />
                <div className="h-4 w-12 rounded-lg border border-gray-200 dark:border-gray-600" />
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  )
}

export function BlockCard({ block }: { block: Block }) {
  const [copied, setCopied]       = useState(false)
  const [bookmarked, setBookmarked] = useState(false)

  const handleCopy = () => {
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="group flex flex-col rounded-2xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 shadow-card hover:shadow-card-md hover:border-accent-200 dark:hover:border-accent-700 transition-all duration-200 hover:-translate-y-0.5 overflow-hidden">
      {/* Thumbnail */}
      <div className="relative h-48 bg-gray-50 dark:bg-gray-800/60 overflow-hidden">
        <Thumbnail category={block.category} />

        {/* Hover action overlay */}
        <div className="absolute inset-0 flex items-center justify-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 bg-black/10 dark:bg-black/30">
          <Link
            href={`/blocks/${block.id}`}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-600 text-gray-700 dark:text-gray-200 text-xs font-semibold shadow-md hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
          >
            <Eye size={13} /> Preview
          </Link>
          <button
            onClick={handleCopy}
            className={clsx(
              'flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold shadow-md transition-all',
              copied
                ? 'bg-emerald-500 text-white'
                : 'bg-accent-500 hover:bg-accent-600 text-white'
            )}
          >
            {copied ? <><Check size={13} /> Copied!</> : <><Copy size={13} /> Copy code</>}
          </button>
        </div>

        {/* Top badges */}
        <div className="absolute top-3 left-3 flex gap-1.5">
          {block.isNew && (
            <span className="px-2 py-0.5 rounded-full bg-accent-500 text-white text-[9px] font-bold uppercase tracking-wider shadow-sm">New</span>
          )}
          {block.isPro && (
            <span className="px-2 py-0.5 rounded-full bg-amber-500 text-white text-[9px] font-bold uppercase tracking-wider shadow-sm">Pro</span>
          )}
        </div>

        {/* Bookmark */}
        <button
          onClick={() => setBookmarked(b => !b)}
          className="absolute top-3 right-3 w-7 h-7 rounded-lg bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all shadow-sm hover:border-accent-300 dark:hover:border-accent-700"
        >
          {bookmarked
            ? <BookmarkCheck size={13} className="text-accent-500" />
            : <Bookmark size={13} className="text-gray-400" />}
        </button>
      </div>

      {/* Card body */}
      <div className="flex flex-col flex-1 p-5">
        <div className="flex items-start justify-between gap-2 mb-1.5">
          <h3 className="text-sm font-semibold text-gray-900 dark:text-white leading-snug group-hover:text-accent-500 transition-colors">
            {block.title}
          </h3>
          {block.componentCount && (
            <span className="flex-shrink-0 text-[10px] font-mono bg-gray-100 dark:bg-gray-800 text-gray-400 px-1.5 py-0.5 rounded-md">
              {block.componentCount}
            </span>
          )}
        </div>

        <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed flex-1 mb-4">
          {block.description}
        </p>

        {/* Tags + category */}
        <div className="flex items-center gap-1.5 flex-wrap">
          <span className="px-2 py-0.5 rounded-md bg-accent-50 dark:bg-accent-500/10 text-accent-600 dark:text-accent-400 text-[10px] font-semibold capitalize">
            {block.category}
          </span>
          {block.tags.slice(0, 2).map(tag => (
            <span key={tag} className="px-2 py-0.5 rounded-md bg-gray-100 dark:bg-gray-800 text-[10px] font-mono text-gray-500 dark:text-gray-400">
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}
