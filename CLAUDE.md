# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this repo is

Two things in one repo:

1. **Data + content layers for CIRO proficiency exams** (Canadian Investment Regulatory Organization; proficiency model effective 2026-01-01), each generated and QA'd through a strict pipeline:
   - **CIRO Supervisor Exam** — lives at the repo root (`research/`, `study-material/`, `question-bank/`): research, content model, 1,339-item question bank, 446-card flashcard deck.
   - **CIRO Retail Securities Exam** — lives in `exams/retail-securities/` (same layout). See its `README.md` for its **amended source policy** (regulatory content quoted; finance concepts relaxed but independently verified) and build order (study guide before questions).
2. **`app/`** — a static **React + Vite + TypeScript** SPA (the practice website, "CIRO Exam Prep") that reads that data and is deployed to **GitHub Pages**. Visitors switch exams in the header. See `PLAN.md` for the original build plan and decisions.

**`exams.json` (repo root) is the exam registry**: id, display names, localStorage prefix, root folder, and the path of each ingest artifact. Add an exam = add an entry + its data folder; the app needs no code change.

`README.md` is the authoritative data-layer brief and `question-bank/PIPELINE.md` is the authoritative content-generation process — read both before working on data.

## Layout (big picture)

- `research/` — five workstream reports (`01`–`05`) + `sources/` verbatim corpus (official PDF text extractions + `rules/` IDPC/UMIR/GN text). **Build/verification input only, LOCAL ONLY:** the corpus files are gitignored (copyright) and must be re-downloaded on a fresh clone (`research/sources/DOWNLOAD-MANIFEST.md`; for the Retail Securities exam, `exams/retail-securities/research/sources/SOURCES.md`). They are never shipped to the site.
- `study-material/` — site content model: `syllabus.json`, `exam-meta.json`, `source-library.md`, and `flashcards/`.
- `question-bank/` — `bank.json` plus its `schema.json`, `PIPELINE.md`, `qa-log.md`, `seed-questions.json`, and `batches/` provenance.
- `app/` — the website (see "The app" below).
- `*.pdf` (root) — official CIRO documents (copyright; may be linked, not republished).

## The ingest artifacts (data contracts the app consumes)

Per exam (paths in `exams.json`), the app ingests **only** these; everything else is provenance/research. `syllabus.json` + `exam-meta.json` are required for an exam to ship; the bank, cards and study guide are optional (pages without content show "coming soon"). Paths below are the Supervisor exam's:

1. `question-bank/bank.json` — `{ meta, questions: [...] }`. **Only `status:"reviewed"` items.** Per-item fields in `question-bank/schema.json`: stable `id` (`SUP-E4-0017`), `element` (1–9), `outcome` (`4.3`), `taxonomy` (`Remember|Understand|Apply|Analyze`), `type` (`standard|item_set`), `stem`, `options` (A/B/C/D, distinct), `answer`, `rationale`, `rule_refs`, `difficulty`, `status`. Item-set items add `item_set_id` (e.g. `"E4-SET-01"`) + `scenario` (denormalized onto every item of the set — group by `item_set_id`, render the scenario once). `source_quote` is provenance, not for rendering.
2. `study-material/flashcards/cards.json` — `{ meta, cards: [...] }`; schema in `flashcards/schema.json`. `type`: `definition|threshold|list|distinction|process|trap`; `front`/`back` (back ≤30 words).
3. `study-material/syllabus.json` — backbone: `{ meta, elements: [{id, title, questions, summary, outcomes:[{id, taxonomy, statement}]}] }`. 9 elements → 103 outcomes. Source of truth for navigation, filtering, taxonomy ceilings.
4. `study-material/exam-meta.json` — form spec & exam facts: 90 questions/form (60 standard + 30 item-set), 180-min timer, `element_weights`, fees/attempts/admin, official URLs.
5. *(optional)* `study-material/study-guide/E<n>.md` — study guide, one Markdown file per element with exactly one `## <outcome id> <title>` section per outcome (format: `exams/retail-securities/study-material/study-guide/STUDY-GUIDE-SPEC.md`). Only the `E<n>.md` files ship (compiled to `study-guide.json`); `*.sources.json` provenance sidecars never ship.

## How content is produced (the pipeline)

Per `question-bank/PIPELINE.md` (STRICT): corpus in `research/sources/` → drafts in `question-bank/batches/*.draft.json` (flashcards in `flashcards/batches/`) → **Gate 1 blind solve** → **Gate 2 citation audit** → **Gate 3 lint** → passing items merged into `bank.json`/`cards.json`, logged in `qa-log.md`. Killed/draft items live **only** in `batches/`.

