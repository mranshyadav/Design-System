'use client'
import Link from 'next/link'
import { ArrowRight, Star, Zap, Shield, Code2 } from 'lucide-react'

function MiniMockup() {
  return (
    <div className="w-full max-w-lg mx-auto">
      {/* Window chrome */}
      <div className="rounded-2xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 shadow-card-lg overflow-hidden">
        {/* Title bar */}
        <div className="flex items-center gap-1.5 px-4 py-3 border-b border-gray-100 dark:border-gray-800 bg-gray-50 dark:bg-gray-900/50">
          <span className="w-3 h-3 rounded-full bg-red-400" />
          <span className="w-3 h-3 rounded-full bg-yellow-400" />
          <span className="w-3 h-3 rounded-full bg-green-400" />
          <div className="flex-1 mx-3 h-5 rounded bg-gray-200 dark:bg-gray-700 text-[10px] text-gray-400 dark:text-gray-500 flex items-center px-2">
            app.sriio.com/dashboard
          </div>
        </div>

        {/* App content */}
        <div className="flex h-72">
          {/* Sidebar */}
          <div className="w-14 border-r border-gray-100 dark:border-gray-800 flex flex-col items-center gap-2 py-3 bg-gray-50/50 dark:bg-gray-900/30">
            {['▦','◇','≡','◈','◉','▷'].map((icon, i) => (
              <div key={i} className={`w-8 h-8 rounded-lg flex items-center justify-center text-xs cursor-pointer transition-colors ${i === 0 ? 'bg-accent-500 text-white' : 'text-gray-400 dark:text-gray-600 hover:bg-gray-200 dark:hover:bg-gray-700'}`}>
                {icon}
              </div>
            ))}
          </div>

          {/* Main */}
          <div className="flex-1 p-4 overflow-hidden">
            {/* Stats row */}
            <div className="grid grid-cols-3 gap-2 mb-4">
              {[
                { label: 'Revenue', val: '$48.2K', up: true, color: 'text-emerald-500' },
                { label: 'Users',   val: '3,842',  up: true, color: 'text-blue-500' },
                { label: 'Orders',  val: '1,209',  up: false, color: 'text-amber-500' },
              ].map(m => (
                <div key={m.label} className="rounded-xl border border-gray-100 dark:border-gray-800 p-2.5 bg-white dark:bg-gray-900">
                  <div className="text-[9px] text-gray-400 mb-1">{m.label}</div>
                  <div className="text-sm font-bold text-gray-900 dark:text-white">{m.val}</div>
                  <div className={`text-[9px] font-medium mt-0.5 ${m.color}`}>{m.up ? '↑ 12%' : '↓ 3%'}</div>
                </div>
              ))}
            </div>

            {/* Chart placeholder */}
            <div className="rounded-xl border border-gray-100 dark:border-gray-800 p-3 mb-3 bg-white dark:bg-gray-900">
              <div className="flex items-center justify-between mb-2">
                <span className="text-[9px] font-semibold text-gray-700 dark:text-gray-300">Revenue over time</span>
                <div className="flex gap-1">
                  {['7d','30d','90d'].map((p, i) => (
                    <span key={p} className={`text-[8px] px-1.5 py-0.5 rounded ${i === 1 ? 'bg-accent-500 text-white' : 'text-gray-400'}`}>{p}</span>
                  ))}
                </div>
              </div>
              <div className="flex items-end gap-1 h-16">
                {[40,65,45,80,55,90,72,88,60,95,78,100].map((h, i) => (
                  <div key={i} className="flex-1 rounded-sm transition-all" style={{ height: `${h}%`, background: i === 11 ? '#1F3FE0' : `rgba(31,63,224,${0.15 + h * 0.005})` }} />
                ))}
              </div>
            </div>

            {/* Table rows */}
            <div className="rounded-xl border border-gray-100 dark:border-gray-800 overflow-hidden bg-white dark:bg-gray-900">
              {[
                { name: 'orders.normalize', status: 'deployed', color: 'bg-emerald-500' },
                { name: 'payments.audit',   status: 'throttled', color: 'bg-amber-400' },
                { name: 'users.enrich',     status: 'failed',    color: 'bg-red-500' },
              ].map((row, i) => (
                <div key={i} className={`flex items-center gap-2 px-3 py-2 text-[9px] ${i > 0 ? 'border-t border-gray-50 dark:border-gray-800' : ''}`}>
                  <span className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${row.color}`} />
                  <span className="flex-1 font-mono text-gray-700 dark:text-gray-300">{row.name}</span>
                  <span className="text-gray-400 capitalize">{row.status}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Floating badges */}
      <div className="absolute -left-4 top-1/3 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl shadow-card-md px-3 py-2 flex items-center gap-2 animate-float" style={{ animationDelay: '0s' }}>
        <span className="w-5 h-5 rounded-lg bg-emerald-100 dark:bg-emerald-900/40 flex items-center justify-center">
          <Shield size={10} className="text-emerald-600" />
        </span>
        <div>
          <div className="text-[10px] font-semibold text-gray-900 dark:text-white">Zero deps</div>
          <div className="text-[9px] text-gray-400">No runtime deps</div>
        </div>
      </div>

      <div className="absolute -right-4 top-1/4 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl shadow-card-md px-3 py-2 flex items-center gap-2 animate-float" style={{ animationDelay: '1.5s' }}>
        <span className="w-5 h-5 rounded-lg bg-accent-100 dark:bg-accent-900/40 flex items-center justify-center">
          <Code2 size={10} className="text-accent-500" />
        </span>
        <div>
          <div className="text-[10px] font-semibold text-gray-900 dark:text-white">TypeScript</div>
          <div className="text-[9px] text-gray-400">Fully typed</div>
        </div>
      </div>
    </div>
  )
}

export function Hero() {
  return (
    <section className="relative pt-32 pb-20 lg:pt-40 lg:pb-28 overflow-hidden">
      {/* Background grid */}
      <div className="absolute inset-0 bg-grid-light dark:bg-grid-dark opacity-60 pointer-events-none" />
      {/* Gradient orbs */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-accent-500/10 dark:bg-accent-500/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-blue-400/10 dark:bg-blue-400/5 rounded-full blur-3xl pointer-events-none" />

      <div className="relative max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-12 2xl:px-16">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">

          {/* Left — text */}
          <div className="text-center lg:text-left">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-accent-50 dark:bg-accent-500/10 border border-accent-200 dark:border-accent-500/20 text-accent-600 dark:text-accent-400 text-xs font-semibold mb-6">
              <Zap size={11} />
              v2.0 — 47 new UI blocks now available
              <ArrowRight size={11} />
            </div>

            {/* Heading */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-gray-900 dark:text-white leading-[1.06] tracking-tight mb-6">
              Build beautiful{' '}
              <span className="gradient-text">interfaces</span>{' '}
              faster than ever
            </h1>

            {/* Description */}
            <p className="text-lg text-gray-500 dark:text-gray-400 leading-relaxed mb-8 max-w-lg mx-auto lg:mx-0">
              A precision-crafted React component library with 27+ fully interactive components, 47+ copy-paste UI blocks, and a complete design token system.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3 mb-10">
              <Link href="/blocks"
                className="flex items-center gap-2 px-6 py-3 rounded-xl bg-accent-500 hover:bg-accent-600 text-white font-semibold text-sm transition-all duration-150 shadow-sm hover:shadow-md hover:-translate-y-0.5 w-full sm:w-auto justify-center">
                Browse components
                <ArrowRight size={15} />
              </Link>
              <a href="https://github.com/mranshyadav/Design-System" target="_blank" rel="noreferrer"
                className="flex items-center gap-2 px-6 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800/50 text-gray-700 dark:text-gray-300 font-semibold text-sm hover:border-gray-300 dark:hover:border-gray-600 transition-all duration-150 hover:shadow-sm w-full sm:w-auto justify-center">
                <Star size={14} className="text-amber-400" />
                Star on GitHub
              </a>
            </div>

            {/* Stats */}
            <div className="flex items-center justify-center lg:justify-start gap-8 pt-6 border-t border-gray-100 dark:border-gray-800">
              {[
                { value: '27+',  label: 'Components' },
                { value: '47+',  label: 'UI Blocks' },
                { value: '100%', label: 'TypeScript' },
              ].map(s => (
                <div key={s.label} className="text-center lg:text-left">
                  <div className="text-2xl font-extrabold text-gray-900 dark:text-white tracking-tight">{s.value}</div>
                  <div className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">{s.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Right — mockup */}
          <div className="relative hidden lg:block">
            <MiniMockup />
          </div>
        </div>
      </div>
    </section>
  )
}
