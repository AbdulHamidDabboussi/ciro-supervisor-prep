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
| 2026-06-05 | **Bank wave 5:** E1-002/E2-002/E3-002 (150 items). Canonical wave process extracted to **DRAFTING-SPEC.md**; waves now 38 standard + 3 item-sets each. Gate 1: 150/150; 2 ambiguity flags dispositively resolved (3726(3)(iv)(e) internal-ombudsman trap; 3907(2)). Gate 2: 1 short-quote fix, 0 fabrications. **bank.json = 793 reviewed items.** Waves 6–8 scheduled overnight (1:05 / 2:05 / 6:20 am) as autonomous runs per DRAFTING-SPEC.md; run summaries land in qa-log.md "Scheduled run log". |
| 2026-06-05 | **Waves 6–8 (scheduled, autonomous):** ran clean overnight; 384 merged across E7/E8/E9-002, E4/E5/E6-003, E4/E5-004 + E1-003; 28 kills, all logged; process self-amendments (bank-wide keyed-option sweep; anchor pre-partitioning; hyphen normalization). **bank.json = 1,177.** E4/E5 anchor pools exhausted (no -005). |
| 2026-06-05 | **Wave 9:** E7/E8/E9-003 + held-set resolution. 71 drafted (E8 13, E9 8 — honest corpus exhaustion; both elements feature-complete), 73 merged incl. 2 released holds; 2 held items killed as confirmed same-fact. E9-SET-05 ships at 2 members (logged). **bank.json = 1,250; 9 mock forms; 20% item-set.** Remaining: wave 10 (E2-003/E3-003) → feature-complete. |
| 2026-06-05 | **Wave 10 (FINAL):** E2-003 (50) + E3-003 (39, honest shortfall). Gate 1: 89/89. **BANK FEATURE-COMPLETE: 1,339 reviewed items, 9 mock forms.** All elements mined to honest exhaustion of the local corpus; lifetime: ~1,475 drafted, 4 Gate-1 failures ever, ~9% kill/cut rate. Future growth path: Tier 2 corpus expansion (DOWNLOAD-MANIFEST), then new waves under this spec. |
| 2026-06-05 | **Bank wave 6 (first scheduled autonomous run):** E7-002/E8-002/E9-002 (150 items). Gate 1: 148/150 — 2 kills (E7-0078/0079, Policy 7.1 Part 5/6 frequency pair; strict rule). Gate 2: 148/148, 0 fabrications. Gate 3: stem-Jaccard clean, but a **new keyed-option same-fact sweep** killed 17 cross-element/intra-batch duplicates (15 E9, 2 E7 — E9's anchors largely pre-mined by E2/E3/E5/E6); the kills cut E7-SET-05 and E9-SET-05 to 2 items each, so their 4 gate-passing survivors are held for E7-003/E9-003 set top-ups. **127 merged → bank.json = 920 reviewed items.** Process amendments: novelty gate is now **bank-wide** (all elements) incl. keyed-option near-identity check; invented names must be unique bank-wide. Flagged for human review: pre-existing E6-SET-04 scenario variant mismatch (wave-4 adjudication artifact). |
| 2026-06-05 | **Bank wave 7 (scheduled autonomous run):** E4-003/E5-003/E6-003 (150 items) under the bank-wide novelty gate — drafters self-caught 38 near-misses at drafting time (same-wave cross-batch collisions dominant). Gate 1: 147/150, 3 kills (strict rule: E4-0115 high-conf wrong on Rule 1201 individual limb; E4-0133 connective-trivia; E5-0121 GN bond-threshold trap); 0 ambiguity flags. Gate 2: 147/147, 0 fabrications after normalizer extended to U+2010–U+2012 hyphens (tooling fix). Gate 3: 1 same-fact dup killed (E5-0157 ≡ reviewed E5-0092, 3808(1)); E5-SET-08 ships at 3. **146 merged → bank.json = 1,066 reviewed items; 7 distinct mock forms (E4 158/20 binding).** Angles queued: 1201 individual limb → E4-004; GN $100k bond threshold → E5-004. Wave-8 note: pre-partition anchor families across parallel drafters. |
| 2026-06-05 | **Bank wave 8 (scheduled autonomous run):** E4-004/E5-004/E1-003 under pre-partitioned anchor lanes + sibling rescans (0 same-wave cross-batch collisions). **116 drafted with honest 4th-batch novelty shortfalls** (E4 41/50, E5 25/50 — E5-SET-11 killed whole at draft time; E1 50/50). Gate 1: 115/116, 1 kill (E1-0141 "where applicable" qualifier meta-trivia, solver-wrong + ambiguity flag; angle retired). Gate 2: 115/115, 0 fabrications — 13 E1 quote-form artifacts corrected (multi-segment/short-bullet quotes from syllabus-raw.txt two-column interleaving; future syllabus-quoting drafters must emit single contiguous spans). Gate 3: 4 same-fact kills, incl. the wave-7-queued 1201 redraft (E4-0162 — retired, limb already keyed by reviewed E3-0067); queued GN $100k bond-threshold redraft succeeded (SUP-E5-0164 merged). **111 merged → bank.json = 1,177 reviewed items; 9 distinct mock forms (E4 197/20 binding).** E4/E5 anchor pools effectively exhausted at 4th batches; remaining growth toward ~1,500 should come from E7/E8/E9-003, E2/E3-003, E6-004, and/or Tier-2 corpus expansion. |
