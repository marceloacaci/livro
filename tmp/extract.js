const fs = require('fs');
const vm = require('vm');
// Use forward-slash absolute Windows path to avoid MSYS path mangling
const booksPath = 'C:/Users/Marcelo/Desktop/Livro/js/books.js';
console.log('reading from', booksPath, 'exists:', fs.existsSync(booksPath));
const code = fs.readFileSync(booksPath, 'utf8');
const sandbox = { window: {} };
vm.createContext(sandbox);
vm.runInContext(code, sandbox);
const books = sandbox.window.MEU_BOLSO_BOOKS;
console.log('total books:', books.length);
const ids = ['hill','gawande','duckworth','taleb','senge','csikszentmihalyi','robbins','kondo','gerber','rath','tracy','christensen','ariely','kawasaki','tolle','semler','gladwell','coyle','sinek','maxwell'];
const assigned = books.filter(b => ids.includes(b.id));
console.log('assigned found:', assigned.length);
for (const b of assigned) {
  console.log('==== ' + b.id + ' ====');
  console.log('title:', b.title);
  console.log('titlePt:', b.titlePt);
  console.log('author:', b.author);
  console.log('category:', b.category);
  console.log('existing summary:', (b.summary||'').slice(0,90));
}
