import { Github, Twitter, Zap, Heart, Users, Code2 } from 'lucide-react'

export default function AboutPage() {
  const stats = [
    { value: '27+', label: 'Components' },
    { value: '47+', label: 'UI Blocks' },
    { value: '100%', label: 'TypeScript' },
    { value: 'MIT', label: 'License' },
  ]

  const values = [
    { icon: <Code2 size={18} />, title: 'Developer first', desc: 'Every design decision is made with the developer experience in mind. Clean APIs, readable code, zero magic.', color: 'bg-accent-50 dark:bg-accent-500/10 text-accent-500' },
    { icon: <Heart size={18} />, title: 'Quality over quantity', desc: 'We ship fewer, better components. Each one is polished, accessible, and covers real production use cases.', color: 'bg-rose-50 dark:bg-rose-500/10 text-rose-500' },
    { icon: <Users size={18} />, title: 'Open source forever', desc: 'SRIIO UI is MIT licensed and will always be free. No paywalls, no attribution required, no subscriptions.', color: 'bg-emerald-50 dark:bg-emerald-500/10 text-emerald-500' },
  ]

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
      <div className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800">
        <div className="layout-container pt-24 pb-16 lg:pt-28 lg:pb-24">
          <div className="max-w-2xl">
            <div className="flex items-center justify-center w-12 h-12 rounded-2xl bg-accent-500 shadow-md shadow-accent-500/25 mb-6">
              <Zap size={22} className="text-white" />
            </div>
            <p className="text-xs font-semibold uppercase tracking-widest text-accent-500 mb-3">About</p>
            <h1 className="text-3xl lg:text-5xl font-extrabold text-gray-900 dark:text-white tracking-tight mb-5 leading-tight">
              Built for developers<br />who care about craft
            </h1>
            <p className="text-gray-500 dark:text-gray-400 text-lg leading-relaxed">
              SRIIO UI is a modern component library and block system for React and Next.js.
              Built with Tailwind CSS, fully typed with TypeScript, and designed to feel both
              beautiful and developer-friendly out of the box.
            </p>
          </div>
        </div>
      </div>

      <div className="layout-container py-12 space-y-10">
        {/* Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {stats.map((s, i) => (
            <div key={i} className="p-6 rounded-2xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 text-center shadow-sm">
              <div className="text-3xl font-extrabold text-gray-900 dark:text-white mb-1">{s.value}</div>
              <div className="text-xs text-gray-500 dark:text-gray-400 font-medium">{s.label}</div>
            </div>
          ))}
        </div>

        {/* Values */}
        <div className="grid sm:grid-cols-3 gap-5">
          {values.map((v, i) => (
            <div key={i} className="p-6 rounded-2xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 shadow-sm">
              <div className={`w-9 h-9 rounded-xl ${v.color} flex items-center justify-center mb-4`}>{v.icon}</div>
              <h3 className="text-sm font-bold text-gray-900 dark:text-white mb-2">{v.title}</h3>
              <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed">{v.desc}</p>
            </div>
          ))}
        </div>

        {/* Links */}
        <div className="p-8 rounded-2xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-6">
          <div>
            <h3 className="text-base font-bold text-gray-900 dark:text-white mb-1">Get involved</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">Star the repo, open issues, submit PRs — all contributions are welcome.</p>
          </div>
          <div className="flex gap-3 flex-shrink-0">
            <a href="https://github.com/mranshyadav/Design-System" target="_blank" rel="noreferrer"
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gray-900 dark:bg-white hover:bg-gray-800 dark:hover:bg-gray-100 text-white dark:text-gray-900 text-sm font-semibold transition-colors shadow-sm">
              <Github size={15} /> GitHub
            </a>
            <a href="https://twitter.com" target="_blank" rel="noreferrer"
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-sky-500 hover:bg-sky-600 text-white text-sm font-semibold transition-colors shadow-sm">
              <Twitter size={15} /> Twitter
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
