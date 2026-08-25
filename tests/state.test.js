// tests/state.test.js — Testes zero-dependency para js/state.js (node:test).
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { State } from '../js/state.js';

// Store em memória injetável (sem localStorage global).
class MemStore {
  constructor() { this.m = new Map(); }
  get(k) { return this.m.has(k) ? JSON.parse(this.m.get(k)) : null; }
  set(k, v) { this.m.set(k, JSON.stringify(v)); }
}

function installStore() {
  const s = new MemStore();
  State.setStore(s);
  return s;
}

test('set/get básico', () => {
  installStore();
  State.set('activeBook', 'ramsey');
  assert.equal(State.get('activeBook'), 'ramsey');
  assert.equal(State.get().activeBook, 'ramsey');
});

test('subscribe dispara em mudança de prop', () => {
  installStore();
  let received = null;
  const unsub = State.subscribe('theme', (val) => { received = val; });
  State.set('theme', 'sepia');
  assert.equal(received, 'sepia', 'subscriber deve receber o novo valor');
  unsub();
  received = null;
  State.set('theme', 'light');
  assert.equal(received, null, 'após unsubscribe não deve disparar');
});

test('subscribe("*") recebe (prop, value, old)', () => {
  installStore();
  let evt = null;
  State.subscribe('*', (prop, value, old) => { evt = { prop, value, old }; });
  State.set('fontSize', 20);
  assert.equal(evt.prop, 'fontSize');
  assert.equal(evt.value, 20);
  assert.equal(evt.old, 16);
});

test('persiste chaves em store injetado (theme/fontSize/reflexoes)', () => {
  const store = installStore();
  State.set('theme', 'light');
  State.set('reflexoes', { ramsey: [{ id: 'n1', text: 'x' }] });
  assert.equal(store.get('theme'), 'light');
  assert.deepEqual(store.get('reflexoes'), { ramsey: [{ id: 'n1', text: 'x' }] });
});

test('não lança em QuotaExceededError (tratado)', () => {
  const throwing = {
    get() { return null; },
    set() { const e = new Error('cheio'); e.name = 'QuotaExceededError'; throw e; }
  };
  State.setStore(throwing);
  assert.doesNotThrow(() => State.set('theme', 'dark'));
  // restaura store limpo p/ não afetar outros testes
  installStore();
});
