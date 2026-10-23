# Gap-fill addendum: lane "statutes" (2026-10-22)

This file adds to the gap register in `02-outcome-source-map.md` (the "Gap register" section). For each gap this lane handled, it lists:

- the new corpus file
- the section that governs the point
- the line numbers of the governing text in that file
- the gap's status after this lane

Paths are relative to `research/sources/`. Line numbers are 1-based in the saved text files and include each file's header block. Every file is listed in `sources/SOURCES-statutes.md`.

A 12-quote smoke test was run with `tools/verify_quotes.py` against the new files: 12 verified, 0 wrong file, 0 not found. The PDFs were extracted with pdfplumber, which avoids the split-word artifacts that pypdf produced.

**Domain note.** ontario.ca (e-Laws) and fintrac-canafe.canada.ca are now on the allowed list. This answers the "not on the allowed list" remarks in G15, G17 and G18. The Ontario Securities Act is one province's statute: describe its provisions as "securities legislation (for example, Ontario Securities Act s. 76)". Do not present them as national rules.

## Summary

| Gap | Outcome / bullet | Status now |
|---|---|---|
| G8 | 3.1 Prospectus requirement; secondary distributions | **OK** |
| G9 | 3.1 Application to takeovers | **OK** (definitions and formal-bid basics) |
| G10 | 4.8 Cease trade orders | **OK** |
| G18 | 8.2 Insider trading violations | **OK** (Ontario statute as the example) |
| G19 | 8.2 Whistleblower frameworks: statutory anti-reprisal | **OK** for Ontario; non-Ontario programmes (AMF) still not in corpus |
| G23 | 8.4 Settlement cycle (T+1) | **OK** |
| G22 | 8.4 Marketplaces; order-error handling; FX conversion | **PARTIAL**: marketplaces OK; order-error handling and client FX conversion still GAP |
| G15 | 6.2 Financial crime risk (statutory AML) | **OK** |
| G17 | 8.2 Suspicious transactions: STR obligation | **OK** |
| G5 | 1.13 Privacy | **PARTIAL** → federal PIPEDA OK; provincial private-sector privacy laws (QC/AB/BC) still not in corpus |
| G14 | 5.13 Structured products (PPNs) | **OK** |
| (G11, part) | 5.1 Statutory "mutual fund" definition | Statutory definition now present (bonus; ITA s.122.1 SIFT part not handled by this lane) |

## Detail

### G8: prospectus requirement; distribution; trade; resale (3.1). Status: OK

**`gov/ontario-securities-act-extracts.txt`** (Securities Act (Ontario), consolidation 2025-09-01 to e-Laws currency date 2026-10-20)

| Provision | Lines |
|---|---|
| s.1(1) "distribution" | L99-106 |
| s.1(1) "trade" or "trading" | L264-271 |
| s.1(1) "security" | L243-263 |
| s.1(1) "reporting issuer" | L228 onward |
| s.1(1) "insider" | L118 onward |
| s.1(1) "distribution to the public" | L109 |
| s.1(1) "material fact" | L175 |
| s.1(1) "material change" | L165-174 |
| s.52 "distribution" extended meaning: "means only a distribution that is a distribution to the public" | L354-356 |
| s.53(1) Prospectus required | L357-358 |
| s.73.3 accredited investor exemption, incl. the statutory "accredited investor" definition (useful cross-reference to NI 45-106 s.2.3, already in corpus) | L373-398 |

**`csa/ni-45-102-resale-of-securities.txt`** (NI 45-102, amendments to 2023-06-09)

| Provision | Lines |
|---|---|
| s.1.1 definitions, incl. "control distribution" | L69 |
| s.1.1 "distribution date" | L74 |
| s.2.3 / 2.4 (which first trades fall under s.2.5 or s.2.6) | L141-144 |
| s.2.5 Restricted Period, incl. condition 2 "At least four months have elapsed from the distribution date." | L145-184 (condition 2 at L151) |
| s.2.6 Seasoning Period | L185-209 |
| s.2.8 trade by a control person | L210 onward |
| Appendix A (control distributions) | L416 onward |
| Appendix D (restricted-period trades, incl. NI 45-106 s.2.3 accredited investor "except in Ontario", s.2.5, 2.9, 2.10) | L494 onward |
| Appendix E (seasoning-period trades) | L778 onward |

