# QA log — question bank

## 2026-06-04 — Gate 1 (blind solve) retroactive run on seeds

- Scope: all 45 seed items. Solver: independent agent, fresh context, stems + options only (no keys, no rationales, no repo access beyond the input file).
- Result: **45/45 solver answers matched keys. 0 wrong, 0 ambiguity flags, 0 low confidence.** 40 high confidence; 5 medium confidence.
- Strict adjudication of the 5 medium-confidence items — each hesitation was solver-recall uncertainty about exact wording; each fact checked against the verbatim official syllabus (`research/sources/syllabus-raw.txt`):

| Item | Hesitation | Source adjudication |
|---|---|---|
| SUP-E2-0002 | CCO+CFO vs UDP+CCO board pairing | Verbatim: "Reporting requirements for the Chief Compliance Officer (CCO) and Chief Financial Officer (CFO) to the Board" (syllabus 2.3) — PASS |
| SUP-E4-0005 | "non-renewable" wording | Verbatim: "Maximum term of no longer than 12 months (non-renewable)" (4.19) — PASS |
| SUP-E4-0008 | loss-limit formulation | Verbatim: "A lifetime basis and validated with the client on an annual basis or An annual basis and updated annually" (4.11) — PASS |
| SUP-E4-0010 | LOU restricted to institutional? | Verbatim: "Letter of Undertaking as an alternative to trading agreement for institutional clients only" (4.12) — PASS |
| SUP-E5-0005 | 0.5% threshold / prohibition framing | Verbatim: "Preventing a retail client from holding … more than 0.5% of the float …" (5.14) — PASS |

- Verdict: **45 pass Gate 1.** Status remains `draft` pending Gate 2 (citation audit vs full rules corpus — blocked on DOWNLOAD-MANIFEST Tier 1 files; the 5 adjudicated items above are effectively Gate-2-verified for their syllabus-stated facts).
- Artifacts: solver input/output in session outputs (`blind-solve-input.json`, `blind-solve-results.json`) — transient.

Prior automated lint (same date, at authoring): schema validity, outcome existence, element/outcome consistency, taxonomy ≤ outcome level, 4 distinct options, unique IDs, key-position shuffle (A:11 B:15 C:8 D:11) — all pass.

## 2026-06-04 — Gate 2 (citation audit) on seeds — corpus run

- Corpus: IDPC Rules 2026-01-08 + Annotated UMIR 2026-01-13 + GN-3900-20-001 + official syllabus. Independent audit agent; report: `batches/gate2-seeds-report.json`.
- Result: **44 pass / 1 fix / 0 kills.** Fix applied: SUP-E9-0002 second stem finding re-anchored to verbatim syllabus 9.3 text (advertising/sales-literature review failure) — the original "customized portfolio summaries" detail is Appendix 16 language, not syllabus 9.3. Also applied (non-blocking): SUP-E4-0001 rationale now cites IDPC 3214(1)–(3) verbatim.
- Notable verifications: 12-month non-renewable (IDPC 3274), dealer 30-day termination (3278(2)), loss limits (3252(2)), 0.5% CFD float + shareholder-rights prohibition (3962(5)(v)-(vi)), LOU institutional-only (3253(1)), settlements need dealer written consent (3710(1)), borrowing exemptions (3115(2)(iii)), CCO+CFO board reports (3915), pre-approval list (3602(3)), research disclosures (3608(2)), frontrunning (UMIR 4.1), gatekeeper (UMIR 10.16), temporary holds (3222), hold-mail (3219), suitability triggers (3402(2)).
- **All 45 seeds promoted to `reviewed`.**

## 2026-06-04 — Batch E4-001 (50 items) — full pipeline run

- Drafted by corpus-quoting agent: 50 items (42 standard + 2 item-sets × 4), IDs SUP-E4-0011–0060, all 21 outcomes of Element 4 covered, difficulty 15/25/10, keys A12/B13/C13/D12. Every item carries a `source_quote`.
- **Gate 1 (blind solve, fresh agent, stems+options only): 50/50 solver-key agreement. 0 wrong, 0 ambiguous, 0 low confidence.** 7 medium-confidence hesitations (0015, 0017, 0020, 0024, 0032, 0034, 0053) — each adjudicated against the verbatim quote on the item; all 7 are solver-recall doubt over facts that are character-exact in source. PASS.
- **Gate 2 (independent quote re-verification by orchestrator, not the drafter):** 42/50 matched contiguously; 5 were ellipsis-elided quotes whose fragments all verify; 3 were formatting artifacts (0019 inserted numerals; 0032 "Dealer Member" vs syllabus "Investment Dealer"; 0060 smart-quote mismatch) — quotes corrected to character-exact text. **0 fabrications, 0 kills.**
- Gate 3 lint: schema, taxonomy ceilings, options, item-set fields, cross-bank near-duplicate scan (vs all 45 seeds) — clean.
- **All 50 promoted to `reviewed` and merged.**

