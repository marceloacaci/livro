'use strict';
const fs = require('fs');
const vm = require('vm');
const path = require('path');

// --- Carrega js/books.js em sandbox vm para ler title/titlePt/author reais ---
const booksPath = path.join(__dirname, '..', 'js', 'books.js');
const code = fs.readFileSync(booksPath, 'utf8');
const sandbox = { window: {} };
vm.createContext(sandbox);
vm.runInContext(code, sandbox);
const BOOKS = sandbox.window.MEU_BOLSO_BOOKS || [];
const byId = {};
BOOKS.forEach(b => { byId[b.id] = b; });

const ids = ['lynch','dalio','marks','ellis','hagstrom','greenblatt','schwager','richards','sethi','lowenstein','lencioni','voss','seneca','epiteto','aurelio','holiday','babauta','becker','millburn','kwik'];

function meta(id){
  const b = byId[id];
  if(!b) throw new Error('Livro nao encontrado: '+id);
  return { id, _title:b.title, _titlePt:b.titlePt, _author:b.author };
}

// ============================ LYNCH ============================
function lynch(){
  const m = meta('lynch');
  return Object.assign({}, { id:m.id }, {
    summary: `Em "Um Investidor Antes de Tudo", Peter Lynch — que geriu o fundo Magellan da Fidelity e o multiplicou por 28 vezes — argumenta que o investidor comum tem vantagem sobre Wall Street: ele conhece marcas, produtos e hábitos de consumo em seu próprio cotidiano muito antes dos analistas. O livro ensina a transformar essa "vantagem local" em lucro identificando tenbaggers (ações que podem multiplicar por dez o capital). Lynch propõe categorizar as empresas em seis tipos — crescedoras lentas, robustas, de crescimento rápido, cíclicas, de recuperação e jogadas de ativos — pois cada uma exige lógica e paciência distintas. Ele defende pesquisa própria em vez de seguir a manada, ler o balanço com olhar prático e ignorar o ruído macroeconômico de curto prazo. A tese central é desmistificar o mercado: investir bem não exige PhD em finanças, mas sim curiosidade, disciplina e disposição para "fazer o dever de casa" antes de comprar qualquer ação.`,
    myths: [
      {type:'myth', title:'Só quem trabalha em Wall Street entende o mercado', text:'Lynch mostra que o cidadão comum vê tendências de consumo antes dos analistas.', reflection:'Que marcas você usa e os analistas ainda não notaram?'},
      {type:'truth', title:'Invista no que você conhece', text:'A vantagem do investidor individual está no conhecimento do próprio dia a dia.', reflection:'Você pesquisa antes de comprar uma TV — faz o mesmo antes de comprar a ação?'},
      {type:'myth', title:'Prever o mercado é essencial para ganhar', text:'Lynch ignora previsões macro e foca na empresa específica.', reflection:'Quantas previsões do mercado realmente acertaram sua vida?'},
      {type:'truth', title:'Existem seis categorias de ações', text:'Crescedoras lentas, robustas, rápidas, cíclicas, recuperação e ativos pedem estratégias diferentes.', reflection:'Você sabe em qual categoria sua ação se encaixa?'},
      {type:'myth', title:'Dividendos e pagamentos garantem boa ação', text:'O que importa é o potencial de crescimento do lucro, não o dividendo isolado.', reflection:'Você compra pelo dividendo ou pela empresa?'},
      {type:'truth', title:'O tenbagger vem de empresas pequenas e em crescimento', text:'Ações que multiplicam por 10 começam desapercebidas pelo mercado.', reflection:'Você busca o óbvio ou o desapercebido?'},
      {type:'myth', title:'Carteira diversificada demais protege', text:'Lynch prefere conhecer bem poucas empresas a ter muitas que não entende.', reflection:'Você diversifica por segurança ou por não saber escolher?'},
      {type:'truth', title:'O tempo no mercado vence o timing', text:'Recomprar e segurar anos supera tentar acertar o topo e o fundo.', reflection:'Você investe para décadas ou para o próximo trimestre?'},
      {type:'myth', title:'Notícia ruim sempre é venda', text:'Muitas vezes más notícias já estão no preço e criam oportunidade.', reflection:'Você vende no pânico ou compra na chance?'},
      {type:'truth', title:'Histórico de lucros crescentes é o norte', text:'Lynch examina 3 a 5 anos de crescimento de lucro por ação.', reflection:'Você olha o passado da empresa ou só a emoção do momento?'},
      {type:'myth', title:'Empresa com "nome forte" é investimento seguro', text:'Marcas famosas podem ser caras demais para valer a compra.', reflection:'Você confunde fama com preço justo?'},
      {type:'truth', title:'Endividamento baixo reduz risco', text:'Dívida excessiva destrói empresas em crises, mesmo boas.', reflection:'A empresa que você analisa tem balanço sólido?'},
      {type:'myth', title:'Investir é apostar', text:'Com pesquisa, é compra de negócio real, não jogo.', reflection:'Você trata ações como cassino ou como empresas?'},
      {type:'truth', title:'Venda quando a história mudou', text:'Se o motivo da compra deixou de existir, saia — não por preço.', reflection:'Você ainda sabe por que comprou aquela ação?'}
    ],
    ensinamentos: [
      {number:'1', title:'Use sua vantagem local', text:'Observe produtos e serviços que você e sua comunidade adotam antes dos analistas.'},
      {number:'2', title:'Categorize a ação', text:'Identifique se é crescedora lenta, robusta, rápida, cíclica, recuperação ou ativo.'},
      {number:'3', title:'Busque o tenbagger', text:'Foque em empresas pequenas com potencial de multiplicar o capital por dez.'},
      {number:'4', title:'Pesquise o balanço', text:'Leia ativos, dívidas, margem e fluxo de caixa com olhar prático.'},
      {number:'5', title:'Ignore o ruído macro', text:'Ninguém prevê recessão consistentemente; foque na empresa.'},
      {number:'6', title:'Conheça antes de comprar', text:'Só compre o que entende profundamente.'},
      {number:'7', title:'Olhe 3 a 5 anos de lucro', text:'Crescimento sustentado de lucro por ação é o melhor sinal.'},
      {number:'8', title:'Evite dívida excessiva', text:'Empresas alavancadas quebram em crises; prefira balanço sólido.'},
      {number:'9', title:'Seja paciente', text:'As grandes fortunas vêm de segurar anos, não de operar todo dia.'},
      {number:'10', title:'Venda pela mudança de história', text:'Saia quando o motivo original da compra desaparecer.'},
      {number:'11', title:'Desconfie de modismos', text:'Papel quente costuma esfriar; busque o desapercebido.'},
      {number:'12', title:'Faça seu dever de casa', text:'Trabalho prévio supera sorte e dicas de terceiros.'}
    ],
    citacoes: [
      {texto:'Sabe de uma coisa? As ações não sabem que você as possui.', autor:'Peter Lynch', obra:'One Up on Wall Street'},
      {texto:'Na ausência de outros compradores, a melhor hora para comprar uma ação é quando você a encontra.', autor:'Peter Lynch', obra:'One Up on Wall Street'},
      {texto:'Se você não conseguir explicar por que comprou uma ação em duas linhas, não a compre.', autor:'Peter Lynch', obra:'One Up on Wall Street'},
      {texto:'O investidor individual tem uma vantagem real sobre os profissionais de Wall Street.', autor:'Peter Lynch', obra:'One Up on Wall Street'},
      {texto:'Venda suas ações vencedoras e segure as perdedoras é como cortar as flores e regar as ervas daninhas.', autor:'Peter Lynch', obra:'One Up on Wall Street'}
    ],
    citacoesTerceiros: [
      {texto:'O guia definitivo para transformar o investidor comum em dono de sua própria estratégia.', autor:'Forbes', fonte:'Resenha'},
      {texto:'Lynch humanizou o investimento e provou que conhecimento do cotidiano vale mais que diplomas.', autor:'Leitor', fonte:'Amazon'}
    ],
    chapters: [
      {title:'Capítulo 1 — A Vantagem do Investidor Comum', text:'Lynch explica por que o cidadão comum pode vencer Wall Street usando o que já sabe.', points:['O profissional ignora marcas do dia a dia','Você percebe tendências de consumo antes dos analistas','Conhecimento local é vantagem real']},
      {title:'Capítulo 2 — As Seis Categorias de Ações', text:'Classificar ajuda a definir paciência e critério de saída.', points:['Crescedoras lentas pagam dividendos estáveis','Robustas crescem com previsibilidade','Cíclicas dependem do momento econômico']},
      {title:'Capítulo 3 — O Que Observar no Balanço', text:'Indicadores práticos para avaliar saúde financeira.', points:['Dívida deve ser baixa frente ao caixa','Margem e fluxo de caixa revelam força','Crescimento de lucropor ação por anos']},
      {title:'Capítulo 4 — Os Tenbaggers', text:'Ações que multiplicam por dez são o motor das grandes carteiras.', points:['Começam pequenas e desapercebidas','Exigem convicção e paciência','Poucos acertos grandes compensam vários erros']},
      {title:'Capítulo 5 — O Ruído Macro', text:'Previsões de mercado raramente ajudam o indivíduo.', points:['Ninguém acerta topo e fundo','Foco na empresa, não no índice','Notícia ruim pode ser oportunidade']},
      {title:'Capítulo 6 — Comprar e Segurar', text:'O tempo no mercado supera o timing.', points:['Recomprar e segurar anos','Vender por mudança de história','Evitar operar por impulso']},
      {title:'Capítulo 7 — Erros Comuns', text:'Disciplina evita as armadilhas do investidor emocional.', points:['Não confundir fama com preço justo','Modismo esfria rápido','Diversificar sem entender é perigoso']},
      {title:'Capítulo 8 — Fazendo o Dever de Casa', text:'Pesquisa própria substitui sorte e dicas.', points:['Ler o relatório anual','Conversar com a empresa','Ter tese escrita de duas linhas']}
    ]
  });
}

// ============================ DALIO ============================
function dalio(){
  const m = meta('dalio');
  return Object.assign({}, { id:m.id }, {
    summary: `Em "Princípios", Ray Dalio — fundador da Bridgewater, o maior fundo de hedge do mundo — sistematiza as regras que guiaram seu sucesso e suas falhas. O livro divide-se em vida e trabalho, pregando transparência radical, honestidade brutal e decisões baseadas em pesos de credibilidade. Dalio apresenta o processo de cinco passos (metas, problemas, diagnóstico, design, execução) e a fórmula dor + reflexão = progresso. Ele defende que erros não são fracassos, mas feedback da realidade, e que devemos abraçar a verdade dolorosa para evoluir. A obra mistura filosofia pessoal, princípios de gestão e uma teoria das grandes eras econômicas (debt cycles), propondo que sistemas claros e acordados superam o talento individual isolado. É um manual de como pensar, decidir e construir organizações onde a melhor ideia vence, não a hierarquia.`,
    myths: [
      {type:'myth', title:'Genialidade isolada explica o sucesso', text:'Dalio atribui resultados a princípios sistêmicos e equipe, não a gênio solitário.', reflection:'Você creditar sorte ou sistema ao seu progresso?'},
      {type:'truth', title:'Dor + reflexão = progresso', text:'O erro bem processado é o motor do aprendizado.', reflection:'Você foge da dor ou a usa para crescer?'},
      {type:'myth', title:'Hierarquia deve decidir', text:'Decisões de peso de credibilidade vencem cargos.', reflection:'A melhor ideia na sua equipe sempre vence?'},
      {type:'truth', title:'Transparência radical gera confiança', text:'Dizer a verdade dura fortalece o grupo.', reflection:'Você esconde má notícia para agradar?'},
      {type:'myth', title:'Sentimentos devem guiar escolhas', text:'Princípios lógicos superam emoção no longo prazo.', reflection:'Você decide pelo sentimento ou pela lógica?'},
      {type:'truth', title:'Conheça suas fraquezas', text:'Mapear limitações permite cercá-las com ajuda.', reflection:'Você sabe o que não sabe?'},
      {type:'myth', title:'Plano rígido garante sucesso', text:'Adaptar-se à realidade importa mais que o plano inicial.', reflection:'Você se aferra ao plano ou à realidade?'},
      {type:'truth', title:'O processo de cinco passos funciona', text:'Metas, problemas, diagnóstico, design e execução em loop.', reflection:'Você repete o ciclo ou pula etapas?'},
      {type:'myth', title:'Conflito é ruim', text:'Desacordo honesto aprimora decisões.', reflection:'Você evita conflito e perde qualidade?'},
      {type:'truth', title:'Ciclos de dívida são previsíveis', text:'Dalio mapeia grandes eras econômicas recorrentes.', reflection:'Você entende onde a economia está no ciclo?'},
      {type:'myth', title:'Tudo depende de você', text:'Ninguém vence sozinho; cercar-se de complementares é vital.', reflection:'Sua equipe completa suas falhas?'},
      {type:'truth', title:'Princípios devem ser escritos', text:'Tornar regras explícitas evita interpretações.', reflection:'Seus princípios estão no papel?'},
      {type:'myth', title:'Evitar erros é o objetivo', text:'Errar e aprender supera nunca tentar.', reflection:'Você prefere segurança ou evolução?'},
      {type:'truth', title:'Realidade deve ser aceita', text:'Lutar contra os fatos desperdiça energia.', reflection:'Você aceita a realidade ou discute com ela?'}
    ],
    ensinamentos: [
      {number:'1', title:'Abrace a realidade', text:'Veja o mundo como ele é, não como gostaria que fosse.'},
      {number:'2', title:'Dor mais reflexão', text:'Use o erro como feedback para evoluir.'},
      {number:'3', title:'Metas claras', text:'Defina o que quer com precisão antes de agir.'},
      {number:'4', title:'Enfrente problemas', text:'Não ignore; identifique e nama os bloqueios.'},
      {number:'5', title:'Diagnostique a raiz', text:'Busque causa, não sintoma.'},
      {number:'6', title:'Projete soluções', text:'Crie planos concretos, não desejos.'},
      {number:'7', title:'Execute com disciplina', text:'Conclusão vale mais que intenção.'},
      {number:'8', title:'Peso de credibilidade', text:'Quem entende mais pesa mais na decisão.'},
      {number:'9', title:'Transparência', text:'Diga a verdade, mesmo quando desconfortável.'},
      {number:'10', title:'Conheça-se', text:'Mapeie pontos fortes e fracos com testes.'},
      {number:'11', title:'Cercar-se bem', text:'Busque quem completa suas lacunas.'},
      {number:'12', title:'Sistematize', text:'Escreva princípios para repetir o sucesso.'}
    ],
    citacoes: [
      {texto:'Dor + reflexão = progresso.', autor:'Ray Dalio', obra:'Principles'},
      {texto:'Abrace a realidade brutal e use o que aprender com ela.', autor:'Ray Dalio', obra:'Principles'},
      {texto:'Não importa se você está certo ou errado; importa o que é verdade.', autor:'Ray Dalio', obra:'Principles'},
      {texto:'Tudo o que você luta contra e tenta evitar persiste.', autor:'Ray Dalio', obra:'Principles'},
      {texto:'A pessoa mais sábia não é a que tem os melhores instintos, mas a que tem os melhores princípios.', autor:'Ray Dalio', obra:'Principles'}
    ],
    citacoesTerceiros: [
      {texto:'O manual mais influente de gestão e autoconhecimento da década.', autor:'The New York Times', fonte:'Resenha'},
      {texto:'Mais de 5 milhões de exemplares; leitura obrigatória em Silicon Valley.', autor:'Bloomberg', fonte:'Matéria'}
    ],
    chapters: [
      {title:'Capítulo 1 — Por que Princípios', text:'Dalio explica como regras explícitas guiaram a Bridgewater.', points:['Princípios repetem o sucesso','Sistema vence talento isolado','Erros ensinam']},
      {title:'Capítulo 2 — A Vida', text:'Aplicar lógica e honestidade à própria existência.', points:['Conheça-se','Abrace a realidade','Use a dor']},
      {title:'Capítulo 3 — O Processo de Cinco Passos', text:'Loop contínuo de melhoria.', points:['Metas','Problemas','Diagnóstico','Design','Execução']},
      {title:'Capítulo 4 — Transparência Radical', text:'Verdade dura como base de confiança.', points:['Honestidade brutal','Conflito honesto','Decisão por mérito']},
      {title:'Capítulo 5 — Peso de Credibilidade', text:'Quem sabe mais decide mais.', points:['Evitar democracia falsa','Mérito sobre cargo','Adotar o melhor']},
      {title:'Capítulo 6 — As Grandes Eras', text:'Teoria dos ciclos de dívida.', points:['Ciclos recorrentes','Sinais antecipados','Preparação']},
      {title:'Capítulo 7 — Trabalho em Equipe', text:'Construir organizações onde a melhor ideia vence.', points:['Regras claras','Confiança','Complementaridade']},
      {title:'Capítulo 8 — Evolução Contínua', text:'Tratar a vida como máquina a ser melhorada.', points:['Medir resultados','Ajustar','Repetir']}
    ]
  });
}

