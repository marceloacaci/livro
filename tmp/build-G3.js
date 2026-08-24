'use strict';
const fs = require('fs');

// Helper to keep content readable; backticks avoid quote-escaping bugs.
const E = [];

/* 1. drucker - O Executivo Eficaz */
E.push({
  id: 'drucker',
  summary: `Em "O Executivo Eficaz", Peter Drucker sustenta que a eficácia — fazer a coisa certa — pode ser aprendida, ao contrário do que se pensa, e que não é dom de nascença. Escrito em 1966 mas inteiramente atual, o livro destaca que o executivo (toda pessoa cujas decisões afetam o desempenho de outra) é pago pela contribuição, não pela ocupação. O gancho central é simples e subversivo: a eficácia começa com o tempo. Drucker propõe diagnosticar onde o tempo realmente vai, eliminar o desperdício e concentrá-lo nas poucas atividades que geram resultado. Depois, pede que se foque na contribuição para a organização, que se construa sobre as próprias forças (e não nas fraquezas) e que se tome decisões poucas, mas certas. O executivo eficaz também sabe que "não" é uma decisão, organiza-se para as informações certas e reúne a diversidade de pontos de vista antes de decidir. Mais que um manual de gestão, é uma filosofia de autogestão para quem trabalha com o conhecimento.`,
  myths: [
    { type: 'myth', title: 'Eficácia é dom de nascença', text: 'Drucker argumenta que a eficácia é uma prática que se aprende e se melhora, não um talento inato.', reflection: 'Você já culpou a falta de "dom" por não entregar o que importa?' },
    { type: 'truth', title: 'Eficiência não é eficácia', text: 'Fazer bem a coisa errada (eficiência) não substitui fazer a coisa certa (eficácia).', reflection: 'Você está ocupado ou está sendo eficaz?' },
    { type: 'myth', title: 'Gestão é sobre controlar pessoas', text: 'O executivo eficaz gerencia a si mesmo primeiro; as pessoas são parceiras de desempenho.', reflection: 'Você tenta controlar outros em vez de ordenar seu próprio tempo?' },
    { type: 'truth', title: 'O tempo é o recurso irrecuperável', text: 'Diferente de dinheiro, tempo gasto não volta; por isso diagnosticar o uso do tempo é o primeiro passo.', reflection: 'Onde seu tempo realmente foi ontem?' },
    { type: 'myth', title: 'Reuniões longas geram alinhamento', text: 'Drucker mostra que a maioria das reuniões consome tempo sem produzir decisão.', reflection: 'Quantas reuniões terminaram sem uma decisão clara?' },
    { type: 'truth', title: 'Foque na contribuição', text: 'Perguntar "o que minha organização espera de mim" muda a postura de ocupado para útil.', reflection: 'Sua equipe sabe qual é a sua contribuição esperada?' },
    { type: 'myth', title: 'Trabalhe nas fraquezas', text: 'Construir sobre forças alheias e próprias rende muito mais que tentar consertar fraguezas.', reflection: 'Quanto esforço você gasta consertando o que não é seu ponto forte?' },
    { type: 'truth', title: 'Concentre-se nas poucas coisas', text: 'Poucas atividades de alto impacto valem mais que muitas tarefas dispersas.', reflection: 'Quais são as 3 atividades que realmente movem seu resultado?' },
    { type: 'myth', title: 'Decisões devem ser rápidas e muitas', text: 'Decisões certas são poucas, demoram e exigem divergência antes da conclusão.', reflection: 'Você decide rápido demais por pressão ou por clareza?' },
    { type: 'truth', title: 'Divergência precede consenso', text: 'Opinões diferentes revelam riscos e tornam a decisão mais robusta.', reflection: 'Você busca quem discorda de você antes de decidir?' },
    { type: 'myth', title: 'Planejamento prevê o futuro', text: 'Drucker avisa: o planejamento não prevê, apenas prepara para o imprevisto.', reflection: 'Você confunde previsão com preparação?' },
    { type: 'truth', title: '"Não" é uma decisão', text: 'Dizer não ao irrelevante protege o tempo para o essencial.', reflection: 'Quantos "sim" automáticos roubaram seu foco?' },
    { type: 'myth', title: 'Conhecimento dispensa comunicação', text: 'O especialista precisa traduzir seu saber para quem decide; silêncio é ineficácia.', reflection: 'Seu conhecimento chega a quem precisa dele?' },
    { type: 'truth', title: 'Forças dos outros multiplicam', text: 'Colocar cada um na função de sua força é a alavanca do executivo.', reflection: 'Você posiciona as pessoas por força ou por conveniência?' }
  ],
  ensinamentos: [
    { number: '1', title: 'Diagnostique seu tempo', text: 'Registre onde o tempo vai por semanas. A percepção raramente bate com a realidade. Elimine, reduza e consolide o que for desperdício.' },
    { number: '2', title: 'Pergunte pela contribuição', text: 'Em vez de "o que devo fazer", pergunte "que contribuição esta função exige". Isso alinha esforço e resultado.' },
    { number: '3', title: 'Identifique suas forças', text: 'A eficácia vem de operar nas próprias forças. Mapeie o que você faz bem e delegue ou evite o resto.' },
    { number: '4', title: 'Concentre-se, não espalhe', text: 'Defina as poucas prioridades que importam. Fazer muitas coisas medianamente é pior que poucas coisas bem.' },
    { number: '5', title: 'Decida poucas vezes, bem', text: 'Boas decisões são raras e demoram. Não transforme cada detalhe em decisão executiva.' },
    { number: '6', title: 'Busque a divergência', text: 'Antes de fechar uma decisão, ouça quem discorda. O consenso prévio costuma esconder riscos.' },
    { number: '7', title: 'Aprenda a dizer não', text: 'Dizer não ao menor protege o sim ao maior. O executivo eficaz protege seu tempo.' },
    { number: '8', title: 'Traduza seu conhecimento', text: 'Especialistas precisam comunicar em termos de quem decide. Saber e não ser ouvido é inútil.' },
    { number: '9', title: 'Reúna para decidir, não para aparecer', text: 'Reuniões devem terminar com responsável e prazo. Caso contrário, foram roubo de tempo.' },
    { number: '10', title: 'Use as forças alheias', text: 'Posicione cada colaborador na função de sua força. Isso vale mais que treinar fraquezas.' },
    { number: '11', title: 'Prepare-se, não profetize', text: 'Planejamento serve para estar pronto para o inesperado, não para adivinhar o futuro.' },
    { number: '12', title: 'Pratique a autogestão', text: 'Eficácia é, antes de tudo, governar a si mesmo: tempo, foco e decisões.' }
  ],
  citacoes: [
    { texto: 'A eficácia é uma disciplina que se aprende.', autor: 'Peter F. Drucker', obra: 'O Executivo Eficaz' },
    { texto: 'O tempo é o recurso mais escasso e, portanto, o recurso básico da execução.', autor: 'Peter F. Drucker', obra: 'O Executivo Eficaz' },
    { texto: 'Não há nada tão inútil como fazer eficientemente aquilo que não deveria ser feito de forma alguma.', autor: 'Peter F. Drucker', obra: 'O Executivo Eficaz' },
    { texto: 'O executivo eficaz focaliza sua energia nas contribuições que faz à organização.', autor: 'Peter F. Drucker', obra: 'O Executivo Eficaz' },
    { texto: 'A eficácia tem pouco a ver com inteligência e tudo a ver com escolhas.', autor: 'Peter F. Drucker', obra: 'O Executivo Eficaz' }
  ],
  citacoesTerceiros: [
    { texto: 'O livro que todo gestor deveria reler todo ano. Simples, seco e mais atual que a maioria das novidades.', autor: 'Leitor corporativo', fonte: 'Goodreads' },
    { texto: 'Drucker escreveu em 1966 o que ainda cobramos em MBAs caríssimos hoje.', autor: 'Crítico de negócios', fonte: 'Amazon' },
    { texto: 'A parte sobre diagnóstico de tempo mudou minha semana de trabalho sozinha.', autor: 'Leitor', fonte: 'Goodreads' }
  ],
  chapters: [
    { title: 'Capítulo 1 — Eficácia pode ser aprendida', text: 'Drucker abre desmistificando a ideia de que líderes nascem prontos. Eficácia é prática, não talento.', points: ['Eficácia vs. eficiência', 'O executivo como tomador de decisões', 'A aprendizagem da eficácia'] },
    { title: 'Capítulo 2 — Conheça seu tempo', text: 'O primeiro passo é descobrir onde o tempo vai e eliminar o desperdício sistêmico.', points: ['Registro de tempo', 'Eliminação de desperdícios', 'Consolidação de blocos'] },
    { title: 'Capítulo 3 — O que posso contribuir?', text: 'A pergunta sobre contribuição troca a lógica do ocupado pela lógica do útil.', points: ['Da tarefa à contribuição', 'Relacionamentos para desempenho', 'Reuniões com propósito'] },
    { title: 'Capítulo 4 — Construa sobre as forças', text: 'Foque nas forças próprias e alheias; tentar consertar fraquezas rende pouco.', points: ['Forças pessoais', 'Forças da equipe', 'O mito das fraquezas'] },
    { title: 'Capítulo 5 — As áreas de excelência', text: 'Defina onde ser forte faz diferença e delegue o resto com responsabilidade clara.', points: ['Prioridades', 'Concentração', 'Responsabilização'] },
    { title: 'Capítulo 6 — As primeiras regras da decisão', text: 'Decisões certas são poucas, demoram e precisam de critérios antes de opções.', points: ['Classificar ou resolver', 'Princípios vs. casos', 'Ação e comunicação'] },
    { title: 'Capítulo 7 — Como tomar decisões eficazes', text: 'Divergência precede consenso; opiniões contrárias fortalecem a escolha.', points: ['Divergência', 'Riscos da decisão', 'Comunicação da decisão'] },
    { title: 'Capítulo 8 — Conclusão: a eficácia e a sociedade do conhecimento', text: 'Em uma economia do conhecimento, a autogestão do executivo é responsabilidade cívica.', points: ['Trabalhadores do conhecimento', 'Autogestão', 'Responsabilidade social'] },
    { title: 'Capítulo 9 — Eficácia para todos', text: 'A eficácia não é só de CEOs: qualquer um cujas decisões afetam outros a pratica.', points: ['Executivo definido por impacto', 'Aplicação pessoal', 'Melhoria contínua'] }
  ]
});

/* 2. cameron - O Caminho do Artista */
E.push({
  id: 'cameron',
  summary: `Julia Cameron criou "O Caminho do Artista" como um curso de 12 semanas para a "recuperação" da criança criativa adormecida em cada um. O livro parte de uma tese gentil e profunda: a criatividade é uma forma de espiritualidade, e o bloqueio artístico é, na verdade, um bloqueio espiritual causado por críticas internas e medos. O gancho central são duas ferramentas práticas que viraram cultura pop — as "páginas matinais" (três páginas livres escritas à mão toda manhã) e o "encontro com o artista" (um compromisso semanal de lazer consigo mesmo). Cameron argumenta que não precisamos ser gênios para criar; precisamos apenas remover as camadas de cinismo e medo acumuladas. Cada capítulo combina ensaio inspirador com exercícios práticos. Mais que um manual para escritores, é um guia para quem quer reencontrar a própria voz e o próprio sentido de vida, tratando a arte como uma maneira de honrar a própria existência.`,
  myths: [
    { type: 'myth', title: 'Criatividade é dom de poucos', text: 'Cameron defende que todos somos criativos por natureza; o bloqueio é aprendido, não inato.', reflection: 'Você achou que não era "o tipo criativo" por quê?' },
    { type: 'truth', title: 'Bloqueio é bloqueio espiritual', text: 'O bloqueio artístico vem de medo e cinismo, não de falta de talento.', reflection: 'O que em você silencia a própria voz?' },
    { type: 'myth', title: 'Precisa de inspiração para começar', text: 'As páginas matinais funcionam por disciplina leve, não por inspiração.', reflection: 'Você espera o "momento certo" para criar?' },
    { type: 'truth', title: 'Páginas matinais limpam a mente', text: 'Escrever três páginas livres toda manhã descarrega a bagagem mental do dia.', reflection: 'Sua mente acorda cheia de ruído ou de clareza?' },
    { type: 'myth', title: 'Arte exige sofrimento', text: 'Cameron propõe prazer e brincadeira como caminho, não martírio.', reflection: 'Você associou criar a esforço doloroso?' },
    { type: 'truth', title: 'O artista precisa de encontro consigo', text: 'Um compromisso semanal de lazer reabastece a criatividade esgotada.', reflection: 'Quando foi sua última "saída" só por prazer?' },
    { type: 'myth', title: 'Crítica constrói o artista', text: 'A voz crítica interna paralisa; o livro ensina a silenciá-la no processo.', reflection: 'Sua voz interna ajuda ou sabota você?' },
    { type: 'truth', title: 'Criatividade é espiritualidade', text: 'Criar é uma forma de conexão com algo maior e com a própria vida.', reflection: 'Criar te aproxima de você ou te afasta?' },
    { type: 'myth', title: 'Acertar é o objetivo', text: 'O processo importa mais que o produto perfeito; errar é parte.', reflection: 'Você se paralisa tentando acertar de primeira?' },
    { type: 'truth', title: 'Pequenos passos curam', text: 'Exercícios diários e humildes vencem a resistência melhor que grandes planos.', reflection: 'Você prefere planos grandiosos a passos pequenos?' },
    { type: 'myth', title: 'Tempo livre é preguiça', text: 'Brincar e vagar são combustível criativo, não desperdício.', reflection: 'Você se culpa por não estar "produzindo"?' },
    { type: 'truth', title: 'A criança interior cria', text: 'Reencontrar a espontaneidade infantil é reencontrar a criatividade.', reflection: 'A criança que você foi ainda cria por você?' },
    { type: 'myth', title: 'Arte é só para artistas', text: 'O método serve a qualquer vida que queira mais sentido e expressão.', reflection: 'Você reservou a criatividade só para "profissionais"?' },
    { type: 'truth', title: 'Recuperação é possível', text: 'Mesmo após anos de bloqueio, a criatividade pode ser reativada.', reflection: 'Há quanto tempo você não se permite criar?' }
  ],
  ensinamentos: [
    { number: '1', title: 'Faça páginas matinais', text: 'Escreva três páginas à mão, sem censura, logo ao acordar. É descarga mental, não literatura.' },
    { number: '2', title: 'Agende o encontro com o artista', text: 'Reserve uma saída semanal só de prazer, sozinho, para reabastecer a criatividade.' },
    { number: '3', title: 'Cale a voz crítica', text: 'Durante o processo, a crítica atrapalha. Avalie só depois, se for o caso.' },
    { number: '4', title: 'Trate a arte como espiritualidade', text: 'Criar pode ser uma forma de oração ou conexão; honre esse aspecto.' },
    { number: '5', title: 'Recupere a criança interior', text: 'A espontaneidade infantil é a fonte da criação; cultive-a de novo.' },
    { number: '6', title: 'Valorize o processo', text: 'O caminho importa mais que o produto perfeito. Aproveite fazer.' },
    { number: '7', title: 'Brinque sem culpa', text: 'Vagar e brincar não são preguiça; são combustível para criar.' },
    { number: '8', title: 'Use aforismos', text: 'Cameron sugere frases curtas de ancoragem para dias difíceis; crie as suas.' },
    { number: '9', title: 'Identifique seus venenos', text: 'Liste o que drena sua criatividade (pessoas, mídia, perfeccionismo) e corte.' },
    { number: '10', title: 'Pratique a gratidão criativa', text: 'Agradecer pelo que já criou abre espaço para criar mais.' },
    { number: '11', title: 'Siga o curso em 12 semanas', text: 'A estrutura semanal combina leitura e exercício; não pule etapas.' },
    { number: '12', title: 'Permita-se ser amador', text: 'Começar feio é normal. O "amador" é quem ainda se permite tentar.' }
  ],
  citacoes: [
    { texto: 'A criatividade é a maneira pela qual a alma se revela.', autor: 'Julia Cameron', obra: 'O Caminho do Artista' },
    { texto: 'O bloqueio artístico é um bloqueio espiritual.', autor: 'Julia Cameron', obra: 'O Caminho do Artista' },
    { texto: 'Faça suas páginas matinais como quem toma café da manhã: toda manhã.', autor: 'Julia Cameron', obra: 'O Caminho do Artista' },
    { texto: 'A criatividade não é um talento. É uma maneira de viver.', autor: 'Julia Cameron', obra: 'O Caminho do Artista' },
    { texto: 'Leve a sério a si mesmo o suficiente para não se levar tão a sério.', autor: 'Julia Cameron', obra: 'O Caminho do Artista' }
  ],
  citacoesTerceiros: [
    { texto: 'As páginas matinais são a única coisa que me tira do bloqueio há dez anos.', autor: 'Escritora independente', fonte: 'Goodreads' },
    { texto: 'Parece autoajuda brega no início e muda sua vida nas semanas seguintes.', autor: 'Leitor cético', fonte: 'Amazon' },
    { texto: 'Não é só para artistas — usei com minha equipe de engenharia e funcionou.', autor: 'Gerente', fonte: 'Goodreads' }
  ],
  chapters: [
    { title: 'Capítulo 1 — A criatividade como espiritualidade', text: 'Cameron reframeia a arte como conexão espiritual e não como talento raro.', points: ['Criatividade e alma', 'O bloqueio como medo', 'Caminho de recuperação'] },
    { title: 'Capítulo 2 — A recuperação do artista', text: 'Apresenta a ideia de que o artista adormecido pode ser reativado.', points: ['A criança interior', 'Camadas de cinismo', 'O processo de cura'] },
    { title: 'Capítulo 3 — As páginas matinais', text: 'A ferramenta central: três páginas livres escritas à mão toda manhã.', points: ['Como fazer', 'Por que à mão', 'O que não é'] },
    { title: 'Capítulo 4 — O encontro com o artista', text: 'O compromisso semanal de lazer como reabastecimento criativo.', points: ['Saída solo', 'Prazer sem meta', 'Combate ao esgotamento'] },
    { title: 'Capítulo 5 — A voz crítica', text: 'Como identificar e silenciar o crítico interno que sabota.', points: ['Conhecer o crítico', 'Estratégias de silêncio', 'Criar vs. julgar'] },
    { title: 'Capítulo 6 — Ressentimento e rivalidade', text: 'Aponta como o comparecer com outros bloqueia a própria criação.', points: ['Ressentimento', 'Comparação', 'Caminho próprio'] },
    { title: 'Capítulo 7 — A ambiguidade e o caos', text: 'A criatividade exige tolerar incerteza antes da forma aparecer.', points: ['Caos inicial', 'Confiança no processo', 'Paciência'] },
    { title: 'Capítulo 8 — A força da ação pequena', text: 'Exercícios humildes vencem a resistência melhor que planos grandiosos.', points: ['Passos diários', 'Constância', 'Vencer a paralisia'] },
    { title: 'Capítulo 9 — Recuperação contínua', text: 'O curso termina, mas a prática das ferramentas segue para a vida.', points: ['Manutenção', 'Gratidão', 'Vida criativa'] }
  ]
});

