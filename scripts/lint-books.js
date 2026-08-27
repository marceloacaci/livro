#!/usr/bin/env node
/**
 * scripts/lint-books.js — Validação de schema do catálogo REAL.
 *
 * O catálogo NÃO é ESM: js/books.js faz `window.LIVRO_BOOKS = [...]`.
 * Em Node puro, `window` é undefined, então carregamos o arquivo via `vm`
 * com um stub de `window` e lemos a constante real (não hardcoded).
 *
 * Validações:
 *   (a) ids únicos;
 *   (b) campos obrigatórios presentes: id, title, author, year, genre, cover;
 *   (c) cover existe em disco sob img/;
 *   (d) contagem derivada de BOOKS.length (a constante real do array, NÃO hardcoded).
 *
 * Exit 1 se houver erros, 0 se ok. Imprime "Total: N livros | Erros: M".
 */

import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';

const ROOT = path.resolve(import.meta.dirname, '..');
const BOOKS_PATH = path.join(ROOT, 'js', 'books.js');

const REQUIRED = ['id', 'title', 'author', 'year', 'genre', 'cover'];

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
  const total = books.length; // (d) contagem DERIVADA da constante real
  let errors = 0;
  const seenIds = new Set();

  books.forEach((book, i) => {
    const ctx = `[${i}] ${book && book.id ? book.id : 'SEM_ID'}`;

    for (const f of REQUIRED) {
      if (book === undefined || book[f] === undefined || book[f] === null || book[f] === '') {
        console.error(`❌ ${ctx} → falta campo obrigatório "${f}"`);
        errors++;
      }
    }

    if (book && book.id !== undefined) {
      if (seenIds.has(book.id)) {
        console.error(`❌ ${ctx} → id duplicado: "${book.id}"`);
        errors++;
      }
      seenIds.add(book.id);
    }

    if (book && book.cover) {
      const coverPath = path.join(ROOT, book.cover);
      if (!fs.existsSync(coverPath)) {
        console.error(`❌ ${ctx} → capa não encontrada em disco: "${book.cover}"`);
        errors++;
      }
    }
  });

  console.log(`\n📊 Total: ${total} livros | Erros: ${errors}`);
  process.exit(errors > 0 ? 1 : 0);
}

try {
  main();
} catch (err) {
  console.error('❌ Falha ao carregar o catálogo:', err.message);
  process.exit(1);
}
