import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { OptionKey } from '../types'

export interface DrillRecord {
  seen: number
  correct: number
  lastChosen?: OptionKey
  lastCorrect?: boolean
}

export type CardStatus = 'known' | 'again'

export type Focus = 'all' | 'misses' | 'bookmarked'

/**
 * A resumable drill run. Persisted so a refresh / leaving and returning lands
 * the user back on the exact question they left off on, in the same order.
 * `sig` is a fingerprint of the filters that produced `ids` — when the user
 * changes filters (or reshuffles) the sig changes and a fresh session is built.
 */
export interface DrillSession {
  sig: string
  focus: Focus
  element: string
  outcome: string
  difficulty: string
  taxonomy: string
  hideAnswered: boolean
  sessionSize: number | 'all'
  ids: string[]
  pointer: number
  seen: number
  correct: number
  selected?: OptionKey
  revealed: boolean
}

export interface MockResultSummary {
  startedAt: number
  finishedAt: number
  total: number
  correct: number
  overallPct: number
  autoSubmitted: boolean
  perElement: { element: number; correct: number; total: number }[]
}

/** Where the reader last was in the study guide (the outcome section at the top of the screen). */
export interface GuidePosition {
  element: number
  outcome: string
  title: string
  at: number
}

interface ProgressState {
  drill: Record<string, DrillRecord>
  cards: Record<string, CardStatus>
  mockHistory: MockResultSummary[]
  bookmarks: Record<string, true>
  drillSession: DrillSession | null
  guidePosition: GuidePosition | null
  /** Study-guide outcome ids the reader has finished (auto-marked or ticked). */
  guideRead: Record<string, true>
  recordDrill: (id: string, chosen: OptionKey, isCorrect: boolean) => void
  setCardStatus: (id: string, status: CardStatus) => void
  toggleBookmark: (id: string) => void
  addMockResult: (r: MockResultSummary) => void
  startDrillSession: (s: DrillSession) => void
  answerDrillCurrent: (chosen: OptionKey, isCorrect: boolean) => void
  advanceDrillCurrent: () => void
  setGuidePosition: (p: GuidePosition) => void
  setGuideRead: (outcome: string, read: boolean) => void
  /** Un-mark every given outcome (e.g. one element's) as read. */
  clearGuideRead: (outcomes: string[]) => void
  resetAll: () => void
  // Derived counts
  drillStats: () => { attempted: number; correct: number }
}

// Initial (empty) data — also the base for hydration, so switching to an exam with no
// saved progress starts clean (see examScope.ts).
const EMPTY_PROGRESS = {
  drill: {},
  cards: {},
  mockHistory: [],
  bookmarks: {},
  drillSession: null,
  guidePosition: null,
  guideRead: {},
}

export const useProgress = create<ProgressState>()(
  persist(
    (set, get) => ({
      ...EMPTY_PROGRESS,

      recordDrill: (id, chosen, isCorrect) =>
        set((s) => {
          const prev = s.drill[id] ?? { seen: 0, correct: 0 }
          return {
            drill: {
              ...s.drill,
              [id]: {
                seen: prev.seen + 1,
                correct: prev.correct + (isCorrect ? 1 : 0),
                lastChosen: chosen,
                lastCorrect: isCorrect,
              },
            },
          }
        }),

      setCardStatus: (id, status) => set((s) => ({ cards: { ...s.cards, [id]: status } })),

      toggleBookmark: (id) =>
        set((s) => {
          const next = { ...s.bookmarks }
          if (next[id]) delete next[id]
          else next[id] = true
          return { bookmarks: next }
        }),

      // Idempotent per session: re-rendering the result page won't duplicate an entry.
      addMockResult: (r) =>
        set((s) =>
          s.mockHistory[0]?.startedAt === r.startedAt
            ? s
            : { mockHistory: [r, ...s.mockHistory].slice(0, 50) },
        ),

      startDrillSession: (s) => set({ drillSession: s }),

      // Records the answer onto the live session (idempotent per question: a
      // refresh while a question is revealed won't re-count it).
      answerDrillCurrent: (chosen, isCorrect) =>
        set((s) => {
          const ds = s.drillSession
          if (!ds || ds.revealed) return s
          return {
            drillSession: {
              ...ds,
              selected: chosen,
              revealed: true,
              seen: ds.seen + 1,
              correct: ds.correct + (isCorrect ? 1 : 0),
            },
          }
        }),

      advanceDrillCurrent: () =>
        set((s) => {
          const ds = s.drillSession
          if (!ds) return s
          return {
            drillSession: { ...ds, pointer: ds.pointer + 1, selected: undefined, revealed: false },
          }
        }),

      setGuidePosition: (guidePosition) => set({ guidePosition }),

      setGuideRead: (outcome, read) =>
        set((s) => {
          if (Boolean(s.guideRead[outcome]) === read) return s
          const next = { ...s.guideRead }
          if (read) next[outcome] = true
          else delete next[outcome]
          return { guideRead: next }
        }),

      clearGuideRead: (outcomes) =>
        set((s) => {
          const next = { ...s.guideRead }
          for (const o of outcomes) delete next[o]
          return { guideRead: next }
        }),

      resetAll: () => set(EMPTY_PROGRESS),

      drillStats: () => {
        const recs = Object.values(get().drill)
        return {
          attempted: recs.length,
          correct: recs.filter((r) => r.lastCorrect).length,
        }
      },
    }),
    {
      // Per-exam key; re-pointed on exam switch by examScope.ts ("ciro" = Supervisor exam).
      name: 'ciro-progress',
      merge: (persisted, current) => ({ ...current, ...EMPTY_PROGRESS, ...(persisted as Partial<ProgressState>) }),
    },
  ),
)
