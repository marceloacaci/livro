const fs = require('fs');
const vm = require('vm');
const code = fs.readFileSync('C:/Users/Marcelo/Desktop/Livro/js/books.js','utf8');
const sandbox = { window: {} };
vm.createContext(sandbox);
vm.runInContext(code, sandbox);
const books = sandbox.window.MEU_BOLSO_BOOKS;
const ids = ['lynch','dalio','marks','ellis','hagstrom','greenblatt','schwager','richards','sethi','lowenstein','lencioni','voss','seneca','epiteto','aurelio','holiday','babauta','becker','millburn','kwik'];
for (const id of ids) {
  const b = books.find(x => x.id === id);
  if (!b) { console.log('MISSING', id); continue; }
  console.log(JSON.stringify({
    id: b.id, title: b.title, titlePt: b.titlePt, author: b.author,
    year: b.year, genre: b.genre, topic: b.topic,
    existingMyths: (b.myths||[]).length, existingEns: (b.ensinamentos||[]).length,
    existingCit: (b.citacoes||[]).length, existingThird: (b.citacoesTerceiros||[]).length,
    existingChap: (b.chapters||[]).length
  }, null, 0));
}
