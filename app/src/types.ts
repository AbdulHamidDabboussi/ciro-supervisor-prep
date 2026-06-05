// Mirrors the source-of-truth JSON Schemas:
//   ../../question-bank/schema.json and ../../study-material/flashcards/schema.json
// Do not hand-edit the data to fit these — the data is generated; these track the data.

export type Taxonomy = 'Remember' | 'Understand' | 'Apply' | 'Analyze'
export type Difficulty = 'easy' | 'medium' | 'hard'
export type QuestionType = 'standard' | 'item_set'
export type OptionKey = 'A' | 'B' | 'C' | 'D'
export type Status = 'draft' | 'reviewed' | 'published'

export const OPTION_KEYS: OptionKey[] = ['A', 'B', 'C', 'D']
export const TAXONOMIES: Taxonomy[] = ['Remember', 'Understand', 'Apply', 'Analyze']
export const DIFFICULTIES: Difficulty[] = ['easy', 'medium', 'hard']

export interface Question {
  id: string
  element: number
  outcome: string
  taxonomy: Taxonomy
  type: QuestionType
  item_set_id?: string | null
  scenario?: string | null
  stem: string
  options: Record<OptionKey, string>
  answer: OptionKey
  rationale: string
  rule_refs?: string[]
  difficulty?: Difficulty
  status: Status
  source_quote?: string
  qa_note?: string
}

export interface Bank {
  meta: Record<string, unknown>
  questions: Question[]
}

export type CardType = 'definition' | 'threshold' | 'list' | 'distinction' | 'process' | 'trap'

export interface Flashcard {
  id: string
  element: number
  outcome: string
  type: CardType
  front: string
  back: string
  rule_refs: string[]
  source_quote?: string
  related_questions?: string[]
  status: Status
  qa_note?: string
}

export interface Deck {
  meta: Record<string, unknown>
  cards: Flashcard[]
}

export interface Outcome {
  id: string
  taxonomy: Taxonomy
  statement: string
}

export interface SyllabusElement {
  id: number
  title: string
  questions: number
  summary: string
  outcomes: Outcome[]
}

export interface Syllabus {
  meta: Record<string, unknown>
  elements: SyllabusElement[]
}

export interface ElementWeight {
  element: number
  title: string
  questions: number
}

export interface ExamMeta {
  exam: string
  regulator: string
  regime: string
  effective_date: string
  replaces: string
  syllabus_version: string
  format: {
    papers: number
    questions_total: number
    questions_standard: number
    questions_item_set: number
    options_per_question: number
    duration_minutes: number
    delivery: string
    proctoring: string[]
    languages: string[]
    closed_book: boolean
    scratch_paper: string
    calculator_policy: string
    taxonomy_levels: Taxonomy[]
    taxonomy_note: string
  }
  scoring: {
    pass_mark: number | null
    pass_mark_note: string
    result_types: string[]
  }
  fees_cad: { first_attempt: number; retake: number; taxes: string; payment: string }
  attempts: {
    max_per_enrolment_period: number
    enrolment_period_months: number
    cooling_off: string
    reschedule_free_cutoff_hours: number
    no_show: string
  }
  administration: Record<string, string>
  eligibility: Record<string, string | boolean>
  approval_requirements_supervisor: Record<string, string>
  validity: { exam_validity_years: number; rule: string; extensions: string[] }
  official_resources: Record<string, string>
  element_weights: ElementWeight[]
  sources_verified: string
}
