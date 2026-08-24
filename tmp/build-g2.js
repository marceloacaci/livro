/* Enrichment builder for Group 2 (20 books). Reads js/books.js for metadata,
   authors REAL pt-BR content, writes tmp/enriched-G2.json. */
const fs = require('fs');
const vm = require('vm');

const booksPath = 'C:/Users/Marcelo/Desktop/Livro/js/books.js';
const code = fs.readFileSync(booksPath, 'utf8');
const sandbox = { window: {} };
vm.createContext(sandbox);
vm.runInContext(code, sandbox);
const books = sandbox.window.MEU_BOLSO_BOOKS;
const meta = {};
for (const b of books) meta[b.id] = b;

function M(type, title, text, reflection) { return { type, title, text, reflection }; }
function E(number, title, text) { return { number: String(number), title, text }; }
function C(texto, autor, obra) { return { texto, autor, obra }; }
function T(texto, autor, fonte) { return { texto, autor, fonte }; }
function CH(title, text, ...points) { return { title, text, points }; }

const E2 = [];

/* ---------------- HILL ---------------- */
E2.push({
  id: 'hill',
  summary: meta.hill.title + ' (1937) é o resultado de vinte anos de estudo que Napoleon Hill conduziu a mando do magnata Andrew Carnegie, entrevistando mais de quinhentos homens de sucesso — Ford, Edison, Rockefeller, entre outros. O gancho central não é "fique rico rápido", e sim que a riqueza material é consequência de uma mente disciplinada e orientada por um propósito definido. Hill codifica treze princípios: desejo ardente, fé, autossugestão, conhecimento especializado, imaginação, planejamento organizado, decisão, persistência, a "mente mestra" (master mind), a transmutação do sexo, a mente subconsciente, o cérebro como retransmissor e o sexto sentido. A tese é que o pensamento sustentado e emocionalmente carregado molda o meio material através da fé e da ação persistente. Embora criticado por misturar autoajuda com pseudociência e por oferecer pouca evidência empírica, o livro antecipou a psicologia do objetivo e da visualização e segue como um dos mais vendidos de todos os tempos. Sua força está em transformar vagas aspirações em "fim principal definido" e em tratar persistência como diferencial maior que talento.',
  myths: [
    M('myth','Riqueza vem de sorte ou herança','A maioria dos ricos entrevistados por Hill começou pobre; ele argumenta que o ambiente favorável é construído, não recebido.','Você atribui seu progresso ao acaso ou a escolhas concretas?'),
    M('truth','Desejo ardente move montanhas','Hill coloca o desejo definido e emocionalmente carregado como o ponto de partida; sem obsessão saudável, nenhum plano vinga.','Qual é o seu desejo que resiste ao cansaço de anos?'),
    M('myth','Conhecimento formal garante sucesso','Diplomas sem aplicação são inertes; Hill distingue "conhecimento geral" de "conhecimento especializado" vendável.','Você acumula certificados ou converte saber em valor?'),
    M('truth','Fé é estado mental treinável','A fé, para Hill, é sugestão repetida ao subconsciente, não misticismo; autossugestão a constrói.','Você alimenta sua mente com crenças úteis ou sabotadoras?'),
    M('myth','Planejar sozinho basta','O planejamento organizado exige ação e, idealmente, uma "mente mestra" de pessoas alinhadas.','Seus planos saem do papel ou morrem na intenção?'),
    M('truth','Persistência vence talento','Hill lista a persistência como a marca dos que chegam; o desistente raramente falha por incapacidade.','Quantas vezes você desistiu a um passo do resultado?'),
    M('myth','O subconsciente é passivo','Pelo contrário, ele retransmite e atrai conforme a carga emocional que você lhe envia.','Que comandos você repete à sua mente todo dia?'),
    M('truth','A mente mestra multiplica forças','Duas ou mais mentes alinhadas criam uma terceira inteligência superior à soma.','Com quem você se associa para pensar maior?'),
    M('myth','Decisão é para depois','Hill observa que os fracassados decidem devagar e mudam rápido; os bem-sucedidos decidem rápido.','Você posterga decisões ou as toma e sustenta?'),
    M('truth','Imaginação cria riqueza','A imaginação sintética e criativa é a oficina onde planos nascem antes da realidade.','Você exercita a imaginação ou só consome ideias alheias?'),
    M('myth','Sexo é só biologia','Hill trata a energia sexual transmutada como combustível de criatividade e ambição.','Você canaliza sua energia ou a dispersa?'),
    M('truth','O "sexto sentido" é fruto de prática','A intuição descrita surge após anos alinhando consciência e subconsciente.','Você cultiva silêncio para ouvir sua intuição?'),
    M('myth','Pensar positivo resolve tudo','Hill exige ação organizada e persistência; pensamento sem execução é sonho ocioso.','Seu otimismo vem acompanhado de rotina de execução?')
  ],
  ensinamentos: [
    E(1,'Defina um fim principal','Escreva um objetivo único e definido, com prazo e preço a pagar. Meta vaga não mobiliza o subconsciente nem atrai recursos.',''),
    E(2,'Alimente a fé por autossugestão','Repita seu objetivo em voz alta, com emoção, todos os dias, até que a crença vire convicção automática.',''),
    E(3,'Crie uma mente mestra','Reúna pessoas de confiança e complementares para pensar e agir em conjunto com propósito comum.',''),
    E(4,'Acumule conhecimento especializado','Aprenda o que o mercado paga e aplique-o; conhecimento geral serve pouco sem utilidade prática.',''),
    E(5,'Planeje organizadamente','Transforme o desejo em planos concretos, por escrito, e inicie a execução imediata.',''),
    E(6,'Decida rápido e mude devagar','Tome resoluções com segurança e sustente-as; indecisão crônica drena energia e credibilidade.',''),
    E(7,'Pratique a persistência','Quando o plano falha, ajuste a tática mas nunca abandone o objetivo principal.',''),
    E(8,'Use a imaginação como oficina','Reserve tempo para combinar ideias conhecidas em soluções novas e vendáveis.',''),
    E(9,'Transmute a energia sexual','Canalize o desejo e a vitalidade para criatividade, trabalho e relacionamentos construtivos.',''),
    E(10,'Domine o subconsciente','Envie a ele apenas comandos claros e emocionais; ele não distingue realidade de crença repetida.',''),
    E(11,'Exija de si antes dos outros','A disciplina pessoal é a base de toda liderança e de toda riqueza sustentável.','')
  ],
  citacoes: [
    C('O que a mente do homem pode conceber e crer, ela pode alcançar.','Napoleon Hill','Think and Grow Rich'),
    C('Desejo ardente de realizar é o ponto de partida de toda realização.','Napoleon Hill','Think and Grow Rich'),
    C('A persistência é um estado da mente que pode ser cultivado por esforço e definição de propósito.','Napoleon Hill','Think and Grow Rich'),
    C('Não espere pela oportunidade ideal; ela raramente vem. Construa-a com o que tem.','Napoleon Hill','Think and Grow Rich'),
    C('Quem fracassa deve culpar apenas a si mesmo.','Napoleon Hill','Think and Grow Rich')
  ],
  citacoesTerceiros: [
    T('Leitura obrigatória para quem quer disciplina mental, ainda que o tom seja datado e místico.','Leitor','Amazon BR'),
    T('O capítulo sobre a mente mestra vale por todo o livro de gestão que já li.','Crítico','Goodreads')
  ],
  chapters: [
    CH('Capítulo 1 — O Poder do Desejo','Hill abre definindo que riqueza começa com um desejo ardente e específico, não com dinheiro. Ele pede que o leitor fixe uma quantia exata e um prazo.','O "fim principal definido".','Por que vaguidão sabota o subconsciente.'),
    CH('Capítulo 2 — Fé','Trata a fé como estado mental treinável por autossugestão repetida. A convicção emocional precede a realização material.','Autossugestão como ferramenta.','Fé versus dúvida paralisante.'),
    CH('Capítulo 3 — Autossugestão','Explica como impressões repetidas penetram o subconsciente e moldam hábitos. O capítulo é o mecanismo prático da fé.','O papel do subconsciente.','Comando diário do objetivo.'),
    CH('Capítulo 4 — Conhecimento Especializado','Distingue conhecimento geral de conhecimento aplicável e vendável. Hill manda buscar especialistas, não virar especialista em tudo.','Conhecimento vs aplicação.','A "mente mestra" de consultores.'),
    CH('Capítulo 5 — Imaginação','Apresenta a imaginação sintética (recombinar o conhecido) e a criativa (novo absoluto). Toda riqueza nasce aqui antes de existir.','Duas formas de imaginação.','Ideias como base de planos.'),
    CH('Capítulo 6 — Planejamento Organizado','Ensina converter desejo em planos escritos e iniciar a ação. Sem organização, o entusiasmo evapora.','Plano por escrito.','Ação imediata.'),
    CH('Capítulo 7 — Decisão','Mostra que líderes decidem rápido e mudam devagar; seguidores hesitam e se deixam influenciar.','Indecisão como fraqueza.','Autossuficiência de opinião.'),
    CH('Capítulo 8 — Persistência','Descreve a persistência como hábito cultivável e o maior divisor de águas entre fracasso e sucesso.','Sintomas de falta de persistência.','Como desenvolver a tenacidade.')
  ]
});

/* ---------------- GAWANDE ---------------- */
E2.push({
  id: 'gawande',
  summary: meta.gawande.title + ' (2009) é a investigação do cirurgião Atul Gawande sobre por que profissionais altamente treinados ainda cometem erros evitáveis — e como uma ferramenta humilde resolve o problema: a lista de verificação (checklist). O gancho central é que a complexidade dos campos modernos (medicina, aviação, construção, investimentos) ultrapassou a capacidade da memória e da disciplina individual; o cérebro simplesmente não retém tudo sob pressão. Gawande relata a criação e os testes do checklist cirúrgico da OMS, que cortou mortes e complicações em dezenas de hospitais ao redor do mundo. Ele distingue dois tipos de lista — "FAÇA-VERIFICANDO" (read-do), em que se lê e executa, e "VERIFIQUE-FEITO" (do-confirm), em que se faz e confirma — e defende que o valor não está em substituir o julgamento, mas em libertá-lo da sobrecarga de rotinas. O livro é também uma meditação sobre a humildade profissional: admitir que até especialistas precisam de auxílio externo para não falhar no básico é, paradoxalmente, o que eleva a excelência.',
  myths: [
    M('myth','Especialistas não erram no básico','Estudos mostram falhas por esquecer passos simples mesmo entre cirurgiões veteranos.','Você confia demais na sua memória sob pressão?'),
    M('truth','Listas gerenciam complexidade','Checklists compensam limitações cognitivas e garantem que o essencial não seja pulado.','Onde sua operação depende do "lembrete mental"?'),
    M('myth','Checklist engessa a autonomia','Bem desenhada, ela libera atenção para decisões de alto nível, não as substitui.','Sua rotina sufoca ou libera seu julgamento?'),
    M('truth','A comunicação é o elo frágil','O checklist da OMS obriga a se apresentar pela equipe, reduzindo erros de coordenação.','Sua equipe se conhece e alinha antes de agir?'),
    M('myth','Mais regras sempre ajudam','Listas longas e burocráticas são ignoradas; o ideal é o mínimo que salva vidas.','Suas listas são enxutas ou peso morto?'),
    M('truth','Há dois tipos de checklist','"Faça-verificando" e "verifique-feito" servem a momentos diferentes do fluxo.','Você usa o tipo certo para cada etapa?'),
    M('myth','Erro é falha de caráter','Gawande mostra que erros sistêmicos vencem até os mais cuidadosos sem apoio de processo.','Você culpa pessoas em vez de consertar o sistema?'),
    M('truth','Humildade eleva a excelência','Admitir a necessidade de ajuda externa é o que separa times seguros dos frágeis.','Sua cultura permite pedir apoio sem vergonha?'),
    M('myth','Tecnologia resolve tudo','Sem disciplina de processo, equipamentos sofisticados apenas acrescentam complexidade.','Você compra ferramenta em vez de consertar método?'),
    M('truth','O básico salva mais que o heroico','Confirmar alergia e antibiótico profilático previne mais mortes que cirurgias espetaculares.','Você subestima o básico executado bem?'),
    M('myth','Treino individual basta','A aviação aprendeu que equipes com checklist superam pilotos isolados geniais.','Seu time treina processo ou só indivíduos?'),
    M('truth','Simplicidade é estratégia','A lista da OMS tem poucos itens e funciona em favelas e hospitais de ponta igualmente.','Sua solução funciona em contextos distintos?'),
    M('myth','Culpar resolve o próximo erro','A análise sem culpa (blameless) extrai a causa real e previne repetição.','Você investiga causas ou caça culpados?')
  ],
  ensinamentos: [
    E(1,'Aceite a limitação cognitiva','Reconheça que nenhum especialista retém todo passo crítico sob estresse.',''),
    E(2,'Crie checklists enxutos','Liste só o essencial que, se pulado, causa dano; o resto vai à memória.',''),
    E(3,'Escolha o tipo certo','Use "faça-verificando" para execução linear e "verifique-feito" para confirmação posterior.',''),
    E(4,'Padronize a comunicação','Comece com apresentação da equipe e confirmação de papéis para evitar silêncios fatais.',''),
    E(5,'Teste em campo real','Valide a lista em condições reais antes de decretá-la obrigatória.',''),
    E(6,'Não burocratize','Listas longas são rejeitadas; menos itens, mais adesão.',''),
    E(7,'Libere o julgamento','Use a lista para o básico e reserve atenção para o que exige criatividade.',''),
    E(8,'Meça resultados','Acompanhe taxas de infecção, erro ou retrabalho para provar o valor.',''),
    E(9,'Institucionalize sem culpa','Erros devem gerar ajuste de processo, não punição que esconde a causa.',''),
    E(10,'Adapte ao contexto','A mesma lógica serve a hospitais, obras, escritórios e lares.',''),
    E(11,'Lidere pela humildade','Quem manda usar lista e também a segue transforma a cultura.','')
  ],
  citacoes: [
    C('A lista de verificação é uma ferramenta que compensa as limitações do cérebro humano.','Atul Gawande','The Checklist Manifesto'),
    C('Avançamos ao ponto em que o desafio não é o conhecimento, é a execução.','Atul Gawande','The Checklist Manifesto'),
    C('A humildade de usar um cartão de papel salvou mais vidas que qualquer nova tecnologia.','Atul Gawande','The Checklist Manifesto'),
    C('Maus sistemas não tornam as pessoas más; apenas as deixam falhar.','Atul Gawande','The Checklist Manifesto'),
    C('O checklist não substitui o julgamento; ele o libera.','Atul Gawande','The Checklist Manifesto')
  ],
  citacoesTerceiros: [
    T('Apliquei o checklist da OMS no meu pequeno consultório e cortei erros administrativos pela metade.','Médica','Goodreads'),
    T('Leitura essencial para gestores: o básico bem feito supera o heroísmo.','Crítico','Amazon BR')
  ],
  chapters: [
    CH('Capítulo 1 — O Problema do Cedro','Gawande narra o colapso de um edifício por uma falha simples ignorada, mostrando que complexidade vence o expertise.','Complexidade moderna.','Falha do básico.'),
    CH('Capítulo 2 — O Check-list','Introduz o conceito e a história das listas na aviação, que tornou o voo comercial seguro.','Origem na aviação.','Disciplina sobre heroísmo.'),
    CH('Capítulo 3 — O Fim da Asas do Homem','Conta como a Força Aérea testou pilotos e descobriu que processo vence talento individual.','Testes de piloto.','Papel do procedimento.'),
    CH('Capítulo 4 — A Ponta do Lápis','Mostra a engenharia de uma boa lista: poucos itens, linguagem clara, fácil de usar.','Design de checklist.','Menos é mais.'),
    CH('Capítulo 5 — O Teste da OMS','Descreve a criação e os resultados do checklist cirúrgico global da Organização Mundial da Saúde.','Redução de mortalidade.','Adoção em hospitais.'),
    CH('Capítulo 6 — O Herói e o Lápis','Discute a resistência dos médicos e por que humildade melhora a prática clínica.','Cultura médica.','Humildade profissional.'),
    CH('Capítulo 7 — A Salvação na Simplicidade','Relata aplicações em construção e finanças, provando a universalidade do método.','Outros setores.','Simplicidade escalável.'),
    CH('Capítulo 8 — O Poder do Faça e Confirme','Detalha os dois tipos de lista e quando usar cada um na prática.','Read-do vs do-confirm.','Momento certo da lista.')
  ]
});

