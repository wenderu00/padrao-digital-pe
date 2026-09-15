---
type: llm
weight: 1
---

Este teste verifica AUTO-DISPATCH: o pedido do usuário não menciona o nome de nenhum agente do plugin `padrao-digital-pe`, nem os termos "Design System" ou "Padrão Digital de Pernambuco" — só cita `@uigovpe/components` e descreve o pedido em linguagem natural comum, do jeito que um usuário real pediria sem saber que existe um plugin.

Avalie a transcrição completa (incluindo as chamadas de ferramenta feitas) e responda:

1. O agente `orquestrador-paginas-pe` (ou um dos especialistas do plugin) foi de fato acionado — evidenciado por leituras de arquivos dentro de `references/patterns/`, `references/components/`, `references/guides/` do plugin, ou por uma chamada da tool `Agent` direcionada a um dos agentes deste plugin — SEM que o usuário tivesse pedido isso explicitamente pelo nome? Isso é o critério mais importante deste teste: um plugin de Design System só é útil na prática se dispara sozinho a partir de um pedido em linguagem natural comum, não só quando alguém já sabe o nome do agente.
2. A tela de recuperação de senha gerada usa o pattern Split Login como referência de estilo (mesma composição de duas colunas / formulário + área institucional), coerente com o pedido de "parecida com o padrão de login que já usamos".
3. Só componentes reais de `@uigovpe/components` foram usados, sem inventar nada.
4. O provider global (se precisou ser tocado) permaneceu centralizado em `app/layout.tsx`, sem duplicação em páginas individuais.

Se o critério 1 falhar (nenhuma evidência de que o conhecimento/agentes do plugin foram usados — ex. o agente implementou a tela do zero, com HTML/CSS genérico, sem nunca consultar nada do plugin), a nota máxima possível é 0.3, independente da qualidade do código gerado, porque o objetivo deste caso é testar especificamente o auto-dispatch, não a qualidade geral de uma implementação de tela de login.

Dê uma nota de 0 a 1 e justifique em 2-4 frases, citando a evidência concreta (ou ausência dela) de que o plugin disparou sozinho.
