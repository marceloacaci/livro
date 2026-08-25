// js/annotations.js — CRUD de reflexões multi-nota (ESM, zero-dep, self-contained).
//
// Modelo de dados CORRIGIDO: `reflexoes[key]` é sempre um ARRAY de notas
// (não um objeto único), onde key = `${bookId}::${chapterId}`.
// Isso permite múltiplas notas por capítulo e remove/update por noteId.
//
// Persistência (injável):
//   - Em navegador: usa `localStorage` global.
//   - Em testes Node: usa um `State` injetável via setStore() OU um mock
//     global de `localStorage` (definido nos testes).
//   - `sanitize()` usa `document.createElement` se disponível (browser),
//     senão faz escape manual (Node).
//   - `crypto.randomUUID()` é usado se disponível; caso contrário gera um id.

export const Annotations = (() => {
  let store = null; // { get(key), set(key, value) } injetável

  const STORAGE_KEY = 'reflexoes';

  function keyOf(bookId, chapterId) {
    return `${bookId}::${chapterId}`;
  }

  // ---- Camada de armazenamento (localStorage ou injetado) ----
  function getStore() {
    if (store) return store;
    if (typeof globalThis !== 'undefined' && globalThis.localStorage) {
      return {
        get: (k) => {
          const v = globalThis.localStorage.getItem(k);
          return v ? JSON.parse(v) : null;
        },
        set: (k, v) => globalThis.localStorage.setItem(k, JSON.stringify(v))
      };
    }
    throw new Error('[Annotations] Nenhum storage disponível (injete um State ou defina global.localStorage).');
  }

  function getAll() {
    return getStore().get(STORAGE_KEY) || {};
  }

  function saveAll(data) {
    getStore().set(STORAGE_KEY, data);
  }

  // ---- Geração de ids ----
  function genId() {
    if (typeof globalThis !== 'undefined' && globalThis.crypto && typeof globalThis.crypto.randomUUID === 'function') {
      return globalThis.crypto.randomUUID();
    }
    return 'note-' + Date.now().toString(36) + '-' + Math.random().toString(36).slice(2, 8);
  }

  // ---- Sanitização (XSS) ----
  function sanitize(text) {
    if (typeof text !== 'string') text = String(text == null ? '' : text);
    if (typeof globalThis !== 'undefined' && globalThis.document && globalThis.document.createElement) {
      const div = globalThis.document.createElement('div');
      div.textContent = text;
      return div.innerHTML;
    }
    // Fallback Node: escapa < > & " '.
    return text
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');
  }

  // ---- CRUD ----
  function add(bookId, chapterId, text) {
    const reflexoes = getAll();
    const key = keyOf(bookId, chapterId);
    const list = Array.isArray(reflexoes[key]) ? reflexoes[key] : [];
    const note = {
      id: genId(),
      text: sanitize(text),
      createdAt: Date.now(),
      updatedAt: Date.now()
    };
    reflexoes[key] = [...list, note];
    saveAll(reflexoes);
    return note.id;
  }

  function remove(bookId, chapterId, noteId) {
    const reflexoes = getAll();
    const key = keyOf(bookId, chapterId);
    const list = Array.isArray(reflexoes[key]) ? reflexoes[key] : [];
    reflexoes[key] = list.filter((n) => n.id !== noteId);
    saveAll(reflexoes);
  }

  function update(bookId, chapterId, noteId, text) {
    const reflexoes = getAll();
    const key = keyOf(bookId, chapterId);
    const list = Array.isArray(reflexoes[key]) ? reflexoes[key] : [];
    reflexoes[key] = list.map((n) =>
      n.id === noteId ? { ...n, text: sanitize(text), updatedAt: Date.now() } : n
    );
    saveAll(reflexoes);
  }

  function get(bookId, chapterId) {
    const reflexoes = getAll();
    const list = reflexoes[keyOf(bookId, chapterId)];
    return Array.isArray(list) ? list : [];
  }

  // ---- Backup JSON (browser) ----
  function exportAll() {
    const data = getAll();
    if (typeof globalThis === 'undefined' || !globalThis.document || !globalThis.Blob || !globalThis.URL) {
      return JSON.stringify(data, null, 2); // em Node, retorna o JSON
    }
    const blob = new globalThis.Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = globalThis.URL.createObjectURL(blob);
    const a = Object.assign(globalThis.document.createElement('a'), {
      href: url,
      download: `reflexoes-backup-${new Date().toISOString().slice(0, 10)}.json`
    });
    a.click();
    globalThis.URL.revokeObjectURL(url);
    return url;
  }

  // ---- Sync com pasta local (FileSystemAccessAPI — só Chromium) ----
  async function syncToFolder() {
    if (typeof globalThis === 'undefined' || !globalThis.window || !('showDirectoryPicker' in globalThis.window)) {
      return false; // fallback tratado pelo chamador
    }
    const dir = await globalThis.window.showDirectoryPicker({ mode: 'readwrite' });
    const file = await dir.getFileHandle('reflexoes.json', { create: true });
    const writable = await file.createWritable();
    await writable.write(JSON.stringify(getAll(), null, 2));
    await writable.close();
    return true;
  }

  // ---- Injeção de store (testes) ----
  function setStore(s) {
    store = s;
  }

  return { keyOf, sanitize, add, remove, update, get, exportAll, syncToFolder, setStore };
})();

export default Annotations;