## Master bank state after merge

`bank.json`: **95 items, all `reviewed`.** Per element: E1:5 E2:5 E3:4 **E4:60** E5:8 E6:4 E7:3 E8:4 E9:2. Keys A23/B28/C21/D23. 87 standard + 8 item-set.
Next batches by blueprint gap: **E5 (need ~+50), E1/E2 (+25 each), E3/E6/E8 (+20), E7/E9 (+15)** — corpus for E5 fully on hand (Rule 3900 + GN-3900-20-001 + UMIR).

## 2026-06-04 — Wave 1 (parallel): batches E1-001, E2-001, E5-001 (150 items)

- Drafted by three parallel corpus-quoting agents under spec v1.1 (contiguous verbatim quotes). E1: 50 items, all 23 outcomes (statutes/regulators sourced from syllabus parameter text per study-guide rule; IDPC for complaints/ethics/conflicts/PFD). E2: 50 items, all 12 outcomes (incl. Rule 4100/4200 audit sourcing for 2.5). E5: 50 items, all 16 outcomes — drafter hit a session limit after writing the file; its self-report was lost; composition is 47 standard + one item-set of 3 (E5-SET-02 never drafted). All gates below ran independently of drafter self-checks.
- **Gate 1 (3 parallel fresh solvers): 150/150 solver-key agreement. 0 wrong.** E1 50/50 high-confidence; E2 1 medium (0042); E5 2 medium (0021, 0045) + 1 ambiguity flag (0034).
- Adjudications vs source: 0042 — "Regular (at minimum annual) reviews of the delegation process" verbatim syllabus 2.10 → PASS. 0021 — 3945(4) designation list verbatim (non-client/discretionary/managed/registered/restricted) → PASS. 0045 — 3252(2) "other than a hedging account" verbatim → PASS. **0034 (ambiguous)** — stem pins 3950(2); rule text enumerates exactly 7 institutional detection items; competing option (uncovered-option exposures) is on the retail derivatives list, NOT 3950(2) → key uniquely correct per dispositive source; distractors are adjacent-rule by design → PASS with note.
- **Gate 2 (independent contiguous-quote re-verification): 150/150 verified, 0 fabrications, 0 formatting artifacts** (spec v1.1 fixed the E4-001 artifact class).
- Gate 3 lint across full 245-item bank: schema, taxonomy ceilings, options, item-set fields, near-duplicate scan — clean.
- **All 150 promoted to `reviewed` and merged.**

## Master bank state after wave 1

`bank.json`: **245 items, all `reviewed`.** Per element: **E1:55 E2:55** E3:4 **E4:60 E5:58** E6:4 E7:3 E8:4 E9:2. Keys A62/B75/C59/D49. 218 standard + 27 item-set.
Remaining gaps: E3 (+~145), E6 (+~130), E8 (+~110), E7 (+~95), E9 (+~80), then second batches for E1/E2/E4/E5 toward full-scale targets. Wave 2 = E3/E6/E8.

## 2026-06-04 — Wave 2 (parallel): batches E3-001, E6-001, E8-001 (150 items)

- Three parallel drafters under spec v1.1. E3: 50 items, all 10 outcomes (product/model-risk items sourced from verbatim syllabus parameters per sourcing rule; structural items from IDPC 2300/2207/3240s/3270s/3900s/4220s). E6: 50 items, all 8 outcomes (IDPC 1201/2550s/2600s/3200s/3300s/3400s/3900s). E8: 50 items, 8.1–8.4 (IDPC 3600 series + 3803 + syllabus parameters for social-media/CASL/off-channel).
- **Gate 1 (3 parallel fresh solvers): 149/150 agreement, 1 mismatch.**
  - E3: 0 wrong, 4 medium-confidence — all settled verbatim by their quotes (2304 immediate assumption of responsibility; 3816 written waiver of confirmations; syllabus 3.9/3.10 compensation mapping). PASS.
  - E6: **1 wrong — SUP-E6-0043 KILLED** (strict rule, first kill of the pipeline). Key A ("prior to entry", verbatim 3970(4)) is correct and the stem forecloses the PM/Executive exceptions, but the solver chose the exception timing (B). Solver-wrong = rewrite-or-kill, no exceptions; angle queued for clean redraft in E6-002. 9 medium-confidence items settled verbatim by quotes (3203 trust names/addresses; 3204 30-day directors list; 2603 APM two-years-within-three; 3241(4) tape-recorded acknowledgement; 3962(3) daily+monthly discretionary/managed derivatives reviews; 2551-series no-outside-remuneration; 3963 loss-limit detection; syllabus 6.6 fluid-circumstances list; legacy-derivatives scope wording). PASS.
  - E8: 0 wrong, 1 medium (0045 — wall-crossing approver) settled verbatim by syllabus text: "Approval by designated Executive". PASS.
