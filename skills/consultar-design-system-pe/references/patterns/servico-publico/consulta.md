# Pattern — Serviço de Consulta

Composição de referência para o que `guides/services/consulta.md` descreve em prosa. Copie e adapte este esqueleto em vez de compor a página do zero a cada geração — isso é o que faltava para reduzir a variação entre execuções do mesmo tipo de pedido.

## Composição oficial

- `Card` (painel único contendo formulário de busca + resultado, ou dois `Card`s separados quando o resultado for extenso).
- Formulário de busca: campo(s) de entrada relevantes (`InputText`/`InputMask` conforme o dado) + `Button variant="primary"` ("Consultar").
- Estado de resultado, um destes por vez:
  - **Processando:** `Loading` (ver `components/loading.md`) substituindo a área de resultado.
  - **Encontrado:** dados em `<dl>/<dt>/<dd>` semântico (mesma convenção de `pagecontent-detalhes.md`), com ações relevantes (baixar/imprimir, salvar/compartilhar) como `Button`s.
  - **Não encontrado:** `Message severity="warning"` objetiva, sem tom de erro do sistema.
  - **Falha na consulta:** `Message severity="danger"` + ação de tentar novamente.
- Ação "Nova consulta" sempre disponível após um resultado (limpa o formulário, não recarrega a página).

## Esqueleto de código de referência

```tsx
export default function ConsultaPage() {
  const [estado, setEstado] = useState<'idle' | 'processando' | 'encontrado' | 'nao-encontrado' | 'falha'>('idle');

  return (
    <Card elevation="low">
      <Typography variant="h1" size="lg" fontWeight="bold">
        Consultar protocolo
      </Typography>

      <InputMask id="protocolo" label="Número do protocolo" mask="9999-9999999/9999-99" />
      <Button variant="primary" onClick={handleConsultar}>Consultar</Button>

      {estado === 'processando' && <Loading />}

      {estado === 'encontrado' && (
        <>
          <dl>
            <dt>Situação</dt>
            <dd><Tag>{resultado.situacao}</Tag></dd>
            <dt>Última atualização</dt>
            <dd>{resultado.atualizadoEm}</dd>
          </dl>
          <Button variant="secondary" onClick={handleImprimir}>Imprimir</Button>
          <Button variant="secondary" onClick={handleNovaConsulta}>Nova consulta</Button>
        </>
      )}

      {estado === 'nao-encontrado' && (
        <Message severity="warning">Nenhum resultado encontrado para este protocolo.</Message>
      )}

      {estado === 'falha' && (
        <Message severity="danger">Não foi possível concluir a consulta. Tente novamente.</Message>
      )}
    </Card>
  );
}
```

## Nunca

- Usar `Message severity="info"` para o estado "processando" — usar `Loading`/`LoadingScreen`.
- Deixar o usuário sem uma ação de próximo passo em qualquer estado final (encontrado/não encontrado/falha).
