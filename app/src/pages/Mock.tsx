import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useData } from '../data/DataContext'
import { useMock } from '../store/mock'
import { assembleMockForm } from '../lib/mockAssembler'
import { QuestionCard } from '../components/QuestionCard'
import { PageHeading, Badge, Modal } from '../components/ui'
import { cn, formatClock } from '../lib/format'
import type { OptionKey } from '../types'

export default function Mock() {
  const status = useMock((s) => s.status)
  const navigate = useNavigate()

  useEffect(() => {
    if (status === 'submitted') navigate('/mock/result')
  }, [status, navigate])

  if (status === 'running' || status === 'paused') return <Runner />
  return <StartScreen />
}

function StartScreen() {
  const { reviewedQuestions, examMeta, questionsReady, questionsError, retryQuestions } = useData()
  const start = useMock((s) => s.start)
  const navigate = useNavigate()
  const { questions_total, duration_minutes, questions_item_set } = examMeta.format

  function begin() {
    if (!questionsReady) return
    const form = assembleMockForm(reviewedQuestions, examMeta.element_weights, questions_item_set)
    start(form, duration_minutes * 60_000)
    navigate('/mock')
  }

  return (
    <div>
      <PageHeading
        title="Mock exam"
        subtitle="A full-length, timed practice form weighted like the real exam."
      />
      <div className="card space-y-5 p-6">
        <div className="grid gap-4 sm:grid-cols-3">
          <Fact label="Questions" value={`${questions_total}`} />
          <Fact label="Time limit" value={`${duration_minutes / 60} hours`} />
          <Fact label="Feedback" value="At the end" />
        </div>

        <div>
          <p className="mb-2 text-sm font-semibold">Weighting (by element)</p>
          <div className="flex flex-wrap gap-1.5">
            {examMeta.element_weights.map((w) => (
              <Badge key={w.element}>
                E{w.element}: {w.questions}
              </Badge>
            ))}
          </div>
        </div>

        <div className="rounded-lg bg-amber-50 p-4 text-sm leading-relaxed text-amber-900 dark:bg-amber-900/15 dark:text-amber-200">
          <p className="font-semibold">Before you start</p>
          <ul className="mt-1 list-disc space-y-1 pl-5">
            <li>
              You can <strong>pause</strong> the timer here for convenience — note the real exam has
              <strong> no pause</strong>.
            </li>
            <li>
              Forms are weighted like the real exam (about a third item-set questions), but the bank
              has a limited pool of item sets — so only a few fully distinct forms are possible
              before questions start to repeat.
            </li>
            <li>No pass mark is shown — you’ll get a percentage and a breakdown by element and skill.</li>
          </ul>
        </div>

        {questionsError ? (
          <div className="rounded-lg bg-red-50 p-4 text-sm text-red-700 dark:bg-red-900/20 dark:text-red-300">
            Couldn’t load the question bank.{' '}
            <button className="font-semibold underline" onClick={retryQuestions}>
              Retry
            </button>
          </div>
        ) : (
          <button className="btn-primary w-full sm:w-auto" onClick={begin} disabled={!questionsReady}>
            {questionsReady
              ? `Start mock exam — ${questions_total} questions · ${duration_minutes / 60} h`
              : 'Loading questions…'}
          </button>
        )}
      </div>
    </div>
  )
}

function Fact({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-lg bg-slate-50 p-3 dark:bg-slate-800/60">
      <p className="text-xs font-medium uppercase tracking-wide text-slate-400">{label}</p>
      <p className="mt-0.5 text-lg font-bold">{value}</p>
    </div>
  )
}

