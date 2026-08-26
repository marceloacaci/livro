/**
 * main.js — Controlador da Home (camada canônica, P2).
 *
 * Monta o grid de cards em #booksGrid consumindo LivroData (data.js),
 * gera links com Query Param (?id=<id>), aplica lazy loading nativo e
 * expõe a busca client-side em tempo real (B2). Substitui biblioteca.js.
 *
 * Melhorias (P4):
 *  - Paginação de 10 em 10 nos cards de livros.
 *  - Resumo curto no card (textos longos truncados ~180 chars, iguais aos
 *    15 primeiros livros); o texto completo continua na página do livro.
 */
(function () {
  'use strict';

  var grid = document.getElementById('booksGrid');
  if (!grid) return; // não estamos na Home

  var PAGE_SIZE = 10;
  var books = (window.LivroData && window.LivroData.getAllBooks()) ||
              (window.MEU_BOLSO_BOOKS) || [];

  var currentList = books.slice();
  var currentPage = 1;

  function escapeAttr(s) {
    return String(s == null ? '' : s)
      .replace(/&/g, '&amp;').replace(/"/g, '&quot;')
      .replace(/</g, '&lt;').replace(/>/g, '&gt;');
  }

  // Resumo curto para o card (textos longos viram ~180 chars + "…").
  function shortSummary(s) {
    s = String(s == null ? '' : s);
    if (s.length <= 180) return s;
    return s.slice(0, 177).replace(/\s+\S*$/, '') + '…';
  }

  // Gera uma capa SVG inline (data-URI) caso o arquivo de imagem nao exista.
  window.bookCoverFallback = function (imgEl) {
    try {
      var card = imgEl.closest ? imgEl.closest('.book-card') : null;
      var color = (card && card.getAttribute('data-color')) || '#2980b9';
      var title = imgEl.getAttribute('data-title') || 'Livro';
      var author = imgEl.getAttribute('data-author') || '';
      var svg = '<svg xmlns="http://www.w3.org/2000/svg" width="300" height="420" viewBox="0 0 300 420">' +
        '<rect width="300" height="420" fill="' + color + '"/>' +
        '<rect x="0" y="0" width="300" height="10" fill="rgba(255,255,255,0.35)"/>' +
        '<rect x="16" y="16" width="268" height="388" fill="rgba(255,255,255,0.08)" rx="6"/>' +
        '<text x="150" y="190" fill="#ffffff" font-family="Georgia, serif" font-size="20" font-weight="bold" text-anchor="middle">' +
        escapeSvg(title) + '</text>' +
        '<text x="150" y="230" fill="rgba(255,255,255,0.85)" font-family="Arial, sans-serif" font-size="14" text-anchor="middle">' +
        escapeSvg(author) + '</text></svg>';
      imgEl.onerror = null;
      imgEl.src = 'data:image/svg+xml;utf8,' + encodeURIComponent(svg);
    } catch (e) { /* noop */ }
  };
  function escapeSvg(s) {
    return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  }

  function cardHtml(book) {
    var id = book.id || book.slug || '';
    var color = book.color || 'var(--color-primary)';
    var html = '<a class="book-card" href="livro.html?id=' + escapeAttr(id) + '" ' +
               'style="border-top-color:' + escapeAttr(color) + ';">';
    html += '  <div class="book-card-cover">';
    html += '    <img src="' + escapeAttr(book.cover) + '" alt="Capa ' + escapeAttr(book.titlePt || book.title) + '" ' +
            'loading="lazy" decoding="async" ' +
            'data-color="' + escapeAttr(color) + '" ' +
            'data-title="' + escapeAttr((book.titlePt || book.title).toUpperCase().slice(0, 28)) + '" ' +
            'data-author="' + escapeAttr(book.author) + '" ' +
            'onerror="window.bookCoverFallback(this)" />';
    html += '  </div>';
    html += '  <div class="book-card-info">';
    html += '    <h3>' + escapeAttr(book.titlePt || book.title) + '</h3>';
    html += '    <p class="book-author">' + escapeAttr(book.author) + '</p>';
    html += '    <p class="book-meta">' + escapeAttr(book.year) + ' · ' + escapeAttr(book.editionYear) +
            ' · ' + escapeAttr(book.pages) + ' páginas · ' + escapeAttr(book.language) + '</p>';
    html += '    <p class="book-genre"><strong>Gênero:</strong> ' + escapeAttr(book.genre) + '</p>';
    html += '    <p class="book-sold"><strong>Vendas:</strong> ' + escapeAttr(book.copiesSold) + '</p>';
    html += '    <p class="book-summary">' + escapeAttr(shortSummary(book.summary)) + '</p>';
    html += '  </div>';
    html += '</a>';
    return html;
  }

  function totalPages() {
    return Math.max(1, Math.ceil(currentList.length / PAGE_SIZE));
  }

  function renderGrid() {
    var tp = totalPages();
    if (currentPage > tp) currentPage = tp;
    if (currentPage < 1) currentPage = 1;
    var start = (currentPage - 1) * PAGE_SIZE;
    var pageItems = currentList.slice(start, start + PAGE_SIZE);
    grid.innerHTML = pageItems.map(cardHtml).join('');
    renderPagination();
  }

  function renderPagination() {
    var wrap = document.getElementById('booksPagination');
    if (!wrap) return;
    var tp = totalPages();
    if (tp <= 1) { wrap.innerHTML = ''; return; }
    var html = '<div class="pagination-inner">';
    html += '<button class="page-btn" data-page="prev" ' + (currentPage === 1 ? 'disabled' : '') + '>‹ Anterior</button>';
    // Janela de até 7 botões numéricos
    var windowSize = 7;
    var startPage = Math.max(1, currentPage - Math.floor(windowSize / 2));
    var endPage = Math.min(tp, startPage + windowSize - 1);
    startPage = Math.max(1, endPage - windowSize + 1);
    if (startPage > 1) {
      html += '<button class="page-btn" data-page="1">1</button>';
      if (startPage > 2) html += '<span class="page-ellipsis">…</span>';
    }
    for (var p = startPage; p <= endPage; p++) {
      html += '<button class="page-btn' + (p === currentPage ? ' active' : '') + '" data-page="' + p + '">' + p + '</button>';
    }
    if (endPage < tp) {
      if (endPage < tp - 1) html += '<span class="page-ellipsis">…</span>';
      html += '<button class="page-btn" data-page="' + tp + '">' + tp + '</button>';
    }
    html += '<button class="page-btn" data-page="next" ' + (currentPage === tp ? 'disabled' : '') + '>Próximo ›</button>';
    html += '</div>';
    wrap.innerHTML = html;
    wrap.querySelectorAll('.page-btn').forEach(function (btn) {
      btn.addEventListener('click', function () {
        var v = btn.getAttribute('data-page');
        if (v === 'prev') currentPage = Math.max(1, currentPage - 1);
        else if (v === 'next') currentPage = Math.min(tp, currentPage + 1);
        else currentPage = parseInt(v, 10);
        renderGrid();
        var sec = document.getElementById('biblioteca');
        if (sec) sec.scrollIntoView({ behavior: 'smooth', block: 'start' });
      });
    });
  }

  // ---- Busca client-side em tempo real (B2) ----
  function filterByText(query) {
    var q = (query || '').trim().toLowerCase();
    if (q === '') {
      currentList = books.slice();
    } else {
      currentList = books.filter(function (b) {
        var hay = (JSON.stringify(b) || '').toLowerCase();
        return hay.indexOf(q) !== -1;
      });
    }
    currentPage = 1;
    renderGrid();
  }

  var searchInput = document.querySelector('[data-search]');
  if (searchInput) {
    searchInput.addEventListener('input', function () {
      filterByText(searchInput.value);
    });
  }

  // API pública
  window.LivroHome = {
    renderGrid: renderGrid,
    filterByText: filterByText,
    setPage: function (p) { currentPage = p; renderGrid(); }
  };

  renderGrid();
})();
