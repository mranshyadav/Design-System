import Link from 'next/link'
import { ArrowRight, Copy, Eye } from 'lucide-react'
import { blocks } from '@/lib/data'

function BlockThumbnail({ category }: { category: string }) {
  const thumbnails: Record<string, React.ReactNode> = {
    hero: (
      <div className="w-full h-full flex flex-col items-center justify-center gap-2 p-4 bg-gradient-to-br from-accent-500/5 to-blue-400/5">
        <div className="w-20 h-2 rounded-full bg-accent-200 dark:bg-accent-800" />
        <div className="w-28 h-3 rounded-full bg-gray-200 dark:bg-gray-700" />
        <div className="w-24 h-2 rounded-full bg-gray-100 dark:bg-gray-800" />
        <div className="flex gap-1.5 mt-1">
          <div className="w-12 h-5 rounded-lg bg-accent-500" />
          <div className="w-12 h-5 rounded-lg border border-gray-300 dark:border-gray-600" />
        </div>
      </div>
    ),
    dashboard: (
      <div className="w-full h-full p-3">
        <div className="grid grid-cols-3 gap-1.5 mb-2">
          {['emerald','blue','amber'].map(c => (
            <div key={c} className={`rounded-lg p-1.5 bg-${c}-50 dark:bg-${c}-900/20 border border-${c}-100 dark:border-${c}-800/40`}>
              <div className={`w-full h-1 rounded bg-${c}-200 dark:bg-${c}-700 mb-1`} />
              <div className={`w-2/3 h-2 rounded bg-${c}-300 dark:bg-${c}-600`} />
            </div>
          ))}
        </div>
        <div className="rounded-lg bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 p-1.5">
          <div className="flex items-end gap-0.5 h-10">
            {[40,65,45,80,55,90,72,88].map((h, i) => (
              <div key={i} className="flex-1 rounded-sm" style={{ height: `${h}%`, background: `rgba(31,63,224,${0.2 + h * 0.006})` }} />
            ))}
          </div>
        </div>
      </div>
    ),
    tables: (
      <div className="w-full h-full p-3">
        <div className="rounded-lg overflow-hidden border border-gray-200 dark:border-gray-700 w-full">
          <div className="flex gap-2 px-2 py-1.5 bg-gray-50 dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
            <div className="w-3 h-3 rounded bg-gray-300 dark:bg-gray-600" />
            {[50,30,20].map((w, i) => <div key={i} className="h-1.5 rounded bg-gray-300 dark:bg-gray-600" style={{ width: `${w}%` }} />)}
          </div>
          {[1,2,3,4].map(i => (
            <div key={i} className="flex gap-2 px-2 py-1.5 border-t border-gray-100 dark:border-gray-700/50">
              <div className="w-3 h-3 rounded border border-gray-300 dark:border-gray-600" />
              {[50,30,20].map((w, j) => <div key={j} className="h-1.5 rounded bg-gray-200 dark:bg-gray-700" style={{ width: `${w}%` }} />)}
            </div>
          ))}
        </div>
      </div>
    ),
    forms: (
      <div className="w-full h-full p-3 flex flex-col gap-2">
        {['Pipeline name','Region','Tags'].map(label => (
          <div key={label}>
            <div className="text-[7px] text-gray-500 mb-0.5 font-medium">{label}</div>
            <div className="h-4 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900" />
          </div>
        ))}
        <div className="mt-auto flex gap-1">
          <div className="flex-1 h-5 rounded-lg bg-accent-500" />
          <div className="flex-1 h-5 rounded-lg border border-gray-200 dark:border-gray-600" />
        </div>
      </div>
    ),
    authentication: (
      <div className="w-full h-full flex items-center justify-center p-3">
        <div className="w-full max-w-[140px] bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-3 shadow-sm">
          <div className="w-6 h-6 rounded-lg bg-accent-500 mx-auto mb-2" />
          <div className="h-1.5 rounded bg-gray-200 dark:bg-gray-700 w-full mb-2" />
          <div className="h-4 rounded-lg border border-gray-200 dark:border-gray-600 mb-1.5" />
          <div className="h-4 rounded-lg border border-gray-200 dark:border-gray-600 mb-2" />
          <div className="h-5 rounded-lg bg-accent-500" />
        </div>
      </div>
    ),
    pricing: (
      <div className="w-full h-full flex items-center gap-2 p-3">
        {['bg-gray-50 dark:bg-gray-800','bg-accent-500','bg-gray-50 dark:bg-gray-800'].map((bg, i) => (
          <div key={i} className={`flex-1 rounded-xl ${bg} p-2 flex flex-col gap-1 ${i === 1 ? 'scale-105 shadow-md' : 'border border-gray-200 dark:border-gray-700'}`}>
            <div className={`h-1.5 rounded w-2/3 ${i === 1 ? 'bg-white/40' : 'bg-gray-300 dark:bg-gray-600'}`} />
            <div className={`h-3 rounded w-full ${i === 1 ? 'bg-white/60' : 'bg-gray-200 dark:bg-gray-700'}`} />
            {[1,2,3].map(j => <div key={j} className={`h-1 rounded w-full ${i === 1 ? 'bg-white/30' : 'bg-gray-100 dark:bg-gray-700/50'}`} />)}
            <div className={`h-4 rounded-lg mt-1 ${i === 1 ? 'bg-white/20' : 'bg-accent-500/20'}`} />
          </div>
        ))}
      </div>
    ),
    navigation: (
      <div className="w-full h-full flex flex-col p-2 gap-1.5">
        <div className="h-5 rounded-lg bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 flex items-center px-2 gap-1">
          <div className="w-3 h-3 rounded bg-accent-500" />
          <div className="flex-1 flex gap-1">
            {[1,2,3,4].map(i => <div key={i} className="h-1.5 rounded bg-gray-200 dark:bg-gray-700 w-8" />)}
          </div>
          <div className="w-10 h-3 rounded bg-accent-500/70" />
        </div>
        <div className="flex gap-1.5 flex-1">
          <div className="w-8 flex flex-col gap-1 pt-1">
            {[1,2,3,4,5].map(i => <div key={i} className={`h-4 rounded ${i === 1 ? 'bg-accent-500' : 'bg-gray-200 dark:bg-gray-700'}`} />)}
          </div>
          <div className="flex-1 flex flex-col gap-1">
            {[1,2,3].map(i => <div key={i} className="h-4 rounded bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700" />)}
          </div>
        </div>
      </div>
    ),
    settings: (
      <div className="w-full h-full flex gap-2 p-2">
        <div className="w-12 flex flex-col gap-1 pt-1">
          {['Profile','Account','Security','Billing'].map((label, i) => (
            <div key={label} className={`h-3 rounded text-[6px] flex items-center px-1 ${i === 0 ? 'bg-accent-500 text-white' : 'bg-gray-100 dark:bg-gray-800 text-gray-400'}`}>{label}</div>
          ))}
        </div>
        <div className="flex-1 flex flex-col gap-1.5">
          <div className="flex gap-1.5 items-center">
            <div className="w-7 h-7 rounded-full bg-accent-200 dark:bg-accent-800" />
            <div className="flex flex-col gap-0.5">
              <div className="h-1.5 w-14 rounded bg-gray-200 dark:bg-gray-700" />
              <div className="h-1 w-10 rounded bg-gray-100 dark:bg-gray-800" />
            </div>
          </div>
          {[1,2,3].map(i => <div key={i} className="h-4 rounded border border-gray-200 dark:border-gray-700" />)}
          <div className="h-5 rounded bg-accent-500 mt-auto" />
        </div>
      </div>
    ),
  }

  return (
    <div className="w-full h-full overflow-hidden">
      {thumbnails[category] || (
        <div className="w-full h-full flex items-center justify-center bg-gray-50 dark:bg-gray-800 text-3xl text-gray-200 dark:text-gray-700">⊞</div>
      )}
    </div>
  )
}

