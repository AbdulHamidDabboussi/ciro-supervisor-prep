import { createContext, useContext, useEffect, useState, type ReactNode } from 'react'
import { useParams } from 'react-router-dom'
import { loadRegistry } from './loader'
import type { ExamEntry, ExamRegistry } from '../types'

const RegistryContext = createContext<ExamRegistry | null>(null)

/** Loads public/data/exams.json once; everything below can list and switch exams. */
export function RegistryProvider({ children }: { children: ReactNode }) {
  const [registry, setRegistry] = useState<ExamRegistry | null>(null)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    loadRegistry()
      .then(setRegistry)
      .catch((e) => setError(String(e?.message ?? e)))
  }, [])

  if (error) {
    return (
      <div className="mx-auto max-w-lg p-8 text-center">
        <h1 className="mb-2 text-lg font-semibold text-red-600">Couldn’t load the exam list</h1>
        <p className="text-sm text-slate-600 dark:text-slate-300">{error}</p>
        <p className="mt-4 text-xs text-slate-500">
          If you’re developing locally, run <code className="font-mono">npm run dev</code> (it copies
          the data into <code className="font-mono">public/data/</code> first).
        </p>
      </div>
    )
  }
  if (!registry) {
    return (
      <div className="flex min-h-screen items-center justify-center text-slate-500 dark:text-slate-400">
        <div className="animate-pulse text-sm">Loading…</div>
      </div>
    )
  }
  return <RegistryContext.Provider value={registry}>{children}</RegistryContext.Provider>
}

export function useRegistry(): ExamRegistry {
  const ctx = useContext(RegistryContext)
  if (!ctx) throw new Error('useRegistry must be used within <RegistryProvider>')
  return ctx
}

/** The exam selected by the `:examId` route segment. Only valid inside an exam route. */
export function useExam(): ExamEntry {
  const { exams } = useRegistry()
  const { examId } = useParams()
  const exam = exams.find((e) => e.id === examId)
  if (!exam) throw new Error(`useExam: unknown exam "${examId}"`)
  return exam
}