// ============================ MARKS ============================
function marks(){
  const m = meta('marks');
  return Object.assign({}, { id:m.id }, {
    summary: `Em "O Mais Importante para o Investidor", Howard Marks — cofundador da Oaktree e um dos maiores gestores de crédito do mundo — reúne memos aos investidores que viraram cultuados. A tese: o que separa o sucesso no mercado não é saber muito, mas sim compreender o que é essencial e agir com discrição quando outros erraram. Marks enfatiza o pensamento de segundo nível (ver o que os outros não veem), a natureza do risco (que não é volatilidade, mas probabilidade de perda permanente) e a importância do ciclo e do preço pago. Ele defende o ceticismo, o investimento em contrapartida e a margem de segurança de Graham. O livro é um antídoto contra a euforia de mercado: lembra que, no investing, ser diferente e estar certo é o que gera retorno acima da média, e que o risco é, em última análise, um assunto de opinião.`,
    myths: [
      {type:'myth', title:'Risco é volatilidade', text:'Marks define risco como chance de perda permanente, não oscilação.', reflection:'Você confunde flutuação com perigo real?'},
      {type:'truth', title:'Pensamento de segundo nível', text:'Ver o óbvio não basta; é preciso antecipar a reação dos outros.', reflection:'Você pensa um ou dois níveis além da manada?'},
      {type:'myth', title:'Mercado eficiente premia todos', text:'Ineficiências existem e recompensam quem pensa à parte.', reflection:'Você segue o consenso ou busca o desvio?'},
      {type:'truth', title:'Preço pago é tudo', text:'Boa empresa cara pode ser mau negócio.', reflection:'Você olha o ativo ou o preço?'},
      {type:'myth', title:'Previsão do mercado funciona', text:'Ninguém prevê consistentemente; ciclos importam mais.', reflection:'Você tenta adivinhar ou se prepara?'},
      {type:'truth', title:'Ceticismo é essencial', text:'Duvidar do consenso protege o capital.', reflection:'Você questiona a narrativa da moda?'},
      {type:'myth', title:'Ser diferente é ruim', text:'Estar certo contra a maioria é pré-requisito do retorno extra.', reflection:'Você tem coragem de discordar?'},
      {type:'truth', title:'Ciclos comandam retornos', text:'Posicionar-se no ciclo vale mais que escolher ativo.', reflection:'Você respeita o ciclo ou o ignora?'},
      {type:'myth', title:'Risco alto garante retorno alto', text:'Risco mal cobrado só traz perda; prêmio deve ser justo.', reflection:'Você é pago bem pelo risco que assume?'},
      {type:'truth', title:'Margem de segurança', text:'Comprar abaixo do valor preserva em crises.', reflection:'Você deixa margem para errar?'},
      {type:'myth', title:'Ter razão basta', text:'Estar certo no momento errado destrói resultado.', reflection:'Seu timing acompanha sua tese?'},
      {type:'truth', title:'Contrapartida vence', text:'Comprar quando todos vendem cria oportunidade.', reflection:'Você compra medo ou vende euforia?'},
      {type:'myth', title:'Diversificar é para fraco', text:'Concentrar sem margem pode ser fatal.', reflection:'Sua concentração tem proteção?'},
      {type:'truth', title:'Humildade protege', text:'Reconhecer incerteza evita o desastre.', reflection:'Você age com humildade diante do mercado?'}
    ],
    ensinamentos: [
      {number:'1', title:'Segundo nível', text:'Antecipe o que o mercado ainda não precificou.'},
      {number:'2', title:'Defina risco bem', text:'Risco é perda permanente, não volatilidade.'},
      {number:'3', title:'Respeite ciclos', text:'Saiba onde a economia está posicionada.'},
      {number:'4', title:'Exija margem', text:'Compre com folga sobre o valor.'},
      {number:'5', title:'Seja cético', text:'Duvide do consenso antes de investir.'},
      {number:'6', title:'Pense contra a corrente', text:'Retorno extra exige posição diferente.'},
      {number:'7', title:'Preço importa', text:'Ativo bom com preço ruim é ruim.'},
      {number:'8', title:'Evite previsões', text:'Concentre-se em preparação e cenários.'},
      {number:'9', title:'Tenha paciência', text:'Esperar a oportunidade certa paga.'},
      {number:'10', title:'Controle emoção', text:'Euforia e pânico distorcem decisões.'},
      {number:'11', title:'Busque prêmio justo', text:'Risco deve ser bem remunerado.'},
      {number:'12', title:'Mantenha humildade', text:'O mercado sempre surpreende.'}
    ],
    citacoes: [
      {texto:'O investidor superior pensa em segundo nível.', autor:'Howard Marks', obra:'The Most Important Thing'},
      {texto:'É impossível prever constantemente o curso do mercado.', autor:'Howard Marks', obra:'The Most Important Thing'},
      {texto:'Ser diferente e estar certo é o que produz retorno superior.', autor:'Howard Marks', obra:'The Most Important Thing'},
      {texto:'O risco não é medido pela volatilidade, mas pela chance de perda.', autor:'Howard Marks', obra:'The Most Important Thing'},
      {texto:'O que mais importa é o preço pago.', autor:'Howard Marks', obra:'The Most Important Thing'}
    ],
    citacoesTerceiros: [
      {texto:'O livro de investimento mais citado por Warren Buffett após os de Graham.', autor:'Oaktree', fonte:'Memo oficial'},
      {texto:'Leitura essencial para quem quer pensar e não apenas operar.', autor:'Leitor', fonte:'Amazon'}
    ],
    chapters: [
      {title:'Capítulo 1 — O Segundo Nível', text:'Pensar além do óbvio para vencer o consenso.', points:['Prever reação alheia','Evitar o comum','Buscar vantagem']},
      {title:'Capítulo 2 — A Natureza do Risco', text:'Redefinir risco como perda permanente.', points:['Não é volatilidade','Depende de preço','É subjetivo']},
      {title:'Capítulo 3 — Eficiência de Mercado', text:'Onde existem ineficiências há prêmio.', points:['Mercado não perfeito','Oportunidade no erro alheio','Ceticismo']},
      {title:'Capítulo 4 — O Ciclo', text:'Ciclos comandam boa parte do retorno.', points:['Elevação e queda','Posição no ciclo','Preparação']},
      {title:'Capítulo 5 — Margem de Segurança', text:'Folga de preço protege contra o erro.', points:['Comprar abaixo do valor','Graham inspirou','Protege em crise']},
      {title:'Capítulo 6 — Contrapartida', text:'Fazer o oposto da manada com razão.', points:['Comprar medo','Vender euforia','Coragem']},
      {title:'Capítulo 7 — O Perigo da Euforia', text:'Excesso de otimismo destrói retornos.', points:['Narrativas sedutoras','Ignorar preço','Arrependimento']},
      {title:'Capítulo 8 — Humildade', text:'Reconhecer limitação preserva capital.', points:['Incerteza real','Evitar certezas','Aprender']}
    ]
  });
}

// ============================ ELLIS ============================
function ellis(){
  const m = meta('ellis');
  return Object.assign({}, { id:m.id }, {
    summary: `Em "Vencendo o Jogo dos Perdedores", Charles D. Ellis — consultor de gestoras e Yale — faz uma constatação incômoda: para o investidor individual, o mercado de ações se tornou um "jogo de perdedores", onde tentar vencer ativamente quase sempre leva à derrota após custos e impostos. Inspirado na teoria do tênis de Simon Ramo, Ellis mostra que, institucionalizado e eficiente, o mercado premia quem comete menos erros, não quem acerta mais. A resposta é adotar carteira passiva (indexada), minimizar custos, impostos e rotatividade, e manter disciplina no longo prazo. O livro desconstrói a ilusão de que dá para superar o índice com frequência e propõe o "portfólio de política" — uma alocação definida por objetivos de vida, rebalanceada sistematicamente, blindada contra o comportamento destrutivo. É um manifesto a favor da simplicidade e da paciência.`,
    myths: [
      {type:'myth', title:'Dá para vencer o mercado sempre', text:'Ellis prova que, líquido de custos, a maioria perde para o índice.', reflection:'Você mede resultado líquido ou bruto?'},
      {type:'truth', title:'Custos destroem retorno', text:'Taxas e impostos corroem ganhos sistematicamente.', reflection:'Quanto de seus retornos vão para custos?'},
      {type:'myth', title:'Gestor ativo supera no longo prazo', text:'Após taxas, quase todos ficam abaixo do índice.', reflection:'Seu gestor vence o índice líquido?'},
      {type:'truth', title:'Menos erros vence', text:'No jogo de perdedores, errar menos é a estratégia.', reflection:'Você foca em acertar ou em não errar?'},
      {type:'myth', title:'Rotatividade traz lucro', text:'Comprar e vender muito gera custos e impostos.', reflection:'Sua rotatividade ajuda ou atrapalha?'},
      {type:'truth', title:'Indexação é racional', text:'Seguir o mercado captura o retorno disponível.', reflection:'Você aceita o retorno do mercado?'},
      {type:'myth', title:'Prever é necessário', text:'Ninguém prevê consistente; foco em alocação.', reflection:'Você tenta prever ou alocar?'},
      {type:'truth', title:'Portfólio de política', text:'Defina alocação por objetivos de vida.', reflection:'Sua carteira reflete seus objetivos?'},
      {type:'myth', title:'Tempo é inimigo', text:'Longo prazo favorece o investidor disciplinado.', reflection:'Você tem pressa demais?'},
      {type:'truth', title:'Comportamento decide', text:'Disciplina vale mais que inteligência de mercado.', reflection:'Seu comportamento ajuda ou sabota?'},
      {type:'myth', title:'Dica vale ouro', text:'Dicas costumam vir tarde e já precificadas.', reflection:'Você age por dicas ou por plano?'},
      {type:'truth', title:'Simplicidade protege', text:'Menos complexidade, menos erro.', reflection:'Sua estratégia é simples o bastante?'},
      {type:'myth', title:'Mercado é jogo de vencedores', text:'Para o indivíduo, é jogo de perdedores ativo.', reflection:'Você joga para vencer ou para não perder?'},
      {type:'truth', title:'Rebalancear sistematicamente', text:'Voltar à alocação original força comprar barato.', reflection:'Você rebalanceia por regra ou por emoção?'}
    ],
    ensinamentos: [
      {number:'1', title:'Aceite o jogo', text:'O mercado é eficiente e difícil de vencer ativamente.'},
      {number:'2', title:'Corte custos', text:'Taxas e impostos são o inimigo silencioso.'},
      {number:'3', title:'Reduza rotatividade', text:'Menos negócios, menos erosão.'},
      {number:'4', title:'Indexe', text:'Capture o retorno do mercado com fundo passivo.'},
      {number:'5', title:'Defina política', text:'Carteira alinhada a objetivos de vida.'},
      {number:'6', title:'Tenha paciência', text:'Décadas vencem o timing.'},
      {number:'7', title:'Disciplina', text:'Comportamento decide o resultado final.'},
      {number:'8', title:'Simplicidade', text:'Estrutura simples comete menos erros.'},
      {number:'9', title:'Rebalanceie', text:'Volte à alocação por regra.'},
      {number:'10', title:'Ignore o ruído', text:'Notícias diárias distraem do plano.'},
      {number:'11', title:'Foque no líquido', text:'Retorno após custos é o que importa.'},
      {number:'12', title:'Evite dicas', text:'Dica tardia já está no preço.'}
    ],
    citacoes: [
      {texto:'Para o investidor individual, o mercado se tornou um jogo de perdedores.', autor:'Charles D. Ellis', obra:'Winning the Loser\'s Game'},
      {texto:'A meta não é vencer, mas cometer menos erros que os outros.', autor:'Charles D. Ellis', obra:'Winning the Loser\'s Game'},
      {texto:'Os custos são a única coisa sobre a qual você tem controle certo.', autor:'Charles D. Ellis', obra:'Winning the Loser\'s Game'},
      {texto:'O sucesso no investimento é mais sobre não fazer besteira que sobre acertar.', autor:'Charles D. Ellis', obra:'Winning the Loser\'s Game'},
      {texto:'A melhor estratégia para a maioria é o portfólio de política indexado.', autor:'Charles D. Ellis', obra:'Winning the Loser\'s Game'}
    ],
    citacoesTerceiros: [
      {texto:'O livro que converteu gestores à indexação passiva.', autor:'Financial Times', fonte:'Resenha'},
      {texto:'Leitura de cabeceira para quem quer simplicidade real.', autor:'Leitor', fonte:'Amazon'}
    ],
    chapters: [
      {title:'Capítulo 1 — O Jogo de Perdedores', text:'Por que vencer ativamente ficou quase impossível.', points:['Mercado institucionalizado','Custos corroem','Maioria perde']},
      {title:'Capítulo 2 — Lição do Tênis', text:'No jogo de perdedores, errar menos vence.', points:['Ramo inspirou','Erro decide','Disciplina']},
      {title:'Capítulo 3 — O Custo do Custo', text:'Taxas e impostos destroem retornos.', points:['Erosão silenciosa','Líquido importa','Controle custos']},
      {title:'Capítulo 4 — A Armadilha da Rotatividade', text:'Negociar demais prejudica.', points:['Impostos','Comissões','Ruído']},
      {title:'Capítulo 5 — Indexação', text:'Seguir o mercado é racional.', points:['Capturar retorno','Baixo custo','Simples']},
      {title:'Capítulo 6 — Portfólio de Política', text:'Alocação por objetivos de vida.', points:['Metas','Horizonte','Rebalancear']},
      {title:'Capítulo 7 — Comportamento', text:'Disciplina supera inteligência.', points:['Evitar pânico','Regra sobre emoção','Longo prazo']},
      {title:'Capítulo 8 — Simplicidade', text:'Menos complexidade, menos erro.', points:['Estrutura enxuta','Foco','Paciência']}
    ]
  });
}

