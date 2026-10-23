import { useEffect, useMemo, useRef, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { marked } from 'marked'
import DOMPurify from 'dompurify'
import { useData, QuestionsStatus } from '../data/DataContext'
import { Link } from '../components/ExamLink'
import { Badge, Modal, PageHeading, ProgressBar } from '../components/ui'
import { useProgress, type GuidePosition } from '../store/progress'
import { cn } from '../lib/format'
import type { Outcome } from '../types'

// Study-guide element files (exams/<id>/study-material/study-guide/E<n>.md) follow one
// convention, enforced by scripts/validate-data.mjs: an optional intro, then exactly one
// "## <outcome id> <title>" section per syllabus outcome, in syllabus order.

interface Section {
  outcome: Outcome | undefined
  id: string
  title: string
  html: string
}

const render = (md: string) => DOMPurify.sanitize(marked.parse(md, { async: false, gfm: true }) as string)

function splitElement(markdown: string, outcomes: Outcome[]): { intro: string; sections: Section[] } {
  // Drop the "# Element n: …" title line — the page renders its own heading.
  const body = markdown.replace(/^#\s+[^\n]*\n/, '')
  const parts = body.split(/^(?=##\s+\d+\.\d+\b)/m)
  const intro = /^##\s+\d+\.\d+\b/.test(parts[0]) ? '' : parts.shift()!
  const sections = parts.map((part) => {
    const [, id, title] = /^##\s+(\d+\.\d+)\s*[—–:-]?\s*([^\n]*)\n/.exec(part) ?? [, '', '']
    return {
      id: id!,
      title: title!.trim(),
      outcome: outcomes.find((o) => o.id === id),
      html: render(part.replace(/^##[^\n]*\n/, '')),
    }
  })
  return { intro: render(intro), sections }
}

const anchor = (outcomeId: string) => `outcome-${outcomeId.replace('.', '-')}`
const scrollToOutcome = (outcomeId: string) =>
  document.getElementById(anchor(outcomeId))?.scrollIntoView({ behavior: 'smooth', block: 'start' })

/** How long the end of a section must stay on screen before it counts as read. */
const READ_DWELL_MS = 1500

export default function StudyGuide() {
  const { studyGuide, syllabus, manifest, questionsReady } = useData()
  const guideRead = useProgress((s) => s.guideRead)
  const setGuideRead = useProgress((s) => s.setGuideRead)
  const setGuidePosition = useProgress((s) => s.setGuidePosition)
  const clearGuideRead = useProgress((s) => s.clearGuideRead)
  const guideFlags = useProgress((s) => s.guideFlags)
  const toggleGuideFlag = useProgress((s) => s.toggleGuideFlag)
  const [confirmReset, setConfirmReset] = useState(false)
  const [showTop, setShowTop] = useState(false)
  const [params, setParams] = useSearchParams()

  // Without an explicit element in the URL, reopen the element the reader was last in.
  const [resume, setResume] = useState<GuidePosition | null>(() => {
    const p = useProgress.getState().guidePosition
    return p && !params.get('outcome') ? p : null
  })
  const elementId = Number(params.get('element') ?? resume?.element ?? syllabus.elements[0].id)
  const targetOutcome = params.get('outcome')
  const element = syllabus.elements.find((e) => e.id === elementId) ?? syllabus.elements[0]

  const doc = useMemo(() => {
    const md = studyGuide?.elements.find((e) => e.id === element.id)?.markdown
    return md ? splitElement(md, element.outcomes) : null
  }, [studyGuide, element])

  // Section titles for every element (for the "Flagged for review" list, which spans elements).
  const sectionTitles = useMemo(() => {
    const titles = new Map<string, string>()
    for (const el of studyGuide?.elements ?? []) {
      for (const m of el.markdown.matchAll(/^##\s+(\d+\.\d+)\s*[—–:-]?\s*([^\n]*)$/gm)) titles.set(m[1], m[2].trim())
    }
    return titles
  }, [studyGuide])

  // Only offer to resume when the saved spot isn't where the reader already is (the top of
  // the element they'd land on anyway).
  const showResume =
    resume != null && !(resume.element === element.id && resume.outcome === element.outcomes[0]?.id)

  // While the resume prompt is up, don't overwrite the saved spot just because the page
  // opened at the top of an element. Scrolling into the content means they've moved on.
  const holdPosition = useRef(showResume)
  holdPosition.current = showResume
  useEffect(() => {
    if (!showResume) return
    const onScroll = () => window.scrollY > 400 && setResume(null)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [showResume])

  // "Back to top" appears once the reader is well into the page.
  useEffect(() => {
    const onScroll = () => setShowTop(window.scrollY > 800)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Deep link to an outcome (#/…/study?element=2&outcome=2.6) scrolls it into view.
  useEffect(() => {
    if (doc && targetOutcome) scrollToOutcome(targetOutcome)
  }, [doc, targetOutcome])

  // Remember the section at the top of the screen, and mark a section read once its end
  // has stayed on screen for a moment (scrolling straight past doesn't count).
  useEffect(() => {
    if (!doc) return
    // The current section is the last one whose top has passed a reading line just under
    // the sticky header. Saved (debounced) as the reader scrolls.
    let saveTimer: number | undefined
    let frame = 0
    const sectionEls = [...document.querySelectorAll<HTMLElement>('section[id^="outcome-"]')]
    const onScroll = () => {
      cancelAnimationFrame(frame)
      frame = requestAnimationFrame(() => {
        if (holdPosition.current) return
        const line = 120
        const current = sectionEls.filter((el) => el.getBoundingClientRect().top <= line).pop() ?? sectionEls[0]
        const s = current && doc.sections.find((x) => anchor(x.id) === current.id)
        if (!s) return
        window.clearTimeout(saveTimer)
        saveTimer = window.setTimeout(
          () => setGuidePosition({ element: element.id, outcome: s.id, title: s.title, at: Date.now() }),
          400,
        )
      })
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    const dwell = new Map<Element, number>()
    const ends = new IntersectionObserver((entries) => {
      for (const e of entries) {
        const id = (e.target as HTMLElement).dataset.outcome!
        if (!e.isIntersecting) {
          window.clearTimeout(dwell.get(e.target))
          continue
        }
        const section = e.target.closest('section')!
        dwell.set(
          e.target,
          window.setTimeout(() => {
            // Only once the reader has scrolled the section up into the reading area — a
            // short section merely visible below the fold on arrival isn't "read".
            if (section.getBoundingClientRect().top < window.innerHeight * 0.4) setGuideRead(id, true)
          }, READ_DWELL_MS),
        )
      }
    })
    document.querySelectorAll('[data-outcome-end]').forEach((el) => ends.observe(el))
    return () => {
      window.removeEventListener('scroll', onScroll)
      cancelAnimationFrame(frame)
      window.clearTimeout(saveTimer)
      dwell.forEach((t) => window.clearTimeout(t))
      ends.disconnect()
    }
  }, [doc, element.id, setGuidePosition, setGuideRead])

  if (!questionsReady) return <QuestionsStatus label="Loading the study guide…" />

  const readIn = (outcomes: Outcome[]) => outcomes.filter((o) => guideRead[o.id]).length
  const totalOutcomes = syllabus.elements.reduce((n, el) => n + el.outcomes.length, 0)
  const totalRead = syllabus.elements.reduce((n, el) => n + readIn(el.outcomes), 0)
  const flaggedIn = (outcomes: Outcome[]) => outcomes.filter((o) => guideFlags[o.id]).length
  const flagged = syllabus.elements.flatMap((el) =>
    el.outcomes.filter((o) => guideFlags[o.id]).map((o) => ({ element: el.id, outcome: o.id })),
  )

  const goTo = (elementId: number, outcomeId: string) => {
    setResume(null)
    setParams({ element: String(elementId), outcome: outcomeId })
    // Same outcome as the current URL: the deep-link effect won't re-run, so scroll here.
    if (elementId === element.id && outcomeId === targetOutcome) scrollToOutcome(outcomeId)
  }

  const pick = (id: number) => {
    setResume(null)
    setParams({ element: String(id) })
    window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior })
  }

  const continueReading = () => {
    if (!resume) return
    setParams({ element: String(resume.element), outcome: resume.outcome })
    setResume(null)
  }

  return (
    <div>
      <PageHeading
        title="Study guide"
        subtitle={`Outcome-by-outcome notes on the official syllabus — read an element, then drill it. ${totalRead} of ${totalOutcomes} outcomes read.`}
      />

      {showResume && (
        <div className="mb-6 flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-indigo-200/70 bg-indigo-50/80 p-4 backdrop-blur dark:border-indigo-500/20 dark:bg-indigo-500/10">
          <div className="text-sm">
            <p className="font-semibold text-indigo-900 dark:text-indigo-200">Continue where you left off</p>
            <p className="text-indigo-800/80 dark:text-indigo-300/80">
              {resume!.outcome} {resume!.title} · Element {resume!.element}
            </p>
          </div>
          <div className="flex gap-2">
            <button className="btn-secondary" onClick={() => setResume(null)}>
              Dismiss
            </button>
            <button className="btn-primary" onClick={continueReading}>
              Continue →
            </button>
          </div>
        </div>
      )}

      {flagged.length > 0 && (
        <div className="mb-6 rounded-2xl border border-amber-300/60 bg-amber-50/80 p-4 backdrop-blur dark:border-amber-500/30 dark:bg-amber-500/10">
          <p className="text-sm font-semibold text-amber-900 dark:text-amber-200">
            Flagged for review ({flagged.length})
          </p>
          <p className="text-xs text-amber-800/80 dark:text-amber-300/80">
            Outcomes you marked to come back to. Unflag one from its section once it has sunk in.
          </p>
          <ul className="mt-3 flex flex-wrap gap-2">
            {flagged.map((f) => (
              <li key={f.outcome}>
                <button
                  type="button"
                  onClick={() => goTo(f.element, f.outcome)}
                  className="rounded-xl border border-amber-300/70 bg-white/80 px-3 py-1.5 text-left text-xs text-amber-900 transition hover:bg-white dark:border-amber-500/30 dark:bg-white/5 dark:text-amber-100 dark:hover:bg-white/10"
                >
                  <span className="font-semibold">{f.outcome}</span> {sectionTitles.get(f.outcome) ?? ''}
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}

      <div className="grid gap-6 lg:grid-cols-[15rem_1fr]">
        {/* Element picker: a select on mobile, a sticky list on desktop */}
        <div className="lg:hidden">
          <select
            className="field w-full"
            value={element.id}
            onChange={(e) => pick(Number(e.target.value))}
            aria-label="Element"
          >
            {syllabus.elements.map((el) => (
              <option key={el.id} value={el.id}>
                {el.id}. {el.title} ({readIn(el.outcomes)}/{el.outcomes.length} read
                {flaggedIn(el.outcomes) > 0 ? `, ${flaggedIn(el.outcomes)} flagged` : ''})
              </option>
            ))}
          </select>
        </div>
        <nav className="hidden lg:block" aria-label="Elements">
          <ul className="card sticky top-20 space-y-0.5 p-2">
            {syllabus.elements.map((el) => {
              const read = readIn(el.outcomes)
              const done = read === el.outcomes.length
              return (
                <li key={el.id}>
                  <button
                    type="button"
                    onClick={() => pick(el.id)}
                    className={cn(
                      'w-full rounded-xl px-3 py-2 text-left text-sm transition',
                      el.id === element.id
                        ? 'bg-indigo-50 font-semibold text-indigo-700 dark:bg-indigo-500/10 dark:text-indigo-300'
                        : 'text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-white/10',
                    )}
                  >
                    <span className="mr-1.5 text-xs text-slate-400">{el.id}</span>
                    {el.title}
                    <span
                      className={cn(
                        'mt-1 block text-[11px] font-medium',
                        done ? 'text-emerald-600 dark:text-emerald-400' : 'text-slate-400',
                      )}
                    >
                      {done ? '✓ All read' : `${read}/${el.outcomes.length} read`}
                      {flaggedIn(el.outcomes) > 0 && (
                        <span className="text-amber-600 dark:text-amber-400"> · ⚑ {flaggedIn(el.outcomes)} to review</span>
                      )}
                    </span>
                  </button>
                </li>
              )
            })}
          </ul>
        </nav>

        <article className="min-w-0 space-y-5">
          <header className="card p-6">
            <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
              Element {element.id} · ~{element.questions} questions on the exam
            </p>
            <h2 className="mt-1 font-display text-xl font-bold tracking-tight">{element.title}</h2>
            <p className="mt-2 text-sm leading-relaxed text-slate-600 dark:text-slate-300">{element.summary}</p>
            <div className="mt-4 flex flex-wrap items-center gap-x-3 gap-y-2">
              <div className="min-w-[10rem] flex-1 basis-full sm:basis-0">
                <ProgressBar value={readIn(element.outcomes)} max={element.outcomes.length} />
              </div>
              <span className="text-xs font-medium text-slate-500 dark:text-slate-400">
                {readIn(element.outcomes)}/{element.outcomes.length} read
              </span>
              {readIn(element.outcomes) > 0 && (
                <button
                  type="button"
                  onClick={() => setConfirmReset(true)}
                  className="inline-flex items-center gap-1.5 rounded-lg border border-red-200 bg-red-50 px-2.5 py-1 text-xs font-semibold text-red-700 transition hover:border-red-300 hover:bg-red-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-red-400 dark:border-red-500/30 dark:bg-red-500/10 dark:text-red-300 dark:hover:bg-red-500/20"
                >
                  <svg className="h-3.5 w-3.5" viewBox="0 0 20 20" fill="currentColor" aria-hidden>
                    <path
                      fillRule="evenodd"
                      d="M15.312 11.424a5.5 5.5 0 0 1-9.201 2.466l-.312-.311h2.433a.75.75 0 0 0 0-1.5H3.989a.75.75 0 0 0-.75.75v4.242a.75.75 0 0 0 1.5 0v-2.43l.31.31a7 7 0 0 0 11.712-3.138.75.75 0 0 0-1.449-.39Zm1.23-3.723a.75.75 0 0 0 .219-.53V2.929a.75.75 0 0 0-1.5 0V5.36l-.31-.31A7 7 0 0 0 3.239 8.188a.75.75 0 1 0 1.448.389A5.5 5.5 0 0 1 13.89 6.11l.311.31h-2.432a.75.75 0 0 0 0 1.5h4.243a.75.75 0 0 0 .53-.219Z"
                      clipRule="evenodd"
                    />
                  </svg>
                  Reset progress
                </button>
              )}
            </div>
            <div className="mt-4 flex flex-wrap gap-1.5">
              {element.outcomes.map((o) => (
                <a
                  key={o.id}
                  href={`#${anchor(o.id)}`}
                  onClick={(e) => {
                    e.preventDefault()
                    scrollToOutcome(o.id)
                  }}
                  title={guideFlags[o.id] ? 'Flagged for review' : guideRead[o.id] ? 'Read' : 'Not read yet'}
                  className={cn(
                    'badge transition',
                    guideFlags[o.id]
                      ? 'bg-amber-100 text-amber-800 hover:bg-amber-200 dark:bg-amber-500/15 dark:text-amber-300'
                      : guideRead[o.id]
                      ? 'bg-emerald-50 text-emerald-700 hover:bg-emerald-100 dark:bg-emerald-500/10 dark:text-emerald-300'
                      : 'bg-slate-100 text-slate-600 hover:bg-indigo-50 hover:text-indigo-600 dark:bg-white/10 dark:text-slate-300 dark:hover:bg-indigo-500/10 dark:hover:text-indigo-300',
                  )}
                >
                  {guideFlags[o.id] ? '⚑ ' : guideRead[o.id] ? '✓ ' : ''}
                  {o.id}
                </a>
              ))}
            </div>
            {doc?.intro && <div className="guide-prose mt-4" dangerouslySetInnerHTML={{ __html: doc.intro }} />}
          </header>

          {!doc && (
            <div className="card p-8 text-center text-sm text-slate-500 dark:text-slate-400">
              The study notes for this element are still being written and reviewed.
            </div>
          )}

          {doc?.sections.map((s) => {
            const read = Boolean(guideRead[s.id])
            const isFlagged = Boolean(guideFlags[s.id])
            return (
              <section
                key={s.id}
                id={anchor(s.id)}
                className={cn('card scroll-mt-20 p-6', isFlagged && 'ring-2 ring-amber-300/70 dark:ring-amber-500/40')}
              >
                <div className="flex flex-wrap items-center gap-2">
                  <Badge tone="brand">{s.id}</Badge>
                  {s.outcome && <Badge tone="violet">{s.outcome.taxonomy}</Badge>}
                  <div className="ml-auto flex flex-wrap items-center justify-end gap-2">
                    {manifest.questions > 0 && (
                      <Link
                        to={`/drill?element=${element.id}&outcome=${s.id}`}
                        className="text-xs font-medium text-indigo-600 hover:underline dark:text-indigo-300"
                      >
                        Drill this outcome →
                      </Link>
                    )}
                    <button
                      type="button"
                      onClick={() => toggleGuideFlag(s.id)}
                      aria-pressed={isFlagged}
                      title={isFlagged ? 'Remove the review flag' : 'Flag this outcome to study again'}
                      className={cn(
                        'badge gap-1 transition',
                        isFlagged
                          ? 'bg-amber-100 text-amber-800 hover:bg-amber-200 dark:bg-amber-500/15 dark:text-amber-300 dark:hover:bg-amber-500/25'
                          : 'bg-slate-100 text-slate-500 hover:bg-amber-50 hover:text-amber-700 dark:bg-white/10 dark:text-slate-300 dark:hover:bg-amber-500/10 dark:hover:text-amber-300',
                      )}
                    >
                      <svg className="h-3.5 w-3.5" viewBox="0 0 20 20" fill="currentColor" aria-hidden>
                        <path d="M3.5 2.75a.75.75 0 0 0-1.5 0v14.5a.75.75 0 0 0 1.5 0v-4.392l1.657-.348a6.449 6.449 0 0 1 4.271.572 7.948 7.948 0 0 0 5.965.524l2.078-.64A.75.75 0 0 0 18 12.25v-8.5a.75.75 0 0 0-.904-.734l-2.38.501a7.25 7.25 0 0 1-4.186-.363l-.502-.2a8.75 8.75 0 0 0-5.053-.439l-1.475.31V2.75Z" />
                      </svg>
                      {isFlagged ? 'Flagged to review' : 'Review again'}
                    </button>
                    <button
                      type="button"
                      onClick={() => setGuideRead(s.id, !read)}
                      aria-pressed={read}
                      className={cn(
                        'badge transition',
                        read
                          ? 'bg-emerald-50 text-emerald-700 hover:bg-emerald-100 dark:bg-emerald-500/10 dark:text-emerald-300'
                          : 'bg-slate-100 text-slate-500 hover:bg-slate-200 dark:bg-white/10 dark:text-slate-300 dark:hover:bg-white/20',
                      )}
                    >
                      {read ? '✓ Read' : 'Mark as read'}
                    </button>
                  </div>
                </div>
                <h3 className="mt-2 font-display text-lg font-semibold tracking-tight">{s.title}</h3>
                {s.outcome && (
                  <details className="mt-1 text-xs text-slate-500 dark:text-slate-400">
                    <summary className="cursor-pointer select-none hover:text-slate-700 dark:hover:text-slate-200">
                      Syllabus outcome
                    </summary>
                    <p className="mt-1 leading-relaxed">{s.outcome.statement}</p>
                  </details>
                )}
                <div className="guide-prose mt-4" dangerouslySetInnerHTML={{ __html: s.html }} />
                {/* Reaching (and pausing at) this marker counts the section as read. */}
                <div data-outcome-end data-outcome={s.id} aria-hidden className="h-px" />
              </section>
            )
          })}

          {doc && (
            <div className="flex justify-between gap-3">
              {element.id > syllabus.elements[0].id ? (
                <button className="btn-secondary" onClick={() => pick(element.id - 1)}>
                  ← Element {element.id - 1}
                </button>
              ) : (
                <span />
              )}
              {element.id < syllabus.elements[syllabus.elements.length - 1].id && (
                <button className="btn-primary" onClick={() => pick(element.id + 1)}>
                  Element {element.id + 1} →
                </button>
              )}
            </div>
          )}
        </article>
      </div>

      {showTop && (
        <button
          type="button"
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          aria-label="Back to top"
          title="Back to top"
          className="fixed bottom-6 right-6 z-20 grid h-11 w-11 place-items-center rounded-full bg-gradient-to-br from-indigo-500 to-violet-600 text-white shadow-lg shadow-indigo-500/30 transition hover:shadow-indigo-500/50 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-400"
        >
          <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden>
            <path d="M10 4.5a.75.75 0 0 1 .53.22l5 5a.75.75 0 1 1-1.06 1.06l-3.72-3.72V15a.75.75 0 0 1-1.5 0V7.06l-3.72 3.72a.75.75 0 0 1-1.06-1.06l5-5A.75.75 0 0 1 10 4.5Z" />
          </svg>
        </button>
      )}

      {confirmReset && (
        <Modal onClose={() => setConfirmReset(false)}>
          <p className="font-display text-lg font-semibold">Reset Element {element.id} reading progress?</p>
          <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
            This un-marks the {readIn(element.outcomes)} read outcome
            {readIn(element.outcomes) === 1 ? '' : 's'} in “{element.title}”. Review flags, other elements
            and your saved reading position aren’t affected.
          </p>
          <div className="mt-5 flex justify-center gap-3">
            <button className="btn-secondary" onClick={() => setConfirmReset(false)}>
              Cancel
            </button>
            <button
              className="btn bg-red-600 text-white hover:bg-red-700"
              onClick={() => {
                clearGuideRead(element.outcomes.map((o) => o.id))
                setConfirmReset(false)
              }}
            >
              Reset element
            </button>
          </div>
        </Modal>
      )}
    </div>
  )
}
