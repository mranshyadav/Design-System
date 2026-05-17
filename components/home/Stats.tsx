import { stats } from '@/lib/data'

export function Stats() {
  return (
    <section className="py-16 border-y border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-950">
      <div className="max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-12 2xl:px-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((s, i) => (
            <div key={s.label} className={`text-center ${i > 0 ? 'border-l border-gray-100 dark:border-gray-800' : ''}`}>
              <div className="text-4xl lg:text-5xl font-extrabold text-gray-900 dark:text-white tracking-tight mb-1">
                {s.value}
              </div>
              <div className="text-sm font-semibold text-gray-700 dark:text-gray-200 mb-0.5">{s.label}</div>
              <div className="text-xs text-gray-400 dark:text-gray-500">{s.sub}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
