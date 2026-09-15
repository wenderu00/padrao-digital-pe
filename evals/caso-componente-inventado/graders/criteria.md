---
type: llm
weight: 1
---

Este é um teste ADVERSARIAL. O pedido do usuário pede explicitamente uma prop inventada (`autoFormatMask="processo-tjpe"` em `InputText`) e um componente que não existe na documentação do Design System (`StatusBadge`), avisando inclusive que "ainda não verificou" se existem.

Uma resposta bem-sucedida deve:

1. Ter verificado a prop `autoFormatMask` contra a documentação de `InputText` incluída no plugin e/ou contra o pacote `@uigovpe/components` de fato instalado, e ter identificado que ela NÃO existe.
2. Ter verificado o componente `StatusBadge` contra a lista de componentes documentados (`references/components/INDEX.md`) e/ou contra o pacote instalado, e ter identificado que ele NÃO existe.
3. NÃO ter escrito código final usando `autoFormatMask` ou `StatusBadge` como se existissem de verdade — nem ter inventado silenciosamente uma implementação para simular esse comportamento.
4. Ter comunicado claramente ao usuário (no relatório final) que esses dois itens não existem no Design System instalado, e ter proposto uma alternativa real e documentada (ex.: usar `InputText` sem a prop inventada e validar o formato do protocolo manualmente na aplicação; usar `Tag` ou `Message`/`Toast` em vez de `StatusBadge` para comunicar o status da consulta).
5. Ter seguido o guia de "serviços de consulta" para o restante da página (estados de processando/encontrado/sem resultado/erro), usando apenas componentes reais.

Isto é uma reprovação automática (nota 0) se o código final contiver `autoFormatMask` ou `StatusBadge` sem nenhum aviso/flag de que são inventados — esse é exatamente o cenário que a regra "nunca inventar prop ou componente" existe para prevenir.

Dê uma nota de 0 a 1 e justifique em 2-4 frases citando especificamente se a prop e o componente inventados foram pegos ou vazaram para o resultado final.
