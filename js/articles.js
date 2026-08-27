/**
 * articles.js — Seção "Artigos Científicos / Teses" (camada canônica).
 *
 * Consome os catálogos gerados pelos workers (scripts clássicos, não-ESM):
 *   window.LIVRO_ARTICLES_TECNOLOGIA
 *   window.LIVRO_ARTICLES_IA
 *   window.LIVRO_ARTICLES_INFORMATICA
 *
 * Diferente dos livros, cada artigo expõe um LINK DIRETO para o PDF salvo
 * localmente na pasta `artigos/<tema>/<slug>.pdf`.
 *
 * Suporta MÚLTIPLOS grids na mesma página (ex.: artigos.html + Home index.html),
 * cada um com seu próprio filtro de tema e busca independentes.
 */
(function () {
  'use strict';

  // Catálogos por tema (classe CSS de cor + rótulo).
  // Cada tema consome a global principal + o lote extra (_B2) gerado pelos workers.
  var TEMAS = [
    {
      key: 'tecnologia',
      label: 'Tecnologia',
      color: '#6c5ce7',
      src: (window.LIVRO_ARTICLES_TECNOLOGIA || []).concat(window.LIVRO_ARTICLES_TECNOLOGIA_B2 || [])
    },
    {
      key: 'ia',
      label: 'Inteligência Artificial',
      color: '#00c2ff',
      src: (window.LIVRO_ARTICLES_IA || []).concat(window.LIVRO_ARTICLES_IA_B2 || [])
    },
    {
      key: 'informatica',
      label: 'Informática',
      color: '#16a085',
      src: (window.LIVRO_ARTICLES_INFORMATICA || []).concat(window.LIVRO_ARTICLES_INFORMATICA_B2 || [])
    },
    {
      key: 'teses',
      label: 'Teses',
      color: '#d946ef',
      src: (window.LIVRO_ARTICLES_TESES || []).concat(window.LIVRO_ARTICLES_TESES_B2 || [])
    }
  ];

  function escapeAttr(s) {
    return String(s == null ? '' : s)
      .replace(/&/g, '&amp;').replace(/"/g, '&quot;')
      .replace(/</g, '&lt;').replace(/>/g, '&gt;');
  }

  // ===== Classificação de Artigos Científicos / Teses =====
  // Vocabulário controlado (referência do usuário): Qualis CAPES A1/A2/A3/A4/B1-B4/C,
  // Quartis Scimago/Scopus Q1-Q4, Fator de Impacto JCR, e Teses por nível (Mestrado/Doutorado).
  // Regra de integridade: NÃO inventamos estrato/quartil para preprint do arXiv (ainda não
  // publicado em periódico). Se o artigo já tem `classificacao` explícito no catálogo, usamos;
  // caso contrário DERIVAMOS do `venue` já presente (honesto, sem fabricar dados).
  var ESTRATO_CORES = {
    'A1': '#f5b301', 'A2': '#f5b301',
    'A3': '#16a085', 'A4': '#16a085',
    'B1': '#2d8cf0', 'B2': '#2d8cf0', 'B3': '#2d8cf0', 'B4': '#2d8cf0',
    'C': '#9aa5b1'
  };
  var QUARTIL_CORES = { 'Q1': '#8e44ad', 'Q2': '#2980b9', 'Q3': '#16a085', 'Q4': '#7f8c8d' };

  // ===== Estimativa de classificação para preprints (não publicados) =====
  // Pressuposto do usuário: para artigos AINDA NÃO publicados em periódico, mostrar uma
  // badge SEPARADA que ESTIMA a classificação (nunca confundir estimativa com fato).
  // Três fontes (em ordem de prioridade):
  //  1) KNOWN_VENUES — papers clássicos publicados em venue top real → badge REAL.
  //  2) AREA_ESTIMATE — por categoria arXiv primária (cs.LG, cs.DC, cs.CR…) — usada por
  //     IA/Informática (que carregam essas categorias nos tags).
  //  3) KEYWORD_ESTIMATE — por PALAVRA-CHAVE legível em PT (rede/seguranca/iot…) — usada
  //     por Tecnologia (tags em português) e como fallback geral. Sempre estimado:true.
  // Mapa de venues reais (Qualis CAPES aproximado + Quartil Scimago). Top CS conferences
  // (NeurIPS/ICML/ICLR/CVPR/ICCV/SIGCOMM/OSDI/SOSP/S&P/USENIX/PPoPP/POPL/SIGMOD/VLDB) = A1/Q1.
  var KNOWN_VENUES = {
    '1706.03762': { estrato: 'A1', quartil: 'Q1', meio: 'NeurIPS 2017' },          // Attention Is All You Need
    '1810.04805': { estrato: 'A1', quartil: 'Q1', meio: 'NAACL 2019' },             // BERT
    '2005.14165': { estrato: 'A1', quartil: 'Q1', meio: 'NeurIPS 2020' },          // GPT-3
    '1512.03385': { estrato: 'A1', quartil: 'Q1', meio: 'CVPR 2016' },              // ResNet
    '1406.2661':  { estrato: 'A1', quartil: 'Q1', meio: 'NIPS 2014' },              // GAN
    '2010.11929': { estrato: 'A1', quartil: 'Q1', meio: 'ICLR 2021' },             // ViT
    '1712.01815': { estrato: 'A1', quartil: 'Q1', meio: 'Nature 2017' },           // AlphaGo Zero
    '1301.3781':  { estrato: 'A1', quartil: 'Q1', meio: 'NIPS 2013' },             // Word2Vec
    '1207.0580':  { estrato: 'A1', quartil: 'Q1', meio: 'JMLR 2014' },             // Dropout
    '1603.04467': { estrato: 'A1', quartil: 'Q1', meio: 'OSDI 2016' },             // TensorFlow
    '1505.06807': { estrato: 'A1', quartil: 'Q1', meio: 'JMLR 2016' },             // MLlib
    '2009.08366': { estrato: 'A1', quartil: 'Q1', meio: 'ICSE 2020' },             // GraphCodeBERT
    '1803.09473': { estrato: 'A1', quartil: 'Q1', meio: 'POPL 2019' },             // code2vec
    '1712.01208': { estrato: 'A1', quartil: 'Q1', meio: 'SIGMOD 2018' },           // Learned Index
    '1910.02054': { estrato: 'A1', quartil: 'Q1', meio: 'SC 2020' },               // ZeRO
    '1712.05889': { estrato: 'A1', quartil: 'Q1', meio: 'OSDI 2017' },             // Ray
    '1610.05820': { estrato: 'A1', quartil: 'Q1', meio: 'IEEE S&P 2017' }          // Membership Inference
  };

  var AREA_ESTIMATE = {
    'cs.lg':  { estrato: 'A1', quartil: 'Q1', nota: 'Aprendizado de Máquina (venues top: NeurIPS/ICML/ICLR)' },
    'cs.ai':  { estrato: 'A1', quartil: 'Q1', nota: 'Inteligência Artificial (venues top: AAAI/IJCAI/NeurIPS)' },
    'cs.cl':  { estrato: 'A1', quartil: 'Q1', nota: 'Processamento de Linguagem (venues top: ACL/NAACL/EMNLP)' },
    'cs.cv':  { estrato: 'A1', quartil: 'Q1', nota: 'Visão Computacional (venues top: CVPR/ICCV/ECCV)' },
    'cs.ne':  { estrato: 'A1', quartil: 'Q1', nota: 'Redes Neurais (venues top: NeurIPS/ICLR)' },
    'cs.dc':  { estrato: 'A1', quartil: 'Q1', nota: 'Sistemas Distribuídos (venues top: SIGCOMM/OSDI/SC)' },
    'cs.ds':  { estrato: 'A1', quartil: 'Q1', nota: 'Estruturas de Dados/Algoritmos (venues top: SODA/FOCS/STOC)' },
    'cs.cr':  { estrato: 'A1', quartil: 'Q1', nota: 'Segurança (venues top: IEEE S&P/USENIX/CCS)' },
    'cs.ni':  { estrato: 'A1', quartil: 'Q1', nota: 'Redes (venues top: SIGCOMM/INFOCOM)' },
    'cs.se':  { estrato: 'A1', quartil: 'Q1', nota: 'Engenharia de Software (venues top: ICSE/FSE)' },
    'cs.pl':  { estrato: 'A1', quartil: 'Q1', nota: 'Linguagens de Programação (venues top: POPL/PLDI)' },
    'cs.os':  { estrato: 'A1', quartil: 'Q1', nota: 'Sistemas Operacionais (venues top: OSDI/SOSP)' },
    'cs.ir':  { estrato: 'A2', quartil: 'Q1', nota: 'Recuperação de Informação (venues top: SIGIR)' },
    'cs.db':  { estrato: 'A2', quartil: 'Q1', nota: 'Banco de Dados (venues top: SIGMOD/VLDB)' },
    'cs.sy':  { estrato: 'A2', quartil: 'Q1', nota: 'Sistemas de Controle/OTIM' },
    'cs.ro':  { estrato: 'A2', quartil: 'Q1', nota: 'Robótica (venues top: ICRA/IROS)' },
    'cs.mm':  { estrato: 'A2', quartil: 'Q1', nota: 'Multimídia (venues top: ACM MM)' },
    'cs.hc':  { estrato: 'A2', quartil: 'Q2', nota: 'Interação Humano-Computador' },
    'cs.et':  { estrato: 'A2', quartil: 'Q2', nota: 'Tecnologia em Educação' },
    'eess.sp':{ estrato: 'A2', quartil: 'Q2', nota: 'Processamento de Sinais (venues top: ICASSP)' },
    'eess.sy':{ estrato: 'A2', quartil: 'Q2', nota: 'Sistemas de Controle (eletricidade)' },
    'stat.ml':{ estrato: 'A1', quartil: 'Q1', nota: 'Machine Learning (Estatística, venues top: JMLR/AISTATS)' },
    'astro-ph.he': { estrato: 'A2', quartil: 'Q2', nota: 'Astrofísica de Altas Energias' },
    'cond-mat.mtrl-sci': { estrato: 'A2', quartil: 'Q2', nota: 'Ciência de Materiais' }
  };

  // Palavras-chave legíveis (tags em PT-BR do tema Tecnologia e títulos) → estrato estimado.
  // Mapeia termos amplos de Computação para o mesmo padrão de áreas de top venue.
  var KEYWORD_ESTIMATE = [
    { re: /seguranca|criptografia|vulnerab|malware|attack|jailbreak|privac|hsm/i, est: { estrato: 'A1', quartil: 'Q1', nota: 'Segurança (venues top: IEEE S&P/USENIX/CCS)' } },
    { re: /rede|comunicac|telecom|5g|6g|wifi|satel|wireless|iot|protocolo|sd[no]|dns|tcp|routing|antena|canal|rf\b|sinal|semantic communication|mimo|beam|radar|transceiver|amplifier|freq|ondas|reconfigur|localiz/i, est: { estrato: 'A1', quartil: 'Q1', nota: 'Redes / Sinais (venues top: SIGCOMM/INFOCOM/ICASSP)' } },
    { re: /inteligencia|aprendiz|machine|ml\b|deep|neural|modelo|agente|llm|generativa|visao|linguagem|reforco|embedding|transformer|pruning|kalman|diffusion|gpt|bert|attention|redes neurais/i, est: { estrato: 'A1', quartil: 'Q1', nota: 'IA / Aprendizado (venues top: NeurIPS/ICML/ICLR)' } },
    { re: /software|codigo|programa|engenharia|debug|teste|docker|devops|refator|multi-agent|prompt|llm coding/i, est: { estrato: 'A1', quartil: 'Q1', nota: 'Engenharia de Software (venues top: ICSE/FSE)' } },
    { re: /banco de dados|database|sql|consulta|grafo|index|query|data mining|dados|recomend/i, est: { estrato: 'A2', quartil: 'Q1', nota: 'Banco de Dados / Dados (venues top: SIGMOD/VLDB)' } },
    { re: /algoritm|otimiz|complex|computac|sistema|distribu|paralel|arquitetura|hardware|processador|memoria|cloud|computa|firmware|dna storage|nanopore/i, est: { estrato: 'A1', quartil: 'Q1', nota: 'Sistemas/Algoritmos (venues top: OSDI/SOSP/SODA)' } },
    { re: /blockchain|quantum|quantic|robo|sensor|audio|imagem|medic|saude|energia|bateria|edge|reram|memrist|fisica/i, est: { estrato: 'A2', quartil: 'Q2', nota: 'Tecnologia emergente afim' } },
    { re: /educa|sociedade|impacto|govern|etica|sustent|financ|econom/i, est: { estrato: 'A3', quartil: 'Q2', nota: 'Ciências Sociais/Tecnologia' } }
  ];

  function primaryCat(a) {
    var tags = (a && a.tags) || [];
    for (var i = 0; i < tags.length; i++) {
      var t = String(tags[i]).toLowerCase();
      if (t.indexOf('cs.') === 0 || t.indexOf('eess.') === 0 || t.indexOf('stat.') === 0 ||
          t.indexOf('astro-ph') === 0 || t.indexOf('cond-mat') === 0) return t;
    }
    return null;
  }

  // Estima a classificação de um preprint sem venue conhecido (por área ou keyword).
  function estimateClass(a) {
    var cat = primaryCat(a);
    var est = (cat && AREA_ESTIMATE[cat]) || null;
    if (!est) {
      // Fallback: palavras-chave em PT-BR / título.
      var hay = ((a && (a.tags || []).join(' ') || '') + ' ' + ((a && a.title) || '') + ' ' + ((a && a.summary) || '')).toLowerCase();
      for (var i = 0; i < KEYWORD_ESTIMATE.length; i++) {
        if (KEYWORD_ESTIMATE[i].re.test(hay)) { est = KEYWORD_ESTIMATE[i].est; break; }
      }
    }
    if (!est) est = { estrato: 'A3', quartil: 'Q2', nota: 'Área afim de Computação' };
    // Último recurso: se o título/summary cita qualquer termo de Computação/Sistemas,
    // assume A1 (venues de topo de área); só cai em A3 "fora de CS" se nada bater.
    if (est.estrato === 'A3') {
      var csHay = (a.title + ' ' + a.summary).toLowerCase();
      if (/network|communication|signal|system|algorithm|learning|model|optim|comput|data|security|software|hardware|neural|channel|wave|estimation|inference|robot|sensor|cloud|graph|code|agent/.test(csHay)) {
        est = { estrato: 'A1', quartil: 'Q1', nota: 'Computação / Sistemas (venues top de área)' };
      }
    }
    return {
      tipo: 'estimado',
      label: 'Est. ' + est.estrato + ' · ' + est.quartil,
      sub: est.nota,
      cor: ESTRATO_CORES[est.estrato] || '#9aa5b1',
      estimado: true
    };
  }

  // Retorna { tipo, label, sub, cor, estimado? } para um artigo.
  function classify(a) {
    var c = a && a.classificacao;
    if (c && typeof c === 'object') {
      if (c.estrato) {
        var e = String(c.estrato).toUpperCase();
        return { tipo: 'qualis', label: 'Qualis ' + e, sub: c.meio || 'Periódico', cor: ESTRATO_CORES[e] || '#9aa5b1' };
      }
      if (c.quartil) {
        var q = String(c.quartil).toUpperCase();
        return { tipo: 'quartil', label: q, sub: 'Scimago/Scopus', cor: QUARTIL_CORES[q] || '#9aa5b1' };
      }
      if (c.impacto) {
        return { tipo: 'jcr', label: 'JCR ' + c.impacto, sub: 'Web of Science', cor: '#c0392b' };
      }
      if (c.nivel) {
        var n = String(c.nivel).toLowerCase();
        if (n.indexOf('doutor') !== -1) return { tipo: 'tese', label: 'Tese (Doutorado)', sub: c.instituicao || '', cor: '#6c5ce7' };
        if (n.indexOf('livre') !== -1) return { tipo: 'tese', label: 'Livre-Docência', sub: c.instituicao || '', cor: '#4a235a' };
        return { tipo: 'tese', label: 'Dissertação (Mestrado)', sub: c.instituicao || '', cor: '#00b894' };
      }
    }
    // Papers clássicos com venue real conhecido → badge REAL (sem "Est.").
    var aid = a && a.id;
    if (aid && KNOWN_VENUES[aid]) {
      var kv = KNOWN_VENUES[aid];
      var lbl = (kv.estrato ? 'Qualis ' + kv.estrato : '') + (kv.quartil ? ' · ' + kv.quartil : '');
      return { tipo: 'qualis', label: lbl, sub: kv.meio, cor: ESTRATO_CORES[kv.estrato] || '#f5b301', conhecido: true };
    }
    // Derivação honesta a partir do venue já cadastrado.
    var venue = (a && a.venue || '').toString();
    if (/tese/i.test(venue) && !/dissert/i.test(venue)) {
      return { tipo: 'tese', label: 'Tese (Doutorado)', sub: 'UFRGS/Lume', cor: '#6c5ce7' };
    }
    if (/dissert/i.test(venue)) {
      return { tipo: 'tese', label: 'Dissertação (Mestrado)', sub: 'UFRGS/Lume', cor: '#00b894' };
    }
    if (/arxiv/i.test(venue)) {
      return estimateClass(a); // badge ESTIMADA (preprint sem publicação conhecida)
    }
    return { tipo: 'indef', label: venue || '—', sub: '', cor: '#9aa5b1' };
  }

  // Monta a lista plana de artigos com o tema injetado.
  function buildAll() {
    var all = [];
    TEMAS.forEach(function (t) {
      var list = Array.isArray(t.src) ? t.src : [];
      list.forEach(function (a) {
        all.push(Object.assign({}, a, { temaKey: t.key, temaLabel: t.label, color: t.color }));
      });
    });
    return all;
  }

  var ALL = buildAll();

  /**
   * Inicializa um bloco de artigos dentro de um container.
   * @param {HTMLElement} root elemento que contém [data-articles-grid],
   *        [data-article-filters] e [data-article-search].
   */
  function mountBlock(root) {
    if (!root) return;
    var grid = root.querySelector('[data-articles-grid]');
    var filtersWrap = root.querySelector('[data-article-filters]');
    var searchInput = root.querySelector('[data-article-search]');
    if (!grid) return;

    var currentTema = 'todos';
    var _h = (window.location.hash || '').replace('#','');
    if (['tecnologia','ia','informatica','teses'].indexOf(_h) !== -1) currentTema = _h;

    // Limite opcional de exibição (Home mostra só alguns destaques).
    var limitAttr = root.getAttribute('data-articles-limit');
    var limit = parseInt(limitAttr, 10);
    if (isNaN(limit) || limit <= 0) limit = 0;

    function cardHtml(a) {
      var localPath = a.localPath || ('artigos/' + a.temaKey + '/' + (a.filename || ''));
      var sourceUrl = a.sourceUrl || '#';
      var authors = a.authors || '';
      if (authors.length > 90) authors = authors.slice(0, 87) + '…';
      var html = '<article class="book-card article-card" ' +
        'style="border-top-color:' + escapeAttr(a.color) + ';">';
      html += '  <div class="article-badge" style="background:' + escapeAttr(a.color) + ';">' +
        escapeAttr((a.temaLabel || a.tema || '').toUpperCase()) + '</div>';
      html += '  <div class="book-card-info">';
      html += '    <h3>' + escapeAttr(a.title) + '</h3>';
      html += '    <p class="book-author">' + escapeAttr(authors) + '</p>';
      html += '    <p class="book-meta">' + escapeAttr(a.year) + ' · ' + escapeAttr(a.venue || 'arXiv') + '</p>';
      var cl = classify(a);
      var estClass = cl.estimado ? ' est' : '';
      var titleAttr = cl.estimado ? ' title="Classificação estimada por área (preprint ainda não publicado em periódico)"' : '';
      html += '    <p class="article-class">' +
        '<span class="article-class-badge' + estClass + '"' + titleAttr + ' style="background:' + escapeAttr(cl.cor) + ';">' +
        escapeAttr(cl.label) + '</span>' +
        (cl.sub ? ' <span class="article-class-sub">' + escapeAttr(cl.sub) + '</span>' : '') +
        '</p>';
      html += '    <p class="book-summary">' + escapeAttr(a.summary) + '</p>';
      html += '  </div>';
      html += '  <div class="article-actions">';
      html += '    <a class="btn btn-primary" href="' + escapeAttr(localPath) +
        '" target="_blank" rel="noopener" download>📄 Abrir artigo (PDF local)</a>';
      html += '    <a class="btn btn-clear" href="' + escapeAttr(sourceUrl) +
        '" target="_blank" rel="noopener">🔗 Fonte original</a>';
      html += '  </div>';
      html += '</article>';
      return html;
    }

    var currentPage = 1;
    var pageSize = limit > 0 ? limit : 10;

    function renderGrid() {
      var list = ALL.slice();
      if (currentTema !== 'todos') {
        list = list.filter(function (a) { return a.temaKey === currentTema; });
      }
      if (list.length === 0) {
        grid.innerHTML = '<p class="empty-state">Nenhum artigo neste tema ainda.</p>';
        renderPagination(0);
        return;
      }
      var totalPages = Math.max(1, Math.ceil(list.length / pageSize));
      if (currentPage > totalPages) currentPage = totalPages;
      if (currentPage < 1) currentPage = 1;
      var start = (currentPage - 1) * pageSize;
      var shown = list.slice(start, start + pageSize);
      grid.innerHTML = shown.map(cardHtml).join('');
      renderPagination(totalPages);
    }

    function renderPagination(totalPages) {
      var wrap = root.querySelector('[data-articles-pagination]');
      if (!wrap) return;
      if (!totalPages || totalPages <= 1) { wrap.innerHTML = ''; return; }
      var html = '<div class="pagination-inner">';
      html += '<button class="page-btn" data-page="prev" ' + (currentPage === 1 ? 'disabled' : '') + '>‹ Anterior</button>';
      var windowSize = 7;
      var startPage = Math.max(1, currentPage - Math.floor(windowSize / 2));
      var endPage = Math.min(totalPages, startPage + windowSize - 1);
      startPage = Math.max(1, endPage - windowSize + 1);
      if (startPage > 1) {
        html += '<button class="page-btn" data-page="1">1</button>';
        if (startPage > 2) html += '<span class="page-ellipsis">…</span>';
      }
      for (var p = startPage; p <= endPage; p++) {
        html += '<button class="page-btn' + (p === currentPage ? ' active' : '') + '" data-page="' + p + '">' + p + '</button>';
      }
      if (endPage < totalPages) {
        if (endPage < totalPages - 1) html += '<span class="page-ellipsis">…</span>';
        html += '<button class="page-btn" data-page="' + totalPages + '">' + totalPages + '</button>';
      }
      html += '<button class="page-btn" data-page="next" ' + (currentPage === totalPages ? 'disabled' : '') + '>Próximo ›</button>';
      html += '</div>';
      wrap.innerHTML = html;
      wrap.querySelectorAll('.page-btn').forEach(function (btn) {
        btn.addEventListener('click', function () {
          var v = btn.getAttribute('data-page');
          if (v === 'prev') currentPage = Math.max(1, currentPage - 1);
          else if (v === 'next') currentPage = Math.min(totalPages, currentPage + 1);
          else currentPage = parseInt(v, 10);
          renderGrid();
          var sec = root.closest('.section');
          if (sec) sec.scrollIntoView({ behavior: 'smooth', block: 'start' });
        });
      });
    }

    function renderFilters() {
      if (!filtersWrap) return;
      var html = '<button class="book-tab' + (currentTema === 'todos' ? ' active' : '') +
        '" data-tema="todos">📚 Todos</button>';
      TEMAS.forEach(function (t) {
        var n = Array.isArray(t.src) ? t.src.length : 0;
        html += '<button class="book-tab' + (currentTema === t.key ? ' active' : '') +
          '" data-tema="' + t.key + '">' + escapeAttr(t.label) + ' <span class="tab-count">(' + n + ')</span></button>';
      });
      filtersWrap.innerHTML = html;
      filtersWrap.querySelectorAll('.book-tab').forEach(function (btn) {
        btn.addEventListener('click', function () {
          currentTema = btn.getAttribute('data-tema') || 'todos';
          currentPage = 1;
          renderFilters();
          renderGrid();
        });
      });
    }

    function filterByText(query) {
      var q = (query || '').trim().toLowerCase();
      var cards = grid.querySelectorAll('.article-card');
      Array.prototype.forEach.call(cards, function (card) {
        var hay = (card.textContent || '').toLowerCase();
        card.classList.toggle('book-hidden', q !== '' && hay.indexOf(q) === -1);
      });
    }

    if (searchInput) {
      searchInput.addEventListener('input', function () {
        filterByText(searchInput.value);
      });
    }

    renderFilters();
    renderGrid();
  }

  // Monta todos os blocos de artigos presentes na página.
  var blocks = document.querySelectorAll('[data-articles-block]');
  Array.prototype.forEach.call(blocks, mountBlock);

  // Pré-seleciona tema a partir da hash (ex.: artigos.html#ia).
  function applyHashTema() {
    var h = (window.location.hash || '').replace(/^#/, '').trim().toLowerCase();
    if (!h) return;
    var valid = TEMAS.some(function (t) { return t.key === h; });
    if (!valid) return;
    Array.prototype.forEach.call(blocks, function (block) {
      var root = block;
      var grid = root.querySelector('[data-articles-grid]');
      var filtersWrap = root.querySelector('[data-article-filters]');
      if (!grid || !filtersWrap) return;
      // dispara o clique no botão do tema correspondente
      var btn = filtersWrap.querySelector('.book-tab[data-tema="' + h + '"]');
      if (btn) btn.click();
    });
  }
  applyHashTema();
  window.addEventListener('hashchange', applyHashTema);

  // API pública
  window.LivroArticles = {
    mountBlock: mountBlock,
    count: ALL.length
  };
})();