### G9: application to takeovers (3.1). Status: OK (definitions and formal-bid basics)

**`csa/ni-62-104-take-over-bids-and-issuer-bids.txt`** (NI 62-104, effective 2025-09-19)

| Provision | Lines |
|---|---|
| s.1.1 "issuer bid" | L190 |
| s.1.1 "offeror's securities" | L216 |
| s.1.1 "take-over bid" (the 20% threshold) | L244-250 |
| s.2.8 duty to make the bid to all holders | L538-540 |
| s.2.23 identical consideration | L772-775 |
| s.2.28.1 105-day minimum deposit period | L879-881 |
| s.2.28.2 shortened deposit period | L882 onward |
| s.2.29.1 take-up conditions, incl. "more than 50%" minimum tender | L921-933 |
| s.2.30 withdrawal rights | L934 onward |
| s.2.31.1 mandatory 10-day extension | L986 onward |
| s.4.1 normal course purchase exemption (5% in 12 months) | L1196-1211 |
| s.4.2 private agreement exemption | L1212 onward |
| s.4.3 | L1245 |
| s.5.2 early warning (10%) | L1469-1476 |

**`gov/ontario-securities-act-extracts.txt`**: s.89 Part XX definitions. "Take-over bid" is defined there by reference to a "prescribed class of offers" (L462-465); "issuer bid" is at L458.

The take-over bid prospectus exemption (NI 45-106 s.2.16) was already in corpus. The NI 45-102 s.2.11 first-trade exemption for securities acquired in a bid is at `csa/ni-45-102-resale-of-securities.txt` L284 onward.

### G10: cease trade orders (4.8). Status: OK

**`gov/ontario-securities-act-extracts.txt`**

| Provision | Lines |
|---|---|
| s.127(1) Orders in the public interest | L603 |
| s.127(1) para. 2: order "that trading in any securities ... cease permanently or for such period as is specified" | L605 |
| s.127(1) para. 2.1 (acquisition ban) | L606 |
| s.127(1) para. 3 (exemptions removed) | L607 |
| s.127(1.1) order by Commission on consent | L623-624 |
| s.127(3) "Cease trading order" | L627-628 |
| s.127(4) hearing requirement | L631-632 |
| s.127(5) temporary orders: the Tribunal | L664-665 |
| s.127(6) temporary order takes effect immediately and expires on the 15th day unless extended | L669 |
| s.127(7)-(8) | L671-673 |

**`csa/np-11-207-failure-to-file-cease-trade-orders.txt`** (NP 11-207; CSA guidance)

| Provision | Lines |
|---|---|
| Part 1 s.1 scope (why failure-to-file CTOs exist) | L18 onward |
| s.2 CTOs outside the policy, incl. the management cease trade order | L54-76 |
| s.3 definitions: "failure-to-file cease trade order" | L107 |
| s.3 definitions: "management cease trade order" | L111 |
| s.3 definitions: "specified default" | L138 |
| s.6 possible responses (default list; failure-to-file CTO, or MCTO under NP 12-203) | L187-207 |
| s.7 reasons for issuing a failure-to-file CTO, incl. that existing investors may be unable to sell while it is in effect | L212-245 |
| s.9 insider trading during a default | L254 onward |
| s.10-11 effect where not a reporting issuer / foreign | L285-322 |
| s.12 effect on UMIR-regulated market participants: regulatory halt on all marketplaces (still says "IIROC"; now CIRO) | L323-335 |
| Part 5 revocation | L425 onward |

Caveats:

- A CSA advance notice of amendments to NP 11-207 dated 2026-09-24 is listed on bcsc.bc.ca. It was not retrieved. Check before relying on revocation-process details.
- UMIR's own cease-trade/halt rule is already in `ciro/umir-2026-08-11.txt` (see IDPC-UMIR-POINTERS).

### G18: insider trading and tipping (8.2). Status: OK

**`gov/ontario-securities-act-extracts.txt`**

