// Variant D — "Liquid": heavily inspired by Apple's Liquid Glass (iOS 26 / macOS Tahoe).
// Translucent panes that refract a vivid backdrop, specular edge highlights, capsule
// controls, floating glass toolbar, SF Pro via the system font stack, content-first.

import { SAMPLE_QUESTION as Q, SAMPLE_CARD as C, SAMPLE_ELEMENTS, STATS } from './shared'
import { cn } from '../../lib/format'

const sf = { fontFamily: "-apple-system, BlinkMacSystemFont, 'SF Pro Display', 'Inter', sans-serif" }

// The core material: blur + saturation boost + specular top edge + soft drop.
const glassFx =
  'backdrop-blur-2xl backdrop-saturate-[1.8] ring-1 ring-white/60 ' +
  'shadow-[0_8px_32px_rgba(31,38,60,0.12),inset_0_1px_1px_rgba(255,255,255,0.85),inset_0_-1px_1px_rgba(255,255,255,0.2)] ' +
  'dark:ring-white/15 ' +
  'dark:shadow-[0_8px_32px_rgba(0,0,0,0.45),inset_0_1px_1px_rgba(255,255,255,0.25),inset_0_-1px_1px_rgba(255,255,255,0.06)]'

const glass = `${glassFx} bg-white/35 dark:bg-white/[0.08]`
const glassDeep = `${glassFx} bg-white/55 dark:bg-white/[0.12]`

