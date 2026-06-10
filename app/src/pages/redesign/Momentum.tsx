// Variant B — "Momentum": focused study-app energy. Chunky tactile buttons with hard
// offset shadows, progress ring, emerald + amber pops, Outfit type, big rounded shapes.

import { SAMPLE_QUESTION as Q, SAMPLE_CARD as C, SAMPLE_ELEMENTS, STATS } from './shared'
import { cn } from '../../lib/format'

const font = { fontFamily: "'Outfit', 'Inter', sans-serif" }

function Chunky({
  children,
  tone = 'emerald',
  className,
}: {
  children: React.ReactNode
  tone?: 'emerald' | 'white' | 'amber'
  className?: string
}) {
  const tones = {
    emerald:
      'bg-emerald-500 text-white border-emerald-700 shadow-[0_5px_0_0] shadow-emerald-700 hover:bg-emerald-400',
    amber: 'bg-amber-400 text-amber-950 border-amber-600 shadow-[0_5px_0_0] shadow-amber-600 hover:bg-amber-300',
    white:
      'bg-white text-slate-700 border-slate-300 shadow-[0_5px_0_0] shadow-slate-300 hover:bg-slate-50 dark:bg-slate-800 dark:text-slate-100 dark:border-slate-600 dark:shadow-slate-600 dark:hover:bg-slate-700',
  }
  return (
    <button
      className={cn(
        'rounded-2xl border-2 px-6 py-3 font-bold uppercase tracking-wide transition active:translate-y-[3px] active:shadow-none',
        tones[tone],
        className,
      )}
      style={font}
    >
      {children}
    </button>
  )
}

function Ring({ pct }: { pct: number }) {
  const r = 42
  const circ = 2 * Math.PI * r
  return (
    <svg viewBox="0 0 100 100" className="h-28 w-28 -rotate-90">
      <circle cx="50" cy="50" r={r} fill="none" strokeWidth="11" className="stroke-slate-200 dark:stroke-slate-700" />
      <circle
        cx="50"
        cy="50"
        r={r}
        fill="none"
        strokeWidth="11"
        strokeLinecap="round"
        strokeDasharray={circ}
        strokeDashoffset={circ * (1 - pct / 100)}
        className="stroke-emerald-500"
      />
    </svg>
  )
}

