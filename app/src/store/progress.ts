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

export interface MockResultSummary {
  startedAt: number
  finishedAt: number
  total: number
  correct: number
  overallPct: number
  autoSubmitted: boolean
}

interface ProgressState {
  drill: Record<string, DrillRecord>
  cards: Record<string, CardStatus>
  mockHistory: MockResultSummary[]
  recordDrill: (id: string, chosen: OptionKey, isCorrect: boolean) => void
  setCardStatus: (id: string, status: CardStatus) => void
  addMockResult: (r: MockResultSummary) => void
  resetAll: () => void
  // Derived counts
  drillStats: () => { attempted: number; correct: number }
}

export const useProgress = create<ProgressState>()(
  persist(
    (set, get) => ({
      drill: {},
      cards: {},
      mockHistory: [],

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

      // Idempotent per session: re-rendering the result page won't duplicate an entry.
      addMockResult: (r) =>
        set((s) =>
          s.mockHistory[0]?.startedAt === r.startedAt
            ? s
            : { mockHistory: [r, ...s.mockHistory].slice(0, 50) },
        ),

      resetAll: () => set({ drill: {}, cards: {}, mockHistory: [] }),

      drillStats: () => {
        const recs = Object.values(get().drill)
        return {
          attempted: recs.length,
          correct: recs.filter((r) => r.lastCorrect).length,
        }
      },
    }),
    { name: 'ciro-progress' },
  ),
)