// ============================ HAGSTROM ============================
function hagstrom(){
  const m = meta('hagstrom');
  return Object.assign({}, { id:m.id }, {
    summary: `Em "O Método Buffett", Robert Hagstrom desconstrói a carreira de Warren Buffett e organiza sua filosofia em doze mandamentos investíveis: quatro sobre o negócio, três sobre gestão, quatro sobre finanças e um sobre o preço. O livro revela como Buffett fundiu a análise de valor de Graham com a visão de qualidade de Munger, priorizando empresas compreensíveis, com vantagens competitivas duráveis (fosso econômico), retorno sobre capital elevado e baixa necessidade de reinvestimento. Hagstrom destaca três pilares — olhar a empresa como negócio privado, comprar com margem de segurança e concentrar a carteira em poucas posições bem entendidas. Também aborda o cálculo do valor intrínseco via fluxo de caixa descontado. A obra é ponte entre a teoria acadêmica e a prática de quem construiu a maior fortuna de investimento, mostrando que consistência e círculo de competência valem mais que agilidade.`,
    myths: [
      {type:'myth', title:'Buffett é apenas "value" clássico', text:'Ele fundiu valor com qualidade e crescimento.', reflection:'Você entende a evolução do método?'},
      {type:'truth', title:'Círculo de competência', text:'Conhecer bem poucas empresas supera abranger tudo.', reflection:'Você investe dentro do seu círculo?'},
      {type:'myth', title:'Diversificar muito protege', text:'Buffett concentra em posições compreendidas.', reflection:'Sua carteira é focada ou dispersa?'},
      {type:'truth', title:'Fosso econômico', text:'Vantagem competitiva duradoura é o coração do método.', reflection:'A empresa tem proteção real?'},
      {type:'myth', title:'Preço não importa para bons ativos', text:'Mesmo ótima empresa exige margem de segurança.', reflection:'Você paga caro por qualidade?'},
      {type:'truth', title:'Retorno sobre capital', text:'ROIC alto com baixo reinvestimento é ideal.', reflection:'A empresa gera caixa sem sugar capital?'},
      {type:'myth', title:'Curto prazo define valor', text:'Buffett olha décadas, não trimestres.', reflection:'Você pensa em décadas?'},
      {type:'truth', title:'Negócio privado', text:'Avalie como se fosse dono integral.', reflection:'Você pensa como dono ou especulador?'},
      {type:'myth', title:'Complexidade impressiona', text:'Buffett prefere o simples e compreensível.', reflection:'Você entende de fato o que compra?'},
      {type:'truth', title:'Margem de segurança', text:'Comprar abaixo do valor intrínseco protege.', reflection:'Você exige folga no preço?'},
      {type:'myth', title:'Múltiplos baixos bastam', text:'Preço relativo não substitui análise de negócio.', reflection:'Você olha o múltiplo ou a empresa?'},
      {type:'truth', title:'Capital alocado bem', text:'Retenção de lucro deve gerar retorno superior.', reflection:'A empresa aloca bem o lucro?'},
      {type:'myth', title:'Seguir índice é suficiente', text:'Método ativo exigente supera o passivo no longo.', reflection:'Você quer superar ou apenas participar?'},
      {type:'truth', title:'Paciência composta', text:'Manter anos deixa juros compostos agir.', reflection:'Você deixa o tempo trabalhar?'}
    ],
    ensinamentos: [
      {number:'1', title:'Negócio compreensível', text:'Invista só no que entende profundamente.'},
      {number:'2', title:'Fosso econômico', text:'Busque vantagem competitiva durável.'},
      {number:'3', title:'ROIC elevado', text:'Alto retorno com baixo reinvestimento.'},
      {number:'4', title:'Gestão honesta', text:'Donos-operadores alinhados ao acionista.'},
      {number:'5', title:'Margem de segurança', text:'Compre abaixo do valor intrínseco.'},
      {number:'6', title:'Círculo de competência', text:'Concentre onde entende.'},
      {number:'7', title:'Pense como dono', text:'Avalie como negócio privado.'},
      {number:'8', title:'Horizonte longo', text:'Décadas, não trimestres.'},
      {number:'9', title:'Valor intrínseco', text:'Calcule via fluxo de caixa descontado.'},
      {number:'10', title:'Concentre a carteira', text:'Poucas posições bem conhecidas.'},
      {number:'11', title:'Alocação de capital', text:'Lucro retido deve render acima da média.'},
      {number:'12', title:'Disciplina e paciência', text:'Espere a curva de juros compostos.'}
    ],
    citacoes: [
      {texto:'É melhor comprar uma empresa maravilhosa a um preço justo do que uma empresa justa a um preço maravilhoso.', autor:'Warren Buffett (citado)', obra:'The Warren Buffett Way'},
      {texto:'O investidor deve ter um círculo de competência e atuar dentro dele.', autor:'Robert Hagstrom', obra:'The Warren Buffett Way'},
      {texto:'O fosso econômico é o que protege os lucros no longo prazo.', autor:'Robert Hagstrom', obra:'The Warren Buffett Way'},
      {texto:'Concentre-se em poucas empresas que você compreenda profundamente.', autor:'Robert Hagstrom', obra:'The Warren Buffett Way'},
      {texto:'O valor intrínseco é o fluxo de caixa descontado ao presente.', autor:'Robert Hagstrom', obra:'The Warren Buffett Way'}
    ],
    citacoesTerceiros: [
      {texto:'A melhor explicação estruturada da filosofia de Buffett.', autor:'The Wall Street Journal', fonte:'Resenha'},
      {texto:'Mais de 1 milhão de exemplares; referência global.', autor:'Editora Wiley', fonte:'Dados de venda'}
    ],
    chapters: [
      {title:'Capítulo 1 — O Investidor', text:'A trajetória e a evolução do método Buffett.', points:['Graham mais Munger','Valor e qualidade','Consistência']},
      {title:'Capítulo 2 — Os Doze Mandamentos', text:'Quatro do negócio, três da gestão, quatro das finanças, um do preço.', points:['Compreensão','Fosso','ROIC','Preço']},
      {title:'Capítulo 3 — O Negócio', text:'Critérios de qualidade do negócio.', points:['Simples','Durável','Competitivo']},
      {title:'Capítulo 4 — A Gestão', text:'Como avaliar quem comanda.', points:['Racionalidade','Honestidade','Resistir à moda']},
      {title:'Capítulo 5 — As Finanças', text:'Indicadores de saúde.', points:['ROE','Margem','Caixa']},
      {title:'Capítulo 6 — O Preço', text:'Margem de segurança e valor intrínseco.', points:['Desconto','Fluxo descontado','Folga']},
      {title:'Capítulo 7 — Os Três Pilares', text:'Negócio privado, margem e concentração.', points:['Dono','Segurança','Foco']},
      {title:'Capítulo 8 — Aplicação', text:'Como usar o método na prática.', points:['Círculo','Paciência','Revisão']}
    ]
  });
}

// ============================ GREENBLATT ============================
function greenblatt(){
  const m = meta('greenblatt');
  return Object.assign({}, { id:m.id }, {
    summary: `Em "O Pequeno Livro que Ainda Vence o Mercado", Joel Greenblatt — fundador da Gotham Capital e professor de Columbia — apresenta a "Fórmula Mágica": um método simples de comprar boas empresas a preços baratos usando apenas duas métricas. A primeira, o retorno sobre o capital investido (ROC), mede a qualidade do negócio; a segunda, o rendimento dos lucros (earnings yield), mede o preço pago. Somando as posições ranqueadas das duas listas, o investidor monta uma carteira de 20 a 30 ações, mantida por um ano, e repete o processo. Greenblatt demonstra, com dados, que a fórmula bate o mercado no longo prazo, mesmo parecendo "mágica". O livro é didático, escrito como se para uma criança, e adverte que o maior desafio não é a matemática, mas a disciplina de manter a estratégia quando ela fica temporariamente atrás do índice.`,
    myths: [
      {type:'myth', title:'Precisa de modelos complexos', text:'Apenas duas métricas ranqueadas escolhem as ações.', reflection:'Você complica o que poderia simplificar?'},
      {type:'truth', title:'Qualidade mais preço', text:'ROC e earnings yield capturam o essencial.', reflection:'Você avalia qualidade e preço juntos?'},
      {type:'myth', title:'A fórmula falha sempre', text:'No longo prazo ela supera o mercado consistentemente.', reflection:'Você julga pelo curto ou longo prazo?'},
      {type:'truth', title:'Disciplina é o segredo', text:'Segurar um ano e repetir vence a tentação de sair.', reflection:'Você resiste à vontade de mudar?'},
      {type:'myth', title:'Escolher a melhor basta', text:'A carteira de 20 a 30 dilui erros individuais.', reflection:'Você concentra demais ou diversifica bem?'},
      {type:'truth', title:'Boa empresa barata', text:'Qualidade com desconto gera retorno extra.', reflection:'Você busca o barato ou o bom barato?'},
      {type:'myth', title:'Timing importa', text:'A fórmula não exige prever o momento.', reflection:'Você tenta adivinhar a hora?'},
      {type:'truth', title:'Rebalancear anualmente', text:'Ranquear de novo todo ano mantém a lógica.', reflection:'Você revisa sua carteira por regra?'},
      {type:'myth', title:'Funciona em qualquer situação', text:'Períodos ruins podem durar; requer paciência.', reflection:'Você aguenta a fase ruim?'},
      {type:'truth', title:'Evitar emoção', text:'Sistema mecânico blinda contra medo e ganância.', reflection:'Seu método é emocional?'},
      {type:'myth', title:'Só grandes investidores usam', text:'Qualquer um pode aplicar a fórmula.', reflection:'Você acha que é só para profissionais?'},
      {type:'truth', title:'Simplicidade ganha', text:'Menos variáveis, mais aderência.', reflection:'Sua estratégia é aplicável?'},
      {type:'myth', title:'Lucro contábil é tudo', text:'ROC ajustado capta melhor a eficiência.', reflection:'Você olha qualidade do capital?'},
      {type:'truth', title:'Longo prazo comprova', text:'Dados históricos validam a fórmula.', reflection:'Você confia em evidência de longo prazo?'}
    ],
    ensinamentos: [
      {number:'1', title:'Calcule ROC', text:'Retorno sobre capital mostra qualidade do negócio.'},
      {number:'2', title:'Calcule earnings yield', text:'Rendimento do lucro mostra preço pago.'},
      {number:'3', title:'Ranqueie listas', text:'Some as posições das duas métricas.'},
      {number:'4', title:'Compre as melhores', text:'Seleção de 20 a 30 ações via fórmula.'},
      {number:'5', title:'Segure um ano', text:'Prazo fixo evita decisão emocional.'},
      {number:'6', title:'Reaplique', text:'Repita todo ano com nova classificação.'},
      {number:'7', title:'Diversifique', text:'Várias posições diluem erros.'},
      {number:'8', title:'Seja mecânico', text:'Siga o sistema, não o humor.'},
      {number:'9', title:'Tenha paciência', text:'Resultado vem em ciclos longos.'},
      {number:'10', title:'Evite notícia', text:'Ruído diário atrapalha a fórmula.'},
      {number:'11', title:'Qualidade importa', text:'ROC alto indica vantagem real.'},
      {number:'12', title:'Preço importa', text:'Yield alto garante margem.'}
    ],
    citacoes: [
      {texto:'Comprar boas empresas a preços baratos é tudo o que a Fórmula Mágica faz.', autor:'Joel Greenblatt', obra:'The Little Book That Still Beats the Market'},
      {texto:'A dificuldade não é entender a fórmula, mas segui-la.', autor:'Joel Greenblatt', obra:'The Little Book That Still Beats the Market'},
      {texto:'No longo prazo, o mercado reconhece o valor.', autor:'Joel Greenblatt', obra:'The Little Book That Still Beats the Market'},
      {texto:'Retorno sobre capital e rendimento de lucro resumem a arte.', autor:'Joel Greenblatt', obra:'The Little Book That Still Beats the Market'},
      {texto:'Seja paciente: a fórmula vence, mas nem sempre este ano.', autor:'Joel Greenblatt', obra:'The Little Book That Still Beats the Market'}
    ],
    citacoesTerceiros: [
      {texto:'O livro de investimento mais acessível e eficaz já escrito.', autor:'Money Magazine', fonte:'Resenha'},
      {texto:'Mais de 1 milhão de exemplares vendidos mundialmente.', autor:'Editora Wiley', fonte:'Dados de venda'}
    ],
    chapters: [
      {title:'Capítulo 1 — A Fórmula Mágica', text:'Apresentação do método de duas métricas.', points:['Simples','Dados','Supera índice']},
      {title:'Capítulo 2 — Por que Funciona', text:'Qualidade e preço explicam o retorno.', points:['ROC','Yield','Evidência']},
      {title:'Capítulo 3 — As Duas Listas', text:'Como ranquear e somar posições.', points:['Classificar','Somar','Selecionar']},
      {title:'Capítulo 4 — Montando a Carteira', text:'20 a 30 ações e prazo de um ano.', points:['Diversificar','Prazo','Regra']},
      {title:'Capítulo 5 — O Desafio da Disciplina', text:'Segurar quando a fórmula fica atrás.', points:['Tentação','Paciência','Sistema']},
      {title:'Capítulo 6 — Aplicação Prática', text:'Passo a passo anual.', points:['Revisar','Comprar','Esperar']},
      {title:'Capítulo 7 — Limitações', text:'Períodos ruins exigem fé nos dados.', points:['Ciclos','Ruído','Tempo']},
      {title:'Capítulo 8 — Conclusão', text:'Simplicidade e aderência vencem.', points:['Mecânico','Longo prazo','Resultado']}
    ]
  });
}

// ============================ SCHWAGER ============================
function schwager(){
  const m = meta('schwager');
  return Object.assign({}, { id:m.id }, {
    summary: `Em "Feiticeiros do Mercado", Jack Schwager entrevista os maiores traders de todos os tempos — de Richard Dennis a Paul Tudor Jones, de Ed Seykota a Bruce Kovner — e descobre algo desconcertante: não há um único método vencedor. Cada operador tem estilo, horizonte e abordagem próprios, mas todos compartilham princípios invisíveis: gestão rigorosa de risco, capacidade de cortar perdas rapidamente, paciência para deixar os lucros correr e total honestidade consigo mesmo após o pregão. Schwager mostra que o mercado exige adaptação, não receita fixa, e que a psicologia pesa mais que a técnica. O livro é uma coletânea de lições práticas que desmistifica a imagem do trader infalível, revelando falhas, recuperações e a disciplina implacável que separa os consistentes dos que queimam a conta. É leitura obrigatória para quem deseja entender o lado humano do trading.`,
    myths: [
      {type:'myth', title:'Existe um método único', text:'Schwager mostra estilos totalmente distintos entre os mestres.', reflection:'Você busca a fórmula ou seu próprio estilo?'},
      {type:'truth', title:'Gestão de risco é universal', text:'Todos cortam perdas e protegem capital.', reflection:'Você respeita o risco por operação?'},
      {type:'myth', title:'Trader nunca erra', text:'Os melhores convivem com muitos erros.', reflection:'Você aceita errar como parte?'},
      {type:'truth', title:'Corte perdas rápido', text:'Limitar o prejuízo é regra comum.', reflection:'Você hesita em sair da perda?'},
      {type:'myth', title:'Prever o topo e fundo', text:'Ninguém acerta consistente; foca em tendência.', reflection:'Você tenta adivinhar ou segue o mercado?'},
      {type:'truth', title:'Deixe o lucro correr', text:'Posições vencedoras compensam as pequenas perdas.', reflection:'Você corta o lucro cedo demais?'},
      {type:'myth', title:'Técnica vence psicologia', text:'Disciplina mental decide mais que indicador.', reflection:'Sua mente está sob controle?'},
      {type:'truth', title:'Adaptação necessária', text:'Método que funciona pode parar; adapte-se.', reflection:'Você se acomoda ou evolui?'},
      {type:'myth', title:'Alavancar sempre ajuda', text:'Excesso de alavanca destrói contas boas.', reflection:'Sua alavanca é controlada?'},
      {type:'truth', title:'Honestidade consigo', text:'Revisar erros sem ego melhora o trader.', reflection:'Você analisa suas falhas sem culpa?'},
      {type:'myth', title:'Dica do guru basta', text:'Cada um deve construir seu sistema.', reflection:'Você copia ou desenvolve?'},
      {type:'truth', title:'Paciência paga', text:'Esperar setup correto evita ruído.', reflection:'Você opera por tédio?'},
      {type:'myth', title:'Mais negócios, mais lucro', text:'Menos operações de qualidade costumam vencer.', reflection:'Você opera demais?'},
      {type:'truth', title:'Plano antes do trade', text:'Ter regra de entrada, saída e risco é essencial.', reflection:'Você entra sem plano?'}
    ],
    ensinamentos: [
      {number:'1', title:'Encontre seu estilo', text:'Não copie; descubra o que combina com você.'},
      {number:'2', title:'Gerencie risco', text:'Defina perda máxima por operação.'},
      {number:'3', title:'Corte perdas', text:'Saia rápido quando a tese falha.'},
      {number:'4', title:'Deixe lucro correr', text:'Não tenha alvo fixo prematuro.'},
      {number:'5', title:'Tenha plano', text:'Entrada, saída e risco antes de operar.'},
      {number:'6', title:'Controle alavanca', text:'Menos alavanca, mais sobrevivência.'},
      {number:'7', title:'Revise sem ego', text:'Erro é dado, não vergonha.'},
      {number:'8', title:'Adapte-se', text:'Mude quando o regime muda.'},
      {number:'9', title:'Seja paciente', text:'Espere o setup de qualidade.'},
      {number:'10', title:'Foque no processo', text:'Resultado vem do processo repetido.'},
      {number:'11', title:'Psicologia primeiro', text:'Controle emocional pesa mais que técnica.'},
      {number:'12', title:'Capital protegido', text:'Sobreviver é pré-requisito de lucrar.'}
    ],
    citacoes: [
      {texto:'Todos os grandes traders perdem dinheiro em operações individuais; o que os diferencia é o controle de risco.', autor:'Jack Schwager', obra:'Market Wizards'},
      {texto:'Não existe um único caminho para o sucesso no trading.', autor:'Jack Schwager', obra:'Market Wizards'},
      {texto:'Corte suas perdas e deixe seus lucros crescerem.', autor:'Jack Schwager', obra:'Market Wizards'},
      {texto:'A maneira como você lida com o risco define sua carreira.', autor:'Jack Schwager', obra:'Market Wizards'},
      {texto:'O mercado não perdoa quem não tem plano.', autor:'Jack Schwager', obra:'Market Wizards'}
    ],
    citacoesTerceiros: [
      {texto:'O clássico definitivo sobre a psicologia dos grandes traders.', autor:'Barron\'s', fonte:'Resenha'},
      {texto:'Mais de 1 milhão de exemplares; referência de trading.', autor:'Editora Wiley', fonte:'Dados de venda'}
    ],
    chapters: [
      {title:'Capítulo 1 — Os Feiticeiros', text:'Apresentação dos entrevistados lendários.', points:['Dennis','Jones','Seykota','Kovner']},
      {title:'Capítulo 2 — Não Há Receita Única', text:'Estilos diversos, princípios comuns.', points:['Divergência','Commons','Estilo']},
      {title:'Capítulo 3 — Gestão de Risco', text:'A regra universal dos mestres.', points:['Corte','Limite','Sobreviva']},
      {title:'Capítulo 4 — A Psicologia', text:'O lado mental do trading.', points:['Disciplina','Ego','Emoção']},
      {title:'Capítulo 5 — Cortar e Correr', text:'Perda curta, lucro longo.', points:['Stop','Alvo','Paciência']},
      {title:'Capítulo 6 — Adaptação', text:'Mudar com o regime de mercado.', points:['Flexível','Evoluir','Revisar']},
      {title:'Capítulo 7 — O Plano', text:'Regras antes da ordem.', points:['Entrada','Saída','Risco']},
      {title:'Capítulo 8 — Lições', text:'Síntese das entrevistas.', points:['Processo','Equilíbrio','Foco']}
    ]
  });
}

