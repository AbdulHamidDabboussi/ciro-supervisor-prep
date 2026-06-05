import { create } from 'zustand'
import { persist } from 'zustand/middleware'

type Theme = 'light' | 'dark'

interface PrefsState {
  theme: Theme
  setTheme: (t: Theme) => void
  toggleTheme: () => void
}

export const usePrefs = create<PrefsState>()(
  persist(
    (set, get) => ({
      // Light is the default for new visitors; a returning visitor's saved choice
      // is rehydrated from localStorage and takes precedence over this.
      theme: 'light',
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
