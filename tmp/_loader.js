const fs = require('fs');
const vm = require('vm');

const src = fs.readFileSync('C:/Users/Marcelo/Desktop/Livro/js/books.js', 'utf8');
const sandbox = { window: {} };
vm.createContext(sandbox);
vm.runInContext(src, sandbox);
const books = sandbox.window.MEU_BOLSO_BOOKS;

const ids = ['kiyosaki','babilonia','atomic','duhigg','orman','robin','guillebeau','newport','kahneman','thaler','covey','sharma','ferriss','eker','godin','cardoso','frankl','brown','dweck','elrod'];

console.log('total books=', books.length);
for (const id of ids) {
  const b = books.find(x => x.id === id);
  if (!b) { console.log('MISSING', id); continue; }
  console.log(JSON.stringify({
    id: b.id, title: b.title, titlePt: b.titlePt, author: b.author,
    year: b.year, genre: b.genre, topic: b.topic
  }));
}