// ============================ RICHARDS ============================
function richards(){
  const m = meta('richards');
  return Object.assign({}, { id:m.id }, {
    summary: `Em "A Lacuna do Comportamento", Carl Richards — planejador financeiro e ilustrador do New York Times — expõe o maior inimigo do investidor: ele mesmo. A "lacuna do comportamento" é a distância entre o que sabemos que deveríamos fazer com o dinheiro e o que de fato fazemos. Com esboços simples no guardanapo, Richards mostra como emoções, ego e pressa nos levam a comprar no topo, vender no pânico e perseguir modismos. O livro propõe automatizar decisões, reduzir escolhas, focar no que realmente importa (relacionamentos, propósito, tempo) e aceitar a incerteza em vez de fingir controle. Não é um manual técnico de alocação, e sim um guia de sabedoria comportamental: pequenas mudanças de hábito valem mais que encontrar o fundo perfeito. Richards humaniza as finanças e lembra que o plano só funciona se conseguirmos segui-lo quando o mercado assusta.`,
    myths: [
      {type:'myth', title:'Faltam conhecimento técnico', text:'O problema raramente é saber; é comportamento.', reflection:'Você sabe o que fazer e não faz?'},
      {type:'truth', title:'A lacuna é comportamental', text:'Sabemos, mas não agimos como deveríamos.', reflection:'O que te impede de agir?'},
      {type:'myth', title:'Prever protege', text:'Fingir controle aumenta risco emocional.', reflection:'Você aceita a incerteza?'},
      {type:'truth', title:'Automatize decisões', text:'Regras automáticas blindam contra o impulso.', reflection:'Suas finanças são automáticas?'},
      {type:'myth', title:'Escolher o fundo certo resolve', text:'Hábito vale mais que o produto ideal.', reflection:'Você foca no veículo ou no comportamento?'},
      {type:'truth', title:'Menos escolhas', text:'Reduzir opções evita paralisia e erro.', reflection:'Você tem escolhas demais?'},
      {type:'myth', title:'Vender no pânico é racional', text:'Pânico destrói retorno de longo prazo.', reflection:'Você reage ou respira?'},
      {type:'truth', title:'Foco no essencial', text:'Relações e propósito importam mais que taxa.', reflection:'O dinheiro serve o que importa?'},
      {type:'myth', title:'Comparar com outros ajuda', text:'Comparação gera ansiedade e mau porte.', reflection:'Você se compara demais?'},
      {type:'truth', title:'Aceite incerteza', text:'Planejar para o improvável reduz medo.', reflection:'Você se prepara sem fingir controle?'},
      {type:'myth', title:'Complexidade impressiona', text:'Simplicidade aderente vence plano complexo.', reflection:'Seu plano é simples de seguir?'},
      {type:'truth', title:'Hábito vence dica', text:'Pequenas ações repetidas superam insights.', reflection:'Você tem hábito ou só intenção?'},
      {type:'myth', title:'Conselho caro garante', text:'Sem comportamento, nenhum conselho salva.', reflection:'Você executa ou só ouve?'},
      {type:'truth', title:'Esboço clareia', text:'Visualizar ajuda a decidir melhor.', reflection:'Você coloca no papel?'}
    ],
    ensinamentos: [
      {number:'1', title:'Reconheça a lacuna', text:'Admita a distância entre saber e fazer.'},
      {number:'2', title:'Automatize', text:'Investir e poupar sem decidir todo mês.'},
      {number:'3', title:'Reduza escolhas', text:'Menos opções, menos erro.'},
      {number:'4', title:'Foque no essencial', text:'Dinheiro a serviço de vida, não o contrário.'},
      {number:'5', title:'Aceite incerteza', text:'Prepare-se sem fingir controle.'},
      {number:'6', title:'Evite comparação', text:'Trajetória própria, não do vizinho.'},
      {number:'7', title:'Controle emoção', text:'Respire antes de agir no pânico.'},
      {number:'8', title:'Simplicidade', text:'Plano que dá para seguir.'},
      {number:'9', title:'Hábito diário', text:'Pequenas ações repetidas.'},
      {number:'10', title:'Visualize', text:'Esboços ajudam a decidir.'},
      {number:'11', title:'Propósito', text:'Tenha por que investir.'},
      {number:'12', title:'Paciência', text:'Tempo resolve a lacuna.'}
    ],
    citacoes: [
      {texto:'A lacuna entre o que sabemos e o que fazemos é onde o dinheiro se perde.', autor:'Carl Richards', obra:'The Behavior Gap'},
      {texto:'O inimigo do investidor é o próprio investidor.', autor:'Carl Richards', obra:'The Behavior Gap'},
      {texto:'Automatize para que suas emoções não decidam.', autor:'Carl Richards', obra:'The Behavior Gap'},
      {texto:'Focar no essencial vale mais que escolher o fundo perfeito.', autor:'Carl Richards', obra:'The Behavior Gap'},
      {texto:'Aceite que você não controla o mercado.', autor:'Carl Richards', obra:'The Behavior Gap'}
    ],
    citacoesTerceiros: [
      {texto:'O livro mais humano e honesto sobre finanças pessoais.', autor:'The New York Times', fonte:'Resenha'},
      {texto:'Mais de 300 mil leitores; consultor querido dos EUA.', autor:'Editora Portfolio', fonte:'Dados'}
    ],
    chapters: [
      {title:'Capítulo 1 — A Lacuna', text:'O abismo entre saber e agir.', points:['Sabemos','Não fazemos','Perda']},
      {title:'Capítulo 2 — O Inimigo Somos Nós', text:'Comportamento destrói retornos.', points:['Emoção','Ego','Pressa']},
      {title:'Capítulo 3 — Automatize', text:'Regras que tiram a emoção.', points:['Aporte','Sem decisão','Disciplina']},
      {title:'Capítulo 4 — Menos Escolhas', text:'Reduzir opções ajuda.', points:['Paralisia','Erro','Foco']},
      {title:'Capítulo 5 — Aceitar Incerteza', text:'Preparar sem controle ilusório.', points:['Plano','Reserva','Calma']},
      {title:'Capítulo 6 — O Essencial', text:'Dinheiro a serviço da vida.', points:['Relações','Tempo','Propósito']},
      {title:'Capítulo 7 — Comparação', text:'Parar de medir com os outros.', points:['Ansiedade','Trajetória','Paz']},
      {title:'Capítulo 8 — Hábito', text:'Pequenas ações vencem dicas.', points:['Repetição','Simples','Resultado']}
    ]
  });
}

// ============================ SETHI ============================
function sethi(){
  const m = meta('sethi');
  return Object.assign({}, { id:m.id }, {
    summary: `Em "Eu te Ensino a Ficar Rico", Ramit Sethi entrega um programa prático de seis semanas para jovens assumirem o controle das finanças sem abrir mão da vida. A premissa central é o "gasto consciente": corte no que não importa para gastar sem culpa no que importa. Sethi ensina a automatizar finances — contas, investimentos e aportes fluem sozinhos —, a negociar salário e taxas, a usar cartões de recompensa com inteligência e a investir em fundos indexados de baixo custo desde cedo. Sem jargão moralista, o livro trata dinheiro como ferramenta de liberdade. Sethi desafia o mito da privação: não se trata de economizar centavo a centavo, mas de arquitetar um sistema que funcione no piloto automático enquanto você vive. É direto, irreverente e foca nas "grandes vitórias" que realmente movem a agulha.`,
    myths: [
      {type:'myth', title:'Rico é quem corta tudo', text:'Sethi defende gasto consciente, não privação.', reflection:'Você priva ou direciona?'},
      {type:'truth', title:'Gasto consciente', text:'Corte o irrelevante para gastar no que importa.', reflection:'Você sabe no que vale gastar?'},
      {type:'myth', title:'Investir é complicado', text:'Automatizar fundos indexados resolve.', reflection:'Você complica o que pode automatizar?'},
      {type:'truth', title:'Automatize tudo', text:'Sistema no piloto automático poupa decisão.', reflection:'Suas finanças rodam sozinhas?'},
      {type:'myth', title:'Negociar é desconfortável demais', text:'Negociar salário e taxas vale muito.', reflection:'Você deixa dinheiro na mesa?'},
      {type:'truth', title:'Grandes vitórias', text:'Focar nas decisões de impacto muda tudo.', reflection:'Você mira o que move a agulha?'},
      {type:'myth', title:'Cartão é armadilha', text:'Usado com recompensa e quitação, ajuda.', reflection:'Você domina o cartão?'},
      {type:'truth', title:'Comece cedo', text:'Tempo no mercado multiplica com juros.', reflection:'Você adia o começo?'},
      {type:'myth', title:'Precisa de muito para investir', text:'Pouco, automatizado e constante já serve.', reflection:'Você espera ter muito?'},
      {type:'truth', title:'Fundos indexados', text:'Baixo custo e ampla exposição vencem.', reflection:'Você paga caro por gestão?'},
      {type:'myth', title:'Orçamento detalhado obrigatório', text:'Sistemas automáticos reduzem necessidade.', reflection:'Você perde tempo em planilhas?'},
      {type:'truth', title:'Liberdade é o fim', text:'Dinheiro a serviço da vida desejada.', reflection:'Seu dinheiro compra liberdade?'},
      {type:'myth', title:'Dívida sempre é ruim', text:'Boa dívida e crédito estratégico têm lugar.', reflection:'Você confunde tipos de dívida?'},
      {type:'truth', title:'Sistema vence força de vontade', text:'Automático não depende de humor.', reflection:'Você confia em willpower?'}
    ],
    ensinamentos: [
      {number:'1', title:'Gasto consciente', text:'Mapeie o que importa e corte o resto.'},
      {number:'2', title:'Automatize', text:'Aportes e contas no piloto automático.'},
      {number:'3', title:'Negocie', text:'Salário, taxas e juros são negociáveis.'},
      {number:'4', title:'Fundo de emergência', text:'Reserva antes de investir.'},
      {number:'5', title:'Investir cedo', text:'Tempo vale mais que valor inicial.'},
      {number:'6', title:'Indexados', text:'Fundo de baixo custo e amplo.'},
      {number:'7', title:'Cartão inteligente', text:'Recompensas com quitação total.'},
      {number:'8', title:'Grandes vitórias', text:'Foque nas decisões de impacto.'},
      {number:'9', title:'Sem culpa', text:'Gaste no que importa com leveza.'},
      {number:'10', title:'Sistema', text:'Estruture para não depender de vontade.'},
      {number:'11', title:'Aumente renda', text:'Negociar e crescer vale mais que cortar.'},
      {number:'12', title:'Liberdade', text:'Dinheiro a serviço do estilo de vida.'}
    ],
    citacoes: [
      {texto:'Não seja pão-duro; seja rico e gaste com consciência.', autor:'Ramit Sethi', obra:'I Will Teach You To Be Rich'},
      {texto:'Automatize suas finanças para que funcionem sem você.', autor:'Ramit Sethi', obra:'I Will Teach You To Be Rich'},
      {texto:'Foque nas grandes vitórias, não nos centavos.', autor:'Ramit Sethi', obra:'I Will Teach You To Be Rich'},
      {texto:'Negociar seu salário é a decisão de maior impacto.', autor:'Ramit Sethi', obra:'I Will Teach You To Be Rich'},
      {texto:'Comece a investir agora; o tempo é seu maior aliado.', autor:'Ramit Sethi', obra:'I Will Teach You To Be Rich'}
    ],
    citacoesTerceiros: [
      {texto:'O guia definitivo de finanças para a geração millennial.', autor:'Forbes', fonte:'Resenha'},
      {texto:'Mais de 1 milhão de exemplares vendidos.', autor:'Editora Workman', fonte:'Dados de venda'}
    ],
    chapters: [
      {title:'Capítulo 1 — O Programa de 6 Semanas', text:'Roteiro prático e irreverente.', points:['Sem jargão','Ação','Juventude']},
      {title:'Capítulo 2 — Contas e Automação', text:'Estrutura que roda sozinha.', points:['Contas','Aporte','Automático']},
      {title:'Capítulo 3 — Gasto Consciente', text:'Corte o irrelevante, celebre o relevante.', points:['Mapear','Cortar','Gastar']},
      {title:'Capítulo 4 — Cartões e Recompensas', text:'Usar crédito a favor.', points:['Quitar','Pontos','Controle']},
      {title:'Capítulo 5 — Fundo de Emergência', text:'Reserva antes de investir.', points:['Proteção','Simples','Base']},
      {title:'Capítulo 6 — Investindo', text:'Indexados de baixo custo.', points:['Cedo','Automático','Longo']},
      {title:'Capítulo 7 — Negociação', text:'Salário e taxas.', points:['Valor','Prática','Impacto']},
      {title:'Capítulo 8 — Liberdade', text:'Dinheiro a serviço da vida.', points:['Estilo','Sem culpa','Foco']}
    ]
  });
}