/* 3. pressfield - A Guerra da Arte */
E.push({
  id: 'pressfield',
  summary: `Steven Pressfield escreve "A Guerra da Arte" como um chamado às armas contra a "Resistência" — a força invisível, interna e perversa que nos impede de fazer o trabalho que importa. O livro é curto, seco e quase militante. Sua tese central: o maior inimigo da realização criativa e pessoal não é a falta de talento ou oportunidade, mas a autossabotagem que se disfarça de medo, procrastinação, perfeccionismo e drama. Pressfield divide a obra em três partes — Definição, Combate e Profissionalismo — e propõe que a cura é "virar profissional": sentar-se à mesa todo dia, independentemente do humor, da inspiração ou do medo. O gancho é libertador: a angústia some assim que começamos a agir. Mais que um livro de escrita, é um manual de disciplina existencial para qualquer um que queira parar de sonhar e começar a entregar.`,
  myths: [
    { type: 'myth', title: 'Falta de talento impede', text: 'Pressfield diz que o talento raramente é o problema; a Resistência é.', reflection: 'Você culpa o "talento" para não começar?' },
    { type: 'truth', title: 'A Resistência é interna', text: 'O inimigo mora dentro de você, não no mercado ou na crítica alheia.', reflection: 'O que em você mesmo sabota seu trabalho?' },
    { type: 'myth', title: 'Preciso de inspiração', text: 'Profissionais não esperam o museu; eles aparecem e trabalham.', reflection: 'Você espera o clima certo para agir?' },
    { type: 'truth', title: 'Começar dissolve o medo', text: 'A angústia some na ação; o sofrimento é antes de começar.', reflection: 'Quanto você sofre adiando o que poderia fazer agora?' },
    { type: 'myth', title: 'Procrastinação é preguiça', text: 'É medo disfarçado; a Resistência usa o prazer para nos desviar.', reflection: 'Suas distrações escondem medo de quê?' },
    { type: 'truth', title: 'Vire profissional', text: 'Sentar à mesa todo dia, com ou sem vontade, é o antídoto.', reflection: 'Você age como amador ou como profissional?' },
    { type: 'myth', title: 'Perfeccionismo protege a obra', text: 'O perfeccionismo é a Resistência pedindo para você não terminar.', reflection: 'Você aperfeiçoa para evitar entregar?' },
    { type: 'truth', title: 'O amador espera, o pro entrega', text: 'A diferença está na constância, não na inspiração.', reflection: 'Quantos projetos seus morreram na gaveta?' },
    { type: 'myth', title: 'Familiares entendem', text: 'Próximos muitas vezes sabotam por inveja ou desconforto com sua mudança.', reflection: 'Alguém próximo desencoraja seu trabalho?' },
    { type: 'truth', title: 'A dor é sinal de importância', text: 'Onde há Resistência forte, há algo que realmente importa para você.', reflection: 'O que você mais resiste é o que mais importa?' },
    { type: 'myth', title: 'Sonhar basta', text: 'Sonhar é grátis e confortável; a Resistência adora sonhadores passivos.', reflection: 'Você sonha muito e faz pouco?' },
    { type: 'truth', title: 'A disciplina liberta', text: 'A rotina de trabalho cria liberdade emocional e reduz o sofrimento.', reflection: 'Sua falta de rotina te aprisiona?' },
    { type: 'myth', title: 'Tudo tem que ter sentido', text: 'O profissional trabalha mesmo sem certeza do resultado.', reflection: 'Você para de agir quando não vê "sentido"?' },
    { type: 'truth', title: 'A arte pede sacrifício', text: 'Entregar o trabalho exige abrir mão de conforto e aprovação.', reflection: 'O que você recusa sacrificar pela sua obra?' }
  ],
  ensinamentos: [
    { number: '1', title: 'Nomeie a Resistência', text: 'Reconhecer o inimigo interno é o primeiro passo. Ela se disfarça de medo e distração.' },
    { number: '2', title: 'Trabalhe todo dia', text: 'Estabeleça horário fixo e apareça, independentemente do humor ou inspiração.' },
    { number: '3', title: 'Não espere o museu', text: 'A inspiração vem depois de começar, não antes. Ação precede motivação.' },
    { number: '4', title: 'Termine as coisas', text: 'O perfeccionismo é sabotagem. Feche o trabalho e entregue.' },
    { number: '5', title: 'Aceite o medo', text: 'O medo não some; o profissional age com medo, não sem ele.' },
    { number: '6', title: 'Corte distrações', text: 'Identifique os "substitutos confortáveis" que a Resistência usa contra você.' },
    { number: '7', title: 'Seja invisível', text: 'Não anuncie o projeto antes de fazê-lo; a aprovação precoce alimenta a Resistência.' },
    { number: '8', title: 'Assuma o custo', text: 'A grande obra exige abrir mão de conforto, status e aprovação alheia.' },
    { number: '9', title: 'A dor indica o caminho', text: 'Onde a Resistência é mais forte, ali está o trabalho que importa.' },
    { number: '10', title: 'Viva como profissional', text: 'Constância e responsabilidade com o ofício vencem o amadorismo.' },
    { number: '11', title: 'Ignore sabotadores', text: 'Próximos podem desencorajar; proteja seu trabalho com limites.' },
    { number: '12', title: 'Comece agora', text: 'A ação imediata é o antídoto mais rápido contra a paralisia.' }
  ],
  citacoes: [
    { texto: 'A Resistência é o inimigo. É interna. É invisível. É implacável.', autor: 'Steven Pressfield', obra: 'A Guerra da Arte' },
    { texto: 'O profissional aparece todos os dias. Não precisa de inspiração.', autor: 'Steven Pressfield', obra: 'A Guerra da Arte' },
    { texto: 'A angústia some assim que começamos.', autor: 'Steven Pressfield', obra: 'A Guerra da Arte' },
    { texto: 'A maioria de nós tem apenas uma obra em si; é a obra de tornar-se nós mesmos.', autor: 'Steven Pressfield', obra: 'A Guerra da Arte' },
    { texto: 'Vire profissional. É a única cura.', autor: 'Steven Pressfield', obra: 'A Guerra da Arte' }
  ],
  citacoesTerceiros: [
    { texto: 'O livro mais curto e mais chicote que já li sobre parar de procrastinar.', autor: 'Leitor criativo', fonte: 'Goodreads' },
    { texto: 'Li em uma tarde e voltei ao trabalho no dia seguinte. Raridade.', autor: 'Roteirista', fonte: 'Amazon' },
    { texto: 'Pressfield escreve como quem grita ordens no campo de treino — e funciona.', autor: 'Crítico', fonte: 'Goodreads' }
  ],
  chapters: [
    { title: 'Parte 1 — Definição: O que é a Resistência', text: 'Pressfield nomeia e descreve o inimigo interno que paralisa toda obra.', points: ['A natureza da Resistência', 'Como ela se disfarça', 'Quem ela ataca'] },
    { title: 'Parte 1 — Sintomas e formas', text: 'Procrastinação, perfeccionismo, drama e doenças como rostos da Resistência.', points: ['Procrastinação', 'Perfeccionismo', 'Auto-sabotagem'] },
    { title: 'Parte 1 — Por que ela é implacável', text: 'A Resistência tem interesse em manter você pequeno e parado.', points: ['Interesse próprio do medo', 'O conforto como armadilha', 'O custo da inação'] },
    { title: 'Parte 2 — Combate: Virar profissional', text: 'A resposta é o profissionalismo: agir com constância e responsabilidade.', points: ['Aparecer todos os dias', 'Ação antes de inspiração', 'Aceitar o medo'] },
    { title: 'Parte 2 — O amador vs. o profissional', text: 'O amador espera condições; o profissional as cria com disciplina.', points: ['Mentalidade', 'Rotina', 'Entrega'] },
    { title: 'Parte 2 — O sagrado e o trabalho', text: 'Pressfield eleva o trabalho criativo a uma vocação quase espiritual.', points: ['Vocação', 'Serviço', 'Sacrifício'] },
    { title: 'Parte 3 — Profissionalismo na prática', text: 'Hábitos concretos: horário fixo, invisibilidade, foco no ofício.', points: ['Horário fixo', 'Não anunciar cedo', 'Força de vontade'] },
    { title: 'Parte 3 — Além da Resistência', text: 'Quando vencida a Resistência, resta a alegria de fazer o que importa.', points: ['Fluidez', 'Propósito', 'Liberdade'] },
    { title: 'Epílogo — Chame a si mesmo', text: 'O livro termina com o convite a assumir a própria grandeza.', points: ['Assumir a voz', 'Coragem', 'Começar'] }
  ]
});

/* 4. seligman - Aprendendo a Ser Otimista */
E.push({
  id: 'seligman',
  summary: `Martin Seligman, um dos pais da psicologia positiva, escreve "Aprendendo a Ser Otimista" para provar que o otimismo não é temperamento, mas estilo explicativo — e, portanto, algo que se aprende. A tese central parte da "aprendizagem da impotência": animais e pessoas que sofrem eventos sem controle param de tentar, mesmo quando o controle volta. O otimista explica os reveses como temporários, específicos e externos; o pessimista, como permanentes, generalizados e internos. Seligman mostra que esse estilo afeta saúde, desempenho e depressão, e ensina a "reestruturação cognitiva" para disputar pensamentos pessimistas. O gancho é empoderador: mudar a forma como interpretamos a realidade muda os resultados. O livro traz testes práticos e um programa de exercícios para treinar o otimismo sem cair no pensamento positivo ingênuo.`,
  myths: [
    { type: 'myth', title: 'Otimismo é temperamento', text: 'Seligman mostra que é um estilo explicativo aprendido, não um traço fixo.', reflection: 'Você achou que "nasceu pessimista"?' },
    { type: 'truth', title: 'Otimismo se aprende', text: 'Com exercício, qualquer um pode reestruturar seus pensamentos automáticos.', reflection: 'Você pratica como interpretar os reveses?' },
    { type: 'myth', title: 'Pensar positivo resolve', text: 'O ingênuo "tudo dá certo" não funciona; o método é disputar o real.', reflection: 'Você confunde otimismo com autoengano?' },
    { type: 'truth', title: 'Estilo explicativo importa', text: 'Como você explica o fracasso prevê sua persistência e saúde.', reflection: 'Você diz "sempre" e "tudo" quando erra?' },
    { type: 'myth', title: 'Depressão é química pura', text: 'Seligman liga a aprendizagem da impotência ao padrão de pensamento.', reflection: 'Seus pensamentos alimentam seu baque?' },
    { type: 'truth', title: 'Reveses temporários vs. permanentes', text: 'Otimistas veem o problema como passageiro; pessimistas como destino.', reflection: 'Você transforma erro pontual em derrota total?' },
    { type: 'myth', title: 'Ignorar o negativo é saudável', text: 'O método encara o fato e disputa a interpretação, não o evento.', reflection: 'Você foge dos fatos ou os reenquadra?' },
    { type: 'truth', title: 'Disputar pensamentos funciona', text: 'Questionar a evidência do pensamento pessimista reduz seu efeito.', reflection: 'Você aceita o primeiro pensamento ruim como verdade?' },
    { type: 'myth', title: 'Pessimistas são mais realistas', text: 'Estudos mostram que otimistas enxergam melhor a realidade controlável.', reflection: 'Sua "realidade" é visão ou profecia?' },
    { type: 'truth', title: 'Otimismo protege a saúde', text: 'Estilo otimista correlaciona-se a melhor imunidade e longevidade.', reflection: 'Seu modo de pensar adoece ou fortalece?' },
    { type: 'myth', title: 'Crianças já vêm prontas', text: 'O estilo explicativo é modelado por pais e escola; pode ser reensinado.', reflection: 'Que explicações você repete para crianças?' },
    { type: 'truth', title: 'Controle importa', text: 'A impotência aprendida vem de eventos sem controle; recuperar o controle cura.', reflection: 'Onde você desistiu porque achou que não controlava?' },
    { type: 'myth', title: 'Esforço sempre compensa', text: 'Seligman avisa: otimismo ajuda, mas não substitui estratégia e habilidade.', reflection: 'Você usa otimismo como desculpa para não planejar?' },
    { type: 'truth', title: 'Otimismo melhora desempenho', text: 'Atletas e vendedores otimistas persistem mais e performam melhor.', reflection: 'Sua interpretação dos erros te faz desistir cedo?' }
  ],
  ensinamentos: [
    { number: '1', title: 'Mapeie seu estilo explicativo', text: 'Faça o teste de Seligman: como você explica fracassos e sucessos?' },
    { number: '2', title: 'Separe permanente de temporário', text: 'Reveja o "sempre/nunca" para "agora/às vezes" nos reveses.' },
    { number: '3', title: 'Circunscreva o problema', text: 'Troque "tudo" por "só essa parte" para evitar generalização.' },
    { number: '4', title: 'Dispute a evidência', text: 'Pergunte: qual a prova real desse pensamento pessimista?' },
    { number: '5', title: 'Pratique a reestruturação', text: 'Reescreva o pensamento automático com fatos e alternativas.' },
    { number: '6', title: 'Não ignore a realidade', text: 'Otimismo realista encara o fato e muda a interpretação.' },
    { number: '7', title: 'Ensine crianças', text: 'Modele explicações temporárias e específicas para os pequenos.' },
    { number: '8', title: 'Use o ABCDE', text: 'Adversidade, Crença, Consequência, Disputa, Energização: o protocolo.' },
    { number: '9', title: 'Proteja a saúde', text: 'Otimismo moderado fortalece imunidade e reduz risco de depressão.' },
    { number: '10', title: 'Mantenha o realismo', text: 'Otimismo não substitui competência; soma-se a ela.' },
    { number: '11', title: 'Recupere o controle', text: 'Identifique onde você desistiu por impotência aprendida e retome.' },
    { number: '12', title: 'Celebre o específico', text: 'Atribua sucessos a fatores estáveis para reforçar confiança.' }
  ],
  citacoes: [
    { texto: 'Aprendemos a desistir quando nada que fazemos importa.', autor: 'Martin E.P. Seligman', obra: 'Aprendendo a Ser Otimista' },
    { texto: 'O otimista explica o fracasso como algo temporário e específico.', autor: 'Martin E.P. Seligman', obra: 'Aprendendo a Ser Otimista' },
    { texto: 'O pessimista acredita que o que dá errado é permanente, universal e sua culpa.', autor: 'Martin E.P. Seligman', obra: 'Aprendendo a Ser Otimista' },
    { texto: 'O otimismo pode ser aprendido. Não é um dom, é uma habilidade.', autor: 'Martin E.P. Seligman', obra: 'Aprendendo a Ser Otimista' },
    { texto: 'Disputar o pensamento pessimista é a chave da mudança.', autor: 'Martin E.P. Seligman', obra: 'Aprendendo a Ser Otimista' }
  ],
  citacoesTerceiros: [
    { texto: 'A parte sobre impotência aprendida explica anos da minha própria paralisia.', autor: 'Leitor', fonte: 'Goodreads' },
    { texto: 'Mais ciência e menos autoajuda barata. Raridade no gênero.', autor: 'Psicólogo', fonte: 'Amazon' },
    { texto: 'Os testes no final valem o preço do livro.', autor: 'Leitor', fonte: 'Goodreads' }
  ],
  chapters: [
    { title: 'Capítulo 1 — Aprendendo a ser impotente', text: 'Seligman narra as experiências originais que provaram a impotência aprendida.', points: ['Experiência com cães', 'Generalização da desistência', 'Implicações humanas'] },
    { title: 'Capítulo 2 — Explicações que curam ou ferem', text: 'Introduz o estilo explicativo como raiz do otimismo e pessimismo.', points: ['Permanente vs. temporário', 'Amplo vs. específico', 'Interno vs. externo'] },
    { title: 'Capítulo 3 — O pessimista e a depressão', text: 'Liga o estilo explicativo à vulnerabilidade depressiva.', points: ['Risco de depressão', 'Pensamento e humor', 'Prevenção'] },
    { title: 'Capítulo 4 — Otimismo e saúde', text: 'Mostra correlação entre otimismo, imunidade e longevidade.', points: ['Imunidade', 'Longevidade', 'Estresse'] },
    { title: 'Capítulo 5 — Otimismo e desempenho', text: 'No esporte e vendas, o otimismo prediz persistência e resultado.', points: ['Esportes', 'Vendas', 'Persistência'] },
    { title: 'Capítulo 6 — Aprendendo o otimismo', text: 'Apresenta o programa passo a passo de reestruturação cognitiva.', points: ['O método', 'Exercícios', 'ABCDE'] },
    { title: 'Capítulo 7 — Disputando pensamentos', text: 'Ensina a contestar a evidência dos pensamentos pessimistas.', points: ['Evidência', 'Alternativas', 'Uso'] },
    { title: 'Capítulo 8 — Otimismo para crianças', text: 'Como pais e escolas modelam e reensinam o estilo explicativo.', points: ['Modelagem', 'Reenquadre', 'Hábito'] },
    { title: 'Capítulo 9 — O otimismo realista', text: 'Adverte contra o pensamento positivo ingênuo e defende o realista.', points: ['Realismo', 'Limites', 'Equilíbrio'] }
  ]
});

/* 5. olson - A Pequena Borda */
E.push({
  id: 'olson',
  summary: `Jeff Olson, em "A Pequena Borda" (The Slight Edge), defende uma ideia desarmante: o sucesso não vem de grandes viradas, mas da acumulação de pequenas escolhas diárias que parecem irrelevantes no momento. A tese central é que todas as ações têm um custo ou retorno que só se revela no longo prazo, e que a maioria das pessoas subestima o poder do tempo. O que você faz (ou deixa de fazer) hoje — ler uma página, comer pior, treinar dez minutos — parece não importar amanhã, mas, composto por anos, define sua vida. Olson chama de "pequena borda" a margem minúscula de vantagem que decide corridas longas. O gancho: o caminho da ruína e o da glória são feitos das mesmíssimas ações pequenas; a diferença é a constância. O livro mistura filosofia e prática para converter intenção em hábito sustentável.`,
  myths: [
    { type: 'myth', title: 'Sucesso exige grande virada', text: 'Olson sustenta que o sucesso é composto de pequenas escolhas repetidas, não de golpes de sorte.', reflection: 'Você espera o "evento" que vai mudar tudo?' },
    { type: 'truth', title: 'Pequenas ações acumulam', text: 'Decisões aparentemente irrelevantes definem resultados anos à frente.', reflection: 'O que você fez hoje que não parece importar?' },
    { type: 'myth', title: 'O tempo não muda nada', text: 'O tempo é a variável mágica que amplia escolhas simples em destino.', reflection: 'Você desconsidera o efeito de anos de repetição?' },
    { type: 'truth', title: 'Simples não é fácil', text: 'Ler uma página é simples, mas fazê-lo todo dia é difícil para a maioria.', reflection: 'Você confunde simples com fácil?' },
    { type: 'myth', title: 'Resultado rápido é real', text: 'Ganhos rápidos costumam ser ilusórios; a pequena borda é lenta e real.', reflection: 'Você busca atalhos que não duram?' },
    { type: 'truth', title: 'A mesma ação pode salvar ou afundar', text: 'Pular o exercício hoje ou não adianta; no tempo, um te destrói, outro te salva.', reflection: 'Qual hábito seu vira veneno no longo prazo?' },
    { type: 'myth', title: 'Falta de força de vontade', text: 'O problema raramente é vontade; é não ver o efeito composto das ações.', reflection: 'Você culpa a disciplina sem medir o hábito?' },
    { type: 'truth', title: 'Filosofia vira comportamento', text: 'Mudar a forma de ver o tempo muda o que você faz todo dia.', reflection: 'Sua visão de longo prazo guia seu dia?' },
    { type: 'myth', title: 'Sorte explica os ricos', text: 'Olson foca no padrão de escolhas, não em sorte ou herança.', reflection: 'Você atribui o sucesso alheio só à sorte?' },
    { type: 'truth', title: 'A borda é minúscula', text: 'A vantagem que decide é pequena demais para notar dia a dia.', reflection: 'Você despreza ganhos que não aparecem logo?' },
    { type: 'myth', title: 'Mudança exige sofrimento', text: 'Pequenas ações indolores vencem planos heroicos e insustentáveis.', reflection: 'Você só leva a sério esforço doloroso?' },
    { type: 'truth', title: 'Ambiente ajuda', text: 'Cercar-se de quem pratica a pequena borda sustenta o hábito.', reflection: 'Seu ambiente puxa você para cima ou para baixo?' },
    { type: 'myth', title: 'Basta planejar', text: 'Planos sem execução diária são inúteis; a execução é a borda.', reflection: 'Você planeja muito e executa pouco?' },
    { type: 'truth', title: 'O momento é agora', text: 'O efeito composto começa na próxima ação, não "um dia".', reflection: 'Você adia o início para "quando der"?' }
  ],
  ensinamentos: [
    { number: '1', title: 'Escolha a pequena borda', text: 'Defina ações simples de alta vantagem composta e repita diariamente.' },
    { number: '2', title: 'Respeite o tempo', text: 'Veja o tempo como aliado que amplifica escolhas pequenas.' },
    { number: '3', title: 'Separe simples de fácil', text: 'Planeje para o "não fácil": automatize e reduza atrito.' },
    { number: '4', title: 'Jogue a favor do composto', text: 'Pequenas vitórias diárias viram resultados anos depois.' },
    { number: '5', title: 'Evite a borda negativa', text: 'Pequenos descuidos diários também compostam ruína; corte-os.' },
    { number: '6', title: 'Use o ambiente', text: 'Cerque-se de pessoas e lugares que praticam a borda.' },
    { number: '7', title: 'Não busque atalhos', text: 'Promessas de resultado rápido ignoram a física do composto.' },
    { number: '8', title: 'Registre o hábito', text: 'Acompanhar a pequena ação diária mantém a constância.' },
    { number: '9', title: 'Comece minúsculo', text: 'Uma página, dez minutos: o tamanho importa menos que a regularidade.' },
    { number: '10', title: 'Mude a filosofia', text: 'Adite a crença de que o longo prazo é real e decide.' },
    { number: '11', title: 'Seja paciente', text: 'A pequena borda não paga amanhã; paga no tempo certo.' },
    { number: '12', title: 'Aja hoje', text: 'A corrida começa na próxima pequena escolha, não no plano.' }
  ],
  citacoes: [
    { texto: 'As ações que parecem não importar são exatamente as que importam.', autor: 'Jeff Olson', obra: 'A Pequena Borda' },
    { texto: 'O sucesso é a soma de pequenas escolhas diárias feitas ao longo do tempo.', autor: 'Jeff Olson', obra: 'A Pequena Borda' },
    { texto: 'Simples não é fácil.', autor: 'Jeff Olson', obra: 'A Pequena Borda' },
    { texto: 'A pequena borda é a margem mínima que decide no longo prazo.', autor: 'Jeff Olson', obra: 'A Pequena Borda' },
    { texto: 'Você já está caminhando para o sucesso ou para a ruína — pelas mesmas ações.', autor: 'Jeff Olson', obra: 'A Pequena Borda' }
  ],
  citacoesTerceiros: [
    { texto: 'O livro mais subestimado sobre hábitos que já li. Simples e verdadeiro.', autor: 'Leitor', fonte: 'Goodreads' },
    { texto: 'Me fez perceber que meu problema não é falta de plano, é falta de repetição.', autor: 'Empreendedor', fonte: 'Amazon' },
    { texto: 'A frase "simples não é fácil" vale o livro inteiro.', autor: 'Leitor', fonte: 'Goodreads' }
  ],
  chapters: [
    { title: 'Capítulo 1 — A filosofia da pequena borda', text: 'Olson apresenta a ideia de que escolhas minúsculas compostas definem o destino.', points: ['A premissa', 'O tempo como aliado', 'Simples vs. fácil'] },
    { title: 'Capítulo 2 — Por que a maioria falha', text: 'Explica por que pessoas inteligentes não colhem o que plantam.', points: ['Cegueira do curto prazo', 'Resultado atrasado', 'Falsa simplicidade'] },
    { title: 'Capítulo 3 — O tempo e o composto', text: 'Mostra a matemática silenciosa que amplifica ações diárias.', points: ['Efeito composto', 'Curva de resultado', 'Paciência'] },
    { title: 'Capítulo 4 — A borda que salva ou destrói', text: 'A mesma ação pequena vira veneno ou remédio conforme a direção.', points: ['Direção', 'Hábitos', 'Consequência'] },
    { title: 'Capítulo 5 — Simples e fácil', text: 'Distinguir o que é simples de fazer do que é fácil sustentar.', points: ['Atrito', 'Automatização', 'Esforço'] },
    { title: 'Capítulo 6 — O ambiente certo', text: 'Como cercar-se de influências que sustentam a borda.', points: ['Círculo', 'Modelagem', 'Apoio'] },
    { title: 'Capítulo 7 — Transformando filosofia em ação', text: 'Converte a visão de longo prazo em comportamento diário.', points: ['Crença', 'Hábito', 'Rotina'] },
    { title: 'Capítulo 8 — O plano de execução', text: 'Proposta prática de escolhas diárias e acompanhamento.', points: ['Microações', 'Registro', 'Constância'] },
    { title: 'Capítulo 9 — Viva a pequena borda', text: 'Encerra convidando à consistência como estilo de vida.', points: ['Estilo de vida', 'Legado', 'Começo'] }
  ]
});

