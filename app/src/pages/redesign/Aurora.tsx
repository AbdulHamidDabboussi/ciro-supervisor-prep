// Variant A — "Aurora": modern SaaS polish. Gradient mesh, glassmorphism, indigo→violet,
// Sora display type, soft depth and glow. Light + dark.

import { SAMPLE_QUESTION as Q, SAMPLE_CARD as C, SAMPLE_ELEMENTS, STATS } from './shared'
import { cn } from '../../lib/format'

const display = { fontFamily: "'Sora', 'Inter', sans-serif" }

export default function Aurora() {
  return (
    <div className="min-h-screen bg-slate-50 pb-28 text-slate-900 dark:bg-[#0b1020] dark:text-slate-100">
      {/* Nav */}
      <header className="sticky top-0 z-20 border-b border-white/40 bg-white/70 backdrop-blur-xl dark:border-white/5 dark:bg-[#0b1020]/70">
        <div className="mx-auto flex max-w-6xl items-center gap-8 px-6 py-4">
          <span className="flex items-center gap-2.5 font-bold" style={display}>
            <span className="grid h-8 w-8 place-items-center rounded-xl bg-gradient-to-br from-indigo-500 to-violet-600 text-sm text-white shadow-lg shadow-indigo-500/30">
              C
            </span>
            CIRO Prep
          </span>
          <nav className="hidden gap-1 text-sm font-medium text-slate-500 dark:text-slate-400 md:flex">
            {['Home', 'Drill', 'Mock exam', 'Flashcards', 'Progress'].map((n, i) => (
              <span
                key={n}
                className={cn(
                  'cursor-pointer rounded-lg px-3 py-1.5 transition hover:text-slate-900 dark:hover:text-white',
                  i === 0 && 'bg-indigo-50 text-indigo-600 dark:bg-indigo-500/10 dark:text-indigo-300',
                )}
              >
                {n}
              </span>
            ))}
          </nav>
          <button className="ml-auto rounded-xl bg-gradient-to-br from-indigo-500 to-violet-600 px-4 py-2 text-sm font-semibold text-white shadow-lg shadow-indigo-500/30 transition hover:shadow-indigo-500/50">
            Start studying
          </button>
        </div>
      </header>

      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="pointer-events-none absolute -top-40 left-1/2 h-[34rem] w-[60rem] -translate-x-1/2 rounded-full bg-gradient-to-br from-indigo-400/30 via-violet-400/20 to-fuchsia-400/30 blur-3xl dark:from-indigo-600/20 dark:via-violet-600/15 dark:to-fuchsia-600/20" />
        <div className="relative mx-auto max-w-6xl px-6 pb-16 pt-20 text-center">
          <span className="mb-5 inline-flex items-center gap-2 rounded-full border border-indigo-200/70 bg-white/60 px-4 py-1.5 text-xs font-semibold text-indigo-600 backdrop-blur dark:border-indigo-500/20 dark:bg-white/5 dark:text-indigo-300">
            <span className="h-1.5 w-1.5 rounded-full bg-indigo-500" /> {STATS.questions} questions · every answer explained
          </span>
          <h1 className="mx-auto max-w-3xl text-5xl font-extrabold leading-[1.1] tracking-tight" style={display}>
            Walk into the Supervisor Exam{' '}
            <span className="bg-gradient-to-r from-indigo-500 via-violet-500 to-fuchsia-500 bg-clip-text text-transparent">
              already sure
            </span>{' '}
            you'll pass.
          </h1>
          <p className="mx-auto mt-5 max-w-xl text-lg text-slate-500 dark:text-slate-400">
            Drill {STATS.questions} original questions with rule-cited rationales, run full timed mocks, and
            watch your weak areas close.
          </p>
          <div className="mt-8 flex justify-center gap-3">
            <button className="rounded-xl bg-gradient-to-br from-indigo-500 to-violet-600 px-6 py-3 font-semibold text-white shadow-xl shadow-indigo-500/30 transition hover:scale-[1.02]">
              Start drilling →
            </button>
            <button className="rounded-xl border border-slate-200 bg-white/70 px-6 py-3 font-semibold backdrop-blur transition hover:bg-white dark:border-white/10 dark:bg-white/5 dark:hover:bg-white/10">
              Take a mock exam
            </button>
          </div>
        </div>
      </section>

      <main className="mx-auto max-w-6xl space-y-12 px-6">
        {/* Stats — glass row */}
        <section className="grid grid-cols-2 gap-4 md:grid-cols-4">
          {[
            ['Attempted', `${STATS.attempted}`, `of ${STATS.questions}`],
            ['Accuracy', `${STATS.accuracy}%`, 'most recent answers'],
            ['Mock exams', `${STATS.mocks}`, `last ${STATS.lastMock}%`],
            ['Flashcards', `${STATS.cards}`, '9 element decks'],
          ].map(([l, v, s]) => (
            <div
              key={l}
              className="rounded-2xl border border-white/60 bg-white/60 p-5 shadow-[0_8px_30px_rgb(0,0,0,0.04)] backdrop-blur dark:border-white/5 dark:bg-white/5"
            >
              <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">{l}</p>
              <p className="mt-1 text-3xl font-bold" style={display}>
                {v}
              </p>
              <p className="text-xs text-slate-400">{s}</p>
            </div>
          ))}
        </section>

        {/* Question card */}
        <section className="grid gap-8 lg:grid-cols-[1fr_22rem]">
          <div className="rounded-3xl border border-white/60 bg-white/80 p-7 shadow-[0_8px_30px_rgb(0,0,0,0.06)] backdrop-blur dark:border-white/5 dark:bg-white/5">
            <div className="mb-5 flex flex-wrap items-center gap-2 text-xs font-semibold">
              <span className="rounded-full bg-indigo-50 px-3 py-1 text-indigo-600 dark:bg-indigo-500/10 dark:text-indigo-300">
                Element {Q.element} · Outcome {Q.outcome}
              </span>
              <span className="rounded-full bg-violet-50 px-3 py-1 text-violet-600 dark:bg-violet-500/10 dark:text-violet-300">
                {Q.taxonomy}
              </span>
              <span className="rounded-full bg-emerald-50 px-3 py-1 text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-300">
                Easy
              </span>
              <span className="ml-auto cursor-pointer text-lg text-amber-400">★</span>
            </div>
            <p className="text-lg font-semibold leading-relaxed" style={display}>
              {Q.stem}
            </p>
            <div className="mt-5 space-y-2.5">
              {Object.entries(Q.options).map(([k, v]) => {
                const correct = k === Q.answer
                const chosen = k === 'D'
                return (
                  <div
                    key={k}
                    className={cn(
                      'flex items-start gap-3 rounded-2xl border p-4 text-sm transition',
                      correct
                        ? 'border-emerald-400/60 bg-emerald-50/80 dark:border-emerald-500/40 dark:bg-emerald-500/10'
                        : chosen
                          ? 'border-rose-400/60 bg-rose-50/80 dark:border-rose-500/40 dark:bg-rose-500/10'
                          : 'border-slate-200/70 bg-white/50 dark:border-white/5 dark:bg-white/[0.03]',
                    )}
                  >
                    <span
                      className={cn(
                        'grid h-7 w-7 flex-none place-items-center rounded-xl text-xs font-bold',
                        correct
                          ? 'bg-emerald-500 text-white'
                          : chosen
                            ? 'bg-rose-500 text-white'
                            : 'bg-slate-100 text-slate-500 dark:bg-white/10 dark:text-slate-300',
                      )}
                    >
                      {k}
                    </span>
                    <span className="pt-0.5">{v}</span>
                  </div>
                )
              })}
            </div>
            <div className="mt-5 rounded-2xl bg-gradient-to-br from-indigo-50 to-violet-50 p-5 text-sm leading-relaxed dark:from-indigo-500/10 dark:to-violet-500/10">
              <p className="mb-1.5 font-bold text-indigo-600 dark:text-indigo-300" style={display}>
                Why B is right
              </p>
              <p className="text-slate-600 dark:text-slate-300">{Q.rationale}</p>
              <div className="mt-3 flex flex-wrap gap-1.5">
                {Q.rule_refs.map((r) => (
                  <span key={r} className="rounded-full bg-white/80 px-2.5 py-1 text-xs font-medium text-slate-500 dark:bg-white/10 dark:text-slate-300">
                    {r}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Side column: flashcard + weak areas */}
          <div className="space-y-6">
            <div className="rounded-3xl bg-gradient-to-br from-indigo-500 via-violet-600 to-fuchsia-600 p-[1px] shadow-xl shadow-violet-500/20">
              <div className="rounded-3xl bg-white/95 p-6 dark:bg-[#11162b]">
                <p className="text-xs font-bold uppercase tracking-wider text-fuchsia-500">⚡ Trap card · {C.outcome}</p>
                <p className="mt-3 font-semibold leading-relaxed" style={display}>
                  {C.front}
                </p>
                <p className="mt-3 border-t border-dashed border-slate-200 pt-3 text-sm text-slate-500 dark:border-white/10 dark:text-slate-400">
                  {C.back}
                </p>
              </div>
            </div>
            <div className="rounded-3xl border border-white/60 bg-white/60 p-6 backdrop-blur dark:border-white/5 dark:bg-white/5">
              <p className="mb-4 font-bold" style={display}>
                Focus areas
              </p>
              {SAMPLE_ELEMENTS.map((e) => (
                <div key={e.id} className="mb-3.5">
                  <div className="mb-1.5 flex justify-between text-xs font-medium">
                    <span>
                      E{e.id} · {e.title}
                    </span>
                    <span className="text-slate-400">{e.pct}%</span>
                  </div>
                  <div className="h-2 overflow-hidden rounded-full bg-slate-100 dark:bg-white/10">
                    <div
                      className="h-full rounded-full bg-gradient-to-r from-indigo-500 to-violet-500"
                      style={{ width: `${e.pct}%` }}
                    />
                  </div>
                </div>
              ))}
              <button className="mt-2 w-full rounded-xl border border-indigo-200 py-2.5 text-sm font-semibold text-indigo-600 transition hover:bg-indigo-50 dark:border-indigo-500/30 dark:text-indigo-300 dark:hover:bg-indigo-500/10">
                Drill weakest areas →
              </button>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}
