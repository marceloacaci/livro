#!/usr/bin/env node
/**
 * scripts/repair-tecnologia.mjs
 * 1. For each entry in js/articles-tecnologia.js, ensure its referenced PDF
 *    exists and is a valid %PDF; if missing/invalid, (re)download it.
 * 2. Remove orphaned PDFs in artigos/tecnologia/ not referenced by any entry.
 * Idempotent & safe.
 */
import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';
import { execFileSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');
const JS_PATH = path.join(ROOT, 'js', 'articles-tecnologia.js');
const PDF_DIR = path.join(ROOT, 'artigos', 'tecnologia');

const VAR_NAME = 'LIVRO_ARTICLES_TECNOLOGIA';

function loadEntries() {
  const code = fs.readFileSync(JS_PATH, 'utf8');
  const sb = { window: {} };
  vm.createContext(sb);
  vm.runInContext(code, sb);
  return sb.window[VAR_NAME];
}

function isValidPdf(p) {
  if (!fs.existsSync(p)) return false;
  const b = fs.readFileSync(p);
  return b.length >= 1000 && b.slice(0, 5).toString().startsWith('%PDF');
}

function downloadPdf(id, dest) {
  const url = `http://arxiv.org/pdf/${id}`;
  execFileSync('curl', ['-sL', '--max-time', '60', '-A', 'Mozilla/5.0 (compatible; LivroBot/1.0)', '-o', dest, url], { stdio: 'pipe' });
  const b = fs.readFileSync(dest);
  if (b.length < 1000 || !b.slice(0, 5).toString().startsWith('%PDF')) {
    if (fs.existsSync(dest)) fs.unlinkSync(dest);
    throw new Error('not a valid PDF');
  }
}

const entries = loadEntries();
let fixed = 0;
for (const e of entries) {
  const dest = path.join(ROOT, e.localPath);
  if (!isValidPdf(dest)) {
    try {
      downloadPdf(e.id, dest);
      fixed++;
      console.log(`  ✓ (re)downloaded ${e.id} -> ${e.filename} (${(fs.statSync(dest).size/1024|0)} KB)`);
    } catch (err) {
      console.error(`  ✗ ${e.id} failed: ${err.message}`);
    }
  }
}
console.log(`Repaired ${fixed} missing/invalid PDFs.`);

// Remove orphans
const refs = new Set(entries.map((e) => path.join(ROOT, e.localPath)));
const disk = fs.readdirSync(PDF_DIR).filter((f) => f.endsWith('.pdf')).map((f) => path.join(PDF_DIR, f));
let removed = 0;
for (const d of disk) {
  if (!refs.has(d)) {
    fs.unlinkSync(d);
    removed++;
    console.log(`  🗑 removed orphan ${path.basename(d)}`);
  }
}
console.log(`Removed ${removed} orphan PDFs.`);
console.log(`Final: ${entries.length} entries | ${disk.length - removed + fixed} valid PDFs on disk.`);
