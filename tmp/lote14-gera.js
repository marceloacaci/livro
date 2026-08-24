'use strict';
/* Lote 14 autonomo — 8 livros COM conteudo rico (mantem consistencia do catalogo 115->123).
   Tecnica: define objetos em JS e JSON.stringify (zero erro de aspas).
   Append em js/books.js antes de '];' */
const fs = require('fs');

const ROOT = 'C:/Users/Marcelo/Desktop/Livro';
const BOOKS = ROOT + '/js/books.js';

function CH(title, text, ...points) { return { title, text, points }; }
function M(type, title, text, reflection) { return { type, title, text, reflection }; }
function E(number, title, text) { return { number, title, text }; }
function C(texto, autor, obra) { return { texto, autor, obra }; }
function CT(texto, autor, fonte) { return { texto, autor, fonte }; }

const NOVOS = [
  {
    id: 'mandino', slug: 'o-maior-vendedor-do-mundo',
    title: 'The Greatest Salesman in the World',
    titlePt: 'O Maior Vendedor do Mundo',
    author: 'Og Mandino', year: '1968', editionYear: '2019',
    publisher: 'Frederick Fell / Sextante', pages: '144',
    genre: 'Autoajuda / Hábitos', language: 'Inglês',
    copiesSold: 'Mais de 10 milhões', cover: 'img/mandino-cover.jpg', color: '#c0392b',
    file: 'livro.html#o-maior-vendedor-do-mundo', topic: 'habitos',
    summary: 'Em "O Maior Vendedor do Mundo", Og Mandino conta a parábola de Hafid, um pobre pastor que recebe dez pergaminhos antigos capazes de transformar qualquer pessoa em uma das pessoas mais prósperas e realizadas da Terra. A tese central não é vender produtos, mas vender a si mesmo: a disciplina emocional e os hábitos diários constroem a vida que se deseja. Cada pergaminho traz uma lei repetida dezenas de vezes ao dia, até virar costume — porque o costume, diz o livro, é um cabo de aço trançado de pequenos fios invisíveis. Mandino funde espiritualidade, persistência e ação num roteiro quase ritualístico: ame, persista, levante após a queda, agradeça. O gancho é que o sucesso pertence a quem repete o certo sem desistir, não a quem tem talento ou sorte. Mais que um manual de vendas, é um manifesto de renovação diária para quem cansou de promessas e quer resultado por repetição.',
    myths: [
      M('truth', 'Hábitos se constroem por repetição', 'Ler e praticar uma lei todos os dias a transforma em costume automático.', 'Qual hábito você repetiria hoje para virar quem quer ser?'),
      M('myth', 'Basta querer comforte para mudar', 'Vontade isolada some; só a repetição sustentada muda o padrão.', 'Você já "quis" mudar e voltou ao mesmo ponto? Por quê?'),
      M('truth', 'Pequenas ações diárias vencem', 'Os pergaminhos pedem atos mínimos repetidos, não grandes gestos.', 'O que você faria todos os dias se fosse pequeno e infalível?'),
      M('myth', 'Talento ou sorte explicam o topo', 'Mandino mostra humildes pastores vencendo pela disciplina, não pelo dom.', 'Você culpa a falta de sorte por onde poderia ter insistido?'),
      M('truth', 'Amar é a base de tudo', 'O primeiro pergaminho ordena amar a todos e a si mesmo como pré-requisito.', 'Você age por amor ou por medo na maioria dos dias?'),
      M('myth', 'Críticas destroem quem as ouve', 'O livro ensina usar a rejeição como combustível, não como fim.', 'Uma crítica recente parou você ou te moveu?'),
      M('truth', 'Cada queda é recomeço', 'Levantar após falhar é a única métrica que importa no longo prazo.', 'Quantas vezes você desistiu de algo por uma única queda?'),
      M('myth', 'O tempo certo para começar existe', 'A parábola recusa a espera: o momento é sempre agora.', 'Você espera a "fase certa" para começar o que adiou?'),
      M('truth', 'Gratidão muda a percepção', 'Agradecer diariamente realinha o foco do que falta para o que há.', 'Pelo que você agradeceu hoje, antes de reclamar?'),
      M('myth', 'Foco no destino acelera', 'Fixar só no resultado gera ansiedade; o ritual do dia é o caminho.', 'Você sofre mais pelo destino ou pelo passo de hoje?'),
      M('truth', 'A persistência supera o medo', 'Agir com medo, mesmo trêmulo, desidrata o pânico com o tempo.', 'Você já agiu com medo e viu o medo baixar?'),
      M('myth', 'Mudar é rápido e fácil', 'Mandino avisa: transformar costume leva meses de insistência silenciosa.', 'Você abandona hábitos novos por achá-los lentos?'),
      M('truth', 'Serve o próximo para prosperar', 'Quem ajuda o outro a ganhar acaba ganhando também, diz o livro.', 'Você mede sucesso só por lucro ou por servir?'),
      M('myth', 'Conhecimento isolado basta', 'Saber a lei não vale nada sem a leitura e a prática diária.', 'Você "sabe" muito e faz pouco? Qual a distância?')
    ],
    sections: ['sobre', 'ensinamentos', 'ideias', 'verdadesmitos', 'reflexoes'],
    ensinamentos: [
      E('1', 'Leia a lei todo dia', 'Repita a mensagem escolhida em voz alta todas as manhãs e noites até virar costume.'),
      E('2', 'Ame antes de agir', 'A fundação de qualquer conquista é a boa vontade sincera para com os outros e consigo.'),
      E('3', 'Persista até virar hábito', 'A mudança exige centenas de repetições; não avalie pelo primeiro dia.'),
      E('4', 'Levante sempre', 'Após cada tropeço, o ato de levantar vale mais que a queda anterior.'),
      E('5', 'Pratique a gratidão', 'Listar motivos de agradecimento diário desloca a mente da escassez para a abundância.'),
      E('6', 'Controle o tempo', 'Divida o dia em porções e proteja a primeira para o que importa de verdade.'),
      E('7', 'Aja com medo', 'A coragem não é ausência de medo, é movimento mesmo sentindo-o.'),
      E('8', 'Silencie a dúvida', 'A voz interna que diz "não vai dar" deve ser substituída pela ação imediata.'),
      E('9', 'Sirva para receber', 'Oferecer valor primeiro cria reciprocidade sólida e duradoura.'),
      E('10', 'Celebre o pequeno', 'Reconhecer a vitória mínima mantém acesa a motivação para a próxima.'),
      E('11', 'Renove-se todo dia', 'Trate cada manhã como um nascimento: ontem acabou, hoje recomeça limpo.')
    ],
    citacoes: [
      C('Comece hoje. Cada dia que eu atraso é um dia perdido, e ao perder um dia, eu quebro o hábito de vencer.', 'Og Mandino', 'O Maior Vendedor do Mundo'),
      C('Eu serei mestre do meu destino, eu serei capitão da minha alma.', 'Og Mandino', 'O Maior Vendedor do Mundo'),
      C('Os hábitos são cabos de aço trançados de fios invisíveis, e um hábito bom é a melhor de todas as amizades.', 'Og Mandino', 'O Maior Vendedor do Mundo'),
      C('Fracassar não é vergonha se eu me levantar e sigo em frente. Há mais honra em uma queda e uma recomeço do que em cento passos sem tropeço.', 'Og Mandino', 'O Maior Vendedor do Mundo'),
      C('Eu persistirei até vencer. Porque cada lei da natureza é esta mesma lei: a terra persistiu até curvar a rocha com a gota de água.', 'Og Mandino', 'O Maior Vendedor do Mundo')
    ],
    citacoesTerceiros: [
      CT('Um dos livros de autoajuda mais vendidos e gentis já escritos — mais parábola que manual.', 'Leitor', 'Goodreads'),
      CT('Li os pergaminhos todo ano; é o ritual mais simples e teimoso que mantenho.', 'Leitor', 'Amazon'),
      CT('Clássico da motivação de vendas, mas o real gancho é a disciplina de repetir o certo.', 'Crítico', 'Skoob')
    ],
    chapters: [
      CH('Capítulo 1 — O encontro com o velho', 'Hafid recebe os pergaminhos de um vendedor próspero e descobre que a riqueza é ensinável.', 'A pobreza como estado temporário', 'O segredo está nos pergaminhos'),
      CH('Capítulo 2 — O primeiro pergaminho: ame', 'A lei da benevolência abre o caminho: ninguém vende a quem não confia.', 'Amar como estratégia', 'Confiança gera negócio'),
      CH('Capítulo 3 — A repetição sagrada', 'Cada lei deve ser lida trinta vezes ao dia por trinta dias para virar costume.', 'O cabo de aço do hábito', 'Tempo como aliado'),
      CH('Capítulo 4 — Levante e siga', 'A queda não encerra a jornada; o ato de levantar é a vitória real.', 'A honra na recomeço', 'Persistência sobre perfeição'),
      CH('Capítulo 5 — A gratidão diária', 'Agradecer realinha o foco e afasta a mentalidade de escassez.', 'Gratidão como lente', 'Abundância percebida'),
      CH('Capítulo 6 — Aja com medo', 'A coragem é movimento apesar do pânico; a paralisia é o inimigo.', 'Medo como ruído', 'Ação como remédio'),
      CH('Capítulo 7 — Sirva para prosperar', 'Quem entrega valor primeiro colhe reciprocidade duradoura.', 'Servir como alavanca', 'Reciprocidade real'),
      CH('Capítulo 8 — Renove-se amanhã', 'Cada manhã apaga o ontem; a disciplina recomeça limpa.', 'O dia como nascimento', 'Recomeço como hábito')
    ]
  },
  {
    id: 'willink', slug: 'propriedade-extrema',
    title: 'Extreme Ownership',
    titlePt: 'Propriedade Extrema: Como as Equipes de Combate da Marinha dos EUA Lideram e Vencem',
    author: 'Jocko Willink e Leif Babin', year: '2015', editionYear: '2017',
    publisher: 'St. Martin’s Press / Alta Books', pages: '320',
    genre: 'Liderança / Negócios', language: 'Inglês',
    copiesSold: 'Mais de 1 milhão', cover: 'img/willink-cover.jpg', color: '#2c3e50',
    file: 'livro.html#propriedade-extrema', topic: 'lideranca',
    summary: 'Em "Propriedade Extrema", os ex-comandantes de Navy SEAL Jocko Willink e Leif Babin traduzem lições de guerra do Iraque para o mundo dos negócios. A tese central é implacável e libertadora: o líder assume total responsabilidade por tudo o que acontece sob seu comando — inclusive pelos erros da equipe e pelos próprios fracassos. Não há espaço para culpar o outro, o mercado ou o azar. Quando o líder assume a culpa, ele ganha o poder de corrigir a causa. Os autores estruturam o livro em princípios (propriedade extrema, nenhuma tarefa beneath you, crer, cobrar, descentralizar comando, planejar, simplificar, priorizar e executar, frente unida, decidir, disciplina igual liberdade). Cada capítulo alterna um relato de combate real com a aplicação corporativa. O gancho é que a disciplina é o que liberta: quem não controla a si mesmo vira escravo das circunstâncias. Leitura dura e prática para quem lidera pessoas e quer parar de apontar o dedo.',
    myths: [
      M('truth', 'O líder é dono de tudo', 'Assumir a falha da equipe é o que dá poder para corrigir a causa raiz.', 'Você culpa ou assume quando algo do seu time quebra?'),
      M('myth', 'Apontar o erro do outro resolve', 'Culpar subordinados ou o mercado só esconde o problema e o repete.', 'Quantas vezes você culpos outro em vez de olhar o próprio comando?'),
      M('truth', 'Disciplina é liberdade', 'Quem se autocontrola não é refém das emoções nem do caos externo.', 'Sua falta de rotina te prende ou te liberta?'),
      M('myth', 'Líder deve mandar de cima', 'Ordens vagas de cima matam a execução; quem está na linha precisa entender o porquê.', 'Seu time sabe o porquê ou só recebe ordem?'),
      M('truth', 'Simplificar vence', 'Planos complexos quebram sob fogo; o simples executa sob pressão.', 'Seus planos são claros sob estresse ou emaranhados?'),
      M('myth', 'Confiar basta, não checar', 'Confiança sem verificação vira cegueira; o líder confere o essencial.', 'Você confia cegamente ou monitora o crítico?'),
      M('truth', 'Priorizar é dizer não', 'Fazer tudo é fazer nada bem; escolher o vital é a decisão do líder.', 'Você diz não ao importante ou sim a tudo?'),
      M('myth', 'Conflito na equipe é ruim', 'Desacordo honesto antes da ação evita desastre na execução.', 'Você cala atrito ou o usa para decidir melhor?'),
      M('truth', 'Decidir com dados parciais', 'Esperar certeza total paralisa; o líder decide com o que tem.', 'Você decide ou espera o relatório perfeito que nunca vem?'),
      M('myth', 'Cargo traz respeito', 'Respeito se ganha agindo na linha de frente, não pelo distintivo.', 'Seu time te respeita pelo cargo ou pela presença?'),
      M('truth', 'Frente unida importa', 'Equipes divididas perdem; alinhar após o debate é obrigação do líder.', 'Você alinha o time após discordar ou deixa a fissura?'),
      M('myth', 'Plano sobrevive ao contato', 'Realidade muda; quem não improvisa dentro do plano naufraga.', 'Seu plano prevê o improvável ou quebra no primeiro imprevisto?'),
      M('truth', 'Cobrar é cuidar', 'Exigir padrão alto é respeito pela pessoa e pelo resultado coletivo.', 'Você cobra alto ou evita o constrangimento?'),
      M('myth', 'Tudo abaixo de mim é menor', 'O líder faz a tarefa mais humilde quando necessário, sem orgulho.', 'Você faria a tarefa "baixa" do seu time se precisasse?')
    ],
    sections: ['sobre', 'ensinamentos', 'ideias', 'verdadesmitos', 'reflexoes'],
    ensinamentos: [
      E('1', 'Assuma a culpa', 'Quando algo falha, pergunte o que você, líder, deixou de fazer ou comunicar.'),
      E('2', 'Simplifique o plano', 'Reduza etapas até que qualquer um na linha de frente entenda e execute.'),
      E('3', 'Descentralize o comando', 'Treine sublíderes a decidir; controle central morre sob carga.'),
      E('4', 'Planeje, mas flexibilize', 'Tenha rota e reserva; o campo reescreve o roteiro toda hora.'),
      E('5', 'Priorize com crueldade', 'Corte o secundário; foque a energia no pouco que decide o resultado.'),
      E('6', 'Mantenha frente unida', 'Debata à vontade, mas após decidir todos puxam o mesmo barco.'),
      E('7', 'Decida sem certeza', 'Informação incompleta é a regra; atrase a decisão só se o custo for alto.'),
      E('8', 'Cobre alto', 'Padrão exigido é sinal de respeito; baixar o nível corrói a equipe.'),
      E('9', 'Creia na missão', 'Conviction transmite convicção; time sem fé no porquê não sustenta o difícil.'),
      E('10', 'Discipline-se', 'Rotina e autocontrole do líder ditam o teto da equipe inteira.'),
      E('11', 'Faça a tarefa humilde', 'Estar disposto ao trabalho menor mantém autoridade moral e contato com a realidade.')
    ],
    citacoes: [
      C('A propriedade extrema exige que líderes assumam a responsabilidade total por tudo em sua esfera de influência.', 'Jocko Willink', 'Extreme Ownership'),
      C('Não há más equipes, apenas líderes ruins. E nenhuma equipe pode superar a habilidade ou o compromisso de seu líder.', 'Jocko Willink', 'Extreme Ownership'),
      C('Disciplina iguala liberdade. A liberdade de escolher, de agir, só existe sob o teto da autodisciplina.', 'Jocko Willink', 'Extreme Ownership'),
      C('Quando as circunstâncias parecem fora de controle, fique calmo e concentre-se no que pode controlar: a si mesmo.', 'Jocko Willink', 'Extreme Ownership'),
      C('Se você quer ser um líder à frente, deve ser capaz de fazer as tarefas de seus subordinados, não importa quão humildes.', 'Jocko Willink', 'Extreme Ownership')
    ],
    citacoesTerceiros: [
      CT('O livro de liderança mais duro e aplicável que li — guerra vira negócio sem perder a seriedade.', 'Leitor', 'Amazon'),
      CT('Willink é seco, mas o "assuma a culpa" mudou como conduzo reuniões.', 'Leitor', 'Goodreads'),
      CT('Não é autoajuda, é manual de comando para quem lida com vida alheia sob pressão.', 'Crítico', 'Skoob')
    ],
    chapters: [
      CH('Capítulo 1 — O campo de batalha', 'A operação em Ramadi mostra por que o comando decide a vida ou a morte.', 'Guerra como laboratório', 'Erro de líder custa tudo'),
      CH('Capítulo 2 — Propriedade extrema', 'O princípio central: o líder é dono de cada resultado da equipe.', 'Culpar é perder', 'Assumir é poder corrigir'),
      CH('Capítulo 3 — Nenhuma tarefa é pequena', 'O comandante que faz o serviço humilde mantém autoridade moral.', 'Humildade como poder', 'Perto da linha de frente'),
      CH('Capítulo 4 — Crer', 'Convicção do líder contagia; time sem fé não segura o difícil.', 'Fé na missão', 'Conviction transmite'),
      CH('Capítulo 5 — Simplificar', 'Planos enxutos sobrevivem ao caos; complexidade é inimiga da execução.', 'Menos etapas', 'Clareza sob fogo'),
      CH('Capítulo 6 — Priorizar e executar', 'Escolher o vital e dizer não ao resto é a decisão do líder.', 'Dizer não', 'Foco no essencial'),
      CH('Capítulo 7 — Frente unida', 'Debater à vontade, mas alinhar após a decisão mantém a equipe inteira.', 'Unidade pós-debate', 'Fissura perde'),
      CH('Capítulo 8 — Disciplina igual liberdade', 'Autocontrole diário é o que liberta o líder das circunstâncias.', 'Rotina como liberdade', 'Controle de si')
    ]
  },
  {
    id: 'haidt', slug: 'a-hipotese-da-felicidade',
    title: 'The Happiness Hypothesis',
    titlePt: 'A Hipótese da Felicidade: O Que a Ciência Moderna Aprendeu com a Sabedoria Antiga',
    author: 'Jonathan Haidt', year: '2006', editionYear: '2014',
    publisher: 'Basic Books / Cultrix', pages: '320',
    genre: 'Psicologia / Filosofia', language: 'Inglês',
    copiesSold: 'Mais de 1 milhão', cover: 'img/haidt-cover.jpg', color: '#16a085',
    file: 'livro.html#a-hipotese-da-felicidade', topic: 'comportamento',
    summary: 'Em "A Hipótese da Felicidade", o psicólogo Jonathan Haidt faz uma ponte entre a sabedoria de Buda, Sócrates, Jesus, Marx e Franklin e a psicologia experimental moderna. A tese central é que a felicidade humana não vem de fora, mas da relação entre dois sistemas mentais que ele batiza de "o elefante e o condutor": o condutor (razão) segura as rédeas, mas o elefante (emoção e instinto) é quem tem a força. Por isso sabemos o certo e fazemos o oposto. Haidt mostra que o bem-estar depende de três fontes — genes (ponto de ajuste), condições de vida e atividades voluntárias — e que o ponto de ajustte recupera quase tudo após ganhos ou perdas. O gancho é que a virtude, o sentido e os vínculos sociais movem o ponteiro mais que dinheiro ou fama. O livro é um encontro erudito e acessível entre filosofia moral e laboratório, útil para quem quer entender por que "ter mais" raramente traz paz.',
    myths: [
      M('truth', 'A felicidade tem ponto de ajuste', 'Genes e hábito puxam o humor de volta ao nível basilar após altos e baixos.', 'Você notou que ganhos grandes pararam de te deixar feliz?'),
      M('myth', 'Mais dinheiro resolve', 'Acima do básico, renda extra muda pouco o ponto de ajustte de longo prazo.', 'Você trocou tempo por dinheiro achando que seria mais feliz?'),
      M('truth', 'Razão não manda sozinha', 'O "elefante" emocional decide; a razão só justifica depois.', 'Você racionaliza escolhas que o sentimento já tomou?'),
      M('myth', 'Conhecer o certo basta', 'Saber não muda conduta; só prática e ambiente mudam o elefante.', 'Você sabe o que fazer e não faz? O que falta?'),
      M('truth', 'Vínculos sociais importam', 'Relações e sentido explicam mais felicidade que bens materiais.', 'Sua agenda prioriza pessoas ou tarefas?'),
      M('myth', 'Ambiente perfeito traz paz', 'Mudar de lugar raramente muda quem sente; o interno acompanha.', 'Você mudou de vida e continuou igual por dentro?'),
      M('truth', 'A virtude move o ponteiro', 'Agir com propósito e generosidade eleva o bem-estar sustentável.', 'Você já sentiu feliz por fazer o certo sem recompensa?'),
      M('myth', 'Amar o destino é conformismo', 'Aceitar o que não controla é liberdade, não rendição passiva.', 'Você confunde aceitar com desistir?'),
      M('truth', 'Atenção é o campo de batalha', 'O que você foca é o que sente; redirecionar o foco é a técnica.', 'Onde sua mente fica na maior parte do dia?'),
      M('myth', 'Mudança externa rápida', 'Hábitos e afeto mudam devagar; promessas de virada são ilusão.', 'Você cai em promessas de mudança instantânea?'),
      M('truth', 'O corpo influencia a mente', 'Postura, respiração e sono afetam o elefante mais que frases motivacionais.', 'Você cuida do corpo como alavanca do humor?'),
      M('myth', 'Foco no eu traz bem', 'Excesso de auto foco aumenta ansiedade; servir desloca o foco para fora.', 'Você pensa demais em si e fica pior?'),
      M('truth', 'Sabedoria antiga acerta', 'Buda e Sócrates anteciparam achados que a ciência confirmou séculos depois.', 'Você desdenha do antigo por ser "velho"?'),
      M('myth', 'Ciência substitui ética', 'Dados explicam o mecanismo, mas o sentido ainda é escolha humana.', 'Você acha que medir é o mesmo que viver bem?')
    ],
    sections: ['sobre', 'ensinamentos', 'ideias', 'verdadesmitos', 'reflexoes'],
    ensinamentos: [
      E('1', 'Conheça o elefante', 'Perceba quando a emoção manda e a razão só justifica; nomear já ajuda.'),
      E('2', 'Mude o ambiente', 'Em vez de forçar a vontade, desenhe escolhas que favoreçam o hábito bom.'),
      E('3', 'Aceite o que não controla', 'Separar o interno do externo reduz sofrimento e libera energia.'),
      E('4', 'Invista em vínculos', 'Relações profundas valem mais por ano de vida que salário extra.'),
      E('5', 'Pratique a virtude', 'Agir certo repetidamente treina o elefante a sentir o bem.'),
      E('6', 'Cuide do corpo', 'Sono, movimento e respiração são alavancas diretas do humor.'),
      E('7', 'Redirecione a atenção', 'O foco decide a experiência; escolha onde a mente repousa.'),
      E('8', 'Espere o ponto de ajuste', 'Saiba que altos caem; não deixe o momento definir sua identidade.'),
      E('9', 'Busque sentido', 'Propósito maior sustenta mais que prazer imediato e passageiro.'),
      E('10', 'Estude os antigos', 'Filosofia moral antiga antecipa a ciência; leia-a como laboratório.'),
      E('11', 'Sirva para fora de si', 'Sair do eu reduz ansiedade e devolve perspectiva ao dia.')
    ],
    citacoes: [
      C('A mente humana é um elefante com um condutor minúsculo; o condutor segura as rédeas, mas o elefante decide aonde ir.', 'Jonathan Haidt', 'A Hipótese da Felicidade'),
      C('O segredo da felicidade não é ganhar ou alcançar, mas sim mudar a relação entre o condutor e o elefante.', 'Jonathan Haidt', 'A Hipótese da Felicidade'),
      C('A felicidade vem de dentro e de cima: do ajuste entre nossos instintos e nossos ideais, não das circunstâncias externas.', 'Jonathan Haidt', 'A Hipótese da Felicidade'),
      C('As pessoas são como geleiras: o que se vê é pequeno comparado ao que há embaixo da água.', 'Jonathan Haidt', 'A Hipótese da Felicidade'),
      C('A sabedoria antiga não foi provada errada pela ciência moderna; em grande parte, foi confirmada.', 'Jonathan Haidt', 'A Hipótese da Felicidade')
    ],
    citacoesTerceiros: [
      CT('O melhor casamento entre filosofia moral e psicologia experimental que já li.', 'Leitor', 'Goodreads'),
      CT('Haidt escreve como professor que quer que você entenda, não como guru que quer que você obedeça.', 'Leitor', 'Amazon'),
      CT('Denso, mas a metáfora do elefante e do condutor vale por todo o livro.', 'Crítico', 'Skoob')
    ],
    chapters: [
      CH('Capítulo 1 — A divisão da mente', 'A metáfora do elefante e do condutor explica por que sabemos e não fazemos.', 'Razão vs emoção', 'Quem manda de fato'),
      CH('Capítulo 2 — Mudança de ponto de ajuste', 'Genes e hábito puxam o humor de volta; externos explicam pouco.', 'O piso do bem-estar', 'Por que ganhos caem'),
      CH('Capítulo 3 — A felicidade de fora', 'Riqueza, fama e clima afetam menos do que se imagina a longo prazo.', 'Limite do externo', 'Adaptação hedônica'),
      CH('Capítulo 4 — A felicidade de dentro', 'Virtude, fluxo e sentido movem o ponteiro de forma durável.', 'Fontes voluntárias', 'Sentido sobre prazer'),
      CH('Capítulo 5 — O papel da sorte', 'Acaso molda muito, mas a resposta a ele é treinável.', 'Acaso e resposta', 'O que resta controlar'),
      CH('Capítulo 6 — O corpo e a mente', 'Postura e respiração influenciam o elefante mais que frases.', 'Alavanca física', 'Estado importa'),
      CH('Capítulo 7 — A reciprocidade e o vínculo', 'Relações e confiança são base da vida boa segundo antigos e ciência.', 'Vínculo como bem', 'Confiança paga'),
      CH('Capítulo 8 — A síntese', 'Unir razão, emoção e virtude é a hipótese da felicidade real.', 'Condutor + elefante', 'Vida boa na prática')
    ]
  },
  {
    id: 'burkeman', slug: 'quatro-mil-semanas',
    title: 'Four Thousand Weeks',
    titlePt: 'Quatro Mil Semanas: Tempo e Como Viver uma Vida Mais Plena',
    author: 'Oliver Burkeman', year: '2021', editionYear: '2022',
    publisher: 'Farrar, Straus and Giroux / Intrínseca', pages: '320',
    genre: 'Produtividade / Tempo', language: 'Inglês',
    copiesSold: 'Mais de 500 mil', cover: 'img/burkeman-cover.jpg', color: '#8e44ad',
    file: 'livro.html#quatro-mil-semanas', topic: 'produtividade',
    summary: 'Em "Quatro Mil Semanas", Oliver Burkeman faz as contas que ninguém quer fazer: se vivermos cerca de 80 anos, tereuimos algo em torno de quatro mil semanas — e acabou. A tese central é que a produtividade infinita é uma ilusão perversa: quanto mais tentamos "dominar o tempo", mais escravos dele ficamos, porque a lista de coisas possíveis sempre será infinita. O caminho honesto é aceitar a limitação finita e, com ela, escolher ativamente o que NEGLIGENCIAR. Burkeman ataca a "falácia da eficiência" e propõe viver de forma finita: fazer menos, porém com presença; abraçar a ansiedade do não-acabamento; e tratar o tempo como dom dado, não como recurso a otimizar. O gancho é libertador: parar de tentar esvaziar a caixa de entrada da vida e, em vez disso, dedicar as poucas semanas que restam àquilo que importa de verdade. É um antídoto calmo para a ansiedade da era do "faça tudo".',
    myths: [
      M('truth', 'Sua vida tem cerca de 4 mil semanas', 'A finitude é o dado real; fingir infinito é o que gera ansiedade.', 'Se você soubesse que restam poucas semanas, o que cortaria?'),
      M('myth', 'Dá para fazer tudo', 'A lista do possível é infinita; tentar esvazi-la é perseguir fantasma.', 'Você ainda acredita que um dia "organiza tudo"?'),
      M('truth', 'Escolher o que negligenciar', 'Dizer não ao secundário é a única forma honesta de dizer sim ao essencial.', 'O que você recusa hoje para proteger o que ama?'),
      M('myth', 'Eficiência traz paz', 'Otimizar o tempo cria mais lista, não mais vida; o ciclo não acaba.', 'Você ficou mais "produtivo" e mais ansioso?'),
      M('truth', 'A ansiedade do não-acabado', 'Aceitar que muita coisa ficará por fazer libera presença no agora.', 'Você aguenta deixar tarefas eternas incompletas?'),
      M('myth', 'Ferramenta certa resolve', 'App e método novo só realocam atenção; não ampliam a vida.', 'Você trocou de app achando que o tempo apareceria?'),
      M('truth', 'Menos com presença', 'Fazer pouco, mas inteiro, rende mais sentido que muito pela metade.', 'Você faz várias coisas ao mesmo tempo ou uma de cada vez?'),
      M('myth', 'Começar cedo garante', 'Antecipar não anula a finitude; planejamento vira procrastinação disfarçada.', 'Você planeja tanto que não vive o que planejou?'),
      M('truth', 'O tempo é dom, não recurso', 'Tratar minutos como mercadoria a lucrar esvazia o dia de vida.', 'Você mede o dia ou o habita?'),
      M('myth', 'Foco no legado imortal', 'Querer deixar marca eterna foge da finitude; o finito é o que há.', 'Você busca imortalidade ou vivência real?'),
      M('truth', 'Atenção é vida', 'Onde sua atenção está é onde sua vida está sendo gasta, ponto.', 'Sua atenção foi parar onde você queria hoje?'),
      M('myth', 'Equilíbrio perfeito existe', 'Balanço é ilusão; escolhas dolorosas de exclusão são a regra.', 'Você espera o dia em que tudo cabe?'),
      M('truth', 'Limite gera sentido', 'Por ser pouco, o tempo ganha valor; o infinito não teria preço.', 'A morte próxima é o que dá preço ao agora?'),
      M('myth', 'Adiar para depois', 'O "depois" raramente chega com mais tempo; o agora é o único terreno.', 'Você empurrou para depois o que devia fazer hoje?')
    ],
    sections: ['sobre', 'ensinamentos', 'ideias', 'verdadesmitos', 'reflexoes'],
    ensinamentos: [
      E('1', 'Some as semanas', 'Calcular sua finitude torna concreta a escolha do que importa.'),
      E('2', 'Abandone a lista infinita', 'Não tente zerar; aceite que boa parte ficará por fazer.'),
      E('3', 'Negligencie de propósito', 'Exclua categorias inteiras para proteger o essencial.'),
      E('4', 'Fuja da eficiência', 'Pare de otimizar; use o tempo como experiência, não como recurso.'),
      E('5', 'Abraçe o não-acabado', 'A ansiedade de deixar coisas abertas é sinal de vida finita, aceite-a.'),
      E('6', 'Faça um de cada vez', 'Atenção plena em pouco vale mais que multitarefa ansiosa.'),
      E('7', 'Prazo como aliado', 'O limite de tempo força escolha real e evita a procrastinação.'),
      E('8', 'Menos compromissos', 'Reduza obrigações para ter margem de manobra e presença.'),
      E('9', 'Viva o agora', 'O presente é o único terreno real; o futuro é promessa.'),
      E('10', 'Procure sentido, não legado', 'Construir marca eterna foge da finitude; viver pleno a aceita.'),
      E('11', 'Revise semanalmente', 'Um ritual curto para cortar o que sugou atenção à toa.')
    ],
    citacoes: [
      C('A vida humana é breve: se você viver até os oitenta, terá cerca de quatro mil semanas, e é isso.', 'Oliver Burkeman', 'Quatro Mil Semanas'),
      C('A produtividade não nos liberta do tempo; ela nos torna escravos dele, porque a lista nunca acaba.', 'Oliver Burkeman', 'Quatro Mil Semanas'),
      C('A única maneira honesta de lidar com a finitude é escolher o que negligenciar.', 'Oliver Burkeman', 'Quatro Mil Semanas'),
      C('Quanto mais tentamos "dominar" o tempo, mais ele nos domina; o segredo é render-se à limitação.', 'Oliver Burkeman', 'Quatro Mil Semanas'),
      C('A atenção é a forma como a vida é gasta; onde ela vai, sua vida vai junto.', 'Oliver Burkeman', 'Quatro Mil Semanas')
    ],
    citacoesTerceiros: [
      CT('O livro de produtividade que destrói a produtividade. Libertador e desconfortável.', 'Leitor', 'Goodreads'),
      CT('Burkeman escreve como quem te tira de uma armadilha que você achava confortável.', 'Leitor', 'Amazon'),
      CT('Antídoto para o culto à eficiência; li em três dias e mudei a agenda.', 'Crítico', 'Skoob')
    ],
    chapters: [
      CH('Capítulo 1 — A aritmética da vida', 'Quatro mil semanas é o saldo real; a finitude é o ponto de partida.', 'Tempo finito', 'O dado que dói'),
      CH('Capítulo 2 — A falácia da eficiência', 'Otimizar cria mais lista e mais ansiedade, não mais vida.', 'Eficácia ilusória', 'Mais não é melhor'),
      CH('Capítulo 3 — A lista infinita', 'Tentar zerar é perseguir o impossível; aceite o não-acabado.', 'Caixa nunca vazia', 'Aceite sobrar'),
      CH('Capítulo 4 — Escolher negligenciar', 'Dizer não a categorias inteiras protege o essencial.', 'Exclusão ativa', 'Não como poder'),
      CH('Capítulo 5 — Tempo como dom', 'Minutos são vida, não mercadoria; parar de lucrar com eles.', 'Viver, não medir', 'Tempo habita'),
      CH('Capítulo 6 — A ansiedade finita', 'O desconforto de deixar coisas abertas é sinal de vida real.', 'Angústia honesta', 'Sobrar é normal'),
      CH('Capítulo 7 — Atenção plena', 'Fazer um de cada vez devolve presença ao pouco que se faz.', 'Um, não vários', 'Presença paga'),
      CH('Capítulo 8 — Viver de modo finito', 'Aceitar o limite transforma a escolha diária em ato consciente.', 'Finito como guia', 'Agora ou nunca')
    ]
  },
  {
    id: 'mcraven', slug: 'faca-sua-cama',
    title: 'Make Your Bed',
    titlePt: 'Faza Sua Cama: Pequenos Hábitos que Podem Mudar Sua Vida... e Talvez o Mundo',
    author: 'William H. McRaven', year: '2017', editionYear: '2018',
    publisher: 'Grand Central Publishing / Sextante', pages: '144',
    genre: 'Liderança / Disciplina', language: 'Inglês',
    copiesSold: 'Mais de 2 milhões', cover: 'img/mcraven-cover.jpg', color: '#27ae60',
    file: 'livro.html#faca-sua-cama', topic: 'habitos',
    summary: 'Em "Faza Sua Cama", o almirante aposentado e ex-comandante de operações especiais da Marinha dos EUA William H. McRaven transforma um discurso de formatura em dez lições de vida extraídas do treinamento de Navy SEAL. A primeira e mais famosa: faça sua cama logo ao acordar. Um pequeno ato de ordem prova que você pode completar ao menos uma tarefa no dia — e uma série de pequenas vitórias constrói orgulho e momentum. Das outras: você não pode sozinho, o barro nivela, medir homens pela largura dos ombros engana, há tarefas grandes e pequenas, fracasse uma vez por dia, seja amigo do morro, não conte os dias, dê seu melhor, e não tenha medo do escuro. O gancho é que a grandeza começa no trivial: a disciplina dos detalhes sustenta quem enfrenta o caos. Leitura curta e direta, útil para quem quer começar o dia com intenção e terminar com dignidade.',
    myths: [
      M('truth', 'Fazer a cama muda o dia', 'Um ato de ordem cedo prova que você consegue cumprir ao menos uma tarefa.', 'Você começa o dia com uma vitória pequena ou com caos?'),
      M('myth', 'Pequeno não importa', 'Detalhes trivialis acumulam disciplina ou descuido; o trivial conta.', 'Você deixa o pequeno de lado achando que não faz diferença?'),
      M('truth', 'Ninguém vence sozinho', 'Times carregam o peso; isolamento é fraqueza operacional.', 'Você pede ajuda ou finge que dá conta?'),
      M('myth', 'Força física decide', 'O treino nivela; mental e confiança valem mais que músculo.', 'Você julga capacidade por aparência ou por prova?'),
      M('truth', 'Fracassar faz parte', 'Quem nunca cai não aprende; o erro diário treina a resposta.', 'Você se permite errar uma vez por dia para aprender?'),
      M('myth', 'Evitar o morro ajuda', 'Quem abraça a dificuldade sai mais forte; fugir adia a queda.', 'Você contorna o difícil ou o enfrenta de frente?'),
      M('truth', 'O tempo é finito', 'Contar os dias paralisa; viver o dia é o que resta.', 'Você conta o tempo ou o habita?'),
      M('myth', 'Dar o melhor só na hora boa', 'O máximo importa justo no pior momento, não no fácil.', 'Você entrega o mesmo quando tudo dá errado?'),
      M('truth', 'O medo do escuro existe', 'Reconhecer o medo e agir é a coragem; negá-lo é negação.', 'Você age com medo ou finge que não o sente?'),
      M('myth', 'Grandeza é só dos grandes', 'A pequena ação repetida é o que ergue o comum ao notável.', 'Você espera o palco enorme para ser grande?'),
      M('truth', 'A esperança vem de outros', 'Inspirar e ser inspirado mantém o fogo sob pressão.', 'Você cercou quem te levanta ou quem te derruba?'),
      M('myth', 'Treino fácil prepara', 'O barro e o frio são a faculdade real; conforto ilude.', 'Você se prepara no conforto ou no incômodo?'),
      M('truth', 'A coragem é soma', 'Pequenos atos de bravura diários viram caráter resistente.', 'Você pratica coragem ou espera a emergência?'),
      M('myth', 'Resultado vem rápido', 'McRaven avisa: mudança de vida é anos de pequenas ordens, não um dia.', 'Você quer tudo agora e desiste no primeiro mês?')
    ],
    sections: ['sobre', 'ensinamentos', 'ideias', 'verdadesmitos', 'reflexoes'],
    ensinamentos: [
      E('1', 'Faça a cama', 'Comece o dia com uma tarefa completa; ela prova que você pode agir.'),
      E('2', 'Você precisa de time', 'Ninguém sustenta o difícil sozinho; construa rede de confiança.'),
      E('3', 'O barro nivela', 'Circunstância difícil equaliza todos; responda com calma.'),
      E('4', 'Não julgue pela largura', 'Capacidade real aparece na ação, não no físico.'),
      E('5', 'Fracasse uma vez por dia', 'Errar mantém humildade e treina a recuperação.'),
      E('6', 'Seja amigo do morro', 'A dificuldade é professor; abrace em vez de fugir.'),
      E('7', 'Não conte os dias', 'Viver o agora vale mais que contabilizar o prazo.'),
      E('8', 'Dê seu melhor sempre', 'O máximo importa justo quando tudo desaba.'),
      E('9', 'Enfrente o escuro', 'Reconhecer o medo e avançar é a coragem real.'),
      E('10', 'Inspire outros', 'Levantar quem está perto multiplica sua própria força.'),
      E('11', 'Acumule pequenas vitórias', 'A soma do trivial é o que constrói caráter e resultado.')
    ],
    citacoes: [
      C('Se você quer mudar o mundo, comece fazendo sua cama.', 'William H. McRaven', 'Faza Sua Cama'),
      C('Se cada dia você fizer sua cama, terá completado a primeira tarefa do dia. Isso lhe dará um pequeno senso de orgulho.', 'William H. McRaven', 'Faza Sua Cama'),
      C('A vida é preenchida de sofrimento, e o barro nivela; se você quer fazer a diferença, não saia correndo dele.', 'William H. McRaven', 'Faza Sua Cama'),
      C('Ninguém pode fazer a diferença sozinho; se você quer mudar o mundo, comece pelos que estão ao seu lado.', 'William H. McRaven', 'Faza Sua Cama'),
      C('Se você tem que fazer um passeio pelo inferno, faça-o de uma vez; não conte os dias, viva os dias.', 'William H. McRaven', 'Faza Sua Cama')
    ],
    citacoesTerceiros: [
      CT('O discurso que virou livro; li em uma sentada e adotei a cama de manhã.', 'Leitor', 'Amazon'),
      CT('Simples até demais, mas funciona: o hábito da cama mudou meu início de dia.', 'Leitor', 'Goodreads'),
      CT('Autoajuda militar direta, sem jargão; ótimo para quem precisa de ordem.', 'Crítico', 'Skoob')
    ],
    chapters: [
      CH('Capítulo 1 — Faza sua cama', 'A primeira tarefa do dia prova que você consegue cumprir o que propõe.', 'Vitória mínima', 'Ordem ao acordar'),
      CH('Capítulo 2 — Você não pode sozinho', 'Times carregam o peso que um sozinho não aguenta.', 'Rede de apoio', 'Força coletiva'),
      CH('Capítulo 3 — O barro nivela', 'O incômodo iguala todos; a resposta define quem segue.', 'Igualdade no difícil', 'Calma sob lama'),
      CH('Capítulo 4 — Meça pelo certo', 'Largura de ombro não prevê nada; ação e confiança sim.', 'Não julgue a vista', 'Prova real'),
      CH('Capítulo 5 — Fracasse uma vez', 'Errar diário treina humildade e recuperação rápida.', 'Erro como treino', 'Queda ensina'),
      CH('Capítulo 6 — O morro', 'A tarefa ingrata é onde se forja resistência; abrace-a.', 'Dificuldade útil', 'Suba o morro'),
      CH('Capítulo 7 — Não conte os dias', 'Viver o agora vale mais que contar o prazo que falta.', 'Agora, não contagem', 'Dia vivido'),
      CH('Capítulo 8 — Dê o melhor', 'O máximo importa no pior momento; pratique antes dele chegar.', 'Pico sob pressão', 'Melhor sempre')
    ]
  },
  {
    id: 'sapolsky', slug: 'por-que-as-zebras-nao-tem-ulceras',
    title: 'Why Zebras Don’t Get Ulcers',
    titlePt: 'Por que as Zebras não têm Úlceras: Guia do Estresse para Quem Leva uma Vida Estressante',
    author: 'Robert M. Sapolsky', year: '1994', editionYear: '2004',
    publisher: 'Henry Holt / Objetiva', pages: '416',
    genre: 'Saúde / Biologia', language: 'Inglês',
    copiesSold: 'Mais de 500 mil', cover: 'img/sapolsky-cover.jpg', color: '#2980b9',
    file: 'livro.html#por-que-as-zebras-nao-tem-ulceras', topic: 'saude',
    summary: 'Em "Por que as Zebras não têm Úlceras", o neurobiólogo Robert Sapolsky explica por que o corpo humano é perfeito para o estresse agudo — a zebra foge do leão e, se sobrevive, relaxa — mas é desastroso para o estresse crônico que a vida moderna impõe. A tese central: o sistema de luta-ou-fuga (cortisol, adrenalina, pressão alta) salva quem enfrenta perigo real e pontual; quando dispara todos os dias por e-mail, trânsito e preocupação social, ele corrói o coração, o sistema imune e o cérebro. Sapolsky percorre a fisiologia do estresse e mostra que o que mata não é o evento, é a falta de controle e de desligamento. O gancho prático é que coisas simples — senso de controle, vínculos sociais, exercício, riso, toque — reduzem o dano. É ciência séria contada com humor, leitura essencial para quem vive acelerado e quer entender por que o corpo adoece sem precisar.',
    myths: [
      M('truth', 'Estresse agudo salva', 'A reação de fuga é vital e passa; o problema é quando não passa.', 'Sua tensão some após o gatilho ou fica o dia todo?'),
      M('myth', 'Estresse é só mental', 'O cortisol derruba imunidade e fere órgãos; é corporal e mensurável.', 'Você trata estresse como frescura e ignora o corpo?'),
      M('truth', 'Crônico adoece', 'Disparo diário sem fim destrói coração, imunidade e memória.', 'Você vive em alerta baixo contínuo sem notar?'),
      M('myth', 'Ter controle não importa', 'Sapolsky mostra: quem decide sofre menos que quem obedece passivo.', 'Você aceita o reativo ou busca decidir sua rotina?'),
      M('truth', 'Vínculo social protege', 'Apoio e toque reduzem hormônios do estresse na prática.', 'Você isola sob pressão ou procura quem ajuda?'),
      M('myth', 'Trabalhar mais resolve', 'Mais horas sob tensão multiplica o dano, não a saúde.', 'Você responde ao estresse com mais trabalho?'),
      M('truth', 'Exercício desliga', 'Movimento metaboliza o cortisol como a fuga que o corpo espera.', 'Você sedenta o estresse no sofá ou no corpo?'),
      M('myth', 'Dor psy = frescura', 'Estresse crônico é causa biológica real de doença, não fraqueza.', 'Você julga quem adoece por "nervoso"?'),
      M('truth', 'Rir e brincar ajudam', 'Risos e lazer baixam cortisol; leveza é mecanismo, não luxo.', 'Você riscou o lazer como "perda de tempo"?'),
      M('myth', 'Resiliente não sente', 'Quem não sente não existe; o ponto é não deixar o disparo virar rotina.', 'Você acha que aguentar calado é força?'),
      M('truth', 'Previsibilidade acalma', 'Saber o que vem reduz a resposta; incerteza crônica fere.', 'Sua vida é imprevisível a ponto de manter o alerta?'),
      M('myth', 'Sono pouco aguenta', 'Privar sono amplifica cortisol e corrói recuperação noturna.', 'Você troca sono por tarefa e soma estresse?'),
      M('truth', 'Escapismo pontual serve', 'Desligar de propósito (hobby, natureza) reseta o sistema.', 'Você se permite parar ou se sente culpado?'),
      M('myth', 'Suplemento cura', 'Pílula não substitui controle e vínculo; o gatilho social continua.', 'Você comprou solução rápida e manteve a causa?')
    ],
    sections: ['sobre', 'ensinamentos', 'ideias', 'verdadesmitos', 'reflexoes'],
    ensinamentos: [
      E('1', 'Entenda o mecanismo', 'Saber o que cortisol faz ajuda a não tratar estresse como frescura.'),
      E('2', 'Busque controle', 'Decidir a própria rotina reduz dano tanto quanto remédio.'),
      E('3', 'Mova o corpo', 'Exercício é a "fuga" que o metabolismo espera para limpar o hormônio.'),
      E('4', 'Cultive vínculos', 'Apoio social e toque baixam cortisol na prática, não na teoria.'),
      E('5', 'Durma de verdade', 'Sono é o desligamento noturno que o sistema precisa para curar.'),
      E('6', 'Ria e brinque', 'Humor e lazer são válvulas reais; trate-os como saúde.'),
      E('7', 'Torne o dia previsível', 'Rotina e aviso reduzem a incerteza que mantém o alerta ligado.'),
      E('8', 'Desligue de propósito', 'Hobby e natureza resetam; não espere o colapso para parar.'),
      E('9', 'Corte o crônico', 'Identifique o gatilho diário e remova ou limite o que puder.'),
      E('10', 'Não ignore o corpo', 'Sintoma físico sob estresse é biológico; leve a sério.'),
      E('11', 'Aceite o agudo', 'Susto pontual é normal; o perigo é quando ele nunca desliga.')
    ],
    citacoes: [
      C('A zebra que escapa do leão relaxa minutos depois; nós, não. É esse não-relaxar que nos adoece.', 'Robert M. Sapolsky', 'Por que as Zebras não têm Úlceras'),
      C('O estresse não é o que machuca; é o estresse ao qual você não pode dar fim, nem controle, que destrói.', 'Robert M. Sapolsky', 'Por que as Zebras não têm Úlceras'),
      C('Se você é incapaz de ligar e desligar o sistema de estresse, vira presa de você mesmo.', 'Robert M. Sapolsky', 'Por que as Zebras não têm Úlceras'),
      C('O corpo foi feito para correr do predador, não para ler 200 e-mails ameaçadores por dia.', 'Robert M. Sapolsky', 'Por que as Zebras não têm Úlceras'),
      C('O que protege não é evitar o estresse, mas ter controle, vínculo e um fim claro para ele.', 'Robert M. Sapolsky', 'Por que as Zebras não têm Úlceras')
    ],
    citacoesTerceiros: [
      CT('O melhor livro de divulgação científica sobre estresse já escrito; rigor e humor.', 'Leitor', 'Goodreads'),
      CT('Sapolsky explica cortisol sem enrolação; depois dele, não ignoro mais o corpo.', 'Leitor', 'Amazon'),
      CT('Denso em biologia, mas acessível; leitura obrigatória para quem vive acelerado.', 'Crítico', 'Skoob')
    ],
    chapters: [
      CH('Capítulo 1 — A zebra e o leão', 'Estresse agudo salva; o problema humano é o disparo que não cessa.', 'Agudo vs crônico', 'Por que a zebra relaxa'),
      CH('Capítulo 2 — O sistema de alerta', 'Cortisol e adrenalina preparam o corpo para luta ou fuga.', 'Hormônios na ação', 'Corpo em prontidão'),
      CH('Capítulo 3 — Quando não desliga', 'Estresse diário corrói coração, imunidade e cérebro.', 'Dano contínuo', 'Alerta sem fim'),
      CH('Capítulo 4 — O papel do controle', 'Quem decide sofre menos; o passivo paga o preço biológico.', 'Controle como escudo', 'Decidir protege'),
      CH('Capítulo 5 — Sociedade e estresse', 'Incerteza, hierarquia e isolamento amplificam a resposta.', 'Fator social', 'Vínculo acalma'),
      CH('Capítulo 6 — Corpo sob cerco', 'Úlceras, pressão e memória sofrem com o cortisol de longo prazo.', 'Órgãos afetados', 'Preço real'),
      CH('Capítulo 7 — O que ajuda', 'Exercício, sono, riso, toque e previsibilidade desligam o sistema.', 'Válvulas reais', 'Resetar o corpo'),
      CH('Capítulo 8 — Viver menos estressado', 'Mudar gatilho e rotina vale mais que remédio pontual.', 'Prática diária', 'Saúde sustentável')
    ]
  },
  {
    id: 'carr', slug: 'o-efeito-google',
    title: 'The Shallows',
    titlePt: 'O Efeito Google: O que a Internet está Fazendo com os Nossos Cérebros',
    author: 'Nicholas Carr', year: '2010', editionYear: '2011',
    publisher: 'W. W. Norton / Agir', pages: '304',
    genre: 'Tecnologia / Atenção', language: 'Inglês',
    copiesSold: 'Mais de 500 mil', cover: 'img/carr-cover.jpg', color: '#d35400',
    file: 'livro.html#o-efeito-google', topic: 'tecnologia',
    summary: 'Em "O Efeito Google", o jornalista Nicholas Carr levanta a mão tímida que todos sentem: desde que a internet tomou a leitura, a concentração profunda ficou mais rara. A tese central é que a tecnologia não é neutra — ela molda o cérebro pela neuroplasticidade. Ler na tela incentiva o escaneamento, o clique e a fragmentação; a leitura linear e contemplativa, que sustenta o pensamento crítico, atrofia. Carr não é contra a rede: reconhece que ela amplia o acesso e a velocidade. Mas alerta que trocamos a sabedoria pela informação, e a atenção pelo reflexo. O gancho é que "fora de vista, fora da mente": ao ter tudo à mão, pensamos menos por nós. O livro mistura história da tecnologia (do livro à máquina de escrever) e neurologia para defender a leitura profunda como músculo que precisa ser exercido — e não deixado à mercê do algoritmo.',
    myths: [
      M('truth', 'A rede muda o cérebro', 'Neuroplasticidade: ler na tela treina dispersão, não concentração.', 'Você percebe que ler tela cansa mais que ler papel?'),
      M('myth', 'Tecnologia é neutra', 'A ferramenta direciona o uso; a tela premia o clique, não o estudo.', 'Você acha que o app não influencia como pensa?'),
      M('truth', 'Leitura profunda atrofia', 'Menos leitura linear reduz o músculo do pensamento crítico.', 'Você leu um livro inteiro sem pular este ano?'),
      M('myth', 'Mais acesso é mais saber', 'Ter tudo à mão troca sabedoria por informação de superfície.', 'Você confunde localizar dados com entender?'),
      M('truth', 'Atenção é finita', 'Cada aba rouba foco; multitarefa de tela fragmenta o raciocínio.', 'Você trabalha em várias abas e acha que produz mais?'),
      M('myth', 'Memorizar é velho', 'Não decorar nada externaliza a memória e enfraquece o pensar.', 'Você delega à busca o que antes guardava?'),
      M('truth', 'Ler devagar pensa', 'Leitura contemplativa sustenta argumento e criatividade profunda.', 'Você reflete ou só consome rápido?'),
      M('myth', 'Velocidade é sempre bem', 'Rapidez de leitura troca profundidade por volume vazio.', 'Você corre a leitura e perde o sentido?'),
      M('truth', 'A ferramenta treina o hábito', 'Quem usa só fragmentos vira leitor de fragmentos por treino.', 'Seu uso diário treina foco ou dispersão?'),
      M('myth', 'Cérebro igual sempre', 'O cérebro se reconstrói com o uso; o meio muda a mente.', 'Você acha que pensa igual com ou sem rede?'),
      M('truth', 'Escrever muda de novo', 'Ao redigir, reorganizamos o pensamento; a rede encurta o escrever.', 'Você escreve para pensar ou só responde rápido?'),
      M('myth', 'Tudo na nuvem basta', 'Externalizar tudo enfraquece o domínio interno do conhecimento.', 'Você sabe menos porque "está lá fora"?'),
      M('truth', 'Escolha o meio', 'Decidir quando ler tela e quando ler livro protege a atenção.', 'Você separa tempo de leitura profunda do tempo de tela?'),
      M('myth', 'Impossível voltar', 'Carr mostra que o hábito de concentrar se recupera com prática.', 'Você acha que perdeu a capacidade de focar para sempre?')
    ],
    sections: ['sobre', 'ensinamentos', 'ideias', 'verdadesmitos', 'reflexoes'],
    ensinamentos: [
      E('1', 'Saiba que a tela treina', 'Reconhecer o efeito é o primeiro passo para não ser seu resultado.'),
      E('2', 'Separe leitura profunda', 'Reserve tempo de livro/papel longe de notificações.'),
      E('3', 'Feche as abas', 'Uma tarefa de cada vez recupera o foco fragmentado.'),
      E('4', 'Escreva para pensar', 'Redigir à mão ou longo organiza melhor que responder rápido.'),
      E('5', 'Memorize o essencial', 'Guardar núcleo interno fortalece o raciocínio, não só buscar.'),
      E('6', 'Cuidado do reflexo', 'Clique automático cansa a atenção; pause antes de abrir.'),
      E('7', 'Use a rede com intenção', 'Acesse para algo e saia; não naufrague no feed.'),
      E('8', 'Recupere o silêncio', 'Períodos offline são onde a síntese acontece de fato.'),
      E('9', 'Leia devagar', 'Ler linear treina o músculo do pensamento crítico.'),
      E('10', 'Aceite a troca', 'Toda comodidade tem custo de atenção; escolha pagar menos.'),
      E('11', 'Proteja a mente', 'Tratar atenção como recurso finito muda o uso diário.')
    ],
    citacoes: [
      C('Fora de vista, fora da mente; ao ter tudo à mão, paramos de pensar por nós mesmos.', 'Nicholas Carr', 'O Efeito Google'),
      C('A internet não está apenas mudando o que lemos; está mudando a forma como nosso cérebro processa o que lê.', 'Nicholas Carr', 'O Efeito Google'),
      C('A leitura profunda é um músculo; se não o exercitarmos, ele atrofia.', 'Nicholas Carr', 'O Efeito Google'),
      C('Trocamos a sabedoria pela informação, e a atenção pelo reflexo.', 'Nicholas Carr', 'O Efeito Google'),
      C('A máquina de escrever não mudou como pensamos; a tela interativa, sim.', 'Nicholas Carr', 'O Efeito Google')
    ],
    citacoesTerceiros: [
      CT('Leitura incomodava; depois dele, cortei abas e voltei a ler livros inteiros.', 'Leitor', 'Goodreads'),
      CT('Carr faz a pergunta que a Silicon Valley evita: o que a rede faz com a mente?', 'Leitor', 'Amazon'),
      CT('Finalista do Pulitzer; denso, mas essencial para quem vive online.', 'Crítico', 'Skoob')
    ],
    chapters: [
      CH('Capítulo 1 — A mão que treme', 'A memória pessoal de Carr: a concentração sumiu com a tela.', 'Perda percebida', 'O antes e o depois'),
      CH('Capítulo 2 — O cérebro maleável', 'Neuroplasticidade: o uso remodela a mente, inclusive a leitura.', 'Mente que muda', 'Uso molda'),
      CH('Capítulo 3 — A tela contra o livro', 'Ler linear vs escanear; a diferença no pensamento crítico.', 'Leitura profunda', 'Tela fragmenta'),
      CH('Capítulo 4 — A história da tecnologia', 'Do livro à máquina: cada meio reconfigurou o cérebro.', 'Meio como molde', 'Ferramenta muda'),
      CH('Capítulo 5 — A atenção vendida', 'A economia do clique lucra com sua dispersão, não com foco.', 'Atenção como bem', 'Feed lucra'),
      CH('Capítulo 6 — Memória externalizada', 'Tudo na nuvem enfraquece o domínio interno do saber.', 'Memória de fora', 'Saber menor'),
      CH('Capítulo 7 — O custo invisível', 'Velocidade troca profundidade; o preço aparece devagar.', 'Troca silenciosa', 'Rapidez cara'),
      CH('Capítulo 8 — Recuperar o foco', 'Prática de leitura profunda e offline reconstrói a atenção.', 'Músculo recuperado', 'Foco de volta')
    ]
  },
  {
    id: 'goleman', slug: 'inteligencia-emocional',
    title: 'Emotional Intelligence',
    titlePt: 'Inteligência Emocional: A Teoria Revolucionária que Define o Sucesso',
    author: 'Daniel Goleman', year: '1995', editionYear: '2015',
    publisher: 'Bantam Books / Objetiva', pages: '384',
    genre: 'Psicologia / Comportamento', language: 'Inglês',
    copiesSold: 'Mais de 5 milhões', cover: 'img/goleman-cover.jpg', color: '#c0392b',
    file: 'livro.html#inteligencia-emocional', topic: 'comportamento',
    summary: 'Em "Inteligência Emocional", o psicólogo Daniel Goleman popularizou a ideia de que o QI importa menos para o sucesso na vida do que a capacidade de manejar emoções — a própria e a alheia. A tese central: o cérebro tem dois centros de decisão, e o emocional (amígdala) pode sequestrar a razão num instante de raiva ou pânico — o "seqüestro da amígdala". Quem desenvolve autoconsciência, autorregulação, motivação, empatia e habilidade social navega melhor relações, trabalho e saúde. Goleman apoiou-se em pesquisas de neurociência e mostrou que essas competências se aprendem, não são traço fixo. O gancho é libertador: não somos reféns do impulso; treinar a pausa entre estímulo e resposta muda resultados. Leitura fundadora para quem quer entender por que pessoas inteligentes sabotam a si mesmas — e como parar.',
    myths: [
      M('truth', 'QI não é tudo', 'Nota alta prevê pouco o sucesso; emoção maneja o resto.', 'Você já viu gente brilhante se sabota? Por quê?'),
      M('myth', 'Razão manda sempre', 'A amígdala sequestra a decisão em segundos de emoção forte.', 'Você agiu por impulso e se arrependeu depois?'),
      M('truth', 'Emoção se aprende', 'As cinco competências de EQ treinam; não são dom fixo.', 'Você acha que é "pessoa nervosa" para sempre?'),
      M('myth', 'Sentir é fraqueza', 'Reconhecer a emoção é força; negá-la é que destrói o controle.', 'Você esconde o que sente achando que é fraqueza?'),
      M('truth', 'A pausa salva', 'O intervalo entre estímulo e resposta é onde a escolha acontece.', 'Você reage na hora ou respira antes de falar?'),
      M('myth', 'Empatia é frufru', 'Ler o outro reduz conflito e abre portas; é habilidade útil.', 'Você escuta para entender ou para responder?'),
      M('truth', 'Autorregulação protege', 'Conter o impulso evita erros que a inteligência sozinha não evita.', 'Sua falta de freio já custou caro?'),
      M('myth', 'Sucesso é só esforço', 'Esforço sem consciência emocional descarrilha sob pressão.', 'Você ralou e mesmo assim se sabota?'),
      M('truth', 'Estresse embaça', 'Sob cortisol, a razão cai; acalmar antes de decidir melhora tudo.', 'Você decide bravo e se arrepende?'),
      M('myth', 'Criança não treina', 'EQ se forma cedo, mas adulto ainda aprende com prática.', 'Você acha que já é tarde para mudar?'),
      M('truth', 'Vínculo depende de EQ', 'Relações saudáveis exigem empatia e regulação, não só afeto.', 'Seus relacionamentos sofrem por falta de escuta?'),
      M('myth', 'Líder só competência', 'Time segue quem acalma e entende, não quem só manda.', 'Você obedece a quem entende ou só a quem manda?'),
      M('truth', 'Saúde liga emoção', 'Crônico de raiva e ansiedade fere o corpo tanto quanto vício.', 'Sua emoção mal curada adoece você?'),
      M('myth', 'Mudar é impossível', 'Goleman mostra que treino diário reconstrói o padrão emocional.', 'Você desistiu de mudar achando que é assim?')
    ],
    sections: ['sobre', 'ensinamentos', 'ideias', 'verdadesmitos', 'reflexoes'],
    ensinamentos: [
      E('1', 'Nomeie a emoção', 'Identificar o que sente devolve o leme à razão antes do estrago.'),
      E('2', 'Pare antes de agir', 'A pausa de um segundo quebra o sequestro da amígdala.'),
      E('3', 'Treine empatia', 'Ler o outro como ele se sente reduz atrito e abre diálogo.'),
      E('4', 'Regule o impulso', 'Conter a reação evita erros que inteligência não impede.'),
      E('5', 'Mantenha motivo', 'Propósito sustenta esforço quando o ânimo falta.'),
      E('6', 'Acalme o estresse', 'Respirar antes de decidir protege a qualidade da escolha.'),
      E('7', 'Escute para entender', 'Ouvir sem preparar resposta melhora relações e negócios.'),
      E('8', 'Aprenda cedo, melhore tarde', 'EQ se forma na infância, mas adulto ainda treina.'),
      E('9', 'Use em liderança', 'Time segue quem acalma e entende, não só quem ordena.'),
      E('10', 'Cuide do corpo', 'Sono e movimento estabilizam o emocional base.'),
      E('11', 'Pratique todo dia', 'Pequenos atos de consciência reconstroem o padrão emocional.')
    ],
    citacoes: [
      C('Num momento de paixão, as pessoas inteligentes fazem coisas estúpidas; a emoção sequestra a razão.', 'Daniel Goleman', 'Inteligência Emocional'),
      C('Entre o estímulo e a resposta há um espaço; nesse espaço está nossa liberdade de escolher.', 'Daniel Goleman', 'Inteligência Emocional'),
      C('O que conta no sucesso raramente é o QI; é a inteligência emocional que decide.', 'Daniel Goleman', 'Inteligência Emocional'),
      C('Quem não gerencia suas emoções destrói a si mesmo mais do que qualquer inimigo externo.', 'Daniel Goleman', 'Inteligência Emocional'),
      C('A empatia não é luxo social; é a habilidade que faz relações e equipes funcionarem.', 'Daniel Goleman', 'Inteligência Emocional')
    ],
    citacoesTerceiros: [
      CT('O livro que tirou o QI do pedestal; mudou como empresas e escolas pensam gente.', 'Leitor', 'Goodreads'),
      CT('Goleman tornou a ciência das emoções legível para qualquer um.', 'Leitor', 'Amazon'),
      CT('Clássico obrigatório de comportamento; o "seqüestro da amígdala" virou lugar-comum.', 'Crítico', 'Skoob')
    ],
    chapters: [
      CH('Capítulo 1 — O QI e o destino', 'Nota alta prevê pouco; o resto é emoção bem conduzida.', 'Além do QI', 'Sucesso estranho'),
      CH('Capítulo 2 — O cérebro emocional', 'Amígdala e córtex: o centro que sequestra a razão em segundos.', 'Dois centros', 'Razão sitiada'),
      CH('Capítulo 3 — O seqüestro', 'Raiva ou pânico tomam a decisão antes do pensar.', 'Amígdala na frente', 'Impulso manda'),
      CH('Capítulo 4 — Conheça a si', 'Autoconsciência é a base das outras quatro competências.', 'Ver a emoção', 'Nomear ajuda'),
      CH('Capítulo 5 — Segurar o impulso', 'Autorregulação evita erros que inteligência sozinha não evita.', 'Freio útil', 'Pausa salva'),
      CH('Capítulo 6 — Ler o outro', 'Empatia reduz atrito e abre portas em relação e trabalho.', 'Sentir o outro', 'Escuta útil'),
      CH('Capítulo 7 — Habilidade social', 'Influenciar e lidar com gente é competência treinável.', 'Conviver bem', 'Time segue'),
      CH('Capítulo 8 — Treinar a EQ', 'Adulto aprende com prática diária; não é traço fixo.', 'Mudar dá', 'Prática reconstrói')
    ]
  }
];

// --- append em books.js ---
const s = fs.readFileSync(BOOKS, 'utf8');
const json = NOVOS.map(b => '  ' + JSON.stringify(b, null, 2).replace(/\n/g, '\n  ')).join(',\n');
const idx = s.lastIndexOf('\n];');
if (idx < 0) { console.error('Nao achou terminador ]; em books.js'); process.exit(1); }
const before = s.slice(0, idx);
const novo = before.replace(/}\s*$/, '},\n') + json + '\n];\n';
fs.writeFileSync(BOOKS, novo, 'utf8');
console.log('Lote 14: ' + NOVOS.length + ' livros ricos adicionados. Total deve subir para ' + (115 + NOVOS.length));
