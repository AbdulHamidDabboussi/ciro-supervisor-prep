// Copies each exam's ingest artifacts (per ../../exams.json) into app/public/data/<exam-id>/
// so Vite can serve them. This is the ONLY data the site ships.
//
// Invariants (see ../../CLAUDE.md):
//   - Only the declared ingest artifacts are copied. NEVER copy batches/ folders — those
//     hold draft and killed provenance. Study guides ship only their E<n>.md files,
//     compiled into one study-guide.json (provenance sidecars stay behind).
//   - bank.json / cards.json are generated, QA'd artifacts: copied verbatim, read-only.
//
// Run automatically by `npm run dev` and `npm run build`.

import { mkdirSync, copyFileSync, statSync, readFileSync, writeFileSync, rmSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { loadRegistry, examPath, has, isShippable, studyGuideFiles, readJson } from './exams.mjs'

const outRoot = fileURLToPath(new URL('../public/data/', import.meta.url))
rmSync(outRoot, { recursive: true, force: true })
mkdirSync(outRoot, { recursive: true })

const registry = loadRegistry()
const shipped = []

for (const exam of registry.exams) {
  if (!isShippable(exam)) {
    console.warn(`⚠ ${exam.id}: syllabus.json / exam-meta.json not found — exam not shipped yet`)
    continue
  }
  const outDir = `${outRoot}${exam.id}/`
  mkdirSync(outDir, { recursive: true })

  const copy = (key, dest) => {
    if (!has(exam, key)) return false
    copyFileSync(examPath(exam, key), outDir + dest)
    const kb = (statSync(outDir + dest).size / 1024).toFixed(0)
    console.log(`✓ ${exam.id}: ${exam.files[key]} → public/data/${exam.id}/${dest} (${kb} KB)`)
    return true
  }

  copy('syllabus', 'syllabus.json')
  copy('exam_meta', 'exam-meta.json')
  const hasBank = copy('bank', 'bank.json')
  const hasCards = copy('cards', 'cards.json')

  const guide = studyGuideFiles(exam)
  if (guide.length) {
    const metaPath = `${examPath(exam, 'study_guide')}/meta.json`
    let meta = {}
    try {
      meta = readJson(metaPath)
    } catch {}
    const elements = guide.map((g) => ({ id: g.element, markdown: readFileSync(g.path, 'utf8') }))
    writeFileSync(outDir + 'study-guide.json', JSON.stringify({ meta, elements }))
    console.log(`✓ ${exam.id}: study guide (${guide.length} element files) → public/data/${exam.id}/study-guide.json`)
  }

  // Tiny per-exam manifest so Home renders counts without fetching the heavy bank.
  const bank = hasBank ? readJson(examPath(exam, 'bank')) : null
  const cards = hasCards ? readJson(examPath(exam, 'cards')) : null
  const manifest = {
    questions: bank ? (bank.meta?.count ?? bank.questions.length) : 0,
    cards: cards ? (cards.meta?.count ?? cards.cards.length) : 0,
    study_guide: guide.length > 0,
    updated: bank?.meta?.updated ?? null,
    completion: bank?.meta?.completion ?? null,
  }
  writeFileSync(outDir + 'manifest.json', JSON.stringify(manifest, null, 2))
  console.log(`✓ ${exam.id}: manifest (${manifest.questions} questions, ${manifest.cards} cards, study guide: ${manifest.study_guide})`)

  shipped.push({
    id: exam.id,
    name: exam.name,
    short: exam.short,
    storage_prefix: exam.storage_prefix,
    ...manifest,
  })
}

const defaultExam = shipped.some((e) => e.id === registry.default_exam) ? registry.default_exam : shipped[0]?.id
writeFileSync(
  `${outRoot}exams.json`,
  JSON.stringify({ site_title: registry.site_title, default_exam: defaultExam, exams: shipped }, null, 2),
)
console.log(`Wrote exams.json (${shipped.length} exam(s): ${shipped.map((e) => e.id).join(', ')}).`)
