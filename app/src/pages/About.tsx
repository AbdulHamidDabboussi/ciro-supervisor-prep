import { useData } from '../data/DataContext'
import { Badge, PageHeading } from '../components/ui'
import type { ReactNode } from 'react'

export default function About() {
  const { examMeta } = useData()
  const f = examMeta.format
  const fees = examMeta.fees_cad
  const a = examMeta.attempts
  const r = examMeta.official_resources
  const approval = examMeta.approval_requirements ?? examMeta.approval_requirements_supervisor
  const money = (n: number | null) => (n == null ? 'Not confirmed' : `$${n} CAD`)
  const links = [
    [r.exam_page, 'Exam page'],
    [examMeta.administration.enrolment_portal, 'Enrolment portal'],
    [r.syllabus_pdf, 'Syllabus (PDF)'],
    [r.study_guide_pdf, 'Study guide (PDF)'],
    [r.practice_exam_pdf, 'Official practice exam (PDF)'],
  ].filter((l): l is [string, string] => Boolean(l[0] && /^https?:\/\//.test(l[0])))

  return (
    <div className="space-y-8">
      <PageHeading
        title={`About the ${examMeta.exam}`}
        subtitle={`${examMeta.regulator} · proficiency model effective ${examMeta.effective_date}`}
      />

      <section className="card p-6">
        <h2 className="mb-4 font-display font-semibold">Format</h2>
        <dl className="grid gap-x-8 gap-y-3 sm:grid-cols-2">
          <Row label="Questions">
            {f.questions_total} multiple-choice
            {f.questions_item_set > 0 && ` (${f.questions_standard} standalone + ${f.questions_item_set} item-set)`}
          </Row>
          <Row label="Time">{f.duration_minutes} minutes ({f.duration_minutes / 60} hours)</Row>
          <Row label="Delivery">{f.delivery}</Row>
          <Row label="Proctoring">{f.proctoring.join('; ')}</Row>
          <Row label="Languages">{f.languages.map((l) => l.toUpperCase()).join(', ')}</Row>
          <Row label="Closed book">{f.closed_book ? 'Yes' : 'No'} · {f.scratch_paper}</Row>
        </dl>
        {/^UNCONFIRMED/i.test(f.calculator_policy) ? (
          <div className="mt-4 rounded-2xl bg-amber-50 p-3 text-xs text-amber-700 dark:bg-amber-500/10 dark:text-amber-300">
            <Badge tone="amber">Not officially confirmed</Badge>{' '}
            <span className="ml-1">Calculator policy: {f.calculator_policy}.</span>
          </div>
        ) : (
          <dl className="mt-4">
            <Row label="Calculator">{f.calculator_policy}</Row>
          </dl>
        )}
      </section>

      <section className="card p-6">
        <h2 className="mb-2 font-display font-semibold">Scoring</h2>
        <p className="text-sm leading-relaxed text-slate-600 dark:text-slate-300">
          Results are <strong>{examMeta.scoring.result_types.join(' / ')}</strong>. {examMeta.scoring.pass_mark_note}
        </p>
        <p className="mt-2 text-sm font-medium text-slate-700 dark:text-slate-200">
          There is no published pass mark — this site never shows an official threshold.
        </p>
      </section>

      <section className="grid gap-6 md:grid-cols-2">
        <div className="card p-6">
          <h2 className="mb-4 font-display font-semibold">Fees &amp; attempts</h2>
          <dl className="space-y-3">
            <Row label="First attempt">
              {money(fees.first_attempt)}
              {fees.first_attempt != null && ` (${fees.taxes})`}
            </Row>
            <Row label="Retake">{money(fees.retake)}</Row>
            <Row label="Attempts">
              {a.max_per_enrolment_period == null
                ? 'Not confirmed'
                : `up to ${a.max_per_enrolment_period}${a.enrolment_period_months ? ` per ${a.enrolment_period_months}-month enrolment` : ''}`}
            </Row>
            <Row label="Cooling-off">{a.cooling_off}</Row>
            <Row label="No-show">{a.no_show}</Row>
          </dl>
        </div>
        <div className="card p-6">
          <h2 className="mb-4 font-display font-semibold">Eligibility &amp; validity</h2>
          <dl className="space-y-3">
            <Row label="Prerequisite courses">{String(examMeta.eligibility.prerequisite_courses)}</Row>
            <Row label="Sponsorship to write">
              {examMeta.eligibility.dealer_sponsorship_to_write ? 'Required' : 'Not required'}
            </Row>
            {approval?.experience && <Row label="Experience for approval">{approval.experience}</Row>}
            {examMeta.validity.exam_validity_years != null && (
              <Row label="Exam validity">
                {examMeta.validity.exam_validity_years} years ({examMeta.validity.rule})
              </Row>
            )}
          </dl>
        </div>
      </section>

      <section className="card p-6">
        <h2 className="mb-1 font-display font-semibold">Administration</h2>
        <p className="text-sm text-slate-600 dark:text-slate-300">
          Designed &amp; administered by {examMeta.administration.exam_designer_administrator}, delivered via{' '}
          {examMeta.administration.delivery_vendor}.
        </p>
        <div className="mt-3 flex flex-wrap gap-x-5 gap-y-1 text-sm text-indigo-600 dark:text-indigo-300">
          {links.map(([href, label]) => (
            <a key={label} className="hover:underline" href={href} target="_blank" rel="noreferrer">
              {label}
            </a>
          ))}
        </div>
      </section>
    </div>
  )
}

function Row({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div>
      <dt className="text-xs font-semibold uppercase tracking-wider text-slate-400">{label}</dt>
      <dd className="mt-0.5 text-sm text-slate-700 dark:text-slate-200">{children}</dd>
    </div>
  )
}
