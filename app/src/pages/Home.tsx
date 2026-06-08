import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useData } from '../data/DataContext'
import { useProgress } from '../store/progress'
import { useMock } from '../store/mock'
import { Badge, Modal } from '../components/ui'
import { formatDate, formatClock } from '../lib/format'

const MODES = [
  {
    to: '/drill',
    title: 'Drill mode',
    blurb: 'Practice by element and outcome with instant explanations and rule references.',
    icon: '🎯',
  },
  {
    to: '/mock',
    title: 'Mock exam',
    blurb: '90 questions, 180-minute timer, weighted exactly like the real form.',
    icon: '⏱️',
  },
  {
    to: '/flashcards',
    title: 'Flashcards',
    blurb: 'Crash-course decks — refresh an element fast before you drill it.',
    icon: '🃏',
  },
  {
    to: '/about',
    title: 'About the exam',
    blurb: 'Format, fees, attempts, and the official CIRO resources.',
    icon: 'ℹ️',
  },
]

export default function Home() {
  const { manifest, examMeta } = useData()
  const drill = useProgress((s) => s.drill)
  const cardStatus = useProgress((s) => s.cards)
  const mockHistory = useProgress((s) => s.mockHistory)
  const resetAll = useProgress((s) => s.resetAll)

  const mockStatus = useMock((s) => s.status)
  const mockAnswered = useMock((s) => Object.keys(s.answers).length)
  const mockTotal = useMock((s) => s.questions.length)
  const mockEndsAt = useMock((s) => s.endsAt)
  const mockRemainingMs = useMock((s) => s.remainingMs)
  const mockInProgress = mockStatus === 'running' || mockStatus === 'paused'
  // Compute remaining in render — NOT inside the selector. Date.now() in a zustand
  // selector returns a new value on every read and triggers an infinite render loop.
  const mockRemaining =
    mockStatus === 'running' && mockEndsAt != null ? Math.max(0, mockEndsAt - Date.now()) : mockRemainingMs

  const attempted = Object.keys(drill).length
  const cardsReviewed = Object.keys(cardStatus).length
  const lastMock = mockHistory[0]
  const hasProgress = attempted > 0 || mockHistory.length > 0 || cardsReviewed > 0
  const [confirmReset, setConfirmReset] = useState(false)

  return (
    <div className="space-y-10">
      {mockInProgress && (
        <section className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-amber-300 bg-amber-50 p-4 dark:border-amber-700/60 dark:bg-amber-900/20">
          <div className="text-sm">
            <p className="font-semibold text-amber-900 dark:text-amber-200">Mock exam in progress</p>
            <p className="text-amber-800/80 dark:text-amber-300/80">
              {mockAnswered}/{mockTotal} answered · {formatClock(mockRemaining)} left
              {mockStatus === 'paused' ? ' (paused)' : ''}
            </p>
          </div>
          <Link to="/mock" className="btn-primary">
            Resume exam
          </Link>
        </section>
      )}

      <section className="rounded-2xl bg-gradient-to-br from-brand-600 to-brand-800 p-8 text-white shadow-lg">
        <p className="text-sm font-medium uppercase tracking-wider text-brand-100">
          {examMeta.exam}
        </p>
        <h1 className="mt-2 max-w-2xl text-3xl font-bold leading-tight sm:text-4xl">
          Pass the CIRO Supervisor Exam with practice that explains every answer.
        </h1>
        <p className="mt-3 max-w-2xl text-brand-50">
          {manifest.questions} original practice questions and {manifest.cards} flashcards, mapped to
          all 9 syllabus elements. Free, no account needed — your progress stays on this device.
        </p>
        <div className="mt-6 flex flex-wrap gap-3">
          <Link to="/drill" className="btn bg-white text-brand-700 hover:bg-brand-50">
            Start drilling
          </Link>
          <Link to="/mock" className="btn border border-white/40 text-white hover:bg-white/10">
            Take a mock exam
          </Link>
        </div>
      </section>

      {hasProgress && (
        <section className="card p-5">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <Stat label="Questions attempted" value={`${attempted}`} sub={`of ${manifest.questions}`} />
            <Stat label="Flashcards reviewed" value={`${cardsReviewed}`} sub={`of ${manifest.cards}`} />
            <Stat
              label="Last mock score"
              value={lastMock ? `${lastMock.overallPct}%` : '—'}
              sub={lastMock ? formatDate(lastMock.finishedAt) : 'no attempts yet'}
            />
            <Stat label="Mock exams taken" value={`${mockHistory.length}`} sub="saved on this device" />
          </div>
          <div className="mt-4 flex items-center justify-between border-t border-slate-200 pt-3 dark:border-slate-800">
            <Link to="/progress" className="text-xs font-medium text-brand-600 hover:underline dark:text-brand-300">
              View detailed progress →
            </Link>
            <button
              onClick={() => setConfirmReset(true)}
              className="text-xs font-medium text-slate-500 transition hover:text-red-600 dark:text-slate-400 dark:hover:text-red-400"
            >
              Reset progress
            </button>
          </div>
        </section>
      )}

      <section>
        <div className="grid gap-4 sm:grid-cols-2">
          {MODES.map((m) => (
            <Link
              key={m.to}
              to={m.to}
              className="card group flex items-start gap-4 p-5 transition hover:border-brand-300 hover:shadow-md dark:hover:border-brand-700"
            >
              <span className="text-2xl" aria-hidden>
                {m.icon}
              </span>
              <div>
                <h2 className="font-semibold group-hover:text-brand-700 dark:group-hover:text-brand-300">
                  {m.title}
                </h2>
                <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">{m.blurb}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section className="card p-5 text-sm leading-relaxed text-slate-600 dark:text-slate-300">
        <div className="mb-2 flex items-center gap-2">
          <Badge tone="amber">Heads up</Badge>
          <span className="font-semibold text-slate-800 dark:text-slate-100">About scoring</span>
        </div>
        CIRO does not publish a pass mark for this exam — results are pass/fail only, set
        per-form. This site never shows an “official pass threshold.” Mock results give you a
        percentage and a breakdown by element and skill so you can see where to focus.
      </section>

      {confirmReset && (
        <Modal onClose={() => setConfirmReset(false)}>
          <p className="text-lg font-semibold">Reset all progress?</p>
          <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
            This clears your drill history, flashcard marks, and saved mock scores on this device. It
            can’t be undone.
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
