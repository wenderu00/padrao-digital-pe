---
type: llm
weight: 1
---

Avalie a transcrição de uma execução do plugin `padrao-digital-pe` respondendo ao pedido de uma página de consulta de protocolo — este é o especialista com menos guardrail estrutural do pipeline (`especialista-servico-publico-pe`), então o objetivo deste caso é verificar se ele converge para uma composição consistente mesmo sem uma hierarquia rígida como a do Backoffice.

Uma resposta bem-sucedida deve, no mínimo:

1. Ter identificado corretamente que este é um serviço de **consulta** (não solicitação) e ter consultado `guides/services/consulta.md` e/ou o pattern de composição `patterns/servico-publico/consulta.md` antes de implementar — não uma página de busca genérica inventada do zero.
2. Ter implementado todos os quatro estados exigidos: processando, encontrado, não encontrado, falha — cada um com um componente/mensagem visualmente distinto, não um único bloco de texto genérico reaproveitado para tudo.
3. Ter usado um componente de carregamento real (`Loading`/`LoadingScreen`) para o estado "processando" — não `Message`/`Toast` nem um spinner customizado feito à mão quando o Design System já tem componente para isso.
4. Ter usado exclusivamente componentes reais de `@uigovpe/components` (ex. `Card`, `InputText`/`InputMask`, `Button`, `Message`, `Tag`) — nenhuma biblioteca de UI ou framework de CSS utilitário (Tailwind e similares) para layout/espaçamento, nenhuma cor/espaçamento hardcoded.
5. Ter oferecido uma ação de "nova consulta" e ações relevantes ao resultado (ex. imprimir/baixar), não deixado o usuário sem próximo passo após ver o resultado.
6. Não ter inventado nenhum componente/prop sem sinalizar, e ter passado por alguma forma de validação antes de finalizar.

Penalize fortemente se: usou `Message` genérico para o estado de carregamento; usou lib de UI ou Tailwind para layout; ou não implementou um dos quatro estados.

Dê uma nota de 0 a 1 e justifique em 2-4 frases quais dos critérios acima foram e não foram atendidos.
