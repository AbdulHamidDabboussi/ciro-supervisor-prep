# 02b: Gap fill, lane "instruments" (2026-10-22)

Addendum to `02-outcome-source-map.md`. It covers these gap-register rows: G1, G2, G4, G6, G7, G12, G13, G16 and G24.

**How the files were made**

- All paths are relative to `research/sources/`.
- Line numbers (L…) were located with `grep`/`sed` in the file named.
- 13 sample quotes, at least one from each new file, were run through `tools/verify_quotes.py`: 0 NOT FOUND, 0 WRONGFILE.
- The new files are listed in `sources/SOURCES-instruments.md`, waiting to be merged into `SOURCES.md`.
- **No existing corpus file was edited.** Trimmed parts were re-extracted into new companion files, so every line number in `02-outcome-source-map.md` is unchanged.

**Status after this lane**

| Gap | Outcome / bullet | Before | After |
|---|---|---|---|
| G1 | 1.1 clients resident in the U.S., snowbirds, foreign jurisdictions | GAP | **PARTIAL**: the general rule exists (register where clients reside), but there is still no CIRO/CSA text on Canadian dealers serving U.S.-resident clients or snowbirds |
| G2 | 1.1 changes in residence | PARTIAL | **OK** |
| G4 | 1.8 record of TCP refusal | PARTIAL | **OK** |
| G6 | 1.17 churning / excessive switches | PARTIAL | **OK** (the word "churning" exists only in the mutual fund dealer rules) |
| G7 | 1.25 commingling; business partnerships; investment clubs | PARTIAL | **still PARTIAL**: no CIRO or CSA text uses "commingling" for Approved Person–client dealings |
| G12 | 5.3 access to mutual funds (dealer categories); custodian | PARTIAL | **OK** |
| G13 | 5.3 daily pricing (NAV frequency); MER | PARTIAL | **OK**, with a caveat: the rule requires weekly NAV at minimum, not daily |
| G16 | 7.4 QPP | PARTIAL | **OK** |
| G24 | 8.5 "special margin situations" | PARTIAL | **still PARTIAL** (improved): the whole GN-5300 series is retrieved and listed, but no text defines the term |

---

## G1: Clients resident in the U.S., snowbirds, other foreign jurisdictions (1.1)

**Status: PARTIAL (was GAP).** The general principle has governing text. Rules specific to U.S. clients and snowbirds do not exist in CIRO or CSA sources.

**Governing text found**

| File | Section | Lines | What it supports |
|---|---|---|---|
| `ciro/idpc-rules-2026-08-11.txt` | IDPC 2551(1)(i)-(ii) | L3626-3636 | The Dealer Member and the individual must be registered, or exempt, "in each jurisdiction in which clients … reside". This is the CIRO hook for any client living outside the representative's home jurisdiction, including abroad. |
| `csa/osc-rule-32-505-us-broker-dealers-servicing-us-clients.txt` | OSC Rule 32-505, s.1 definition "U.S. client"; s.2-3 exemptions | L45-48; L50-85 | Ontario exemption for **U.S.** broker-dealers and advisers serving **U.S.-resident** clients from Ontario (the "reverse snowbird" case). |
| same file | 32-505CP | L104-109 | "Registration as an adviser or a dealer … is required … in Ontario even if the firm's clients are not resident in Ontario". |
| `csa/ni-31-103-parts-2-7-8-11-categories-exemptions-records.txt` | NI 31-103 s.8.18 International dealer | L664 ff. | Exemption for foreign dealers dealing with Canadian permitted clients. Context only; not retail. |

**Searched and not found** (all on 2026-10-22):

- ciro.ca site search for "snowbird", "non-resident clients" and "United States" + "clients resident": no results.
- The CIRO guidance-note index (`ciro/ciro-guidance-notes-index-2026-10-22.txt`) has no note on client residency. GN-2800-21-001 is about the dealer's own foreign business locations.
- The MFDA staff-notice list has nothing either.
- NI 31-103 and 31-103CP contain no provision on clients in a foreign country. The mobility exemptions (2.2 and 8.30) apply only to a "local jurisdiction", meaning a province or territory of Canada.

