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

## 2026-06-05 — Bank wave 5 (parallel): batches E1-002, E2-002, E3-002 (150 items)

- Three parallel drafters under DRAFTING-SPEC.md (now the canonical wave-runner reference) with the novelty gate; 9 near-misses self-caught and rewritten at drafting time (2 E1, 4+1 proactive E2, 3 E3 — incl. two item-set scenarios amended). Each batch carries 3 item-sets (new composition standard), pushing bank item-set share to 17%.
- **Gate 1 (3 parallel solvers): 150/150 agreement, 0 wrong.** 11 medium-confidence hesitations settled by verified quotes. 2 ambiguity flags adjudicated dispositively: SUP-E1-0075 (3726(3)(iv)(e) verbatim — the voluntary-use + historical-timeline explanation attaches ONLY to the internal affiliate ombudsman, not OBSI; trap works as the rule is written); SUP-E2-0093 (3907(2) verbatim key; all distractors false per rule text).
- **Gate 2: 150/150 after one fix** — SUP-E1-0061's quote was a 20-character span that tripped the verifier's length filter; lengthened to a contiguous multi-bullet span (key fact verbatim). 0 fabrications.
- Gate 3: full-bank lint + near-dup scan across 793 items — clean.
- Honest exclusions by drafters (logged in their metas): ComSet filing deadlines (prescribed outside the corpus), GN-2600-25-00x numbering (officially unconfirmed), grey/restricted-list operating mechanics beyond syllabus bullets, "tasks that cannot be automated" (no contiguous quotable statement), referral-fee mechanics beyond the 3.10 parameter.
- **All 150 promoted to `reviewed` and merged.**

## Master bank state after wave 5

`bank.json`: **793 items, all `reviewed`.** Per element: **E1:105 E2:105 E3:104** E4:110 E5:108 E6:103 E7:52 E8:54 E9:52. Keys A198/B214/C203/D178. Item-set share 17%. **Mock capacity: 5 distinct forms** (next bump needs E7/E8/E9-002 — wave 6, scheduled 1:05am).
Overnight schedule: wave 6 (E7/E8/E9-002) 1:05am; wave 7 (E4/E5/E6-003) 2:05am; wave 8 (E4/E5-004 + E1-003) 6:20am. Projected bank after wave 8: ~1,243.

## 2026-06-05 — Bank wave 6 (scheduled, parallel): batches E7-002, E8-002, E9-002 (150 items)