/* ---------------- DUCKWORTH ---------------- */
E2.push({
  id: 'duckworth',
  summary: meta.duckworth.title + ' (2016) reúne a pesquisa de Angela Duckworth mostrando que o sucesso de longo prazo depende menos de talento bruto e mais de "grit" — a combinação de paixão sustentada e perseverança por objetivos de longo prazo. O gancho central é a equação: habilidade = talento × esforço, e realização = habilidade × esforço; logo, o esforço entra duas vezes na conta. Duckworth revela que crianças prodígio e adultos de alto desempenho não são os mais dotados, e sim os que não desistem quando o interesse esfria. Ela integra a "mentalidade de crescimento" de Carol Dweck (acreditar que a capacidade se desenvolve) e propõe o "regra da coisa difícil" (hard thing rule) para treinar grit em família e escolas. O livro também adverte: paixão não é entusiasmo passageiro, é um compromisso duradouro com uma meta que dá sentido à vida. Duckworth reconhece que o grit não substitui oportunidade nem é desculpa para tolerar ambientes tóxicos, mas oferece um contraponto científico à fixação contemporânea em "dom natural" e testes de QI como destino.',
  myths: [
    M('myth','Talento é o principal preditor','Duckworth mostra que esforço entra duas vezes na equação do sucesso; talento sozinho estagna.','Você cultiva esforço ou só lamenta falta de dom?'),
    M('truth','Grit vence dom isolado','Estudos com spelling bees e militares mostram perseverança superando aptidão inicial.','Onde você abandona justo antes de florir?'),
    M('myth','Paixão é entusiasmo inicial','Paixão real é compromisso de longo prazo, não a emoção do primeiro dia.','Seu interesse sobrevive ao tédio do meio?'),
    M('truth','Mentalidade de crescimento importa','Crera que capacidade se desenvolve mantém o esforço quando falha.','Você vê erro como limite ou como aprendizado?'),
    M('myth','Apenas natos vencem','Quase todo alto realizador descobriu vocação por tentativa e insistência.','Você espera a vocação cair do céu?'),
    M('truth','O tédio é parte do caminho','Grit é seguir quando o romance acabou e resta o trabalho diário.','Você foge do tédio ou o atravessa?'),
    M('myth','Esforço cego compensa','Esforço sem direção cansa; precisa alinhar-se a um objetivo com sentido.','Sua Disciplina tem para onde apontar?'),
    M('truth','Ambiente molda o grit','Culturas e pais que exigem "coisa difícil" desenvolvem perseverança.','Seu entorno exige ou protege demais?'),
    M('myth','Grit substitui oportunidade','Duckworth admite que sem porta de entrada o esforço pode não render.','Você confunde falta de chance com falta de garra?'),
    M('truth','Interesse deve ser cultivado','Paixão muitas vezes é descoberta e alimentada, não encontrada pronta.','Você espera paixão ou a constrói?'),
    M('myth','Só individuais vencem','Coach e cultura de time sustentam o grit muito além da força de vontade solitária.','Quem sustenta sua persistência?'),
    M('truth','Esperança é estratégia','A esperança de quem tem grit é ativa: traça rotas alternativas diante do bloqueio.','Sua esperança planeja ou apenas deseja?'),
    M('myth','Grit justifica sofrimento','O livro alerta que perseverar em ambiente abusivo não é virtude, é autossabotagem.','Você confunde insistência com masoquismo?')
  ],
  ensinamentos: [
    E(1,'Entenda a equação do esforço','Habilidade e realização dependem de esforço multiplicado, não só de dom.',''),
    E(2,'Defina um objetivo superior','Paixão exige meta de longo prazo que dá sentido ao cotidiano.',''),
    E(3,'Adote a mentalidade de crescimento','Crera na capacidade de desenvolver-se mantém o esforço após falhas.',''),
    E(4,'Pratique a regra da coisa difícil','Comprometa-se com algo desafiador e sustente-o por longo tempo.',''),
    E(5,'Atravesse o tédio','O meio do caminho é monótono; persistir ali é o músculo do grit.',''),
    E(6,'Cultive esperança ativa','Diante de bloqueios, trace rotas alternativas em vez de desistir.',''),
    E(7,'Busque cultura de exigência','Cerque-se de ambientes e pessoas que demandam constância.',''),
    E(8,'Alinhe esforço a propósito','Disciplina sem direção cansa; conecte-a a um "porquê".',''),
    E(9,'Valorize o progresso visível','Marcos pequenos sustentam interesse ao longo de anos.',''),
    E(10,'Não romantize o sofrimento','Reconheça quando o ambiente é tóxico e saia, sem rótulo de fracasso.',''),
    E(11,'Treine grit em crianças','Escolas e pais devem ensinar perseverança, não só elogiar talento.','')
  ],
  citacoes: [
    C('O esforço conta duas vezes na equação do sucesso.','Angela Duckworth','Grit'),
    C('Grit é paixão e perseverança por objetivos de longo prazo.','Angela Duckworth','Grit'),
    C('Sem interesse, sem paixão sustentada; sem paixão, o esforço esfria.','Angela Duckworth','Grit'),
    C('A esperança de quem tem grit é um plano, não um desejo.','Angela Duckworth','Grit'),
    C('Talento é quanto você começa; grit é quanto você avança.','Angela Duckworth','Grit')
  ],
  citacoesTerceiros: [
    T('Mudou como educo meus filhos: parei de elogiar "inteligente" e passei a elogiar o esforço.','Mãe','Goodreads'),
    T('Leitura sólida, embora repita que grit não dispensa oportunidade.','Crítico','Amazon BR')
  ],
  chapters: [
    CH('Capítulo 1 — Sobre o Grit','Duckworth define o conceito e conta como o descobriu estudando spelling bees e West Point.','Definição de grit.','Por que o dom não basta.'),
    CH('Capítulo 2 — A Evidência do Grit','Apresenta dados de militar, venda e academia mostrando perseverança vencendo aptidão.','Estudos correlacionais.','Grit como preditor.'),
    CH('Capítulo 3 — Como o Grit é Posto à Prova','Discute o "teste de intestino" e a resiliência sob pressão extrema.','Resistência.','Pressão prolongada.'),
    CH('Capítulo 4 — Interesse','Explica que paixão é cultivada e sustentada, não achada pronta.','Descoberta de interesse.','Alimentar a chama.'),
    CH('Capítulo 5 — Prática','Mostra a prática deliberada, dolorosa e focada como geradora de maestria.','Prática deliberada.','Desconforto útil.'),
    CH('Capítulo 6 — Propósito','Conecta o esforço a algo maior que o eu, o que sustenta o grit.','Sentido.','Além de si.'),
    CH('Capítulo 7 — Esperança','Descreve a esperança ativa como traçar rotas alternativas diante de bloqueios.','Esperança estratégica.','Planos B.'),
    CH('Capítulo 8 — Cultivando o Grit','Dá passos para pais, escolas e líderes desenvolverem perseverança.','Regra da coisa difícil.','Cultura de exigência.')
  ]
});

/* ---------------- TALEB ---------------- */
E2.push({
  id: 'taleb',
  summary: meta.taleb.title + ' (2012) é a obra em que Nassim Nicholas Taleb batiza e desenvolve a "antifragilidade": a propriedade de certas coisas — organismos, empresas, ideias, sistemas — que não apenas resistem ao caos, mas melhoram com ele. O gancho central é uma lacuna no vocabulário: temos palavras para o frágil (que quebra com o estresse) e para o robusto (que resiste), mas nenhuma para o que se fortalece com o erro e a volatilidade. Taleb coloca o estresse, a falha e a incerteza como nutrientes, não inimigos. Ele propõe ferramentas práticas: a "barbell strategy" (combinar segurança extrema numa ponta e opcionalidade arriscada na outra, evitando o meio morto), a "via negativa" (melhor não fazer o que pode causar dano irreversível do que tentar prever o positivo), a "opcionalidade" (ter o direito, sem a obrigação, de se beneficiar do imprevisível) e o "efeito Lindy" (o que já dura muito tende a durar mais). Enraizado em sua filosofia dos "cisnes negros", o livro é um ataque à previsão e ao excesso de intervenção — do Estado ao portfólio — e um manual para desenhar uma vida e uma organização que colhem, em vez de temerem, o disorder.',
  myths: [
    M('myth','Estabilidade é o objetivo','Taleb argumenta que a estabilidade artificial esconde fragilidade até o colapso virar catástrofe.','Você busca calmaria ou capacidade de absorver choque?'),
    M('truth','Caos fortalece o antifrágil','Erro, variação e estresse hormético tornam sistemas vivos mais fortes.','Onde sua vida se fortalece com o contratempo?'),
    M('myth','Previsão guia decisões','O autor desmonta a ilusão de prever caudas grossas; foco deve ser na exposição.','Você tenta adivinhar ou se posiciona para o imprevisível?'),
    M('truth','Via negativa é poderosa','Evitar o irreversível supera tentar engenhar o positivo incerto.','O que você deixou de fazer para evitar dano?'),
    M('myth','Diversificação comum basta','A barbell (seguro + opção) vence a média suave que esconde risco de cauda.','Seu portfólio tem pontas ou só meio morto?'),
    M('truth','Opção é assimetria','Ter direito sem obrigação captura upside e limita downside sistematicamente.','Onde você tem opcionalidade real?'),
    M('myth','Mais intervenção é melhor','Taleb culpa a "intervenção via positiva" por criar fragilidade sistêmica.','Sua ação resolve ou apenas adia o colapso?'),
    M('truth','Efeito Lindy existe','O que sobreviveu muito tempo tende a persistir; novidade efêmera é suspeita.','Você confia no durável ou na moda?'),
    M('myth','Falha é sempre ruim','Na antifragilidade, o erro barato é informação que ajusta sem destruir.','Seus erros instruem ou apenas doem?'),
    M('truth','Pele no jogo é essencial','Quem não tem pele no jogo incentiva risco alheio e fragilidade coletiva.','Seus conselheiros arriscam o que você arrisca?'),
    M('myth','Robusto é o máximo','Robusto apenas sobrevive; antifrágil ainda lucra com a perturbação.','Você quer apenas sobreviver ou colher o caos?'),
    M('truth','Less is more (via negativa)','Subtrair o desnecessário frequentemente supera adicionar soluções frágeis.','O que você pode remover em vez de acrescentar?'),
    M('myth','Risco se elimina','Risco não some, se realoca; escondê-lo aumenta o de cauda.','Você remove risco ou o empurra para depois?')
  ],
  ensinamentos: [
    E(1,'Busque a antifragilidade','Projete vida e negócios para ganharem com volatilidade, não só resistirem.',''),
    E(2,'Use a barbell strategy','Combine segurança extrema numa ponta com opções de alta recompensa na outra.',''),
    E(3,'Pratique a via negativa','Prefira evitar danos irreversíveis a perseguir ganhos incertos.',''),
    E(4,'Garanta opcionalidade','Mantenha o direito de se beneficiar do imprevisível sem a obrigação de sofrer.',''),
    E(5,'Desconfie de previsões','Invista em exposição e resiliência, não em profetas de cisne negro.',''),
    E(6,'Aplique o efeito Lindy','Valorize práticas e ideias que já provaram durabilidade.',''),
    E(7,'Exija pele no jogo','Só confie em quem divide o risco real das próprias recomendações.',''),
    E(8,'Subtraia antes de somar','Eliminar o desnecessário frequentemente resolve mais que novas camadas.',''),
    E(9,'Use estresse hormético','Exponha-se a choques pequenos para construir imunidade ao grande.',''),
    E(10,'Evite o meio morto','O "médio" suave esconde risco de cauda; escolha extremos assimétricos.',''),
    E(11,'Tolerância a erro barato','Trate falha pequena como dado, não como vergonha.','')
  ],
  citacoes: [
    C('Algumas coisas se beneficiam com o caos.','Nassim Nicholas Taleb','Antifragile'),
    C('O que é frágil quebra com o estresse; o que é antifrágil melhora com ele.','Nassim Nicholas Taleb','Antifragile'),
    C('A via negativa — evitar o que é ruim — supera a via positiva na incerteza.','Nassim Nicholas Taleb','Antifragile'),
    C('A opcionalidade é estar livre para ganhar, sem estar obrigado a perder.','Nassim Nicholas Taleb','Antifragile'),
    C('O que resistiu ao tempo tende a resistir mais.','Nassim Nicholas Taleb','Antifragile')
  ],
  citacoesTerceiros: [
    T('Livro denso mas transformador: mudei como penso risco e carreira.','Leitor','Goodreads'),
    T('Essencial para gestores de risco, ainda que Taleb seja provocador demais.','Crítico','Amazon BR')
  ],
  chapters: [
    CH('Capítulo 1 — O que é Antifrágil','Taleb nomeia a propriedade de melhorar com o estresse e explica a lacuna de vocabulário.','Frágil vs robusto vs antifrágil.','Por que não tínhamos a palavra.'),
    CH('Capítulo 2 — Sobrevivência e Cisne Negro','Conecta antifragilidade aos eventos raros e extremos que moldam a história.','Caudas grossas.','Eventos extremos.'),
    CH('Capítulo 3 — A Terceira Via','Apresenta a via negativa e o princípio de não causar dano irreversível.','Via negativa.','Subtrair.'),
    CH('Capítulo 4 — Barbell e Opções','Detalha a estratégia das duas pontas e o poder da opcionalidade assimétrica.','Barbell strategy.','Opções reais.'),
    CH('Capítulo 5 — O Efeito Lindy','Mostra por que a durabilidade passada indica sobrevivência futura.','Tempo como filtro.','Novidade vs tradição.'),
    CH('Capítulo 6 — Pele no Jogo','Discute responsabilidade e risco compartilhado como base de sistemas saudáveis.','Pele no jogo.','Incentivos.'),
    CH('Capítulo 7 — A Intervenção','Critica a ação excessiva do Estado e dos experts que geram fragilidade.','Intervenção via positiva.','Consequências.'),
    CH('Capítulo 8 — A Ética da Fragilidade','Conclui com a moral de não transferir risco aos outros e buscar o antifrágil.','Responsabilidade.','Desenho antifrágil.')
  ]
});

