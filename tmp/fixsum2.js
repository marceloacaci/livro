'use strict';
const fs = require('fs');
const p = 'C:/Users/Marcelo/Desktop/Livro/tmp/enriched-G3.json';
const a = JSON.parse(fs.readFileSync(p, 'utf8'));

const SUF = {
  seligman: ' Ao contrário do pensamento positivo ingênuo, Seligman propõe um otimismo realista: encarar os fatos e reenquadrar a interpretação, não fugir da realidade.',
  rubin: ' Ao identificar se você é Upholder, Questioner, Obliger ou Rebel, deixa de se culpar por falhar em métodos desenhados para outros perfis.',
  baumeister: ' A lição prática é clara: não confie na força de vontade isolada; desenhe o ambiente para que o certo seja o caminho fácil e poupe esse recurso.',
  heath: ' O livro mostra que mudança real exige agir nas três frentes ao mesmo tempo, e não confiar apenas em mais informação ou em mais força de vontade.',
  pink: ' A implicação é profunda: para trabalho que exige criatividade, líderes e pais devem trocar controle por condições de autonomia, maestria e propósito.',
  grant: ' O livro usa dados reais de carreiras para mostrar que ajudar, com critério e limites, supera tanto o egoísmo quanto o autossacrifício crônico.',
  hsieh: ' Mais que uma autobiografia, é um manifesto de que propósito e lucro caminham juntos quando a cultura é levada a sério e não só declarada.',
  mullainathan: ' É um livro essencial para entender por que pessoas inteligentes tomam decisões aparentemente irracionais quando a mente está ocupada pela falta.',
  covey8: ' É um chamado à liderança pessoal e à significância que convida cada leitor a sair da mediocridade útil e entregar algo realmente próprio ao mundo.',
  collins: ' Um clássico da estratégia baseado em dados rigorosos, cujas lições valem tanto para empresas quanto para a carreira pessoal de qualquer um.',
  christensen2: ' Leitura obrigatória para quem quer evitar ser canibalizado por um concorrente aparentemente inferior e proteger a própria relevância no futuro.',
  godin2: ' Com linguagem direta, Godin devolve ao marketing sua função original: conectar quem tem uma solução a quem tem um problema real, com honestidade.',
  brown2: ' O livro é um guia científico e humano para trocar a proteção pela presença e recuperar a autenticidade nos relacionamentos e no trabalho.',
  ericsson: ' Indispensável para atletas, músicos, estudantes e qualquer um que queira dominar uma habilidade com método, paciência e prática bem desenhada.',
  twenge: ' É um alerta fundamentado para pais, educadores e gestores que querem entender a juventude de hoje sem recorrer a estereótipos ou pânico vazio.',
  harris: ' Um relato honesto e laico que desarma preconceitos e torna a meditação acessível a quem desconfia dela, sem prometer milagres ou iluminação.'
};

a.forEach(b => {
  if (SUF[b.id] && b.summary.split(' ').length < 150) {
    b.summary = b.summary.replace(/\.\s*$/, '.') + SUF[b.id];
  }
});
fs.writeFileSync(p, JSON.stringify(a, null, 2), 'utf8');
let min=999,max=0;
a.forEach(b=>{const w=b.summary.split(' ').length; if(w<min)min=w; if(w>max)max=w;});
console.log('UPDATED. min='+min+' max='+max);
a.forEach(b=>console.log(b.id.padEnd(14), b.summary.split(' ').length));
