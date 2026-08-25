// js/state.js — Proxy Reactive State Engine (ESM, zero-dep, self-contained).
//
// Estado reativo central do app. Segue o padrão aditivo dos módulos novos
// (search/annotations/utils): é ESM e testável em Node (node:test), e NÃO é
// importado pelo site clássico existente — preservando 100% o funcionamento
// atual de index.html / livro.html.
//
// Persistência: usa `localStorage` quando disponível (browser) ou um store
// injetável (testes Node). Trata QuotaExceededError sem quebrar a UI.
// Também expõe `window.State` no browser para uso opcional por scripts clássicos.

export const State = (() => {
  'use strict';

  // ---- Camada de armazenamento (localStorage ou injetável) ----
  let store = null;
  function getStore() {
    if (store) return store;
    const g = typeof globalThis !== 'undefined' ? globalThis : {};
    if (g.localStorage) {
      return {
        get: (k) => {
          const v = g.localStorage.getItem(k);
          return v ? JSON.parse(v) : null;
        },
        set: (k, v) => g.localStorage.setItem(k, JSON.stringify(v))
      };
    }
    throw new Error('[State] Nenhum storage disponível (injete um store ou defina globalThis.localStorage).');
  }

  const PERSIST_KEYS = ['theme', 'fontSize', 'reflexoes'];

  function readPersisted(key, fallback) {
    try {
      const raw = getStore().get(key);
      if (raw !== null && raw !== undefined) return raw;
    } catch (e) { /* ignora corrupção */ }
    return fallback;
  }

  function writePersisted(key, value) {
    try {
      getStore().set(key, value);
    } catch (err) {
      // (RS-01) Não deixa a cota estourada derrubar a UI silenciosamente.
      console.error('[State] Falha ao persistir "' + key + '":', err && err.name ? err.name : err);
    }
  }

  const listeners = new Map(); // prop -> Set<fn>

  const defaults = {
    activeBook: null,
    activeChapter: 0,
    theme: readPersisted('theme', 'dark'),
    fontSize: readPersisted('fontSize', 16),
    reflexoes: readPersisted('reflexoes', {}),
    searchQuery: ''
  };

  const data = new Proxy(defaults, {
    set(target, prop, value) {
      const old = target[prop];
      target[prop] = value;
      if (PERSIST_KEYS.indexOf(prop) !== -1) {
        writePersisted(prop, value);
      }
      const fns = listeners.get(prop);
      if (fns) fns.forEach((fn) => fn(value, old));
      const star = listeners.get('*');
      if (star) star.forEach((fn) => fn(prop, value, old));
      return true;
    }
  });

  function get(prop) {
    return prop ? data[prop] : data;
  }

  function set(prop, val) {
    data[prop] = val;
  }

  function subscribe(prop, fn) {
    if (!listeners.has(prop)) listeners.set(prop, new Set());
    listeners.get(prop).add(fn);
    return () => listeners.get(prop).delete(fn);
  }

  function setStore(s) {
    store = s;
  }

  // Expose for classic-script usage in the browser (additive, optional).
  if (typeof globalThis !== 'undefined' && globalThis.window) {
    globalThis.window.State = { get, set, subscribe, setStore };
  }

  return { get, set, subscribe, setStore };
})();

export default State;
