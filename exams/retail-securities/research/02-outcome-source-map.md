# 02: Outcome to source map (Retail Securities Exam)

Built **2026-10-22** from `study-material/syllabus.json` (109 outcomes). Each outcome's Consider bullets were checked against the text corpus listed in `sources/SOURCES.md`, and every line number below was located with `grep` or `sed` in the file named.

## How to read this map

**Classes**, following the source policy in the README:

- **R (regulatory):** every claim must be written from a contiguous verbatim `source_quote` (Gate 2-R).
- **C (concept):** may be written from standard finance knowledge. A verifier then re-derives every claim and recomputes every number (Gate 2-C). Any convention used must be stated.
- **R+C (mixed):** each claim is tagged R or C in its provenance sidecar. The R bullets are listed in the tables below. Every bullet not listed in a table is C.

**Status flags** on R bullets:

- **OK:** the corpus contains governing text.
- **PARTIAL:** governing text covers only part of the bullet; the missing part is named.
- **GAP:** no governing text exists anywhere in the corpus.

All gaps are collected in the [gap register](#gap-register) at the end.

**Which rule version to quote.** IDPC and UMIR line numbers point to the **current August 11, 2026 files**:

- `sources/ciro/idpc-rules-2026-08-11.txt`
- `sources/ciro/umir-2026-08-11.txt`

The shared repo-root copies (`research/sources/rules/idpc-rules.txt`, consolidated 2026-01-08, and `umir.txt`, material to 2026-01-13) have been superseded on ciro.ca. The user asked us to adapt the old rules to this exam, so drafters quote the Aug-2026 files. Two places give the line of each section in the shared copy:

- the [line crosswalk appendix](#appendix-idpc--umir-line-crosswalk) at the end of this file
- `sources/ciro/IDPC-UMIR-POINTERS.md`

Substantive differences between the two versions:

- new IDPC 4620-4630
- new IDPC 4780-4782
- amended UMIR 3.3
- IDPC 3802: "cost" is now "position cost"

**Line references.** `L1234` is a 1-based line number. A range `L1234-1260` covers the passage. For section headings the number is approximate (±2 lines).

**File abbreviations.** Paths are relative to `research/sources/`.

| Abbrev. | File |
|---|---|
| IDPC | `ciro/idpc-rules-2026-08-11.txt` |
| UMIR | `ciro/umir-2026-08-11.txt` |
| F1S4 | `ciro/idpc-form-1-schedule-4-cash-and-margin-accounts.txt` |
| GN-KYC | `ciro/gn-3400-21-004-kyc-suitability-retail-clients.txt` |
| GN-CRM | `ciro/gn-3100-21-001-client-relationship-model.txt` |
| GN-CRMFAQ | `ciro/gn-3800-21-010-crm-faq.txt` |
| GN-KYP | `ciro/gn-3300-21-001-product-due-diligence-kyp.txt` (+ `gn-3300-21-001-appendix-a.txt`) |
| GN-OEO | `ciro/gn-3200-26-001-oeo-account-services-activities.txt` |
| GN-BORROW | `ciro/gn-3200-22-001-borrowing-for-investment-purposes.txt` |
| GN-LIETF | `ciro/gn-3400-21-001-leveraged-inverse-etfs-sales-practices.txt` |
| GN-OA | `ciro/gn-2500-22-001-outside-activities.txt` |
| MSN-0047 | `ciro/mfda-msn-0047-personal-financial-dealings-with-clients.txt` |
| GN-CIC | `ciro/gn-3500-21-001-confidential-information-containment.txt` |
| GN-ADV | `ciro/gn-3600-21-002-advertisements-sales-literature-correspondence-social-media.txt` |
| N-14-0073 | `ciro/notice-14-0073-business-titles-financial-designations.txt` |
| SN-31-363 | `ciro/csa-ciro-staff-notice-31-363-conflicts-of-interest-page.txt` |
| SN-31-369 | `ciro/csa-ciro-staff-notice-31-369-finfluencers-page.txt` |
| N-16-0068 / N-17-0093 | `ciro/notice-16-0068-…txt` / `ciro/notice-17-0093-…txt` |
| GN-MFSI / GN-NAL | `ciro/gn-3100-21-002-mutual-fund-sales-incentives.txt` / `ciro/gn-3100-21-007-non-arms-length-investment-products.txt` |
| GN-DRDS | `ciro/gn-3200-24-001-derivatives-risk-disclosure-statement.txt` |
| GN-OBSI / GN-CRR | `ciro/gn-3700-21-003-…txt` / `ciro/gn-3700-21-002-electronic-complaint-record-retention.txt` |
| N-09-0363 | `ciro/notice-09-0363-client-complaint-handling-rule-and-guidance.txt` |
| BR-COMPL / BR-PROT / BR-OPEN / BR-STRIP / BR-PAGE | `ciro/brochure-ciro-complaints-brochure.txt` / `brochure-how-ciro-protects-investors.txt` / `brochure-opening-an-investment-account.txt` / `brochure-strip-bonds-information-statement.txt` / `ciro-official-brochures-page.txt` |
| CIPF-POL / CIPF-WEB | `ciro/cipf-coverage-policy-2023-07-27.txt` / `ciro/cipf-about-cipf-coverage.txt` |
| OBSI-* | `ciro/obsi-how-the-complaint-process-works.txt`, `ciro/obsi-consumer-faqs.txt`, `ciro/obsi-can-obsi-help.txt` |
| GN-BESTEX | `ciro/gn-urpart6-25-0003-best-execution-idpc-umir.txt` (current; the 2021 `gn-3100-21-003` is legacy) |
| GN-MANIP | `ciro/gn-urpart7-26-0007-manipulative-deceptive-trading-practices.txt` |
| GN-GATE | `ciro/gn-urpart10-26-0003-gatekeeper-reporting-obligation.txt` |
| GN-TSUP | `ciro/gn-urpart7-26-0008-trading-supervision-obligations.txt` |
| GN-INSM | `ciro/gn-urpart6-26-0004-insider-significant-shareholder-markers.txt` |
| GN-STOP | `ciro/gn-urpart7-25-0003-management-of-stop-loss-orders.txt` |
| GN-SSDES / GN-SSFAIL | `ciro/gn-urpart6-25-0002-…txt` / `ciro/gn-urpart3-24-0002-…txt` |
| GN-EXTH | `ciro/gn-3100-26-001-extended-hours-trading.txt` |
| GN-AML | `ciro/gn-3200-23-001-aml-compliance-guidance.txt` |
| GN-CONF / GN-CONSOL / GN-BKS | `ciro/gn-3800-21-003-…txt` / `ciro/gn-3800-21-004-consolidated-statements.txt` / `ciro/gn-3800-20-001-content-books-and-records.txt` |
| GN-DEBT | `ciro/gn-7100-21-001-debt-market-requirements.txt` |
| CR-2025 / CR-2026 | `ciro/ciro-compliance-report-2025.txt` / `ciro/ciro-compliance-report-2026.txt` |
| CIRO-WB | `ciro/ciro-whistleblower-service.txt` |
| SVC / HKA | `ciro/ciro-seniors-and-vulnerable-clients.txt` / `ciro/ciro-housekeeping-amendments-older-vulnerable-clients.txt` |
| NI31-103 / 31-103CP | `csa/ni-31-103-registration-requirements.txt` / `csa/cp-31-103-registration-requirements-companion-policy.txt` |
| NI41-101 / 41-101CP / F41-101F4 | `csa/ni-41-101-…txt` / `csa/cp-41-101-…txt` / `csa/form-41-101f4-etf-facts.txt` |
| NI45-106 / 45-106CP / F45-106F9 | `csa/ni-45-106-…txt` / `csa/cp-45-106-…txt` / `csa/form-45-106f9-…txt` |
| NI51-102 / NP51-201 | `csa/ni-51-102-continuous-disclosure-obligations.txt` / `csa/np-51-201-disclosure-standards.txt` |
| NI81-101 / F81-101F3 / NI81-102 / 81-102CP | `csa/ni-81-101-…txt` / `csa/form-81-101f3-fund-facts.txt` / `csa/ni-81-102-investment-funds.txt` / `csa/cp-81-102-…txt` |
| OSC-15-601 / OSC-WB | `csa/osc-policy-15-601-whistleblower-program.txt` / `csa/osc-whistleblower-program-web-pages.txt` |
| CRA-* / ITA-* / GOV-* | files under `cra/` and `gov/`, named in full where cited |

## Classification summary

| Element | Outcomes | R | R+C | C |
|---|---:|---:|---:|---:|
| 1 KYC & suitability | 27 | 22 | 5 | 0 |
| 2 Fixed income | 9 | 1 | 1 | 7 |
| 3 Equities | 10 | 1 | 1 | 8 |
| 4 Securities analysis | 14 | 0 | 3 | 11 |
| 5 Managed products | 14 | 1 | 10 | 3 |
| 6 Portfolio construction | 12 | 0 | 2 | 10 |
| 7 Investment recommendations | 12 | 2 | 6 | 4 |
| 8 Execution & market integrity | 6 | 4 | 2 | 0 |
| 9 Monitoring & reporting | 5 | 2 | 2 | 1 |
| **Total** | **109** | **33** | **32** | **44** |

The 65 outcomes classed R or R+C carry **25 gap-register entries**:

- 3 full **GAP**s: 1.1 US-resident and snowbird clients; 8.3 IOC/FOK; 8.4 settlement cycle (T+1)
- 22 **PARTIAL**s

---

## Element 1: Know-Your-Client (KYC) & suitability

### 1.1 Firm–client relationship (Understand): **R+C**
| Bullet | Governing text | Status |
|---|---|---|
| Client relationship model | GN-CRM (whole; RDI L55-111, conflicts L113-174); IDPC 3216 L5798-5985; GN-CRMFAQ | OK |
| Trust, agency, conflicts of interest | **C** for the trust/agency concepts (no statute in corpus defines them). For conflicts: IDPC 3110-3113 L4930-4995; standards of conduct IDPC 1402 L1188 | OK (conflicts) |
| Working with clients resident in the US, including snowbirds and other foreign jurisdictions | Nothing in the corpus covers a Canadian dealer serving US-resident or foreign-resident clients. The relevant rules are SEC Rule 15a-6, state registration and the CSA/provincial registration exemptions. Tax-side context only: GOV `canada-us-tax-convention-consolidated.txt` Art. XVIII L470 (pensions/RRSP) and Art. X L268 (dividends) | **GAP** |
| Considerations for changes in residence | Tax side: CRA `tfsa-pages.txt` "How non-residency affects your TFSA" L1511 (and L274, L848); CRA `rrsp-rrif-hbp-pages.txt` non-resident withholding L510; CRA `t4061-…txt` (Part XIII); ITA `ita-foreign-income-withholding-tax.txt` s.212 L54. Not in corpus: the registration consequences of a client moving province or country (NI 31-103 Part 8 is trimmed) and departure tax (ITA s.128.1 not extracted) | **PARTIAL** |

### 1.2 KYC information required (Understand): **R**
| Bullet | Governing text | Status |
|---|---|---|
| Financial circumstances (income, liquidity needs, financial assets, liabilities, net worth, borrowing to invest) | IDPC 3202(1) L5502-5520; GN-KYC 2.3.2 L191-223; GN-BORROW 1-2.1 L52-82; 31-103CP 13.2 L746-1076 | OK |
| Personal circumstances; investment knowledge; risk profile; objectives and needs; time horizon | IDPC 3202(1) L5502-5520; GN-KYC 2.3.1 L167, 2.3.3 L224, 2.3.4 L234, 2.3.5 L246, 2.3.6 L281, 2.3.7 L285 | OK |
| Constraints and restrictions (EDI, ESG criteria, personal preferences) | GN-KYC 2.3.3 L226-228 ("investing in accordance with their personal values"; "environmental, social and governance criteria or other personal preferences"). **EDI considerations are not named** in any corpus text | PARTIAL (EDI wording) |

### 1.3 Risk profile assessment (Understand): **R+C**
| Bullet | Governing text | Status |
|---|---|---|
| Risk tolerance (willingness) and risk capacity (ability to endure loss): definitions, separate considerations, profile = lower of the two | GN-KYC 2.3.5 L246-280 (L251-252, L254, L263, L269); 31-103CP L968-975 | OK |
| Behavioural aspects that influence tolerance | **C** (re-derive; links to 7.3) | n/a |
| Risk need (required return, market environment, consequence of failure) | **C**. No regulatory text uses "risk need"; GN-KYC L230 covers investment goals and return assumptions only | n/a (C) |
| Resolving conflicts between expectations and risk profile | GN-KYC L277 (do not override the risk profile to meet return expectations) | OK |

### 1.4 Business structures (Understand): **R+C**
| Bullet | Governing text | Status |
|---|---|---|
| Sole proprietorship, partnership | CRA `business-structures-sole-proprietorship-partnership.txt` L4-155 | OK |
| Corporation (private vs public) | GOV `business-structures-corporations-cooperatives-ised.txt` "Benefits of incorporating" L4, "Share structure" L136; CRA `corporations-tax-rates-types-pages.txt` "Type of corporation" L90 (CCPC / public / other private) | OK |
| Co-operative | GOV ISED file L394-542 | OK |
| Impact on investment opportunities | **C**; the account-opening angle can quote IDPC 3203 L5544 and 3204 L5555 | n/a |

### 1.5 Documenting discussions; client confirms accuracy (Remember): **R**
| Bullet | Governing text | Status |
|---|---|---|
| Accurate documentation; client confirmation | IDPC 3202(3) L5521-5523; GN-KYC 2.6.1 L334-341, 2.6.5 L360; IDPC 3804(2)(xii),(xiv) L8360-8363 | OK |

### 1.6 Trusted contact person (TCP) and temporary holds (Apply): **R**
| Bullet | Governing text | Status |
|---|---|---|
| Establishing a TCP | IDPC 3201(3) definitions of TCP, vulnerable client and financial exploitation L5474-5492; IDPC 3202(4)-(5) L5524-5543; NI31-103 13.2.01 L974-994; 31-103CP App. G L4456-4620 | OK |
| What it permits / does not permit | IDPC 3216(5) RDI on TCP L5954; 31-103CP App. G L4617-4640 (contacting the TCP) | OK |
| If the client refuses | 31-103CP App. G L4601-4607 | OK (CSA guidance only) |
| When to contact; recognizing capacity concerns and financial exploitation | 31-103CP App. G L4464-4500 (warning signs), L4617+; SVC (2019, pre-rule) for context only | OK |
| Conditions for temporary holds | IDPC 1201 "temporary hold" L1032; IDPC 3222 L6068-6100; NI31-103 13.19 L1529-1560; 31-103CP 13.19 L2842 | OK |
| Documenting the discussion | IDPC 3222(3)(i) L6090; IDPC 3804(2)(xix) L8373; 31-103CP L4587, L4605-4607, L4734 | OK |

### 1.7 Primary responsibility, no delegation, keep KYC current (Understand): **R**
| Bullet | Governing text | Status |
|---|---|---|
| All three | IDPC 3209(1)-(4) L5643-5654 (36-month cycle; 12 months for managed/discretionary); GN-KYC 2.5 L325, 2.11 L403-426 | OK |

### 1.8 Client account records (Understand): **R**
| Bullet | Governing text | Status |
|---|---|---|
| Verification of identity | IDPC 3210 "Client account records" (i) L5657-5668; IDPC 3206 L5573; GN-KYC 2.2.2 L146 | OK |
| Account appropriateness assessment | IDPC 3210 (ii) L5665; IDPC 3211 L5670 | OK |
| KYC information | IDPC 3210 (iii); IDPC 3202 L5501 | OK |
| Acknowledgement of disclosures | IDPC 3804(2)(xi) L8357-8359; examples: IDPC 3217 leverage disclosure acknowledgement L5986-5995; IDPC 3254 L6485 | OK |
| Record of TCP refusal | No IDPC text requires a record of the refusal. 31-103CP App. G L4601-4607 asks firms to keep records showing compliance with 13.2.01 and points to NI 31-103 s.11.5(2)(l),(n),(o); **Part 11 is trimmed from the corpus** (only the table of contents at NI31-103 L168). NI 31-103 App. G (L2951+) does not exempt CIRO members from 13.2.01 | **PARTIAL** |

### 1.9 Account appropriateness obligation (Apply): **R**
| Bullet | Governing text | Status |
|---|---|---|
| Account appropriateness in scenarios | IDPC 3211 L5670-5694 (3211(2) OEO/DEA carve-out); GN-KYC 3.3.1 L518, 3.3.3 L546, 3.3.4 L562; GN-OEO 2.2 L110-123 | OK |

### 1.10 Account types: features, advantages and disadvantages (Apply): **R+C**
| Bullet | Governing text | Status |
|---|---|---|
| Advisory (non-managed) account, fee-based vs commission-based | IDPC 3230 L6104; IDPC 3216(5)(ii)(h)-(i) fees L5938-5946; 31-103CP L1361 (fee-based vs commission-based); N-17-0093 L275-283. **C** for the advantages and disadvantages | OK |
| Managed account; discretionary account | IDPC 3270 definitions L6518; 3271 L6542; 3274 L6580; 3277-3279 L6615-6660; 3281 L6692; 3221 prohibition on discretionary trading L6060 | OK |
| Cash account vs margin account | F1S4 Note 5 L104 (margin) and Note 7 L124 (cash); IDPC 3245-3247 L6290-6310 | OK |

### 1.11 Account-opening documentation (Understand): **R**
| Bullet | Governing text | Status |
|---|---|---|
| Dealer business model; relationship with clients; products and services | IDPC 3212-3214 L5695-5762; IDPC 3213 L5718; GN-KYC 2.4 L297, 3.3.3 L546; GN-CRM "Content disclosure for different account types" L86 | OK |
| When one set of KYC can serve multiple accounts | GN-KYC 2.7-2.7.2 L364-380 | OK |

### 1.12 Relationship Disclosure (RDI) (Understand): **R**
| Bullet | Governing text | Status |
|---|---|---|
| Objective; frequency; form; format; content; review | IDPC 3216(1) L5799, (2) L5807, (3) L5812, (4) L5835, (5) L5846-5962, (6) L5963; GN-CRM L59-111; NI31-103 14.2 L1643; 31-103CP 14.2 L2968 | OK |

### 1.13 Confidential information containment (Analyze): **R**
| Bullet | Governing text | Status |
|---|---|---|
| Information barriers and firewalls | GN-CIC "Information Barriers" L38-58; IDPC 3508 inside information L7108 | OK |
| Grey and restricted lists | GN-CIC grey/watch lists L59-83, restricted lists L84-105; IDPC 3615(2) L7458-7459 | OK |
| Role of investment banking, research, corporate finance | IDPC 3509 pre-marketing L7140; IDPC 3600 Part B research: 3619-3622 L7477-7539 (3620 L7508 no IB compensation; 3621 L7514 relationship with IB); GN-CIC Introduction L32; NP51-201 Part III tipping L183+. **C** for the functional descriptions of each department | OK |
| Cybersecurity | IDPC 3703 cybersecurity incident reporting L7674, L7733-7756 | OK |
| Privacy | Only IDPC 2216(13) (shared office premises) L1919-1925 (client consent "in compliance with applicable … privacy legislation"). PIPEDA and provincial privacy statutes are not in the corpus | **PARTIAL** |

### 1.14 Welcome package documents (Understand): **R**
| Bullet | Governing text | Status |
|---|---|---|
| Fee schedule | IDPC 3216(5)(ii)(h)-(i) L5938-5946; IDPC 3218 pre-trade disclosure L6001; IDPC 3504 L7055 | OK |
| CIRO brochures, mandatory vs optional | BR-PAGE L19-35 (mandatory: Complaints, How CIRO protects investors, Strip bonds IS; optional: Opening an Investment Account); BR-COMPL; BR-PROT; BR-OPEN; IDPC 3216 complaint brochure at account opening L5947-5950 | OK |
| CIPF | IDPC 2284 L2198; CIPF-POL (eligibility L56-100, losses L107+); CIPF-WEB coverage limits L47-60 | OK |
| Derivatives risk disclosure | IDPC 3254 L6485; GN-DRDS Attachment A L47-49+ | OK |
| Conflict of interest disclosures | IDPC 3113 L4965; IDPC 3216(5) conflicts L5920-5936 | OK |
| Complaint-handling procedures | IDPC 3216(5)(ii)(l) L5947; IDPC 3723 L7901; 3724 L7934 | OK |

### 1.15 Product due diligence (PDD) (Apply): **R**
| Bullet | Governing text | Status |
|---|---|---|
| Duty on the dealer and on the Approved Person | IDPC 3301 L6737; 3303 L6755; GN-KYP L62-231 (business models L104, transfers-in L130, third-party reliance L136, effective PDD L171-227); GN-KYP App. A | OK |

### 1.16 Know-your-product (KYP) (Apply): **R**
| Bullet | Governing text | Status |
|---|---|---|
| Structure, features, initial and ongoing costs, risks and impact of costs | IDPC 3302 L6747; GN-KYP KYP section L232-289 (L249 understand products; L261 explain key features); NI31-103 13.2.1 L995; 31-103CP 13.2.1 L1085; IDPC 3402(1)(i)(d) cost impact L6806; GN-LIETF (complex products) | OK |

### 1.17 Retail suitability determination (Apply): **R**
| Bullet | Governing text | Status |
|---|---|---|
| Relationship of KYC to recommendations | IDPC 3402(1) L6793-6810; 3402(4) L6844-6847; GN-KYC 3.1-3.2 L438-516; NI31-103 13.3 L1023; 31-103CP 13.3 L1289; GN-BORROW 2.1 L67 | OK |
| Avoiding excessive switches (churning) | No corpus text uses the word "churning". Nearest texts: IDPC 3945(2)(iii) "excessive trading" L10008 (supervision); 31-103CP "Switch or change transactions" L3256-3270; IDPC 3402(1)(i)(d) cost impact L6806 | **PARTIAL** |

### 1.18 Unsolicited or unsuitable instructions (Understand): **R**
| Bullet | Governing text | Status |
|---|---|---|
| RR and dealer obligations | IDPC 3402(5) L6848-6855; IDPC 3404 exemptions L6910; GN-KYC 3.4.3 L592, 3.10 L716; IDPC 3241 L6136 and GN-OEO 2.1 L86 (OEO: no recommendations) | OK |

### 1.19 Types of investment action (Apply): **R**
| Bullet | Governing text | Status |
|---|---|---|
| Purchase, sell, hold, deposit, exchange, transfer | IDPC 3402(1) L6793-6797 (purchase, sell, withdraw, exchange, transfer-out, "any other investment action"); 3402(2)(i) deposit/transfer-in L6815; GN-KYC 3.1.2 "investment action" L452-457 (includes a decision to hold, L456) | OK |

### 1.20 Account appropriateness vs suitability (Analyze): **R**
| Bullet | Governing text | Status |
|---|---|---|
| The difference | IDPC 3211 L5670 vs 3402 L6792; IDPC 3402(3) L6827-6843; GN-KYC 3.3-3.3.4 L517-567; GN-OEO 2.2 L110 | OK |

### 1.21 Monitoring accounts; trigger events (Analyze): **R**
| Bullet | Governing text | Status |
|---|---|---|
| Firm and regulatory requirements; triggering events | IDPC 3402(2)(i)-(v) L6811-6826; 3209(3)-(4) L5647-5654; GN-KYC 3.4-3.4.4 L568-636; IDPC 3926 L9948, 3927 L9970, 3945 L9997, 3948 L10075 | OK |

### 1.22 Impact of changes on suitability (Analyze): **R+C**
| Bullet | Governing text | Status |
|---|---|---|
| Material change to client circumstances | IDPC 3402(2)(iii) L6819-6821; 3209(3) L5647; GN-KYC 2.11.2 L414-426, 3.4.4 L601 | OK |
| Product and market research | IDPC 3402(2)(iv) change in a security L6822-6824; GN-KYP "Monitor and review significant changes" L181 | OK |
| Economic, political, social events; emerging issues and trends | **C** (re-derive) | n/a |

### 1.23 Managing conflicts of interest (Apply): **R**
| Bullet | Governing text | Status |
|---|---|---|
| Identifying, avoiding, addressing, disclosure | IDPC 3110 L4930, 3111 L4947, 3112 L4957, 3113 L4965; 3116 gratuity L5068; 3117 mutual fund sales incentives L5075; 3118 tied selling L5104; NI31-103 13.4-13.4.1 L1101-1167; 31-103CP L1543+; SN-31-363 L139-454; GN-CRM L113-174; N-16-0068; GN-MFSI; GN-NAL | OK |

### 1.24 Outside activities (Apply): **R**
| Bullet | Governing text | Status |
|---|---|---|
| Definition, pre-approval, disclosure | IDPC 2554 L3774; IDPC 3623 (research analysts) L7540; GN-OA 1-5 L51-176; 31-103CP L1901-1930 | OK |

### 1.25 Personal financial dealings with clients (Apply): **R**
| Bullet | Governing text | Status |
|---|---|---|
| Accepting any consideration | IDPC 3115(2)(i) L5003-5015 | OK |
| Settlement agreements | IDPC 3115(2)(ii) L5016-5020; IDPC 3710 L7822; 3711 L7833 | OK |
| Borrowing from clients; lending to clients | IDPC 3115(2)(iii) L5021, (iv) L5034; NI31-103 13.12 L1326; 31-103CP 13.12 L2556 | OK |
| Control or authority | IDPC 3115(2)(v) L5054; 31-103CP L1851-1853, L2179-2185 | OK |
| Comingling of assets or funds (business partnerships, investment clubs) | Not named in IDPC 3115. MSN-0047 L42 (investment clubs) and L50 (business arrangements) is MFDA-era guidance for mutual fund dealers. No text addresses commingling of client and Approved Person assets | **PARTIAL** |

### 1.26 Conflicts policies and procedures (Understand): **R**
| Bullet | Governing text | Status |
|---|---|---|
| Effective controls and qualified supervision; due diligence for approvals; record-keeping | IDPC 3114 L4996; SN-31-363 P&P L455, training L478, record keeping L494-523; IDPC 3804(2)(xvi)-(xvii) L8365-8371; GN-OA 3.5 L105, 4 L127; N-17-0093; CR-2026 L234 | OK |

### 1.27 CIRO standards of conduct (Apply): **R**
| Bullet | Governing text | Status |
|---|---|---|
| RR and client; RR and firm | IDPC 1402 L1188; 1403 L1202; IDPC 3102 business conduct L4921 | OK |

---

## Element 2: Fixed income

### 2.1 Debt market requirements (Understand): **R**
| Bullet | Governing text | Status |
|---|---|---|
| General requirements (fair and efficient debt markets) | IDPC 7101 L20974; 7102 L20988 | OK |
| Policies and procedures: requirement and content | IDPC 7103 L20995-21030 (front-running prohibition at 7103(2)(iii) L21003); 7104-7108 L21031-21084 | OK |
| Prohibited practices (dealer; Approved Person) | IDPC 7109 L21085, 7110 L21099, 7112(1)-(2) L21127-21139; GN-DEBT | OK |

### 2.2 Types and features of fixed-income products: **C**
Includes GoC, provincial, municipal and corporate debt, and GICs. Re-derive. Note: GIC deposit insurance (CDIC) is not in the corpus. If a stem relies on it, treat that as a regulatory claim with no source and do not use it.

### 2.3 Fixed-income terminology: **C**

### 2.4 Characteristics, risks, costs of fixed income: **C**
For mark-up disclosure context, the strip-bond dealer mark-up passage is at BR-STRIP L236-255. That quote is optional; the outcome stays C.

### 2.5 Strips, floating, callable/puttable, convertible, extendable, sinking/purchase funds (Understand): **R+C**
| Bullet | Governing text | Status |
|---|---|---|
| Strips: features and risk-return profile | BR-STRIP (mandatory disclosure) L134-255: creation L141, packages L148, strips vs conventional bonds L153, mark-ups L236, price formula L256 | OK |
| Floating rate, callable/puttable, convertible, extendable, sinking/purchase funds | **C** | n/a |

### 2.6 Bond yield calculations: **C**
State the approximate-YTM formula variant used.

### 2.7 Price–yield relationships, duration: **C**

### 2.8 Modified duration price change: **C**

### 2.9 Time value of money for bonds: **C**

---

## Element 3: Equities

### 3.1 Prospectus requirement (NI 41-101) and exemptions (NI 45-106) (Understand): **R**
| Bullet | Governing text | Status |
|---|---|---|
| The requirement and its purpose; primary and secondary distributions | NI41-101 Part 2 L937-1023; 41-101CP 1.2 interrelationship L192-200 (the requirement itself sits in provincial Securities Acts, which are **not** in the corpus); "full, true and plain disclosure" 41-101CP L554, L1771. Secondary/control distributions: only incidental references (NI41-101 L1818; 41-101CP L1688-1692); NI 45-102 is not in the corpus | **PARTIAL** |
| Application to takeovers | NI45-106 s.2.16 L2057-2058 (prospectus exemption for take-over and issuer bids). NI 62-104 (the bid regime) is not in the corpus | **PARTIAL** |
| Comprehensive disclosure | 41-101CP L554, L1771; NI41-101 Part 3 form of prospectus L1242 | OK |
| Advertising and marketing | NI41-101 Part 13 L1632, Part 13A L2401; 41-101CP Part 6 L1163-1260 | OK |
| Timely disclosure | NP51-201 Part II L99-182; NI51-102 Part 7 material change L2484-2486+ | OK |
| Exempt market securities; private placements; accredited investor | NI45-106 definitions "accredited investor" L198, "eligible investor" L393, "financial assets" L430; s.2.3 L1211, 2.4 private issuer L1254, 2.5 L1351, 2.9 OM L1440, 2.10 minimum amount L1979; 45-106CP 1.9 L187, 3.5 L753-870, 3.6 L871; F45-106F9 | OK |

### 3.2 Classes of common shares: **C**
Optional legal context: GOV ISED "Share structure and shareholders" L136-393.

### 3.3 Canadian depositary receipts: **C**
No regulatory text on CDRs is in the corpus. CDR features are a product concept.

### 3.4 Investing in common shares and DRs: risks and costs: **C**

### 3.5 Common share ownership: advantages and disadvantages: **C**

### 3.6 Corporate actions (Understand): **R+C**
| Bullet | Governing text | Status |
|---|---|---|
| How dividends are taxed | ITA `gov/ita-dividends-gross-up-dtc.txt` s.82(1) L3, s.121 L26, s.89(1) eligible dividend L38; CRA `investment-income-…txt` L186-549 (gross-up table L236) | OK |
| How dividends are declared and claimed; splits and consolidations; share buybacks | **C**. Normal-course issuer bid rules (NI 62-104, exchange rules) are not in the corpus, so keep buyback items conceptual | n/a |

### 3.7 Classes of preferred shares: **C**

### 3.8 Investing in preferred shares: risks and costs: **C**

### 3.9 Common vs preferred in scenarios: **C**

### 3.10 Equity valuation (DCF, P/E growth): **C**

---

## Element 4: Securities analysis

### 4.1 Company analysis (Analyze): **R+C**
| Bullet | Governing text | Status |
|---|---|---|
| All relevant documents and sources of information (what issuers must file) | NI51-102 Part 4 financial statements L776-1000, Part 5 MD&A L2184, Part 6 AIF L2454-2462, Part 7 material change L2484; NP51-201 | OK |
| Clear explanations to retail clients; consulting internal and external experts | **C** | n/a |

### 4.2 Statement of financial position; statement of changes in equity: **C**
IFRS is not in the corpus.

### 4.3 Statement of comprehensive income: **C**

### 4.4 Statement of cash flows: **C**

### 4.5 Notes to the financial statements; auditor's report (Understand): **R+C**
| Bullet | Governing text | Status |
|---|---|---|
| Auditor's report (requirement for audited annual statements) | NI51-102 s.4.1 L778-828, 4.2 filing deadline L829 | OK |
| Notes to the financial statements (content and purpose) | **C** | n/a |

### 4.6 Financial ratios: **C**

### 4.7 Value ratios; trend analysis: **C**

### 4.8 Market information from exchanges and regulators; CTOs (Understand): **R+C**
| Bullet | Governing text | Status |
|---|---|---|
| Restrictions including cease trade orders | UMIR 9.1 regulatory halts, delays and suspensions L12053-12110 (CTO-related note at L12140). The power to issue a CTO and its definition sit in provincial Securities Acts, which are not in the corpus. 41-101CP L1788 has an incidental mention | **PARTIAL** |
| Price, volume, yields, market capitalization data | **C** | n/a |

### 4.9 Market indices: **C**
### 4.10 Using indices for market summaries and benchmark performance: **C**
### 4.11 Methods of assessing stock market behaviour: **C**
### 4.12 Industry and sector classification: **C**
### 4.13 Macroeconomic factors: **C**
### 4.14 Other factors over time horizons: **C**

---

## Element 5: Managed products and other investments

### 5.1 Types of managed products (Understand): **R+C**
| Bullet | Governing text | Status |
|---|---|---|
| Regulatory definitions: alternative mutual fund, non-redeemable investment fund, index participation unit, fund of funds | NI81-102 "alternative mutual fund" L220; "non-redeemable investment fund" L615; "index participation unit" L518; s.2.5 fund of funds L1257; 81-102CP 2.01 L149 | OK |
| Mutual fund trust vs corporation; income trusts; closed-end funds; REITs; ETFs; wrap/ETF wrap; pooled funds | **C** for the product descriptions. Not in corpus: the definition of "mutual fund" (provincial Securities Acts) and income-trust/REIT/SIFT tax status (ITA s.122.1) | **PARTIAL** (statutory definitions) |

### 5.2 Considerations for investors in managed products: **C**

### 5.3 Mutual funds: access, structure, participants, fees, daily pricing (Understand): **R+C**
| Bullet | Governing text | Status |
|---|---|---|
| Access to mutual funds in Canada | NI81-101 s.3.2.01 pre-sale delivery of Fund Facts by the dealer L1316. The dealer registration categories (NI 31-103 Part 7) are trimmed from the corpus | **PARTIAL** |
| Participants (trustee, manager, distributor, custodian) | NI81-102 "custodian" L317; 81-102CP 2.9 "manager" L302; **C** for roles. Part 6 custodianship is trimmed | PARTIAL |
| Fee structures | F81-101F3 Part II Item 1 L700-942 (sales charge options, MER/TER L786, trailing commission); IDPC 3117 L5075 | OK |
| Daily pricing | NI81-102 s.9.3 issue price L2406 and s.10.3 redemption price L2634 (NAV next determined); NI81-102 "net asset value" L602. NI 81-106 (NAV calculation frequency) is not in the corpus | **PARTIAL** |

### 5.4 Mutual fund considerations; risk-ranking methodology (Analyze): **R+C**
| Bullet | Governing text | Status |
|---|---|---|
| Risk-ranking methodologies | NI81-102 Part 15.1 L3615-3629, Appendix F L3630+; F81-101F3 Item 4 Risks L370 | OK |
| Advantages and disadvantages; sources of risk and return | **C** | n/a |

### 5.5 ETFs (Analyze): **R+C**
| Bullet | Governing text | Status |
|---|---|---|
| Access (ETF Facts delivery) | NI41-101 Parts 3B-3D L1260-1631; 41-101CP Part 5A L939 | OK |
| Pricing: market price vs NAV; trading | F41-101F4 Item 2 L236, Item 6 "Trading ETFs" L896-933 | OK |
| Use of leverage | NI81-102 s.2.6 L1465, 2.6.2 L1593, "alternative mutual fund" L220; GN-LIETF | OK |
| Cost structures | F41-101F4 Part II Item 1 L969-1134 | OK |
| Creation/redemption mechanism; management styles; ETFs vs mutual funds | **C** | n/a |

### 5.6 Fund management styles (Understand): **R+C**
| Bullet | Governing text | Status |
|---|---|---|
| Leveraged funds; inverse funds | GN-LIETF L50-84 (suitability, communications, supervision); NI81-102 2.6 L1465 | OK |
| Active and passive; smart beta / factor | **C** (NI81-102 "index mutual fund" L508 is optional) | n/a |

### 5.7 Information sources; Fund Facts and ETF Facts requirement (Understand): **R**
| Bullet | Governing text | Status |
|---|---|---|
| Fund Facts requirement and content | NI81-101 Part 2 L348, s.3.2.01 L1316, 3.2.1 L1567, 3.2.2 L1584; F81-101F3 (whole) | OK |
| ETF Facts ("EFT fact sheets" in the syllabus) | NI41-101 Parts 3B-3D L1260-1631; F41-101F4 (whole) | OK |
| Other information sources | NI81-101 3.3 documents on request L1602 | OK |

### 5.8 Fund performance evaluation (HPR, MWRR, TWRR, benchmarks): **C**

### 5.9 Valuation and performance of managed funds (Apply): **R+C**
| Bullet | Governing text | Status |
|---|---|---|
| Pricing of units (NAVPS) | NI81-102 9.3 L2406, 10.3 L2634, "net asset value" L602 | OK |
| Standard performance data and total return | NI81-102 15.6 L3185, 15.8 L3272, 15.9 L3328; 81-102CP 2.11 "performance data" L309 | OK |
| Benchmark properties ("specified in advance, appropriate…") | **C** (textbook criteria) | n/a |

### 5.10 Impact of costs (Understand): **R+C**
| Bullet | Governing text | Status |
|---|---|---|
| MER and TER; loads and charges | F81-101F3 Part II Item 1 L700-942 (MER L786); F41-101F4 Part II Item 1 L969 | OK |
| Withholding tax, recoverable and unrecoverable | ITA `gov/ita-foreign-income-withholding-tax.txt` s.126 L3, s.212 L54; GOV `canada-us-tax-convention-consolidated.txt` Art. X L268, Art. XXI L572; CRA `investment-income-…txt` foreign tax credit L550 | OK |
| Taxes on the fund and on the investor | CRA `capital-gains-losses-…txt` "Tax treatment of mutual funds" L1570-1813 | OK |
| Turnover | **C** | n/a |

### 5.11 Redemptions: T-SWPs, withdrawal plans, gating (Analyze): **R+C**
| Bullet | Governing text | Status |
|---|---|---|
| Suspension of redemptions (gating) | NI81-102 10.6 L2766; 10.1-10.4 L2515-2700 | OK |
| Tax consequences (return of capital and ACB) | CRA `capital-gains-losses-…txt` L1606, L1704 | OK |
| T-SWP and withdrawal-plan mechanics | **C** | n/a |

### 5.12 Managed vs non-managed products: **C**

### 5.13 Alternative strategy funds and alternative assets (Understand): **R+C**
| Bullet | Governing text | Status |
|---|---|---|
| Alternative investment funds; crypto assets | NI81-102 "alternative mutual fund" L220-224 (covers crypto assets), s.2.3; 81-102CP 2.01 L149 | OK |
| Hedge funds, structured products, private equity, venture capital | **C**. Principal Protected Notes Regulations and other rules for structured products are not in the corpus | **PARTIAL** (structured-product rules) |

### 5.14 Characteristics of alternative funds and other investments (Analyze): **R+C**
| Bullet | Governing text | Status |
|---|---|---|
| Accredited investor requirement | NI45-106 "accredited investor" L198, s.2.3 L1211; 45-106CP 3.5 L753-870; F45-106F9 | OK |
| Performance fees (regulated aspects) | NI81-102 Part 7 incentive fees L2294 | OK |
| Structure, features, fees, hurdle rates, advantages and disadvantages, risks, costs | **C** | n/a |

---

## Element 6: Portfolio construction

### 6.1 Asset allocation process: **C**

### 6.2 Types of risk (Understand): **R+C**
| Bullet | Governing text | Status |
|---|---|---|
| Financial crime risk | GN-AML 5 key risk indicators L395-473, 6 suspicious transactions L474+; CR-2025 AML effectiveness review (≈L325). The PCMLTFA statute and FINTRAC guidance are not in the corpus | **PARTIAL** (statute) |
| Interest rate, inflation, liquidity, capital, income, issuer risk | **C** | n/a |

### 6.3 Risk measures: **C**

### 6.4 Risk management, hedging, diversification: **C**

### 6.5 Short-selling risk management and margin (Apply): **R+C**
| Bullet | Governing text | Status |
|---|---|---|
| The short-selling process (regulatory) | UMIR 1.1 "short sale" L2463; UMIR 3.2 L5435; 3.3 L5575 (amended Aug 2026); 6.2 designations L6955; IDPC 4780-4782 L13935-13960 (new); GN-SSFAIL; GN-SSDES | OK |
| Margin requirements for long and short positions | IDPC 5113 L14780-14800; 5310 L16148 (check rate bands against the PDF); F1S4 Note 5 L104 | OK |
| Associated risks (unlimited loss, recall, squeeze) | **C** | n/a |

### 6.6 MPT, diversification, Black–Litterman, Monte Carlo: **C**
### 6.7 Asset pricing models: **C**
### 6.8 CAPM calculations: **C**
### 6.9 EMH implications: **C**
### 6.10 Active equity management techniques: **C**
### 6.11 Passive equity techniques: **C**
### 6.12 Fixed-income portfolio techniques: **C**

---

## Element 7: Investment recommendations

### 7.1 Objectives, risk profile and performance: **C**
Optional R anchor: GN-KYC L230 (investment goals and IPS).

### 7.2 Non-financial constraints (EDI, ESG, preferences): **C**
The analysis of their impact is concept. If a stem asserts that the firm must collect this information, it is R: quote GN-KYC L228, as under 1.2.

### 7.3 Behavioural finance biases: **C**

### 7.4 Suitability in scenarios (Apply): **R+C**
| Bullet | Governing text | Status |
|---|---|---|
| Selecting suitable products | IDPC 3402(1) L6793-6810; GN-KYC 3.2 L476-516 | OK |
| Impact of the dealer's product shelf | IDPC 3402(1)(i)(e) "reasonable range of alternative actions available … through the Dealer Member" L6807-6809; GN-KYC 3.2.4 L502; 31-103CP L1701-1715 (product shelf) | OK |
| Client's net worth and liquidity needs | GN-KYC 2.3.2 L191-223, 3.2.3 L489-501; IDPC 3402(1)(i)(c) L6803-6805 | OK |
| Cash management and savings strategies | **C** | n/a |
| Features of government pension programs | GOV `cpp-pages.txt` L4-757 (eligibility L110, start L194, amounts L246-435); GOV `oas-gis-pages.txt` (OAS L4-768, recovery tax L674, GIS L769-1000, Allowance L1001-1149). **QPP is not in the corpus** | **PARTIAL** (QPP) |

### 7.5 Choosing a portfolio from KYC (Apply): **R+C**
| Bullet | Governing text | Status |
|---|---|---|
| Resolving conflicts between client expectations and risk profile | GN-KYC L277 | OK |
| Needs, objectives and risk profile as inputs | GN-KYC 2.3.3 L224, 2.3.5 L246 | OK |
| Portfolio composition and shortfall; strategies; cash-flow analysis | **C** | n/a |

### 7.6 Factors in addressing investment actions (Apply): **R**
| Bullet | Governing text | Status |
|---|---|---|
| Impact of significant KYC changes | IDPC 3402(2)(iii) L6819; GN-KYC 2.11.2 L414 | OK |
| Unexpected impact on the account (concentration, liquidity) | IDPC 3402(1)(i)(c) L6803-6805; GN-KYC 3.2.3 L489-501 | OK |
| Potential and actual impact of costs | IDPC 3402(1)(i)(d) L6806; GN-KYC 3.2.5 L506-516 | OK |
| Reasonable range of alternative actions | IDPC 3402(1)(i)(e) L6807-6809; GN-KYC 3.2.4 L502-505 | OK |

### 7.7 Recommendation process (Analyze): **R+C**
| Bullet | Governing text | Status |
|---|---|---|
| Explaining pros, cons and risks of each product and action | GN-KYP "Explain key product features to your clients" L261-267; IDPC 3402(5)(i)-(ii) L6851-6853 (for unsuitable instructions) | OK |
| What the action can accomplish; securing the client's commitment | **C** | n/a |

### 7.8 TVM for financial goals (annuities): **C**

### 7.9 Personal and corporate tax planning (Apply): **R+C**
| Bullet | Governing text | Status |
|---|---|---|
| FHSA | CRA `fhsa-pages.txt` (opening L78, participating L316, withdrawals L1190, deductions L1768, excess L2114, investments L2733, definitions L3015); ITA `ita-registered-plans-…txt` s.146.6 L260-355 | OK |
| RRSP (incl. spousal, HBP, LLP, RRIF) | CRA `rrsp-rrif-hbp-pages.txt` (L4-797); CRA T4040 guide; ITA s.146 L3-126, 204.1(2.1) L149; ITR s.7308 RRIF factors; CRA `registered-plan-limits-…txt` | OK |
| RESP | CRA RC4092 guide; GOV `resp-cesg-clb-esdc-pages.txt` (CESG L58, CLB L478, EAP L546); ITA s.146.1 L356-433, 204.9 L434 | OK |
| TFSA | CRA `tfsa-pages.txt` (room L351, over-contribution L590, withdrawals L659, death L1164-1510, non-residency L1511); ITA s.146.2 L153, 207.01 L189 | OK |
| Claiming all deductions and credits | CRA `investment-income-…txt` DTC L288 and FTC L550; CRA `tax-rates-brackets-…txt` | OK |
| Income splitting | ITA `ita-attribution-income-splitting.txt` s.74.1 L3, 74.2 L18, 74.5 L66, 120.4 TOSI L222-293, 60.03 pension splitting L163; CRA `income-splitting-…txt` (pension splitting L4, prescribed rates L182-895, TOSI L896) | OK |
| Tax-loss harvesting (superficial loss) | ITA `ita-capital-gains-…txt` s.54 "superficial loss" L189, 40(2)(g) L131; CRA `capital-gains-…txt` L724 | OK |
| Corporations: active vs passive, integration, CDA, RDTOH, GRIP | ITA `ita-corporate-integration-…txt` s.123-125 L3-107, 123.3 L7, 129 RDTOH L113-176, 89(1) CDA L192 and GRIP, 186 L177; CRA T4012 GRIP L10251, RDTOH L8774-8800; CRA `corporations-tax-rates-types-pages.txt` | OK |
| The strategies and their advantages (planning logic) | **C** | n/a |

### 7.10 Capital gains system (Apply): **R+C**
| Bullet | Governing text | Status |
|---|---|---|
| Tax treatment of gains and losses: inclusion rate, ACB, identical properties, carryover | ITA s.38 L3, 39 L31, 40 L66-149, 47 L150, 53 L203, 111 L322; CRA `capital-gains-…txt` (ACB L76, inclusion rate L130, capital losses L540, definitions L1060, net capital losses L2464); CRA T4037 | OK |
| Calculations and minimization strategies | **C** (rates and rules quoted as R) | n/a |

### 7.11 Income tax on investment income (Apply): **R+C**
| Bullet | Governing text | Status |
|---|---|---|
| Tax payable (rates and brackets) | ITA `ita-individual-tax-rates-brackets.txt` s.117(2) L3, 117.1 L12; CRA `tax-rates-brackets-individuals-2025-2026.txt` (2026 L4, 2025 L250) | OK |
| Interest | CRA `investment-income-…txt` line 12100 L4-185 (annual accrual, compound GIC example L104) | OK |
| Dividends: eligible, non-eligible, foreign | ITA s.82(1), 121, 89(1) (`ita-dividends-…txt`); CRA L186-549 (gross-up L236, DTC L288, eligible dividends L518); foreign: ITA s.126 and CRA FTC L550 | OK |
| The calculations | **C** (recompute) | n/a |

### 7.12 Complaints handling (Apply): **R**
| Bullet | Governing text | Status |
|---|---|---|
| Recognition | IDPC 3720-3721 L7873-7894 (definition and application); IDPC 3702 L7650 (Approved Person reporting to firm) | OK |
| Process | IDPC 3722 L7895, 3723 L7901, 3724 L7934, 3725 acknowledgement within 5 business days L7942-7967; GN-OBSI; N-09-0363 (historical) | OK |
| Resolution | IDPC 3726 L7968-8008 (90-day response, OBSI); 3727 L8009; OBSI-how L10-21 (90 days, 180 days); OBSI-FAQ L49-59 ($350,000, non-binding, reconsideration); BR-COMPL L78-121 | OK |
| Reporting | IDPC 3703 L7673; 3786 L8041; 3728 client complaint file L8016; GN-CRR | OK |
| Prohibited practices | IDPC 3711 release L7833-7837 (confidentiality clauses may not bar complaints to regulators); 3710 L7822 | OK |

---

## Element 8: Execution and market integrity

### 8.1 UMIR: best execution, abusive trading, front running (Apply): **R**
| Bullet | Governing text | Status |
|---|---|---|
| Best execution | IDPC 3119-3129 L5112-5320 (3120 L5146, 3121 L5149, 3123 L5221, 3129 L5306); UMIR 5.1 (repealed, now in IDPC) L5893; GN-BESTEX (whole; PFOF L312, OEO L316) | OK |
| Specific unacceptable activities | UMIR 2.1 L3457 | OK |
| Manipulative and deceptive practices; artificial pricing | UMIR 2.2 L4109, Policy 2.2 L4133, Part 3 artificial pricing L4223; GN-MANIP; IDPC 7109 L21085 | OK |
| Improper orders and trades | UMIR 2.3 L5082; GN-TSUP L103-107 (wash trades, etc.) | OK |
| Front running | UMIR 4.1 L5714, Policy 4.1 L5745; IDPC 7103(2)(iii) L21003 | OK |

### 8.2 Gatekeeper responsibilities (Apply): **R**
| Bullet | Governing text | Status |
|---|---|---|
| Purpose of gatekeeper obligations; reporting obligations to firms and regulators | UMIR 10.16 L14073; GN-GATE L75-158; IDPC 3702 L7650, 3703 L7673 | OK |
| Typical client activity and patterns; identifying and escalating suspicious transactions | GN-AML 4.3.4 L261, 5 L395-473, 6 L474+; IDPC 3945 L9997; GN-TSUP. PCMLTFA and FINTRAC STR text are not in the corpus | **PARTIAL** (statute) |
| Possible insider trading activity and violations | GN-INSM (insider and significant-shareholder markers); UMIR 6.2 L6955; NP51-201 Part III L183+ (summary of statutory tipping and insider-trading prohibitions). The statutory prohibitions (e.g. Securities Act (Ontario) s.76) are not in the corpus | **PARTIAL** |
| Applicable regulatory frameworks on whistleblowers | CIRO-WB (whole); OSC-15-601 (whole); OSC-WB. The statutory anti-reprisal provision (OSA s.121.5) and non-Ontario programmes (e.g. AMF) are not in the corpus | **PARTIAL** |

### 8.3 Order types (Apply): **R+C**
| Bullet | Governing text | Status |
|---|---|---|
| Limit order; market order | UMIR 1.1 "limit order" L1552, "market order" L1631 | OK |
| Iceberg orders | UMIR 1.1 "disclosed volume" L941 (undisclosed portion); otherwise **C** | PARTIAL (no UMIR term "iceberg") |
| Immediate-or-cancel; fill-or-kill | No definition in UMIR, IDPC or any guidance in the corpus. UMIR "Special Terms Order" L2569 is related but different | **GAP**: treat as C |
| On-stop orders | GN-STOP L64-128 | OK |
| Short sales | UMIR 1.1 L2463, 3.2 L5435, 3.3 L5575, 6.2 L6955; GN-SSDES; GN-SSFAIL | OK |
| Matching order types to client requirements | **C** | n/a |

### 8.4 Trade execution and settlement (Apply): **R+C**
| Bullet | Governing text | Status |
|---|---|---|
| Awareness of the various marketplaces | UMIR 1.1 "marketplace" L1676 (defined by reference to the CIRO By-law, which is not in the corpus); UMIR 6.4 L7578; IDPC 3121 L5149; GN-BESTEX 1.3 L171; GN-EXTH. NI 21-101 is not in the corpus | **PARTIAL** |
| Placing orders, including handling order errors and changes | IDPC 3815(1)(i) L9197-9205 (records of modification and cancellation); UMIR 10.11 L13525, 10.12 L13712. No CIRO rule or guidance in the corpus sets an order-error correction process | **PARTIAL** |
| Settlement and delivery process | F1S4 "regular settlement date" L37-41 (defers to industry practice). The settlement cycle (T+1, NI 24-101) is not stated in the corpus; UMIR L2600 only mentions a T+1 notice | **GAP** (settlement cycle) |
| FX transactions and currency conversion | UMIR Policy 6.4 Part 6 foreign currency translation L7765-7773; CRA `investment-income-…txt` L598 (tax conversion rate); otherwise **C** | **PARTIAL** |
| Purpose and application of the cash account rule | F1S4 Note 7 L124-158 | OK |
| Restriction process on overdue cash accounts | F1S4 Note 7(vi) L159-175 (20 business days), 7(vii) L176-190, Note 8 L191+ | OK |

### 8.5 Long and short margin accounts; special margin situations; trading authorizations (Understand): **R**
| Bullet | Governing text | Status |
|---|---|---|
| Long and short margin accounts | IDPC 3245-3247 L6290-6310; 5110-5116 L14736-14833 (5113 L14780); 5310 L16148; F1S4 Note 5 L104 | OK |
| Special margin situations | No single definition. Mapped to: IDPC 5340 control blocks L16376; 5820-5825 account guarantees L20621-20752; 5830 hedge agreements L20753; 5360 index participation units L16409; 5450 mutual funds L16760. The GN-5300 series (e.g. loan value of significant positions) was not retrieved | **PARTIAL** |
| Specialized trading authorizations | IDPC 3220(1)(iii), (4) L6044-6059; 3247 L6303; 3252 L6372; 3274 L6580; 3278 L6636; 5825 L20705; 5830 L20753 | OK |

### 8.6 Reporting to clients (Understand): **R**
| Bullet | Governing text | Status |
|---|---|---|
| Confirming orders, including fees and commissions | IDPC 3816 L9219-9300; GN-CONF; GN-BKS "Trade confirmations" L76, L94; NI31-103 14.12 L2089 | OK |
| Dealer responsibility for confirmations and statements | IDPC 3808 L8499, 3809 L8648, 3845 L9558, 3846 L9568; GN-CONSOL; NI31-103 14.14 L2185. Future change: `csa/ni-31-103-amendment-2027-01-01-annex-b.txt` (not in force) | OK |

---

## Element 9: Monitoring, reporting and maintaining client relationships

### 9.1 Monitoring and evaluating portfolio performance (Apply): **R+C**
| Bullet | Governing text | Status |
|---|---|---|
| Client needs and circumstances (when a review is required) | IDPC 3402(2) L6811-6826; 3209(4) L5651-5654; GN-KYC 3.4.2 L583-591; IDPC 3926-3927 L9948-9993 | OK |
| Considering the market and the economy; evaluating performance | **C** | n/a |

### 9.2 Performance disclosure and measurement (Apply): **R+C**
| Bullet | Governing text | Status |
|---|---|---|
| How performance is measured and reported to clients | IDPC 3810 performance report L8702-8889; 3802 definitions ("position cost") L8148; 31-103CP 14.17 L3795 and App. E sample report | OK |
| Fees and charges for the product and the impact on returns | IDPC 3811 fee/charge report L8890; NI31-103 14.17 L2433, 14.17.1 L2649; 31-103CP L3876-3880; GN-CRMFAQ | OK |
| Transaction costs and tax implications of recommendations | IDPC 3402(1)(i)(d) L6806; tax: see 7.10 and 7.11 sources | OK (costs) / C (tax planning) |
| Comparative performance; multi-factor regression; proper use of benchmarks | **C**. Fund advertising rules at NI81-102 15.6-15.9 L3185-3340 are optional R | n/a |

### 9.3 Performance calculations (Sharpe, Treynor, Jensen, etc.): **C**

### 9.4 Communications with clients and the public (Apply): **R**
| Bullet | Governing text | Status |
|---|---|---|
| Obligations and best practices | IDPC 3602 L7282-7326; 3618 public comments L7473; GN-ADV (review L107, pre-use approval L130, research and market letters L143-159, supervision L211) | OK |
| Appropriate use of professional titles | IDPC 3640(2) L7574-7581; N-14-0073 L29-73 (cites legacy DMR 29.1/18.16; quote IDPC 3640 for the rule); 31-103CP 13.18 L2783 | OK |
| Misleading communications | IDPC 3640(1) L7563-7575; 3602(1) L7282-7293; NI31-103 13.18 L1503 | OK |
| Social media and other communications with the public | GN-ADV "Social Media Websites" L209, third-party communications L248, record retention L267-289; SN-31-369 (whole; misrepresentations L90, market manipulation L96, working with finfluencers L137); CR-2025 "Use of Social Media" L317 | OK |
| Off-channel communication issues | CIRO Compliance Report 2026 (`ciro/ciro-compliance-report-2026.txt`) s. 3.5 L228-232: client communications through non-approved channels; controls over approved channels, monitoring, training (literal term "off-channel" not used). Plus GN-ADV L277-289 (content decides; device type irrelevant; retention for permitted methods; may-consider personal-device policies); IDPC 3602(6) L7324; GN-BKS | OK (updated 2026-10-22, E9 fix round 1) |

### 9.5 Maintaining client records (Apply): **R**
| Bullet | Governing text | Status |
|---|---|---|
| Records for account appropriateness, suitability, KYC, KYP | IDPC 3804(2)(xii) L8360-8361; 3210 L5657; 3220 L6044; GN-KYC 3.5.2 L647 | OK |
| Records for conflicts of interest | IDPC 3804(2)(xvi) L8365; SN-31-363 L494-523 | OK |
| Sales practices; compensation arrangements; incentive practices, including those benefiting the dealer or RR | IDPC 3804(2)(xvii)(a)-(b) L8366-8371; N-17-0093; GN-MFSI | OK |
| Retention period and form | IDPC 3803 L8316; GN-CRR; GN-ADV L267-289; GN-BKS; UMIR 10.12 L13712. NI 31-103 s.11.5 is trimmed from the corpus, which does not matter because IDPC governs CIRO dealers | OK |

---

## Gap register

These are all the R bullets that are **GAP** (no governing text) or **PARTIAL** (text covers only part of the bullet). Before an item can be drafted on any of these points as an R claim, one of three things must happen:

- the missing text is fetched from an official domain into `sources/`;
- the claim is kept conceptual (C) and verified under Gate 2-C;
- the claim is left out.

| # | Outcome | Bullet | Status | What is missing | Likely fix (official source) |
|---|---|---|---|---|---|
| G1 | 1.1 | Clients resident in the US, snowbirds, other foreign jurisdictions | **GAP** | Any rule or guidance on dealing with US- or foreign-resident clients | CSA/CIRO cross-border guidance; provincial registration exemptions. US rules (SEC 15a-6) are outside the allowed domains |
| G2 | 1.1 | Changes in residence | PARTIAL | Securities-registration consequences of a client moving; departure tax (ITA s.128.1) | NI 31-103 Part 8 (bcsc.bc.ca); ITA s.128.1 (laws-lois) |
| G3 | 1.2 | EDI considerations | PARTIAL | No text names equity, diversity and inclusion (ESG and personal preferences are covered) | None found; keep EDI to the syllabus wording |
| G4 | 1.8 | Record of TCP refusal | PARTIAL | No IDPC requirement; CSA guidance only; NI 31-103 s.11.5 is trimmed | NI 31-103 Part 11 (bcsc.bc.ca) |
| G5 | 1.13 | Privacy | PARTIAL | PIPEDA and provincial privacy law | laws-lois.justice.gc.ca (PIPEDA) |
| G6 | 1.17 | Churning / excessive switches | PARTIAL | The term "churning" appears nowhere; only "excessive trading" (IDPC 3945(2)(iii)) and switch-transaction guidance | None needed; quote 3945(2)(iii) and 31-103CP L3256 |
| G7 | 1.25 | Commingling; business partnerships; investment clubs | PARTIAL | Not in IDPC 3115; only MFDA-era MSN-0047 (no commingling text) | Mutual Fund Dealer Rules (ciro.ca), if CIRO keeps an equivalent |
| G8 | 3.1 | Prospectus requirement itself; secondary distributions | PARTIAL | Provincial Securities Acts; NI 45-102 (resale) | NI 45-102 (bcsc.bc.ca); Securities Act (BC/ON) |
| G9 | 3.1 | Application to takeovers | PARTIAL | NI 62-104 bid regime (only the NI 45-106 s.2.16 exemption is present) | NI 62-104 (bcsc.bc.ca) |
| G10 | 4.8 | Cease trade orders | PARTIAL | CTO power and definition (securities acts); NP 11-207 | NP 11-207 (bcsc.bc.ca / osc.ca) |
| G11 | 5.1 | Statutory definitions: mutual fund; income trust/REIT/SIFT tax status | PARTIAL | Securities Act "mutual fund" definition; ITA s.122.1 | Securities Act (BC/ON); ITA s.122.1 (laws-lois) |
| G12 | 5.3 | Access to mutual funds (dealer categories); fund participants (custodianship) | PARTIAL | NI 31-103 Part 7; NI 81-102 Part 6 (trimmed) | Re-extract trimmed parts from PDFs already in `downloads/csa/` |
| G13 | 5.3 | Daily pricing (NAV calculation frequency) | PARTIAL | NI 81-106 s.14.2 | NI 81-106 (bcsc.bc.ca) |
| G14 | 5.13 | Structured products | PARTIAL | Principal Protected Notes Regulations | laws-lois.justice.gc.ca |
| G15 | 6.2 | Financial crime risk (statutory AML) | PARTIAL | PCMLTFA and its regulations; FINTRAC guidance | laws-lois.justice.gc.ca (PCMLTFA). fintrac-canafe.gc.ca is not on the allowed list |
| G16 | 7.4 | Government pension programs | PARTIAL | QPP (CPP, OAS and GIS are present) | retraitequebec.gouv.qc.ca (not on the allowed list), or keep CPP/OAS/GIS only |
| G17 | 8.2 | Suspicious transactions: STR obligation | PARTIAL | PCMLTFA / FINTRAC STR text (CIRO GN-AML present) | Same as G15 |
| G18 | 8.2 | Insider trading violations | PARTIAL | Statutory insider-trading and tipping provisions (NP 51-201 summary only) | Securities Act (Ontario) s.76 (ontario.ca, not on the allowed list) or Securities Act (BC) s.57.2 (bclaws, not on the allowed list) |
| G19 | 8.2 | Whistleblower frameworks | PARTIAL | Statutory anti-reprisal (OSA s.121.5); non-Ontario programmes | AMF programme (lautorite.qc.ca, not on the allowed list); CIRO and OSC are present |
| G20 | 8.3 | Iceberg orders | PARTIAL | UMIR has "disclosed volume" but no "iceberg" term | Treat as C |
| G21 | 8.3 | Immediate-or-cancel; fill-or-kill | **GAP** | No definition anywhere in the corpus | Treat as C; marketplace order-type documents are not on the allowed list |
| G22 | 8.4 | Marketplaces; order-error handling; FX conversion | PARTIAL | NI 21-101; CIRO By-law "marketplace" definition; no CIRO error-correction rule; client FX rules | NI 21-101 (bcsc.bc.ca); CIRO By-law (ciro.ca) |
| G23 | 8.4 | Settlement cycle (T+1) | **GAP** | NI 24-101 and any T+1 rule text | NI 24-101 (bcsc.bc.ca / osc.ca) |
| G24 | 8.5 | "Special margin situations" | PARTIAL | No defining text; GN-5300 series not retrieved | GN-5300-21-001 etc. (ciro.ca) |
| G25 | 9.4 | Off-channel communications | CLOSED (2026-10-22) | Literal term not used, but topic covered | CIRO Compliance Report 2026 L228-232 (non-approved channels) + GN-ADV L277-289 |

### Corpus caveats

These are not outcome gaps, but drafters must know them.

1. **The shared IDPC and UMIR copies are stale.** Quote the `ciro/*-2026-08-11.txt` files; the appendix gives the old line numbers. Deciding whether to refresh the shared copies is a cross-exam question.
2. **Legacy rule numbers in guidance.** Some guidance cites rule numbers that no longer exist; translate them to the current IDPC section before quoting the rule.
   - GN-ADV L269 cites "subsection 3603(6)". In the Aug-2026 IDPC, 3603-3605 are reserved and the retention rule is **3602(6)** (L7324-7326).
   - N-14-0073 cites IIROC Dealer Member Rules 29.1 and 18.16, which are now IDPC 3640 and 3602.
   - N-09-0363 cites DMR 2500/19/37.
3. **One wrong pointer.** The `IDPC-UMIR-POINTERS.md` row "IDPC 3900 (restricted/watch lists) L7459" actually points to IDPC **3615(2)** (discontinuing research coverage). For restricted and grey lists, quote GN-CIC L59-105. For supervision of trading in restricted securities, quote IDPC 3945(2)(iv) (L10009).
4. **Guidance that pre-dates rule changes.**
   - GN-SSFAIL (Dec 2024) pre-dates the Aug-2026 amendment to UMIR 3.3.
   - SVC (2019) pre-dates the TCP and temporary-hold rules.
5. **Risk-need and trust/agency concepts (1.1, 1.3)** have no regulatory text. They are C by design, not gaps.
6. **CSA texts that are guidance, not rule.** 31-103CP, 41-101CP, 45-106CP and 81-102CP are interpretive guidance and must be cited as guidance. NI 31-103 App. G exempts CIRO dealers from many Part 13-14 provisions. Where an IDPC equivalent exists, quote the IDPC as the operative rule for an investment dealer.

---

## Appendix: IDPC / UMIR line crosswalk

Each row gives a cited section's heading line in the **current** file (Aug 11, 2026; quote this one) and in the **shared** file (`research/sources/rules/`, Jan 2026). Subsection references in the tables above are offsets from these headings. The lines were generated by grepping both files for each section heading.

| Section | Heading (current file) | Current (Aug-2026) line | Shared (Jan-2026) line |
|---|---|---:|---:|
| IDPC 1201 | 1201. Definitions | L197 | L119 |
| IDPC 1402 | 1402. Standards of conduct | L1188 | L894 |
| IDPC 1403 | 1403. Applicability | L1202 | L908 |
| IDPC 2216 | 2216. Shared office premises | L1868 | L1377 |
| IDPC 2284 | 2284. Investor protection fund membership disclosure requirements for Deale | L2198 | L1672 |
| IDPC 2554 | 2554. The Approved Person’s activities outside of the Dealer Member | L3774 | L3035 |
| IDPC 3102 | 3102. Business conduct | L4921 | L3905 |
| IDPC 3110 | 3110. Responsibility to identify conflicts of interest | L4930 | L3914 |
| IDPC 3111 | 3111. Approved Person responsibility to address conflicts of interest | L4947 | L3928 |
| IDPC 3112 | 3112. Dealer Member responsibility to address conflicts of interest | L4957 | L3938 |
| IDPC 3113 | 3113. Responsibility to disclose conflicts of interest | L4965 | L3946 |
| IDPC 3114 | 3114. Conflicts of interest policies and procedures | L4996 | L3972 |
| IDPC 3115 | 3115. Personal financial dealings | L4999 | L3975 |
| IDPC 3116 | 3116. Offering gratuity | L5068 | L4040 |
| IDPC 3117 | 3117. Mutual fund sales incentives | L5075 | L4047 |
| IDPC 3118 | 3118. Tied selling | L5104 | L4071 |
| IDPC 3119 | 3119. Definitions | L5112 | L4079 |
| IDPC 3120 | 3120. Best execution obligation | L5146 | L4105 |
| IDPC 3121 | 3121. Best execution factors for listed security and listed derivative orde | L5149 | L4108 |
| IDPC 3122 | 3122. Best execution factors for over-the- counter security and over-the- c | L5181 | L4140 |
| IDPC 3123 | 3123. Best execution process | L5221 | L4175 |
| IDPC 3124 | 3124. Non- executing Dealer Member best execution policies and procedures | L5248 | L4198 |
| IDPC 3125 | 3125. Sending orders in bulk to foreign intermediaries | L5264 | L4214 |
| IDPC 3126 | 3126. Review of best execution policies and procedures | L5268 | L4218 |
| IDPC 3127 | 3127. Training | L5295 | L4241 |
| IDPC 3128 | 3128. Compliance with the Order Protection Rule | L5299 | L4245 |
| IDPC 3129 | 3129. Disclosure of best execution policies | L5306 | L4252 |
| IDPC 3201 | 3201. Introduction | L5442 | L4362 |
| IDPC 3202 | 3202. Know Your‐Client | L5501 | L4417 |
| IDPC 3203 | 3203. Identifying partnerships or trusts | L5544 | L4455 |
| IDPC 3204 | 3204. Identifying corporations | L5555 | L4466 |
| IDPC 3206 | 3206. Establishing identity | L5573 | L4484 |
| IDPC 3209 | 3209. Primary responsibility, delegation and obligation to keep current | L5643 | L4544 |
| IDPC 3210 | 3210. Definitions | L5657 | L4558 |
| IDPC 3211 | 3211. Account appropriateness | L5670 | L4572 |
| IDPC 3212 | 3212. Account information | L5695 | L4593 |
| IDPC 3213 | 3213. Account opening policies and procedures | L5718 | L4616 |
| IDPC 3214 | 3214. Opening new client accounts | L5745 | L4637 |
| IDPC 3216 | 3216. Relationship Disclosure | L5798 | L4684 |
| IDPC 3217 | 3217. Leverage risk disclosure statement | L5986 | L4847 |
| IDPC 3218 | 3218. Pre‐trade disclosure of charges | L6001 | L4862 |
| IDPC 3220 | 3220. Record keeping | L6044 | L4900 |
| IDPC 3221 | 3221. Prohibition against discretionary trading | L6060 | L4916 |
| IDPC 3222 | 3222. Conditions for temporary holds | L6068 | L4924 |
| IDPC 3230 | 3230. Rules applicable to advisory accounts | L6104 | L4955 |
| IDPC 3241 | 3241. Order execution only account services | L6136 | L4981 |
| IDPC 3245 | 3245. Rules applicable to margin accounts | L6290 | L5111 |
| IDPC 3246 | 3246. Margin requirements ‐ when to extend margin to clients | L6300 | L5121 |
| IDPC 3247 | 3247. Margin account agreement | L6303 | L5124 |
| IDPC 3252 | 3252. Derivatives trading agreement | L6372 | L5187 |
| IDPC 3254 | 3254. Derivatives risk disclosure statement | L6485 | L5284 |
| IDPC 3270 | 3270. Definitions | L6518 | L5317 |
| IDPC 3271 | 3271. Rules applicable to discretionary accounts and managed accounts | L6542 | L5335 |
| IDPC 3274 | 3274. Discretionary account agreement | L6580 | L5369 |
| IDPC 3277 | 3277. Opening a managed account | L6615 | L5404 |
| IDPC 3278 | 3278. Managed account agreement | L6636 | L5420 |
| IDPC 3279 | 3279. Persons authorized to deal with managed accounts | L6649 | L5433 |
| IDPC 3281 | 3281. Fees and remuneration | L6692 | L5471 |
| IDPC 3301 | 3301. Product Due Diligence | L6737 | L5491 |
| IDPC 3302 | 3302. Know-Your-Product | L6747 | L5501 |
| IDPC 3303 | 3303. Exemptions from Product Due Diligence and Know-Your-Product | L6755 | L5509 |
| IDPC 3402 | 3402. Retail client suitability determination requirements | L6792 | L5534 |
| IDPC 3404 | 3404. Exemptions from the suitability determination requirements | L6910 | L5642 |
| IDPC 3504 | 3504. Commission fees, service fees and other account related fees | L7055 | L5712 |
| IDPC 3508 | 3508. Inside information | L7108 | L5759 |
| IDPC 3509 | 3509. Premarketing | L7140 | L5787 |
| IDPC 3602 | 3602. Advertising | L7282 | L5852 |
| IDPC 3615 | 3615. Notice to discontinue coverage | L7444 | L6000 |
| IDPC 3618 | 3618. Public comments | L7473 | L6025 |
| IDPC 3619 | 3619. Policies and procedures on trading | L7477 | L6029 |
| IDPC 3620 | 3620. Prohibition on investment banking compensation | L7508 | L6052 |
| IDPC 3621 | 3621. Relationship with investment banking | L7514 | L6058 |
| IDPC 3622 | 3622. Quiet periods | L7527 | L6071 |
| IDPC 3623 | 3623. Outside activities | L7540 | L6084 |
| IDPC 3640 | 3640. Misleading communications | L7563 | L6096 |
| IDPC 3702 | 3702. Reporting by an Approved Person to the Dealer Member | L7650 | L6148 |
| IDPC 3703 | 3703. Reporting by a Dealer Member to the Corporation | L7673 | L6167 |
| IDPC 3710 | 3710. Entering into settlement agreements | L7822 | L6298 |
| IDPC 3711 | 3711. Release | L7833 | L6309 |
| IDPC 3720 | 3720. Retail client complaints | L7873 | L6345 |
| IDPC 3721 | 3721. Application | L7879 | L6351 |
| IDPC 3722 | 3722. Handling client complaints | L7895 | L6367 |
| IDPC 3723 | 3723. Complaint policies and procedures | L7901 | L6373 |
| IDPC 3724 | 3724. Client access | L7934 | L6402 |
| IDPC 3725 | 3725. Complaint acknowledgement letter | L7942 | L6410 |
| IDPC 3726 | 3726. Response to client complaints | L7968 | L6432 |
| IDPC 3727 | 3727. Duty to assist in client complaint resolution | L8009 | L6469 |
| IDPC 3728 | 3728. Client complaint file | L8016 | L6476 |
| IDPC 3786 | 3786. Client complaints | L8041 | L6501 |
| IDPC 3802 | 3802. Definitions | L8148 | L6529 |
| IDPC 3803 | 3803. General requirements for record retention periods | L8316 | L6719 |
| IDPC 3804 | 3804. General requirements to maintain records | L8321 | L6724 |
| IDPC 3808 | 3808. Client account statements | L8499 | L6879 |
| IDPC 3809 | 3809. Report on client positions held outside of the Dealer Member | L8648 | L7010 |
| IDPC 3810 | 3810. Performance report | L8702 | L7059 |
| IDPC 3811 | 3811. Fee/charge report | L8890 | L7220 |
| IDPC 3815 | 3815. Memoranda of orders, transactions and other instructions | L9197 | L7485 |
| IDPC 3816 | 3816. Trade confirmations | L9219 | L7511 |
| IDPC 3845 | 3845. Timing of the sending of documents to clients | L9558 | L7809 |
| IDPC 3846 | 3846. Client reporting responsibility | L9568 | L7819 |
| IDPC 3926 | 3926. Account supervision policies and procedures | L9948 | L8094 |
| IDPC 3927 | 3927. Reviews of account activity | L9970 | L8116 |
| IDPC 3945 | 3945. Daily and monthly trade supervision | L9997 | L8137 |
| IDPC 3948 | 3948. Supervision of suitability determination obligations | L10075 | L8209 |
| IDPC 4780 | 4780. Introduction | L13935 | **not present (new in Aug 2026)** |
| IDPC 4781 | 4781. Definitions | L13938 | **not present (new in Aug 2026)** |
| IDPC 4782 | 4782. Reasonable expectation to settle prior to the entry of an order for a | L13953 | **not present (new in Aug 2026)** |
| IDPC 5110 | 5110. Margin requirements - purposes | L14736 | L12022 |
| IDPC 5111 | 5111. Margin requirements - general application | L14745 | L12031 |
| IDPC 5112 | 5112. Application of margin requirements - Dealer Member inventory position | L14758 | L12044 |
| IDPC 5113 | 5113. Application of margin requirements - client account positions | L14780 | L12062 |
| IDPC 5114 | 5114. Client securities that are collateral for a margin debt | L14801 | L12083 |
| IDPC 5115 | 5115. Dealer Member’s rights in securities of indebted clients | L14806 | L12088 |
| IDPC 5116 | 5116. Dealer Member may buy or sell client securities | L14820 | L12098 |
| IDPC 5310 | 5310. Determining the basic margin requirement | L16148 | L13192 |
| IDPC 5340 | 5340. Control blocks | L16376 | L13384 |
| IDPC 5360 | 5360. Index participation units and qualifying baskets of index securities | L16409 | L13413 |
| IDPC 5450 | 5450. Margin requirements for mutual fund positions | L16760 | L13674 |
| IDPC 5820 | 5820. General account guarantee requirements | L20621 | L16944 |
| IDPC 5821 | 5821. Requirements for account guarantees by shareholders, Registered Repre | L20658 | L16978 |
| IDPC 5822 | 5822. Prohibited account guarantee arrangements | L20680 | L17000 |
| IDPC 5823 | 5823. Exception for immediate family | L20684 | L17004 |
| IDPC 5824 | 5824. Margin relief for guarantee agreements | L20687 | L17013 |
| IDPC 5825 | 5825. Account guarantee agreement minimum terms | L20705 | L17022 |
| IDPC 5830 | 5830. Hedge agreements | L20753 | L17066 |
| IDPC 7101 | 7101. Introduction | L20974 | L17297 |
| IDPC 7102 | 7102. General requirements | L20988 | L17311 |
| IDPC 7103 | 7103. Policies and procedures | L20995 | L17318 |
| IDPC 7104 | 7104. Trading personnel | L21031 | L17349 |
| IDPC 7105 | 7105. Confidentiality | L21042 | L17360 |
| IDPC 7106 | 7106. Resources and systems | L21067 | L17381 |
| IDPC 7107 | 7107. Conflicts of interest | L21073 | L17387 |
| IDPC 7108 | 7108. Duty to deal fairly | L21078 | L17392 |
| IDPC 7109 | 7109. Manipulative and deceptive practices in the debt markets | L21085 | L17399 |
| IDPC 7110 | 7110. Taking unfair advantage | L21099 | L17413 |
| IDPC 7112 | 7112. Prohibited practices | L21127 | L17436 |
| UMIR 1.1 | 1.1 Definitions ("limit order" L1552, "market order" L1631, "marketplace" L1676, "short sale" L2463, "Special Terms Order" L2569 in the current file) | L217 | L119 |
| UMIR 2.1 | 2.1 Specific Unacceptable Activities | L3457 | L2860 |
| UMIR 2.2 | 2.2 Manipulative and Deceptive Activities | L4109 | L3393 |
| UMIR 2.3 | 2.3 Improper Orders and Trades | L5082 | L4214 |
| UMIR Policy 2.2 | Policy 2.2 – Manipulative and Deceptive Activities (Part 3 artificial pricing at L4223; shared L3491) | L4133 | L3418 |
| UMIR 3.2 | 3.2 Prohibition on the Entry of Orders | L5435 | L4468 |
| UMIR 3.3 | 3.3 Reasonable expectation to settle prior to the entry of an order for a short sale (**amended Aug 11, 2026**) | L5575 | L4541 |
| UMIR 4.1 | 4.1 Frontrunning | L5714 | L4613 |
| UMIR Policy 4.1 | Policy 4.1 – Frontrunning | L5745 | L4645 |
| UMIR 5.1 | 5.1 Best Execution of Client Orders - Repealed | L5893 | L4748 |
| UMIR 5.3 | 5.3 Client Priority | L6326 | L5038 |
| UMIR 6.2 | 6.2 Designations and Identifiers | L6955 | L5517 |
| UMIR 6.4 | 6.4 Trades to be on a Marketplace | L7578 | L6046 |
| UMIR 9.1 | 9.1 Regulatory Halts, Delays and Suspensions of Trading | L12053 | L9324 |
| UMIR 10.11 | 10.11 Audit Trail Requirements | L13525 | L10224 |
| UMIR 10.12 | 10.12 Retention of Records and Instructions | L13712 | L10377 |
| UMIR 10.16 | 10.16 Gatekeeper Obligations of Directors, Officers and Employees of | L14073 | L10550 |

Current-file lines not in this table (Form 1, guidance notes, CSA, CRA and government files) have no shared-copy equivalent. The CIRO guidance files exist only in this exam's corpus.

