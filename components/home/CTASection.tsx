import Link from 'next/link'
import { ArrowRight, Github, Zap } from 'lucide-react'

export function CTASection() {
  return (
    <section className="py-20 lg:py-28">
      <div className="layout-container">
        <div className="relative overflow-hidden rounded-3xl bg-accent-500 px-8 py-16 lg:px-16 lg:py-20 text-center">
          {/* Background decoration */}
          <div className="absolute inset-0 bg-gradient-to-br from-accent-400 via-accent-500 to-blue-600 opacity-90" />
          <div className="absolute top-0 left-1/4 w-64 h-64 rounded-full bg-white/5 blur-3xl" />
          <div className="absolute bottom-0 right-1/4 w-80 h-80 rounded-full bg-blue-300/10 blur-3xl" />
          <div className="absolute inset-0 bg-grid-light opacity-10" />

          <div className="relative">
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-white/20 mb-6">
              <Zap size={22} className="text-white" />
            </div>

            <h2 className="text-3xl lg:text-5xl font-extrabold text-white tracking-tight mb-4">
              Start building today
            </h2>
            <p className="text-accent-100 text-lg max-w-xl mx-auto mb-8 leading-relaxed">
              27 components, 47 blocks, complete design tokens — all open source and free forever.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <Link href="/blocks"
                className="flex items-center gap-2 px-7 py-3.5 rounded-xl bg-white text-accent-600 font-bold text-sm hover:bg-accent-50 transition-colors shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all w-full sm:w-auto justify-center">
                Browse components
                <ArrowRight size={15} />
              </Link>
              <a href="https://github.com/mranshyadav/Design-System" target="_blank" rel="noreferrer"
                className="flex items-center gap-2 px-7 py-3.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold text-sm border border-white/20 hover:border-white/30 transition-all w-full sm:w-auto justify-center">
                <Github size={15} />
                View on GitHub
              </a>
            </div>

            <p className="text-accent-200 text-xs mt-6">MIT licensed · No attribution required · Forever free</p>
          </div>
        </div>
      </div>
    </section>
  )
}
