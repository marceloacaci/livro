// js/search.js — Algoritmo de busca fuzzy custom, zero-deps (ESM, self-contained).
//
// NOTA: o comentário original do plano dizia "Fuse.js inline", mas NÃO é o
// algoritmo do Fuse.js — é um matcher de subsequência/substring próprio.
// Este módulo é aditivo e testável; NÃO é importado pelo site existente.
//
// Adaptado à realidade do catálogo (window.MEU_BOLSO_BOOKS):
//   - `genre` é uma STRING ("Finanças pessoais / Autoajuda"), não um array.
//   - Não há campo `chapters`; o "excerpt" usa titlePt/topic como fallback.
//
// Critério de performance: avisa (console.warn) se uma query demorar > 5ms.

export const Search = (() => {
  let index = [];

  function normalizeGenre(g) {
    if (Array.isArray(g)) return g.join(' ').toLowerCase();
    if (typeof g === 'string') return g.toLowerCase();
    return '';
  }

  function build(books) {
    index = (books || []).map((b) => ({
      id: b.id,
      title: (b.title || '').toLowerCase(),
      author: (b.author || '').toLowerCase(),
      genre: normalizeGenre(b.genre),
      excerpt: ((b.titlePt || b.topic || b.title || '')).toLowerCase(),
      _raw: b
    }));
    return index.length;
  }

  // score: 1.0 se needle é substring de hay; senão, razão de subsequência.
  function score(needle, hay) {
    if (!hay) return 0;
    if (hay.includes(needle)) return 1 - needle.length / hay.length;
    let n = needle.length, h = hay.length, i = 0, j = 0, matches = 0;
    while (i < n && j < h) {
      if (needle[i] === hay[j]) { matches++; i++; }
      j++;
    }
    return matches / n;
  }

  function query(q, limit = 20) {
    const t0 = (typeof performance !== 'undefined' ? performance.now() : Date.now());
    if (!q || q.length < 2) return [];
    const needle = q.toLowerCase();
    const results = index
      .map((item) => {
        const s = Math.max(
          score(needle, item.title) * 1.0,
          score(needle, item.author) * 0.8,
          score(needle, item.genre) * 0.6,
          score(needle, item.excerpt) * 0.4
        );
        return { book: item._raw, score: s };
      })
      .filter((r) => r.score > 0.3)
      .sort((a, b) => b.score - a.score)
      .slice(0, limit);

    const elapsed = (typeof performance !== 'undefined' ? performance.now() : Date.now()) - t0;
    if (elapsed > 5) console.warn(`[Search] ⚠️ ${elapsed.toFixed(2)}ms (>5ms)`);
    return results;
  }

  return { build, query };
})();

export default Search;
