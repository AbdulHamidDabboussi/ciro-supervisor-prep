# Lean drafting spec v1.0: Retail Securities question bank

Set 2026-10-23 by user decision: **2 mock forms (240 reviewed questions) with minimum token use.** This replaces the Supervisor-style multi-audit pipeline for this exam. Binding background: `../README.md` (the syllabus is the golden standard; ASD-STE100 for all learner-facing text) and `../study-material/study-guide/STUDY-GUIDE-SPEC.md` (calculation-scope table).

## Source: the study guide, not the raw corpus

Write every question **from the element's study guide** (`../study-material/study-guide/E<n>.md`). The guide was adversarially audited and its 2,163 quotes are verified.
- The correct answer, and the reason each distractor is wrong, must be supported by the guide's text.
- **Regulatory items:** copy `source_quote` from an existing **R claim** in `E<n>.sources.json`. Use its `quote`, unchanged, plus its `source_file` and `locator`, formatted exactly as `"<quote>" — <source_file> <locator>`. Never write a new quote.
- **Concept and calculation items:** omit `source_quote`. Put the basis in `qa_note` (e.g. `concept: guide 6.8` or `calc: 0.04 + 1.2 × (0.09 − 0.04) = 0.10`).
- Do not open the corpus unless a guide claim is unclear. **Never open any Practice-Exam file.**

## Quotas (drafted ≈ 1.15 × reviewed target)

| Element | Reviewed target | Draft | IDs |
|---|---:|---:|---|
| 1 | 54 | 62 | RSE-E1-0001–0062 |
| 2 | 20 | 23 | RSE-E2-0001–0023 |
| 3 | 24 | 28 | RSE-E3-0001–0028 |
| 4 | 28 | 33 | RSE-E4-0001–0033 |
| 5 | 32 | 37 | RSE-E5-0001–0037 |
| 6 | 26 | 30 | RSE-E6-0001–0030 |
| 7 | 28 | 33 | RSE-E7-0001–0033 |
| 8 | 14 | 17 | RSE-E8-0001–0017 |
| 9 | 14 | 17 | RSE-E9-0001–0017 |

## Item rules

- **Fields** (`schema.json`): `id`, `element`, `outcome`, `taxonomy`, `type: "standard"`, `stem`, `options {A,B,C,D}`, `answer`, `rationale`, `rule_refs`, `difficulty`, `status: "draft"`, plus `source_quote` or `qa_note`.
- **Coverage:** spread items across all the element's outcomes, weighted to their depth in the guide, with every outcome at least once where the quota allows.
- **Taxonomy:** at or below the outcome's level in `syllabus.json`. Test Apply/Analyze outcomes mostly with short client scenarios in the stem. Use invented names that are not already used in the study guide.
- **Calculations:** only in the outcomes the calculation table lists. They must be solvable with a basic or scientific calculator in a few steps. Check every number in python and record it in `qa_note`.
- **Difficulty:** about 30% easy, 50% medium, 20% hard. **Keys:** about even across A/B/C/D.
- **Options:** exactly 4, distinct, similar in length and form. Each distractor is wrong for a reason the rationale can state. Do not use "all of the above" or "none of the above".
- **Rationale:** say why the key is correct and why the closest distractor is wrong, and cite the rule or concept. Keep it to about 60 words or fewer.
- **One clear answer:** if a careful expert could defend two options, rewrite the item.
- **No duplicates:** no two items test the same fact the same way.
- **ASD-STE100** applies to the stem, options and rationale: 25 words or fewer per sentence, active voice, plain words, one term per meaning. Finance and regulatory terms are allowed technical names. Quoted rule text is exempt.
- **Originality:** all items are original. Never copy CIRO or CSI material.

## Output

`batches/E<n>-batch-001.draft.json` = `{"meta": {"batch": "E<n>-001", "drafted": "<date>", "source": "study guide v1.1"}, "questions": [...]}`.

## Gates

| Gate | Done by | Rule |
|---|---|---|
| Structure, STE, quotes, duplicates | `tools/qa_questions.py` (script) | Schema, 4 distinct options, key present, taxonomy within the ceiling, outcome exists, ID format, every sentence 25 words or fewer, `source_quote` verifies against the corpus, stem near-duplicates (Jaccard > 0.6) |
| Gate 1: blind solve | Independent solvers on Sonnet, given only the stem and options | Solver wrong, low confidence, or ambiguity flag → **item killed** (no rewrites). Medium confidence and correct → pass |
| Merge | `tools/qa_questions.py merge` | Passing items become `status: "reviewed"` in `bank.json`, logged in `../research/qa-log.md` |

If an element ends below its reviewed target, run one small top-up batch for that element only, through the same gates.
