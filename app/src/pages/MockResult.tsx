import { useEffect, useMemo } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useData } from '../data/DataContext'
import { useMock } from '../store/mock'
import { useProgress } from '../store/progress'
import { scoreMock, type Bucket } from '../lib/scoring'
import { QuestionCard } from '../components/QuestionCard'
import { Badge, PageHeading } from '../components/ui'
import { cn } from '../lib/format'

export default function MockResult() {
  const { elementsById } = useData()
  const mock = useMock()
  const addMockResult = useProgress((s) => s.addMockResult)
  const navigate = useNavigate()

  const elementTitles = useMemo(() => {
    const m = new Map<number, string>()
    elementsById.forEach((el, id) => m.set(id, el.title))
    return m
  }, [elementsById])

  const hasResult = mock.status === 'submitted' && mock.questions.length > 0
  const score = useMemo(
    () => (hasResult ? scoreMock(mock.questions, mock.answers, elementTitles) : null),
    [hasResult, mock.questions, mock.answers, elementTitles],
  )

  // Persist this attempt once.
  useEffect(() => {
    if (!score || !mock.startedAt) return
    addMockResult({
      startedAt: mock.startedAt,
      finishedAt: Date.now(),
      total: score.total,
      correct: score.correct,
      overallPct: score.overallPct,
      autoSubmitted: mock.autoSubmitted,
    })
  }, [score, mock.startedAt, mock.autoSubmitted, addMockResult])

  function startAnother() {
    mock.reset()
    navigate('/mock')
  }

  if (!score) {
    return (
      <div className="card p-8 text-center">
        <p className="text-lg font-semibold">No mock results yet</p>
        <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">Take a mock exam to see your breakdown here.</p>
        <Link to="/mock" className="btn-primary mt-4 inline-flex">
          Go to mock exam
        </Link>
      </div>
    )
  }

  const review = [...score.incorrect, ...score.unanswered]

  return (
    <div className="space-y-8">
      <PageHeading title="Mock exam results" subtitle="No pass mark is published by CIRO — this is a breakdown, not a verdict." />

      <section className="card flex flex-col items-center gap-2 p-8 text-center">
        <p className="text-6xl font-bold text-brand-700 dark:text-brand-300">{score.overallPct}%</p>
        <p className="text-sm text-slate-500 dark:text-slate-400">
          {score.correct} of {score.total} correct · {score.answered} answered
          {mock.autoSubmitted && ' · auto-submitted at time'}
        </p>
      </section>

      <section className="grid gap-6 md:grid-cols-2">
        <div className="card p-5">
          <h2 className="mb-3 font-semibold">By element</h2>
          <div className="space-y-3">
            {score.perElement.map((b) => (
              <BucketRow key={b.key} bucket={b} />
            ))}
          </div>
        </div>
        <div className="card p-5">
          <h2 className="mb-3 font-semibold">By skill level</h2>
          <div className="space-y-3">
            {score.perTaxonomy.map((b) => (
              <BucketRow key={b.key} bucket={b} />
            ))}
          </div>
        </div>
      </section>

      <div className="flex flex-wrap gap-3">
        <button className="btn-primary" onClick={startAnother}>
          New mock exam
        </button>
        <Link to="/" className="btn-secondary">
          Back to home
        </Link>
      </div>

      {review.length > 0 && (
        <section>
          <h2 className="mb-1 text-lg font-semibold">
            Review — {score.incorrect.length} incorrect
            {score.unanswered.length > 0 && `, ${score.unanswered.length} unanswered`}
          </h2>
          <p className="mb-4 text-sm text-slate-500 dark:text-slate-400">
            Each comes with the full rationale and rule references.
          </p>
          <div className="space-y-5">
            {review.map((q) => (
              <div key={q.id} className="card p-5">
                <QuestionCard question={q} selected={mock.answers[q.id]} revealed />
              </div>
            ))}
          </div>
        </section>
      )}

      {review.length === 0 && (
        <div className="card p-6 text-center">
          <Badge tone="green">Perfect run</Badge>
          <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
            You answered every question correctly. Try another form for fresh questions.
          </p>
        </div>
      )}
    </div>
  )
}

function BucketRow({ bucket }: { bucket: Bucket }) {
  const pct = bucket.total === 0 ? 0 : Math.round((bucket.correct / bucket.total) * 100)
  const tone = pct >= 75 ? 'bg-green-500' : pct >= 50 ? 'bg-amber-500' : 'bg-red-500'
  return (
    <div>
      <div className="mb-1 flex items-center justify-between text-sm">
        <span className="truncate pr-2 text-slate-600 dark:text-slate-300">{bucket.label}</span>
        <span className="flex-none font-medium tabular-nums">
          {bucket.correct}/{bucket.total} · {pct}%
        </span>
      </div>
      <div className="h-2 w-full overflow-hidden rounded-full bg-slate-200 dark:bg-slate-800">
        <div className={cn('h-full rounded-full transition-all', tone)} style={{ width: `${pct}%` }} />
      </div>
    </div>
  )
}
