# Guia de Contribuição de Conteúdo

Como adicionar um novo resumo de livro **mantendo o padrão vanilla**, sem quebrar
a estrutura estática. Passo a passo.

> Pré-requisito: o site é 100% estático. Não existe backend. Tudo é HTML/CSS/JS
> puro. Para adicionar conteúdo, você edita **um array JS** — não precisa de
> build nem de framework.

---

## Passo 1 — Adicionar o objeto do livro em `js/books.js`

Abra `js/books.js`. Ele começa com `window.MEU_BOLSO_BOOKS = [`. Adicione um
novo objeto ao final do array (antes do `];` final), seguindo o schema dos 15
existentes.

Campos obrigatórios:

```js
window.MEU_BOLSO_BOOKS = [
  /* ... 15 livros existentes ... */
  {
    "id": "meu-livro",                       // curto, único (usado internamente)
    "slug": "titulo-do-meu-livro",           // usado na URL: livro.html#titulo-do-meu-livro
    "title": "Título Original",              // idioma original
    "titlePt": "Título em Português",        // exibido na UI
    "author": "Autor",
    "year": "2020",
    "editionYear": "2021",
    "publisher": "Editora",
    "pages": "200",
    "genre": "Autoajuda / Hábitos",
    "language": "Inglês",
    "copiesSold": "—",
    "cover": "img/meu-livro-cover.jpg",      // coloque a imagem em /img
    "topic": "hábitos",
    "summary": "Resumo curto exibido no card e no hero.",
    "color": "#7b2dff",                       // cor de destaque do livro
    "file": "livro.html#titulo-do-meu-livro", // link de acesso
    "citacoes": [ { "texto": "...", "autor": "...", "obra": "..." } ],
    "citacoesTerceiros": [ { "texto": "...", "autor": "...", "fonte": "..." } ],
    "sections": [ "sobre", "ensinamentos", "ideias", "verdadesmitos", "reflexoes" ],
    "ensinamentos": [ { "number": "1", "title": "...", "text": "...", "explicacoes": ["..."] } ],
    "chapters": [ { "title": "...", "text": "...", "points": [ { "t":"...", "e":"...", "f":"...", "real":true } ] } ],
    "myths": [ { "type":"truth", "title":"...", "text":"...", "reflection":"..." } ],
    "stepLabels": {}
  }
];
```

**Regras:**
- `slug` deve ser único e em kebab-case (minúsculas, hífens).
- `id` deve ser único e curto.
- Use aspas duplas nos campos de string (padrão do arquivo).
- `myths[].type` só aceita `"truth"` ou `"myth"`.

---

## Passo 2 — Adicionar a capa em `/img`

Coloque o arquivo da capa em `img/` e referencie em `cover`. Formatos: `.jpg`,
`.png`. Recomendado: ~400×600px, < 200KB.

---

## Passo 3 — (Recomendado) Atualizar a sidebar de `index.html`

> ⚠️ **Atenção:** a sidebar de `index.html` lista os livros **manualmente**.
> Para o novo livro aparecer nela, adicione um `<li>`:
>
> ```html
> <li><a href="livro.html#titulo-do-meu-livro" class="sidebar-link">
>   <span class="menu-dot" style="background:#7b2dff"></span> Título em Português</a></li>
> ```
>
> **Melhor prática futura (Sprint 2/3):** gerar essa lista via JS a partir de
> `MEU_BOLSO_BOOKS`, para que adicionar livro não exija tocar no HTML. Até lá,
> edite manualmente.

O grid (`#booksGrid`) já é montado por `js/biblioteca.js` a partir de
`MEU_BOLSO_BOOKS` — então o card aparece **automaticamente** no grid.

---

## Passo 4 — Testar localmente

```bash
python -m http.server 8077
# abra http://localhost:8077
```

1. O novo card aparece no grid de `index.html`?
2. Clicar nele abre `livro.html#titulo-do-meu-livro` com o conteúdo certo?
3. As seções (Sobre, Ensinamentos, Verdades/Mitos, Reflexões) renderizam?
4. Escrever uma reflexão e recarregar a página a mantém? (`localStorage`)

---

## Passo 5 — Commit

```bash
git add -A
git commit -m "content: adiciona resumo de <Título>"
git push
```

---

## Convenções de Conteúdo

- Texto em **pt-BR**.
- `summary`: 1–2 frases.
- `myths`: equilibrar verdades e mitos.
- Respeite a estrutura de seções — não invente novas sem atualizar `sections[]`.
