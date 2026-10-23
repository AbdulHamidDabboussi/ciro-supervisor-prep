import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { Navigate, Outlet, useLocation, useNavigate, useParams } from 'react-router-dom'
import { DataProvider, useData } from './data/DataContext'
import { RegistryProvider, useExam, useRegistry } from './data/ExamContext'
import { Link, NavLink } from './components/ExamLink'
import { ThemeToggle } from './components/ThemeToggle'
import { bindExamStorage, boundPrefix } from './store/examScope'
import { usePrefs } from './store/prefs'
import { cn } from './lib/format'
import type { ExamEntry } from './types'

// What each page needs from an exam. An exam can ship before all of its content exists
// (e.g. study guide first, question bank later) — pages it can't serve yet show a
// "coming soon" panel and are left out of the nav.
type Feature = 'questions' | 'cards' | 'study_guide' | 'activity'

function hasFeature(exam: ExamEntry, f: Feature | undefined): boolean {
  if (!f) return true
  if (f === 'questions') return exam.questions > 0
  if (f === 'cards') return exam.cards > 0
  if (f === 'study_guide') return exam.study_guide
  return exam.questions > 0 || exam.cards > 0
}

const NAV: { to: string; label: string; end?: boolean; needs?: Feature }[] = [
  { to: '/', label: 'Home', end: true },
  { to: '/study', label: 'Study guide', needs: 'study_guide' },
  { to: '/drill', label: 'Drill', needs: 'questions' },
  { to: '/mock', label: 'Mock exam', needs: 'questions' },
  { to: '/flashcards', label: 'Flashcards', needs: 'cards' },
  { to: '/progress', label: 'Progress', needs: 'activity' },
  { to: '/about', label: 'About' },
]

const PAGE_NEEDS: Record<string, Feature> = {
  study: 'study_guide',
  drill: 'questions',
  mock: 'questions',
  flashcards: 'cards',
  progress: 'activity',
}

/** First path segment after the exam id: "/supervisor/mock/result" → "mock". */
function pageOf(pathname: string): string {
  return pathname.split('/')[2] ?? ''
}

function ExamSwitcher() {
  const { exams } = useRegistry()
  const exam = useExam()
  const { pathname } = useLocation()
  const navigate = useNavigate()
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!open) return
    const onDown = (e: MouseEvent) => {
      if (!ref.current?.contains(e.target as Node)) setOpen(false)
    }
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false)
    document.addEventListener('mousedown', onDown)
    document.addEventListener('keydown', onKey)
    return () => {
      document.removeEventListener('mousedown', onDown)
      document.removeEventListener('keydown', onKey)
    }
  }, [open])

  if (exams.length < 2) return null

  function choose(target: ExamEntry) {
    setOpen(false)
    if (target.id === exam.id) return
    // Stay on the same kind of page when the other exam has it; filters/search don't carry over.
    const page = pageOf(pathname)
    const keep = page !== '' && hasFeature(target, PAGE_NEEDS[page])
    navigate(keep ? `/${target.id}/${page}` : `/${target.id}`)
  }

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-label={`Exam: ${exam.name}. Switch exam`}
        className="flex items-center gap-1.5 rounded-xl border border-slate-200 bg-white/70 px-2.5 py-1.5 text-xs font-semibold text-slate-700 backdrop-blur transition hover:bg-white dark:border-white/10 dark:bg-white/5 dark:text-slate-200 dark:hover:bg-white/10"
      >
        <span className="max-w-[9rem] truncate sm:max-w-none">{exam.short}</span>
        <svg className={cn('h-3.5 w-3.5 transition', open && 'rotate-180')} viewBox="0 0 20 20" fill="currentColor" aria-hidden>
          <path d="M5.23 7.21a.75.75 0 0 1 1.06.02L10 11.06l3.71-3.83a.75.75 0 1 1 1.08 1.04l-4.25 4.39a.75.75 0 0 1-1.08 0L5.21 8.27a.75.75 0 0 1 .02-1.06Z" />
        </svg>
      </button>
      {open && (
        <ul
          role="listbox"
          aria-label="Choose an exam"
          className="card-solid absolute left-0 top-full z-30 mt-2 w-72 overflow-hidden p-1.5"
        >
          {exams.map((e) => {
            const parts = [
              e.study_guide && 'study guide',
              e.questions > 0 && `${e.questions.toLocaleString()} questions`,
              e.cards > 0 && `${e.cards} flashcards`,
            ].filter(Boolean)
            const selected = e.id === exam.id
            return (
              <li key={e.id} role="option" aria-selected={selected}>
                <button
                  type="button"
                  onClick={() => choose(e)}
                  className={cn(
                    'flex w-full items-start gap-2.5 rounded-xl px-3 py-2.5 text-left transition',
                    selected
                      ? 'bg-indigo-50 dark:bg-indigo-500/10'
                      : 'hover:bg-slate-100 dark:hover:bg-white/10',
                  )}
                >
                  <span
                    className={cn(
                      'mt-1.5 h-2 w-2 shrink-0 rounded-full',
                      selected ? 'bg-indigo-500' : 'bg-slate-300 dark:bg-white/20',
                    )}
                  />
                  <span>
                    <span className="block text-sm font-semibold text-slate-800 dark:text-slate-100">{e.name}</span>
                    <span className="block text-xs text-slate-500 dark:text-slate-400">
                      {parts.length ? parts.join(' · ') : 'in preparation'}
                    </span>
                  </span>
                </button>
              </li>
            )
          })}
        </ul>
      )}
    </div>
  )
}

