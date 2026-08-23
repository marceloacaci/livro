/**
 * reader.js — Fundação de micro-UX do Leitor (alvo da arquitetura v1.0).
 *
 * Aprimoramentos ADITIVOS para livro.html, 100% vanilla e auto-contidos.
 * Não conflitam com livro.js (que dona da renderização das seções).
 *   - Barra de progresso de leitura (B6)
 *   - Botões "Copiar Citação" via Clipboard API (B7)
 *   - Modo Leitura Focada / Zen (B8)
 * Tudo criado em runtime; funciona sem alterar o HTML existente.
 */
(function () {
  'use strict';

  // ---------- 1. Barra de progresso ----------
  var bar = document.createElement('div');
  bar.id = 'readingProgress';
  bar.setAttribute('aria-hidden', 'true');
  bar.style.cssText =
    'position:fixed;top:0;left:0;height:3px;width:100%;transform:scaleX(0);' +
    'transform-origin:left center;background:var(--color-primary,#00c2ff);' +
    'z-index:200;transition:transform .1s linear;pointer-events:none;';

  function attachBar() {
    if (!document.getElementById('readingProgress')) {
      document.body.appendChild(bar);
    }
  }

  function updateProgress() {
    var el = document.documentElement;
    var max = el.scrollHeight - el.clientHeight;
    var pct = max > 0 ? (el.scrollTop || window.scrollY) / max : 0;
    pct = Math.min(1, Math.max(0, pct));
    bar.style.transform = 'scaleX(' + pct.toFixed(4) + ')';
  }

  // ---------- 2. Copiar Citação ----------
  function attachCopyButtons() {
    var quotes = document.querySelectorAll('.citacao, blockquote');
    Array.prototype.forEach.call(quotes, function (q) {
      if (q.querySelector('.btn-copy-quote')) return;
      var btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'btn btn-copy-quote';
      btn.textContent = '📋 Copiar';
      btn.addEventListener('click', function () {
        var text = (q.innerText || '').replace('📋 Copiar', '').trim();
        if (navigator.clipboard && navigator.clipboard.writeText) {
          navigator.clipboard.writeText(text).then(function () {
            btn.textContent = '✅ Copiado!';
            setTimeout(function () { btn.textContent = '📋 Copiar'; }, 1500);
          });
        }
      });
      q.style.position = q.style.position || 'relative';
      q.appendChild(btn);
    });
  }

  // ---------- 3. Modo Leitura Focada (Zen) ----------
  var lastY = window.scrollY || 0;
  function onZenScroll() {
    var y = window.scrollY || 0;
    var goingDown = y > lastY && y > 120;
    document.body.classList.toggle('zen-mode', goingDown);
    lastY = y;
  }

  function init() {
    attachBar();
    attachCopyButtons();
    updateProgress();
    window.addEventListener('scroll', function () {
      updateProgress();
      onZenScroll();
    }, { passive: true });
    window.addEventListener('resize', updateProgress);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