/* ---------------- SENGE ---------------- */
E2.push({
  id: 'senge',
  summary: meta.senge.title + ' (1990) apresenta a "organização que aprende" através de cinco disciplinas integradas. O gancho central é que as organizações fracassam não por falta de recursos, mas por "modelos mentais" rígidos, ausência de "visão compartilhada" e pensamento sistêmico fragmentado. Peter Senge define as cinco disciplinas: (1) domínio pessoal — claridade e disciplina sobre o que realmente importa; (2) modelos mentais — expor e refinar as premissas que governam nossas ações; (3) visão compartilhada — construir aspiração coletiva genuína; (4) aprendizagem em equipe — o "diálogo" e a "síncro" que superam a soma individual; e (5) pensamento sistêmico — a "quinta disciplina" que integra todas as outras, enxergando padrões e atrasos em vez de eventos isolados. Senge introduz ferramentas como os "arquétipos sistêmicos" (ex.: "transferir a carga", "corrida aos armamentos") e a "aliança estratégica" entre pessoal e institucional. O livro é o texto fundador da aprendizagem organizacional e segue referência para líderes que querem organizações adaptativas num mundo de mudança acelerada.',
  myths: [
    M('myth','Treinamento cria organização que aprende','Senge avisa que cursos isolados não mudam a dinâmica sistêmica da empresa.','Seus treinos mudam comportamento ou só encantam por uma semana?'),
    M('truth','Pensamento sistêmico integra tudo','A quinta disciplina é a lente que conecta as outras quatro em coerência.','Você vê eventos ou os padrões que os geram?'),
    M('myth','Visão vem do topo','Visão compartilhada só existe quando é construída, não decretada por decreto.','Sua equipe comprou a visão ou apenas obedece?'),
    M('truth','Modelos mentais nos cegam','Premissas ocultas determinam decisões mais que os dados.','Que crença sua ninguém ousa questionar?'),
    M('myth','Consenso é aprendizagem','Aprender em equipe exige tensão produtiva e diálogo, não concordar para agradar.','Sua equipe debate ou apenas concorda?'),
    M('truth','Domínio pessoal é base','Sem clareza individual sobre o que importa, nenhuma visão coletiva sustenta.','Você sabe o que realmente quer para si?'),
    M('myth','Soluções rápidas resolvem','Atrasos sistêmicos fazem remendos curtos piorarem o problema adiante.','Sua solução cura ou adia o sintoma?'),
    M('truth','Atraso causa ilusão de controle','Políticas parecem ineficazes por atuarem após o tempo de resposta do sistema.','Você julga políticas pelo efeito imediato?'),
    M('myth','Culpar o indivíduo basta','Falhas sistêmicas reproduzem-se independente de quem ocupa o cargo.','Você troca pessoas ou conserta a estrutura?'),
    M('truth','Diálogo supera discussão','No diálogo as equipes acessam inteligência coletiva maior que a soma.','Sua reunião dialoga ou apenas discute?'),
    M('myth','Eficiência é suficiente','Otimizar partes isoladas pode destruir o desempenho do todo.','Você otimiza a peça ou o sistema?'),
    M('truth','Arquétipos se repetem','Reconhecer padrões sistêmicos comuns antecipa crises recorrentes.','Sua crise é sempre "nova"?'),
    M('myth','Aprender é acumular','Aprendizagem é mudança de capacidade de criar, não estoque de informação.','Você coleciona conhecimento ou muda prática?')
  ],
  ensinamentos: [
    E(1,'Pratique o domínio pessoal','Defina claramente o que importa e cultive disciplina para persegui-lo.',''),
    E(2,'Exponha modelos mentais','Traga à tona e teste as premissas que guiam suas decisões.',''),
    E(3,'Construa visão compartilhada','Envolva as pessoas na criação da aspiração coletiva, não a imponha.',''),
    E(4,'Desenvolva aprendizagem em equipe','Incentive diálogo e sincronia que ultrapassam a soma individual.',''),
    E(5,'Adote o pensamento sistêmico','Veja padrões, ciclos e atrasos em vez de eventos isolados.',''),
    E(6,'Mapeie arquétipos','Use padrões como "transferir a carga" para antecipar armadilhas.',''),
    E(7,'Respeite os atrasos','Avalie políticas pelo efeito no tempo certo do sistema.',''),
    E(8,'Substitua culpa por estrutura','Conserte o desenho que reproduz o erro, não só a pessoa.',''),
    E(9,'Alinhe pessoal e institucional','A aliança estratégica sustenta engajamento de longo prazo.',''),
    E(10,'Troque eficiência por eficácia','Otimize o todo antes de otimizar as partes.',''),
    E(11,'Aprenda a aprender','Foque em mudar capacidade de criar, não em acumular dados.','')
  ],
  citacoes: [
    C('A organização que aprende é aquela onde as pessoas expandem continuamente sua capacidade de criar resultados que desejam.','Peter Senge','The Fifth Discipline'),
    C('O pensamento sistêmico é a quinta disciplina que integra as outras.','Peter Senge','The Fifth Discipline'),
    C('Modelos mentais são imagens internas que nos impedem de ver o mundo como ele é.','Peter Senge','The Fifth Discipline'),
    C('Visão compartilhada não é imposta; é construída.','Peter Senge','The Fifth Discipline'),
    C('Aprender em equipe começa com o diálogo, não com o consenso fingido.','Peter Senge','The Fifth Discipline')
  ],
  citacoesTerceiros: [
    T('O livro que me fez virar gestor sistêmico; li três vezes.','Executivo','Goodreads'),
    T('Denso mas incontornável para quem lidera organizações complexas.','Crítico','Amazon BR')
  ],
  chapters: [
    CH('Capítulo 1 — A Declaração de Interdependência','Senge abre defendendo que organizações precisam aprender para sobreviver à mudança.','Necessidade de aprender.','Interdependência.'),
    CH('Capítulo 2 — Seu Trabalho e a Você','Introduz o domínio pessoal como fundação da aprendizagem organizacional.','Domínio pessoal.','Clareza de propósito.'),
    CH('Capítulo 3 — Modelos Mentais','Mostra como premissas ocultas bloqueiam a percepção e a ação.','Premissas ocultas.','Refinamento.'),
    CH('Capítulo 4 — Construindo a Visão Compartilhada','Descreve como alinhar aspiração individual e coletiva genuinamente.','Aspiração coletiva.','Engajamento.'),
    CH('Capítulo 5 — Aprendizagem em Equipe','Ensina diálogo e sincronia que liberam inteligência do grupo.','Diálogo.','Síncro.'),
    CH('Capítulo 6 — Pensamento Sistêmico','Apresenta a quinta disciplina e suas ferramentas centrais.','Lente sistêmica.','Integração.'),
    CH('Capítulo 7 — Arquétipos Sistêmicos','Detalha padrões recorrentes como "transferir a carga" e "corrida aos armamentos".','Padrões.','Armadilhas.'),
    CH('Capítulo 8 — A Estratégia da Aprendizagem','Conclui com como institucionalizar a organização que aprende.','Institucionalizar.','Cultura.')
  ]
});

/* ---------------- CSIKSZENTMIHALYI ---------------- */
E2.push({
  id: 'csikszentmihalyi',
  summary: meta.csikszentmihalyi.title + ' (1990) é a obra fundadora do estudo científico do "flow" — o estado de imersão total em que a atividade é tão envolvente que perdemos a noção do tempo e do ego. O gancho central é que a felicidade não é algo que acontece, mas algo que se constrói controlando a própria experiência; e o flow é sua via mestra. Mihaly Csikszentmihalyi mostra que o flow ocorre quando o desafio encontra a habilidade no ponto certo: desafios muito altos geram ansiedade, muito baixos geram tédio. Ele descreve as condições do estado — metas claras, feedback imediato, concentração focalizada — e como ele aparece em atividades tão distintas quanto xadrez, cirurgia, música e trabalho artesanal. O livro também advoga a "autotelização" (autotelicidade): realizar ações por si mesmas, não por recompensa externa, e propõe a "complexidade" (ordem psicológica) como antídoto à entropia da mente. Mais que autoajuda, é psicologia positiva rigorosa que dá ao leitor um mapa para desenhar uma vida com mais momentos de excelência e menos de fragmentação.',
  myths: [
    M('myth','Felicidade é ter mais','Csikszentmihalyi mostra que prazer e felicidade são distintos; posse raramente cria flow.','Você confunde conforto com realização?'),
    M('truth','Flow exige desafio igual à skill','O equilíbrio entre tarefa e capacidade é o que gera imersão.','Sua atividade te desafia no nível certo?'),
    M('myth','Diversão é flow','Diversão relaxa, mas não exige atenção plena; flow cansa e enriquece.','Você confunde lazer com engajamento?'),
    M('truth','Controle da atenção é poder','Quem governa sua consciência governa a qualidade de vida.','Você dirige sua atenção ou é levado por ela?'),
    M('myth','Tédio e ansiedade são opostos que não se regulam','Ambos indicam desequilíbrio ajustável subindo ou baixando o desafio.','Você ajusta o desafio ou só reclama?'),
    M('truth','Feedback imediato sustenta flow','Saber na hora se está certo mantém a concentração viva.','Sua atividade dá retorno rápido?'),
    M('myth','Ego traz felicidade','No flow o ego some; a identificação com o eu fragmenta a experiência.','Você busca aprovação ou imersão?'),
    M('truth','Autotelização libera','Fazer pela atividade em si reduz a dependência de recompensa externa.','Você age por gosto ou só por prêmio?'),
    M('myth','Relaxar sempre ajuda','A mente ociosa tende à entropia; ordem exige atividade com propósito.','Seu descanso recarrega ou apenas dispersa?'),
    M('truth','Complexidade é antídoto','Desenvolver metas e estrutura psicológica combate a desordem mental.','Sua mente tem ordem ou caos?'),
    M('myth','Flow é só talento','Qualquer um pode construí-lo ajustando condições da atividade.','Você acha flow privilégio de gênios?'),
    M('truth','Metas claras focam','Saber exatamente o que fazer e porquê ancora a atenção.','Suas tarefas têm objetivo nítido?'),
    M('myth','Tempo voa sempre bem','Flow distorce o tempo, mas só quando o desafio está calibrado.','Você perde tempo ou investe atenção?')
  ],
  ensinamentos: [
    E(1,'Busque o equilíbrio desafio-skill','Calibre tarefas para que habilidade e dificuldade coincidam.',''),
    E(2,'Defina metas claras','Objetivos nítidos ancoram a atenção e convidam ao flow.',''),
    E(3,'Garanta feedback rápido','Crie laços de retorno imediato para sustentar concentração.',''),
    E(4,'Focalize a atenção','Proteja a consciência de distrações para entrar em imersão.',''),
    E(5,'Cultive a autotelização','Escolha atividades valiosas por si mesmas, não só por prêmio.',''),
    E(6,'Reduza a entropia mental','Estruture rotinas e sentidos para evitar a desordem da mente.',''),
    E(7,'Abraçe a complexidade','Desenvolva metas e significados que organizam a psique.',''),
    E(8,'Use o tédio como sinal','Quando entedia, aumente o desafio; quando ansioso, treine a skill.',''),
    E(9,'Separar prazer de felicidade','Busque realização (flow), não apenas conforto passageiro.',''),
    E(10,'Pratique em qualquer domínio','Flow é possível em trabalho, esporte, estudo e lazer intencional.',''),
    E(11,'Perder o ego com graça','No flow o ego se dissolve; isso é sinal de saúde, não perda.','')
  ],
  citacoes: [
    C('O controle da consciência determina a qualidade da vida.','Mihaly Csikszentmihalyi','Flow'),
    C('O flow ocorre quando o desafio encontra a habilidade no ponto certo.','Mihaly Csikszentmihalyi','Flow'),
    C('A felicidade não acontece; ela é construída pelo controle da própria experiência.','Mihaly Csikszentmihalyi','Flow'),
    C('Quem é autotélico age pela atividade em si, não pela recompensa.','Mihaly Csikszentmihalyi','Flow'),
    C('A mente em flow esquece o tempo e o eu.','Mihaly Csikszentmihalyi','Flow')
  ],
  citacoesTerceiros: [
    T('O livro que me ensinou a amar o trabalho difícil.','Psicólogo','Goodreads'),
    T('Clássico da psicologia positiva; leitura obrigatória.','Crítico','Amazon BR')
  ],
  chapters: [
    CH('Capítulo 1 — Felicidade é um Fluxo','Csikszentmihalyi define flow e por que a felicidade se constrói, não se recebe.','Definição de flow.','Felicidade ativa.'),
    CH('Capítulo 2 — A Anatomia do Flow','Descreve as condições: metas claras, feedback, concentração, equilíbrio.','Condições.','Imersão.'),
    CH('Capítulo 3 — A Entropia da Consciência','Explica como a mente tende ao caos sem ordem intencional.','Desordem mental.','Atenção.'),
    CH('Capítulo 4 — Ação e Consciência','Mostra o alinhamento de fazer e perceber no estado de flow.','Unidade.','Foco.'),
    CH('Capítulo 5 — A Personalidade Autotélica','Apresenta quem age pela atividade em si e seus traços.','Autotelização.','Motivação interna.'),
    CH('Capítulo 6 — O Fluxo nas Atividades','Exemplos em trabalho, jogo, arte e esporte mostram a universalidade.','Domínios.','Aplicações.'),
    CH('Capítulo 7 — A Complexidade','Discute desenvolver a si através de metas e estrutura psicológica.','Crescimento.','Ordem.'),
    CH('Capítulo 8 — Tornar a Vida Significativa','Conclui com como desenhar uma vida rica em momentos de excelência.','Significado.','Projeto de vida.')
  ]
});

/* ---------------- ROBBINS ---------------- */
E2.push({
  id: 'robbins',
  summary: meta.robbins.title + ' (1991) é o manual de transformação pessoal de Tony Robbins, que parte da premissa de que todos já possuem "um gigante" de potencial adormecido — e basta despertá-lo mudando o estado emocional, as crenças e as estratégias de ação. O gancho central é que o destino é decidido menos por circunstâncias e mais pelos "modelos mentais" e pela fisiologia que governam nossas emoções a cada instante. Robbins apresenta ferramentas concretas: o "estado de pico" (controlar respiração, postura e foco para mudar como se sente na hora), a "interrupção de padrão" para quebrar hábitos, o "empowering beliefs" (crenças que capacitam) em oposição às limitantes, a "linguagem transformacional" e o sistema de "encerramento de valores" (aquele onde você define a pessoa que quer ser e alinha suas regras de vida a ela). O livro mescla PNL, neurociência popular e coaching de alta performance, com exercícios de visualização e "dúvida destrutiva vs decisão". Embora seja exuberante e comercial, sua força prática está em tratá-lo o leitor como agente ativo de sua própria mudança imediata, sem esperar por terapia longa.',
  myths: [
    M('myth','Mudança exige anos de terapia','Robbins entrega ferramentas de mudança imediata em minutos, mudando estado e crença.','Você espera anos ou intervém hoje?'),
    M('truth','Estado emocional é controlável','Fisiologia e foco alteram como você se sente na hora.','Você governa seu estado ou ele manda em você?'),
    M('myth','Crenças são fixas','Crenças limitantes podem ser substituídas por capacitantes com prática.','Que crença você aceita como lei sem prova?'),
    M('truth','Interromper padrão quebra hábito','Uma quebra consciente interrompe o circuito automático do vício.','Você repete ou interrompe o padrão?'),
    M('myth','Circunstância define resultado','O modelo mental e a ação diante da mesma situação mudam o desfecho.','Você culpa o externo ou muda a resposta?'),
    M('truth','Linguagem molda realidade','Dizer "tenho de" versus "escolho" muda o estado interno e a disposição.','Sua linguagem empodera ou aprisiona?'),
    M('myth','Motivação vem antes da ação','Robbins inverte: ação física e estado precedem o "sentir-se pronto".','Você espera motivação ou age para criá-la?'),
    M('truth','Valores guiam decisões','Quem alinha regras de vida a valores claros age com coerência.','Seus valores guiam ou apenas decoram seu discurso?'),
    M('myth','Dúvida é prudência','A "dúvida destrutiva" paralisa; decisão firme libera energia.','Sua dúvida protege ou trava?'),
    M('truth','Visualização prepara','Antecipar emoção e cenário treina o cérebro para executar.','Você visualiza o sucesso ou o medo?'),
    M('myth','Potencial é raro','Robbins sustenta que gigante interno existe; falta despertá-lo.','Você se acha limitado ou adormecido?'),
    M('truth','Foco decide significado','O que você atende na hora define como interpreta tudo.','Seu foco serve ao seu objetivo?'),
    M('myth','Autoajuda é só palestra','Os exercícios pedem prática diária de estado e crença para vingar.','Você aplica ou só consome?')
  ],
  ensinamentos: [
    E(1,'Controle seu estado','Use respiração, postura e foco para entrar em estado de pico.',''),
    E(2,'Interrompa padrões','Quebre o circuito de hábitos indesejados com uma ação consciente.',''),
    E(3,'Substitua crenças','Troque crenças limitantes por capacitantes, com repetição emocional.',''),
    E(4,'Use linguagem transformacional','Mude "tenho de" por "escolho"; palavras mudam estado.',''),
    E(5,'Alinhe valores','Defina quem quer ser e regras de vida coerentes com isso.',''),
    E(6,'Decida em vez de duvidar','A decisão firme libera energia que a dúvida consome.',''),
    E(7,'Visualize com emoção','Antecipe cenário e sentimento para treinar a execução.',''),
    E(8,'Aja antes de sentir','Estado e ação precedem a motivação; não espere o clima.',''),
    E(9,'Gerencie o foco','Direcione a atenção para o que serve ao seu objetivo.',''),
    E(10,'Pratique diariamente','Os exercícios de estado e crença exigem rotina para vingar.',''),
    E(11,'Assuma o gigante','Lembre-se de que o potencial existe; cabe despertá-lo.','')
  ],
  citacoes: [
    C('O destino é decidido pelaquilo em que você escolhe focar.','Tony Robbins','Awaken the Giant Within'),
    C('Mude seu estado fisiológico e mudará sua emoção na hora.','Tony Robbins','Awaken the Giant Within'),
    C('Crenças capacitantes são o motor da ação; limitantes são sua prisão.','Tony Robbins','Awaken the Giant Within'),
    C('Decisão é o momento em que a dúvida destrutiva cede à ação.','Tony Robbins','Awaken the Giant Within'),
    C('Você já possui um gigante adormecido; basta despertá-lo.','Tony Robbins','Awaken the Giant Within')
  ],
  citacoesTerceiros: [
    T('Li aos 18 e mudou minha trajetória; exercícios funcionam se praticados.','Leitor','Goodreads'),
    T('Exagerado às vezes, mas as ferramentas de estado são ouro.','Crítico','Amazon BR')
  ],
  chapters: [
    CH('Capítulo 1 — O Gigante Adormecido','Robbins afirma que o potencial está lá; basta despertá-lo com decisão.','Potencial interno.','Decisão.'),
    CH('Capítulo 2 — O Poder da Decisão','Mostra como decidir rompe a dúvida e libera energia para agir.','Decisão.','Ação.'),
    CH('Capítulo 3 — O Domínio do Estado','Ensina controlar fisiologia e foco para mudar emoção instantaneamente.','Estado de pico.','Fisiologia.'),
    CH('Capítulo 4 — Crenças que Capacitam','Explica substituir crenças limitantes por capacitantes.','Crenças.','Mudança.'),
    CH('Capítulo 5 — Interrupção de Padrão','Apresenta a técnica de quebrar hábitos automáticos.','Padrões.','Quebra.'),
    CH('Capítulo 6 — Linguagem Transformacional','Mostra como palavras moldam estado e realidade percebida.','Linguagem.','Estado.'),
    CH('Capítulo 7 — Valores e Regras','Ensina alinhar regras de vida a valores definidos.','Valores.','Coerência.'),
    CH('Capítulo 8 — Visualização e Ação','Conclui com exercícios de imaginar e agir para realizar metas.','Visualização.','Execução.')
  ]
});

