# Backlog e Planejamento de Sprints

Foco: **Vanilla JS** (HTML/CSS/JS puro) e **conteúdo**. Três sprints iniciais.
Tudo respeita a ausência de build.

---

## 1. Backlog do Produto

| ID | Item | Ganho de UX real | Sem build? |
|----|------|------------------|------------|
| B1 | Padronizar os 15 resumos (estrutura visual + de dados consistente) | Alto — leitura coerente | Sim |
| B2 | Busca/filtro client-side na biblioteca (JS puro) | Alto — acha livro em 15 | Sim |
| B3 | Lazy loading de imagens (`loading="lazy"`) | Médio — menos banda | Sim (atributo nativo) |
| B4 | Tema claro + toggle persistido (`localStorage`) | Alto — conforto/aceess. | Sim |
| B5 | Acessibilidade WCAG (foco, ARIA, contraste) | Alto — inclusão | Sim |
| B6 | Barra de progresso de leitura (topo `livro.html`) | Médio — orientação | Sim |
| B7 | "Copiar Citação" nos trechos destacados | Médio — compartilhar | Sim (Clipboard API) |
| B8 | Modo Leitura Focada (esconder header/footer ao rolar) | Médio — imersão | Sim |
| B9 | SEO: metadados (`description`, Open Graph) nos HTMLs | Médio — descoberta | Sim |
| B10| Deploy GitHub Pages | Alto — publicação | Sim |
| B11| Consolidar duplicação `app.js`/`livro.js` (localStorage/filtro) | Médio — manutenção | Sim |

---

## 2. Sprint Planning (3 sprints iniciais)

### Sprint 1 — CSS Responsivo + Acessibilidade + Tema
**Objetivo:** refatorar `css/styles.css` para responsividade total e acessibilidade
(WCAG) no tema claro/escuro.

- [ ] B4 — adicionar `:root[data-theme="light"]` e toggle com `localStorage`.
- [ ] B5 — `aria-*` nos controles, foco visível, contraste AA no tema escuro e claro.
- [ ] B3 — `loading="lazy"` em `<img>` dos cards e capas.
- [ ] B1 (parcial) — normalizar classes de card/seção para todos os 15.

**Critérios de pronto:** responsivo em 320 / 768 / 1024px; toggle de tema funciona
e persiste; contraste validado (ferramenta simples, ex.: extensão do navegador).

### Sprint 2 — Lógica JS (DOM) e Navegação
**Objetivo:** melhorar a manipulação do DOM em `livro.html`, transições suaves e
navegação intuitiva.

- [ ] B11 — unificar domínio de reflexões/localStorage em um módulo.
- [ ] B6 — barra de progresso de leitura (`scroll` + `requestAnimationFrame`).
- [ ] B2 — busca/filtro na biblioteca (`index.html`) sobre `MEU_BOLSO_BOOKS`.
- [ ] B8 — modo Leitura Focada (hide header/footer no scroll down).
- [ ] Melhorar transições de seção (`scroll-behavior`, `IntersectionObserver` p/ nav ativa).

**Critérios de pronto:** busca filtra os 15 livros em <100ms; nav ativa reflete
a seção visível; sem duplicação de estado de reflexão.

### Sprint 3 — SEO + Deploy + Revisão de Conteúdo
**Objetivo:** metadados SEO, deploy estático e revisão final dos 15 resumos.

- [ ] B9 — `<meta name="description">`, Open Graph, `lang`, títulos por livro.
- [ ] B10 — GitHub Pages (branch `master`, root).
- [ ] B1 (final) — revisão de consistência dos 15 resumos.
- [ ] B7 — "Copiar Citação" (Clipboard API nativa).

**Critérios de pronto:** site publicado em `https://<user>.github.io/livro/`;
meta tags presentes; copiar citação funciona sem biblioteca externa.

---

## 3. Definition of Done (vanilla)

- Sem dependências externas não declaradas (ver `quality-checklist.md`).
- Funciona abrindo `index.html` via `file://` **e** via `http.server`.
- Tema e layout validados em mobile/tablet/desktop.
- `localStorage` usado para preferências do usuário (tema, reflexões).
