# Table

> ⚠️ **API real confirmada** (`node_modules/@uigovpe/components@1.1.39/dist/index.d.ts` num projeto real): o pacote exporta `Table`, `Column`, `Paginator` e `Filter` como componentes irmãos — é um wrapper de `primereact/datatable`. **Não existem** `Datatable`, `Datatable-cell` ou `Cell` como componentes/tipos separados; ignore essas seções abaixo como nomenclatura de composição antiga e use sempre `Table` (container) + `Column` (um por coluna, com suas próprias props de título/ordenação) + `Paginator` (paginação) + `Filter` (filtros), nunca os nomes da seção "Modo de uso" mais abaixo.

## Contexto

- **Categoria:** Dados e informação
- **Objetivo:** Organizar e apresentar informações estruturadas em linhas e colunas, facilitando a leitura, comparação e identificação de dados.
- **Quando usar:** Quando for necessário apresentar conjuntos de dados relacionados que possam ser organizados em linhas e colunas.
- **Quando evitar:** Quando houver poucas informações ou quando a relação entre os dados não depender de uma estrutura tabular.
- **Interrompe o fluxo:** Não
- **Exige ação do usuário:** Não
- **Componentes relacionados:** Column, Paginator, Filter e Tag

## Visão geral

A Table organiza informações em linhas e colunas, permitindo leitura estruturada e comparação de dados. Ela pode ser utilizada tanto para exibir grandes volumes de informação quanto para apresentar conjuntos menores de dados de forma clara.

## Comportamento

- Organiza informações relacionadas em linhas e colunas;
- Permite configurar a quantidade de colunas e linhas apresentadas;
- Pode apresentar ordenação por coluna quando o recurso estiver habilitado;
- Permite diferentes estilos de apresentação das linhas;
- Pode apresentar diferentes tipos de conteúdo nas células, de acordo com a informação exibida.

## Boas práticas

- Utilize títulos de coluna claros, curtos e fáceis de compreender;
- Evite excesso de colunas e priorize as informações mais relevantes para a tarefa;
- Mantenha uma ordem lógica entre as colunas, considerando a importância das informações;
- Utilize ordenação apenas quando ela ajudar a pessoa usuária a encontrar ou comparar informações;
- Em tabelas extensas, considere combinar o componente com recursos de paginação e filtros;
- Em dispositivos menores, priorize as informações mais relevantes e evite comprometer a leitura da tabela;
- Utilize o estilo de linhas listradas quando ele ajudar a acompanhar visualmente os dados em tabelas com muitas linhas.

## Acessibilidade

- Utilize cabeçalhos de coluna semanticamente associados às respectivas células;
- Garanta que informações importantes não sejam comunicadas apenas por cor;
- Elementos interativos, como ordenação, devem ser acessíveis por teclado;
- Forneça indicação visual clara para estados de foco e interação;
- Mantenha uma ordem de leitura coerente entre cabeçalhos, linhas e células;
- Utilize títulos de coluna que descrevam claramente o conteúdo apresentado.

## Modo de uso

A tabela é composta por quatro componentes irmãos, usados juntos:

### `Table`

Container principal — envolve as `Column`s e recebe os dados (linhas) e o estilo de apresentação (ex. linhas listradas).

### `Column`

Um `Column` por coluna da tabela — define o título do cabeçalho, o campo de dado correspondente e se a coluna é ordenável. Use um `Column` do tipo apropriado para células de status (combine com `Tag`/`Badge` no corpo da célula, não invente uma prop `type="status"`).

### `Paginator`

Componente irmão de `Table`, para paginação de tabelas extensas — usar em conjunto com `Table`, não como prop interna dela.

### `Filter`

Componente irmão de `Table`, para o painel de filtros — ver também `filter.md`.