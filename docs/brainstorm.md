# Brainstorm de Ideias (Sem Build)

Toda sugestão é avaliada por **ganho real de UX** sem comprometer a natureza
*vanilla*. Itens marcados com ✅ são recomendados para os sprints; ⏸️ são
adiados; ❌ rejeitados por quebrarem a restrição "sem build".

---

## 1. Funcionalidades Leves

### ✅ 1.1 Modo "Leitura Focada" (hide header/footer ao rolar)
- **Como:** `IntersectionObserver` ou listener de `scroll` que esconde
  `.navbar` e `.footer` quando o usuário rola para baixo e mostra ao rolar p/ cima.
- **Ganho:** imersão na leitura, menos distração.
- **Vanilla:** API nativa de scroll + classe CSS `.nav-hidden`.

### ✅ 1.2 Botão "Copiar Citação"
- **Como:** em cada `<blockquote class="citacao">`, um botão que chama
  `navigator.clipboard.writeText(...)`.
- **Ganho:** compartilhar trecho destacado sem selecionar manualmente.
- **Vanilla:** Clipboard API (suportada em contexto seguro/localhost/Pages).

### ✅ 1.3 Barra de Progresso de Leitura (topo de `livro.html`)
- **Como:** barra fixa de `1px`–`4px` no topo; largura = `scrollTop / (scrollHeight - clientHeight)`.
- **Ganho:** orientação de progresso em resumos longos.
- **Vanilla:** `requestAnimationFrame` no `scroll` (evita layout thrash).

### ✅ 1.4 Busca/Filtro client-side
- Já no backlog (Sprint 2). Input que filtra `MEU_BOLSO_BOOKS` por título/autor/gênero.
- **Vanilla:** `Array.filter` + re-render do grid.

### ⏸️ 1.5 Marca-texto colaborativo
- Exigiría backend/sync → fora do escopo vanilla estático. Adiado.

---

## 2. Expansão de Conteúdo

### ✅ 2.1 Sistema para adicionar livros só editando um array JS
- **Atual:** `window.MEU_BOLSO_BOOKS` em `js/books.js`. Adicionar um objeto =
  novo livro aparece no grid e na sidebar (sidebar lista fixa — ver ⚠️ abaixo).
- **Melhoria (sem build):** gerar a sidebar de livros também a partir de
  `MEU_BOLSO_BOOKS` (loop em `biblioteca.js`/`livro.js`), eliminando a lista
  hardcoded em `index.html`. Isso torna a adição de livro **100% data-driven**.
- **Ganho:** zero edição de HTML para novo conteúdo.

### ✅ 2.2 Metadados por livro (já presentes)
- Cada livro já tem `genre`, `author`, `year`, etc. Úteis para filtros futuros
  (por gênero/tópico).

### ⚠️ 2.3 Ponto detectado na auditoria
- A sidebar de `index.html` tem os 15 livros **escritos manualmente** (não vem
  de `MEU_BOLSO_BOOKS`). Ao adicionar livro, tem de editar HTML **e** JS.
  Recomenda-se gerar essa lista via JS (consistência com a regra "só editar
  array"). Incluído no Sprint 2/3.

---

## 3. Ideias Rejeitadas (quebrariam "sem build")

- ❌ Framework (React/Vue) para o grid — viola restrição.
- ❌ Bundler/Vite para "otimizar" — não há build por decisão do projeto.
- ❌ CMS headless — exige backend.
- ❌ Banco de dados para reflexões — `localStorage` já cobre o caso.

> Princípio: se a complexidade não traz ganho de UX mensurável, fica de fora.
