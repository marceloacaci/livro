/**
 * Biblioteca — cards e navegação por livro
 */
(function () {
  'use strict';

  var grid = document.getElementById('booksGrid');
  if (!grid || !window.MEU_BOLSO_BOOKS) return;

  var html = '';
  MEU_BOLSO_BOOKS.forEach(function (book) {
    html += '<a class="book-card" href="' + book.file + '" style="border-top-color:' + book.color + ';">';
    html += '  <div class="book-card-cover">';
    html += '    <img src="' + book.cover + '" alt="Capa ' + book.title + '" />';
    html += '  </div>';
    html += '  <div class="book-card-info">';
    html += '    <h3>' + book.titlePt + '</h3>';
    html += '    <p class="book-author">' + book.author + '</p>';
    html += '    <p class="book-meta">' + book.year + ' · ' + book.editionYear + ' · ' + book.pages + ' páginas · ' + book.language + '</p>';
    html += '    <p class="book-genre"><strong>Gênero:</strong> ' + book.genre + '</p>';
    html += '    <p class="book-sold"><strong>Vendas:</strong> ' + book.copiesSold + '</p>';
    html += '    <p class="book-summary">' + book.summary + '</p>';
    html += '  </div>';
    html += '</a>';
  });

  grid.innerHTML = html;
})();
