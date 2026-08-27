#!/usr/bin/env python3
"""Fetch arXiv entries within a submittedDate range (2021-2023) using date filter."""
import urllib.request, urllib.parse, json, time, re, xml.etree.ElementTree as ET

BASE = "http://export.arxiv.org/api/query"
NS = {"atom": "http://www.w3.org/2005/Atom", "arxiv": "http://arxiv.org/schemas/atom"}
OUT = "tmp/arxiv_older.json"

CATS = ["stat.ML", "math.OC", "cs.LG", "cs.AI", "math.ST",
        "econ.GN", "econ.TH", "cs.CY", "cs.GT", "physics.soc-ph"]
RANGE = "submittedDate:[202101010000 TO 202312312359]"
PER_PAGE = 200


def fetch(cat, start):
    search = f"cat:{cat} AND {RANGE}"
    params = {"search_query": search, "start": start, "max_results": PER_PAGE,
              "sortBy": "submittedDate", "sortOrder": "descending"}
    url = BASE + "?" + urllib.parse.urlencode(params)
    for a in range(4):
        try:
            req = urllib.request.Request(url, headers={"User-Agent": "livro-worker/1.0"})
            with urllib.request.urlopen(req, timeout=60) as r:
                return r.read()
        except Exception as e:
            print(" retry", a, e); time.sleep(3)
    return None


def parse(xml_bytes):
    root = ET.fromstring(xml_bytes); out = []
    for e in root.findall("atom:entry", NS):
        aid = e.find("atom:id", NS).text.strip()
        m = re.search(r"arxiv\.org/abs/([^v]+)(v\d+)?$", aid)
        if not m: continue
        arxiv_id = m.group(1)
        title = " ".join(e.find("atom:title", NS).text.split())
        summary = " ".join(e.find("atom:summary", NS).text.split())
        authors = [a.find("atom:name", NS).text for a in e.findall("atom:author", NS)]
        year = int(e.find("atom:published", NS).text[:4])
        prim = e.find("arxiv:primary_category", NS)
        cat = prim.get("term") if prim is not None else ""
        out.append({"id": arxiv_id, "title": title, "summary": summary,
                    "authors": authors, "year": year, "category": cat,
                    "abs": "https://arxiv.org/abs/"+arxiv_id,
                    "pdf": "https://arxiv.org/pdf/"+arxiv_id+".pdf"})
    return out


seen = {}
for cat in CATS:
    print("==", cat)
    for page in range(40):
        data = fetch(cat, page*PER_PAGE)
        if not data: break
        ents = parse(data)
        if not ents: break
        for en in ents:
            if 2021 <= en["year"] <= 2023 and en["id"] not in seen:
                seen[en["id"]] = en
        if len(ents) < PER_PAGE:
            break
        time.sleep(3)
    print("  running total", len(seen))

items = list(seen.values())
items.sort(key=lambda x: (-x["year"], x["id"]))
json.dump(items, open(OUT, "w", encoding="utf-8"), ensure_ascii=False, indent=1)
print("OLDER unique (2021-2023):", len(items), "->", OUT)
