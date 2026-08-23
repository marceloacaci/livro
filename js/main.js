/**
 * main.js — Controlador da Home (alvo da arquitetura v1.0).
 *
 * Fundação aditiva: NÃO re-renderiza o grid (isso continua em biblioteca.js
 * durante a transição) e NÃO quebra o app atual. Apenas:
 *   1) expõe LivroHome.filterByText() para a busca client-side (B2);
 *   2) auto-conecta um input [data-search] se ele existir no HTML.
 * O grid em si será migrado para consumir LivroData.getAllBooks() no Sprint 2.
 */
(function () {
  'use strict';

  function filterByText(query) {
    var q = (query || '').trim().toLowerCase();
    var cards = document.querySelectorAll('#booksGrid .book-card');
    Array.prototype.forEach.call(cards, function (card) {
      var hay = (card.textContent || '').toLowerCase();
      var match = q === '' || hay.indexOf(q) !== -1;
      card.classList.toggle('book-hidden', !match);
    });
  }

  var searchInput = document.querySelector('[data-search]');
  if (searchInput) {
    searchInput.addEventListener('input', function () {
      filterByText(searchInput.value);
    });
  }

  // API pública (usada por app.js / testes)
  window.LivroHome = { filterByText: filterByText };
})();
