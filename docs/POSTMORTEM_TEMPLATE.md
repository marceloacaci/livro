# 📝 Template de Post-Mortem — Biblioteca de Reflexões

> Use este template para documentar incidentes, regressões visuais ou falhas de
> deploy. Preencha **todas** as seções. Mantenha o tom factual e sem culpa
> (blameless): o objetivo é aprender, não apontar responsáveis.

---

## 1. Identificação

| Campo | Valor |
|---|---|
| **Título** | _Resumo de uma linha do incidente_ |
| **Data/Hora** | AAAA-MM-DD HH:MM (fuso) |
| **Duração** | _tempo até mitigação_ (_tempo até resolução total_) |
| **Severidade** | 🔴 Crítico / 🟠 Alto / 🟡 Médio / 🟢 Baixo |
| **Ambiente** | Produção (GitHub Pages) / Staging / Dev local |
| **Autor do post-mortem** | _nome_ |
| **Responsável pela resolução** | _nome_ |

## 2. Resumo Executivo

_Parágrafo curto (3–5 linhas) que qualquer pessoa da equipe entenda sem contexto
prévio: o que quebrou, quem foi afetado e como foi resolvido._

## 3. Impacto

- **Usuários afetados:** _%
/nº estimado de visitantes ou reflexões perdidas_
- **Funcionalidades atingidas:** _leitor, busca, tema, anotações, deploy..._
- **Dados perdidos?** _Sim/Não — detalhar (ex.: reflexões de localStorage)_

## 4. Cronologia (Timeline)

> Horários em UTC para evitar ambiguidade.

| Hora | Evento |
|---|---|
| HH:MM | _Alerta/sintoma detectado_ |
| HH:MM | _Investigação iniciada_ |
| HH:MM | _Causa raiz identificada_ |
| HH:MM | _Mitigação aplicada_ |
| HH:MM | _Resolução confirmada_ |

## 5. Causa Raiz (Root Cause)

_Descreva a cadeia causal. Use "5 Whys" se ajudar._

1. Por que X aconteceu? → Porque...
2. Por que isso? → Porque...
3. ...

**Causa raiz:** _frase única que explica o gatilho fundamenal._

## 6. O que funcionou / O que não funcionou

### ✅ Funcionou
- _Ex.: o gate `npm run qa` impediu o merge de JS com sintaxe inválida._

### ❌ Não funcionou
- _Ex.: a ausência de teste de regressão visual deixou passar uma quebra de CSS._

## 7. Lições Aprendidas

- _Princípio ou prática que deve mudar a partir daqui._

## 8. Plano de Ação (Action Items)

| Ação | Responsável | Prazo | Status |
|---|---|---|---|
| _Ex.: adicionar snapshot test do grid de cards_ | _nome_ | AAAA-MM-DD | ☐ |

## 9. Anexos

- Links para: logs do CI, prints do Lighthouse, diff relevante, issue relacionada.

---

### 🔐 Checklist de Segurança (RS-01) aplicado a este incidente
- [ ] Houve exfiltração de dados (0 requests externos mantido)?
- [ ] CSP (via `<meta http-equiv>`) continuou válida após a mudança?
- [ ] Input do usuário continuou sanitizado (sem XSS novo)?
