# CIRO Supervisor Exam — Practice Website Project

Data and content foundation for a practice-exam website for the **CIRO Supervisor Exam** (Canadian Investment Regulatory Organization, proficiency model effective January 1, 2026). Research, content model, and question bank built and QA'd June 4, 2026.

**State at handoff: the data layer is build-ready.** 643 reviewed questions covering all 9 syllabus elements, 446 reviewed crash-course flashcards (the study-notes layer), a verified content model, and exam-form metadata. Not yet built: the website itself, French content.

## Folder map

```
CIRO/
├── README.md                  ← you are here (build brief for the website)
├── RESEARCH-REPORT.md         ← synthesized research report (background)
├── *.pdf                      ← official CIRO documents (syllabus, study guide, practice exam)
├── research/                  ← research reports + verbatim source corpus
│   ├── 01…05-*.md                      workstream reports (logistics, syllabus, rules, market, transition)
│   └── sources/                        verbatim text of official PDFs + rules corpus
│       ├── syllabus-raw.txt                official syllabus, English, reading order
│       ├── Supervisor-Exam-*.txt           syllabus / study guide / practice exam extractions
│       ├── DOWNLOAD-MANIFEST.md            remaining Tier 2/3 source downloads (optional)
│       └── rules/                          idpc-rules.txt (Jan 8 2026) · umir.txt (annotated, Jan 13 2026) · gn-3900-20-001.txt
├── study-material/            ← site content model (INGEST THESE)
│   ├── syllabus.json                   9 elements → 103 outcomes (id, taxonomy, scope statement, weights)
│   ├── exam-meta.json                  exam parameters: form spec, fees, attempts, admin, official links
│   ├── source-library.md               tiered primary-source reading list
│   └── flashcards/
│       ├── cards.json                  MASTER DECK — 446 reviewed crash-course cards (site ingests this)
│       ├── schema.json                 JSON Schema for cards
│       └── batches/                    provenance: per-element decks (incl. 1 killed card)
└── question-bank/             ← question data (INGEST bank.json ONLY)
    ├── bank.json                       MASTER BANK — 1,177 reviewed items
    ├── schema.json                     JSON Schema for items
    ├── PIPELINE.md                     strict QA process + status ledger (how items get made)
    ├── qa-log.md                       per-run gate results and adjudications
    ├── seed-questions.json             provenance (first 45 items)
    └── batches/                        provenance (per-element drafts incl. killed items + audit reports)
```

## Data contracts

### `question-bank/bank.json` — the question bank

`{ meta, questions: [...] }`. Bank contains **only `status: "reviewed"` items** (passed all QA gates). Killed items exist only in `batches/` provenance files — never ingest those files.

Guaranteed fields per item:

```json
{
  "id": "SUP-E4-0017",                 // stable, unique; never reuse or renumber
  "element": 4,                        // 1–9, matches syllabus.json
  "outcome": "4.3",                    // learning outcome id in syllabus.json
  "taxonomy": "Understand",            // Remember | Understand | Apply | Analyze
  "type": "standard",                  // "standard" | "item_set"
  "stem": "…question text…",
  "options": {"A": "…", "B": "…", "C": "…", "D": "…"},   // always exactly 4, distinct
  "answer": "B",
  "rationale": "…why the key is right and the closest distractor wrong…",
  "rule_refs": ["IDPC 3211", "Syllabus 4.3"],
  "difficulty": "easy",                // easy | medium | hard (≈30/50/20 per element)
  "status": "reviewed"
}
```

Optional fields: `item_set_id` + `scenario` (item_set items only — scenario text is denormalized onto every item of the set; group by `item_set_id`, render scenario once); `source_quote` (verbatim supporting quote + source locator — present on 448 of 493 items; show in an expandable "source" affordance if desired); `qa_note`.

