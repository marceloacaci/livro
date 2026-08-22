# Livro — Biblioteca de Reflexões (site estático)

Biblioteca digital estática contendo **15 resumos de livros de autoajuda**, com
ambiente de leitura interativo (seções, verdades/mitos, cotações e reflexões
persistidas localmente).

> Documentação técnica completa em [`docs/`](docs/). Diagramas em
> [`docs/diagrams/`](docs/diagrams/). Wireframes em [`assets/wireframes/`](assets/wireframes/).

---

## Visão Geral

- **O que é:** um site de leitura de resumos de livros, 100% client-side.
- **Conteúdo:** 15 livros (finanças, hábitos, filosofia, produtividade, IA).
- **Diferencial:** cada livro tem um "ambiente de reflexões" — o leitor escreve
  anotações que ficam salvas no próprio navegador (`localStorage`), sem backend.
- **Deploy:** GitHub Pages (hospedagem estática gratuita, sem build).

## Stack Tecnológica

Reforço explícito: **HTML + CSS + JavaScript vanilla, sem dependências de build
ou frameworks pesados.**

| Camada            | Tecnologia                                   | Observação                          |
|------------------|----------------------------------------------|-------------------------------------|
| Marcação          | HTML5 semântico                              | `index.html`, `livro.html`          |
| Estilo            | CSS3 com *custom properties* (`:root`)       | Sem pré-processador, sem Tailwind   |
| Comportamento     | JavaScript ES5/ES6 (IIFE, `strict mode`)     | Sem bundler, sem React/Vue          |
| Dados             | Array JS em `window.MEU_BOLSO_BOOKS`         | Hardcoded em `js/books.js`          |
| Persistência      | `localStorage` (Web API nativa)              | Reflexões do usuário, sem servidor  |
| Servidor local    | `python -m http.server` (qualquer static)    | Não obrigatório p/ abrir o arquivo  |

**Restrição de arquitetura:** nada de NPM, Webpack, Vite, Babel ou qualquer
passo de compilação. O navegador consome os arquivos diretamente.

## Instruções de Execução

Servir localmente em `http://localhost:8077`:

```bash
# Na raiz do projeto
cd /caminho/para/Livro
python -m http.server 8077
# abra http://localhost:8077 no navegador
```

Alternativa sem servidor: abrir `index.html` direto no navegador (funciona,
pois não há `fetch`/CORS — os dados são um script JS global).

## Estrutura de Arquivos

```
Livro/
├── index.html            # Biblioteca: hero + grid de cards (#booksGrid) + sidebar
├── livro.html            # Leitura: página GENÉRICA que renderiza 1 livro por #slug
├── css/
│   └── styles.css        # Tema "Neon Dark Blue" via variáveis CSS (:root)
├── js/
│   ├── books.js          # DADOS: window.MEU_BOLSO_BOOKS (15 livros, hardcoded)
│   ├── biblioteca.js     # Monta os cards do grid em index.html
│   ├── livro.js          # Resolve o livro (#slug) e renderiza as seções
│   ├── app.js            # Nav mobile, filtro por livro, localStorage de reflexões
│   └── book-theme.js     # Template de configuração de tema por livro
├── img/                  # Capas dos 15 livros
└── docs/                 # Documentação técnica (ver abaixo)
```

### Função de cada artefato

- **`index.html`** — Página de entrada. Contém o *hero*, o container
  `#booksGrid` (preenchido por `biblioteca.js`) e a sidebar com links fixos
  para os 15 livros (cada um aponta para `livro.html#<slug>`).
- **`livro.html`** — Página de leitura **genérica**. Não contém conteúdo
  estático por livro; `livro.js` lê o `#slug` da URL, busca o objeto em
  `MEU_BOLSO_BOOKS` e injeta as seções (Sobre, Ensinamentos, Verdades/Mitos,
  Reflexões) via `innerHTML`.
- **`css/styles.css`** — Estilos centralizados. Tema atual definido por
  variáveis em `:root` (cores, raio, sombras, fontes). **Somente o tema escuro
  ("Neon Dark Blue") está implementado**; o tema claro é item de backlog.
- **`js/`** — Toda a lógica. Separação clara entre **dados** (`books.js`),
  **apresentação dinâmica** (`biblioteca.js`, `livro.js`) e **comportamento
  global** (`app.js`).

## Documentação (`/docs`)

| Arquivo                              | Conteúdo                                        |
|--------------------------------------|-------------------------------------------------|
| `docs/architecture.md`               | UML/fluxo: navegação, estados de tema, componentes |
| `docs/diagrams/`                     | Arquivos Mermaid standalone (nav, tema, componentes) |
| `docs/sprints.md`                    | Backlog + planejamento de 3 sprints              |
| `docs/brainstorm.md`                 | Ideias leves (vanilla) e expansão de conteúdo    |
| `docs/timeline.md`                  | Cronograma Gantt de 3 semanas                    |
| `docs/contribution-guide.md`        | Como adicionar um novo resumo mantendo o padrão  |
| `docs/quality-checklist.md`         | Checklist de qualidade vanilla                  |

## Como publicar no GitHub Pages

1. No repositório GitHub: **Settings → Pages**.
2. Source: branch `master` (ou `main`) / pasta `root`.
3. Aguarde o deploy (alguns minutos). A URL será
   `https://<usuario>.github.io/livro/`.

## Notas

- `.claude/`, `.impeccable/` e `node_modules/` são ignorados (tooling local).
- `verify-*.js` são scripts de checagem local, não fazem parte do site.
- O tema claro/escuro citado no planejamento **ainda não existe no CSS** —
  ver `docs/sprints.md` (Sprint 1) e `docs/architecture.md` (estado de tema).
