import type { Bank, Deck, Syllabus, ExamMeta, Manifest } from '../types'

// Data lives in public/data/ (copied from the repo's source-of-truth folders by
// scripts/copy-data.mjs). BASE_URL makes the fetch path correct under the GitHub
// Pages subpath (/ciro-supervisor-prep/).
const dataUrl = (file: string) => `${import.meta.env.BASE_URL}data/${file}`

async function fetchJson<T>(file: string): Promise<T> {
  const res = await fetch(dataUrl(file))
  if (!res.ok) throw new Error(`Failed to load ${file} (${res.status})`)
  return (await res.json()) as T
}

// Core = small files needed to render the app shell + Home (≈40 KB total).
export interface CoreData {
  syllabus: Syllabus
  examMeta: ExamMeta
  manifest: Manifest
}

// Heavy = the question bank + flashcards (≈2.6 MB), loaded in the background.
export interface HeavyData {
  bank: Bank
  deck: Deck
}

export async function loadCore(): Promise<CoreData> {
  const [syllabus, examMeta, manifest] = await Promise.all([
    fetchJson<Syllabus>('syllabus.json'),
    fetchJson<ExamMeta>('exam-meta.json'),
    fetchJson<Manifest>('manifest.json'),
  ])
  return { syllabus, examMeta, manifest }
}

export async function loadHeavy(): Promise<HeavyData> {
  const [bank, deck] = await Promise.all([
    fetchJson<Bank>('bank.json'),
    fetchJson<Deck>('cards.json'),
  ])
  return { bank, deck }
}
