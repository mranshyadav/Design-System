export function PreviewMockup({ category }: { category: string }) {
  const illustrations: Record<string, React.ReactNode> = {
    hero: (
      <div className="w-full h-full bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-950/30 dark:to-indigo-950/30 flex items-center justify-center overflow-hidden relative">
        <div className="absolute rounded-full bg-blue-300/20 dark:bg-blue-500/10 blur-2xl w-32 h-32 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
        <div className="relative flex flex-col items-center gap-2 w-full px-8">
          <div className="px-2 rounded-full bg-accent-500/10 text-accent-500 text-[8px] font-semibold py-0.5 mb-1">Introducing v2.0</div>
          <div className="h-2.5 rounded-full bg-gray-300 dark:bg-gray-600 w-3/5" />
          <div className="h-1.5 rounded-full bg-gray-200 dark:bg-gray-700 w-2/3" />
          <div className="h-1.5 rounded-full bg-gray-200 dark:bg-gray-700 w-1/2" />
          <div className="flex gap-2 mt-2">
            <div className="h-5 w-16 rounded-lg bg-accent-500/40" />
            <div className="h-5 w-14 rounded-lg border border-gray-300 dark:border-gray-600" />
          </div>
        </div>
      </div>
    ),

    dashboard: (
      <div className="w-full h-full bg-gray-50 dark:bg-gray-800/50 flex flex-col overflow-hidden">
        <div className="h-5 bg-white dark:bg-gray-800 border-b border-gray-100 dark:border-gray-700 flex items-center px-3 gap-1.5 flex-shrink-0">
          <div className="w-1.5 h-1.5 rounded-full bg-gray-200 dark:bg-gray-600" />
          <div className="w-1.5 h-1.5 rounded-full bg-gray-200 dark:bg-gray-600" />
          <div className="w-1.5 h-1.5 rounded-full bg-gray-200 dark:bg-gray-600" />
          <div className="flex-1 h-1.5 rounded-full bg-gray-100 dark:bg-gray-700 mx-2" />
        </div>
        <div className="flex-1 p-2 flex flex-col gap-2 overflow-hidden">
          <div className="grid grid-cols-4 gap-1.5">
            {['bg-accent-500/30', 'bg-emerald-500/30', 'bg-amber-500/30', 'bg-rose-500/30'].map((color, i) => (
              <div key={i} className="rounded-md bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 overflow-hidden">
                <div className={`h-0.5 w-full ${color}`} />
                <div className="p-1.5 flex flex-col gap-1">
                  <div className="h-1 rounded-full bg-gray-200 dark:bg-gray-700 w-full" />
                  <div className="h-1.5 rounded-full bg-gray-300 dark:bg-gray-600 w-2/3" />
                  {i === 0 && (
                    <div className="flex items-end gap-px h-2 mt-0.5">
                      {[4, 7, 5, 8, 6].map((h, j) => (
                        <div key={j} className="flex-1 rounded-sm bg-accent-500/40" style={{ height: `${h * 12.5}%` }} />
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
          <div className="flex gap-2 flex-1 overflow-hidden">
            <div className="flex-[3] bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-md p-1.5 flex flex-col gap-1 overflow-hidden">
              <div className="h-1 rounded-full bg-gray-200 dark:bg-gray-700 w-1/3" />
              <div className="flex-1 flex items-end gap-0.5 pt-1">
                {[55, 80, 45, 90, 60, 75, 40, 85, 70, 65].map((h, i) => (
                  <div key={i} className="flex-1 rounded-sm bg-accent-500/40" style={{ height: `${h}%` }} />
                ))}
              </div>
            </div>
            <div className="flex-[2] bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-md p-1.5 flex flex-col gap-1.5 overflow-hidden">
              <div className="h-1 rounded-full bg-gray-200 dark:bg-gray-700 w-2/3" />
              {[1, 2, 3].map(i => (
                <div key={i} className="flex items-center gap-1">
                  <div className="w-3 h-3 rounded-full bg-gray-200 dark:bg-gray-700 flex-shrink-0" />
                  <div className="flex flex-col gap-0.5 flex-1">
                    <div className="h-1 rounded-full bg-gray-200 dark:bg-gray-700 w-full" />
                    <div className="h-1 rounded-full bg-gray-100 dark:bg-gray-800 w-2/3" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    ),

    tables: (
      <div className="w-full h-full bg-white dark:bg-gray-900 flex flex-col overflow-hidden p-2">
        <div className="rounded-lg border border-gray-100 dark:border-gray-700 overflow-hidden flex flex-col flex-1">
          <div className="flex items-center gap-2 px-2 py-1.5 bg-gray-50 dark:bg-gray-800 border-b border-gray-100 dark:border-gray-700">
            <div className="w-2.5 h-2.5 rounded-sm border border-gray-300 dark:border-gray-600 flex-shrink-0" />
            <div className="h-1.5 rounded-full bg-gray-300 dark:bg-gray-600 w-16" />
            <div className="h-1.5 rounded-full bg-gray-200 dark:bg-gray-700 w-12" />
            <div className="h-1.5 rounded-full bg-gray-200 dark:bg-gray-700 w-10" />
            <div className="h-1.5 rounded-full bg-gray-200 dark:bg-gray-700 w-8 ml-auto" />
          </div>
          {[
            { status: 'bg-emerald-100 dark:bg-emerald-900/40 text-emerald-600', label: 'Active' },
            { status: 'bg-amber-100 dark:bg-amber-900/40 text-amber-600', label: 'Pending' },
            { status: 'bg-red-100 dark:bg-red-900/40 text-red-600', label: 'Failed' },
            { status: 'bg-emerald-100 dark:bg-emerald-900/40 text-emerald-600', label: 'Active' },
          ].map((row, i) => (
            <div key={i} className="flex items-center gap-2 px-2 py-1.5 border-b border-gray-50 dark:border-gray-800 last:border-0">
              <div className="w-2.5 h-2.5 rounded-sm border border-gray-200 dark:border-gray-700 flex-shrink-0" />
              <div className="h-1.5 rounded-full bg-gray-200 dark:bg-gray-700 w-14" />
              <div className={`px-1.5 py-0.5 rounded-full text-[6px] font-semibold ${row.status}`}>{row.label}</div>
              <div className="h-1.5 rounded-full bg-gray-100 dark:bg-gray-800 w-10 ml-auto" />
            </div>
          ))}
          <div className="flex items-center justify-center gap-1 px-2 py-1.5 mt-auto border-t border-gray-100 dark:border-gray-700">
            <div className="w-4 h-3 rounded border border-gray-200 dark:border-gray-700" />
            <div className="w-3 h-3 rounded bg-accent-500/20" />
            <div className="w-3 h-3 rounded border border-gray-200 dark:border-gray-700" />
            <div className="w-3 h-3 rounded border border-gray-200 dark:border-gray-700" />
            <div className="w-4 h-3 rounded border border-gray-200 dark:border-gray-700" />
          </div>
        </div>
      </div>
    ),

    forms: (
      <div className="w-full h-full bg-white dark:bg-gray-900 flex flex-col overflow-hidden p-3 gap-2">
        <div className="grid grid-cols-2 gap-2">
          {[1, 2].map(i => (
            <div key={i} className="flex flex-col gap-1">
              <div className="h-1 rounded-full bg-gray-400 dark:bg-gray-500 w-12" />
              <div className="h-6 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800" />
            </div>
          ))}
        </div>
        <div className="flex flex-col gap-1">
          <div className="h-1 rounded-full bg-gray-400 dark:bg-gray-500 w-10" />
          <div className="h-6 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 flex items-center justify-end px-2">
            <div className="w-2 h-2 border-r border-b border-gray-300 dark:border-gray-600 rotate-45 -mt-0.5" />
          </div>
        </div>
        <div className="flex flex-col gap-1">
          <div className="h-1 rounded-full bg-gray-400 dark:bg-gray-500 w-16" />
          <div className="h-6 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800" />
        </div>
        <div className="flex gap-2 mt-auto">
          <div className="h-6 flex-1 rounded-lg bg-accent-500/40" />
          <div className="h-6 flex-1 rounded-lg border border-gray-200 dark:border-gray-700" />
        </div>
      </div>
    ),

    authentication: (
      <div className="w-full h-full bg-white dark:bg-gray-900 flex items-center justify-center overflow-hidden relative">
        <div
          className="absolute inset-0 opacity-20 dark:opacity-10"
          style={{ backgroundImage: 'radial-gradient(circle, #9ca3af 1px, transparent 1px)', backgroundSize: '12px 12px' }}
        />
        <div className="relative bg-white dark:bg-gray-800 shadow-md rounded-xl p-3 w-36 mx-auto border border-gray-100 dark:border-gray-700">
          <div className="w-6 h-6 rounded-lg bg-accent-500 mx-auto mb-2" />
          <div className="h-2 rounded-full bg-gray-800 dark:bg-gray-200 w-3/4 mx-auto mb-1" />
          <div className="h-1.5 rounded-full bg-gray-200 dark:bg-gray-700 w-full mb-2.5" />
          <div className="flex flex-col gap-1.5 mb-2">
            <div className="h-5 rounded-lg border border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-700/50" />
            <div className="h-5 rounded-lg border border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-700/50" />
          </div>
          <div className="h-5 w-full rounded-lg bg-accent-500/40 mb-2" />
          <div className="flex items-center gap-1.5 mb-2">
            <div className="flex-1 h-px bg-gray-200 dark:bg-gray-700" />
            <div className="text-[6px] text-gray-400">or</div>
            <div className="flex-1 h-px bg-gray-200 dark:bg-gray-700" />
          </div>
          <div className="flex flex-col gap-1">
            {['bg-blue-500', 'bg-gray-800 dark:bg-gray-200'].map((color, i) => (
              <div key={i} className="h-5 border border-gray-200 dark:border-gray-600 rounded-lg flex items-center gap-1.5 px-2">
                <div className={`w-2.5 h-2.5 rounded-full ${color}`} />
                <div className="h-1 rounded-full bg-gray-200 dark:bg-gray-700 flex-1" />
              </div>
            ))}
          </div>
        </div>
      </div>
    ),

    navigation: (
      <div className="w-full h-full flex flex-col overflow-hidden">
        <div className="h-7 bg-white dark:bg-gray-800 border-b border-gray-100 dark:border-gray-700 flex items-center px-3 gap-2 flex-shrink-0">
          <div className="w-4 h-4 rounded-full bg-accent-500/40 flex-shrink-0" />
          <div className="flex gap-3 flex-1">
            {[14, 10, 12, 10].map((w, i) => (
              <div key={i} className="h-1.5 rounded-full bg-gray-200 dark:bg-gray-700" style={{ width: `${w}px` }} />
            ))}
          </div>
          <div className="w-5 h-5 rounded-full bg-gray-200 dark:bg-gray-700 flex-shrink-0" />
        </div>
        <div className="flex flex-1 overflow-hidden">
          <div className="w-14 bg-white dark:bg-gray-800 border-r border-gray-100 dark:border-gray-700 flex flex-col gap-1 p-1.5 flex-shrink-0">
            {[
              'bg-accent-500/20 border-accent-300 dark:border-accent-700',
              'border-transparent',
              'border-transparent',
              'border-transparent',
              'border-transparent',
            ].map((style, i) => (
              <div key={i} className={`h-5 rounded-md border ${style}`}>
                <div className="flex items-center gap-1 px-1.5 h-full">
                  <div className={`w-2 h-2 rounded-sm ${i === 0 ? 'bg-accent-500/40' : 'bg-gray-200 dark:bg-gray-700'}`} />
                  <div className={`h-1 rounded-full flex-1 ${i === 0 ? 'bg-accent-500/30' : 'bg-gray-100 dark:bg-gray-800'}`} />
                </div>
              </div>
            ))}
          </div>
          <div className="flex-1 bg-gray-50 dark:bg-gray-900 p-2 flex flex-col gap-2 overflow-hidden">
            <div className="grid grid-cols-3 gap-1.5">
              {[1, 2, 3].map(i => (
                <div key={i} className="rounded-md bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 p-1.5">
                  <div className="h-1.5 rounded-full bg-gray-200 dark:bg-gray-700 w-full mb-1" />
                  <div className="h-1 rounded-full bg-gray-100 dark:bg-gray-800 w-2/3" />
                </div>
              ))}
            </div>
            <div className="flex-1 rounded-md bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 p-1.5">
              <div className="h-1.5 rounded-full bg-gray-200 dark:bg-gray-700 w-1/3 mb-1.5" />
              <div className="h-1 rounded-full bg-gray-100 dark:bg-gray-800 w-full mb-1" />
              <div className="h-1 rounded-full bg-gray-100 dark:bg-gray-800 w-4/5" />
            </div>
          </div>
        </div>
      </div>
    ),

    pricing: (
      <div className="w-full h-full bg-gray-50 dark:bg-gray-900 flex items-center justify-center p-2 overflow-hidden">
        <div className="grid grid-cols-3 gap-1.5 w-full h-full">
          {[
            { bg: 'bg-white dark:bg-gray-800', border: 'border-gray-100 dark:border-gray-700', accent: false },
            { bg: 'bg-accent-500', border: 'border-accent-400', accent: true },
            { bg: 'bg-white dark:bg-gray-800', border: 'border-gray-100 dark:border-gray-700', accent: false },
          ].map((col, i) => (
            <div key={i} className={`${col.bg} rounded-xl border ${col.border} p-2 flex flex-col gap-1.5 overflow-hidden`}>
              <div className={`h-1.5 rounded-full w-2/3 ${col.accent ? 'bg-white/40' : 'bg-gray-200 dark:bg-gray-700'}`} />
              <div className={`h-3 rounded-md w-4/5 ${col.accent ? 'bg-white/50' : 'bg-gray-300 dark:bg-gray-600'}`} />
              <div className="flex flex-col gap-1 flex-1">
                {[1, 2, 3, 4].map(j => (
                  <div key={j} className="flex items-center gap-1">
                    <div className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${col.accent ? 'bg-white/60' : 'bg-emerald-400/60'}`} />
                    <div className={`h-1 rounded-full flex-1 ${col.accent ? 'bg-white/30' : 'bg-gray-100 dark:bg-gray-800'}`} />
                  </div>
                ))}
              </div>
              <div className={`h-4 rounded-lg w-full ${col.accent ? 'bg-white/20 border border-white/30' : 'bg-accent-500/20'}`} />
            </div>
          ))}
        </div>
      </div>
    ),

    cards: (
      <div className="w-full h-full bg-gray-50 dark:bg-gray-900 p-2 grid grid-cols-2 gap-1.5 overflow-hidden">
        {[
          { top: 'bg-accent-500/40', glow: true },
          { top: 'bg-emerald-400/40', glow: false },
          { top: 'bg-amber-400/40', glow: false },
          { top: 'bg-rose-400/40', glow: false },
        ].map((card, i) => (
          <div key={i} className={`rounded-xl border border-gray-100 dark:border-gray-700 bg-white dark:bg-gray-800 overflow-hidden flex flex-col ${card.glow ? 'shadow-md shadow-accent-500/10' : ''}`}>
            <div className={`h-1 w-full ${card.top}`} />
            <div className="p-2 flex flex-col gap-1.5 flex-1">
              <div className="h-1.5 rounded-full bg-gray-300 dark:bg-gray-600 w-3/4" />
              <div className="h-1 rounded-full bg-gray-200 dark:bg-gray-700 w-full" />
              <div className="flex items-center gap-1 mt-auto">
                <div className="w-3 h-3 rounded-full bg-gray-200 dark:bg-gray-700 flex-shrink-0" />
                <div className="h-1 rounded-full bg-gray-200 dark:bg-gray-700 flex-1" />
              </div>
            </div>
          </div>
        ))}
      </div>
    ),

    marketing: (
      <div className="w-full h-full bg-gradient-to-br from-gray-50 to-white dark:from-gray-900 dark:to-gray-800 p-2 overflow-hidden">
        <div className="grid grid-cols-3 gap-1.5 h-full">
          {[
            { icon: 'bg-blue-500', bg: 'bg-blue-50 dark:bg-blue-500/10' },
            { icon: 'bg-emerald-500', bg: 'bg-emerald-50 dark:bg-emerald-500/10' },
            { icon: 'bg-violet-500', bg: 'bg-violet-50 dark:bg-violet-500/10' },
            { icon: 'bg-amber-500', bg: 'bg-amber-50 dark:bg-amber-500/10' },
            { icon: 'bg-rose-500', bg: 'bg-rose-50 dark:bg-rose-500/10' },
            { icon: 'bg-cyan-500', bg: 'bg-cyan-50 dark:bg-cyan-500/10' },
          ].map((item, i) => (
            <div key={i} className="rounded-xl flex flex-col items-start p-2 gap-1.5">
              <div className={`w-7 h-7 rounded-lg ${item.bg} flex items-center justify-center flex-shrink-0`}>
                <div className={`w-3 h-3 rounded-sm ${item.icon} opacity-70`} />
              </div>
              <div className="h-1.5 rounded-full bg-gray-300 dark:bg-gray-600 w-full" />
              <div className="h-1 rounded-full bg-gray-200 dark:bg-gray-700 w-4/5" />
            </div>
          ))}
        </div>
      </div>
    ),

    settings: (
      <div className="w-full h-full bg-white dark:bg-gray-900 flex overflow-hidden">
        <div className="w-20 border-r border-gray-100 dark:border-gray-700 flex flex-col gap-1 p-2 flex-shrink-0">
          {[true, false, false, false, false].map((active, i) => (
            <div key={i} className={`h-5 rounded-md flex items-center px-1.5 ${active ? 'bg-accent-500' : 'bg-gray-50 dark:bg-gray-800'}`}>
              <div className={`h-1 rounded-full flex-1 ${active ? 'bg-white/60' : 'bg-gray-200 dark:bg-gray-700'}`} />
            </div>
          ))}
        </div>
        <div className="flex-1 p-3 flex flex-col gap-2 overflow-hidden">
          <div className="flex items-center gap-2 mb-1">
            <div className="w-8 h-8 rounded-full bg-gray-200 dark:bg-gray-700 flex-shrink-0" />
            <div className="flex flex-col gap-1">
              <div className="h-1.5 rounded-full bg-gray-300 dark:bg-gray-600 w-20" />
              <div className="h-1 rounded-full bg-gray-200 dark:bg-gray-700 w-16" />
            </div>
          </div>
          {[1, 2, 3].map(i => (
            <div key={i} className="flex flex-col gap-1">
              <div className="h-1 rounded-full bg-gray-400 dark:bg-gray-500 w-12" />
              <div className="h-5 rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50" />
            </div>
          ))}
          <div className="h-5 rounded-lg bg-accent-500/40 w-full mt-auto" />
        </div>
      </div>
    ),

    ecommerce: (
      <div className="w-full h-full bg-gray-50 dark:bg-gray-900 p-2 overflow-hidden">
        <div className="grid grid-cols-3 gap-1.5 h-full">
          {[
            'from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-600',
            'from-gray-200 to-gray-100 dark:from-gray-600 dark:to-gray-700',
            'from-gray-100 to-gray-300 dark:from-gray-700 dark:to-gray-600',
          ].map((grad, i) => (
            <div key={i} className="flex flex-col gap-1.5">
              <div className={`rounded-lg bg-gradient-to-b ${grad} h-16`} />
              <div className="h-1.5 rounded-full bg-gray-300 dark:bg-gray-600 w-full" />
              <div className="h-1 rounded-full bg-gray-200 dark:bg-gray-700 w-2/3" />
              <div className="h-1 rounded-full bg-accent-500/50 w-1/2" />
              <div className="h-4 w-full rounded-md bg-accent-500/90 flex items-center justify-center">
                <div className="h-1 rounded-full bg-white/60 w-2/3" />
              </div>
            </div>
          ))}
        </div>
      </div>
    ),

    footers: (
      <div className="w-full h-full bg-gray-900 flex flex-col overflow-hidden p-3">
        <div className="grid grid-cols-4 gap-3 flex-1">
          <div className="flex flex-col gap-1.5">
            <div className="w-6 h-6 rounded-lg bg-accent-500/40 mb-1" />
            <div className="h-1 rounded-full bg-gray-700 w-full" />
            <div className="h-1 rounded-full bg-gray-700 w-4/5" />
            <div className="flex gap-1.5 mt-1">
              <div className="w-4 h-4 rounded-full bg-gray-700" />
              <div className="w-4 h-4 rounded-full bg-gray-700" />
            </div>
          </div>
          {[1, 2, 3].map(col => (
            <div key={col} className="flex flex-col gap-1.5">
              <div className="h-1.5 rounded-full bg-gray-500 w-3/4 mb-1" />
              {[1, 2, 3, 4].map(i => (
                <div key={i} className="h-1 rounded-full bg-gray-700 w-full" />
              ))}
            </div>
          ))}
        </div>
        <div className="border-t border-gray-800 pt-2 mt-2">
          <div className="h-1 rounded-full bg-gray-700 w-1/3" />
        </div>
      </div>
    ),

    modals: (
      <div className="w-full h-full bg-gray-100 dark:bg-gray-900 flex items-center justify-center overflow-hidden relative">
        <div className="absolute inset-0 bg-black/10 dark:bg-black/30" />
        <div className="relative bg-white dark:bg-gray-800 shadow-xl rounded-xl p-3 mx-auto w-40 border border-gray-100 dark:border-gray-700">
          <div className="flex justify-center mb-2">
            <div className="w-8 h-8 rounded-full bg-red-100 dark:bg-red-900/30 flex items-center justify-center">
              <div className="w-3 h-3 relative">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-2.5 h-0.5 bg-red-500 rounded-full rotate-45 absolute" />
                  <div className="w-2.5 h-0.5 bg-red-500 rounded-full -rotate-45 absolute" />
                </div>
              </div>
            </div>
          </div>
          <div className="h-2 rounded-full bg-gray-800 dark:bg-gray-200 w-2/3 mx-auto mb-1.5" />
          <div className="h-1 rounded-full bg-gray-200 dark:bg-gray-700 w-full mb-1" />
          <div className="h-1 rounded-full bg-gray-200 dark:bg-gray-700 w-4/5 mx-auto mb-3" />
          <div className="flex gap-1.5">
            <div className="h-5 flex-1 rounded-lg border border-gray-200 dark:border-gray-600" />
            <div className="h-5 flex-1 rounded-lg bg-red-500/80" />
          </div>
        </div>
      </div>
    ),
  }

  const illustration = illustrations[category] ?? (
    <div className="w-full h-full flex items-center justify-center">
      <span className="text-2xl text-gray-300 dark:text-gray-700">◈</span>
    </div>
  )

  return (
    <div className="w-full h-full overflow-hidden">
      {illustration}
    </div>
  )
}
