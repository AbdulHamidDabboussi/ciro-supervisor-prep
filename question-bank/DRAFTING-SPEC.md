# Drafting spec v1.2 — canonical wave-runner reference

Used by interactive and scheduled wave runs. A "wave" = 3 element batches of 50 items, drafted in parallel, gated, merged. Authoritative process: PIPELINE.md. Precedents and current state: qa-log.md (read the latest "Master bank state" section before doing anything).

## Wave schedule (set 2026-06-04; re-derive IDs from bank.json max-ID per element if anything mismatches)

| Wave | Batches | ID ranges |
|---|---|---|
| 5 (interactive) | E1-002, E2-002, E3-002 | SUP-E1-0056–0105, SUP-E2-0056–0105, SUP-E3-0055–0104 |
| 6 (sched. 1:05am) | E7-002, E8-002, E9-002 | SUP-E7-0054–0103, SUP-E8-0055–0104, SUP-E9-0053–0102 |
| 7 (sched. 2:05am) | E4-003, E5-003, E6-003 | SUP-E4-0111–0160, SUP-E5-0109–0158, SUP-E6-0105–0154 |
| 8 (sched. 6:20am) | E4-004, E5-004, E1-003 | SUP-E4-0161–0210, SUP-E5-0159–0208, SUP-E1-0106–0155 |

## Per-batch drafter brief (launch 3 in parallel, one per element; subagent_type general-purpose)

Compose each drafter prompt from this template:

1. ROLE: drafting original CIRO Supervisor Exam practice questions for Element N — batch -00k. STRICT: every fact quoted from local primary sources at drafting time, never recalled.
2. SCOPE: `study-material/syllabus.json` element N outcomes ONLY + verbatim element section in `research/sources/syllabus-raw.txt`. Nothing outside outcome parameters.
3. CORPUS (quote from): `research/sources/rules/idpc-rules.txt`, `research/sources/rules/umir.txt` (mandatory for E7; in-scope for E5 electronic-access/DEA/gatekeeper angles), `research/sources/rules/gn-3900-20-001.txt`. Element sourcing rules: E1 statutes/regulators (1.1–1.12, 1.15) and E3 product/model risks (3.4–3.10) and E9 risk lists quote the SYLLABUS PARAMETER TEXT; everything else quotes rule text.
4. NOVELTY GATE (mandatory for -002+; amended wave 6): read ALL existing stems for the element (seed-questions.json + every batches/EN-batch-*.json); build a tested-angle inventory; draft only untested subsections/parameters or inverse directions; run automated collision scans before finalizing — (a) rule_ref collision, (b) stem/key-text Jaccard, (c) keyed-option near-identity (key-text token Jaccard ≥0.65 + shared rule_ref family) against the ENTIRE bank.json, ALL elements — a same-fact pair with a reviewed item anywhere in the bank means pick a different angle (wave 6: 17 such kills where an element's anchors were pre-mined by other elements). Report near-misses rewritten. New invented firm names per batch, unique against the whole bank (grep all batches + bank.json, not just your element).
5. COMPOSITION: 50 items = 38 standard + 3 item-sets × 4 linked (item_set_id "EN-SET-XX" sequential after existing sets; scenario denormalized onto every linked item). All outcomes ≥1 (E1: ≥1 of 23; weight per qa-log gap notes). Taxonomy ≤ outcome ceiling. Difficulty 15/25/10. Keys ~even A/B/C/D.
6. PER-ITEM RULES: locate governing text → write FROM it → `source_quote` = CONTIGUOUS verbatim ≤50 words, STRAIGHT double quotes, no ellipses/inserted numbering, exact entity names, + file + ~line. No located quote → don't emit the item. 4 distinct options; each distractor wrong for an explainable reason; rationale defeats the closest distractor; rule_refs cite specific sections; status "draft".
7. COPYRIGHT ISOLATION: never open Supervisor-Exam-Practice-Exam-EN.* files.
8. OUTPUT: `question-bank/batches/EN-batch-00k.draft.json` = {"meta": {batch, drafted, date, corpus}, "questions": [...]}. Reply with summary stats only (no question text).

## Gates (after all 3 drafts land)

1. Mechanical pre-check (script): JSON valid, 50 items, unique IDs, required fields, no leak fields in blind input.
2. Build blind inputs (id/scenario/stem/options ONLY) to the session outputs dir; launch 3 parallel solver agents (subagent_type claude), expert persona for the element, answering from own knowledge, honest confidence + ambiguity flags; results JSON to outputs dir.
3. Gate 1 compare: solver answer vs key. WRONG → rewrite or kill, no exceptions (rewrites re-enter Gate 1 next wave). AMBIGUOUS flag → adjudicate against dispositive source text: pass only if the rule text uniquely supports the key (log the adjudication); else rewrite/kill. Medium-confidence-correct → verify the item's quote settles the doubted fact; pass with log.
4. Gate 2: independent quote re-verification (normalize NFKD + smart-punct + ligatures ﬀﬁﬂ + whitespace; extract quoted spans ≥20 chars OR text before " — "; candidate must appear contiguously in corpus). 0 fabrications required; formatting artifacts get the quote corrected, not the item killed.
5. Gate 3: full-bank lint (outcome exists, taxonomy ceiling, 4 distinct options, key present, item_set fields) + near-duplicate scan (stem token Jaccard > 0.6) across the ENTIRE merged bank, PLUS (added wave 6) a keyed-option near-identity sweep (key-text token Jaccard ≥0.65 + shared rule_ref family → manual same-fact adjudication; catches dups whose stems differ lexically). Same-fact near-dups: keep the better-anchored item, kill the other (cross-element collisions count). If kills shrink an item-set below 3, hold the set's gate-passing survivors un-merged (qa_note) for the element's next batch to top the set back up.
6. Merge passing items (status → "reviewed") into bank.json; update meta.count; append a wave section to qa-log.md (counts, adjudications, kills with reasons); add a PIPELINE.md ledger row; update README.md composition line.

## Autonomy rules for scheduled runs

- Fully autonomous: never wait for user input; never use AskUserQuestion.
- Before drafting, check for unfinished prior work: any `batches/*-batch-*.draft.json` whose items are still status "draft" and not yet in bank.json → finish THAT wave's gates first, then proceed (or stop after finishing it if time/limits are tight).
- Unresolvable ambiguity or missing source → exclude the item (leave status "draft" or "killed" with qa_note), log it; never merge doubtful items.
- If agent session limits hit mid-run: agents usually write their output files before dying — check for the files before re-running; log partial state to qa-log.md so the next run can resume.
- Do not modify: bank.json items already "reviewed", syllabus.json, exam-meta.json, flashcards (unless explicitly part of the wave).
