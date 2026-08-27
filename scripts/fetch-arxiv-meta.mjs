#!/usr/bin/env node
/**
 * scripts/fetch-arxiv-meta.mjs
 * Fetch arXiv metadata in batches of 50 for the technology theme:
 *   cat:cs.ET OR cat:cs.SE OR cat:cs.NI OR cat:cs.CR OR cat:eess.SP
 * Writes JSON lines to .cache/arxiv-meta.json (append, dedup by id).
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');
const CACHE = path.join(ROOT, '.cache', 'arxiv-meta.json');

const SEARCH =
  'cat:cs.ET+OR+cat:cs.SE+OR+cat:cs.NI+OR+cat:cs.CR+OR+cat:eess.SP';

function sleep(ms) {
  return new Promise((r) => setTimeout(r, ms));
}

function loadExisting() {
  if (!fs.existsSync(CACHE)) return { ids: new Set(), rows: [] };
  const txt = fs.readFileSync(CACHE, 'utf8').trim();
  if (!txt) return { ids: new Set(), rows: [] };
  const rows = txt
    .split('\n')
    .filter(Boolean)
    .map((l) => JSON.parse(l));
  return { ids: new Set(rows.map((r) => r.id)), rows };
}

async function fetchBatch(start) {
  const url =
    `http://export.arxiv.org/api/query?search_query=${SEARCH}` +
    `&start=${start}&max_results=50&sortBy=submittedDate&sortOrder=descending`;
  const res = await fetch(url);
  if (!res.ok) throw new Error(`HTTP ${res.status} at start=${start}`);
  return await res.text();
}

function parseFeed(xml) {
  const entries = [];
  const re = /<entry>([\s\S]*?)<\/entry>/g;
  let m;
  while ((m = re.exec(xml)) !== null) {
    const e = m[1];
    const get = (tag) => {
      const r = new RegExp(`<${tag}>([\\s\\S]*?)</${tag}>`);
      const mm = e.match(r);
      return mm ? mm[1].trim() : '';
    };
    const idUrl = get('id');
    const id = idUrl.split('/abs/')[1] || idUrl;
    const title = get('title').replace(/\s+/g, ' ').trim();
    const summary = get('summary').replace(/\s+/g, ' ').trim();
    const published = get('published');
    const year = parseInt(published.slice(0, 4), 10);
    const authors = (e.match(/<author>[\s\S]*?<name>([\s\S]*?)<\/name>/g) || [])
      .map((a) => a.replace(/[\s\S]*<name>/, '').replace(/<\/name>[\s\S]*/, '').trim())
      .join(', ');
    const cats = (e.match(/<category[^>]*term="([^"]+)"/g) || [])
      .map((c) => c.replace(/[\s\S]*term="/, '').replace(/"[\s\S]*/, ''));
    entries.push({ id, title, authors, year, summary, categories: cats });
  }
  return entries;
}

async function main() {
  const maxStart = parseInt(process.argv[2] || '100', 10); // total to scan
  const { ids, rows } = loadExisting();
  let added = 0;
  let start = 0;
  // find last start if cache already has many
  for (; start < maxStart; start += 50) {
    let xml, entries;
    try {
      xml = await fetchBatch(start);
      entries = parseFeed(xml);
    } catch (err) {
      console.error(`⚠ fetch failed at start=${start}: ${err.message}`);
      await sleep(2000);
      continue;
    }
    if (entries.length === 0) {
      console.log(`No more entries at start=${start}. Stopping.`);
      break;
    }
    for (const en of entries) {
      if (ids.has(en.id)) continue;
      ids.add(en.id);
      rows.push(en);
      added++;
    }
    console.log(
      `start=${start}: fetched ${entries.length}, total=${rows.length}, +${added} new`
    );
    await sleep(400);
  }
  fs.writeFileSync(CACHE, rows.map((r) => JSON.stringify(r)).join('\n'));
  console.log(`\nDone. Cache has ${rows.length} unique entries (+${added} this run).`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
