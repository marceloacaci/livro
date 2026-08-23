# Arquitetura — Biblioteca de Reflexões (Vanilla, Zero-Build)

Este documento é o **blueprint técnico do cliente**. Descreve a separação de camadas,
a estratégia de dados e o ciclo de estado local. Tudo roda no navegador, sem servidor
de aplicação, sem banco de dados e sem etapa de compilação.

---

## 1. Separação de Camadas (HTML / CSS / JS puro)

O projeto respeita uma arquitetura em três camadas isoladas por responsabilidade:

```text
┌─────────────────────────────────────────────────────────────┐
│  APRESENTAÇÃO  — index.html, livro.html  (HTML5 semântico)   │
│  Estrutura e significado do conteúdo. Sem estilo ou lógica.  │
├─────────────────────────────────────────────────────────────┤
│  ESTILIZAÇÃO  — css/styles.css  (CSS Custom Properties)      │
│  Design System via :root. Tema Dark atual; Light é backlog. │
├─────────────────────────────────────────────────────────────┤
│  COMPORTAMENTO — js/*.js  (JavaScript ES5/ES6, IIFE)         │
│  Manipulação nativa do DOM, estado local, sem frameworks.    │
└─────────────────────────────────────────────────────────────┘
```

### Aplicando S.O.L.I.D. no JavaScript puro

Sem classes nem injeção de dependência de framework, aplicamos os princípios através de
**módulos escopados** (IIFE) e **responsabilidade única**:

| Princípio | Como aparece no código |
|-----------|------------------------|
| **S** — Responsabilidade Única | `biblioteca.js` só monta o grid; `livro.js` só renderiza o leitor; `app.js` só cuida de nav/filtro/persistência. |
| **O** — Aberto/Fechado | Novos livros entram via dados (`books.js`), sem editar a lógica de render. |
| **L** — Substituição de Liskov | Qualquer objeto de livro com a mesma "interface" (id/slug/title/...) é renderizável. |
| **I** — Segregação de Interface | Cada módulo consome apenas os campos de que precisa do objeto de livro. |
| **D** — Inversão de Dependência | A lógica depende da **fonte de dados abstrata** (`window.LIVRO_DATA`/`MEU_BOLSO_BOOKS`), não de uma implementação concreta de storage. |

> **Escopo de módulo:** cada arquivo JS é envolvido em `(function(){ 'use strict'; ... })();`
> para não vazar variáveis ao `window`, exceto os pontos de integração explícitos
> (`window.MEU_BOLSO_BOOKS`, `window.LIVRO_DATA`, `window.LivroData`).

---

## 2. Ingestão de Dados por Arquivo de Configuração

Os 15 resumos são um **array de objetos** em um arquivo estático dedicado. A camada de
dados é a única fonte de verdade; as views nunca conhecem a origem do dado.

### Atual (funcional)

- `js/books.js` define `window.MEU_BOLSO_BOOKS = [ { id, slug, title, ... }, ... ]`.
- Carregado via `<script src="js/books.js">` antes dos controladores.

### Alvo (camada canônica — `js/data.js`)

`js/data.js` normaliza o acesso e prepara a migração para `data/books.json` via `fetch`:

```js
// js/data.js — ponto único de ingestão
(function (global) {
  'use strict';
  var DATA = global.MEU_BOLSO_BOOKS || [];
  function getBookById(id) {
    return DATA.find(function (b) { return b.id === id || b.slug === id; }) || null;
  }
  function getAllBooks() { return DATA.slice(); }
  global.LIVRO_DATA = DATA;
  global.LivroData = { getBookById: getBookById, getAllBooks: getAllBooks };
})(window);
```

### Fluxo de ingestão

```text
js/books.js (MEU_BOLSO_BOOKS)
        │
        ▼
js/data.js (LIVRO_DATA + LivroData.getBookById)
        │
        ├──► js/biblioteca.js / main.js  → grid de cards (index.html)
        └──► js/livro.js / reader.js     → seções do livro (livro.html)
```

**Ganho:** adicionar o livro 16 significa apenas acrescentar um objeto em `books.js`
(ou, no futuro, em `data/books.json`). Nenhuma linha de HTML ou de lógica de render muda.

---

## 3. Estratégia de Cache e Estado Local

Dois estados do usuário persistem no navegador, sem backend:

### 3.1 Tema (Light / Dark)

Ciclo de vida do tema:

1. **Preferência do sistema** — na primeira visita, o JS consulta
   `window.matchMedia('(prefers-color-scheme: dark)')`.
2. **Escolha do usuário** — ao clicar no toggle, grava `localStorage.setItem('livro-theme', 'dark'|'light')`.
3. **Aplicação** — um atributo `data-theme` no `<html>` direciona as variáveis CSS:
   `:root[data-theme="light"] { --color-bg: #f5f7fb; ... }`.
4. **Reset** — se o usuário limpar a preferência, volta a `SystemDefault`.

```text
SystemDefault ──toggle──► UserDark ──toggle──► UserLight
      ▲                      │  ▲                  │  ▲
      └────── reset ─────────┘  └────── toggle ────┘  │
                                                      │
                                      reset ───────────┘
```

### 3.2 Reflexões do leitor

Cada reflexão é salva sob uma chave estável (ex.: `baby1`, `idea-3`, `verdadesmitos`)
em um único objeto JSON em `localStorage` (`biblioteca_reflexoes`). A leitura e a
escrita ocorrem apenas no cliente; não há sincronização com servidor por design.

```js
// Leitura
var raw = localStorage.getItem('biblioteca_reflexoes');
var reflexoes = raw ? JSON.parse(raw) : {};
// Escrita
reflexoes[step] = { text: texto, savedAt: new Date().toISOString() };
localStorage.setItem('biblioteca_reflexoes', JSON.stringify(reflexoes));
```

> **Privacidade:** nada sai do navegador. Não há analytics, não há chamadas de rede além
> do carregamento dos próprios arquivos estáticos.

---

## 4. Renderização Dinâmica (sem framework)

- **Home (`index.html`)**: `biblioteca.js` lê `MEU_BOLSO_BOOKS` e injeta o HTML dos cards
  no container `#booksGrid` via `innerHTML` (com escapamento de texto do usuário).
- **Leitor (`livro.html`)**: `livro.js` resolve o livro pelo `#slug` da URL, busca o
  objeto em `MEU_BOLSO_BOOKS` e injeta as seções (`sobre`, `ensinamentos`, `ideias`,
  `verdadesmitos`, `reflexoes`) via `innerHTML`.
- **Busca/Filtro**: `app.js` escuta `input` e filtra os cards em tempo real manipulando
  o DOM (`classList.toggle('book-hidden')`).

> **Migração planejada (Sprint 2):** trocar `#slug` por Query Param
> (`livro.html?id=<bookId>`) e consumir `LivroData.getBookById` a partir de `data.js`.

---

## 5. Restrições de Arquitetura (inegociáveis)

- ❌ Nenhum framework (React/Vue/Angular/Svelte).
- ❌ Nenhum bundler/compiler (Webpack/Vite/Turbo/Babel).
- ❌ Nenhum runtime backend ou banco de dados.
- ❌ Nenhum asset externo (CDN, fontes de terceiros, trackers).
- ✅ HTML semântico + CSS Variables + JavaScript modular nativo.
- ✅ `<script defer>` e `<img loading="lazy">` obrigatórios.
