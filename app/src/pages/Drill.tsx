import { useEffect, useMemo, useRef, useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { useData, QuestionsStatus } from '../data/DataContext'
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

type Focus = 'all' | 'misses' | 'bookmarked'

export default function Drill() {
  const { reviewedQuestions, syllabus, outcomesByElement, questionsReady } = useData()
  const recordDrill = useProgress((s) => s.recordDrill)
  const drill = useProgress((s) => s.drill)
  const bookmarks = useProgress((s) => s.bookmarks)
  const toggleBookmark = useProgress((s) => s.toggleBookmark)
  const [params] = useSearchParams()

  // drill/bookmarks read via refs so answering mid-session doesn't rebuild the queue.
  const drillRef = useRef(drill)
  const bookmarksRef = useRef(bookmarks)
  drillRef.current = drill
  bookmarksRef.current = bookmarks

  const [focus, setFocus] = useState<Focus>(() => {
    const f = params.get('focus')
    return f === 'misses' || f === 'bookmarked' ? f : 'all'
  })
  const [element, setElement] = useState<string>(() => params.get('element') ?? 'all')
  const [outcome, setOutcome] = useState<string>(() => params.get('outcome') ?? 'all')
  const [difficulty, setDifficulty] = useState<string>('all')
  const [taxonomy, setTaxonomy] = useState<string>('all')
  const [nonce, setNonce] = useState(0)
  const [sessionSize, setSessionSize] = useState<number | 'all'>('all')

  // ?ids=ID1,ID2 — practice an explicit set of questions (e.g. a flashcard's related questions).
  const idsParam = params.get('ids')
  const idSet = useMemo(
    () => (idsParam ? new Set(idsParam.split(',').filter(Boolean)) : null),
    [idsParam],
  )

  const pool = useMemo(() => {
    if (idSet) return reviewedQuestions.filter((q) => idSet.has(q.id))
    return reviewedQuestions.filter((q) => {
      if (focus === 'misses' && drillRef.current[q.id]?.lastCorrect !== false) return false
      if (focus === 'bookmarked' && !bookmarksRef.current[q.id]) return false
      if (element !== 'all' && q.element !== Number(element)) return false
      if (outcome !== 'all' && q.outcome !== outcome) return false
      if (difficulty !== 'all' && q.difficulty !== (difficulty as Difficulty)) return false
      if (taxonomy !== 'all' && q.taxonomy !== (taxonomy as Taxonomy)) return false
      return true
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reviewedQuestions, idSet, focus, element, outcome, difficulty, taxonomy, nonce])

  const queue = useMemo<Question[]>(() => {
    const shuffled = shuffle(pool)
    return sessionSize === 'all' ? shuffled : shuffled.slice(0, sessionSize)
  }, [pool, nonce, sessionSize])

  const outcomeCounts = useMemo(() => {
    const m = new Map<string, number>()
    for (const q of reviewedQuestions) m.set(q.outcome, (m.get(q.outcome) ?? 0) + 1)
    return m
  }, [reviewedQuestions])

  const [pointer, setPointer] = useState(0)
  const [selected, setSelected] = useState<OptionKey | undefined>(undefined)
  const [revealed, setRevealed] = useState(false)
  const [session, setSession] = useState({ seen: 0, correct: 0 })

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

  // Keyboard: A–D / 1–4 to answer; Enter or → to advance.
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.metaKey || e.ctrlKey || e.altKey) return
      const tag = (e.target as HTMLElement | null)?.tagName
      if (tag === 'SELECT' || tag === 'INPUT' || tag === 'TEXTAREA') return
      if (!current) return
      if (!revealed) {
        const map: Record<string, OptionKey> = {
          '1': 'A', '2': 'B', '3': 'C', '4': 'D', a: 'A', b: 'B', c: 'C', d: 'D',
        }
        const k = map[e.key.toLowerCase()]
        if (k) {
          e.preventDefault()
          pick(k)
        }
      } else if (e.key === 'ArrowRight' || (e.key === 'Enter' && tag !== 'BUTTON')) {
        e.preventDefault()
        next()
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [current, revealed])

  if (!questionsReady) {
    return (
      <div>
        <PageHeading title="Drill mode" subtitle="Filter the bank and practice one question at a time." />
        <QuestionsStatus />
      </div>
    )
  }

  const exhausted = pointer >= queue.length
  const emptyMsg = idSet
    ? 'None of those questions were found in the bank.'
    : focus === 'misses'
      ? 'No missed questions here yet — answer some questions (in All mode), and the ones you get wrong show up here.'
      : focus === 'bookmarked'
        ? 'No bookmarked questions here yet. Tap the ☆ on a question to save it for later.'
        : 'No questions match these filters. Try widening them.'

  return (
    <div>
      <PageHeading
        title="Drill mode"
        subtitle="Filter the bank, answer one question at a time, and see the rationale and rule references immediately."
      />

      {idSet && (
        <div className="card mb-6 flex flex-wrap items-center justify-between gap-3 p-4 text-sm">
          <span className="text-slate-600 dark:text-slate-300">
            Practicing {pool.length} selected question{pool.length === 1 ? '' : 's'}.
          </span>
          <Link to="/drill" className="btn-secondary !py-1.5">
            Drill the full bank →
          </Link>
        </div>
      )}

      <div className={`card mb-6 grid gap-3 p-4 sm:grid-cols-2 lg:grid-cols-3${idSet ? ' hidden' : ''}`}>
        <Field label="Focus">
          <select className="field w-full" value={focus} onChange={(e) => setFocus(e.target.value as Focus)}>
            <option value="all">All questions</option>
            <option value="misses">Review my misses</option>
            <option value="bookmarked">Bookmarked</option>
          </select>
        </Field>
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
                {d[0].toUpperCase() + d.slice(1)}
              </option>
            ))}
          </select>
        </Field>
        <Field label="Skill type">
          <select className="field w-full" value={taxonomy} onChange={(e) => setTaxonomy(e.target.value)}>
            <option value="all">Any skill type</option>
            {TAXONOMIES.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>
        </Field>
        <Field label="Session">
          <select
            className="field w-full"
            value={String(sessionSize)}
            onChange={(e) => setSessionSize(e.target.value === 'all' ? 'all' : Number(e.target.value))}
          >
            <option value="10">10 questions</option>
            <option value="25">25 questions</option>
            <option value="50">50 questions</option>
            <option value="all">All ({pool.length})</option>
          </select>
        </Field>
      </div>

      {pool.length === 0 ? (
        <div className="card p-8 text-center text-slate-500 dark:text-slate-400">{emptyMsg}</div>
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

            <QuestionCard
              question={current}
              selected={selected}
              revealed={revealed}
              onSelect={pick}
              bookmarked={!!bookmarks[current.id]}
              onToggleBookmark={() => toggleBookmark(current.id)}
            />

            <div className="mt-6 flex items-center justify-between">
              <p className="text-xs text-slate-400">
                {revealed
                  ? 'Review the explanation, then continue (Enter).'
                  : 'Select the best answer (keys A–D or 1–4).'}
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