- First fully autonomous scheduled wave per DRAFTING-SPEC.md. Three parallel drafters with the per-element novelty gate; composition 38+3×4 each; drafter self-caught near-misses: 5 (E7), 4 (E8), 4 (E9). Pre-solve hygiene fix by orchestrator: 17 invented firm names renamed mechanically (8 E7, 9 E9) because they collided with names already used in other elements' batches — names-only transform, no content change; drafter prompts for future waves should ban name reuse **bank-wide**, not just per element.
- **Gate 1 (3 parallel fresh solvers): 148/150 agreement, 2 killed (strict rule, no exceptions): SUP-E7-0078** (key C quarterly, solver B monthly, medium confidence) and **SUP-E7-0079** (key A monthly, solver B quarterly, LOW confidence + ambiguity flag) — the solver swapped the Policy 7.1 Part 5 (quarterly manipulative-trading sample) and Part 6 (monthly trade-through test) frequencies; both keys are verbatim-supported, but the items are a mutual closest-distractor pair drafted together and proved confusable. Angles queued for E7-003 with structurally different framing. 19 medium-confidence hesitations (6 E7, 8 E8, 5 E9) all adjudicated PASS — each doubted fact is character-exact in the item's corpus-verified quote. E7-0079's ambiguity flag mooted by its kill.
- **Gate 2 (independent contiguous-quote re-verification, NFKD + smart-punct + ligature normalization): 148/148 verified, 0 fabrications.**
- **Gate 3:** full-bank lint clean; stem-Jaccard (>0.6) scan vs all 941 candidates: zero pairs. **Added this wave: keyed-option near-identity sweep (key-text Jaccard ≥0.65 + shared rule-family, then manual same-fact adjudication) — found 17 same-fact duplicates the stem scan misses** (stems differ lexically; keyed proposition identical): 2 in E7 (0100 ≡ E5-0079 UMIR 7.13(1)(b); 0101 ≡ E5-0037 Policy 7.1 Part 8) and 15 in E9 (0056/0057/0058/0061/0063/0064/0083/0085/0086/0087/0091/0100/0101 ≡ reviewed E2/E3/E5/E6 items on shared anchors GN-3900, 3219(2), 3925(4), 3926(4)/(6), 3945(3)/(4), 3970(3), 3972; 0070 ≡ reviewed E9-0018; 0068 ≡ batch-mate 0095). All killed per the keep-better-anchored rule (reviewed bank items retained in every cross-element pair). One adjudicated KEEP: E7-0090 vs E7-0040 — 10.16(2) Access-Person vs 10.16(1) Participant reporting is a designed subsection distinction (cross-tier-trap precedent).
- **Set integrity:** E9-SET-03 ships at 3 items (E5-001 precedent). Both E7-SET-05 kills (0100, 0101) and both E9-SET-05 kills (0100, 0101) were set members, dropping each set to 2 → the four gate-passing survivors **SUP-E7-0102/0103 and SUP-E9-0099/0102 are HELD un-merged** (qa_note in batch) for E7-003/E9-003 to top the sets back to ≥3.
- **127 promoted to `reviewed` and merged (E7 44, E8 50, E9 33); 19 killed; 4 held.** app validator (Gate-3 CI check): pass, incl. all item-sets within 3–6.
- **Root cause + process amendment:** E9's 30% kill rate is cross-element anchor exhaustion — E9's 3 outcomes share GN-3900/3900-series anchors already mined by E2/E3/E5/E6, and the per-element novelty gate cannot see that. DRAFTING-SPEC novelty gate amended: collision scans now run **against the full bank (all elements)**, including a keyed-option near-identity check; orchestrator Gate 3 keeps the keyed-option sweep permanently.
- **Found during lint, needs human review (pre-existing, wave 4): E6-SET-04 scenario mismatch** — SUP-E6-0099's scenario was tightened during wave-4 adjudication ("subscribe for newly issued units directly…") but the fix was never propagated to set-mates 0070/0098/0100 ("buy units of an investment fund…"). The app renders one scenario per set, so the variants must be reconciled; not auto-fixed because all four items are `reviewed` (autonomy rules forbid modifying reviewed items).

## Master bank state after wave 6

`bank.json`: **920 items, all `reviewed`.** Per element: E1:105 E2:105 E3:104 E4:110 E5:108 E6:103 **E7:96 E8:104 E9:85**. Keys A227/B248/C236/D209. Item-set share 17% (158). **Mock capacity: 5 distinct forms** (E4 110/20 still binding; waves 7–8 raise it). Cumulative: 995 drafted → 920 reviewed, 21 killed (1 solver-wrong '43, 1 dup '14, 2 solver-wrong + 17 same-fact dup wave 6) ≈ 2.1%, 4 held in-flight — kill concentration entirely in small-element second batches; expect lower rates for E4/E5/E6-003 (richer corpora) with the bank-wide novelty gate now mandatory.

## 2026-06-05 — Bank wave 7 (scheduled, parallel): batches E4-003, E5-003, E6-003 (150 items)