// ============================ LOWENSTEIN ============================
function lowenstein(){
  const m = meta('lowenstein');
  return Object.assign({}, { id:m.id }, {
    summary: `Em "Quando Gênio Falhou", Roger Lowenstein reconta a ascensão e o colapso do Long-Term Capital Management, o fundo de arbitragem que reuniu ganhadores do Nobel de Economia e ex-executivos de elite do Salomon Brothers. Em 1998, após o default russo, o LTCM perdeu bilhões em poucas semanas e quase derrubou o sistema financeiro global, exigindo um resgate coordenado pelo Federal Reserve com os maiores bancos de Wall Street. Lowenstein mostra como o excesso de alavancagem, a confiança cega em modelos matemáticos e a homogeneidade de pensamento transformaram gênio em risco sistêmico. O livro é um thriller financeiro e, ao mesmo tempo, uma lição de humildade: modelos calibrados no passado falham justamente quando mais importa, e a diversificação aparentemente perfeita colapsa em crises de liquidez quando todos correm para a saída ao mesmo tempo. É leitura essencial sobre risco, arrogância e os limites da tecnologia financeira, demonstrando que nenhuma quantidade de inteligência protege quem subestima a incerteza.`,
    myths: [
      {type:'myth', title:'Nobel garante sucesso', text:'Prêmios não protegem contra risco de mercado.', reflection:'Você confia demais em credenciais?'},
      {type:'truth', title:'Alavanca destrói', text:'Pouco capital e muita dívida amplificam perda.', reflection:'Sua alavanca é sustentável?'},
      {type:'myth', title:'Modelos prevêem crises', text:'Histórico falha justo no evento extremo.', reflection:'Você confia cegamente em modelos?'},
      {type:'truth', title:'Risco de cauda existe', text:'Eventos raros causam os maiores estragos.', reflection:'Você prepara para o improvável?'},
      {type:'myth', title:'Diversificar elimina risco', text:'Em pânico, tudo correleciona e cai junto.', reflection:'Sua diversificação funciona na crise?'},
      {type:'truth', title:'Homogeneidade perigosa', text:'Pensamento único cega o grupo.', reflection:'Sua equipe discorda de verdade?'},
      {type:'myth', title:'Fed nunca deixaria cair', text:'O resgate foi emergencial e traumático.', reflection:'Você conta com socorro externo?'},
      {type:'truth', title:'Liquidez some', text:'Em crise, ninguém compra seu ativo.', reflection:'Você tem liquidez real?'},
      {type:'myth', title:'Arbitragem é sem risco', text:'Aparentemente simétrica, mas com alavanca vira bomba.', reflection:'Você subestima o risco da estratégia?'},
      {type:'truth', title:'Humildade necessária', text:'Mercado humilha até os brilhantes.', reflection:'Você cultiva humildade?'},
      {type:'myth', title:'Tamanho protege', text:'Fundo gigante atraiu atenção e pânico.', reflection:'Ser grande ajuda ou atrapalha?'},
      {type:'truth', title:'Interconexão sistêmica', text:'Falha de um contamina todos.', reflection:'Você mede risco de contágio?'},
      {type:'myth', title:'Matemática doma mercado', text:'Psicologia e pânico vencem fórmulas.', reflection:'Você acha que números controlam tudo?'},
      {type:'truth', title:'História se repete', text:'Excesso de confiança antecede cada crise.', reflection:'Você vê padrões de euforia?'}
    ],
    ensinamentos: [
      {number:'1', title:'Cuidado com alavanca', text:'Ela amplifica ganhos e perdas igualmente.'},
      {number:'2', title:'Desconfie de modelos', text:'Histórico não cobre o improvável.'},
      {number:'3', title:'Prepare o risco de cauda', text:'Eventos raros destroem carteiras.'},
      {number:'4', title:'Liquidez importa', text:'Tenha caixa para o pânico.'},
      {number:'5', title:'Diversifique de verdade', text:'Correlação sobe na crise.'},
      {number:'6', title:'Equipe diversa', text:'Pensamento variado evita cegueira.'},
      {number:'7', title:'Humildade', text:'Mercado vence o gênio.'},
      {number:'8', title:'Entenda contágio', text:'Falhas se propagam.'},
      {number:'9', title:'Arbitragem tem risco', text:'Aparente sem risco pode explodir.'},
      {number:'10', title:'Regule exposição', text:'Saiba o tamanho da posição.'},
      {number:'11', title:'Não conte com resgate', text:'Socorro não é garantia.'},
      {number:'12', title:'Aprenda com falhas', text:'Cada colapso ensina limites.'}
    ],
    citacoes: [
      {texto:'O LTCM provou que o gênio, com alavanca suficiente, pode destruir a si mesmo.', autor:'Roger Lowenstein', obra:'When Genius Failed'},
      {texto:'Os modelos funcionam até deixarem de funcionar.', autor:'Roger Lowenstein', obra:'When Genius Failed'},
      {texto:'Em uma crise, a diversificação desaparece e tudo cai junto.', autor:'Roger Lowenstein', obra:'When Genius Failed'},
      {texto:'A arrogância precede a queda no mercado financeiro.', autor:'Roger Lowenstein', obra:'When Genius Failed'},
      {texto:'O Federal Reserve teve de intervir para evitar o desastre sistêmico.', autor:'Roger Lowenstein', obra:'When Genius Failed'}
    ],
    citacoesTerceiros: [
      {texto:'O melhor livro já escrito sobre o colapso de um fundo.', autor:'The Economist', fonte:'Resenha'},
      {texto:'Mais de 500 mil exemplares; clássico de crise.', autor:'Editora Random House', fonte:'Dados'}
    ],
    chapters: [
      {title:'Capítulo 1 — Os Fundadores', text:'Nobel e ex-Salomon montam o LTCM.', points:['Merton','Scholes','Meriwether']},
      {title:'Capítulo 2 — O Modelo', text:'Arbitragem baseada em matemática.', points:['Histórico','Alavanca','Confiança']},
      {title:'Capítulo 3 — A Ascensão', text:'Anos de retornos estrondosos.', points:['Lucro','Fama','Tamanho']},
      {title:'Capítulo 4 — A Alavancagem', text:'Pouco capital, muita dívida.', points:['Risco','Exposição','Fragilidade']},
      {title:'Capítulo 5 — A Crise Russa', text:'1998 e o choque externo.', points:['Default','Pânico','Perda']},
      {title:'Capítulo 6 — O Colapso', text:'Bilhões perdidos em semanas.', points:['Liquidez','Correlação','Queda']},
      {title:'Capítulo 7 — O Resgate', text:'Fed coordena socorro.', points:['Sistêmico','Bancos','Acordo']},
      {title:'Capítulo 8 — Lições', text:'Limites da técnica financeira.', points:['Humildade','Risco','Modelo']}
    ]
  });
}

// ============================ LENCIONI ============================
function lencioni(){
  const m = meta('lencioni');
  return Object.assign({}, { id:m.id }, {
    summary: `Em "As 5 Disfunções de uma Equipe", Patrick Lencioni usa o formato de fábula — a história de um novo CEO que herda um time disfuncional — para revelar por que equipes inteligentes e talentosas fracassam. O modelo em cascata parte da raiz: ausência de confiança impede o conflito saudável, que por sua vez bloqueia o comprometimento, gerando falta de responsabilização e, no topo, negligência com os resultados coletivos. Lencioni oferece, após a narrativa, um guia prático com ferramentas para construir confiança, estimular debate honesto, obter clareza de compromisso, estabelecer prestação de contas e focar em metas comuns. O livro é leitura obrigatória para líderes: mostra que desempenho de equipe é menos sobre competência individual e mais sobre comportamento, vulnerabilidade e foco no todo.`,
    myths: [
      {type:'myth', title:'Talento individual garante equipe', text:' times falham por dinâmica, não por falta de skill.', reflection:'Você avalia competência ou convivência?'},
      {type:'truth', title:'Confiança é a base', text:'Sem segurança, ninguém se abre ou ajuda.', reflection:'Seu time se sente seguro?'},
      {type:'myth', title:'Conflito é ruim', text:'Conflito saudável aprimora decisões.', reflection:'Você evita briga e perde qualidade?'},
      {type:'truth', title:'Compromisso exige clareza', text:'Time alinhado executa melhor.', reflection:'Todos sabem o que foi decidido?'},
      {type:'myth', title:'Responsabilidade é do chefe', text:'Pares devem cobrar uns aos outros.', reflection:'Seu time se cobra?'},
      {type:'truth', title:'Foco em resultados', text:'Ego individual sabotaria a equipe.', reflection:'Você prioriza o coletivo?'},
      {type:'myth', title:'Harmonia aparente funciona', text:'Falsa paz esconde descompromisso.', reflection:'Sua equipe finge harmonia?'},
      {type:'truth', title:'Vulnerabilidade ajuda', text:'Líder que admite fraqueza cria confiança.', reflection:'Você se mostra vulnerável?'},
      {type:'myth', title:'Reuniões resolvem tudo', text:'Sem práticas contínuas, não adianta.', reflection:'Você tem rituais reais?'},
      {type:'truth', title:'Metas comuns', text:'Objetivo compartilhado alinha o grupo.', reflection:'Todos têm a mesma meta?'},
      {type:'myth', title:'Cobrança gera ressentimento', text:'Cobrança entre pares fortalece.', reflection:'Você evita cobrar por medo?'},
      {type:'truth', title:'Debate honesto', text:'Discordar abertamente melhora o resultado.', reflection:'Há espaço para discordar?'},
      {type:'myth', title:'Líder decide sozinho', text:'Decisão participativa gera dono.', reflection:'Você decide sozinho demais?'},
      {type:'truth', title:'Modelo em cascata', text:'Resolver a base resolve o topo.', reflection:'Você ataca a causa raiz?'}
    ],
    ensinamentos: [
      {number:'1', title:'Construa confiança', text:'Vulnerabilidade mútua abre o time.'},
      {number:'2', title:'Estimule conflito', text:'Debate honesto melhora decisões.'},
      {number:'3', title:'Clareza de compromisso', text:'Todos devem saber o decidido.'},
      {number:'4', title:'Responsabilização', text:'Pares se cobram mutuamente.'},
      {number:'5', title:'Foque resultados', text:'Coletivo acima do individual.'},
      {number:'6', title:'Seja vulnerável', text:'Líder que erra cria segurança.'},
      {number:'7', title:'Metas comuns', text:'Objetivo compartilhado alinha.'},
      {number:'8', title:'Rituais', text:'Práticas contínuas sustentam.'},
      {number:'9', title:'Evite falsa paz', text:'Harmonia sem debate esconde erro.'},
      {number:'10', title:'Decisão participativa', text:'Time dono da decisão executa.'},
      {number:'11', title:'Cobrança saudável', text:'Feedback entre pares fortalece.'},
      {number:'12', title:'Ataque a raiz', text:'Confiança base das demais.'}
    ],
    citacoes: [
      {texto:'A ausência de confiança é a raiz de toda disfunção de equipe.', autor:'Patrick Lencioni', obra:'The Five Dysfunctions of a Team'},
      {texto:'O conflito saudável é essencial para uma decisão de qualidade.', autor:'Patrick Lencioni', obra:'The Five Dysfunctions of a Team'},
      {texto:'Times falham por dinâmica, não por falta de talento.', autor:'Patrick Lencioni', obra:'The Five Dysfunctions of a Team'},
      {texto:'Responsabilidade deve vir dos pares, não só do líder.', autor:'Patrick Lencioni', obra:'The Five Dysfunctions of a Team'},
      {texto:'Resultados coletivos vencem ambições individuais.', autor:'Patrick Lencioni', obra:'The Five Dysfunctions of a Team'}
    ],
    citacoesTerceiros: [
      {texto:'O livro de liderança mais vendido e prático da década.', autor:'Harvard Business Review', fonte:'Resenha'},
      {texto:'Mais de 2 milhões de exemplares mundiais.', autor:'Editora Jossey-Bass', fonte:'Dados'}
    ],
    chapters: [
      {title:'Capítulo 1 — A Fábula', text:'Novo CEO herda time disfuncional.', points:['Cena','Problema','Contexto']},
      {title:'Capítulo 2 — Disfunção 1: Confiança', text:'A base de tudo.', points:['Segurança','Vulnerabilidade','Abertura']},
      {title:'Capítulo 3 — Disfunção 2: Conflito', text:'Debate honesto.', points:['Saudável','Decisão','Clareza']},
      {title:'Capítulo 4 — Disfunção 3: Compromisso', text:'Alinhamento.', points:['Clareza','Adoção','Foco']},
      {title:'Capítulo 5 — Disfunção 4: Responsabilidade', text:'Cobrança entre pares.', points:['Pares','Feedback','Padrão']},
      {title:'Capítulo 6 — Disfunção 5: Resultados', text:'Coletivo sobre individual.', points:['Meta','Ego','Time']},
      {title:'Capítulo 7 — O Guia Prático', text:'Ferramentas para cada disfunção.', points:['Confiança','Conflito','Contas']},
      {title:'Capítulo 8 — Implementação', text:'Como aplicar na empresa.', points:['Rituais','Cultura','Mudança']}
    ]
  });
}

// ============================ VOSS ============================
function voss(){
  const m = meta('sethi'); // placeholder not used
  const mv = meta('voss');
  return Object.assign({}, { id:mv.id }, {
    summary: `Em "Nunca Divida por Dois", Chris Voss — ex-negociador de reféns do FBI — transforma técnicas de crise em negociação do dia a dia. Contra a ideia de "dividir o diferencial", Voss ensina a buscar "sim" e evitar "não" definitivo, usar empatia tática para baixar a guarda do outro, espelhar (repetir a última palavra) para induzir explicações e rotular emoções ("Parece que você está frustrado") para construir vínculo. Ele introduz perguntas calibradas que começam por "Como" ou "O que" para deslocar a pressão para o outro, e o modelo de Ackerman para concessões com autoridade limitada. O livro mostra que negociar não é vencer, mas fazer o outro se sentir ouvido e coautor da solução — aplicável a salários, vendas, relacionamentos e conflitos.`,
    myths: [
      {type:'myth', title:'Dividir por dois resolve', text:'Concessão mecânica deixa valor na mesa.', reflection:'Você divide sem explorar?'},
      {type:'truth', title:'Empatia tática', text:'Entender emoção do outro abre negociação.', reflection:'Você ouve de verdade?'},
      {type:'myth', title:'"Não" é derrota', text:'"Não" é início de diálogo, não fim.', reflection:'Você teme o não?'},
      {type:'truth', title:'Espelhar funciona', text:'Repetir última palavra induz explicação.', reflection:'Você usa silêncio e repetição?'},
      {type:'myth', title:'Ser agressivo vence', text:'Pressão gera resistência e quebra vínculo.', reflection:'Você pressiona demais?'},
      {type:'truth', title:'Rotular emoção', text:'Nomear sentimento acalma o outro.', reflection:'Você nomeia o que o outro sente?'},
      {type:'myth', title:'Comece pelo preço', text:'Relacionamento precede número.', reflection:'Você foca em valor ou em pessoa?'},
      {type:'truth', title:'Perguntas calibradas', text:'"Como" e "O que" deslocam pressão.', reflection:'Você faz perguntas certas?'},
      {type:'myth', title:'Autoridade total ajuda', text:'Autoridade limitada protege concessões.', reflection:'Você se diz limitado?'},
      {type:'truth', title:'Modelo Ackerman', text:'Concessões decrescentes com autoridade.', reflection:'Suas concessões são estratégicas?'},
      {type:'myth', title:'Cisne negro não existe', text:'Fator inesperado pode mudar tudo.', reflection:'Você busca o inesperado?'},
      {type:'truth', title:'"Sim" sem "talvez"', text:'Buscar adesão real, não falsa.', reflection:'Você confia em sim vazio?'},
      {type:'myth', title:'Negociar é competir', text:'Coautoria da solução vence.', reflection:'Você faz o outro parceiro?'},
      {type:'truth', title:'Calma sob pressão', text:'Ritmo e pausa controlam a sala.', reflection:'Você mantém serenidade?'}
    ],
    ensinamentos: [
      {number:'1', title:'Empatia tática', text:'Sintonize a emoção do outro.'},
      {number:'2', title:'Espelhe', text:'Repita a última palavra para extrair.'},
      {number:'3', title:'Rotule', text:'Nomeie emoções para acalmar.'},
      {number:'4', title:'Perguntas calibradas', text:'"Como"/"O que" deslocam pressão.'},
      {number:'5', title:'Abraçar o não', text:'Use como ponto de partida.'},
      {number:'6', title:'Autoridade limitada', text:'Proteja concessões alegando limite.'},
      {number:'7', title:'Modelo Ackerman', text:'Concessões decrescentes e precisas.'},
      {number:'8', title:'Cisne negro', text:'Procure o fator inesperado.'},
      {number:'9', title:'Busque sim real', text:'Evite adesão de fachada.'},
      {number:'10', title:'Serenidade', text:'Ritmo e pausa controlam a sala.'},
      {number:'11', title:'Coautoria', text:'Faça o outro propor a solução.'},
      {number:'12', title:'Prepare-se', text:'Mapeie contrapartida antes.'}
    ],
    citacoes: [
      {texto:'O "não" é o começo da negociação, não o fim.', autor:'Chris Voss', obra:'Never Split the Difference'},
      {texto:'A empatia tática é entender a perspectiva do outro e demonstrar que entende.', autor:'Chris Voss', obra:'Never Split the Difference'},
      {texto:'Espelhar a última palavra faz o outro explicar mais.', autor:'Chris Voss', obra:'Never Split the Difference'},
      {texto:'Rotule as emoções para desarmar a tensão.', autor:'Chris Voss', obra:'Never Split the Difference'},
      {texto:'Negociar é fazer o outro se sentir ouvido e coautor.', autor:'Chris Voss', obra:'Never Split the Difference'}
    ],
    citacoesTerceiros: [
      {texto:'O melhor livro de negociação desde Getting to Yes.', autor:'Inc. Magazine', fonte:'Resenha'},
      {texto:'Mais de 1 milhão de exemplares; usado por equipes de vendas.', autor:'Editora HarperBusiness', fonte:'Dados'}
    ],
    chapters: [
      {title:'Capítulo 1 — O Negociador', text:'Trajetória de reféns no FBI.', points:['Crise','Tática','Mudança']},
      {title:'Capítulo 2 — Empatia Tática', text:'Entender emoção do outro.', points:['Ouvir','Vínculo','Calma']},
      {title:'Capítulo 3 — Espelhar', text:'Repetição que induz explicação.', points:['Silêncio','Pausa','Extrair']},
      {title:'Capítulo 4 — Rotular', text:'Nomear sentimentos.', points:['Acalma','Reconhece','Abraça']},
      {title:'Capítulo 5 — Perguntas Calibradas', text:'Como e o que deslocam pressão.', points:['Pressão','Controle','Diálogo']},
      {title:'Capítulo 6 — O Não', text:'Usar recusa como abertura.', points:['Início','Clareza','Caminho']},
      {title:'Capítulo 7 — Modelo Ackerman', text:'Concessões decrescentes.', points:['Autoridade','Precisão','Limite']},
      {title:'Capítulo 8 — Aplicação', text:'Salário, vendas, vida.', points:['Prática','Cisne','Resultado']}
    ]
  });
}

