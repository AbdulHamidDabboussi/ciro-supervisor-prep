# Retail Securities Exam: corpus manifest (`research/sources/`)

Built and checked on **2026-10-22**. The table rows were generated from the directory listing, not from the corpus agents' reports. Every listed file exists, and each has a word count and line count from `wc`. The script found no unlisted text files under `research/sources/` (excluding `downloads/`) and no listed file that is missing. All files are 260 words or more. The two smallest (`ciro-official-brochures-page.txt` and `obsi-can-obsi-help.txt`) were read and are complete short web pages, not error pages.

**Read this before quoting:**

- **IDPC and UMIR: quote the August 11, 2026 files in `ciro/`.** The shared copies (IDPC dated 2026-01-08, UMIR material to 2026-01-13) are listed because the README names them, but ciro.ca has replaced them. These sections changed in substance:
  - new IDPC 4620-4630 (borrowing retail clients' fully paid securities)
  - new IDPC 4780-4782 (reasonable expectation to settle short sales)
  - amended UMIR 3.3
  - IDPC 3802: the defined term "cost" is now "position cost"

  `ciro/IDPC-UMIR-POINTERS.md` gives line numbers in both versions. Do not overwrite the shared copies without a decision, because the Supervisor exam still uses them.
- **Copyright isolation.** `Retail-Securities-Exam-Practice-Exam-EN.txt` is listed by file size only. It was not opened to build this manifest, and drafters never open it.
- **Retrieval date.** Every file was retrieved on 2026-10-22 unless a row says otherwise. The header of each file repeats its source URL, the retrieval date and the extraction method. Multi-page CRA and government sets also record each page's URL and "Date modified" in a `==== PAGE:` line.
- **ciro.ca HTML.** ciro.ca serves pages behind a JavaScript check, so its HTML pages were read in a browser. Only cleaned text was saved, so `downloads/ciro/` holds PDFs only. The Guide for Studying PDF also could not be saved by script; its text was extracted in the browser.
- **Interleaved columns.** Two-column brochure PDFs extract with the columns mixed together. Check any quote from them against the PDF in `downloads/ciro/`.

## Exam documents (top level)

| Path | Document | Issuer | URL | Version / consolidation date | Retrieved | Words | Lines |
|---|---|---|---|---|---|---:|---:|
| `Retail-Securities-Exam-Syllabus-EN.txt` | Retail Securities Exam Syllabus (layout-mode text; columns interleaved) | CIRO | https://www.ciro.ca/media/13541/download?inline | Last updated 2025-05-08 | 2026-10-22 | 5,422 | 658 |
| `syllabus-raw.txt` | Retail Securities Exam Syllabus, per-column reading-order extraction (pdfplumber) | CIRO | https://www.ciro.ca/media/13541/download?inline (local PDF official/) | Last updated 2025-05-08 | 2026-10-22 | 5,603 | 999 |
| `Retail-Securities-Exam-Practice-Exam-EN.txt` | Retail Securities Exam Practice Exam (CALIBRATION ONLY; drafters never open; not opened for this manifest) | CIRO | https://www.ciro.ca/media/13706/download?inline | Released with Bulletin 25-0212 (2025-07-21) | 2026-10-22 | n/a (85,126 bytes) | n/a |

## Shared corpus (repo root `research/sources/rules/`, referenced, not duplicated)

| Path | Document | Issuer | URL | Version / consolidation date | Retrieved | Words | Lines |
|---|---|---|---|---|---|---:|---:|
| `(repo)/research/sources/rules/idpc-rules.txt` | IDPC Rules (SHARED copy; superseded on ciro.ca by the Aug 11, 2026 consolidation) | CIRO | https://www.ciro.ca/media/16/download?inline (earlier file) | Consolidation 2026-01-08 | (Supervisor corpus) | 177,770 | 20,247 |
| `(repo)/research/sources/rules/umir.txt` | Annotated UMIR (SHARED copy; superseded on ciro.ca by the Aug 11, 2026 version) | CIRO | https://www.ciro.ca/media/7526/download?inline (earlier file) | Material to 2026-01-13 | (Supervisor corpus) | 127,253 | 12,837 |

## `ciro/`: CIRO rules, guidance, brochures, plus CIPF and OBSI

| Path | Document | Issuer | URL | Version / consolidation date | Retrieved | Words | Lines |
|---|---|---|---|---|---|---:|---:|
| `ciro/idpc-rules-2026-08-11.txt` | IDPC Rules — current consolidation (QUOTE FROM THIS) | CIRO | https://www.ciro.ca/media/16/download?inline (IDPC-Rules-081126-EN.pdf) | Consolidation 2026-08-11 | 2026-10-22 | 181,341 | 24,725 |
| `ciro/umir-2026-08-11.txt` | Annotated UMIR — current (QUOTE FROM THIS) | CIRO | https://www.ciro.ca/media/7526/download?inline (UMIR-08112026-EN.pdf) | Material to 2026-08-11 | 2026-10-22 | 131,653 | 17,259 |
| `ciro/IDPC-UMIR-POINTERS.md` | Derived index: IDPC/UMIR section → line numbers in both the Jan-2026 shared copies and the Aug-2026 copies (not a source document) | (derived) | n/a | Generated 2026-10-22 | 2026-10-22 | 5,096 | 503 |
| `ciro/idpc-form-1-schedule-4-cash-and-margin-accounts.txt` | IDPC Form 1 excerpt: definitions page + Part II Schedule 4/4A notes (margin accounts, cash-account rules, 20-business-day restriction) | CIRO | https://www.ciro.ca/media/36/download?inline (IDPC-Form-1-042726-EN.pdf) | Form 1 dated 2026-04-27 | 2026-10-22 | 3,594 | 308 |
| `ciro/gn-3400-21-004-kyc-suitability-retail-clients.txt` | GN-3400-21-004 Know-your-client and suitability determination for retail clients | CIRO (IIROC-era GN) | https://www.ciro.ca/newsroom/publications/know-your-client-and-suitability-determination-retail-clients | 2021-12-17 (eff. 2021-12-31) | 2026-10-22 | 11,183 | 832 |
| `ciro/gn-3100-21-001-client-relationship-model.txt` | GN-3100-21-001 Client Relationship Model | CIRO | https://www.ciro.ca/newsroom/publications/client-relationship-model-0 | 2021-10-14 (eff. 2021-12-31) | 2026-10-22 | 4,171 | 241 |
| `ciro/gn-3800-21-010-crm-faq.txt` | GN-3800-21-010 CRM Frequently Asked Questions | CIRO | https://www.ciro.ca/newsroom/publications/client-relationship-model-crm-frequently-asked-questions-0 | 2021-10-14 | 2026-10-22 | 12,247 | 725 |
| `ciro/gn-3300-21-001-product-due-diligence-kyp.txt` | GN-3300-21-001 Product due diligence and know-your-product | CIRO | https://www.ciro.ca/newsroom/publications/product-due-diligence-and-know-your-product | 2021-10-14 (eff. 2021-12-31) | 2026-10-22 | 3,424 | 333 |
| `ciro/gn-3300-21-001-appendix-a.txt` | GN-3300-21-001 Appendix A — Summary of exemptions | CIRO | https://www.ciro.ca/media/3410/download?inline=1 | file last-modified 2024-01-08 | 2026-10-22 | 606 | 168 |
| `ciro/gn-3200-26-001-oeo-account-services-activities.txt` | GN-3200-26-001 Order execution only account services and activities | CIRO | https://www.ciro.ca/newsroom/publications/guidance-order-execution-only-account-services-and-activities | 2026-03-12 | 2026-10-22 | 6,238 | 373 |
| `ciro/gn-3200-24-001-derivatives-risk-disclosure-statement.txt` | GN-3200-24-001 Derivatives Risk Disclosure Statement (incl. Attachment A statement text) | CIRO | https://www.ciro.ca/newsroom/publications/derivatives-risk-disclosure-statement | 2024-01-18 (eff. 2024-09-28) | 2026-10-22 | 1,283 | 93 |
| `ciro/gn-3200-22-001-borrowing-for-investment-purposes.txt` | GN-3200-22-001 Borrowing for investment purposes | CIRO | https://www.ciro.ca/newsroom/publications/guidance-borrowing-investment-purposes | 2022-10-25 | 2026-10-22 | 2,502 | 236 |
| `ciro/gn-3400-21-001-leveraged-inverse-etfs-sales-practices.txt` | GN-3400-21-001 Sales practice obligations — leveraged and inverse ETFs | CIRO | https://www.ciro.ca/newsroom/publications/sales-practice-obligations-relating-leveraged-and-inverse-exchange-traded-funds-0 | 2021-10-14 | 2026-10-22 | 1,567 | 104 |
| `ciro/gn-2500-22-001-outside-activities.txt` | GN-2500-22-001 Disclosure and approval of outside activities | CIRO | https://www.ciro.ca/newsroom/publications/disclosure-and-approval-outside-activities | 2022-06-06 | 2026-10-22 | 2,648 | 199 |
| `ciro/mfda-msn-0047-personal-financial-dealings-with-clients.txt` | MFDA Staff Notice MSN-0047 Personal financial dealings with clients (mutual fund dealer guidance, CIRO-hosted) | CIRO (ex-MFDA) | https://www.ciro.ca/newsroom/publications/personal-financial-dealings-clients-1 | 2005-10-03 (updated 2021-12-31) | 2026-10-22 | 1,241 | 76 |
| `ciro/gn-3500-21-001-confidential-information-containment.txt` | GN-3500-21-001 Guidelines for confidential information containment | CIRO | https://www.ciro.ca/newsroom/publications/guidelines-confidential-information-containment-0 | 2021-10-14 | 2026-10-22 | 1,252 | 120 |
| `ciro/gn-3600-21-002-advertisements-sales-literature-correspondence-social-media.txt` | GN-3600-21-002 Review of advertisements, sales literature and correspondence (incl. social media) | CIRO | https://www.ciro.ca/newsroom/publications/review-advertisements-sales-literature-and-correspondence | 2021-10-14 | 2026-10-22 | 2,545 | 314 |
| `ciro/notice-14-0073-business-titles-financial-designations.txt` | IIROC Notice 14-0073 Use of business titles and financial designations | CIRO (IIROC-era) | https://www.ciro.ca/newsroom/publications/use-business-titles-and-financial-designations | 2014-03-24 | 2026-10-22 | 1,380 | 73 |
| `ciro/csa-ciro-staff-notice-31-369-finfluencers-page.txt` | Joint CSA/CIRO Staff Notice 31-369 Finfluencer activity | CSA + CIRO | https://www.ciro.ca/newsroom/publications/joint-canadian-securities-administrators-and-canadian-investment-regulatory-organization-staff | 2025-12-11 | 2026-10-22 | 5,343 | 280 |
| `ciro/csa-ciro-staff-notice-31-363-conflicts-of-interest-page.txt` | Joint CSA/CIRO Staff Notice 31-363 CFR review of conflicts of interest practices | CSA + CIRO | https://www.ciro.ca/newsroom/publications/joint-canadian-securities-administrators-canadian-investment-regulatory-organization-staff-notice-31 | 2023-08-03 | 2026-10-22 | 11,240 | 641 |
| `ciro/notice-16-0068-managing-conflicts-best-interest-client.txt` | IIROC Notice 16-0068 Managing conflicts in the best interest of the client | CIRO (IIROC-era) | https://www.ciro.ca/newsroom/publications/managing-conflicts-best-interest-client | 2016-04-06 | 2026-10-22 | 1,549 | 106 |
| `ciro/notice-17-0093-compensation-related-conflicts-review.txt` | IIROC Notice 17-0093 Compensation-related conflicts review | CIRO (IIROC-era) | https://www.ciro.ca/newsroom/publications/managing-conflicts-best-interest-client-compensation-related-conflicts-review | 2017-04-27 | 2026-10-22 | 5,367 | 401 |
| `ciro/gn-3100-21-002-mutual-fund-sales-incentives.txt` | GN-3100-21-002 Mutual fund sales incentives | CIRO | https://www.ciro.ca/newsroom/publications/mutual-fund-sales-incentives-0 | 2021-10-14 | 2026-10-22 | 645 | 86 |
| `ciro/gn-3100-21-007-non-arms-length-investment-products.txt` | GN-3100-21-007 Distribution of non-arm's length investment products | CIRO | https://www.ciro.ca/newsroom/publications/recommendations-and-best-practices-distribution-non-arms-length-investment-products-0 | 2021-10-14 | 2026-10-22 | 2,760 | 188 |
| `ciro/ciro-seniors-and-vulnerable-clients.txt` | Seniors and Vulnerable Clients (pre-dates TCP/temporary-hold rules) | CIRO (IIROC/MFDA-era) | https://www.ciro.ca/newsroom/publications/seniors-and-vulnerable-clients | 2019-10-25 | 2026-10-22 | 2,568 | 253 |
| `ciro/ciro-housekeeping-amendments-older-vulnerable-clients.txt` | Rules Bulletin 21-0159 Housekeeping amendments — older and vulnerable clients | CIRO (IIROC-era) | https://www.ciro.ca/newsroom/publications/housekeeping-amendments-enhance-protection-older-and-vulnerable-clients | 2021-09-09 | 2026-10-22 | 904 | 74 |
| `ciro/gn-3700-21-003-communication-of-dispute-resolution-and-obsi-services.txt` | GN-3700-21-003 Joint CSA/IIROC/MFDA notice — communicating internal dispute resolution and OBSI services | CIRO + CSA | https://www.ciro.ca/newsroom/publications/canadian-securities-administrators-and-investment-industry-regulatory-organization-canada-and-mutual-0 | 2021-10-14 | 2026-10-22 | 3,114 | 194 |
| `ciro/gn-3700-21-002-electronic-complaint-record-retention.txt` | GN-3700-21-002 Electronic client complaint record retention | CIRO | https://www.ciro.ca/newsroom/publications/electronic-client-complaint-record-retention-0 | 2021-10-14 | 2026-10-22 | 538 | 75 |
| `ciro/notice-09-0363-client-complaint-handling-rule-and-guidance.txt` | IIROC Notice 09-0363 Client complaint handling rule and guidance (historical; still indexed) | CIRO (IIROC-era) | https://www.ciro.ca/newsroom/publications/client-complaint-handling-rule-and-guidance-note-and-amendments-dealer-member-rules-19-37-and-2500-0 | 2009-12-21 | 2026-10-22 | 1,345 | 90 |
| `ciro/brochure-ciro-complaints-brochure.txt` | CIRO Complaints Brochure (mandatory) | CIRO | https://www.ciro.ca/media/7616/download?inline | file last-modified 2025-09-11 | 2026-10-22 | 1,104 | 204 |
| `ciro/brochure-how-ciro-protects-investors.txt` | How CIRO protects investors (mandatory brochure; media/1111 version) | CIRO | https://www.ciro.ca/media/1111/download?inline | file last-modified 2023-10-19 | 2026-10-22 | 392 | 95 |
| `ciro/brochure-opening-an-investment-account.txt` | Opening an Investment Account — A Guide for Investors (optional brochure) | CIRO | https://www.ciro.ca/media/7481/download?inline | file last-modified 2024-05-03 | 2026-10-22 | 671 | 142 |
| `ciro/brochure-strip-bonds-information-statement.txt` | Strip bonds and strip bond packages information statement (mandatory disclosure) | CIRO | https://www.ciro.ca/media/1494/download?inline | file last-modified 2024-08-07 | 2026-10-22 | 3,407 | 581 |
| `ciro/ciro-official-brochures-page.txt` | CIRO Official Brochures web page (mandatory vs optional) | CIRO | https://www.ciro.ca/newsroom/ciro-official-brochures | live page | 2026-10-22 | 267 | 41 |
| `ciro/cipf-coverage-policy-2023-07-27.txt` | CIPF Coverage Policy | CIPF | https://www.cipf.ca/docs/default-source/default-document-library/coverage-policy-amended-july-27-2023.pdf?sfvrsn=a9ef920c_2 | Amended 2023-07-27 | 2026-10-22 | 3,254 | 298 |
| `ciro/cipf-about-cipf-coverage.txt` | CIPF — About CIPF Coverage web page | CIPF | https://www.cipf.ca/cipf-coverage/about-cipf-coverage | live page | 2026-10-22 | 1,400 | 71 |
| `ciro/obsi-how-the-complaint-process-works.txt` | OBSI — How the complaint process works | OBSI | https://www.obsi.ca/en/for-consumers/how-the-complaint-process-works/ | live page | 2026-10-22 | 715 | 42 |
| `ciro/obsi-consumer-faqs.txt` | OBSI — Consumer FAQs | OBSI | https://www.obsi.ca/en/for-consumers/faqs/ | live page | 2026-10-22 | 1,909 | 85 |
| `ciro/obsi-can-obsi-help.txt` | OBSI — Can OBSI help? | OBSI | https://www.obsi.ca/en/for-consumers/can-obsi-help/ | live page | 2026-10-22 | 260 | 13 |
| `ciro/gn-urpart6-25-0003-best-execution-idpc-umir.txt` | GN-URPART6-25-0003 Guidance on best execution (IDPC + UMIR; current) | CIRO | https://www.ciro.ca/newsroom/publications/guidance-best-execution-1 | 2025-08-19 | 2026-10-22 | 7,862 | 426 |
| `ciro/gn-3100-21-003-best-execution.txt` | GN-3100-21-003 Guidance on best execution (2021 version; still indexed) | CIRO | https://www.ciro.ca/newsroom/publications/guidance-best-execution-0 | 2021-10-14 | 2026-10-22 | 7,511 | 405 |
| `ciro/gn-urpart7-26-0007-manipulative-deceptive-trading-practices.txt` | GN-URPART7-26-0007 Certain manipulative and deceptive trading practices | CIRO | https://www.ciro.ca/newsroom/publications/guidance-certain-manipulative-and-deceptive-trading-practices-0 | 2026-03-24 | 2026-10-22 | 2,687 | 174 |
| `ciro/gn-urpart10-26-0003-gatekeeper-reporting-obligation.txt` | GN-URPART10-26-0003 Gatekeeper reporting obligation | CIRO | https://www.ciro.ca/newsroom/publications/gatekeeper-reporting-obligation | 2026-03-27 | 2026-10-22 | 2,311 | 186 |
| `ciro/gn-urpart7-26-0008-trading-supervision-obligations.txt` | GN-URPART7-26-0008 Trading supervision obligations | CIRO | https://www.ciro.ca/newsroom/publications/guidance-trading-supervision-obligations-0 | 2026-03-27 | 2026-10-22 | 8,161 | 598 |
| `ciro/gn-urpart6-26-0004-insider-significant-shareholder-markers.txt` | GN-URPART6-26-0004 'Insider' and 'Significant Shareholder' order markers | CIRO | https://www.ciro.ca/newsroom/publications/guidance-insider-and-significant-shareholder-order-markers | 2026-03-20 | 2026-10-22 | 3,234 | 190 |
| `ciro/gn-urpart7-25-0003-management-of-stop-loss-orders.txt` | GN-URPART7-25-0003 Management of stop loss orders | CIRO | https://www.ciro.ca/newsroom/publications/guidance-respecting-management-stop-loss-orders-0 | 2025-08-19 | 2026-10-22 | 2,486 | 200 |
| `ciro/gn-urpart6-25-0002-short-sale-and-short-marking-exempt-designations.txt` | GN-URPART6-25-0002 'Short sale' and 'short-marking exempt' designations | CIRO | https://www.ciro.ca/newsroom/publications/guidance-short-sale-and-short-marking-exempt-order-designations-0 | 2025-08-19 | 2026-10-22 | 5,939 | 348 |
| `ciro/gn-urpart3-24-0002-short-selling-and-failed-trades.txt` | GN-URPart3-24-0002 UMIR requirements — short selling and failed trades | CIRO | https://www.ciro.ca/newsroom/publications/guidance-umir-requirements-related-short-selling-and-failed-trades | 2024-12-05 (pre-dates Aug-2026 UMIR 3.3 amendment) | 2026-10-22 | 8,183 | 533 |
| `ciro/gn-3100-26-001-extended-hours-trading.txt` | GN-3100-26-001 Extended hours trading | CIRO | https://www.ciro.ca/newsroom/publications/guidance-extended-hours-trading | 2026-10-08 | 2026-10-22 | 1,475 | 142 |
| `ciro/gn-3200-23-001-aml-compliance-guidance.txt` | GN-3200-23-001 Investment dealer AML compliance guidance | CIRO | https://www.ciro.ca/newsroom/publications/investment-dealer-anti-money-laundering-compliance-guidance | 2023-08-16 | 2026-10-22 | 8,843 | 859 |
| `ciro/gn-3800-21-003-marketplace-average-price-disclosure-trade-confirmations.txt` | GN-3800-21-003 Marketplace and average price disclosure on trade confirmations | CIRO | https://www.ciro.ca/newsroom/publications/guidance-marketplace-and-average-price-disclosure-trade-confirmations-0 | 2021-10-14 | 2026-10-22 | 1,224 | 98 |
| `ciro/gn-3800-21-004-consolidated-statements.txt` | GN-3800-21-004 Consolidated statements | CIRO | https://www.ciro.ca/newsroom/publications/consolidated-statements-0 | 2021-10-14 | 2026-10-22 | 1,089 | 104 |
| `ciro/gn-3800-20-001-content-books-and-records.txt` | GN-3800-20-001 Content of books and records | CIRO | https://www.ciro.ca/newsroom/publications/content-books-and-records | 2021-10-14 | 2026-10-22 | 1,450 | 139 |
| `ciro/gn-7100-21-001-debt-market-requirements.txt` | GN-7100-21-001 Debt market requirements | CIRO | https://www.ciro.ca/newsroom/publications/debt-market-requirements | 2021-10-14 | 2026-10-22 | 525 | 62 |
| `ciro/ciro-compliance-report-2026.txt` | CIRO Compliance Report for 2026 (Bulletin 26-0034) | CIRO | https://www.ciro.ca/newsroom/publications/ciro-compliance-report-2026-helping-dealers-compliance | 2026-02-17 | 2026-10-22 | 6,526 | 365 |
| `ciro/ciro-compliance-report-2025.txt` | CIRO Compliance Report for 2025 (Bulletin 25-0035) | CIRO | https://www.ciro.ca/newsroom/publications/ciro-compliance-report-2025-helping-dealers-compliance | 2025-01-31 | 2026-10-22 | 6,980 | 391 |
| `ciro/ciro-whistleblower-service.txt` | CIRO Whistleblower Service web page | CIRO | https://www.ciro.ca/rules-and-enforcement/whistleblower-service | page modified 2024-05-16 | 2026-10-22 | 521 | 39 |
| `ciro/retail-securities-guide-for-studying.txt` | Retail Securities Exam — Guide for Studying (study-method guidance, not content) | CIRO | https://www.ciro.ca/media/13546/download?inline | © 2025 (DC-18866) | 2026-10-22 | 2,753 | 429 |

## `csa/`: CSA national instruments, forms and policies, plus the OSC whistleblower programme

| Path | Document | Issuer | URL | Version / consolidation date | Retrieved | Words | Lines |
|---|---|---|---|---|---|---:|---:|
| `csa/ni-31-103-registration-requirements.txt` | NI 31-103 Registration Requirements… (Parts 1, 9, 13, 14 + App. G; other parts trimmed incl. Part 11 records) | CSA (BCSC unofficial consolidation) | https://www.bcsc.bc.ca/-/media/PWS/New-Resources/Securities-Law/Instruments-and-Policies/Policy-3/31103-NI-June-16-2026.pdf | Effective as of 2026-01-01 (pub. 2026-06-16) | 2026-10-22 | 24,635 | 3,139 |
| `csa/ni-31-103-amendment-2027-01-01-annex-b.txt` | NI 31-103 amendment, Annex B, s.14.17(1) (NOT YET IN FORCE) | CSA (BCSC) | https://www.bcsc.bc.ca/-/media/PWS/New-Resources/Securities-Law/Instruments-and-Policies/Policy-3/31103-NI-Amendment-Advance-Notice--Annex-B-June-11-2026.pdf | Pub. 2026-06-11; in force 2027-01-01 | 2026-10-22 | 423 | 61 |
| `csa/cp-31-103-registration-requirements-companion-policy.txt` | Companion Policy 31-103CP (Parts 1, 13, 14 + App. D, E, G) | CSA (BCSC unofficial consolidation) | https://www.bcsc.bc.ca/-/media/PWS/New-Resources/Securities-Law/Instruments-and-Policies/Policy-3/31103CP-CP-January-30-2026.pdf | Effective as of 2026-01-01 (pub. 2026-01-30) | 2026-10-22 | 47,398 | 4,782 |
| `csa/ni-41-101-general-prospectus-requirements.txt` | NI 41-101 General Prospectus Requirements (Parts 1, 2, 2A, 3, 3B-3D, 13, 13A, 18) | CSA (BCSC unofficial consolidation) | https://www.bcsc.bc.ca/-/media/PWS/New-Resources/Securities-Law/Instruments-and-Policies/Policy-4/41101-NI-September-19-2025.pdf | Effective as of 2025-09-19 | 2026-10-22 | 16,450 | 2,494 |
| `csa/cp-41-101-general-prospectus-requirements-companion-policy.txt` | Companion Policy 41-101CP (Parts 1, 2, 2A, 5A, 6, 6A + App. B) | CSA (BCSC unofficial consolidation) | https://www.bcsc.bc.ca/-/media/PWS/New-Resources/Securities-Law/Instruments-and-Policies/Policy-4/41101CP-CPMarch-3-2025.pdf | Effective as of 2025-03-03 | 2026-10-22 | 24,761 | 3,068 |
| `csa/form-41-101f4-etf-facts.txt` | Form 41-101F4 ETF Facts (full) | CSA (BCSC unofficial consolidation) | https://www.bcsc.bc.ca/-/media/PWS/New-Resources/Securities-Law/Instruments-and-Policies/Policy-4/41101F4-F-March-3-2025.pdf | Effective as of 2025-03-03 | 2026-10-22 | 8,589 | 1,168 |
| `csa/ni-45-106-prospectus-exemptions.txt` | NI 45-106 Prospectus Exemptions (Parts 1, 2, 6) | CSA (BCSC unofficial consolidation) | https://www.bcsc.bc.ca/-/media/PWS/New-Resources/Securities-Law/Instruments-and-Policies/Policy-4/45106-NI-September-19-2025.pdf | 2025-09-19 | 2026-10-22 | 24,922 | 3,147 |
| `csa/cp-45-106-prospectus-exemptions-companion-policy.txt` | Companion Policy 45-106CP (Parts 1-3, 6) | CSA (BCSC consolidation) | https://www.bcsc.bc.ca/-/media/PWS/New-Resources/Securities-Law/Instruments-and-Policies/Policy-4/45106CP-CP-July-25-2023.pdf | Consolidation 2023-06-09 (pub. 2023-07-25) | 2026-10-22 | 19,120 | 1,961 |
| `csa/form-45-106f9-individual-accredited-investor-risk-acknowledgement.txt` | Form 45-106F9 Form for Individual Accredited Investors (full) | CSA (BCSC) | https://www.bcsc.bc.ca/-/media/PWS/Resources/Securities_Law/Policies/Policy4/45106F9-F-May-5-2015.pdf | 2015-05-05 (current) | 2026-10-22 | 865 | 121 |
| `csa/ni-51-102-continuous-disclosure-obligations.txt` | NI 51-102 Continuous Disclosure Obligations (Parts 1-7) | CSA (BCSC unofficial consolidation) | https://www.bcsc.bc.ca/-/media/PWS/New-Resources/Securities-Law/Instruments-and-Policies/Policy-5/51102-NI-September-22-2026.pdf | Effective as of 2026-09-22 | 2026-10-22 | 15,504 | 2,543 |
| `csa/np-51-201-disclosure-standards.txt` | NP 51-201 Disclosure Standards (full) | CSA (BCSC) | https://www.bcsc.bc.ca/-/media/PWS/New-Resources/Securities-Law/Instruments-and-Policies/Policy-5/51201-NP-July-25-2023.pdf | Pub. 2023-07-25 (in force 2002-07-12) | 2026-10-22 | 10,067 | 1,155 |
| `csa/ni-81-101-mutual-fund-prospectus-disclosure.txt` | NI 81-101 Mutual Fund Prospectus Disclosure (Parts 1-7) | CSA (BCSC unofficial consolidation) | https://www.bcsc.bc.ca/-/media/PWS/New-Resources/Securities-Law/Instruments-and-Policies/Policy-8/81101-NI-September-19-2025.pdf | Effective as of 2025-09-19 | 2026-10-22 | 12,369 | 2,002 |
| `csa/form-81-101f3-fund-facts.txt` | Form 81-101F3 Fund Facts (full) | CSA (BCSC unofficial consolidation) | https://www.bcsc.bc.ca/-/media/PWS/New-Resources/Securities-Law/Instruments-and-Policies/Policy-8/81101F3-F-October-1-2026.pdf | Effective as of 2026-10-01 | 2026-10-22 | 7,089 | 999 |
| `csa/ni-81-102-investment-funds.txt` | NI 81-102 Investment Funds (Parts 1, 2, 7, 9, 10, 15, 15.1 + App. F) | CSA (BCSC unofficial consolidation) | https://www.bcsc.bc.ca/-/media/PWS/New-Resources/Securities-Law/Instruments-and-Policies/Policy-8/81102-NI-October-1-2026.pdf | Effective as of 2026-10-01 | 2026-10-22 | 29,056 | 3,901 |
| `csa/cp-81-102-investment-funds-companion-policy.txt` | Companion Policy 81-102CP (Parts 1-4, 10, 13) | CSA (BCSC) | https://www.bcsc.bc.ca/-/media/PWS/New-Resources/Securities-Law/Instruments-and-Policies/Policy-8/81102CP-CP-October-1-2026.pdf | 2026-10-01 | 2026-10-22 | 12,262 | 1,220 |
| `csa/osc-policy-15-601-whistleblower-program.txt` | OSC Policy 15-601 Whistleblower Program (Ontario only) | OSC | https://www.osc.ca/sites/default/files/2022-05/pol_20220429_15-601_unofficial-consolidation.pdf | Unofficial consolidation to 2022-04-29 | 2026-10-22 | 6,350 | 735 |
| `csa/osc-whistleblower-program-web-pages.txt` | OSC Whistleblower Program web pages (4 pages) | OSC | https://www.osc.ca/en/enforcement/osc-whistleblower-program (+3 sub-pages; URLs in file) | live pages | 2026-10-22 | 3,107 | 313 |

## `cra/`: CRA guides and web pages

| Path | Document | Issuer | URL | Version / consolidation date | Retrieved | Words | Lines |
|---|---|---|---|---|---|---:|---:|
| `cra/guide-t4040-rrsps-other-registered-plans-retirement-2025.txt` | CRA Guide T4040 RRSPs and Other Registered Plans for Retirement | CRA | https://www.canada.ca/content/dam/cra-arc/formspubs/pub/t4040/t4040-25e.pdf | 2025 tax year (PDF 2026-03-12) | 2026-10-22 | 38,534 | 5,030 |
| `cra/guide-t4037-capital-gains-2025.txt` | CRA Guide T4037 Capital Gains | CRA | https://www.canada.ca/content/dam/cra-arc/formspubs/pub/t4037/t4037-25e.pdf | 2025 tax year (PDF 2026-02-06) | 2026-10-22 | 36,098 | 4,857 |
| `cra/guide-t4012-t2-corporation-income-tax-2025.txt` | CRA Guide T4012 T2 Corporation Income Tax Guide | CRA | https://www.canada.ca/content/dam/cra-arc/formspubs/pub/t4012/t4012-25e.pdf | 2025 (PDF 2026-05-22) | 2026-10-22 | 110,448 | 16,422 |
| `cra/guide-rc4092-resps-2025.txt` | CRA Guide RC4092 Registered Education Savings Plans | CRA | https://www.canada.ca/content/dam/cra-arc/formspubs/pub/rc4092/rc4092-25e.pdf | rc4092-25e (PDF 2025-11-24) | 2026-10-22 | 11,513 | 1,643 |
| `cra/t4061-nr4-non-resident-tax-withholding.txt` | CRA Guide T4061 NR4 Non-Resident Tax Withholding (HTML) | CRA | https://www.canada.ca/en/revenue-agency/services/forms-publications/publications/t4061/nr4-non-resident-tax-withholding-remitting-reporting.html | Rev. 26 (modified 2026-09-22) | 2026-10-22 | 18,116 | 2,266 |
| `cra/tfsa-pages.txt` | CRA TFSA web pages (14 pages) | CRA | https://www.canada.ca/en/revenue-agency/services/tax/individuals/topics/tax-free-savings-account.html (+ sub-pages) | modified 2025-10-10…2026-09-17 | 2026-10-22 | 10,751 | 1,742 |
| `cra/fhsa-pages.txt` | CRA FHSA web pages (11 pages) | CRA | https://www.canada.ca/en/revenue-agency/services/tax/individuals/topics/first-home-savings-account.html (+ sub-pages) | modified 2026-02-02…2026-09-17 | 2026-10-22 | 31,797 | 3,607 |
| `cra/rrsp-rrif-hbp-pages.txt` | CRA RRSP/RRIF/HBP/LLP web pages (13 pages) | CRA | https://www.canada.ca/en/revenue-agency/services/tax/individuals/topics/rrsps-related-plans/… (URLs in file) | modified 2025-01-02…2026-09-17 | 2026-10-22 | 6,569 | 798 |
| `cra/registered-plan-limits-mp-rrsp-tfsa-ympe.txt` | CRA MP/DB/RRSP/DPSP/ALDA/TFSA limits, YMPE and YAMPE table | CRA | https://www.canada.ca/en/revenue-agency/services/tax/registered-plans-administrators/pspa/mp-rrsp-dpsp-tfsa-limits-ympe.html | modified 2025-12-01 | 2026-10-22 | 895 | 130 |
| `cra/capital-gains-losses-superficial-loss-pages.txt` | CRA capital gains/losses, superficial loss, mutual fund tax treatment pages (10 pages) | CRA | https://www.canada.ca/en/revenue-agency/services/tax/individuals/topics/about-your-tax-return/…/line-12700-capital-gains… (URLs in file) | modified 2026-02-04…2026-05-27 | 2026-10-22 | 23,076 | 2,648 |
| `cra/investment-income-interest-dividends-foreign-tax-credit.txt` | CRA interest income, dividend gross-up/DTC, eligible dividends, foreign tax credit pages (5 pages) | CRA | https://www.canada.ca/en/revenue-agency/… line-12100 / line-12000 / line-40425 / line-40500 (URLs in file) | modified 2026-01-20…2026-09-11 | 2026-10-22 | 4,170 | 758 |
| `cra/income-splitting-attribution-pension-splitting-prescribed-rates.txt` | CRA pension income splitting, prescribed interest rates (2025-Q1…2026-Q4), TOSI pages (11 pages) | CRA | https://www.canada.ca/en/revenue-agency/services/tax/individuals/topics/pension-income-splitting.html (+ others in file) | modified 2024-12-03…2026-08-28 | 2026-10-22 | 8,463 | 1,228 |
| `cra/tax-rates-brackets-individuals-2025-2026.txt` | CRA federal and provincial/territorial personal tax rates 2025-2026 + indexation (4 pages) | CRA | https://www.canada.ca/en/revenue-agency/services/tax/individuals/tax-rates-brackets/current-year.html (+ others) | modified 2026-01-22…2026-06-25 | 2026-10-22 | 4,796 | 862 |
| `cra/corporations-tax-rates-types-pages.txt` | CRA corporation tax rates, type of corporation, dual rates, Ontario pages (4 pages) | CRA | https://www.canada.ca/en/revenue-agency/services/tax/businesses/topics/corporations/corporation-tax-rates.html (+ others) | modified 2025-05-21…2026-10-21 | 2026-10-22 | 1,970 | 330 |
| `cra/business-structures-sole-proprietorship-partnership.txt` | CRA sole proprietorships and partnerships, what is a business, definitions (3 pages) | CRA | https://www.canada.ca/en/revenue-agency/services/tax/businesses/topics/sole-proprietorships-partnerships.html (+ others) | modified 2026-06-19…2026-08-31 | 2026-10-22 | 8,018 | 1,035 |

## `gov/`: Justice Laws statute extracts, Finance Canada, ESDC and ISED pages

| Path | Document | Issuer | URL | Version / consolidation date | Retrieved | Words | Lines |
|---|---|---|---|---|---|---:|---:|
| `gov/ita-registered-plans-rrsp-tfsa-fhsa-resp.txt` | Income Tax Act extracts: s.146, 146.1, 146.2, 146.6, 147.1, 204.1, 204.9, 207.01-207.02 | Justice Canada | https://laws-lois.justice.gc.ca/eng/XML/I-3.3.xml | Point-in-time 2026-06-18 (current to 2026-06-21) | 2026-10-22 | 9,206 | 455 |
| `gov/ita-capital-gains-acb-superficial-loss.txt` | Income Tax Act extracts: s.38, 39, 40, 47, 53, 54, 111, 251.1 | Justice Canada | https://laws-lois.justice.gc.ca/eng/XML/I-3.3.xml | Point-in-time 2026-06-18 | 2026-10-22 | 10,503 | 375 |
| `gov/ita-dividends-gross-up-dtc.txt` | Income Tax Act extracts: s.82, 83(2), 89(1), 89(14), 121 | Justice Canada | https://laws-lois.justice.gc.ca/eng/XML/I-3.3.xml | Point-in-time 2026-06-18 | 2026-10-22 | 2,022 | 89 |
| `gov/ita-corporate-integration-rdtoh-grip-cda.txt` | Income Tax Act extracts: s.123-125, 129, 186, 89(1) (CDA/GRIP), 83(2), 248(1) | Justice Canada | https://laws-lois.justice.gc.ca/eng/XML/I-3.3.xml | Point-in-time 2026-06-18 | 2026-10-22 | 7,927 | 336 |
| `gov/ita-attribution-income-splitting.txt` | Income Tax Act extracts: s.74.1-74.5, 56(4.1), 60.03, 146(8.3)/(8.6), 120.4 | Justice Canada | https://laws-lois.justice.gc.ca/eng/XML/I-3.3.xml | Point-in-time 2026-06-18 | 2026-10-22 | 7,013 | 300 |
| `gov/ita-foreign-income-withholding-tax.txt` | Income Tax Act extracts: s.126, 20(11)-(12), 212, 215 | Justice Canada | https://laws-lois.justice.gc.ca/eng/XML/I-3.3.xml | Point-in-time 2026-06-18 | 2026-10-22 | 4,297 | 183 |
| `gov/ita-individual-tax-rates-brackets.txt` | Income Tax Act extracts: s.117(2), 117.1(1), 2(1), 3 | Justice Canada | https://laws-lois.justice.gc.ca/eng/XML/I-3.3.xml | Point-in-time 2026-06-18 | 2026-10-22 | 887 | 42 |
| `gov/itr-rrif-minimum-amount-factors-7308.txt` | Income Tax Regulations s.7308 (RRIF minimum amount factors) | Justice Canada | https://laws-lois.justice.gc.ca/eng/XML/C.R.C.,_c._945.xml | Point-in-time 2026-06-18 | 2026-10-22 | 624 | 64 |
| `gov/canada-us-tax-convention-consolidated.txt` | Canada–US Tax Convention (1980) as amended to the 2007 Protocol (unofficial consolidation) | Finance Canada | https://www.canada.ca/en/department-finance/programs/tax-policy/tax-treaties/country/united-states-america-convention-consolidated-1980-1983-1984-1995-1997-2007.html | page modified 2019-09-16 | 2026-10-22 | 22,575 | 1,082 |
| `gov/cpp-pages.txt` | CPP retirement pension, survivor, death benefit, contribution rates pages (9 pages) | ESDC / CRA | https://www.canada.ca/en/services/benefits/publicpensions/cpp.html (+ others) | modified 2025-01-22…2026-10-13 | 2026-10-22 | 6,743 | 1,054 |
| `gov/oas-gis-pages.txt` | OAS, recovery tax, GIS, Allowance, Allowance for the Survivor pages (11 pages) | ESDC | https://www.canada.ca/en/services/benefits/publicpensions/old-age-security.html (+ others) | modified 2026-09-29…2026-10-21 | 2026-10-22 | 6,929 | 1,149 |
| `gov/resp-cesg-clb-esdc-pages.txt` | RESP, CESG, Canada Learning Bond pages (7 pages) | ESDC | https://www.canada.ca/en/services/benefits/education/education-savings.html (+ others) | modified 2025-10-16…2026-08-10 | 2026-10-22 | 9,201 | 986 |
| `gov/business-structures-corporations-cooperatives-ised.txt` | ISED Corporations Canada: benefits of incorporating, share structure, co-operatives (4 pages) | ISED | https://ised-isde.canada.ca/site/corporations-canada/en/benefits-incorporating (+ others) | modified 2021-05-06…2026-04-10 | 2026-10-22 | 4,752 | 542 |

## `downloads/`: original files (gitignored; the source for the text extractions above)

These are the original PDFs, HTML pages and XML files. Never execute them. To check a quote, open the file in the matching subfolder: `ciro/` holds PDFs, and `cra/`, `gov/`, `cipf/` and `obsi/` hold the HTML pages that each multi-page text set was cleaned from.

| Folder | Files | Total size | Contents |
|---|---:|---:|---|
| `downloads/cipf/` | 4 | 0.9 MB | `cipf-about-cipf-coverage.html`, `cipf-coverage-policy-page.html`, `cipf-faq.html`, `coverage-policy-amended-july-27-2023.pdf` |
| `downloads/ciro/` | 9 | 19.6 MB | `CIRO-Complaints-Brochure-EN.pdf`, `CIRO_ProtectInvestors-Brochure.pdf`, `GN-3300-21-001_-_Appendix_A.pdf`, `How-CIRO-protects-investors-Digitalprint-EN.pdf`, `IDPC-Form-1-042726-EN.pdf`, `IDPC-Rules-081126-EN.pdf`, `Opening-an-Investment-Account-ENV1.pdf`, `Strip-bonds-and-strip-bond-packages-information-statement-en.pdf`, `UMIR-08112026-EN.pdf` |
| `downloads/cra/` | 84 | 5.7 MB | 84 files (the `Original saved:` lines in the matching text files name each one) |
| `downloads/csa/` | 20 | 10.5 MB | 20 files (the `Original saved:` lines in the matching text files name each one) |
| `downloads/gov/` | 33 | 20.9 MB | 33 files (the `Original saved:` lines in the matching text files name each one) |
| `downloads/obsi/` | 3 | 0.2 MB | `obsi-can-obsi-help.html`, `obsi-consumer-faqs.html`, `obsi-how-the-complaint-process-works.html` |

Total corpus text files: 106 in this exam folder, plus 2 shared files.

---

# Addendum: gap-fill corpus (Phase B, 2026-10-22)

These files were added to close gaps in the outcome-to-source map. The governing passages per gap are listed in `../02b-gap-fill-statutes.md` and `../02b-gap-fill-instruments.md`.

Note: this exam quotes the Aug-2026 IDPC and UMIR copies in `ciro/`. The repo-root shared copies are no longer used.

## Lane: statutes

Built 2026-10-22. Every file below was retrieved on 2026-10-22, from an allowed official domain only (bcsc.bc.ca, ontario.ca, laws-lois.justice.gc.ca, fintrac-canafe.canada.ca, priv.gc.ca, ciro.ca). Each text file's header gives its URL, version, extraction method, and what was kept or trimmed. Word and line counts come from `wc`. No downloaded file was executed. The Ontario Securities Act `.doc` was converted with macOS `textutil` and the PDFs with pdfplumber. The Justice Laws XML files were parsed as data.

## `ciro/` (add to the CIRO table)

| Path | Document | Issuer | URL | Version / consolidation date | Retrieved | Words | Lines |
|---|---|---|---|---|---|---:|---:|
| `ciro/bulletin-23-0150-t1-settlement-amendments.txt` | CIRO Rules Bulletin 23-0150: amendments to UMIR and IDPC for the move to T+1 settlement. Page text only; appendices not retrieved. Written before implementation, so its "Currently ... two days" sentence is historical. | CIRO | https://www.ciro.ca/newsroom/publications/amendments-umir-and-idpc-rules-facilitate-investment-industrys-move-t1-settlement | Bulletin 2023-10-26; effective 2024-05-27 | 2026-10-22 (browser) | 990 | 89 |

## `csa/` (add to the CSA table)

| Path | Document | Issuer | URL | Version / consolidation date | Retrieved | Words | Lines |
|---|---|---|---|---|---|---:|---:|
| `csa/ni-45-102-resale-of-securities.txt` | NI 45-102 Resale of Securities (full: Parts 1-4, App. A-F) | CSA (BCSC unofficial consolidation) | https://www.bcsc.bc.ca/-/media/PWS/New-Resources/Securities-Law/Instruments-and-Policies/Policy-4/45102-NI-July-25-2023.pdf | Amendments to 2023-06-09 (pub. 2023-07-25) | 2026-10-22 | 11,028 | 1,111 |
| `csa/ni-62-104-take-over-bids-and-issuer-bids.txt` | NI 62-104 Take-Over Bids and Issuer Bids (full: Parts 1-7; forms not retrieved) | CSA (BCSC unofficial consolidation) | https://www.bcsc.bc.ca/-/media/PWS/New-Resources/Securities-Law/Instruments-and-Policies/Policy-6/62104-NI-September-19-2025.pdf | Effective as of 2025-09-19 | 2026-10-22 | 17,665 | 1,617 |
| `csa/np-11-207-failure-to-file-cease-trade-orders.txt` | NP 11-207 Failure-to-File Cease Trade Orders and Revocations in Multiple Jurisdictions (full). The 2026-09-24 advance notice of amendments was not retrieved. | CSA (BCSC) | https://www.bcsc.bc.ca/-/media/PWS/New-Resources/Securities-Law/Instruments-and-Policies/Policy-1/11207-NP-July-25-2023.pdf | Pub. 2023-07-25 | 2026-10-22 | 10,344 | 1,134 |
| `csa/ni-24-101-institutional-trade-matching-and-settlement.txt` | NI 24-101 Institutional Trade Matching and Settlement (full; forms not retrieved) | CSA (BCSC unofficial consolidation) | https://www.bcsc.bc.ca/-/media/PWS/New-Resources/Securities-Law/Instruments-and-Policies/Policy-2/24101-NI-May-27-2024.pdf | Current to 2024-05-27 (T+1 amendments) | 2026-10-22 | 2,093 | 219 |
| `csa/cp-24-101-institutional-trade-matching-and-settlement-companion-policy.txt` | Companion Policy 24-101CP (full; guidance, not rule) | CSA (BCSC unofficial consolidation) | https://www.bcsc.bc.ca/-/media/PWS/New-Resources/Securities-Law/Instruments-and-Policies/Policy-2/24101CP-CP-May-27-2024.pdf | Current to 2024-05-27 | 2026-10-22 | 5,378 | 479 |
| `csa/ni-21-101-marketplace-operation.txt` | NI 21-101 Marketplace Operation (full: Parts 1-15; forms not retrieved; still says "IIROC") | CSA (BCSC unofficial consolidation) | https://www.bcsc.bc.ca/-/media/PWS/New-Resources/Securities-Law/Instruments-and-Policies/Policy-2/21101-NI-October-15-2020.pdf | Effective as of 2020-09-14 (pub. 2020-10-15); current BCSC NI version | 2026-10-22 | 10,320 | 1,125 |

## `gov/` (add to the gov table)

| Path | Document | Issuer | URL | Version / consolidation date | Retrieved | Words | Lines |
|---|---|---|---|---|---|---:|---:|
| `gov/ontario-securities-act-extracts.txt` | Securities Act (Ontario), R.S.O. 1990 c. S.5, extracts: s.1, 52-53, 73.3, 76, 89, 121.5-122, 126.1-126.3, 127 | Government of Ontario (e-Laws) | https://www.ontario.ca/laws/statute/90s05 (Word: https://www.ontario.ca/laws/docs/90s05_e.doc) | Consolidation period 2025-09-01 to e-Laws currency date 2026-10-20 | 2026-10-22 | 16,290 | 742 |
| `gov/pcmltfa-extracts.txt` | Proceeds of Crime (Money Laundering) and Terrorist Financing Act extracts: s.3, 5-10.1, 74-80 | Justice Canada | https://laws-lois.justice.gc.ca/eng/XML/P-24.501.xml | Point-in-time 2026-03-26 (current to 2026-03-31) | 2026-10-22 | 2,909 | 181 |
| `gov/pcmltf-str-regulations-sor-2001-317.txt` | PCMLTF Suspicious Transaction Reporting Regulations SOR/2001-317 (all sections; schedules trimmed) | Justice Canada | https://laws-lois.justice.gc.ca/eng/XML/SOR-2001-317.xml | Point-in-time 2025-10-01 (current to 2025-10-14) | 2026-10-22 | 1,846 | 149 |
| `gov/pcmltf-regulations-securities-dealer-extracts.txt` | PCMLTF Regulations SOR/2002-184 extracts: securities-dealer sections (s.25-29, 94, 119), s.84-85, 24-hour rule (s.126-130), reports (s.131-132), third-party determination (s.134-137) | Justice Canada | https://laws-lois.justice.gc.ca/eng/XML/SOR-2002-184.xml | Point-in-time 2026-03-26 (current to 2026-03-31) | 2026-10-22 | 3,699 | 169 |
| `gov/fintrac-str-guidance.txt` | FINTRAC guidance "Reporting suspicious transactions to FINTRAC", sections 1-8 (rest trimmed) | FINTRAC | https://fintrac-canafe.canada.ca/guidance-directives/transaction-operation/str-dod/str-dod-eng | Page modified 2025-05-22 | 2026-10-22 | 6,307 | 807 |
| `gov/fintrac-securities-dealers-pages.txt` | FINTRAC pages: securities dealers requirements summary; ML/TF indicators for securities dealers (general indicators only) (2 pages) | FINTRAC | https://fintrac-canafe.canada.ca/re-ed/sec-eng (+1; URLs in file) | Modified 2024-06-25 and 2025-11-24 | 2026-10-22 | 5,165 | 485 |
| `gov/pipeda-extracts-schedule-1.txt` | PIPEDA extracts: s.2-5, 6.1, 7, 10.1 and Schedule 1 (CSA Model Code principles 4.1-4.10) | Justice Canada | https://laws-lois.justice.gc.ca/eng/XML/P-8.6.xml | Point-in-time 2026-03-26 (current to 2026-03-31) | 2026-10-22 | 6,029 | 317 |
| `gov/opc-pipeda-fair-information-principles-pages.txt` | OPC pages: PIPEDA fair information principles; PIPEDA requirements in brief (2 pages) | Office of the Privacy Commissioner of Canada | https://www.priv.gc.ca/en/privacy-topics/privacy-laws-in-canada/the-personal-information-protection-and-electronic-documents-act-pipeda/p_principle/ (+1) | Modified 2025-05-29 and 2024-05-01 | 2026-10-22 | 1,436 | 210 |
| `gov/ppn-regulations-sor-2008-180.txt` | Principal Protected Notes Regulations SOR/2008-180 (full). Since SOR/2021-181 they no longer cover banks; see the Bank Act file. | Justice Canada | https://laws-lois.justice.gc.ca/eng/XML/SOR-2008-180.xml | Point-in-time 2024-10-25 (current to 2024-10-30) | 2026-10-22 | 1,710 | 121 |
| `gov/bank-act-ppn-disclosure-extracts.txt` | Bank Act Part XII.2 extracts: s.627.01 (definitions incl. "principal-protected note"), 627.77-627.83, 627.87 | Justice Canada | https://laws-lois.justice.gc.ca/eng/XML/B-1.01.xml | Point-in-time 2026-09-01 (current to 2026-09-03) | 2026-10-22 | 2,456 | 132 |

## `downloads/` originals added (never execute)

| Folder | Files added |
|---|---|
| `downloads/csa/` | bcsc-ni-45-102-2023-07-25.pdf, bcsc-ni-62-104-2025-09-19.pdf, bcsc-np-11-207-2023-07-25.pdf, bcsc-ni-24-101-2024-05-27.pdf, bcsc-cp-24-101-2024-05-27.pdf, bcsc-ni-21-101-2020-10-15.pdf (6 PDFs, 1.7 MB) |
| `downloads/gov/` | ontario-securities-act-90s05-e.doc, pcmltfa-P-24.501.xml, pcmltf-regulations-SOR-2002-184.xml, pcmltf-str-regulations-SOR-2001-317.xml, pipeda-P-8.6.xml, ppn-regulations-SOR-2008-180.xml, bank-act-B-1.01.xml, fintrac-str-guidance.html, fintrac-securities-dealers.html, fintrac-indicators-securities.html, priv-pipeda-fair-info-principles.html, priv-pipeda-brief.html (12 files, 7.2 MB) |

Nothing was saved to `downloads/ciro/` because the CIRO bulletin was read as page text in the browser.

## Lane: instruments

Rows to merge into `SOURCES.md` (orchestrator). Same columns as the main manifest. Every file was written on 2026-10-22; word and line counts are from `wc`. All 16 files were spot-checked with `tools/verify_quotes.py` (13 sample quotes, 0 NOT FOUND). The gap mapping is in `../02b-gap-fill-instruments.md`.

Notes before quoting:

- **Re-extractions are companion files.** The existing trimmed files (`csa/ni-31-103-registration-requirements.txt`, `csa/cp-31-103-...companion-policy.txt`, `csa/ni-81-102-investment-funds.txt`, `csa/cp-81-102-...companion-policy.txt`) were **not edited**, so the line numbers in `02-outcome-source-map.md` stay valid. The new `*-parts-*` files hold the parts that were trimmed before, extracted from the same PDFs.
- **ciro.ca HTML pages** were read in the built-in browser, because ciro.ca blocks scripted HTML requests. The MFDR PDF was fetched with curl from its `sites/default/files/` path; the bytes match `media/21/download` (1,252,583 bytes).
- **MFDR and MSN text applies to mutual fund dealers.** Never cite it as an IDPC requirement for investment dealers.

## `ciro/` rows

| Path | Document | Issuer | URL | Version / consolidation date | Retrieved | Words | Lines |
|---|---|---|---|---|---|---:|---:|
| `ciro/mfdr-mutual-fund-dealer-rules-2026-04-01-excerpts.txt` | Mutual Fund Dealer Rules, excerpts: TOC; Rule 2.1-2.3 (standard of conduct, conflicts, borrowing from clients, KYC/TCP, suitability, control or authority); Rule 5.1 records; Rule 200 Minimum Standards for Account Supervision (excessive trading/switching, "churning") | CIRO | https://www.ciro.ca/media/21/download?inline (MFDR-EN.pdf; also https://www.ciro.ca/sites/default/files/2024-02/MFDR-EN.pdf) | Rules dated 2026-04-01 | 2026-10-22 | 12,180 | 1,248 |
| `ciro/mfda-msn-0065-excessive-trading.txt` | MFDA Staff Notice MSN-0065 Excessive Trading (in effect for mutual fund dealers) | CIRO (MFDA-era staff notice) | https://www.ciro.ca/newsroom/publications/excessive-trading | 2007-10-04, updated 2013-03-04 | 2026-10-22 | 1,065 | 59 |
| `ciro/gn-5300-21-001-loan-value-significant-security-positions.txt` | GN-5300-21-001 Loan value granted to significant security positions held in Dealer Member and client accounts (the only note in the GN-5300 series) | CIRO (IIROC-era GN) | https://www.ciro.ca/newsroom/publications/loan-value-granted-significant-security-positions-held-dealer-member-and-client-accounts | 2021-10-14 (eff. 2021-12-31) | 2026-10-22 | 1,398 | 121 |
| `ciro/gn-5400-23-001-margin-unhedged-fx-positions-client-accounts.txt` | GN-5400-23-001 Margin treatment of unhedged foreign exchange positions held in client accounts | CIRO | https://www.ciro.ca/newsroom/publications/margin-treatment-unhedged-foreign-exchange-positions-held-client-accounts | 2023-03-30 (eff. 2023-03-31) | 2026-10-22 | 1,090 | 107 |
| `ciro/gn-form1-22-001-margin-registered-account-debit-balances.txt` | GN-FORM1-22-001 Margin treatment of registered account debit balances | CIRO (IIROC-era GN) | https://www.ciro.ca/newsroom/publications/margin-treatment-registered-account-debit-balances | 2022-09-28 | 2026-10-22 | 355 | 38 |
| `ciro/ciro-lserm-list-securities-eligible-reduced-margin-page.txt` | List of securities eligible for reduced margin (LSERM): reduced rate, eligibility criteria (release table trimmed to the latest 3 rows) | CIRO | https://www.ciro.ca/rules-and-enforcement/dealer-member-rules/supporting-schedules/list-securities-eligible-reduced-margin-lserm | Latest release 2026-08-10 (Q2 2026; eff. 2026-08-31) | 2026-10-22 | 804 | 82 |
| `ciro/ciro-guidance-notes-index-2026-10-22.txt` | Index of IDPC guidance notes by rule series (finding aid, not rule text) | CIRO | https://www.ciro.ca/guidance-notes | As listed 2026-10-22 | 2026-10-22 | 1,572 | 144 |

## `csa/` rows

| Path | Document | Issuer | URL | Version / consolidation date | Retrieved | Words | Lines |
|---|---|---|---|---|---|---:|---:|
| `csa/ni-31-103-parts-2-7-8-11-categories-exemptions-records.txt` | NI 31-103 re-extract: Part 2 (2.2 client mobility exemption, individuals), Part 7 (7.1 dealer categories), Part 8 (registration exemptions incl. 8.18 international dealer, 8.30 client mobility exemption, firms), Part 11 Div. 1-2 (11.5 records incl. TCP; 11.6 retention) | CSA (BCSC consolidation) | https://www.bcsc.bc.ca/-/media/PWS/New-Resources/Securities-Law/Instruments-and-Policies/Policy-3/31103-NI-June-16-2026.pdf?dt=20260616171145 | Consolidation eff. 2026-01-01 (BCSC pub. 2026-06-16) | 2026-10-22 | 11,323 | 1,400 |
| `csa/cp-31-103-parts-2-7-8-11-categories-mobility-records-guidance.txt` | 31-103CP re-extract: guidance on Part 2 (mobility), Part 7 (dealer categories, EMD), Part 8 (exemptions incl. 8.30 mobility), Part 11 (11.5 records, 11.6 retention) | CSA (BCSC consolidation) | https://www.bcsc.bc.ca/-/media/PWS/New-Resources/Securities-Law/Instruments-and-Policies/Policy-3/31103CP-CP-January-30-2026.pdf?dt=20260202163800 | Consolidation eff. 2026-01-01 (BCSC pub. 2026-01-30) | 2026-10-22 | 9,307 | 939 |
| `csa/ni-81-102-part-6-custodianship-part-11-commingling-of-cash.txt` | NI 81-102 re-extract: Part 6 custodianship of portfolio assets; Part 11 commingling of cash (principal distributors and participating dealers) | CSA (BCSC consolidation) | https://www.bcsc.bc.ca/-/media/PWS/New-Resources/Securities-Law/Instruments-and-Policies/Policy-8/81102-NI-October-1-2026.pdf?dt=20261001200530 | Consolidation eff. 2026-10-01 | 2026-10-22 | 5,650 | 641 |
| `csa/cp-81-102-part-8-custodianship-guidance.txt` | 81-102CP re-extract: Part 8 custodianship guidance (standard of care, book-based system, compliance) | CSA (BCSC consolidation) | https://www.bcsc.bc.ca/-/media/PWS/New-Resources/Securities-Law/Instruments-and-Policies/Policy-8/81102CP-CP-October-1-2026.pdf?dt=20261001200455 | BCSC version 2026-10-01 | 2026-10-22 | 2,007 | 188 |
| `csa/ni-81-106-investment-fund-continuous-disclosure-nav-mer.txt` | NI 81-106 Investment Fund Continuous Disclosure, excerpts: TOC, Part 1 definitions (incl. MER), Part 14 NAV calculation and frequency, Part 15 MER calculation | CSA (BCSC consolidation) | https://www.bcsc.bc.ca/-/media/PWS/New-Resources/Securities-Law/Instruments-and-Policies/Policy-8/81106-NI-April-22-2026.pdf?dt=20260715200517 | Consolidation eff. 2026-04-22 | 2026-10-22 | 4,502 | 576 |
| `csa/osc-rule-32-505-us-broker-dealers-servicing-us-clients.txt` | OSC Rule 32-505 and 32-505CP: conditional exemption for U.S. broker-dealers and advisers servicing U.S. clients from Ontario (full text) | OSC | https://www.osc.ca/sites/default/files/2020-09/rule_20150605_32-505_unofficial-consolidation.pdf ; https://www.osc.ca/sites/default/files/2020-09/rule_20150605_32-505cp_unofficial-consolidation.pdf | Unofficial consolidations current to 2015-06-05 | 2026-10-22 | 1,436 | 137 |

## `cra/` rows

| Path | Document | Issuer | URL | Version / consolidation date | Retrieved | Words | Lines |
|---|---|---|---|---|---|---:|---:|
| `cra/emigrants-leaving-canada-departure-tax-pages.txt` | CRA pages: Leaving Canada (emigrants); Dispositions of property for emigrants of Canada (departure tax) | CRA | https://www.canada.ca/en/revenue-agency/services/tax/international-non-residents/individuals-leaving-entering-canada-non-residents/leaving-canada-emigrants.html ; .../dispositions-property.html | Date modified 2026-09-17 and 2026-01-20 | 2026-10-22 | 3,691 | 352 |

## `gov/` rows

| Path | Document | Issuer | URL | Version / consolidation date | Retrieved | Words | Lines |
|---|---|---|---|---|---|---:|---:|
| `gov/ita-emigration-departure-tax-128-1.txt` | Income Tax Act s.128.1(4) (deemed disposition on emigration) and the s.128.1(10) definition "excluded right or interest" | Justice Canada (laws-lois) | https://laws-lois.justice.gc.ca/eng/XML/I-3.3.xml | Point-in-time 2026-06-18, current to 2026-06-21 | 2026-10-22 | 1,714 | 93 |
| `gov/qpp-quebec-pension-plan-retraite-quebec-pages.txt` | Retraite Québec pages: Québec Pension Plan overview, retirement pension (eligibility, age 60-72 adjustments, calculation, supplement), 2026 key data | Retraite Québec | https://www.retraitequebec.gouv.qc.ca/en/programs/quebec-pension-plan (+ 6 pages listed in the file) | Live pages, no page dates; 2026 figures | 2026-10-22 | 5,938 | 762 |

## `downloads/` additions (originals; never execute)

| Folder | New files |
|---|---|
| `downloads/ciro/` | `MFDR-EN-2026-04-01.pdf` |
| `downloads/csa/` | `bcsc-ni-81-106-2026-04-22.pdf`, `osc-rule-32-505-2015-06-05.pdf`, `osc-cp-32-505-2015-06-05.pdf` |
| `downloads/cra/` | `ency-services-tax-international-non-residents-individuals-leaving-entering-canada-non-residents-leaving-canada-emigrants.html`, `-agency-services-tax-international-non-residents-individuals-leaving-entering-canada-non-residents-dispositions-property.html` (slugs truncated to 120 characters by the builder, as in the existing CRA set) |
| `downloads/gov/` | 7 Retraite Québec HTML pages (exact names in the `Original saved:` lines of `gov/qpp-quebec-pension-plan-retraite-quebec-pages.txt`) |

The CIRO HTML pages (GN-5300-21-001, GN-5400-23-001, GN-FORM1-22-001, MSN-0065, the LSERM page and the guidance-notes index) have no saved originals, because they were read in the browser. This matches the main manifest's ciro.ca note.
