// tests/utils.test.js — Testes zero-dependency para js/utils.js (node:test).
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { Utils } from '../js/utils.js';

test('debounce atrasa a execução até wait ms', async () => {
  let calls = 0;
  const fn = Utils.debounce(() => { calls++; }, 30);
  fn(); fn(); fn();
  assert.equal(calls, 0, 'não deve executar imediatamente');
  await new Promise((r) => setTimeout(r, 60));
  assert.equal(calls, 1, 'deve executar exatamente uma vez após o wait');
});

test('throttle limita a 1 execução por wait ms', async () => {
  let calls = 0;
  const fn = Utils.throttle(() => { calls++; }, 30);
  fn(); fn(); fn();
  assert.equal(calls, 1, 'primeira chamada executa na hora');
  await new Promise((r) => setTimeout(r, 50));
  assert.ok(calls >= 1 && calls <= 2, 'não deve estourar o limite');
});

test('sanitize escapa HTML no fallback Node (sem document)', () => {
  delete global.document;
  const out = Utils.sanitize('<img src=x onerror=alert(1)>');
  assert.ok(!out.includes('<img'), 'tags devem ser escapadas');
  assert.ok(out.includes('&lt;img'), 'deve conter &lt;');
});

test('escapeHtml / escapeAttr escapam os 5 caracteres perigosos', () => {
  const s = Utils.escapeHtml(`<a href="x">&'</a>`);
  assert.equal(s, '&lt;a href=&quot;x&quot;&gt;&amp;&#39;&lt;/a&gt;');
  assert.equal(Utils.escapeAttr(`"'<>&`), '&quot;&#39;&lt;&gt;&amp;');
});

test('deepClone faz cópia independente', () => {
  const orig = { a: 1, b: { c: [1, 2] } };
  const clone = Utils.deepClone(orig);
  clone.b.c.push(3);
  assert.equal(orig.b.c.length, 2, 'original não deve ser afetado');
});

test('clamp limita ao intervalo', () => {
  assert.equal(Utils.clamp(15, 0, 10), 10);
  assert.equal(Utils.clamp(-5, 0, 10), 0);
  assert.equal(Utils.clamp(5, 0, 10), 5);
  assert.equal(Utils.clamp(NaN, 0, 10), 0);
});

test('genId gera strings distintas', () => {
  const a = Utils.genId();
  const b = Utils.genId();
  assert.notEqual(a, b);
});
