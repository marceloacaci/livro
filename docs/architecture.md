# Arquitetura — Biblioteca de Reflexões (vanilla)

Documento técnico da arquitetura atual do projeto **Livro**. O foco é manter a
natureza *vanilla* (HTML + CSS + JS puro, sem build). Tudo o que está marcado
como **BACKLOG** não existe ainda no código e é tratado em `sprints.md`.

---

## 1. Visão de Alto Nível

O projeto é um site estático de duas páginas:

- **`index.html`** — Biblioteca (entrada).
- **`livro.html`** — Leitura (página genérica, 1 livro por URL `#slug`).

A fonte de dados é um **array global** em `js/books.js`:

```js
window.MEU_BOLSO_BOOKS = [ /* 15 objetos de livro */ ];
```

Não há `fetch`, `XMLHttpRequest` nem JSON externo. O navegador carrega
`books.js` como `<script>` e o restante da app consome `window.MEU_BOLSO_BOOKS`.

> **Decisão arquitetural:** manter os dados em JS em vez de `data.json` + `fetch`
> evita CORS ao abrir `index.html` via `file://` (sem servidor). Custo: editar
> dados exige tocar em `books.js`. Mitigado pelo guia de contribuição.

---

## 2. Diagrama de Navegação (Fluxo do Usuário)

Ver [`diagrams/nav-flow.mmd`](diagrams/nav-flow.mmd).

Fluxo resumido:

```
index.html  ──(clique no card: livro.html#<slug>)──▶  livro.html
   │                                                        │
   │  grid montado por js/biblioteca.js                     │  js/livro.js resolve #slug
   │  a partir de MEU_BOLSO_BOOKS                            │  e renderiza as seções
   ▼                                                        ▼
 sidebar com 15 links fixos ──────────────── Voltar p/ biblioteca ──▶ index.html
```

- O grid `#booksGrid` é populado em tempo de execução (`biblioteca.js`).
- Cada card é um `<a href="livro.html#<slug>">`.
- Em `livro.html`, `livro.js` faz `books.find(b => b.slug === id)`.

---

## 3. Diagrama de Estados (Lógica de Tema)

Ver [`diagrams/theme-states.mmd`](diagrams/theme-states.mmd).

**Estado atual (real):** apenas o tema **escuro** ("Neon Dark Blue") está
implementado, via variáveis em `:root` em `css/styles.css`. Não há toggle
claro/escuro nem persistência de tema.

**Estado desejado (BACKLOG — Sprint 1):**

| Gatilho                 | Transição              | Onde vive                       |
|-------------------------|------------------------|---------------------------------|
| 1ª visita               | ler `prefers-color-scheme` | JS na carga                 |
| clique no toggle        | troca classe `data-theme` no `<html>` | JS + CSS `[data-theme=light]` |
| troca de tema           | salvar em `localStorage` | JS (`app.js`)                |
| próxima visita          | aplicar tema salvo     | JS na carga                     |

**Estratégia de temas (recomendada, vanilla):**
- **Fontes de verdade:** variáveis CSS em `:root` (cores) + estado em JS
  (atributo `data-theme` no `<html>`).
- **Não** usar JS para setar cor por cor (viola separação). JS só troca o
  atributo; o CSS reage às variáveis.
- Tema claro = bloco `:root[data-theme="light"] { --color-bg: ...; }`.

---

## 4. Diagrama de Componentes Lógicos

Ver [`diagrams/components.mmd`](diagrams/components.mmd).

Separação em três camadas:

### 4.1 Camada de Apresentação (HTML + CSS)
- **HTML:** `index.html` (hero, grid, sidebar), `livro.html` (esqueleto de
  seções vazias preenchidas por JS).
- **CSS:** `css/styles.css` — *custom properties* em `:root`, layout (navbar
  sticky, grid, sidebar, cards), tema escuro.

### 4.2 Camada de Comportamento (JS)
| Arquivo            | Responsabilidade                                   |
|--------------------|----------------------------------------------------|
| `js/books.js`      | Dados: `window.MEU_BOLSO_BOOKS` (15 livros).        |
| `js/biblioteca.js` | Monta os cards do grid em `index.html`.             |
| `js/livro.js`      | Resolve `#slug`, renderiza seções em `livro.html`.  |
| `js/app.js`        | Nav mobile, filtro por livro, `localStorage`.      |
| `js/book-theme.js` | Template de configuração de tema por livro.         |

> **Ponto de atenção (descoberto na auditoria):** `app.js` e `livro.js` contêm
> lógicas sobrepostas (filtro por livro, scroll-spy de nav, `localStorage`).
> Recomenda-se consolidar o domínio de reflexões/localStorage em um único
> módulo (`app.js` ou um `storage.js`) para evitar duplicação — ver `sprints.md`.

### 4.3 Estado do Navegador
- **`localStorage`** chave `biblioteca_reflexoes` (com migração da legada
  `meubolso_reflexoes`): armazena as reflexões do usuário por `step`.
- **URL `#slug`**: identifica qual livro `livro.html` deve renderizar.

---

## 5. Modelo de Dados (livro)

Cada entrada de `MEU_BOLSO_BOOKS` possui (campos observados no código):

```
id, slug, title, titlePt, author, year, editionYear, publisher,
pages, genre, language, copiesSold, cover, topic, summary, color,
file, citacoes[], citacoesTerceiros[], sections[], ensinamentos[],
chapters[], myths[], stepLabels{}
```

Renderização dinâmica em `livro.js`:
- `sobre` ← metadados + citações.
- `ensinamentos` ← `book.ensinamentos`.
- `verdadesmitos` ← `book.myths` (badges Verdade/Mito + reflexão).
- `reflexoes` ← `localStorage` (campo de texto por seção/step).

---

## 6. Restrições e Não-Objetivos

- **Sem backend, sem banco de dados.** Reflexões são locais ao navegador.
- **Sem build.** Nenhum passo de compilação; o navegador consome os arquivos.
- **Sem framework.** Nada de React/Vue/jQuery. DOM manipulado via API nativa.
- **Acessibilidade (WCAG)** é objetivo de Sprint 1, não estado atual.

---

## 7. Riscos Arquiteturais (honestidade técnica)

1. `books.js` tem ~360KB (15 livros grandes). Sem *code splitting* (não há
   build), mas é aceitável para site estático; lazy-load de imagens (Sprint 1)
   reduz o peso percebido.
2. HTML de `livro.html` é injetado via `innerHTML` a partir de `books.js`.
   Conteúdo é controlado pelo autor (confiável), então risco de XSS é baixo —
   mas `app.js` faz `escapeHtml` corretamente nas reflexões do usuário. Manter
   esse padrão ao adicionar campos dinâmicos.
3. Tema claro e toggle de tema **não existem** — tratar como feature, não bug.
