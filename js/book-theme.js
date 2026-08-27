/**
 * book-theme.js — Template base para livros da biblioteca.
 *
 * Uso:
 *   window.LIVRO_BOOK_THEME = { ...configuração... };
 *   books.js consome essas configurações para aplicar
 *   visual, seções e cores de forma padronizada.
 */
(function () {
  'use strict';

  window.LIVRO_BOOK_THEME = {
    // --- Identidade do livro ---
    id: '', // 'ramsey', 'fogg', etc.
    title: '',
    titlePt: '',
    author: '',
    year: '',
    editionYear: '',
    publisher: '',
    pages: '',
    genre: '',
    language: '',
    copiesSold: '',
    cover: '',
    summary: '',

    // --- Cores do tema (aplicadas em sections, steps, ensinamentos) ---
    color: '#7b2dff', // cor principal do livro
    colorLight: 'rgba(123, 45, 255, 0.15)',
    colorGlow: 'rgba(123, 45, 255, 0.45)',

    // --- Seções padrão do livro (ordem de navegação/scroll) ---
    sections: [
      'sobre', // Sobre o Livro
      // seções específicas do livro vêm aqui (baby1..baby7, micro1..micro8, etc.)
      'ensinamentos', // Ensinamentos (resumidos + expandidos)
      'ideias', // Ideias Centrais / Conteúdo
      'verdadesmitos', // Verdades e Mitos
      'reflexoes' // Minhas Reflexões Salvas
    ],

    // --- Ensinamentos (itens resumidos que viram cards) ---
    ensinamentos: [],

    // --- Capítulos / conteúdo principal ---
    chapters: [],

    // --- Verdades e Mitos ---
    myths: [],

    // --- Labels localizados ---
    labels: {
      sectionTitle: 'Ensinamentos',
      expandBtn: 'Expandir e refletir',
      reflectionLabel: '📝 Reflexão',
      reflectionPlaceholder: 'Escreva aqui sua reflexão...',
      saveBtn: '💾 Salvar Reflexão',
      clearBtn: '🗑️ Limpar'
    }
  };
})();