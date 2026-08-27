/**
 * reader-ux.js — Camada aditiva de UX do leitor (Sprint 2).
 *
 * Recursos (NÃO conflitam com livro.js/app.js/theme.js):
 *   1. Controle de tamanho de fonte persistente (A− / A+) aplicado via
 *      variável CSS --reader-font-scale no :root (livro.html e index.html).
 *   2. Modal de reflexões com MÚLTIPLAS notas por capítulo/seção.
 *      - Chave: `${bookId}::${sectionKey}` (ex.: "ramsey::idea-3").
 *      - Armazenamento isolado em localStorage('biblioteca_reflexoes_multi'),
 *        SEPARADO do storage legado de texto único (biblioteca_reflexoes),
 *        para não quebrar nem sobrescrever reflexões já salvas.
 *      - Sanitização XSS via textContent ao renderizar.
 *
 * Este script é 100% vanilla e autocontido; roda só onde for incluído.
 */
(function () {
  'use strict';

  // ---------- 1. Tamanho de fonte persistente ----------
  var FONT_KEY = 'livro-fontsize';
  var MIN = 0.8, MAX = 1.6, STEP = 0.1;
  var root = document.documentElement;

  function readFontScale() {
    try {
      var v = parseFloat(localStorage.getItem(FONT_KEY));
      if (!isNaN(v)) return Math.min(MAX, Math.max(MIN, v));
    } catch (e) {}
    return 1;
  }
  function applyFontScale(scale) {
    root.style.setProperty('--reader-font-scale', String(scale));
    var label = document.getElementById('fontSizeLabel');
    if (label) label.textContent = Math.round(scale * 100) + '%';
  }
  function saveFontScale(scale) {
    try { localStorage.setItem(FONT_KEY, String(scale)); } catch (e) {}
  }

  var currentScale = readFontScale();
  applyFontScale(currentScale);

  var dec = document.getElementById('fontDecrease');
  var inc = document.getElementById('fontIncrease');
  if (dec) {
    dec.addEventListener('click', function () {
      currentScale = Math.max(MIN, +(currentScale - STEP).toFixed(2));
      applyFontScale(currentScale);
      saveFontScale(currentScale);
    });
  }
  if (inc) {
    inc.addEventListener('click', function () {
      currentScale = Math.min(MAX, +(currentScale + STEP).toFixed(2));
      applyFontScale(currentScale);
      saveFontScale(currentScale);
    });
  }

  // ---------- 2. Modal de reflexões (múltiplas notas) ----------
  var STORE_KEY = 'biblioteca_reflexoes_multi';

  function genId() {
    if (window.crypto && typeof window.crypto.randomUUID === 'function') {
      return window.crypto.randomUUID();
    }
    return 'note-' + Date.now().toString(36) + '-' + Math.random().toString(36).slice(2, 8);
  }
  function sanitize(text) {
    var div = document.createElement('div');
    div.textContent = text == null ? '' : String(text);
    return div.innerHTML;
  }
  function loadAll() {
    try { return JSON.parse(localStorage.getItem(STORE_KEY)) || {}; }
    catch (e) { return {}; }
  }
  function saveAll(data) {
    try { localStorage.setItem(STORE_KEY, JSON.stringify(data)); }
    catch (e) { alert('Não foi possível salvar. O armazenamento local pode estar cheio.'); }
  }

  // Resolve o id do livro ativo (reutiliza a convenção do livro.js).
  function getBookId() {
    var books = window.MEU_BOLSO_BOOKS || [];
    var params = new URLSearchParams(window.location.search);
    var id = params.get('id') || (window.location.hash ? window.location.hash.replace('#', '') : '');
    var found = books.find(function (b) { return b && (b.id === id || b.slug === id); });
    return found ? (found.id || found.slug) : (books[0] ? (books[0].id || books[0].slug) : 'livro');
  }

  var modalRoot = document.getElementById('reflectionModalRoot');
  var activeSectionKey = null;

  function openModal(sectionKey, sectionLabel) {
    activeSectionKey = sectionKey;
    var bookId = getBookId();
    var all = loadAll();
    var key = bookId + '::' + sectionKey;
    var notes = Array.isArray(all[key]) ? all[key] : [];

    modalRoot.innerHTML =
      '<div class="reflection-modal-overlay" role="dialog" aria-modal="true" aria-labelledby="reflModalTitle">' +
        '<div class="reflection-modal">' +
          '<h3 id="reflModalTitle">📝 Reflexões — ' + sanitize(sectionLabel) + '</h3>' +
          '<p class="modal-subtitle">Adicione quantas notas quiser para este capítulo.</p>' +
          '<textarea id="reflModalInput" placeholder="Escreva uma reflexão..."></textarea>' +
          '<div class="reflection-modal-actions">' +
            '<button class="btn btn-save" id="reflModalAdd">💾 Adicionar nota</button>' +
            '<button class="btn btn-clear" id="reflModalClose">Fechar</button>' +
          '</div>' +
          '<ul class="reflection-modal-notes" id="reflModalNotes"></ul>' +
          '<div class="reflection-modal-empty" id="reflModalEmpty"' + (notes.length ? ' style="display:none"' : '') + '>Nenhuma nota ainda.</div>' +
        '</div>' +
      '</div>';

    renderNotes();

    var overlay = modalRoot.querySelector('.reflection-modal-overlay');
    var input = modalRoot.querySelector('#reflModalInput');
    var addBtn = modalRoot.querySelector('#reflModalAdd');
    var closeBtn = modalRoot.querySelector('#reflModalClose');

    function addNote() {
      var text = input.value.trim();
      if (!text) return;
      var data = loadAll();
      var k = bookId + '::' + sectionKey;
      var list = Array.isArray(data[k]) ? data[k] : [];
      list.push({ id: genId(), text: text, createdAt: Date.now() });
      data[k] = list;
      saveAll(data);
      input.value = '';
      renderNotes();
      updateButtonCount(sectionKey);
    }
    function close() {
      modalRoot.innerHTML = '';
      activeSectionKey = null;
    }

    addBtn.addEventListener('click', addNote);
    input.addEventListener('keydown', function (e) { if (e.key === 'Enter' && (e.ctrlKey || e.metaKey)) addNote(); });
    closeBtn.addEventListener('click', close);
    overlay.addEventListener('click', function (e) { if (e.target === overlay) close(); });
    document.addEventListener('keydown', function escClose(e) {
      if (e.key === 'Escape') { close(); document.removeEventListener('keydown', escClose); }
    });
  }

  function renderNotes() {
    if (!activeSectionKey) return;
    var bookId = getBookId();
    var all = loadAll();
    var notes = Array.isArray(all[bookId + '::' + activeSectionKey]) ? all[bookId + '::' + activeSectionKey] : [];
    var ul = modalRoot.querySelector('#reflModalNotes');
    var empty = modalRoot.querySelector('#reflModalEmpty');
    if (!ul) return;
    ul.innerHTML = '';
    notes.forEach(function (n) {
      var li = document.createElement('li');
      var date = new Date(n.createdAt);
      var dateStr = date.toLocaleDateString('pt-BR', { day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' });
      li.innerHTML =
        '<div class="note-text">' + sanitize(n.text) + '</div>' +
        '<div class="note-date">' + sanitize(dateStr) + '</div>' +
        '<button class="note-delete" title="Apagar nota" data-note="' + sanitize(n.id) + '">✕</button>';
      li.querySelector('.note-delete').addEventListener('click', function () {
        var data = loadAll();
        var k = bookId + '::' + activeSectionKey;
        data[k] = (Array.isArray(data[k]) ? data[k] : []).filter(function (x) { return x.id !== n.id; });
        saveAll(data);
        renderNotes();
        updateButtonCount(activeSectionKey);
      });
      ul.appendChild(li);
    });
    if (empty) empty.style.display = notes.length ? 'none' : 'block';
  }

  // Atualiza o contador "(N)" no botão que abriu o modal.
  function updateButtonCount(sectionKey) {
    var bookId = getBookId();
    var all = loadAll();
    var notes = Array.isArray(all[bookId + '::' + sectionKey]) ? all[bookId + '::' + sectionKey] : [];
    var btn = document.querySelector('.open-reflection-modal[data-section="' + sectionKey + '"]');
    if (btn) {
      var label = btn.getAttribute('data-label') || 'Notas';
      btn.textContent = '📝 ' + label + ' (' + notes.length + ')';
    }
  }

  // ---- Injeta o botão "📝 Notas (N)" nas seções de reflexão por capítulo ----
  var injecting = false;
  var mo = null;

  function injectButtons() {
    if (injecting) return;            // evita reentrada / loop do observer
    injecting = true;
    try {
      // Seletores das seções que podem ter reflexões.
      var selectors = '.chapter-card, .reflection-questions, .mt-card';
      var scope = document.querySelector('.main-content') || document;

      function keyFor(el) {
        if (el.getAttribute('data-step')) return el.getAttribute('data-step');
        var desc = el.querySelector('[data-step]');
        if (desc) return desc.getAttribute('data-step');
        var node = el;
        while (node && node !== document.body) {
          if (node.id) return node.id;
          node = node.parentElement;
        }
        var all = scope.querySelectorAll(selectors);
        var idx = Array.prototype.indexOf.call(all, el);
        return 'sec-' + (idx >= 0 ? idx : Math.random().toString(36).slice(2, 8));
      }
      function labelFor(el) {
        if (el.getAttribute('data-step') || el.querySelector('[data-step]')) return 'Reflexão';
        var h = el.querySelector('h3, h4');
        return h ? (h.textContent || '').slice(0, 24) : 'Seção';
      }

      scope.querySelectorAll(selectors).forEach(function (el) {
        if (el.getAttribute('data-refl-injected')) return;   // já processado
        el.setAttribute('data-refl-injected', '1');
        var sectionKey = keyFor(el);
        var label = labelFor(el);
        var bookId = getBookId();
        var all = loadAll();
        var count = Array.isArray(all[bookId + '::' + sectionKey]) ? all[bookId + '::' + sectionKey].length : 0;

        var btn = document.createElement('button');
        btn.type = 'button';
        btn.className = 'btn open-reflection-modal';
        btn.setAttribute('data-section', sectionKey);
        btn.setAttribute('data-label', label);
        btn.style.marginTop = '10px';
        btn.textContent = '📝 ' + label + ' (' + count + ')';
        btn.addEventListener('click', function (e) {
          e.preventDefault();
          e.stopPropagation();
          openModal(sectionKey, label);
        });
        var refl = el.querySelector('.reflection-input');
        if (refl && refl.parentElement) {
          refl.parentElement.appendChild(btn);
        } else {
          el.appendChild(btn);
        }
      });
    } finally {
      injecting = false;
    }
  }

  // Injeta após o carregamento do conteúdo e novamente quando o livro troca.
  function init() {
    injectButtons();
    var lastHref = window.location.href;
    window.addEventListener('popstate', function () {
      if (window.location.href !== lastHref) { lastHref = window.location.href; setTimeout(injectButtons, 60); }
    });
    // Observer desconectado durante a injeção para evitar loop de mutações.
    if (window.MutationObserver) {
      var target = document.querySelector('#bookSections, .main-content') || document.body;
      mo = new MutationObserver(function () {
        if (mo) mo.disconnect();          // pausa durante a injeção
        setTimeout(function () {
          injectButtons();
          if (mo) mo.observe(target, { childList: true, subtree: true });
        }, 80);
      });
      mo.observe(target, { childList: true, subtree: true });
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