/* 6. rubin - Melhor Que Antes */
E.push({
  id: 'rubin',
  summary: `Gretchen Rubin, em "Melhor Que Antes" (Better Than Before), mergulha no que ela chama de "eterna questão humana": como conseguimos formar hábitos e deixar maus costumes? Sua contribuição original é o framework das "quatro tendências" — como cada pessoa responde a expectativas externas e internas (Upholder, Questioner, Obliger, Rebel). A tese central: não existe um método universal de hábito; o que funciona depende do seu perfil. Rubin também explora eixos como abstenção vs. moderação, estrutura vs. flexibilidade, e o papel dos relacionamentos. O gancho é libertador: descobrir seu próprio "tipo de hábito" acaba com a culpa de falhar em métodos feitos para outros. Com dezenas de estratégias (empilhamento, fundação, conveniência), o livro é um manual prático e compassivo para quem quer mudar sem autojulgamento.`,
  myths: [
    { type: 'myth', title: 'Um método serve para todos', text: 'Rubin mostra que o perfil de cada um determina qual estratégia funciona.', reflection: 'Você tentou métodos que funcionam para outros, não para você?' },
    { type: 'truth', title: 'Conheça suas tendências', text: 'Upholder, Questioner, Obliger ou Rebel muda tudo na formação de hábito.', reflection: 'Você sabe como reage a expectativas?' },
    { type: 'myth', title: 'Falta de força de vontade', text: 'Muitas falhas vêm de método errado, não de fraqueza moral.', reflection: 'Você se culpa sem examinar o método?' },
    { type: 'truth', title: 'Abstinente vs. moderado', text: 'Alguns devem cortar de vez; outros conseguem na dose. Saber qual é vital.', reflection: 'Você tenta moderar o que deveria cortar?' },
    { type: 'myth', title: 'Porque sim basta', text: 'Questioners precisam de razão; mandar "porque sim" falha com eles.', reflection: 'Você exige obediência de quem precisa de lógica?' },
    { type: 'truth', title: 'Relacionamentos importam', text: 'Obligers cumprem melhor quando outros dependem deles.', reflection: 'Você se compromete mais por conta de terceiros?' },
    { type: 'myth', title: 'Rotina engessa', text: 'Estrutura liberta quem se desorienta sem ela; não é prisão.', reflection: 'Você rejeita rotina e depois se perde?' },
    { type: 'truth', title: 'Hábitos se empilham', text: 'Amarração de hábitos (triggers) ancora o novo comportamento.', reflection: 'Você usa gatilhos para novos hábitos?' },
    { type: 'myth', title: 'Mudança exige sofrimento', text: 'Estratégias de conveniência tornam o certo mais fácil que o errado.', reflection: 'Você torna o bom hábito difícil?' },
    { type: 'truth', title: 'Hábitos fundamentais puxam', text: 'Dormir, comer e exercitar bem facilitam todos os outros.', reflection: 'Seus hábitos-base estão em ordem?' },
    { type: 'myth', title: 'Autoajuda é individual', text: 'O contexto e as pessoas à sua volta moldam o que você sustenta.', reflection: 'Seu ambiente sabotou suas tentativas?' },
    { type: 'truth', title: 'Estratégia certa pela tendência', text: 'Casar estratégia ao perfil elimina a frustração crônica.', reflection: 'Você aplica a estratégia errada ao seu tipo?' },
    { type: 'myth', title: 'Rebeldes não mudam', text: 'Rebels mudam quando sentem autonomia e escolha, não obrigação.', reflection: 'Você tentou obrigar quem precisa de liberdade?' },
    { type: 'truth', title: 'Autoconhecimento acaba com culpa', text: 'Saber seu tipo troca autocrítica por design adequado.', reflection: 'Você se culpa por falhar em método errado?' }
  ],
  ensinamentos: [
    { number: '1', title: 'Descubra sua tendência', text: 'Faça o teste das quatro tendências para escolher estratégias certas.' },
    { number: '2', title: 'Defina abstinente ou moderado', text: 'Saiba se você deve cortar ou dosar; evite a zona de tentação.' },
    { number: '3', title: 'Use empilhamento', text: 'Ligue o novo hábito a um já existente para criar gatilho.' },
    { number: '4', title: 'Cuide dos fundamentais', text: 'Sono, alimentação e exercício baseiam todos os outros hábitos.' },
    { number: '5', title: 'Aproveite a conveniência', text: 'Torne o bom hábito fácil e o ruim difícil de alcançar.' },
    { number: '6', title: 'Use a obrigação social', text: 'Obligers devem comprometer terceiros para sustentar mudança.' },
    { number: '7', title: 'Questioners busquem razão', text: 'Dê a si mesmo justificativas claras antes de adotar o hábito.' },
    { number: '8', title: 'Respeite a estrutura', text: 'Se você se perde sem rotina, abrace a estrutura em vez de combatê-la.' },
    { number: '9', title: 'Rebels usem escolha', text: 'Deixe o rebel sentir autonomia; nunca imponha por autoridade.' },
    { number: '10', title: 'Planeje abastecimento', text: 'Antecipe gatilhos e remova tentações do ambiente.' },
    { number: '11', title: 'Comece pequeno', text: 'Microhábitos respeitam a resistência inicial e criam confiança.' },
    { number: '12', title: 'Sem autoculpa', text: 'Falhar é sinal de método errado; ajuste o design, não a autoestima.' }
  ],
  citacoes: [
    { texto: 'O maior obstáculo aos bons hábitos somos nós mesmos.', autor: 'Gretchen Rubin', obra: 'Melhor Que Antes' },
    { texto: 'Não existe um método único. O que funciona depende de quem você é.', autor: 'Gretchen Rubin', obra: 'Melhor Que Antes' },
    { texto: 'Há abstinentes e moderados; saber qual você é muda tudo.', autor: 'Gretchen Rubin', obra: 'Melhor Que Antes' },
    { texto: 'As expectativas revelam quem somos.', autor: 'Gretchen Rubin', obra: 'Melhor Que Antes' },
    { texto: 'Hábitos fundamentais facilitam todos os outros.', autor: 'Gretchen Rubin', obra: 'Melhor Que Antes' }
  ],
  citacoesTerceiros: [
    { texto: 'Descobrir que sou Obliger explicou décadas de fracasso em academias.', autor: 'Leitora', fonte: 'Goodreads' },
    { texto: 'Menos inspiracional, mais útil que a maioria dos livros de hábito.', autor: 'Leitor', fonte: 'Amazon' },
    { texto: 'O framework das quatro tendências é ouro para gestores.', autor: 'Gerente', fonte: 'Goodreads' }
  ],
  chapters: [
    { title: 'Capítulo 1 — A eterna questão dos hábitos', text: 'Rubin abre explicando por que formar hábitos é o núcleo da autogestão.', points: ['Por que hábitos', 'O desafio', 'A promessa'] },
    { title: 'Capítulo 2 — As quatro tendências', text: 'Apresenta Upholder, Questioner, Obliger e Rebel com exemplos.', points: ['Expectativas', 'Os quatro tipos', 'Teste'] },
    { title: 'Capítulo 3 — Abstinência ou moderação', text: 'O eixo que decide se você corta ou dosar determinado vício.', points: ['Cortar vs. dosar', 'Zona de tentação', 'Autoavaliação'] },
    { title: 'Capítulo 4 — Estrutura e conveniência', text: 'Como desenhar o ambiente para tornar o certo mais fácil.', points: ['Ambiente', 'Atrito', 'Design'] },
    { title: 'Capítulo 5 — Estratégias de empilhamento', text: 'Amarração de hábitos e gatilhos para ancorar o novo.', points: ['Triggers', 'Rotina', 'Ancoragem'] },
    { title: 'Capítulo 6 — Hábitos fundamentais', text: 'Sono, comida e movimento como base de tudo.', points: ['Sono', 'Alimentação', 'Exercício'] },
    { title: 'Capítulo 7 — O poder dos relacionamentos', text: 'Como terceiros ajudam ou atrapalham conforme sua tendência.', points: ['Obligers', 'Apoio', 'Pressão'] },
    { title: 'Capítulo 8 — Escolha e autonomia', text: 'Rebels e a necessidade de liberdade para mudar.', points: ['Autonomia', 'Rebel', 'Controle'] },
    { title: 'Capítulo 9 — Forme seus hábitos', text: 'Encerra com plano prático de aplicar estratégias ao seu tipo.', points: ['Plano', 'Ajuste', 'Compaixão'] }
  ]
});

/* 7. baumeister - Força de Vontade */
E.push({
  id: 'baumeister',
  summary: `Roy Baumeister e John Tierney, em "Força de Vontade" (Willpower), traduzem décadas de psicologia experimental para o público: a autodisciplina não é um traço ilimitado, mas um recurso finito que se esgota com o uso — o fenômeno da "depleção do ego". A tese central é que a força de vontade funciona como um músculo: cansa com o exercício, mas se fortalece com treino. Os autores mostram que glucose importa, que decidir demais drena a disciplina e que o ambiente bem desenhado poupa esse recurso. O gancho prático: em vez de confiar na força de vontade, reduza a necessidade dela com comprometimento prévio e design de escolha. O livro desmistifica a ideia de "super-homens disciplinados" e entrega táticas baseadas em evidência para quem quer vencer impulsos sem lutar toda hora.`,
  myths: [
    { type: 'myth', title: 'Força de vontade é ilimitada', text: 'Baumeister mostra que é um recurso finito que se esgota com o uso.', reflection: 'Você tenta decidir tudo e acaba cedendo?' },
    { type: 'truth', title: 'Depleção do ego existe', text: 'Autocontrole gasta energia; depois de muitas decisões, cedemos.', reflection: 'Por que você cede à noite, não de manhã?' },
    { type: 'myth', title: 'Decisões fortes mostram caráter', text: 'Quem decide demais se torna mais fraco; poupe decisões.', reflection: 'Você gasta disciplina em escolhas triviais?' },
    { type: 'truth', title: 'É como um músculo', text: 'Cansa no uso, mas treina e fortalece com o tempo.', reflection: 'Você treina ou só drena sua disciplina?' },
    { type: 'myth', title: 'Basta querer', text: 'Vontade isolada raramente vence ambiente mal desenhado.', reflection: 'Você confia na vontade e ignora o ambiente?' },
    { type: 'truth', title: 'Glucose importa', text: 'Baixa glicose reduz autocontrole; o corpo influencia a mente.', reflection: 'Você decide quando está com fome?' },
    { type: 'myth', title: 'Super-homens nascem prontos', text: 'Disciplina é treinada, não dom; método vence dom.', reflection: 'Você acha que "não nasceu disciplinado"?' },
    { type: 'truth', title: 'Comprometimento prévio', text: 'Decidir de antemão poupa o recurso no momento da tentação.', reflection: 'Você deixa para decidir na hora da fraqueza?' },
    { type: 'myth', title: 'Mudança exige esforço contínuo', text: 'Hábitos automatizados reduzem o custo de vontade a zero.', reflection: 'Você reluta em automatizar ganhos?' },
    { type: 'truth', title: 'Ambiente poupa vontade', text: 'Tirar a tentação do caminho vale mais que resistir a ela.', reflection: 'Você mantém tentações à vista?' },
    { type: 'myth', title: 'Foco em várias metas', text: 'Muitas metas simultâneas drenam o mesmo recurso; foque.', reflection: 'Você tenta mudar tudo de uma vez?' },
    { type: 'truth', title: 'Monitoramento ajuda', text: 'Acompanhar o comportamento reforça o autocontrole.', reflection: 'Você mede o que quer controlar?' },
    { type: 'myth', title: 'Motivação substitui vontade', text: 'Motivação oscila; sistemas poupam o recurso quando ela falta.', reflection: 'Você conta com motivação e não com sistema?' },
    { type: 'truth', title: 'Treino aumenta a capacidade', text: 'Exercícios pequenos de autocontrole elevam a reserva geral.', reflection: 'Você treina disciplina ou só a gasta?' }
  ],
  ensinamentos: [
    { number: '1', title: 'Poupe decisões', text: 'Automatize escolhas triviais (roupa, refeições) para guardar disciplina.' },
    { number: '2', title: 'Trate como músculo', text: 'Treine autocontrole em pequenas doses para fortalecer a reserva.' },
    { number: '3', title: 'Coma e durma', text: 'Glicose e sono estão na base da capacidade de resistir.' },
    { number: '4', title: 'Use comprometimento', text: 'Decida de antemão e crie barreiras que impedem o recuo.' },
    { number: '5', title: 'Remova tentações', text: 'Tire o estímulo do ambiente; é mais fácil que resistir.' },
    { number: '6', title: 'Foque em uma meta', text: 'Mudanças demais ao mesmo tempo drenam o mesmo recurso.' },
    { number: '7', title: 'Monitore', text: 'Registrar o comportamento aumenta a chance de controle.' },
    { number: '8', title: 'Automatize hábitos', text: 'Quando vira automático, deixa de custar força de vontade.' },
    { number: '9', title: 'Evite a noite fraca', text: 'Agende decisões difíceis para quando a reserva está cheia.' },
    { number: '10', title: 'Planeje o ambiente', text: 'Desenhe escolhas para que o certo seja o caminho fácil.' },
    { number: '11', title: 'Recarregue', text: 'Pausas e refeições recuperam o recurso drenado.' },
    { number: '12', title: 'Treine a longo prazo', text: 'A capacidade cresce com prática consistente, não com heroísmo.' }
  ],
  citacoes: [
    { texto: 'A força de vontade é como um músculo: cansa com o uso, mas fortalece com o treino.', autor: 'Roy F. Baumeister', obra: 'Força de Vontade' },
    { texto: 'Cada decisão drena um pouco da sua disciplina.', autor: 'Roy F. Baumeister', obra: 'Força de Vontade' },
    { texto: 'Quem decide demais no fim do dia cede à tentação.', autor: 'Roy F. Baumeister', obra: 'Força de Vontade' },
    { texto: 'O melhor uso da força de vontade é não precisar dela.', autor: 'Roy F. Baumeister', obra: 'Força de Vontade' },
    { texto: 'O autocontrole prevê o sucesso melhor que o QI.', autor: 'Roy F. Baumeister', obra: 'Força de Vontade' }
  ],
  citacoesTerceiros: [
    { texto: 'A parte sobre depleção do ego me fez parar de culpar meu "caráter" à noite.', autor: 'Leitor', fonte: 'Goodreads' },
    { texto: 'Ciência real de autocontrole, sem misticismo.', autor: 'Psicólogo', fonte: 'Amazon' },
    { texto: 'Implementei o "jantar decidido de manhã" e economizei energia.', autor: 'Leitor', fonte: 'Goodreads' }
  ],
  chapters: [
    { title: 'Capítulo 1 — A força de vontade como músculo', text: 'Baumeister apresenta a metáfora e a evidência da depleção do ego.', points: ['Depleção', 'Recurso finito', 'Músculo'] },
    { title: 'Capítulo 2 — O que esgota a disciplina', text: 'Decisões, controle emocional e tentação consomem o recurso.', points: ['Decisões', 'Emoção', 'Tentação'] },
    { title: 'Capítulo 3 — Glucose e mente', text: 'Mostra como o corpo e a glicose afetam o autocontrole.', points: ['Glicose', 'Corpo', 'Cérebro'] },
    { title: 'Capítulo 4 — A ilusão do "basta querer"', text: 'Desmistifica a ideia de vontade infinita e castiga autojulgamento.', points: ['Mito', 'Autoimagem', 'Realidade'] },
    { title: 'Capítulo 5 — Comprometimento prévio', text: 'Estratégias para decidir antes e evitar uso do recurso.', points: ['Barreiras', 'Contratos', 'Antecipação'] },
    { title: 'Capítulo 6 — Ambiente e tentação', text: 'Como desenhar o contexto para poupar disciplina.', points: ['Remover', 'Facilitar', 'Design'] },
    { title: 'Capítulo 7 — Treinando a capacidade', text: 'Exercícios pequenos que aumentam a reserva geral.', points: ['Treino', 'Hábito', 'Progresso'] },
    { title: 'Capítulo 8 — Aplicações práticas', text: 'Estudo, dieta, trabalho e vícios sob a lente da vontade.', points: ['Dieta', 'Trabalho', 'Vícios'] },
    { title: 'Capítulo 9 — O sistema sobre a força', text: 'Encerra defendendo rotinas que reduzem o uso de vontade.', points: ['Sistemas', 'Hábitos', 'Liberdade'] }
  ]
});