- **Gate 2 (independent quote re-verification): 150/150 verified** after fixing the verifier's quote extraction (E3/E8 drafters used curly quotes; corpus contains ﬀ-ligature artifacts — extractor now handles “”/«»/ligatures). 0 fabrications. Verifier improvement noted in PIPELINE.
- Gate 3 lint across full 394-item bank: clean; near-duplicate scan: none.
- **149 promoted to `reviewed` and merged; 1 killed (retained in batch file with qa_note for provenance).**

## Master bank state after wave 2

`bank.json`: **394 items, all `reviewed`.** Per element: E1:55 E2:55 **E3:54** E4:60 E5:58 **E6:53** E7:3 **E8:54** E9:2. Keys A98/B113/C99/D84. 343 standard + 51 item-set.
Remaining: **E7 (+~95) and E9 (+~80) have no batches yet — wave 3.** Then second batches (E4-002, E5-002 incl. item-set top-up, E1/E2-002, E6-002 incl. 0043 redraft) toward ~1,500.

## 2026-06-04 — Wave 3 (parallel): batches E7-001, E9-001 (100 items)

- Two parallel drafters under spec v1.2 (straight-quote source_quotes). E7: 50 items from the annotated UMIR (Rules/Policies 1.1, 2.2, 4.1, 5.3, 7.1 + Policy 7.1 Parts 1–13, 8.1, 10.16) + IDPC trading provisions. E9: 50 items, primarily verbatim syllabus 9.1–9.3 parameter lists + IDPC structural anchors.
- **Drafter-discovered content corrections (French-reconstruction artifacts, second catch of this class):** syllabus.json 7.1 order-type list corrected against the official English PDF — "basis" (not "basic"), "dark" (not "hidden/iceberg"), "closing price" (not "last-sale-price"), "call market" (not "best-efforts"), "opening" (not "opening-price"), "program trade". research/02 annotated. E7 drafter correctly declined to draft on unsourceable syllabus mentions ("overdue cash account restrictions" — no provision in local corpus; "whistleblower frameworks" under 7.6 — none in UMIR/IDPC).
- **Gate 1 (2 parallel fresh solvers): 100/100 solver-key agreement. 0 wrong.** E7: 4 medium + 1 ambiguity flag; E9: 1 medium + 1 ambiguity flag.
- Adjudications (all settled by dispositive verbatim source): E7-0015 margin good-standing (5113 verbatim); E7-0025 five-year review retention (Policy 7.1 Part 2 verbatim); E7-0030 daily grey/restricted review (Policy 7.1 Part 12 verbatim); E7-0037 DEA non-institutional preclusion (Policy 7.1 Part 9 verbatim); E9-0012 seven-year retention (verbatim). **E7-0006 (ambiguous):** MOC vs Closing Price Order — UMIR 1.1 definitions are dispositive (MOC = "entered on a trading day for the purpose of calculating and executing at the closing price"; Closing Price Order = "executed subsequent to the establishment of the closing price"); stem facts uniquely MOC → PASS. **E9-0022 (ambiguous):** syllabus size-risk list contains exactly "Risk-weighting" and "Risk assessment and control practices" — keyed pair verbatim; distractors drawn from other 9.2 categories → PASS (item source_quote strengthened to include the list bullets).
- **Gate 2: 100/100 quotes verified, 0 fabrications.**
- **Gate 3: one cross-element near-duplicate found and killed — SUP-E7-0014** (same IDPC 3247 margin-agreement fact and keyed answer as SUP-E4-0025; first parallel-drafting collision in 494 items; E4 version retained). Otherwise clean.
- **99 promoted to `reviewed` and merged; 1 killed.**

## 2026-06-04 — FLASHCARD DECK (study notes layer): 9 decks, 446 cards

