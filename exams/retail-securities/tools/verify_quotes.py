#!/usr/bin/env python3
"""Gate 2-R — mechanical contiguous-quote re-verification for the Retail Securities exam.

Usage:  python3 -I exams/retail-securities/tools/verify_quotes.py <sidecar.json | bank.json> [...]

Accepts study-guide provenance sidecars ({"claims": [{"kind": "R", "quote", "source_file"}]})
and question files ({"questions": [{"source_quote": "..."}]}; source file parsed from the
text after " — "). Each quote must appear contiguously in its source file after the same
normalization the Supervisor pipeline adopted (NFKD, smart punctuation, ligatures ﬀ/ﬁ/ﬂ,
U+2010–U+2015 hyphens/dashes, whitespace). If the named file doesn't contain it, the whole
corpus is searched so a wrong path is reported separately from a fabrication.

Exit 1 if any quote is not found anywhere.
"""
import json
import re
import sys
import unicodedata
from pathlib import Path

EXAM = Path(__file__).resolve().parent.parent          # exams/retail-securities
REPO = EXAM.parent.parent
CORPUS_DIRS = [EXAM / "research" / "sources", REPO / "research" / "sources" / "rules"]

TRANS = str.maketrans({
    "‘": "'", "’": "'", "‚": "'", "‛": "'",
    "“": '"', "”": '"', "„": '"', "«": '"', "»": '"',
    "‐": "-", "‑": "-", "‒": "-", "–": "-", "—": "-", "―": "-", "−": "-",
    " ": " ", "•": " ", "▪": " ", "": " ",
})


def norm(s: str) -> str:
    s = unicodedata.normalize("NFKD", s)  # also expands ligatures ﬀ ﬁ ﬂ
    s = s.translate(TRANS)
    s = "".join(c for c in s if not unicodedata.combining(c))
    s = re.sub(r"-\s*\n\s*", "-", s)       # line-wrapped hyphenation keeps the hyphen
    s = re.sub(r"\s+", " ", s)
    return s.strip().lower()


_cache: dict[Path, str] = {}


def text(path: Path) -> str:
    if path not in _cache:
        _cache[path] = norm(path.read_text(errors="ignore"))
    return _cache[path]


def corpus_files():
    for d in CORPUS_DIRS:
        if d.exists():
            yield from (p for p in d.rglob("*.txt") if "Practice-Exam" not in p.name)


def resolve(source_file: str | None) -> Path | None:
    if not source_file:
        return None
    for base in (EXAM, REPO, EXAM / "research" / "sources"):
        p = (base / source_file).resolve()
        if p.is_file():
            return p
    return None


def items(doc):
    if "claims" in doc:
        for c in doc["claims"]:
            if c.get("kind") == "R":
                yield c.get("outcome", "?"), c.get("quote", ""), c.get("source_file")
    for q in doc.get("questions", []):
        sq = q.get("source_quote")
        if sq:
            m = re.match(r'\s*"(.*)"\s*[—-]+\s*(.*)$', sq, re.S)
            quote, loc = (m.group(1), m.group(2)) if m else (sq, "")
            f = re.search(r"[\w./-]+\.txt", loc)
            yield q["id"], quote, f.group(0) if f else None


def main(paths):
    ok = wrong_file = missing = 0
    for p in paths:
        doc = json.loads(Path(p).read_text())
        for ref, quote, source_file in items(doc):
            q = norm(quote.strip().strip('"'))
            if len(q) < 12:
                print(f"SHORT     {p} {ref}: quote too short to verify: {quote!r}")
                missing += 1
                continue
            f = resolve(source_file)
            if f and q in text(f):
                ok += 1
                continue
            hit = next((c for c in corpus_files() if q in text(c)), None)
            if hit:
                wrong_file += 1
                print(f"WRONGFILE {p} {ref}: found in {hit.relative_to(REPO)} (sidecar says {source_file})")
            else:
                missing += 1
                print(f"NOTFOUND  {p} {ref}: {quote[:110]!r} (sidecar file: {source_file})")
    print(f"\nverified {ok} · wrong file {wrong_file} · NOT FOUND {missing}")
    return 1 if missing else 0


if __name__ == "__main__":
    sys.exit(main(sys.argv[1:]))
