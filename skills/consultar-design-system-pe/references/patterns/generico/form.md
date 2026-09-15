# Pattern — Form (formulário independente)

Categoria prometida em `guides/layout.md` sem arquivo até esta versão. Cobre um formulário standalone que **não** é uma solicitação de serviço público (`patterns/servico-publico/`) nem um formulário dentro do Backoffice (`patterns/backoffice/pagecontent-formulario.md`) — ex. um formulário de contato institucional, inscrição simples, newsletter.

Se o formulário está dentro de um fluxo de serviço público ou de uma área administrativa, use o pattern específico daquele contexto, não este.

## Composição oficial

- `Card` envolvendo o formulário inteiro (nunca campos soltos na página sem um container visual).
- Campos agrupados com a mesma convenção de `patterns/backoffice/pagecontent-formulario.md` (seções com título quando houver mais de ~4 campos).
- Ação primária única (`Button variant="primary"`) — sem ação secundária de "cancelar" quando não há nada a cancelar (ex. um formulário de contato não precisa de um botão "cancelar").

## Esqueleto de código de referência

```tsx
export default function ContatoPage() {
  return (
    <Card elevation="low">
      <Typography variant="h1" size="lg" fontWeight="bold">
        Fale conosco
      </Typography>
      <InputText id="nome" label="Nome" required />
      <InputText id="email" label="E-mail" required />
      <InputTextarea id="mensagem" label="Mensagem" required />
      <Button variant="primary" type="submit">Enviar</Button>
    </Card>
  );
}
```

## Estados

Mesmas regras de `guides/services/padroes-interacao.md`: validação em tempo real, erro próximo ao campo, confirmação clara de envio (`Message severity="success"` ou redirecionamento para uma tela de confirmação simples).
