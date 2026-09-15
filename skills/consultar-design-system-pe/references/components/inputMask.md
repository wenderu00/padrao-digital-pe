# InputMask / InputMasked

> Confirmado por leitura direta de `node_modules/@uigovpe/components@1.1.39/dist/index.d.ts` num projeto real: são **dois exports distintos** com nomes quase idênticos (`InputMask` vs `InputMasked`) — mesmo risco de confusão que existia entre `AdminSidebar`/`AdminSideBar`. Confirme sempre qual dos dois é o pretendido antes de importar.

## Contexto

- **Categoria:** Entrada de dados
- **Objetivo:** Campo de texto com máscara de formatação (CPF, telefone, CEP, número de processo etc.).
- **Quando usar:** Campos cujo formato é fixo e conhecido de antemão (ex. `999.999.999-99` para CPF).
- **Quando evitar:** Formatos variáveis ou que o usuário deve poder digitar livremente — nesse caso, usar `InputText` com validação, não forçar uma máscara.
- **Componentes relacionados:** `InputText`, `InputNumber`.

## Diferença de API confirmada

- `InputMask` usa a prop **`id`** para identificar o campo (não `inputId`, diferente de `InputText`/`InputPassword`). Não assuma `inputId` por analogia com outros inputs do pacote — foi exatamente esse tipo de suposição que um especialista teve que verificar lendo o arquivo de tipos real (`InputMask.js`) em vez de confiar em convenção.
- `InputMasked` é um export separado — antes de usar, confirme sua prop de identificação e a prop de máscara contra o pacote instalado (`node_modules/@uigovpe/components/**/*.d.ts`); não assuma que é idêntica a `InputMask` só pelo nome parecido.

## Boas práticas

- Sempre exiba o formato esperado como placeholder ou texto de apoio (ex. "000.000.000-00"), mesmo com a máscara aplicada.
- Nunca invente uma prop `autoFormatMask` ou qualquer outra não confirmada nos tipos reais — esse é exatamente o tipo de prop inventada que a validação deste plugin existe para pegar.

## Properties

Consulte `node_modules/@uigovpe/components/**/*.d.ts` no projeto-alvo para a lista completa e atualizada de props de cada um — este documento não substitui essa checagem (ver ordem de prioridade de fontes de verdade em `docs/regras-globais-pe.md`). Props confirmadas até `1.1.39`:

| Componente | Propriedade | Observação |
|---|---|---|
| `InputMask` | `id` | Identificador do campo — não é `inputId`. |
| `InputMasked` | *(confirmar no pacote instalado)* | Não pressupor paridade total com `InputMask`. |
