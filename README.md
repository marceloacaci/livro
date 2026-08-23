# LIVRO — Biblioteca de Reflexões

Biblioteca digital **estática, responsiva e de peso ultrabaixo** contendo os resumos de
**15 livros de autoajuda** (finanças, hábitos, filosofia, produtividade e IA). Cada
resumo oferece um *ambiente de reflexões*: o leitor escreve anotações que ficam salvas
localmente no navegador (`localStorage`), sem backend, sem conta, sem rastreadores.

> **Filosofia de projeto:** Vanilla puro. HTML semântico + CSS com *custom properties* +
> JavaScript modular (ES5/ES6 IIFE, `strict mode`). **Zero frameworks, zero bundlers,
> zero build step.** O navegador consome os arquivos diretamente.

---

## Visão Geral do Produto

- **O que é:** site de leitura de resumos, 100% client-side.
- **Peso de página:** nenhum asset externo (sem CDN, sem fontes de terceiros, sem trackers);
  o CSS e o JS são arquivos locais minúsculos em relação a libs de UI.
- **Conteúdo:** 15 livros; cada um com Sobre, Ensinamentos, Ideias Centrais, Verdades/Mitos
  e um bloco de Reflexões persistidas.
- **Deploy:** GitHub Pages (hospedagem estática gratuita, sem pipeline de compilação).

---

## Setup e Execução (sem dependências)

O projeto não exige `npm install`, Webpack, Vite ou qualquer etapa de compilação. Basta
servir a pasta com qualquer servidor estático de uma linha:

```bash
# Opção A — Python (já vem no macOS/Linux; no Windows use o Python do PATH)
python3 -m http.server 8077
# abra http://localhost:8077

# Opção B — Node (sem instalar nada globalmente, usa o npx efêmero)
npx serve -p 8077
# abra http://localhost:8077
```

> Alternativa sem servidor: abrir `index.html` direto no navegador (`file://`) também
> funciona, pois os dados são um script JS global — não há `fetch`/CORS.

---

## Árvore do Projeto

```text
LivRO/
├── index.html            # Home: hero + grid de cards (renderizado por JS)
├── livro.html            # Leitor: view genérica; roteamento atual por #slug, migração p/ ?id= (Sprint 2)
├── css/
│   └── styles.css        # Design System baseado em CSS Variables (tema Dark atual)
├── js/
│   ├── books.js          # DADOS: window.MEU_BOLSO_BOOKS (15 livros, hardcoded)
│   ├── biblioteca.js     # Apresentação: monta os cards do grid em index.html
│   ├── livro.js          # Leitor: resolve o livro e renderiza as seções
│   ├── app.js            # Comportamento global: nav mobile, filtro, localStorage
│   ├── book-theme.js     # Template de configuração de tema por livro
│   ├── data.js           # Camada canônica de ingestão (getBookById/getAllBooks/getBooksByGenre)
│   ├── main.js           # Controlador da Home (grid + nav + busca client-side) — Sprint 2
│   └── reader.js         # Controlador do Leitor (progresso, copiar citação, Zen) — Sprint 2
├── img/                  # Capas dos 15 livros
├── docs/                 # Documentação técnica, arquitetura, UML, sprints
├── assets/
│   └── wireframes/       # Wireframes de baixa fidelidade
└── .github/
    └── workflows/
        └── deploy.yml    # CI: validação + links + diagramas + deploy GitHub Pages
```

### Papel de cada camada

| Artefato | Camada | Responsabilidade |
|----------|--------|-----------------|
| `index.html`, `livro.html` | Apresentação | Marcação semântica semântica (HTML5). |
| `css/styles.css` | Estilo | Design System via `:root` (cores, raio, sombras, fontes). |
| `js/books.js` → `js/data.js` | Dados | Fonte única dos 15 resumos (array de objetos). |
| `js/biblioteca.js` / `js/main.js` | Comportamento | Renderização do grid e navegação da Home. |
| `js/livro.js` / `js/reader.js` | Comportamento | Renderização das seções e reflexões do leitor. |
| `js/app.js` | Comportamento | Filtro de livros, nav mobile, persistência `localStorage`. |

> **Nota de arquitetura:** a fundação v1.0 entrega a documentação/arquitetura/CI completas.
> Os módulos `data.js`/`main.js`/`reader.js` já existem como a **camada canônica-alvo**;
> a migração do app atual para consumi-los — incluindo a **transição de roteamento
> `#slug` → `?id=`** (ex.: `livro.html?id=ramsey`) — está planejada no Sprint 2
> (ver `docs/sprints/sprint-2.md`). Durante a transição ambos os formatos são aceitos,
> para não quebrar links existentes.
>
> **Estado do ambiente (verificado):** working tree limpa, `master` em dia com
> `origin/master`, sem alterações locais não-subidas. O código local do usuário, quando
> houver, deve ser protegido antes de qualquer atualização — ver `docs/sprints/sprint-1.md`
> (Módulo 0: `git stash` / branch de trabalho).

---

## Documentação (`/docs`)

| Arquivo | Conteúdo |
|---------|----------|
| `docs/architecture.md` | Blueprint cliente: camadas, SOLID no JS puro, ingestão de dados, cache/estado. |
| `docs/contribution-guide.md` | Padrões de código (BEM), Design System de leitura, manual do contribuidor. |
| `docs/quality.md` | Checklist obrigatório de qualidade vanilla (defer, lazy, sem externos). |
| `docs/chronogram.md` | Cronograma físico (Gantt Mermaid, 3 semanas) e recursos. |
| `docs/brainstorm.md` | Brainstorm de micro-UX e matriz de viabilidade sem dependências. |
| `docs/uml/*.puml` | Diagramas PlantUML: navegação, estados do client-side, componentes lógicos. |
| `docs/sprints/*.md` | Backlog + planejamento das 3 primeiras sprints. |

---

## Como publicar no GitHub Pages

1. No repositório GitHub: **Settings → Pages → Source: GitHub Actions**.
2. O workflow `.github/workflows/deploy.yml` faz deploy automático da branch `master`.
3. URL: `https://<usuario>.github.io/livro/`.

---

## Princípios de Performance (WPO)

- **Sem JavaScript externo** — todo o comportamento é código próprio servido localmente.
- **Sem CSS de terceiros** — Design System próprio em `styles.css`.
- **Lazy loading nativo** — `<img loading="lazy">` em todas as capas (economia de banda).
- **Scripts com `defer`** — parsing de HTML não é bloqueado.
- **Transições aceleradas por hardware** — apenas `opacity`, `transform`, `background-color`.
- **Estado mínimo** — só o essencial (`tema`, `reflexões`) persiste em `localStorage`.
