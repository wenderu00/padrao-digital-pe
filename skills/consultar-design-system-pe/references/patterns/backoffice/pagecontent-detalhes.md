# PageContent — Detalhes

Pattern de conteúdo para `PageContent` (ver `backoffice.md`) quando a funcionalidade é exibir um registro específico somente para leitura (CRUD: detalhar).

## Composição oficial

- `Typography` (título — geralmente o identificador/nome do registro) + `Tag`/`Badge` de status ao lado, quando aplicável.
- Dados organizados em pares rótulo/valor usando `<dl>`/`<dt>`/`<dd>` semântico (não uma tabela de 2 colunas nem divs soltas) — agrupados em seções com `Typography variant="h2"` quando houver mais de ~6 pares.
- Ações do registro (`editar`, `excluir`, `voltar`): `Button`s no cabeçalho da página, com `Dialog` para confirmar ações destrutivas.

## Esqueleto de código de referência

```tsx
export default function DetalhesPage() {
  return (
    <>
      <div className="page-header">
        <Typography variant="h1" size="lg" fontWeight="bold">
          {registro.nome}
        </Typography>
        <Tag>{registro.status}</Tag>
        <Button variant="secondary" onClick={handleEdit}>Editar</Button>
      </div>

      <section>
        <Typography variant="h2" size="md" fontWeight="medium">
          Dados principais
        </Typography>
        <dl>
          <dt>Documento</dt>
          <dd>{registro.documento}</dd>
          <dt>Data de criação</dt>
          <dd>{registro.criadoEm}</dd>
        </dl>
      </section>
    </>
  );
}
```

## Estados

- Carregando: `Loading` no lugar do conteúdo.
- Registro não encontrado: `Message severity="warning"` + ação de voltar à listagem (não uma tela em branco).

## Nunca

- Tornar campos editáveis inline nesta tela — edição pertence a `pagecontent-formulario.md`.
