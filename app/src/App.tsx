import { useEffect, useState } from 'react'
import { NavLink, Outlet, Link, useLocation } from 'react-router-dom'
import { DataProvider, useData } from './data/DataContext'
import { ThemeToggle } from './components/ThemeToggle'
import { cn } from './lib/format'

const NAV = [
  { to: '/', label: 'Home', end: true },
  { to: '/drill', label: 'Drill' },
  { to: '/mock', label: 'Mock exam' },
  { to: '/flashcards', label: 'Flashcards' },
  { to: '/progress', label: 'Progress' },
  { to: '/about', label: 'About' },
]

function Header() {
  const [open, setOpen] = useState(false)
  const close = () => setOpen(false)
  return (
    <header className="sticky top-0 z-20 border-b border-slate-200 bg-white/85 backdrop-blur dark:border-slate-800 dark:bg-slate-950/85">
      <div className="mx-auto flex max-w-5xl items-center gap-4 px-4 py-3">
        <Link to="/" onClick={close} className="flex items-center gap-2 font-bold tracking-tight">
          <span className="grid h-7 w-7 place-items-center rounded-md bg-brand-600 text-xs font-bold text-white">
            CR
          </span>
          <span className="hidden sm:inline">CIRO Supervisor Exam Prep</span>
          <span className="sm:hidden">CIRO Prep</span>
        </Link>

        {/* Desktop / tablet nav */}
        <nav className="ml-auto hidden items-center gap-1 lg:flex">
          {NAV.map((n) => (
            <NavLink
              key={n.to}
              to={n.to}
              end={n.end}
              className={({ isActive }) =>
                cn(
                  'rounded-md px-2.5 py-1.5 text-sm font-medium transition',
                  isActive
                    ? 'bg-brand-50 text-brand-700 dark:bg-brand-900/40 dark:text-brand-200'
                    : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900 dark:text-slate-300 dark:hover:bg-slate-800 dark:hover:text-white',
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
            'min-h-0 overflow-hidden border-t border-slate-200 px-4 py-2 transition-opacity duration-300 dark:border-slate-800',
            open ? 'opacity-100' : 'opacity-0',
          )}
        >
          {NAV.map((n) => (
            <NavLink
              key={n.to}
              to={n.to}
              end={n.end}
              onClick={close}
              tabIndex={open ? 0 : -1}
              className={({ isActive }) =>
                cn(
                  'block rounded-md px-3 py-2 text-sm font-medium transition',
                  isActive
                    ? 'bg-brand-50 text-brand-700 dark:bg-brand-900/40 dark:text-brand-200'
                    : 'text-slate-700 hover:bg-slate-100 dark:text-slate-200 dark:hover:bg-slate-800',
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
  return (
    <footer className="mt-16 border-t border-slate-200 bg-white py-8 text-sm dark:border-slate-800 dark:bg-slate-950">
      <div className="mx-auto max-w-5xl px-4">
        <p className="font-semibold text-slate-700 dark:text-slate-200">Official CIRO resources</p>
        <div className="mt-2 flex flex-wrap gap-x-5 gap-y-1 text-brand-600 dark:text-brand-300">
          <a className="hover:underline" href={r.exam_page} target="_blank" rel="noreferrer">
            Exam hub
          </a>
          <a className="hover:underline" href={r.syllabus_pdf} target="_blank" rel="noreferrer">
            Syllabus (PDF)
          </a>
          <a className="hover:underline" href={r.study_guide_pdf} target="_blank" rel="noreferrer">
            Study guide (PDF)
          </a>
          <a className="hover:underline" href={r.practice_exam_pdf} target="_blank" rel="noreferrer">
            Official practice exam (PDF)
          </a>
        </div>
        <p className="mt-5 max-w-3xl text-xs leading-relaxed text-slate-500 dark:text-slate-400">
          Unofficial study aid. Not affiliated with, endorsed by, or sponsored by the Canadian
          Investment Regulatory Organization (CIRO). All practice questions are original. The
          official syllabus is the authoritative scope of the exam. No pass mark is published by
          CIRO — any readiness signal shown here is our own heuristic, not an official threshold.
        </p>
      </div>
    </footer>
  )
}

function Shell() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="mx-auto w-full max-w-5xl flex-1 px-4 py-8">
        <Outlet />
      </main>
      <Footer />
    </div>
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
    <DataProvider>
      <Shell />
    </DataProvider>
  )
}
