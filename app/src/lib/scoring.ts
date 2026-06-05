import type { OptionKey, Question, Taxonomy } from '../types'
import { TAXONOMIES } from '../types'

export interface Bucket {
  key: string
  label: string
  correct: number
  total: number
}

export interface MockScore {
  total: number
  answered: number
  correct: number
  overallPct: number
  perElement: Bucket[]
  perTaxonomy: Bucket[]
  incorrect: Question[]
  unanswered: Question[]
}

const pct = (correct: number, total: number) => (total === 0 ? 0 : Math.round((correct / total) * 100))

/**
 * Score a completed mock form. NOTE: CIRO publishes no pass mark, so this intentionally
 * returns NO pass/fail verdict — only breakdowns. (See PLAN.md.)
 */
export function scoreMock(
  questions: Question[],
  answers: Record<string, OptionKey>,
  elementTitles: Map<number, string>,
): MockScore {
  let correct = 0
  let answered = 0
  const incorrect: Question[] = []
  const unanswered: Question[] = []

  const elementMap = new Map<number, Bucket>()
  const taxMap = new Map<Taxonomy, Bucket>()
  for (const t of TAXONOMIES) taxMap.set(t, { key: t, label: t, correct: 0, total: 0 })

  for (const q of questions) {
    const chosen = answers[q.id]
    const isCorrect = chosen === q.answer
    if (chosen) answered++
    else unanswered.push(q)
    if (isCorrect) correct++
    else if (chosen) incorrect.push(q)

    const eb =
      elementMap.get(q.element) ??
      {
        key: `E${q.element}`,
        label: `E${q.element} · ${elementTitles.get(q.element) ?? ''}`.trim(),
        correct: 0,
        total: 0,
      }
    eb.total++
    if (isCorrect) eb.correct++
    elementMap.set(q.element, eb)

    const tb = taxMap.get(q.taxonomy)!
    tb.total++
    if (isCorrect) tb.correct++
  }

  const perElement = [...elementMap.values()].sort((a, b) => a.key.localeCompare(b.key))
  const perTaxonomy = TAXONOMIES.map((t) => taxMap.get(t)!).filter((b) => b.total > 0)

  return {
    total: questions.length,
    answered,
    correct,
    overallPct: pct(correct, questions.length),
    perElement,
    perTaxonomy,
    incorrect,
    unanswered,
  }
}

export const percent = pct
