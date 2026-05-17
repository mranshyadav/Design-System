import Link from 'next/link'
import { Figma, ArrowRight, Layers, Palette, Download } from 'lucide-react'

export default function FigmaPage() {
  const resources = [
    { icon: <Layers size={20} />, title: 'Component Library', desc: 'All 27 components as Figma frames with auto-layout and variants.', badge: 'Free', color: 'bg-blue-50 dark:bg-blue-500/10 text-blue-500' },
    { icon: <Palette size={20} />, title: 'Design Tokens', desc: 'Color styles, typography, spacing, radius and shadow variables.', badge: 'Free', color: 'bg-violet-50 dark:bg-violet-500/10 text-violet-500' },
    { icon: <Download size={20} />, title: 'UI Blocks Kit', desc: '47+ block layouts as ready-to-use Figma sections and pages.', badge: 'Pro', color: 'bg-amber-50 dark:bg-amber-500/10 text-amber-500' },
  ]

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
      <div className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-20">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-12 h-12 rounded-2xl bg-[#1ABCFE]/10 flex items-center justify-center">
              <Figma size={22} className="text-[#1ABCFE]" />
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-widest text-accent-500 mb-0.5">Figma</p>
              <h1 className="text-2xl lg:text-3xl font-extrabold text-gray-900 dark:text-white">Figma Resources</h1>
            </div>
          </div>
          <p className="text-gray-500 dark:text-gray-400 text-lg max-w-xl leading-relaxed">
            Design files, component kits and token libraries to use SRIIO UI directly inside Figma.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-12">
          {resources.map((r, i) => (
            <div key={i} className="p-6 rounded-2xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 shadow-sm hover:shadow-md hover:border-accent-200 dark:hover:border-accent-700 transition-all duration-200 group cursor-pointer">
              <div className={`w-10 h-10 rounded-xl ${r.color} flex items-center justify-center mb-4`}>{r.icon}</div>
              <div className="flex items-center gap-2 mb-2">
                <h3 className="text-sm font-bold text-gray-900 dark:text-white group-hover:text-accent-500 transition-colors">{r.title}</h3>
                <span className={`px-2 py-0.5 rounded-full text-[9px] font-bold uppercase ${r.badge === 'Pro' ? 'bg-amber-100 text-amber-600 dark:bg-amber-500/10 dark:text-amber-400' : 'bg-emerald-100 text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-400'}`}>{r.badge}</span>
              </div>
              <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed mb-4">{r.desc}</p>
              <div className="flex items-center gap-1 text-xs font-semibold text-accent-500 hover:text-accent-600">Open in Figma <ArrowRight size={12} /></div>
            </div>
          ))}
        </div>

        <div className="text-center py-16 rounded-2xl bg-white dark:bg-gray-900 border border-dashed border-gray-300 dark:border-gray-700">
          <div className="w-16 h-16 rounded-2xl bg-gray-100 dark:bg-gray-800 flex items-center justify-center mx-auto mb-4">
            <Figma size={28} className="text-gray-400" />
          </div>
          <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">Full Figma kit coming soon</h3>
          <p className="text-sm text-gray-500 dark:text-gray-400 max-w-sm mx-auto mb-6">We're finalizing the complete design system file. Star the GitHub repo to get notified when it launches.</p>
          <Link href="/" className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-accent-500 hover:bg-accent-600 text-white text-sm font-semibold transition-colors shadow-sm">
            Back to home <ArrowRight size={14} />
          </Link>
        </div>
      </div>
    </div>
  )
}