The rules that actually govern a Canadian representative dealing with a client located in the U.S. are U.S. federal and state rules, such as SEC Rule 15a-6 and state "Canadian broker-dealer" exemptions. They are outside the allowed source domains and are **not in the corpus**.

**Drafting guidance**

- Write the R claim from IDPC 2551(1).
- Keep anything about U.S. law conceptual, or leave it out.
- Do not state SEC or state rule content as fact.

## G2: Changes in residence (1.1)

**Status: OK.**

| File | Section | Lines | What it supports |
|---|---|---|---|
| `csa/ni-31-103-parts-2-7-8-11-categories-exemptions-records.txt` | NI 31-103 s.2.2 Client mobility exemption, individuals | L98-127 | Up to "5 or fewer eligible clients" per jurisdiction (L110); disclosure to the client (L118-122); Form 31-103F3 (L124-127). |
| same | s.8.30 Client mobility exemption, firms | L1167-1185 | Up to "10 or fewer eligible clients" (L1178); must comply with Parts 13-14. |
| `csa/ni-31-103-registration-requirements.txt` (existing) | s.1.1 "eligible client" | L383-392 | A client who "was a client … immediately before becoming resident in the local jurisdiction", plus that client's spouse or child. |
| `csa/cp-31-103-parts-2-7-8-11-categories-mobility-records-guidance.txt` | 31-103CP s.2.2 and s.8.30 guidance | L53-85; L539-575 | "The exemption becomes available when the client (not the registrant) moves to another jurisdiction" (L59, L545). Limits are per jurisdiction (L85). Firms must supervise and keep records of reliance (L570-573). |
| `ciro/idpc-rules-2026-08-11.txt` | IDPC 2551(1)(i)-(ii) | L3626-3636 | Registration in the client's jurisdiction of residence. |
| `gov/ita-emigration-departure-tax-128-1.txt` | ITA s.128.1(4)(b)-(c) deemed disposition at FMV on ceasing to be resident; s.128.1(10) "excluded right or interest" (RRSP, RRIF, RESP, RDSP, TFSA, FHSA, pensions, CPP/QPP/OAS) | L15-21 ((b) deemed disposition and exclusions); L31 ((c) reacquisition at the same cost); L50-60 | Departure tax: the statutory text. |
| `cra/emigrants-leaving-canada-departure-tax-pages.txt` | CRA "Leaving Canada (emigrants)"; "Dispositions of property for emigrants" | L30-46 (when residency ends; notify payers and financial institutions); L78 (deemed disposition, "departure tax"); L186 (TFSA: no contributions while non-resident); L234-292 (exceptions, T1161 over $25,000, deferral and security over $16,500 federal tax); L294-312 (unwinding on return) | Plain-language departure tax. CRA's deemed-disposition page refers to the **2025** return; cite the year. |

**Pypdf caveat.** In the 31-103CP extract, pypdf sometimes splits words with a stray space (e.g. "anot her", "dea l"). Quote around these artifacts.

## G4: Record of TCP refusal (1.8)

**Status: OK.**

| File | Section | Lines | What it supports |
|---|---|---|---|
| `csa/ni-31-103-parts-2-7-8-11-categories-exemptions-records.txt` | NI 31-103 s.11.5(1)-(2) General requirements for records, including **11.5(2)(l)** "demonstrate compliance with sections 13.2, 13.2.01, 13.2.1 and 13.3" (13.2.01 is the trusted contact person section), (k) account opening, (n) client correspondence | L1271-1329 (11.5(2)(l) at L1309) | The records requirement. |
| same | s.11.6 retention: 7 years | L1330-1345 | Retention period. |
| `csa/cp-31-103-registration-requirements-companion-policy.txt` (existing) | 31-103CP 13.2.01 guidance | L4601-4609 | If the client refuses to name a TCP, the account may still be opened. Firms are "reminded of the requirement to maintain records which demonstrate compliance with section 13.2.01 … under paragraphs 11.5(2)(l), (n) and (o)". At each KYC update, ask again (L4614-4615). |
| `csa/cp-31-103-parts-2-7-8-11-categories-mobility-records-guidance.txt` | 31-103CP 11.5 guidance | L657-889 | General records guidance. |

