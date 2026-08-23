# Sprint 1 — Refatoração CSS, Design System & Dark Mode

**Duração:** 2 semanas (primeiro ciclo).
**Objetivo:** estabelecer o Design System nativo e o suporte robusto a tema.

## Escopo
- [ ] B4 — `:root[data-theme="light"]` + toggle persistido em `localStorage`.
- [ ] B5 — `aria-*` nos controles, `:focus-visible`, contraste AA (escuro e claro).
- [ ] B3 — `loading="lazy"` + `decoding="async"` em `<img>` dos cards e capas.
- [ ] B1 (parcial) — normalizar classes de card/seção para todos os 15.

## Tarefas técnicas
1. Extrair todos os tokens de cor/raio/sombra para `:root`; declarar variáveis de
   tema claro em `:root[data-theme="light"]`.
2. Implementar `js/app.js` (ou `theme.js`): ler `matchMedia('(prefers-color-scheme:
   dark)')`, aplicar `data-theme` no `<html>`, gravar escolha do usuário.
3. Adicionar `:focus-visible` global e revisar contraste de todos os textos.
4. Conferir `loading="lazy"` em `biblioteca.js` (cards) e `livro.js` (capas).

## Critérios de Pronto
- Responsivo em 320 / 768 / 1024px.
- Toggle de tema funciona e persiste.
- Contraste AA validado por ferramenta de acessibilidade.
- Nenhuma dependência externa introduzida.