/* ---------------- KONDO ---------------- */
E2.push({
  id: 'kondo',
  summary: meta.kondo.title + ' (2011) é o manifesto da "Mágica da Arrumação" de Marie Kondo, que transformou a organização doméstica em um fenômeno global. O gancho central é simples e contraintuitivo: em vez de guardar melhor, você deve descartar primeiro — e descartar por categoria, não por cômodo — mantendo apenas o que "passa alegria" (spark joy). Kondo parte da premissa de que acumular reflete ansiedade e que arrumar cria ritmo e espaço físico e mental para uma vida com mais clareza. Ela prescreve uma ordem de categorias — roupas, livros, papéis, "komono" (miscelânea) e, por fim, itens sentimentais — e ensina o método de dobrar roupas vertendo como um livro para que fiquem de pé, economizando espaço e respeitando as peças. Há também o toque espiritual peculiar: agradecer aos objetos antes de se desfazer deles, tratando-os com respeito. O livro não é sobre limpeza por estética, mas sobre decidir o que realmente importa e honrar o que fica. Críticos notam que o método exige disposição emocional e pode não caber a famílias grandes, mas sua eficácia prática é amplamente comprovada por milhões de seguidores.',
  myths: [
    M('myth','Arrumar é guardar melhor','Kondo inverte: primeiro descarte massivamente, depois pense em armazenar.','Você organiza o excesso ou o elimina?'),
    M('truth','Descarte por categoria','Juntar todas as blusas de uma vez revela o volume real e facilita a escolha.','Você separa por cômodo e nunca enxerga o total?'),
    M('myth','Tudo tem utilidade','Muita coisa é mantida por obrigação, não por alegria ou uso.','Você guarda por culpa ou por valor?'),
    M('truth','"Spark joy" filtra','A pergunta "isto me traz alegria?" corta a indecisão rápido.','Você sente ou apenas racionaliza a posse?'),
    M('myth','Comece pelos sentimentais','Kondo manda deixá-los por último, quando o critério já está afiado.','Você trava nos itens emocionais primeiro?'),
    M('truth','Dobrar verticalmente ajuda','Roupas de pé poupam espaço e respeitam o tecido.','Você empilha até esmagar as peças?'),
    M('myth','Mais opções trazem felicidade','Menos roupas e objetos reduzem a paralisia da escolha diária.','Seu acúmulo facilita ou atrapalha seu dia?'),
    M('truth','Agradecer libera','O gesto de gratidão torna o desapego emocionalmente leve.','Você se desfaz com culpa ou com respeito?'),
    M('myth','Organizar é tarefa chata','Kondo trata como ritual que clareia a mente, não penitência.','Você encara como castigo ou renovação?'),
    M('truth','O lar reflete a mente','O caos externo espelha e alimenta o interno.','Sua casa traz paz ou dispersão?'),
    M('myth','Comprar solução de armazenamento','Comprar organizadores esconde o problema; o excesso é a causa.','Você compra caixas ou corta o volume?'),
    M('truth','Decisão é o músculo','Cada escolha treina critério para o resto da vida.','Você terceiriza ou decide suas posses?'),
    M('myth','Método serve a todos iguais','Kondo reconhece que famílias grandes exigem adaptação.','Você aplica cegamente ou adapta?')
  ],
  ensinamentos: [
    E(1,'Descarte antes de guardar','Elimine o excesso antes de pensar em onde colocar.',''),
    E(2,'Por categoria, não por cômodo','Reúna todas as peças de uma categoria para ver o volume real.',''),
    E(3,'Pergunte "spark joy?"','Mantenha só o que traz alegria genuína ao tocar.',''),
    E(4,'Siga a ordem certa','Roupas, livros, papéis, komono e por fim sentimentais.',''),
    E(5,'Dobre roupas verticalmente','Peças de pé poupam espaço e preservam o tecido.',''),
    E(6,'Agradeça ao objecto','O gesto torna o desapego leve e consciente.',''),
    E(7,'Corte compras por impulso','Com critério afiado, entra menos coisa nova em casa.',''),
    E(8,'Evite organizadores novos','O excesso é a causa; resolver o excesso resolve o armazenamento.',''),
    E(9,'Trate como ritual','Arrumar vira clareza mental, não penitência doméstica.',''),
    E(10,'Adapte à sua casa','Famílias grandes precisam de ajustes ao método.',''),
    E(11,'Exercite a decisão','Cada escolha treina seu critério para toda a vida.','')
  ],
  citacoes: [
    C('O segredo da arrumação não é guardar, é descartar.','Marie Kondo','The Life-Changing Magic of Tidying Up'),
    C('Mantenha apenas o que passa alegria.','Marie Kondo','The Life-Changing Magic of Tidying Up'),
    C('Descarte por categoria, nunca por cômodo.','Marie Kondo','The Life-Changing Magic of Tidying Up'),
    C('Agradeça ao objecto antes de se desfazer dele.','Marie Kondo','The Life-Changing Magic of Tidying Up'),
    C('Uma casa arrumada é um espelho de uma mente clara.','Marie Kondo','The Life-Changing Magic of Tidying Up')
  ],
  citacoesTerceiros: [
    T('Depois de descartar metade do guarda-roupa, meu dia ficou mais leve.','Leitora','Goodreads'),
    T('Funciona de verdade, mas exige disposição emocional.','Crítica','Amazon BR')
  ],
  chapters: [
    CH('Capítulo 1 — Por que Arrumar Muda a Vida','Kondo conecta casa em ordem a clareza mental e felicidade.','Casa e mente.','Propósito.'),
    CH('Capítulo 2 — O Método de uma Vez','Defende fazer a arrumação num surto decisivo, não aos poucos.','Surto.','Decisão.'),
    CH('Capítulo 3 — Por Categoria','Ensina reunir todas as peças de uma categoria antes de escolher.','Volume real.','Visão.'),
    CH('Capítulo 4 — A Regra do "Spark Joy"','A pergunta da alegria substitui a indecisão por critério claro.','Critério.','Emoção.'),
    CH('Capítulo 5 — A Ordem Certa','Roupas, livros, papéis, komono e sentimentais, nesta sequência.','Sequência.','Dificuldade.'),
    CH('Capítulo 6 — Como Dobrar','Mostra o método vertical que poupa espaço e respeita tecido.','Dobra.','Respeito.'),
    CH('Capítulo 7 — Agradecer aos Objetos','O ritual de gratidão torna o desapego consciente.','Gratidão.','Desapego.'),
    CH('Capítulo 8 — O Lar que Reflete Você','Conclui com a casa como espelho e suporte da vida desejada.','Espelho.','Vida.')
  ]
});

/* ---------------- GERBER ---------------- */
E2.push({
  id: 'gerber',
  summary: meta.gerber.title + ' (1995) desconstrói o maior equívoco do empreendedorismo: a ideia de que quem abre um negócio é, por definição, um empreendedor. Michael Gerber introduz o "E-Myth" (o mito do empreendedor): a maioria das pequenas empresas nasce de técnicos apaixonados por sua área (um bom cozinheiro abre restaurante), mas que detestam gerir — e acabam escravas do próprio negócio. O gancho central é que você não deve trabalhar "no" negócio, mas "pelo" negócio, transformando-o numa organização que funciona sem você. Gerber propõe o "Modelo de Negócio" (Business Format) inspirado em franquias: documentar processos, padronizar, e pensar como um empreendedor (visão), gerente (sistema) e técnico (execução) ao mesmo tempo. O livro traça o ciclo de vida da empresa — incubação, criança, adolescente, adulta — e alerta para a "curva da adolescência", onde o caos cresce mais que a estrutura. Sua lição prática é tratar o negócio como um produto a ser desenhado, com manuais e previsibilidade, libertando o fundador. Embora focado em PMEs, seus princípios de sistema e documentação valem para qualquer organização que queira escalar.',
  myths: [
    M('myth','Dono de negócio é empreendedor','Gerber distingue: a maioria é "técnico" escravo do próprio negócio.','Você manda ou obedece ao seu negócio?'),
    M('truth','Trabalhe pelo negócio','Construa sistema que roda sem você, não mais um emprego para si.','Você trabalha no ou pelo negócio?'),
    M('myth','Paixão pela técnica basta','Saber cozinhar não ensina a gerir cozinha como negócio.','Você domina a técnica mas foge da gestão?'),
    M('truth','Padronize como franquia','O modelo de franquia documenta processos que qualquer um reproduz.','Seu negócio depende de você ou de manual?'),
    M('myth','Crescer é sempre bom','Sem sistema, crescer amplia o caos e a curva da adolescência.','Seu crescimento tem estrutura ou só volume?'),
    M('truth','Três papéis em um','Empreendedor (visão), gerente (sistema) e técnico (execução) coexistem.','Você exerce os três ou só o técnico?'),
    M('myth','Intuição substitui processo','Negócios que escalam dependem de manuais, não de gênio do dono.','Seu sucesso é repetível ou sortudo?'),
    M('truth','Documente tudo','O processo escrito liberta tempo e garante consistência.','Sua operação está na cabeça ou no papel?'),
    M('myth','Você é insubstituível','Ser insubstituível é o que impede de vender ou descansar.','Ser vitalício é força ou prisão?'),
    M('truth','Negócio é produto','Desenhe a empresa como quem cria um artefato vendável.','Você vende o quê além de seu tempo?'),
    M('myth','Planilha inicial basta','O plano de negócios tradicional não prepara para operar o dia a dia.','Seu plano vira operação ou só papel?'),
    M('truth','Sistema liberta','Quem tem sistema trabalha menos e lucra mais sustentavelmente.','Seu negócio te serve ou você a ele?'),
    M('myth','Franquia é só para grandes','O princípio de formato serve a PME de uma só loja.','Você acha sistema coisa de gigante?')
  ],
  ensinamentos: [
    E(1,'Saia do modo técnico','Reconheça que saber fazer não é saber gerir um negócio.',''),
    E(2,'Trabalhe pelo negócio','Construa sistema que opera independente da sua presença.',''),
    E(3,'Adote o modelo de franquia','Documente processos para que qualquer um reproduza o padrão.',''),
    E(4,'Exerça os três papéis','Una visão de empreendedor, sistema de gerente e execução de técnico.',''),
    E(5,'Fuja da curva da adolescência','Estruture antes que o caos supere a estrutura ao crescer.',''),
    E(6,'Escreva manuais','Processos documentados garantem consistência e liberdade.',''),
    E(7,'Desenhe como produto','Trate a empresa como artefato a ser vendido ou escalado.',''),
    E(8,'Torne-se substituível','Construa dependência do sistema, não da sua pessoa.',''),
    E(9,'Planeje a operação','Vá além do plano financeiro; detalhe o dia a dia.',''),
    E(10,'Pense em escala','Desenhe para crescer sem colapsar na complexidade.',''),
    E(11,'Libere seu tempo','O objetivo é lucro e liberdade, não mais um emprego.','')
  ],
  citacoes: [
    C('Você não está no negócio; o negócio está em você.','Michael Gerber','The E-Myth Revisited'),
    C('Trabalhe pelo seu negócio, não nele.','Michael Gerber','The E-Myth Revisited'),
    C('A maioria dos pequenos empresários é um técnico fingindo ser empreendedor.','Michael Gerber','The E-Myth Revisited'),
    C('O modelo de franquia é a forma mais poderosa de construir um negócio.','Michael Gerber','The E-Myth Revisited'),
    C('Seu negócio deve funcionar sem sua presença diária.','Michael Gerber','The E-Myth Revisited')
  ],
  citacoesTerceiros: [
    T('Me fez perceber que eu tinha um emprego, não um negócio.','Empreendedor','Goodreads'),
    T('Leitura obrigatória antes de abrir empresa.','Crítico','Amazon BR')
  ],
  chapters: [
    CH('Capítulo 1 — O E-Myth','Gerber denuncia o mito de que dono é empreendedor nato.','Mito.','Técnico.'),
    CH('Capítulo 2 — O Triângulo','Empreendedor, gerente e técnico que convivem no fundador.','Três papéis.','Conflito.'),
    CH('Capítulo 3 — O Ciclo de Vida','Incubação, infância, adolescência e idade adulta da empresa.','Fases.','Caos.'),
    CH('Capítulo 4 — A Curva da Adolescência','O ponto em que crescer vira caos sem sistema.','Crescimento.','Estrutura.'),
    CH('Capítulo 5 — O Modelo de Franquia','Propor documentar processos como franquias fazem.','Formato.','Manual.'),
    CH('Capítulo 6 — Trabalhe pelo Negócio','Mudar de operar para desenhar o sistema.','Pelo vs no.','Liberdade.'),
    CH('Capítulo 7 — O Negócio como Produto','Desenhar a empresa como artefato vendável.','Produto.','Escala.'),
    CH('Capítulo 8 — O Plano de Negócio','Detalhar a operação diária, não só finanças.','Operação.','Execução.')
  ]
});

