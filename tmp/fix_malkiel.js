const fs = require('fs');
const path = 'C:/Users/Marcelo/Desktop/Livro/tmp/enriched-G4.json';
const books = JSON.parse(fs.readFileSync(path, 'utf8'));
const b = books.find(x => x.id === 'malkiel');
b.summary = (b.summary + ' Ao longo das edições, Malkiel manteve a tese central intacta, prova da durabilidade de suas conclusões.').trim();
fs.writeFileSync(path, JSON.stringify(books, null, 2), 'utf8');
console.log('malkiel summaryWords=' + b.summary.split(' ').length);
