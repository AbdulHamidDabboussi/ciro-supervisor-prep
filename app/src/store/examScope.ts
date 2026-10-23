import { useProgress } from './progress'
import { useMock } from './mock'

// Progress and mock state are per exam: each exam persists under its own localStorage
// keys (`<prefix>-progress`, `<prefix>-mock`). The Supervisor exam's prefix is "ciro", so
// its keys are the original ones and existing visitors keep their history.
//
// Switching re-points the persist middleware at the new keys and rehydrates. Both stores
// use a `merge` that starts from their initial data, so an exam with nothing saved yet
// starts empty instead of inheriting the previous exam's state.
const STORES = [
  [useProgress, 'progress'],
  [useMock, 'mock'],
] as const

export function boundPrefix(): string {
  return useProgress.persist.getOptions().name!.replace(/-progress$/, '')
}

export async function bindExamStorage(prefix: string): Promise<void> {
  for (const [store, suffix] of STORES) {
    const name = `${prefix}-${suffix}`
    if (store.persist.getOptions().name === name) continue
    store.persist.setOptions({ name })
    await store.persist.rehydrate()
  }
}