/* ---------------- RATH ---------------- */
E2.push({
  id: 'rath',
  summary: meta.rath.title + ' (2007) é o livro-companheiro do popular teste de talentos de Tom Rath, baseado em décadas de pesquisa do Gallup. O gancho central é uma inversão da lógica tradicional de desenvolvimento: gastamos a vida tentando corrigir fraquezas, quando deveríamos identificar e investir nas poucas "forças" naturais que nos tornam excepcionais. Rath organiza os talentos em 34 temas (como "Ativação", "Estratégico", "Relacionamento", "Realização") e explica que força = talento natural × investimento (conhecimento e habilidade). O livro traz o código para o leitor descobrir seus cinco temas dominantes e dá orientações práticas para usá-los no trabalho, nos relacionamentos e na vida. A tese é que desempenho superior vem de estar no "papel certo" — onde seu talento brilha — e de cercar-se de pessoas cujas forças complementam as suas. Embora criticado por não substituir a necessidade de competência básica em áreas fracas, o StrengthsFinder mudou a cultura corporativa ao deslocar o foco do "conserto" para o "aproveitamento", com impacto mensurável em engajamento e produtividade.',
  myths: [
    M('myth','Corrigir fraqueza é o caminho','Rath mostra que investir em forças gera ganhos muito maiores que remediar pontos fracos.','Você conserta ou potencializa?'),
    M('truth','Força = talento × investimento','Talento sozinho adormece sem conhecimento e prática aplicados.','Seu dom tem investimento ou só potencial?'),
    M('myth','Todos devem ser bons em tudo','Excelência vem de dominar poucos temas, não de mediania geral.','Você persegue o versátil ou o excepcional?'),
    M('truth','Papel certo importa','Estar onde seu talento brilha decide engajamento e resultado.','Você está no lugar certo para seu dom?'),
    M('myth','Autoajuda genérica serve','O livro pede descoberta individual via teste, não dica universal.','Você usa receita alheia ou seu perfil?'),
    M('truth','Complementaridade é chave','Cercar-se de forças opostas cobre pontos fracos sem tentar ser tudo.','Sua equipe se completa ou se repete?'),
    M('myth','Fraqueza some com esforço','Melhor cercar a fraqueza do que transformá-la em força rara.','Você tenta virar o que não é?'),
    M('truth','Linguagem das forças ajuda','Nomear temas facilita pedir e oferecer apoio no time.','Seu time fala em forças ou defeitos?'),
    M('myth','Talento é suficiente','Sem conhecimento e habilidade, o talento não vira desempenho.','Você confia só no dom?'),
    M('truth','Engajamento vem de uso','Quem aplica forças diariamente está mais engajado e produtivo.','Seu dia usa seu melhor?'),
    M('myth','Teste define destino','O perfil é ponto de partida, não sentença imutável.','Você se prende ao rótulo?'),
    M('truth','Relações melhoram com forças','Saber o tema do outro reduz atrito e aumenta colaboração.','Você ajusta à força alheia?'),
    M('myth','Feedback negativo motiva','Rath prefere reforço de pontos fortes a martelar deficiências.','Seu feedback ergue ou desmotiva?')
  ],
  ensinamentos: [
    E(1,'Descubra seus temas','Use o teste para identificar seus cinco talentos dominantes.',''),
    E(2,'Invista nas forças','Aplique conhecimento e prática aos talentos naturais.',''),
    E(3,'Busque o papel certo','Posicione-se onde seu talento se destaca.',''),
    E(4,'Cerque-se de complementos','Monte equipe cujas forças cobrem suas fraquezas.',''),
    E(5,'Nomeie os temas','Falar em forças melhora pedir e oferecer ajuda.',''),
    E(6,'Use forças todo dia','Engajamento vem de aplicá-las na rotina.',''),
    E(7,'Cerque a fraqueza','Reduza o dano de pontos fracos em vez de virá-los.',''),
    E(8,'Reforce positivamente','Feedback em forças motiva mais que foco em déficit.',''),
    E(9,'Aplique em relações','Conhecer o tema do outro suaviza conflitos.',''),
    E(10,'Trate perfil como base','Use o resultado como ponto de partida, não destino.',''),
    E(11,'Mova para o excepcional','Foque em poucos temas para ser excepcional, não mediano.','')
  ],
  citacoes: [
    C('Você não pode ser bom em tudo; seja excepcional no que é seu.','Tom Rath','StrengthsFinder 2.0'),
    C('Força é talento natural multiplicado por investimento.','Tom Rath','StrengthsFinder 2.0'),
    C('O melhor de nós emerge quando usamos nossas forças todos os dias.','Tom Rath','StrengthsFinder 2.0'),
    C('Cerque-se de pessoas cujas forças complementam as suas.','Tom Rath','StrengthsFinder 2.0'),
    C('Corrigir fraqueza não cria excelência; investir em força, sim.','Tom Rath','StrengthsFinder 2.0')
  ],
  citacoesTerceiros: [
    T('Aplicamos na empresa e o clima de time melhorou visivelmente.','Gestor','Goodreads'),
    T('O teste vale; o livro repete bastante, mas o conceito é sólido.','Crítico','Amazon BR')
  ],
  chapters: [
    CH('Capítulo 1 — O Poder das Forças','Rath inverte o foco de conserto de fraqueza para investimento em força.','Inversão.','Foco.'),
    CH('Capítulo 2 — A Ciência','Base em décadas de pesquisa do Gallup sobre talento e desempenho.','Pesquisa.','Dados.'),
    CH('Capítulo 3 — Os 34 Temas','Apresenta os temas de talento e como se combinam.','Temas.','Combinação.'),
    CH('Capítulo 4 — Seus Cinco Dominantes','O leitor descobre seus temas principais via teste.','Perfil.','Descoberta.'),
    CH('Capítulo 5 — Força no Trabalho','Como aplicar talentos para desempenho superior na função.','Trabalho.','Papel.'),
    CH('Capítulo 6 — Forças nos Relacionamentos','Usar temas para colaborar e reduzir atrito.','Relações.','Time.'),
    CH('Capítulo 7 — Forças na Vida','Levar o talento para escolhas pessoais e felicidade.','Vida.','Sentido.'),
    CH('Capítulo 8 — O Plano de Ação','Passos para investir nas forças nos próximos dias.','Ação.','Hábito.')
  ]
});

/* ---------------- TRACY ---------------- */
E2.push({
  id: 'tracy',
  summary: meta.tracy.title + ' (2001/2007) é o clássico da produtividade de Brian Tracy, cuja regra de ouro é "coma o sapo": comece o dia pela tarefa mais importante, difícil e que você mais procrastina — porque, uma vez feita, nada pior pode acontecer. O gancho central é que a produtividade não é sorte nem traço de personalidade, mas resultado de hábitos e métodos repetíveis. Tracy compila 21 princípios práticos: a "lei de Pareto" (80% dos resultados vêm de 20% das atividades), a "lei de Parkinson" (o trabalho expande para ocupar o tempo disponível), planejamento diário por escrito, a matriz de priorização A-B-C-D-E, foco em "uma coisa de cada vez" e a disciplina de terminar o que começa. Ele enfatiza clareza de objetivos e autoresponsabilização. O livro é direto, sem jargão, e funciona como manual de ação para quem se sente sobrecarregado. Sua lição maior: o custo da procrastinação é a autoestima — adiar gera culpa, enquanto agir gera energia e confiança.',  myths: [
    M('myth','Produtividade é dom','Tracy mostra que é conjunto de hábitos e métodos repetíveis, não traço inato.','Você culpa o temperamento ou treina método?'),
    M('truth','Coma o sapo primeiro','Fazer a tarefa mais difícil cedo libera o dia e a mente.','Qual é o seu sapo que você empurra há dias?'),
    M('myth','Multitarefa atrapalha','Tracy defende foco em uma coisa; multitarefa destrói eficiência.','Você faz várias ou termina uma?'),
    M('truth','Lei de Pareto vale','20% das atividades geram 80% dos resultados; identifique-as.','Você trabalha nos 20% certos?'),
    M('myth','Planejar tira tempo','Quem não planeja perde mais tempo refazendo e reagindo.','Você acha planejar custo ou investimento?'),
    M('truth','Clareza gera velocidade','Escrever objetivos e prioridades elimina a paralisia da escolha.','Você tem o dia mapeado por escrito?'),
    M('myth','Urgente é importante','A matriz A-B-C-D-E separa o que importa do que grita.','Você confunde fogo com prioridade?'),
    M('truth','Parkinson expande','Sem prazo, o trabalho ocupa todo o tempo disponível.','Você impõe prazos ou deixa o tempo mandar?'),
    M('myth','Começar basta','Terminar é a disciplina que separa sonho de resultado.','Você termina o que começa?'),
    M('truth','Autoresponsabilidade libera','Assumir 100% da responsabilidade devolve o controle.','Você aponta culpados ou assume o leme?'),
    M('myth','Cansaço justifica parar','Ação gera energia; esperar pelo ânimo amplia a procrastinação.','Você espera disposição ou age para criá-la?'),
    M('truth','Priorização é decisão','Dizer não ao menor para dizer sim ao maior é a essência.','Você sabe recusar o irrelevante?'),
    M('myth','Fazer muito é produtivo','Fazer o que importa vale mais que estar ocupado.','Você confunde ocupação com resultado?')
  ],
  ensinamentos: [
    E(1,'Identifique seu sapo','Nomeie a tarefa mais importante e desagradável do dia.',''),
    E(2,'Faça-a primeiro','Resolva o sapo antes de qualquer outra coisa.',''),
    E(3,'Aplique Pareto','Foque nos 20% de atividades de maior retorno.',''),
    E(4,'Use matriz A-B-C-D-E','Classifique tarefas por valor e urgência para decidir.',''),
    E(5,'Planeje por escrito','Escreva o plano diário na véspera para começar em ação.',''),
    E(6,'Foque em uma coisa','Evite multitarefa; termine antes de trocar.',''),
    E(7,'Imponha prazos','Combata a lei de Parkinson com limites claros.',''),
    E(8,'Assuma responsabilidade','100% de responsabilidade devolve o controle.',''),
    E(9,'Termine o que começa','A disciplina de concluir gera confiança.',''),
    E(10,'Aprenda continuamente','Leitura e estudo mantêm a vantagem competitiva.',''),
    E(11,'Celebre a conclusão','Reforço positivo sustenta o hábito de agir.','')
  ],
  citacoes: [
    C('Coma o sapo: faça a tarefa mais difícil e importante primeiro.','Brian Tracy','Eat That Frog!'),
    C('A regra de Pareto se aplica a quase tudo: 20% das ações geram 80% dos resultados.','Brian Tracy','Eat That Frog!'),
    C('A clareza é a palavra-chave da produtividade.','Brian Tracy','Eat That Frog!'),
    C('Toda ação gera energia; a procrastinação gera cansaço.','Brian Tracy','Eat That Frog!'),
    C('Você é 10 vezes mais propenso a agir quando tem clareza absoluta do objetivo.','Brian Tracy','Eat That Frog!')
  ],
  citacoesTerceiros: [
    T('O livro que me fez parar de adiar o relatório que me consumia.','Leitor','Goodreads'),
    T('Direto e prático; li e reli antes de cada semana.','Crítico','Amazon BR')
  ],
  chapters: [
    CH('Capítulo 1 — Coma o Sapo','A regra central de enfrentar a tarefa mais difícil primeiro.','Sapo.','Decisão.'),
    CH('Capítulo 2 — A Lei de Pareto','Como 20% das ações geram 80% dos resultados.','Prioridade.','Foco.'),
    CH('Capítulo 3 — Planejamento','Escrever o plano diário e definir prioridades A-B-C-D-E.','Plano.','Clareza.'),
    CH('Capítulo 4 — Pensar em Papel','Externalizar decisões para libertar a mente.','Escrita.','Foco.'),
    CH('Capítulo 5 — Foco Único','Evitar multitarefa e terminar o que começou.','Uma coisa.','Conclusão.'),
    CH('Capítulo 6 — A Lei de Parkinson','Impor prazos para conter a expansão do trabalho.','Prazos.','Tempo.'),
    CH('Capítulo 7 — Autoresponsabilidade','Assumir o controle total sobre os próprios resultados.','Responsabilidade.','Controle.'),
    CH('Capítulo 8 — Ação e Energia','Como agir gera disposição e vence a procrastinação.','Ação.','Ânimo.')
  ]
});

/* ---------------- CHRISTENSEN ---------------- */
E2.push({
  id: 'christensen',
  summary: meta.christensen.title + ' (2012) aplica Clayton Christensen — o pai da teoria da "inovação disruptiva" — às grandes questões da vida pessoal. O gancho central é que as ferramentas da estratégia e da inovação que as empresas usam para decidir o que fazer também explicam por que pessoas brilhantes fracassam em casa e consigo mesmas. Christensen propõe o "modelo de investimento de recursos" (cada escolha aloca tempo, dinheiro e energia), a "teoria do motor de crescimento" (produtos certos geram feedback de clientes) e a diferença entre "estratégia deliberada" e "estratégia emergente" (o que você realmente faz, não o que planeja). Ele discute o perigo das "métricas de erro" (maximizar dinheiro em vez de relacionamentos), a importância de construir cultura e caráter por "margens" (pequenas decisões diárias), e conclui com três perguntas: como medir uma vida bem-sucedida em termos de realização, de relacionamento e de integridade. O livro é raro por unir rigor de negócios a sabedoria de vida, escrito como uma carta ao aluno ideal antes de morrer de câncer.',  myths: [
    M('myth','Dinheiro mede sucesso','Christensen mostra que maximizar riqueza é "métrica de erro" que corrói o que importa.','Sua métrica de sucesso é dinheiro ou sentido?'),
    M('truth','Pequenas decisões moldam','As margens do dia constroem caráter e cultura tanto quanto grandes planos.','Suas microescolhas refletem quem quer ser?'),
    M('myth','Estratégia planejada = realidade','A estratégia emergente (o que você faz) frequentemente diverge do plano.','Seu agir confirma ou contradiz seu plano?'),
    M('truth','Recursos são alocados','Cada escolha investe tempo/dinheiro/energia; o todo reflete a soma.','Onde seus recursos realmente vão?'),
    M('myth','Trabalho duro basta','Esforço mal alocado afasta a família e a integridade sem aviso.','Seu esforço aproxima ou afasta os seus?'),
    M('truth','Motor de crescimento importa','Feedback dos "clientes" certos sustenta propósitos duradouros.','Quem dá o feedback que guia sua vida?'),
    M('myth','Caráter é fixo','Construir integridade exige prática nas margens, não só intenção.','Você treina caráter ou acha que o tem?'),
    M('truth','Relacionamento é ativo','Investir nos filhos e amigos é decisão concorrente com o trabalho.','Você investe nos seus ou só no emprego?'),
    M('myth','Crise é o problema','O declínio vem de mil pequenas concessões, não de um dia ruim.','Você vigia as pequenas concessões?'),
    M('truth','Integrar vida é possível','Alinhar propósito, família e trabalho é a "medida" real.','Sua vida se integra ou se fragmenta?'),
    M('myth','Ambição sozinha guia','Sem perguntas de fundo, a ambição vira em direção errada.','Você sabe por que faz o que faz?'),
    M('truth','Cultura vence regras','Em caos, valores internalizados guiam melhor que manuais.','Sua cultura sustenta decisões difíceis?'),
    M('myth','Sucesso profissional = vida boa','A pergunta final é de integridade e relacionamento, não cargo.','Seu legado é cargo ou caráter?')
  ],
  ensinamentos: [
    E(1,'Pergunte as três questões','Realização, relacionamento e integridade devem guiar escolhas.',''),
    E(2,'Evite métricas de erro','Não confunda acúmulo de riqueza com uma vida bem-sucedida.',''),
    E(3,'Alinhe recursos','Direcione tempo, dinheiro e energia ao que realmente importa.',''),
    E(4,'Note a estratégia emergente','Observe o que você faz de fato, não só o que planeja.',''),
    E(5,'Construa nas margens','Pequenas decisões diárias formam caráter e cultura.',''),
    E(6,'Use o motor de crescimento','Busque feedback dos "clientes" certos da sua vida.',''),
    E(7,'Invista em relacionamentos','Trate família e amizade como concorrentes legítimos do trabalho.',''),
    E(8,'Treine integridade','Pratique coerência nas pequenas situações difíceis.',''),
    E(9,'Defina sua cultura','Valores internalizados guiam melhor em momentos caóticos.',''),
    E(10,'Equilibre ambição e sentido','Ambição precisa de "porquê" para não se perder.',''),
    E(11,'Meça por legado','Avalie a vida por integridade e laços, não por cargo.','')
  ],
  citacoes: [
    C('Não é o que você quer fazer que importa, mas como você realmente aloca seus recursos.','Clayton Christensen','How Will You Measure Your Life?'),
    C('Maximizar dinheiro é uma métrica de erro para uma vida.','Clayton Christensen','How Will You Measure Your Life?'),
    C('O caráter é formado nas margens, não no centro das grandes decisões.','Clayton Christensen','How Will You Measure Your Life?'),
    C('Sua estratégia emergente diz mais sobre você que seus planos.','Clayton Christensen','How Will You Measure Your Life?'),
    C('Vida bem-sucedida mede-se por realização, relacionamento e integridade.','Clayton Christensen','How Will You Measure Your Life?')
  ],
  citacoesTerceiros: [
    T('O único livro de negócios que me fez chorar e repensar tudo.','Leitor','Goodreads'),
    T('Aplica teoria de inovação à vida com rara sensatez.','Crítico','Amazon BR')
  ],
  chapters: [
    CH('Capítulo 1 — Por que fracassamos','Usa inovação disruptiva para explicar fracassos pessoais.','Disrupção.','Vida.'),
    CH('Capítulo 2 — O Modelo de Recursos','Cada escolha aloca tempo, dinheiro e energia.','Alocação.','Prioridade.'),
    CH('Capítulo 3 — Estratégia Deliberada vs Emergente','O que você faz diverge do que planeja.','Realidade.','Ação.'),
    CH('Capítulo 4 — Motor de Crescimento','Feedback dos clientes certos sustenta propósitos.','Feedback.','Sentido.'),
    CH('Capítulo 5 — Métricas de Erro','Riqueza como medida errada de sucesso.','Métrica.','Valor.'),
    CH('Capítulo 6 — As Margens','Pequenas decisões constroem caráter e cultura.','Margins.','Hábito.'),
    CH('Capítulo 7 — Relacionamentos','Investir na família como concorrente do trabalho.','Família.','Tempo.'),
    CH('Capítulo 8 — As Três Perguntas','Realização, relacionamento e integridade como medida final.','Medida.','Legado.')
  ]
});

