#!/usr/bin/env python3
"""Re-select 200 arXiv items with a 2021-2026 year spread, prefer thesis/dissertation."""
import json, re, os

newer = json.load(open("tmp/arxiv_meta.json", encoding="utf-8"))
older = json.load(open("tmp/arxiv_older.json", encoding="utf-8"))
all_items = newer + older

def is_thesis(it):
    return bool(re.search(r"thesis|dissertation|ph\.?\s*d|habilitation",
                          (it["title"] + " " + it["summary"]), re.I))

def cat_group(it):
    c = it["category"]
    if c.startswith("cs"): return "cs"
    if c.startswith("math"): return "math"
    if c.startswith("stat"): return "stat"
    if c.startswith("econ"): return "econ"
    return "other"

# Dedupe
seen = {}
for i in all_items:
    seen.setdefault(i["id"], i)
items = list(seen.values())

# Build pools
thesis_items = [i for i in items if is_thesis(i)]
non_thesis = [i for i in items if not is_thesis(i)]
thesis_items.sort(key=lambda x: (-x["year"], x["id"]))
non_thesis.sort(key=lambda x: (-x["year"], x["id"]))

# Plan: 40 per year across 2021-2026 (6 years) = 240 slots, fill 200
# Prefer thesis-labeled per year; top up with non-thesis.
YEARS = [2021, 2022, 2023, 2024, 2025, 2026]
PER_YEAR = 34  # 6*34 = 204 -> trim to 200

chosen_ids = set()
chosen = []

def take(pool, n, year):
    out = []
    for it in pool:
        if len(out) >= n: break
        if it["year"] == year and it["id"] not in chosen_ids:
            out.append(it); chosen_ids.add(it["id"])
    return out

# round 1: thesis per year
for y in YEARS:
    chosen += take(thesis_items, PER_YEAR, y)

# round 2: top up with non-thesis per year to reach PER_YEAR
for y in YEARS:
    have = sum(1 for c in chosen if c["year"] == y)
    need = PER_YEAR - have
    if need > 0:
        chosen += take(non_thesis, need, y)

# ensure category balance among non-thesis already; trim to 200 (keep newest-ish spread)
chosen.sort(key=lambda x: (-x["year"], x["id"]))
# If over 200, drop extras from the year with most (but keep >=30 each)
while len(chosen) > 200:
    # find year with count > 30 and most entries
    counts = {}
    for c in chosen: counts[c["year"]] = counts.get(c["year"], 0) + 1
    cand = max((y for y in counts if counts[y] > 30), default=None)
    if cand is None: break
    # remove one from that year (oldest among it)
    idx = next(i for i, c in enumerate(chosen) if c["year"] == cand)
    dropped = chosen.pop(idx)
    chosen_ids.discard(dropped["id"])

# Final sort newest first
chosen.sort(key=lambda x: (-x["year"], x["id"]))
from collections import Counter
print("chosen:", len(chosen))
print("by year:", sorted(Counter(i["year"] for i in chosen).items()))
print("thesis-labeled:", sum(1 for i in chosen if is_thesis(i)))
print("by cat group:", Counter(cat_group(i) for i in chosen))
json.dump(chosen, open("tmp/arxiv_chosen.json", "w", encoding="utf-8"),
          ensure_ascii=False, indent=1)
print("wrote tmp/arxiv_chosen.json")
