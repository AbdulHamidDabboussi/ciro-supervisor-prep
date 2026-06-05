# Question-bank generation pipeline — STRICT mode

Policy set June 4, 2026: **strict** — any item where the blind solver hesitates, disagrees, or finds a second defensible answer is rewritten or killed. No borderline items enter the bank.

## Targets

- Bank size: ~1,500 items (≥10 per learning outcome where feasible, weighted to blueprint share: E4 ≈ 22%, E5 ≈ 17%, …).
- Mix: ~2/3 standard, ~1/3 item-set (scenario + 3–6 linked questions), mirroring the 60/30 real form.
- Difficulty: target ≈ 30% easy / 50% medium / 20% hard per element, calibrated against the official practice exam (local, `research/sources/Supervisor-Exam-Practice-Exam-EN.txt`).

## Inputs (prerequisites per batch)

- `study-material/syllabus.json` — outcome scope + taxonomy ceiling (a question must not exceed its outcome's taxonomy level).
- `research/sources/rules/` — primary corpus per DOWNLOAD-MANIFEST.md. **Generation quotes; it never recalls.** Every fact in a stem, key, or rationale must be traceable to text open in context at writing time.
- Official practice exam — style/difficulty calibration ONLY. Never copy stems, scenarios, options, or distinctive fact patterns (CIRO copyright).

## Per-batch flow (batch = one element slice, ~50 items)

1. **Corpus prep** — extract the rule sections + GN passages for the target outcomes into a working file; map outcome → source passages.
2. **Draft** — write items from quoted text. Required fields per schema.json; `rule_refs` must cite the specific rule/GN section, not just the series. Status: `draft`.
3. **Gate 1 — blind solve (strict).** An independent agent receives stems + options only (no keys, no rationales, fresh context). For each item: answer, confidence, ambiguity flag.
   - Solver wrong, low-confidence, or flags two defensible options → item is rewritten (if the defect is in the stem/distractor) or killed (if the underlying fact is contestable). Rewritten items re-enter Gate 1 in the next run. No exceptions.
4. **Gate 2 — citation audit.** A second pass checks each rationale claim against the quoted source passage verbatim. Mismatch → fix or kill. Pass → `status: reviewed`.
5. **Gate 3 — lint (automated).** schema validity; outcome exists; taxonomy ≤ outcome level; 4 distinct options; key-position balance within batch; near-duplicate detection (stem similarity) vs the whole bank; blueprint quota tracking.
6. **Merge** — passing items into `bank.json` (master); batch report appended to `qa-log.md` (counts: drafted / killed / rewritten / passed, with reasons).

`published` status is reserved for items that have additionally survived real-user exposure without sustained challenges.

## Site-side safety net

Every rendered question shows its `rule_refs` and a "challenge this question" action. Challenges route to a review queue; sustained challenges demote an item to `draft` and pull it from mock exams.

## Known limits (accepted)

- No SME sign-off: emphasis calibration is inferred from the official practice exam, not insider knowledge.
- Scenario (Apply/Analyze) items carry the residual risk; strict gating trades volume for correctness there by design.
- Rules evolve (e.g., UMIR GN updated Mar 2026; CIRO Rule Consolidation proposed for 2028). Each batch records the corpus consolidation date; bank re-audit required on major rule events.

## Status ledger

| Date | Event |
|---|---|
| 2026-06-04 | Policy set to STRICT. Seeds (45) drafted pre-corpus from research summaries; blind-solve gate applied retroactively (see qa-log.md). Corpus download pending (DOWNLOAD-MANIFEST.md). Gate 2 for seeds deferred until corpus lands. |
| 2026-06-04 | Tier 1 corpus landed (IDPC 2026-01-08, Annotated UMIR 2026-01-13, GN-3900-20-001). Gate 2 on seeds: 44 pass / 1 fix / 0 kill → all 45 `reviewed`. Batch E4-001 (50 items) ran the full pipeline: Gate 1 50/50, Gate 2 quote re-verification 0 fabrications, Gate 3 clean → merged. **bank.json = 95 reviewed items.** Process amendment: drafter source_quotes must be contiguous verbatim text (no ellipses, no inserted numerals, exact entity names) so the independent re-verification matches mechanically. |
| 2026-06-04 | **Wave 1 (parallel drafting proven):** E1/E2/E5 batches (150 items) drafted by 3 parallel agents, gated by 3 parallel solvers, adjudicated/merged serially. Gate 1: 150/150. Gate 2: 0 artifacts (v1.1 spec effective). One ambiguity flag resolved by dispositive rule text (3950(2) enumeration). **bank.json = 245 reviewed items.** Known gap: E5-001 is 47+3 (drafter session limit killed E5-SET-02); top up item-sets in E5-002. Wave 2 launched: E3/E6/E8. |
| 2026-06-04 | **Wave 2:** E3/E6/E8 (150 items). Gate 1: 149/150 — **first kill: SUP-E6-0043** (solver-wrong on rule-supported key; no-exceptions rule honored; angle to E6-002). Gate 2: 150/150 after verifier upgrade (handles curly quotes “”/«» and ﬀ/ﬁ/ﬂ ligature artifacts — tooling fix, not a content failure). **bank.json = 394 reviewed items.** All elements now stocked except E7 (3) and E9 (2) → wave 3 = E7+E9. |
| 2026-06-04 | **Wave 3:** E7/E9 (100 items). Gate 1: 100/100; two ambiguity flags resolved by dispositive UMIR 1.1 definitions and syllabus 9.2 lists. Gate 3 killed one cross-element near-duplicate (SUP-E7-0014 ≈ SUP-E4-0025). Drafter caught 5 order-type mistranslations in syllabus.json 7.1 (corrected vs English PDF). **bank.json = 493 reviewed items — FULL ELEMENT COVERAGE; 3 distinct mock forms supported.** Cumulative kill rate 0.4% (2/545). Next: second batches toward ~1,500 (E4-002 long pole). |
| 2026-06-04 | **Flashcard deck shipped (study-notes layer):** 446 reviewed cards across 9 element decks (`study-material/flashcards/cards.json`), built under the adapted gates — citation audit on all cards + open-cards solve sufficiency gate (417 bank questions answered cards-only, 0 incorrect; 19 gap patches). 1 card killed, 3 reworked. See qa-log.md flashcard section. |
| 2026-06-04 | **Bank wave 4:** E4-002/E5-002/E6-002 (150 items) under spec v1.2 + explicit novelty gate (drafters inventory existing stems; 12 near-misses self-caught). Gate 1: 150/150; 3 ambiguity flags resolved dispositively. Gate 2: 0 fabrications. **bank.json = 643 reviewed items; 5 distinct mock forms.** Process amendment: -002+ drafter prompts must include the novelty inventory step and new firm names per batch. |
