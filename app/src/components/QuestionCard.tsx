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
}

export function QuestionCard({
  question: q,
  selected,
  revealed,
  onSelect,
  showScenario = true,
  hideMeta = false,
}: Props) {
  return (
    <div className="space-y-4">
      {!hideMeta && (
        <div className="flex flex-wrap items-center gap-2">
          <Badge tone="brand">Element {q.element}</Badge>
          <Badge>Outcome {q.outcome}</Badge>
          <Badge tone="violet">{q.taxonomy}</Badge>
          <DifficultyBadge difficulty={q.difficulty} />
          {q.type === 'item_set' && <Badge tone="amber">Item set</Badge>}
        </div>
      )}

      {showScenario && q.type === 'item_set' && q.scenario && (
        <div className="rounded-lg border-l-4 border-amber-400 bg-amber-50 p-4 text-sm leading-relaxed text-slate-700 dark:bg-amber-900/15 dark:text-slate-200">
          <p className="mb-1 text-xs font-semibold uppercase tracking-wide text-amber-700 dark:text-amber-300">
            Scenario
          </p>
          {q.scenario}
        </div>
      )}

      <p className="text-base font-medium leading-relaxed">{q.stem}</p>

      <ul className="space-y-2">
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
                  'flex w-full items-start gap-3 rounded-lg border p-3 text-left text-sm transition',
                  state === 'idle' &&
                    'border-slate-200 bg-white hover:border-brand-300 hover:bg-brand-50/50 dark:border-slate-700 dark:bg-slate-900 dark:hover:border-brand-700 dark:hover:bg-slate-800',
                  state === 'active' &&
                    'border-brand-500 bg-brand-50 ring-1 ring-brand-400 dark:border-brand-500 dark:bg-brand-900/30',
                  state === 'correct' &&
                    'border-green-500 bg-green-50 dark:border-green-600 dark:bg-green-900/25',
                  state === 'wrong' &&
                    'border-red-500 bg-red-50 dark:border-red-600 dark:bg-red-900/25',
                  revealed && 'cursor-default',
                )}
              >
                <span
                  className={cn(
                    'grid h-6 w-6 flex-none place-items-center rounded-full border text-xs font-bold',
                    state === 'correct' && 'border-green-600 bg-green-600 text-white',
                    state === 'wrong' && 'border-red-600 bg-red-600 text-white',
                    state === 'active' && 'border-brand-600 bg-brand-600 text-white',
                    state === 'idle' && 'border-slate-300 text-slate-500 dark:border-slate-600',
                  )}
                >
                  {key}
                </span>
                <span className="pt-0.5">{q.options[key]}</span>
                {revealed && isCorrect && (
                  <span className="ml-auto pt-0.5 text-xs font-semibold text-green-700 dark:text-green-300">
                    Correct
                  </span>
                )}
                {revealed && isSelected && !isCorrect && (
                  <span className="ml-auto pt-0.5 text-xs font-semibold text-red-700 dark:text-red-300">
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
    <div className="space-y-3 rounded-lg bg-slate-50 p-4 dark:bg-slate-800/60">
      <p className={cn('text-sm font-semibold', gotIt ? 'text-green-700 dark:text-green-300' : 'text-red-700 dark:text-red-300')}>
        {selected ? (gotIt ? 'Correct' : 'Not quite') : 'Answer'} — the key is {q.answer}.
      </p>
      <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-200">{q.rationale}</p>
      {q.rule_refs && q.rule_refs.length > 0 && (
        <div className="flex flex-wrap items-center gap-1.5">
          <span className="text-xs font-medium text-slate-500 dark:text-slate-400">References:</span>
          {q.rule_refs.map((r) => (
            <Badge key={r}>{r}</Badge>
          ))}
        </div>
      )}
      {q.source_quote && (
        <div>
          <button
            type="button"
            onClick={() => setShowSource((v) => !v)}
            className="text-xs font-medium text-brand-600 hover:underline dark:text-brand-300"
          >
            {showSource ? 'Hide source' : 'Show source quote'}
          </button>
          {showSource && (
            <p className="mt-2 border-l-2 border-slate-300 pl-3 text-xs italic leading-relaxed text-slate-500 dark:border-slate-600 dark:text-slate-400">
              {q.source_quote}
            </p>
          )}
        </div>
      )}
    </div>
  )
}
