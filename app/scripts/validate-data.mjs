// Data integrity check — re-implements question-bank/PIPELINE.md "Gate 3 (lint)" as a
// CI/build gate (see ../../README.md "Invariants"). Reads the SOURCE-OF-TRUTH JSON
// directly (not the copied public/data), validates against the existing schema.json
// files, then enforces the integrity rules a JSON Schema can't express.
//
// Exit code 1 on any violation so `npm run build` / CI fails loudly.

import { readFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import Ajv from 'ajv'

const repoRoot = new URL('../../', import.meta.url)
const read = (rel) => JSON.parse(readFileSync(fileURLToPath(new URL(rel, repoRoot)), 'utf8'))

const questionSchema = read('question-bank/schema.json')
const cardSchema = read('study-material/flashcards/schema.json')
const bank = read('question-bank/bank.json')
const deck = read('study-material/flashcards/cards.json')
const syllabus = read('study-material/syllabus.json')

const ajv = new Ajv({ allErrors: true, strict: false })
const validateQuestion = ajv.compile(questionSchema)
const validateCard = ajv.compile(cardSchema)

const TAX_RANK = { Remember: 0, Understand: 1, Apply: 2, Analyze: 3 }

// Build the outcome -> taxonomy ceiling map from the syllabus.
const outcomeCeiling = new Map()
for (const el of syllabus.elements) {
  for (const o of el.outcomes) outcomeCeiling.set(o.id, o.taxonomy)
}

const errors = []
const err = (id, msg) => errors.push(`${id}: ${msg}`)

// ---- Questions ----
let reviewedQ = 0
for (const q of bank.questions) {
  if (!validateQuestion(q)) {
    err(q.id ?? '(no id)', 'schema — ' + ajv.errorsText(validateQuestion.errors, { separator: '; ' }))
    continue
  }
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

// ---- Flashcards ----
let reviewedC = 0
for (const c of deck.cards) {
  if (!validateCard(c)) {
    err(c.id ?? '(no id)', 'schema — ' + ajv.errorsText(validateCard.errors, { separator: '; ' }))
    continue
  }
  if (c.status !== 'reviewed') err(c.id, `status is "${c.status}" — only "reviewed" cards may ship`)
  else reviewedC++
  if (!outcomeCeiling.has(c.outcome)) err(c.id, `outcome "${c.outcome}" does not exist in syllabus.json`)
}

// ---- Report ----
console.log(`Questions: ${bank.questions.length} total, ${reviewedQ} reviewed`)
console.log(`Flashcards: ${deck.cards.length} total, ${reviewedC} reviewed`)
console.log(`Syllabus: ${syllabus.elements.length} elements, ${outcomeCeiling.size} outcomes`)

if (bank.meta?.count != null && bank.meta.count !== bank.questions.length) {
  console.warn(`⚠ bank.meta.count (${bank.meta.count}) ≠ actual question count (${bank.questions.length})`)
}
if (deck.meta?.count != null && deck.meta.count !== deck.cards.length) {
  console.warn(`⚠ cards.meta.count (${deck.meta.count}) ≠ actual card count (${deck.cards.length})`)
}

if (errors.length) {
  console.error(`\n✗ ${errors.length} integrity error(s):`)
  for (const e of errors.slice(0, 50)) console.error('  - ' + e)
  if (errors.length > 50) console.error(`  …and ${errors.length - 50} more`)
  process.exit(1)
}
console.log('\n✓ All data integrity checks passed (Gate 3).')