// ============================ SENECA ============================
function seneca(){
  const m = meta('seneca');
  return Object.assign({}, { id:m.id }, {
    summary: `Em "A Vida Feliz" (De Vita Beata), Séneca dirige-se ao amigo Gallio para demonstrar que a felicidade não reside na riqueza, mas na virtude e na tranquilidade da mente. O estoicismo de Séneca é prático: ele defende que possuir bens não é mau, desde que não sejamos possuídos por eles; a pobreza de desejos vale mais que a abundância de bens. O filósofo ataca a cobiça, a inveja e a busca por status, pregando a moderação, a generosidade e o uso consciente do tempo — nosso bem mais precioso e irrecoverável. Com prosa afiada, Séneca distingue o necessário do supérfluo e exorta o leitor a viver de acordo com a natureza e a razão. A obra é um manifesto de independência interior: ser rico é não depender da fortuna, mantendo a mente livre independentemente das circunstâncias externas.`,
    myths: [
      {type:'myth', title:'Riqueza traz felicidade', text:'Séneca separa bens de tranquilidade.', reflection:'Você confunde ter com ser feliz?'},
      {type:'truth', title:'Virtude é o bem', text:'Excelência moral supera posse.', reflection:'Sua conduta vale mais que sua conta?'},
      {type:'myth', title:'Pobreza é infelicidade', text:'Pobreza de desejos liberta.', reflection:'Você precisa de muito para estar bem?'},
      {type:'truth', title:'Não ser possuído', text:'Ter bens sem ser escravo deles.', reflection:'As coisas mandam em você?'},
      {type:'myth', title:'Status importa', text:'Busca de fama é escravidão alheia.', reflection:'Você vive para a opinião alheia?'},
      {type:'truth', title:'Moderação', text:'Uso consciente evita excesso.', reflection:'Você pratica o meio-termo?'},
      {type:'myth', title:'Tempo sobra', text:'Tempo é o bem irrecuperável.', reflection:'Você gasta tempo como quem poupa?'},
      {type:'truth', title:'Generosidade', text:'Dar com discrição eleva a alma.', reflection:'Você dá ou retém?'},
      {type:'myth', title:'Natureza pede muito', text:'Natureza exige pouco; supérfluo é escolha.', reflection:'Você confunde necessidade com desejo?'},
      {type:'truth', title:'Razão guia', text:'Viver conforme a razão.', reflection:'Sua razão comanda?'},
      {type:'myth', title:'Fortuna é estável', text:'Fortuna pode mudar; prepare-se.', reflection:'Você depende da sorte?'},
      {type:'truth', title:'Independência interior', text:'Mente livre ante a externa.', reflection:'Circunstâncias mandam em você?'},
      {type:'myth', title:'Prazer é o fim', text:'Prazer desmesurado corrói.', reflection:'Você busca prazer ou equilíbrio?'},
      {type:'truth', title:'Examinar a vida', text:'Refletir diariamente sobre conduta.', reflection:'Você se revê todo dia?'}
    ],
    ensinamentos: [
      {number:'1', title:'Virtude acima de bens', text:'Excelência moral é o bem supremo.'},
      {number:'2', title:'Pobreza de desejos', text:'Querer pouco é liberdade.'},
      {number:'3', title:'Não seja escravo', text:'Possua sem ser possuído.'},
      {number:'4', title:'Moderação', text:'Meio-termo em tudo.'},
      {number:'5', title:'Use o tempo', text:'Tempo é irrecuperável.'},
      {number:'6', title:'Generosidade', text:'Dar com discrição.'},
      {number:'7', title:'Viva conforme a natureza', text:'Razão e simplicidade.'},
      {number:'8', title:'Despreze o status', text:'Fama alheia não define.'},
      {number:'9', title:'Prepare-se para a sorte', text:'Fortuna muda; mantenha equilíbrio.'},
      {number:'10', title:'Examine-se', text:'Revisão diária da conduta.'},
      {number:'11', title:'Necessário vs supérfluo', text:'Distinga o essencial.'},
      {number:'12', title:'Independência', text:'Mente livre da externa.'}
    ],
    citacoes: [
      {texto:'Não é porque é pobre que se vive mal, mas porque se vive mal que se é pobre.', autor:'Séneca', obra:'De Vita Beata'},
      {texto:'É próprio de espírito grande desprezar o que a maioria deseja.', autor:'Séneca', obra:'De Vita Beata'},
      {texto:'A pobreza não está na falta de bens, mas no desejo excessivo.', autor:'Séneca', obra:'De Vita Beata'},
      {texto:'Guardamos com ciúme o dinheiro, mas deixamos escapar o tempo, o bem mais precioso.', autor:'Séneca', obra:'De Vita Beata'},
      {texto:'O homem feliz é aquele que se contenta com o que tem.', autor:'Séneca', obra:'De Vita Beata'}
    ],
    citacoesTerceiros: [
      {texto:'Séneca escreve com a urgência de quem sabe que a morte é próxima.', autor:'Introdução da edição L&PM', fonte:'Nota editorial'},
      {texto:'Clássico estoico revisitado por líderes modernos.', autor:'Ryan Holiday', fonte:'Daily Stoic'}
    ],
    chapters: [
      {title:'Capítulo 1 — A Felicidade', text:'Definir bem-aventurança.', points:['Virtude','Mente','Bens']},
      {title:'Capítulo 2 — Riqueza e Virtude', text:'Ter sem ser escravo.', points:['Posse','Uso','Limite']},
      {title:'Capítulo 3 — Desejo', text:'Pobreza de desejos.', points:['Necessário','Supérfluo','Liberdade']},
      {title:'Capítulo 4 — Tempo', text:'O bem irrecuperável.', points:['Poupar','Viver','Agora']},
      {title:'Capítulo 5 — Status', text:'Indiferença à fama.', points:['Opinião','Interna','Força']},
      {title:'Capítulo 6 — Generosidade', text:'Dar com medida.', points:['Discrição','Elevar','Outro']},
      {title:'Capítulo 7 — Natureza e Razão', text:'Viver conforme a razão.', points:['Simples','Ordem','Equilíbrio']},
      {title:'Capítulo 8 — Exame', text:'Revisão diária.', points:['Conduta','Melhorar','Paz']}
    ]
  });
}

// ============================ EPITETO ============================
function epiteto(){
  const m = meta('epiteto');
  return Object.assign({}, { id:m.id }, {
    summary: `Em "O Manual" (Enchiridion), Epiteto — escravo liberto que se tornou o maior mestre estoico — condensou, pela voz do discípulo Arriano, o cerne de sua filosofia: a dicotomia do controle. Tudo divide-se entre o que depende de nós (nossas opiniões, impulsos, desejos, aversões) e o que não depende (corpo, riqueza, reputação, vida). A liberdade e a paz nascem ao aceitar o segundo e cuidar rigorosamente do primeiro. Epiteto ensina a não projetar expectativas sobre o externo ("não diga que perdi, mas que devolvi"), a usar as representações com disciplina e a transformar apaixões em julgamentos. Pequeno e direto, o Manual é um manual de sobrevivência emocional: relembrar, a cada instante, que nosso sofrimento vem não das coisas, mas de como as interpretamos — e que podemos, portanto, reescrever essa interpretação.`,
    myths: [
      {type:'myth', title:'Externo controla nossa paz', text:'Epicteto separa o que depende de nós do que não.', reflection:'Você culpa o externo pela dor?'},
      {type:'truth', title:'Dicotomia do controle', text:'Cuidar do que é nosso traz liberdade.', reflection:'Você foca no que controla?'},
      {type:'myth', title:'Perder é ruim', text:'Devolver o que foi emprestado pela vida é natural.', reflection:'Você chora o que não possuía?'},
      {type:'truth', title:'Opinião é nossa', text:'O sofrimento vem da interpretação.', reflection:'Você reescreve a leitura?'},
      {type:'myth', title:'Corpo define valor', text:'Corpo é indiferente; caráter importa.', reflection:'Você liga demais à aparência?'},
      {type:'truth', title:'Aceitação', text:'Assentir ao real reduz sofrimento.', reflection:'Você aceita ou resiste?'},
      {type:'myth', title:'Reputação importa', text:'Fama é indiferente ao sábio.', reflection:'A opinião alheia manda em você?'},
      {type:'truth', title:'Impulsos disciplinados', text:'Governar desejos e aversões.', reflection:'Seus impulsos te governam?'},
      {type:'myth', title:'Prazer é bem', text:'Prazer sem medida corrompe.', reflection:'Você busca prazer ou virtude?'},
      {type:'truth', title:'Representações', text:'Usar a razão sobre as impressões.', reflection:'Você examina a impressão?'},
      {type:'myth', title:'Outros causam sua dor', text:'Dor vem do seu julgamento.', reflection:'Você atribui a dor a outros?'},
      {type:'truth', title:'Liberdade interna', text:'Mentelivre ante a fortuna.', reflection:'Você é livre por dentro?'},
      {type:'myth', title:'Estudo basta', text:'Prática diária é o que transforma.', reflection:'Você só estuda ou exercita?'},
      {type:'truth', title:'Amor fati', text:'Acolher o dado como oportuno.', reflection:'Você aceita o que vem?'}
    ],
    ensinamentos: [
      {number:'1', title:'Dicotomia', text:'Separe o que depende de nós.'},
      {number:'2', title:'Cuide do interno', text:'Opiniões e impulsos são seus.'},
      {number:'3', title:'Não diga "perdi"', text:'Você devolveu o emprestado.'},
      {number:'4', title:'Aceite o externo', text:'Corpo, fama e bens são indiferentes.'},
      {number:'5', title:'Discipline impulsos', text:'Governar desejo e aversão.'},
      {number:'6', title:'Examine impressões', text:'Razão sobre a representação.'},
      {number:'7', title:'Reescreva dor', text:'Dor vem da interpretação.'},
      {number:'8', title:'Pratique diário', text:'Filosofia é exercício.'},
      {number:'9', title:'Solte reputação', text:'Fama não define o sábio.'},
      {number:'10', title:'Liberdade', text:'Mente livre da fortuna.'},
      {number:'11', title:'Assentir ao real', text:'Aceite o que ocorre.'},
      {number:'12', title:'Virtude', text:'Caráter acima de ter.'}
    ],
    citacoes: [
      {texto:'Algumas coisas dependem de nós, outras não.', autor:'Epiteto', obra:'Enchiridion'},
      {texto:'Não digas que perdestes, mas que restitustes.', autor:'Epiteto', obra:'Enchiridion'},
      {texto:'Homens são perturbados não pelas coisas, mas pelas opiniões sobre as coisas.', autor:'Epiteto', obra:'Enchiridion'},
      {texto:'É possível ser livre mesmo quando escravo, se governar a própria mente.', autor:'Epiteto', obra:'Enchiridion'},
      {texto:'Pede aos deuses que as coisas aconteçam como querem, e não como queres.', autor:'Epiteto', obra:'Enchiridion'}
    ],
    citacoesTerceiros: [
      {texto:'O guia mais conciso e prático do estoicismo.', autor:'Nota da Martin Claret', fonte:'Apresentação'},
      {texto:'Lido por generais e líderes como manual de equilíbrio.', autor:'James Stockdale', fonte:'Citação'}
    ],
    chapters: [
      {title:'Capítulo 1 — Dicotomia', text:'O que depende e o que não depende.', points:['Interno','Externo','Liberdade']},
      {title:'Capítulo 2 — Opinião', text:'O sofrimento vem da leitura.', points:['Interpretação','Dor','Controle']},
      {title:'Capítulo 3 — Devolver', text:'Não perder, mas restituir.', points:['Empréstimo','Vida','Aceite']},
      {title:'Capítulo 4 — Impulsos', text:'Governar desejos.', points:['Disciplina','Razão','Freio']},
      {title:'Capítulo 5 — Representações', text:'Usar a razão nas impressões.', points:['Examinar','Julgar','Calma']},
      {title:'Capítulo 6 — Indiferentes', text:'Corpo, fama, bens.', points:['Meio','Uso','Equilíbrio']},
      {title:'Capítulo 7 — Prática', text:'Filosofia como exercício.', points:['Diário','Hábito','Mudança']},
      {title:'Capítulo 8 — Liberdade', text:'Mente livre da fortuna.', points:['Forte','Sereno','Dono']}
    ]
  });
}

// ============================ AURELIO ============================
function aurelio(){
  const m = meta('aurelio');
  return Object.assign({}, { id:m.id }, {
    summary: `Em "Meditações", Marco Aurélio — imperador romano e estoico — escreveu anotações pessoais para si mesmo, nunca para publicação. Nessas reflexões, o governante do mundo conhecido lembra-se de que a morte é certa, a fama efêmera e a única liberdade real está na razão e no dever cumprido. O livro é um exercício contínuo de desapego: aceitar o que não se controla, servir ao bem comum, tratar os outros com justiça e manter a equanimidade ante ofensas. Marco Aurélio enfatiza a natureza interligada de todas as coisas, a brevidade da vida e a importância de agir no presente, como se cada ato fosse o último. Sem dogmatismo, as Meditações são um guia de autodomínio para quem ocupa o poder e para quem busca paz sob pressão — uma conversa silenciosa entre o imperador e sua própria consciência.`,
    myths: [
      {type:'myth', title:'Poder traz felicidade', text:'Marco Aurélio busca dever, não prazer.', reflection:'Você confunde cargo com paz?'},
      {type:'truth', title:'Morte é certa', text:'Lembrar da finitude foca o presente.', reflection:'Você vive como se o tempo fosse infinito?'},
      {type:'myth', title:'Fama importa', text:'Reputação efêmera não move o sábio.', reflection:'Você corre atrás de aplauso?'},
      {type:'truth', title:'Razão e dever', text:'Agir conforme a natureza e a função.', reflection:'Você cumpre seu dever?'},
      {type:'myth', title:'Outros causam ofensa', text:'Ofensa está no seu julgamento.', reflection:'Você se ofende por fora?'},
      {type:'truth', title:'Bem comum', text:'Servir à coletividade é virtude.', reflection:'Você vive para si só?'},
      {type:'myth', title:'PRESENTE é garantido', text:'Cada ato pode ser o último.', reflection:'Você adia viver?'},
      {type:'truth', title:'Equanimidade', text:'Serenidade ante elogio e crítica.', reflection:'Você oscila com opinião alheia?'},
      {type:'myth', title:'Coisas controlam', text:'Interno é o único domínio.', reflection:'Você tenta controlar o externo?'},
      {type:'truth', title:'Vida breve', text:'Brevidade exige foco no essencial.', reflection:'Você desperdiça o agora?'},
      {type:'myth', title:'Escritas para fama', text:'Meditações eram diário privado.', reflection:'Você vive para plateia?'},
      {type:'truth', title:'Natureza una', text:'Tudo interligado; agir com harmonia.', reflection:'Você sente conexão com o todo?'},
      {type:'myth', title:'Sentir pouco é forte', text:'Sentir e agir bem é a virtude.', reflection:'Você reprime em vez de governar?'},
      {type:'truth', title:'Presente é tudo', text:'Só o agora está em teu poder.', reflection:'Você vive no ontem ou amanhã?'}
    ],
    ensinamentos: [
      {number:'1', title:'Foco no agora', text:'Só o presente é teu.'},
      {number:'2', title:'Lembre-se da morte', text:'Finitude dá urgência ao bem.'},
      {number:'3', title:'Cumpra o dever', text:'Função e razão guiam.'},
      {number:'4', title:'Sirva ao comum', text:'Bem coletivo acima do próprio.'},
      {number:'5', title:'Equanimidade', text:'Sereno ante ofensa.'},
      {number:'6', title:'Desapego', text:'Coisas externas são emprestadas.'},
      {number:'7', title:'Razão', text:'Governar por logos.'},
      {number:'8', title:'Justiça', text:'Tratar outros com retidão.'},
      {number:'9', title:'Brevidade', text:'Vida curta exige essência.'},
      {number:'10', title:'Natureza una', text:'Tudo conectado.'},
      {number:'11', title:'Autoexame', text:'Diálogo com a consciência.'},
      {number:'12', title:'Agir bem', text:'Como se fosse o último ato.'}
    ],
    citacoes: [
      {texto:'Muito pouco é necessário para uma vida feliz.', autor:'Marco Aurélio', obra:'Meditations'},
      {texto:'Não és perturbado pelas coisas, mas pela tua opinião sobre elas.', autor:'Marco Aurélio', obra:'Meditations'},
      {texto:'A cada vez que agires, pensa como se fosse a última da tua vida.', autor:'Marco Aurélio', obra:'Meditations'},
      {texto:'O que não é útil ao enxame, não é útil à abelha.', autor:'Marco Aurélio', obra:'Meditations'},
      {texto:'Tu és uma pequena alma carregando um cadáver.', autor:'Marco Aurélio', obra:'Meditations'}
    ],
    citacoesTerceiros: [
      {texto:'O diário de um imperador que queria ser apenas um homem decente.', autor:'Introdução da Penguin', fonte:'Nota editorial'},
      {texto:'Meditações influenciou líderes de guerra e paz por séculos.', autor:'William Irvine', fonte:'A Guide to the Good Life'}
    ],
    chapters: [
      {title:'Capítulo 1 — Para Si Mesmo', text:'Diário privado do imperador.', points:['Pessoal','Sem público','Verdade']},
      {title:'Capítulo 2 — A Morte', text:'Finitude e urgência.', points:['Certa','Foco','Agora']},
      {title:'Capítulo 3 — Razão e Dever', text:'Agir conforme a natureza.', points:['Logos','Função','Virtude']},
      {title:'Capítulo 4 — O Bem Comum', text:'Servir à coletividade.', points:['Enxame','Justiça','Outro']},
      {title:'Capítulo 5 — Ofensa', text:'Julgamento causa a dor.', points:['Interno','Calma','Força']},
      {title:'Capítulo 6 — Equanimidade', text:'Serenidade sob pressão.', points:['Meio','Estável','Livre']},
      {title:'Capítulo 7 — Brevidade', text:'Vida curta, essência.', points:['Tempo','Essencial','Ação']},
      {title:'Capítulo 8 — Presente', text:'Só o agora é teu.', points:['Poder','Agir','Paz']}
    ]
  });
}

