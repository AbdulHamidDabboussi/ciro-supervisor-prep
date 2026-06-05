# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this repo is

Two things in one repo:

1. **The data + content layer** for the **CIRO Supervisor Exam** (Canadian Investment Regulatory Organization; proficiency model effective 2026-01-01) — research, a structured content model, a 493-item question bank, and a 446-card flashcard deck. This is content, generated and QA'd through a strict pipeline.
2. **`app/`** — a static **React + Vite + TypeScript** SPA (the practice website) that reads that data and is deployed to **GitHub Pages**. See `PLAN.md` for the build plan and decisions.

`README.md` is the authoritative data-layer brief and `question-bank/PIPELINE.md` is the authoritative content-generation process — read both before working on data.

## Layout (big picture)

- `research/` — five workstream reports (`01`–`05`) + `sources/` verbatim corpus (official PDF text extractions + `rules/` IDPC/UMIR/GN text). **Build/verification input only; never shipped to the site.**
- `study-material/` — site content model: `syllabus.json`, `exam-meta.json`, `source-library.md`, and `flashcards/`.
- `question-bank/` — `bank.json` plus its `schema.json`, `PIPELINE.md`, `qa-log.md`, `seed-questions.json`, and `batches/` provenance.
- `app/` — the website (see "The app" below).
- `*.pdf` (root) — official CIRO documents (copyright; may be linked, not republished).

## The four ingest artifacts (data contracts the app consumes)

The app ingests **only** these four; everything else is provenance/research:

1. `question-bank/bank.json` — `{ meta, questions: [...] }`. **Only `status:"reviewed"` items.** Per-item fields in `question-bank/schema.json`: stable `id` (`SUP-E4-0017`), `element` (1–9), `outcome` (`4.3`), `taxonomy` (`Remember|Understand|Apply|Analyze`), `type` (`standard|item_set`), `stem`, `options` (A/B/C/D, distinct), `answer`, `rationale`, `rule_refs`, `difficulty`, `status`. Item-set items add `item_set_id` (e.g. `"E4-SET-01"`) + `scenario` (denormalized onto every item of the set — group by `item_set_id`, render the scenario once). `source_quote` is provenance, not for rendering.
2. `study-material/flashcards/cards.json` — `{ meta, cards: [...] }`; schema in `flashcards/schema.json`. `type`: `definition|threshold|list|distinction|process|trap`; `front`/`back` (back ≤30 words).
3. `study-material/syllabus.json` — backbone: `{ meta, elements: [{id, title, questions, summary, outcomes:[{id, taxonomy, statement}]}] }`. 9 elements → 103 outcomes. Source of truth for navigation, filtering, taxonomy ceilings.
4. `study-material/exam-meta.json` — form spec & exam facts: 90 questions/form (60 standard + 30 item-set), 180-min timer, `element_weights`, fees/attempts/admin, official URLs.

## How content is produced (the pipeline)

Per `question-bank/PIPELINE.md` (STRICT): corpus in `research/sources/` → drafts in `question-bank/batches/*.draft.json` (flashcards in `flashcards/batches/`) → **Gate 1 blind solve** → **Gate 2 citation audit** → **Gate 3 lint** → passing items merged into `bank.json`/`cards.json`, logged in `qa-log.md`. Killed/draft items live **only** in `batches/`.

## Invariants — do not break

- **`bank.json` and `cards.json` are generated, QA'd artifacts.** Never hand-edit stems/options/answers/rationales in place; fixes go through `PIPELINE.md` so the gates re-run. The app reads them **read-only**.
- **Never ingest/ship `batches/` files** — they contain draft and *killed* items.
- **Only `status:"reviewed"` ships.** Exclude items by filtering on `status`, never by deletion.
- **IDs are stable, unique, never reused/renumbered** — safe as React keys / router params.
- **Copyright:** all questions are original; never import from CIRO's practice-exam PDF or CSI materials. Quoting IDPC/UMIR/guidance with attribution is fine; CIRO's syllabus/guide/practice-exam PDFs may be linked, not republished.
- **Question integrity to preserve in any transform:** exactly 4 distinct options, key present, `taxonomy` ≤ the outcome's ceiling in `syllabus.json`, `outcome` exists in `syllabus.json`. (`app/scripts/validate-data.mjs` enforces these — it is the Gate-3 lint as a CI check.)

## Domain facts worth not re-deriving

- 90 MCQ (60 standard + 30 item-set), 180 min, closed-book, proctored. 9 elements; `element_weights` = 10/10/9/20/15/8/6/7/5 (Element 4 + 5 = 39%).
- **No pass mark is published** — never display an "official pass threshold." Any readiness benchmark must be labelled the site's own heuristic.
- `taxonomy` is cumulative: `Remember < Understand < Apply < Analyze`.
- The bank supports **~3 fully distinct mock forms** (Element 4 = 60 items is the binding constraint). Roadmap grows toward ~1,500 via `PIPELINE.md` waves.
- Two facts remain officially **unconfirmed** — calculator policy and `GN-2600-25-001…004` numbering — do not state them as fact.

## The app (`app/`)

- **Stack:** React 18 + Vite + TypeScript + Tailwind CSS; `react-router-dom` `HashRouter`; `zustand` (`persist` → `localStorage`); `ajv` for data validation.
- **Data flow:** `npm run dev`/`build` runs `scripts/copy-data.mjs`, which copies the four ingest artifacts into `app/public/data/` (gitignored). The app `fetch()`es them at runtime via `import.meta.env.BASE_URL`. **Never** copy `batches/`. To refresh the site after the bank grows, re-run the copy (automatic in build) and redeploy.
- **Validation = Gate 3:** `scripts/validate-data.mjs` validates the source JSON against the existing `schema.json` files plus the integrity checks above. It reads the source data directly (not the copy).
- **State:** browser-only. `localStorage` keys hold drill progress, mock history, flashcard flags, and theme. No accounts, no server.
- **Hosting:** GitHub Pages project site at `/ciro-supervisor-prep/`. `base` is set in `vite.config.ts`; hash routing keeps deep links working on refresh. Deploy via `.github/workflows/deploy.yml`.

### Commands (run inside `app/`)

- `npm run dev` — copy data, start dev server
- `npm run build` — copy data, validate, typecheck, build to `dist/`
- `npm run validate` — data integrity checks (Gate 3) against source JSON
- `npm run typecheck` — `tsc --noEmit`
- `npm run preview` — preview the production build
