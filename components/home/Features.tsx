import { Zap, Shield, Code2, Palette, Layers, Globe } from 'lucide-react'

const features = [
  {
    icon: Zap,
    title: 'Zero Runtime Dependencies',
    description: 'Every component is built with React and CSS custom properties only. No heavy UI framework, no conflicts, no bloat.',
    color: 'bg-amber-100 dark:bg-amber-900/30 text-amber-600 dark:text-amber-400',
  },
  {
    icon: Code2,
    title: 'TypeScript First',
    description: 'Full TypeScript support with strict types, discriminated unions, and exported prop interfaces for every component.',
    color: 'bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400',
  },
  {
    icon: Palette,
    title: 'Design Token System',
    description: 'Three-layer token architecture — foundation → semantic → component. Colors, spacing, radii, shadows, and motion in CSS variables.',
    color: 'bg-accent-100 dark:bg-accent-900/30 text-accent-600 dark:text-accent-400',
  },
  {
    icon: Layers,
    title: '47+ Copy-Paste Blocks',
    description: 'Pre-built product UI blocks — dashboards, CRUD tables, settings pages, kanban boards, pricing tables — ready to ship.',
    color: 'bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400',
  },
  {
    icon: Shield,
    title: 'Accessible by Default',
    description: 'ARIA roles, keyboard navigation, focus rings, and screen reader support baked into every component from day one.',
    color: 'bg-violet-100 dark:bg-violet-900/30 text-violet-600 dark:text-violet-400',
  },
  {
    icon: Globe,
    title: 'MIT Licensed',
    description: 'Completely open source. Use it in personal projects, client work, or commercial products — no attribution required.',
    color: 'bg-rose-100 dark:bg-rose-900/30 text-rose-600 dark:text-rose-400',
  },
]

export function Features() {
  return (
    <section className="py-20 lg:py-28 bg-gray-50/50 dark:bg-gray-900/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <p className="text-xs font-semibold uppercase tracking-widest text-accent-500 mb-3">Why SRIIO UI</p>
          <h2 className="text-3xl lg:text-4xl font-extrabold text-gray-900 dark:text-white tracking-tight mb-4">
            Everything you need to ship fast
          </h2>
          <p className="text-gray-500 dark:text-gray-400 text-lg max-w-2xl mx-auto">
            Built for precision engineering teams who demand quality, consistency, and developer experience without compromise.
          </p>
        </div>

        {/* Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map(f => (
            <div key={f.title} className="group p-7 rounded-2xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 hover:border-accent-200 dark:hover:border-accent-800 shadow-card hover:shadow-card-md transition-all duration-200 hover:-translate-y-0.5">
              <div className={`inline-flex items-center justify-center w-11 h-11 rounded-xl mb-5 ${f.color}`}>
                <f.icon size={20} />
              </div>
              <h3 className="text-base font-semibold text-gray-900 dark:text-white mb-2">{f.title}</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">{f.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
