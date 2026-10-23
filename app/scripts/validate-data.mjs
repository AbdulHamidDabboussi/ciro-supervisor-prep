// Data integrity check — re-implements question-bank/PIPELINE.md "Gate 3 (lint)" as a
// CI/build gate (see ../../README.md "Invariants"). For every exam in ../../exams.json it
// reads the SOURCE-OF-TRUTH JSON directly (not the copied public/data), validates against
// that exam's schema.json files, then enforces the integrity rules a JSON Schema can't
// express. Exams without a syllabus/exam-meta yet are skipped (they don't ship either).
//
// Exit code 1 on any violation so `npm run build` / CI fails loudly.

import { readFileSync } from 'node:fs'
import Ajv from 'ajv'
import { loadRegistry, examPath, has, isShippable, studyGuideFiles, readJson } from './exams.mjs'

const TAX_RANK = { Remember: 0, Understand: 1, Apply: 2, Analyze: 3 }

const errors = []
const ids = new Map() // question/card id -> exam id, to catch cross-exam collisions

function validateExam(exam) {
  const err = (id, msg) => errors.push(`[${exam.id}] ${id}: ${msg}`)
  const syllabus = readJson(examPath(exam, 'syllabus'))
  const examMeta = readJson(examPath(exam, 'exam_meta'))
  const ajv = new Ajv({ allErrors: true, strict: false })

  // Build the outcome -> taxonomy ceiling map from the syllabus.
  const outcomeCeiling = new Map()
  for (const el of syllabus.elements) {
    for (const o of el.outcomes) {
      if (outcomeCeiling.has(o.id)) err(o.id, 'duplicate outcome id in syllabus.json')
      if (!(o.taxonomy in TAX_RANK)) err(o.id, `unknown taxonomy "${o.taxonomy}" in syllabus.json`)
      outcomeCeiling.set(o.id, o.taxonomy)
    }
  }

  // ---- Exam meta vs syllabus ----
  const weightSum = examMeta.element_weights.reduce((n, w) => n + w.questions, 0)
  if (weightSum !== examMeta.format.questions_total) {
    err('exam-meta', `element_weights sum to ${weightSum}, not format.questions_total ${examMeta.format.questions_total}`)
  }
  for (const w of examMeta.element_weights) {
    if (!syllabus.elements.some((el) => el.id === w.element)) err('exam-meta', `weight for unknown element ${w.element}`)
  }
  if (examMeta.scoring?.pass_mark != null) {
    err('exam-meta', 'scoring.pass_mark is set — CIRO publishes no pass mark; never display one')
  }

  // ---- Questions ----
  let total = 0
  let reviewedQ = 0
  if (has(exam, 'bank')) {
    const validateQuestion = ajv.compile(readJson(examPath(exam, 'bank_schema')))
    const bank = readJson(examPath(exam, 'bank'))
    total = bank.questions.length
    for (const q of bank.questions) {
      if (!validateQuestion(q)) {
        err(q.id ?? '(no id)', 'schema — ' + ajv.errorsText(validateQuestion.errors, { separator: '; ' }))
        continue
      }
      if (ids.has(q.id)) err(q.id, `duplicate id (also in ${ids.get(q.id)})`)
      ids.set(q.id, exam.id)
      if (q.status !== 'reviewed') err(q.id, `status is "${q.status}" — only "reviewed" items may ship`)
      else reviewedQ++

      const opts = [q.options.A, q.options.B, q.options.C, q.options.D]
      if (new Set(opts.map((s) => s.trim())).size !== 4) err(q.id, 'options are not 4 distinct values')
      if (!q.options[q.answer]) err(q.id, `answer key "${q.answer}" has no matching option`)

      if (!outcomeCeiling.has(q.outcome)) {
        err(q.id, `outcome "${q.outcome}" does not exist in syllabus.json`)
      } else {
        const ceiling = outcomeCeiling.get(q.outcome)
        if (TAX_RANK[q.taxonomy] > TAX_RANK[ceiling]) {
          err(q.id, `taxonomy "${q.taxonomy}" exceeds outcome ${q.outcome} ceiling "${ceiling}"`)
        }
      }

      if (q.type === 'item_set' && (!q.item_set_id || !q.scenario)) {
        err(q.id, 'item_set question missing item_set_id or scenario')
      }
      if (String(q.element) !== q.outcome.split('.')[0]) {
        err(q.id, `element ${q.element} does not match outcome prefix "${q.outcome}"`)
      }
    }
    if (bank.meta?.count != null && bank.meta.count !== bank.questions.length) {
      console.warn(`⚠ [${exam.id}] bank.meta.count (${bank.meta.count}) ≠ actual question count (${bank.questions.length})`)
    }
  }

  // ---- Flashcards ----
  let cardsTotal = 0
  let reviewedC = 0
  if (has(exam, 'cards')) {
    const validateCard = ajv.compile(readJson(examPath(exam, 'cards_schema')))
    const deck = readJson(examPath(exam, 'cards'))
    cardsTotal = deck.cards.length
    for (const c of deck.cards) {
      if (!validateCard(c)) {
        err(c.id ?? '(no id)', 'schema — ' + ajv.errorsText(validateCard.errors, { separator: '; ' }))
        continue
      }
      if (ids.has(c.id)) err(c.id, `duplicate id (also in ${ids.get(c.id)})`)
      ids.set(c.id, exam.id)
      if (c.status !== 'reviewed') err(c.id, `status is "${c.status}" — only "reviewed" cards may ship`)
      else reviewedC++
      if (!outcomeCeiling.has(c.outcome)) err(c.id, `outcome "${c.outcome}" does not exist in syllabus.json`)
    }
    if (deck.meta?.count != null && deck.meta.count !== deck.cards.length) {
      console.warn(`⚠ [${exam.id}] cards.meta.count (${deck.meta.count}) ≠ actual card count (${deck.cards.length})`)
    }
  }

  // ---- Study guide: each E<n>.md covers exactly element n's outcomes, once each, in order ----
  const guide = studyGuideFiles(exam)
  for (const g of guide) {
    const el = syllabus.elements.find((e) => e.id === g.element)
    if (!el) {
      err(`E${g.element}.md`, 'no such element in syllabus.json')
      continue
    }
    const md = readFileSync(g.path, 'utf8')
    const headed = [...md.matchAll(/^##\s+(\d+\.\d+)\b/gm)].map((m) => m[1])
    const expected = el.outcomes.map((o) => o.id)
    for (const id of expected) if (!headed.includes(id)) err(`E${g.element}.md`, `missing section for outcome ${id}`)
    for (const id of headed) if (!expected.includes(id)) err(`E${g.element}.md`, `section for unknown outcome ${id}`)
    if (new Set(headed).size !== headed.length) err(`E${g.element}.md`, 'an outcome section appears more than once')
    if (headed.join() !== expected.filter((id) => headed.includes(id)).join()) {
      err(`E${g.element}.md`, 'outcome sections are not in syllabus order')
    }
  }

  console.log(`[${exam.id}] Syllabus: ${syllabus.elements.length} elements, ${outcomeCeiling.size} outcomes`)
  console.log(`[${exam.id}] Questions: ${total} total, ${reviewedQ} reviewed · Flashcards: ${cardsTotal} total, ${reviewedC} reviewed`)
  console.log(`[${exam.id}] Study guide: ${guide.length} element file(s)`)
}

const registry = loadRegistry()
for (const exam of registry.exams) {
  if (!isShippable(exam)) {
    console.log(`[${exam.id}] skipped — syllabus.json / exam-meta.json not present yet`)
    continue
  }
  validateExam(exam)
}

if (errors.length) {
  console.error(`\n✗ ${errors.length} integrity error(s):`)
  for (const e of errors.slice(0, 50)) console.error('  - ' + e)
  if (errors.length > 50) console.error(`  …and ${errors.length - 50} more`)
  process.exit(1)
}
console.log('\n✓ All data integrity checks passed (Gate 3).')