export default function Liquid() {
  return (
    <div className="relative min-h-screen overflow-hidden pb-32 text-slate-900 dark:text-white" style={sf}>
      {/* Vivid backdrop the glass refracts */}
      <div className="fixed inset-0 -z-10 bg-[#eef1f7] dark:bg-[#05070f]">
        <div className="absolute -left-32 -top-40 h-[36rem] w-[36rem] rounded-full bg-[#0a84ff] opacity-30 blur-[120px] dark:opacity-25" />
        <div className="absolute right-[-10rem] top-24 h-[30rem] w-[30rem] rounded-full bg-[#bf5af2] opacity-25 blur-[120px] dark:opacity-20" />
        <div className="absolute bottom-[-12rem] left-1/3 h-[32rem] w-[32rem] rounded-full bg-[#64d2ff] opacity-25 blur-[120px] dark:opacity-15" />
        <div className="absolute bottom-32 right-1/4 h-72 w-72 rounded-full bg-[#ff375f] opacity-15 blur-[100px] dark:opacity-10" />
      </div>

      {/* Floating glass toolbar */}
      <header className="sticky top-4 z-20 mx-auto mt-4 w-fit max-w-[calc(100%-2rem)]">
        <div className={cn('flex items-center gap-1 rounded-full px-2 py-2', glassDeep)}>
          <span className="flex items-center gap-2 pl-2 pr-3 text-sm font-semibold tracking-tight">
            <span className="grid h-7 w-7 place-items-center rounded-full bg-gradient-to-b from-[#3a9bff] to-[#0a84ff] text-xs font-bold text-white shadow-[inset_0_1px_1px_rgba(255,255,255,0.5)]">
              C
            </span>
            CIRO&thinsp;Prep
          </span>
          {['Home', 'Drill', 'Mock', 'Cards', 'Progress'].map((n, i) => (
            <span
              key={n}
              className={cn(
                'cursor-pointer rounded-full px-3.5 py-1.5 text-[13px] font-medium transition',
                i === 0
                  ? 'bg-white/70 shadow-[inset_0_1px_1px_rgba(255,255,255,0.9),0_1px_4px_rgba(0,0,0,0.08)] dark:bg-white/20 dark:shadow-[inset_0_1px_1px_rgba(255,255,255,0.3)]'
                  : 'text-slate-600 hover:bg-white/40 dark:text-slate-300 dark:hover:bg-white/10',
              )}
            >
              {n}
            </span>
          ))}
          <button className="ml-1 rounded-full bg-gradient-to-b from-[#3a9bff] to-[#0a84ff] px-4 py-1.5 text-[13px] font-semibold text-white shadow-[inset_0_1px_1px_rgba(255,255,255,0.45),0_2px_8px_rgba(10,132,255,0.45)] transition hover:brightness-110">
            Study
          </button>
        </div>
      </header>

      {/* Hero */}
      <section className="mx-auto max-w-5xl px-6 pb-14 pt-16 text-center">
        <span className={cn('inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-semibold', glass)}>
          <span className="h-1.5 w-1.5 rounded-full bg-[#30d158] shadow-[0_0_6px_#30d158]" />
          {STATS.questions} questions · feature-complete bank
        </span>
        <h1 className="mx-auto mt-6 max-w-3xl text-[3.4rem] font-bold leading-[1.05] tracking-[-0.03em]">
          Effortless prep.
          <br />
          <span className="bg-gradient-to-r from-[#0a84ff] via-[#bf5af2] to-[#ff375f] bg-clip-text text-transparent">
            Crystal-clear answers.
          </span>
        </h1>
        <p className="mx-auto mt-5 max-w-xl text-lg font-medium leading-relaxed text-slate-600 dark:text-slate-300">
          Every question explains itself — full rationale, exact rule citations. Drill, mock, and watch
          your weak areas dissolve.
        </p>
        <div className="mt-8 flex justify-center gap-3">
          <button className="rounded-full bg-gradient-to-b from-[#3a9bff] to-[#0a84ff] px-7 py-3 font-semibold text-white shadow-[inset_0_1px_1px_rgba(255,255,255,0.45),0_4px_16px_rgba(10,132,255,0.45)] transition hover:scale-[1.02]">
            Start drilling
          </button>
          <button className={cn('rounded-full px-7 py-3 font-semibold transition hover:scale-[1.02]', glassDeep)}>
            Take a mock
          </button>
        </div>

        {/* Glass stat capsules */}
        <div className="mx-auto mt-12 grid max-w-3xl grid-cols-2 gap-3 md:grid-cols-4">
          {[
            [`${STATS.attempted}`, 'attempted'],
            [`${STATS.accuracy}%`, 'accuracy'],
            [`${STATS.mocks}`, 'mock exams'],
            [`${STATS.cards}`, 'flashcards'],
          ].map(([v, l]) => (
            <div key={l} className={cn('rounded-3xl px-4 py-4', glass)}>
              <p className="text-2xl font-bold tracking-tight">{v}</p>
              <p className="text-xs font-medium text-slate-500 dark:text-slate-400">{l}</p>
            </div>
          ))}
        </div>
      </section>

      <main className="mx-auto max-w-5xl space-y-8 px-6">
        {/* Question pane */}
        <section className={cn('rounded-[2.25rem] p-7', glass)}>
          <div className="mb-5 flex flex-wrap items-center gap-2">
            {[`Element ${Q.element} · ${Q.outcome}`, Q.taxonomy, 'Easy'].map((b) => (
              <span
                key={b}
                className="rounded-full bg-white/50 px-3 py-1 text-xs font-semibold text-slate-600 shadow-[inset_0_1px_1px_rgba(255,255,255,0.8)] dark:bg-white/10 dark:text-slate-300 dark:shadow-[inset_0_1px_1px_rgba(255,255,255,0.15)]"
              >
                {b}
              </span>
            ))}
            <span className="ml-auto cursor-pointer text-lg text-[#ffd60a] drop-shadow-[0_0_6px_rgba(255,214,10,0.5)]">★</span>
          </div>
          <p className="text-xl font-semibold leading-relaxed tracking-[-0.01em]">{Q.stem}</p>
          <div className="mt-6 space-y-2.5">
            {Object.entries(Q.options).map(([k, v]) => {
              const correct = k === Q.answer
              const chosen = k === 'D'
              return (
                <div
                  key={k}
                  className={cn(
                    'flex items-start gap-3.5 rounded-2xl p-4 text-[15px] font-medium transition',
                    correct
                      ? 'bg-[#30d158]/25 ring-1 ring-[#30d158]/50 shadow-[inset_0_1px_1px_rgba(255,255,255,0.5),0_2px_12px_rgba(48,209,88,0.25)] dark:bg-[#30d158]/15'
                      : chosen
                        ? 'bg-[#ff453a]/20 ring-1 ring-[#ff453a]/45 shadow-[inset_0_1px_1px_rgba(255,255,255,0.4)] dark:bg-[#ff453a]/12'
                        : 'bg-white/40 ring-1 ring-white/50 shadow-[inset_0_1px_1px_rgba(255,255,255,0.7)] hover:bg-white/60 dark:bg-white/[0.06] dark:ring-white/10 dark:hover:bg-white/[0.1]',
                  )}
                >
                  <span
                    className={cn(
                      'grid h-7 w-7 flex-none place-items-center rounded-full text-xs font-bold shadow-[inset_0_1px_1px_rgba(255,255,255,0.5)]',
                      correct
                        ? 'bg-gradient-to-b from-[#4ade80] to-[#30d158] text-white'
                        : chosen
                          ? 'bg-gradient-to-b from-[#ff6961] to-[#ff453a] text-white'
                          : 'bg-white/70 text-slate-500 dark:bg-white/15 dark:text-slate-300',
                    )}
                  >
                    {k}
                  </span>
                  <span className="pt-0.5">{v}</span>
                </div>
              )
            })}
          </div>
          <div className={cn('mt-6 rounded-2xl p-5', glassDeep)}>
            <p className="text-sm font-bold text-[#0a84ff] dark:text-[#64b5ff]">Why B is correct</p>
            <p className="mt-1.5 text-sm leading-relaxed text-slate-600 dark:text-slate-300">{Q.rationale}</p>
            <div className="mt-3 flex flex-wrap gap-1.5">
              {Q.rule_refs.map((r) => (
                <span
                  key={r}
                  className="rounded-full bg-[#0a84ff]/12 px-2.5 py-1 text-xs font-semibold text-[#0a6ddb] dark:bg-[#0a84ff]/20 dark:text-[#8ec8ff]"
                >
                  {r}
                </span>
              ))}
            </div>
          </div>
        </section>

        {/* Flashcard + focus areas */}
        <section className="grid gap-6 md:grid-cols-2">
          <div className={cn('flex flex-col rounded-[2.25rem] p-7', glass)}>
            <span className="w-fit rounded-full bg-[#ff9f0a]/20 px-3 py-1 text-xs font-bold text-[#c77700] shadow-[inset_0_1px_1px_rgba(255,255,255,0.5)] dark:text-[#ffd60a]">
              ⚡ Trap card · {C.outcome}
            </span>
            <p className="mt-4 text-lg font-semibold leading-snug tracking-[-0.01em]">{C.front}</p>
            <p className="mt-3 text-sm leading-relaxed text-slate-600 dark:text-slate-300">{C.back}</p>
            <div className="mt-auto flex gap-2.5 pt-6">
              <button className={cn('flex-1 rounded-full py-2.5 text-sm font-semibold', glassDeep)}>Again</button>
              <button className="flex-1 rounded-full bg-gradient-to-b from-[#4ade80] to-[#30d158] py-2.5 text-sm font-semibold text-white shadow-[inset_0_1px_1px_rgba(255,255,255,0.45),0_2px_10px_rgba(48,209,88,0.4)]">
                Got it
              </button>
            </div>
          </div>
          <div className={cn('rounded-[2.25rem] p-7', glass)}>
            <p className="font-bold tracking-tight">Focus areas</p>
            <div className="mt-5 space-y-5">
              {SAMPLE_ELEMENTS.map((e) => (
                <div key={e.id}>
                  <div className="mb-2 flex justify-between text-sm font-medium">
                    <span>
                      E{e.id} · {e.title}
                    </span>
                    <span className="font-semibold text-slate-500 dark:text-slate-400">{e.pct}%</span>
                  </div>
                  <div className="h-2.5 overflow-hidden rounded-full bg-white/40 shadow-[inset_0_1px_2px_rgba(0,0,0,0.08)] dark:bg-white/10">
                    <div
                      className={cn(
                        'h-full rounded-full shadow-[inset_0_1px_1px_rgba(255,255,255,0.5)]',
                        e.pct < 70
                          ? 'bg-gradient-to-r from-[#ff9f0a] to-[#ff6961]'
                          : 'bg-gradient-to-r from-[#3a9bff] to-[#0a84ff]',
                      )}
                      style={{ width: `${e.pct}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
            <button className="mt-7 w-full rounded-full bg-gradient-to-b from-[#3a9bff] to-[#0a84ff] py-3 text-sm font-semibold text-white shadow-[inset_0_1px_1px_rgba(255,255,255,0.45),0_4px_14px_rgba(10,132,255,0.4)] transition hover:brightness-110">
              Drill weakest areas →
            </button>
          </div>
        </section>
      </main>
    </div>
  )
}
