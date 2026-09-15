# Textarea

## Contexto

- **Categoria:** Entrada de dados
- **Objetivo:** Permitir a entrada de texto livre em múltiplas linhas por meio de um campo de formulário expansível.
- **Quando usar:** Quando o dado esperado for um texto longo ou de tamanho variável, como comentários, observações, descrições ou justificativas.
- **Quando evitar:** Quando o dado esperado for uma única linha de texto curto (usar Input Text) ou um formato específico, como número, data ou senha (usar o componente correspondente).
- **Interrompe o fluxo:** Não
- **Exige ação do usuário:** Sim
- **Componentes relacionados:** Input Text.

<!-- TODO: confirmar via Storybook oficial (https://ligadigital.pe.gov.br/storybook/index.html) se há componentes relacionados adicionais além do Input Text. -->

---

## Visão geral

O Textarea é um campo de formulário para entrada de texto em múltiplas linhas, análogo ao Input Text mas dimensionado para conteúdo mais longo. É indicado para cenários em que o usuário precisa redigir um texto livre, como comentários, observações ou descrições, em vez de um dado curto e estruturado.

<!-- TODO: confirmar via Storybook oficial se o campo possui redimensionamento manual (resize), auto-resize por conteúdo, ou altura/número de linhas fixo por padrão. -->

---

## Comportamento

O campo aceita quebras de linha e cresce (ou exibe rolagem interna) para acomodar textos mais longos, mantendo o mesmo padrão de estados visuais dos demais campos de entrada de dados do Design System (padrão, digitação, focado, erro, desabilitado).

<!-- TODO: confirmar via Storybook oficial o comportamento exato de redimensionamento e se existe um limite de caracteres configurável (maxLength) exibido ao usuário. -->

---

## Boas práticas

- Use labels claras e descritivas, indicando o tipo de conteúdo esperado (ex. `Observações`, `Descrição do problema`).
- Utilize o placeholder apenas como exemplo de formato, nunca como substituto do label.
- Prefira o Textarea somente quando o conteúdo esperado for realmente longo ou de tamanho imprevisível; para uma única linha curta, use Input Text.
- Valide e forneça feedback imediato em casos de erro (ex. campo obrigatório não preenchido).
- Quando houver limite de caracteres, comunique-o claramente ao usuário próximo ao campo.

---

## Acessibilidade

- O campo deve estar sempre vinculado a um label.
- Forneça mensagens de erro legíveis por leitores de tela, utilizando `aria-describedby` quando aplicável.
- Preserve o foco visível e a navegação por teclado.
- Garanta que estados de erro não dependam apenas de diferenciação por cor.

---

## Modo de uso

### Estado padrão

Utilizado quando o campo está disponível para preenchimento e não apresenta nenhuma interação ou erro.

### Estado focado

Indica que o campo está atualmente selecionado e pronto para receber a entrada do usuário.

### Estado de erro

Utilizado quando o campo contém um valor inválido ou quando uma informação obrigatória não foi preenchida. A mensagem de suporte deve explicar o problema de forma clara.

### Estado desabilitado

Utilizado quando o campo não está disponível para interação. O usuário não pode inserir ou alterar seu conteúdo enquanto estiver nesse estado.

---

## Properties

| Propriedade | Valores | Descrição |
|-------------|---------|-----------|
| State | `default`, `focused`, `error`, `disabled` | Define o estado visual e de interação do campo. |
| Type | `text input` | Define o tipo de entrada do componente. |
| Show support text | `true`, `false` | Define se o texto de suporte ou erro é apresentado. |

<!-- TODO: confirmar via Storybook oficial se existem properties adicionais específicas de Textarea (ex. rows, maxLength, resize) não documentadas na fonte original. -->

---

## Casos de uso

- Campo de "Observações" ou "Comentários adicionais" em formulários de solicitação de serviço.
- Campo de justificativa em fluxos de aprovação ou contestação.
- Campo de descrição livre em formulários de cadastro ou denúncia.

<!-- TODO: confirmar via Storybook oficial outros casos de uso oficialmente documentados. -->