function Runner() {
  const mock = useMock()
  const [now, setNow] = useState(() => Date.now())
  const [showNav, setShowNav] = useState(false)
  const [confirming, setConfirming] = useState(false)
  const [quitting, setQuitting] = useState(false)

  // Tick once a second while running; auto-submit at zero.
  useEffect(() => {
    if (mock.status !== 'running') return
    const id = setInterval(() => setNow(Date.now()), 1000)
    return () => clearInterval(id)
  }, [mock.status])

  const remaining = mock.remainingAt(now)
  useEffect(() => {
    if (mock.status === 'running' && remaining <= 0) mock.submit(true)
  }, [remaining, mock])

  // Runner is only mounted during an active exam — warn before a tab close/reload.
  // (In-app navigation is safe: the session persists and resumes.)
  useEffect(() => {
    const onBeforeUnload = (e: BeforeUnloadEvent) => {
      e.preventDefault()
      e.returnValue = ''
    }
    window.addEventListener('beforeunload', onBeforeUnload)
    return () => window.removeEventListener('beforeunload', onBeforeUnload)
  }, [])

  const q = mock.questions[mock.index]
  const answeredCount = Object.keys(mock.answers).length
  const flaggedCount = Object.keys(mock.flags).length
  const unanswered = mock.questions.length - answeredCount
  const paused = mock.status === 'paused'

  // Keyboard: A–D / 1–4 to answer, ←/→ to navigate, F to flag (disabled while paused or a dialog is open).
  useEffect(() => {
    if (paused || confirming || quitting) return
    function onKey(e: KeyboardEvent) {
      if (e.metaKey || e.ctrlKey || e.altKey) return
      const tag = (e.target as HTMLElement | null)?.tagName
      if (tag === 'INPUT' || tag === 'TEXTAREA' || tag === 'SELECT') return
      if (!q) return
      const map: Record<string, OptionKey> = {
        '1': 'A', '2': 'B', '3': 'C', '4': 'D', a: 'A', b: 'B', c: 'C', d: 'D',
      }
      const k = map[e.key.toLowerCase()]
      if (k) {
        e.preventDefault()
        mock.answer(q.id, k)
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault()
        mock.prev()
      } else if (e.key === 'ArrowRight') {
        e.preventDefault()
        mock.next()
      } else if (e.key.toLowerCase() === 'f') {
        e.preventDefault()
        mock.toggleFlag(q.id)
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [q, paused, confirming, quitting])

  const timeTone =
    remaining <= 120_000 ? 'text-red-600' : remaining <= 600_000 ? 'text-amber-600' : 'text-slate-800 dark:text-slate-100'

  return (
    <div>
      {/* Sticky exam toolbar */}
      <div className="card sticky top-16 z-10 mb-5 flex flex-wrap items-center justify-between gap-3 p-3">
        <div className="flex items-center gap-3">
          <span className={cn('font-mono text-xl font-bold tabular-nums', timeTone)}>
            {formatClock(remaining)}
          </span>
          <button className="btn-secondary !py-1.5" onClick={() => (paused ? mock.resume() : mock.pause())}>
            {paused ? 'Resume' : 'Pause'}
          </button>
          <button
            className="rounded-lg px-2 py-1.5 text-sm font-medium text-slate-500 transition hover:text-red-600 dark:text-slate-400 dark:hover:text-red-400"
            onClick={() => setQuitting(true)}
          >
            Quit
          </button>
        </div>
        <div className="flex items-center gap-3 text-sm text-slate-500 dark:text-slate-400">
          <span>
            {answeredCount}/{mock.questions.length} answered
            {flaggedCount > 0 && ` · ${flaggedCount} flagged`}
          </span>
          <button className="btn-secondary !py-1.5" onClick={() => setShowNav((v) => !v)}>
            Questions
          </button>
          <button className="btn-primary !py-1.5" onClick={() => setConfirming(true)}>
            Submit
          </button>
        </div>
      </div>

      {showNav && (
        <div className="card mb-5 grid grid-cols-8 gap-1.5 p-3 sm:grid-cols-10 md:grid-cols-12">
          {mock.questions.map((qq, i) => {
            const answered = !!mock.answers[qq.id]
            const flagged = !!mock.flags[qq.id]
            return (
              <button
                key={qq.id}
                onClick={() => {
                  mock.goto(i)
                  setShowNav(false)
                }}
                className={cn(
                  'relative aspect-square rounded text-xs font-medium',
                  i === mock.index && 'ring-2 ring-brand-500',
                  answered
                    ? 'bg-brand-600 text-white'
                    : 'bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-300',
                )}
              >
                {i + 1}
                {flagged && (
                  <span className="absolute -right-0.5 -top-0.5 h-2 w-2 rounded-full bg-amber-400 ring-1 ring-white dark:ring-slate-900" />
                )}
              </button>
            )
          })}
        </div>
      )}

      {paused ? (
        <div className="card p-12 text-center">
          <p className="text-2xl font-bold">Paused</p>
          <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
            Timer stopped at {formatClock(remaining)}. The real exam can’t be paused.
          </p>
          <button className="btn-primary mt-5" onClick={() => mock.resume()}>
            Resume exam
          </button>
        </div>
      ) : (
        q && (
          <div className="card p-5 sm:p-6">
            <div className="mb-4 flex items-center justify-between gap-2 text-xs text-slate-500 dark:text-slate-400">
              <span>
                Question {mock.index + 1} of {mock.questions.length}
              </span>
              <div className="flex items-center gap-2">
                {q.type === 'item_set' && <Badge tone="amber">Item set</Badge>}
                <button
                  type="button"
                  onClick={() => mock.toggleFlag(q.id)}
                  aria-pressed={!!mock.flags[q.id]}
                  title="Flag for review (F)"
                  className={cn(
                    'rounded-md border px-2 py-1 text-xs font-medium transition',
                    mock.flags[q.id]
                      ? 'border-amber-400 bg-amber-50 text-amber-700 dark:bg-amber-900/20 dark:text-amber-300'
                      : 'border-slate-300 text-slate-500 hover:border-amber-400 hover:text-amber-600 dark:border-slate-700 dark:text-slate-400',
                  )}
                >
                  {mock.flags[q.id] ? '⚑ Flagged' : '⚑ Flag'}
                </button>
              </div>
            </div>
            <QuestionCard
              question={q}
              selected={mock.answers[q.id]}
              revealed={false}
              hideMeta
              onSelect={(key) => mock.answer(q.id, key)}
            />
            <div className="mt-6 flex items-center justify-between">
              <button className="btn-secondary" onClick={() => mock.prev()} disabled={mock.index === 0}>
                ← Previous
              </button>
              <button
                className="btn-primary"
                onClick={() => mock.next()}
                disabled={mock.index === mock.questions.length - 1}
              >
                Next →
              </button>
            </div>
          </div>
        )
      )}

      {confirming && (
        <Modal onClose={() => setConfirming(false)}>
          <p className="text-lg font-semibold">Submit your exam?</p>
          <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
            {unanswered > 0
              ? `You have ${unanswered} unanswered question${unanswered === 1 ? '' : 's'}. They’ll be marked incorrect.`
              : 'All questions answered.'}
          </p>
          <div className="mt-5 flex justify-center gap-3">
            <button className="btn-secondary" onClick={() => setConfirming(false)}>
              Keep going
            </button>
            <button className="btn-primary" onClick={() => mock.submit(false)}>
              Submit now
            </button>
          </div>
        </Modal>
      )}

      {quitting && (
        <Modal onClose={() => setQuitting(false)}>
          <p className="text-lg font-semibold">Quit this exam?</p>
          <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
            Your answers will be discarded — this attempt won’t be scored or saved.
          </p>
          <div className="mt-5 flex justify-center gap-3">
            <button className="btn-secondary" onClick={() => setQuitting(false)}>
              Keep going
            </button>
            <button className="btn bg-red-600 text-white hover:bg-red-700" onClick={() => mock.reset()}>
              Quit exam
            </button>
          </div>
        </Modal>
      )}
    </div>
  )
}
