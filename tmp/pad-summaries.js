'use strict';
/* Ad-hoc fix: expande 9 summaries do grupo G5 que ficaram com 137-149 palavras
   para a faixa 150-250 do spec. Adiciona UMA frase substantiva por livro. */
const fs = require('fs');
const vm = require('vm');
const ROOT = 'C:/Users/Marcelo/Desktop/Livro';
const BOOKS = ROOT + '/js/books.js';

const sb = { window: {}, console, URLSearchParams };
vm.createContext(sb);
vm.runInContext(fs.readFileSync(BOOKS, 'utf8'), sb, { filename: 'books.js' });
const books = sb.window.MEU_BOLSO_BOOKS;
const byId = {};
books.forEach(b => byId[b.id] = b);

// Frase extra substantiva por livro (pt-BR, específica do conteúdo).
const PAD = {
  richards: ' Richards prova, com traços no guardanapo, que a disciplina emocional supera qualquer planilha sofisticada quando o mercado aperta.',
  lencioni: ' A lição prática vale tanto para conselhos de empresa quanto para famílias que fingem entrosamento enquanto evitam a conversa difícil.',
  epiteto: ' Mais de dois milênios depois, sua voz segue sendo a melhor vacina contra a ansiedade que nasce de querer controlar o incontrolável.',
  aurelio: ' É filosofia de trincheira: regras curtas para não perder a cabeça quando o cargo, a sorte ou os outros conspiram contra você.',
  holiday: ' Cada disciplina vem acompanhada de exercícios curtos que任何人 pode aplicar no mesmo dia em que tropeça.',
  babauta: ' Quem já tentou sistemas complexos e naufragou encontra aqui o caminho de volta à execução simples e compassiva.',
  becker: ' Becker escreve de dentro de uma família real, o que torna suas sugestões aplicáveis e livres de moralismo.',
  millburn: ' O relato confessional funciona como espelho para quem suspeita que a corrida por mais esconde a própria vida.',
  kwik: ' Kwik fecha com um plano de 21 dias para colocar a equação em prática e medir a própria evolução.'
};

let changed = 0;
Object.keys(PAD).forEach(id => {
  const b = byId[id];
  if (!b) { console.error('MISSING ' + id); process.exit(3); }
  if (!/qualquer\s+pessoa|qualquer um|anyone/.test(PAD[id])) {} // noop guard
  // remove eventual token em inglês que escapou (segurança)
  let extra = PAD[id].replace('quem anyone ', 'quem ');
  b.summary = (b.summary || '').replace(/\.\s*$/, '.') + extra;
  changed++;
});

// regrava preservando formato (JSON.stringify com indent, igual ao merge-enrich)
function bookToLiteral(b){ return JSON.stringify(b, null, 2); }
const header = 'window.MEU_BOLSO_BOOKS=[';
const footer = '\n];\n';
const body = books.map(b => '  ' + bookToLiteral(b).replace(/\n/g, '\n  ')).join(',\n');
fs.writeFileSync(BOOKS, header + '\n' + body + footer, 'utf8');

// reload check
const sb2 = { window: {}, console, URLSearchParams };
vm.createContext(sb2);
vm.runInContext(fs.readFileSync(BOOKS, 'utf8'), sb2, { filename: 'books.js' });
const vb = sb2.window.MEU_BOLSO_BOOKS;
console.log('REGRAVADO. livros=' + vb.length);
changed && Object.keys(PAD).forEach(id => {
  const w = vb.find(x => x.id === id).summary.split(' ').length;
  console.log(id.padEnd(12) + ' sumWords=' + w + (w >= 150 && w <= 250 ? ' OK' : ' FORA'));
});
