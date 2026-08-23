# Product Backlog — LIVRO v1.0

Backlog centralizado das histórias de usuário, focado em **performance**, leitura
confortável e modularização. Cada item tem critérios de aceitação em **Gherkin**
(Dado que / Quando / Então).

---

## B1 — Padronização visual dos 15 resumos
**Como** leitor, **quero** que os 15 resumos sigam a mesma estrutura visual e de dados,
**para** ter uma leitura coerente de ponta a ponta.

- Dado que acessei a Home
- Quando abro qualquer um dos 15 livros
- Então todas as seções (Sobre, Ensinamentos, Ideias, Verdades/Mitos, Reflexões)
  usam as mesmas classes e espaçamentos.

## B2 — Busca client-side na biblioteca
**Como** leitor mobile, **quero** buscar um livro por texto/tag em tempo real,
**para** encontrá-lo entre 15 sem rolar a lista toda.

- Dado que estou na Home
- Quando digito "fogg" no campo de busca
- Então só os cards cujo texto casa permanecem visíveis instantaneamente (< 100 ms).

## B3 — Lazy loading das capas
**Como** leitor mobile, **quero** que as imagens carreguem sob demanda,
**para** economizar meu plano de dados.

- Dado que a Home tem 15 capas
- Quando a página carrega
- Então apenas as capas visíveis no viewport são baixadas (`loading="lazy"`).

## B4 — Tema claro/escuro com toggle persistido
**Como** leitor, **quero** alternar entre tema claro e escuro,
**para** ler com conforto em qualquer iluminação.

- Dado que é minha primeira visita à noite
- Quando o sistema está em dark mode
- Então o site abre em tema escuro; e se eu clicar no toggle, minha escolha persiste
  em `localStorage` nas próximas visitas.

## B5 — Acessibilidade WCAG 2.1 AA
**Como** usuário com deficiência visual, **quero** navegar por teclado e com contraste,
**para** consumir o conteúdo sem barreiras.

- Dado que uso apenas o teclado
- Quando percorro a página com Tab
- Então todos os controles recebem foco visível e têm `aria-*` adequados.

## B6 — Barra de progresso de leitura
**Como** leitor, **quero** ver meu progresso na leitura,
**para** saber quanto falta sem rolar à toa.

- Dado que estou em um livro
- Quando rolo a página para baixo
- Então uma barra no topo cresce proporcionalmente ao percentual lido.

## B7 — Copiar Citação Destacada
**Como** leitor, **quero** copiar um trecho de impacto com um clique,
**para** compartilhá-lo fora do site.

- Dado que vejo uma citação
- Quando clico em "Copiar"
- Então o texto vai para a área de transferência e o botão confirma "Copiado!".

## B8 — Modo Leitura Focada (Zen)
**Como** leitor imersivo, **quero** esconder header/footer ao rolar,
**para** focar só no texto.

- Dado que comecei a ler
- Quando rolo para baixo
- Então elementos periféricos somem; ao rolar para cima, reaparecem.

## B9 — SEO e metadados
**Como** dono do produto, **quero** meta tags e OpenGraph,
**para** que o site seja descoberto e compartilhado bem.

- Dado que o site foi publicado
- Quando inspeciono o `<head>`
- Então há `description`, `og:title`, `og:image` e `lang="pt-BR"`.

## B10 — Deploy automático (GitHub Pages)
**Como** mantenedor, **quero** deploy contínuo,
**para** publicar sem passos manuais.

- Dado que fiz push em `master`
- Quando a pipeline valida
- Então o site é publicado automaticamente no GitHub Pages.

## B11 — Consolidar duplicação de localStorage
**Como** dev, **quero** um módulo único de reflexões,
**para** evitar estado duplicado entre `app.js` e `livro.js`.

- Dado que salvo reflexões
- Quando recarrego
- Então o estado vem de uma única fonte (`LivroData`/`localStorage`).