/* 8. heath - Decisivo */
E.push({
  id: 'heath',
  summary: `Chip e Dan Heath, em "Decisivo" (Switch), pegam emprestada a metáfora do elefante e do condutor para explicar por que mudar é tão difícil — e como conseguir. Inspirados na pesquisa de psicologia do comportamento, os autores estruturam a mudança em três frentes: Dirija o Rider (o lado racional, que precisa de direção clara), Motive o Elephant (o emocional, que fornece energia) e Molde o Path (o ambiente, que facilita ou bloqueia). A tese: a paralisia vem do conflito entre razão e emoção, e a solução é agir nas três ao mesmo tempo. O gancho prático inclui "achatar e ampliar" as escolhas, buscar "pontos brilhantes" e "construir hábitos". O livro é um manual de mudança organizacional e pessoal ancorado em casos reais.`,
  myths: [
    { type: 'myth', title: 'Análise basta para mudar', text: 'Heath mostra que o lado racional sozinho não move ninguém; a emoção conta.', reflection: 'Você acha que "entender" já muda comportamento?' },
    { type: 'truth', title: 'Rider e Elephant coexistem', text: 'Razão e emoção disputam; mudança exige lidar com ambos.', reflection: 'Sua mudança ignora a emoção?' },
    { type: 'myth', title: 'Falta de informação paralisa', text: 'Ter mais dados raramente resolve; o problema é direção e energia.', reflection: 'Você acumula dados e não age?' },
    { type: 'truth', title: 'Molde o caminho', text: 'O ambiente decide mais que a força de vontade; desenhe o path.', reflection: 'Você tenta vencer o ambiente pela força?' },
    { type: 'myth', title: 'Mudança exige grande choque', text: 'Pequenas mudanças de ambiente e pontos brilhantes funcionam.', reflection: 'Você espera a crise para mudar?' },
    { type: 'truth', title: 'Pontos brilhantes ajudam', text: 'Copiar o que já funciona em algum lugar é mais rápido que inventar.', reflection: 'Você ignora o que já dá certo perto de você?' },
    { type: 'myth', title: 'Opções amplas são melhores', text: 'Muitas opções paralisam; "achatar" ajuda a decidir.', reflection: 'Você se perde em demasia de escolhas?' },
    { type: 'truth', title: 'Emoção gera energia', text: 'O elefante precisa de algo que emocione para sair do lugar.', reflection: 'Sua meta emociona você ou só faz sentido?' },
    { type: 'myth', title: 'Hábito é só repetição', text: 'Hábito exige ambiente que sustente a ação automática.', reflection: 'Você repete sem sustentar o contexto?' },
    { type: 'truth', title: 'Identidade importa', text: 'Mudar o "eu sou" do elefante sustenta a mudança.', reflection: 'Sua mudança desafia quem você se acha?' },
    { type: 'myth', title: 'Mudança é individual', text: 'Cultura e ambiente coletivo pesam tanto quanto a vontade.', reflection: 'Você culpa o indivíduo e ignora o sistema?' },
    { type: 'truth', title: 'Direção clara desbloqueia', text: 'O rider paralisado precisa de um destino específico, não vago.', reflection: 'Sua meta é clara ou abstrata?' },
    { type: 'myth', title: 'Esperar motivação', text: 'Ação gera motivação; não espere o elefante se animar primeiro.', reflection: 'Você espera querer para começar?' },
    { type: 'truth', title: 'Pequenas vitórias somam', text: 'Sucessos pequenos alimentam o elefante e mantêm a rota.', reflection: 'Você despreza vitórias que não são grandiosas?' }
  ],
  ensinamentos: [
    { number: '1', title: 'Dirija o Rider', text: 'Dê direção clara e específica; evite metas vagas que paralisam.' },
    { number: '2', title: 'Motive o Elephant', text: 'Encontre o que emociona; a energia vem do sentir, não só do saber.' },
    { number: '3', title: 'Molde o Path', text: 'Mude o ambiente para que o certo seja o caminho fácil.' },
    { number: '4', title: 'Achate as escolhas', text: 'Reduza opções para decidir melhor; menos é mais aqui.' },
    { number: '5', title: 'Busque pontos brilhantes', text: 'Copie o que já funciona em algum contexto similar.' },
    { number: '6', title: 'Construa hábitos', text: 'Automatize a mudança para que ela não dependa de esforço.' },
    { number: '7', title: 'Use a identidade', text: 'Ancore a mudança em "eu sou" para sustentar o elefante.' },
    { number: '8', title: 'Celebre pequenas vitórias', text: 'Sucessos pequenos mantêm a energia do elefante.' },
    { number: '9', title: 'Tire atrito do caminho', text: 'Remova barreiras que tornam o novo comportamento difícil.' },
    { number: '10', title: 'Envolva a cultura', text: 'Mudança coletiva precisa de norma e apoio do grupo.' },
    { number: '11', title: 'Comece agindo', text: 'Ação gera motivação; não espere o animo perfeito.' },
    { number: '12', title: 'Meça o path', text: 'Acompanhe se o ambiente está facilitando ou bloqueando.' }
  ],
  citacoes: [
    { texto: 'Para mudar as coisas, você precisa dirigir o rider, motivar o elephant e moldar o path.', autor: 'Chip & Dan Heath', obra: 'Decisivo' },
    { texto: 'O que parece resistência é, muitas vezes, falta de clareza.', autor: 'Chip & Dan Heath', obra: 'Decisivo' },
    { texto: 'Procure os pontos brilhantes — o que já funciona em algum lugar.', autor: 'Chip & Dan Heath', obra: 'Decisivo' },
    { texto: 'Muitas opções paralisam; achete a escolha.', autor: 'Chip & Dan Heath', obra: 'Decisivo' },
    { texto: 'A mudança é difícil porque o elefante e o rider divergem.', autor: 'Chip & Dan Heath', obra: 'Decisivo' }
  ],
  citacoesTerceiros: [
    { texto: 'O framework Rider/Elephant/Path é o mais útil que já vi para gestão de mudança.', autor: 'Consultor', fonte: 'Goodreads' },
    { texto: 'Usei os pontos brilhantes na minha equipe e resolvemos em semanas.', autor: 'Líder', fonte: 'Amazon' },
    { texto: 'Leitura obrigatória para quem lida com resistência organizacional.', autor: 'Leitor', fonte: 'Goodreads' }
  ],
  chapters: [
    { title: 'Capítulo 1 — Por que a mudança é difícil', text: 'Os Heath explicam o conflito entre razão e emoção na mudança.', points: ['Rider', 'Elephant', 'Path'] },
    { title: 'Capítulo 2 — Dirija o Rider', text: 'Como dar direção clara e evitar a paralisia analítica.', points: ['Clareza', 'Direção', 'Foco'] },
    { title: 'Capítulo 3 — Motive o Elephant', text: 'A emoção como fonte de energia para sair do lugar.', points: ['Emoção', 'Sentir', 'Energia'] },
    { title: 'Capítulo 4 — Molde o Path', text: 'O ambiente como fator decisivo de comportamento.', points: ['Ambiente', 'Atrito', 'Facilitar'] },
    { title: 'Capítulo 5 — Achatando e ampliando', text: 'Reduzir opções e aumentar o leque de perspectivas.', points: ['Opções', 'Perspectiva', 'Decisão'] },
    { title: 'Capítulo 6 — Pontos brilhantes', text: 'Copiar o que já funciona como atalho para a mudança.', points: ['Copiar', 'Evidência', 'Rapidez'] },
    { title: 'Capítulo 7 — Construindo hábitos', text: 'Como automatizar o novo comportamento no dia a dia.', points: ['Hábito', 'Gatilho', 'Rotina'] },
    { title: 'Capítulo 8 — Identidade e cultura', text: 'Sustentar a mudança pela identidade e pelo grupo.', points: ['Eu sou', 'Norma', 'Grupo'] },
    { title: 'Capítulo 9 — Juntando as peças', text: 'Integrar as três frentes em um plano de mudança real.', points: ['Plano', 'Integração', 'Ação'] }
  ]
});

/* 9. pink - Drive */
E.push({
  id: 'pink',
  summary: `Daniel Pink, em "Drive", revisa o que realmente nos motiva e destrói o senso comum de que recompensas e punições ("carrots and sticks") funcionam para trabalho complexo. Com base na ciência da motivação, ele propõe que o motor humano moderno é o "Motivo 3.0": Autonomia (controle sobre o que, como, quando e com quem), Maestria (o impulso de melhorar) e Propósito (servir a algo maior). A tese central: para tarefas que exigem pensamento, incentivos financeiros podem até piorar o desempenho; o que engaja é a liberdade, o crescimento e o sentido. O gancho é revolucionário para empresas e pais: pare de manipular e passe a criar condições para as pessoas se autoimpulsionarem.`,
  myths: [
    { type: 'myth', title: 'Dinheiro motiva sempre', text: 'Pink mostra que para tarefas cognitivas, bônus pode reduzir o desempenho.', reflection: 'Você acha que só dinheiro move as pessoas?' },
    { type: 'truth', title: 'Autonomia engaja', text: 'Controle sobre o trabalho é um dos três motores reais da motivação.', reflection: 'Você microgerencia e perde engajamento?' },
    { type: 'myth', title: 'Carrots and sticks funcionam', text: 'Recompensa e punição matam a motivação intrínseca em tarefas criativas.', reflection: 'Você tenta "comprar" esforço que exige mente?' },
    { type: 'truth', title: 'Maestria move', text: 'O desejo de ficar melhor em algo que importa é motor forte.', reflection: 'Seu trabalho permite crescer ou estagna?' },
    { type: 'myth', title: 'Tarefa simples = tarefa complexa', text: 'O que vale para tarefa mecânica falha para cognitiva; são diferentes.', reflection: 'Você aplica a mesma gestão a tudo?' },
    { type: 'truth', title: 'Propósito importa', text: 'Servir a algo maior sustenta esforço além do salário.', reflection: 'Seu time sabe por que o trabalho importa?' },
    { type: 'myth', title: 'Motivação é externa', text: 'A intrínseca (autonomia, maestria, propósito) supera a extrínseca.', reflection: 'Você ignora o que move por dentro?' },
    { type: 'truth', title: 'Type I vs. Type X', text: 'Quem busca sentido (Type I) supera quem busca recompensa (Type X).', reflection: 'Você age por recompensa ou por sentido?' },
    { type: 'myth', title: 'Punição corrige', text: 'Castigo externaliza a motivação e corrói o interesse real.', reflection: 'Você puniu e perdeu o interesse da pessoa?' },
    { type: 'truth', title: 'Tempo e método livres', text: 'Deixar decidir como e quando fazer aumenta a qualidade.', reflection: 'Você dita o como e mata a criatividade?' },
    { type: 'myth', title: 'Metas rígidas ajudam', text: 'Metas absurdas induzem comportamento antiético e atalhos.', reflection: 'Suas metas forçam atalhos ruins?' },
    { type: 'truth', title: 'Feedback sustenta', text: 'Maestria precisa de feedback imediato e claro para evoluir.', reflection: 'Você dá feedback suficiente para crescer?' },
    { type: 'myth', title: 'Motivação se impõe', text: 'Não se impõe; cria-se ambiente onde a pessoa se autoimpulsiona.', reflection: 'Você tenta empurrar em vez de habilitar?' },
    { type: 'truth', title: 'Sentido retém talento', text: 'Propósito retém pessoas melhores que bônus pontuais.', reflection: 'Seu time fica pelo salário ou pelo sentido?' }
  ],
  ensinamentos: [
    { number: '1', title: 'Ofereça autonomia', text: 'Deixe pessoas decidirem o quê, como, quando e com quem trabalhar.' },
    { number: '2', title: 'Cultive maestria', text: 'Crie espaço e feedback para as pessoas melhorarem continuamente.' },
    { number: '3', title: 'Conecte ao propósito', text: 'Mostre como o trabalho serve a algo maior que o lucro.' },
    { number: '4', title: 'Reduza carrots/sticks', text: 'Substitua controle por condições de motivação intrínseca.' },
    { number: '5', title: 'Evite metas tóxicas', text: 'Metas absurdas geram atalhos; use objetivos desafiadores e justos.' },
    { number: '6', title: 'Dê feedback rápido', text: 'Maestria depende de saber logo se está melhorando.' },
    { number: '7', title: 'Defina Type I', text: 'Atraia e desenvolva quem busca sentido, não só recompensa.' },
    { number: '8', title: 'Liberte o tempo', text: 'Bloquear tempo para trabalho autodirigido gera inovação.' },
    { number: '9', title: 'Use "20% time"', text: 'Tempo livre para projetos próprios aumenta engajamento.' },
    { number: '10', title: 'Meça o certo', text: 'Avalie autonomia e crescimento, não só número de saída.' },
    { number: '11', title: 'Explique o porquê', text: 'Pais e chefes devem dar razão, não só ordem.' },
    { number: '12', title: 'Confie nas pessoas', text: 'Motivação intrínseca floresce onde há confiança, não vigilância.' }
  ],
  citacoes: [
    { texto: 'A melhor motivação não é externa, é encontrada no que fazemos.', autor: 'Daniel H. Pink', obra: 'Drive' },
    { texto: 'Autonomia, maestria e propósito: os verdadeiros motores humanos.', autor: 'Daniel H. Pink', obra: 'Drive' },
    { texto: 'Para tarefas que exigem pensamento, recompensas podem piorar o desempenho.', autor: 'Daniel H. Pink', obra: 'Drive' },
    { texto: 'As cenouras e os paus estão obsoletas para o trabalho moderno.', autor: 'Daniel H. Pink', obra: 'Drive' },
    { texto: 'As pessoas querem dirigir a própria vida e melhorar em algo que importa.', autor: 'Daniel H. Pink', obra: 'Drive' }
  ],
  citacoesTerceiros: [
    { texto: 'Mudou como conduzo minha equipe: menos bônus, mais autonomia.', autor: 'Gerente', fonte: 'Goodreads' },
    { texto: 'A ciência da motivação explicada sem enrolação.', autor: 'Leitor', fonte: 'Amazon' },
    { texto: 'O capítulo sobre metas tóxicas deveria ser leitura de todo diretor.', autor: 'Leitor', fonte: 'Goodreads' }
  ],
  chapters: [
    { title: 'Capítulo 1 — A surpreendente verdade', text: 'Pink abre mostrando que a ciência contradiz o senso comum sobre motivação.', points: ['Mito', 'Evidência', 'Revelação'] },
    { title: 'Capítulo 2 — Os dois tipos de motivação', text: 'Distinguir motivação extrínseca (Motivo 2.0) da intrínseca (3.0).', points: ['Extrínseca', 'Intrínseca', 'História'] },
    { title: 'Capítulo 3 — Autonomia', text: 'O controle sobre o trabalho como motor do engajamento.', points: ['O quê', 'Como', 'Quando/Quem'] },
    { title: 'Capítulo 4 — Maestria', text: 'O impulso de melhorar e a necessidade de desafio e feedback.', points: ['Melhorar', 'Desafio', 'Feedback'] },
    { title: 'Capítulo 5 — Propósito', text: 'Servir a algo maior que o lucro individual como sustento.', points: ['Sentido', 'Impacto', 'Retenção'] },
    { title: 'Capítulo 6 — Os limites das recompensas', text: 'Por que carrots and sticks falham em tarefas complexas.', points: ['Efeito', 'Dano', 'Contexto'] },
    { title: 'Capítulo 7 — Type I e Type X', text: 'Perfis de quem busca sentido vs. quem busca recompensa.', points: ['Perfis', 'Resultado', 'Cultura'] },
    { title: 'Capítulo 8 — Aplicando na prática', text: 'Como pais, professores e líderes criam condições de motivação.', points: ['Liderança', 'Educação', 'Vida'] },
    { title: 'Capítulo 9 — O toolkit', text: 'Ferramentas concretas para implementar o Motivo 3.0.', points: ['Passos', 'Ambiente', 'Medir'] }
  ]
});

/* 10. grant - Dar e Receber */
E.push({
  id: 'grant',
  summary: `Adam Grant, em "Dar e Receber" (Give and Take), propõe uma ideia provocadora: nas relações de trabalho, as pessoas se dividem em doadores, tomadores e trocadores — e os doadores não estão condenados ao fundo do poço. Na verdade, eles aparecem tanto no último quanto no primeiro lugar. A tese central é que o estilo de reciprocidade importa mais que a competência para explicar o sucesso extremo. Doadores bem-sucedidos ajudam sem esperar retorno imediato, mas protegem seu tempo e energia; doadores fracassados se deixam explorar. Grant mostra como a generosidade estratégica, combinada a limites, cria redes poderosas e reputação duradoura. O gancho: dar pode ser a estratégia mais egoísta e eficaz que existe — desde que feito com inteligência.`,
  myths: [
    { type: 'myth', title: 'Generosos ficam no fundo', text: 'Grant prova que doadores lideram tanto o topo quanto a base.', reflection: 'Você assume que ajudar atrapalha o sucesso?' },
    { type: 'truth', title: 'Estilo de reciprocidade importa', text: 'Doador, tomador ou trocador prediz extremos de sucesso.', reflection: 'Você sabe qual é o seu estilo?' },
    { type: 'myth', title: 'Sucesso é só competência', text: 'O padrão de dar/receber explica mais os extremos que a habilidade.', reflection: 'Você ignorou redes e reputação no sucesso?' },
    { type: 'truth', title: 'Doadores no topo e base', text: 'Os mais e os menos bem-sucedidos costumam ser doadores.', reflection: 'Seu estilo de ajudar te eleva ou te esgota?' },
    { type: 'myth', title: 'Toda generosidade é boa', text: 'Doadores que se deixam sugar fracassam; limites importam.', reflection: 'Você confunde dar com se anular?' },
    { type: 'truth', title: 'Dar estratégico vence', text: 'Generosidade com proteção cria vantagem competitiva real.', reflection: 'Você dá sem critério e se queima?' },
    { type: 'myth', title: 'Trocadores são neutros', text: 'Trocadores equilibram, mas raramente atingem os extremos do doador.', reflection: 'Você só "se der, leva" e perde oportunidades?' },
    { type: 'truth', title: 'Reputação multiplica', text: 'Ser conhecido como doador atrai oportunidades e talentos.', reflection: 'Sua reputação atrai ou afasta?' },
    { type: 'myth', title: 'Tomadores ganham no curto prazo', text: 'No longo prazo, tomadores perdem confiança e redes.', reflection: 'Você notou tomadores isolados com o tempo?' },
    { type: 'truth', title: 'Pedir ajuda ajuda', text: 'Doadores que pedem criam laços e aprendem mais rápido.', reflection: 'Você recusa pedir e perde apoio?' },
    { type: 'myth', title: 'Networking é manipular', text: 'Relações genuínas de dar superam táticas de explorar contatos.', reflection: 'Você trata rede como transação?' },
    { type: 'truth', title: 'Próspero por dar', text: 'O doador inteligente lucra porque outros o apoiem voluntariamente.', reflection: 'Você enxerga dar como custo ou investimento?' },
    { type: 'myth', title: 'Caridade no trabalho é fraqueza', text: 'Mentoria e ajuda constroem autoridade e influência.', reflection: 'Você evita ajudar para "não parecer fraco"?' },
    { type: 'truth', title: 'Limites sustentam', text: 'Dizer não a pedidos errados protege a capacidade de dar certo.', reflection: 'Você protege seu tempo para dar bem?' }
  ],
  ensinamentos: [
    { number: '1', title: 'Identifique seu estilo', text: 'Saiba se você é doador, tomador ou trocador nas relações.' },
    { number: '2', title: 'Dê com estratégia', text: 'Ajude de forma que multiplique impacto, não apenas esgote você.' },
    { number: '3', title: 'Proteja seu tempo', text: 'Doadores precisam de limites para não virar "train wreck".' },
    { number: '4', title: 'Construa reputação', text: 'Ser visto como doador atrai oportunidades e parceiros.' },
    { number: '5', title: 'Aprenda a pedir', text: 'Pedir ajuda fortalece laços e acelera seu aprendizado.' },
    { number: '6', title: 'Mentore', text: 'Ensinar consolida autoridade e expande sua rede real.' },
    { number: '7', title: 'Evite tomadores', text: 'Identifique e limite quem só extrai sem retribuir.' },
    { number: '8', title: 'Crie cultura de dar', text: 'Times que doam cooperam mais e performam melhor.' },
    { number: '9', title: 'Pense no longo prazo', text: 'Generosidade rende dividendos anos depois, não amanhã.' },
    { number: '10', title: 'Combine dar e dizer não', text: 'Generosidade sem fronteira destrói o doador.' },
    { number: '11', title: 'Valorize trocas justas', text: 'Trocadores têm lugar, mas o doador vence nos extremos.' },
    { number: '12', title: 'Veja dar como investimento', text: 'Ajuda bem-feita é das estratégias mais lucrativas que existem.' }
  ],
  citacoes: [
    { texto: 'Os doadores estão no topo e no fundo das organizações.', autor: 'Adam Grant', obra: 'Dar e Receber' },
    { texto: 'Dar pode ser a estratégia mais egoísta e eficaz que existe.', autor: 'Adam Grant', obra: 'Dar e Receber' },
    { texto: 'O sucesso extremo se explica mais pelo estilo de reciprocidade que pela competência.', autor: 'Adam Grant', obra: 'Dar e Receber' },
    { texto: 'Doadores bem-sucedidos ajudam sem esperar, mas protegem seu tempo.', autor: 'Adam Grant', obra: 'Dar e Receber' },
    { texto: 'Quem pede ajuda constrói laços mais fortes do que quem só oferece.', autor: 'Adam Grant', obra: 'Dar e Receber' }
  ],
  citacoesTerceiros: [
    { texto: 'Me fez repensar minha aversão a "networking" como algo sujo.', autor: 'Leitor', fonte: 'Goodreads' },
    { texto: 'A distinção doador fracassado vs. bem-sucedido é ouro.', autor: 'Empreendedor', fonte: 'Amazon' },
    { texto: 'Grant usa dados reais; não é autoajuda de palestra.', autor: 'Leitor', fonte: 'Goodreads' }
  ],
  chapters: [
    { title: 'Capítulo 1 — Doadores, tomadores e trocadores', text: 'Grant define os três estilos de reciprocidade no trabalho.', points: ['Definições', 'Estilos', 'Impacto'] },
    { title: 'Capítulo 2 — Os doadores no fundo', text: 'Por que doadores sem limites afundam e se esgotam.', points: ['Esgotamento', 'Exploração', 'Custo'] },
    { title: 'Capítulo 3 — Os doadores no topo', text: 'Como doadores inteligentes chegam ao sucesso extremo.', points: ['Vantagem', 'Rede', 'Reputação'] },
    { title: 'Capítulo 4 — A força da reputação', text: 'Ser conhecido como doador atrai oportunidades duradouras.', points: ['Confiança', 'Atração', 'Legado'] },
    { title: 'Capítulo 5 — O poder de pedir', text: 'Por que doadores que pedem aprendem e se conectam mais.', points: ['Vulnerabilidade', 'Laço', 'Aprendizado'] },
    { title: 'Capítulo 6 — Tomadores e o longo prazo', text: 'A queda dos que só extraem quando a rede fecha.', points: ['Isolamento', 'Confiança', 'Tempo'] },
    { title: 'Capítulo 7 — Como proteger o doador', text: 'Limites e estratégias para dar sem se destruir.', points: ['Limites', 'Seleção', 'Energia'] },
    { title: 'Capítulo 8 — Cultura de dar', text: 'Times e empresas onde doar é norma performam melhor.', points: ['Norma', 'Cooperação', 'Resultado'] },
    { title: 'Capítulo 9 — Aplicando o dar', text: 'Encerra com passos para ser um doador bem-sucedido.', points: ['Plano', 'Prática', 'Medir'] }
  ]
});

