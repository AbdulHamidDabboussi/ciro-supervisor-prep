# CIRO Retail Securities Exam — data + content layer

Second exam on the site (registry: `../../exams.json`, id `retail-securities`). Same pipeline philosophy as the Supervisor exam (`../../question-bank/PIPELINE.md`, `../../question-bank/DRAFTING-SPEC.md`), with the source-policy amendment below. Started 2026-10-22.

## Layout

```
exams/retail-securities/
├── README.md                   ← you are here
├── official/                   ← official CIRO PDFs (gitignored — CIRO copyright; link, never republish)
├── research/
│   ├── 01-exam-logistics.md        exam facts, fees, attempts, admin, official links
│   ├── 02-outcome-source-map.md    outcome → corpus passages (what each outcome quotes from)
│   └── sources/                    verbatim text corpus
│       ├── Retail-Securities-Exam-Syllabus-EN.txt
│       ├── Retail-Securities-Exam-Practice-Exam-EN.txt   ← calibration ONLY; drafters never open it
│       ├── SOURCES.md                  manifest: every corpus file, URL, retrieval date, version
│       ├── ciro/  csa/  cra/  gov/     extracted text of official documents
│       └── downloads/                  original PDFs (gitignored)
├── study-material/             ← INGEST (via exams.json)
│   ├── syllabus.json               9 elements → outcomes (same shape as the Supervisor syllabus.json)
│   ├── exam-meta.json              form spec + exam facts
│   ├── study-guide/                study guide: E1.md … E9.md (+ provenance sidecars, not shipped)
│   └── flashcards/                 (later)
└── question-bank/              ← (later) bank.json, schema.json, batches/, qa-log.md
```

Rules corpus: this exam quotes the **current** consolidations saved in `research/sources/ciro/idpc-rules-2026-08-11.txt` and `research/sources/ciro/umir-2026-08-11.txt` (plus IDPC Form 1 Schedule 4 for cash/margin accounts). The Supervisor exam's older copies at `../../research/sources/rules/` (Jan 2026) are NOT used here. `research/sources/ciro/IDPC-UMIR-POINTERS.md` maps topics → rule numbers → line numbers; `research/02-outcome-source-map.md` maps every outcome to its governing passages (and has a Jan→Aug 2026 crosswalk). Some guidance notes cite legacy rule numbers (e.g. "3603(6)" → now IDPC 3602(6)); always cite the current IDPC number.

## Source policy (decided 2026-10-22 — amends PIPELINE.md for this exam)

Most of this syllabus is finance knowledge (bond math, duration, ratios, CAPM/APT/Fama–French, behavioural biases, Canadian tax mechanics), not rule text. The user chose a **split policy**:

- **Regulatory content is STRICT, exactly as PIPELINE.md:** anything about what a rule, instrument, guidance note, brochure, or CRA/government programme requires or permits (KYC, suitability, trusted contact, conflicts, complaints, prospectus/exemptions, fund facts, UMIR, margin/cash account, confirmations, communications, account types' regulatory features, tax-account rules and limits, pension programme features) is written FROM quoted text in `research/sources/` and carries a contiguous verbatim `source_quote`.
- **Concept content is RELAXED:** standard finance/economics/accounting concepts, formulas and calculations may be written from knowledge. They must be textbook-standard (no proprietary CSI/CIRO course framing), and every concept claim and every number is **independently re-derived by a verifier** (Gate 2-C, below). Contested or convention-dependent items (e.g. approximate-YTM formula variants, day-count conventions) must state the convention used.
- Every claim is tagged `R` (regulatory, quoted) or `C` (concept, verified) in provenance sidecars.
- Gate 2 therefore has two halves: **2-R** mechanical contiguous-quote re-verification (as before, 0 fabrications) and **2-C** independent concept/calculation audit (verifier recomputes every number from scratch; any mismatch → fix or kill).
- **The syllabus is the golden standard (user instruction, 2026-10-22).** It sets scope, taxonomy level and parameters for both the study guide and the questions. The corpus answers *what a rule says* only for topics the syllabus names. The Guide for Studying sets emphasis only. A topic that is in the corpus but not in the syllabus is out of scope.
- **Grounding (user instruction, 2026-10-22):** the study guide and every question stay grounded in the exam's own sources. Calculations appear only where the syllabus explicitly asks for them; everything else is tested conceptually. Statutes are covered at the depth the Guide for Studying sets: purpose, general requirements, implications of breach. The binding outcome-by-outcome table is in `study-material/study-guide/STUDY-GUIDE-SPEC.md` ("Grounding & calculation scope"), and question drafting uses the same table.
- Copyright isolation is unchanged: never open the official practice exam when drafting; never copy CSI course material.

## Build order

1. Research + corpus + `syllabus.json` + `exam-meta.json` (workflow, phase A).
2. **Study guide** (`study-material/study-guide/`) — written and audited BEFORE any questions, per the user's instruction.
3. Question bank waves (DRAFTING-SPEC.md pattern, IDs `RSE-E{n}-{0000}`), then flashcards.
