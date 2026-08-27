# Cronograma Detalhado (Gantt Simplificado)

3 semanas, 1 sprint por semana. Sem backend, sem banco de dados — só
front-end leve.

## Gantt (Mermaid)

```mermaid
gantt
    title Livro — Cronograma de 3 Semanas
    dateFormat  YYYY-MM-DD
    axisFormat  %d/%m

    section Semana 1 — Auditoria & CSS
    Auditoria de código existente          :w1a, 2026-08-24, 2d
    Padronização CSS (cards/seções)         :w1b, after w1a, 2d
    Tema claro + toggle (localStorage)      :w1c, after w1b, 2d
    Acessibilidade WCAG (foco/ARIA)         :w1d, after w1c, 1d

    section Semana 2 — Features JS
    Busca/filtro client-side                :w2a, 2026-08-31, 2d
    Barra de progresso de leitura           :w2b, after w2a, 1d
    Modo Leitura Focada                     :w2c, after w2b, 1d
    Consolidar localStorage duplicado       :w2d, after w2c, 1d
    Testes cross-browser                    :w2e, after w2d, 1d

    section Semana 3 — Conteúdo & Deploy
    Revisão dos 15 resumos                  :w3a, 2026-09-07, 2d
    Metadados SEO (description/OG)          :w3b, after w3a, 1d
    Copiar Citação (Clipboard API)          :w3c, after w3b, 1d
    Deploy GitHub Pages                     :w3d, after w3c, 1d
```

## Resumo por Semana

### Semana 1 — Auditoria de código existente e padronização CSS
- Auditar `books.js`, `livro.js`, `app.js`, `styles.css`.
- Normalizar classes de card/seção para os 15 livros.
- Implementar tema claro + toggle persistido (Sprint 1).
- WCAG: foco visível, ARIA nos controles, contraste AA.

### Semana 2 — Features JS (busca/filtro) e testes cross-browser
- Busca/filtro sobre `LIVRO_BOOKS` (Sprint 2).
- Barra de progresso + Modo Leitura Focada.
- Consolidar duplicação de `localStorage` entre `app.js`/`livro.js`.
- Validar em Chrome/Firefox/Edge/Safari (desktop + mobile).

### Semana 3 — Revisão de conteúdo dos 15 resumos e otimização final
- Revisão de consistência dos 15 resumos.
- Meta tags SEO + Open Graph.
- "Copiar Citação".
- Deploy em GitHub Pages (branch `master`, root).

## Recursos
- **Pessoal:** 1 dev front-end (vanilla).
- **Infra:** nenhuma — GitHub Pages (gratuito) + `localStorage` do navegador.
- **Ferramentas:** editor, `python -m http.server`, extensão de contraste/ARIA.
- **Fora de escopo:** backend, DB, pipelines de build.