function Header() {
  const { site_title } = useRegistry()
  const exam = useExam()
  const [open, setOpen] = useState(false)
  const close = () => setOpen(false)
  const nav = NAV.filter((n) => hasFeature(exam, n.needs))
  return (
    <header className="sticky top-0 z-20 border-b border-white/40 bg-white/70 backdrop-blur-xl dark:border-white/5 dark:bg-night/70">
      <div className="mx-auto flex max-w-5xl items-center gap-3 px-4 py-3">
        <Link
          to="/"
          onClick={close}
          className="flex items-center gap-2.5 font-display font-bold tracking-tight"
        >
          <span className="grid h-8 w-8 place-items-center rounded-xl bg-gradient-to-br from-indigo-500 to-violet-600 text-sm font-bold text-white shadow-lg shadow-indigo-500/30">
            C
          </span>
          <span className="hidden sm:inline">{site_title}</span>
        </Link>
        <ExamSwitcher />

        {/* Desktop / tablet nav */}
        <nav className="ml-auto hidden items-center gap-1 lg:flex">
          {nav.map((n) => (
            <NavLink
              key={n.to}
              to={n.to}
              end={n.end}
              className={({ isActive }) =>
                cn(
                  'rounded-lg px-3 py-1.5 text-sm font-medium transition',
                  isActive
                    ? 'bg-indigo-50 text-indigo-600 dark:bg-indigo-500/10 dark:text-indigo-300'
                    : 'text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white',
                )
              }
            >
              {n.label}
            </NavLink>
          ))}
          <span className="ml-1">
            <ThemeToggle />
          </span>
        </nav>

        {/* Mobile controls */}
        <div className="ml-auto flex items-center gap-2 lg:hidden">
          <ThemeToggle />
          <button
            type="button"
            onClick={() => setOpen((o) => !o)}
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
            className="btn-secondary !px-2.5"
          >
            {/* Three bars that morph into an X */}
            <span className="relative block h-4 w-5" aria-hidden>
              <span
                className={cn(
                  'absolute left-0 block h-0.5 w-5 rounded-full bg-current transition-all duration-300',
                  open ? 'top-1/2 -translate-y-1/2 rotate-45' : 'top-0.5',
                )}
              />
              <span
                className={cn(
                  'absolute left-0 top-1/2 block h-0.5 w-5 -translate-y-1/2 rounded-full bg-current transition-opacity duration-300',
                  open ? 'opacity-0' : 'opacity-100',
                )}
              />
              <span
                className={cn(
                  'absolute left-0 block h-0.5 w-5 rounded-full bg-current transition-all duration-300',
                  open ? 'top-1/2 -translate-y-1/2 -rotate-45' : 'bottom-0.5',
                )}
              />
            </span>
          </button>
        </div>
      </div>

      {/* Mobile menu panel — animates height (grid-rows trick) + fade */}
      <div
        className={cn(
          'grid overflow-hidden transition-[grid-template-rows] duration-300 ease-out lg:hidden',
          open ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]',
        )}
      >
        <nav
          aria-hidden={!open}
          className={cn(
            'min-h-0 overflow-hidden border-t border-white/40 px-4 py-2 transition-opacity duration-300 dark:border-white/5',
            open ? 'opacity-100' : 'opacity-0',
          )}
        >
          {nav.map((n) => (
            <NavLink
              key={n.to}
              to={n.to}
              end={n.end}
              onClick={close}
              tabIndex={open ? 0 : -1}
              className={({ isActive }) =>
                cn(
                  'block rounded-lg px-3 py-2 text-sm font-medium transition',
                  isActive
                    ? 'bg-indigo-50 text-indigo-600 dark:bg-indigo-500/10 dark:text-indigo-300'
                    : 'text-slate-700 hover:bg-slate-100 dark:text-slate-200 dark:hover:bg-white/10',
                )
              }
            >
              {n.label}
            </NavLink>
          ))}
        </nav>
      </div>
    </header>
  )
}

