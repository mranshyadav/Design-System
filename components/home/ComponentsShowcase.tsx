'use client'
import Link from 'next/link'
import { useState } from 'react'
import { components, componentCategories } from '@/lib/data'
import { ArrowRight, Layers } from 'lucide-react'
import clsx from 'clsx'

function ComponentCard({ component }: { component: typeof components[0] }) {
  return (
    <Link href={`/components/${component.id}`}
      className="group flex flex-col p-5 rounded-2xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 hover:border-accent-300 dark:hover:border-accent-700 shadow-card hover:shadow-card-md transition-all duration-200 hover:-translate-y-0.5">
      {/* Mini preview */}
      <div className="w-full h-28 rounded-xl bg-gray-50 dark:bg-gray-800/60 border border-gray-100 dark:border-gray-700/50 mb-4 flex items-center justify-center overflow-hidden relative">
        <ComponentMiniPreview id={component.id} />
      </div>

      {/* Info */}
      <div className="flex items-start justify-between gap-2 mb-1">
        <h3 className="text-sm font-semibold text-gray-900 dark:text-white group-hover:text-accent-500 transition-colors">{component.title}</h3>
        <span className="flex-shrink-0 text-[10px] font-mono bg-gray-100 dark:bg-gray-800 text-gray-500 dark:text-gray-400 px-1.5 py-0.5 rounded">
          {component.variants}v
        </span>
      </div>
      <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed mb-3 flex-1">{component.description}</p>

      {/* Footer */}
      <div className="flex items-center justify-between">
        <span className="text-[10px] font-mono text-gray-400 dark:text-gray-500 truncate">{component.category}</span>
        <ArrowRight size={12} className="text-gray-400 group-hover:text-accent-500 transition-colors flex-shrink-0" />
      </div>
    </Link>
  )
}

