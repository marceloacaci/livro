const fs = require('fs');
const path = require('path');

const dir = __dirname;
const files = [
  'index.html',
  'livro.html',
  'css/styles.css',
  'js/books.js',
  'js/biblioteca.js',
  'js/livro.js'
];

let ok = true;
files.forEach(function (f) {
  const full = path.join(dir, f);
  if (!fs.existsSync(full)) {
    console.error('MISSING:', f);
    ok = false;
  } else {
    const stat = fs.statSync(full);
    if (stat.size === 0) {
      console.error('EMPTY:', f);
      ok = false;
    } else {
      console.log('OK:', f, '(' + stat.size + ' bytes)');
    }
  }
});

if (ok) {
  console.log('\nEstrutura da biblioteca OK.');
} else {
  console.error('\nFalha na verificação.');
  process.exit(1);
}
