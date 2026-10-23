# Study guide spec v1.0 — Retail Securities Exam

The study guide is written and audited **before** any questions (user instruction, 2026-10-22). Questions are later drafted against the same corpus, and the guide must be sufficient to answer them. Source policy: `../../README.md` ("Source policy") — regulatory content quoted (R), concept content relaxed but independently verified (C).

## Depth ("in between")

Not a textbook, not a cheat sheet. Per outcome, roughly **150–350 words** (Remember/Understand at the low end; Apply/Analyze and calculation outcomes at the high end, plus their worked examples). Target about **22–30k words** across 9 elements, scaled to exam weight (E1 = 27 questions → the longest element; E8/E9 = 7 → the shortest). Every **"Consider" bullet** in the outcome's syllabus statement is covered explicitly. Scope is closed: nothing outside the syllabus parameters.

## Grounding & calculation scope (BINDING — added 2026-10-22 on user instruction; overrides any orchestrator element note)

**The official syllabus is the golden standard.** It defines what is in scope, at what taxonomy level, and with which "Consider" parameters. CIRO itself says candidates will not be tested on anything not explicitly in it. The order of authority is:

1. **The syllabus.** It decides scope, depth and whether a calculation is in scope at all.
2. **The regulatory corpus.** It decides what a rule actually says, but only for topics the syllabus names.
3. **The Guide for Studying.** It decides emphasis only.
4. **Our own source map and orchestrator notes.** They are working aids, and the syllabus wins any conflict with them.

A topic that appears in the corpus but not in the syllabus is left out, however relevant it seems.

Everything is grounded in the exam's own sources: the syllabus (`research/sources/syllabus-raw.txt`), the official Guide for Studying (scope only), and the regulatory corpus. **Do not assume depth the sources don't ask for.** In particular, do not assume complex financial calculations unless the syllabus calls for them.

**Calculations appear ONLY where the syllabus explicitly asks for them** ("Calculate", "calculation", "may involve calculations", "Apply … calculation"):

| Outcome | What the syllabus asks to calculate | Keep it to |
|---|---|---|
| 2.6 | Bond yields: income (current) yield, (approximate) yield to maturity, yield on a zero-coupon instrument | the standard formulas; yield curves are conceptual |
| 2.8 | Modified duration → % price change for a given yield change | `%ΔP ≈ −ModD × Δy`; Macaulay duration is conceptual (2.7 relationships), no Macaulay computation |
| 2.9 | PV of a fixed-income security from par, coupon, term, discount rate; any missing TVM variable | formula route, solvable on a basic/scientific calculator |
| 3.10 | PV of an equity: discounted cash flow; price–earnings growth models | dividend discount / constant-growth and P/E-based valuation |
| 4.6, 4.7 | The ratios listed in the syllabus ("may involve calculations") | only the listed ratios; formula + interpretation |
| 4.10 | Performance versus a benchmark (index) | simple return vs index return |
| 5.9 | Fund pricing incl. NAVPS; standard performance data / total return ("may include some calculations"); element summary: value of a portfolio or units/shares issued | NAVPS, units issued for a purchase, simple total return |
| 6.8 | CAPM expected return (and risk) of a portfolio/asset | `E(R) = Rf + β(Rm − Rf)`, portfolio beta as weighted average |
| 7.8 | Regular investment to meet a future goal; regular income from a single sum (PV of annuity) | annuity formulas, formula route |
| 7.10 | Capital gains and losses | proceeds − ACB − outlays; inclusion as stated in the CRA text for the stated year |
| 7.11 | Income tax payable; tax on interest, eligible/non-eligible dividends, foreign income | federal brackets/gross-up/DTC from CRA text for a stated year |
| 9.3 | Rate of return, standard deviation, Sharpe, Treynor, Jensen, vs benchmark | the standard formulas, small data sets |

The syllabus key's own examples (average return of several funds; effect of a flat per-trade fee on an investor's return) show the expected level: short, arithmetic-light, one or two steps.

**Everywhere else, content is conceptual:** explain what a measure/model is, what it indicates, when it is used, and its pros and cons. No multi-step computations and no derivations. This covers Macaulay duration, variance/standard deviation and beta in 6.3, drawdown, MPT, Black–Litterman, Monte Carlo, APT, Fama–French and Carhart models, multi-factor regression, money- vs time-weighted returns in 5.8, MER/TER, index construction in 4.9, and margin. A one-line numeric illustration is acceptable only if it makes a concept clearer.

**Laws and statutes** (Securities Acts, PCMLTFA, PIPEDA, NI 62-104, etc.): the Guide for Studying says "The exam will focus on the purpose, the general requirements and the implications of breaching these laws." Write at that level, not section-by-section detail. **Accounting:** the guide says specific accounting regulations will not be tested; only IFRS terminology is needed.

**Rule emphasis:** the guide names IDPC Rules 1100, 1200, 1400, 2600, 2700, 3000-series, 5100 and 7100, and UMIR Parts 2, 4, 5, 7 and 10 as the rules to know particularly well.

**Auditors:** flag any calculation or depth beyond this table as category `scope`. **Fixers:** trim it back to conceptual treatment.

## File format (enforced by `app/scripts/validate-data.mjs`)

