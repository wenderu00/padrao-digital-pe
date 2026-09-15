# Loading / LoadingScreen

> Confirmado por leitura direta de `node_modules/@uigovpe/components@1.1.39/dist/index.d.ts` num projeto real. Antes desta entrada, o plugin não documentava nenhum componente de carregamento — isso já causou improviso real: um especialista resolveu o estado "processando" de uma consulta usando `Message severity="info"` por falta de alternativa documentada. Use `Loading`/`LoadingScreen` para esse caso a partir de agora.

## Contexto

- **Categoria:** Feedback e estado
- **Objetivo:** Comunicar que uma operação está em andamento (requisição, processamento, carregamento de dados).
- **Quando usar:** Estado "processando" de consultas e solicitações (`guides/services/consulta.md`, `solicitacao.md`), carregamento inicial de uma página/seção com dados assíncronos.
- **Quando evitar:** Operações instantâneas ou que não têm um estado de espera perceptível pelo usuário.
- **Componentes relacionados:** `Message` (para estados finais — sucesso/erro/aviso, não para "em andamento").

## Visão geral

O pacote exporta dois componentes distintos:

- **`Loading`** — indicador de carregamento local/inline (ex. dentro de um card, substituindo o conteúdo de uma seção enquanto os dados chegam).
- **`LoadingScreen`** — indicador de carregamento em tela cheia/bloco maior (ex. carregamento inicial de uma página inteira).

Ambos aceitam `className` e `style`. **Não há props documentadas além dessas duas** na versão consultada (`1.1.39`) — confirme contra o pacote instalado antes de assumir props adicionais (ex. `size`, `label`), pois não foram encontradas nos tipos.

## Boas práticas

- Prefira `Loading` para estados de espera localizados (ex. um painel de resultado de consulta enquanto busca o protocolo) e `LoadingScreen` só quando a página inteira depende do dado.
- Nunca use `Message severity="info"` como substituto de um estado de carregamento — `Message` é para comunicação textual persistente, não para indicar processamento em andamento.
- Combine com texto via `Typography` ao lado, se precisar comunicar o que está sendo processado (ex. "Consultando protocolo...").

## Acessibilidade

- Anuncie o estado de carregamento para leitores de tela (`aria-live="polite"` no container que envolve `Loading`/`LoadingScreen`, ou `aria-busy="true"` no elemento afetado).
- Ao concluir o carregamento, garanta que o foco/anúncio para o conteúdo carregado seja previsível (não deixe o foco "perdido").

## Properties

| Propriedade | Valores | Descrição |
|-------------|---------|-----------|
| `className` | string | Classe CSS adicional. |
| `style` | objeto | Estilo inline adicional. |
