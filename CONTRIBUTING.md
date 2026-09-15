# Contribuindo

Este documento é o ponto de entrada para quem quer **estender** este plugin — adicionar um novo pattern de página, um novo agente especialista, ou registrar um segundo plugin neste mesmo `marketplace.json`.

Se você só quer **usar** o `padrao-digital-pe`, veja o [README](README.md).

## 1. Anatomia do plugin

`.claude-plugin/plugin.json` é o único arquivo obrigatório de um plugin Claude Code:

```json
{
  "$schema": "https://anthropic.com/claude-code/plugin.schema.json",
  "name": "padrao-digital-pe",
  "version": "0.1.0",
  "description": "...",
  "author": { "name": "...", "email": "..." }
}
```

Não há campo para declarar agentes/skills/hooks — eles são descobertos por convenção de diretório:

- `agents/*.md` → subagentes disponíveis.
- `skills/<nome>/SKILL.md` → skills disponíveis.
- `commands/*.md` → slash commands disponíveis.
- `hooks/hooks.json` → guardrails determinísticos (ver seção 4).

## 2. Padrão de arquitetura: orquestrador + especialistas + avaliadores puros

O pipeline segue três papéis, cada um com uma allowlist de `tools: Agent(...)` explícita:

| Papel | Agente neste plugin | `tools` |
|---|---|---|
| Orquestrador | `orquestrador-paginas-pe` | `Read, Write, Glob, Grep, Agent(especialista-autenticacao-pe, especialista-backoffice-pe, especialista-servico-publico-pe, especialista-layout-generico-pe, validador-componentes-pe, auditor-conformidade-pe)` |
| Especialista | `especialista-autenticacao-pe`, `especialista-backoffice-pe`, `especialista-servico-publico-pe`, `especialista-layout-generico-pe` | `Read, Write, Glob` |
| Avaliador puro | `validador-componentes-pe` | `Read, Glob, Grep` (sem `Write`) |
| Avaliador puro | `auditor-conformidade-pe` | `[]` (sem tools, sem persistência própria) |

Ao adicionar um pattern novo (ex. um pattern de "Dashboard" ou "Formulário multi-etapa" que hoje só existe como promessa em `guides/layout.md` sem arquivo dedicado), decida primeiro se ele justifica um especialista novo ou se cabe dentro de um especialista existente — não crie um agente por pattern trivial.

### Frontmatter mínimo de um agente

```yaml
---
name: nome-do-agente
description: Frase densa e autossuficiente com termos-gatilho concretos — é o que o dispatcher usa para decidir quando chamar este agente automaticamente.
tools: Read, Write, Glob, Agent(outro-agente-a, outro-agente-b)
---
```

Nenhum agente deste plugin declara `model` no frontmatter — todos usam o default. Só adicione `model` se houver um motivo concreto.

## 3. Fonte única de verdade do conhecimento do Design System

Todo o conteúdo de guias/patterns/componentes vive em `skills/consultar-design-system-pe/references/`, não duplicado dentro de cada agente. Os agentes leem esses arquivos por caminho relativo ao plugin quando precisam de detalhe; a skill em si serve como índice para consultas pontuais fora do fluxo de geração de página.

As regras que valem para **todo** agente (stack obrigatória, proibição de libs de UI externas, regra de nunca inventar prop, providers só no root layout, acessibilidade/responsividade obrigatórias) ficam centralizadas em `docs/regras-globais-pe.md` — referencie esse arquivo em vez de reescrever as regras a cada agente novo.

Ao adicionar um componente novo à documentação, atualize também `skills/consultar-design-system-pe/references/components/INDEX.md` — é a fonte que existe justamente para evitar o tipo de erro de nomenclatura que motivou renomear `tablet.md` para `table.md` nesta migração.

## 4. Guardrails determinísticos via hooks

`hooks/hooks.json` registra um hook `PostToolUse` em `Write` (`hooks/validar-imports.mjs`) que faz grep dos exports reais de `node_modules/@uigovpe/components`/`@uigovpe/styles` do projeto-alvo contra os imports do arquivo recém-escrito, bloqueando (`exit 2`, com a lista de nomes suspeitos devolvida como feedback) um import inexistente antes mesmo do `validador-componentes-pe` rodar — reforço determinístico e barato (sem chamada de LLM) da mesma regra que os agentes já aplicam por julgamento. Se o pacote não estiver instalado no projeto-alvo, o hook registra um aviso e não bloqueia (é um problema de setup do projeto, não de nomeação). Ele também flagra qualquer import nomeado de `@uigovpe/styles`, que não tem exports JS/TS reais (é um pacote CSS puro — ver `skills/consultar-design-system-pe/references/tokens.md`).

## 5. Testes

Duas camadas, análoga à de outros plugins do mesmo autor (`requisitos-pipeline`, `bdd-e2e-tester`):

- **Suíte sintética, sem LLM** (`tests/eval/*.test.mjs`) — testa `hooks/validar-imports.mjs` direto, sem depender de resposta de modelo, contra o fixture `tests/fixtures/mock-project/` (uma versão mínima e fake de `node_modules/@uigovpe/{components,styles}`, não o pacote real). Rode com `node --test tests/eval/*.test.mjs` (a forma `node --test tests/eval/` sem glob explícito não encontra os arquivos nesta versão do Node). Ao adicionar um novo guardrail determinístico, adicione o teste correspondente aqui antes de considerar a mudança pronta.
- **Suíte de regressão que invoca a CLI real** (`evals/`, LLM-graded) — um caso por pattern (`caso-split-login`, `caso-backoffice`, `caso-componente-inventado`, `caso-auto-dispatch`); ver `evals/README.md`. Rode manualmente depois de qualquer mudança de prompt de agente, contra um projeto-alvo real com o pacote instalado (não um diretório vazio — a única execução registrada em `evals/results/` falhou 100% por isso).

## 6. Como adicionar um segundo plugin a este `marketplace.json`

`.claude-plugin/marketplace.json` hoje hospeda só este plugin, auto-referenciado via `"source": "./"`. `plugins` é um array — adicionar uma segunda entrada é suficiente para virar um marketplace com múltiplos plugins, seguindo o mesmo padrão usado em `requisitos-pipeline` (mesmo repositório em subdiretório, ou repositório separado com `source` como objeto `git-subdir` + `sha` fixado).
