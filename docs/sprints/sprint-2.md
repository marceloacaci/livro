# Sprint 2 — Camada de Dados, Grid Dinâmico, Leitor & Busca

**Duração:** 2 semanas (segundo ciclo).
**Objetivo:** desacoplar dados, renderizar via JS puro e entregar busca client-side.

## Escopo
- [ ] B11 — unificar domínio de reflexões/localStorage em um módulo (`LivroData`).
- [ ] B2 — busca/filtro na Home (`index.html`) sobre `MEU_BOLSO_BOOKS`.
- [ ] B8 — Modo Leitura Focada (Zen) no leitor.
- [ ] Migração para a camada canônica `js/data.js` + `js/main.js` + `js/reader.js`.

## Tarefas técnicas
1. **`js/data.js`** — ponto único de ingestão: expõe `window.LIVRO_DATA` e
   `window.LivroData.getBookById()/getAllBooks()/getBooksByGenre()`.
2. **`js/main.js`** (Home) — consumir `LivroData.getAllBooks()` para montar o grid
   (substituindo gradualmente `biblioteca.js`) e aplicar `filterByText()` em tempo real.
3. **`js/reader.js`** (Leitor) — resolver o livro via **Query Param** (`livro.html?id=<id>`)
   usando `LivroData.getBookById()`, além de micro-UX (barra de progresso, copiar citação,
   Zen mode) de forma aditiva.
4. **Wire `<script defer>`** para `data.js`, `main.js`, `reader.js` em ambos os HTMLs.
5. Manter retrocompatibilidade: `#slug` continua funcionando durante a transição.

## Critérios de Pronto
- Busca filtra os 15 livros em < 100ms.
- Leitor abre por `?id=` e por `#slug`.
- Sem duplicação de estado de reflexão.
- `node --check` passa em todos os arquivos JS novos.
