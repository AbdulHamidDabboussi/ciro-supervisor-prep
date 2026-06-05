import { Link } from 'react-router-dom'
import { useData } from '../data/DataContext'
import { useProgress } from '../store/progress'
import { Badge } from '../components/ui'
import { formatDate } from '../lib/format'

const MODES = [
  {
    to: '/drill',
    title: 'Drill mode',
    blurb: 'Practice by element and outcome with instant explanations and rule references.',
    icon: '🎯',
  },
  {
    to: '/mock',
    title: 'Mock exam',
    blurb: '90 questions, 180-minute timer, weighted exactly like the real form.',
    icon: '⏱️',
  },
  {
    to: '/flashcards',
    title: 'Flashcards',
    blurb: 'Crash-course decks — refresh an element fast before you drill it.',
    icon: '🃏',
  },
  {
    to: '/about',
    title: 'About the exam',
    blurb: 'Format, fees, attempts, and the official CIRO resources.',
    icon: 'ℹ️',
  },
]

export default function Home() {
  const { reviewedQuestions, deck, examMeta } = useData()
  const drill = useProgress((s) => s.drill)
  const mockHistory = useProgress((s) => s.mockHistory)

  const attempted = Object.keys(drill).length
  const lastMock = mockHistory[0]

  return (
    <div className="space-y-10">
      <section className="rounded-2xl bg-gradient-to-br from-brand-600 to-brand-800 p-8 text-white shadow-lg">
        <p className="text-sm font-medium uppercase tracking-wider text-brand-100">
          {examMeta.exam}
        </p>
        <h1 className="mt-2 max-w-2xl text-3xl font-bold leading-tight sm:text-4xl">
          Pass the CIRO Supervisor Exam with practice that explains every answer.
        </h1>
        <p className="mt-3 max-w-2xl text-brand-50">
          {reviewedQuestions.length} original practice questions and {deck.cards.length} flashcards,
          mapped to all 9 syllabus elements. Free, no account needed — your progress stays on this
          device.
        </p>
        <div className="mt-6 flex flex-wrap gap-3">
          <Link to="/drill" className="btn bg-white text-brand-700 hover:bg-brand-50">
            Start drilling
          </Link>
          <Link to="/mock" className="btn border border-white/40 text-white hover:bg-white/10">
            Take a mock exam
          </Link>
        </div>
      </section>

      {(attempted > 0 || lastMock) && (
        <section className="card grid gap-4 p-5 sm:grid-cols-3">
          <Stat label="Questions attempted" value={`${attempted}`} sub={`of ${reviewedQuestions.length}`} />
          <Stat
            label="Last mock score"
            value={lastMock ? `${lastMock.overallPct}%` : '—'}
            sub={lastMock ? formatDate(lastMock.finishedAt) : 'no attempts yet'}
          />
          <Stat label="Mock exams taken" value={`${mockHistory.length}`} sub="saved on this device" />
        </section>
      )}

      <section>
        <div className="grid gap-4 sm:grid-cols-2">
          {MODES.map((m) => (
            <Link
              key={m.to}
              to={m.to}
              className="card group flex items-start gap-4 p-5 transition hover:border-brand-300 hover:shadow-md dark:hover:border-brand-700"
            >
              <span className="text-2xl" aria-hidden>
                {m.icon}
              </span>
              <div>
                <h2 className="font-semibold group-hover:text-brand-700 dark:group-hover:text-brand-300">
                  {m.title}
                </h2>
                <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">{m.blurb}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section className="card p-5 text-sm leading-relaxed text-slate-600 dark:text-slate-300">
        <div className="mb-2 flex items-center gap-2">
          <Badge tone="amber">Heads up</Badge>
          <span className="font-semibold text-slate-800 dark:text-slate-100">About scoring</span>
        </div>
        CIRO does not publish a pass mark for this exam — results are pass/fail only, set
        per-form. This site never shows an “official pass threshold.” Mock results give you a
        percentage and a breakdown by element and skill so you can see where to focus.
      </section>
    </div>
  )
}

function Stat({ label, value, sub }: { label: string; value: string; sub?: string }) {
  return (
    <div>
      <p className="text-xs font-medium uppercase tracking-wide text-slate-400">{label}</p>
      <p className="mt-1 text-2xl font-bold text-brand-700 dark:text-brand-300">{value}</p>
      {sub && <p className="text-xs text-slate-400">{sub}</p>}
    </div>
  )
}
