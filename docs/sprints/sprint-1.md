# Sprint 1 — Consolidação Local, Auditoria & Design System

**Duração:** 2 semanas (primeiro ciclo).
**Objetivo:** unificar o progresso de código local com o repositório, auditar e
estabilizar o CSS responsivo + Dark/Light mode antes de qualquer refatoração canônica.

## Módulo 0 — Salvaguarda e Integração de Código Local (prioridade)

Antes de mexer em qualquer arquivo core, o usuário **protege seu progresso não-subido**:

```bash
# Opção A — isolar em stash nomeado
git stash save "progresso_local_antes_do_hermes"

# Opção B — isolar em branch de trabalho temporária (preferida p/ continuidade)
git checkout -b feature/progresso-local
git add -A && git commit -m "wip: progresso local antes da v1.0"
git checkout master
```

Depois da atualização da v1.0, o merge é **manual e incremental**, preservando a lógica
de `localStorage`/reflexões em `app.js` e `livro.js`:

```bash
git checkout feature/progresso-local
git merge master          # resolver conflitos mantendo as funções de anotação
```

> **Regra inegociável:** nunca sobrescrever linhas de anotações/reflexões locais. As
> sugestões de `data.js`/`main.js`/`reader.js` são camadas **aditivas** (Módulo 0).

## Escopo
- [ ] B4 — `:root[data-theme="light"]` + toggle persistido em `localStorage`.
- [ ] B5 — `aria-*` nos controles, `:focus-visible`, contraste AA (escuro e claro).
- [ ] B3 — `loading="lazy"` + `decoding="async"` em `<img>` dos cards e capas.
- [ ] B1 (parcial) — normalizar classes de card/seção para todos os 15.

## Tarefas técnicas
1. Extrair todos os tokens de cor/raio/sombra para `:root`; declarar variáveis de
   tema claro em `:root[data-theme="light"]`.
2. Implementar `js/app.js` (ou `theme.js`): ler `matchMedia('(prefers-color-scheme:
   dark)')`, aplicar `data-theme` no `<html>`, gravar escolha do usuário.
3. Adicionar `:focus-visible` global e revisar contraste de todos os textos.
4. Conferir `loading="lazy"` em `biblioteca.js` (cards) e `livro.js` (capas).

## Critérios de Pronto
- Working tree do usuário protegida (stash ou branch) antes da atualização.
- Merge manual concluído sem perda das funções de `localStorage`/reflexões locais.
- Responsivo em 320 / 768 / 1024px.
- Toggle de tema funciona e persiste.
- Contraste AA validado por ferramenta de acessibilidade.
- Nenhuma dependência externa introduzida.
