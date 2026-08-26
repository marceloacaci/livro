/**
 * articles.js — Seção "Artigos Científicos / Teses" (camada canônica).
 *
 * Consome os catálogos gerados pelos workers (scripts clássicos, não-ESM):
 *   window.MEU_BOLSO_ARTICLES_TECNOLOGIA
 *   window.MEU_BOLSO_ARTICLES_IA
 *   window.MEU_BOLSO_ARTICLES_INFORMATICA
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
  var TEMAS = [
    {
      key: 'tecnologia',
      label: 'Tecnologia',
      color: '#6c5ce7',
      src: window.MEU_BOLSO_ARTICLES_TECNOLOGIA
    },
    {
      key: 'ia',
      label: 'Inteligência Artificial',
      color: '#00c2ff',
      src: window.MEU_BOLSO_ARTICLES_IA
    },
    {
      key: 'informatica',
      label: 'Informática',
      color: '#16a085',
      src: window.MEU_BOLSO_ARTICLES_INFORMATICA
    },
    {
      key: 'teses',
      label: 'Teses',
      color: '#d946ef',
      src: window.MEU_BOLSO_ARTICLES_TESES
    }
  ];

  function escapeAttr(s) {
    return String(s == null ? '' : s)
      .replace(/&/g, '&amp;').replace(/"/g, '&quot;')
      .replace(/</g, '&lt;').replace(/>/g, '&gt;');
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

    function renderGrid() {
      var list = ALL.slice();
      if (currentTema !== 'todos') {
        list = list.filter(function (a) { return a.temaKey === currentTema; });
      }
      if (list.length === 0) {
        grid.innerHTML = '<p class="empty-state">Nenhum artigo neste tema ainda.</p>';
        return;
      }
      var shown = list;
      var truncated = false;
      if (limit > 0 && list.length > limit) {
        shown = list.slice(0, limit);
        truncated = true;
      }
      var html = shown.map(cardHtml).join('');
      if (truncated) {
        html += '<div class="article-see-all">' +
          '<a class="btn btn-clear" href="artigos.html">Ver todos os ' + list.length +
          ' artigos científicos →</a></div>';
      }
      grid.innerHTML = html;
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
