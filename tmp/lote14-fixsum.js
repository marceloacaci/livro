'use strict';
/* Fix Lote 14: expande summaries de carr (147w) e goleman (131w) para 150-250. */
const fs = require('fs'), vm = require('vm');
const ROOT = 'C:/Users/Marcelo/Desktop/Livro';
const BOOKS = ROOT + '/js/books.js';
const sb = { window: {} }; vm.createContext(sb);
vm.runInContext(fs.readFileSync(BOOKS, 'utf8'), sb, { filename: 'books.js' });
const bk = sb.window.MEU_BOLSO_BOOKS;
const byId = {}; bk.forEach(b => byId[b.id] = b);

const PAD = {
  carr: ' Carr conclui que a atenção é o recurso mais ameaçado da era digital, e protegê-la é uma decisão deliberada, não um acidente feliz.',
  goleman: ' Goleman encerra lembrando que a inteligência emocional não substitui o estudo ou a técnica, mas decide quem os usa bem sob pressão.'
};
Object.keys(PAD).forEach(id => {
  const b = byId[id];
  if (!b) { console.error('MISSING ' + id); process.exit(3); }
  b.summary = (b.summary || '').replace(/\.\s*$/, '.') + PAD[id];
});
function lit(b){ return JSON.stringify(b, null, 2); }
const header = 'window.MEU_BOLSO_BOOKS=['; const footer = '\n];\n';
const body = bk.map(b => '  ' + lit(b).replace(/\n/g, '\n  ')).join(',\n');
fs.writeFileSync(BOOKS, header + '\n' + body + footer, 'utf8');
const sb2 = { window: {} }; vm.createContext(sb2);
vm.runInContext(fs.readFileSync(BOOKS, 'utf8'), sb2, { filename: 'books.js' });
const vb = sb2.window.MEU_BOLSO_BOOKS;
console.log('REGRAVADO livros=' + vb.length);
['carr','goleman'].forEach(id => { const w = vb.find(x => x.id === id).summary.split(' ').length; console.log(id + ' sumWords=' + w + (w >= 150 && w <= 250 ? ' OK' : ' FORA')); });
