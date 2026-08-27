# Biblioteca de Reflexões

Site estático, **zero-build / zero-dependency / zero-backend / privacy-first**,
com resumos de livros de autoajuda (finanças, hábitos, filosofia, produtividade e
IA) e um ambiente de **reflexões pessoais** salvas 100% no navegador.

> ⚠️ **IMPORTANTE — como rodar localmente**
>
> O site usa `fetch()` para carregar dados. Abrir o `index.html` diretamente
> pelo **`file://`** **NÃO funciona** (o navegador bloqueia por CORS).
> Sempre rode um **servidor estático local**:
>
> ```bash
> python3 -m http.server 8000
> # ou:  python -m http.server 8000
> ```
>
> Depois abra: http://localhost:8000/index.html

## Comandos (npm)

O projeto é **zero-dependency** — nenhum `npm install` é necessário.

```bash
npm run lint:syntax   # node --check em js/*.js
npm run lint:schema   # valida o catálogo (js/books.js) via scripts/lint-books.js
npm run verify        # integridade das capas (scripts/verify-biblioteca.js)
npm run test          # testes unitários zero-dep (node:test)
npm run qa            # lint:syntax && lint:schema && verify && test
```

## Estrutura

```
index.html · livro.html        # Home (catálogo + busca) e Leitor
css/styles.css                 # Estilos (CSS variables, tema dark/light)
js/books.js                    # Catálogo (window.LIVRO_BOOKS = [...])
js/search.js                   # Busca fuzzy custom (NOVO, ESM, aditivo)
js/annotations.js              # CRUD multi-nota (NOVO, ESM, aditivo)
scripts/                       # QA Node (lint-books, verify-biblioteca, check-syntax)
tests/                         # Testes unitários zero-dep (search, annotations)
.github/workflows/ci-cd.yml    # Pipeline DevSecOps (quality-gate + deploy Pages)
docs/                          # ARCHITECTURE.md, CONTENT_SOURCES.md
```

## Origem do conteúdo

Cada livro é um **resumo original / reflexão própria** do autor — **não** há
texto integral protegido hospedado. Veja `docs/CONTENT_SOURCES.md`.

## Privacidade & Segurança

- 0 requests externos (sem CDN, sem analytics, sem fonts do Google).
- Reflexões salvas apenas em `localStorage` / pasta local do usuário.
- CSP via `<meta http-equiv>` em `index.html` e `livro.html`.
- Sanitização XSS em todo input de anotação (`annotations.js → sanitize()`).
