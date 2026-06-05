# CIRO Supervisor Exam — Deep Research Report

**Purpose:** Foundation for building a practice-exam website for the CIRO Supervisor Exam.
**Research date:** June 4, 2026 · Method: 5 parallel research workstreams, multi-source verification, official-source priority. Detailed findings with caveats live in `research/01–05`. Structured study assets live in `study-material/` and `question-bank/`.

---

## 1. Executive summary

The Supervisor Exam is one of nine proficiency exams under CIRO's new assessment-centric proficiency model, in force since **January 1, 2026**. It replaced the CSI Investment Dealer Supervisors Course (IDSC) pathway for new supervisory approvals at investment dealers. There are no prerequisite courses; CIRO publishes everything needed to define scope — a syllabus (the authoritative statement of what can be tested), a study guide, a competency profile, and a full 90-question practice exam with answer key — all free. The underlying tested material is the IDPC Rules, UMIR, CIRO guidance notes, and a handful of federal statutes, all freely available.

For a practice-website builder, three facts matter most:

1. **Scope is closed and fully public.** "The exam syllabus is the authoritative list of what can be tested on the exam – you will not be tested on any aspects of topics that are not explicitly mentioned in the syllabus" (official Guide for Studying). The full syllabus — 9 elements, 103 learning outcomes with per-element question counts — is captured verbatim in `research/02` and structured in `study-material/syllabus.json`.
2. **The blueprint is precise.** 90 MCQs (60 standalone + 30 item-set) over 3 hours, weighted per element (Account approvals alone = 20/90). Questions are written at four cognitive levels (Remember/Understand/Apply/Analyze) declared per learning outcome — a practice site can mirror this exactly.
3. **The competitive field is thin.** Only 3 live third-party Supervisor products exist (SeeWhy $499, ciroexam.ca $29.99/mo, Mastery app); the strongest brand (Business Career College) is still "coming soon," and the former incumbents (CSI, IFSE, Learnedly) are all out of this market.

## 2. The exam at a glance (all verified against official sources)

