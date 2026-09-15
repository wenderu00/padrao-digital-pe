# PageContent — Formulário

Pattern de conteúdo para `PageContent` (ver `backoffice.md`) quando a funcionalidade é criar/editar um registro (CRUD: criar/editar). Reaproveita as regras de `guides/services/solicitacao.md` e `guides/services/padroes-interacao.md` para validação/estados — a diferença é que aqui o formulário vive dentro do shell do Backoffice, não numa página de serviço público solitária.

## Composição oficial

- `Typography` (título da página) + `BreadCrumbSection` (já vem do shell — não recriar).
- Campos agrupados em seções com título (`Typography variant="h2"`), usando os componentes de entrada de dados reais conforme o tipo do campo: `InputText`, `InputNumber`, `InputMask`/`InputMasked` (ver `components/inputMask.md` para a distinção), `Dropdown`/`RadioButton` (≤3 opções → `RadioButton`, ver `dropdown.md`), `DatePicker`, `InputFile`/`FileInput`, `Checkbox`.
- Rodapé de ações fixo: `Button variant="primary"` (salvar) + `Button variant="secondary"` ou `TextLink` (cancelar/voltar).

## Esqueleto de código de referência

```tsx
export default function FormularioPage() {
  return (
    <form onSubmit={handleSubmit}>
      <section>
        <Typography variant="h2" size="md" fontWeight="medium">
          Dados principais
        </Typography>
        <InputText id="nome" label="Nome" required />
        <InputMask id="documento" label="CPF" mask="999.999.999-99" required />
      </section>

      <section>
        <Typography variant="h2" size="md" fontWeight="medium">
          Dados complementares
        </Typography>
        <DatePicker id="dataNascimento" label="Data de nascimento" />
        <Dropdown id="categoria" label="Categoria" options={categorias} />
      </section>

      <div className="form-actions">
        <Button variant="secondary" type="button" onClick={handleCancel}>
          Cancelar
        </Button>
        <Button variant="primary" type="submit">
          Salvar
        </Button>
      </div>
    </form>
  );
}
```

## Estados (ver `guides/services/padroes-interacao.md`)

- Validação em tempo real, erro próximo ao campo, distinção obrigatório/opcional.
- Salvando: desabilitar o botão primário e mostrar `Loading` inline nele (não bloquear a tela inteira com `LoadingScreen` para um salvamento rápido).
- Sucesso: `Toast`/`Message severity="success"` + retorno à listagem ou ao modo de visualização.
- Erro ao salvar: `Message severity="danger"` com o motivo, mantendo os dados preenchidos.

## Nunca

- Misturar seções sem título quando há mais de ~4 campos.
- Usar `Dropdown` para 3 opções ou menos — usar `RadioButton`.