Current composition (after wave 7, 2026-06-05): 1,066 items · per element 1:105, 2:105, 3:104, 4:158, 5:156, 6:153, 7:96, 8:104, 9:85 · item-set share 18% · keys A:264 B:284 C:273 D:245. Supports 7 fully distinct 90-question mock forms (E4 at 158/20 binding until wave 8's E4-004 lands). Wave 8 remains scheduled (6:20am); wave process: question-bank/DRAFTING-SPEC.md; per-run results: qa-log.md.

### `study-material/flashcards/cards.json` — crash-course study layer

`{ meta, cards: [...] }` — 446 reviewed cards, all `status: "reviewed"`. Fields: `id` (FC-E4-0017), `element`, `outcome`, `type` (definition | threshold | list | distinction | process | trap), `front` (retrieval prompt), `back` (≤30-word answer), `rule_refs`, `source_quote` (provenance, not for rendering), optional `qa_note`. Per element: E1:58 E2:50 E3:41 E4:81 E5:70 E6:39 E7:37 E8:40 E9:30 · 15.4k words total (~20-min read per element). Intended UX: study an element's deck → drill that element's questions. QA: every card citation-audited; sufficiency-tested by answering 417 bank questions from cards alone with 0 incorrect. Five deliberate cross-element duplicate pairs are listed in `meta.qa` (decks are studied standalone — do not "dedupe" them).

### `study-material/syllabus.json` — content backbone

`{ meta, elements: [{id, title, questions, summary, outcomes: [{id, taxonomy, statement}]}] }`. 9 elements, 103 outcomes, verified verbatim against the official English syllabus (two correction passes logged: outcome 3.3 taxonomy; 7.1 order-type list). Use for navigation, drill filtering, question tagging, and progress-by-outcome.

### `study-material/exam-meta.json` — form spec and exam facts

Authoritative for: 90 questions/form, 60 standard + 30 item-set, 180-minute timer, element weights (10/10/9/20/15/8/6/7/5), attempts/fees/admin facts, official URLs. Use `element_weights` to compose mock forms; use the rest to power an "about the exam" page.

## Build spec (agreed decisions)

1. **Priorities:** questions first, study notes second. Progress tracking explicitly deprioritized for now — no accounts/backend needed; a static or local-state app over these JSON files is the intended v1.
2. **Drill mode:** filter by element and outcome; immediate feedback showing `rationale` + `rule_refs` (this is the differentiator — CIRO's own practice exam has no rationales).
3. **Mock-exam mode:** assemble 90-question forms per `element_weights`, 180-min countdown (no pause — mirrors real rules), item-sets kept intact within their element's allocation. Known gap: bank is ~14% item-set vs the real form's 33% — assemble with all available sets and fill with standard items; later batches will close the ratio. Bank currently supports **3 fully distinct forms** (binding constraint: E4 = 60 items vs 20/form).
4. **Scoring display:** CIRO publishes NO pass mark (per-form psychometric standard setting). Show percentage + per-element breakdown + taxonomy-level breakdown. Never display an "official pass threshold"; if a readiness benchmark is wanted, label it as the site's own heuristic.
5. **Challenge flow:** every rendered question gets a "challenge this question" action (even if v1 just logs locally/mailto). Per `PIPELINE.md`, sustained challenges demote an item from mock rotation.
6. **Exam-day/info pages:** source facts from `exam-meta.json` and `research/01-exam-logistics.md`. Two facts remain officially unconfirmed: calculator policy, and GN-2600-25-001…004 numbering — don't state them as fact.

## Invariants — do not break

- **`bank.json` is a generated, QA'd artifact.** Do not hand-edit stems/options/answers/rationales in the site repo. Content fixes go through the pipeline (`PIPELINE.md`) so gates re-run; site-side, remove an item by filtering on `status`, never by deletion.
- **IDs are stable** — safe as database/router keys.
- **Copyright:** all 493 questions are original. Never import questions from CIRO's practice exam PDF or CSI materials. Quoting IDPC/UMIR/guidance text with attribution is fine (public regulatory text). CIRO's PDFs (syllabus/guide/practice exam) may be linked, not republished.
- **Question integrity stats worth preserving in any transform:** 4 distinct options, key present, taxonomy ≤ outcome ceiling, outcome exists in syllabus.json. A validator pass exists conceptually in `PIPELINE.md` Gate 3 — re-implement it as a CI check in the site repo.

## The exam in one paragraph (for site copy)

90 multiple-choice questions (60 standalone + 30 item-set) in 3 hours, closed-book, computer-based, proctored by Prometric (test centre or remote), administered by Fitch Learning. $475 first attempt, $300 retakes, max 3 attempts per 12-month enrolment, 6-month cooling-off after 3 fails in 6 months. Pass/fail only — no pass mark published. No prerequisite courses; the official syllabus is the closed, authoritative scope ("you will not be tested on any aspects of topics that are not explicitly mentioned in the syllabus"). Elements 4 (Account approvals, 20 Qs) + 5 (Account activity, 15 Qs) = 39% of the exam. Exam validity: 3 years. One Supervisor Exam covers all supervisor types; approval may additionally require the exams of those supervised plus 2 years' relevant experience (IDPC 2603).

## Roadmap after site v1

- Question bank: grow toward ~1,500 via the pipeline (next: E4-002 ≈ +270 is the long pole; E5-002 includes item-set top-up; E6-002 includes the killed-item-angle redraft). Cadence can run as scheduled parallel waves — see `PIPELINE.md` ledger for the proven wave pattern.
- Study notes: author per element from `source-library.md` Tier 0–2 (all free primary sources) into `study-material/notes/` (proposed), keyed by element/outcome for side-by-side display with drills.
- Differentiators identified in market research (`research/04`): explanation-rich feedback, per-question rule citations, free element, French content, budget pricing. Only 3 competitors live; strongest brand not launched.

## Canonical official links

- Exam page: https://www.ciro.ca/registered-individuals/proficiency/exam-hub/supervisor-exam
- Syllabus: https://www.ciro.ca/media/13606/download?attachment · Study guide: https://www.ciro.ca/media/13671/download?attachment · Practice exam: https://www.ciro.ca/media/14071/download?attachment
- Competency profile: https://www.ciro.ca/media/1006/download?attachment (App. 8) · https://www.ciro.ca/media/13631/download?attachment (App. 16)
- IDPC Rules: https://www.ciro.ca/sites/default/files/2026-01/IDPC-Rules-080126-EN.pdf · UMIR: https://www.ciro.ca/rules-and-enforcement/universal-market-integrity-rules
- Enrolment: https://portal.fitchlearning.ca/2/CiroCandidateEnrollment/exams/ · Support: https://fitchlearning-na.zendesk.com/hc/en-ca
