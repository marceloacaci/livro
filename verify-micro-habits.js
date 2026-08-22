const fs = require('fs');
const path = require('path');

const htmlPath = path.join(__dirname, 'index.html');
const cssPath = path.join(__dirname, 'css', 'styles.css');
const jsPath = path.join(__dirname, 'js', 'app.js');

const html = fs.readFileSync(htmlPath, 'utf8');
const css = fs.readFileSync(cssPath, 'utf8');
const js = fs.readFileSync(jsPath, 'utf8');

const ids = ['micro1', 'micro2', 'micro3'];
let ok = true;

for (const id of ids) {
  const hasSection = html.includes('id="' + id + '"');
  const hasTextarea = html.includes('data-step="' + id + '"');
  const hasSave = html.includes('data-step="' + id + '"') && html.includes('btn-save');
  const hasClear = html.includes('data-step="' + id + '"') && html.includes('btn-clear');
  const hasJsLabel = js.includes(id + ':');
  const hasCssClass = css.includes('micro-step-' + id.replace('micro', ''));

  console.log(id, {
    section: hasSection,
    textarea: hasTextarea,
    saveClear: hasSave && hasClear,
    jsLabel: hasJsLabel,
    cssClass: hasCssClass,
  });

  if (!(hasSection && hasTextarea && hasSave && hasClear && hasJsLabel && hasCssClass)) {
    ok = false;
  }
}

const checks = [
  ['nav link micro1', html.includes('href="#micro1"')],
  ['nav link micro2', html.includes('href="#micro2"')],
  ['nav link micro3', html.includes('href="#micro3"')],
  ['hero mentions micro-hábitos', html.includes('Micro-hábitos: As pequenas mudanças que mudam tudo')],
  ['sobre os livros', html.includes('Sobre os Livros')],
  ['BJ Fogg sobre', html.includes('B.J. Fogg')],
  ['capitulo 9', html.includes('Capítulo 9 — O Modelo dos Micro-hábitos')],
  ['capitulo 10', html.includes('Capítulo 10 — Criando Hábitos que Duram')],
  ['myth/truth includes micro', html.includes('Mudança sustentável depende de repetição') && html.includes('Para mudar, você precisa de motivação forte')],
];

for (const [name, pass] of checks) {
  console.log(name, pass);
  if (!pass) ok = false;
}

if (!ok) {
  console.log('\nFALHOU: alguma checagem não passou.');
  process.exit(1);
} else {
  console.log('\nOK: todas as checagens de conteúdo passaram.');
}
