import type { Bank, Deck, Syllabus, ExamMeta, Manifest, ExamRegistry, StudyGuide } from '../types'

// Data lives in public/data/<exam-id>/ (copied from the repo's source-of-truth folders by
// scripts/copy-data.mjs, per ../../exams.json). BASE_URL makes the fetch path correct
// under the GitHub Pages subpath (/ciro-supervisor-prep/).
const dataUrl = (file: string) => `${import.meta.env.BASE_URL}data/${file}`

async function fetchJson<T>(file: string): Promise<T> {
  const res = await fetch(dataUrl(file))
  if (!res.ok) throw new Error(`Failed to load ${file} (${res.status})`)
  return (await res.json()) as T
}

export function loadRegistry(): Promise<ExamRegistry> {
  return fetchJson<ExamRegistry>('exams.json')
}

// Core = small files needed to render the app shell + Home (≈40 KB total).
export interface CoreData {
  syllabus: Syllabus
  examMeta: ExamMeta
  manifest: Manifest
}

// Heavy = the question bank, flashcards and study guide (≈2.6 MB for the Supervisor
// exam), loaded in the background. Pieces an exam doesn't have yet load as empty.
export interface HeavyData {
  bank: Bank
  deck: Deck
  studyGuide: StudyGuide | null
}

export async function loadCore(examId: string): Promise<CoreData> {
  const [syllabus, examMeta, manifest] = await Promise.all([
    fetchJson<Syllabus>(`${examId}/syllabus.json`),
    fetchJson<ExamMeta>(`${examId}/exam-meta.json`),
    fetchJson<Manifest>(`${examId}/manifest.json`),
  ])
  return { syllabus, examMeta, manifest }
}

export async function loadHeavy(examId: string, manifest: Manifest): Promise<HeavyData> {
  const [bank, deck, studyGuide] = await Promise.all([
    manifest.questions > 0 ? fetchJson<Bank>(`${examId}/bank.json`) : { meta: {}, questions: [] },
    manifest.cards > 0 ? fetchJson<Deck>(`${examId}/cards.json`) : { meta: {}, cards: [] },
    manifest.study_guide ? fetchJson<StudyGuide>(`${examId}/study-guide.json`) : null,
  ])
  return { bank, deck, studyGuide }
}
