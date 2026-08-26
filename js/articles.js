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
 */
(function () {
  'use strict';

  var grid = document.getElementById('articlesGrid');
  if (!grid) return; // não estamos na página de artigos

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

  // ---- Filtro por tema (botões) ----
  var currentTema = 'todos';

  function renderFilters() {
    var wrap = document.getElementById('articleFilters');
    if (!wrap) return;
    var html = '<button class="book-tab' + (currentTema === 'todos' ? ' active' : '') +
      '" data-tema="todos">📚 Todos</button>';
    TEMAS.forEach(function (t) {
      var n = Array.isArray(t.src) ? t.src.length : 0;
      html += '<button class="book-tab' + (currentTema === t.key ? ' active' : '') +
        '" data-tema="' + t.key + '">' + escapeAttr(t.label) + ' <span class="tab-count">(' + n + ')</span></button>';
    });
    wrap.innerHTML = html;
    wrap.querySelectorAll('.book-tab').forEach(function (btn) {
      btn.addEventListener('click', function () {
        currentTema = btn.getAttribute('data-tema') || 'todos';
        renderFilters();
        renderGrid();
      });
    });
  }

  function renderGrid() {
    var list = ALL.slice();
    if (currentTema !== 'todos') {
      list = list.filter(function (a) { return a.temaKey === currentTema; });
    }
    var html = '';
    if (list.length === 0) {
      grid.innerHTML = '<p class="empty-state">Nenhum artigo neste tema ainda.</p>';
      return;
    }
    list.forEach(function (a) {
      var localPath = a.localPath || ('artigos/' + a.temaKey + '/' + (a.filename || ''));
      var sourceUrl = a.sourceUrl || '#';
      var authors = a.authors || '';
      if (authors.length > 90) authors = authors.slice(0, 87) + '…';
      html += '<article class="book-card article-card" ' +
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
    });
    grid.innerHTML = html;
  }

  // ---- Busca client-side em tempo real ----
  function filterByText(query) {
    var q = (query || '').trim().toLowerCase();
    var cards = grid.querySelectorAll('.article-card');
    Array.prototype.forEach.call(cards, function (card) {
      var hay = (card.textContent || '').toLowerCase();
      card.classList.toggle('book-hidden', q !== '' && hay.indexOf(q) === -1);
    });
  }

  var searchInput = document.querySelector('[data-article-search]');
  if (searchInput) {
    searchInput.addEventListener('input', function () {
      filterByText(searchInput.value);
    });
  }

  // ---- Init ----
  renderFilters();
  renderGrid();

  // API pública
  window.LivroArticles = {
    renderGrid: renderGrid,
    renderFilters: renderFilters,
    filterByText: filterByText,
    count: ALL.length
  };
})();
