const fs = require('fs');
const path = 'C:/Users/Marcelo/Desktop/Livro/tmp/enriched-G4.json';
const books = JSON.parse(fs.readFileSync(path, 'utf8'));

// Extra substantive sentences per book to reach 150-200 words, book-specific.
const extra = {
  burchard: " Cada capítulo traz não só o 'porquê', mas exercícios práticos de aplicação imediata, tornando o livro um manual acionável e não apenas inspiracional. Burchard equilibra história de superação e evidência de pesquisa para mostrar que alta performance e bem-estar não se opõem.",
  eger: " O livro alterna o relato do horror do campo com diálogos clínicos de pacientes reais, mostrando que a psicologia se constrói a partir da própria dor. Eger prova que a liberdade não é ausência de sofrimento, mas a decisão diária de não deixar que o passado dite o presente.",
  mischel: " Ao longo das páginas, Mischel conecta seus achados a educação, saúde e política pública, sugerindo que ensinar autocontrole mudaria gerações. Ele rebate críticas de determinismo e mostra como o ambiente e a estratégia superam o suposto traço fixo.",
  norcross: " O autor aporta tabelas e planilhas que transformam intenção vaga em roteiro mensurável de noventa dias. Sua abordagem é reconfortante para quem já falhou antes: a recaída não é fracasso, é parte estatística previsível do processo de mudança.",
  mcgonigal: " Cada capítulo termina com uma prática baseada em evidência, como a regra dos dez minutos e exercícios de respiração. McGonigal desafia a autoajuda moralista e trata a força de vontade como fisiologia que pode ser treinada e poupada.",
  coelho: " A narrativa curta esconde camadas de simbolismo sobre destino, amor e persistência que leitores de várias idades reinterpretam. Mais que fábula, é convite a ouvir a própria intuição e a coragem de abandonar a segurança pelo que chama.",
  ruiz: " Escrito em tom de sabedoria ancestral, o livro é curto mas exige prática contínua dos acordos no dia a dia. Ruiz convida o leitor a despertar do 'sonho' coletivo e recuperar a liberdade emocional que a sociedade adormeceu.",
  chopra: " Entre ciência e misticismo, Chopra oferece uma prática diária para cada lei, tornando a leitura experiencial. Sua mensagem é que prosperidade e paz não se opõem, mas fluem quando nos alinhamos à inteligência da natureza.",
  allen: " Allen detalha como aplicar o método em equipes e na vida pessoal, com exemplos concretos de listas e revisões. O livro virou referência mundial porque resolve o problema real: a mente não foi feita para ser arquivo.",
  bailey: " Os experimentos incluem semanas sem tecnologia, dietas de informação e jornadas extremas, todos narrados com honestidade sobre o que falhou. O resultado é um guia baseado em evidência pessoal e não em promessas de produtividade mágica.",
  rharris: " Usando a Terapia de Aceitação e Compromisso, o autor entrega exercícios de defusão e expansão em linguagem acessível. Sua tese libertadora é que confiança é irrelevante: o que importa é agir pelos valores mesmo carregando o medo.",
  brewer: " Brewer traduz pesquisa de neuroimagem em passos simples de 'mapa de hábito' que qualquer um aplica. Sua contribuição original é mostrar que curiosidade, não controle, é a chave para desaprender a ansiedade crônica.",
  walker: " Sustentado por centenas de estudos, o livro alerta que a sociedade glamuriza a insônia e paga caro por isso. Walker oferece regras práticas de higiene do sono que qualquer leitor pode aplicar desde a noite seguinte.",
  tippett: " Costurado de vozes de cientistas, poetas e teólogos, o livro resiste a respostas fáceis e cultiva a dúvida generosa. Tippett propõe a sabedoria como prática relacional, nascida do encontro e da escuta, não do isolamento do erudito.",
  dass: " Em formato visual e fragmentado, o livro é experiência tanto quanto texto, convidando à prática e não só à leitura. Ram Dass entrega um caminho de presença e serviço que influenciou gerações de buscadores espirituais ocidentais.",
  kabat: " Escrito em ensaios curtos, o livro descomplica a meditação e a torna viável para quem tem uma vida agitada. Kabat-Zinn mostra que a atenção plena mora no lavar da louça tanto quanto no retiro silencioso.",
  bogle: " Com matemática irrefutável, Bogle explica por que custos e tempo no mercado vencem tentativas de superar o índice. O livro é o manifesto do investidor comum contra a indústria que lucra com sua complexidade.",
  graham: " Com exemplos históricos e o célebre Sr. Mercado, Graham ergue princípios que resistiram a décadas de mercados. Sua disciplina racional continua sendo o alicerce do investimento em valor praticado até hoje.",
  malkiel: " Misturando teoria acadêmica e conselho prático, Malkiel desmonta chartistas e gestores de fundos quentes. Sua conclusão é humilde: para a maioria, diversificar barato e seguir o índice supera qualquer tentativa de adivinhação.",
  klarman: " Escasso e cultuado, o livro eleva a margem de segurança a uma disciplina de preservação de capital. Klarman escreve para quem pensa como dono de negócios e recusa o consenso de mercado como guia."
};

for (const b of books) {
  if (extra[b.id]) b.summary = (b.summary + extra[b.id]).trim();
}
fs.writeFileSync(path, JSON.stringify(books, null, 2), 'utf8');

// report
for (const b of books) {
  console.log(b.id, 'summaryWords=' + b.summary.split(' ').length);
}
console.log('TOTAL books=' + books.length);
