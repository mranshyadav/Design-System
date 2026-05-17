import Link from 'next/link'
import { ArrowRight, Github, Sparkles, Zap, Copy } from 'lucide-react'

export function BlocksHero() {
  return (
    <section className="relative overflow-hidden bg-white dark:bg-gray-950 border-b border-gray-200 dark:border-gray-800">
      <div className="absolute -top-32 -right-32 w-96 h-96 rounded-full bg-accent-500/5 dark:bg-accent-500/10 blur-3xl pointer-events-none" />
      <div className="absolute -bottom-20 -left-20 w-80 h-80 rounded-full bg-blue-400/5 dark:bg-blue-400/8 blur-3xl pointer-events-none" />
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgb(0,0,0,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgb(0,0,0,0.03)_1px,transparent_1px)] dark:bg-[linear-gradient(to_right,rgb(255,255,255,0.02)_1px,transparent_1px),linear-gradient(to_bottom,rgb(255,255,255,0.02)_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-accent-500/8 dark:bg-accent-500/12 border border-accent-500/20 text-accent-600 dark:text-accent-400 text-xs font-semibold mb-5">
              <Sparkles size={12} />
              47+ Production-ready UI Blocks
            </div>

            <h1 className="text-4xl lg:text-5xl xl:text-6xl font-extrabold text-gray-900 dark:text-white leading-[1.1] tracking-tight mb-5">
              Build beautiful{' '}
              <span className="bg-gradient-to-r from-accent-500 to-blue-500 bg-clip-text text-transparent">
                products faster
              </span>
            </h1>

            <p className="text-gray-500 dark:text-gray-400 text-lg leading-relaxed mb-8 max-w-lg">
              Copy-paste ready UI blocks for React & Next.js. Designed for developers who care about both code quality and visual polish.
            </p>

            <div className="flex flex-wrap gap-3 mb-10">
              <Link
                href="#blocks"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-accent-500 hover:bg-accent-600 text-white font-semibold text-sm transition-all shadow-md shadow-accent-500/20 hover:shadow-lg hover:shadow-accent-500/25 hover:-translate-y-0.5"
              >
                Browse blocks <ArrowRight size={15} />
              </Link>
              <a
                href="https://github.com/mranshyadav/Design-System"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 font-semibold text-sm border border-gray-200 dark:border-gray-700 transition-all hover:-translate-y-0.5"
              >
                <Github size={15} /> View on GitHub
              </a>
            </div>

            <div className="flex flex-wrap items-center gap-6">
              <div className="flex items-center gap-2">
                <span className="text-xl font-extrabold text-gray-900 dark:text-white">47+</span>
                <span className="text-xs text-gray-500 dark:text-gray-400 leading-tight">UI Blocks</span>
              </div>
              <div className="w-px h-6 bg-gray-200 dark:bg-gray-700" />
              <div className="flex items-center gap-2">
                <span className="text-xl font-extrabold text-gray-900 dark:text-white">13</span>
                <span className="text-xs text-gray-500 dark:text-gray-400 leading-tight">Categories</span>
              </div>
              <div className="w-px h-6 bg-gray-200 dark:bg-gray-700" />
              <div className="flex items-center gap-2">
                <span className="text-xl font-extrabold text-gray-900 dark:text-white">MIT</span>
                <span className="text-xs text-gray-500 dark:text-gray-400 leading-tight">License</span>
              </div>
              <div className="w-px h-6 bg-gray-200 dark:bg-gray-700" />
              <div className="flex items-center gap-2">
                <span className="text-xl font-extrabold text-gray-900 dark:text-white">TS</span>
                <span className="text-xs text-gray-500 dark:text-gray-400 leading-tight">TypeScript</span>
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="absolute inset-4 rounded-3xl bg-accent-500/8 dark:bg-accent-500/15 blur-2xl" />
            <div className="relative rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 shadow-2xl shadow-gray-900/10 dark:shadow-gray-950/50 overflow-hidden">
              <div className="h-10 bg-gray-50 dark:bg-gray-800 border-b border-gray-100 dark:border-gray-700 flex items-center gap-3 px-4">
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-red-400" />
                  <div className="w-3 h-3 rounded-full bg-amber-400" />
                  <div className="w-3 h-3 rounded-full bg-green-400" />
                </div>
                <div className="flex-1 h-6 rounded-lg bg-gray-200 dark:bg-gray-700 flex items-center px-3 gap-2">
                  <div className="w-2 h-2 rounded-sm bg-gray-400" />
                  <span className="text-[10px] text-gray-400 font-mono">sriio.dev/blocks</span>
                </div>
              </div>

              <div className="p-4 bg-gray-50/50 dark:bg-gray-800/30">
                <div className="relative">
                  <div className="grid grid-cols-2 gap-2.5">
                    <div className="rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden bg-white dark:bg-gray-800 group/card cursor-pointer hover:border-accent-300 dark:hover:border-accent-600 transition-all">
                      <div className="h-16 bg-gradient-to-br from-emerald-50 to-teal-50 dark:from-emerald-900/20 dark:to-teal-900/20 flex items-end gap-1 px-3 pb-2">
                        <div className="w-3 h-4 rounded-sm bg-emerald-300 dark:bg-emerald-600" />
                        <div className="w-3 h-6 rounded-sm bg-teal-300 dark:bg-teal-600" />
                        <div className="w-3 h-3 rounded-sm bg-emerald-400 dark:bg-emerald-500" />
                        <div className="w-3 h-7 rounded-sm bg-teal-400 dark:bg-teal-500" />
                        <div className="w-3 h-5 rounded-sm bg-emerald-300 dark:bg-emerald-600" />
                      </div>
                      <div className="p-1.5">
                        <span className="text-[8px] font-semibold text-gray-700 dark:text-gray-300">Dashboard</span>
                      </div>
                    </div>

                    <div className="rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden bg-white dark:bg-gray-800 group/card cursor-pointer hover:border-accent-300 dark:hover:border-accent-600 transition-all">
                      <div className="h-16 bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 flex flex-col items-center justify-center gap-1.5 px-4">
                        <div className="w-16 h-1.5 rounded-full bg-blue-300 dark:bg-blue-600" />
                        <div className="w-10 h-1 rounded-full bg-indigo-200 dark:bg-indigo-700" />
                        <div className="flex gap-1.5 mt-0.5">
                          <div className="w-5 h-2 rounded bg-blue-400 dark:bg-blue-500" />
                          <div className="w-5 h-2 rounded bg-indigo-200 dark:bg-indigo-700" />
                        </div>
                      </div>
                      <div className="p-1.5">
                        <span className="text-[8px] font-semibold text-gray-700 dark:text-gray-300">Hero</span>
                      </div>
                    </div>

                    <div className="rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden bg-white dark:bg-gray-800 group/card cursor-pointer hover:border-accent-300 dark:hover:border-accent-600 transition-all">
                      <div className="h-16 bg-gradient-to-br from-violet-50 to-purple-50 dark:from-violet-900/20 dark:to-purple-900/20 flex flex-col justify-center gap-1.5 px-3">
                        <div className="w-full h-2 rounded bg-violet-200 dark:bg-violet-800 border border-violet-300 dark:border-violet-700" />
                        <div className="w-full h-2 rounded bg-purple-200 dark:bg-purple-800 border border-purple-300 dark:border-purple-700" />
                        <div className="w-10 h-2.5 rounded bg-violet-400 dark:bg-violet-500" />
                      </div>
                      <div className="p-1.5">
                        <span className="text-[8px] font-semibold text-gray-700 dark:text-gray-300">Forms</span>
                      </div>
                    </div>

                    <div className="rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden bg-white dark:bg-gray-800 group/card cursor-pointer hover:border-accent-300 dark:hover:border-accent-600 transition-all">
                      <div className="h-16 bg-gradient-to-br from-accent-50 to-blue-50 dark:from-accent-900/20 dark:to-blue-900/20 flex items-center justify-center">
                        <div className="w-14 rounded-lg border border-accent-200 dark:border-accent-700 bg-white/80 dark:bg-gray-800/80 p-1.5 flex flex-col gap-1">
                          <div className="w-full h-1 rounded-full bg-accent-300 dark:bg-accent-600" />
                          <div className="w-3/4 h-1 rounded-full bg-blue-200 dark:bg-blue-700" />
                          <div className="w-full h-2 rounded bg-accent-400 dark:bg-accent-500 mt-0.5" />
                        </div>
                      </div>
                      <div className="p-1.5">
                        <span className="text-[8px] font-semibold text-gray-700 dark:text-gray-300">Auth</span>
                      </div>
                    </div>

                    <div className="rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden bg-white dark:bg-gray-800 group/card cursor-pointer hover:border-accent-300 dark:hover:border-accent-600 transition-all">
                      <div className="h-16 bg-gradient-to-br from-amber-50 to-yellow-50 dark:from-amber-900/20 dark:to-yellow-900/20 flex items-end justify-center gap-1.5 pb-2 px-3">
                        <div className="flex-1 flex flex-col items-center gap-0.5">
                          <div className="w-full h-5 rounded-t bg-amber-200 dark:bg-amber-800 border border-amber-300 dark:border-amber-700" />
                          <span className="text-[6px] text-amber-600 dark:text-amber-400 font-medium">Free</span>
                        </div>
                        <div className="flex-1 flex flex-col items-center gap-0.5">
                          <div className="w-full h-8 rounded-t bg-amber-400 dark:bg-amber-600 border border-amber-500 dark:border-amber-500" />
                          <span className="text-[6px] text-amber-700 dark:text-amber-300 font-bold">Pro</span>
                        </div>
                        <div className="flex-1 flex flex-col items-center gap-0.5">
                          <div className="w-full h-6 rounded-t bg-yellow-300 dark:bg-yellow-800 border border-yellow-400 dark:border-yellow-700" />
                          <span className="text-[6px] text-yellow-600 dark:text-yellow-400 font-medium">Ent</span>
                        </div>
                      </div>
                      <div className="p-1.5">
                        <span className="text-[8px] font-semibold text-gray-700 dark:text-gray-300">Pricing</span>
                      </div>
                    </div>

                    <div className="rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden bg-white dark:bg-gray-800 group/card cursor-pointer hover:border-accent-300 dark:hover:border-accent-600 transition-all">
                      <div className="h-16 bg-gradient-to-br from-cyan-50 to-sky-50 dark:from-cyan-900/20 dark:to-sky-900/20 flex flex-col justify-start gap-1.5 px-3 pt-3">
                        <div className="flex items-center gap-1.5">
                          <div className="w-2 h-2 rounded-sm bg-cyan-400 dark:bg-cyan-600" />
                          <div className="flex-1 h-1 rounded-full bg-cyan-200 dark:bg-cyan-800" />
                          <div className="flex gap-0.5">
                            <div className="w-3 h-1 rounded-full bg-sky-200 dark:bg-sky-800" />
                            <div className="w-3 h-1 rounded-full bg-sky-200 dark:bg-sky-800" />
                            <div className="w-3 h-1 rounded-full bg-sky-200 dark:bg-sky-800" />
                          </div>
                        </div>
                        <div className="w-full h-px bg-cyan-100 dark:bg-cyan-900" />
                      </div>
                      <div className="p-1.5">
                        <span className="text-[8px] font-semibold text-gray-700 dark:text-gray-300">Navigation</span>
                      </div>
                    </div>
                  </div>

                  <div className="absolute -top-3 -right-3 flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-md text-[10px] font-semibold text-gray-700 dark:text-gray-300">
                    <Zap size={10} className="text-accent-500" />
                    Zero deps
                  </div>
                  <div className="absolute -bottom-3 -left-3 flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-md text-[10px] font-semibold text-gray-700 dark:text-gray-300">
                    <Copy size={10} className="text-emerald-500" />
                    Copy & paste
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
