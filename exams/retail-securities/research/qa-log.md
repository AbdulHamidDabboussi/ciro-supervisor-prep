# QA log: Retail Securities Exam

## 2026-10-22: Phase A (research, corpus, content model)

- **Workflow:** 8 agents (logistics, 3 corpus lanes for CIRO, CSA and CRA/Government of Canada, syllabus build, an independent syllabus verifier, exam-meta, the outcome-to-source map). No errors.
- **`syllabus.json`:** 9 elements and 109 outcomes, with weights 27/10/12/14/16/13/14/7/7 = 120. The PDF was re-extracted column by column and checked word for word both ways. The independent verifier made 1 scoping correction (1.1, an inserted comma) and 2 documentation notes.
- **`exam-meta.json`:** 120 standalone 4-option MCQs, 180 min, no item sets. "No item sets" is inferred from the syllabus and practice-exam format; CIRO does not state it explicitly. No pass mark. The calculator policy is CONFIRMED (Fitch Learning, updated 2026-10-17).
- **Corpus:** current IDPC Rules and UMIR (Aug 11, 2026 consolidations), 30+ CIRO guidance notes and notices, CSA instruments, CRA guides and pages. The source map classifies the outcomes as 33 R, 44 C and 32 R+C, with 3 GAP and 22 PARTIAL in the gap register.

## 2026-10-22: Phase B (study guide) under spec v1.0 + grounding amendment

**Process:** corpus gap fill (2 lanes) → one drafter per element → two independent adversarial auditors per element (numbers and concepts; rules, sources and coverage) → fixer → fresh re-verifier, up to 2 rounds → cross-element consistency audit and fix. 63 agents in total, 0 errors.

**Gap fill:** 16 of 19 assigned gaps closed. 22 new corpus files were added, including the Ontario Securities Act (ss. 1, 52–53, 73.3, 76, 121.5–121.6, 127), NI 45-102, NI 62-104, NP 11-207, NI 24-101 + CP (T+1), NI 21-101, PCMLTFA/FINTRAC STR guidance, PIPEDA principles, the PPN Regulations, NI 31-103 Parts 7/8/11, NI 81-102 Part 6, NI 81-106, the GN-5300 margin series and QPP.
- Still PARTIAL: G5 (provincial privacy statutes), G7 (commingling; only MFDA-era text), G22 (order-error and FX handling), G24 (special margin situations; mapped across IDPC 5000-series rules).
- The source map also flagged two errors in the gap register: anti-reprisal is OSA **s.121.6**, not 121.5, and NI 81-106 requires NAV **at least weekly**, not daily.

| Element | Draft words | Final words | R claims | C claims | Audit findings (errors) | Fix rounds | Disputes | Open after loop |
|---|---:|---:|---:|---:|---:|---:|---:|---:|
| E1 | 7,198 | 7,772 | 486 | 29 | 30 (3) | 1 | 0 | 0 |
| E2 | 2,546 | 2,625 | 64 | 29 | 24 (2) | 2 | 1 | 2 |
| E3 | 3,120 | 3,298 | 88 | 21 | 26 (4) | 2 | 0 | 0 |
| E4 | 3,585 | 4,418 | 41 | 30 | 39 (7) | 2 | 0 | 0 |
| E5 | 4,022 | 4,829 | 182 | 28 | 30 (5) | 2 | 0 | 0 |
| E6 | 3,449 | 3,555 | 47 | 29 | 30 (6) | 2 | 0 | 1 |
| E7 | 4,044 | 4,400 | 203 | 38 | 31 (5) | 2 | 0 | 0 |
| E8 | 1,912 | 2,213 | 190 | 11 | 28 (4) | 1 | 0 | 0 |
| E9 | 1,779 | 2,077 | 90 | 19 | 19 (2) | 2 | 0 | 0 |

**Cross-element consistency:** 30 findings, all applied. Two were applied in modified form after the fixer showed evidence: X-05 (CRA does use "series" for mutual fund units, per the 'Tax treatment of mutual funds' page) and X-07 (the proposed IDPC 1201 citation did not support the claim, so the wording was changed instead).

**Orchestrator close-out (independent of the agents' self-reports):**
- **Gate 2-R:** `verify_quotes.py` over all 9 sidecars gives **1,391 verified, 0 wrong file, 0 NOT FOUND**.
- **Gate 3:** `npm run validate` passes: 9 element files, every one of the 109 outcomes has exactly one section, in syllabus order.
- **Items still open after the loop, resolved by the orchestrator:**
  - **E2 V-01** (strips wording read like a prohibition): reworded to "dealers are not obligated to maintain a secondary market"; the limited-liquidity point was restored with a new quote (strip information statement ~L325).
  - **E2 V-02** (dropped limb of IDPC 7113(2)): restored "suspicious or irregular market conduct"; the existing sidecar quote already covered it.
  - **E6 F-01** (length warning, 6.5 at 525 words): **accepted.** The section is mostly rule text (UMIR 3.2/3.3, the IDPC 5310 margin table). The syllabus names "margin requirements for long and short positions" and the Guide for Studying lists Rule 5100 as a key rule.
- **Calculation-scope sweep** against the spec's syllabus table: 2 hits outside the table.
  - **3.4** (fee impact on a share return): **kept.** It mirrors the syllabus key's own Analyze example (a flat per-trade fee's effect on return).
  - **3.6** (split/consolidation): **relabelled** from "Worked example" to a one-line illustration, which the spec permits.
  - No formulas on the conceptual-only topics (Macaulay duration appears only as the definition of ModD; Black–Litterman, Monte Carlo, Fama–French, Carhart and MWRR/TWRR are conceptual). No pass mark and no financial-calculator assumption anywhere.
- **Browser:** the exam switcher works, progress stays per exam, deep links scroll to the outcome, Markdown renders (formula blocks, tables, callouts), mobile has no horizontal overflow, and the console has no errors.

**Length:** the final guide is **35,187 words**, against the spec target of 22–30k. The overrun is mostly E1 (27 outcomes, about 7.8k words), where the audits *added* coverage of missing Consider bullets, and E5. Auditors trimmed out-of-scope calculations (e.g. E2's Macaulay table and convertible example) but no general trimming pass was run. A condensing pass is optional.

**Public-repo copyright check (2026-10-22):** every committable file was scanned for verbatim overlap with the local corpus, using 8-word shingles.
- **Study guide prose:** 3–13% verbatim (short, attributed rule quotes), with a longest run of ≤ 52 words.
- **Sidecars:** about 1,400 attributed quotes of ≤ 50 words each (4 run 51–61), kept as provenance, the same pattern as `source_quote` in the Supervisor bank.
- **`syllabus.json`:** the 9 element summaries had been copied verbatim from the CIRO syllabus. They were rewritten in our own words; outcome statements remain condensed topic lists.
- Every full-text source copy (PDF/TXT/HTML/XML) is gitignored and local only.
