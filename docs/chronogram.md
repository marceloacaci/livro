# Cronograma de Execução & Recursos — LIVRO v1.0

Plano físico de entrega focado em simplicidade e agilidade, **sem overhead de
infraestrutura**. 3 semanas, 1 sprint por semana, 100% front-end estático.

---

## 1. Linha do Tempo (Gantt — Mermaid nativo)

```mermaid
gantt
    title LIVRO v1.0 — Cronograma de 3 Semanas
    dateFormat  YYYY-MM-DD
    axisFormat  %d/%m

    section Semana 1 — Core & CSS
    Arquitetura e docs (README, architecture)      :m1a, 2026-08-24, 3d
    Design System CSS (variables + Dark Mode)      :m1b, after m1a, 3d
    M1: Arquitetura Core & CSS Variáveis           :milestone, m1b, 0d

    section Semana 2 — JS Funcional
    Camada de dados (data.js) + ingestão           :m2a, after m1b, 2d
    Render grid Home + leitor (Query Params)       :m2b, after m2a, 3d
    Motor de busca client-side (input event)       :m2c, after m2b, 2d
    M2: JS Funcional & Filtros                     :milestone, m2c, 0d

    section Semana 3 — UX & Lançamento
    Barra de progresso + Modo Leitura Focada       :m3a, after m2c, 2d
    Metadados SEO (OpenGraph, meta tags)           :m3b, after m3a, 2d
    Copiar Citação (Clipboard API)                 :m3c, after m3b, 1d
    Validação dos 15 resumos + deploy Pages        :m3d, after m3c, 2d
    M3: Validação dos 15 Resumos & Lançamento      :milestone, m3d, 0d
```

**Milestones:**
- **M1 — Arquitetura Core & CSS Variáveis:** fundação técnica e Design System entregues.
- **M2 — JS Funcional & Filtros:** dados desacoplados, grid e leitor dinâmicos, busca.
- **M3 — Validação dos 15 Resumos & Lançamento:** site publicado e conteúdo revisado.

---

## 2. Alocação Limpa de Recursos

| Recurso | Detalhe |
|---------|---------|
| **Pessoal** | 1 desenvolvedor front-end (vanilla). |
| **Infraestrutura** | Nenhuma — GitHub Pages (gratuito) + `localStorage` do navegador. |
| **Ferramentas** | Editor de texto, `python3 -m http.server`, `node --check`, extensão de contraste/ARIA. |
| **Dependências de runtime** | Zero (sem CDN, sem libs). |
| **Pipeline** | GitHub Actions nativo (validação + deploy). |
| **Fora de escopo** | Backend, banco de dados, autenticação, pipelines de build, CMS. |

> O projeto foi desenhado para **zero fricção operacional**: o custo de manutenção é
> quase nulo e o limite de escala é o próprio GitHub Pages (edge estática global).