export function BlocksPreview() {
  const featured = blocks.slice(0, 6)

  return (
    <section className="py-20 lg:py-28 bg-gray-50/50 dark:bg-gray-900/30">
      <div className="max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-12 2xl:px-16">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-10">
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-accent-500 mb-2">UI Blocks</p>
            <h2 className="text-3xl lg:text-4xl font-extrabold text-gray-900 dark:text-white tracking-tight">
              47+ copy-paste blocks
            </h2>
            <p className="text-gray-500 dark:text-gray-400 mt-2 max-w-lg">
              Pre-built product UI sections built with SRIIO components. Copy the code, paste into your project.
            </p>
          </div>
          <Link href="/blocks" className="flex items-center gap-1.5 text-sm font-semibold text-accent-500 hover:text-accent-600 whitespace-nowrap">
            Browse all blocks <ArrowRight size={14} />
          </Link>
        </div>

        {/* Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {featured.map(block => (
            <div key={block.id} className="group rounded-2xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 shadow-card hover:shadow-card-md hover:border-accent-200 dark:hover:border-accent-800 transition-all duration-200 overflow-hidden">
              {/* Thumbnail */}
              <div className="h-44 bg-gray-50 dark:bg-gray-800/60 border-b border-gray-100 dark:border-gray-700/50 relative overflow-hidden">
                <BlockThumbnail category={block.category} />
                {/* Hover overlay */}
                <div className="absolute inset-0 bg-accent-500/0 group-hover:bg-accent-500/5 dark:group-hover:bg-accent-500/10 transition-colors flex items-center justify-center gap-2 opacity-0 group-hover:opacity-100">
                  <Link href={`/blocks/${block.id}`}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-600 text-gray-700 dark:text-gray-300 text-xs font-semibold shadow-sm hover:bg-gray-50 transition-colors">
                    <Eye size={12} /> Preview
                  </Link>
                  <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-accent-500 hover:bg-accent-600 text-white text-xs font-semibold shadow-sm transition-colors">
                    <Copy size={12} /> Copy
                  </button>
                </div>
                {/* Badges */}
                <div className="absolute top-3 left-3 flex gap-1.5">
                  {block.isNew && <span className="px-2 py-0.5 rounded-full bg-accent-500 text-white text-[9px] font-bold uppercase tracking-wide shadow-sm">New</span>}
                  {block.isPro && <span className="px-2 py-0.5 rounded-full bg-amber-500 text-white text-[9px] font-bold uppercase tracking-wide shadow-sm">Pro</span>}
                </div>
              </div>

              {/* Card body */}
              <div className="p-4">
                <div className="flex items-start justify-between gap-2 mb-1.5">
                  <h3 className="text-sm font-semibold text-gray-900 dark:text-white">{block.title}</h3>
                  {block.componentCount && (
                    <span className="flex-shrink-0 text-[10px] text-gray-400 font-mono bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 rounded">
                      {block.componentCount} blocks
                    </span>
                  )}
                </div>
                <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed mb-3">{block.description}</p>
                <div className="flex items-center gap-1.5 flex-wrap">
                  {block.tags.slice(0, 3).map(tag => (
                    <span key={tag} className="px-2 py-0.5 rounded-md bg-gray-100 dark:bg-gray-800 text-[10px] font-mono text-gray-500 dark:text-gray-400">{tag}</span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-10 text-center">
          <Link href="/blocks"
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl bg-accent-500 hover:bg-accent-600 text-white font-semibold text-sm transition-all duration-150 shadow-sm hover:shadow-md hover:-translate-y-0.5">
            Browse all 47 blocks
            <ArrowRight size={15} />
          </Link>
        </div>
      </div>
    </section>
  )
}