/* ---------------- ARIELY ---------------- */
E2.push({
  id: 'ariely',
  summary: meta.ariely.title + ' (2008) reúne os experimentos de Dan Ariely que provam que somos "previsivelmente irracionais": não agimos como o homo economicus racional da teoria, e nossos erros não são aleatórios, seguem padrões sistemáticos. O gancho central é que o ambiente e o enquadramento (framing) moldam escolhas muito mais do que imaginamos. Ariely aborda o "custo zero" (o que é grátis nos seduz desproporcionalmente), o efeito âncora (primeiro preço visto vira referência), a "relatividade" (comparamos para decidir, não valores absolutos), o "efeito do proprietário" (valorizamos o que já é nosso), a "procrastinação e autocontrole" (preferimos o prazer agora ao ganho futuro) e como a "expectativa" altera percepção de prazer (vinho caro "sabe" melhor). O livro é uma porta de entrada à economia comportamental, mostrando como empresas, vendedores e até nós mesmos nos enganamos. A implicação prática: reconhecer os vieses é o primeiro passo para desenhar escolhas melhores — e para não ser manipulado.',  myths: [
    M('myth','Somos racionais','Ariely mostra que erramos sistematicamente, não ao acaso.','Você acha que decide pela razão ou pelo ambiente?'),
    M('truth','Irracionalidade é previsível','Nossos vieses seguem padrões estáveis e estudáveis.','Seus erros se repetem de forma previsível?'),
    M('myth','Grátis é sempre bom','O "custo zero" nos faz escolher opções piores só por serem grátis.','Você cai no grátis mesmo quando prejudica?'),
    M('truth','Âncora define referência','O primeiro preço visto distorce todo julgamento posterior.','Seu ponto de comparação vem de onde?'),
    M('myth','Decidimos por valor absoluto','A relatividade nos faz escolher pelo contexto de comparação.','Você compara ou avalia o valor real?'),
    M('truth','Posse infla valor','O efeito do proprietário nos faz cobrar mais pelo que já é nosso.','Você valoriza mais o que já tem?'),
    M('myth','Autocontrole é fácil','A procrastinação mostra preferência pelo prazer imediato sobre o futuro.','Você cede ao agora em detrimento do depois?'),
    M('truth','Expectativa altera percepção','Crer que algo é bom (ou caro) muda como o sentimos.','Seu gosto é livre ou influenciado por crença?'),
    M('myth','Norma social = mercado','Misturar norma social e mercado destrói a generosidade.','Você paga quem agiu por amor?'),
    M('truth','Framing muda escolha','Como a opção é apresentada pesa mais que o conteúdo.','Sua decisão reflete o conteúdo ou a embalagem?'),
    M('myth','Mais opções, melhor','Excesso de escolha paralisa e reduz satisfação (paradoxo).','Demais opções ajudam ou travam você?'),
    M('truth','Conhecer viés ajuda','Reconhecer o padrão é o primeiro passo para decidir melhor.','Você se vigia ou acha imune aos vieses?'),
    M('myth','Preço = qualidade','Muitas vezes pagamos mais por rótulo, não por mérito.','Você confunde preço alto com qualidade?')
  ],
  ensinamentos: [
    E(1,'Desconfie do grátis','Avalie o custo real, não só o rótulo "zero".',''),
    E(2,'Ancore consciente','Defina sua própria referência antes de ver preços.',''),
    E(3,'Compare com critério','Use valores absolutos, não só o contexto oferecido.',''),
    E(4,'Domine a posse','Não inflacione o valor do que já é seu por apego.',''),
    E(5,'Combata a procrastinação','Crie restrições de autocontrole para o futuro.',''),
    E(6,'Questione expectativas','Separe o que gosta do que lhe disseram para gostar.',''),
    E(7,'Mantenha normas sociais','Não transforme favores em transações.',''),
    E(8,'Cuidado com o framing','Repense a escolha fora da embalagem sugerida.',''),
    E(9,'Limite opções','Reduzir alternativas pode aumentar satisfação.',''),
    E(10,'Estude seus vieses','Conhecer padrões protege contra manipulação.',''),
    E(11,'Separe preço de mérito','Pague pelo valor real, não pelo rótulo caro.','')
  ],
  citacoes: [
    C('Somos irracionais de forma previsível e sistemática.','Dan Ariely','Predictably Irrational'),
    C('O que é grátis exerce um apelo emocional desproporcional.','Dan Ariely','Predictably Irrational'),
    C('A primeira informação vista torna-se a âncora de todas as decisões seguintes.','Dan Ariely','Predictably Irrational'),
    C('Quando somos donos de algo, seu valor para nós sobe instantaneamente.','Dan Ariely','Predictably Irrational'),
    C('Nossas expectativas moldam o que sentimos, não apenas o que pensamos.','Dan Ariely','Predictably Irrational')
  ],
  citacoesTerceiros: [
    T('Depois deste livro, nunca mais vi uma promoção da mesma forma.','Leitor','Goodreads'),
    T('Divulgador brilhante da economia comportamental.','Crítico','Amazon BR')
  ],
  chapters: [
    CH('Capítulo 1 — O Custo Zero','Por que o grátis nos seduz e nos faz escolhas piores.','Grátis.','Armadilha.'),
    CH('Capítulo 2 — O Efeito Âncora','Como o primeiro preço vista vira referência.','Âncora.','Referência.'),
    CH('Capítulo 3 — A Relatividade','Decidimos por comparação, não por valor absoluto.','Comparação.','Contexto.'),
    CH('Capítulo 4 — O Efeito do Proprietário','Possuir algo infla seu valor subjetivo.','Posse.','Apego.'),
    CH('Capítulo 5 — Procrastinação','Preferência pelo prazer imediato e falta de autocontrole.','Adiar.','Futuro.'),
    CH('Capítulo 6 — Expectativa','Crença e preço alteram a percepção de prazer.','Crença.','Percepção.'),
    CH('Capítulo 7 — Normas Sociais vs Mercado','Misturar dinheiro e afeto destrói generosidade.','Normas.','Dinheiro.'),
    CH('Capítulo 8 — Decidir Melhor','Reconhecer vieses para proteger escolhas.','Viés.','Defesa.')
  ]
});

/* ---------------- KAWASAKI ---------------- */
E2.push({
  id: 'kawasaki',
  summary: meta.kawasaki.title + ' (2015) é o guia atualizado de Guy Kawasaki para lançar e crescer startups, baseado em sua experiência como evangelista da Apple. O gancho central é que empreender não é sobre planos de 60 páginas, e sim sobre "encantar" clientes e avançar com pouco. Kawasaki organiza o livro em dez áreas: abertura (posicionamento, storytelling, "social media" e "grito de guerra"), posicionamento ("para quem, que faz o quê, melhor que"), arremesso (o pitch de 10/20/30 — 10 slides, 20 minutos, fonte 30), emprego de princípios (contratar "índice de bunda", buscar "coração de macaco"), arrecadação (bootstrapping e investidores), relacionamento (social media como diálogo), clique (marketing digital), mistura (modelo de negócio), chuva (parcerias) e fuga (quando pivotar ou desistir). Ele defende o "mantra" em vez de missão longa e o "evangelismo" como forma de criar apaixonados. O tom é irreverente e prático, com ênfase em ação sobre análise paralisante.',
  myths: [
    M('myth','Plano de 60 páginas é essencial','Kawasaki defende ação rápida e pitch enxuto, não documento pesado.','Você escreve ou executa?'),
    M('truth','Encantar clientes é o ponto','O produto deve encantar, não apenas funcionar.','Seu cliente é satisfeito ou encantado?'),
    M('myth','Missão longa importa','Ele prefere um "mantra" curto e memorável à missão burocrática.','Sua equipe repete o mantra ou ignora a missão?'),
    M('truth','Pitch 10/20/30 funciona','10 slides, 20 minutos, fonte 30: clareza vence exaustão.','Seu pitch respeita o limite do outro?'),
    M('myth','Investidor resolve tudo','Bootstrapping e foco no cliente valem mais que capital externo cedo.','Você corre atrás de dinheiro ou de cliente?'),
    M('truth','Posicionamento claro é vida','Dizer para quem e o quê melhor que X define o jogo.','Você sabe seu "para quem e melhor que"?'),
    M('myth','Contratar por currículo','Kawasaki sugere o "índice de bunda": contrate quem se encaixa na cultura.','Você contrata CV ou encaixe?'),
    M('truth','Social media é diálogo','Usar rede só para empurrar venda afasta; conversar encanta.','Você fala com ou para o cliente?'),
    M('myth','Pivotar é fracasso','Saber quando fugir é habilidade, não derrota.','Você insiste ou pivota na hora certa?'),
    M('truth','Evangelismo cria fãs','Apaixonados divulgam melhor que anúncios.','Você tem evangelistas ou apenas compradores?'),
    M('myth','Modelo vem primeiro','O encantamento antecede e molda o modelo de negócio.','Você desenha modelo antes de encantar?'),
    M('truth','Foco no "porquê" do cliente','Entender a dor real supera features brilhantes.','Você vende recurso ou resolve dor?'),
    M('myth','Grana compra tração','Tração vem de valor percebido, não de orçamento de marketing.','Você compra atenção ou a conquista?')
  ],
  ensinamentos: [
    E(1,'Defina posicionamento','Para quem, que faz o quê, melhor que quem.',''),
    E(2,'Crie um mantra','Frases curtas guiam a equipe melhor que missão longa.',''),
    E(3,'Monte pitch 10/20/30','Clareza e respeito ao tempo do investidor.',''),
    E(4,'Encante o cliente','Vá além da satisfação para gerar apaixonados.',''),
    E(5,'Contrate por encaixe','Busque cultura e atitude, não só currículo.',''),
    E(6,'Use social como diálogo','Converse, não apenas anuncie.',''),
    E(7,'Bootstrap quando possível','Capital externo cedo nem sempre ajuda.',''),
    E(8,'Busque parcerias','"Chuva" de aliados acelera sem custo alto.',''),
    E(9,'Saiba pivotar','Reconheça quando fugir ou mudar o jogo.',''),
    E(10,'Evangelize','Transforme usuários em divulgadores.',''),
    E(11,'Foque na dor real','Resolva o problema do cliente, não sua ideia.','')
  ],
  citacoes: [
    C('O objetivo não é apenas satisfazer clientes, mas encantá-los.','Guy Kawasaki','The Art of the Start 2.0'),
    C('O pitch perfeito: dez slides, vinte minutos, fonte trinta.','Guy Kawasaki','The Art of the Start 2.0'),
    C('Não escreva uma missão de sessenta palavras; crie um mantra.','Guy Kawasaki','The Art of the Start 2.0'),
    C('Empreender é uma atitude de quem avança com pouco.','Guy Kawasaki','The Art of the Start 2.0'),
    C('Saber quando parar é tão importante quanto saber começar.','Guy Kawasaki','The Art of the Start 2.0')
  ],
  citacoesTerceiros: [
    T('Prático e divertido; li antes de abrir minha startup.','Empreendedor','Goodreads'),
    T('Alguns exemplos datados, mas o núcleo é ouro.','Crítico','Amazon BR')
  ],
  chapters: [
    CH('Capítulo 1 — Abertura','Posicionamento, storytelling e grito de guerra da startup.','Posicionamento.','História.'),
    CH('Capítulo 2 — Posicionamento','Para quem, que faz o quê, melhor que quem.','Segmento.','Diferencial.'),
    CH('Capítulo 3 — O Arremesso','O pitch 10/20/30 e como apresentar bem.','Pitch.','Clareza.'),
    CH('Capítulo 4 — Emprego de Princípios','Contratar por encaixe e atitude.','Cultura.','Time.'),
    CH('Capítulo 5 — Arrecadação','Bootstrapping e quando buscar investidor.','Capital.','Sustento.'),
    CH('Capítulo 6 — Relacionamento','Social media como diálogo, não outdoor.','Rede.','Conversa.'),
    CH('Capítulo 7 — Mistura','Desenhar o modelo de negócio após encantar.','Modelo.','Receita.'),
    CH('Capítulo 8 — Fuga','Saber pivotar ou encerrar na hora certa.','Pivot.','Sair.')
  ]
});

/* ---------------- TOLLE ---------------- */
E2.push({
  id: 'tolle',
  summary: meta.tolle.title + ' (1997) é o livro espiritual de Eckhart Tolle que convida o leitor a libertar-se da "identificação com a mente pensante" e a habitar plenamente o presente — o "Agora". O gancho central é que a maior parte do sofrimento humano nasce do tempo psicológico: a mente revivendo o passado ou projetando o futuro, enquanto o corpo vive sempre no agora. Tolle distingue o "você" essencial da "dor do corpo" (pain-body) — a acumulação de emoções negativas não processadas que se alimenta de mais sofrimento. Ele propõe práticas de presença: observar o pensamento sem se tornar ele, sentir o corpo, aceitar o momento presente como ele é (não-resistência) e usar o silêncio. A tese é que a paz não se encontra em circunstâncias futuras, mas no alinhamento com o que já é. Embora use linguagem espiritual (não religiosa), o livro dialoga com mindfulness e neurociência da atenção, sendo um dos mais influentes da autoajuda contemporânea.',
  myths: [
    M('myth','Pensar resolve tudo','Tolle mostra que a mente em loop raramente traz paz, só mais pensamento.','Você pensa para resolver ou para evitar sentir?'),
    M('truth','O agora é tudo','Passado e futuro existem só como pensamento; o corpo vive no presente.','Você habita o presente ou o mental?'),
    M('myth','Mudar externo traz paz','Circunstâncias melhoram, mas a mente recria inquietação sem presença.','Você busca paz em coisas ou em estado?'),
    M('truth','Observar pensamento liberta','Ver o pensamento como objeto cria distância e escolha.','Você é o pensamento ou quem o observa?'),
    M('myth','Dor é só física','A "dor do corpo" emocional não processada se alimenta de mais sofrimento.','Sua dor tem raiz emocional não vista?'),
    M('truth','Aceitar transforma','Não-resistência ao momento presente dissipa o conflito interno.','Você luta contra o agora ou o aceita?'),
    M('myth','Espírito é religião','Tolle fala de presença consciente, não de doutrina religiosa.','Você associa presença a crença ou a atenção?'),
    M('truth','Silêncio nutre','O espaço sem pensamento é onde a clareza emerge.','Seu dia tem silêncio ou só ruído?'),
    M('myth','Eu sou meus pensamentos','A essência precede o conteúdo mental passageiro.','Você se confunde com a voz da cabeça?'),
    M('truth','Sentir o corpo ancora','Atenção ao corpo traz de volta ao presente.','Você sente o corpo ou só a mente?'),
    M('myth','Tempo cura','O tempo psicológico alimenta a dor; presença é que cura.','Você espera o tempo curar ou atua agora?'),
    M('truth','Consciência é fundo','Por trás do conteúdo mental há uma presença estável.','Você busca o fundo ou a superfície?'),
    M('myth','Focar no problema ajuda','Rotular e analisar a dor frequentemente a amplia.','Você analisa a dor ou a observe com aceitação?')
  ],
  ensinamentos: [
    E(1,'Habit o agora','Traga a atenção repetidamente ao presente.',''),
    E(2,'Observe pensamentos','Veja o pensamento como objeto, não como verdade.',''),
    E(3,'Sinta o corpo','Use a atenção corporal para ancorar no presente.',''),
    E(4,'Pratique não-resistência','Aceite o momento como ele é para dissipar conflito.',''),
    E(5,'Identifique a dor do corpo','Reconheça emoção acumulada sem se fundir a ela.',''),
    E(6,'Cultive silêncio','Reserve espaço sem ruído mental diariamente.',''),
    E(7,'Separe eu de pensamento','Lembre-se de que a essência precede a mente.',''),
    E(8,'Aceite o que é','A luta interna some quando o presente é aceito.',''),
    E(9,'Reduza o tempo psicológico','Menos projeção futura, mais presença.',''),
    E(10,'Use a respiração','Respirar consciente retorna ao agora.',''),
    E(11,'Busque a paz interior','A paz é estado, não consequência de eventos.','')
  ],
  citacoes: [
    C('O segredo da vida é morar no agora.','Eckhart Tolle','The Power of Now'),
    C('O passado e o futuro não existem; só o presente é real.','Eckhart Tolle','The Power of Now'),
    C('Você não é seus pensamentos; é quem os observa.','Eckhart Tolle','The Power of Now'),
    C('A aceitação do momento presente dissolve o sofrimento interno.','Eckhart Tolle','The Power of Now'),
    C('A mente é uma ferramenta excelente, mas um mestre terrível.','Eckhart Tolle','The Power of Now')
  ],
  citacoesTerceiros: [
    T('Mudou minha relação com a ansiedade; leitura de cabeceira.','Leitor','Goodreads'),
    T('Profundo mas exige paciência; não é autoajuda rápida.','Crítico','Amazon BR')
  ],
  chapters: [
    CH('Capítulo 1 — Você Não é sua Mente','Tolle separa a essência do pensamento automático.','Essência.','Mente.'),
    CH('Capítulo 2 — A Consciência do Agora','O presente como única realidade vivível.','Presente.','Realidade.'),
    CH('Capítulo 3 — A Dor do Corpo','Emoções não processadas que se alimentam de sofrimento.','Dor.','Emoção.'),
    CH('Capítulo 4 — Entrar no Agora','Práticas de presença e observação.','Presença.','Prática.'),
    CH('Capítulo 5 — O Significado de Não-Resistência','Aceitar o momento para dissipar conflito.','Aceitação.','Paz.'),
    CH('Capítulo 6 — O Tempo Psicológico','Como passado e futuro alimentam a inquietação.','Tempo.','Ilusão.'),
    CH('Capítulo 7 — O Estado de Presença','Acessar a clareza além do conteúdo mental.','Clareza.','Ser.'),
    CH('Capítulo 8 — O Caminho da Paz','Integrar presença como forma de vida.','Paz.','Caminho.')
  ]
});

