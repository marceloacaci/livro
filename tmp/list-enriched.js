'use strict';
const fs = require('fs'), vm = require('vm');
const sb = { window: {} }; vm.createContext(sb);
vm.runInContext(fs.readFileSync('C:/Users/Marcelo/Desktop/Livro/js/books.js', 'utf8'), sb);
const bk = sb.window.MEU_BOLSO_BOOKS;
const g = JSON.parse(fs.readFileSync('C:/Users/Marcelo/Desktop/Livro/tmp/grupos.json', 'utf8'));
const map = {}; bk.forEach(b => map[b.id] = b);
const gn = ['G1', 'G2', 'G3', 'G4', 'G5'];
const out = [];
gn.forEach((name, i) => {
  out.push('\n=== ' + name + ' (' + g.groups[i].length + ' livros) ===');
  g.groups[i].forEach(id => { const b = map[id]; out.push('  ' + id + '  —  ' + (b ? b.titlePt : '???')); });
});
console.log(out.join('\n'));
