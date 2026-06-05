import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from 'react'
import { loadCore, loadHeavy, type CoreData, type HeavyData } from './loader'
import type { Question, SyllabusElement, Outcome } from '../types'

interface DataContextValue extends CoreData {
  // Derived from the syllabus (always available once core loads).
  elementsById: Map<number, SyllabusElement>
  outcomesByElement: Map<number, Outcome[]>
  // Heavy data — loaded in the background after first paint.
  questionsReady: boolean
  bank: HeavyData['bank'] | null
  deck: HeavyData['deck'] | null
  reviewedQuestions: Question[]
}

const DataContext = createContext<DataContextValue | null>(null)

type CoreState =
  | { status: 'loading' }
  | { status: 'error'; error: string }
  | { status: 'ready'; core: CoreData }

export function DataProvider({ children }: { children: ReactNode }) {
  const [core, setCore] = useState<CoreState>({ status: 'loading' })
  const [heavy, setHeavy] = useState<HeavyData | null>(null)

  // Phase 1 — small files; blocks first paint (fast).
  useEffect(() => {
    let cancelled = false
    loadCore()
      .then((c) => !cancelled && setCore({ status: 'ready', core: c }))
      .catch((e) => !cancelled && setCore({ status: 'error', error: String(e?.message ?? e) }))
    return () => {
      cancelled = true
    }
  }, [])

  // Phase 2 — the 2.3 MB bank + flashcards; kicks off once core is ready, in the background.
  useEffect(() => {
    if (core.status !== 'ready') return
    let cancelled = false
    loadHeavy()
      .then((h) => !cancelled && setHeavy(h))
      .catch(() => {
        /* pages that need questions keep showing their loader; core UI stays usable */
      })
    return () => {
      cancelled = true
    }
  }, [core.status])

  const value = useMemo<DataContextValue | null>(() => {
    if (core.status !== 'ready') return null
    const { syllabus, examMeta, manifest } = core.core
    const elementsById = new Map<number, SyllabusElement>()
    const outcomesByElement = new Map<number, Outcome[]>()
    for (const el of syllabus.elements) {
      elementsById.set(el.id, el)
      outcomesByElement.set(el.id, el.outcomes)
    }
    const reviewedQuestions = heavy ? heavy.bank.questions.filter((q) => q.status === 'reviewed') : []
    return {
      syllabus,
      examMeta,
      manifest,
      elementsById,
      outcomesByElement,
      questionsReady: !!heavy,
      bank: heavy?.bank ?? null,
      deck: heavy?.deck ?? null,
      reviewedQuestions,
    }
  }, [core, heavy])

  if (core.status === 'loading') {
    return (
      <div className="flex min-h-screen items-center justify-center text-slate-500 dark:text-slate-400">
        <div className="animate-pulse text-sm">Loading…</div>
      </div>
    )
  }
  if (core.status === 'error') {
    return (
      <div className="mx-auto max-w-lg p-8 text-center">
        <h1 className="mb-2 text-lg font-semibold text-red-600">Couldn’t load exam data</h1>
        <p className="text-sm text-slate-600 dark:text-slate-300">{core.error}</p>
        <p className="mt-4 text-xs text-slate-500">
          If you’re developing locally, run <code className="font-mono">npm run dev</code> (it copies
          the data into <code className="font-mono">public/data/</code> first).
        </p>
      </div>
    )
  }

  return <DataContext.Provider value={value!}>{children}</DataContext.Provider>
}

export function useData(): DataContextValue {
  const ctx = useContext(DataContext)
  if (!ctx) throw new Error('useData must be used within <DataProvider>')
  return ctx
}

/** Small inline loader for pages that need the (lazily-loaded) question bank. */
export function QuestionsLoading({ label = 'Loading questions…' }: { label?: string }) {
  return (
    <div className="card p-10 text-center text-sm text-slate-500 dark:text-slate-400">
      <span className="animate-pulse">{label}</span>
    </div>
  )
}
