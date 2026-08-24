'use strict';
// merge-enrich.js — aplica enriquecimentos de tmp/enriched-G*.json em js/books.js
// Não altera campos que já existem ricos; só sobrescreve os 6 campos de conteúdo.
const fs = require('fs');
const path = require('path');
const vm = require('vm');

const ROOT = 'C:/Users/Marcelo/Desktop/Livro';
const BOOKS = path.join(ROOT, 'js', 'books.js');
const GRUPOS = ['G1','G2','G3','G4','G5'].map(g => path.join(ROOT,'tmp','enriched-'+g+'.json'));

// 1) carrega books.js original
const sandbox = { window:{}, console, URLSearchParams };
vm.createContext(sandbox);
const src = fs.readFileSync(BOOKS,'utf8');
vm.runInContext(src, sandbox, { filename:'books.js' });
const books = sandbox.window.MEU_BOLSO_BOOKS;
const byId = {};
books.forEach(b => byId[b.id] = b);

// 2) carrega enriquecimentos
const CAMPOS = ['summary','myths','ensinamentos','citacoes','citacoesTerceiros','chapters'];
const enrich = {};
let totalJson = 0;
GRUPOS.forEach(gf => {
  if (!fs.existsSync(gf)) { console.error('FALTA: '+gf); process.exit(2); }
  const arr = JSON.parse(fs.readFileSync(gf,'utf8'));
  arr.forEach(e => { enrich[e.id] = e; totalJson++; });
});
console.log('JSON livros carregados:', totalJson, '| unicos:', Object.keys(enrich).length);

// 3) aplica
let aplicados = 0, ignorados = 0;
Object.keys(enrich).forEach(id => {
  const b = byId[id];
  if (!b) { console.error('ID nao existe em books.js:', id); process.exit(3); }
  const e = enrich[id];
  CAMPOS.forEach(c => {
    if (e[c] !== undefined) b[c] = e[c];
  });
  aplicados++;
});
// sanity: livros originais (15) nao devem ter sido tocados
const ORIG = ['ramsey','fogg','kishimi','gatilhos','menteafiada','arrume','caibalion','milhonaria','essencialismo','greene48','housel','lakhiani','dispenza','kotler','kruel'];
ignorados = ORIG.filter(id => enrich[id]).length;
if (ignorados) { console.error('ERRO: originais foram incluidos no enrich:', ignorados); process.exit(4); }

// 4) regrava books.js preservando formato (JSON.stringify com indent + escapes)
function bookToLiteral(b){
  // produz "{ ... }" com aspas duplas, indent 2
  return JSON.stringify(b, null, 2);
}
// monta array
const header = 'window.MEU_BOLSO_BOOKS=[';
const footer = '\n];\n';
const body = books.map(b => '  ' + bookToLiteral(b).replace(/\n/g,'\n  ')).join(',\n');
const out = header + '\n' + body + footer;
fs.writeFileSync(BOOKS, out, 'utf8');
console.log('BOOKS.JS regravado. livros=', books.length, 'aplicados=', aplicados);

// 5) valida sintaxe recarregando
const sb2 = { window:{}, console, URLSearchParams };
vm.createContext(sb2);
vm.runInContext(fs.readFileSync(BOOKS,'utf8'), sb2, { filename:'books.js' });
const vb = sb2.window.MEU_BOLSO_BOOKS;
console.log('RELOAD OK livros=', vb.length);
let bad=0;
vb.forEach(b=>{
  if(!b.summary || b.summary.length<120) {bad++; console.error('summary curto:',b.id,b.summary?b.summary.length:0);}
  if(!Array.isArray(b.myths)||b.myths.length<10){bad++; console.error('myths<10:',b.id);}
  if(!Array.isArray(b.ensinamentos)||b.ensinamentos.length<10){bad++; console.error('ens<10:',b.id);}
  if(!Array.isArray(b.chapters)||b.chapters.length<7){bad++; console.error('chaps<7:',b.id);}
});
console.log(bad===0?'CHECKS OK':(bad+' problemas'));
