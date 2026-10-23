# Study guide spec v1.1 — Retail Securities Exam

The study guide is written and audited **before** any questions (user instruction, 2026-10-22). Questions are later drafted against the same corpus, and the guide must be sufficient to answer them. Source policy: `../../README.md` ("Source policy") — regulatory content quoted (R), concept content relaxed but independently verified (C).

## Depth: comprehensive (v1.1, user instruction 2026-10-23; replaces v1.0 "in between")

The guide should be thorough enough to study from **without other resources**, while staying strictly inside the syllabus. Target about **60,000 words** across 9 elements, roughly **450–700 words per outcome**: Remember/Understand outcomes sit at the low end, Apply/Analyze outcomes at the high end. The user asked for the extra depth to go into two things:

1. **Deeper explanations.** For every rule or concept, cover the *why* (the investor-protection or market purpose behind a rule; the intuition behind a concept), how it connects to neighbouring outcomes (with "see 4.6" style cross-references), the full definitions, and what goes wrong when it is breached or misapplied.
2. **Applied scenarios.** Every Apply/Analyze outcome gets at least one `> **Scenario**` callout, and the larger outcomes get two or three. Each scenario is a short client or Registered Representative situation with invented names: the facts, the question it raises, and the resolution, reasoned step by step from the rule or concept. Understand outcomes get a scenario where it helps comprehension.

**Structure within an outcome:** give each "Consider" bullet its own `###` subsection, or a clearly bolded lead-in for very small bullets, so a reader can find any syllabus parameter at a glance. Keep the existing callout types and add `Scenario`.

**What does NOT change:**
- Scope is closed. Extra depth goes *into* the syllabus parameters, never beyond them, and the syllabus stays the golden standard.
- The calculation-scope table below is unchanged. Scenarios are qualitative unless the outcome is a calculation outcome; there are no new multi-step calculations elsewhere.
- Every new regulatory statement still needs a quoted R claim in the sidecar.
- Existing correct content is kept and built upon, not rewritten for its own sake.

## Writing standard: ASD-STE100 Simplified Technical English (v1.1, user instruction 2026-10-23)

All prose follows the **writing rules** of ASD-STE100, so the text is easy to understand, including for readers whose first language is not English. The STE dictionary itself is licensed by ASD and is not available to us. So we apply the writing rules, prefer the plainest common word, and treat finance and regulatory terms as STE **technical names**, which are permitted (e.g. "suitability determination", "modified duration", "trusted contact person", "Investment Dealer"). This is STE-style writing, not dictionary-certified STE.

**Words**
- Use one word for one meaning, and one meaning for each word. After you choose a term, use only that term (e.g. always "client", not alternately "customer" or "investor" for the same person).
- Prefer simple, common words: "use", not "utilize"; "start", not "commence"; "help", not "facilitate"; "about", not "approximately"; "must", not "is required to".
- Use simple verb tenses: present, simple past, simple future. Do not use "-ing" words as nouns or to make complex verb forms; keep "-ing" only in technical names (e.g. "front running", "short selling").
- Do not use phrasal verbs or idioms when a single verb is available ("find", not "find out"; "do", not "carry out").
- Keep articles ("a", "the"). Do not join more than three nouns in a cluster unless it is a technical name.

**Sentences**
- Descriptive sentences: **25 words maximum**. Instructions: **20 words maximum**.
- One topic per sentence. If a sentence needs "and" twice, make two sentences.
- Use the active voice. Use the passive only when the actor is unknown or not important.
- Write instructions and callout commands in the imperative ("Get the client's consent before…").
- Put conditions first: "If the client refuses, record the refusal."
- Use vertical lists for three or more items, conditions or steps.

**Paragraphs**
- One topic per paragraph, with the topic sentence first. **Six sentences maximum.**

**Exempt (do not rewrite):** verbatim quotations of rules or instruments (inside quotation marks), formulas and code blocks, table cells (but keep them short), technical names, and headings that repeat syllabus wording.

**Meaning comes first.** Simplifying must never change what a rule requires or what a concept means. When a rule has conditions or exceptions, keep all of them and split them into a list. Do not drop them to shorten a sentence.

**Lint:** `python3 -I exams/retail-securities/tools/ste_lint.py <E*.md>` reports sentences over 25 words, paragraphs over six sentences, likely passive voice and "-ing" use per outcome. The gate is **0 sentences over 25 words and 0 paragraphs over 6 sentences**, excluding the exempt material. The passive and "-ing" counts are review signals for the auditors.

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
  - `> **Scenario**` followed by a short applied situation (invented names): the facts, the question, and the reasoned resolution citing the rule or concept. It is qualitative unless the outcome is in the calculation table.
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