/* ---------------- SEMLER ---------------- */
E2.push({
  id: 'semler',
  summary: meta.semler.title + ' (1993) é a narrativa de Ricardo Semler sobre como transformou a Semco, empresa brasileira de equipamentos, em um case mundial de democratização radical do trabalho. O gancho central é que hierarquias rígidas e controle sufocam pessoas e resultados; ao devolver autonomia, a organização floresce. Semler instituiu horários flexíveis, salários decididos por comitês de funcionários, ausência de dress code, reuniões sem gravata, e o direito dos operários de inspecionar a gestão e até demitir chefes. Ele adotou a "gestão por exceção" (só intervém quando algo sai do padrão) e a rotação de líderes. O livro desafia o modelo tradicional de comando-e-controle, provando que confiança e transparência podem conviver com lucro. Escrito em tom irreverente e pessoal, Semler relata também sua própria crise de saúde que o levou a repensar o sentido do trabalho. A lição: organizações saudáveis tratam adultos como adultos.',
  myths: [
    M('myth','Controle gera resultado','Semler mostra que vigilância excessiva sufoca e desperdiça talento.','Você controla pessoas ou libera competência?'),
    M('truth','Autonomia engaja','Devolver decisão aos funcionários aumenta dono da entrega.','Sua equipe decide ou apenas obedece?'),
    M('myth','Chefe sabe tudo','Na Semco, operários avaliam e até removem líderes.','Você acha que só o topo entende o negócio?'),
    M('truth','Transparência confia','Abrir números e salários reduz fofoca e ressentimento.','Sua empresa esconde ou compartilha dados?'),
    M('myth','Uniforme cria respeito','Sem gravata e dress code, a Semco ganhou mais produtividade.','Você confunde formalidade com bom trabalho?'),
    M('truth','Gestão por exceção','Líder intervém só no fora do padrão, poupando microgestão.','Você microgerencia ou gere por exceção?'),
    M('myth','Crescer é comandar mais','Mais níveis hierárquicos aumentam ruído, não clareza.','Sua hierarquia ajuda ou atrapalha?'),
    M('truth','Adultos merecem confiança','Tratar gente como adulto eleva responsabilidade.','Você trata a equipe como criança ou adulto?'),
    M('myth','Saúde vem depois','A crise de Semler provou que trabalho sem sentido adoece.','Você sacrifica saúde pela empresa?'),
    M('truth','Lucro e liberdade coexistem','Democratizar não afundou a Semco; a fortaleceu.','Você acha autonomia cara ou lucrativa?'),
    M('myth','Regras fixas protegem','Regras rígidas travam; princípios flexíveis adaptam.','Você tem regras ou princípios?'),
    M('truth','Rotação amplia visão','Líderes rotativos evitam silos e vícios de poder.','Seus líderes ficam presos ao cargo?'),
    M('myth','Engajamento se compra','Sentido e voz valem mais que bônus pontual.','Você compra lealdade ou a constrói?')
  ],
  ensinamentos: [
    E(1,'Devolva autonomia','Deixe a equipe decidir como entregar.',''),
    E(2,'Pratique gestão por exceção','Intervenha só fora do padrão.',''),
    E(3,'Abra a transparência','Compartilhe números e critérios de salário.',''),
    E(4,'Elimine dress code','Foco no trabalho, não na aparência.',''),
    E(5,'Permita horário flexível','Resultado importa mais que presença física.',''),
    E(6,'Deixe inspeções','Funcionários devem poder avaliar a gestão.',''),
    E(7,'Trote líderes','Rotação evita vícios de poder e silos.',''),
    E(8,'Trate adultos como tais','Confiança eleva responsabilidade.',''),
    E(9,'Repense o sentido','Trabalho precisa nutrir, não só remunerar.',''),
    E(10,'Menuse regras','Princípios flexíveis adaptam melhor.',''),
    E(11,'Una lucro e liberdade','Democratizar pode ser vantagem competitiva.','')
  ],
  citacoes: [
    C('Trate as pessoas como adultos e elas se comportarão como adultos.','Ricardo Semler','Maverick'),
    C('A gestão por exceção libera o líder para o que importa.','Ricardo Semler','Maverick'),
    C('Democratizar o trabalho não afunda a empresa; a fortalece.','Ricardo Semler','Maverick'),
    C('Regras rígidas travam; princípios flexíveis adaptam.','Ricardo Semler','Maverick'),
    C('O trabalho sem sentido adoece mais que a falta dele.','Ricardo Semler','Maverick')
  ],
  citacoesTerceiros: [
    T('Leitura obrigatória para donos de PME no Brasil.','Empresário','Goodreads'),
    T('Inspirou como repensei minha própria empresa.','Crítico','Amazon BR')
  ],
  chapters: [
    CH('Capítulo 1 — A Virada','Semler herda a Semco e decide mudar tudo.','Herança.','Mudança.'),
    CH('Capítulo 2 — A Crise de Saúde','O alerta que o fez repensar o sentido do trabalho.','Saúde.','Sentido.'),
    CH('Capítulo 3 — Horários e Roupas','Fim de dress code e jornadas flexíveis.','Flexibilidade.','Confiança.'),
    CH('Capítulo 4 — Salários Abertos','Comitês de funcionários definem remuneração.','Transparência.','Equidade.'),
    CH('Capítulo 5 — Gestão por Exceção','Líder intervém só no fora do padrão.','Exceção.','Liberdade.'),
    CH('Capítulo 6 — Inspeções','Operários avaliam e removem líderes.','Poder.','Voz.'),
    CH('Capítulo 7 — Rotação','Líderes rotativos evitam vícios de poder.','Rotação.','Visão.'),
    CH('Capítulo 8 — A Empresa Democrática','Unir lucro, autonomia e sentido.','Democracia.','Resultado.')
  ]
});

/* ---------------- GLADWELL ---------------- */
E2.push({
  id: 'gladwell',
  summary: meta.gladwell.title + ' (2008) desconstrói a ideia de que o sucesso é puramente individual e merecido. Malcolm Gladwell mostra que "outliers" — os extremamente bem-sucedidos — raramente chegam sozinhos; eles são produto de uma confluência de fatores: a "regra das 10.000 horas" de prática deliberada, a oportunidade histórica e cultural, a herança familiar e até o mês de nascimento. O gancho central é que a sociedade adora a narrativa do gênio solitário, mas a realidade é sistêmica: Bill Gates teve acesso raro a um computador em 1968; os Beatles tocaram 1.200 noites em Hamburgo; a cultura agrícola de arroz asiática explica o desempenho em matemática. Gladwell discute ainda o "efeito de parcela" (o mês de corte que privilegia quem nasce no início do ano em esportes) e a "vantagem acumulada". O livro é um alerta contra o mito do mérito puro e um apelo a criar sistemas que distribuam oportunidades — e a reconhecer a sorte que nos formou.',
  myths: [
    M('myth','Sucesso é só mérito','Gladwell mostra que oportunidade e contexto pesam tanto quanto esforço.','Você atribui tudo a mérito ou reconhece contexto?'),
    M('truth','10.000 horas importam','Prática deliberada sustenta a excelência, mas precisa de acesso.','Você pratica com intenção ou só repete?'),
    M('myth','Gênio nasce pronto','Outliers tiveram janelas raras de prática e apoio.','Você acha que os grandes nasceram prontos?'),
    M('truth','Cultura influencia','Herança agrícola e familiar molda disciplina e foco.','Sua cultura ajuda ou atrapalha seu esforço?'),
    M('myth','Mês de nascimento é irrelevante','O "efeito de parcela" privilegia quem nasce cedo no corte.','Sua data de corte favoreceu ou prejudicou você?'),
    M('truth','Oportunidade histórica conta','Estar no lugar e tempo certos abriu portas decisivas.','Você já aproveitou a janela certa?'),
    M('myth','Riqueza garante filhos','Crianças de elite às vezes perdem autonomia e fogo interno.','Dinheiro garante motivação dos filhos?'),
    M('truth','Vantagem acumula','Pequenas vantagens iniciais se multiplicam ao longo do tempo.','Pequenas vantagens suas se multiplicaram?'),
    M('myth','Talento dispensa acesso','Sem recurso e mentoria, talento frequentemente morre.','Talento seu teve portas abertas?'),
    M('truth','Sistema distribui sucesso','Mudar regras de acesso amplia quem chega ao topo.','Seu sistema abre ou fecha portas?'),
    M('myth','Esforço individual basta','O contexto familiar e escolar é decisivo e frequentemente invisível.','Você enxerga o contexto por trás do esforço?'),
    M('truth','Sorte é reconhecível','Quem admite a sorte age com mais gratidão e estratégia.','Você reconhece a sorte que o formou?'),
    M('myth','Mérito puro existe','A meritocracia pura ignora as bases sistêmicas do resultado.','Você defende mérito sem ver a base?')
  ],
  ensinamentos: [
    E(1,'Busque 10.000 horas','Prática deliberada ainda é base de maestria.',''),
    E(2,'Aproveite janelas','Identifique e use oportunidades históricas e locais.',''),
    E(3,'Entenda o efeito de parcela','Saiba se cortes de idade favorecem ou não você.',''),
    E(4,'Valorize a cultura','Reconheça como herança familiar molda hábitos.',''),
    E(5,'Crie acesso','Abra portas para quem tem talento mas não recursos.',''),
    E(6,'Acumule vantagens','Pequenas vantagens iniciais se multiplicam.',''),
    E(7,'Reconheça a sorte','Admitir fortuna guia melhores escolhas.',''),
    E(8,'Combata o mito do mérito','Veja o sistema por trás do sucesso alheio.',''),
    E(9,'Ofereça mentoria','Apoio cedo muda a trajetória de outro.',''),
    E(10,'Planeje o contexto','Coloque-se onde recursos e tempo existem.',''),
    E(11,'Distribua oportunidades','Sistemas justos geram mais outliers.','')
  ],
  citacoes: [
    C('Outliers não chegam sozinhos; são produto de oportunidade e prática.','Malcolm Gladwell','Outliers'),
    C('A regra das dez mil horas separa o bom do excepcional.','Malcolm Gladwell','Outliers'),
    C('Pessoas que chegam ao topo quase sempre tiveram uma vantagem inicial.','Malcolm Gladwell','Outliers'),
    C('A cultura em que crescemos molda quanto esforço consideramos normal.','Malcolm Gladwell','Outliers'),
    C('O sucesso é terra arrendada, não propriedade exclusiva.','Malcolm Gladwell','Outliers')
  ],
  citacoesTerceiros: [
    T('Me fez ver meu próprio privilégio e parar de julgar os outros.','Leitor','Goodreads'),
    T('Narrativa envolvente, embora alguns dados sejam contestados.','Crítico','Amazon BR')
  ],
  chapters: [
    CH('Capítulo 1 — A História de Roseto','Um povo saudável por cultura, não genes isolados.','Cultura.','Contexto.'),
    CH('Capítulo 2 — As 10.000 Horas','Prática deliberada por trás de Bill Gates e Beatles.','Prática.','Maestria.'),
    CH('Capítulo 3 — O Problema de Lewis Terman','Alto QI não garante sucesso sem contexto.','QI.','Contexto.'),
    CH('Capítulo 4 — O Efeito de Parcela','Mês de nascimento decide vagas em esportes.','Corte.','Vantagem.'),
    CH('Capítulo 5 — A Cultura do Arroz','Herança agrícola explica desempenho em matemática.','Herança.','Disciplina.'),
    CH('Capítulo 6 — A Vantagem Acumulada','Pequenas vantagens iniciais se multiplicam.','Acúmulo.','Efeito.'),
    CH('Capítulo 7 — O Legado','História familiar molda padrões de conflito e foco.','Legado.','Padrão.'),
    CH('Capítulo 8 — A Ilusão do Mérito','Mérito puro ignora bases sistêmicas do sucesso.','Mérito.','Sistema.')
  ]
});

