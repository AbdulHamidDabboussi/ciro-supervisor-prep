// Variant C — "Ledger": serious / institutional. Navy + gold, Fraunces serif display,
// IBM Plex Sans body + Plex Mono labels, hairline rules, sharp corners, document feel.

import { SAMPLE_QUESTION as Q, SAMPLE_CARD as C, SAMPLE_ELEMENTS, STATS } from './shared'
import { cn } from '../../lib/format'

const serif = { fontFamily: "'Fraunces', Georgia, serif" }
const mono = { fontFamily: "'IBM Plex Mono', monospace" }
const sans = { fontFamily: "'IBM Plex Sans', 'Inter', sans-serif" }

const GOLD = 'text-[#b08d3e]'

export default function Ledger() {
  return (
    <div className="min-h-screen bg-[#faf8f4] pb-28 text-[#16243a] dark:bg-[#0c1422] dark:text-[#e8e4da]" style={sans}>
      {/* Masthead */}
      <header className="border-b-2 border-[#16243a] dark:border-[#e8e4da]/30">
        <div className="mx-auto flex max-w-5xl items-end justify-between px-6 pb-4 pt-6">
          <div>
            <p className="text-[10px] uppercase tracking-[0.3em] text-[#16243a]/50 dark:text-[#e8e4da]/40" style={mono}>
              Est. 2026 · Unofficial study aid
            </p>
            <h1 className="mt-1 text-3xl font-semibold" style={serif}>
              CIRO Supervisor Exam Prep
            </h1>
          </div>
          <nav className="hidden gap-6 pb-1 text-[11px] font-medium uppercase tracking-[0.18em] md:flex" style={mono}>
            {['Drill', 'Mock', 'Cards', 'Progress', 'About'].map((n, i) => (
              <span
                key={n}
                className={cn(
                  'cursor-pointer border-b-2 pb-1 transition',
                  i === 0
                    ? `border-[#b08d3e] ${GOLD}`
                    : 'border-transparent text-[#16243a]/50 hover:text-[#16243a] dark:text-[#e8e4da]/50 dark:hover:text-[#e8e4da]',
                )}
              >
                {n}
              </span>
            ))}
          </nav>
        </div>
      </header>

      {/* Hero — journal lead */}
      <section className="mx-auto max-w-5xl px-6 pt-14">
        <div className="grid gap-10 md:grid-cols-[1fr_18rem]">
          <div>
            <p className={cn('text-xs uppercase tracking-[0.25em]', GOLD)} style={mono}>
              Proficiency model · effective 2026-01-01
            </p>
            <h2 className="mt-4 max-w-2xl text-5xl font-medium leading-[1.12]" style={serif}>
              Supervision is a discipline. <em className={GOLD}>Prepare like it.</em>
            </h2>
            <p className="mt-5 max-w-xl leading-relaxed text-[#16243a]/70 dark:text-[#e8e4da]/60">
              {STATS.questions} original questions across all nine syllabus elements — each keyed to the IDPC
              Rules, UMIR and guidance it tests, with the rationale written out in full.
            </p>
            <div className="mt-8 flex gap-3">
              <button className="bg-[#16243a] px-7 py-3 text-sm font-semibold tracking-wide text-[#faf8f4] transition hover:bg-[#1f3354] dark:bg-[#e8e4da] dark:text-[#16243a] dark:hover:bg-white">
                Begin drilling
              </button>
              <button className="border border-[#16243a]/30 px-7 py-3 text-sm font-semibold tracking-wide transition hover:border-[#b08d3e] hover:text-[#b08d3e] dark:border-[#e8e4da]/30">
                Sit a timed mock
              </button>
            </div>
          </div>
          {/* Ruled stats table */}
          <div className="self-start border-t-2 border-[#16243a] dark:border-[#e8e4da]/40">
            {[
              ['Questions', `${STATS.questions}`],
              ['Flashcards', `${STATS.cards}`],
              ['Attempted', `${STATS.attempted}`],
              ['Accuracy', `${STATS.accuracy}%`],
              ['Last mock', `${STATS.lastMock}%`],
            ].map(([l, v]) => (
              <div
                key={l}
                className="flex items-baseline justify-between border-b border-[#16243a]/15 py-2.5 dark:border-[#e8e4da]/15"
              >
                <span className="text-[11px] uppercase tracking-[0.18em] text-[#16243a]/50 dark:text-[#e8e4da]/50" style={mono}>
                  {l}
                </span>
                <span className="text-xl font-semibold" style={serif}>
                  {v}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <main className="mx-auto max-w-5xl space-y-14 px-6 pt-14">
        {/* Question — document style with margin column */}
        <section className="border border-[#16243a]/20 bg-white dark:border-[#e8e4da]/15 dark:bg-[#101a2c]">
          <div className="flex items-center justify-between border-b border-[#16243a]/15 px-6 py-3 dark:border-[#e8e4da]/15">
            <span className="text-[11px] uppercase tracking-[0.2em]" style={mono}>
              {Q.id} · Element {Q.element} · Outcome {Q.outcome}
            </span>
            <span className={cn('text-[11px] uppercase tracking-[0.2em]', GOLD)} style={mono}>
              {Q.taxonomy} · {Q.difficulty}
            </span>
          </div>
          <div className="grid md:grid-cols-[1fr_16rem]">
            <div className="p-7">
              <p className="text-xl font-medium leading-relaxed" style={serif}>
                {Q.stem}
              </p>
              <div className="mt-6 divide-y divide-[#16243a]/10 border-y border-[#16243a]/10 dark:divide-[#e8e4da]/10 dark:border-[#e8e4da]/10">
                {Object.entries(Q.options).map(([k, v]) => {
                  const correct = k === Q.answer
                  const chosen = k === 'D'
                  return (
                    <div
                      key={k}
                      className={cn(
                        'flex items-start gap-4 px-2 py-3.5 text-sm leading-relaxed',
                        correct && 'bg-[#b08d3e]/10',
                        chosen && 'bg-red-900/5 dark:bg-red-400/5',
                      )}
                    >
                      <span
                        className={cn('flex-none pt-0.5 text-sm font-semibold', correct ? GOLD : 'text-[#16243a]/40 dark:text-[#e8e4da]/40')}
                        style={mono}
                      >
                        ({k})
                      </span>
                      <span className={cn(chosen && 'line-through decoration-red-800/40')}>{v}</span>
                      {correct && (
                        <span className={cn('ml-auto flex-none pt-0.5 text-[10px] uppercase tracking-[0.2em]', GOLD)} style={mono}>
                          ✓ Key
                        </span>
                      )}
                    </div>
                  )
                })}
              </div>
              <div className="mt-6">
                <p className={cn('text-[11px] uppercase tracking-[0.25em]', GOLD)} style={mono}>
                  Rationale
                </p>
                <p className="mt-2 text-sm leading-relaxed text-[#16243a]/80 first-letter:float-left first-letter:mr-2 first-letter:text-4xl first-letter:font-semibold first-letter:leading-[0.85] dark:text-[#e8e4da]/70" style={{ ...sans }}>
                  {Q.rationale}
                </p>
              </div>
            </div>
            {/* Margin notes */}
            <aside className="border-t border-[#16243a]/15 bg-[#faf8f4] p-6 dark:border-[#e8e4da]/15 dark:bg-[#0c1422] md:border-l md:border-t-0">
              <p className="text-[11px] uppercase tracking-[0.25em] text-[#16243a]/50 dark:text-[#e8e4da]/50" style={mono}>
                Authorities cited
              </p>
              <ul className="mt-3 space-y-2.5">
                {Q.rule_refs.map((r) => (
                  <li key={r} className="border-l-2 border-[#b08d3e] pl-3 text-sm font-medium" style={mono}>
                    {r}
                  </li>
                ))}
              </ul>
              <button className="mt-8 w-full border border-[#16243a]/30 py-2.5 text-[11px] font-semibold uppercase tracking-[0.2em] transition hover:border-[#b08d3e] hover:text-[#b08d3e] dark:border-[#e8e4da]/30" style={mono}>
                ☆ Bookmark
              </button>
            </aside>
          </div>
        </section>

        {/* Flashcard + standings */}
        <section className="grid gap-10 md:grid-cols-2">
          <div>
            <p className={cn('mb-3 text-[11px] uppercase tracking-[0.25em]', GOLD)} style={mono}>
              From the deck — trap · {C.outcome}
            </p>
            <blockquote className="border-l-2 border-[#b08d3e] pl-5">
              <p className="text-2xl font-medium leading-snug" style={serif}>
                {C.front}
              </p>
              <p className="mt-4 text-sm leading-relaxed text-[#16243a]/70 dark:text-[#e8e4da]/60">{C.back}</p>
            </blockquote>
          </div>
          <div>
            <p className="mb-3 text-[11px] uppercase tracking-[0.25em] text-[#16243a]/50 dark:text-[#e8e4da]/50" style={mono}>
              Standing by element
            </p>
            <div className="border-t-2 border-[#16243a] dark:border-[#e8e4da]/40">
              {SAMPLE_ELEMENTS.map((e) => (
                <div key={e.id} className="border-b border-[#16243a]/15 py-3 dark:border-[#e8e4da]/15">
                  <div className="flex items-baseline justify-between">
                    <span className="text-sm font-medium">
                      <span style={mono}>E{e.id}</span> · {e.title}
                    </span>
                    <span className={cn('text-lg font-semibold', e.pct < 70 && 'text-red-800 dark:text-red-400')} style={serif}>
                      {e.pct}%
                    </span>
                  </div>
                  <div className="mt-1.5 h-px w-full bg-[#16243a]/10 dark:bg-[#e8e4da]/10">
                    <div className="h-px bg-[#b08d3e]" style={{ width: `${e.pct}%`, height: 3, marginTop: -1 }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}