function Footer() {
  const { examMeta } = useData()
  const r = examMeta.official_resources
  const links = [
    [r.exam_page, 'Exam page'],
    [r.syllabus_pdf, 'Syllabus (PDF)'],
    [r.study_guide_pdf, 'Study guide (PDF)'],
    [r.practice_exam_pdf, 'Official practice exam (PDF)'],
  ].filter(([href]) => href && /^https?:\/\//.test(href))
  return (
    <footer className="mt-16 border-t border-slate-200/70 bg-white/60 py-8 text-sm backdrop-blur dark:border-white/5 dark:bg-white/[0.03]">
      <div className="mx-auto max-w-5xl px-4">
        <p className="font-semibold text-slate-700 dark:text-slate-200">Official CIRO resources · {examMeta.exam}</p>
        <div className="mt-2 flex flex-wrap gap-x-5 gap-y-1 text-brand-600 dark:text-brand-300">
          {links.map(([href, label]) => (
            <a key={label} className="hover:underline" href={href} target="_blank" rel="noreferrer">
              {label}
            </a>
          ))}
        </div>
        <p className="mt-5 max-w-3xl text-xs leading-relaxed text-slate-500 dark:text-slate-400">
          Unofficial study aid. Not affiliated with, endorsed by, or sponsored by the Canadian
          Investment Regulatory Organization (CIRO). All practice questions and study notes are
          original. The official syllabus is the authoritative scope of each exam. No pass mark is
          published by CIRO — any readiness signal shown here is our own heuristic, not an official
          threshold.
        </p>
      </div>
    </footer>
  )
}

function ComingSoon() {
  const exam = useExam()
  return (
    <div className="card mx-auto max-w-xl p-10 text-center">
      <p className="font-display text-lg font-semibold">Not available yet for this exam</p>
      <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
        Content for the {exam.name} is still going through our review pipeline.
        {exam.study_guide && ' The study guide is ready now.'}
      </p>
      <div className="mt-5 flex justify-center gap-3">
        {exam.study_guide && (
          <Link to="/study" className="btn-primary">
            Open the study guide
          </Link>
        )}
        <Link to="/" className="btn-secondary">
          Back to home
        </Link>
      </div>
    </div>
  )
}

function Shell() {
  const exam = useExam()
  const { pathname } = useLocation()
  const available = hasFeature(exam, PAGE_NEEDS[pageOf(pathname)])
  return (
    <div className="relative flex min-h-screen flex-col">
      {/* Aurora mesh glow behind the whole app */}
      <div className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[40rem] overflow-hidden">
        <div className="aurora-bg" />
      </div>
      <Header />
      <main className="mx-auto w-full max-w-5xl flex-1 px-4 py-8">{available ? <Outlet /> : <ComingSoon />}</main>
      <Footer />
    </div>
  )
}

const LEGACY_PAGES = new Set(['drill', 'mock', 'flashcards', 'study', 'progress', 'about'])

/** `#/` → the visitor's last exam (or the registry default). */
export function ExamIndexRedirect() {
  const { exams, default_exam } = useRegistry()
  const lastExam = usePrefs((s) => s.lastExam)
  const target = exams.some((e) => e.id === lastExam) ? lastExam! : default_exam
  return <Navigate to={`/${target}`} replace />
}

/**
 * Resolves `:examId`, points the persisted stores at that exam's localStorage keys, then
 * renders the exam's data + shell. Unknown ids that are pre-multi-exam page names
 * (#/drill?element=4) are redirected into the visitor's current exam.
 */
export function ExamScope() {
  const { examId } = useParams()
  const { exams, default_exam, site_title } = useRegistry()
  const { pathname, search } = useLocation()
  const lastExam = usePrefs((s) => s.lastExam)
  const setLastExam = usePrefs((s) => s.setLastExam)
  const exam = exams.find((e) => e.id === examId)
  const [bound, setBound] = useState(() => exam != null && boundPrefix() === exam.storage_prefix)

  useLayoutEffect(() => {
    if (!exam) return
    setLastExam(exam.id)
    if (boundPrefix() === exam.storage_prefix) {
      setBound(true)
      return
    }
    setBound(false)
    let cancelled = false
    bindExamStorage(exam.storage_prefix).then(() => !cancelled && setBound(true))
    return () => {
      cancelled = true
    }
  }, [exam, setLastExam])

  useEffect(() => {
    if (exam) document.title = `${exam.short} · ${site_title}`
  }, [exam, site_title])

  if (!exam) {
    const fallback = exams.some((e) => e.id === lastExam) ? lastExam! : default_exam
    if (examId && LEGACY_PAGES.has(examId)) return <Navigate to={`/${fallback}${pathname}${search}`} replace />
    return <Navigate to={`/${fallback}`} replace />
  }
  if (!bound) return null

  return (
    <DataProvider key={exam.id} examId={exam.id}>
      <Shell />
    </DataProvider>
  )
}

export default function App() {
  const { pathname } = useLocation()

  // Reset scroll to the top on every page navigation. 'instant' overrides the
  // `scroll-behavior: smooth` in index.css so the jump isn't animated.
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' as ScrollBehavior })
  }, [pathname])

  return (
    <RegistryProvider>
      <Outlet />
    </RegistryProvider>
  )
}
