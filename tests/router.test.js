// tests/router.test.js — Testes zero-dependency para js/router.js (node:test).
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { Router } from '../js/router.js';

// Monta um stub de window/location/history/document para testar o router
// sem browser real. Cada teste instala seu próprio ambiente.
function installEnv(opts = {}) {
  const search = opts.search || '';
  const hash = opts.hash || '';
  const href = 'https://exemplo.com/livro.html' + search + hash;
  const events = {};
  const metaTags = [];
  const fakeDoc = {
    title: '',
    head: { appendChild() {} },
    createElement() { return { setAttribute() {}, }; },
    querySelector(sel) {
      // Retorna tag meta fake se já foi "criada"; senão null (será criada).
      const found = metaTags.find((m) => m.sel === sel);
      if (found) return found.el;
      return null;
    }
  };
  function makeMeta() {
    const el = { setAttribute() {}, _content: '' };
    Object.defineProperty(el, 'content', { set(v) { el._content = v; }, get() { return el._content; } });
    return el;
  }
  global.window = {
    location: { href, search, hash, pathname: '/livro.html' },
    history: {
      _url: href,
      replaceState(_, __, url) { global.window.location.search = new URL(url).search; global.window.location.hash = ''; },
      pushState(_, __, url) { const u = new URL(url); global.window.location.search = u.search; global.window.location.hash = u.hash; }
    },
    dispatchEvent() { return true; },
    addEventListener() {},
    CustomEvent: class { constructor(n, d) { this.type = n; this.detail = d; } }
  };
  global.location = global.window.location;
  global.history = global.window.history;
  global.document = fakeDoc;
  global.CustomEvent = global.window.CustomEvent;
  return { metaTags, makeMeta, fakeDoc };
}

test('parse extrai id e cap de ?id=&cap=', () => {
  installEnv({ search: '?id=ramsey&cap=2' });
  const r = Router.parse();
  assert.equal(r.id, 'ramsey');
  assert.equal(r.chapter, 2);
});

test('migrateLegacy converte #slug em ?id=slug', () => {
  installEnv({ hash: '#o-poder-da-acao-financeira' });
  const slug = Router.migrateLegacy();
  assert.equal(slug, 'o-poder-da-acao-financeira');
  assert.equal(global.window.location.search, '?id=o-poder-da-acao-financeira');
  assert.equal(global.window.location.hash, '');
});

test('navigate define ?id= e dispara popstate', () => {
  installEnv();
  let fired = false;
  global.dispatchEvent = () => { fired = true; return true; };
  Router.navigate('fogg', 3);
  assert.ok(global.window.location.search.includes('id=fogg'));
  assert.ok(global.window.location.search.includes('cap=3'));
  assert.ok(fired, 'deve disparar popstate');
});

test('applyMeta atualiza title e og: a partir do livro', () => {
  installEnv();
  const book = { id: 'ramsey', titlePt: 'O Poder da Ação', title: 'The Total Money Makeover', summary: 'Resumo.', cover: 'img/ramsey-cover.jpg' };
  // captura tags meta criadas
  const created = [];
  global.document.createElement = () => { const el = { setAttribute() {}, _content: '' }; Object.defineProperty(el, 'content', { set(v){el._content=v;}, get(){return el._content;} }); created.push(el); return el; };
  Router.applyMeta(book);
  assert.equal(global.document.title, 'Reflexões — O Poder da Ação');
});
