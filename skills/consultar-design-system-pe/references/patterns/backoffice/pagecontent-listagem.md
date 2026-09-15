# PageContent — Listagem

Pattern de conteúdo para `PageContent` (ver `backoffice.md`) quando a funcionalidade é listar/gerenciar um conjunto de registros (CRUD: listar). Composição fixa: cabeçalho da página + filtro + tabela + paginação + ação primária.

## Composição oficial

- `Typography` (título da página, `variant="h1"`) + descrição curta opcional.
- `Button` (ação primária — ex. "Novo registro" — no canto superior direito do cabeçalho).
- `Filter` (painel de filtros, quando a listagem tiver mais de ~5 registros ou critérios relevantes de busca).
- `Table` + um `Column` por coluna relevante + `Paginator` — nunca `Datatable`/`Datatable-cell`/`Cell` (não existem, ver `components/table.md`).
- Status/categoria em célula: usar `Tag` dentro do `Column`, não uma prop `type="status"`.
- Ações por linha (editar/excluir/ver): `Button` variante ghost/ícone por linha, ou um menu de ações — nunca um link genérico sem rótulo acessível.

## Esqueleto de código de referência

```tsx
export default function ListagemPage() {
  return (
    <>
      <div className="page-header">
        <Typography variant="h1" size="lg" fontWeight="bold">
          Título da listagem
        </Typography>
        <Button variant="primary">Novo registro</Button>
      </div>

      <Filter fields={filterFields} onFilter={handleFilter} />

      <Table value={data}>
        <Column field="nome" header="Nome" sortable />
        <Column field="status" header="Status" body={(row) => <Tag>{row.status}</Tag>} />
        <Column field="acoes" header="Ações" body={(row) => (
          <Button variant="ghost" onClick={() => handleEdit(row)}>Editar</Button>
        )} />
      </Table>

      <Paginator totalRecords={total} rows={pageSize} onPageChange={handlePageChange} />
    </>
  );
}
```

## Estados

- Vazio (nenhum registro): mensagem clara + ação primária em destaque (não uma tabela vazia sem contexto).
- Carregando: `Loading` (ver `components/loading.md`) no lugar da tabela, não a tabela com linhas vazias.
- Erro ao carregar: `Message severity="danger"` com ação de tentar novamente.

## Nunca

- Construir a tabela com `<table>`/`<div>` cru quando `Table`+`Column` resolvem o caso.
- Usar mais de um botão de ação primária por listagem.
