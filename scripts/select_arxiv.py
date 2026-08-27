#!/usr/bin/env python3
"""Select ~200 balanced arXiv items (year>=2021), prefer thesis/dissertation-labeled."""
import json, re, random

random.seed(42)
items = json.load(open("tmp/arxiv_meta.json", encoding="utf-8"))

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

# 1) thesis-labeled first, newest first
thesis = [i for i in items if is_thesis(i)]
thesis.sort(key=lambda x: (-x["year"], x["id"]))

# 2) fill remaining from non-thesis, balancing category groups
non_thesis = [i for i in items if not is_thesis(i)]
# shuffle deterministically then we'll round-robin by category to balance
pool_by_cat = {}
for i in non_thesis:
    pool_by_cat.setdefault(cat_group(i), []).append(i)
for k in pool_by_cat:
    pool_by_cat[k].sort(key=lambda x: (-x["year"], x["id"]))

chosen_ids = set()
chosen = []
def add(it):
    if it["id"] not in chosen_ids:
        chosen_ids.add(it["id"]); chosen.append(it)

# Add up to 130 thesis items
for it in thesis[:130]:
    add(it)

# Fill up to 200 with balanced category rotation across non_thesis
target = 200
order = ["cs", "stat", "math", "econ", "other"]
ptr = {k: 0 for k in pool_by_cat}
guard = 0
while len(chosen) < target:
    progressed = False
    for g in order:
        if len(chosen) >= target: break
        lst = pool_by_cat.get(g)
        if not lst: continue
        p = ptr[g]
        if p < len(lst):
            it = lst[p]
            if it["id"] not in chosen_ids:
                add(it); progressed = True
            ptr[g] += 1
    guard += 1
    if not progressed or guard > 10000:
        break

# If still short (unlikely), top up with any remaining thesis
for it in thesis:
    if len(chosen) >= target: break
    add(it)

# Final sort newest first
chosen.sort(key=lambda x: (-x["year"], x["id"]))
print("chosen:", len(chosen))
from collections import Counter
print("thesis-labeled:", sum(1 for i in chosen if is_thesis(i)))
print("by cat group:", Counter(cat_group(i) for i in chosen))
print("by year:", sorted(Counter(i["year"] for i in chosen).items()))

json.dump(chosen, open("tmp/arxiv_chosen.json", "w", encoding="utf-8"),
          ensure_ascii=False, indent=1)
print("wrote tmp/arxiv_chosen.json")
