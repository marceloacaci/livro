# Checklist de Qualidade Vanilla (V1.0)

Critérios obrigatórios de aceitação para manter o projeto **limpo, leve e sem build**.
Todo Pull Request deve passar por este checklist antes do merge.

---

## 1. Performance & Carregamento

- [ ] **Scripts com `defer`** — todo `<script>` usa `defer` (ou é colocado antes de
      `</body>`), para não bloquear o parsing do HTML.
- [ ] **Lazy loading nativo** — todas as capas de livro usam `<img loading="lazy"
      decoding="async">`.
- [ ] **Sem JavaScript externo** — nenhum CDN, nenhum tracker, nenhuma lib de terceiros.
- [ ] **Sem CSS externo** — nenhum framework de UI (Bootstrap, Tailwind CDN, etc.).
- [ ] **Sem fontes de terceiros** — apenas fontes de sistema (`system-ui`, `Georgia`...).
- [ ] **Peso de página mínimo** — o conjunto HTML+CSS+JS de uma view cabe em poucos KB.

## 2. Código & Arquitetura

- [ ] **Zero build** — abre via `file://` ou `python3 -m http.server`, sem compilar.
- [ ] **Separação de camadas** — HTML (estrutura), CSS (estilo), JS (comportamento).
- [ ] **Responsabilidade única** — cada módulo JS faz uma coisa.
- [ ] **Escopo isolado** — IIFE + `'use strict'`; globais só nos pontos documentados.
- [ ] **Dados desacoplados** — novos livros entram via `books.js`/`data.js`, sem tocar
      na lógica de render.
- [ ] **Sem vazamento de variáveis** para o escopo global acidentalmente.

## 3. Acessibilidade (WCAG 2.1 AA)

- [ ] **Contraste AA** — texto normal ≥ 4.5:1, texto grande ≥ 3:1.
- [ ] **Foco visível** — `:focus-visible` explícito em links, botões e inputs.
- [ ] **ARIA** — `aria-label`, `aria-expanded`, `role` onde o HTML semântico não basta.
- [ ] **Navegação por teclado** — todo controle alcançável e operável via Tab/Enter.
- [ ] **Imagens** — `alt` descritivo em todas as capas e ícones informativos.
- [ ] **`lang`** — `<html lang="pt-BR">` presente.

## 4. Animações & Transições

- [ ] **Propriedades aceleradas por hardware** — apenas `opacity`, `transform`,
      `background-color` em transições/animações.
- [ ] **Sem `layout thrash`** — evitar animar `width`/`height`/`top`/`left`.
- [ ] **`prefers-reduced-motion`** — respeitar quem pede menos movimento (backlog leve).
- [ ] **Hover = apenas lift + sombra** — nunca troca cor de fundo/borda no hover
      (convenção de UX do projeto), salvo exceções documentadas.

## 5. Estado & Persistência

- [ ] **`localStorage`** usado só para tema e reflexões do usuário.
- [ ] **Tratamento de erro** — `JSON.parse`/`setItem` envolvidos em `try/catch`.
- [ ] **Sem chamadas de rede** além do carregamento dos próprios arquivos estáticos.

## 6. Validação Contínua (CI)

- [ ] HTML validado pelo `htmlhint` na pipeline.
- [ ] Links checados pelo `lychee` (sem links quebrados).
- [ ] Diagramas PlantUML compilam na pipeline (`.puml` → PNG).
- [ ] Deploy automático no GitHub Pages a cada push em `master`.
