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

  function systemPrefersDark() {
    return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
  }

  function getStored() {
    try { return localStorage.getItem(KEY); } catch (e) { return null; }
  }

  function apply(theme) {
    if (theme === 'light' || theme === 'dark') {
      root.setAttribute('data-theme', theme);
    } else {
      root.removeAttribute('data-theme'); // volta ao :root padrão (escuro)
    }
  }

  function resolveInitial() {
    var stored = getStored();
    if (stored === 'light' || stored === 'dark') return stored;
    return systemPrefersDark() ? 'dark' : 'light';
  }

  function syncButton(btn, theme) {
    if (!btn) return;
    var isDark = theme === 'dark';
    btn.setAttribute('aria-pressed', String(isDark));
    btn.setAttribute('aria-label', isDark ? 'Mudar para tema claro' : 'Mudar para tema escuro');
    btn.textContent = isDark ? '☀️' : '🌙';
  }

  // Aplica no carregamento (antes de pintar para evitar flash)
  var initial = resolveInitial();
  apply(initial);

  var btn = document.getElementById('themeToggle');
  syncButton(btn, initial);

  if (btn) {
    btn.addEventListener('click', function () {
      var current = root.getAttribute('data-theme');
      var next = (current === 'light') ? 'dark' : 'light';
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
      apply(e.matches ? 'dark' : 'light');
      syncButton(btn, e.matches ? 'dark' : 'light');
    };
    if (mq.addEventListener) mq.addEventListener('change', onChange);
    else if (mq.addListener) mq.addListener(onChange);
  }

  window.LivroTheme = {
    apply: apply,
    toggle: function () {
      var next = (root.getAttribute('data-theme') === 'light') ? 'dark' : 'light';
      apply(next);
      try { localStorage.setItem(KEY, next); } catch (e) {}
      syncButton(btn, next);
      return next;
    },
    get: function () { return root.getAttribute('data-theme') || 'dark'; }
  };
})();
