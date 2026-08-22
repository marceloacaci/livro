# Livro — Biblioteca de Autoajuda (site estático)

Site HTML/CSS/JS puro (vanilla, sem build) com 15 resumos de livros de autoajuda.
Serve localmente em `http://localhost:8077`.

## Estrutura
- `index.html` — página principal (biblioteca/grid de livros)
- `livro.html` — página de leitura de um livro
- `css/styles.css` — estilos (tema claro/escuro)
- `js/` — lógica (app, biblioteca, livro, books, book-theme)
- `img/` — capas dos livros

## Como rodar localmente
```bash
python -m http.server 8077
# abra http://localhost:8077
```

## Publicar no GitHub Pages
Settings → Pages → Source: `main` (ou `master`) / root.

## Observações
- `.claude/`, `.impeccable/` e `node_modules/` são ignorados (tooling local).
- `verify-*.js` são scripts de checagem local, não fazem parte do site.
