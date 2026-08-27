#!/usr/bin/env node
/**
 * scripts/verify-biblioteca.js — Integridade da biblioteca.
 *
 * 1. Cada `cover` referenciado no catálogo existe em disco (img/*.jpg).
 * 2. Lista capas órfãs: arquivos img/*.jpg não referenciados por nenhum livro.
 *
 * O catálogo é carregado via vm com stub de `window` (não é ESM).
 * Exit 0 se tudo ok (capas referenciadas existem + relatório de órfãs).
 */

import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';

const ROOT = path.resolve(import.meta.dirname, '..');
const BOOKS_PATH = path.join(ROOT, 'js', 'books.js');
const IMG_DIR = path.join(ROOT, 'img');

function loadBooks() {
  const code = fs.readFileSync(BOOKS_PATH, 'utf8');
  const sandbox = { window: {} };
  vm.createContext(sandbox);
  vm.runInContext(code, sandbox);
  const books = sandbox.window.LIVRO_BOOKS;
  if (!Array.isArray(books)) {
    throw new Error('window.LIVRO_BOOKS não é um array.');
  }
  return books;
}

function main() {
  const books = loadBooks();
  let errors = 0;
  const referenced = new Set();

  for (const book of books) {
    if (!book.cover) continue;
    referenced.add(book.cover);
    const coverPath = path.join(ROOT, book.cover);
    if (!fs.existsSync(coverPath)) {
      console.error(`❌ Capa referenciada ausente: "${book.cover}" (livro: ${book.id})`);
      errors++;
    }
  }

  let orphanCount = 0;
  if (fs.existsSync(IMG_DIR)) {
    const files = fs.readdirSync(IMG_DIR).filter((f) => f.endsWith('.jpg'));
    const orphans = files.filter((f) => !referenced.has(`img/${f}`));
    orphanCount = orphans.length;
    if (orphans.length > 0) {
      console.log(`\n🖼️  Capas órfãs (${orphans.length}) — presentes em img/ mas não referenciadas no catálogo:`);
      orphans.forEach((o) => console.log(`   • img/${o}`));
    }
  }

  console.log(
    `\n📦 Livros: ${books.length} | Capas referenciadas: ${referenced.size} | ` +
      `Capas ausentes: ${errors} | Capas órfãs: ${orphanCount}`
  );

  process.exit(errors > 0 ? 1 : 0);
}

try {
  main();
} catch (err) {
  console.error('❌ Falha ao verificar a biblioteca:', err.message);
  process.exit(1);
}
