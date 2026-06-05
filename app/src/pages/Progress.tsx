import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { useData, QuestionsLoading } from '../data/DataContext'
import { useProgress } from '../store/progress'
import { PageHeading, Modal, Badge } from '../components/ui'
import { cn, formatDate } from '../lib/format'

interface Tally {
  total: number
  attempted: number
  correct: number // most-recent answer correct
}

const acc = (t: Tally) => (t.attempted === 0 ? 0 : Math.round((t.correct / t.attempted) * 100))
const accTone = (pct: number) => (pct >= 75 ? 'bg-green-500' : pct >= 50 ? 'bg-amber-500' : 'bg-red-500')

export default function Progress() {
  const { reviewedQuestions, deck, syllabus, questionsReady } = useData()
  const drill = useProgress((s) => s.drill)
  const cardStatus = useProgress((s) => s.cards)
  const bookmarks = useProgress((s) => s.bookmarks)
  const mockHistory = useProgress((s) => s.mockHistory)
  const resetAll = useProgress((s) => s.resetAll)

  const [expanded, setExpanded] = useState<number | null>(null)
  const [confirmReset, setConfirmReset] = useState(false)

  const byOutcome = useMemo(() => {
    const m = new Map<string, Tally>()
    for (const q of reviewedQuestions) {
      const t = m.get(q.outcome) ?? { total: 0, attempted: 0, correct: 0 }
      t.total++
      const rec = drill[q.id]
      if (rec) {
        t.attempted++
        if (rec.lastCorrect) t.correct++
      }
      m.set(q.outcome, t)
    }
    return m
  }, [reviewedQuestions, drill])

  const ids = Object.keys(drill)
  const attempted = ids.length
  const correctNow = ids.filter((id) => drill[id].lastCorrect).length
  const misses = ids.filter((id) => drill[id].lastCorrect === false).length
  const overallAcc = attempted ? Math.round((correctNow / attempted) * 100) : 0
  const bookmarkCount = Object.keys(bookmarks).length
  const bestMock = mockHistory.reduce((m, r) => Math.max(m, r.overallPct), 0)

  if (!questionsReady) {
    return (
      <div>
        <PageHeading title="Your progress" subtitle="Drill mastery, bookmarks, and mock-exam history — all stored on this device." />
        <QuestionsLoading />
      </div>
    )
  }

  const cardsByElement = (id: number) => deck?.cards.filter((c) => c.element === id) ?? []

  const hasAnyProgress = attempted > 0 || mockHistory.length > 0 || bookmarkCount > 0

  return (
    <div className="space-y-8">
      <PageHeading
        title="Your progress"
        subtitle="Drill mastery, bookmarks, and mock-exam history — all stored on this device."
      />

      {!hasAnyProgress && (
        <div className="card p-8 text-center text-slate-500 dark:text-slate-400">
          No activity yet. Start a <Link to="/drill" className="text-brand-600 hover:underline dark:text-brand-300">drill</Link> or a{' '}
          <Link to="/mock" className="text-brand-600 hover:underline dark:text-brand-300">mock exam</Link> and your stats appear here.
        </div>
      )}

      {/* Overview */}
      <section className="card grid grid-cols-2 gap-4 p-5 sm:grid-cols-4">
        <Stat label="Questions attempted" value={`${attempted}`} sub={`of ${reviewedQuestions.length}`} />
        <Stat label="Drill accuracy" value={`${overallAcc}%`} sub="most recent answers" />
        <Stat label="Mock exams" value={`${mockHistory.length}`} sub={mockHistory.length ? `best ${bestMock}%` : '—'} />
        <Stat label="Bookmarks" value={`${bookmarkCount}`} sub="saved questions" />
      </section>

      {/* Quick links */}
      <section className="flex flex-wrap gap-3">
        <Link to="/drill?focus=misses" className="btn-secondary">
          Review my misses ({misses})
        </Link>
        <Link to="/drill?focus=bookmarked" className="btn-secondary">
          Bookmarked ({bookmarkCount})
        </Link>
      </section>

      {/* By element */}
      <section className="card overflow-hidden">
        <h2 className="border-b border-slate-200 p-4 font-semibold dark:border-slate-800">By element</h2>
        <div className="divide-y divide-slate-200 dark:divide-slate-800">
          {syllabus.elements.map((el) => {
            const elTally: Tally = el.outcomes.reduce(
              (t, o) => {
                const ot = byOutcome.get(o.id) ?? { total: 0, attempted: 0, correct: 0 }
                return { total: t.total + ot.total, attempted: t.attempted + ot.attempted, correct: t.correct + ot.correct }
              },
              { total: 0, attempted: 0, correct: 0 },
            )
            const elCards = cardsByElement(el.id)
            const known = elCards.filter((c) => cardStatus[c.id] === 'known').length
            const pct = acc(elTally)
            const open = expanded === el.id
            return (
              <div key={el.id}>
                <button
                  onClick={() => setExpanded(open ? null : el.id)}
                  className="flex w-full items-center gap-3 p-4 text-left hover:bg-slate-50 dark:hover:bg-slate-800/50"
                >
                  <span className="w-10 flex-none text-xs font-semibold text-slate-400">E{el.id}</span>
                  <span className="min-w-0 flex-1">
                    <span className="block truncate text-sm font-medium">{el.title}</span>
                    <span className="mt-1 block">
                      <span className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
                        <span className="h-1.5 w-24 overflow-hidden rounded-full bg-slate-200 dark:bg-slate-700">
                          <span className={cn('block h-full rounded-full', accTone(pct))} style={{ width: `${pct}%` }} />
                        </span>
                        {elTally.attempted}/{elTally.total} attempted · {pct}% · {known}/{elCards.length} cards known
                      </span>
                    </span>
                  </span>
                  <span className="flex-none text-xs text-slate-400">{open ? '▲' : '▼'}</span>
                </button>
                {open && (
                  <div className="space-y-2 bg-slate-50 px-4 pb-4 pt-1 dark:bg-slate-900/40">
                    {el.outcomes.map((o) => {
                      const ot = byOutcome.get(o.id) ?? { total: 0, attempted: 0, correct: 0 }
                      const opct = acc(ot)
                      return (
                        <div key={o.id} className="flex items-center gap-2 text-xs">
                          <span className="w-10 flex-none font-mono text-slate-400">{o.id}</span>
                          <span className="h-1.5 w-20 flex-none overflow-hidden rounded-full bg-slate-200 dark:bg-slate-700">
                            <span className={cn('block h-full rounded-full', accTone(opct))} style={{ width: `${opct}%` }} />
                          </span>
                          <span className="flex-none tabular-nums text-slate-500 dark:text-slate-400">
                            {ot.attempted}/{ot.total} · {opct}%
                          </span>
                          <span className="min-w-0 flex-1 truncate text-slate-400">{o.statement}</span>
                        </div>
                      )
                    })}
                    <Link to={`/drill?element=${el.id}`} className="inline-block pt-1 text-xs font-medium text-brand-600 hover:underline dark:text-brand-300">
                      Drill element {el.id} →
                    </Link>
                  </div>
                )}
              </div>
            )
          })}
        </div>
      </section>

      {/* Mock history */}
      <section className="card p-5">
        <h2 className="mb-3 font-semibold">Mock exam history</h2>
        {mockHistory.length === 0 ? (
          <p className="text-sm text-slate-500 dark:text-slate-400">No mock attempts yet.</p>
        ) : (
          <>
            <div className="mb-4 flex h-24 items-end gap-1.5">
              {[...mockHistory].reverse().slice(-16).map((r) => (
                <div key={r.startedAt} className="flex flex-1 flex-col items-center justify-end" title={`${r.overallPct}% · ${formatDate(r.finishedAt)}`}>
                  <div className={cn('w-full rounded-t', accTone(r.overallPct))} style={{ height: `${Math.max(4, r.overallPct)}%` }} />
                </div>
              ))}
            </div>
            <ul className="divide-y divide-slate-200 text-sm dark:divide-slate-800">
              {mockHistory.map((r) => (
                <li key={r.startedAt} className="flex items-center justify-between py-2">
                  <span className="text-slate-500 dark:text-slate-400">{formatDate(r.finishedAt)}</span>
                  <span className="flex items-center gap-2">
                    {r.autoSubmitted && <Badge tone="amber">auto</Badge>}
                    <span className="font-semibold tabular-nums">{r.overallPct}%</span>
                    <span className="text-slate-400">
                      ({r.correct}/{r.total})
                    </span>
                  </span>
                </li>
              ))}
            </ul>
          </>
        )}
      </section>

      <div className="border-t border-slate-200 pt-4 text-right dark:border-slate-800">
        <button
          onClick={() => setConfirmReset(true)}
          className="text-xs font-medium text-slate-500 transition hover:text-red-600 dark:text-slate-400 dark:hover:text-red-400"
        >
          Reset all progress
        </button>
      </div>

      {confirmReset && (
        <Modal onClose={() => setConfirmReset(false)}>
          <p className="text-lg font-semibold">Reset all progress?</p>
          <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
            This clears your drill history, bookmarks, flashcard marks, and saved mock scores on this
            device. It can’t be undone.
          </p>
          <div className="mt-5 flex justify-center gap-3">
            <button className="btn-secondary" onClick={() => setConfirmReset(false)}>
              Cancel
            </button>
            <button
              className="btn bg-red-600 text-white hover:bg-red-700"
              onClick={() => {
                resetAll()
                setConfirmReset(false)
              }}
            >
              Reset everything
            </button>
          </div>
        </Modal>
      )}
    </div>
  )
}

function Stat({ label, value, sub }: { label: string; value: string; sub?: string }) {
  return (
    <div>
      <p className="text-xs font-medium uppercase tracking-wide text-slate-400">{label}</p>
      <p className="mt-1 text-2xl font-bold text-brand-700 dark:text-brand-300">{value}</p>
      {sub && <p className="text-xs text-slate-400">{sub}</p>}
    </div>
  )
}
