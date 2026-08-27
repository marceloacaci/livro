#!/usr/bin/env python3
"""Replace withdrawn id 2601.01051 with a fresh valid arXiv candidate (has PDF)."""
import json, os, re, urllib.request, time

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
CHOSEN = os.path.join(ROOT, "tmp", "arxiv_chosen.json")
META = os.path.join(ROOT, "tmp", "arxiv_meta.json")
PDF_DIR = os.path.join(ROOT, "artigos", "teses-b2")

items = json.load(open(CHOSEN, encoding="utf-8"))
metapool = json.load(open(META, encoding="utf-8"))
chosen_ids = {i["id"] for i in items}

# find a candidate not already chosen, prefer one that returns a PDF
def has_pdf(aid):
    url = "https://arxiv.org/pdf/" + aid + ".pdf"
    try:
        req = urllib.request.Request(url, method="HEAD" if False else "GET",
                                     headers={"User-Agent": "livro-worker/1.0"})
        # just GET first bytes
        req = urllib.request.Request(url, headers={"User-Agent": "Mozilla/5.0 livro-worker"})
        with urllib.request.urlopen(req, timeout=40) as r:
            head = r.read(8)
        return head.startswith(b"%PDF")
    except Exception:
        return False

# candidates: skip any already chosen; pick thesis-labeled preferred
cands = [m for m in metapool if m["id"] not in chosen_ids]
cands.sort(key=lambda x: (-x["year"], x["id"]))
repl = None
for c in cands:
    if re.search(r"thesis|dissertation", (c["title"]+" "+c["summary"]), re.I):
        if has_pdf(c["id"]):
            repl = c; break
if not repl:
    for c in cands:
        if has_pdf(c["id"]):
            repl = c; break
print("replacement:", repl["id"] if repl else None)
if not repl:
    print("NO REPLACEMENT FOUND"); raise SystemExit(1)

# download replacement
fn = repl["id"] + ".pdf"
path = os.path.join(PDF_DIR, fn)
for attempt in range(5):
    try:
        req = urllib.request.Request("https://arxiv.org/pdf/"+repl["id"]+".pdf",
                                     headers={"User-Agent": "Mozilla/5.0 livro-worker"})
        with urllib.request.urlopen(req, timeout=120) as r:
            data = r.read()
        if data[:4] == b"%PDF":
            open(path, "wb").write(data)
            print("downloaded replacement ->", fn, len(data), "bytes")
            break
        print("not pdf, retry")
    except Exception as e:
        print("err", e); time.sleep(3)

# remove withdrawn from chosen and append replacement
items = [i for i in items if i["id"] != "2601.01051"]
items.append(repl)
items.sort(key=lambda x: (-x["year"], x["id"]))
json.dump(items, open(CHOSEN, "w", encoding="utf-8"), ensure_ascii=False, indent=1)
print("chosen now", len(items), "-> replaced withdrawn with", repl["id"])