**Applicability.** s.11.5 is not among the s.9.3 / Appendix G exemptions for CIRO investment dealers, so it applies to them. There is still no IDPC sentence that names a "record of refusal". Cite NI 31-103 11.5(2)(l) and the CP guidance.

## G6: Churning / excessive switches (1.17)

**Status: OK.**

| File | Section | Lines | What it supports |
|---|---|---|---|
| `ciro/idpc-rules-2026-08-11.txt` (existing) | IDPC 3945(2)(iii) "excessive trading"; also (ii) undue concentration | L10002-10009 | The operative investment-dealer rule. It does not use the word "churning". |
| `ciro/mfdr-mutual-fund-dealer-rules-2026-04-01-excerpts.txt` | MFDR Rule 200 (Minimum Standards for Account Supervision) | L1119-1120 (branch review of redemptions: "consider potential churning"); L1184-1196 (VI. trends: "excessive trading or switching between funds indicating possible … churning", with examples: redemption within 3 months, more than 5 trades a month, excessive switches between sales-charge options or where a switch fee is charged); L1206-1209 (commission/AUA increases "may indicate issues with churning") | **The only current CIRO rule text that uses "churning".** It is a mutual fund dealer rule. |
| `ciro/mfda-msn-0065-excessive-trading.txt` | MSN-0065 Excessive Trading (mutual fund dealers) | L22 (staff definition of excessive trading); L30-37 (redeem-and-repurchase instead of a switch); L39-51 (questionable trades, required disclosure); L53 ("disclosure or client consent cannot be viewed as a means to justify excessive trading") | Staff guidance. |
| `csa/cp-31-103-registration-requirements-companion-policy.txt` (existing) | 31-103CP "switch" guidance | L3256 (per gap register) | CSA guidance on switch transactions. |

**Searched and not found.** The CIRO guidance-note index (Series 3000) has no switching or churning note. GN-3400-21-004 (already in the corpus) has no "switch", "churn" or "excessive" text. GN-3900-20-001 (account supervision) also has none of those words (checked in the browser).

**Caveats**

- MFDR and MSN text governs **mutual fund dealers**. For an investment dealer, the rule is IDPC 3945(2)(iii).
- DSC examples pre-date the 2022 ban on deferred sales charges.

## G7: Commingling; business partnerships; investment clubs (1.25)

**Status: still PARTIAL.** This is recorded honestly: no CIRO or CSA text uses "commingling" or "comingling" for an Approved Person mixing their own funds or assets with a client's.

| File | Section | Lines | What it supports |
|---|---|---|---|
| `ciro/idpc-rules-2026-08-11.txt` (existing) | IDPC 3115(1)-(2) Personal financial dealings | L4999-5067 | The general prohibition: "must not, directly or indirectly, engage in any personal financial dealings with clients". It lists consideration, settlements, borrowing, lending, and control or authority. "Include, but are not limited to" leaves room for other dealings. |
| `ciro/mfda-msn-0047-personal-financial-dealings-with-clients.txt` (existing) | MSN-0047 (c) private investment schemes, (d) outside business with clients | L40-46; L48-50 | Investment clubs and co-investment "should be prohibited". Partner, shareholder, director or officer roles in a client's business are possible as approved outside activity. |
| `ciro/mfdr-mutual-fund-dealer-rules-2026-04-01-excerpts.txt` | MFDR 2.1.4 conflicts (Member and Approved Person); 2.1.5 borrowing from clients; 2.3.1 control or authority | L132-183; L184-205; L466 ff. | Mutual fund dealer rules. **No commingling text.** |
| `csa/ni-81-102-part-6-custodianship-part-11-commingling-of-cash.txt` | NI 81-102 Part 11 "Commingling of cash" | L457-613 | **Not relevant to 1.25.** It concerns dealers holding cash for fund orders in trust. Do not cite it for Approved Person commingling. |

