---
name: consultar-design-system-pe
description: Use quando o usuário pedir para criar, ajustar ou avaliar uma página, tela, formulário ou sistema usando o Design System do Governo de Pernambuco (Padrão Digital de Pernambuco), mencionar @uigovpe/components ou @uigovpe/styles, citar componentes como GovBar, AdminSideBar, StepperHeader ou qualquer outro do Design System de PE, ou perguntar quais props/estados um componente específico do design system aceita.
---

# Consultar Design System de Pernambuco

Este é um índice de conhecimento sob demanda — não um fluxo de trabalho em si. Para gerar uma página/sistema completo do zero, o ponto de entrada é o agente `orquestrador-paginas-pe` deste plugin (ele é despachado automaticamente pela sua própria `description`, ou pode ser chamado pelo comando `/gerar-pagina-pe`). Use esta skill quando a necessidade for mais pontual: consultar um componente específico, entender um pattern, ou revisar uma regra de uso fora do fluxo completo de geração de página.

## Ordem mandatória de consulta

Ao decidir como construir qualquer interface com este Design System, siga sempre esta ordem (definida em `references/guides/layout.md`):

1. **Pattern** — verifique primeiro se existe um pattern de página pronto em `references/patterns/` para o caso de uso (autenticação, backoffice, etc.). Um pattern define a composição e hierarquia de componentes obrigatória — nunca comece do zero se um pattern já cobre o caso.
2. **Layout** — `references/guides/layout.md` define a ordem de decisão de layout quando não há pattern aplicável.
3. **Tipografia** — `references/guides/typography.md` define a fonte oficial (Inter) e onde ela deve ser configurada (só em `app/layout.tsx`).
4. **Tokens** — `references/tokens.md` tem os valores reais de cor, espaçamento, tipografia e breakpoint de `@uigovpe/styles` (CSS custom properties, extraídos de um pacote instalado real) — nunca use um valor de cor/espaçamento/px arbitrário sem checar aqui primeiro.
5. **Componentes** — `references/components/INDEX.md` é o mapa de todos os componentes documentados; abra o arquivo específico do componente antes de usá-lo, para confirmar props e regras de acessibilidade.

## Onde encontrar cada coisa

- `references/guides/layout.md` — guia de implementação e ordem de decisão de layout.
- `references/guides/typography.md` — tipografia oficial (Inter).
- `references/tokens.md` — valores reais de cor, espaçamento, tipografia e breakpoint (fonte única, extraída de um pacote instalado real).
- `references/guides/checklist.md` — checklist de qualidade de serviços públicos digitais.
- `references/guides/services/consulta.md`, `solicitacao.md`, `padroes-interacao.md` — boas práticas para serviços de consulta e de solicitação/formulário.
- `references/patterns/authentication/split-login.md` — pattern de login em duas colunas para backoffice.
- `references/patterns/backoffice/backoffice.md` — template Backoffice, com hierarquia obrigatória de componentes.
- `references/components/INDEX.md` — mapa de todos os componentes documentados; use-o para achar o arquivo certo antes de abrir um componente específico.
- `docs/regras-globais-pe.md` (raiz do plugin) — regras que valem para qualquer implementação: stack obrigatória, bibliotecas proibidas, regra de nunca inventar prop, providers só no root layout, acessibilidade e responsividade obrigatórias.

## Regra central

Nunca assuma que um componente ou uma prop existe. Confirme sempre contra a documentação em `references/components/` e, quando possível, contra a versão de `@uigovpe/components` de fato instalada no projeto onde a página está sendo gerada — não confie apenas em conhecimento prévio do modelo.
