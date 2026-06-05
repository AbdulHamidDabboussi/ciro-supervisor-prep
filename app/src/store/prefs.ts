import { create } from 'zustand'
import { persist } from 'zustand/middleware'

type Theme = 'light' | 'dark'

interface PrefsState {
  theme: Theme
  setTheme: (t: Theme) => void
  toggleTheme: () => void
}

function systemPrefersDark(): boolean {
  return typeof window !== 'undefined' && window.matchMedia?.('(prefers-color-scheme: dark)').matches
}

export const usePrefs = create<PrefsState>()(
  persist(
    (set, get) => ({
      theme: systemPrefersDark() ? 'dark' : 'light',
      setTheme: (theme) => set({ theme }),
      toggleTheme: () => set({ theme: get().theme === 'dark' ? 'light' : 'dark' }),
    }),
    { name: 'ciro-prefs' },
  ),
)

/** Reflect the persisted theme onto <html class="dark">. */
export function applyTheme(theme: Theme) {
  const root = document.documentElement
  root.classList.toggle('dark', theme === 'dark')
}
