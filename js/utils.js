// js/utils.js — Helpers utilitários zero-dependency (ESM, self-contained).
//
// Este módulo é aditivo e testável; NÃO é importado pelo site clássico
// existente (segue o mesmo padrão de js/search.js e js/annotations.js).
// Fornece debounce, throttle, sanitize (XSS), escape de HTML/atributos,
// deepClone e clamp — usados pelos módulos state/router e por testes.
//
// Todos os acessos a globals (window/document) ocorrem DENTRO das funções,
// nunca no topo do módulo, para que o arquivo possa ser importado em Node
// (node:test) sem referenciar APIs de browser em tempo de carregamento.

export const Utils = (() => {
  'use strict';

  // ---- debounce: atrasa a execução até `wait` ms sem novas chamadas ----
  function debounce(fn, wait = 200) {
    if (typeof fn !== 'function') throw new TypeError('debounce: fn deve ser função');
    let timer = null;
    return function debounced(...args) {
      const ctx = this;
      if (timer) clearTimeout(timer);
      timer = setTimeout(() => {
        timer = null;
        fn.apply(ctx, args);
      }, wait);
    };
  }

  // ---- throttle: no máximo 1 execução por `wait` ms ----
  function throttle(fn, wait = 200) {
    if (typeof fn !== 'function') throw new TypeError('throttle: fn deve ser função');
    let last = 0;
    let timer = null;
    return function throttled(...args) {
      const ctx = this;
      const now = Date.now();
      const remaining = wait - (now - last);
      if (remaining <= 0) {
        if (timer) { clearTimeout(timer); timer = null; }
        last = now;
        fn.apply(ctx, args);
      } else if (!timer) {
        timer = setTimeout(() => {
          last = Date.now();
          timer = null;
          fn.apply(ctx, args);
        }, remaining);
      }
    };
  }

  // ---- sanitize: escapa HTML para evitar XSS em input do usuário ----
  function sanitize(text) {
    if (typeof text !== 'string') text = String(text == null ? '' : text);
    // Browser: usa o parser nativo (textContent não executa HTML).
    const g = typeof globalThis !== 'undefined' ? globalThis : {};
    if (g.document && typeof g.document.createElement === 'function') {
      const div = g.document.createElement('div');
      div.textContent = text;
      return div.innerHTML;
    }
    // Fallback Node: escapa os 5 caracteres perigosos.
    return text
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');
  }

  // ---- escapeHtml: escapa para uso dentro de texto HTML ----
  function escapeHtml(str) {
    return String(str == null ? '' : str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');
  }

  // ---- escapeAttr: igual a escapeHtml (para atributos de elementos) ----
  function escapeAttr(str) {
    return escapeHtml(str);
  }

  // ---- deepClone: cópia profunda sem dependências (structuredClone se houver) ----
  function deepClone(value) {
    if (value === null || typeof value !== 'object') return value;
    const g = typeof globalThis !== 'undefined' ? globalThis : {};
    if (typeof g.structuredClone === 'function') {
      try { return g.structuredClone(value); } catch (_) { /* cai no fallback */ }
    }
    return JSON.parse(JSON.stringify(value));
  }

  // ---- clamp: limita um número ao intervalo [min, max] ----
  function clamp(n, min, max) {
    if (typeof n !== 'number' || Number.isNaN(n)) return min;
    return Math.min(max, Math.max(min, n));
  }

  // ---- genId: gera id único (crypto se disponível, senão fallback) ----
  function genId() {
    const g = typeof globalThis !== 'undefined' ? globalThis : {};
    if (g.crypto && typeof g.crypto.randomUUID === 'function') {
      return g.crypto.randomUUID();
    }
    return 'id-' + Date.now().toString(36) + '-' + Math.random().toString(36).slice(2, 8);
  }

  return { debounce, throttle, sanitize, escapeHtml, escapeAttr, deepClone, clamp, genId };
})();

export default Utils;
