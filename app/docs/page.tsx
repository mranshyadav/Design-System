import Link from 'next/link'
import { BookOpen, ArrowRight, Terminal, Puzzle, Palette, Zap } from 'lucide-react'

export default function DocsPage() {
  const sections = [
    { icon: <Zap size={18} />, title: 'Getting Started', desc: 'Install, configure Tailwind and render your first component in under 5 minutes.', color: 'bg-accent-50 dark:bg-accent-500/10 text-accent-500', links: ['Installation', 'Configuration', 'Your first component'] },
    { icon: <Puzzle size={18} />, title: 'Components', desc: 'Detailed props reference, variant examples and accessibility notes for all 27 components.', color: 'bg-emerald-50 dark:bg-emerald-500/10 text-emerald-500', links: ['Button', 'Input', 'Modal', 'Table', 'Badge'] },
    { icon: <Palette size={18} />, title: 'Design Tokens', desc: 'Color scales, spacing system, typography and motion tokens explained.', color: 'bg-violet-50 dark:bg-violet-500/10 text-violet-500', links: ['Colors', 'Typography', 'Spacing', 'Shadows'] },
    { icon: <Terminal size={18} />, title: 'UI Blocks', desc: 'How to copy, paste and customize the 47+ pre-built block sections.', color: 'bg-amber-50 dark:bg-amber-500/10 text-amber-500', links: ['Usage', 'Customizing', 'Dark mode', 'Responsive'] },
  ]

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
      <div className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800">
        <div className="max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-12 2xl:px-16 pt-24 pb-16 lg:pt-28 lg:pb-20">
          <p className="text-xs font-semibold uppercase tracking-widest text-accent-500 mb-3">Documentation</p>
          <h1 className="text-3xl lg:text-4xl font-extrabold text-gray-900 dark:text-white tracking-tight mb-3">Docs</h1>
          <p className="text-gray-500 dark:text-gray-400 text-lg max-w-xl">Everything you need to build with SRIIO UI. From installation to advanced customization.</p>
        </div>
      </div>

      <div className="max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-12 2xl:px-16 py-12">
        <div className="grid sm:grid-cols-2 gap-5 mb-10">
          {sections.map((s, i) => (
            <div key={i} className="p-6 rounded-2xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 shadow-sm hover:shadow-md transition-all duration-200">
              <div className={`w-9 h-9 rounded-xl ${s.color} flex items-center justify-center mb-4`}>{s.icon}</div>
              <h3 className="text-sm font-bold text-gray-900 dark:text-white mb-1.5">{s.title}</h3>
              <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed mb-4">{s.desc}</p>
              <div className="flex flex-wrap gap-1.5">
                {s.links.map(l => (
                  <span key={l} className="px-2.5 py-1 rounded-lg bg-gray-100 dark:bg-gray-800 text-xs font-medium text-gray-600 dark:text-gray-400 cursor-pointer hover:text-accent-500 transition-colors">{l}</span>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="text-center py-16 rounded-2xl bg-white dark:bg-gray-900 border border-dashed border-gray-300 dark:border-gray-700">
          <div className="w-16 h-16 rounded-2xl bg-gray-100 dark:bg-gray-800 flex items-center justify-center mx-auto mb-4">
            <BookOpen size={28} className="text-gray-400" />
          </div>
          <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">Full docs coming soon</h3>
          <p className="text-sm text-gray-500 dark:text-gray-400 max-w-sm mx-auto mb-6">
            Detailed documentation is in progress. In the meantime, browse the components and copy the code directly.
          </p>
          <Link href="/components" className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-accent-500 hover:bg-accent-600 text-white text-sm font-semibold transition-colors shadow-sm">
            Browse components <ArrowRight size={14} />
          </Link>
        </div>
      </div>
    </div>
  )
}