| Provision | Lines |
|---|---|
| s.76(1) insider trading prohibition | L401 |
| s.76(2) Tipping | L402-403 |
| s.76(3) bidder / merger party tipping | L404-409 |
| s.76(3.1) Recommendation | L410-411 |
| s.76(4) defence | L412-413 |
| s.76(5) "person or company in a special relationship with an issuer": insider/affiliate/associate; persons engaging in business or professional activity with the issuer; directors, officers and employees; persons who learned while so related; tippees who learn from any such person (clause (e)) | L420-436 |
| s.76(6) derivatives/related securities deemed securities of the issuer | L435-440 |
| s.1(1) "insider" | L118 onward |
| s.122(1) general offence | L526 onward |
| s.122(4) minimum fine for contravening s.76(1)-(3) (profit-based) | L539-540 |
| s.126.1 fraud and market manipulation | L569 onward |
| s.126.2 misleading statements | L578 onward |

### G19: statutory anti-reprisal (8.2). Status: OK for Ontario

**`gov/ontario-securities-act-extracts.txt`**

**Correction to the gap register:** OSA s.121.5 is the confidentiality provision for a whistle-blower's identity (FIPPA) (L474-482). The anti-reprisal provision is **s.121.6**.

| Provision | Lines |
|---|---|
| s.121.6(1) "specified individual" (employee, officer, director, contractor) | L485-489 |
| s.121.6(2) prohibition on taking reprisal | L490-495 |
| s.121.6(3) what counts as a reprisal | L497-503 |
| s.121.6(4) gag clauses in agreements are void | L504-508 |
| s.121.6(5) action / arbitration | L509-514 |
| s.121.6(6) reverse burden of proof | L515-516 |
| s.121.6(7) remedies, incl. reinstatement and two times compensation | L517-521 |

Still open: the AMF programme (Quebec) is outside the allowed domains. The OSC programme and OSC Policy 15-601 were already in corpus.

### G23: settlement cycle T+1 (8.4). Status: OK

| File | Provision | Lines |
|---|---|---|
| `csa/ni-24-101-institutional-trade-matching-and-settlement.txt` (current to 2024-05-27) | s.1.1 "DAP/RAP trade" | L49-53; "institutional investor" L54 |
| same | s.1.1 "T" means the day on which a trade is executed | L81 |
| same | s.1.1 "T+1" means the next business day following T | L82 |
| same | s.3.1 matching no later than 3:59 a.m. ET on T+1 (DAP/RAP institutional trades) | L113-117 |
| same | s.7.1 dealer policies must facilitate settlement no later than the "standard settlement date ... prescribed by an SRO or the marketplace" | L191-196 |
| `csa/cp-24-101-institutional-trade-matching-and-settlement-companion-policy.txt` | s.5.1: "Current SRO and marketplace rules mandate a standard T+1 settlement cycle period for most transactions in equity and long term debt securities", footnote citing IDPC Rule 4800 | L461-464 |
| `ciro/bulletin-23-0150-t1-settlement-amendments.txt` (CIRO Bulletin 23-0150, 2023-10-26) | Executive Summary: the move from T+2 to a "trade date plus one business day (T+1) settlement cycle" | L22 |
| same | s.3: amendments harmonize UMIR/IDPC with T+1 | L44 |
| same | s.5: effective May 27, 2024 | L57 |

Caution on the bulletin: L32 ("Currently ... two days after the date of the trade") is pre-implementation history. Do not quote it as the current cycle.

Already in the corpus (no download needed), and now identified as the CIRO rule text that sets T+1:

- `ciro/umir-2026-08-11.txt` L2569-2584: UMIR 1.1 "Special Terms Order". Clause (c)(i) means an order is special-terms if it would settle on a date other than "the first business day following the date of the trade". Regulatory history at L2599-2601 cites the T+1 bulletin. This is the clearest current CIRO rule statement of standard T+1 for equities.
- `ciro/idpc-rules-2026-08-11.txt` L14095-14136: IDPC 4805(1) "regular delivery" for fixed income. Government of Canada and provincial bonds and other bonds settle on the "first business day after the transaction date"; T-bills settle the same day.
- IDPC 4760(1)(ii) "first settlement day after the trade date" (L13924).
- IDPC 4753(1) broker-to-broker matching by 6 p.m. on trade date (L13744-13755).
- Form 1 "regular settlement date" = industry practice (`ciro/idpc-form-1-schedule-4-cash-and-margin-accounts.txt` L37-41).