// ============================ HOLIDAY ============================
function holiday(){
  const m = meta('holiday');
  return Object.assign({}, { id:m.id }, {
    summary: `Em "O Obstáculo é o Caminho", Ryan Holiday resgata a filosofia estoica e a transforma em manual de ação frente à adversidade. A tese: o obstáculo não bloqueia o caminho, ele é o caminho. Dividido em três disciplinas — percepção, ação e vontade — o livro ensina a reenquadrar o que nos paralisa. Na percepção, vemos a realidade sem distorção emocional; na ação, transformamos bloqueios em combustível através de passos pequenos e persistentes; na vontade, aceitamos o incontrolável e seguimos firmes. Holiday ilustra com figuras como Theodore Roosevelt, Abraham Lincoln, Amelia Earhart e Steve Jobs, mostrando que grandes feitos nasceram de limitações enfrentadas. A obra é um antídoto contra a paralisia: em vez de esperar condições ideais, usamos o que há — inclusive o pior — como material para avançar.`,
    myths: [
      {type:'myth', title:'Obstáculo atrapalha', text:'Holiday diz que ele é o próprio caminho.', reflection:'Você foge ou usa o bloqueio?'},
      {type:'truth', title:'Percepção importa', text:'Ver sem distorção emocional libera.', reflection:'Você enxerga o real ou o temido?'},
      {type:'myth', title:'Esperar condições ideais', text:'Agir com o que há vence a espera.', reflection:'Você adia por falta de ideal?'},
      {type:'truth', title:'Ação persistente', text:'Passos pequenos transformam bloqueio.', reflection:'Você avança ou paralisa?'},
      {type:'myth', title:'Controle tudo', text:'Vontade aceita o incontrolável.', reflection:'Você briga com o inevitável?'},
      {type:'truth', title:'Aceitação', text:'Dizer "sim" ao dado fortalece.', reflection:'Você aceita o que vem?'},
      {type:'myth', title:'Fortuna é cega', text:'Uso da adversidade é escolha.', reflection:'Você escolhe o uso?'},
      {type:'truth', title:'Combustível', text:'Obstáculo vira energia de avanço.', reflection:'Você transforma ou sofre?'},
      {type:'myth', title:'Grandes precisam de tudo', text:'Limitação forjou os grandes.', reflection:'Você culpa a falta de recursos?'},
      {type:'truth', title:'Disciplina estoica', text:'Percepção, ação e vontade.', reflection:'Você pratica as três?'},
      {type:'myth', title:'Vítima do destino', text:'Tuas escolhas respondem ao fato.', reflection:'Você se diz vítima?'},
      {type:'truth', title:'Pequenos passos', text:'Consistência supera o improvável.', reflection:'Você confia no passo a passo?'},
      {type:'myth', title:'Emoção guia leitura', text:'Distorção emocional cega.', reflection:'Sua emoção tolda o real?'},
      {type:'truth', title:'Resposta é tua', text:'Como reagir é só teu.', reflection:'Você assume a resposta?'}
    ],
    ensinamentos: [
      {number:'1', title:'Obstáculo é caminho', text:'Use o bloqueio como via.'},
      {number:'2', title:'Percepção limpa', text:'Veja o real sem medo.'},
      {number:'3', title:'Aja com o que há', text:'Recurso limitado ainda serve.'},
      {number:'4', title:'Passos pequenos', text:'Consistência transforma.'},
      {number:'5', title:'Aceite o dado', text:'Incontrolável é aceito.'},
      {number:'6', title:'Vontade firme', text:'Seguir apesar do facto.'},
      {number:'7', title:'Combustível', text:'Adversidade vira energia.'},
      {number:'8', title:'Estoico na prática', text:'Três disciplinas diárias.'},
      {number:'9', title:'Não culpe', text:'Responsabilidade pela resposta.'},
      {number:'10', title:'Exemplos', text:'Roosevelt, Lincoln inspiraram.'},
      {number:'11', title:'Persistência', text:'Não parar no não.'},
      {number:'12', title:'Resposta tua', text:'Reação é escolha.'}
    ],
    citacoes: [
      {texto:'O obstáculo não está no caminho; ele é o caminho.', autor:'Ryan Holiday', obra:'The Obstacle Is the Way'},
      {texto:'A percepção precede a ação; veja o mundo como ele é.', autor:'Ryan Holiday', obra:'The Obstacle Is the Way'},
      {texto:'Transforme o que o impede em combustível.', autor:'Ryan Holiday', obra:'The Obstacle Is the Way'},
      {texto:'Nossa resposta ao destino é a única coisa que controlamos.', autor:'Ryan Holiday', obra:'The Obstacle Is the Way'},
      {texto:'A ação persistente desfaz o impossível.', autor:'Ryan Holiday', obra:'The Obstacle Is the Way'}
    ],
    citacoesTerceiros: [
      {texto:'O estoicismo moderno mais vendido da última década.', autor:'The Guardian', fonte:'Resenha'},
      {texto:'Mais de 1 milhão de exemplares; adotado por atletas.', autor:'Editora Portfolio', fonte:'Dados'}
    ],
    chapters: [
      {title:'Capítulo 1 — O Caminho', text:'Obstáculo como via.', points:['Tese','Uso','Mudança']},
      {title:'Capítulo 2 — Perceppção', text:'Ver sem distorção.', points:['Real','Emoção','Clareza']},
      {title:'Capítulo 3 — Ação', text:'Passos sobre o bloqueio.', points:['Pequeno','Persistente','Resultado']},
      {title:'Capítulo 4 — Vontade', text:'Aceitar o incontrolável.', points:['Sim','Firme','Seguir']},
      {title:'Capítulo 5 — Exemplos', text:'Roosevelt, Lincoln, Earhart.', points:['Limite','Feito','Uso']},
      {title:'Capítulo 6 — Combustível', text:'Adversidade vira força.', points:['Energia','Foco','Avanço']},
      {title:'Capítulo 7 — Disciplinas', text:'Três eixos estoicos.', points:['Ver','Agir','Querer']},
      {title:'Capítulo 8 — Aplicação', text:'Usar hoje o método.', points:['Prática','Resposta','Paz']}
    ]
  });
}

// ============================ BABAUTA ============================
function babauta(){
  const m = meta('babauta');
  return Object.assign({}, { id:m.id }, {
    summary: `Em "Zen To Done" (ZTD), Leo Babauta — criador do blog Zen Habits — propõe uma versão simplificada e aplicável do método Getting Things Done, desenhada para quem se dispersa facilmente. O ZTD baseia-se em dez hábitos estruturados: capturar tudo, processar a caixa zero, planejar o dia com foco, escolher um único grande foco por vez, tarefa única (single-tasking), simplificar agenda, organizar, rever semanalmente, encontrar motivação e, acima de tudo, começar de forma mínima. Babauta defende a simplicidade e a pequena vitória diária em vez de sistemas complexos que ninguém sustenta. O livro é um guia gentil de produtividade: menos teoria, mais ação; menos ferramentas, mais foco. Para o autor, a produtividade não vem de mais apps, e sim de hábitos consistentes e de fazer menos coisas, porém com presença plena.`,
    myths: [
      {type:'myth', title:'Precisa de app perfeito', text:'Babauta foca em hábito, não ferramenta.', reflection:'Você acumula ferramentas sem usar?'},
      {type:'truth', title:'Capturar tudo', text:'Tirar da mente para a lista.', reflection:'Você carrega tarefas na cabeça?'},
      {type:'myth', title:'Multitarefa funciona', text:'Tarefa única rende mais.', reflection:'Você faz várias ao mesmo tempo?'},
      {type:'truth', title:'Um foco por vez', text:'Um grande alvo diário concentra.', reflection:'Você foca ou fragmenta?'},
      {type:'myth', title:'Sistema complexo salva', text:'Simplicidade é o que adere.', reflection:'Seu sistema é simples?'},
      {type:'truth', title:'Caixa zero', text:'Processar entradas evita acúmulo.', reflection:'Você deixa tudo empilhado?'},
      {type:'myth', title:'Motivação vem primeiro', text:'Ação gera motivação, não o contrário.', reflection:'Você espera querer para agir?'},
      {type:'truth', title:'Começar mínimo', text:'Pequena ação sustenta o hábito.', reflection:'Você espera grande início?'},
      {type:'myth', title:'Planejar tudo', text:'Foco no essencial do dia.', reflection:'Você sobreplaneja?'},
      {type:'truth', title:'Revisão semanal', text:'Olhar o sistema mantém aderência.', reflection:'Você revisa sua semana?'},
      {type:'myth', title:'Mais tarefas, mais valor', text:'Fazer menos, com presença, vale.', reflection:'Você confunde ocupação com valor?'},
      {type:'truth', title:'Hábito vence', text:'Consistência supera o pico.', reflection:'Você é constante?'},
      {type:'myth', title:'Perfeição inicial', text:'Começar imperfeito é melhor.', reflection:'Você adia por perfeição?'},
      {type:'truth', title:'Simplificar', text:'Menos agenda, mais foco.', reflection:'Sua agenda está enxuta?'}
    ],
    ensinamentos: [
      {number:'1', title:'Capture', text:'Anote tudo que surge.'},
      {number:'2', title:'Caixa zero', text:'Processe entradas.'},
      {number:'3', title:'Foco diário', text:'Um grande alvo por dia.'},
      {number:'4', title:'Tarefa única', text:'Uma coisa de cada vez.'},
      {number:'5', title:'Simplicidade', text:'Menos ferramentas.'},
      {number:'6', title:'Agenda enxuta', text:'Poucos compromissos.'},
      {number:'7', title:'Organize', text:'Lugares fixos para tudo.'},
      {number:'8', title:'Revisão', text:'Olhe o sistema semanal.'},
      {number:'9', title:'Motivação por ação', text:'Comece para querer.'},
      {number:'10', title:'Início mínimo', text:'Pequena ação diária.'},
      {number:'11', title:'Hábito', text:'Constância vence pico.'},
      {number:'12', title:'Menos é mais', text:'Fazer menos com presença.'}
    ],
    citacoes: [
      {texto:'A produtividade não vem de mais ferramentas, e sim de menos foco perdido.', autor:'Leo Babauta', obra:'Zen To Done'},
      {texto:'Fazer uma coisa de cada vez é mais rápido que multitarefa.', autor:'Leo Babauta', obra:'Zen To Done'},
      {texto:'Comece pequeno; a consistência constrói o hábito.', autor:'Leo Babauta', obra:'Zen To Done'},
      {texto:'Capture tudo para esvaziar a mente.', autor:'Leo Babauta', obra:'Zen To Done'},
      {texto:'Escolha um foco por dia e proteja-o.', autor:'Leo Babauta', obra:'Zen To Done'}
    ],
    citacoesTerceiros: [
      {texto:'A versão mais gentil e aplicável do GTD.', autor:'Lifehacker', fonte:'Resenha'},
      {texto:'Mais de 300 mil leitores; querido por minimalistas.', autor:'Editora Novatec', fonte:'Dados'}
    ],
    chapters: [
      {title:'Capítulo 1 — Por que ZTD', text:'Simplicidade contra a dispersão.', points:['Foco','Hábito','Menos']},
      {title:'Capítulo 2 — Capturar', text:'Tirar da mente.', points:['Lista','Vazio','Clareza']},
      {title:'Capítulo 3 — Caixa Zero', text:'Processar entradas.', points:['Ação','Decisão','Fluxo']},
      {title:'Capítulo 4 — Um Foco', text:'Alvo único diário.', points:['Concentrar','Proteger','Fazer']},
      {title:'Capítulo 5 — Tarefa Única', text:'Single-tasking.', points:['Atenção','Ritmo','Qualidade']},
      {title:'Capítulo 6 — Simplicidade', text:'Menos agenda e apps.', points:['Enxuto','Essencial','Calma']},
      {title:'Capítulo 7 — Revisão', text:'Semanal para manter.', points:['Olhar','Ajustar','Seguir']},
      {title:'Capítulo 8 — Hábito', text:'Constância vence.', points:['Pequeno','Diário','Resultado']}
    ]
  });
}

