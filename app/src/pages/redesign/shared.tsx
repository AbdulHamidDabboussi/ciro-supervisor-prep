// Redesign-branch scaffolding: shared sample data + the variant-switcher layout.
// These pages are self-contained mockups (no DataProvider) so they load instantly.

import { NavLink, Outlet, Link } from 'react-router-dom'
import { ThemeToggle } from '../../components/ThemeToggle'
import { cn } from '../../lib/format'

export const SAMPLE_QUESTION = {
  id: 'SUP-E1-0001',
  element: 1,
  outcome: '1.6',
  taxonomy: 'Understand',
  difficulty: 'easy',
  stem: 'An Investment Dealer becomes insolvent. Which statement best describes the role of the Canadian Investor Protection Fund (CIPF)?',
  options: {
    A: "It guarantees that the dealer's creditors are paid before client property is returned.",
    B: 'It protects client assets held by the insolvent dealer, within prescribed limits, including through the pooling of client assets.',
    C: "It assumes regulatory authority over the dealer's remaining Approved Persons.",
    D: 'It compensates clients for losses in the market value of their investments caused by the insolvency.',
  } as Record<string, string>,
  answer: 'B',
  rationale:
    "CIPF protects property (cash, securities) held by a member firm on a client's behalf if the firm becomes insolvent, within coverage limits, and participates in the insolvency process including pooling of client assets. It never covers market-value losses (D), does not subordinate clients to creditors (A), and has no registration authority (C).",
  rule_refs: ['Syllabus 1.6', 'CIPF coverage policy', 'BIA Part XII'],
}

export const SAMPLE_CARD = {
  id: 'FC-E1-0004',
  outcome: '1.2',
  type: 'trap',
  front: 'TRAP: which body issues the IDPC Rules and UMIR — the CSA or CIRO?',
  back: 'CIRO. NIs/MIs/National policies/Staff Notices/Companion Policies are CSA instruments (1.1); IDPC Rules and UMIR are CIRO rule books (1.2).',
  rule_refs: ['Syllabus 1.2', 'Syllabus 1.1'],
}

export const SAMPLE_ELEMENTS = [
  { id: 4, title: 'Account approvals', pct: 62, weight: 20 },
  { id: 5, title: 'Account activity', pct: 78, weight: 15 },
  { id: 1, title: 'General regulatory framework', pct: 84, weight: 10 },
]

export const STATS = { questions: 1339, cards: 446, attempted: 412, accuracy: 76, mocks: 4, lastMock: 72 }

const VARIANTS = [
  { to: '/redesign/aurora', label: 'A · Aurora' },
  { to: '/redesign/momentum', label: 'B · Momentum' },
  { to: '/redesign/ledger', label: 'C · Ledger' },
]

export function RedesignLayout() {
  return (
    <div className="min-h-screen">
      {/* Floating variant switcher (mockup chrome — not part of any design) */}
      <div className="fixed bottom-4 left-1/2 z-50 flex -translate-x-1/2 items-center gap-1 rounded-full border border-slate-300 bg-white/90 p-1.5 shadow-xl backdrop-blur dark:border-slate-700 dark:bg-slate-900/90">
        <Link
          to="/"
          className="rounded-full px-3 py-1.5 text-xs font-semibold text-slate-500 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-800"
        >
          ← App
        </Link>
        {VARIANTS.map((v) => (
          <NavLink
            key={v.to}
            to={v.to}
            className={({ isActive }) =>
              cn(
                'rounded-full px-3 py-1.5 text-xs font-semibold transition',
                isActive
                  ? 'bg-slate-900 text-white dark:bg-white dark:text-slate-900'
                  : 'text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800',
              )
            }
          >
            {v.label}
          </NavLink>
        ))}
        <span className="ml-1">
          <ThemeToggle />
        </span>
      </div>
      <Outlet />
    </div>
  )
}