## Invariants — do not break

- **`bank.json` and `cards.json` are generated, QA'd artifacts.** Never hand-edit stems/options/answers/rationales in place; fixes go through `PIPELINE.md` so the gates re-run. The app reads them **read-only**.
- **Never ingest/ship `batches/` files** — they contain draft and *killed* items.
- **Only `status:"reviewed"` ships.** Exclude items by filtering on `status`, never by deletion.
- **IDs are stable, unique, never reused/renumbered** — safe as React keys / router params.
- **The repo is PUBLIC — never commit copyrighted material.** Full-text copies of CIRO/CSA/CRA/other third-party documents (PDFs, text extractions, HTML) stay local and gitignored. Commit only what we derive from them: syllabus.json, exam-meta, study guides, banks and cards with short attributed `source_quote`s, source maps with line pointers, and URL manifests. Copyrighted text was purged from git history on 2026-10-22.
- **Copyright:** all questions are original; never import from CIRO's practice-exam PDF or CSI materials. Quoting IDPC/UMIR/guidance with attribution is fine; CIRO's syllabus/guide/practice-exam PDFs may be linked, not republished.
- **Question integrity to preserve in any transform:** exactly 4 distinct options, key present, `taxonomy` ≤ the outcome's ceiling in `syllabus.json`, `outcome` exists in `syllabus.json`. (`app/scripts/validate-data.mjs` enforces these — it is the Gate-3 lint as a CI check.)

## Domain facts worth not re-deriving

- 90 MCQ (60 standard + 30 item-set), 180 min, closed-book, proctored. 9 elements; `element_weights` = 10/10/9/20/15/8/6/7/5 (Element 4 + 5 = 39%).
- **No pass mark is published** — never display an "official pass threshold." Any readiness benchmark must be labelled the site's own heuristic.
- `taxonomy` is cumulative: `Remember < Understand < Apply < Analyze`.
- The bank supports **~3 fully distinct mock forms** (Element 4 = 60 items is the binding constraint). Roadmap grows toward ~1,500 via `PIPELINE.md` waves.
- One fact remains officially **unconfirmed** — `GN-2600-25-001…004` numbering — do not state it as fact. Calculator policy is **confirmed** (2026-10-22, all CIRO exams): personal calculators banned, on-screen Prometric basic/scientific calculator provided — Fitch Learning Support article updated 2026-10-17 (https://fitchlearning-na.zendesk.com/hc/en-ca/articles/6075272480799-Can-I-use-a-physical-calculator-during-the-exam).

## The app (`app/`)

- **Stack:** React 18 + Vite + TypeScript + Tailwind CSS; `react-router-dom` `HashRouter`; `zustand` (`persist` → `localStorage`); `ajv` for data validation.
- **Data flow:** `npm run dev`/`build` runs `scripts/copy-data.mjs`, which reads `exams.json` and copies each exam's ingest artifacts into `app/public/data/<exam-id>/` (gitignored), plus a per-exam `manifest.json` and a site-level `exams.json`. The app `fetch()`es them at runtime via `import.meta.env.BASE_URL`. **Never** copy `batches/`. To refresh the site after a bank grows, re-run the copy (automatic in build) and redeploy.
- **Validation = Gate 3:** `scripts/validate-data.mjs` validates each exam's source JSON against that exam's `schema.json` files plus the integrity checks above, study-guide structure, and cross-exam ID uniqueness. It reads the source data directly (not the copy).
- **Routing:** every page is `#/<examId>/<page>` (`HashRouter`). `#/` goes to the visitor's last exam; pre-multi-exam links (`#/drill?…`) redirect into it. In-app links use `components/ExamLink.tsx` (`Link`, `NavLink`, `useExamNavigate`), which prefix the current exam — don't import `Link` from `react-router-dom` in pages.
- **State:** browser-only. Progress and mock state are **per exam** (`<storage_prefix>-progress`, `<storage_prefix>-mock`; the Supervisor exam's prefix `ciro` keeps the original keys); `store/examScope.ts` re-points the persisted stores on exam switch. Theme and last exam live in `ciro-prefs`. No accounts, no server.
- **Hosting:** GitHub Pages project site at `/ciro-supervisor-prep/`. `base` is set in `vite.config.ts`; hash routing keeps deep links working on refresh. Deploy via `.github/workflows/deploy.yml`.

### Commands (run inside `app/`)

- `npm run dev` — copy data, start dev server
- `npm run build` — copy data, validate, typecheck, build to `dist/`
- `npm run validate` — data integrity checks (Gate 3) against source JSON
- `npm run typecheck` — `tsc --noEmit`
- `npm run preview` — preview the production build
