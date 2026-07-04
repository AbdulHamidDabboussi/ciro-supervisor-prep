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
    <div className="space-y-12">
      {mockInProgress && (
        <section className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-amber-300/60 bg-amber-50/80 p-4 backdrop-blur dark:border-amber-500/30 dark:bg-amber-500/10">
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

      {/* Hero — the aurora glow comes from the global backdrop in App.tsx */}
      <section className="relative">
        <div className="relative mx-auto max-w-3xl py-16 text-center sm:py-20">
          <span className="mb-5 inline-flex items-center gap-2 rounded-full border border-indigo-200/70 bg-white/60 px-4 py-1.5 text-xs font-semibold text-indigo-600 backdrop-blur dark:border-indigo-500/20 dark:bg-white/5 dark:text-indigo-300">
            <span className="h-1.5 w-1.5 rounded-full bg-indigo-500" /> {examMeta.exam}
          </span>
          <h1 className="mx-auto max-w-2xl text-4xl font-extrabold leading-[1.1] tracking-tight sm:text-5xl">
            Pass the CIRO Supervisor Exam{' '}
            <span className="bg-gradient-to-r from-indigo-500 via-violet-500 to-fuchsia-500 bg-clip-text text-transparent">
              with practice that explains every answer
            </span>
            .
          </h1>
          <p className="mx-auto mt-5 max-w-xl text-lg text-slate-500 dark:text-slate-400">
            {manifest.questions} original practice questions and {manifest.cards} flashcards, mapped to
            all 9 syllabus elements. Free, no account needed — your progress stays on this device.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link to="/drill" className="btn-primary">
              Start drilling →
            </Link>
            <Link to="/mock" className="btn-secondary">
              Take a mock exam
            </Link>
          </div>
        </div>
      </section>

      {hasProgress && (
        <section>
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
          <div className="mt-4 flex items-center justify-between border-t border-white/60 pt-3 dark:border-white/5">
            <Link to="/progress" className="text-xs font-medium text-indigo-600 hover:underline dark:text-indigo-300">
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
              className="card group flex items-start gap-4 p-5 transition hover:border-indigo-300/60 hover:shadow-glass-lg dark:hover:border-indigo-500/30"
            >
              <span className="text-2xl" aria-hidden>
                {m.icon}
              </span>
              <div>
                <h2 className="font-display font-semibold group-hover:text-indigo-600 dark:group-hover:text-indigo-300">
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
          <span className="font-display font-semibold text-slate-800 dark:text-slate-100">About scoring</span>
        </div>
        CIRO does not publish a pass mark for this exam — results are pass/fail only, set
        per-form. This site never shows an “official pass threshold.” Mock results give you a
        percentage and a breakdown by element and skill so you can see where to focus.
      </section>

      {confirmReset && (
        <Modal onClose={() => setConfirmReset(false)}>
          <p className="font-display text-lg font-semibold">Reset all progress?</p>
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
    <div className="card p-5">
      <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">{label}</p>
      <p className="mt-1 font-display text-3xl font-bold tracking-tight">{value}</p>
      {sub && <p className="text-xs text-slate-400">{sub}</p>}
    </div>
  )
}
