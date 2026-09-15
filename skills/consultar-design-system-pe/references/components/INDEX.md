# Índice de componentes — Padrão Digital de Pernambuco

Mapa `Componente → arquivo → resumo`, para localizar rapidamente a documentação certa sem precisar abrir todos os arquivos. Ordenado alfabeticamente pelo nome do componente. Mantenha esta tabela atualizada sempre que um arquivo for renomeado ou um componente novo for adicionado — o typo histórico `tablet.md` (deveria ser `table.md`) é exatamente o tipo de erro que este índice existe para prevenir.

| Componente | Arquivo | Resumo |
|---|---|---|
| Accordion | `Accordion.md` | Organiza conteúdos em seções expansíveis, mostrando só o que o usuário precisa ver. |
| AdminSideBar | `AdminSideBar.md` | Navegação lateral persistente entre módulos de aplicações administrativas (obrigatório no pattern Backoffice). Grafia confirmada contra o pacote real: `AdminSideBar`, não `AdminSidebar`. |
| Admin UserBar | `AdminUserBar.md` | Exibe o contexto da página atual e o usuário autenticado em aplicações administrativas. |
| Button | `button.md` | Ação principal da interface; apenas um botão primário por contexto. |
| Card | `card.md` | Agrupa informações relacionadas em um bloco visual; não usar como layout de página inteira. |
| Checkbox | `Checkbox.md` | Seleção múltipla e independente de opções. |
| Chip | `chip.md` | Representa um critério de filtro selecionado, de forma compacta e removível. |
| Date Picker | `datePicker.md` | Seleção de data/hora via digitação manual ou calendário interativo. |
| Dialog | `dialog.md` | Modal que interrompe o fluxo para confirmar uma ação crítica ou irreversível. |
| Dropdown | `dropdown.md` | Seleção única via lista suspensa; evitar com 3 opções ou menos (usar Radio Button). |
| Filter | `filter.md` | Painel de critérios para refinar uma lista ou conjunto de dados. |
| Footer | `footer.md` | ⚠️ Não é um componente exportado — padrão de composição com HTML semântico. Rodapé institucional com links, identificação do órgão e contato. |
| GovBar | `govBar.md` | Barra obrigatória em toda página do Governo de PE; identidade institucional e acessibilidade global. |
| Header | `header.md` | ⚠️ Não é um componente exportado — padrão de composição com HTML semântico. Identidade da aplicação/serviço e navegação principal (não usado no pattern Backoffice). |
| Input File | `inputFile.md` | Upload de arquivo único ou múltiplo. |
| Input Mask / Input Masked | `inputMask.md` | Campo de texto com máscara de formatação (CPF, telefone etc.) — dois exports distintos, `InputMask` (prop `id`) e `InputMasked`; confirmar sempre qual é o pretendido. |
| Input Number | `inputNumber.md` | Campo numérico com min/max/step; usar Input Text quando o formato for misto (CPF, telefone). |
| Input Password | `inputPassword.md` | Campo de senha com caracteres ocultos por padrão. |
| Input Text | `inputText.md` | Campo de texto básico de uma linha. |
| Loading / LoadingScreen | `loading.md` | Estado de carregamento/processamento — local (`Loading`) ou em tela cheia (`LoadingScreen`). Use para o estado "processando" de consultas/solicitações em vez de improvisar com `Message`. |
| Menu | `menu.md` | Organiza links de navegação, tipicamente junto ao Header. |
| Message | `message.md` | Feedback informativo não bloqueante (info/sucesso/aviso/erro); diferente do Dialog. |
| MultiSelect | `multiselect.md` | Seleção múltipla via lista suspensa com checkboxes. |
| Paginator | `paginator.md` | Navegação entre páginas de um conteúdo extenso. |
| Radio Button | `radioButton.md` | Seleção única mutuamente exclusiva dentro de um grupo. |
| Search | `search.md` | Campo de busca (global, local ou autocomplete). |
| Stepper (`StepperHeader`/`StepperBody`) | `stepper.md` | ⚠️ Não existe um componente único `Stepper` — são dois exports separados, `StepperHeader` (indicador de progresso) e `StepperBody` (conteúdo da etapa). |
| Switch | `switch.md` | Alternância binária com efeito imediato, sem confirmação (diferente do Checkbox). |
| Table | `table.md` | Organiza dados em linhas e colunas; composto com `Column` + `Paginator` + `Filter` como componentes irmãos (wrapper de `primereact/datatable`) — não existem `Datatable`/`Datatable-cell`/`Cell` como tipos separados. |
| Tab View | `tabView.md` | Organiza conteúdo relacionado em abas (não sequencial — para fluxo sequencial, usar Stepper). |
| Tag | `tag.md` | Marcador visual curto para status ou categoria; não substitui um botão de ação. |
| Textarea | `textarea.md` | Campo de texto livre em múltiplas linhas (análogo ao Input Text, para conteúdo mais longo). |
| Toast | `toast.md` | Notificação breve e temporária sobreposta à interface, some sozinha após alguns segundos. |
| Tooltip | `tooltip.md` | Informação complementar sobre um elemento; nunca crítica para completar a tarefa. |

## Componentes reais sem doc detalhado ainda

Confirmados como exports reais de `@uigovpe/components@1.1.39` (leitura direta de `dist/index.d.ts` num projeto instalado), mas **sem arquivo de referência próprio neste catálogo ainda**: `Avatar`, `Badge`, `Divider`, `FlexContainer` (primitiva de layout — ver `tokens.md`), `Galleria`, `Icon`, `Image`, `InputCurrency`, `InputSearch`, `InputSwitch`, `FileInput` (distinto de `InputFile`, que já tem doc), `OverlayPanel`, `XviaLayoutProvider`, subcomponentes de sidebar (`SidebarFooter`, `SidebarItem`, `SidebarLogo`, `SidebarSection`, `SidebarSubItem`, `SidebarToggleButton`), hooks `useInitials`/`useWindowSize`.

Como a versão instalada é a fonte de verdade mais forte (`docs/regras-globais-pe.md`), **não trate estes como "componente inventado"** só por faltar doc aqui — mas antes de usar qualquer um, confirme props direto em `node_modules/@uigovpe/components/**/*.d.ts` do projeto-alvo (não em memória do modelo), já que este catálogo ainda não tem uma página própria para eles.