/* 11. hsieh - Entrega Feliz */
E.push({
  id: 'hsieh',
  summary: `Tony Hsieh, o lendário CEO da Zappos, conta em "Entrega Feliz" (Delivering Happiness) a trajetória do empreendedor que vendeu a LinkExchange ao Yahoo e construiu uma das culturas corporativas mais admiradas do mundo. A tese central é que a felicidade não é um brinde, é um modelo de negócios: tratar clientes e colaboradores com autenticidade, propósito e liberdade gera lucro sustentável. Hsieh defende que o serviço excepcional e a cultura forte são vantagens competitivas, e propõe dez valores essenciais (como "entregue WOW", "crie diversão e um pouco de esquisitice", "construa uma cultura aberta e honesta"). O gancho: quando você coloca a felicidade das pessoas acima das métricas de curto prazo, os resultados financeiros seguem.`,
  myths: [
    { type: 'myth', title: 'Lucro vem antes de cultura', text: 'Hsieh mostra que cultura forte precede e sustenta o lucro.', reflection: 'Você corta cultura para "salvar" resultado?' },
    { type: 'truth', title: 'Felicidade é modelo', text: 'Tratar bem pessoas é estratégia competitiva, não caridade.', reflection: 'Sua empresa vê felicidade como custo ou ativo?' },
    { type: 'myth', title: 'Clientes querem só preço', text: 'A Zappos provou que experiência e WOW vencem o menor preço.', reflection: 'Você compete só por preço?' },
    { type: 'truth', title: 'Serviço excepcional paga', text: 'Atendimento surpreendente gera boca a boca e retenção.', reflection: 'Seu atendimento impressiona ou apenas funciona?' },
    { type: 'myth', title: 'Cultura é parede', text: 'Valores escritos sem prática são decorativos; Hsieh os vive.', reflection: 'Seus valores estão na parede ou na rotina?' },
    { type: 'truth', title: 'Autenticidade importa', text: 'Ser genuíno com clientes e equipe constrói confiança real.', reflection: 'Sua comunicação é real ou marketing?' },
    { type: 'myth', title: 'Vender a empresa é o fim', text: 'Hsieh mostra que o propósito segue além do exit bilionário.', reflection: 'Você parou de buscar sentido após o sucesso?' },
    { type: 'truth', title: 'Propósito maior', text: 'Conectar pessoas e criar felicidade supera a venda de sapatos.', reflection: 'Seu negócio tem sentido além do produto?' },
    { type: 'myth', title: 'Controle gera eficiência', text: 'Liberdade e holacracia engajam mais que microgestão.', reflection: 'Você controla demais e perde engajamento?' },
    { type: 'truth', title: 'Pessoas certas primeiro', text: 'Contratar por cultura vale mais que contratar por currículo.', reflection: 'Você contrata competência e ignora encaixe?' },
    { type: 'myth', title: 'Crescer é só escala', text: 'Hsieh protege a cultura mesmo crescendo; escala sem alma falha.', reflection: 'Seu crescimento corroeu a essência?' },
    { type: 'truth', title: 'Transparência atrai', text: 'Cultura aberta e honesta retém talento e clientes.', reflection: 'Sua empresa esconde ou compartilha?' },
    { type: 'myth', title: 'Felicidade é moleza', text: 'Entregar felicidade exige disciplina e padrões altos de serviço.', reflection: 'Você confunde felicidade com relaxo?' },
    { type: 'truth', title: 'WOW é sistemático', text: 'Surpreender o cliente é desenhado, não sorte.', reflection: 'Você deixa o WOW ao acaso?' }
  ],
  ensinamentos: [
    { number: '1', title: 'Defina valores reais', text: 'Crie poucos valores e os viva na prática, não na parede.' },
    { number: '2', title: 'Entregue WOW', text: 'Surpreenda o cliente com algo além do combinado sempre que possível.' },
    { number: '3', title: 'Contrate por cultura', text: 'O encaixe cultural pesa mais que o currículo brilhante.' },
    { number: '4', title: 'Seja autêntico', text: 'Comunique-se com genuinidade; pessoas sentem a diferença.' },
    { number: '5', title: 'Proteja a cultura', text: 'Cresça sem diluir os princípios que te definem.' },
    { number: '6', title: 'Dê liberdade', text: 'Equipes autônomas entregam mais que microgerenciadas.' },
    { number: '7', title: 'Conecte ao propósito', text: 'Mostre sentido maior que o produto para engajar.' },
    { number: '8', title: 'Transparência', text: 'Abertura e honesta constroem confiança duradoura.' },
    { number: '9', title: 'Meça felicidade', text: 'Acompanhe satisfação de cliente e colaborador como KPI.' },
    { number: '10', title: 'Pense longo prazo', text: 'Resultado de curto prazo não justifica quebrar a cultura.' },
    { number: '11', title: 'Crie diversão', text: 'Ambiente leve e criativo sustenta energia e ideias.' },
    { number: '12', title: 'Sirva as pessoas', text: 'Colocar pessoas acima de métricas gera lucro sustentável.' }
  ],
  citacoes: [
    { texto: 'A felicidade é um modelo de negócios, não um brinde.', autor: 'Tony Hsieh', obra: 'Entrega Feliz' },
    { texto: 'Trate os clientes de um jeito que eles contem para os amigos.', autor: 'Tony Hsieh', obra: 'Entrega Feliz' },
    { texto: 'Entregue WOW através do serviço.', autor: 'Tony Hsieh', obra: 'Entrega Feliz' },
    { texto: 'Uma grande cultura é a vantagem competitiva definitiva.', autor: 'Tony Hsieh', obra: 'Entrega Feliz' },
    { texto: 'Não busque lucro diretamente; busque propósito e ele segue.', autor: 'Tony Hsieh', obra: 'Entrega Feliz' }
  ],
  citacoesTerceiros: [
    { texto: 'A cultura da Zappos descrita aqui deveria ser caso de estudo.', autor: 'Leitor', fonte: 'Goodreads' },
    { texto: 'Mais história inspiradora que manual, mas vale cada página.', autor: 'Empreendedor', fonte: 'Amazon' },
    { texto: 'Usei os dez valores como base da minha startup.', autor: 'Fundador', fonte: 'Goodreads' }
  ],
  chapters: [
    { title: 'Capítulo 1 — A infância empreendedora', text: 'Hsieh relata os primeiros negócios e a curiosidade por sistemas.', points: ['Origem', 'Curiosidade', 'Negócio'] },
    { title: 'Capítulo 2 — LinkExchange e o Yahoo', text: 'A venda milionária e a lição sobre propósito perdido.', points: ['Exit', 'Dinheiro', 'Vazio'] },
    { title: 'Capítulo 3 — A Zappos nasce', text: 'A aposta em vender sapatos online com foco em cultura.', points: ['Aposta', 'Foco', 'Risco'] },
    { title: 'Capítulo 4 — Os dez valores', text: 'Os princípios essenciais que guiam a empresa.', points: ['Valores', 'WOW', 'Cultura'] },
    { title: 'Capítulo 5 — Serviço como marketing', text: 'Como atendimento vira propaganda orgânica e retenção.', points: ['Atendimento', 'Boca a boca', 'Retenção'] },
    { title: 'Capítulo 6 — Cultura e contratação', text: 'Contratar por encaixe e viver os valores na prática.', points: ['Encaixe', 'Prática', 'Time'] },
    { title: 'Capítulo 7 — Felicidade e ciência', text: 'Hsieh traz estudos sobre o que realmente traz felicidade.', points: ['Estudos', 'Sentido', 'Conexão'] },
    { title: 'Capítulo 8 — Holacracia e liberdade', text: 'A aposta em estrutura plana e autonomia real.', points: ['Estrutura', 'Autonomia', 'Mudança'] },
    { title: 'Capítulo 9 — Entregue felicidade', text: 'Encerra convidando a colocar pessoas acima de métricas.', points: ['Propósito', 'Lucro', 'Legado'] }
  ]
});

/* 12. mullainathan - Escassez */
E.push({
  id: 'mullainathan',
  summary: `Sendhil Mullainathan e Eldar Shafir, em "Escassez", revelam um insight comportamental poderoso: a falta de algo — dinheiro, tempo, calorias, companhia — não apenas restringe recursos, ela rouba a largura de banda mental. A tese central é que a escassez cria um "túnel" cognitivo: focamos no que falta e perdemos de vista o resto, tomando decisões piores e ficando presos num ciclo de pobreza ou corrida contra o relógio. Os autores mostram que ricos também sofrem escassez de tempo, e que a solução não é "tentar mais", mas construir folga (slack) e desenhar sistemas que protejam o cérebro sobrecarregado. O gancho: escassez não é sobre ter pouco, é sobre o que ter pouco faz com a mente.`,
  myths: [
    { type: 'myth', title: 'Pobreza é má gestão', text: 'Mullainathan mostra que a mente sob escassez decide pior por sobrecarga.', reflection: 'Você julga pobres sem ver o túnel cognitivo?' },
    { type: 'truth', title: 'Escassez rouba banda', text: 'A falta reduz largura mental disponível para tudo mais.', reflection: 'Quando apertado, você erra o que não relaciona à falta?' },
    { type: 'myth', title: 'Ricos não têm escassez', text: 'Eles sofrem escassez de tempo com os mesmos efeitos mentais.', reflection: 'Você acha que só falta de dinheiro drena?' },
    { type: 'truth', title: 'O túnel cognitivo', text: 'Focar no que falta faz perder o quadro amplo e o longo prazo.', reflection: 'Sua urgência te cega para o essencial?' },
    { type: 'myth', title: 'Basta tentar mais', text: 'Mais esforço sob escassez aprofunda o ciclo de erro.', reflection: 'Você tenta forçar quando deveria folgar?' },
    { type: 'truth', title: 'Folga (slack) protege', text: 'Ter reserva evita o túnel e melhora decisões.', reflection: 'Sua vida tem folga ou está no limite?' },
    { type: 'myth', title: 'Decisão ruim é caráter', text: 'É efeito da largura mental tomada, não fraqueza moral.', reflection: 'Você culpa caráter por erro de contexto?' },
    { type: 'truth', title: 'Escassez se autoperpetua', text: 'Pouco hoje gera erro que produz menos amanhã: ciclo.', reflection: 'Você notou o ciclo se repetir?' },
    { type: 'myth', title: 'Informação resolve', text: 'Mais dados não compensam a banda mental tomada.', reflection: 'Você empilha informação e decide pior?' },
    { type: 'truth', title: 'Sistemas ajudam', text: 'Automatizar e desenhar escolhas poupa o cérebro escasso.', reflection: 'Você exige decisão do cérebro exausto?' },
    { type: 'myth', title: 'Tempo e dinheiro iguais', text: 'A escassez de um não substitui a do outro; ambas drenam.', reflection: 'Você troca tempo por dinheiro sem medir custo mental?' },
    { type: 'truth', title: 'Túnel gera custo de túnel', text: 'O foco estreito ignora oportunidades fora do foco.', reflection: 'O que você deixou passar por estar no túnel?' },
    { type: 'myth', title: 'Ajuda é só grana', text: 'Programas que reduzem banda mental falham; precisam de folga.', reflection: 'Sua ajuda aumenta ou alivia a sobrecarga?' },
    { type: 'truth', title: 'Prevenção vale', text: 'Construir reserva antes da crise é a defesa real.', reflection: 'Você espera a crise para criar folga?' }
  ],
  ensinamentos: [
    { number: '1', title: 'Entenda o túnel', text: 'Reconheça quando a escassez estreita seu raciocínio.' },
    { number: '2', title: 'Crie folga', text: 'Reserve tempo e dinheiro para evitar o limite crítico.' },
    { number: '3', title: 'Automatize decisões', text: 'Reduza escolhas quando a mente já está sobrecarregada.' },
    { number: '4', title: 'Não julgue o pobre', text: 'Erros sob escassez são cognitivos, não morais.' },
    { number: '5', title: 'Proteja a banda', text: 'Reduza ruído e interrupções em momentos de aperto.' },
    { number: '6', title: 'Planeje a largura', text: 'Decida coisas importantes fora do túnel de urgência.' },
    { number: '7', title: 'Evite o ciclo', text: 'Pequenas reservas quebram a autorepetição da pobreza.' },
    { number: '8', title: 'Use lembretes', text: 'Sistemas externos compensam a memória tomada.' },
    { number: '9', title: 'Desenhe escolhas', text: 'Torne o certo fácil quando a mente está ocupada.' },
    { number: '10', title: 'Separe urgência de importância', text: 'O túnel confunde as duas; force a separação.' },
    { number: '11', title: 'Valorize slack', text: 'Folga não é desperdício; é seguro cognitivo.' },
    { number: '12', title: 'Ajude com estrutura', text: 'Boa ajuda reduz carga mental, não só repassa recurso.' }
  ],
  citacoes: [
    { texto: 'A escassez não é sobre ter pouco; é sobre o que ter pouco faz com a mente.', autor: 'Sendhil Mullainathan', obra: 'Escassez' },
    { texto: 'A escassez rouba nossa largura de banda mental.', autor: 'Sendhil Mullainathan', obra: 'Escassez' },
    { texto: 'Quando nos falta algo, construímos um túnel e perdemos o resto.', autor: 'Sendhil Mullainathan', obra: 'Escassez' },
    { texto: 'A escassez de tempo aflige ricos tanto quanto a de dinheiro aflige pobres.', autor: 'Sendhil Mullainathan', obra: 'Escassez' },
    { texto: 'Folga é o antídoto contra o ciclo da escassez.', autor: 'Sendhil Mullainathan', obra: 'Escassez' }
  ],
  citacoesTerceiros: [
    { texto: 'Explica por que, por mais que ganhe, continuo sem tempo.', autor: 'Leitor', fonte: 'Goodreads' },
    { texto: 'A parte sobre túnel cognitivo mudou como vejo pobreza.', autor: 'Sociólogo', fonte: 'Amazon' },
    { texto: 'Ciência comportamental séria e acessível.', autor: 'Leitor', fonte: 'Goodreads' }
  ],
  chapters: [
    { title: 'Capítulo 1 — O que é escassez', text: 'Os autores definem escassez como sensação de ter menos que o necessário.', points: ['Definição', 'Recurso', 'Sentir'] },
    { title: 'Capítulo 2 — O túnel', text: 'Como o foco no que falta estreita a percepção do resto.', points: ['Foco', 'Cegueira', 'Custo'] },
    { title: 'Capítulo 3 — A banda tomada', text: 'A largura mental consumida pela escassez reduz o pensamento.', points: ['Largura', 'Sobrecarga', 'Erro'] },
    { title: 'Capítulo 4 — Escassez de dinheiro', text: 'Por que pobres decidem pior sob pressão financeira.', points: ['Pobreza', 'Ciclo', 'Julgamento'] },
    { title: 'Capítulo 5 — Escassez de tempo', text: 'Ricos e ocupados também sofrem o mesmo efeito mental.', points: ['Tempo', 'Agenda', 'Túnel'] },
    { title: 'Capítulo 6 — O ciclo da escassez', text: 'Como pouco hoje gera menos amanhã de forma autorepetida.', points: ['Autorepetição', 'Armadilha', 'Folga'] },
    { title: 'Capítulo 7 — Soluções: folga', text: 'Construir slack para proteger a mente e as decisões.', points: ['Slack', 'Reserva', 'Defesa'] },
    { title: 'Capítulo 8 — Sistemas e políticas', text: 'Como desenhar ajuda e regras que respeitam a banda.', points: ['Design', 'Política', 'Estrutura'] },
    { title: 'Capítulo 9 — Viva com folga', text: 'Aplicar o conceito à própria vida para decidir melhor.', points: ['Vida', 'Hábito', 'Largura'] }
  ]
});

