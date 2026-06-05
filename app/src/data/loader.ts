import type { Bank, Deck, Syllabus, ExamMeta } from '../types'

// Data lives in public/data/ (copied from the repo's source-of-truth folders by
// scripts/copy-data.mjs). BASE_URL makes the fetch path correct under the GitHub
// Pages subpath (/ciro-supervisor-prep/).
const dataUrl = (file: string) => `${import.meta.env.BASE_URL}data/${file}`

async function fetchJson<T>(file: string): Promise<T> {
  const res = await fetch(dataUrl(file))
  if (!res.ok) throw new Error(`Failed to load ${file} (${res.status})`)
  return (await res.json()) as T
}

export interface AppData {
  bank: Bank
  deck: Deck
  syllabus: Syllabus
  examMeta: ExamMeta
}

export async function loadAppData(): Promise<AppData> {
  const [bank, deck, syllabus, examMeta] = await Promise.all([
    fetchJson<Bank>('bank.json'),
    fetchJson<Deck>('cards.json'),
    fetchJson<Syllabus>('syllabus.json'),
    fetchJson<ExamMeta>('exam-meta.json'),
  ])
  return { bank, deck, syllabus, examMeta }
}
