import { useState } from 'react'
import { NavLink, Outlet, Link } from 'react-router-dom'
import { DataProvider, useData } from './data/DataContext'
import { ThemeToggle } from './components/ThemeToggle'
import { cn } from './lib/format'

const NAV = [
  { to: '/', label: 'Home', end: true },
  { to: '/drill', label: 'Drill' },
  { to: '/mock', label: 'Mock exam' },
  { to: '/flashcards', label: 'Flashcards' },
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
        <nav className="ml-auto hidden items-center gap-1 md:flex">
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
        <div className="ml-auto flex items-center gap-2 md:hidden">
          <ThemeToggle />
          <button
            type="button"
            onClick={() => setOpen((o) => !o)}
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
            className="btn-secondary !px-2.5"
          >
            <span className="text-base leading-none" aria-hidden>
              {open ? '✕' : '☰'}
            </span>
          </button>
        </div>
      </div>

      {/* Mobile menu panel */}
      {open && (
        <nav className="border-t border-slate-200 px-4 py-2 md:hidden dark:border-slate-800">
          {NAV.map((n) => (
            <NavLink
              key={n.to}
              to={n.to}
              end={n.end}
              onClick={close}
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
      )}
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
  return (
    <DataProvider>
      <Shell />
    </DataProvider>
  )
}
