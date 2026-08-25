/**
 * theme.js — Tema claro/escuro com persistência (camada aditiva, P1).
 *
 * - Respeita a preferência do SO via matchMedia('(prefers-color-scheme: dark)').
 * - Persiste a escolha do usuário em localStorage ('livro-theme').
 * - Aplica data-theme no <html>, direcionando as variáveis CSS.
 * - Botão #themeToggle (☀️/🌙) com aria-pressed. Não altera lógica de reflexões.
 */
(function () {
  'use strict';

  var KEY = 'livro-theme';
  var root = document.documentElement;

  // Ordem de ciclo dos temas (Sprint 2 UX: adiciona sépia).
  var THEMES = ['dark', 'sepia', 'light'];
  var THEME_LABELS = {
    dark: { next: 'Mudar para tema sépia', icon: '🌙' },
    sepia: { next: 'Mudar para tema claro', icon: '📜' },
    light: { next: 'Mudar para tema escuro', icon: '☀️' }
  };

  function systemPrefersDark() {
    return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
  }

  function getStored() {
    try { return localStorage.getItem(KEY); } catch (e) { return null; }
  }

  function apply(theme) {
    if (theme === 'light' || theme === 'sepia' || theme === 'dark') {
      root.setAttribute('data-theme', theme);
    } else {
      root.removeAttribute('data-theme'); // volta ao :root padrão (escuro)
    }
  }

  function resolveInitial() {
    var stored = getStored();
    if (THEMES.indexOf(stored) !== -1) return stored;
    return systemPrefersDark() ? 'dark' : 'light';
  }

  function syncButton(btn, theme) {
    if (!btn) return;
    var meta = THEME_LABELS[theme] || THEME_LABELS.dark;
    btn.setAttribute('aria-pressed', String(theme === 'dark'));
    btn.setAttribute('aria-label', meta.next);
    btn.textContent = meta.icon;
  }

  // Aplica no carregamento (antes de pintar para evitar flash)
  var initial = resolveInitial();
  apply(initial);

  var btn = document.getElementById('themeToggle');
  syncButton(btn, initial);

  if (btn) {
    btn.addEventListener('click', function () {
      var current = root.getAttribute('data-theme') || 'dark';
      var idx = THEMES.indexOf(current);
      var next = THEMES[(idx + 1) % THEMES.length];
      apply(next);
      try { localStorage.setItem(KEY, next); } catch (e) {}
      syncButton(btn, next);
    });
  }

  // Reage à mudança de preferência do SO (se o usuário não escolheu manualmente)
  if (window.matchMedia) {
    var mq = window.matchMedia('(prefers-color-scheme: dark)');
    var onChange = function (e) {
      if (getStored()) return; // escolha manual tem precedência
      var next = e.matches ? 'dark' : 'light';
      apply(next);
      syncButton(btn, next);
    };
    if (mq.addEventListener) mq.addEventListener('change', onChange);
    else if (mq.addListener) mq.addListener(onChange);
  }

  window.LivroTheme = {
    apply: apply,
    THEMES: THEMES,
    toggle: function () {
      var current = root.getAttribute('data-theme') || 'dark';
      var idx = THEMES.indexOf(current);
      var next = THEMES[(idx + 1) % THEMES.length];
      apply(next);
      try { localStorage.setItem(KEY, next); } catch (e) {}
      syncButton(btn, next);
      return next;
    },
    get: function () { return root.getAttribute('data-theme') || 'dark'; }
  };
})();