**Searched and not found.** A ciro.ca site search for "commingling" (2026-10-22) found only disciplinary decisions (Kazina, MFD hearing panel, 2023-2024) and back-office or segregation guidance. There is no rule or guidance on Approved Person and client commingling.

**Drafting guidance.** Treat "comingling of assets or funds" as one kind of prohibited personal financial dealing under IDPC 3115(1), using the "include, but are not limited to" wording. Use MSN-0047 for investment clubs and business partnerships, cited as mutual-fund-dealer staff guidance. Do not invent a commingling rule.

## G12: Access to mutual funds (dealer categories); fund participants, custodian (5.3)

**Status: OK.**

| File | Section | Lines | What it supports |
|---|---|---|---|
| `csa/ni-31-103-parts-2-7-8-11-categories-exemptions-records.txt` | NI 31-103 s.7.1 Dealer categories | L197-258 | (1)(a)-(e): investment dealer, mutual fund dealer, scholarship plan dealer, exempt market dealer, restricted dealer. (2)(a) an investment dealer may deal in "any security" (L216). (2)(b) a mutual fund dealer may deal in mutual funds and labour-sponsored funds (L222-226). (2)(d) EMD (L231-250). s.7.1(4) does not apply in Ontario (L255); the same categories are in OSA s.26(2) (note at L278-279). |
| same | s.2.1 individual categories (dealing representative) | L60-96 | Individual registration categories. |
| `csa/cp-31-103-parts-2-7-8-11-categories-mobility-records-guidance.txt` | 31-103CP 7.1 guidance | L164-260 | "A mutual fund dealer may only act as a dealer in respect of mutual funds and certain other investment funds" (L188). An EMD may not act in prospectus distributions; investment dealers and mutual fund dealers are the categories for those (L196-215). |
| `ciro/idpc-rules-2026-08-11.txt` (existing) | IDPC 2551(1)(iii) | L3636-3640 | A Registered Representative dealing in mutual funds only at a dual-registered firm. |
| `csa/ni-81-102-part-6-custodianship-part-11-commingling-of-cash.txt` | NI 81-102 Part 6 | L37-377: 6.1 one custodian (L39-50); 6.2 qualified custodians in Canada (L87); 6.3 sub-custodians outside Canada (L103); 6.4 custodian agreements (L127); 6.5 holding of assets (L156); 6.6 standard of care (L188); 6.7 compliance reports (L220) | Custodianship rules. |
| same | NI 81-102 Part 11 | L457-613 | Principal distributor and participating dealer cash held in trust (fund participants). |
| `csa/cp-81-102-part-8-custodianship-guidance.txt` | 81-102CP Part 8 | L52-149 | Standard of care, book-based system, compliance. |

## G13: Daily pricing (NAV calculation frequency); MER (5.3, also 5.9 and 5.10)

**Status: OK, with a caveat.**

| File | Section | Lines | What it supports |
|---|---|---|---|
| `csa/ni-81-106-investment-fund-continuous-disclosure-nav-mer.txt` | NI 81-106 s.1.1 "management expense ratio" | L227 | Definition. |
| same | Part 14, s.14.2 Calculation, frequency and currency | L405-464 | NAV at fair value (14.2(1), (1.2)). **14.2(3): at least "once a week"**, or "once every business day" if the fund uses specified derivatives or sells short (L439-443). Publish NAV and NAV per security at no cost (14.2(6.1)). |
| same | s.14.3-14.4 | L465-471 | Portfolio and capital transactions in the next NAV. |
| same | Part 15, s.15.1 MER calculation | L475-536 (s.15.2 at L537) | Total expenses (excluding commissions and portfolio transaction costs) ÷ average NAV × 100; annualized; per class or series; waiver note. s.15.2 covers fund of funds. |
| `csa/ni-81-102-investment-funds.txt` (existing) | Parts 9-10 | — | Purchase and redemption at the next-determined NAV. |

