# Pattern — Dashboard (painel de indicadores)

Categoria prometida em `guides/layout.md` sem arquivo até esta versão. Cobre um painel de indicadores/métricas — dentro do Backoffice (como conteúdo de `PageContent`) ou como página pública de transparência/acompanhamento.

## Composição oficial

- Grade de indicadores no topo: um `Card` por indicador (`Typography` com o valor em destaque + rótulo), em `FlexContainer` com wrap.
- Abaixo, conteúdo de detalhe por indicador: `Table` (ver `pagecontent-listagem.md` para a composição de tabela) e/ou visualizações — este Design System **não documenta nenhum componente de gráfico/chart**; se o pedido exigir gráficos, reportar essa lacuna explicitamente no resumo em vez de inventar ou importar uma lib de gráficos externa sem aprovação.
- Filtro de período/contexto: `Filter` ou `Dropdown`, acima da grade de indicadores, afetando todos eles.

## Esqueleto de código de referência

```tsx
export default function DashboardPageContent() {
  return (
    <>
      <Dropdown id="periodo" label="Período" options={periodos} />

      <div className="indicator-grid">
        <Card elevation="low">
          <Typography variant="span" size="xxl" fontWeight="bold">1.204</Typography>
          <Typography variant="p" size="sm">Solicitações no período</Typography>
        </Card>
        <Card elevation="low">
          <Typography variant="span" size="xxl" fontWeight="bold">89%</Typography>
          <Typography variant="p" size="sm">Concluídas no prazo</Typography>
        </Card>
      </div>

      <Table value={detalhes}>
        <Column field="mes" header="Mês" />
        <Column field="total" header="Total" />
      </Table>
    </>
  );
}
```

```css
.indicator-grid {
  display: flex;
  flex-wrap: wrap;
  gap: var(--spacing-24);
}
```

## Nunca

- Importar uma biblioteca de gráficos externa (Chart.js, Recharts etc.) sem reportar a lacuna e obter confirmação — não há componente de gráfico documentado neste Design System hoje.
- Misturar o dashboard com a listagem detalhada sem separação visual clara (título de seção entre a grade de indicadores e a tabela de detalhe).
