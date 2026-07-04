import { useState } from 'react'
import type { OptionKey, Question } from '../types'
import { OPTION_KEYS } from '../types'
import { Badge, DifficultyBadge } from './ui'
import { cn } from '../lib/format'

interface Props {
  question: Question
  selected?: OptionKey
  /** When true, show correctness colouring + the explanation block, and lock options. */
  revealed: boolean
  onSelect?: (key: OptionKey) => void
  /** Render the item-set scenario above the stem (default true). */
  showScenario?: boolean
  /** Hide outcome/difficulty/taxonomy meta (used during a live mock to reduce clutter). */
  hideMeta?: boolean
  /** When provided, show a bookmark (★) toggle in the meta row. */
  bookmarked?: boolean
  onToggleBookmark?: () => void
}

export function QuestionCard({
  question: q,
  selected,
  revealed,
  onSelect,
  showScenario = true,
  hideMeta = false,
  bookmarked = false,
  onToggleBookmark,
}: Props) {
  return (
    <div className="space-y-4">
      {!hideMeta && (
        <div className="flex flex-wrap items-center gap-2 text-xs font-semibold">
          <Badge tone="brand">Element {q.element}</Badge>
          <Badge>Outcome {q.outcome}</Badge>
          <Badge tone="violet">{q.taxonomy}</Badge>
          <DifficultyBadge difficulty={q.difficulty} />
          {q.type === 'item_set' && <Badge tone="amber">Item set</Badge>}
          {onToggleBookmark && (
            <button
              type="button"
              onClick={onToggleBookmark}
              aria-pressed={bookmarked}
              aria-label={bookmarked ? 'Remove bookmark' : 'Bookmark this question'}
              title={bookmarked ? 'Bookmarked' : 'Bookmark'}
              className={cn(
                'ml-auto rounded-lg px-1.5 text-lg leading-none transition',
                bookmarked ? 'text-amber-400' : 'text-slate-300 hover:text-amber-400 dark:text-slate-600',
              )}
            >
              {bookmarked ? '★' : '☆'}
            </button>
          )}
        </div>
      )}

      {showScenario && q.type === 'item_set' && q.scenario && (
        <div className="rounded-2xl border-l-4 border-amber-400 bg-amber-50/80 p-4 text-sm leading-relaxed text-slate-700 dark:border-amber-500/40 dark:bg-amber-500/10 dark:text-slate-200">
          <p className="mb-1 text-xs font-semibold uppercase tracking-wide text-amber-600 dark:text-amber-300">
            Scenario
          </p>
          {q.scenario}
        </div>
      )}

      <p className="font-display text-lg font-semibold leading-relaxed">{q.stem}</p>

      <ul className="space-y-2.5">
        {OPTION_KEYS.map((key) => {
          const isSelected = selected === key
          const isCorrect = q.answer === key
          const state = revealed
            ? isCorrect
              ? 'correct'
              : isSelected
                ? 'wrong'
                : 'idle'
            : isSelected
              ? 'active'
              : 'idle'
          return (
            <li key={key}>
              <button
                type="button"
                disabled={revealed}
                onClick={() => onSelect?.(key)}
                className={cn(
                  'flex w-full items-start gap-3 rounded-2xl border p-4 text-left text-sm transition',
                  state === 'idle' &&
                    'border-slate-200/70 bg-white/50 hover:border-indigo-300 hover:bg-indigo-50/50 dark:border-white/5 dark:bg-white/[0.03] dark:hover:border-indigo-500/40 dark:hover:bg-indigo-500/10',
                  state === 'active' &&
                    'border-indigo-400/60 bg-indigo-50/80 ring-1 ring-indigo-400 dark:border-indigo-500/40 dark:bg-indigo-500/10',
                  state === 'correct' &&
                    'border-emerald-400/60 bg-emerald-50/80 dark:border-emerald-500/40 dark:bg-emerald-500/10',
                  state === 'wrong' &&
                    'border-rose-400/60 bg-rose-50/80 dark:border-rose-500/40 dark:bg-rose-500/10',
                  revealed && 'cursor-default',
                )}
              >
                <span
                  className={cn(
                    'grid h-7 w-7 flex-none place-items-center rounded-xl text-xs font-bold',
                    state === 'correct' && 'bg-emerald-500 text-white',
                    state === 'wrong' && 'bg-rose-500 text-white',
                    state === 'active' && 'bg-indigo-500 text-white',
                    state === 'idle' && 'bg-slate-100 text-slate-500 dark:bg-white/10 dark:text-slate-300',
                  )}
                >
                  {key}
                </span>
                <span className="pt-0.5">{q.options[key]}</span>
                {revealed && isCorrect && (
                  <span className="ml-auto pt-0.5 text-xs font-semibold text-emerald-600 dark:text-emerald-300">
                    Correct
                  </span>
                )}
                {revealed && isSelected && !isCorrect && (
                  <span className="ml-auto pt-0.5 text-xs font-semibold text-rose-600 dark:text-rose-300">
                    Your answer
                  </span>
                )}
              </button>
            </li>
          )
        })}
      </ul>

      {revealed && <Explanation q={q} selected={selected} />}
    </div>
  )
}

function Explanation({ q, selected }: { q: Question; selected?: OptionKey }) {
  const [showSource, setShowSource] = useState(false)
  const gotIt = selected === q.answer
  return (
    <div className="space-y-3 rounded-2xl bg-gradient-to-br from-indigo-50 to-violet-50 p-5 dark:from-indigo-500/10 dark:to-violet-500/10">
      <p className={cn('font-display text-sm font-bold', gotIt ? 'text-emerald-600 dark:text-emerald-300' : 'text-rose-600 dark:text-rose-300')}>
        {selected ? (gotIt ? 'Correct' : 'Not quite') : 'Answer'} — the key is {q.answer}.
      </p>
      <p className="text-sm leading-relaxed text-slate-600 dark:text-slate-300">{q.rationale}</p>
      {q.rule_refs && q.rule_refs.length > 0 && (
        <div className="flex flex-wrap items-center gap-1.5">
          <span className="text-xs font-medium text-slate-500 dark:text-slate-400">References:</span>
          {q.rule_refs.map((r) => (
            <span key={r} className="rounded-full bg-white/80 px-2.5 py-1 text-xs font-medium text-slate-500 dark:bg-white/10 dark:text-slate-300">
              {r}
            </span>
          ))}
        </div>
      )}
      {q.source_quote && (
        <div>
          <button
            type="button"
            onClick={() => setShowSource((v) => !v)}
            className="text-xs font-medium text-indigo-600 hover:underline dark:text-indigo-300"
          >
            {showSource ? 'Hide source' : 'Show source quote'}
          </button>
          {showSource && (
            <p className="mt-2 border-l-2 border-slate-300 pl-3 text-xs italic leading-relaxed text-slate-500 dark:border-white/10 dark:text-slate-400">
              {q.source_quote}
            </p>
          )}
        </div>
      )}
    </div>
  )
}
