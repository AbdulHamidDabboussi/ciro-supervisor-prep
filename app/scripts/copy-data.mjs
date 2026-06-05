// Copies the FOUR ingest artifacts from the repo's source-of-truth data folders
// into app/public/data/ so Vite can serve them. This is the ONLY data the site ships.
//
// Invariants (see ../../CLAUDE.md):
//   - Only these four files are copied. NEVER copy question-bank/batches/ or
//     flashcards/batches/ — those hold draft and killed provenance.
//   - bank.json / cards.json are generated, QA'd artifacts: copied verbatim, read-only.
//
// Run automatically by `npm run dev` and `npm run build`.

import { mkdirSync, copyFileSync, existsSync, statSync, readFileSync, writeFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'

const repoRoot = new URL('../../', import.meta.url)
const outDir = new URL('../public/data/', import.meta.url)

const FILES = [
  ['question-bank/bank.json', 'bank.json'],
  ['study-material/flashcards/cards.json', 'cards.json'],
  ['study-material/syllabus.json', 'syllabus.json'],
  ['study-material/exam-meta.json', 'exam-meta.json'],
]

mkdirSync(fileURLToPath(outDir), { recursive: true })

let copied = 0
for (const [src, dest] of FILES) {
  const from = new URL(src, repoRoot)
  const to = new URL(dest, outDir)
  const fromPath = fileURLToPath(from)
  if (!existsSync(fromPath)) {
    console.error(`✗ missing source data file: ${src}`)
    process.exit(1)
  }
  copyFileSync(fromPath, fileURLToPath(to))
  const kb = (statSync(fileURLToPath(to)).size / 1024).toFixed(0)
  console.log(`✓ ${src} → public/data/${dest} (${kb} KB)`)
  copied++
}

console.log(`Copied ${copied} data files into public/data/.`)

// Emit a tiny manifest so the app can render Home (counts) without fetching the 2.3 MB
// bank up front — the bank + cards are then loaded lazily in the background.
const readJson = (rel) => JSON.parse(readFileSync(fileURLToPath(new URL(rel, repoRoot)), 'utf8'))
const bank = readJson('question-bank/bank.json')
const cards = readJson('study-material/flashcards/cards.json')
const manifest = {
  questions: bank.meta?.count ?? bank.questions.length,
  cards: cards.meta?.count ?? cards.cards.length,
  updated: bank.meta?.updated ?? null,
  completion: bank.meta?.completion ?? null,
}
writeFileSync(fileURLToPath(new URL('manifest.json', outDir)), JSON.stringify(manifest, null, 2))
console.log(`Wrote manifest.json (${manifest.questions} questions, ${manifest.cards} cards).`)
