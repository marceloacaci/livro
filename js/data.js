/**
 * data.js — Camada canônica de ingestão de dados (alvo da arquitetura v1.0).
 *
 * Normaliza o array de livros (hoje em window.MEU_BOLSO_BOOKS) para uma API
 * estável, preparando a migração futura para data/books.json via fetch.
 * É SEGURO incluir mesmo que MEU_BOLSO_BOOKS ainda não esteja definido:
 * as funções simplesmente retornam vazio até os dados carregarem.
 */
(function (global) {
  'use strict';

  var SOURCE = global.MEU_BOLSO_BOOKS || [];
  var DATA = Array.isArray(SOURCE) ? SOURCE.slice() : [];

  function getBookById(id) {
    if (!id) return null;
    return DATA.find(function (b) {
      return b && (b.id === id || b.slug === id);
    }) || null;
  }

  function getAllBooks() {
    return DATA.slice();
  }

  function getBooksByGenre(genre) {
    if (!genre) return getAllBooks();
    var g = String(genre).toLowerCase();
    return DATA.filter(function (b) {
      return (b && b.genre || '').toLowerCase().indexOf(g) !== -1;
    });
  }

  // Pontos de integração explícitos (documentados em docs/architecture.md)
  global.LIVRO_DATA = DATA;
  global.LivroData = {
    getBookById: getBookById,
    getAllBooks: getAllBooks,
    getBooksByGenre: getBooksByGenre
  };
})(window);
