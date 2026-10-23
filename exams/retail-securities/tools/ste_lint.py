#!/usr/bin/env python3
"""ASD-STE100 writing-rule lint for study-guide Markdown (see STUDY-GUIDE-SPEC.md).

Usage:  python3 -I exams/retail-securities/tools/ste_lint.py E1.md [E2.md ...] [--verbose]

Checks prose only. Skipped: fenced code blocks, table rows, headings, the italic
"*Sources: …*" lines, and the words inside verbatim quotations ("…" spans of 5+ words,
which are rule text and exempt). Reports per outcome section:

  GATE    long      sentences over 25 words
  GATE    longpara  paragraphs (or callouts) over 6 sentences
  signal  passive   likely passive voice ("is/are/was/were/be/been/being" + past participle)
  signal  ing       "-ing" words outside an allowlist of technical names

Exit 1 if any GATE count is non-zero.
"""
import re
import sys
from pathlib import Path

MAX_WORDS = 25
MAX_SENTENCES = 6

# "-ing" words that are technical names or normal nouns, not verb forms.
ING_OK = {
    "trading", "selling", "short-selling", "front-running", "running", "financing", "investing", "pricing",
    "rating", "ratings", "holding", "holdings", "earnings", "offering", "offerings", "listing", "listings",
    "underwriting", "accounting", "funding", "lending", "borrowing", "banking", "building", "spending",
    "marketing", "planning", "harvesting", "splitting", "laundering", "reporting", "rebalancing", "timing",
    "outstanding", "remaining", "existing", "following", "including", "regarding", "pending", "during",
    "something", "nothing", "anything", "everything", "thing", "things", "string", "spring", "king",
    "ongoing", "opening", "closing", "meeting", "setting", "training", "booking", "wording", "standing",
    "ceiling", "beginning", "morning", "evening", "warning", "warnings", "bring", "sing", "ring",
    "processing", "monitoring", "matching", "clearing", "settling", "netting", "hedging", "indexing",
    "tracking", "gating", "churning", "herding", "anchoring", "framing", "smoothing", "operating",
    "manufacturing", "insurance-backed", "rating-agency", "self-directed", "price-weighted",
}
ABBREV = r"(?:e\.g|i\.e|etc|vs|No|Nos|s|ss|para|paras|Inc|Ltd|Corp|Co|U\.S|U\.K|approx|incl|Mr|Ms|Dr|St|cf|al)"
BE = r"\b(?:is|are|was|were|be|been|being|gets|got)\b"
PARTICIPLE = r"\b(?:\w+ed|made|done|given|taken|held|paid|sold|bought|known|shown|seen|set|kept|sent|written|told|found|met|put|built|left|lost|read|run|brought|chosen|drawn|grown|spent|won|withheld)\b"


def strip_quotes(text: str) -> str:
    # Verbatim quotations (5+ words) are exempt from length rules: replace them by one token.
    return re.sub(r"[\"“][^\"”]{0,600}?[\"”]", lambda m: "QUOTE" if len(m.group(0).split()) >= 5 else m.group(0), text)


def sentences(par: str):
    p = re.sub(rf"\b({ABBREV})\.", r"\1<DOT>", par)
    p = re.sub(r"(\d)\.(\d)", r"\1<DOT>\2", p)
    parts = re.split(r"(?<=[.!?])\s+(?=[A-Z0-9“\"(*>])|(?<=[.!?])$", p)
    return [s.replace("<DOT>", ".").strip() for s in parts if s and s.strip()]


def words(s: str):
    return re.findall(r"[A-Za-z0-9$%][A-Za-z0-9$%'’.,/-]*", s)


def prose_blocks(md: str):
    """Yield (outcome, paragraph_text) for prose paragraphs, list items and callouts."""
    outcome = "intro"
    in_code = False
    buf = []

    def flush():
        if buf:
            yield_text = " ".join(buf).strip()
            buf.clear()
            return yield_text
        return None

    for raw in md.splitlines():
        line = raw.rstrip()
        if line.lstrip("> ").startswith("```"):
            in_code = not in_code
            t = flush()
            if t:
                yield outcome, t
            continue
        if in_code:
            continue
        m = re.match(r"^##\s+(\d+\.\d+)", line)
        if m:
            t = flush()
            if t:
                yield outcome, t
            outcome = m.group(1)
            continue
        body = re.sub(r"^\s*>\s?", "", line)
        if (not body.strip() or body.lstrip().startswith(("#", "|", "*Sources", "_Sources"))
                or re.match(r"^\s*[-*+]\s|^\s*\d+\.\s", body)):
            t = flush()
            if t:
                yield outcome, t
            if re.match(r"^\s*[-*+]\s|^\s*\d+\.\s", body):  # each list item is its own block
                yield outcome, re.sub(r"^\s*(?:[-*+]|\d+\.)\s", "", body)
            continue
        buf.append(body.strip())
    t = flush()
    if t:
        yield outcome, t


def lint(path: Path, verbose: bool):
    md = path.read_text()
    stats = {}
    issues = []
    for outcome, block in prose_blocks(md):
        st = stats.setdefault(outcome, {"sentences": 0, "long": 0, "longpara": 0, "passive": 0, "ing": 0})
        clean = strip_quotes(re.sub(r"[*_`]", "", block))
        sents = sentences(clean)
        st["sentences"] += len(sents)
        if len(sents) > MAX_SENTENCES:
            st["longpara"] += 1
            issues.append(f"{path.name} {outcome} PARA {len(sents)} sentences: {block[:90]}…")
        for s in sents:
            n = len(words(s))
            if n > MAX_WORDS:
                st["long"] += 1
                issues.append(f"{path.name} {outcome} LONG {n}w: {s[:140]}")
            st["passive"] += len(re.findall(BE + r"\s+(?:\w+ly\s+)?" + PARTICIPLE, s, flags=re.I))
            st["ing"] += sum(1 for w in re.findall(r"\b\w+ing\b", s.lower()) if w not in ING_OK)
    return stats, issues


def main(argv):
    verbose = "--verbose" in argv
    files = [Path(a) for a in argv if not a.startswith("--")]
    gate = 0
    for f in files:
        stats, issues = lint(f, verbose)
        tot = {k: sum(v[k] for v in stats.values()) for k in ("sentences", "long", "longpara", "passive", "ing")}
        gate += tot["long"] + tot["longpara"]
        print(f"{f.name}: {tot['sentences']} sentences · long>{MAX_WORDS}w {tot['long']} · paras>{MAX_SENTENCES} "
              f"{tot['longpara']} · passive~ {tot['passive']} · -ing~ {tot['ing']}")
        if verbose:
            for i in issues:
                print("   ", i)
    print(f"\nGATE: {gate} violation(s)")
    return 1 if gate else 0


if __name__ == "__main__":
    sys.exit(main(sys.argv[1:]))
