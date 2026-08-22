/**
 * Biblioteca de Reflexões — navegação, filtro de livros e localStorage
 */

(function () {
  'use strict';

  // ==================== DOM REFS ====================
  var navToggle = document.getElementById('navToggle');
  var sidebar = document.getElementById('sidebar');
  var reflexoesList = document.getElementById('reflexoesList');
  var btnClearAll = document.getElementById('btnClearAll');
  var bookTabs = document.querySelectorAll('.book-tab');
  const sectionIds = [
    'inicio', 'sobre', 'capitulos', 'verdadesmitos', 'reflexoes'
  ];

  var currentBook = 'both';

  // ==================== MOBILE SIDEBAR ====================
  if (navToggle && sidebar) {
    navToggle.addEventListener('click', function () {
      sidebar.classList.toggle('open');
      var open = sidebar.classList.contains('open');
      navToggle.setAttribute('aria-expanded', String(open));
    });

    sidebar.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        sidebar.classList.remove('open');
        navToggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  // ==================== ACTIVE NAV HIGHLIGHT ====================
  function getActiveSection() {
    var current = 'inicio';
    var scrollY = window.scrollY || window.pageYOffset;
    sectionIds.forEach(function (id) {
      var el = document.getElementById(id);
      if (el) {
        var top = el.offsetTop - 80;
        if (scrollY >= top) {
          current = id;
        }
      }
    });
    return current;
  }

  function updateActiveNav() {
    var active = getActiveSection();
    document.querySelectorAll('.sidebar-link').forEach(function (a) {
      var href = a.getAttribute('href') || '';
      var target = href.replace(/^.*#/, '');
      if (!target) target = 'inicio';
      a.classList.toggle('active', target === active);
    });
  }

  window.addEventListener('scroll', updateActiveNav, { passive: true });
  updateActiveNav();

  // ==================== BOOK FILTER ====================
  function setBookFilter(book) {
    currentBook = book;
    bookTabs.forEach(function (tab) {
      tab.classList.toggle('active', tab.getAttribute('data-book') === book);
    });

    document.querySelectorAll('[data-book]').forEach(function (el) {
      var bookAttr = el.getAttribute('data-book');
      if (book === 'both' || bookAttr === 'both' || bookAttr === book) {
        el.classList.remove('book-hidden');
      } else {
        el.classList.add('book-hidden');
      }
    });
  }

  bookTabs.forEach(function (tab) {
    tab.addEventListener('click', function () {
      setBookFilter(tab.getAttribute('data-book'));
    });
  });

  // ==================== LOCALSTORAGE ====================
  var STORAGE_KEY = 'biblioteca_reflexoes';
  var STORAGE_KEY_LEGACY = 'meubolso_reflexoes';

  function loadReflexoes() {
    try {
      var data = localStorage.getItem(STORAGE_KEY);
      if (!data && STORAGE_KEY_LEGACY) {
        var legacy = localStorage.getItem(STORAGE_KEY_LEGACY);
        if (legacy) {
          localStorage.setItem(STORAGE_KEY, legacy);
          localStorage.removeItem(STORAGE_KEY_LEGACY);
          data = legacy;
        }
      }
      return data ? JSON.parse(data) : {};
    } catch (e) {
      return {};
    }
  }

  function saveReflexoes(data) {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    } catch (e) {
      alert('Não foi possível salvar. O armazenamento local pode estar cheio.');
    }
  }

  // ==================== SAVE / LOAD / CLEAR ====================
  function saveReflexao(step) {
    var textarea = document.querySelector('.reflection-input[data-step="' + step + '"]');
    if (!textarea) return;
    var text = textarea.value.trim();
    var reflexoes = loadReflexoes();

    if (text) {
      reflexoes[step] = {
        text: text,
        savedAt: new Date().toISOString()
      };
    } else {
      delete reflexoes[step];
    }

    saveReflexoes(reflexoes);
    renderReflexoes();

    var btn = textarea.parentElement.querySelector('.btn-save');
    if (btn) {
      var original = btn.textContent;
      btn.textContent = '✅ Salvo!';
      btn.disabled = true;
      setTimeout(function () {
        btn.textContent = original;
        btn.disabled = false;
      }, 1500);
    }
  }

  function clearReflexao(step) {
    var textarea = document.querySelector('.reflection-input[data-step="' + step + '"]');
    if (!textarea) return;
    textarea.value = '';
    var reflexoes = loadReflexoes();
    delete reflexoes[step];
    saveReflexoes(reflexoes);
    renderReflexoes();
  }

  function clearAllReflexoes() {
    if (!confirm('Tem certeza? Todas as reflexões salvas serão apagadas.')) return;
    localStorage.removeItem(STORAGE_KEY);
    renderReflexoes();
    document.querySelectorAll('.reflection-input').forEach(function (ta) {
      ta.value = '';
    });
  }

  // ==================== RENDER REFLEXOES ====================
  function renderReflexoes() {
    var reflexoes = loadReflexoes();
    var keys = Object.keys(reflexoes);

    if (keys.length === 0) {
      reflexoesList.innerHTML = '<p class="empty-state">Nenhuma reflexão salva ainda. Vá para uma seção acima e comece a escrever!</p>';
      btnClearAll.style.display = 'none';
      return;
    }

    btnClearAll.style.display = 'inline-flex';

    var stepLabels = {
      baby1: 'Passo 1 — Fundo de Emergência',
      baby2: 'Passo 2 — Debt Snowball',
      baby3: 'Passo 3 — Reserva de 3-6 Meses',
      baby4: 'Passo 4 — Investir 15%',
      baby5: 'Passo 5 — Educação dos Filhos',
      baby6: 'Passo 6 — Pagar a Casa',
      baby7: 'Passo 7 — Construir Riqueza e Dar',
      micro1: 'Micro-hábito 1 — Comece tão pequeno que não dá para recusar',
      micro2: 'Micro-hábito 2 — Use a âncora “Depois que eu..., eu vou...”',
      micro3: 'Micro-hábito 3 — Celebre cada sucesso, mesmo o menor'
    };

    var html = '';
    var sortedKeys = keys.slice().reverse();
    sortedKeys.forEach(function (key) {
      var entry = reflexoes[key];
      if (!entry) return;
      var date = new Date(entry.savedAt);
      var dateStr = date.toLocaleDateString('pt-BR', {
        day: '2-digit', month: 'short', year: 'numeric',
        hour: '2-digit', minute: '2-digit'
      });
      var label = stepLabels[key] || key;

      html += '<div class="reflexao-card">';
      html += '  <div class="reflexao-meta">';
      html += '    <span class="reflexao-step">' + escapeHtml(label) + '</span>';
      html += '    <span>' + escapeHtml(dateStr) + '</span>';
      html += '  </div>';
      html += '  <div class="reflexao-text">' + escapeHtml(entry.text) + '</div>';
      html += '  <button class="reflexao-delete" data-step="' + key + '" title="Apagar esta reflexão">✕</button>';
      html += '</div>';
    });

    reflexoesList.innerHTML = html;

    reflexoesList.querySelectorAll('.reflexao-delete').forEach(function (btn) {
      btn.addEventListener('click', function () {
        var step = btn.getAttribute('data-step');
        if (confirm('Apagar esta reflexão?')) {
          clearReflexao(step);
        }
      });
    });
  }

  function escapeHtml(str) {
    var div = document.createElement('div');
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  }

  // ==================== EVENT DELEGATION ====================
  document.addEventListener('click', function (e) {
    if (e.target.classList.contains('btn-save')) {
      var step = e.target.getAttribute('data-step');
      saveReflexao(step);
    }

    if (e.target.classList.contains('btn-clear')) {
      var step = e.target.getAttribute('data-step');
      clearReflexao(step);
    }
  });

  btnClearAll.addEventListener('click', clearAllReflexoes);

  // ==================== INIT ====================
  renderReflexoes();

  function loadSavedIntoTextareas() {
    var reflexoes = loadReflexoes();
    Object.keys(reflexoes).forEach(function (step) {
      var textarea = document.querySelector('.reflection-input[data-step="' + step + '"]');
      if (textarea && reflexoes[step] && reflexoes[step].text) {
        textarea.value = reflexoes[step].text;
      }
    });
  }

  loadSavedIntoTextareas();

})();
