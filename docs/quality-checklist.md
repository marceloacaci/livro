# Checklist de Qualidade (Vanilla)

Validação antes de commitar/marcar pronto. Foco: manter a natureza *vanilla*
(sem build, sem framework) e garantir robustez.

## 1. Compatibilidade de Navegadores
- [ ] Funciona em **Chrome, Firefox, Edge, Safari** (últimas 2 versões maiores).
- [ ] Funciona em **mobile e desktop** (testar 320px, 768px, 1024px+).
- [ ] APIs usadas são nativas e suportadas (sem polyfill obrigatório):
  - `localStorage` ✅
  - `navigator.clipboard` ✅ (contexto seguro: HTTPS/localhost)
  - `IntersectionObserver` ✅ (opcional, com fallback de scroll)
  - `fetch`/`XMLHttpRequest` ❌ **não usados** (dados em JS global)

## 2. Ausência de Dependências Externas
- [ ] Nenhum `<script src="https://...">` de biblioteca de terceiros.
- [ ] Nenhum `import` de pacote npm carregado via CDN.
- [ ] Sem `node_modules` no repositório (ver `.gitignore`).
- [ ] Sem etapa de build (Vite/Webpack/Babel) no fluxo.
- [ ] Se usar uma API moderna, há fallback para navegadores antigos? (ex.:
  `clipboard` com `document.execCommand('copy')` como fallback).

## 3. Estrutura Estática Íntegra
- [ ] `index.html` e `livro.html` abrem via `file://` **e** via `http.server`.
- [ ] Novo livro adicionado sem quebrar o array `MEU_BOLSO_BOOKS`.
- [ ] `slug` e `id` únicos.
- [ ] Capa referenciada existe em `img/`.

## 4. Segurança (mesmo em site estático)
- [ ] Conteúdo dinâmico vindo do **usuário** (`localStorage`) é sanitizado:
  `app.js` usa `escapeHtml` em reflexões — manter esse padrão.
- [ ] `innerHTML` com dados de `books.js` (autor/confiável) é aceitável, mas
  evitar interpolar entrada de usuário sem escape.
- [ ] Sem `eval()` de conteúdo dinâmico.

## 5. Acessibilidade (WCAG — Sprint 1)
- [ ] Navegação por teclado funciona (foco visível).
- [ ] Botões/inputs têm `aria-label` ou texto acessível.
- [ ] Contraste AA no tema escuro **e** claro (quando implementado).
- [ ] `alt` em todas as `<img>`.

## 6. Performance
- [ ] Imagens com `loading="lazy"` onde aplicável.
- [ ] Capas otimizadas (< 200KB ideal).
- [ ] Sem rede externa (zero requests a CDNs).

## 7. Commits
- [ ] Mensagem no padrão: `tipo: descrição` (`content:`, `feat:`, `fix:`, `docs:`).
- [ ] `git status` limpo antes do push.
