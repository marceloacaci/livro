'use strict';
// FCS verify — carrega books.js + livro.js num DOM falso e renderiza um livro enriquecido.
const fs = require('fs');
const vm = require('vm');

function El(tag) {
  const e = {
    tagName: (tag || 'div').toUpperCase(),
    children: [], attributes: {}, _html: '', _text: '',
    style: {}, classList: { _s: new Set(),
      add(c){this._s.add(c);}, remove(c){this._s.delete(c);},
      toggle(c,f){ if(f===undefined){ if(this._s.has(c))this._s.delete(c); else this._s.add(c);} else { f?this._s.add(c):this._s.delete(c);} },
      contains(c){return this._s.has(c);} },
    dataset: {},
    setAttribute(k,v){ this.attributes[k]=String(v); if(k.startsWith('data-')) this.dataset[k.slice(5)]=String(v); },
    getAttribute(k){ return this.attributes[k] !== undefined ? this.attributes[k] : null; },
    appendChild(c){ this.children.push(c); return c; },
    addEventListener(){}, querySelector(){ return null; }, querySelectorAll(){ return []; },
    closest(){ return null; }, removeChild(){}, scrollIntoView(){}, blur(){}
  };
  Object.defineProperty(e, 'innerHTML', { get(){ return this._html; }, set(v){ this._html = String(v); } });
  Object.defineProperty(e, 'textContent', { get(){ return this._text; }, set(v){ this._text = String(v); } });
  Object.defineProperty(e, 'className', { get(){ return Array.from(this.classList._s).join(' '); }, set(v){ this.classList._s = new Set(String(v).split(/\s+/).filter(Boolean)); } });
  return e;
}
const ids = ['heroCover','heroTitle','heroLead','verdadesMitOSSubtitle','sobreContent','bookSections',
  'verdadesMitosContent','verdadesCard','reflexoesList','ideiasSections','chapterSubmenu','ideiasToggle',
  'readingProgress','footerText','sidebarBookTitle','btnClearAll','sidebarBookHome','capitulosIdeiasContent'];
const registry = {};
ids.forEach(id => { registry[id] = El('div'); });

const doc = {
  getElementById(id){ return registry[id] || (registry[id] = El('div')); },
  querySelector(sel){ if(sel==='meta[name="description"]') return null; return El('meta'); },
  querySelectorAll(){ return []; },
  createElement(tag){ return El(tag); },
  createTextNode(t){ return {nodeType:3, textContent:t}; },
  addEventListener(){}, head: El('head'), body: El('body')
};
const win = {
  document: doc, localStorage: { getItem(){return null;}, setItem(){}, removeItem(){} },
  navigator: {}, location: { hash: '#kiyosaki' }, addEventListener(){},
  scrollY: 0, pageYOffset: 0, innerHeight: 800,
  setTimeout(){}, clearTimeout(){}, alert(){},
  URLSearchParams, console, Image: function(){}, bookCoverFallback(){}
};
win.window = win;
// O contexto global É o próprio win, assim window.X === global X (igual ao browser)
const sandbox = win;
sandbox.global = sandbox;

const ROOT = 'C:/Users/Marcelo/Desktop/Livro';
vm.createContext(sandbox);

const booksCode = fs.readFileSync(ROOT + '/js/books.js', 'utf8');
vm.runInContext(booksCode, sandbox, { filename: 'js/books.js' });
const books = sandbox.window.MEU_BOLSO_BOOKS;

let livroCode = fs.readFileSync(ROOT + '/js/livro.js', 'utf8');
if (!/function getIdFromUrl/.test(livroCode)) {
  livroCode = 'function getIdFromUrl(){ return "kiyosaki"; }\n' + livroCode;
}

let erro = null;
try { vm.runInContext(livroCode, sandbox, { filename: 'js/livro.js' }); }
catch (e) { erro = e; }
if (erro) { console.error('ERRO RENDER livro.js:', erro.message); process.exit(1); }

const b = books.find(x => x.id === 'kiyosaki');
const domSobre = registry['sobreContent']._html;
const domVM = registry['verdadesMitosContent']._html;
const domIdeias = registry['ideiasSections'].children.length;
const heroLead = registry['heroLead']._text;

let pass = true;
function check(name, cond){ console.log((cond?'  ✓ ':'  ✗ ')+name); if(!cond) pass=false; }

console.log('== FCS: livro enriquecido (kiyosaki) ==');
check('heroLead = summary (>150 palavras)', (heroLead||'').split(' ').length >= 150);
check('sobreContent tem citações (blockquote)', domSobre.includes('citacao') || domSobre.includes('blockquote'));
check('verdadesMitosContent tem ' + b.myths.length + ' myths cards', (domVM.match(/mt-card/g)||[]).length === b.myths.length);
check('ideiasSections recebeu <section id=ideias>', domIdeias >= 1);
const ideiasHtml = (registry['ideiasSections'].children[0] ? registry['ideiasSections'].children[0]._html : '');
check('section ideias tem ' + b.chapters.length + ' chapter-card', (ideiasHtml.match(/chapter-card/g)||[]).length === b.chapters.length);
check('chapter-card mostra pontos (kp-title)', ideiasHtml.includes('kp-title'));

console.log(pass ? '\nFCS: PASS' : '\nFCS: FAIL');
process.exit(pass ? 0 : 1);
