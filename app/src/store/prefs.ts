import { create } from 'zustand'
import { persist } from 'zustand/middleware'

type Theme = 'light' | 'dark'

interface PrefsState {
  theme: Theme
  /** Exam the visitor last studied — where `/` lands them. */
  lastExam: string | null
  setLastExam: (id: string) => void
  setTheme: (t: Theme) => void
  toggleTheme: () => void
  /** Easter egg: the dog that chases the cursor (see components/DogEasterEgg.tsx). */
  dog: boolean
  toggleDog: () => void
}

export const usePrefs = create<PrefsState>()(
  persist(
    (set, get) => ({
      // Light is the default for new visitors; a returning visitor's saved choice
      // is rehydrated from localStorage and takes precedence over this.
      theme: 'light',
      lastExam: null,
      setLastExam: (lastExam) => set({ lastExam }),
      setTheme: (theme) => set({ theme }),
      toggleTheme: () => set({ theme: get().theme === 'dark' ? 'light' : 'dark' }),
      dog: false,
      toggleDog: () => set({ dog: !get().dog }),
    }),
    { name: 'ciro-prefs' },
  ),
)

/** Reflect the persisted theme onto <html class="dark">. */
export function applyTheme(theme: Theme) {
  const root = document.documentElement
  root.classList.toggle('dark', theme === 'dark')
}
