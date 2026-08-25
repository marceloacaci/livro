# Origem e Licenciamento do Conteúdo dos Livros

## Decisão (ADR-001 — Conteúdo)

**Os 123 livros do catálogo `js/books.js` NÃO hospedam texto integral protegido.**
Cada registro representa um **resumo original / reflexão própria** do autor sobre a
obra (o nome do projeto — "Biblioteca de Reflexões" — reflete exatamente isso).

### Por quê

- A grande maioria dos títulos (economia, negócios, autoajuda, finanças) foi
  publicada nos últimos anos e **está sob direitos autorais**. Hospedar o texto
  completo publicamente exigiria licenciamento dos detentores dos direitos.
- O projeto é **privacy-first, zero-backend, 100% no navegador**. O que existe é:
  - Metadados do livro (título, autor, ano, editora, gênero, nº de páginas,
    exemplares vendidos, capa) — informação factual, de utilidade pública.
  - Campo `myths`: **mitos vs. verdades** e **perguntas de reflexão** escritos
    originalmente pelo autor — conteúdo próprio, não reprodução.
  - Reflexões do leitor (CRUD em `js/annotations.js`), salvas localmente
    (`localStorage` + export JSON / FileSystemAccessAPI).

### Consequência para o schema

- O catálogo **não** possui `chapters[].file` apontando para o texto do livro.
- O campo `cover` aponta para `img/*.jpg` (capas locais), não para
  `assets/covers/*.webp`.
- `genre` é uma **string** ("Finanças pessoais / Autoajuda"), e não um array.

### Risco & mitigação

Se no futuro o projeto quiser incluir trechos maiores, o caminho seguro é:
1. Usar apenas obras em **domínio público**, ou
2. Obter **licenciamento** explícito, ou
3. Limitar-se a **citações curtas** com atribuição (fair use / citação a título
   de crítica ou discussão — conforme a legislação aplicável).

Esta decisão é a base legal do projeto e deve ser preservada em qualquer evolução
do conteúdo.