One file per element: `E1.md` … `E9.md`.

```markdown
# Element 2: Fixed income

One or two short paragraphs: what the element covers, its exam weight (indicative questions), and how it tends to be tested (calculation-heavy? scenario-based?).

## 2.1 Regulatory requirements for debt markets

…body…

*Sources: IDPC 2501(1); IDPC 2503*

## 2.2 Types and features of fixed-income products
…
```

- Exactly one `## <outcome id> <short title>` per outcome in `syllabus.json`, in syllabus order. No other `##` headings (use `###` / `####` inside a section).
- **Callouts** are blockquotes that start with a bold label. Use only:
  - `> **Exam trap:** …` (commonly confused points, distractor bait)
  - `> **Worked example**` followed by a scenario with numbers, the formula, the substitution, and the answer, step by step
  - `> **Key rule:** …` (a short verbatim quote of rule text in quotation marks + citation; ≤ 50 words)
  - `> **Remember:** …` (a compact list of must-know items)
- **Formulas** go in fenced code blocks as plain text (Unicode is fine: `×`, `÷`, `Σ`, `√`, superscripts like `(1 + r)^n`). Define every symbol on first use.
- Tables (GFM) for comparisons (e.g. cash vs margin account, trust vs corporate fund, eligible vs non-eligible dividends).
- End every outcome section with an italic sources line: `*Sources: IDPC 3202(1); NI 31-103 s. 13.2; CRA T4037 (2025)*`. Concept-only sections cite `*Sources: standard finance concept (verified)*`.
- Write for a Canadian candidate: CAD, Canadian terminology (Investment Dealer, Approved Person, Registered Representative), CIRO/IDPC/UMIR names.

## Content rules

- **R claims** (what a rule, instrument, guidance note, brochure, or CRA/government programme requires, permits, prohibits, limits or defines; dollar limits; deadlines; percentages set by rule) are written FROM text in `../../research/sources/` or the shared `../../../../research/sources/rules/` files. Use `../../research/02-outcome-source-map.md` to find the governing passage. No located text → don't state it (write around it or flag it in the sidecar's `gaps`).
- **C claims** (finance/economics/accounting concepts, formulas, calculations, behavioural-finance definitions, portfolio theory) may come from knowledge. They must be textbook-standard. Where conventions differ (approximate YTM formula, day count, money- vs time-weighted, Macaulay vs modified duration), state the convention used.
- **Numbers that change** (tax rates, gross-up %, contribution limits, CPP/OAS amounts) must come from the corpus and state the year, e.g. "for 2025". If the corpus lacks the current year, say which year the figure is for.
- Never state as fact anything the logistics research marks UNCONFIRMED. Never mention a pass mark.
- **Originality:** all prose is original. Short verbatim quotes of public rule/instrument/CRA text are allowed (≤ 50 words each, in quotation marks, cited). Never copy CSI / CIRO course materials. **Never open the official practice exam file.**
- Worked examples use invented names and round, checkable numbers; every number must be reproducible from the stated inputs.

## Provenance sidecar (not shipped)

`E<n>.sources.json`:

```json
{
  "element": 2,
  "drafted": "2026-10-22",
  "claims": [
    {"outcome": "2.1", "kind": "R", "claim": "Dealers must have written debt-market policies and procedures", "source_file": "research/sources/ciro/….txt", "locator": "IDPC 2502(1), ~line 1234", "quote": "contiguous verbatim text ≤ 50 words, straight double quotes inside escaped"},
    {"outcome": "2.6", "kind": "C", "claim": "Current yield = annual coupon ÷ market price", "basis": "standard definition"},
    {"outcome": "2.6", "kind": "C", "claim": "Worked example: $1,000 par 5% bond at $950 → current yield 5.26%", "basis": "50 / 950 = 0.05263"}
  ],
  "gaps": ["2.1 'prohibited practices — obligations on the Approved Person': no governing text found in corpus"]
}
```

- Every R claim in the `.md` has one sidecar entry with a **contiguous verbatim** quote (no ellipses, no inserted numbering, exact entity names; formatting artifacts like curly quotes and ligatures are normalized by the checker). `source_file` is relative to `exams/retail-securities/` (or `../../research/sources/rules/idpc-rules.txt` / `umir.txt` for the shared files).
- Every worked example has a C entry whose `basis` shows the arithmetic.

## Gates

1. **Gate 2-R (mechanical):** `python3 exams/retail-securities/tools/verify_quotes.py <sidecars…>` — every R quote must appear contiguously in its `source_file` after normalization. 0 fabrications required; formatting artifacts get the quote corrected.
2. **Gate 2-C (independent audit):** a fresh agent that did not draft the element re-derives every worked example and number from scratch, checks every C claim for correctness and convention clarity, checks every R statement in the prose faithfully paraphrases its quote (no overreach), and checks every Consider bullet is covered. Any error → fixed by a fixer agent, then re-audited on the changed passages.
3. **Gate 3 (lint):** `npm run validate` (structure: one section per outcome, syllabus order) + word count per element vs target.
4. Log the run in `../../research/qa-log.md` (study-guide section): per element words, R/C claim counts, quote failures, audit findings and fixes.
