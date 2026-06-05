import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { OptionKey, Question } from '../types'

export type MockStatus = 'idle' | 'running' | 'paused' | 'submitted'

interface MockState {
  questions: Question[]
  answers: Record<string, OptionKey>
  index: number
  status: MockStatus
  durationMs: number
  /** Epoch ms when the timer hits zero — authoritative while `running`. */
  endsAt: number | null
  /** Frozen remaining time while `paused`/`idle`/`submitted`. */
  remainingMs: number
  startedAt: number | null
  autoSubmitted: boolean

  start: (questions: Question[], durationMs: number) => void
  answer: (qid: string, key: OptionKey) => void
  goto: (index: number) => void
  next: () => void
  prev: () => void
  pause: () => void
  resume: () => void
  submit: (auto?: boolean) => void
  reset: () => void
  /** Remaining ms given the current wall-clock `now`. */
  remainingAt: (now: number) => number
}

export const useMock = create<MockState>()(
  persist(
    (set, get) => ({
      questions: [],
      answers: {},
      index: 0,
      status: 'idle',
      durationMs: 0,
      endsAt: null,
      remainingMs: 0,
      startedAt: null,
      autoSubmitted: false,

      start: (questions, durationMs) => {
        const now = Date.now()
        set({
          questions,
          answers: {},
          index: 0,
          status: 'running',
          durationMs,
          endsAt: now + durationMs,
          remainingMs: durationMs,
          startedAt: now,
          autoSubmitted: false,
        })
      },

      answer: (qid, key) => set((s) => ({ answers: { ...s.answers, [qid]: key } })),

      goto: (index) =>
        set((s) => ({ index: Math.max(0, Math.min(index, s.questions.length - 1)) })),
      next: () => get().goto(get().index + 1),
      prev: () => get().goto(get().index - 1),

      pause: () =>
        set((s) => {
          if (s.status !== 'running' || s.endsAt == null) return s
          return { status: 'paused', remainingMs: Math.max(0, s.endsAt - Date.now()), endsAt: null }
        }),

      resume: () =>
        set((s) => {
          if (s.status !== 'paused') return s
          return { status: 'running', endsAt: Date.now() + s.remainingMs }
        }),

      submit: (auto = false) =>
        set((s) => ({
          status: 'submitted',
          remainingMs: s.endsAt != null ? Math.max(0, s.endsAt - Date.now()) : s.remainingMs,
          endsAt: null,
          autoSubmitted: auto,
        })),

      reset: () =>
        set({
          questions: [],
          answers: {},
          index: 0,
          status: 'idle',
          durationMs: 0,
          endsAt: null,
          remainingMs: 0,
          startedAt: null,
          autoSubmitted: false,
        }),

      remainingAt: (now) => {
        const s = get()
        if (s.status === 'running' && s.endsAt != null) return Math.max(0, s.endsAt - now)
        return s.remainingMs
      },
    }),
    { name: 'ciro-mock' },
  ),
)
