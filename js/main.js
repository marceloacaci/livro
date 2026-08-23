/**
 * main.js — Controlador da Home (camada canônica, P2).
 *
 * Monta o grid de cards em #booksGrid consumindo LivroData (data.js),
 * gera links com Query Param (?id=<id>), aplica lazy loading nativo e
 * expõe a busca client-side em tempo real (B2). Substitui biblioteca.js.
 */
(function () {
  'use strict';

  var grid = document.getElementById('booksGrid');
  if (!grid) return; // não estamos na Home

  var books = (window.LivroData && window.LivroData.getAllBooks()) ||
              (window.MEU_BOLSO_BOOKS) || [];

  function escapeAttr(s) {
    return String(s == null ? '' : s)
      .replace(/&/g, '&amp;').replace(/"/g, '&quot;')
      .replace(/</g, '&lt;').replace(/>/g, '&gt;');
  }

  function renderGrid(list) {
    var html = '';
    list.forEach(function (book) {
      var id = book.id || book.slug || '';
      var color = book.color || 'var(--color-primary)';
      html += '<a class="book-card" href="livro.html?id=' + escapeAttr(id) + '" ' +
              'style="border-top-color:' + escapeAttr(color) + ';">';
      html += '  <div class="book-card-cover">';
      html += '    <img src="' + escapeAttr(book.cover) + '" alt="Capa ' + escapeAttr(book.titlePt || book.title) + '" ' +
              'loading="lazy" decoding="async" />';
      html += '  </div>';
      html += '  <div class="book-card-info">';
      html += '    <h3>' + escapeAttr(book.titlePt || book.title) + '</h3>';
      html += '    <p class="book-author">' + escapeAttr(book.author) + '</p>';
      html += '    <p class="book-meta">' + escapeAttr(book.year) + ' · ' + escapeAttr(book.editionYear) +
              ' · ' + escapeAttr(book.pages) + ' páginas · ' + escapeAttr(book.language) + '</p>';
      html += '    <p class="book-genre"><strong>Gênero:</strong> ' + escapeAttr(book.genre) + '</p>';
      html += '    <p class="book-sold"><strong>Vendas:</strong> ' + escapeAttr(book.copiesSold) + '</p>';
      html += '    <p class="book-summary">' + escapeAttr(book.summary) + '</p>';
      html += '  </div>';
      html += '</a>';
    });
    grid.innerHTML = html;
  }

  renderGrid(books);

  // ---- Busca client-side em tempo real (B2) ----
  function filterByText(query) {
    var q = (query || '').trim().toLowerCase();
    var cards = grid.querySelectorAll('.book-card');
    Array.prototype.forEach.call(cards, function (card) {
      var hay = (card.textContent || '').toLowerCase();
      card.classList.toggle('book-hidden', q !== '' && hay.indexOf(q) === -1);
    });
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
    filterByText: filterByText
  };
})();