### G22: marketplaces (8.4). Status: PARTIAL

**`csa/ni-21-101-marketplace-operation.txt`** (NI 21-101, effective 2020-09-14; current BCSC version)

| Provision | Lines |
|---|---|
| s.1.1 "alternative trading system" | L22-36 |
| s.1.1 "exchange-traded security" | L45-48 |
| s.1.1 "marketplace" (exchange, QTRS, ATS-type facility, dealer internalizing an exchange-traded security; excludes inter-dealer bond broker) | L82-99 |
| s.1.1 "marketplace participant" | L100 |
| s.1.1 "order" ("a firm indication ... of a willingness to buy or sell a security") | L108-109 |
| s.1.1 "recognized exchange" | L116-123 |
| s.1.2 routing orders alone is not operating a marketplace | L159-162 |
| Part 6 ATS-only requirements | from PART 6 heading |

Ontario's own definitions are in `gov/ontario-securities-act-extracts.txt`: s.1(1) "alternative trading system" (L18) and "marketplace" (L157-164).

Still GAP: CIRO order-error correction rule and client foreign-exchange conversion rules. These are not statutes and were not handled by this lane. Keep them as C, or leave them out.

### G15 and G17: statutory AML and the STR obligation (6.2, 8.2). Status: OK

**`gov/pcmltfa-extracts.txt`** (PCMLTFA, point-in-time 2026-03-26)

| Provision | Lines |
|---|---|
| s.5(g) securities dealers are reporting entities | L37 |
| s.6 record keeping / s.6.1 verify identity | L67 / L71 |
| s.7 STR: report every transaction, completed or attempted, where "there are reasonable grounds to suspect" it relates to money laundering, terrorist financing or sanctions evasion | L77-82 |
| s.7.1 listed/terrorist property | L84 onward |
| s.8 no disclosure of reports ("tipping-off"): applies "with the intent to prejudice a criminal investigation, whether or not a criminal investigation has begun" | L94-96 |
| s.9.6 compliance program (risk-based) | L108 onward |
| s.10 immunity for good-faith reports | L118 onward |
| s.74-80 offences (s.75 penalties for breaching s.7: up to $10,000,000 / 2 years less a day on summary conviction; $20,000,000 / 5 years on indictment; s.75(2) defence for an employee who reported to a superior) | s.74 L128; s.75 L138-145; s.76 L146; s.77 L152 |

**`gov/pcmltf-str-regulations-sor-2001-317.txt`** (point-in-time 2025-10-01)

| Provision | Lines |
|---|---|
| s.9(1) STR content | L92 |
| **s.9(2)** STR sent "as soon as practicable after they have taken measures that enable them to establish that there are reasonable grounds to suspect..." | L93 |
| s.10(2) listed-property report sent "immediately" | L99 |

**`gov/pcmltf-regulations-securities-dealer-extracts.txt`** (point-in-time 2026-03-26)

| Provision | Lines |
|---|---|
| s.25-29 securities dealers: report and keep records of cash or virtual currency of $10,000 or more in a single transaction | L12-35 |
| s.84-85 identity verification (LCTR / suspicious transactions) | L37-48 |
| s.94 securities dealer identity verification | L52 onward |
| s.119 PEP | L58 onward |
| s.126-130 24-hour rule | L63 onward |
| s.131-132 reports | L107 onward |
| s.134-137 third-party determination | L119 onward |

**`gov/fintrac-str-guidance.txt`** (FINTRAC guidance; page modified 2025-05-22)

| Point | Lines |
|---|---|
| s.1: all reporting entities and employees must report | L121-129 |
| s.2: tipping-off note (do not inform anyone, including the client; avoid unusual questions that could tip off the client) | L147 |
| s.3: "Reasonable grounds to suspect is the required threshold... a step above simple suspicion" | L201 |
| s.3: simple suspicion vs reasonable grounds to believe | L225-227 |
| s.4: submit "as soon as practicable" after completing measures | L235-237 |
| s.4: "no monetary threshold" | L239 |
| s.4: what "as soon as practicable" means (treat as a priority; the longer the delay, the greater the need for an explanation) | L341-347 |