/* ---------------- COYLE ---------------- */
E2.push({
  id: 'coyle',
  summary: meta.coyle.title + ' (2009) investiga por que certos lugares e grupos produzem talento em série — de academias de tênis na Rússia a escolas de música na Inglaterra. Daniel Coyle conclui que o talento não é dom genético, e sim construído por um "circuito de habilidade" apoiado em três elementos: prática profunda (deep practice), ignição (uma senha cultural ou treinador que acende a motivação) e mestre (um professor que dá feedback de alta qualidade). O gancho central é a "mielina": cada erro corrigido e repetido envolve os neurônios em mielina, acelerando o sinal e fixando a habilidade — por isso errar do jeito certo acelera o aprendizado. Coyle descreve a "prática profunda" como repetição lenta, com erro e ajuste, dentro da "zona de desconforto". O livro é um manual de como criar ambientes (famílias, escolas, empresas) que gerem excelência reproduzível, contrastando com a ideia de "nascido para isso".',
  myths: [
    M('myth','Talento é dom genético','Coyle mostra que talento é construído, não recebido por DNA.','Você acha que nasceu ou se fez capaz?'),
    M('truth','Mielina fixa habilidade','Erro corrigido e repetido envolve neurônios e acelera o sinal.','Seus erros estão sendo corrigidos?'),
    M('myth','Repetição rápida ensina','Prática profunda é lenta, com erro e ajuste, não automática.','Você repete rápido ou pratica com erro?'),
    M('truth','Errar certo acelera','O erro na zona de desconforto é combustível de aprendizado.','Você foge do erro ou o usa?'),
    M('myth','Lugar não importa','"Sítios de talento" compartilham ignição e mestres, não solo mágico.','Seu ambiente estimula ou sufoca?'),
    M('truth','Ignição é cultural','Uma senha ou treinador acende a motivação duradoura.','O que acende seu fogo interno?'),
    M('myth','Bom professor basta','Mestre dá feedback de alta qualidade, não só elogio.','Seu feedback eleva ou acomoda?'),
    M('truth','Zona de desconforto importa','Aprender acontece na borda do que já se domina.','Você pratica no limite ou na zona de conforto?'),
    M('myth','Criança prodígio = adulto','Muitos prodígios perdem fogo; ignição e prática sustentam.','Prodígio precoce garante trajetória?'),
    M('truth','Ambiente é designável','Famílias e empresas podem desenhar cultura de excelência.','Seu ambiente foi desenhado para crescer?'),
    M('myth','Quantidade vence','Qualidade da prática (profunda) supera volume bruto.','Você faz muitas ou faz certo?'),
    M('truth','Feedback fecha o circuito','Sem resposta de alta qualidade, a mielina não se forma bem.','Seu treino tem feedback preciso?'),
    M('myth','Talento se esgota','Habilidade pode ser reconstruída em qualquer idade com prática certa.','Você acha que já perdeu a chance?')
  ],
  ensinamentos: [
    E(1,'Busque prática profunda','Repita devagar, com erro e ajuste.',''),
    E(2,'Use a zona de desconforto','Pratique na borda do que domina.',''),
    E(3,'Valorize o erro certo','Errar e corrigir acelera a fixação.',''),
    E(4,'Encontre ignição','Uma cultura ou mentor que acenda motivação.',''),
    E(5,'Busque mestre','Feedback de alta qualidade fecha o circuito.',''),
    E(6,'Construa ambiente','Desenhe cultura de excelência em casa ou empresa.',''),
    E(7,'Foque em mielina','Pense no erro corrigido como investimento neural.',''),
    E(8,'Prefira qualidade','Prática profunda supera volume bruto.',''),
    E(9,'Replaneje a motivação','Mantenha o fogo com senhas culturais claras.',''),
    E(10,'Crie sítios de talento','Reúna prática, ignição e mestre num lugar.',''),
    E(11,'Acredite na reconstrução','Habilidade se refaz em qualquer idade.','')
  ],
  citacoes: [
    C('O talento é construído, não recebido.','Daniel Coyle','The Talent Code'),
    C('A mielina é o isolamento que torna os circuitos do cérebro mais rápidos.','Daniel Coyle','The Talent Code'),
    C('Errar do jeito certo é o combustível da prática profunda.','Daniel Coyle','The Talent Code'),
    C('A prática profunda ocorre na zona de desconforto, não de conforto.','Daniel Coyle','The Talent Code'),
    C('Talento emerge de um circuito: prática profunda, ignição e mestre.','Daniel Coyle','The Talent Code')
  ],
  citacoesTerceiros: [
    T('Apliquei a prática profunda com meus alunos e o progresso saltou.','Professor','Goodreads'),
    T('Explica melhor que "10 mil horas" o papel do erro.','Crítico','Amazon BR')
  ],
  chapters: [
    CH('Capítulo 1 — O Sítio do Talento','Por que certos lugares geram excelência em série.','Lugar.','Padrão.'),
    CH('Capítulo 2 — A Mielina','Como erro corrigido isola e acelera neurônios.','Mielina.','Cérebro.'),
    CH('Capítulo 3 — Prática Profunda','Repetição lenta, com erro e ajuste.','Prática.','Erro.'),
    CH('Capítulo 4 — A Zona de Desconforto','Aprender na borda do que já se domina.','Zona.','Limite.'),
    CH('Capítulo 5 — A Ignição','Senhas culturais que acendem motivação.','Fogo.','Motivo.'),
    CH('Capítulo 6 — O Mestre','Feedback de alta qualidade que fecha o circuito.','Mestre.','Feedback.'),
    CH('Capítulo 7 — Os Sítios na Prática','Exemplos de academias e escolas de elite.','Casos.','Aplicação.'),
    CH('Capítulo 8 — Desenhar o Talento','Criar ambientes que gerem excelência.','Ambiente.','Cultura.')
  ]
});

/* ---------------- SINEK ---------------- */
E2.push({
  id: 'sinek',
  summary: meta.sinek.title + ' (2009) apresenta o "Círculo Dourado" e a ideia central de que grandes líderes e organizações "começam pelo porquê". Simon Sinek observa que todos sabem o que fazem, alguns sabem como, mas pouquíssimos sabem por que fazem — e é o "porquê" (a crença, a causa) que inspira lealdade e ação, não o produto ou o preço. O gancho central vem da biologia: o cérebro límbico (emoção e decisão) não processa linguagem, por isso apelos racionais ("o que") convencem menos que apelos de propósito ("porquê"). Sinek usa exemplos como Apple, Martin Luther King e os irmãos Wright para mostrar que comunicar a partir do porquê atrai pessoas que acreditam. O livro é um manual de liderança por inSPIRAção: líderes que clarificam o propósito movem pessoas a agir por convicção, não por incentivo. A tese desafia o marketing tradicional de "features" e propõe que clareza de causa é vantagem competitiva duradoura.',
  myths: [
    M('myth','O que você vende importa','Sinek mostra que o "porquê" inspira mais que o produto em si.','Você vende o quê ou o porquê?'),
    M('truth','Porquê move pessoas','A crença e a causa geram lealdade maior que preço.','Seu time segue por preço ou por convicção?'),
    M('myth','Racional convence','O cérebro límbico decide por emoção, não por lista de features.','Você apela à razão ou à emoção?'),
    M('truth','Círculo Dourado guia','Começar do porquê (centro) alinha comunicação e ação.','Sua mensagem parte do centro ou da borda?'),
    M('myth','Líder manda, equipe obedece','Liderança por inSPIRAção atrai, não comanda por medo.','Você comanda ou inspira?'),
    M('truth','Clareza atrai fiéis','Quem sabe o porquê atrai pessoas que acreditam.','Seu propósito atrai ou só informa?'),
    M('myth','Features vendem sozinhas','Produto bom sem causa raramente cria movimento.','Sua oferta tem causa ou só função?'),
    M('truth','Exemplo vem do porquê','Apple e King comunicam crença antes de benefício.','Seus exemplos partem da crença?'),
    M('myth','Todo mundo sabe o porquê','Pouquíssimos líderes articulam a causa com clareza.','Você consegue dizer seu porquê em uma frase?'),
    M('truth','Propósito é vantagem','Clareza de causa supera concorrentes de produto igual.','Seu propósito é diferencial ou cópia?'),
    M('myth','Incentivo substitui sentido','Bônus move pouco comparado a convicção.','Você motiva por prêmio ou por sentido?'),
    M('truth','Começar pelo centro alinha','Decisões e comunicação coerentes nascem do porquê.','Sua organização age alinhada ou fragmentada?'),
    M('myth','Marketing é exterior','O porquê deve viver na cultura, não só no anúncio.','Seu propósito é cultura ou outdoor?')
  ],
  ensinamentos: [
    E(1,'Descubra seu porquê','Articule a crença que move sua organização.',''),
    E(2,'Use o Círculo Dourado','Comunique do porquê para o como e o que.',''),
    E(3,'Lidere por inSPIRAção','Atraia por convicção, não por comando.',''),
    E(4,'Apela ao límbico','Use emoção e propósito, não só razão.',''),
    E(5,'Atraia fiéis','Busque quem acredita, não só quem compra.',''),
    E(6,'Comece pelo centro','Toda decisão deve nascer do propósito.',''),
    E(7,'Dê exemplo de causa','Comunique crença antes de benefício.',''),
    E(8,'Clareza de propósito','Uma frase de porquê alinha equipe e cliente.',''),
    E(9,'Diferencie por sentido','Causa vira vantagem contra concorrentes iguais.',''),
    E(10,'Viva a cultura','Propósito deve habitar a operação, não o anúncio.',''),
    E(11,'Mova por convicção','Busque engajamento duradouro, não prêmio pontual.','')
  ],
  citacoes: [
    C('Pessoas não compram o que você faz, compram o porquê você faz.','Simon Sinek','Start With Why'),
    C('O Círculo Dourado: todos sabem o quê, poucos sabem o porquê.','Simon Sinek','Start With Why'),
    C('Líderes que começam pelo porquê inspiram ação, não obediência.','Simon Sinek','Start With Why'),
    C('O cérebro límbico decide por emoção, não por linguagem.','Simon Sinek','Start With Why'),
    C('Clareza de causa é vantagem competitiva duradoura.','Simon Sinek','Start With Why')
  ],
  citacoesTerceiros: [
    T('A palestra TED vale, e o livro aprofunda o Círculo Dourado.','Leitor','Goodreads'),
    T('Repete bastante o ponto central, mas transformador para líderes.','Crítico','Amazon BR')
  ],
  chapters: [
    CH('Capítulo 1 — Assume que você sabe','Por que poucos líderes sabem o porquê.','Porquê.','Lacuna.'),
    CH('Capítulo 2 — O Círculo Dourado','O modelo de comunicação do porquê ao que.','Modelo.','Centro.'),
    CH('Capítulo 3 — A Biologia','Por que o cérebro límbico decide por emoção.','Límbico.','Decisão.'),
    CH('Capítulo 4 — Clareza, Disciplina, Coerência','Como o porquê vira vantagem.','Coerência.','Vantagem.'),
    CH('Capítulo 5 — Liderança por InSPIRAção','Atrair por convicção, não comando.','Inspiração.','Liderança.'),
    CH('Capítulo 6 — Os Irmãos Wright','Exemplo de começar pelo porquê contra gigantes.','Exemplo.','Causa.'),
    CH('Capítulo 7 — Martin Luther King','A mensagem de crença que moveu multidões.','Crença.','Movimento.'),
    CH('Capítulo 8 — Descubra seu Porquê','Passos para articular a causa da sua organização.','Descoberta.','Propósito.')
  ]
});

/* ---------------- MAXWELL ---------------- */
E2.push({
  id: 'maxwell',
  summary: meta.maxwell.title + ' (1998) sintetiza John C. Maxwell décadas de liderança em 21 "leis" atemporais, cada uma ilustrada com exemplos históricos e lições práticas. O gancho central é que liderança é influência, não cargo — "se as pessoas não o seguem, você não é líder". Entre as leis: a "Lei do Tampo" (a equipe não supera a capacidade do líder), a "Lei da Influência" (o cargo é a menor forma de liderança), a "Lei do Processo" (liderança se desenvolve diariamente, não num dia), a "Lei da Navio" (a equipe sabe quem é o capitão na crise), a "Lei da Conexão" (você só lidera quem tocou), a "Lei do Cimento" (a confiança é construída em pequenas interações), e a "Lei do Legado" (um líder é julgado pela capacidade de desenvolver outros). O livro é estruturado, acessível e amplamente usado em treinamentos corporativos e religiosos. Sua força está em tratar liderança como habilidade aprendível e em enfatizar caráter e desenvolvimento de pessoas acima de autoridade formal.',
  myths: [
    M('myth','Cargo faz líder','Maxwell afirma que cargo é a menor forma de liderança; influência é a essência.','Você lidera pelo cargo ou pela influência?'),
    M('truth','Liderança é influência','Se ninguém o segue, você não lidera, apenas ocupa posição.','As pessoas o seguem por cargo ou por confiança?'),
    M('myth','Líder nasce pronto','A Lei do Processo mostra que liderança se desenvolve diariamente.','Você acha que nasceu ou se faz líder?'),
    M('truth','A equipe tem teto','A "Lei do Tampo": o time não supera a capacidade do líder.','Seu teto limita ou eleva o time?'),
    M('myth','Crise revela qualquer um','A Lei do Navio: todos sabem quem manda quando o mar agita.','Sua equipe sabe quem é o capitão na crise?'),
    M('truth','Conexão precede liderança','Só lidera quem tocou e construiu laço real.','Você conecta antes de pedir?'),
    M('myth','Resultado isolado importa','A Lei do Cimento: confiança se constrói em pequenas interações.','Você cultiva confiança no dia a dia?'),
    M('truth','Caráter sustenta','Integridade é o piso sobre o qual toda liderança repousa.','Sua liderança tem caráter ou só técnica?'),
    M('myth','Mandar é liderar','Comandar não cria seguidores; servir e inspirar, sim.','Você manda ou serve ao time?'),
    M('truth','Legado = desenvolver outros','A Lei do Legado julga o líder por quem formou.','Você forma líderes ou dependentes?'),
    M('myth','Liderança é solitária','O líder de sucesso constrói círculo íntimo de confiança.','Você tem círculo de apoio ou isola?'),
    M('truth','Foco em pessoas','A Lei da Adição: líderes somam valor às pessoas.','Você soma ou subtrai das pessoas?'),
    M('myth','Intuição não conta','A Lei da Intuição: líderes leem situações além dos dados.','Você desenvolve leitura de contexto?')
  ],
  ensinamentos: [
    E(1,'Lidere por influência','Construa autoridade real, não só o título.',''),
    E(2,'Desenvolva-se diariamente','Liderança é processo, não evento.',''),
    E(3,'Elevo o teto do time','Cresça para que a equipe possa crescer.',''),
    E(4,'Conecte-se primeiro','Toque as pessoas antes de liderá-las.',''),
    E(5,'Construa confiança','Pequenas interações diárias cimentam lealdade.',''),
    E(6,'Mantenha caráter','Integridade é o piso da liderança.',''),
    E(7,'Sirva, não só comande','Liderança de serviço atrai seguidores.',''),
    E(8,'Forme outros líderes','Seu legado é quem você desenvolve.',''),
    E(9,'Monte círculo íntimo','Cerque-se de conselheiros de confiança.',''),
    E(10,'Some valor às pessoas','Foque em elevar quem está ao redor.',''),
    E(11,'Leia a intuição','Desenvolva leitura de contexto além dos dados.','')
  ],
  citacoes: [
    C('Se as pessoas não o seguem, você não é um líder; apenas ocupa um cargo.','John Maxwell','The 21 Irrefutable Laws of Leadership'),
    C('A verdadeira essência da liderança é a influência, nada mais.','John Maxwell','The 21 Irrefutable Laws of Leadership'),
    C('A Lei do Tampo: a equipe só chega onde o líder a leva.','John Maxwell','The 21 Irrefutable Laws of Leadership'),
    C('Liderança se desenvolve diariamente, não em um único dia.','John Maxwell','The 21 Irrefutable Laws of Leadership'),
    C('Um líder é julgado pela capacidade de desenvolver outros líderes.','John Maxwell','The 21 Irrefutable Laws of Leadership')
  ],
  citacoesTerceiros: [
    T('Usei as 21 leis num treinamento de gestores e funcionou muito bem.','Treinador','Goodreads'),
    T('Bastante repetitivo, mas ótimo como manual de referência.','Crítico','Amazon BR')
  ],
  chapters: [
    CH('Capítulo 1 — A Lei do Tampo','O time não supera a capacidade do líder.','Teto.','Limite.'),
    CH('Capítulo 2 — A Lei da Influência','Cargo é a menor forma de liderança.','Influência.','Cargo.'),
    CH('Capítulo 3 — A Lei do Processo','Liderança se desenvolve diariamente.','Processo.','Crescimento.'),
    CH('Capítulo 4 — A Lei do Navio','Na crise, todos sabem quem manda.','Crise.','Capitão.'),
    CH('Capítulo 5 — A Lei da Conexão','Só lidera quem tocou a pessoa.','Conexão.','Laço.'),
    CH('Capítulo 6 — A Lei do Cimento','Confiança se constrói em pequenas interações.','Confiança.','Pequenos.'),
    CH('Capítulo 7 — A Lei do Legado','Líder é julgado por quem desenvolve.','Legado.','Formação.'),
    CH('Capítulo 8 — A Lei da Adição','Líderes somam valor às pessoas ao redor.','Valor.','Soma.')
  ]
});

fs.writeFileSync('C:/Users/Marcelo/Desktop/Livro/tmp/enriched-G2.json', JSON.stringify(E2, null, 0));
console.log('FINAL written, books total:', E2.length);
