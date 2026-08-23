# Guia de Contribuição — Padrões de Código e Estilo Editorial

Este guia garante que o projeto permaneça **vanilla, leve e consistente** mesmo com
múltiplos contribuidores. Toda contribuição respeita a restrição de *zero-build*.

---

## 1. Convenções de Nomenclatura (sem framework)

### CSS — padrão BEM leve

Usamos **BEM (Block Element Modifier)** para evitar colisões e manter a legibilidade:

```css
/* Block */
.book-card { ... }

/* Element */
.book-card__cover { ... }
.book-card__title { ... }

/* Modifier */
.book-card--hidden { display: none; }
```

- Variáveis de tema vivem em `:root` com prefixo `--color-`, `--radius`, `--shadow`, etc.
- Estados de tema: `:root[data-theme="light"] { ... }`.
- Evite IDs para estilo; prefira classes. Use `js-` apenas para "hooks" de JavaScript
  (ex.: `.js-grid`, `#booksGrid` quando for alvo obrigatório de `getElementById`).

### JavaScript — nomenclatura semântica

- **Arquivos:** `kebab-case` (`biblioteca.js`, `reader.js`).
- **Funções:** `camelCase` com verbo de intenção: `renderGrid()`, `saveReflexao()`,
  `getBookById()`, `handleSearch()`.
- **Constantes:** `UPPER_SNAKE` (`STORAGE_KEY`, `SECTION_IDS`).
- **Escopo:** todo arquivo é uma IIFE com `'use strict'`; não vazar globais além dos
  pontos de integração documentados (`window.LIVRO_DATA`, `window.LivroData`).
- **Sem `var` solto em loop** — prefira `const`/`let` por bloco.

---

## 2. Design System de Leitura Confortável

O modo de leitura prioriza **legibilidade e baixa fadiga visual**:

| Tokens | Valor | Razão |
|--------|-------|-------|
| `--font-body` | `'Segoe UI', system-ui, sans-serif` | Fonte de sistema, zero download. |
| `--font-heading` | `Georgia, 'Times New Roman', serif` | Serifada para títulos — ritmo editorial. |
| `line-height` | `1.6` – `1.7` | Espaçamento confortável em parágrafos longos. |
| `max-width` do texto | `~900px` | Coluna de leitura ideal (~65–75 caracteres/linha). |
| Contraste | WCAG 2.1 **AA** (≥ 4.5:1 texto normal, ≥ 3:1 texto grande) | Acessibilidade. |

- Parágrafos usam `<p>`; citções usam `<blockquote>`; seções usam `<h2>`/`<h3>`.
- Espaçamento vertical entre parágrafos por `margin`, nunca por `<br>` soltos.
- Links e botões têm `:focus-visible` explícito para navegação por teclado.

---

## 3. Manual Prático do Contribuidor

### Adicionar um novo resumo (apenas dados)

1. Abra `js/books.js` (fonte única de `window.MEU_BOLSO_BOOKS`).
2. Acrescente um objeto ao array, seguindo o schema existente:

```js
{
  "id": "novolivro",
  "slug": "titulo-em-hifen",
  "title": "Original Title",
  "titlePt": "Título em Português",
  "author": "Autor",
  "year": "2020",
  "editionYear": "2021",
  "publisher": "Editora",
  "pages": "200",
  "genre": "Autoajuda",
  "language": "Inglês",
  "copiesSold": "1 milhão",
  "cover": "img/novolivro-cover.jpg",
  "topic": "hábitos",
  "myths": [ { type: 'truth', title: '...', text: '...', reflection: '...' } ],
  "chapters": [ { title: 'Capítulo 1', text: '...', points: [ 'Ideia', { t:'...', f:'...' } ] } ]
}
```

3. Coloque a capa em `img/` e referencie em `cover`.
4. O grid da Home e o leitor **passam a exibir o livro automaticamente** — nenhuma
   mudança em HTML ou lógica de render é necessária.

### Escrever o conteúdo (tags semânticas)

Use apenas marcação semântica; o CSS cuida da aparência:

```html
<h2>Seção</h2>
<p>Parágrafo com explicação.</p>
<blockquote>Citação de impacto do autor.</blockquote>
<ul><li>Ponto central 1</li><li>Ponto central 2</li></ul>
```

### Antes de abrir o Pull Request

- [ ] Rodou `python3 -m http.server 8077` e testou no navegador (desktop + mobile).
- [ ] Nenhum framework/bundler/CDN introduzido.
- [ ] Capas com `loading="lazy"`.
- [ ] `localStorage` usado apenas para tema e reflexões.
- [ ] Contraste AA verificado (extensão de acessibilidade do navegador).
- [ ] `node --check` em qualquer arquivo JS novo (sintaxe válida).
