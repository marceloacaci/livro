/**
 * nav.js — Menu lateral master (Livros / Artigos Científicos).
 *
 * - #livrosMasterSubmenu  → todos os livros (livro.html#slug)
 * - #artigosMasterSubmenu → 4 temas; CADA tema é um BOTÃO COLLAPSÁVEL que
 *   revela os artigos daquela categoria (sub-submenu), cada um levando a
 *   artigos.html#<tema> (filtro pré-aplicado na página de artigos).
 *
 * Botões de tema usam a MESMA cor de referência dos cards (badges) exibidos
 * na página de artigos (TEMA_COLORS em articles.js), reforçando a associação
 * visual menu ↔ cards.
 */
(function () {
  'use strict';

  function escapeAttr(s) {
    return String(s == null ? '' : s)
      .replace(/&/g, '&amp;').replace(/"/g, '&quot;')
      .replace(/</g, '&lt;').replace(/>/g, '&gt;');
  }

  // Cores de referência iguais aos badges dos cards (articles.js).
  var TEMA_COLORS = {
    tecnologia: '#6c5ce7',
    ia: '#00c2ff',
    informatica: '#16a085',
    teses: '#d946ef'
  };
  var TEMAS = [
    { key: 'tecnologia', label: 'Tecnologia' },
    { key: 'ia', label: 'Inteligência Artificial' },
    { key: 'informatica', label: 'Informática' },
    { key: 'teses', label: 'Teses' }
  ];

  // ---- Submenu de LIVROS ----
  var livrosSub = document.getElementById('livrosMasterSubmenu');
  if (livrosSub) {
    var books = (window.LivroData && window.LivroData.getAllBooks()) ||
                (window.MEU_BOLSO_BOOKS) || [];
    var lh = '';
    books.forEach(function (b) {
      var slug = b.slug || b.id || '';
      var title = b.titlePt || b.title || 'Livro';
      var color = b.color || '#2980b9';
      lh += '<li><a href="livro.html#' + escapeAttr(slug) + '" class="chapter-link" ' +
        'style="border-left:3px solid ' + escapeAttr(color) + ';">' +
        escapeAttr(title) + '</a></li>';
    });
    livrosSub.innerHTML = lh;
  }

  // ---- Submenu de ARTIGOS (collapsável por categoria) ----
  var artigosSub = document.getElementById('artigosMasterSubmenu');
  if (artigosSub) {
    var ah = '';
    TEMAS.forEach(function (t) {
      var color = TEMA_COLORS[t.key] || '#6c5ce7';
      var list = window['MEU_BOLSO_ARTICLES_' + t.key.toUpperCase()] || [];
      var items = '';
      list.forEach(function (a) {
        var slug = a.id || a.filename || '';
        var title = a.title || 'Artigo';
        items += '<li><a href="artigos.html#' + escapeAttr(t.key) + '" class="chapter-link article-sublink" ' +
          'title="' + escapeAttr(title) + '">' + escapeAttr(title) + '</a></li>';
      });
      ah += '<li>';
      ah += '  <button class="sidebar-link sidebar-toggle article-theme-toggle" ' +
        'data-tema="' + escapeAttr(t.key) + '" ' +
        'style="border-left:3px solid ' + escapeAttr(color) + ';" ' +
        'aria-expanded="false">' + escapeAttr(t.label) + ' (' + list.length + ')</button>';
      ah += '  <ul class="chapter-submenu article-theme-submenu">' + items + '</ul>';
      ah += '</li>';
    });
    artigosSub.innerHTML = ah;
  }

  // ---- Toggle genérico (botões master + botões de tema de artigo) ----
  function bindToggle(btn, sub) {
    if (!btn || !sub) return;
    btn.addEventListener('click', function () {
      var open = sub.classList.toggle('open');
      btn.setAttribute('aria-expanded', String(open));
      sub.style.maxHeight = open ? (sub.scrollHeight + 'px') : '0px';
      this.blur();
    });
  }
  bindToggle(document.getElementById('livrosMasterToggle'), document.getElementById('livrosMasterSubmenu'));
  bindToggle(document.getElementById('artigosMasterToggle'), document.getElementById('artigosMasterSubmenu'));

  // Botões de tema de artigo (collapsáveis) — delegates após popular o submenu.
  var themeToggles = document.querySelectorAll('.article-theme-toggle');
  Array.prototype.forEach.call(themeToggles, function (btn) {
    var sub = btn.nextElementSibling;
    bindToggle(btn, sub);
  });
})();
