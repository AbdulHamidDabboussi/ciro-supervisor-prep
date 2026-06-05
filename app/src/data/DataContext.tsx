import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from 'react'
import { loadAppData, type AppData } from './loader'
import type { Question, SyllabusElement, Outcome } from '../types'

interface DataContextValue extends AppData {
  // Derived helpers, computed once.
  elementsById: Map<number, SyllabusElement>
  outcomesByElement: Map<number, Outcome[]>
  reviewedQuestions: Question[]
}

const DataContext = createContext<DataContextValue | null>(null)

type LoadState =
  | { status: 'loading' }
  | { status: 'error'; error: string }
  | { status: 'ready'; data: AppData }

export function DataProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<LoadState>({ status: 'loading' })

  useEffect(() => {
    let cancelled = false
    loadAppData()
      .then((data) => !cancelled && setState({ status: 'ready', data }))
      .catch((e) => !cancelled && setState({ status: 'error', error: String(e?.message ?? e) }))
    return () => {
      cancelled = true
    }
  }, [])

  const value = useMemo<DataContextValue | null>(() => {
    if (state.status !== 'ready') return null
    const { data } = state
    const elementsById = new Map<number, SyllabusElement>()
    const outcomesByElement = new Map<number, Outcome[]>()
    for (const el of data.syllabus.elements) {
      elementsById.set(el.id, el)
      outcomesByElement.set(el.id, el.outcomes)
    }
    const reviewedQuestions = data.bank.questions.filter((q) => q.status === 'reviewed')
    return { ...data, elementsById, outcomesByElement, reviewedQuestions }
  }, [state])

  if (state.status === 'loading') {
    return (
      <div className="flex min-h-screen items-center justify-center text-slate-500 dark:text-slate-400">
        <div className="animate-pulse text-sm">Loading question bank…</div>
      </div>
    )
  }
  if (state.status === 'error') {
    return (
      <div className="mx-auto max-w-lg p-8 text-center">
        <h1 className="mb-2 text-lg font-semibold text-red-600">Couldn’t load exam data</h1>
        <p className="text-sm text-slate-600 dark:text-slate-300">{state.error}</p>
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
