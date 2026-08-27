// js/router.js — Deep Link Routing Engine (ESM, zero-dep, self-contained).
//
// Padrão aditivo/testável (igual a search/annotations/state/utils):
// ESM + node:test, NÃO importado pelo site clássico. Atualiza dinamicamente
// document.title e as tags og: ao abrir um livro, para que links
// compartilhados não mostrem título/preview genérico (correção de SEO).
//
// Migra transparente #slug -> ?id=slug no carregamento.

export const Router = (() => {
  'use strict';

  // Resolve as globals usadas (com defaults para Node/testes com stubs).
  function g() {
    const w = typeof globalThis !== 'undefined' ? globalThis : {};
    return {
      location: w.location,
      history: w.history,
      document: w.document,
      dispatch: (name, detail) => {
        if (w.dispatchEvent) {
          w.dispatchEvent(new w.CustomEvent(name, { detail }));
        }
      }
    };
  }

  function parse() {
    const ctx = g();
    const params = ctx.location
      ? new URLSearchParams(ctx.location.search || '')
      : new URLSearchParams('');
    return {
      id: params.get('id'),
      chapter: Number(params.get('cap')) || 0,
      raw: ctx.location ? ctx.location.hash : '' // legacy #slug
    };
  }

  // Migração transparente: #ramsey -> ?id=ramsey
  function migrateLegacy() {
    const ctx = g();
    if (ctx.location && ctx.location.hash && !ctx.location.search) {
      const slug = ctx.location.hash.slice(1);
      if (!slug) return null;
      if (ctx.history && ctx.history.replaceState) {
        const url = new URL(ctx.location.href || (ctx.location.pathname || 'livro.html') + ctx.location.hash);
        url.searchParams.set('id', slug);
        url.hash = '';
        ctx.history.replaceState({}, '', url);
      }
      return slug;
    }
    return null;
  }

  function navigate(id, chapter = 0) {
    const ctx = g();
    if (!ctx.location || !ctx.history || !ctx.history.pushState) return;
    const url = new URL(ctx.location.href || (ctx.location.pathname || 'livro.html'));
    url.searchParams.set('id', id);
    if (chapter) url.searchParams.set('cap', chapter);
    ctx.history.pushState({}, '', url);
    ctx.dispatch('popstate');
  }

  // Atualiza <title> e meta og:/description com os dados do livro ativo.
  // `book` é o objeto do catálogo (window.LIVRO_BOOKS[i]).
  function applyMeta(book) {
    const ctx = g();
    if (!ctx.document || !book) return;
    const titlePt = book.titlePt || book.title || 'Biblioteca de Reflexões';
    ctx.document.title = 'Reflexões — ' + titlePt;
    function setMeta(attr, key, value) {
      let m = ctx.document.querySelector('meta[' + attr + '="' + key + '"]');
      if (!m) {
        m = ctx.document.createElement('meta');
        m.setAttribute(attr, key);
        ctx.document.head.appendChild(m);
      }
      m.setAttribute('content', value);
    }
    const summary = book.summary || titlePt;
    setMeta('name', 'description', summary);
    setMeta('property', 'og:title', 'Reflexões — ' + titlePt);
    setMeta('property', 'og:description', summary);
    if (book.cover) setMeta('property', 'og:image', book.cover);
  }

  if (typeof globalThis !== 'undefined' && globalThis.window) {
    globalThis.window.addEventListener('popstate', () => {
      const route = parse();
      if (route.id) {
        globalThis.window.dispatchEvent(
          new globalThis.CustomEvent('book:open', { detail: route })
        );
      }
    });
  }

  return { parse, migrateLegacy, navigate, applyMeta };
})();

export default Router;
