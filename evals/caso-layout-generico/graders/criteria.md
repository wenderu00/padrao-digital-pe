---
type: llm
weight: 1
---

Avalie a transcrição de uma execução do plugin `padrao-digital-pe` respondendo ao pedido de uma landing page institucional — este é o caso do especialista de fallback (`especialista-layout-generico-pe`), agora com quatro patterns de referência (`patterns/generico/page.md`, `form.md`, `navigation.md`, `dashboard.md`) em vez de prosa livre. O objetivo deste caso é verificar se o agente de fato usa esses patterns em vez de improvisar a estrutura do zero.

Uma resposta bem-sucedida deve, no mínimo:

1. Ter identificado esta página como o pattern "Page" (institucional/landing) e ter consultado `patterns/generico/page.md` — evidência disso é uma estrutura com `GovBar` + cabeçalho/navegação + seção de destaque (hero) + seção de serviços + rodapé, e não uma única sequência de `<div>`s sem hierarquia clara.
2. Ter implementado o cabeçalho/rodapé seguindo `patterns/generico/navigation.md` — como `Header`/`Footer` **não existem** como componentes do pacote, o agente deveria ter composto com HTML semântico (`<header>`/`<footer>`) + `GovBar`/`Menu`/`Typography`/`TextLink`, não ter tentado `import { Header } from '@uigovpe/components'` (isso deveria ter sido pego e corrigido, não deveria aparecer no código final).
3. Ter usado `Card`s (não `<div>`s estilizadas) para a lista de serviços.
4. Ter usado hierarquia de heading coerente (um único `h1`, seções em `h2`) e espaçamento de seção a partir dos tokens reais de `references/tokens.md` (`--spacing-*`) — nenhum framework de CSS utilitário (Tailwind e similares) usado para o grid/layout da página, nenhum valor de padding/margin arbitrário.
5. Ter passado por alguma forma de validação/revisão antes de finalizar.

Penalize fortemente se: importou `Header`/`Footer` como componentes de `@uigovpe/components` (não existem no pacote); usou Tailwind ou outro framework de CSS utilitário para o layout da página; ou produziu uma estrutura sem nenhuma hierarquia de seções clara.

Dê uma nota de 0 a 1 e justifique em 2-4 frases quais dos critérios acima foram e não foram atendidos.
