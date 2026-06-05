import { useEffect, useMemo, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { useData } from '../data/DataContext'
import { useProgress } from '../store/progress'
import { QuestionCard } from '../components/QuestionCard'
import { PageHeading } from '../components/ui'
import type { Difficulty, OptionKey, Question, Taxonomy } from '../types'
import { DIFFICULTIES, TAXONOMIES } from '../types'

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

const clip = (s: string, n = 52) => (s.length > n ? s.slice(0, n) + '…' : s)

export default function Drill() {
  const { reviewedQuestions, syllabus, outcomesByElement } = useData()
  const recordDrill = useProgress((s) => s.recordDrill)
  const [params] = useSearchParams()

  const [element, setElement] = useState<string>(() => params.get('element') ?? 'all')
  const [outcome, setOutcome] = useState<string>('all')
  const [difficulty, setDifficulty] = useState<string>('all')
  const [taxonomy, setTaxonomy] = useState<string>('all')
  const [nonce, setNonce] = useState(0)

  const pool = useMemo(() => {
    return reviewedQuestions.filter((q) => {
      if (element !== 'all' && q.element !== Number(element)) return false
      if (outcome !== 'all' && q.outcome !== outcome) return false
      if (difficulty !== 'all' && q.difficulty !== (difficulty as Difficulty)) return false
      if (taxonomy !== 'all' && q.taxonomy !== (taxonomy as Taxonomy)) return false
      return true
    })
  }, [reviewedQuestions, element, outcome, difficulty, taxonomy])

  const queue = useMemo<Question[]>(() => shuffle(pool), [pool, nonce])

  // Reviewed-question count per outcome — shown in the dropdown so it's clear each
  // outcome is populated (currently every outcome has at least one question).
  const outcomeCounts = useMemo(() => {
    const m = new Map<string, number>()
    for (const q of reviewedQuestions) m.set(q.outcome, (m.get(q.outcome) ?? 0) + 1)
    return m
  }, [reviewedQuestions])

  const [pointer, setPointer] = useState(0)
  const [selected, setSelected] = useState<OptionKey | undefined>(undefined)
  const [revealed, setRevealed] = useState(false)
  const [session, setSession] = useState({ seen: 0, correct: 0 })

  // Reset the run whenever the queue identity changes (filters changed or reshuffled).
  useEffect(() => {
    setPointer(0)
    setSelected(undefined)
    setRevealed(false)
    setSession({ seen: 0, correct: 0 })
  }, [queue])

  const current = queue[pointer]
  const outcomeOptions = element !== 'all' ? (outcomesByElement.get(Number(element)) ?? []) : []

  function pick(key: OptionKey) {
    if (revealed || !current) return
    const isCorrect = key === current.answer
    setSelected(key)
    setRevealed(true)
    setSession((s) => ({ seen: s.seen + 1, correct: s.correct + (isCorrect ? 1 : 0) }))
    recordDrill(current.id, key, isCorrect)
  }

  function next() {
    setSelected(undefined)
    setRevealed(false)
    setPointer((p) => p + 1)
  }

  const exhausted = pointer >= queue.length

  return (
    <div>
      <PageHeading
        title="Drill mode"
        subtitle="Filter the bank, answer one question at a time, and see the rationale and rule references immediately."
      />

      <div className="card mb-6 grid gap-3 p-4 sm:grid-cols-2 lg:grid-cols-4">
        <Field label="Element">
          <select
            className="field w-full"
            value={element}
            onChange={(e) => {
              setElement(e.target.value)
              setOutcome('all')
            }}
          >
            <option value="all">All elements</option>
            {syllabus.elements.map((el) => (
              <option key={el.id} value={el.id}>
                E{el.id} · {el.title}
              </option>
            ))}
          </select>
        </Field>
        <Field label="Outcome">
          <select className="field w-full" value={outcome} onChange={(e) => setOutcome(e.target.value)}>
            <option value="all">All outcomes</option>
            {element !== 'all'
              ? outcomeOptions.map((o) => (
                  <option key={o.id} value={o.id}>
                    {o.id} — {clip(o.statement)} ({outcomeCounts.get(o.id) ?? 0})
                  </option>
                ))
              : syllabus.elements.map((el) => (
                  <optgroup key={el.id} label={`E${el.id} · ${el.title}`}>
                    {el.outcomes.map((o) => (
                      <option key={o.id} value={o.id}>
                        {o.id} — {clip(o.statement)} ({outcomeCounts.get(o.id) ?? 0})
                      </option>
                    ))}
                  </optgroup>
                ))}
          </select>
        </Field>
        <Field label="Difficulty">
          <select className="field w-full" value={difficulty} onChange={(e) => setDifficulty(e.target.value)}>
            <option value="all">Any difficulty</option>
            {DIFFICULTIES.map((d) => (
              <option key={d} value={d}>
                {d}
              </option>
            ))}
          </select>
        </Field>
        <Field label="Skill level">
          <select className="field w-full" value={taxonomy} onChange={(e) => setTaxonomy(e.target.value)}>
            <option value="all">Any skill</option>
            {TAXONOMIES.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>
        </Field>
      </div>

      {pool.length === 0 ? (
        <div className="card p-8 text-center text-slate-500 dark:text-slate-400">
          No questions match these filters. Try widening them.
        </div>
      ) : exhausted ? (
        <div className="card p-8 text-center">
          <p className="text-lg font-semibold">Run complete</p>
          <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
            You answered {session.seen} question{session.seen === 1 ? '' : 's'} — {session.correct}{' '}
            correct ({session.seen ? Math.round((session.correct / session.seen) * 100) : 0}%).
          </p>
          <button className="btn-primary mt-4" onClick={() => setNonce((n) => n + 1)}>
            Reshuffle &amp; go again
          </button>
        </div>
      ) : (
        current && (
          <div className="card p-5 sm:p-6">
            <div className="mb-4 flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
              <span>
                Question {pointer + 1} of {queue.length}
              </span>
              <span>
                Session: {session.correct}/{session.seen} correct
              </span>
            </div>

            <QuestionCard question={current} selected={selected} revealed={revealed} onSelect={pick} />

            <div className="mt-6 flex items-center justify-between">
              <p className="text-xs text-slate-400">
                {revealed ? 'Review the explanation, then continue.' : 'Select the best answer.'}
              </p>
              <button className="btn-primary" disabled={!revealed} onClick={next}>
                {pointer + 1 === queue.length ? 'Finish' : 'Next question →'}
              </button>
            </div>
          </div>
        )
      )}
    </div>
  )
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="mb-1 block text-xs font-medium text-slate-500 dark:text-slate-400">{label}</span>
      {children}
    </label>
  )
}