function ComponentMiniPreview({ id }: { id: string }) {
  const previews: Record<string, React.ReactNode> = {
    badge: (
      <div className="flex flex-wrap gap-1.5 p-2 justify-center">
        {[['bg-emerald-100 text-emerald-700','deployed'],['bg-amber-100 text-amber-700','pending'],['bg-red-100 text-red-700','failed'],['bg-blue-100 text-blue-600','v2.4']].map(([cls, label]) => (
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
    avatar: (
      <div className="flex items-center gap-1.5 justify-center">
        {[['#1F3FE0','PR'],['#1F6B47','JL'],['#9A5C0A','DM'],['#7C2F9A','KS']].map(([bg, init], i) => (
          <div key={i} style={{ background: bg as string, width: 28 + i*4, height: 28 + i*4, fontSize: 9 + i }} className="rounded-full flex items-center justify-center text-white font-bold">{init}</div>
        ))}
      </div>
    ),
    input: (
      <div className="flex flex-col gap-1.5 p-3 w-full max-w-[160px]">
        <div className="text-[8px] text-gray-500 font-medium">Pipeline name</div>
        <div className="px-2 py-1.5 rounded-lg border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-900 text-[9px] text-gray-400 font-mono">orders.normalize</div>
        <div className="text-[8px] text-gray-500 font-medium mt-0.5">Region</div>
        <div className="px-2 py-1.5 rounded-lg border border-red-300 bg-white dark:bg-gray-900 text-[9px] text-gray-400 font-mono">us-east-1</div>
        <div className="text-[8px] text-red-500">Invalid region format</div>
      </div>
    ),
    alert: (
      <div className="flex flex-col gap-1 p-2 w-full max-w-[180px]">
        {[['bg-blue-50 border-blue-200 text-blue-700 dark:bg-blue-900/20 dark:border-blue-800','ℹ Info message'],['bg-emerald-50 border-emerald-200 text-emerald-700 dark:bg-emerald-900/20 dark:border-emerald-800','✓ Success'],['bg-red-50 border-red-200 text-red-700 dark:bg-red-900/20 dark:border-red-800','⚠ Error occurred']].map(([cls, label]) => (
          <div key={label} className={`px-2 py-1.5 rounded-lg border text-[8px] font-medium ${cls}`}>{label}</div>
        ))}
      </div>
    ),
    modal: (
      <div className="relative w-full h-full flex items-center justify-center">
        <div className="absolute inset-0 bg-black/20 rounded-xl" />
        <div className="relative bg-white dark:bg-gray-800 rounded-xl shadow-lg p-3 w-32 z-10">
          <div className="text-[9px] font-semibold text-gray-800 dark:text-white mb-1">Confirm delete?</div>
          <div className="text-[8px] text-gray-500 mb-2">This cannot be undone.</div>
          <div className="flex gap-1">
            <span className="flex-1 text-center px-1 py-1 rounded bg-gray-100 dark:bg-gray-700 text-[8px] text-gray-600 dark:text-gray-300">Cancel</span>
            <span className="flex-1 text-center px-1 py-1 rounded bg-red-500 text-white text-[8px]">Delete</span>
          </div>
        </div>
      </div>
    ),
    table: (
      <div className="w-full p-1.5">
        <div className="w-full rounded-lg overflow-hidden border border-gray-200 dark:border-gray-700">
          <div className="flex items-center gap-2 px-2 py-1.5 bg-gray-50 dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
            {['Pipeline','Status','p95'].map(h => <span key={h} className="text-[8px] font-semibold text-gray-500 flex-1">{h}</span>)}
          </div>
          {[['orders.norm…','deployed','12ms','emerald'],['payments…','throttled','48ms','amber'],['users…','failed','—','red']].map(([name, status, p95, c]) => (
            <div key={name} className="flex items-center gap-2 px-2 py-1.5 border-t border-gray-100 dark:border-gray-700/50">
              <span className="text-[8px] font-mono text-gray-700 dark:text-gray-300 flex-1 truncate">{name}</span>
              <span className={`text-[7px] px-1 py-0.5 rounded-full font-medium bg-${c}-100 text-${c}-700 dark:bg-${c}-900/30 dark:text-${c}-400`}>{status}</span>
              <span className="text-[8px] text-gray-500 font-mono flex-1 text-right">{p95}</span>
            </div>
          ))}
        </div>
      </div>
    ),
  }
  return (
    <div className="w-full h-full flex items-center justify-center">
      {previews[id] || (
        <div className="text-2xl text-gray-300 dark:text-gray-600">{['◈','◇','▦','≡','⊟','◉','▷','⊙'][Math.abs(id.charCodeAt(0) % 8)]}</div>
      )}
    </div>
  )
}

export function ComponentsShowcase() {
  const [activeCategory, setActiveCategory] = useState('All')
  const filtered = activeCategory === 'All' ? components : components.filter(c => c.category === activeCategory)

  return (
    <section className="py-20 lg:py-28">
      <div className="max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-12 2xl:px-16">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-10">
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-accent-500 mb-2">Components</p>
            <h2 className="text-3xl lg:text-4xl font-extrabold text-gray-900 dark:text-white tracking-tight">
              27 production-ready components
            </h2>
          </div>
          <Link href="/components" className="flex items-center gap-1.5 text-sm font-semibold text-accent-500 hover:text-accent-600 transition-colors whitespace-nowrap">
            View all <ArrowRight size={14} />
          </Link>
        </div>

        {/* Category filter */}
        <div className="flex items-center gap-2 mb-8 overflow-x-auto pb-2 scrollbar-thin">
          {componentCategories.map(cat => (
            <button key={cat} onClick={() => setActiveCategory(cat)}
              className={clsx(
                'flex-shrink-0 px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all duration-150',
                activeCategory === cat
                  ? 'bg-accent-500 text-white shadow-sm'
                  : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700'
              )}>
              {cat}
            </button>
          ))}
        </div>

        {/* Grid */}
        <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {filtered.slice(0, 8).map(component => (
            <ComponentCard key={component.id} component={component} />
          ))}
        </div>

        {filtered.length > 8 && (
          <div className="mt-8 text-center">
            <Link href="/components"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 text-sm font-semibold hover:border-accent-300 dark:hover:border-accent-700 transition-colors shadow-card">
              <Layers size={15} />
              View all {filtered.length} components
            </Link>
          </div>
        )}
      </div>
    </section>
  )
}
