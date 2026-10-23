// Shared exam-registry helpers for copy-data.mjs and validate-data.mjs.
//
// The registry (../../exams.json) lists every exam the site serves and where its ingest
// artifacts live. Per exam, `syllabus` + `exam_meta` are required for the exam to ship;
// `bank`, `cards` and `study_guide` are optional (an exam can launch with only a study
// guide while its question bank is still going through the pipeline).

import { existsSync, readFileSync, readdirSync } from 'node:fs'
import { fileURLToPath } from 'node:url'

export const repoRoot = new URL('../../', import.meta.url)

export const readJson = (path) => JSON.parse(readFileSync(path, 'utf8'))

export function loadRegistry() {
  return readJson(fileURLToPath(new URL('exams.json', repoRoot)))
}

/** Absolute path of an exam's file key (or null if the key isn't declared). */
export function examPath(exam, key) {
  const rel = exam.files[key]
  if (!rel) return null
  return fileURLToPath(new URL(`${exam.root}/${rel}`.replace(/^\.\//, ''), repoRoot))
}

export function has(exam, key) {
  const p = examPath(exam, key)
  return p != null && existsSync(p)
}

/** An exam ships only once its syllabus and exam-meta exist. */
export function isShippable(exam) {
  return has(exam, 'syllabus') && has(exam, 'exam_meta')
}

/**
 * Study-guide element files: E1.md … En.md in the study_guide directory. Anything else
 * there (provenance sidecars like E1.sources.json, specs, drafts) is never shipped.
 */
export function studyGuideFiles(exam) {
  if (!has(exam, 'study_guide')) return []
  const dir = examPath(exam, 'study_guide')
  return readdirSync(dir)
    .map((f) => /^E(\d+)\.md$/.exec(f))
    .filter(Boolean)
    .map((m) => ({ element: Number(m[1]), path: `${dir}/${m[0]}` }))
    .sort((a, b) => a.element - b.element)
}
