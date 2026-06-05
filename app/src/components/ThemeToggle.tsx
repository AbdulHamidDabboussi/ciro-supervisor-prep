import { usePrefs } from '../store/prefs'

export function ThemeToggle() {
  const theme = usePrefs((s) => s.theme)
  const toggle = usePrefs((s) => s.toggleTheme)
  const isDark = theme === 'dark'
  return (
    <button
      type="button"
      onClick={toggle}
      className="btn-secondary !px-2.5"
      aria-label={`Switch to ${isDark ? 'light' : 'dark'} mode`}
      title={`Switch to ${isDark ? 'light' : 'dark'} mode`}
    >
      <span aria-hidden className="text-base leading-none">
        {isDark ? '☀️' : '🌙'}
      </span>
    </button>
  )
}