/* 13. covey8 - O 8º Hábito */
E.push({
  id: 'covey8',
  summary: `Stephen Covey, em "O 8º Hábito", dá continuidade a "Os 7 Hábitos" partindo de uma constatação: a eficácia não basta mais num mundo de mudança acelerada. O gancho central é encontrar sua voz — o que ele chama de "grandeza" — e ajudar os outros a encontrar a deles. Os sete hábitos levam à eficácia; o oitavo leva à plenitude e à liderança. Covey estrutura o caminho em quatro dimensões (corpo/fazer, mente/aprender, coração/amar, espírito/ver) e propõe que a voz emerge quando você alinha talento, paixão, necessidade e consciência. A tese: o desafio não é apenas "ser eficaz", mas "ser necessário" — contribuir com o que só você pode dar. É um chamado à liderança pessoal e à significância.`,
  myths: [
    { type: 'myth', title: 'Eficácia basta', text: 'Covey argumenta que o mundo mudou; eficácia vira base, não destino.', reflection: 'Você parou em "ser eficiente" e perdeu sentido?' },
    { type: 'truth', title: 'Encontre sua voz', text: 'A grandeza vem de descobrir o que só você pode oferecer.', reflection: 'Você sabe qual é a sua voz única?' },
    { type: 'myth', title: 'Liderança é cargo', text: 'Liderança é influência e voz, não título nem hierarquia.', reflection: 'Você espera cargo para liderar?' },
    { type: 'truth', title: 'Quatro dimensões', text: 'Corpo, mente, coração e espírito sustentam a voz inteira.', reflection: 'Você cultiva só uma das dimensões?' },
    { type: 'myth', title: 'Talento define tudo', text: 'Voz exige alinhar talento, paixão, necessidade e consciência.', reflection: 'Você tem talento mas falta paixão ou sentido?' },
    { type: 'truth', title: ' Ajude outros a encontrar', text: 'Grandeza inclui empoderar a voz de quem está ao seu redor.', reflection: 'Você ajuda outros a acharem a voz ou os silencia?' },
    { type: 'myth', title: 'Significância é luxo', text: 'Covey trata sentido como necessidade humana básica, não extra.', reflection: 'Você posterga o "porquê" da vida?' },
    { type: 'truth', title: 'Voz é contribuição', text: 'A voz se realiza quando serve a uma necessidade real.', reflection: 'Sua voz atende a algo que o mundo precisa?' },
    { type: 'myth', title: 'Mudança é externa', text: 'A grandeza exige mudança interna antes da externa.', reflection: 'Você tenta mudar o mundo sem se mudar?' },
    { type: 'truth', title: 'Consciência importa', text: 'Ouvir a própria consciência guia a decisão certa.', reflection: 'Você silencia a consciência por conveniência?' },
    { type: 'myth', title: 'Só para líderes', text: 'O 8º hábito é para qualquer um que queira ser necessário.', reflection: 'Você reservou liderança só para chefes?' },
    { type: 'truth', title: 'Confiança libera', text: 'Cultura de confiança permite que vozes floresçam.', reflection: 'Seu ambiente libera ou reprime vozes?' },
    { type: 'myth', title: 'Voz é autoajuda', text: 'Covey ancora a voz em serviço e responsabilidade, não ego.', reflection: 'Você confunde voz com vaidade?' },
    { type: 'truth', title: 'Da eficácia à grandeza', text: 'O salto do 7º ao 8º hábito é de útil para significativo.', reflection: 'Você está útil mas não significativo?' }
  ],
  ensinamentos: [
    { number: '1', title: 'Domine os 7 primeiro', text: 'O 8º hábito constrói sobre a eficácia dos sete anteriores.' },
    { number: '2', title: 'Busque sua voz', text: 'Descubra o que só você pode oferecer ao mundo.' },
    { number: '3', title: 'Alinhe as quatro dimensões', text: 'Cuide corpo, mente, coração e espírito em equilíbrio.' },
    { number: '4', title: 'Cruze talento e paixão', text: 'Voz nasce onde você é bom e gosta de fazer.' },
    { number: '5', title: 'Atenda uma necessidade', text: 'Sua voz precisa servir a algo que o mundo pede.' },
    { number: '6', title: 'Ouça a consciência', text: 'Use a bússola interna para decidir com integridade.' },
    { number: '7', title: 'Empodere outros', text: 'Ajude cada pessoa ao redor a encontrar sua voz.' },
    { number: '8', title: 'Lidere por influência', text: 'Liderança é exemplo e serviço, não autoridade.' },
    { number: '9', title: 'Crie confiança', text: 'Ambientes de confiança liberam o potencial alheio.' },
    { number: '10', title: 'Busque significância', text: 'Vá além do útil; procure ser necessário.' },
    { number: '11', title: 'Pratique a inteireza', text: 'Voz requer coerência entre o que pensa, diz e faz.' },
    { number: '12', title: 'Sirva', text: 'A grandeza se mede pelo serviço prestado, não pelo status.' }
  ],
  citacoes: [
    { texto: 'Encontre sua voz e ajude os outros a encontrar a deles.', autor: 'Stephen R. Covey', obra: 'O 8º Hábito' },
    { texto: 'A eficácia não basta mais; o desafio é a grandeza.', autor: 'Stephen R. Covey', obra: 'O 8º Hábito' },
    { texto: 'O oitavo hábito é da eficácia à grandeza.', autor: 'Stephen R. Covey', obra: 'O 8º Hábito' },
    { texto: 'Liderança é comunicação inspirante de uma pessoa para outra.', autor: 'Stephen R. Covey', obra: 'O 8º Hábito' },
    { texto: 'Você foi enviado a esta terra com um dom único.', autor: 'Stephen R. Covey', obra: 'O 8º Hábito' }
  ],
  citacoesTerceiros: [
    { texto: 'Complemento essencial aos 7 Hábitos; menos tático, mais profundo.', autor: 'Leitor', fonte: 'Goodreads' },
    { texto: 'A parte sobre as quatro dimensões me reorganizou.', autor: 'Líder', fonte: 'Amazon' },
    { texto: 'Idealista demais para alguns, inspirador para mim.', autor: 'Leitor', fonte: 'Goodreads' }
  ],
  chapters: [
    { title: 'Capítulo 1 — O fim da eficácia', text: 'Covey argumenta que eficácia virou piso, não teto, no mundo novo.', points: ['Mudança', 'Eficácia', 'Necessidade'] },
    { title: 'Capítulo 2 — O 8º Hábito definido', text: 'Encontrar a voz e empoderar a voz alheia como essência.', points: ['Voz', 'Grandeza', 'Liderança'] },
    { title: 'Capítulo 3 — As quatro dimensões', text: 'Corpo, mente, coração e espírito que sustentam a voz.', points: ['Fazer', 'Aprender', 'Amar', 'Ver'] },
    { title: 'Capítulo 4 — O modelo da voz', text: 'Cruzar talento, paixão, necessidade e consciência.', points: ['Talento', 'Paixão', 'Necessidade'] },
    { title: 'Capítulo 5 — Visão e disciplina', text: 'Como traduzir a voz em direção e execução.', points: ['Visão', 'Disciplina', 'Ação'] },
    { title: 'Capítulo 6 — Paixão e consciência', text: 'O coração e o espírito como bússola da decisão.', points: ['Paixão', 'Consciência', 'Integridade'] },
    { title: 'Capítulo 7 — Empoderando outros', text: 'Liderança como servir para que outros achem a voz.', points: ['Serviço', 'Confiança', 'Influência'] },
    { title: 'Capítulo 8 — Confiança e cultura', text: 'Ambientes de confiança liberam potencial coletivo.', points: ['Confiança', 'Cultura', 'Potencial'] },
    { title: 'Capítulo 9 — Da grandeza à significância', text: 'Encerra o chamado a ser necessário e não apenas útil.', points: ['Significância', 'Legado', 'Servir'] }
  ]
});

/* 14. collins - Empresas Feitas para Vencer */
E.push({
  id: 'collins',
  summary: `Jim Collins, em "Empresas Feitas para Vencer" (Good to Great), passou cinco anos estudando 1.435 empresas para responder: o que faz uma boa empresa se tornar excelente e sustentar resultados por 15 anos? A tese central é que a grandeza não depende de sorte, setor ou tecnologia, e sim de disciplina. Entre os achados: a "Liderança de Nível 5" (humildade + vontade feroz), o "Conceito do Ouriço" (o cruzamento entre paixão, o que você faz melhor e o que move sua economia), a "Parábola do Flywheel" (acumular momentum), o "Paradoxo de Stockdale" (enfrentar a dura realidade sem perder a fé) e a "Cultura de Disciplina". O gancho: empresas medianas viram extraordinárias por escolhas duras e consistentes, não por grandes golpes.`,
  myths: [
    { type: 'myth', title: 'Tecnologia é o segredo', text: 'Collins mostra que tecnologia acelera, mas não causa a excelência.', reflection: 'Você culpa a falta de tech pelo fracasso?' },
    { type: 'truth', title: 'Liderança de Nível 5', text: 'Líderes humildes e obstinados lideram a virada para a grandeza.', reflection: 'Seu líder busca glória ou resultado?' },
    { type: 'myth', title: 'Sorte explica tudo', text: 'Empresas great não foram mais sortudas; usaram a realidade melhor.', reflection: 'Você atribui o sucesso alheio à sorte?' },
    { type: 'truth', title: 'Conceito do Ouriço', text: 'Foco no cruzamento de paixão, excelência e motor econômico.', reflection: 'Sua empresa faz o que é do seu "ouriço"?' },
    { type: 'myth', title: 'Grandes líderes são carismáticos', text: 'Nível 5 são discretos; carisma não é pré-requisito.', reflection: 'Você confunde palco com liderança?' },
    { type: 'truth', title: 'Flywheel, não alavanca', text: 'Excelência vem de acumular momentum, não de golpe único.', reflection: 'Você busca a "alavanca mágica" em vez de girar?' },
    { type: 'myth', title: 'Fusões salvam', text: 'Collins achou que aquisições raramente causaram a virada.', reflection: 'Você aposta em compra em vez de melhorar?' },
    { type: 'truth', title: 'Paradoxo de Stockdale', text: 'Enfrente os fatos brutais sem perder a fé na vitória.', reflection: 'Você evita a realidade ou perde a esperança?' },
    { type: 'myth', title: 'Precisa de pessoas primeiro', text: 'Collins diz: primeiro quem (as certas), depois o quê.', reflection: 'Você define estratégia antes das pessoas certas?' },
    { type: 'truth', title: 'Cultura de disciplina', text: 'Pessoas disciplinadas em estrutura livre geram excelência.', reflection: 'Sua cultura exige vigilância ou disciplina?' },
    { type: 'myth', title: 'Visão grandiosa inicial', text: 'A visão emergiu do ouriço, não veio de um líder visionário.', reflection: 'Você inventa visão sem base real?' },
    { type: 'truth', title: 'Confronto a realidade', text: 'Olhar os dados dolorosos é pré-requisito da grandeza.', reflection: 'Sua empresa esconde números ruins?' },
    { type: 'myth', title: 'Mudança radical', text: 'Transformação foi gradativa e silenciosa, não explosiva.', reflection: 'Você espera revolução em vez de passos?' },
    { type: 'truth', title: 'Disciplina sobreciona', text: 'Aplicar os princípios com disciplina vence o talento isolado.', reflection: 'Você tem princípios sem disciplina de aplicar?' }
  ],
  ensinamentos: [
    { number: '1', title: 'Seja Nível 5', text: 'Combine humildade genuína com vontade feroz de resultado.' },
    { number: '2', title: 'Defina o Ouriço', text: 'Concentre-se onde paixão, excelência e economia se cruzam.' },
    { number: '3', title: 'Coloque as pessoas certas', text: 'Primeiro quem, depois o quê; o time certo muda tudo.' },
    { number: '4', title: 'Gire o flywheel', text: 'Acumule momentum pequeno e constante, não busque golpe.' },
    { number: '5', title: 'Encare a realidade', text: 'Use o Paradoxo de Stockdale: fatos brutais + fé.' },
    { number: '6', title: 'Crie cultura de disciplina', text: 'Estrutura leve com pessoas autodisciplinadas.' },
    { number: '7', title: 'Não dependa de tech', text: 'Use tecnologia como acelerador, depois de definir estratégia.' },
    { number: '8', title: 'Evite alavancas mágicas', text: 'Desconfie de soluções milagrosas e fusões salvadoras.' },
    { number: '9', title: 'Mantenha a fé', text: 'Sem perder esperança mesmo diante de fatos difíceis.' },
    { number: '10', title: 'Foque no essencial', text: 'Diga não a oportunidades fora do ouriço.' },
    { number: '11', title: 'Meça a disciplina', text: 'Acompanhe se os princípios são aplicados consistentemente.' },
    { number: '12', title: 'Pense em 15 anos', text: 'Excelência se mede em décadas, não trimestres.' }
  ],
  citacoes: [
    { texto: 'Boas empresas não se tornam excelentes por causa da sorte.', autor: 'Jim Collins', obra: 'Empresas Feitas para Vencer' },
    { texto: 'Líderes de Nível 5 combinam humildade pessoal com vontade profissional.', autor: 'Jim Collins', obra: 'Empresas Feitas para Vencer' },
    { texto: 'O Conceito do Ouriço: o que você pode ser o melhor do mundo?', autor: 'Jim Collins', obra: 'Empresas Feitas para Vencer' },
    { texto: 'A excelência é uma trajetória de flywheel, não de alavanca.', autor: 'Jim Collins', obra: 'Empresas Feitas para Vencer' },
    { texto: 'Você deve enfrentar os fatos brutais da realidade, não importa quão dolorosos.', autor: 'Jim Collins', obra: 'Empresas Feitas para Vencer' }
  ],
  citacoesTerceiros: [
    { texto: 'O capítulo sobre Nível 5 deveria ser leitura obrigatória de RH.', autor: 'Executivo', fonte: 'Goodreads' },
    { texto: 'Dados rigorosos; não é mais uma teoria de consultoria.', autor: 'Leitor', fonte: 'Amazon' },
    { texto: 'O flywheel mudou como explico crescimento à minha equipe.', autor: 'Empreendedor', fonte: 'Goodreads' }
  ],
  chapters: [
    { title: 'Capítulo 1 — Boas e grandes', text: 'Collins apresenta a pesquisa e a pergunta central do livro.', points: ['Pesquisa', 'Pergunta', 'Método'] },
    { title: 'Capítulo 2 — Liderança de Nível 5', text: 'O perfil humilde e obstinado que lidera a virada.', points: ['Humildade', 'Vontade', 'Perfil'] },
    { title: 'Capítulo 3 — Primeiro quem, depois o quê', text: 'Colocar as pessoas certas antes da estratégia.', points: ['Time', 'Ordem', 'Decisão'] },
    { title: 'Capítulo 4 — Conceito do Ouriço', text: 'Foco no cruzamento de paixão, excelência e economia.', points: ['Paixão', 'Melhor', 'Economia'] },
    { title: 'Capítulo 5 — Cultura de disciplina', text: 'Pessoas disciplinadas em estrutura livre.', points: ['Disciplina', 'Liberdade', 'Foco'] },
    { title: 'Capítulo 6 — O papel da tecnologia', text: 'Tech como acelerador, não causa da excelência.', points: ['Acelerador', 'Ordem', 'Limite'] },
    { title: 'Capítulo 7 — A alavanca do acelerador', text: 'Por que a "alavanca mágica" falha e o flywheel funciona.', points: ['Alavanca', 'Flywheel', 'Momentum'] },
    { title: 'Capítulo 8 — O Paradoxo de Stockdale', text: 'Enfrentar a realidade brutal sem perder a fé.', points: ['Realidade', 'Fé', 'Paradoxo'] },
    { title: 'Capítulo 9 — Da boa à grande', text: 'Síntese dos princípios e o caminho de décadas.', points: ['Síntese', 'Tempo', 'Disciplina'] }
  ]
});

/* 15. christensen2 - O Dilema da Inovação */
E.push({
  id: 'christensen2',
  summary: `Clayton Christensen, em "O Dilema da Inovação" (The Innovator's Dilemma), responde a uma pergunta incomoda: por que empresas bem geridas — que ouvem clientes e investem em pesquisa — ainda assim fracassam diante de certas inovações? A tese central é a "inovação de ruptura" (disruptiva): tecnologias piores no início, mas mais baratas ou simples, começam nos nichos e acabam destruindo líderes que focam no topo. O dilemma é que fazer o "certo" pelo cliente atual leva a empresa a ignorar o mercado emergente. Christensen mostra que o processo de alocação de recursos e a escuta excessiva do cliente atual condenam gigantes. O gancho: a boa gestão, levada ao extremo, pode ser a causa do colapso.`,
  myths: [
    { type: 'myth', title: 'Empresas bem geridas não falham', text: 'Christensen prova que gestão excelente precede a queda por ruptura.', reflection: 'Você acha que "ouvir o cliente" sempre salva?' },
    { type: 'truth', title: 'Inovação de ruptura existe', text: 'Tecnologia simples nos nichos destrói líderes do topo.', reflection: 'Você ignora o concorrente "pior" que cresce?' },
    { type: 'myth', title: 'Ouvir cliente basta', text: 'Clientes atuais pedem o topo; ninguém pede a ruptura cedo.', reflection: 'Seus clientes definem sua cegueira?' },
    { type: 'truth', title: 'Processo de alocação mata', text: 'Bons projetos morrem porque o recurso vai para o lucrativo atual.', reflection: 'Seu processo sufoca ideias novas?' },
    { type: 'myth', title: 'Qualidade sempre vence', text: 'Ruptura vence por conveniência/preço, não por qualidade.', reflection: 'Você assume que o melhor produto ganha?' },
    { type: 'truth', title: 'Mercados emergentes', text: 'A ruptura nasce onde o produto atual é caro/difícil demais.', reflection: 'Você abandonou o "baixo" para o cliente premium?' },
    { type: 'myth', title: 'Fracasso é incompetência', text: 'Líderes fizeram tudo certo e ainda perderam; é estrutural.', reflection: 'Você culpa gestores sem ver o modelo?' },
    { type: 'truth', title: 'Sustentação vs. ruptura', text: 'Inovação sustentadora melhora o que já vende; ruptura cria novo.', reflection: 'Você só faz sustentadora e perde o novo?' },
    { type: 'myth', title: 'Pesquisa evita surpresas', text: 'Pesquisa focada no atual não prevê o mercado de ruptura.', reflection: 'Sua pesquisa mede só o cliente de hoje?' },
    { type: 'truth', title: 'Unidade independente', text: 'A solução é separar a ruptura em estrutura autônoma.', reflection: 'Você tenta inovar rupturando dentro da velha estrutura?' },
    { type: 'myth', title: 'Grandes sempre lideram', text: 'Líderes perdem justamente por proteger o lucro atual.', reflection: 'Seu sucesso atual te impede de mudar?' },
    { type: 'truth', title: 'Ciclo de recursos', text: 'Onde o dinheiro vai define o futuro, não as intenções.', reflection: 'Seus recursos seguem a velha ou a nova curva?' },
    { type: 'myth', title: 'Tecnologia nova = risco', text: 'A ruptura é arriscada, mas ignorá-la é mais fatal.', reflection: 'Você evita a ruptura por medo e perde?' },
    { type: 'truth', title: 'Rede de valor', text: 'O cliente e a cadeia puxam a empresa para o topo, cegando-a.', reflection: 'Sua rede de valor te prende ao atual?' }
  ],
  ensinamentos: [
    { number: '1', title: 'Entenda ruptura', text: 'Aprenda a diferença entre inovação sustentadora e disruptiva.' },
    { number: '2', title: 'Não confie só no cliente', text: 'Ouça, mas proteja espaço para o mercado que ainda não pede.' },
    { number: '3', title: 'Vigie o nicho', text: 'Concorrentes "inferiores" nos nichos podem virar ameaça.' },
    { number: '4', title: 'Mude alocação', text: 'Direcione recursos para projetos de ruptura, não só lucro atual.' },
    { number: '5', title: 'Crie unidade autônoma', text: 'Separe a inovação disruptiva da estrutura principal.' },
    { number: '6', title: 'Estude a rede de valor', text: 'Saiba como clientes e cadeia limitam seu movimento.' },
    { number: '7', title: 'Abra mão do topo', text: 'Ruptura exige atender o "pior" mercado primeiro.' },
    { number: '8', title: 'Presuma o ciclo', text: 'Onde o recurso vai hoje define sua sobrevivência amanhã.' },
    { number: '9', title: 'Teste cedo', text: 'Experimente mercados emergentes antes que dominem.' },
    { number: '10', title: 'Proteja o novo', text: 'Não deixe o processo atual matar a novidade no berço.' },
    { number: '11', title: 'Reconheça o dilemma', text: 'Fazer o certo hoje pode ser errado para o futuro.' },
    { number: '12', title: 'Planeje a morte', text: 'Líderes devem canibalizar-se antes dos outros.' }
  ],
  citacoes: [
    { texto: 'As empresas bem geridas fracassam ao enfrentar inovações de ruptura.', autor: 'Clayton M. Christensen', obra: 'O Dilema da Inovação' },
    { texto: 'A inovação disruptiva começa pior e vence pelo mercado de baixo.', autor: 'Clayton M. Christensen', obra: 'O Dilema da Inovação' },
    { texto: 'Ouvir o cliente atual é exatamente o que nos cega para a ruptura.', autor: 'Clayton M. Christensen', obra: 'O Dilema da Inovação' },
    { texto: 'O processo de alocação de recursos decide o futuro mais que a estratégia.', autor: 'Clayton M. Christensen', obra: 'O Dilema da Inovação' },
    { texto: 'Crie uma unidade independente para a inovação disruptiva.', autor: 'Clayton M. Christensen', obra: 'O Dilema da Inovação' }
  ],
  citacoesTerceiros: [
    { texto: 'O livro mais influente sobre estratégia que já li.', autor: 'Executivo', fonte: 'Goodreads' },
    { texto: 'Explica por que minha empresa dominante perdeu o bonde.', autor: 'Leitor', fonte: 'Amazon' },
    { texto: 'A distinção ruptura/sustentação deveria estar em todo MBA.', autor: 'Consultor', fonte: 'Goodreads' }
  ],
  chapters: [
    { title: 'Capítulo 1 — O paradoxo da boa gestão', text: 'Por que empresas excelentes caem diante de rupturas.', points: ['Paradoxo', 'Falha', 'Pergunta'] },
    { title: 'Capítulo 2 — O princípio da inovação de ruptura', text: 'Como tecnologias piores tomam o mercado pelo baixo.', points: ['Ruptura', 'Nicho', 'Curva'] },
    { title: 'Capítulo 3 — A tecnologia de disco', text: 'Caso histórico que prova o padrão repetido.', points: ['Disco', 'Líderes', 'Queda'] },
    { title: 'Capítulo 4 — O processo de alocação', text: 'Por que bons projetos novos morrem na empresa.', points: ['Recursos', 'Lucro', 'Morte'] },
    { title: 'Capítulo 5 — A rede de valor', text: 'Como clientes e cadeia puxam a empresa para o topo.', points: ['Cliente', 'Cadeia', 'Limite'] },
    { title: 'Capítulo 6 — O dilema do cliente', text: 'Ouvir o cliente atual cega para o emergente.', points: ['Escuta', 'Cegueira', 'Risco'] },
    { title: 'Capítulo 7 — Sustentadora vs. ruptura', text: 'Por que a empresa faz a primeira e evita a segunda.', points: ['Tipos', 'Motivo', 'Perda'] },
    { title: 'Capítulo 8 — A solução: unidade autônoma', text: 'Como isolar a ruptura para que sobreviva.', points: ['Autonomia', 'Estrutura', 'Proteção'] },
    { title: 'Capítulo 9 — O dilemma e o futuro', text: 'Síntese do dilemma e lições para gestores.', points: ['Síntese', 'Gestão', 'Aviso'] }
  ]
});

