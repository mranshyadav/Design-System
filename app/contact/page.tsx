'use client'
import { useState } from 'react'
import { Mail, Github, Twitter, MessageSquare, Send, Check } from 'lucide-react'

export default function ContactPage() {
  const [sent, setSent] = useState(false)
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSent(true)
  }

  const channels = [
    { icon: <Github size={18} />, label: 'GitHub Issues', desc: 'Bug reports & feature requests', href: 'https://github.com/mranshyadav/Design-System/issues', color: 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300' },
    { icon: <Twitter size={18} />, label: 'Twitter / X', desc: 'Updates and announcements', href: 'https://twitter.com', color: 'bg-sky-50 dark:bg-sky-500/10 text-sky-600 dark:text-sky-400' },
    { icon: <MessageSquare size={18} />, label: 'Discussions', desc: 'Community Q&A on GitHub', href: 'https://github.com/mranshyadav/Design-System/discussions', color: 'bg-violet-50 dark:bg-violet-500/10 text-violet-600 dark:text-violet-400' },
  ]

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
      <div className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800">
        <div className="max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-12 2xl:px-16 pt-24 pb-16 lg:pt-28 lg:pb-20">
          <p className="text-xs font-semibold uppercase tracking-widest text-accent-500 mb-3">Contact</p>
          <h1 className="text-3xl lg:text-4xl font-extrabold text-gray-900 dark:text-white tracking-tight mb-3">Get in touch</h1>
          <p className="text-gray-500 dark:text-gray-400 text-lg max-w-xl">Have a question, found a bug, or want to contribute? We'd love to hear from you.</p>
        </div>
      </div>

      <div className="max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-12 2xl:px-16 py-12">
        <div className="grid lg:grid-cols-[1fr_380px] gap-8">

          {/* Form */}
          <div className="p-8 rounded-2xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 shadow-sm">
            {sent ? (
              <div className="flex flex-col items-center justify-center py-16 text-center">
                <div className="w-14 h-14 rounded-2xl bg-emerald-50 dark:bg-emerald-500/10 flex items-center justify-center mb-4">
                  <Check size={26} className="text-emerald-500" />
                </div>
                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">Message sent!</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">Thanks for reaching out. We'll get back to you shortly.</p>
              </div>
            ) : (
              <>
                <h2 className="text-base font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2"><Mail size={16} className="text-accent-500" /> Send a message</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid sm:grid-cols-2 gap-4">
                    {[{id:'name',label:'Name',placeholder:'Your name'},{id:'email',label:'Email',placeholder:'you@example.com',type:'email'}].map(f => (
                      <div key={f.id}>
                        <label className="block text-xs font-semibold text-gray-600 dark:text-gray-400 mb-1.5">{f.label}</label>
                        <input
                          type={f.type ?? 'text'}
                          required
                          placeholder={f.placeholder}
                          value={form[f.id as keyof typeof form]}
                          onChange={e => setForm(p => ({ ...p, [f.id]: e.target.value }))}
                          className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-sm text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-accent-500/20 focus:border-accent-500 transition-all"
                        />
                      </div>
                    ))}
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-gray-600 dark:text-gray-400 mb-1.5">Subject</label>
                    <input
                      type="text"
                      required
                      placeholder="What's this about?"
                      value={form.subject}
                      onChange={e => setForm(p => ({ ...p, subject: e.target.value }))}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-sm text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-accent-500/20 focus:border-accent-500 transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-gray-600 dark:text-gray-400 mb-1.5">Message</label>
                    <textarea
                      required
                      rows={5}
                      placeholder="Describe your question or issue..."
                      value={form.message}
                      onChange={e => setForm(p => ({ ...p, message: e.target.value }))}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-sm text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-accent-500/20 focus:border-accent-500 transition-all resize-none"
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-accent-500 hover:bg-accent-600 text-white text-sm font-semibold transition-all shadow-sm shadow-accent-500/20 hover:shadow-md hover:shadow-accent-500/25 hover:-translate-y-0.5"
                  >
                    <Send size={14} /> Send message
                  </button>
                </form>
              </>
            )}
          </div>

          {/* Channels */}
          <div className="space-y-4">
            <h2 className="text-sm font-bold text-gray-900 dark:text-white">Other ways to reach us</h2>
            {channels.map((c, i) => (
              <a key={i} href={c.href} target="_blank" rel="noreferrer"
                className="flex items-center gap-4 p-5 rounded-2xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 shadow-sm hover:border-accent-200 dark:hover:border-accent-700 hover:shadow-md transition-all duration-200 group">
                <div className={`w-10 h-10 rounded-xl ${c.color} flex items-center justify-center flex-shrink-0`}>{c.icon}</div>
                <div className="min-w-0">
                  <p className="text-sm font-semibold text-gray-900 dark:text-white group-hover:text-accent-500 transition-colors">{c.label}</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">{c.desc}</p>
                </div>
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