| Parameter | Value | Source |
|---|---|---|
| Questions | **90 MCQ** (60 standard + 30 item-set, 4 options A–D) | Official syllabus; confirmed by counting the official practice exam |
| Duration | **3 hours** | Official syllabus |
| Delivery | Computer-based, proctored — Prometric test centres (Canada) or ProProctor Live remote (global) | Fitch Learning policies |
| Administrator | **Fitch Learning** (enrolment + candidate portals); delivery by **Prometric** | ciro.ca Exam Hub; prometric.com/exams/ciro |
| Fee | **$475 CAD** first attempt; **$300** per retake (+tax) | Bulletin 25-0205; Fitch fees policy |
| Attempts | **3 per 12-month enrolment period**; 6-month cooling-off after 3 fails within 6 months | Exam Enrolment & Attempts Policy |
| Pass mark | **Not published** (per-form psychometric standard setting; pass/fail result only, immediate) | CIRO FAQ |
| Languages | English and French | Bulletin 25-0205 |
| Prerequisites | None to write. For *approval* as Supervisor: also the exams of those supervised (CIRE waived with 2 years' relevant experience) + minimum 2 years relevant experience | IDPC Rule 2603(1) |
| Exam validity | 3 years (extendable via same-category approval or 1 year relevant experience within 3 years) | IDPC Rule 2628 |
| Materials allowed | Closed-book; no paper — remote uses ProProctor scratch-pad; breaks allowed but clock runs | Fitch/Prometric policies |
| Reschedule | Free ≥36 hours before; no-show = absent = fail | Fitch policy |

Caveat: calculator policy is unconfirmed by any official source (syllabus has essentially no computational content).

## 3. Exam blueprint (the content model for the website)

Nine elements, weights verbatim from the official syllabus (sums to 90):

| # | Element | Qs | Share |
|---|---|---|---|
| 1 | General regulatory framework | 10 | 11% |
| 2 | Supervisory structure: Investment Dealer responsibilities | 10 | 11% |
| 3 | Business and operations | 9 | 10% |
| 4 | **Account approvals** | **20** | **22%** |
| 5 | **Account activity** | **15** | **17%** |
| 6 | Activities of Approved Persons | 8 | 9% |
| 7 | Trading and market rules (UMIR) | 6 | 7% |
| 8 | Advertisements, sales literature, communications, research reports | 7 | 8% |
| 9 | Risks: dealer activity and registered locations | 5 | 6% |

Elements 4+5 (account approvals + account activity) are 39% of the exam — the practice site should weight its bank accordingly. Every element's full learning-outcome list (1.1 through 9.3, with taxonomy verb and tested parameters) is in `research/02` Part 1 and `study-material/syllabus.json`.

The syllabus maps 1:1 onto the official Supervisor Competency Profile (Appendix 8; long-form reference Appendix 16): Competency 1 (General Regulatory Framework) → Element 1; Competency 2 (Dealer Responsibilities) → Element 2; Competency 3's eight sub-competencies → Elements 3–9.

## 4. What to study — primary sources (free, authoritative)

The official Guide for Studying names the rule set to be "particularly familiar with":

- **IDPC Rules** (current consolidation Jan 8, 2026: https://www.ciro.ca/sites/default/files/2026-01/IDPC-Rules-080126-EN.pdf): 1100 Interpretation, 1200 Definitions, **1400 Standards of conduct**, **1500 Managing significant areas of risk**, 2200 Part D Branch offices, 2500 Approved Persons, 2600 Proficiency, 2700 Continuing education, **Series 3000 (business conduct & client accounts — esp. 3100 conflicts/best execution, 3200 client accounts/RDI, 3300 KYP, 3400 suitability, 3600 communications, 3700 complaints, 3800 records, 3900 Supervision — the central rule)**, 8100/8200 Enforcement.
- **UMIR** Parts 2 (Abusive trading), 4 (Frontrunning), 5 (Best execution), 7 (Trading in a marketplace — esp. 7.1 Trading Supervision Obligations), 10 (Gatekeeper).
- **PCMLTFA** + Regulations (FINTRAC), Criminal Code financial crimes, PIPEDA, CASL, Bank Act, BIA Part XII. No specific National Instruments are referenced.
- **~25 guidance notes**, headlined by GN-3900-20-001 *Account Supervision Guidance* (the cornerstone), GN-1400-21-002 *Role of Compliance and Supervision*, GN-3900-21-002 *Head Office Supervision of Business Locations*, GN-3400-21-004 *KYC & suitability*, GN-3600-21-002 *Review of Advertisements*. Full annotated list with URLs: `research/03` Part 3 and `study-material/source-library.md`.

The official practice exam (90 Qs + answer key, no rationales) is at https://www.ciro.ca/media/14071/download?attachment — useful as a benchmark form; note its questions are CIRO copyright and should not be republished on the site.

## 5. Competitive landscape (full detail: `research/04`)

Live Supervisor-specific products: **SeeWhy Learning** ($499 early access, full content lands June–July 2026), **ciroexam.ca** ($29.99/mo all-exam subscription, ~1,550 Supervisor Qs, AI tutor, no third-party reviews yet), **Mastery Exam Prep** (app, 2,665 Qs, questions-only). Not yet live: Business Career College ("coming soon," strongest guarantee/brand). Out of the market entirely: CSI/Fitch (conflict — administers the exams), IFSE (wound down), Learnedly (publicly exited, citing unresolved syllabus contradictions).

Underserved niches a new site could target: budget one-off pricing, French-language prep, explanation-rich free tier (CIRO's own practice exam has no rationales), firm/cohort dashboards, and community/peer content (zero Reddit/Quizlet presence found).

## 6. Transition context (matters for audience sizing; detail: `research/05`)

- Existing Supervisors approved before Jan 1, 2026 are grandfathered while they stay in role (180-day lapse tolerance) — they are *not* exam customers, though all must complete free Conduct Training by Dec 31, 2026.
- The legacy pipeline ends hard: IDSC enrolments before Jan 1, 2026 must complete the course and have their dealer file on NRD **before Jan 1, 2027**. From 2027 on, every new supervisor approval goes through the Supervisor Exam.
- The exam audience is investment-dealer-side only; mutual fund dealer branch managers are out of scope until the Rule Consolidation Project (proposed effective 2028).
- Legacy IDSC content (12-chapter outline public at csi.ca) maps ~1:1 to the new elements and is a reasonable secondary read, but pre-dates the 2024 derivatives modernization and 2026 rule amendments.

## 7. Confidence and verification notes

- **High confidence (multi-source official):** exam format/fees/attempts/validity, element weights, all 103 learning outcomes (official French syllabus verbatim + Google-indexed English + reconciliation against the 90-Q practice exam), competency profile text, transition rules, rule list from the Guide for Studying.
- **Known vendor error:** SeeWhy's "110 questions / 150 minutes" claim contradicts all official sources (90 Q / 3 h).
- **Unresolved/unconfirmed:** calculator policy; exact GN numbers for the four 2025 proficiency guidance notes; Rule 3500's exact title.
- **Resolved June 4, 2026 (user-supplied official English PDFs, root folder):** verbatim English text of the syllabus, study guide and practice exam extracted to `research/sources/`. Verified: exam parameters and element weights verbatim; all 103 outcome IDs and taxonomy levels (one correction — outcome 3.3 is "Understand", not "Analyze"; syllabus.json, research/02 and two seed-bank tags updated); study guide rule list verbatim; practice exam = 90 items with 90 answer keys (spread A:19 B:29 C:26 D:16).
- ciro.ca was intermittently unreachable during research (site carries a cybersecurity-incident banner); claims were verified via CIRO's media-server PDFs and BCSC's verbatim regulatory mirrors where needed.

## 8. Recommended next steps for the practice website

1. Ingest `study-material/syllabus.json` as the content backbone (elements → outcomes → taxonomy → weights).
2. Grow the question bank from `question-bank/seed-questions.json` (45 original seed MCQs with rationales and rule citations) toward ~1,500+ items, weighted by blueprint share, with item-set (scenario) support — 1/3 of the real exam is item-set questions.
3. Build mock-exam assembly to the official form spec: 90 Qs, 60 standard + 30 item-set, 3-hour timer, per-element composition matching the weights.
4. Write study notes per element sourced from the rules/GNs in `study-material/source-library.md` (all free primary sources; avoid reproducing CIRO's copyrighted practice questions or CSI texts).
5. Differentiators worth building, per the gap analysis: per-question rule citations, explanation-rich feedback, a free element, and French support.

---

### Key sources

- Supervisor Exam page: https://www.ciro.ca/registered-individuals/proficiency/exam-hub/supervisor-exam
- Syllabus: https://www.ciro.ca/media/13606/download?attachment · Guide for Studying: https://www.ciro.ca/media/13671/download?attachment · Practice exam: https://www.ciro.ca/media/14071/download?attachment
- Competency profile (App. 8): https://www.ciro.ca/media/1006/download?attachment · Reference doc (App. 16): https://www.ciro.ca/media/13631/download?attachment
- Exam Hub: https://www.ciro.ca/registered-individuals/proficiency/exam-hub · New-candidates FAQ: https://www.ciro.ca/registered-individuals/proficiency/new-candidates
- Bulletins: 25-0110 (rule approval), 25-0205 (fees), 25-0212 (syllabi) — ciro.ca newsroom; GN-2600-25-001 (transition/exemptions)
- IDPC Rules consolidation: https://www.ciro.ca/sites/default/files/2026-01/IDPC-Rules-080126-EN.pdf · UMIR: https://www.ciro.ca/rules-and-enforcement/universal-market-integrity-rules
- Fitch Learning support/policies: https://fitchlearning-na.zendesk.com/hc/en-ca · Prometric: https://www.prometric.com/exams/ciro
- Providers: seewhylearning.com, ciroexam.ca, masteryexamprep.com, ready.businesscareercollege.com, learnedly.com/announcement, csi.ca/en/ciro
