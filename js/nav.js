/**
 * nav.js — Menu lateral master (Livros / Artigos Científicos).
 *
 * Popula submenus em cascata nos containers:
 *   #livrosMasterSubmenu  → todos os livros (livro.html#slug)
 *   #artigosMasterSubmenu → 4 temas de artigos (artigos.html#<tema>)
 * Funciona em index.html, livro.html e artigos.html. Botões toggle seguem
 * o padrão .sidebar-link.sidebar-toggle (igual ao das páginas de livro).
 */
(function () {
  'use strict';

  function escapeAttr(s) {
    return String(s == null ? '' : s)
      .replace(/&/g, '&amp;').replace(/"/g, '&quot;')
      .replace(/</g, '&lt;').replace(/>/g, '&gt;');
  }

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
      lh += '<li><a href="livro.html#' + escapeAttr(slug) + '" class="chapter-link">' +
        escapeAttr(title) + '</a></li>';
    });
    livrosSub.innerHTML = lh;
  }

  // ---- Submenu de ARTIGOS ----
  var artigosSub = document.getElementById('artigosMasterSubmenu');
  if (artigosSub) {
    var ah = '';
    TEMAS.forEach(function (t) {
      ah += '<li><a href="artigos.html#' + escapeAttr(t.key) + '" class="chapter-link">' +
        escapeAttr(t.label) + '</a></li>';
    });
    artigosSub.innerHTML = ah;
  }

  // ---- Toggle dos botões master ----
  function bindToggle(btnId, subId) {
    var btn = document.getElementById(btnId);
    var sub = document.getElementById(subId);
    if (!btn || !sub) return;
    btn.addEventListener('click', function () {
      var open = sub.classList.toggle('open');
      btn.setAttribute('aria-expanded', String(open));
      sub.style.maxHeight = open ? (sub.scrollHeight + 'px') : '0px';
      this.blur();
    });
  }
  bindToggle('livrosMasterToggle', 'livrosMasterSubmenu');
  bindToggle('artigosMasterToggle', 'artigosMasterSubmenu');
})();