- Format: atomic crash-course cards (front = retrieval prompt, back ≤30 words; types definition/threshold/list/distinction/process/trap), JSON per `study-material/flashcards/schema.json`. Pilot (E9) user-approved, then 3 parallel waves (E4/E5/E1 → E2/E3/E6 → E7/E8 + E9 quote backfill).
- **Gate N3 (citation audit):** every card carries a contiguous verbatim source_quote; all 446 independently re-verified against the corpus. Three verifier-tooling edge cases fixed along the way (unwrapped E7 quotes; one two-segment quote on FC-E1-0043 replaced with a contiguous span); 0 fabrications.
- **Gate N2 (open-cards solve — the sufficiency gate):** fresh agents answered the bank's batch questions using ONLY the decks. **417 questions answered, 0 incorrect.** 23 initial gaps → 19 patch cards drafted from source (FC-E5-0066–0070, FC-E1-0056–0058, FC-E4-0081, FC-E3-0041, FC-E6-0036–0039, FC-E7-0031–0037, FC-E8-0036–0040, FC-E9-0025–0031) + 4 resolved cross-deck (fact lives in another element's deck) or moot (killed bank item).
- **Strict kills/rewrites:** FC-E9-0021 killed (bare term, no definitional source); FC-E9-0014/0019 rewritten to verbatim-sourced backs; FC-E4-0068 reworked from near-duplicate into a managed-vs-discretionary distinction trap. 5 cross-element near-duplicate pairs retained deliberately (decks are studied standalone; listed in cards.json meta).
- Honest sourcing notes: ETF daily-reset mechanic not in any local source → carded as classification distinction instead; third-party research governed by IDPC 3611 (not 3616); 2202 location-notification has no day-count in rule text.
- **Master deck: `study-material/flashcards/cards.json` — 446 reviewed cards, 15.4k words (~34/card avg), per element E1:58 E2:50 E3:41 E4:81 E5:70 E6:39 E7:37 E8:40 E9:30.**

## 2026-06-04 — Bank wave 4 (parallel): batches E4-002, E5-002, E6-002 (150 items)

- Three parallel drafters, spec v1.2, with an explicit NOVELTY GATE: each drafter inventoried all existing stems/rule_refs for its element and ran automated collision scans; **12 near-miss duplicates self-caught and rewritten at drafting time** (7 in E4, 3 in E5, 2 in E6 — details in batch metas/reports). E5-002 includes 3 item-sets (top-up for E5-001's shortfall); UMIR formally in E5 scope this batch (5.10/5.11 now properly sourced). E6-002 includes the mandated clean redraft of killed SUP-E6-0043 → **SUP-E6-0067, passed Gate 1**.
- **Gate 1 (3 parallel solvers): 150/150 solver-key agreement, 0 wrong.** 10 medium-confidence hesitations settled verbatim by their corpus-verified quotes. 3 ambiguity flags adjudicated dispositively: SUP-E4-0108 (3280(2) chapeau "without the prior written consent of the client" verbatim → consent-cure key unique); SUP-E5-0071 (GN 2.1.2 first-tier $1,500 vs GN 2.2.2 second-tier $3,000 — tier mapping verbatim; distractor is a cross-tier trap by design); SUP-E6-0099 (3280(3)(ii) quote dispositive; stem tightened to make the from/to-counterparty element explicit — solver had answered correctly; key unchanged).
- **Gate 2: 150/150 independent quote re-verification, 0 fabrications.** Honest sourcing notes from drafters logged (e.g., no quotable text for 5.9 "margin-threshold activity" beyond items already covered; 5.11 CFD undertakings sourced via 3241/3955 prohibitions).
- Gate 3: full-bank lint + near-duplicate scan across all 643 items — clean.
- **All 150 promoted to `reviewed` and merged.**

## Master bank state after wave 4

`bank.json`: **643 items, all `reviewed`.** Per element: E1:55 E2:55 E3:54 **E4:110 E5:108 E6:103** E7:52 E8:54 E9:52. Keys A161/B177/C163/D142. 548 standard + 95 item-set (15%). **Mock capacity: 5 distinct full forms** (binding: E4 110/20). Cumulative Gate-1 record: 645 items solver-checked, 1 mismatch ever (killed). Kill rate 2/695 drafted ≈ 0.3%.
Next wave by gap: E1-002/E2-002 (+50 each), then E3/E8-002, then E7/E9-002; item-set share still below the real form's 33% — bias future batches toward 3 sets each.

## Master bank state after wave 3 — FULL ELEMENT COVERAGE

`bank.json`: **493 items, all `reviewed`.** Per element: E1:55 E2:55 E3:54 E4:60 E5:58 E6:53 **E7:52 E9:52** E8:54. Keys A123/B139/C123/D108 (post-kill). 426 standard + 67 item-set.
**Milestone: every element now stocked ≥52 items → the bank supports 3 fully distinct 90-question mock forms** (binding constraint: E4 at 60/20-per-form). Pipeline totals to date: 545 drafted → 493 reviewed, 2 killed (1 solver-wrong, 1 duplicate), 50 absorbed as seeds → kill rate 0.4%.
Next phase: second batches toward full-scale targets (E4-002 +~270 is the long pole; E5-002 +~190 incl. item-set top-up; E6-002 incl. 0043-angle redraft; then E1/E2/E3/E8-002; E7/E9-002 last).
