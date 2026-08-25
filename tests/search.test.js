// tests/search.test.js — Testes zero-dependency para js/search.js (node:test + node:assert).
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { Search } from '../js/search.js';

test('encontra livro por substring de título', () => {
  Search.build([
    { id: 'a', title: 'Economia Austríaca', author: 'X', genre: 'economia', titlePt: 'Economia' },
    { id: 'b', title: 'Outro Livro', author: 'Y', genre: 'filosofia', titlePt: 'Outro' }
  ]);
  const results = Search.query('austri');
  assert.ok(results.length > 0, 'deveria retornar ao menos um resultado');
  assert.equal(results[0].book.id, 'a', 'o primeiro resultado deve ser o livro "a"');
});

test('ignora query com menos de 2 caracteres', () => {
  Search.build([
    { id: 'a', title: 'Economia Austríaca', author: 'X', genre: 'economia', titlePt: 'Economia' }
  ]);
  assert.deepEqual(Search.query('a'), [], 'query de 1 char deve retornar []');
  assert.deepEqual(Search.query(''), [], 'query vazia deve retornar []');
});

test('busca por gênero (string) retorna resultados', () => {
  Search.build([
    { id: 'a', title: 'Livro Um', author: 'X', genre: 'Finanças pessoais / Autoajuda', titlePt: 'Um' },
    { id: 'b', title: 'Livro Dois', author: 'Y', genre: 'Filosofia', titlePt: 'Dois' }
  ]);
  const results = Search.query('finanças');
  assert.ok(results.some((r) => r.book.id === 'a'), 'deve encontrar por gênero');
});
