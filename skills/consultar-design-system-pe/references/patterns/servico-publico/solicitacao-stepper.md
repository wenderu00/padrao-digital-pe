# Pattern — Solicitação multi-etapa (Stepper)

Composição de referência para o fluxo multi-etapa descrito em prosa por `guides/services/solicitacao.md`, quando a complexidade do serviço justificar 3–5 etapas (ver critério qualitativo naquele guia). Para serviços simples de uma página só, não use este pattern — um único `Card`/formulário com as seções de `pagecontent-formulario.md` já resolve.

## Composição oficial

- `StepperHeader` (indicador de progresso, `minimal={false}` em desktop com espaço suficiente, `minimal={true}` em mobile/espaço reduzido) + `StepperBody` (conteúdo da etapa atual). Não existe um componente único `Stepper` — ver `components/stepper.md`.
- Cada etapa: título curto + campos agrupados em seções (mesma convenção de `pagecontent-formulario.md`) + navegação "Voltar"/"Avançar" (`Button variant="secondary"` / `variant="primary"`).
- Última etapa: revisão dos dados preenchidos antes do envio final.
- Tela de confirmação pós-envio: fora do stepper (o stepper não tem uma "etapa de confirmação" — a confirmação substitui o stepper inteiro), seguindo `guides/services/padroes-interacao.md`.

## Esqueleto de código de referência

```tsx
export default function SolicitacaoPage() {
  const [etapaAtual, setEtapaAtual] = useState(0);
  const [concluido, setConcluido] = useState(false);

  if (concluido) {
    return (
      <Card elevation="low">
        <Typography variant="h1" size="lg" fontWeight="bold">
          Solicitação registrada
        </Typography>
        <Typography variant="p">
          Protocolo: {protocolo}. Você também receberá este número por e-mail.
        </Typography>
        <Button variant="primary" onClick={handleVoltarInicio}>Voltar ao início</Button>
      </Card>
    );
  }

  return (
    <>
      <StepperHeader
        steps={etapas}
        currentStep={etapaAtual}
        processName="Segunda via de certidão"
        minimal={false}
      />
      <StepperBody>
        {etapaAtual === 0 && <EtapaRequerente onNext={handleNext} />}
        {etapaAtual === 1 && <EtapaDocumento onNext={handleNext} onBack={handleBack} />}
        {etapaAtual === 2 && <EtapaRevisao onSubmit={handleSubmit} onBack={handleBack} />}
      </StepperBody>
    </>
  );
}
```

## Nunca

- Ultrapassar 4 etapas incluindo a conclusão (limite documentado em `components/stepper.md`).
- Fazer o indicador de progresso refletir a contagem de telas em vez do fluxo real do serviço (ex. dividir uma etapa em 2 telas só para "ter mais etapas").
