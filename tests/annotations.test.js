// tests/annotations.test.js — Testes zero-dependency para js/annotations.js.
//
// Mocks leves (SEM jsdom):
//   - global.localStorage: Map-backed.
//   - global.document.createElement: retorna objeto com textContent -> innerHTML.
//   - global.crypto.randomUUID: gerador determinístico por contador.
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { Annotations } from '../js/annotations.js';

// --- Mocks leves ---
class MemStorage {
  constructor() { this.m = new Map(); }
  getItem(k) { return this.m.has(k) ? this.m.get(k) : null; }
  setItem(k, v) { this.m.set(k, String(v)); }
  removeItem(k) { this.m.delete(k); }
}

let counter = 0;
function installMocks() {
  counter = 0;
  global.localStorage = new MemStorage();
  global.document = {
    createElement() {
      return {
        _text: '',
        set textContent(v) { this._text = v; },
        get textContent() { return this._text; },
        get innerHTML() { return this._text; }
      };
    }
  };
  if (!global.crypto) global.crypto = {};
  global.crypto.randomUUID = () => `uuid-${++counter}`;
}

test('múltiplas notas no mesmo capítulo persistem', () => {
  installMocks();
  const bookId = 'ramsey';
  const chapterId = 'cap-00';
  const id1 = Annotations.add(bookId, chapterId, 'Nota um');
  const id2 = Annotations.add(bookId, chapterId, 'Nota dois');
  assert.notEqual(id1, id2, 'ids das notas devem ser distintos');

  const notas = Annotations.get(bookId, chapterId);
  assert.equal(notas.length, 2, 'deve haver 2 notas no capítulo');
  assert.deepEqual(
    notas.map((n) => n.text).sort(),
    ['Nota dois', 'Nota um'],
    'ambas as notas devem persistir'
  );
});

test('remove apenas a nota com o noteId informado', () => {
  installMocks();
  const bookId = 'ramsey';
  const chapterId = 'cap-01';
  const id1 = Annotations.add(bookId, chapterId, 'Manter');
  const id2 = Annotations.add(bookId, chapterId, 'Remover');
  assert.equal(Annotations.get(bookId, chapterId).length, 2);

  Annotations.remove(bookId, chapterId, id2);
  const restantes = Annotations.get(bookId, chapterId);
  assert.equal(restantes.length, 1, 'deve sobrar 1 nota');
  assert.equal(restantes[0].id, id1, 'a nota removida deve ser exatamente a id2');
  assert.equal(restantes[0].text, 'Manter');
});

test('update altera apenas a nota alvo', () => {
  installMocks();
  const id1 = Annotations.add('b', 'c1', 'Original 1');
  const id2 = Annotations.add('b', 'c1', 'Original 2');
  Annotations.update('b', 'c1', id1, 'Editado');
  const notas = Annotations.get('b', 'c1');
  const alvo = notas.find((n) => n.id === id1);
  const outro = notas.find((n) => n.id === id2);
  assert.equal(alvo.text, 'Editado');
  assert.equal(outro.text, 'Original 2');
});

test('sanitize escapa HTML no fallback Node (sem document)', () => {
  // Força o caminho fallback do Node (sem document) para validar o escape XSS.
  delete global.document;
  const id = Annotations.add('x', 'y', '<script>alert(1)</script>');
  const nota = Annotations.get('x', 'y').find((n) => n.id === id);
  assert.ok(!nota.text.includes('<script>'), 'HTML deve ser escapado');
  assert.ok(nota.text.includes('&lt;script&gt;'), 'deve conter entidade escapada');
  installMocks(); // restaura mocks para os próximos testes, se houver
});
