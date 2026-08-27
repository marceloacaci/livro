#!/usr/bin/env python3
"""Replace withdrawn/unavailable arXiv IDs in tmp/arxiv_chosen.json with fresh valid
candidates (prefer same year to preserve the 2021-2026 spread)."""
import json, os, re, urllib.request, time

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
CHOSEN = os.path.join(ROOT, "tmp", "arxiv_chosen.json")
META = os.path.join(ROOT, "tmp", "arxiv_meta.json")
OLDER = os.path.join(ROOT, "tmp", "arxiv_older.json")
PDF_DIR = os.path.join(ROOT, "artigos", "teses-b2")

items = json.load(open(CHOSEN, encoding="utf-8"))
pool = json.load(open(META, encoding="utf-8")) + json.load(open(OLDER, encoding="utf-8"))
pool_ids = {p["id"]: p for p in pool}

WITHDRAWN = ["2301.11197", "2101.07674"]


def has_pdf(aid, timeout=60):
    try:
        req = urllib.request.Request("https://arxiv.org/pdf/" + aid + ".pdf",
                                     headers={"User-Agent": "Mozilla/5.0 livro-worker"})
        with urllib.request.urlopen(req, timeout=timeout) as r:
            data = r.read(800)
        return data[:4] == b"%PDF"
    except Exception:
        return False


def download(aid, n=5):
    for attempt in range(n):
        try:
            req = urllib.request.Request("https://arxiv.org/pdf/" + aid + ".pdf",
                                         headers={"User-Agent": "Mozilla/5.0 livro-worker"})
            with urllib.request.urlopen(req, timeout=120) as r:
                data = r.read()
            if data[:4] == b"%PDF":
                open(os.path.join(PDF_DIR, aid + ".pdf"), "wb").write(data)
                return True
        except Exception as e:
            print("   dl err", aid, e)
        time.sleep(3)
    return False


for wid in WITHDRAWN:
    if not any(i["id"] == wid for i in items):
        continue
    wy = next(i["year"] for i in items if i["id"] == wid)
    print(f"replacing {wid} (year {wy}) ...")
    # candidates: same year, not already chosen, prefer thesis-labeled
    chosen_ids = {i["id"] for i in items}
    cands = [p for p in pool if p["id"] not in chosen_ids and p["year"] == wy]
    cands.sort(key=lambda x: (0 if re.search(r"thesis|dissertation", (x["title"]+" "+x["summary"]), re.I) else 1, x["id"]))
    repl = None
    for c in cands:
        if has_pdf(c["id"]):
            repl = c; break
    if not repl:
        # relax year
        cands2 = [p for p in pool if p["id"] not in chosen_ids]
        cands2.sort(key=lambda x: (abs(x["year"]-wy), 0 if re.search(r"thesis|dissertation",(x["title"]+" "+x["summary"]),re.I) else 1, x["id"]))
        for c in cands2:
            if has_pdf(c["id"]):
                repl = c; break
    if not repl:
        print("  !! no replacement found for", wid); continue
    ok = download(repl["id"])
    if not ok:
        print("  !! download failed for replacement", repl["id"]); continue
    # swap in chosen
    for idx, i in enumerate(items):
        if i["id"] == wid:
            items[idx] = repl
            break
    print(f"  -> replaced with {repl['id']} (year {repl['year']}, {os.path.getsize(os.path.join(PDF_DIR, repl['id']+'.pdf'))} bytes)")

items.sort(key=lambda x: (-x["year"], x["id"]))
json.dump(items, open(CHOSEN, "w", encoding="utf-8"), ensure_ascii=False, indent=1)
print("updated tmp/arxiv_chosen.json, total", len(items))
