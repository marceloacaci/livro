const fs = require('fs');
const path = require('path');

const htmlPath = path.join(__dirname, 'index.html');
const cssPath = path.join(__dirname, 'css', 'styles.css');
const jsPath = path.join(__dirname, 'js', 'app.js');

const html = fs.readFileSync(htmlPath, 'utf8');
const css = fs.readFileSync(cssPath, 'utf8');
const js = fs.readFileSync(jsPath, 'utf8');

const checks = [
  ['book selector exists', html.includes('book-selector')],
  ['ramsey tab exists', html.includes('data-book="ramsey"')],
  ['fogg tab exists', html.includes('data-book="fogg"')],
  ['both tab exists', html.includes('data-book="both"')],
  ['js toggleBooks exists', js.includes('setBookFilter')],
  ['css book selector styles', css.includes('.book-selector') && css.includes('.book-tab')],
  ['css hidden class', css.includes('.book-hidden')],
  ['section sobre split', html.includes('id="sobre-ramsey"') && html.includes('id="sobre-fogg"')],
  ['baby sections have data-book', html.includes('id="baby1"') && html.includes('data-book="ramsey"')],
  ['micro sections have data-book', html.includes('id="micro1"') && html.includes('data-book="fogg"')],
  ['chapter cards have data-book', html.includes('Capítulo 1') && html.includes('data-book="ramsey"')],
  ['myth truth cards have data-book', html.includes('mt-card') && html.includes('data-book="ramsey"')],
];

let ok = true;

for (const [name, pass] of checks) {
  console.log(name, pass);
  if (!pass) ok = false;
}

if (!ok) {
  console.log('\nFALHOU: alguma checagem não passou.');
  process.exit(1);
} else {
  console.log('\nOK: estrutura de separacao por livro criada.');
}
