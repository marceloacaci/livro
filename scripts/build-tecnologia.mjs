#!/usr/bin/env node
/**
 * scripts/build-tecnologia.mjs
 * Downloads real arXiv PDFs (validating %PDF) and rewrites
 * js/articles-tecnologia.js, appending new entries (no dup by arXiv id).
 *
 * Usage: node scripts/build-tecnologia.mjs [maxNew=20]
 */
import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';
import { execFileSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');
const CACHE = path.join(ROOT, '.cache', 'arxiv-meta.json');
const JS_PATH = path.join(ROOT, 'js', 'articles-tecnologia.js');
const PDF_DIR = path.join(ROOT, 'artigos', 'tecnologia');

const MAX_NEW = parseInt(process.argv[2] || '20', 10);
const VAR_NAME = 'MEU_BOLSO_ARTICLES_TECNOLOGIA';

const CAT_LABEL = {
  'cs.ET': 'Tecnologias Emergentes',
  'cs.SE': 'Engenharia de Software',
  'cs.NI': 'Redes e Comunicação',
  'cs.CR': 'Segurança e Criptografia',
  'eess.SP': 'Processamento de Sinais'
};
const CAT_ORDER = ['cs.ET', 'cs.SE', 'cs.NI', 'cs.CR', 'eess.SP'];

function slugify(title) {
  let s = title
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
  if (s.length > 60) {
    s = s.slice(0, 60).replace(/-[a-z0-9]*$/, ''); // cut at word boundary
    s = s.replace(/^-+|-+$/g, '');
  }
  return s || 'artigo';
}

function q(str) {
  str = String(str ?? '');
  if (str.includes("'") && !str.includes('"')) return '"' + str.replace(/"/g, '\\"') + '"';
  if (!str.includes("'")) return "'" + str + "'";
  return JSON.stringify(str);
}

function primaryCat(cats = []) {
  for (const c of CAT_ORDER) if (cats.includes(c)) return c;
  return cats[0] || 'cs.ET';
}

function buildEntry(meta) {
  const id = meta.id;
  const cat = primaryCat(meta.categories);
  const label = CAT_LABEL[cat] || 'Tecnologia';
  let slug = slugify(meta.title);
  // ensure unique filename
  let filename = slug + '.pdf';
  let i = 1;
  const used = new Set(fs.readdirSync(PDF_DIR));
  while (used.has(filename)) {
    i++;
    filename = `${slug}-${i}.pdf`;
  }
  const localPath = `artigos/tecnologia/${filename}`;
  const tags = ['tecnologia', cat.replace('.', '').toLowerCase()];
  const summary =
    `Artigo "${meta.title}" (${meta.year}, arXiv, ${label}). ` +
    `Discute temas de ${label.toLowerCase()} no contexto da tecnologia, ` +
    `integrando o acervo científico do tema.`;
  return {
    id,
    title: meta.title,
    authors: meta.authors,
    year: meta.year,
    venue: 'arXiv',
    tema: 'tecnologia',
    filename,
    localPath,
    sourceUrl: `https://arxiv.org/abs/${id}`,
    summary,
    tags
  };
}

function serialize(entries) {
  const lines = ['window.' + VAR_NAME + ' = ['];
  entries.forEach((e, idx) => {
    lines.push('  {');
    lines.push(`    id: ${q(e.id)},`);
    lines.push(`    title: ${q(e.title)},`);
    lines.push(`    authors: ${q(e.authors)},`);
    lines.push(`    year: ${e.year},`);
    lines.push(`    venue: ${q(e.venue)},`);
    lines.push(`    tema: ${q(e.tema)},`);
    lines.push(`    filename: ${q(e.filename)},`);
    lines.push(`    localPath: ${q(e.localPath)},`);
    lines.push(`    sourceUrl: ${q(e.sourceUrl)},`);
    lines.push(`    summary: ${q(e.summary)},`);
    lines.push(`    tags: [${e.tags.map(q).join(', ')}]`);
    lines.push('  }' + (idx < entries.length - 1 ? ',' : ''));
  });
  lines.push('];');
  lines.push('');
  return lines.join('\n');
}

function loadExistingEntries() {
  const code = fs.readFileSync(JS_PATH, 'utf8');
  const sandbox = { window: {} };
  vm.createContext(sandbox);
  vm.runInContext(code, sandbox);
  const arr = sandbox.window[VAR_NAME];
  if (!Array.isArray(arr)) throw new Error('existing array not found');
  return arr;
}

function downloadPdf(id, dest) {
  const url = `http://arxiv.org/pdf/${id}`;
  execFileSync('curl', [
    '-sL',
    '--max-time', '60',
    '-A', 'Mozilla/5.0 (compatible; LivroBot/1.0)',
    '-o', dest,
    url
  ], { stdio: 'pipe' });
  const buf = fs.readFileSync(dest);
  if (buf.length < 1000 || !buf.slice(0, 5).toString().startsWith('%PDF')) {
    fs.unlinkSync(dest);
    throw new Error('not a valid PDF');
  }
}

async function main() {
  const meta = fs.readFileSync(CACHE, 'utf8').trim().split('\n').filter(Boolean).map((l) => JSON.parse(l));
  const existing = loadExistingEntries();
  const existingIds = new Set(existing.map((e) => e.id));
  const candidates = meta.filter((m) => !existingIds.has(m.id));

  console.log(`Cache: ${meta.length} | Existing in JS: ${existing.length} | Candidates: ${candidates.length}`);

  const added = [];
  for (const m of candidates) {
    if (added.length >= MAX_NEW) break;
    const entry = buildEntry(m);
    const dest = path.join(ROOT, entry.localPath);
    try {
      downloadPdf(m.id, dest);
      added.push(entry);
      console.log(`  ✓ ${m.id} -> ${entry.filename} (${(fs.statSync(dest).size/1024|0)} KB)`);
    } catch (err) {
      console.error(`  ✗ ${m.id} failed: ${err.message}`);
    }
  }

  if (added.length === 0) {
    console.log('No new articles added this run.');
    return;
  }
  const all = existing.concat(added);
  fs.writeFileSync(JS_PATH, serialize(all));
  console.log(`\nWrote ${all.length} entries (+${added.length} new).`);
}

main().catch((e) => { console.error(e); process.exit(1); });
