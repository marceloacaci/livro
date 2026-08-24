/**
 * lint-books.js — Validação rápida do catálogo de livros.
 * Uso:  node lint-books.js
 *
 * Verifica:
 *  - Sintaxe do js/books.js (carregado em sandbox isolado).
 *  - Total de livros em window.MEU_BOLSO_BOOKS.
 *  - IDs duplicados.
 *  - Campos obrigatórios mínimos (os que 100% dos livros possuem no schema canônico).
 *  - Arrays internos não vazios (myths/sections/ensinamentos/citacoes).
 *  - Seções referenciadas pertencem ao conjunto válido do app.
 *
 * Campos/seções OPCIONAIS (não exigidos): editionYear, ideias, stepLabels, chapters,
 * e variações de seção por livro (ex.: baby1..baby7, micro1..micro3, capitulos).
 */
'use strict';

const fs = require('fs');
const path = require('path');
const vm = require('vm');

const ROOT = __dirname;
const BOOKS_FILE = path.join(ROOT, 'js', 'books.js');

let falhas = 0;
function falha(msg) { falhas++; console.error('  ✗ ' + msg); }
function ok(msg) { console.log('  ✓ ' + msg); }

console.log('== lint-books.js ==');

if (!fs.existsSync(BOOKS_FILE)) { console.error('Arquivo nao encontrado: ' + BOOKS_FILE); process.exit(1); }

const code = fs.readFileSync(BOOKS_FILE, 'utf8');
const sandbox = { window: {}, console, URLSearchParams };
sandbox.global = sandbox;
vm.createContext(sandbox);
try { vm.runInContext(code, sandbox, { filename: 'js/books.js' }); }
catch (e) { console.error('Erro ao carregar js/books.js: ' + e.message); process.exit(1); }

const books = sandbox.window.MEU_BOLSO_BOOKS;
if (!Array.isArray(books)) { falha('MEU_BOLSO_BOOKS nao e um array'); process.exit(1); }

ok('js/books.js carregado sem erros de sintaxe');
console.log('  LIVROS: ' + books.length);

// IDs duplicados
const ids = books.map(b => b && b.id);
const dup = ids.filter((v, i) => ids.indexOf(v) !== i);
if (dup.length) falha('IDs duplicados: ' + [...new Set(dup)].join(', '));
else ok('Nenhum ID duplicado');

// Campos obrigatórios (os presentes em 100% dos livros do schema canônico)
const CAMPOS_OBRIGATORIOS = [
  'id', 'slug', 'title', 'titlePt', 'author', 'year', 'cover', 'color',
  'file', 'summary', 'genre', 'language', 'copiesSold', 'publisher', 'pages',
  'topic', 'myths', 'sections', 'ensinamentos', 'citacoes', 'citacoesTerceiros'
];
let incompletos = 0;
books.forEach(b => {
  if (!b || typeof b !== 'object') { incompletos++; return; }
  const faltando = CAMPOS_OBRIGATORIOS.filter(c => b[c] === undefined);
  if (faltando.length) { incompletos++; falha('Livro "' + (b.id || '?') + '" faltando: ' + faltando.join(', ')); }
});
if (incompletos === 0) ok('Todos os livros tem os campos obrigatorios');

// Arrays internos não vazios
let arraysVazios = 0;
['myths', 'sections', 'ensinamentos', 'citacoes'].forEach(k => {
  books.forEach(b => {
    if (!Array.isArray(b[k]) || b[k].length === 0) { arraysVazios++; falha('Livro "' + b.id + '" tem ' + k + ' vazio/ausente'); }
  });
});
if (arraysVazios === 0) ok('Arrays internos (myths/sections/ensinamentos/citacoes) nao vazios');

// Seções válidas (conjunto real usado pelo app + objetos {id,label})
const SECOES_VALIDAS = new Set([
  'sobre', 'ensinamentos', 'ideias', 'verdadesmitos', 'reflexoes',
  'baby1', 'baby2', 'baby3', 'baby4', 'baby5', 'baby6', 'baby7',
  'capitulos', 'micro1', 'micro2', 'micro3', 'inicio'
]);
let secaoInvalida = 0;
books.forEach(b => {
  (b.sections || []).forEach(s => {
    const key = (typeof s === 'string') ? s : (s && s.id);
    if (!key || !SECOES_VALIDAS.has(key)) { secaoInvalida++; falha('Livro "' + b.id + '" secao invalida: ' + (typeof s === 'string' ? s : JSON.stringify(s))); }
  });
});
if (secaoInvalida === 0) ok('Todas as secoes referenciadas sao validas');

console.log(falhas === 0 ? '\nRESULTADO: OK (tudo validado)' : '\nRESULTADO: ' + falhas + ' problema(s) encontrado(s)');
process.exit(falhas === 0 ? 0 : 1);