export default function Momentum() {
  return (
    <div className="min-h-screen bg-[#f4f8f4] pb-28 text-slate-800 dark:bg-[#0f1714] dark:text-slate-100" style={font}>
      {/* Nav */}
      <header className="mx-auto flex max-w-5xl items-center gap-4 px-6 py-5">
        <span className="flex items-center gap-2 text-xl font-extrabold">
          <span className="grid h-10 w-10 place-items-center rounded-2xl border-2 border-emerald-700 bg-emerald-500 text-lg text-white shadow-[0_4px_0_0] shadow-emerald-700">
            🎯
          </span>
          CIRO&nbsp;Prep
        </span>
        <nav className="ml-auto hidden items-center gap-5 text-sm font-bold uppercase tracking-wide text-slate-400 md:flex">
          <span className="text-emerald-600 dark:text-emerald-400">Drill</span>
          <span className="cursor-pointer hover:text-slate-600 dark:hover:text-slate-200">Mock</span>
          <span className="cursor-pointer hover:text-slate-600 dark:hover:text-slate-200">Cards</span>
          <span className="cursor-pointer hover:text-slate-600 dark:hover:text-slate-200">Progress</span>
        </nav>
        <span className="ml-2 flex items-center gap-1.5 rounded-2xl border-2 border-amber-300 bg-amber-100 px-3 py-1.5 text-sm font-extrabold text-amber-700 dark:border-amber-600/50 dark:bg-amber-500/10 dark:text-amber-400">
          🔥 6 day streak
        </span>
      </header>

      <main className="mx-auto max-w-5xl space-y-10 px-6 pt-6">
        {/* Hero / session header */}
        <section className="flex flex-col items-center gap-8 rounded-[2rem] border-2 border-slate-200 bg-white p-8 dark:border-slate-700 dark:bg-slate-900 md:flex-row">
          <div className="relative grid place-items-center">
            <Ring pct={STATS.accuracy} />
            <div className="absolute text-center">
              <p className="text-2xl font-extrabold text-emerald-600 dark:text-emerald-400">{STATS.accuracy}%</p>
              <p className="text-[10px] font-bold uppercase text-slate-400">accuracy</p>
            </div>
          </div>
          <div className="flex-1 text-center md:text-left">
            <h1 className="text-3xl font-extrabold leading-tight md:text-4xl">
              You're <span className="text-emerald-500">{STATS.attempted}</span> questions in.
              <br />
              Keep the streak alive.
            </h1>
            <p className="mt-2 font-medium text-slate-400">
              {STATS.questions} questions · {STATS.cards} flashcards · every answer explained
            </p>
            <div className="mt-5 flex flex-wrap justify-center gap-3 md:justify-start">
              <Chunky>Continue drilling</Chunky>
              <Chunky tone="white">Mock exam</Chunky>
            </div>
          </div>
          <div className="grid grid-cols-3 gap-3 md:grid-cols-1">
            {[
              [`${STATS.mocks}`, 'mocks taken'],
              [`${STATS.lastMock}%`, 'last mock'],
              ['23', 'to review'],
            ].map(([v, l]) => (
              <div key={l} className="rounded-2xl bg-slate-100 px-4 py-2.5 text-center dark:bg-slate-800">
                <p className="text-xl font-extrabold">{v}</p>
                <p className="text-[10px] font-bold uppercase tracking-wide text-slate-400">{l}</p>
              </div>
            ))}
          </div>
        </section>

        {/* In-drill question — content-first, chrome minimized */}
        <section className="mx-auto max-w-3xl">
          <div className="mb-4 flex items-center gap-3">
            <span className="text-sm font-extrabold text-slate-400">4 / 25</span>
            <div className="h-4 flex-1 overflow-hidden rounded-full border-2 border-slate-200 bg-white dark:border-slate-700 dark:bg-slate-800">
              <div className="h-full w-[48%] rounded-full bg-gradient-to-r from-emerald-400 to-emerald-500" />
            </div>
            <span className="rounded-xl bg-emerald-100 px-2.5 py-1 text-xs font-extrabold uppercase text-emerald-700 dark:bg-emerald-500/15 dark:text-emerald-400">
              E{Q.element} · {Q.outcome}
            </span>
          </div>

          <div className="rounded-[2rem] border-2 border-slate-200 bg-white p-8 dark:border-slate-700 dark:bg-slate-900">
            <p className="text-xl font-bold leading-relaxed md:text-2xl">{Q.stem}</p>
            <div className="mt-6 space-y-3">
              {Object.entries(Q.options).map(([k, v]) => {
                const correct = k === Q.answer
                const chosen = k === 'D'
                return (
                  <button
                    key={k}
                    className={cn(
                      'flex w-full items-start gap-3 rounded-2xl border-2 p-4 text-left text-sm font-semibold transition',
                      correct
                        ? 'border-emerald-500 bg-emerald-50 shadow-[0_4px_0_0] shadow-emerald-500 dark:bg-emerald-500/10'
                        : chosen
                          ? 'border-rose-400 bg-rose-50 dark:bg-rose-500/10'
                          : 'border-slate-200 bg-white hover:border-emerald-300 dark:border-slate-700 dark:bg-slate-800',
                    )}
                  >
                    <span
                      className={cn(
                        'grid h-8 w-8 flex-none place-items-center rounded-xl border-2 text-sm font-extrabold',
                        correct
                          ? 'border-emerald-600 bg-emerald-500 text-white'
                          : chosen
                            ? 'border-rose-500 bg-rose-400 text-white'
                            : 'border-slate-300 text-slate-400 dark:border-slate-600',
                      )}
                    >
                      {k}
                    </span>
                    <span className="pt-1">{v}</span>
                    {correct && <span className="ml-auto pt-1 text-lg">✅</span>}
                  </button>
                )
              })}
            </div>
            <div className="mt-6 rounded-2xl border-2 border-emerald-200 bg-emerald-50 p-5 dark:border-emerald-500/30 dark:bg-emerald-500/10">
              <p className="font-extrabold text-emerald-700 dark:text-emerald-400">Nice — B it is. Here's why:</p>
              <p className="mt-1.5 text-sm font-medium leading-relaxed text-slate-600 dark:text-slate-300">{Q.rationale}</p>
              <div className="mt-3 flex flex-wrap gap-1.5">
                {Q.rule_refs.map((r) => (
                  <span
                    key={r}
                    className="rounded-lg bg-white px-2 py-1 text-xs font-bold text-slate-500 dark:bg-slate-800 dark:text-slate-300"
                  >
                    {r}
                  </span>
                ))}
              </div>
            </div>
            <div className="mt-6 flex justify-end">
              <Chunky>Next →</Chunky>
            </div>
          </div>
        </section>

        {/* Flashcard + weak areas */}
        <section className="grid gap-6 md:grid-cols-2">
          <div className="rounded-[2rem] border-2 border-amber-300 bg-amber-50 p-7 dark:border-amber-500/40 dark:bg-amber-500/10">
            <p className="text-xs font-extrabold uppercase tracking-widest text-amber-600 dark:text-amber-400">
              ⚠️ Trap card · {C.outcome}
            </p>
            <p className="mt-3 text-lg font-bold leading-snug">{C.front}</p>
            <p className="mt-3 text-sm font-medium text-slate-500 dark:text-slate-300">{C.back}</p>
            <div className="mt-5 flex gap-3">
              <Chunky tone="white" className="!px-4 !py-2 text-xs">
                Again
              </Chunky>
              <Chunky tone="amber" className="!px-4 !py-2 text-xs">
                Got it!
              </Chunky>
            </div>
          </div>
          <div className="rounded-[2rem] border-2 border-slate-200 bg-white p-7 dark:border-slate-700 dark:bg-slate-900">
            <p className="font-extrabold">Your weakest spots</p>
            <div className="mt-4 space-y-4">
              {SAMPLE_ELEMENTS.map((e) => (
                <div key={e.id}>
                  <div className="mb-1.5 flex justify-between text-sm font-bold">
                    <span>
                      E{e.id} {e.title}
                    </span>
                    <span className={e.pct < 70 ? 'text-rose-500' : 'text-emerald-500'}>{e.pct}%</span>
                  </div>
                  <div className="h-3.5 overflow-hidden rounded-full bg-slate-100 dark:bg-slate-800">
                    <div
                      className={cn('h-full rounded-full', e.pct < 70 ? 'bg-rose-400' : 'bg-emerald-400')}
                      style={{ width: `${e.pct}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
            <Chunky className="mt-6 w-full !py-2.5 text-sm">Fix Element 4 →</Chunky>
          </div>
        </section>
      </main>
    </div>
  )
}
