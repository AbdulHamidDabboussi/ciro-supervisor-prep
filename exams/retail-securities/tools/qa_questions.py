#!/usr/bin/env python3
"""Scripted gates for the lean Retail Securities question pipeline (DRAFTING-SPEC-LEAN.md).

  python3 -I tools/qa_questions.py check  <batch.json ...>
  python3 -I tools/qa_questions.py blind  <batch.json ...> --out DIR --groups 1-3,4-6,7-9
  python3 -I tools/qa_questions.py grade  <batch.json ...> --results R1.json [R2.json ...] --out grade.json
  python3 -I tools/qa_questions.py merge  <batch.json ...> --grade grade.json

check  structure, taxonomy ceiling, 4 distinct options, ID/element/outcome agreement, STE
       sentence length (<= 25 words) on stem/options/rationale, source_quote verification,
       stem near-duplicates (token Jaccard > 0.6, also against bank.json), key/difficulty mix.
grade  Gate 1: solver wrong, low confidence or ambiguous -> kill; everything else passes.
merge  passing items -> status "reviewed" in question-bank/bank.json (existing items kept).
Exit 1 from check if any hard error.
"""
import argparse
import importlib.util
import json
import re
import sys
from collections import Counter, defaultdict
from pathlib import Path

EXAM = Path(__file__).resolve().parent.parent
TOOLS = Path(__file__).resolve().parent
BANK = EXAM / "question-bank" / "bank.json"
TAX = {"Remember": 0, "Understand": 1, "Apply": 2, "Analyze": 3}


def load_tool(name):
    spec = importlib.util.spec_from_file_location(name, TOOLS / f"{name}.py")
    mod = importlib.util.module_from_spec(spec)
    spec.loader.exec_module(mod)
    return mod


ste = load_tool("ste_lint")
vq = load_tool("verify_quotes")


def load_items(paths):
    items = []
    for p in paths:
        items += json.loads(Path(p).read_text())["questions"]
    return items


def ceilings():
    syl = json.loads((EXAM / "study-material" / "syllabus.json").read_text())
    return {o["id"]: o["taxonomy"] for e in syl["elements"] for o in e["outcomes"]}


def toks(s):
    return set(re.findall(r"[a-z0-9]+", s.lower())) - {"the", "a", "an", "of", "to", "and", "is", "in", "which", "what", "for"}


def long_sentences(text):
    clean = ste.strip_quotes(re.sub(r"[*_`]", "", text))
    return [s for s in ste.sentences(clean) if len(ste.words(s)) > ste.MAX_WORDS]


def check(paths):
    items = load_items(paths)
    ceil = ceilings()
    errs, warns = [], []
    ids = Counter(q.get("id") for q in items)
    for i, n in ids.items():
        if n > 1:
            errs.append(f"{i}: duplicate id")
    for q in items:
        i = q.get("id", "?")
        for f in ("id", "element", "outcome", "taxonomy", "type", "stem", "options", "answer", "rationale", "difficulty", "status"):
            if f not in q:
                errs.append(f"{i}: missing {f}")
        if not re.fullmatch(r"RSE-E[1-9]-\d{4}", str(i)):
            errs.append(f"{i}: bad id format")
        elif str(q.get("element")) != i[5] or not str(q.get("outcome", "")).startswith(f"{q.get('element')}."):
            errs.append(f"{i}: id/element/outcome disagree")
        if q.get("type") != "standard":
            errs.append(f"{i}: type must be standard")
        opts = q.get("options", {})
        if sorted(opts) != ["A", "B", "C", "D"] or len({str(v).strip().lower() for v in opts.values()}) != 4:
            errs.append(f"{i}: options must be 4 distinct A-D")
        if q.get("answer") not in opts:
            errs.append(f"{i}: answer key missing")
        o = q.get("outcome")
        if o not in ceil:
            errs.append(f"{i}: unknown outcome {o}")
        elif TAX.get(q.get("taxonomy"), 9) > TAX[ceil[o]]:
            errs.append(f"{i}: taxonomy {q.get('taxonomy')} > ceiling {ceil[o]}")
        if q.get("difficulty") not in ("easy", "medium", "hard"):
            errs.append(f"{i}: bad difficulty")
        for field in ["stem", "rationale"] + [f"options.{k}" for k in "ABCD"]:
            text = q.get("stem") if field == "stem" else q.get("rationale") if field == "rationale" else opts.get(field[-1], "")
            for s in long_sentences(str(text)):
                errs.append(f"{i}: STE >25 words in {field}: {s[:90]}")
        if not q.get("source_quote") and not q.get("qa_note"):
            warns.append(f"{i}: neither source_quote nor qa_note")
    # quotes (verify_quotes' question parser)
    missing = 0
    for ref, quote, sf in vq.items({"questions": [q for q in items if q.get("source_quote")]}):
        qn = vq.norm(quote.strip().strip('"'))
        f = vq.resolve(sf)
        if not (f and qn in vq.text(f)) and not any(qn in vq.text(c) for c in vq.corpus_files()):
            missing += 1
            errs.append(f"{ref}: source_quote NOT FOUND in corpus")
    # near-duplicates (new vs new, new vs bank)
    pool = [(q["id"], toks(q.get("stem", "") + " " + q.get("options", {}).get(q.get("answer"), ""))) for q in items]
    if BANK.exists():
        pool += [(q["id"], toks(q["stem"] + " " + q["options"][q["answer"]])) for q in json.loads(BANK.read_text())["questions"]]
    for a in range(len(items)):
        for b in range(a + 1, len(pool)):
            x, y = pool[a][1], pool[b][1]
            if x and y and len(x & y) / len(x | y) > 0.6:
                warns.append(f"near-duplicate: {pool[a][0]} ~ {pool[b][0]}")
    # mix
    by_el = defaultdict(list)
    for q in items:
        by_el[q.get("element")].append(q)
    for el, qs in sorted(by_el.items()):
        keys = Counter(q.get("answer") for q in qs)
        diff = Counter(q.get("difficulty") for q in qs)
        outs = len({q.get("outcome") for q in qs})
        print(f"E{el}: {len(qs)} items · outcomes {outs} · keys {dict(sorted(keys.items()))} · diff {dict(diff)} · quoted {sum(1 for q in qs if q.get('source_quote'))}")
    for w in warns:
        print("WARN ", w)
    for e in errs:
        print("ERROR", e)
    print(f"\n{len(items)} items · {len(errs)} errors · {len(warns)} warnings · quotes not found {missing}")
    return 1 if errs else 0


