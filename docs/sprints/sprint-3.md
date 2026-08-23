# Sprint 3 — UX Leve, SEO & Deploy

**Duração:** 2 semanas (terceiro ciclo).
**Objetivo:** polir a experiência, metadados e publicar continuamente.

## Escopo
- [ ] B6 — barra de progresso de leitura (`scroll` + `requestAnimationFrame`).
- [ ] B7 — "Copiar Citação" (Clipboard API nativa).
- [ ] B9 — `<meta name="description">`, Open Graph, `lang`, títulos por livro.
- [ ] B10 — GitHub Pages (branch `master`, root) via `.github/workflows/deploy.yml`.
- [ ] B1 (final) — revisão de consistência dos 15 resumos.

## Tarefas técnicas
1. Garantir que `reader.js` injeta a barra de progresso e os botões "Copiar" em todas
   as citações/blockquotes.
2. Injetar metadados SEO dinâmicos em `livro.js`/`reader.js` (`document.title`,
   `meta[name=description]`, tags `og:*`) a partir dos dados do livro.
3. Validar HTML/CSS (htmlhint), links quebrados (lychee) e diagramas (PlantUML) na CI.
4. Revisar os 15 resumos quanto a consistência de estrutura e tom.
5. Publicar via GitHub Actions a cada push em `master`.

## Critérios de Pronto
- Site publicado em `https://<usuario>.github.io/livro/`.
- Meta tags presentes e compartilháveis.
- Copiar citação funciona sem biblioteca externa.
- Pipeline verde em push para `master`.
