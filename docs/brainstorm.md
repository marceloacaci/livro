# Brainstorm de Recursos Leves & UX — LIVRO v1.0

Exploração do teto de inovação em usabilidade mantendo a premissa **peso zero / zero
build**. Toda sugestão aqui é implementável com JavaScript puro e APIs nativas do
navegador.

---

## 1. Micro-UX de Fronteira

### 1.1 Barra de progresso de leitura
Faixa fixa no topo de `livro.html` que reflete o avanço do scroll:

```js
// Calcula % lida e aplica em uma barra de width via transform scaleX
function onScroll() {
  var h = document.documentElement;
  var max = h.scrollHeight - h.clientHeight;
  var pct = max > 0 ? (h.scrollTop || window.scrollY) / max : 0;
  progressBar.style.transform = 'scaleX(' + pct.toFixed(4) + ')';
}
window.addEventListener('scroll', onScroll, { passive: true });
```

- **Custo:** < 15 linhas. **Ganho:** orientação clara em textos longos.

### 1.2 Copiar Citação Destacada
Botão de contexto em cada `<blockquote>` que copia o trecho via Clipboard API:

```js
function copiarCitacao(btn) {
  var texto = btn.closest('blockquote').innerText;
  navigator.clipboard.writeText(texto).then(function () {
    btn.textContent = '✅ Copiado!';
    setTimeout(function () { btn.textContent = '📋 Copiar'; }, 1500);
  });
}
```

- **Custo:** < 12 linhas. **Ganho:** compartilhamento direto de insights.

### 1.3 Modo Leitura Focada (Zen Mode)
Oculta header/footer/sidebar ao rolar para baixo; revela ao rolar para cima:

```js
var lastY = 0;
window.addEventListener('scroll', function () {
  var y = window.scrollY;
  var goingDown = y > lastY && y > 120;
  document.body.classList.toggle('zen-mode', goingDown);
  lastY = y;
}, { passive: true });
```

- **Custo:** < 12 linhas. **Ganho:** imersão total, menos distração.

---

## 2. Matriz de Viabilidade Sem Adição de Dependências

Correlaciona o ganho de UX contra o impacto no tamanho final da página. Regra: se o
comportamento cabe em **< 20 linhas de JS puro**, **não** se adiciona nenhuma biblioteca.

| Recurso | Ganho UX | Linhas JS puras | Lib externa? | Decisão |
|---------|----------|-----------------|--------------|---------|
| Barra de progresso | Médio | ~12 | Não | ✅ Nativo |
| Copiar Citação | Médio | ~12 | Não | ✅ Nativo (Clipboard API) |
| Modo Leitura Focada | Médio | ~12 | Não | ✅ Nativo |
| Busca client-side | Alto | ~25 | Não | ✅ Nativo (`indexOf`/`filter`) |
| Tema Dark/Light | Alto | ~20 | Não | ✅ Nativo (`localStorage` + `matchMedia`) |
| Lazy loading | Médio | 0 (atributo) | Não | ✅ `loading="lazy"` nativo |
| Scroll smooth | Baixo | 0 (CSS) | Não | ✅ `scroll-behavior` nativo |
| Compartilhar em redes | Baixo | ~10 | Não | ✅ `navigator.share` nativo |
| Anotações/reflexões | Alto | ~30 | Não | ✅ `localStorage` nativo |
| Gráfico de progresso | Baixo | ~120 | **Sim (Chart.js)** | ❌ Adiar / SVG nativo |

> **Conclusão:** 9 dos 10 itens de fronteira são 100% vanilla e pesam **0 KB de
> dependência**. O único que justificaria lib (gráfico) é postergado em favor de SVG
> nativo ou omitido — preservando a restrição de zero-build.

---

## 3. Ideias Leves Extras (backlog diverso)

- **Atalho de teclado** (`?` abre ajuda de atalhos) — ~15 linhas.
- **Filtro por gênero/tag** na Home — extende a busca existente.
- **Índice flutuante** de capítulos (TOC) no leitor — reuso do submenu já existente.
- **Modo sepia** como terceira opção de tema (conforto noturno) — só mais um bloco `:root`.
- **Exportar reflexões** para `.txt`/`clipboard` — `Blob` + `URL.createObjectURL`.