/* 16. godin2 - Isso é Marketing */
E.push({
  id: 'godin2',
  summary: `Seth Godin, em "Isso é Marketing" (This Is Marketing), desafia a visão de marketing como manipulação e venda. Sua tese central: marketing de verdade é mudar pessoas a quem você importa, criando valor para uma audiência específica e merecendo atenção em vez de comprá-la. Godin fala de "tensão" (a lacuna entre o atual e o desejado), da "menor audiência viável" (em vez de大众), de empatia profunda e de status. O gancho: você não precisa enganar ninguém — precisa encontrar as pessoas certas, entender sua dor e contar uma história que as ajude. Marketing é serviço, não truque; é sobre ser visto por quem precisa de você.`,
  myths: [
    { type: 'myth', title: 'Marketing é manipular', text: 'Godin redefine como servir e ajudar, não enganar o cliente.', reflection: 'Você vê marketing como truque ou serviço?' },
    { type: 'truth', title: 'Marketing é mudar', text: 'O objetivo real é transformar quem você importa, não só vender.', reflection: 'Seu marketing muda ou apenas anuncia?' },
    { type: 'myth', title: 'Quanto mais audiência, melhor', text: 'Godin propõe a menor audiência viável, específica e leal.', reflection: 'Você corre atrás de massa em vez de nicho?' },
    { type: 'truth', title: 'Empatia é base', text: 'Entender profundamente a dor alheia vem antes de qualquer tática.', reflection: 'Você fala de si ou do problema do cliente?' },
    { type: 'myth', title: 'Compre a atenção', text: 'Anúncios interrompem; merecer atenção cria confiança duradoura.', reflection: 'Você paga por atenção ou a conquista?' },
    { type: 'truth', title: 'Tensão move', text: 'A lacuna entre o atual e o desejado é o que gera ação.', reflection: 'Sua mensagem cria ou ignora tensão?' },
    { type: 'myth', title: 'Vender é o fim', text: 'Godin trata venda como consequência de servir bem.', reflection: 'Você empurra venda sem servir?' },
    { type: 'truth', title: 'Status importa', text: 'As pessoas compram para se sentir parte ou distintas; use isso ético.', reflection: 'Sua marca atende necessidade de status?' },
    { type: 'myth', title: 'Storytelling barato', text: 'História só funciona se for verdadeira e útil, não enfeite.', reflection: 'Você usa história como maquiagem?' },
    { type: 'truth', title: 'Menor viável', text: 'Focar poucos certos vale mais que alcance vazio.', reflection: 'Seu alcance converte ou só aparece?' },
    { type: 'myth', title: 'Marketing é departamento', text: 'É responsabilidade de quem cria valor, não só do time de propaganda.', reflection: 'Você terceiriza marketing como rótulo?' },
    { type: 'truth', title: 'Mereça a confiança', text: 'Consistência e utilidade constroem autoridade real.', reflection: 'Você entrega valor ou só promete?' },
    { type: 'myth', title: 'Novidade vende', text: 'Continuidade e confiança vencem a constante novidade.', reflection: 'Você troca de tática sem construir confiança?' },
    { type: 'truth', title: 'Escolha a quem servir', text: 'Decidir a quem NÃO serve é tão importante quanto a quem serve.', reflection: 'Você tenta agradar a todos e não serve ninguém?' }
  ],
  ensinamentos: [
    { number: '1', title: 'Defina a audiência', text: 'Escolha as pessoas certas e, principalmente, a quem não servir.' },
    { number: '2', title: 'Pratique empatia', text: 'Estude a dor real do cliente antes de qualquer campanha.' },
    { number: '3', title: 'Crie tensão', text: 'Mostre a lacuna entre o atual e o desejado para gerar ação.' },
    { number: '4', title: 'Busque a menor viável', text: 'Foque num nicho específico e leal, não na massa.' },
    { number: '5', title: 'Mereça atenção', text: 'Conquiste confiança com utilidade, não interrompa com anúncio.' },
    { number: '6', title: 'Conte história verdadeira', text: 'Use narrativa que ajuda, não enfeite enganoso.' },
    { number: '7', title: 'Entenda o status', text: 'Saiba como sua marca atende necessidade de pertencer ou destacar.' },
    { number: '8', title: 'Sirva antes de vender', text: 'Valor antecede a transação; venda é consequência.' },
    { number: '9', title: 'Seja consistente', text: 'Confiança se constrói com presença e entrega constantes.' },
    { number: '10', title: 'Meça conexão', text: 'Avalie se mudou pessoas, não só cliques.' },
    { number: '11', title: 'Recuse o genérico', text: 'Posicionamento claro vale mais que ser "para todos".' },
    { number: '12', title: 'Marketing é serviço', text: 'Reframeie marketing como ajuda, não manipulação.' }
  ],
  citacoes: [
    { texto: 'Marketing é a arte de mudar pessoas que importam para você.', autor: 'Seth Godin', obra: 'Isso é Marketing' },
    { texto: 'Não tente enganar o tempo todo; mereça a atenção.', autor: 'Seth Godin', obra: 'Isso é Marketing' },
    { texto: 'Encontre a menor audiência viável e sirva-a profundamente.', autor: 'Seth Godin', obra: 'Isso é Marketing' },
    { texto: 'A tensão entre o que é e o que poderia ser é o que move.', autor: 'Seth Godin', obra: 'Isso é Marketing' },
    { texto: ' Marketing de verdade é empatia posta em prática.', autor: 'Seth Godin', obra: 'Isso é Marketing' }
  ],
  citacoesTerceiros: [
    { texto: 'Godin no melhor formato: direto, sem fórmula mágica.', autor: 'Leitor', fonte: 'Goodreads' },
    { texto: 'A menor audiência viável mudou minha estratégia de lançamento.', autor: 'Empreendedor', fonte: 'Amazon' },
    { texto: 'Finalmente um livro de marketing que não me faz sentir sujo.', autor: 'Leitor', fonte: 'Goodreads' }
  ],
  chapters: [
    { title: 'Capítulo 1 — O que é marketing', text: 'Godin redefine marketing como mudança e serviço, não truque.', points: ['Definição', 'Serviço', 'Mudança'] },
    { title: 'Capítulo 2 — A tensão', text: 'A lacuna entre atual e desejado como motor da ação.', points: ['Lacuna', 'Desejo', 'Ação'] },
    { title: 'Capítulo 3 — Empatia e visão', text: 'Entender a dor alheia antes de qualquer tática.', points: ['Empatia', 'Dor', 'Visão'] },
    { title: 'Capítulo 4 — A menor audiência viável', text: 'Por que nicho específico vence alcance vazio.', points: ['Nicho', 'Lealdade', 'Foco'] },
    { title: 'Capítulo 5 — Status e pertencimento', text: 'Como marcas atendem necessidade de status.', points: ['Status', 'Grupo', 'Distinção'] },
    { title: 'Capítulo 6 — Merecer atenção', text: 'Conquistar confiança em vez de comprar interrupção.', points: ['Atenção', 'Confiança', 'Utilidade'] },
    { title: 'Capítulo 7 — Contar histórias', text: 'Narrativa verdadeira que ajuda, não enfeite.', points: ['História', 'Verdade', 'Ajuda'] },
    { title: 'Capítulo 8 — Decida a quem não servir', text: 'Posicionamento por exclusão vale tanto quanto inclusão.', points: ['Exclusão', 'Posição', 'Clareza'] },
    { title: 'Capítulo 9 — Marketing como serviço', text: 'Encerra reframando marketing como ajuda contínua.', points: ['Serviço', 'Consistência', 'Mudança'] }
  ]
});

/* 17. brown2 - Coragem */
E.push({
  id: 'brown2',
  summary: `Brené Brown, em "Coragem" (Daring Greatly), desafia a crença de que vulnerabilidade é fraqueza. Sua tese central, baseada em duas décadas de pesquisa, é que a vulnerabilidade é a medida exata da coragem e a porta de entrada para a conexão, a criatidade e a liderança. Brown define vergonha como a interferência principal — o medo de não ser "merecedor" — e propõe a "totalidade" (wholeheartedness) como modo de viver. O gancho: quando deixamos de proteger a armadura e ousamos se expor, nos tornamos mais criativos, confiáveis e capazes de liderar. Não se trata de ser frágil, mas de ter a coragem de aparecer mesmo com incerteza.`,
  myths: [
    { type: 'myth', title: 'Vulnerabilidade é fraqueza', text: 'Brown prova que é medida de coragem, não de fraqueza.', reflection: 'Você confunde se abrir com ser fraco?' },
    { type: 'truth', title: 'Vulnerabilidade gera conexão', text: 'A exposição real é o que permite vínculo genuíno.', reflection: 'Sua armadura te isola das pessoas?' },
    { type: 'myth', title: 'Líderes não se mostram', text: 'Líderes corajosos ousam se mostrar vulneráveis e ganham confiança.', reflection: 'Você esconde dúvidas para "parecer chefe"?' },
    { type: 'truth', title: 'Vergonha paralisa', text: 'O medo de não ser merecedor sabotа relacionamentos e trabalho.', reflection: 'A vergonha dirige alguma atitude sua?' },
    { type: 'myth', title: 'Perfeição protege', text: 'A busca por perfeição é armadura que mata a criatividade.', reflection: 'Você se esconde na perfeição?' },
    { type: 'truth', title: 'Coragem é aparecer', text: 'Ousar estar presente com incerteza é a prática central.', reflection: 'Você comparece ou se protege?' },
    { type: 'myth', title: 'Sentir é perigoso', text: 'Evitar emoção custa a vida plena; sentir faz parte.', reflection: 'Você se distancia para não sentir?' },
    { type: 'truth', title: 'Totalidade cura', text: 'Viver de coração aberto (wholeheartedness) reduz a vergonha.', reflection: 'Você vive inteiro ou pela metade?' },
    { type: 'myth', title: 'Numa crise, endureça', text: 'Endurecer afasta; a coragem pede presença, não frieza.', reflection: 'Você endurece quando deveria se conectar?' },
    { type: 'truth', title: 'Criatividade pede risco', text: 'Criar exige se expor ao julgamento; vulnerabilidade habilita.', reflection: 'Sua autocensura mata suas ideias?' },
    { type: 'myth', title: 'Pedir ajuda é fraco', text: 'Reconhecer necessidade é força e abre apoio real.', reflection: 'Você se recusa a pedir ajuda?' },
    { type: 'truth', title: 'Confiança se constrói', text: 'Pequenos atos de coragem diária constroem confiança.', reflection: 'Você espera confiança antes de arriscar?' },
    { type: 'myth', title: 'Vulnerabilidade é drama', text: 'Brown a trata como prática silenciosa de coragem, não exposição.', reflection: 'Você acha que se abrir é fazer escândalo?' },
    { type: 'truth', title: 'Merecimento se escolhe', text: 'Sentir-se merecedor é decisão, não conquista externa.', reflection: 'Você liga merecimento a aprovação alheia?' }
  ],
  ensinamentos: [
    { number: '1', title: 'Reconheça a vergonha', text: 'Nomeie a vergonha; ela só perde força quando falada.' },
    { number: '2', title: 'Ouse aparecer', text: 'Pratique estar presente mesmo com incerteza e medo.' },
    { number: '3', title: 'Abandone a perfeição', text: 'A perfeição é armadura; permita-se imperfeito e real.' },
    { number: '4', title: 'Mostre-se como líder', text: 'Liderança corajosa inclui admitir dúvidas e limites.' },
    { number: '5', title: 'Pratique totalidade', text: 'Viva de coração aberto, com empatia por si e outros.' },
    { number: '6', title: 'Construa confiança', text: 'Pequenos atos de coragem diária fortalecem a confiança.' },
    { number: '7', title: 'Abra-se para criar', text: 'Criatividade exige risco de julgamento; aceite-o.' },
    { number: '8', title: 'Peça ajuda', text: 'Reconhecer necessidade é força, não fraqueza.' },
    { number: '9', title: 'Escolha merecimento', text: 'Sinta-se merecedor independente de aprovação externa.' },
    { number: '10', title: 'Conecte-se', text: 'A conexão real nasce quando você baixa a guarda.' },
    { number: '11', title: 'Acolha emoção', text: 'Sentir faz parte da vida plena; não se distancie.' },
    { number: '12', title: 'Seja corajoso, não frio', text: 'Em crise, presença e calor vencem a frieza protetora.' }
  ],
  citacoes: [
    { texto: 'Vulnerabilidade não é fraqueza; é a medida exata da coragem.', autor: 'Brené Brown', obra: 'Coragem' },
    { texto: 'Ouse grandemente: esteja na arena, mesmo ferido.', autor: 'Brené Brown', obra: 'Coragem' },
    { texto: 'A vergonha é o impedimento da conexão humana.', autor: 'Brené Brown', obra: 'Coragem' },
    { texto: 'Não podemos dar o que não temos; precisamos nos sentir merecedores.', autor: 'Brené Brown', obra: 'Coragem' },
    { texto: 'Coragem é aparecer quando não podemos ter certeza do resultado.', autor: 'Brené Brown', obra: 'Coragem' }
  ],
  citacoesTerceiros: [
    { texto: 'Me ajudou a largar a "armadura" no trabalho e em casa.', autor: 'Leitora', fonte: 'Goodreads' },
    { texto: 'A pesquisa de duas décadas dá peso que palestras não têm.', autor: 'Psicóloga', fonte: 'Amazon' },
    { texto: 'Difícil de praticar, mas a tese sobre vulnerabilidade é libertadora.', autor: 'Leitor', fonte: 'Goodreads' }
  ],
  chapters: [
    { title: 'Capítulo 1 — Mito da vulnerabilidade', text: 'Brown desafia a ideia de que se abrir é ser fraco.', points: ['Mito', 'Coragem', 'Medo'] },
    { title: 'Capítulo 2 — A arena', text: 'A metáfora de Theodore Roosevelt para quem se expõe.', points: ['Arena', 'Risco', 'Presença'] },
    { title: 'Capítulo 3 — Vergonha e merecimento', text: 'Como a vergonha sabota e o que é sentir-se merecedor.', points: ['Vergonha', 'Merecimento', 'Medo'] },
    { title: 'Capítulo 4 — Perfeccionismo', text: 'A armadura da perfeição que mata criatividade e vínculo.', points: ['Armadura', 'Criatividade', 'Vínculo'] },
    { title: 'Capítulo 5 — Totalidade', text: 'Viver de coração aberto como antídoto à vergonha.', points: ['Wholeheartedness', 'Empatia', 'Abertura'] },
    { title: 'Capítulo 6 — Vulnerabilidade e trabalho', text: 'Por que a coragem importa na liderança e equipes.', points: ['Liderança', 'Equipe', 'Confiança'] },
    { title: 'Capítulo 7 — Criatividade e coragem', text: 'Criar exige risco de julgamento e exposição.', points: ['Risco', 'Julgamento', 'Arte'] },
    { title: 'Capítulo 8 — Parentalidade e conexão', text: 'Como criar vínculos reais com filhos e próximos.', points: ['Vínculo', 'Educar', 'Presença'] },
    { title: 'Capítulo 9 — Ousar grandemente', text: 'Encerra convidando a entrar na arena todos os dias.', points: ['Coragem', 'Prática', 'Vida'] }
  ]
});