**Caveat.** No CSA rule requires *daily* NAV for every mutual fund. Daily pricing is industry practice, and is mandatory only for funds that use specified derivatives or sell short. Do not state "mutual funds must be priced daily" as an R claim.

## G16: Government pension programs, QPP (7.4)

**Status: OK.** Retraite Québec is an allowed domain.

File: `gov/qpp-quebec-pension-plan-retraite-quebec-pages.txt` (7 pages, live, no page dates; the pages state 2026 figures).

| Lines | What it supports |
|---|---|
| L10 | Compulsory plan for workers aged 18+. "Elsewhere in Canada, the equivalent plan is the Canada Pension Plan." |
| L16-22 | Contributions: 2026 rate 10.6% split 5.3% / 5.3%; $3,500 exemption; MPE $74,600; additional plan 2% and 8% up to $85,000. |
| L24-44 | Benefits offered. |
| L92-96 | Normal retirement age 65; maximum at 72; reduced from 60. |
| L124-175 | Eligibility; working while receiving pension; CPP contributions counted; living elsewhere in Canada. |
| L199-201 | Plus 0.7% per month after 65, up to 58.8% at 72; minus 0.5%-0.6% per month before 65, so 30%-36% lower at 60. |
| L291-319 | Adjustment-factor table. |
| L384-434 | Retirement pension supplement. |
| L454 ff. (key data, e.g. L519-572) | 2026 figures: maximum monthly pension at 65 $1,507.65; death benefit $2,500. |

Cite all figures as **2026**.

## G24: "Special margin situations" (8.5)

**Status: still PARTIAL (improved).** No CIRO text defines "special margin situations". The GN-5300 series is now fully accounted for, and related client-account margin notes were added.

**What exists in the GN-5300 series.** `ciro/ciro-guidance-notes-index-2026-10-22.txt` L117-130 lists Series 5000. The 5300 sub-series contains exactly one note, **GN-5300-21-001**. The other Series 5000 notes are 5200 (real return bonds; synthetic/reconstituted GoC bonds), 5400 (interest rate swaps; unhedged FX in client accounts), 5500 (underwriting), 5600 (special warrants, subscription receipts, restricted securities), 5700 (crypto futures; condor spreads; OTC options; box spreads) and 5900 (repos). Form 1 notes include GN-FORM1-22-001 (registered account debit balances) and GN-FORM1-24-001 (Schedule 9 concentration).

| File | Section | Lines | What it supports |
|---|---|---|---|
| `ciro/gn-5300-21-001-loan-value-significant-security-positions.txt` | GN-5300-21-001 | L50-54 (concentration charge; control block positions get no loan value under IDPC 5340); L56-70 (significant position; single-account concentration factors); L72-88 (reduce loan value) | Concentrated and control-block positions. |
| `ciro/ciro-lserm-list-securities-eligible-reduced-margin-page.txt` | LSERM page | L13-18; L34 | Reduced margin rate of 30% for client positions under IDPC 5310(1); house rates may be higher. Convertibles under 5330(1). |
| `ciro/gn-form1-22-001-margin-registered-account-debit-balances.txt` | GN-FORM1-22-001 | L29-31 | Debit balances in RRSP, RESP and RDSP accounts: cash-account rules, margin-account rules, or 100% margin. |
| `ciro/gn-5400-23-001-margin-unhedged-fx-positions-client-accounts.txt` | GN-5400-23-001 | L52 ff. | Margin on foreign-currency positions in client accounts. Technical; low exam value. |
| `ciro/idpc-rules-2026-08-11.txt` (existing) | IDPC 3945(2)(ii) | L10006-10007 | Supervision must detect "undue concentration … in a single account or across accounts". |

**Drafting guidance.** Present "special margin situations" as a C-framed umbrella. Each example under it is an R claim with its own quote:

- control blocks
- concentrated positions
- LSERM reduced rate
- convertibles
- registered-account debit balances
- account guarantees and hedge agreements (already mapped)

## Not addressed by this lane

G3, G5, G8-G11, G14, G15, G17-G23 and G25 are outside this lane.
