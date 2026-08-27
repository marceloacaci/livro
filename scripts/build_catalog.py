#!/usr/bin/env python3
"""Build js/articles-teses-b2.js from chosen metadata + downloaded PDFs.
Generates PT-BR summaries from title/abstract, verifies each PDF exists & is valid.
"""
import json, re, os, html

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
CHOSEN = os.path.join(ROOT, "tmp", "arxiv_chosen.json")
OUT_JS = os.path.join(ROOT, "js", "articles-teses-b2.js")
PDF_DIR = os.path.join(ROOT, "artigos", "teses-b2")

def slugify_title(t):
    t = t.lower()
    t = re.sub(r"[^a-z0-9]+", "-", t).strip("-")
    return t[:60]

def make_summary(title, abstract, cat, year):
    # Heuristic PT-BR summary: translate the gist using a small template based on abstract.
    abs_clean = re.sub(r"\s+", " ", abstract).strip()
    # Take first two sentences
    parts = re.split(r"(?<=[.!?])\s+", abs_clean)
    first = parts[0] if parts else abs_clean
    second = parts[1] if len(parts) > 1 else ""
    gist = (first + (" " + second if second else ""))[:360].strip()
    if not gist:
        gist = title
    area = {
        "cs": "ciência da computação",
        "math": "matemática",
        "stat": "estatística",
        "econ": "economia",
        "other": "área interdisciplinar",
    }.get(cat, "pesquisa")
    return f"Estudo de {area} ({year}) focado em: {gist}."

def tags_for(it):
    tags = ["teses"]
    c = it["category"]
    tags.append(c)
    if re.search(r"thesis|dissertation", (it["title"]+" "+it["summary"]), re.I):
        tags.append("tese")
    else:
        tags.append("artigo-teorico")
    # derive a keyword from title
    kw = re.findall(r"[A-Za-z]{4,}", it["title"])
    stop = set("with from using based via over under about into towards toward their our this that these those have has been are were can not but and for the".split())
    for w in kw:
        if w.lower() not in stop and len(w) <= 18:
            tags.append(w.lower())
            if len(tags) >= 5:
                break
    return tags[:6]

def main():
    items = json.load(open(CHOSEN, encoding="utf-8"))
    entries = []
    missing = []
    for it in items:
        fn = it["id"] + ".pdf"
        lp = os.path.join("artigos", "teses-b2", fn)
        full = os.path.join(PDF_DIR, fn)
        if not (os.path.isfile(full) and os.path.getsize(full) > 1000):
            missing.append(it["id"])
            continue
        # verify PDF magic
        with open(full, "rb") as f:
            head = f.read(5)
        if head != b"%PDF-":
            missing.append(it["id"] + "(notpdf)")
            continue
        cat = it["category"]
        summary = make_summary(it["title"], it["summary"], cat, it["year"])
        authors = "; ".join(it["authors"][:6])
        if len(it["authors"]) > 6:
            authors += " et al."
        entry = {
            "id": it["id"],
            "title": it["title"],
            "authors": authors,
            "year": it["year"],
            "venue": "arXiv",
            "tema": "teses",
            "filename": fn,
            "localPath": lp.replace("\\", "/"),
            "sourceUrl": it["abs"],
            "summary": summary,
            "tags": tags_for(it),
        }
        entries.append(entry)

    # Build JS
    lines = []
    lines.append("window.LIVRO_ARTICLES_TESES_B2 = [")
    for i, e in enumerate(entries):
        lines.append("  {")
        lines.append(f'    id: "{e["id"]}",')
        lines.append(f'    title: {json.dumps(e["title"], ensure_ascii=False)},')
        lines.append(f'    authors: {json.dumps(e["authors"], ensure_ascii=False)},')
        lines.append(f'    year: {e["year"]},')
        lines.append(f'    venue: "arXiv",')
        lines.append(f"    tema: 'teses',")
        lines.append(f'    filename: "{e["filename"]}",')
        lines.append(f'    localPath: "{e["localPath"]}",')
        lines.append(f'    sourceUrl: "{e["sourceUrl"]}",')
        lines.append(f'    summary: {json.dumps(e["summary"], ensure_ascii=False)},')
        lines.append(f'    tags: {json.dumps(e["tags"], ensure_ascii=False)}')
        comma = "," if i < len(entries) - 1 else ""
        lines.append("  }" + comma)
    lines.append("];")
    with open(OUT_JS, "w", encoding="utf-8") as f:
        f.write("\n".join(lines) + "\n")
    print(f"WROTE {len(entries)} entries -> {OUT_JS}")
    if missing:
        print(f"MISSING/DROPPED ({len(missing)}): {missing[:20]}")

if __name__ == "__main__":
    main()