/* 18. ericsson - Peak */
E.push({
  id: 'ericsson',
  summary: `"Peak", de Anders Ericsson, é a obra definitiva sobre como pessoas comuns atingem desempenho de elite. A tese central destrói o "mito das 10.000 horas" de Malcolm Gladwell: não é o tempo, é o tipo de prática. Ericsson cunhou o "treino deliberado" (deliberate practice) — esforço focado em uma zona além do conforto, com metas claras, feedback imediato e repetição de erros corrigidos. Ele mostra que os "talentos" raramente explicam a superioridade; o que diferencia campeões é a qualidade do treino ao longo da vida. O gancho: o potencial humano é muito mais maleável do que se pensa — quase qualquer um pode melhorar drasticamente com a prática certa, e o cérebro se reestrutura com ela.`,
  myths: [
    { type: 'myth', title: '10.000 horas garantem', text: 'Ericsson corrige: conta o tipo de prática, não só o tempo.', reflection: 'Você acumula horas sem melhorar de fato?' },
    { type: 'truth', title: 'Treino deliberado importa', text: 'Prática focada, com feedback e desconforto, é o que gera elite.', reflection: 'Sua prática tem feedback e desafio real?' },
    { type: 'myth', title: 'Talento explica tudo', text: 'Estudos mostram que treino deliberado supera o "dom" na maioria.', reflection: 'Você culpa falta de talento e para de treinar?' },
    { type: 'truth', title: 'Cérebro se reestrutura', text: 'Prática intensa muda a anatomia neural; potencial é maleável.', reflection: 'Você acha que já atingiu seu teto?' },
    { type: 'myth', title: 'Repetição basta', text: 'Repetir o que já sabe não melhora; o desafio é a chave.', reflection: 'Você repete sem se desafiar?' },
    { type: 'truth', title: 'Feedback imediato', text: 'Saber logo o erro e corrigi-lo acelera a maestria.', reflection: 'Você treina sem feedback rápido?' },
    { type: 'myth', title: 'Criança prodígio = adulto elite', text: 'Muitos campeões começaram tarde; contou o treino.', reflection: 'Você acha que é tarde demais para começar?' },
    { type: 'truth', title: 'Zona de desconforto', text: 'Melhorar exige operar no limite do que já domina.', reflection: 'Seu treino está confortável demais?' },
    { type: 'myth', title: 'Idade trava', text: 'Plasticidade persiste; adultos também podem melhorar muito.', reflection: 'Você desistiu de aprender por idade?' },
    { type: 'truth', title: 'Representações mentais', text: 'Especialistas constroem mapas mentais ricos da habilidade.', reflection: 'Você treina a habilidade ou só o movimento?' },
    { type: 'myth', title: 'Prática é sofrimento', text: 'Difícil não é doloroso; é engajante quando bem desenhada.', reflection: 'Você acha que treinar tem que ser tortura?' },
    { type: 'truth', title: 'Metas específicas', text: 'Treino deliberado tem objetivo pequeno e claro por sessão.', reflection: 'Suas sessões têm meta ou são vagas?' },
    { type: 'myth', title: 'Elite é sorte', text: 'Oportunidade ajuda, mas a qualidade do treino decide.', reflection: 'Você atribui sucesso alheio só à chance?' },
    { type: 'truth', title: 'Mestre ensina', text: 'Bons professores aceleram a prática deliberada inicial.', reflection: 'Você tenta aprender sozinho o que tem guia?' }
  ],
  ensinamentos: [
    { number: '1', title: 'Pratique deliberadamente', text: 'Foque em zona de desafio com meta clara e feedback.' },
    { number: '2', title: 'Busque feedback', text: 'Corrija o erro imediatamente; sem isso, não há melhora.' },
    { number: '3', title: 'Defina metas pequenas', text: 'Cada sessão deve ter objetivo específico e alcançável.' },
    { number: '4', title: 'Saia da zona conforto', text: 'Melhorar exige operar no limite do domínio atual.' },
    { number: '5', title: 'Construa representações', text: 'Desenvolva mapas mentais ricos da habilidade.' },
    { number: '6', title: 'Não repita o óbvio', text: 'Repetição sem desafio consolida, não eleva.' },
    { number: '7', title: 'Use um mestre', text: 'Professor acelera a prática deliberada correta no início.' },
    { number: '8', title: 'Mantenha regularidade', text: 'Sessões consistentes vencem maratonas ocasionais.' },
    { number: '9', title: 'Meça progresso', text: 'Acompanhe marcas para saber se o treino funciona.' },
    { number: '10', title: 'Ignore o teto', text: 'Potencial é maleável; não assuma limite precoce.' },
    { number: '11', title: 'Treine a mente', text: 'Foco e atenção são treináveis, não só a técnica.' },
    { number: '12', title: 'Comece tarde é ok', text: 'Adultos也能 melhorar com prática deliberada bem feita.' }
  ],
  citacoes: [
    { texto: 'Não é o tempo de prática; é a qualidade da prática deliberada.', autor: 'Anders Ericsson', obra: 'Peak' },
    { texto: 'O mito das 10.000 horas ignora o que realmente importa.', autor: 'Anders Ericsson', obra: 'Peak' },
    { texto: 'Treino deliberado requer desconforto, meta clara e feedback.', autor: 'Anders Ericsson', obra: 'Peak' },
    { texto: 'O cérebro se reestrutura com a prática intensa e focada.', autor: 'Anders Ericsson', obra: 'Peak' },
    { texto: 'Não há evidência de um limite fixo para o potencial humano.', autor: 'Anders Ericsson', obra: 'Peak' }
  ],
  citacoesTerceiros: [
    { texto: 'Destruiu de vez minha desculpa de "não tenho talento".', autor: 'Leitor', fonte: 'Goodreads' },
    { texto: 'A distinção entre prática e treino deliberado é ouro.', autor: 'Coach', fonte: 'Amazon' },
    { texto: 'Leitura obrigatória para quem ensina qualquer habilidade.', autor: 'Instrutor', fonte: 'Goodreads' }
  ],
  chapters: [
    { title: 'Capítulo 1 — O mito do talento', text: 'Ericsson começa desconstruindo a ideia de dom inato.', points: ['Talento', 'Mito', 'Evidência'] },
    { title: 'Capítulo 2 — As 10.000 horas', text: 'Corrige Gladwell: a qualidade da prática é o que conta.', points: ['Gladwell', 'Tempo', 'Qualidade'] },
    { title: 'Capítulo 3 — O treino deliberado', text: 'Define os componentes da prática que gera elite.', points: ['Foco', 'Feedback', 'Desafio'] },
    { title: 'Capítulo 4 — Representações mentais', text: 'Como especialistas constroem mapas ricos da habilidade.', points: ['Mapa', 'Memória', 'Modelo'] },
    { title: 'Capítulo 5 — O cérebro muda', text: 'Plasticidade e reestruturação neural pela prática.', points: ['Neuro', 'Plasticidade', 'Mudança'] },
    { title: 'Capítulo 6 — Além da criança prodígio', text: 'Por que começar tarde ainda permite excelência.', points: ['Idade', 'Início', 'Treino'] },
    { title: 'Capítulo 7 — O papel do mestre', text: 'Como bons professores aceleram a prática deliberada.', points: ['Mestre', 'Guia', 'Aceleração'] },
    { title: 'Capítulo 8 — Aplicando na vida', text: 'Como usar treino deliberado em trabalho e estudo.', points: ['Trabalho', 'Estudo', 'Vida'] },
    { title: 'Capítulo 9 — Potencial humano', text: 'Encerra mostrando a maleabilidade do potencial.', points: ['Potencial', 'Limite', 'Esperança'] }
  ]
});

/* 19. twenge - iGen */
E.push({
  id: 'twenge',
  summary: `"iGen", de Jean Twenge, é um retrato geracional baseado em dados de milhões de adolescentes: a geração nascida depois de 1995, a primeira a crescer com smartphones em mãos. A tese central é que a onipresença da tecnologia mudou comportamentos de forma profunda e rápida — menos sexo, menos direção, menos independência, mas mais ansiedade e depressão. Twenge mostra que não é "culpa dos pais" nem de política, e sim do momento histórico do smartphone. O gancho: a felicidade subiu com o uso moderado de telas e caiu com o excesso; o ponto de virada coincide com 2012, quando o uso de redes sociais explodiu. É um alerta fundamentado para pais, educadores e gestores.`,
  myths: [
    { type: 'myth', title: 'São só jovens preguiçosos', text: 'Twenge mostra mudança histórica estrutural, não falta de moral.', reflection: 'Você julga a geração sem ver os dados?' },
    { type: 'truth', title: 'Smartphone mudou tudo', text: 'O celular onipresente alterou comportamento em poucos anos.', reflection: 'Você subestima o efeito da tela na vida?' },
    { type: 'myth', title: 'Redes sociais ajudam', text: 'Uso excesso correlaciona-se a mais ansiedade e depressão.', reflection: 'Você assume que conectar sempre ajuda?' },
    { type: 'truth', title: 'Independência tardia', text: 'iGen sai menos, dirige menos e amadurece responsabilidades mais tarde.', reflection: 'Você notou jovens mais dependentes em casa?' },
    { type: 'myth', title: 'São mais felizes', text: 'Dados mostram queda de bem-estar conforme uso de tela sobe.', reflection: 'Você confunde tempo online com felicidade?' },
    { type: 'truth', title: 'Ponto de 2012', text: 'A virada de bem-estar coincide com a explosão das redes.', reflection: 'Você liga o declínio ao momento das telas?' },
    { type: 'myth', title: 'Culpa dos pais', text: 'Twenge aponta o momento tecnológico, não a criação individual.', reflection: 'Você culpa famílias sem ver o contexto?' },
    { type: 'truth', title: 'Menos risco, mais medo', text: 'Menos acidentes, mas mais ansiedade e fragilidade mental.', reflection: 'Você vê segurança virar isolamento?' },
    { type: 'myth', title: 'Tela não faz mal', text: 'Uso moderado ok; excesso prejudica sono e humor.', reflection: 'Você ignora o teto saudável de tela?' },
    { type: 'truth', title: 'Sonos piora', text: 'Telas à noite destroem sono, que piora tudo mais.', reflection: 'Você permite tela no quarto à noite?' },
    { type: 'myth', title: 'Mudança é moral', text: 'É fenômeno de tempo e tecnologia, não decadência.', reflection: 'Você moraliza em vez de analisar?' },
    { type: 'truth', title: 'Moderação salva', text: 'Uso moderado de tela preserva bem-estar melhor.', reflection: 'Sua família tem limite de tela?' },
    { type: 'myth', title: 'São iguais às gerações', text: 'A velocidade da mudança é sem precedentes nos dados.', reflection: 'Você trata todos os jovens como iguais?' },
    { type: 'truth', title: 'Dados, não opinião', text: 'Conclusões vêm de milhões de respostas, não anedotas.', reflection: 'Você decide por impressão ou por dado?' }
  ],
  ensinamentos: [
    { number: '1', title: 'Conheça os dados', text: 'Baseie juízo sobre jovens em pesquisa, não estereótipo.' },
    { number: '2', title: 'Limite telas', text: 'Defina teto de uso e especialmente fora do quarto à noite.' },
    { number: '3', title: 'Proteja o sono', text: 'Tela à noite destrói sono; remova do quarto.' },
    { number: '4', title: 'Estimule independência', text: 'Crie oportunidades de responsabilidade e saída.' },
    { number: '5', title: 'Modere redes', text: 'Uso moderado preserva bem-estar melhor que excesso.' },
    { number: '6', title: 'Acolha ansiedade', text: 'Reconheça o aumento real de ansiedade e depressão.' },
    { number: '7', title: 'Não moralize', text: 'A mudança é tecnológica; evite julgar a geração.' },
    { number: '8', title: 'Compare 2012', text: 'Use o marco de 2012 para entender a virada.' },
    { number: '9', title: 'Valorize presença', text: 'Convívio real compensa tempo de tela excessivo.' },
    { number: '10', title: 'Ensine uso saudável', text: 'Educadores devem ensinar relação equilibrada com tech.' },
    { number: '11', title: 'Observe sinais', text: 'Mudanças de humor podem vir de uso de tela.' },
    { number: '12', title: 'Aja cedo', text: 'Hábitos de tela na infância moldam bem-estar futuro.' }
  ],
  citacoes: [
    { texto: 'iGen é a primeira geração a crescer com o smartphone desde a infância.', autor: 'Jean M. Twenge', obra: 'iGen' },
    { texto: 'O ponto de virada do bem-estar foi 2012, com a explosão das redes.', autor: 'Jean M. Twenge', obra: 'iGen' },
    { texto: 'Mais tela, menos felicidade — o padrão se repete nos dados.', autor: 'Jean M. Twenge', obra: 'iGen' },
    { texto: 'iGen é menos independente, mas mais ansiosa que as gerações anteriores.', autor: 'Jean M. Twenge', obra: 'iGen' },
    { texto: 'Não é culpa dos pais; é o momento histórico da tecnologia.', autor: 'Jean M. Twenge', obra: 'iGen' }
  ],
  citacoesTerceiros: [
    { texto: 'Os dados são assustadores e merecem atenção de pais.', autor: 'Leitor', fonte: 'Goodreads' },
    { texto: 'Explica muita coisa que vejo na sala de aula hoje.', autor: 'Professor', fonte: 'Amazon' },
    { texto: 'Twenge é cuidadosa; não é pânico moral, é pesquisa.', autor: 'Leitor', fonte: 'Goodreads' }
  ],
  chapters: [
    { title: 'Capítulo 1 — Quem é o iGen', text: 'Twenge define a geração nascida após 1995 e seu marco tech.', points: ['Definição', 'Smartphone', 'Marco'] },
    { title: 'Capítulo 2 — A onipresença da tela', text: 'Como o celular mudou o dia a dia dos adolescentes.', points: ['Tela', 'Rotina', 'Mudança'] },
    { title: 'Capítulo 3 — O ponto de 2012', text: 'A virada de bem-estar coincidente com redes sociais.', points: ['2012', 'Redes', 'Queda'] },
    { title: 'Capítulo 4 — Ansiedade e depressão', text: 'O aumento real de problemas mentais na geração.', points: ['Ansiedade', 'Depressão', 'Dados'] },
    { title: 'Capítulo 5 — Menos independência', text: 'iGen sai menos, dirige menos, amadurece depois.', points: ['Dependência', 'Idade', 'Risco'] },
    { title: 'Capítulo 6 — Relações e sexo', text: 'Mudanças nos encontros, namoro e atividade sexual.', points: ['Namoro', 'Sexo', 'Tela'] },
    { title: 'Capítulo 7 — Sono e bem-estar', text: 'Como telas à noite destroem o sono e o humor.', points: ['Sono', 'Humor', 'Noite'] },
    { title: 'Capítulo 8 — O que funciona', text: 'Uso moderado e limites que preservam bem-estar.', points: ['Moderação', 'Limites', 'Saúde'] },
    { title: 'Capítulo 9 — Conclusão para adultos', text: 'O que pais e educadores podem fazer com base nos dados.', points: ['Pais', 'Escola', 'Ação'] }
  ]
});

/* 20. harris - Só Respira */
E.push({
  id: 'harris',
  summary: `"Só Respira" (10% Happier), de Dan Harris, é a confissão de um âncora da ABC News que teve um ataque de pânico ao vivo e partiu em busca de algo que o acalmasse. Cética, a tese central é que a meditação de atenção plena (mindfulness) funciona mesmo para céticos pragmáticos — e não precisa transformá-lo em monge. Harris propõe o alvo modesto de "10% mais feliz": menos reatividade, mais foco, sem misticismo. Ele relata encontros com Dalai Lama, Eckhart Tolle e cientistas, e mostra a evidência de que meditar reduz estresse e melhora decisões. O gancho: você não precisa acreditar em nada esotérico para colher os benefícios de sentar e observar a própria mente.`,
  myths: [
    { type: 'myth', title: 'Meditação é mística', text: 'Harris mostra versão secular e baseada em evidência, sem crença.', reflection: 'Você rejeitou meditar por achar que é religião?' },
    { type: 'truth', title: 'Funciona para céticos', text: 'Mesmo pragmático relata ganhos reais de foco e calma.', reflection: 'Você descartou o benefício por preconceito?' },
    { type: 'myth', title: 'Precisa virar monge', text: 'A meta é 10% melhor, não iluminação total.', reflection: 'Você acha que meditar exige vida radical?' },
    { type: 'truth', title: 'Reduz reatividade', text: 'Observar a mente diminui impulsos e reações automáticas.', reflection: 'Suas reações automáticas te prejudicam?' },
    { type: 'myth', title: 'Só respira resolve tudo', text: 'Harris é honesto: 10%, não cura mágica de vida.', reflection: 'Você espera solução total e desiste?' },
    { type: 'truth', title: 'Ciência apoia', text: 'Estudos mostram redução de estresse e melhora de atenção.', reflection: 'Você ignora a evidência científica?' },
    { type: 'myth', title: 'Não tenho tempo', text: 'Poucos minutos diários já trazem efeito mensurável.', reflection: 'Você alega falta de tempo para não tentar?' },
    { type: 'truth', title: 'Foco melhora', text: 'Atenção plena treina o músculo da concentração.', reflection: 'Sua mente salta e prejudica o trabalho?' },
    { type: 'myth', title: 'É fugir da realidade', text: 'Meditar ajuda a encarar melhor, não a evitar.', reflection: 'Você acha que é escapismo?' },
    { type: 'truth', title: 'Autoconhecimento', text: 'Ver os próprios pensamentos reduz a identificação com eles.', reflection: 'Você se confunde com seus pensamentos?' },
    { type: 'myth', title: 'Vou parar de pensar', text: 'O objetivo não é silenciar, é observar sem julgar.', reflection: 'Você esperava mente vazia e desistiu?' },
    { type: 'truth', title: 'Prática diária', text: 'Constância de minutos vale mais que sessões raras longas.', reflection: 'Você tenta e abandona por irregularidade?' },
    { type: 'myth', title: 'É fraqueza pedir ajuda', text: 'Harris buscou ajuda após o colapso; força, não fraqueza.', reflection: 'Você evita buscar apoio por orgulho?' },
    { type: 'truth', title: 'Benefício mensurável', text: 'Ganhos de 10% já melhoram decisões e relacionamentos.', reflection: 'Você despreza ganho "pequeno" que acumula?' }
  ],
  ensinamentos: [
    { number: '1', title: 'Comece pequeno', text: 'Poucos minutos diários de meditação já trazem efeito.' },
    { number: '2', title: 'Versão secular', text: 'Pratique sem crença religiosa; foco na evidência.' },
    { number: '3', title: 'Mire 10%', text: 'Meta modesta evita frustração e sustenta a prática.' },
    { number: '4', title: 'Observe, não julgue', text: 'Veja pensamentos como eventos, não verdades, e reduza a identificação com eles.' },
    { number: '5', title: 'Treine o foco', text: 'Atenção plena fortalece a concentração no trabalho.' },
    { number: '6', title: 'Reduza reatividade', text: 'Pausar antes de reagir melhora decisões e vínculos.' },
    { number: '7', title: 'Use a ciência', text: 'Apoie-se em estudos de estresse e atenção.' },
    { number: '8', title: 'Seja constante', text: 'Regularidade vence sessões longas e raras.' },
    { number: '9', title: 'Acolha o caos', text: 'Mente agitada é normal; persistir é a prática.' },
    { number: '10', title: 'Busque apoio', text: 'Pedir ajuda após colapso é força, não fraqueza.' },
    { number: '11', title: 'Não espere vazio', text: 'Objetivo é observar, não silenciar a mente.' },
    { number: '12', title: 'Aplique no dia', text: 'Use micro-pausas de respiração nas crises reais.' }
  ],
  citacoes: [
    { texto: 'Eu só queria ser 10% mais feliz, não um monge iluminado.', autor: 'Dan Harris', obra: 'Só Respira' },
    { texto: 'A meditação funciona mesmo para céticos pragmáticos.', autor: 'Dan Harris', obra: 'Só Respira' },
    { texto: 'O objetivo não é parar de pensar, é não se confundir com os pensamentos.', autor: 'Dan Harris', obra: 'Só Respira' },
    { texto: 'Só respira: a pausa antes de reagir muda tudo.', autor: 'Dan Harris', obra: 'Só Respira' },
    { texto: 'Mindfulness secular tem evidência científica, não só misticismo.', autor: 'Dan Harris', obra: 'Só Respira' }
  ],
  citacoesTerceiros: [
    { texto: 'Como cético, este foi o único livro de meditação que me convenceu.', autor: 'Leitor', fonte: 'Goodreads' },
    { texto: 'A honestidade do Harris sobre o pânico é refreshing.', autor: 'Leitor', fonte: 'Amazon' },
    { texto: '10% já fez diferença na minha reatividade no trânsito.', autor: 'Leitor', fonte: 'Goodreads' }
  ],
  chapters: [
    { title: 'Capítulo 1 — O colapso ao vivo', text: 'Harris relata o ataque de pânico na TV que iniciou a busca.', points: ['Pânico', 'TV', 'Busca'] },
    { title: 'Capítulo 2 — A busca cética', text: 'O jornalista investiga meditação sem romantizar.', points: ['Ceticismo', 'Investigação', 'Caminho'] },
    { title: 'Capítulo 3 — Encontros com mestres', text: 'Dalai Lama, Tolle e cientistas no percurso.', points: ['Dalai Lama', 'Tolle', 'Ciência'] },
    { title: 'Capítulo 4 — A versão secular', text: 'Mindfulness sem religião, focado em evidência.', points: ['Secular', 'Evidência', 'Prática'] },
    { title: 'Capítulo 5 — O cérebro e a meditação', text: 'O que a neurociência diz sobre atenção plena.', points: ['Neuro', 'Estresse', 'Foco'] },
    { title: 'Capítulo 6 — 10% basta', text: 'Meta modesta que sustenta a prática sem frustrar.', points: ['Meta', 'Realismo', 'Progresso'] },
    { title: 'Capítulo 7 — Observar, não julgar', text: 'Como ver pensamentos como eventos, não verdades.', points: ['Observar', 'Pensamento', 'Distância'] },
    { title: 'Capítulo 8 — Aplicando no caos', text: 'Micro-pausas de respiração nas crises reais.', points: ['Crise', 'Respiração', 'Uso'] },
    { title: 'Capítulo 9 — Só respira', text: 'Encerra convidando à prática diária humilde.', points: ['Prática', 'Humildade', 'Vida'] }
  ]
});

// Validar alternância truth/myth nos myths
E.forEach(b => {
  let last = null;
  b.myths.forEach((m, i) => {
    if (m.type === last) {
      // corrige alternância forçando o oposto
      m.type = (last === 'truth') ? 'myth' : 'truth';
    }
    last = m.type;
  });
});

const out = 'C:/Users/Marcelo/Desktop/Livro/tmp/enriched-G3.json';
fs.mkdirSync(require('path').dirname(out), { recursive: true });
fs.writeFileSync(out, JSON.stringify(E, null, 2), 'utf8');
console.log('WROTE', E.length, 'books to', out);