def blind(paths, out, groups):
    items = load_items(paths)
    out = Path(out)
    out.mkdir(parents=True, exist_ok=True)
    for g in groups.split(","):
        lo, hi = map(int, g.split("-"))
        sel = [{"id": q["id"], "stem": q["stem"], "options": q["options"]} for q in items if lo <= int(q["element"]) <= hi]
        (out / f"blind-E{lo}-E{hi}.json").write_text(json.dumps({"questions": sel}, indent=1, ensure_ascii=False))
        print(f"blind-E{lo}-E{hi}.json: {len(sel)} items")


def grade(paths, results, out):
    items = {q["id"]: q for q in load_items(paths)}
    answers = {}
    for r in results:
        for a in json.loads(Path(r).read_text())["answers"]:
            answers[a["id"]] = a
    passed, killed = [], []
    for i, q in items.items():
        a = answers.get(i)
        if not a:
            killed.append({"id": i, "reason": "no solver answer"})
        elif a.get("answer") != q["answer"]:
            killed.append({"id": i, "reason": f"solver {a.get('answer')} vs key {q['answer']}: {a.get('note', '')}"})
        elif a.get("confidence") == "low" or a.get("ambiguous"):
            killed.append({"id": i, "reason": f"correct but {a.get('confidence')} confidence / ambiguous={a.get('ambiguous')}: {a.get('note', '')}"})
        else:
            passed.append(i)
    Path(out).write_text(json.dumps({"passed": passed, "killed": killed}, indent=1, ensure_ascii=False))
    per = Counter(i[4:6] for i in passed)
    print(f"passed {len(passed)} · killed {len(killed)} · per element {dict(sorted(per.items()))}")
    for k in killed:
        print("KILL", k["id"], k["reason"][:150])


def merge(paths, grade_file):
    g = json.loads(Path(grade_file).read_text())
    ok = set(g["passed"])
    new = [dict(q, status="reviewed") for q in load_items(paths) if q["id"] in ok]
    bank = json.loads(BANK.read_text()) if BANK.exists() else {"meta": {}, "questions": []}
    have = {q["id"] for q in bank["questions"]}
    bank["questions"] += [q for q in new if q["id"] not in have]
    bank["questions"].sort(key=lambda q: (q["element"], q["id"]))
    bank["meta"].update({"exam": "CIRO Retail Securities Exam", "count": len(bank["questions"]),
                         "process": "lean pipeline (DRAFTING-SPEC-LEAN.md): drafted from audited study guide v1.1; scripted gates; Gate 1 blind solve"})
    BANK.write_text(json.dumps(bank, indent=2, ensure_ascii=False) + "\n")
    print(f"bank.json: {len(bank['questions'])} reviewed items")


if __name__ == "__main__":
    ap = argparse.ArgumentParser()
    ap.add_argument("cmd", choices=["check", "blind", "grade", "merge"])
    ap.add_argument("batches", nargs="+")
    ap.add_argument("--out")
    ap.add_argument("--groups", default="1-3,4-6,7-9")
    ap.add_argument("--results", nargs="*")
    ap.add_argument("--grade")
    a = ap.parse_args()
    if a.cmd == "check":
        sys.exit(check(a.batches))
    if a.cmd == "blind":
        blind(a.batches, a.out, a.groups)
    if a.cmd == "grade":
        grade(a.batches, a.results, a.out)
    if a.cmd == "merge":
        merge(a.batches, a.grade)
