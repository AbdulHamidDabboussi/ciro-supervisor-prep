# CIRO Supervisor Exam Prep — v1 Build Plan

## Context

The repo's **data layer is build-ready** (493 reviewed questions in `question-bank/bank.json`, 446 flashcards in `study-material/flashcards/cards.json`, plus `syllabus.json` and `exam-meta.json`) but **no website exists yet**. This plan builds v1: a **static React SPA hosted on GitHub Pages** that reads the prepared JSON.

GitHub Pages forces the constraints: no backend, no server-side code, no writing data back to a server — all user state lives in the browser (`localStorage`). The data is the single source of truth and may be expanded later (more questions appended to `bank.json`); the app re-reads it on each deploy without code changes.

## Confirmed decisions

| Area | Decision |
|---|---|
| Framework | React 18 + Vite + TypeScript |
| Styling | Tailwind CSS; professional look, light + dark mode |
| Persistence | `localStorage` (per-question attempts/correct, mock history, flashcard status, theme) — no accounts, no backend |
| v1 features | Drill mode, Mock-exam mode, Flashcards study, About-the-exam page, Home/dashboard |
| Hosting | GitHub Pages **project site** → `username.github.io/ciro-supervisor-prep/`; Vite `base: '/ciro-supervisor-prep/'`; **hash routing** |
| Repo name | `ciro-supervisor-prep` |
| Challenge flow | Skipped in v1 |
| Mock scoring | Overall % + per-element % + per-taxonomy %, **NO pass/fail line**; review incorrect with rationale + rule_refs |
| Branding | Title "CIRO Supervisor Exam Prep", no logo, polished professional design |
| PWA / offline | No — online-only v1 |
| Analytics | None |
| Language | English only |
| Mock timer | 180-min countdown **with pause/resume** (UI notes the real exam has no pause); persists across reloads; auto-submit at 0 |

## Architecture

**Repo layout.** The app lives in `app/`. `question-bank/` and `study-material/` remain the single source of truth for data. A prebuild step (`app/scripts/copy-data.mjs`) copies **only the four ingest artifacts** into `app/public/data/` (gitignored): `bank.json`, `cards.json`, `syllabus.json`, `exam-meta.json`. This honors the invariant **never ship `batches/` provenance**. A data refresh = re-copy + redeploy, no code edits. The app `fetch()`es these at runtime using `import.meta.env.BASE_URL`.

**Types & validation (re-implements PIPELINE Gate 3 as a CI check).** `app/src/types.ts` mirrors the existing `schema.json` files. `app/scripts/validate-data.mjs` uses **ajv** against `question-bank/schema.json` and `flashcards/schema.json`, plus integrity checks not expressible in schema: 4 distinct options, `answer` key present, `taxonomy` ≤ the outcome's ceiling in `syllabus.json`, `outcome` exists in `syllabus.json`, only `status:"reviewed"` items present. Runs in `npm run validate` and CI; build fails on violation.

**State.** zustand + `persist` middleware → `localStorage`. Stores: `progress` (drill attempts + mock history + flashcard flags), `prefs` (theme), `mock` (active exam session incl. timer anchor for pause/resume persistence).

**Routing.** `react-router-dom` `HashRouter`. Routes: `/`, `/drill`, `/mock`, `/mock/result`, `/flashcards`, `/about`.

## Features

1. **App shell** — header nav, theme toggle, footer with official CIRO links + "unofficial, not affiliated" note. Loads the four JSONs once via context.
2. **Home/dashboard** — intro, entry cards, progress snapshot.
3. **Drill mode** — filter by element/outcome (+ difficulty/taxonomy); one question at a time; immediate feedback (rationale, rule_refs, expandable source_quote). Item-set scenario rendered above its stem.
4. **Mock-exam mode** — 90-question form via `element_weights` (10/10/9/20/15/8/6/7/5), item-sets drawn whole and capped near the exam's real ratio (`questions_item_set` = 30 ≈ 33%; lands ~27–28 given whole-set granularity), remainder filled with standard items. 180-min pausable timer (persisted), auto-submit at 0. Acknowledged limitation: the bank has only 17 item-sets, so only ~3 fully distinct forms are possible before reuse.
5. **Mock result** — overall + per-element + per-taxonomy %, **no pass line**; review incorrect with rationales; saved to history.
6. **Flashcards** — per-element decks from `cards.json`; flip UI; mark known/again; CTA to drill the element. Keep the 5 deliberate cross-element duplicate pairs.
7. **About** — facts/links from `exam-meta.json`; do not state the two unconfirmed facts (calculator policy; `GN-2600-25-001…004`) as fact; never show a pass threshold.

## Invariants honored

Ship only `status:"reviewed"`; never ship `batches/`; stable IDs as keys; no pass mark anywhere; link CIRO PDFs, never republish; data read-only in the app (fixes go through `PIPELINE.md`).

## Deployment

`.github/workflows/deploy.yml`: on push to `main`, `npm ci` → `npm run validate` → `npm run build` (in `app/`) → deploy `app/dist` via Pages (GitHub Actions source). `base: '/ciro-supervisor-prep/'`, `.nojekyll`, hash routing (no `404.html` needed).

## Commands (in `app/`)

- `npm run dev` — copy data + start Vite dev server
- `npm run build` — copy data + validate + typecheck + build
- `npm run validate` — run the data integrity checks (Gate 3)
- `npm run typecheck` — `tsc --noEmit`
- `npm run preview` — preview the production build

## Verification

`npm run validate` passes on the real data (493 questions, 446 cards, only `reviewed`); `app/public/data/` contains exactly the four files (no `batches/`); `npm run typecheck` and `build` succeed; preview under `/ciro-supervisor-prep/` smoke-tests each mode (drill feedback, item-set scenario once, mock 90-Q split, pausable timer surviving reload, breakdown with no pass line, flashcard flip+persist, About without unconfirmed facts); progress + theme persist across reload.