// ============================ BECKER ============================
function becker(){
  const m = meta('becker');
  return Object.assign({}, { id:m.id }, {
    summary: `Em "O Que Resta" (The More of Less), Joshua Becker mostra que ter menos bens pode, paradoxalmente, entregar mais vida. Voltado a famílias e pessoas comuns, o livro desmistifica o minimalismo como privação e o apresenta como ferramenta de liberdade intencional: livrar-se do excesso para recuperar tempo, dinheiro, relacionamentos e propósito. Becker oferece um passo a passo prático — desde a motivação inicial até a doação do que sobra — e aborda objeções comuns ("minhas coisas trazem segurança"). Ele argumenta que a cultura de consumo vende a ilusão de que posses trazem felicidade, quando na verdade roubam atenção e recursos. O foco não é viver em casa vazia, mas manter apenas o que agrega valor. É um convite gentil à simplicidade que cabe em qualquer rotina e fortalece o que realmente importa.`,
    myths: [
      {type:'myth', title:'Minimalismo é privação', text:'Becker mostra que é liberdade intencional.', reflection:'Você acha que ter menos é sofrer?'},
      {type:'truth', title:'Menos traz mais', text:'Tempo e foco aumentam ao desapegar.', reflection:'O excesso rouba seu tempo?'},
      {type:'myth', title:'Coisas dão segurança', text:'Acúmulo ilude; propósito real segura.', reflection:'Suas coisas protegem ou prendem?'},
      {type:'truth', title:'Intencionalidade', text:'Manter só o que tem valor.', reflection:'Você escolhe o que guarda?'},
      {type:'myth', title:'Consumo traz felicidade', text:'Mercado vende ilusão de preenchimento.', reflection:'Você compra para preencher vazio?'},
      {type:'truth', title:'Mais tempo', text:'Menos manutenção libera horas.', reflection:'Seus bens roubam suas horas?'},
      {type:'myth', title:'Só para solteiros', text:'Becker escreve para famílias.', reflection:'Você acha que não cabe na sua vida?'},
      {type:'truth', title:'Generosidade', text:'Dar o excesso ajuda outros e a você.', reflection:'Você doa o que não usa?'},
      {type:'myth', title:'Precisa de casa vazia', text:'Manter o essencial já transforma.', reflection:'Você acha tudo ou nada?'},
      {type:'truth', title:'Passo a passo', text:'Processo gradual e prático.', reflection:'Você tem método ou impulsos?'},
      {type:'myth', title:'Guardar por "pode servir"', text:'Raramente serve; ocupa espaço.', reflection:'Você guarda por medo?'},
      {type:'truth', title:'Relacionamentos', text:'Menos coisa, mais presença.', reflection:'Suas coisas competem com quem ama?'},
      {type:'myth', title:'Mudança radical obrigatória', text:'Pequenos cortes já ajudam.', reflection:'Você espera revolução?'},
      {type:'truth', title:'Propósito', text:'Redirecionar recursos ao que importa.', reflection:'Seus recursos vão ao essencial?'}
    ],
    ensinamentos: [
      {number:'1', title:'Por que menos', text:'Liberdade intencional.'},
      {number:'2', title:'Intencionalidade', text:'Manter o que vale.'},
      {number:'3', title:'Mais tempo', text:'Recuperar horas.'},
      {number:'4', title:'Mais dinheiro', text:'Parar de comprar supérfluo.'},
      {number:'5', title:'Relações', text:'Presença sobre posse.'},
      {number:'6', title:'Generosidade', text:'Doar o excesso.'},
      {number:'7', title:'Passo a passo', text:'Começar gradual.'},
      {number:'8', title:'Famílias', text:'Minimalismo em casa.'},
      {number:'9', title:'Desapego', text:'Soltar o "pode servir".'},
      {number:'10', title:'Essencial', text:'Foco no que importa.'},
      {number:'11', title:'Propósito', text:'Redirecionar recursos.'},
      {number:'12', title:'Manter', text:'Sustentar a simplicidade.'}
    ],
    citacoes: [
      {texto:'Ter menos bens pode entregar mais vida.', autor:'Joshua Becker', obra:'The More of Less'},
      {texto:'O consumo promete felicidade, mas entrega distração.', autor:'Joshua Becker', obra:'The More of Less'},
      {texto:'Minimalismo é liberdade intencional, não privação.', autor:'Joshua Becker', obra:'The More of Less'},
      {texto:'Quando você possui menos, tem mais tempo para o que importa.', autor:'Joshua Becker', obra:'The More of Less'},
      {texto:'Doar o excesso é generosidade que liberta ambos.', autor:'Joshua Becker', obra:'The More of Less'}
    ],
    citacoesTerceiros: [
      {texto:'O livro de minimalismo mais acessível para famílias.', autor:'Real Simple', fonte:'Resenha'},
      {texto:'Mais de 500 mil leitores; referência do movimento.', autor:'Editora WaterBrook', fonte:'Dados'}
    ],
    chapters: [
      {title:'Capítulo 1 — O Convite', text:'Por que ter menos.', points:['Liberdade','Intenção','Vida']},
      {title:'Capítulo 2 — A Ilusão', text:'Consumo não preenche.', points:['Mercado','Vazio','Falsa']},
      {title:'Capítulo 3 — Benefícios', text:'Tempo, dinheiro, relações.', points:['Horas','Recurso','Presença']},
      {title:'Capítulo 4 — Objeções', text:'Respostas ao "mas eu preciso".', points:['Segurança','Família','Medo']},
      {title:'Capítulo 5 — Começar', text:'Primeiro passo prático.', points:['Pequeno','Local','Ação']},
      {title:'Capítulo 6 — Doar', text:'Generosidade com o excesso.', points:['Outro','Leveza','Ciclo']},
      {title:'Capítulo 7 — Famílias', text:'Minimalismo em casa.', points:['Crianças','Modelo','Equilíbrio']},
      {title:'Capítulo 8 — Manter', text:'Sustentar a mudança.', points:['Hábito','Foco','Propósito']}
    ]
  });
}

// ============================ MILLBURN ============================
function millburn(){
  const m = meta('millburn');
  return Object.assign({}, { id:m.id }, {
    summary: `Em "Minimalismo: Como Viver uma Vida com Significado" (Everything That Remains), Joshua Fields Millburn relata, em tom autobiográfico, como abandonou uma carreira corporativa de seis dígitos e toneladas de objetos após a morte da mãe e o fim de um relacionamento. Ao despojar a vida do supérfluo, descobriu que o que resta — saúde, relacionamentos, paixões, crescimento, contribuição — é o que realmente importa. Escrito com o coautor Ryan Nicodemus (a dupla "The Minimalists"), o livro mistura memórias e reflexão sobre consumo, dependência de status e a busca de significado. Não é um manual de organização, e sim um relato de transformação: provar que menos posses pode significar mais presença, mais liberdade e mais conexão humana. Um convite a perguntar o que é essencial antes que a vida passe.`,
    myths: [
      {type:'myth', title:'Sucesso é salário alto', text:'Millburn achou vazio no topo financeiro.', reflection:'Você confunde cargo com plenitude?'},
      {type:'truth', title:'Menos pode ser mais', text:'Despojar revelou o essencial.', reflection:'O excesso esconde o que importa?'},
      {type:'myth', title:'Objetos trazem paz', text:'Acúmulo mascarou a dor.', reflection:'Suas coisas preenchem vazio?'},
      {type:'truth', title:'Relações importam', text:'Conexão humana é o núcleo.', reflection:'Você investe em pessoas?'},
      {type:'myth', title:'Status define valor', text:'Aprovação externa é frágil.', reflection:'Você vive para o status?'},
      {type:'truth', title:'Saúde primeiro', text:'Corpo e mente sustentam tudo.', reflection:'Você cuida de si?'},
      {type:'myth', title:'Mudança é radical ou nada', text:'Pequenos cortes já ajudam.', reflection:'Você espera virada total?'},
      {type:'truth', title:'Crescimento', text:'Desenvolver-se é parte do sentido.', reflection:'Você cresce ou repete?'},
      {type:'myth', title:'Ter é segurança', text:'Posse ilude proteção.', reflection:'Suas coisas protegem?'},
      {type:'truth', title:'Contribuição', text:'Servir aos outros dá significado.', reflection:'Você contribui?'},
      {type:'myth', title:'Minimalismo é estética', text:'É escolha de vida, não visual.', reflection:'Você acha que é só decoração?'},
      {type:'truth', title:'Presença', text:'Estar presente vale mais que ter.', reflection:'Você está presente ou distraído?'},
      {type:'myth', title:'Morte distante', text:'Perda ensinou urgência.', reflection:'Você vive como se houvesse tempo?'},
      {type:'truth', title:'Essencial primeiro', text:'Perguntar o que importa antes.', reflection:'Você define o essencial?'}
    ],
    ensinamentos: [
      {number:'1', title:'Reavaliar', text:'Questione o que é essencial.'},
      {number:'2', title:'Desapegar', text:'Livre-se do supérfluo.'},
      {number:'3', title:'Saúde', text:'Cuide do corpo e mente.'},
      {number:'4', title:'Relações', text:'Priorize conexões.'},
      {number:'5', title:'Paixões', text:'Faça o que ama.'},
      {number:'6', title:'Crescimento', text:'Desenvolva-se sempre.'},
      {number:'7', title:'Contribuição', text:'Sirva aos outros.'},
      {number:'8', title:'Presença', text:'Esteja onde está.'},
      {number:'9', title:'Menos consumo', text:'Compre menos, viva mais.'},
      {number:'10', title:'Significado', text:'Busque propósito, não posse.'},
      {number:'11', title:'Urgência', text:'A vida é breve.'},
      {number:'12', title:'Escolha', text:'Decida o que fica.'}
    ],
    citacoes: [
      {texto:'O amor e a conexão humana são o que resta quando tudo mais se vai.', autor:'Joshua Fields Millburn', obra:'Everything That Remains'},
      {texto:'O minimalismo me ensinou que menos pode ser, de fato, mais.', autor:'Joshua Fields Millburn', obra:'Everything That Remains'},
      {texto:'Aposentei-me do consumo para viver com intenção.', autor:'Joshua Fields Millburn', obra:'Everything That Remains'},
      {texto:'A morte da minha mãe mostrou o que importa.', autor:'Joshua Fields Millburn', obra:'Everything That Remains'},
      {texto:'Liberdade é ter tempo para o que ama.', autor:'Joshua Fields Millburn', obra:'Everything That Remains'}
    ],
    citacoesTerceiros: [
      {texto:'A história que lançou o movimento minimalista moderno.', autor:'The Minimalists (site)', fonte:'Sobre'},
      {texto:'Mais de 500 mil leitores; fenômeno do podcast.', autor:'Editora Asymmetrical', fonte:'Dados'}
    ],
    chapters: [
      {title:'Capítulo 1 — A Queda', text:'Fim de carreira e relação.', points:['Vazio','Morte','Fim']},
      {title:'Capítulo 2 — O Despojo', text:'Livrar o excesso.', points:['Caixas','Livre','Leve']},
      {title:'Capítulo 3 — O que Resta', text:'Saúde, relações, paixão.', points:['Essencial','Núcleo','Vida']},
      {title:'Capítulo 4 — Consumo', text:'Ilusão de preenchimento.', points:['Status','Vazio','Máscara']},
      {title:'Capítulo 5 — Relações', text:'Conexão humana.', points:['Presença','Outro','Amor']},
      {title:'Capítulo 6 — Crescimento', text:'Desenvolvimento pessoal.', points:['Aprender','Mudar','Ser']},
      {title:'Capítulo 7 — Contribuição', text:'Servir aos outros.', points:['Dar','Sentido','Mais']},
      {title:'Capítulo 8 — Significado', text:'Viver com propósito.', points:['Escolha','Tempo','Resto']}
    ]
  });
}

// ============================ KWIK ============================
function kwik(){
  const m = meta('kwik');
  return Object.assign({}, { id:m.id }, {
    summary: `Em "Sem Limites" (Limitless), Jim Kwik — treinador de memória de celebridades e CEOs — parte de uma premissa provocadora: a inteligência não é fixa, ela é treinável. O modelo LIMITLESS reúne três pilares — Mentalidade (crenças e motivação), Método (as quatro superpotências: foco, estudo, memória e velocidade) e Músculo (saúde do cérebro via sono, nutrição e exercício). Kwik desconstrói o mito da memória ruim como limitação biológica, mostrando que na maioria das vezes é falta de técnica. O livro entrega exercícios práticos — como associação, palácios da memória e leitura rápida — para ler mais, reter mais e aprender mais rápido. É um manual de "aprender a aprender": lembrar que o cérebro é um músculo que cresce com uso e que o maior limite costuma ser a história que contamos a nós mesmos sobre nossa capacidade.`,
    myths: [
      {type:'myth', title:'Inteligência é fixa', text:'Kwik mostra que é treinável.', reflection:'Você acha que não pode melhorar?'},
      {type:'truth', title:'Mentalidade importa', text:'Crença limitante trava o potencial.', reflection:'Que história você conta sobre si?'},
      {type:'myth', title:'Memória ruim é biológico', text:'Na maioria, é falta de técnica.', reflection:'Você culpa o cérebro?'},
      {type:'truth', title:'Método existe', text:'Foco, estudo, memória e velocidade.', reflection:'Você tem método de aprender?'},
      {type:'myth', title:'Ler rápido prejudica', text:'Técnica deixa leitura eficiente.', reflection:'Você acha que devagar retém?'},
      {type:'truth', title:'Cérebro é músculo', text:'Uso e saúde fazem crescer.', reflection:'Você exercita o cérebro?'},
      {type:'myth', title:'Multitarefa ajuda', text:'Foco único rende mais.', reflection:'Você fragmenta a atenção?'},
      {type:'truth', title:'Saúde cerebral', text:'Sono, comida e exercício importam.', reflection:'Você cuida da base?'},
      {type:'myth', title:'Idade limita', text:'Cérebro aprende em qualquer idade.', reflection:'Você se acha velho para aprender?'},
      {type:'truth', title:'Associação', text:'Ligar novidades a o que sabe fixa.', reflection:'Você relaciona o novo?'},
      {type:'myth', title:'Dicas rápidas bastam', text:'Sistema contínuo vence.', reflection:'Você busca atalho?'},
      {type:'truth', title:'Aprender a aprender', text:'Meta-habilidade de todas.', reflection:'Você treina o aprender?'},
      {type:'myth', title:'Limite externo', text:'O maior limite é interno.', reflection:'Você projeta limite fora?'},
      {type:'truth', title:'Motivação', text:'Propósito move o estudo.', reflection:'Você sabe por que aprende?'}
    ],
    ensinamentos: [
      {number:'1', title:'Mentalidade', text:'Crenças abrem ou fecham.'},
      {number:'2', title:'Foco', text:'Atenção única e plena.'},
      {number:'3', title:'Estudo', text:'Técnica de aprender.'},
      {number:'4', title:'Memória', text:'Associação e palácio.'},
      {number:'5', title:'Velocidade', text:'Leitura rápida eficiente.'},
      {number:'6', title:'Saúde', text:'Sono, nutrição, exercício.'},
      {number:'7', title:'Cérebro músculo', text:'Exercite para crescer.'},
      {number:'8', title:'Associar', text:'Ligar ao conhecido.'},
      {number:'9', title:'Propósito', text:'Motivação clara.'},
      {number:'10', title:'Prática', text:'Sistema contínuo.'},
      {number:'11', title:'Sem limite', text:'Limite é interno.'},
      {number:'12', title:'Aprender a aprender', text:'Meta-habilidade.'}
    ],
    citacoes: [
      {texto:'Você não tem memória ruim; tem estratégia de memória ruim.', autor:'Jim Kwik', obra:'Limitless'},
      {texto:'A inteligência não é fixa; ela é treinável.', autor:'Jim Kwik', obra:'Limitless'},
      {texto:'Seu cérebro é um músculo que cresce com o uso.', autor:'Jim Kwik', obra:'Limitless'},
      {texto:'O maior limite é a história que você conta sobre si.', autor:'Jim Kwik', obra:'Limitless'},
      {texto:'Aprender a aprender é a meta-habilidade de todas as habilidades.', autor:'Jim Kwik', obra:'Limitless'}
    ],
    citacoesTerceiros: [
      {texto:'O guia definitivo de aprendizagem acelerada da década.', autor:'Success Magazine', fonte:'Resenha'},
      {texto:'Mais de 1 milhão de exemplares; usado por atletas e CEOs.', autor:'Editora Hay House', fonte:'Dados'}
    ],
    chapters: [
      {title:'Capítulo 1 — Sem Limites', text:'Premissa de inteligência treinável.', points:['Crença','Potencial','Mudança']},
      {title:'Capítulo 2 — Mentalidade', text:'Vencer limitação interna.', points:['História','Motivo','Foco']},
      {title:'Capítulo 3 — Método', text:'Quatro superpotências.', points:['Foco','Estudo','Memória','Velocidade']},
      {title:'Capítulo 4 — Músculo', text:'Saúde do cérebro.', points:['Sono','Comida','Exercício']},
      {title:'Capítulo 5 — Memória', text:'Associação e palácio.', points:['Ligação','Lugar','Fixar']},
      {title:'Capítulo 6 — Leitura Rápida', text:'Velocidade com compreensão.', points:['Técnica','Prática','Ganho']},
      {title:'Capítulo 7 — Foco', text:'Atenção única.', points:['Sem ruído','Presente','Render']},
      {title:'Capítulo 8 — Aplicação', text:'Aprender a aprender.', points:['Sistema','Uso','Sem limite']}
    ]
  });
}

// Build array E in the given id order
const builders = { lynch, dalio, marks, ellis, hagstrom, greenblatt, schwager, richards, sethi, lowenstein, lencioni, voss, seneca, epiteto, aurelio, holiday, babauta, becker, millburn, kwik };
const E = ids.map(id => builders[id]());

// Validate required structure per book
E.forEach(b => {
  if(!b.id) throw new Error('id ausente');
  if(typeof b.summary !== 'string' || b.summary.split(/\s+/).length < 120) throw new Error('summary curto demais: '+b.id);
  if(b.myths.length < 12 || b.myths.length > 15) throw new Error('myths fora de faixa: '+b.id+' ('+b.myths.length+')');
  if(b.ensinamentos.length < 10 || b.ensinamentos.length > 12) throw new Error('ensinamentos fora de faixa: '+b.id);
  if(b.citacoes.length < 4 || b.citacoes.length > 5) throw new Error('citacoes fora de faixa: '+b.id);
  if(b.citacoesTerceiros.length < 2 || b.citacoesTerceiros.length > 3) throw new Error('citacoesTerceiros fora de faixa: '+b.id);
  if(b.chapters.length < 7 || b.chapters.length > 10) throw new Error('chapters fora de faixa: '+b.id);
  b.chapters.forEach((c,i) => { if(!c.title || !c.text || c.points.length < 2 || c.points.length > 5) throw new Error('chapter invalido: '+b.id+' #'+i); });
});

const out = JSON.stringify(E, null, 2);
fs.writeFileSync('C:/Users/Marcelo/Desktop/Livro/tmp/enriched-G5.json', out, 'utf8');
console.log('ESCRITO', E.length, 'livros em enriched-G5.json');