**`gov/fintrac-securities-dealers-pages.txt`**

| Point | Lines |
|---|---|
| Securities-dealer requirement summary | L6 onward |
| Compliance program | L19 |
| STRs | L79 |
| Large cash transaction reports | L89 |
| 24-hour rule | L97 |
| ML/TF indicators for securities dealers (red flags) | L129 onward |

CIRO's own AML guidance (GN-3200-23-001) was already in corpus. Quote the statute for the obligation, the deadline and tipping-off, and quote FINTRAC for the threshold explanation.

### G5: privacy (1.13). Status: PARTIAL (federal part OK)

**`gov/pipeda-extracts-schedule-1.txt`** (PIPEDA, point-in-time 2026-03-26)

| Provision | Lines |
|---|---|
| s.2 definitions ("personal information", "commercial activity") | L15 onward |
| s.3 purpose | L57 onward |
| s.4 application | L63 onward |
| s.5 must comply with Schedule 1; s.5(3) reasonable-person purposes | L82 onward |
| s.6.1 valid consent | L90 onward |
| s.7 exceptions to consent | L94 onward |
| s.10.1 breach of security safeguards (report to the Commissioner, notify individuals) | L156 onward |
| **Schedule 1** principles | L177-318 |

Schedule 1 principles, by line:

| Principle | Line |
|---|---|
| 4.1 Accountability | L179 |
| 4.2 Identifying Purposes | L194 |
| 4.3 Consent | L209 |
| 4.4 Limiting Collection | L233 |
| 4.5 Limiting Use, Disclosure, and Retention | L242 |
| 4.6 Accuracy | L253 |
| 4.7 Safeguards | L262 |
| 4.8 Openness | L278 |
| 4.9 Individual Access | L292 |
| 4.10 Challenging Compliance | L308 |

**`gov/opc-pipeda-fair-information-principles-pages.txt`**: the OPC's plain-language one-paragraph summary of each of the 10 principles is at L31-L70, and the "no-go zones" are at L17-29.

Still open: Quebec, Alberta and BC private-sector privacy statutes. Their publishers' domains are not on the allowed list. State only that "substantially similar" provincial laws exist if a source supports it; otherwise leave it out.

### G14: principal-protected notes (5.13). Status: OK

| File | Provision | Lines |
|---|---|---|
| `gov/ppn-regulations-sor-2008-180.txt` (point-in-time 2024-10-25, current) | s.1 definitions ("principal-protected note" has the Bank Act s.627.01 meaning) | L15-24 |
| same | s.2 plain language | L28 |
| same | **s.3** disclosure "at least two days before" issuance, items (a)-(n) incl. risk that no interest may accrue, early-redemption loss, CDIC ineligibility | L34-50 |
| same | s.4-7 exceptions/timing | L52-71 |
| same | s.8-12 ongoing disclosure (website, current value, amendments, index delinking, early redemption) | L72-99 |
| same | s.13 advertising (past performance is not an indicator) | L100-113 |
| `gov/bank-act-ppn-disclosure-extracts.txt` (point-in-time 2026-09-01) | s.627.01 "principal-protected note": an instrument issued by an institution whose payments are linked to an index or reference point and whose principal is guaranteed (definition text) | L37-42 |
| same | s.627.77 availability of information | L56 onward |
| same | s.627.78 disclosure before issuance | L64 onward |
| same | s.627.79 no-interest notice | L85 onward |
| same | s.627.8 current value | L89 onward |
| same | s.627.82 amendments | L102 onward |
| same | s.627.83 early redemption | L106 onward |
| same | s.627.87 advertising | L119 onward |

Caution: since SOR/2021-181 the PPN Regulations' "institution" no longer covers banks. It covers retail associations and trust and loan companies. Banks' PPN duties are in the Bank Act provisions above. Name the right instrument for the issuer type.

## Gaps not handled by this lane

These were not assigned to this lane: G1-G4, G6, G7, G11 (ITA s.122.1 part), G12, G13, G16, G20, G21, G24 and G25. G22 is only partly closed (marketplaces done; order errors and FX still open).
