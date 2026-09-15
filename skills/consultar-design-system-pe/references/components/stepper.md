# Stepper

> ⚠️ **Não existe um componente único `Stepper` exportado por `@uigovpe/components`** — confirmado em `node_modules/@uigovpe/components@1.1.39/dist/index.d.ts` num projeto real: o pacote exporta `StepperHeader` (props incluem `steps: Step[]`, `currentStep`, `providerName`, `processName`, `minimal`, `onChangeStep`) e `StepperBody` como dois componentes separados. Use `StepperHeader` para o indicador de progresso (`minimal={true}` corresponde à variação "Minimalista" descrita abaixo) e `StepperBody` para o conteúdo de cada etapa — nunca `import { Stepper } from '@uigovpe/components'`.

## Contexto

- **Categoria:** Navegação e progresso
- **Objetivo:** Orientar a pessoa usuária em processos divididos em múltiplas etapas, mostrando claramente o progresso atual e as etapas restantes.
- **Quando usar:** Fluxos com várias etapas, como formulários, cadastros, processos de revisão ou conclusão.
- **Quando evitar:** Fluxos simples que não possuem etapas claramente definidas.
- **Interrompe o fluxo:** Não
- **Exige ação do usuário:** Sim
- **Componentes relacionados:** Progress Indicator, Formulário e Navigation.

---

## Visão geral

O Stepper é um componente utilizado para guiar a pessoa usuária em processos que acontecem em várias etapas.

Ele divide fluxos complexos em partes menores e mais fáceis de compreender, mostrando claramente o progresso atual e o que ainda falta ser concluído.

---

## Variações

### Default

- Exibe todas as etapas de forma visual, com ícones.
- Inclui rótulos curtos para cada etapa.
- Recomendado em fluxos mais longos ou complexos, onde a visualização do processo completo ajuda na compreensão.

### Minimalista

- Inicialmente pensado para mobile, com espaço reduzido.
- Mostra apenas uma barra de progresso segmentada e a etapa atual.
- Pode ser utilizado também em desktop quando o processo for simples ou quando se deseja uma interface mais enxuta.

---

## Comportamento

- Indica visualmente a etapa atual do processo.
- Diferencia etapas concluídas, etapa atual e etapas ainda não concluídas.
- Permite que a pessoa usuária compreenda seu progresso dentro do fluxo.
- A versão Default apresenta todas as etapas.
- A versão Minimalista apresenta uma representação reduzida do progresso.
- O indicador de progresso não deve ultrapassar 4 etapas, incluindo a etapa de conclusão.

---

## Boas práticas

- Mantenha os títulos das etapas curtos e objetivos.
- Evite criar fluxos com muitas etapas, pois isso pode cansar a pessoa usuária.
- Garanta que a pessoa usuária saiba sempre em qual etapa está e quantas ainda faltam para concluir.
- Utilize o Stepper para processos realmente divididos em etapas.
- Não ultrapasse 4 etapas, incluindo a conclusão.

---

## Acessibilidade

- O container do Stepper deve utilizar `role="tablist"` quando as etapas funcionarem como abas de navegação.
- Cada cabeçalho de etapa deve utilizar `role="tab"` e indicar corretamente o painel correspondente.
- Cada painel de etapa deve utilizar `role="tabpanel"`.
- Utilize `aria-controls` para relacionar cada etapa ao seu painel de conteúdo.
- Utilize `aria-labelledby` para identificar o título associado ao painel.
- Garanta suporte completo à navegação por teclado.
- A tecla Tab deve permitir navegar entre os cabeçalhos.
- Enter ou Espaço deve permitir ativar ou selecionar a etapa atual.

---

## Modo de uso

### Default

Utilize quando for importante apresentar todas as etapas do processo e permitir que a pessoa usuária compreenda o fluxo completo.

### Minimalista

Utilize quando houver pouco espaço disponível ou quando o processo for simples e não for necessário apresentar todas as etapas visualmente.

---

## Properties

### `StepperHeader` (indicador de progresso)

| Propriedade | Valores | Descrição |
|-------------|---------|-----------|
| `steps` | `Step[]` | Lista das etapas do fluxo (nomes/labels). |
| `currentStep` | número | Define a etapa atual do processo. |
| `providerName` | texto | Texto de contexto apresentado acima do nome do processo (equivalente ao "Chapéu" da variação Default). |
| `processName` | texto | Nome do processo. |
| `minimal` | `true`, `false` | `true` corresponde à variação "Minimalista" (barra segmentada); `false`/omitido corresponde à "Default" (todas as etapas visíveis). |
| `onChangeStep` | função | Callback ao mudar de etapa (quando a navegação entre etapas já concluídas é permitida). |

### `StepperBody` (conteúdo da etapa)

Renderiza o conteúdo correspondente à etapa atual — consulte o tipo exportado pelo pacote instalado para as props exatas antes de usar, já que este documento não substitui a verificação contra a versão real (ver `docs/regras-globais-pe.md`).