- Second autonomous scheduled wave per DRAFTING-SPEC.md (wave-6 guard checked first: all wave-6 items confirmed merged, bank at 920 before start; ID start points re-verified against bank max-IDs — all three matched the schedule). Three parallel drafters under the now-mandatory **bank-wide** novelty gate; composition 38+3×4 each; drafter self-caught near-misses: **38 total (5 E4, 13 E5, 20 E6)** — the dominant source was *same-wave cross-batch collisions* (the three drafters landed concurrently and mined overlapping 3200/3900-series anchors; E6's drafter rescanned against E4-003/E5-003 mid-run and replaced 18 anchors). Orchestrator post-landing intra-wave sweep: 0 residual collisions. Firm-name hygiene held this wave: drafters grep-verified names bank-wide at draft time (12 collisions self-mutated); final orchestrator sweep zero.
- **Gate 1 (3 parallel fresh solvers): 147/150 agreement, 3 killed (strict rule, no exceptions): SUP-E4-0115** (key D, solver C at HIGH confidence — solver's recall of the Rule 1201 institutional-client definition omitted the individual request-and-consent limb; key is verbatim-supported but no-exceptions rule honored; angle queued for E4-004 with structurally different framing), **SUP-E4-0133** (key B, solver A at LOW confidence — 3252(2)(iii) "notwithstanding" connective is verbatim-recall trivia an expert cannot reason to; angle retired, operative lifetime/annual mechanics already tested by SUP-E5-0155), **SUP-E5-0121** (key B, solver C at LOW confidence — GN s.2.2.1 $100,000/trade bond threshold vs $1,000,000 cross-threshold distractor proved confusable; same failure mode as wave-6 E7-0078/0079; angle queued for E5-004). **0 ambiguity flags — first wave with none.** 11 medium-confidence hesitations (2 E4, 3 E5, 6 E6) adjudicated PASS — 10 settled character-exact in-quote; SUP-E6-0111's quote re-anchored from 2552(5) to the contiguous 2552(4) span so the solver-doubted monthly cadence is in-quote (late-fee half still cited via IDPC 2552(5)).
- **Gate 2 (independent contiguous-quote re-verification): 147/147, 0 fabrications** — after a verifier normalization upgrade: corpus uses U+2010 unicode hyphens ("cash‐only", "highly‐leveraged", "31‐103") where drafters transcribed ASCII; normalizer now maps U+2010–U+2012 → "-" (tooling fix, wave-2 ligature precedent; 3 false positives cleared, no quote text changed).
- **Gate 3:** full-bank lint clean (1,067-item merged view); stem-Jaccard (>0.6): zero pairs; keyed-option near-identity sweep: **1 same-fact duplicate killed — SUP-E5-0157 ≡ reviewed SUP-E5-0092** (key Jaccard 0.67, both key the 3808(1) daily-account-information obligation for open CFD positions; keep-better-anchored rule). Candidates also swept clean against the 4 HELD wave-6 items (E7-0102/0103, E9-0099/0102). Two drafter-flagged advisory pairs adjudicated KEEP as designed subsection distinctions (different rule families, sub-threshold): E6-0114 (3206(4)) vs E7-0019 (3214(5)); E6-0127 (3951(1) institutional) vs E6-0066 (3948(1) retail).
- **Set integrity:** E5-0157 was an E5-SET-08 member → set ships at 3 (E5-SET-01/E9-SET-03 precedent). No other set affected; E4/E6 sets all at 4.
- **146 promoted to `reviewed` and merged (E4 48, E5 48, E6 50); 4 killed; 0 held.** app validator (Gate-3 CI check): pass.
- Process note for wave 8 (E4-004/E5-004/E1-003, 6:20am): same-wave cross-batch collisions are now the dominant near-miss source — consider pre-partitioning anchor families across the three drafters in the prompts, and instruct drafters to rescan against sibling wave files immediately before writing output (E6's drafter did this voluntarily and it worked).

## Master bank state after wave 7

`bank.json`: **1,066 items, all `reviewed`.** Per element: E1:105 E2:105 E3:104 **E4:158 E5:156 E6:153** E7:96 E8:104 E9:85. Keys A264/B284/C273/D245. Item-set share 18% (193). **Mock capacity: 7 distinct forms** (E4 158/20 still binding; wave 8's E4-004 raises it to 10). Cumulative: 1,095 drafted → 1,066 reviewed, 25 killed ≈ 2.3%, 4 held in-flight. Wave-6 prediction confirmed: richer-corpus third batches killed at 2.7% (4/150) vs wave 6's 12.7%, and the bank-wide novelty gate moved collision-catching from post-hoc Gate-3 kills (17 in wave 6) to drafting-time rewrites (38 self-caught, only 1 Gate-3 kill).

## 2026-06-05 — Bank wave 8 (scheduled, parallel): batches E4-004, E5-004, E1-003 (116 items)

- Third autonomous scheduled wave per DRAFTING-SPEC.md. Guard check first: waves 6/7 confirmed fully merged (bank at 1,066 before start; every unmerged batch item accounted for as killed-with-qa_note or intentionally HELD for E7-003/E9-003); ID start points re-verified against bank max-IDs — all three matched the schedule. Wave-7 process note implemented: **anchor families pre-partitioned across the three drafters** (E4 = 32xx/34xx/1201 agreement-content lanes; E5 = GN-3900 + 394x–397x + UMIR DEA slice; E1 = syllabus parameters + 37xx/31xx) **+ mandatory sibling rescan before output → 0 same-wave cross-batch collisions** (vs 38 near-misses in wave 7). Drafter self-caught near-misses vs bank: 4 (E4), 11 (E5), 9 (E1).
- **Honest 4th-batch novelty exhaustion (by design, not failure): 116 drafted, not 150.** E4-004 = 41/50 (`novelty_exhausted`: 3252/3253/3277/3278/3281 families fully mined; remaining items use only untested subsections). E5-004 = 25/50 (`novelty_exhausted`: ~6 unkeyed 3945(2) clauses blocked by the 5.6 cap; 7 first-pass GN-3900 drafts killed at draft time as already keyed by E2/E3/E6/E9 — **E5-SET-11 killed whole**, ID left unused). E1-003 = 50/50. Composition: E4 29+3×4 (SET-08/09/10), E5 17+2×4 (SET-09/10), E1 38+3×4 (SET-06/07/08).
- **Gate 1 (3 parallel fresh solvers): 115/116 agreement, 1 killed (strict rule, no exceptions): SUP-E1-0141** (key A, solver B at medium confidence + the wave's only ambiguity flag, mooted by the kill) — asking which two outcome-1.21 bullets carry the "where applicable" qualifier is verbatim-recall meta-trivia an expert cannot reason to (same class as wave-7 E4-0133); angle RETIRED; batch ships 1.21 at 0 (bank-level 1.21 coverage unaffected: 6 reviewed items). 8 medium-confidence-correct hesitations adjudicated PASS — 4 settled character-exact in-quote (E4-0164/0172/0179/0182); **4 passed after quote re-anchoring so the doubted fact is in-quote** (E6-0111 precedent): E4-0189 (4.21 CFD bullet — chapeau and bullets split by a two-column extraction artifact), E4-0191 (re-anchored 3253(2)(ii)→(2)(i) so the keyed always-required undertaking is quoted), E4-0195 (re-anchored to 3279(2)(ii) contractual-compliance route), E5-0170 (3960(4) quote extended to include both trigger limbs).
- **Queued-angle outcomes from wave 7:** GN s.2.2.1 $100,000 bond threshold redraft **succeeded** — SUP-E5-0164 (structural distractors, no neighboring dollar magnitudes) passed all gates and merged. Rule 1201 individual-limb redraft (SUP-E4-0162) passed Gates 1–2 but was **killed at Gate 3**: reviewed SUP-E3-0067 already keys the same limb (the wave-7 queue note predated this discovery); angle permanently retired as already-covered.
- **Gate 2 (independent contiguous-quote re-verification, NFKD + smart-punct + ligature + U+2010–U+2012 normalization): 115/115 verified, 0 fabrications** — after 13 quote-FORM corrections, all E1, none touching stems/options/answers: 7 multi-segment quotes consolidated to single contiguous spans, 5 short bullet spans (<20 chars) lengthened or re-anchored to header spans with the keyed bullet documented in qa_note, 1 missing citation filename added. Root cause: syllabus-raw.txt's two-column extraction interleaves bullet lists (1.6/1.12/1.15/1.18/1.19/1.22 regions). **Process note: future syllabus-quoting drafters (E1/E9) must emit ONE contiguous span per item and anchor scattered list bullets via header spans + qa_note.**
- **Gate 3:** full-bank lint clean (1,181-item merged view); stem-Jaccard (>0.6) vs bank + 4 held wave-6 items: zero pairs; keyed-option near-identity sweep: **4 same-fact kills** — SUP-E4-0162 (1201 ≡ reviewed E3-0067, above), SUP-E4-0185 (J=0.70, 3274(1)(iii) 12-month non-renewable ≡ reviewed E6-0102 AND seed E4-0005), SUP-E1-0117 (J=0.68, intra-batch same-fact inversion of E1-0150's CIPF four-aspect list — standard item killed in preference to the SET-07 member), SUP-E1-0154 (J=0.67, keyed option is a subset mapping of reviewed E1-0035's Syllabus 1.19 consequences list; killed per the waves-6/7 precedent line that only different-subsection designs survive above-threshold same-family flags).
- **Set integrity:** E1-SET-08 ships at 3 (E5-SET-01/E5-SET-08/E9-SET-03 precedent); all other sets at 4. 0 held.
- **111 promoted to `reviewed` and merged (E4 39, E5 25, E1 47); 5 killed; 0 held.** app validator (Gate-3 CI check): pass.
- **Strategic note:** E4 and E5 anchor pools are effectively exhausted at four batches (further -005 batches would force near-duplicates). Remaining growth toward ~1,500 must come from E7/E8/E9-003 (incl. the held E7-SET-05/E9-SET-05 top-ups), E2/E3-003, E6-004, and/or Tier-2 corpus expansion (additional GNs per DOWNLOAD-MANIFEST).

## Master bank state after wave 8

`bank.json`: **1,177 items, all `reviewed`.** Per element: **E1:152** E2:105 E3:104 **E4:197 E5:181** E6:153 E7:96 E8:104 E9:85. Keys A293/B310/C299/D275. Item-set share 19% (224). **Mock capacity: 9 distinct forms** (E4 197/20 still binding — wave-7's "10 forms" projection assumed E4 +50; honest shortfall delivered +39). Cumulative: 1,211 drafted → 1,177 reviewed, 30 killed ≈ 2.5%, 4 held in-flight. Remaining gap to the ~1,500 target: **~323 items**.

## Scheduled run log

(Scheduled waves append 5-line run summaries here.)

### Wave 9 — 2026-06-05 (interactive)

1. Wave 9 (E7-003/E8-003/E9-003 + held-set resolution): **71 drafted** (E7 50; E8 13 and E9 8 with honest corpus-exhaustion shortfalls — both elements now declared feature-complete by their drafters, exhausted-anchor inventories logged in batch metas) → **73 merged** (71 new + 2 released holds); bank **1,177 → 1,250**; mock capacity 9 forms; item-set share 20%.
2. Kills 2 (both pre-flagged held items, confirmed same-fact at Gate 3): SUP-E7-0102 (keyed compound = union of reviewed E5-0098 + E5-0152 keys) and SUP-E9-0099 (3970(1) at-least-monthly ≡ reviewed E6-0042). E7-SET-05 restored to 3 via wave-9 top-ups (0104/0105 — UMIR 10.9 cancellation/records angles); **E9-SET-05 ships as a 2-member set** (0102 + 0103) — logged decision: E9 corpus exhausted, no honest third set-mate exists; preferable to killing clean items or padding.
3. Gate 1: 71/71 agreement, 0 wrong, 0 ambiguous; 2 recall-hesitations settled by verified quotes (UMIR 3.4(2) pre-borrow; 2267 Regional Council voting). Gate 2: 71/71 quotes verified, 0 fabrications. Gate 3: full-bank scan clean (same-set sibling pairs now excluded from the stem-similarity sweep — shared scenarios inflate similarity by design).
4. Status: E8 and E9 feature-complete; E7 near-complete (drafter logged remaining unmined angles as trivially non-examinable). Remaining gap-closing wave: **wave 10 = E2-003 + E3-003** (E2 105, E3 104 vs ~165/150 soft targets) — after that the bank is feature-complete at its honest count (projected ~1,330–1,350).

### Wave 10 (FINAL) — 2026-06-05 (interactive)

1. Wave 10 (E2-003/E3-003): **89 drafted** (E2 50 — pool exceeded cap, 4 lowest-discrimination candidates cut; E3 39 — honest exhaustion) → **89 merged**; bank **1,250 → 1,339**. Both drafters declared their elements feature-complete with exhaustion inventories; E2-2.8 honestly shipped 0 new items (16 reviewed items leave no novel angle); E3-3.10 likewise (parameter + 3281 family fully keyed).
2. Gate 1: 89/89 agreement, 0 wrong, 0 ambiguous; 14 recall-class hesitations settled by verified quotes. Gate 2: 89/89, 0 fabrications. Gate 3: full-bank scan clean.
3. Drafter self-caught issues: 2 pre-draft kills (3926(2)(iii) AML triad; acting-CCO mirror), 1 retired confusable-threshold pair (GN $20,000 tier — the exact failure mode that killed E7-0078/0079), multiple key rewrites and 7 name collisions fixed pre-output.
4. **BANK DECLARED FEATURE-COMPLETE: 1,339 reviewed items.** All 9 elements mined to honest exhaustion of the local corpus. Per element: E1:152 E2:155 E3:143 E4:197 E5:181 E6:153 E7:147 E8:117 E9:94. 9 distinct mock forms; 20% item-set; difficulty 409/667/263 (31/50/20); keys A333/B350/C342/D314; 1,294 of 1,339 carry source_quote (the 45 seeds predate the quote requirement but passed the corpus-era citation audit).
5. Pipeline lifetime stats: ~1,475 drafted → 1,339 reviewed → kill/cut rate ~9% (near-duplicates and surplus trims dominate; only 4 items ever failed a blind solve). Gate-1 lifetime: ~1,100 solver-checked items, 4 wrong ever. Further growth requires corpus expansion (Tier 2 GNs per research/sources/DOWNLOAD-MANIFEST.md), not re-mining.

### Post-overnight review — 2026-06-05 (interactive)

- E6-SET-04 scenario variant mismatch (the one open human-review item from the overnight runs) RESOLVED: the wave-4 clarifying edit to SUP-E6-0099's scenario had not been propagated to set-siblings 0070/0098/0100 (denormalization hazard). All four scenario copies now carry the clarified matter-(c) wording (verified by hash); matter (c) is tested only by 0099, so sibling keys unaffected. Fixed in bank.json + batch provenance. Process note: any future edit to an item_set member's scenario must be applied to ALL members of the set (added to DRAFTING-SPEC awareness).

### Wave 8 — 2026-06-05 (scheduled 6:20am run)

1. Wave 8 (E4-004/E5-004/E1-003): **116 drafted** (honest 4th-batch novelty shortfalls: E4 41/50, E5 25/50 incl. E5-SET-11 killed whole at draft time) → **111 merged** (E4 39, E5 25, E1 47); bank **1,066 → 1,177**, validator green; mock capacity 7 → **9 forms** (E4 197/20 binding).
2. Kills 5: 1 Gate-1 (E1-0141 "where applicable" qualifier meta-trivia, solver-wrong + ambiguity flag; angle retired) + 4 Gate-3 same-fact (E4-0162 queued-1201-redraft retired — limb already keyed by reviewed E3-0067; E4-0185 ≡ E6-0102/seed E4-0005 on 3274(1)(iii); E1-0117 intra-batch CIPF-list inversion of 0150; E1-0154 subset of reviewed E1-0035 on Syllabus 1.19); E1-SET-08 ships at 3; 0 held.
3. Adjudications: 8 medium-confidence passes (4 quote re-anchors so the doubted fact is in-quote: E4-0189/0191/0195, E5-0170); wave-7-queued GN $100k bond-threshold redraft merged as SUP-E5-0164 (structural distractors); E1-003 ships 1.21 at 0 (bank coverage unaffected).
4. Process: anchor pre-partition + sibling rescan → 0 same-wave cross-batch collisions (vs 38 in wave 7); Gate 2 corrected 13 E1 quote-form artifacts (syllabus-raw.txt two-column interleave; future syllabus-quoting drafters must emit single contiguous spans); E4/E5 anchor pools exhausted — no -005 batches.
5. Human review: none new this wave; E6-SET-04 scenario variant mismatch (wave-4 artifact) still open.

**Gap to target: ~323 items to ~1,500. Suggested wave 9: E7-003 + E8-003 + E9-003** (smallest elements; tops up the 4 held E7-SET-05/E9-SET-05 survivors; expect honest shortfalls, especially E9 whose 9.x anchors were heavily pre-mined — instruct drafters to draft fewer rather than pad).

### Wave 7 — 2026-06-05 (scheduled 2:05am run)

1. Wave 7 (E4-003/E5-003/E6-003): 150 drafted → **146 merged** (E4 48, E5 48, E6 50); bank **920 → 1,066**, validator green; mock capacity 5 → **7 forms**.
2. Kills 4: 3 Gate-1 solver-wrong (E4-0115 Rule 1201 individual limb, high-conf; E4-0133 3252(2)(iii) connective trivia, low-conf; E5-0121 GN bond-threshold trap, low-conf) + 1 Gate-3 same-fact dup (E5-0157 ≡ reviewed E5-0092, 3808(1)); E5-SET-08 ships at 3; 0 held.
3. Adjudications: 11 medium-confidence passes settled in-quote (E6-0111 quote re-anchored to 2552(4)); 0 ambiguity flags; 2 advisory pairs kept as designed subsection distinctions (E6-0114/E7-0019, E6-0127/E6-0066); angles queued — 1201 individual limb → E4-004, GN $100k bond threshold → E5-004.
4. Process: Gate-2 verifier normalization extended to U+2010–U+2012 hyphens (3 artifacts cleared, 0 fabrications); 38 drafter near-misses self-caught bank-wide — same-wave cross-batch collisions dominate; wave 8 should pre-partition anchor families across drafters + rescan siblings pre-output.
5. Human review: none new this wave; E6-SET-04 scenario variant mismatch (wave-4 artifact) still open.

### Wave 6 — 2026-06-05 (scheduled 1:05am run)

1. Wave 6 (E7-002/E8-002/E9-002): 150 drafted → **127 merged** (E7 44, E8 50, E9 33); bank **793 → 920**, validator green.
2. Kills 19: 2 Gate-1 (E7-0078/0079, Policy 7.1 Part 5/6 frequency confusion) + 17 Gate-3 same-fact dups (15 E9, 2 E7) caught by a new keyed-option sweep; 4 items held (E7-0102/0103, E9-0099/0102 — their sets fell below 3) for E7-003/E9-003 set top-ups.
3. Adjudications: 19 medium-confidence passes settled by verified quotes; 1 ambiguity flag mooted by kill; E7-0090/0040 kept as designed 10.16(2)-vs-(1) distinction.
4. Process: DRAFTING-SPEC novelty gate amended to bank-wide scans + keyed-option check; 17 firm names renamed pre-solve (cross-batch reuse); E9-003 should target genuinely untested 9.x parameter angles only.
5. **Human review needed:** pre-existing E6-SET-04 scenario variant mismatch (0099 vs 0070/0098/0100, wave-4 artifact) — reviewed items, not auto-fixed.

## Master bank state after wave 4

`bank.json`: **643 items, all `reviewed`.** Per element: E1:55 E2:55 E3:54 **E4:110 E5:108 E6:103** E7:52 E8:54 E9:52. Keys A161/B177/C163/D142. 548 standard + 95 item-set (15%). **Mock capacity: 5 distinct full forms** (binding: E4 110/20). Cumulative Gate-1 record: 645 items solver-checked, 1 mismatch ever (killed). Kill rate 2/695 drafted ≈ 0.3%.
Next wave by gap: E1-002/E2-002 (+50 each), then E3/E8-002, then E7/E9-002; item-set share still below the real form's 33% — bias future batches toward 3 sets each.

## Master bank state after wave 3 — FULL ELEMENT COVERAGE

`bank.json`: **493 items, all `reviewed`.** Per element: E1:55 E2:55 E3:54 E4:60 E5:58 E6:53 **E7:52 E9:52** E8:54. Keys A123/B139/C123/D108 (post-kill). 426 standard + 67 item-set.
**Milestone: every element now stocked ≥52 items → the bank supports 3 fully distinct 90-question mock forms** (binding constraint: E4 at 60/20-per-form). Pipeline totals to date: 545 drafted → 493 reviewed, 2 killed (1 solver-wrong, 1 duplicate), 50 absorbed as seeds → kill rate 0.4%.
Next phase: second batches toward full-scale targets (E4-002 +~270 is the long pole; E5-002 +~190 incl. item-set top-up; E6-002 incl. 0043-angle redraft; then E1/E2/E3/E8-002; E7/E9-002 last).
