# Arquitetura — Biblioteca de Reflexões (v2.1)

> Documentação da arquitetura **REAL** do projeto (não do plano greenfield).
> Stack: Vanilla JS · CSS Variables · HTML5 · localStorage · FileSystemAccessAPI.

## C4 — Contexto

O usuário (leitor) acessa o site estático (GitHub Pages) pelo navegador. Toda a
lógica roda no cliente; **não há backend, não há CDN, não há analytics**. As
reflexões do leitor ficam no próprio navegador.

## C4 — Containers

- **Site estático** (`index.html`, `livro.html`): catálogo + leitor.
- **Armazenamento do navegador**: `localStorage` (reflexões) +
  `FileSystemAccessAPI` (export para pasta local, só Chromium) + download de JSON.

## C4 — Componentes (módulos `js/`)

| Arquivo | Papel | Tipo |
|---|---|---|
| `js/books.js` | Catálogo de 123 livros | **Não-ESM**: `window.MEU_BOLSO_BOOKS = [...]` |
| `js/app.js` | Render do catálogo e busca inline | script global |
| `js/reader.js` | Controller do `livro.html` | script global |
| `js/theme.js` / `js/book-theme.js` | Tema dark/light via CSS vars | script global |
| `js/main.js` / `js/data.js` / `js/livro.js` | Boot, dados, leitor aux | script global |
| `js/search.js` | **NOVO** busca fuzzy custom (ESM, aditivo) | ESM |
| `js/annotations.js` | **NOVO** CRUD multi-nota (ESM, aditivo) | ESM |
| `css/styles.css` | Estilos via CSS variables | CSS |

### ADR-002 — Catálogo não-ESM

O catálogo é carregado como `window.MEU_BOLSO_BOOKS = [...]` (atribuição global),
**não** via `export const BOOKS`. Em Node, `window` é `undefined`, então os
scripts de QA (`scripts/lint-books.js`, `scripts/verify-biblioteca.js`) carregam
o arquivo via `vm` com um **stub de `window`**, lendo a constante real. A contagem
de livros é **derivada de `MEU_BOLSO_BOOKS.length`**, nunca hardcoded.

### ADR-003 — Persistência de reflexões

- `localStorage` (chave `reflexoes`): objeto onde cada chave é
  `${bookId}::${chapterId}` e o valor é um **array** de notas
  (`{ id, text, createdAt, updatedAt }`).
- Sanitização XSS em todo `text` (`annotations.js → sanitize()`).
- Backup exportável (`exportAll()` → download JSON) e sincronização com pasta
  local (`syncToFolder()` via FileSystemAccessAPI).

### ADR-004 — Tema

Tema dark/light controlado por CSS variables em `:root` / `[data-theme]`,
alternado por `js/theme.js`, persistido no `localStorage`.

## Qualidade (DevSecOps)

- `npm run qa` = `lint:syntax` (node --check) → `lint:schema` → `verify` → `test`.
- `node:test` zero-dependency para `search.js` e `annotations.js`.
- CI/CD GitHub Actions: quality-gate + Lighthouse budget + deploy Pages.
- **CSP** via `<meta http-equiv>` (GitHub Pages não suporta headers customizados).
- **⚠️ O site PRECISA rodar via servidor estático** (`python3 -m http.server 8000`),
  não abrindo o HTML via `file://` (o `fetch()` falha por CORS).
